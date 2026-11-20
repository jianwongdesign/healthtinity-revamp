# Managing Healthtinity promotions

Open the new Healthtinity installation through Hostinger **WP Admin**, then choose
**Promotions** in the left menu. This controls the Hostinger staging design.
The existing production domain and GitHub Pages preview have not been updated.

## Add or change a promotion

1. Choose **Promotions → Add promotion**, or open an existing promotion.
2. Enter its English headline, short description and optional small label.
3. Choose a promotion image from the WordPress media library. A separate mobile
   image is optional. Add an image description for accessibility.
4. Use **Show full artwork** for posters with text. **Fill image area** is suitable
   for photographs where some cropping is acceptable.
5. Add a primary button label and full HTTPS link. A second button is optional.
6. Select **Enable this promotion** and choose the page area, pop-up, or both.
7. Enter optional start and end dates in **Singapore time (UTC+8)**. A blank start
   means immediately eligible; a blank end means no expiry. End time is exclusive.
8. Set display order: lower numbers appear first. Add optional Chinese copy;
   empty Chinese fields use English.
9. Publish or update. A draft, disabled, future or expired promotion stays hidden.

The promotion area is included once near the footer of every page. One promotion
uses a single card; multiple promotions gain smooth horizontal scrolling, swipe,
keyboard and arrow controls. Images are optional. The original article pages
and homepage article links remain; the What's new navigation item is removed.

## On/off controls

**Promotions → Display settings** contains the master switch, a separate switch
for the page area, and a separate switch for pop-ups. Each promotion also has its
own enable and placement switches.

Pop-ups currently appear after **8 seconds**, at most once every **24 hours** in
that browser. Both values are adjustable. Closing uses the close button, Escape,
or the backdrop. The site defers a pop-up while a visitor is editing a form or
using the mobile menu. If browser storage is blocked, frequency can only be
limited for the current page. There is no automatic slide movement.

Changes are fetched on page load and refreshed every minute while a page remains
open, so scheduling and disabling can take up to a minute for an existing visitor.
New page loads fetch the current state immediately. No eligible promotions means
no promotion area and no pop-up. If the feed is unavailable, promotions are hidden
rather than leaving a potentially expired offer visible.

For testing repeated pop-ups, use a fresh private browser session. The initial
Starter Pack promotion uses existing supplied copy and has no invented expiry.
Only this promotion is saved; additional QA cards were browser test fixtures.

## Implementation and maintenance

- Plugin: `wordpress/healthtinity-promotions/` → WordPress plugin folder of the same name.
- Shared placement: `src/layout.mjs`; behaviour: `src/assets/js/promotions.js`.
- Staging builds automatically use `/index.php?rest_route=/healthtinity/v1/promotions`.
- A production static build must explicitly set
  `PROMOTIONS_API=/index.php?rest_route=/healthtinity/v1/promotions` when building.
  Default GitHub Pages builds retain a static CTA; they do not call WordPress.
- Read-only public feed returns only published, enabled, date-eligible promotions.
  Editing remains in WordPress with capability and nonce checks.
- User content is rendered as text; URLs are restricted to HTTP/HTTPS; media
  fields accept WordPress image attachments. Feed responses use no-store.
- Integration checks: `tests/promotions-integration.php`, run with `wp eval-file`
  on staging only. It creates and removes temporary test promotions.
- Plugin deactivation preserves promotion records/settings. Do not deactivate
  the plugin unless you also intend to hide dynamic promotions on the design.

WordPress implementation references:
[custom endpoints](https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/)
and [meta boxes](https://developer.wordpress.org/reference/functions/add_meta_box/).
