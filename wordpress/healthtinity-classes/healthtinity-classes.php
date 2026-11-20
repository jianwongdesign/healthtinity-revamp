<?php
/**
 * Plugin Name: Healthtinity Classes
 * Description: Bilingual introductions and class types for the five Healthtinity class pages.
 * Version: 1.0.0
 */
if (!defined('ABSPATH')) { exit; }

function htc_defaults() {
    static $data;
    if ($data === null) {
        $rows = json_decode(file_get_contents(__DIR__ . '/defaults.json'), true);
        $data = array_column($rows, null, 'slug');
    }
    return $data;
}
function htc_content($slug) {
    $defaults = htc_defaults();
    if (!isset($defaults[$slug])) { return null; }
    return array_merge($defaults[$slug], get_option('htc_' . $slug, []));
}
register_activation_hook(__FILE__, function () {
    foreach (htc_defaults() as $slug => $data) { add_option('htc_' . $slug, $data, '', false); }
});
function htc_clean($input) {
    $input = is_array($input) ? $input : [];
    $clean = [];
    foreach (['intro', 'intro_zh', 'expect', 'expect_zh', 'image_alt', 'image_alt_zh'] as $key) {
        $value = isset($input[$key]) && is_scalar($input[$key]) ? (string)$input[$key] : '';
        $clean[$key] = sanitize_textarea_field($value);
    }
    $id = isset($input['image_id']) && is_scalar($input['image_id']) ? absint($input['image_id']) : 0;
    $clean['image_id'] = $id && wp_attachment_is_image($id) ? $id : 0;
    $clean['types'] = [];
    foreach (array_slice(is_array($input['types'] ?? null) ? $input['types'] : [], 0, 40) as $type) {
        if (!is_array($type)) { continue; }
        $row = [];
        foreach (['name', 'name_zh', 'description', 'description_zh', 'level', 'level_zh', 'duration', 'duration_zh'] as $key) {
            $value = isset($type[$key]) && is_scalar($type[$key]) ? (string)$type[$key] : '';
            $row[$key] = str_starts_with($key, 'description') ? sanitize_textarea_field($value) : sanitize_text_field($value);
        }
        if ($row['name'] !== '') { $clean['types'][] = $row; }
    }
    return $clean;
}
function htc_store($slug, $input, $nonce) {
    if (!current_user_can('edit_pages')) { return new WP_Error('forbidden', 'You cannot edit class pages.'); }
    if (!isset(htc_defaults()[$slug])) { return new WP_Error('invalid_class', 'Unknown class page.'); }
    if (!wp_verify_nonce($nonce, 'htc_save_' . $slug)) { return new WP_Error('invalid_nonce', 'The editing session expired. Reload and try again.'); }
    update_option('htc_' . $slug, htc_clean($input), false);
    return true;
}
add_action('admin_post_htc_save', function () {
    $slug = isset($_POST['class']) && is_string($_POST['class']) ? sanitize_key(wp_unslash($_POST['class'])) : '';
    $nonce = isset($_POST['_wpnonce']) && is_string($_POST['_wpnonce']) ? sanitize_text_field(wp_unslash($_POST['_wpnonce'])) : '';
    $input = isset($_POST['htc']) && is_array($_POST['htc']) ? wp_unslash($_POST['htc']) : [];
    $result = htc_store($slug, $input, $nonce);
    if (is_wp_error($result)) { wp_die(esc_html($result->get_error_message()), '', ['response' => 403]); }
    wp_safe_redirect(add_query_arg(['page' => 'ht-classes', 'class' => $slug, 'updated' => 1], admin_url('admin.php')));
    exit;
});
add_action('admin_menu', function () {
    add_menu_page('Classes', 'Classes', 'edit_pages', 'ht-classes', 'htc_admin', 'dashicons-universal-access', 22);
});
add_action('admin_enqueue_scripts', function ($hook) {
    if ($hook !== 'toplevel_page_ht-classes') { return; }
    wp_enqueue_media();
    wp_enqueue_script('htc-admin', plugins_url('admin.js', __FILE__), ['media-views'], '1.0.0', true);
    wp_enqueue_style('htc-admin', plugins_url('admin.css', __FILE__), [], '1.0.0');
});
function htc_field($key, $label, $value, $multiline = false, $prefix = 'htc', $placeholder = '') {
    $id = sanitize_html_class($prefix . '-' . $key);
    echo '<label class="htc-field" for="' . esc_attr($id) . '"><strong>' . esc_html($label) . '</strong>';
    $attrs = ' id="' . esc_attr($id) . '" name="' . esc_attr($prefix . '[' . $key . ']') . '" placeholder="' . esc_attr($placeholder) . '"';
    if ($multiline) { echo '<textarea rows="4"' . $attrs . '>' . esc_textarea($value) . '</textarea>'; }
    else { echo '<input type="text"' . $attrs . ' value="' . esc_attr($value) . '">'; }
    echo '</label>';
}
function htc_type_fields($row, $index) {
    echo '<fieldset class="htc-type"><legend>Class type</legend><div class="htc-columns">';
    foreach (['name' => 'Name (English)', 'name_zh' => 'Name (Chinese, optional)', 'description' => 'Description (English)', 'description_zh' => 'Description (Chinese, optional)', 'level' => 'Level / suitable for (English)', 'level_zh' => 'Level / suitable for (Chinese)', 'duration' => 'Duration (English)', 'duration_zh' => 'Duration (Chinese)'] as $key => $label) {
        htc_field($key, $label, $row[$key] ?? '', str_starts_with($key, 'description'), 'htc[types][' . $index . ']', str_starts_with($key, 'description') ? 'Describe the class, its focus and what participants can expect.' : '');
    }
    echo '</div><p><button type="button" class="button" data-htc-up>Move up</button> <button type="button" class="button" data-htc-down>Move down</button> <button type="button" class="button" data-htc-remove>Remove type</button></p></fieldset>';
}
function htc_admin() {
    if (!current_user_can('edit_pages')) { return; }
    $slug = isset($_GET['class']) && is_string($_GET['class']) ? sanitize_key(wp_unslash($_GET['class'])) : 'yoga';
    $data = htc_content($slug);
    if (!$data) { $slug = 'yoga'; $data = htc_content($slug); }
    echo '<div class="wrap htc-admin"><h1>Classes</h1><p>Edit the five class introductions and their class types. Saving publishes the content to both website previews on the next page load. Chinese fields fall back to English when blank.</p><nav class="nav-tab-wrapper" aria-label="Class pages">';
    foreach (htc_defaults() as $key => $item) {
        echo '<a class="nav-tab' . ($key === $slug ? ' nav-tab-active' : '') . '" href="' . esc_url(add_query_arg(['page' => 'ht-classes', 'class' => $key], admin_url('admin.php'))) . '">' . esc_html($item['title']) . '</a>';
    }
    echo '</nav>';
    if (isset($_GET['updated'])) { echo '<div class="notice notice-success"><p>Class content saved.</p></div>'; }
    echo '<h2>' . esc_html($data['title']) . '</h2><p><a class="button" target="_blank" rel="noopener" href="' . esc_url(home_url('/staging/classes/' . $slug . '/')) . '">View English page</a> <a class="button" target="_blank" rel="noopener" href="' . esc_url(home_url('/staging/zh/classes/' . $slug . '/')) . '">View Chinese page</a></p>';
    echo '<form method="post" action="' . esc_url(admin_url('admin-post.php')) . '"><input type="hidden" name="action" value="htc_save"><input type="hidden" name="class" value="' . esc_attr($slug) . '">';
    wp_nonce_field('htc_save_' . $slug);
    echo '<h2>Introduction</h2><div class="htc-columns">';
    foreach (['intro' => 'Introduction (English)', 'intro_zh' => 'Introduction (Chinese)', 'expect' => 'What to expect (English, optional)', 'expect_zh' => 'What to expect (Chinese, optional)'] as $key => $label) { htc_field($key, $label, $data[$key], true); }
    echo '</div><h2>Page photo</h2><p>Optional: replace the existing class photo. Removing your selection restores the original photo.</p><div data-htc-media><input type="hidden" name="htc[image_id]" value="' . absint($data['image_id']) . '"><div data-htc-preview>';
    if ($data['image_id']) { echo wp_get_attachment_image($data['image_id'], 'medium'); }
    echo '</div><p><button type="button" class="button" data-htc-image>Choose image</button> <button type="button" class="button" data-htc-reset>Use original photo</button></p></div><div class="htc-columns">';
    htc_field('image_alt', 'Photo description (English)', $data['image_alt']); htc_field('image_alt_zh', 'Photo description (Chinese)', $data['image_alt_zh']);
    echo '</div><h2>Class types</h2><p>Existing class names are prepared below. Fill in their descriptions, level and duration. Empty details are omitted from the website; a short contact invitation appears until a description is supplied. You can add up to 40 types. A type needs an English name to be saved.</p><div data-htc-types>';
    foreach ($data['types'] as $index => $row) { htc_type_fields($row, $index); }
    echo '</div><template id="htc-type-template">'; htc_type_fields([], '__INDEX__'); echo '</template><p><button type="button" class="button" data-htc-add>Add class type</button></p>';
    submit_button('Save class page');
    echo '<p data-htc-status role="status"></p></form></div>';
}
function htc_payload($slug, $lang = 'en') {
    $data = htc_content($slug);
    if (!$data) { return new WP_Error('not_found', 'Class page not found.', ['status' => 404]); }
    $pick = function ($row, $key) use ($lang) { return $lang === 'zh' && !empty($row[$key . '_zh']) ? $row[$key . '_zh'] : ($row[$key] ?? ''); };
    $image = null;
    if ($data['image_id'] && wp_attachment_is_image($data['image_id'])) {
        $src = wp_get_attachment_image_src($data['image_id'], 'large');
        if ($src) { $image = ['src' => wp_make_link_relative($src[0]), 'alt' => $pick($data, 'image_alt') ?: $pick($data, 'title')]; }
    }
    return ['slug' => $slug, 'intro' => $pick($data, 'intro'), 'expect' => $pick($data, 'expect'), 'image' => $image,
        'types' => array_map(function ($row) use ($pick) { return ['name' => $pick($row, 'name'), 'description' => $pick($row, 'description'), 'level' => $pick($row, 'level'), 'duration' => $pick($row, 'duration')]; }, $data['types'])];
}
add_action('rest_api_init', function () {
    register_rest_route('healthtinity/v1', '/classes/(?P<slug>[a-z0-9-]+)', [
        'methods' => 'GET', 'permission_callback' => '__return_true',
        'callback' => function ($request) {
            $data = htc_payload($request['slug'], $request->get_param('lang') === 'zh' ? 'zh' : 'en');
            if (is_wp_error($data)) { return $data; }
            $response = new WP_REST_Response($data);
            $response->header('Cache-Control', 'no-store, max-age=0');
            return $response;
        },
    ]);
});
