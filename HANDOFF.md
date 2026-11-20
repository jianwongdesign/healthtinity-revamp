# Healthtinity Hostinger staging

## Current preview — 21 November 2026

- Public Hostinger URL found in Opera's logged-in Healthtinity dashboard:
  `https://welcome-lightsteelblue-mosquito-41.hostingersite.com/staging/`.
- Add `?promo=1` to show the eligible promotion pop-up immediately for review.
  Normal visits use the WordPress delay and cooldown. EN and ZH pop-ups verified
  over public HTTPS without DNS overrides.
- Staging SITE_URL now uses the HTTPS preview URL. Both Hostinger staging and
  GitHub Pages use the same live WordPress promotion feed; no saved promo snapshot.
- The Hostinger preview proxy rewrites URLs even in static HTML and JSON responses.
  Booking links now carry encoded original destinations, restored and validated
  in the browser. Media URLs resolve against the feed origin for GitHub Pages.
  Actual HTTPS checks confirmed booking CTAs still point to healthtinity.com.
- The previous statements below about an unknown preview URL / static-only
  GitHub CTA are historical and superseded by this update.
- Backup before this change:
  `/home/u146877548/healthtinity-backups/before-preview-popup-20261120-161413/files.tar.gz`.
- Domain cutover remains unperformed. Preview provider may expire the temporary
  domain; update the default preview feed URL when switching to production.


21 November correction: renamed remaining article-index titles, share titles and
article breadcrumbs from "What's new" / 最新动态 to "Articles" / 文章. The homepage
navigation was already clear. All 59 English/Chinese HTML outputs were scanned
with zero remaining old labels. Rebuilt and uploaded Hostinger staging; publish
the matching `docs/` correction to GitHub Pages. Articles remain at their URLs.

Latest action: user requested Git publication on 20 November 2026. Publish the
current `main` branch and rebuilt `docs/` to the existing GitHub Pages preview.
GitHub Pages shows the updated typography/navigation and static promotion CTA;
the live WordPress-managed promotion feed and pop-up operate on Hostinger staging.
Earlier "not pushed" notes below describe the state before this publication.

Verified 2026-11-20. The user authorized uploading the current design for staging;
domain cutover waits for design approval.

## Server and current state

- SSH: `ssh adcendes-hostinger` (saved alias: `u146877548@72.60.238.181:65002`).
- Key: `~/.ssh/hostinger_deploy`; never copy the private key into this repository.
- WordPress root: `/home/u146877548/domains/healthtinity.com/public_html`.
- Design preview: `public_html/staging/`. This is the existing static design,
  not a WordPress theme or WordPress-editable page conversion.
- Original WordPress files/options were not changed. Public DNS still resolved
  healthtinity.com to `3.0.109.119` during verification; no DNS changes were made.
- Pre-upload backup outside the web root:
  `/home/u146877548/healthtinity-backups/before-staging-20261120-100525/`
  contains `wordpress-files.tar.gz` and `wordpress.sql` (private permissions).
  WP-CLI database export required `php -d disable_functions= /usr/local/bin/wp db export ...`
  because the default CLI PHP configuration disables process functions. No PHP
  configuration file was changed.

## Build and upload

Staging output is ignored by Git and separate from GitHub Pages `docs/`:

```sh
STAGING=1 BASE=/staging/ SITE_URL=https://welcome-lightsteelblue-mosquito-41.hostingersite.com/staging/ node scripts/build.mjs
rsync -az -e 'ssh -o BatchMode=yes -o ConnectTimeout=12' .staging-build/ adcendes-hostinger:/home/u146877548/domains/healthtinity.com/public_html/staging/
```

The current SITE_URL is a provisional server-test origin. Once the user provides
the actual Hostinger Preview URL, set SITE_URL to its staging URL, rebuild, and
upload again. Confirm BASE against that preview's path structure. Do not use
the production hostname as a publicly reachable staging link before DNS cutover.

Staging HTML includes robots noindex/nofollow/noarchive. Its `.htaccess` disables
directory listings, sets the matching X-Robots-Tag header and Cache-Control
no-store, and handles static 404s. These discourage indexing; they are not
password protection. Booking buttons still target the existing public booking
site. The booking destination must be confirmed before a future domain cutover.

## Verification and next step

- 59 HTML pages built (English and Chinese).
- All 98 non-hidden files fetched from the Hostinger IP with Host healthtinity.com:
  HTTP 200, byte-identical to local build, and noindex response headers.
- Internal staging file links resolved with no missing targets.
- Hostinger Preview URL requested from the user; not received yet.
- Shareable HTTPS preview verification remains pending that URL. Local responsive
  browser checks passed at 1440, 820 and 390 px after the typography update.
  Do not claim the public preview URL is verified yet.
- No Git commit or push performed during staging setup.

Example direct server check without modifying DNS:

```sh
curl --resolve healthtinity.com:80:72.60.238.181 -I http://healthtinity.com/staging/
```

## Client typography revision — 20 November 2026

- Client rejected rounded fonts and asked for a more professional appearance.
- Replaced Nunito/Nunito Sans and handwritten Caveat with IBM Plex Sans headings,
  navigation and labels, plus Source Sans 3 body text. Reduced heavy 800/900
  weights to 600/700 and allowed longer image labels to wrap on mobile.
- Updated both language styles, rebuilt `docs/` and uploaded `.staging-build/`.
- Before-update staging backup:
  `/home/u146877548/healthtinity-backups/before-font-update-20261120-142503/staging.tar.gz`.
- Checked nine representative routes at desktop, tablet and mobile widths with
  actual fonts loaded: no horizontal overflow or broken images. Inspected home
  screenshots at all three widths; mobile image labels have no clipped text.
- Verified all 59 deployed HTML pages and CSS against local file hashes, with
  HTTP 200 and noindex headers. GitHub Pages has not been pushed/updated.

## WordPress promotion system — 20 November 2026

- Installed and activated `healthtinity-promotions` on the new Hostinger WordPress
  site. Source is in `wordpress/healthtinity-promotions/`; editor instructions are
  in `PROMOTIONS.md`. This is the first WordPress-managed part of the static design.
- Admin menu **Promotions** manages images (including mobile artwork), headline,
  description, optional Chinese fields, two CTA links, schedule in Singapore time,
  display order and individual enable/banner/pop-up switches. Display settings
  provides master and placement switches, pop-up delay and cooldown.
- Seeded the existing Starter Pack as promotion ID 5, enabled for both placements.
  Defaults: 8-second popup delay, 24-hour visitor cooldown, no expiration date.
- Removed What's new from desktop/mobile/footer navigation. Articles and homepage
  article links remain. Moved the managed promotion area to the shared layout;
  every one of 59 built pages has exactly one placement, including legal/contact.
- Multiple promotions use native horizontal scrolling with smooth arrows, swipe,
  keyboard navigation and reduced-motion support. Native dialog provides modal
  focus handling, Escape/close/backdrop dismissal, sticky close controls, and
  optional image layouts. Storage is used only for local popup frequency.
- Feed is read-only, same-origin, no-store. It filters unpublished, disabled,
  future and expired items server-side. Existing open pages refresh every minute.
  No eligible items / API failure hides the area; no stale static offer fallback.
- Backup before installation:
  `/home/u146877548/healthtinity-backups/before-promotions-20261120-145526/`
  contains the previous staging files and WordPress SQL export.
- Validation: 20 WordPress integration assertions passed (dates and UTC+8
  boundaries, statuses, placements, global toggles, sanitization, ordering,
  Chinese fallback, rejected unauthenticated writes and valid admin saves).
  Browser fixtures verified multiple cards, image/mobile variants, keyboard/arrow
  scrolling, empty/off states, popup close and cooldown at 1440/820/390 px.
- Browser verification against the actual Hostinger IP, with an isolated test
  request route for the Host header, passed on seven EN/ZH routes at all three
  widths. Live popup appeared after 8 seconds. No OS DNS/hosts changes were made.
  All 99 served static files match local hashes and carry noindex headers;
  Chinese feed returns the sole real promotion and POST to the feed is rejected.
- Public Hostinger Preview URL remains unknown; these direct-server tests do not
  prove a shareable HTTPS preview. GitHub Pages has not been pushed; production
  DNS remains unchanged. At launch explicitly pass PROMOTIONS_API to the build
  and confirm all booking links before domain cutover.
