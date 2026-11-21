# Healthtinity Hostinger staging

## Chinese homepage wording — 21 November 2026

- Replaced the literal hero headline with “用心指导，陪您一起进步。” and
  smoothed the supporting introduction, enquiry message and homepage section
  headings. Used “WhatsApp 咨询” consistently for enquiry buttons.
- Updated Chinese share metadata and the shared visit/FAQ wording. English copy,
  class names, prices and programme facts are unchanged. This is a homepage and
  related UI copy pass, not a complete review of all Chinese articles or bios.
- Checked the revised hero at 320/390/820/1440px with no horizontal overflow;
  visually reviewed phone and desktop. Both languages retain five class options.
- Backup: `/home/u146877548/healthtinity-backups/before-zh-copy-i9DPJM/staging.tar.gz`.

## Homepage hero class labels — 21 November 2026

- Hero photo reel and yellow scrolling strip now use only the five main options:
  Yoga, Mat Pilates, Therapy & Stretch, Tone & Sculpt and Private 1:1, in EN/ZH.
  Removed the extra Yoga Rehab, Hot Yoga and Osteopathy-informed category labels.
- Photo cards link directly to their corresponding class introduction pages.
  Repeated cards/strip labels remain solely for the existing seamless animation.
- Checked both languages at 390/820/1440px; five unique categories, images loaded,
  and no page overflow. Existing hero layout and introductory copy are preserved.
- Backup: `/home/u146877548/healthtinity-backups/before-hero-five-41R52B/staging.tar.gz`.

## Academy page — 21 November 2026

- Added Academy immediately after Contact Us in desktop/mobile navigation and in
  the footer. English `/academy/` and Chinese `/zh/academy/` introduce yoga
  instructor training with a clear course-details-coming-soon state.
- Client content is pending. `src/academy.mjs` owns the page and records the
  content to request: overview, syllabus, requirements, trainers, dates/duration,
  fees, confirmed accreditation, application process and FAQs. This page is
  currently a static template, not a WordPress admin editor.
- Training-specific WhatsApp enquiry and Contact Us buttons work now; no course
  hours, fees, certification or intake dates have been invented.
- Built 73 HTML files. Checked EN/ZH at 320/390/820/1180/1280/1440px with no page
  overflow or header overlap, including the active mobile Academy link.
- Backup: `/home/u146877548/healthtinity-backups/before-academy-20261121/staging.tar.gz`.

## Spacing, contact icons and preview email — 21 November 2026

- Tightened shared section padding to 56px mobile / 72px desktop; compact sections
  use 40px and sections immediately below page heroes use 32px. Fixed the cascade
  that previously replaced compact desktop spacing with 112px padding.
- Reduced page-header padding, large column gaps, team/pricing/article spacing,
  form padding, promotion spacing and footer gaps. Full-width hero text stays
  uncapped as requested. Contact header height fell from about 387px to 311px
  at 1440px; the following gap fell from 112px to 32px.
- Scoped contact-card subtitle colour so it no longer overrides icon colours.
  WhatsApp now displays white on green; contact icons use 24px SVGs.
- Hostinger was rewriting displayed emails, mailto URLs and the form recipient
  to the temporary domain. Build output now encodes the actual email in HTML
  entities and JSON Unicode escapes, preserving `ask@healthtinity.com` without
  relying on client-side JavaScript. Live EN/ZH contact links, form recipients
  and homepage structured data verified. Form handoff tested with window.open
  intercepted; no messages sent.
- Checked all 69 content pages at 320/390/820/1440px: no text overflow or section
  padding beyond the intended scale. Visually checked home, contact, classes,
  pricing, team and About Us layouts.
- Backup: `/home/u146877548/healthtinity-backups/before-spacing-icons-20261121-044835/staging.tar.gz`.

## Combined Contact Us page — 21 November 2026

- Merged the location map, address, MRT/bus/parking information and directions
  into `contact-us/#visit`, below the existing enquiry form. Hero shortcuts jump
  to the form or map. English and Chinese versions share the same structure.
- Desktop/mobile/footer navigation now has one Contact Us link. Old `location/`
  and `zh/location/` paths are lightweight static redirects to the matching
  language's Contact Us map section (with canonical links and a no-JS fallback).
- Site still builds 71 HTML files: 69 content pages and two redirect aliases.
  Checked form/map presence, anchor targets and legacy redirects; EN/ZH text fits
  at 320/390/820/1440 px. The Google Maps embed loaded successfully in Chromium.
- Backup: `/home/u146877548/healthtinity-backups/before-contact-merge-20261121-013510/staging.tar.gz`.

## Homepage team section and About Us — 21 November 2026

- Removed the homepage founder portrait, rehabilitation checklist and therapist
  buttons. Replaced them with a group collage of the existing 15 instructor
  portraits, plus Xenia Na's named initials placeholder (no photo on file).
- Added About Us and Meet the Instructors buttons. Created bilingual `about-us/`
  pages using existing studio facts and added the About Us footer link.
- An official instructor group photograph can replace the portrait collage later;
  no synthetic instructor faces were generated. The group visual is HTML/CSS.
- Built 71 pages. Checked EN/ZH homepage and About Us at 320/390/820/1440 px,
  all portraits loaded and no text overflow. The earlier header-width correction
  remains included in this deployment.
- Backup: `/home/u146877548/healthtinity-backups/before-team-section-20261120-173322/staging.tar.gz`.

## Header text width correction — 21 November 2026

- User clarified that premature wrapping meant unused width inside the blue
  headers, not merely overflow. Removed the 18ch heading / 60ch introduction caps
  from shared page heroes and the 48ch introduction cap from class heroes.
  Page-hero headings now use normal wrapping instead of balanced short lines.
- Measured five representative EN/ZH routes at 320, 390, 820, 1327 and 1440 px:
  introductions use the entire parent content width, with no page overflow.
  Team intro now spans 1112 px on desktop, matching the panel's inner width.
- Backup: `/home/u146877548/healthtinity-backups/before-hero-width-20261120-173108/staging.tar.gz`.

## Classes navigation and editable pages — 21 November 2026

- Added Classes immediately after Home: Yoga, Mat Pilates, Therapy & Stretch,
  Tone & Sculpt and Private 1:1. Each has an EN/ZH introduction page and editable
  class types; the site now builds 69 HTML pages.
- Homepage cards, Private 1:1 panel, footer and mobile navigation link to the
  pages. Category switch links, filtered schedules and enquiries connect them.
- Installed `healthtinity-classes`. WordPress admin → Classes edits introductions,
  optional expectations/photos, and ordered type names/descriptions/levels/durations.
  See `CLASSES.md` for client steps and the static fallback limitation.
- 20 integration checks passed; authorized save/read and Chinese fallback verified.
  Browser checked 69 pages at seven widths with no text-width failures. Editor
  add/reorder/remove tested against a private rendered admin fixture; menu keyboard
  and short-screen scrolling checked. Media picker uses WordPress's native library.
- Backup: `/home/u146877548/healthtinity-backups/before-classes-20261120-172223/`.
  Production DNS and the root WordPress theme remain unchanged.

## Text width review — 21 November 2026

- Fixed narrow-screen header crowding, coach-card overflow, membership heading
  punctuation, pricing tabs and timetable time columns. Buttons can wrap within
  their available width; grid/form children can shrink without stretching cards.
- Checked all 59 English/Chinese pages in Chromium at 320, 390, 768, 900, 1024,
  1180 and 1440 px with fonts loaded. Opened FAQ answers and exposed all schedule
  days for measurement: no text/container or page-width overflow detected.
  Intentional horizontal carousels and decorative rotations are excluded.
- Visually checked phone header/coaches/memberships/timetable, tablet Chinese
  content, desktop contact form and promotion placement. Physical devices and
  other browser engines were not tested in this pass.
- Pre-upload backup:
  `/home/u146877548/healthtinity-backups/before-text-width-20261120-171057/staging.tar.gz`.
- Deployment target remains the Hostinger `/staging/` preview; production DNS and
  the WordPress root are unchanged.

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
