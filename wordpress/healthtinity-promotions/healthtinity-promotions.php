<?php
/**
 * Plugin Name: Healthtinity Promotions
 * Description: Scheduled bilingual promotions for the Healthtinity site and pop-up.
 * Version: 1.0.0
 */
if (!defined('ABSPATH')) { exit; }

function htp_defaults() {
    return ['enabled' => 1, 'banner' => 1, 'popup' => 1, 'delay' => 8, 'cooldown' => 24];
}
function htp_settings() { return wp_parse_args(get_option('htp_settings', []), htp_defaults()); }
function htp_fields() {
    return [
        'enabled' => ['checkbox', 'Enable this promotion'],
        'banner' => ['checkbox', 'Show in the promotion area on every page'],
        'popup' => ['checkbox', 'Show in the pop-up'],
        'start' => ['datetime-local', 'Starts (Singapore time)'],
        'end' => ['datetime-local', 'Ends (Singapore time, exclusive)'],
        'order' => ['number', 'Display order (lower numbers first)'],
        'badge' => ['text', 'Small label (e.g. New members)'],
        'summary' => ['textarea', 'Short description'],
        'image' => ['image', 'Promotion image'],
        'mobile_image' => ['image', 'Optional portrait / mobile image'],
        'alt' => ['text', 'Image description for accessibility'],
        'image_fit' => ['fit', 'Image layout'],
        'button' => ['text', 'Primary button label'],
        'url' => ['url', 'Primary button URL'],
        'secondary_button' => ['text', 'Optional second button label'],
        'secondary_url' => ['url', 'Optional second button URL'],
        'title_zh' => ['text', 'Chinese title (optional)'],
        'badge_zh' => ['text', 'Chinese small label (optional)'],
        'summary_zh' => ['textarea', 'Chinese description (optional)'],
        'alt_zh' => ['text', 'Chinese image description (optional)'],
        'button_zh' => ['text', 'Chinese primary button label (optional)'],
        'secondary_button_zh' => ['text', 'Chinese second button label (optional)'],
    ];
}
function htp_register() {
    register_post_type('ht_promotion', [
        'labels' => ['name' => 'Promotions', 'singular_name' => 'Promotion', 'add_new_item' => 'Add promotion', 'edit_item' => 'Edit promotion', 'menu_name' => 'Promotions', 'all_items' => 'All promotions'],
        'public' => false, 'show_ui' => true, 'show_in_menu' => true,
        'show_in_rest' => false, 'supports' => ['title'],
        'menu_icon' => 'dashicons-megaphone', 'menu_position' => 21,
        'capability_type' => 'post', 'map_meta_cap' => true,
    ]);
}
add_action('init', 'htp_register');
add_filter('enter_title_here', function ($text, $post) { return $post->post_type === 'ht_promotion' ? 'Promotion headline (English)' : $text; }, 10, 2);
add_action('add_meta_boxes_ht_promotion', function () {
    add_meta_box('htp-details', 'Promotion content & placement', 'htp_metabox', 'ht_promotion', 'normal', 'high');
});
function htp_metabox($post) {
    wp_nonce_field('htp_save', 'htp_nonce');
    echo '<p>Publish to make a promotion eligible. Draft, disabled, future and expired promotions never appear. Leave dates empty for an ongoing promotion. All times are <strong>Singapore (UTC+8)</strong>. Chinese fields fall back to English.</p>';
    echo '<p>Use a landscape photo or artwork for the main image and optionally a portrait version for phones. Choose <strong>Show full artwork</strong> for posters so text is never cropped. Add a text description and button even when your image contains words.</p>';
    echo '<table class="form-table" role="presentation">';
    foreach (htp_fields() as $key => $field) {
        [$type, $label] = $field;
        $value = get_post_meta($post->ID, '_htp_' . $key, true);
        echo '<tr><th><label for="htp-' . esc_attr($key) . '">' . esc_html($label) . '</label></th><td>';
        $name = 'htp[' . $key . ']';
        if ($type === 'checkbox') {
            echo '<input type="checkbox" id="htp-' . esc_attr($key) . '" name="' . esc_attr($name) . '" value="1" ' . checked($value, '1', false) . '> <span>On</span>';
        } elseif ($type === 'textarea') {
            echo '<textarea class="large-text" rows="3" id="htp-' . esc_attr($key) . '" name="' . esc_attr($name) . '">' . esc_textarea($value) . '</textarea>';
        } elseif ($type === 'image') {
            echo '<div class="htp-media"><input type="hidden" id="htp-' . esc_attr($key) . '" name="' . esc_attr($name) . '" value="' . absint($value) . '"><div class="htp-media-preview">';
            if ($value) { echo wp_get_attachment_image((int)$value, 'medium', false, ['style' => 'max-width:300px;height:auto']); }
            echo '</div><button type="button" class="button htp-select-image">Choose image</button> <button type="button" class="button htp-remove-image">Remove image</button></div>';
        } elseif ($type === 'fit') {
            echo '<select id="htp-image_fit" name="' . esc_attr($name) . '"><option value="contain" ' . selected($value, 'contain', false) . '>Show full artwork (recommended for posters)</option><option value="cover" ' . selected($value, 'cover', false) . '>Fill image area (photos only; edges may crop)</option></select>';
        } else {
            echo '<input class="regular-text" type="' . esc_attr($type) . '" id="htp-' . esc_attr($key) . '" name="' . esc_attr($name) . '" value="' . esc_attr($value) . '"' . ($type === 'number' ? ' min="0" max="9999"' : '') . '>';
        }
        echo '</td></tr>';
    }
    echo '</table><p><strong>Tip:</strong> add another promotion to create a swipeable card row. Order applies to both placements. Turn off just the pop-up checkbox if you want the promotion to remain visible on the page.</p>';
}
function htp_date($value) {
    if (!$value) { return ''; }
    $date = DateTimeImmutable::createFromFormat('!Y-m-d\TH:i', $value, new DateTimeZone('Asia/Singapore'));
    return $date && $date->format('Y-m-d\TH:i') === $value ? $value : '';
}
function htp_timestamp($value) {
    if (!$value) { return null; }
    $valid = htp_date($value);
    return $valid ? (new DateTimeImmutable($valid, new DateTimeZone('Asia/Singapore')))->getTimestamp() : null;
}
function htp_save_meta($post_id, $input) {
    $clean = [];
    foreach (htp_fields() as $key => $field) {
        $value = isset($input[$key]) && is_scalar($input[$key]) ? (string)$input[$key] : '';
        switch ($field[0]) {
            case 'checkbox': $value = $value === '1' ? '1' : '0'; break;
            case 'image': $value = wp_attachment_is_image(absint($value)) ? absint($value) : 0; break;
            case 'number': $value = min(9999, absint($value)); break;
            case 'datetime-local': $value = htp_date($value); break;
            case 'url': $value = esc_url_raw($value, ['http', 'https']); break;
            case 'textarea': $value = sanitize_textarea_field($value); break;
            case 'fit': $value = $value === 'cover' ? 'cover' : 'contain'; break;
            default: $value = sanitize_text_field($value);
        }
        $clean[$key] = $value;
    }
    // Invalid windows are disabled rather than accidentally displaying indefinitely.
    $invalid_date = false;
    foreach (['start', 'end'] as $key) {
        if (!empty($input[$key]) && !$clean[$key]) { $invalid_date = true; }
    }
    if ($invalid_date || ($clean['start'] && $clean['end'] && $clean['end'] <= $clean['start'])) {
        $clean['enabled'] = '0';
        set_transient('htp_date_error_' . get_current_user_id(), 1, 60);
    }
    foreach ($clean as $key => $value) { update_post_meta($post_id, '_htp_' . $key, $value); }
}
add_action('save_post_ht_promotion', function ($id) {
    if (wp_is_post_autosave($id) || wp_is_post_revision($id) || !current_user_can('edit_post', $id)) { return; }
    if (!isset($_POST['htp_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['htp_nonce'])), 'htp_save')) { return; }
    htp_save_meta($id, isset($_POST['htp']) && is_array($_POST['htp']) ? wp_unslash($_POST['htp']) : []);
});
add_action('admin_notices', function () {
    if (get_transient('htp_date_error_' . get_current_user_id())) {
        delete_transient('htp_date_error_' . get_current_user_id());
        echo '<div class="notice notice-error"><p>Promotion disabled: enter valid dates and an end time later than the start time, then enable and save again.</p></div>';
    }
});
add_action('admin_enqueue_scripts', function () {
    $screen = get_current_screen();
    if (!$screen || $screen->post_type !== 'ht_promotion' || $screen->base !== 'post') { return; }
    wp_enqueue_media();
    wp_enqueue_script('htp-admin', plugins_url('admin.js', __FILE__), ['jquery', 'media-views'], '1.0.0', true);
});
add_action('admin_menu', function () {
    add_submenu_page('edit.php?post_type=ht_promotion', 'Promotion settings', 'Display settings', 'manage_options', 'htp-settings', 'htp_settings_page');
});
add_action('admin_init', function () {
    register_setting('htp', 'htp_settings', ['sanitize_callback' => function ($input) {
        $input = is_array($input) ? $input : [];
        return ['enabled' => empty($input['enabled']) ? 0 : 1, 'banner' => empty($input['banner']) ? 0 : 1, 'popup' => empty($input['popup']) ? 0 : 1,
            'delay' => max(0, min(60, (int)($input['delay'] ?? 8))),
            'cooldown' => max(1, min(720, (int)($input['cooldown'] ?? 24)))];
    }]);
});
function htp_settings_page() {
    if (!current_user_can('manage_options')) { return; }
    $settings = htp_settings();
    echo '<div class="wrap"><h1>Promotion display settings</h1><p>These switches apply to every promotion. You can also choose placements on each individual promotion.</p><form method="post" action="options.php">';
    settings_fields('htp');
    echo '<table class="form-table">';
    foreach (['enabled' => 'Enable promotions', 'banner' => 'Enable page promotion area', 'popup' => 'Enable pop-ups'] as $key => $label) {
        echo '<tr><th><label for="htp-setting-' . esc_attr($key) . '">' . esc_html($label) . '</label></th><td><input id="htp-setting-' . esc_attr($key) . '" type="checkbox" name="htp_settings[' . esc_attr($key) . ']" value="1" ' . checked($settings[$key], 1, false) . '></td></tr>';
    }
    foreach (['delay' => ['Pop-up delay (seconds)', 0, 60], 'cooldown' => ['Time between pop-ups (hours)', 1, 720]] as $key => $row) {
        echo '<tr><th><label for="htp-setting-' . esc_attr($key) . '">' . esc_html($row[0]) . '</label></th><td><input id="htp-setting-' . esc_attr($key) . '" type="number" min="' . $row[1] . '" max="' . $row[2] . '" name="htp_settings[' . esc_attr($key) . ']" value="' . esc_attr($settings[$key]) . '"></td></tr>';
    }
    echo '</table><p>Default: show after 8 seconds, at most once every 24 hours in the same browser. No automatic slide movement. Visitors can swipe, use the arrows, or dismiss the pop-up with Escape or the close button. If browser storage is blocked, frequency is limited only for the current page.</p>';
    submit_button(); echo '</form></div>';
}
function htp_state($post, $now = null) {
    $now = $now ?? time();
    if ($post->post_status !== 'publish') { return 'Draft'; }
    if (get_post_meta($post->ID, '_htp_enabled', true) !== '1') { return 'Off'; }
    $start = htp_timestamp(get_post_meta($post->ID, '_htp_start', true));
    $end = htp_timestamp(get_post_meta($post->ID, '_htp_end', true));
    if ($start !== null && $end !== null && $end <= $start) { return 'Invalid dates'; }
    if ($start !== null && $now < $start) { return 'Scheduled'; }
    if ($end !== null && $now >= $end) { return 'Expired'; }
    return 'Active';
}
add_filter('manage_ht_promotion_posts_columns', function ($columns) {
    $columns['htp_state'] = 'Status'; $columns['htp_placements'] = 'Placements'; $columns['htp_dates'] = 'Singapore time'; $columns['htp_order'] = 'Order'; return $columns;
});
add_action('manage_ht_promotion_posts_custom_column', function ($column, $id) {
    if ($column === 'htp_state') { echo esc_html(htp_state(get_post($id))); }
    if ($column === 'htp_order') { echo (int)get_post_meta($id, '_htp_order', true); }
    if ($column === 'htp_placements') {
        $places = [];
        foreach (['banner' => 'Page area', 'popup' => 'Pop-up'] as $key => $label) { if (get_post_meta($id, '_htp_' . $key, true) === '1') { $places[] = $label; } }
        echo esc_html(implode(', ', $places) ?: 'None');
    }
    if ($column === 'htp_dates') { echo esc_html((get_post_meta($id, '_htp_start', true) ?: 'Any time') . ' → ' . (get_post_meta($id, '_htp_end', true) ?: 'No end date')); }
}, 10, 2);
function htp_image($id) {
    if (!$id || !wp_attachment_is_image($id)) { return null; }
    $image = wp_get_attachment_image_src($id, 'large');
    if (!$image) { return null; }
    // Relative paths follow Hostinger's preview host and avoid production-domain redirects.
    $uploads = wp_get_upload_dir();
    $url = $image[0];
    if (strpos($url, $uploads['baseurl'] . '/') === 0) {
        $url = wp_parse_url($url, PHP_URL_PATH);
    }
    return ['src' => $url, 'width' => $image[1], 'height' => $image[2]];
}
function htp_feed($request) {
    $settings = htp_settings(); $now = time(); $items = [];
    if ($settings['enabled']) {
        $posts = get_posts(['post_type' => 'ht_promotion', 'post_status' => 'publish', 'numberposts' => -1, 'orderby' => 'ID', 'order' => 'ASC']);
        foreach ($posts as $post) {
            if (htp_state($post, $now) !== 'Active') { continue; }
            $meta = [];
            foreach (htp_fields() as $key => $_) { $meta[$key] = get_post_meta($post->ID, '_htp_' . $key, true); }
            $banner = (bool)$settings['banner'] && $meta['banner'] === '1';
            $popup = (bool)$settings['popup'] && $meta['popup'] === '1';
            if (!$banner && !$popup) { continue; }
            $zh = $request->get_param('lang') === 'zh';
            $text = function ($key) use ($meta, $zh) { return $zh && !empty($meta[$key . '_zh']) ? $meta[$key . '_zh'] : $meta[$key]; };
            $items[] = ['id' => $post->ID, 'title' => $zh && $meta['title_zh'] ? $meta['title_zh'] : $post->post_title,
                'summary' => $text('summary'), 'badge' => $text('badge'), 'alt' => $text('alt'),
                'button' => $text('button'), 'url' => $meta['url'], 'secondaryButton' => $text('secondary_button'), 'secondaryUrl' => $meta['secondary_url'],
                'image' => htp_image((int)$meta['image']), 'mobileImage' => htp_image((int)$meta['mobile_image']), 'imageFit' => $meta['image_fit'] === 'cover' ? 'cover' : 'contain',
                'banner' => $banner, 'popup' => $popup, 'order' => (int)$meta['order'], 'endsAt' => htp_timestamp($meta['end'])];
        }
        usort($items, function ($a, $b) { return ($a['order'] <=> $b['order']) ?: ($a['id'] <=> $b['id']); });
    }
    $response = new WP_REST_Response(['settings' => $settings, 'serverTime' => $now, 'promotions' => $items]);
    $response->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    $response->header('X-Robots-Tag', 'noindex');
    return $response;
}
add_action('rest_api_init', function () {
    register_rest_route('healthtinity/v1', '/promotions', ['methods' => 'GET', 'permission_callback' => '__return_true', 'callback' => 'htp_feed']);
});
register_activation_hook(__FILE__, function () {
    htp_register();
    add_option('htp_settings', htp_defaults());
    // Seed once, never recreate content after an editor deliberately deletes it.
    if (get_option('htp_seeded')) { return; }
    $id = wp_insert_post(['post_type' => 'ht_promotion', 'post_status' => 'publish', 'post_title' => 'New here? Your first 5 classes are $60.'], true);
    if (is_wp_error($id)) { return; }
    htp_save_meta($id, [
        'enabled' => '1', 'banner' => '1', 'popup' => '1', 'order' => '10', 'badge' => 'New members',
        'summary' => 'Download the HT Life app, grab the New Members Starter Pack and get $22 credit in your Healthtinity Wallet to use on your next purchase or a drop-in class.',
        'button' => 'Get the Starter Pack', 'url' => 'https://healthtinity.com/package',
        'secondary_button' => 'View schedule', 'secondary_url' => 'https://healthtinity.com/timetable',
        'title_zh' => '新朋友？前 5 堂课只需 $60。', 'badge_zh' => '新会员',
        'summary_zh' => '下载 HT Life 应用程序，购买新会员体验配套，即可获得 $22 额度存入 Healthtinity 钱包，可用于下次购买或单堂课程。',
        'button_zh' => '购买体验配套', 'secondary_button_zh' => '查看课表',
    ]);
    add_option('htp_seeded', 1);
});
