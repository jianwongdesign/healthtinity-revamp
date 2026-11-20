<?php
// Run only on the staging WordPress installation: wp eval-file <this-file>.
if (!defined('ABSPATH') || !function_exists('htp_feed')) { throw new RuntimeException('Load WordPress and the promotions plugin first.'); }
$checks = 0; $fixture_ids = [];
$assert = function ($ok, $label) use (&$checks) { if (!$ok) { throw new RuntimeException($label); } $checks++; };
$settings = htp_defaults();
$settings_filter = function () use (&$settings) { return $settings; };
add_filter('pre_option_htp_settings', $settings_filter);
$make = function ($title, $status = 'draft') use (&$fixture_ids) {
    $id = wp_insert_post(['post_type' => 'ht_promotion', 'post_status' => $status, 'post_title' => $title], true);
    if (is_wp_error($id)) { throw new RuntimeException($id->get_error_message()); }
    $fixture_ids[] = $id; return $id;
};
$request = new WP_REST_Request('GET', '/healthtinity/v1/promotions');
$find = function ($id, $lang = 'en') use ($request) {
    $request->set_param('lang', $lang);
    foreach (htp_feed($request)->get_data()['promotions'] as $item) { if ($item['id'] === $id) { return $item; } }
    return null;
};
try {
    $id = $make('QA promotion');
    $base = ['enabled' => '1', 'banner' => '1', 'popup' => '1', 'summary' => 'QA content', 'button' => 'Details', 'url' => 'https://example.com/', 'order' => '20'];
    htp_save_meta($id, $base);
    $assert(htp_state(get_post($id)) === 'Draft' && $find($id) === null, 'Draft leaked into public feed');
    wp_update_post(['ID' => $id, 'post_status' => 'publish']);
    $assert($find($id)['banner'] && $find($id)['popup'], 'Active placements missing');
    $now = time(); $fmt = function ($ts) { return wp_date('Y-m-d\TH:i', $ts, new DateTimeZone('Asia/Singapore')); };
    htp_save_meta($id, array_merge($base, ['start' => $fmt($now + 3600)]));
    $assert(htp_state(get_post($id)) === 'Scheduled' && !$find($id), 'Future promotion exposed');
    htp_save_meta($id, array_merge($base, ['end' => $fmt($now - 3600)]));
    $assert(htp_state(get_post($id)) === 'Expired' && !$find($id), 'Expired promotion exposed');
    htp_save_meta($id, array_merge($base, ['start' => '2026-01-01T00:00', 'end' => '2026-01-02T00:00']));
    $assert(htp_state(get_post($id), htp_timestamp('2026-01-01T00:00')) === 'Active', 'Start boundary incorrect');
    $assert(htp_state(get_post($id), htp_timestamp('2026-01-02T00:00')) === 'Expired', 'End boundary incorrect');
    $assert(htp_timestamp('2026-01-01T00:00') === strtotime('2025-12-31T16:00:00Z'), 'Timezone incorrect');
    htp_save_meta($id, array_merge($base, ['start' => '2026-02-30T12:00']));
    $assert(get_post_meta($id, '_htp_enabled', true) === '0', 'Invalid date should disable');
    htp_save_meta($id, array_merge($base, ['start' => '2026-02-03T12:00', 'end' => '2026-02-01T12:00']));
    $assert(get_post_meta($id, '_htp_enabled', true) === '0', 'Reversed dates should disable');
    htp_save_meta($id, array_merge($base, ['enabled' => '0']));
    $assert(!$find($id), 'Disabled item exposed');
    htp_save_meta($id, array_merge($base, ['banner' => '0']));
    $assert(!$find($id)['banner'] && $find($id)['popup'], 'Per-item placement toggle failed');
    $settings['enabled'] = 0;
    $assert(htp_feed($request)->get_data()['promotions'] === [], 'Master off failed');
    $settings = htp_defaults(); $settings['popup'] = 0;
    $assert(!$find($id), 'Global popup off failed for popup-only item');
    $settings = htp_defaults();
    htp_save_meta($id, array_merge($base, ['title_zh' => '中文优惠', 'summary_zh' => '中文内容']));
    $assert($find($id, 'zh')['title'] === '中文优惠' && $find($id, 'zh')['button'] === 'Details', 'Translation fallback failed');
    htp_save_meta($id, array_merge($base, ['url' => 'javascript:alert(1)', 'summary' => '<script>alert(1)</script>Text', 'image' => '99999999']));
    $item = $find($id);
    $assert(!$item['url'] && strpos($item['summary'], '<script>') === false && $item['image'] === null, 'Unsafe input retained');
    $id2 = $make('QA second promotion', 'publish');
    htp_save_meta($id2, array_merge($base, ['order' => '1']));
    $ids = array_column(htp_feed($request)->get_data()['promotions'], 'id');
    $assert(array_search($id2, $ids, true) < array_search($id, $ids, true), 'Ordering failed');
    wp_set_current_user(0);
    $_POST = ['htp' => ['enabled' => '0'], 'htp_nonce' => 'invalid'];
    do_action('save_post_ht_promotion', $id);
    $assert(get_post_meta($id, '_htp_enabled', true) === '1', 'Unauthenticated write succeeded');
    $admins = get_users(['role' => 'administrator', 'number' => 1, 'fields' => 'ID']);
    wp_set_current_user($admins[0]);
    $_POST = ['htp' => array_merge($base, ['badge' => 'Saved through admin hook']), 'htp_nonce' => wp_create_nonce('htp_save')];
    do_action('save_post_ht_promotion', $id);
    $assert(get_post_meta($id, '_htp_badge', true) === 'Saved through admin hook', 'Authenticated admin save failed');
    ob_start(); htp_metabox(get_post($id)); $markup = ob_get_clean();
    $assert(strpos($markup, 'htp-mobile_image') !== false && strpos($markup, 'htp_nonce') !== false && strpos($markup, 'htp-end') !== false, 'Admin controls missing');
    $_POST = [];
    $response = htp_feed($request);
    $assert(strpos($response->get_headers()['Cache-Control'], 'no-store') !== false, 'Feed cache policy missing');
    echo wp_json_encode(['checks' => $checks, 'result' => 'PASS']) . "\n";
} finally {
    $_POST = [];
    remove_filter('pre_option_htp_settings', $settings_filter);
    foreach ($fixture_ids as $fixture) { wp_delete_post($fixture, true); }
    delete_transient('htp_date_error_0');
}
