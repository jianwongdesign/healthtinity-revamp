# Healthtinity pre-migration review — 24 November 2026

**Decision: HOLD the main-domain migration.** The staging layout is in good shape, but booking handoff, production deployment and content gaps remain. Reviewed source: `ea112ff`. This report supersedes older claims that booking/checkout was ready.

Reviewed site: https://welcome-lightsteelblue-mosquito-41.hostingersite.com/staging/

No DNS, Rezerv settings, prices, customer data or live website files were changed during this audit. No messages, purchases or bookings were submitted.

## Confirmed checks

| Check | Result and practical limit |
| --- | --- |
| Public HTML | 77 routes retrieved successfully, including redirects and 404 document. No missing internal destinations or fragment targets found in parsed HTML. |
| Metadata | Content pages have one H1, description and canonical; all generated HTML retains staging noindex. This is not production SEO sign-off. |
| Assets | 37 unique same-origin image/script/stylesheet/icon URLs checked successfully. This does not include every external resource or srcset variant. |
| Responsive geometry | 74 content routes × 320, 820 and 1440px = 222 checks. No document horizontal overflow, visible button clipping, completed broken-image errors or page JavaScript exceptions detected. Chromium, not physical-device testing or full visual sign-off. |
| Mobile controls | EN/ZH menu opens/closes; eight carousel tracks advance on Home, Packages, Memberships, Corporate Wellness and Academy. Mat Pilates selector updates its detail card. All seven FAQs expand. Saturday schedule tab selects its panel. |
| Contact / Academy forms | EN/ZH reject empty required fields. Corporate subject and Academy course preselection work. Intercepted window.open locally to inspect generated WhatsApp/email messages without sending: correct business number and email. Forms do not save leads or send server-side email. |
| Map | Contact map visibly renders the location pin; Google Maps embed loaded. |
| Promotions | Live WordPress feed loads; forced review popup opens and closes with Escape. Normal delay/cooldown and every admin save scenario were not retested. |
| Apps | Apple App Store and Google Play both return HTTP 200 and contain HT Life. |
| Live booking display | Schedule, packages and memberships render actual Rezerv data. Package/membership iframe content fits the 390px phone view. Timetable includes real booking-closed/waitlist states. These are live; `/timetable/` remains a static typical-week overview. |

## Must resolve before switching the main domain

| Priority | Finding / evidence | Owner and required result |
| --- | --- | --- |
| P0 | `book.healthtinity.com` still fails TLS hostname validation. It resolves through `shops.rezerv.co`; current main/www remain on Rezerv at 3.0.109.119. | Rezerv/domain owner: provision correct certificate, verify domain/primary redirects, member access and return paths before moving main/www. |
| P0 | Three public package Buy Now tests (5 Group Classes, 15 Class Pack, 35 + 10 Class Pack) open a package deep link but settle at `https://healthtinity.com/home`, not checkout or a verified selected-item login flow. Repeated after waiting for the destination to render. | Developer + Rezerv: repair/confirm hosted handoff; verify selected package survives login. Then authorised member tests booking/payment, confirmation and credits. No paid transaction has been tested. |
| P1 | Starter Pack marketing promises 5 classes for S$60, but its buttons route to the public packages widget, which currently shows 5 classes for S$150 and no S$60 Starter Pack. Existing production copy directs new members to the app. This is a purchase-path mismatch, not evidence the S$60 offer is invalid. | Client + developer: confirm app-only/new-member eligibility and route Starter Pack buttons to the approved purchase/download path. Verify the S$22 wallet benefit in the app. |
| P1 | Hostinger WordPress root still uses `twentytwentyfive`. Active custom plugins are Classes and Promotions; only listed WP page is draft Privacy Policy. The redesigned site remains static files in `/staging/`. | Developer: complete agreed production deployment. If full WordPress editability is the deliverable, build the theme/content integration first. Marketing prices and Academy are not client-editable in WP. |
| P1 | Production build/routing is not prepared or verified. Default BOOKING_URL still points to the main domain. Default non-staging API URLs depend on the temporary Hostinger hostname. No generated static sitemap; current root sitemap is WordPress's, not the 74 design routes. Root robots currently disallows Googlebot. | Developer: set final BASE/SITE_URL/BOOKING_URL and permanent class/promotion endpoints; add production sitemap and legacy redirects, correct indexing/canonicals/hreflang, verify 404 behaviour. Keep staging excluded. Do not copy staging noindex rules into production. |
| P1 | Full member login/payment/booking test, physical iPhone Safari check, current content approval and launch rollback verification remain open. | Client/member + developer: controlled end-to-end test and final sign-off. Back up files and WP database; preserve existing Google Workspace MX/TXT/email records. DNS authority remains Wix ns6/ns7. |

## Content and feature gaps

| Item | Fresh evidence / action |
| --- | --- |
| Class detail copy | All 28 saved class types have empty description, level and duration: Yoga 14, Mat Pilates 4, Therapy 4, Tone & Sculpt 3, Private 1:1 3. The UI falls back to an enquiry invitation. Client must supply approved details; no invented claims. |
| Marketing pricing sync | Existing marketed package prices S$420/650/990/1,328 and shown recurring membership rates match the observed widget. Live upfront membership also has 8+4 months at S$1,999, absent from static membership cards. Agree whether to include it. Static prices do not auto-sync from Rezerv. |
| Typical schedule drift | Static Saturday 11:45 lists Yoga Foundation / Ben Ting; live 28 Nov lists Posture Reset & Mobility / Mary Low. Static Sunday 13:00 lists Core Flow / Mary Low; live 29 Nov lists Mat Pilates / Stacey Wong. Variations may be intentional, but the page says “This week” and the homepage uses this same static data. Reconcile labels/data with the live schedule before launch. |
| Academy | Current intake dates, fees, duration, instructors, prerequisites and accreditation still need client confirmation. Historical fee labels are preserved. |
| Corporate Wellness | Confirm S$30/person minimum 15, from S$20/person at 30+, inclusions, duration and venue/quote terms from handwritten notes. |
| Original content requests | Replacement logo, official group photo, approved testimonials and WhatsApp community invitation remain outstanding in the project register. Video was optional; decide if required. Direct WhatsApp chat is not the community feature. |
| Team | Xenia still has initials/no photograph. Xenia and Ariel bios remain very short. Cindy Tan and Ethan Lim appear in schedules but are absent from the 16-profile team directory; client should confirm desired coverage. |
| Contact consistency | T&C contains +6582822665 while site contact is +6582829515. The privacy DPO section names the role without a specific DPO contact. Client to confirm these details; no legal wording was rewritten in this audit. |
| Review / measurement | Fluent Chinese review and real iPhone Safari testing remain open. Search Console/analytics ownership and launch measurement must be agreed/verified; widget GA is disabled. |

## Third-party and audit limitations

- Rezerv iframe documents still return/log 404 responses while their client application visibly renders the catalogue. Record with Rezerv alongside the handoff problem; a visible catalogue does not prove checkout success.
- Automated geometry sweep excluded the booking iframe to keep the site-shell check separate; booking widgets were inspected separately in the browser.
- No actual customer login, payment, credit allocation, booking confirmation, app purchase, server-side email delivery or social-account ownership test was performed.
- Site changes were not deployed during this review. Evidence files: `readiness-http-2026-11-24.json` and `readiness-layout-2026-11-24.json`.

## Junior verification order

1. Resolve booking SSL and hosted handoff, then verify the S$60 Starter Pack path.
2. Complete the agreed production/WordPress editing scope and permanent URL configuration.
3. Obtain/reconcile class copy, offers, schedule, Academy and contact details.
4. Review EN/ZH and iPhone Safari; authorised member completes end-to-end transaction test.
5. Prepare backup/rollback, redirects and production SEO; obtain launch instruction, then cut over and repeat critical public checks.

Reviewer: __________________  Date: __________________
Open P0 items resolved: __________________
Client content/design approval: __________________
Launch owner approval: __________________
