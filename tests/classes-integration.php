<?php
// Run with: wp eval-file /private/path/classes-integration.php
// Restores the existing Yoga option in finally; does not leave fixture content.
$checks = 0;
$assert = function ($ok, $label) use (&$checks) {
    if (!$ok) { throw new RuntimeException($label); }
    $checks++;
};
$original = get_option('htc_yoga', null);
$user_id = get_current_user_id();
try {
    $assert(count(htc_defaults()) === 5, 'Five fixed class pages');
    $assert(count(htc_payload('yoga')['types']) >= 1, 'Yoga types are available');
    $assert(is_wp_error(htc_payload('unknown')), 'Unknown categories rejected');
    $input = ['intro' => '<b>Test introduction</b>', 'expect' => "First line\nSecond line", 'image_id' => -999999,
        'types' => [['name' => '<b>Test class</b>', 'name_zh' => '测试课程', 'description' => '<img src=x onerror=alert(1)>Plain description', 'duration' => '60 minutes', 'level' => 'All levels'], ['name' => ''], 'invalid']];
    $clean = htc_clean($input);
    $assert($clean['intro'] === 'Test introduction', 'Intro markup sanitized');
    $assert($clean['expect'] === "First line\nSecond line", 'Paragraph line breaks preserved');
    $assert($clean['image_id'] === 0, 'Invalid attachment rejected');
    $assert(count($clean['types']) === 1 && $clean['types'][0]['name'] === 'Test class', 'Unnamed and malformed types removed');
    $assert($clean['types'][0]['description'] === 'Plain description', 'Type HTML sanitized');
    $assert(count(htc_clean(['types' => array_fill(0, 45, ['name' => 'Class'])])['types']) === 40, 'Type limit enforced');
    $assert(htc_clean(['intro' => [], 'image_id' => []])['intro'] === '', 'Malformed scalar fields handled');
    wp_set_current_user(0);
    $assert(is_wp_error(htc_store('yoga', $input, 'invalid')), 'Anonymous write rejected');
    $admins = get_users(['role' => 'administrator', 'number' => 1, 'fields' => 'ID']);
    wp_set_current_user($admins[0]);
    $assert(is_wp_error(htc_store('yoga', $input, 'invalid')), 'Invalid nonce rejected');
    $assert(is_wp_error(htc_store('unknown', $input, wp_create_nonce('htc_save_unknown'))), 'Unknown save target rejected');
    $assert(htc_store('yoga', $input, wp_create_nonce('htc_save_yoga')) === true, 'Authorized save accepted');
    $en = htc_payload('yoga'); $zh = htc_payload('yoga', 'zh');
    $assert($en['intro'] === 'Test introduction' && $en['types'][0]['duration'] === '60 minutes', 'Saved editor content reaches public payload');
    $assert($zh['types'][0]['name'] === '测试课程', 'Chinese translation selected');
    $assert($zh['intro'] === $en['intro'], 'Blank Chinese fields fall back to English');
    $input['types'] = [];
    htc_store('yoga', $input, wp_create_nonce('htc_save_yoga'));
    $assert(htc_payload('yoga')['types'] === [], 'Removing all types is respected');
    $get = rest_do_request(new WP_REST_Request('GET', '/healthtinity/v1/classes/yoga'));
    $assert($get->get_status() === 200 && str_contains($get->get_headers()['Cache-Control'], 'no-store'), 'Read-only feed uses fresh content');
    $post = rest_do_request(new WP_REST_Request('POST', '/healthtinity/v1/classes/yoga'));
    $assert($post->get_status() === 404, 'Public feed does not accept writes');
} finally {
    if ($original === null) { delete_option('htc_yoga'); } else { update_option('htc_yoga', $original, false); }
    wp_set_current_user($user_id);
}
echo "PASS: $checks class integration checks; original content restored.\n";
