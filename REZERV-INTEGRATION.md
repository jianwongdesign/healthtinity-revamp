# Rezerv booking integration — 21 November 2026

## Booking domain preparation — 22 November 2026

- Further diagnosis after the user reported the booking error: an SNI TLS
  handshake for `book.healthtinity.com` returns a Let's Encrypt certificate whose
  only SAN is `mygym.rezeve.com` (valid 30 September–29 December 2026). The
  certificate is for the wrong hostname, rather than expired. In contrast,
  `www.healthtinity.com` presents its matching certificate and returns HTTP 200.
  Rezerv admin still shows `www` as primary and `book` Connected as secondary.
  No certificate-management control is exposed on that Domains page. Rezerv
  needs to provision/attach the matching certificate; pending provisioning
  versus a configuration fault is not yet established. No DNS changes needed
  based on these checks, and no provider support message has been sent.
- Follow-up after the user saved Wix DNS: both Wix authoritative servers and
  Cloudflare/Google resolvers return `book.healthtinity.com CNAME shops.rezerv.co.`.
  Retried verification in Rezerv; the domain now shows **Connected**.
- Verification automatically promoted `book.healthtinity.com` to primary. HTTPS
  still failed hostname validation (curl error 60), so restored the original
  `www.healthtinity.com` primary and verified that state after a page reload.
  The new booking domain remains Connected as a secondary domain. The current
  `www` site responds HTTP 200 with valid TLS. Do not change booking links or
  switch production until the new hostname has a valid certificate and is tested.
- The points below record the earlier preparation steps, before DNS was saved.

- Added `book.healthtinity.com` through **Online Store > Domains > Connect
  Existing Domain** in the user's Rezerv account. Read-back shows **Not Connected**.
- Existing `www.healthtinity.com` remains the connected primary domain;
  `healthtinity.com` remains connected. Primary-domain redirection is unchanged.
- The connection check gives the required CNAME destination `shops.rezerv.co.`.
  Its generic Name column says `www`; for the requested booking subdomain in
  Wix's `healthtinity.com` zone, add host `book`, not a replacement for `www`.
- DNS authority verified as `ns7.wixdns.net` / `ns6.wixdns.net`. The existing
  `www` CNAME points to `shops.rezerv.co`; no `book` CNAME was present at check.
- Opened `https://manage.wix.com/account/domains` in Chrome; Wix requires login.
  Awaiting user login or self-service DNS addition. No DNS record changed.
- After DNS propagation, retry Rezerv verification and inspect TLS/redirects.
  Do not switch the primary domain or deploy a new `BOOKING_URL` until tested.

## Published staging

- English: https://welcome-lightsteelblue-mosquito-41.hostingersite.com/staging/book/
- Chinese: https://welcome-lightsteelblue-mosquito-41.hostingersite.com/staging/zh/book/
- Choose `?view=timetable`, `?view=packages` or `?view=memberships`.
- Generic Book/Buy buttons and WordPress promotion links now open the matching
  live widget on this page. Existing deep links and query-bearing checkout links
  are preserved. The typical-week timetable and pricing information pages remain.
- Client changes to classes, availability, packages and memberships are made in
  **Rezerv**, not duplicated into WordPress. The widget reads the live catalogue.
- Sign-in and payment remain with the existing Rezerv customer portal. This is
  an official catalogue/booking embed plus hosted checkout, not a new payment
  gateway, customer database or WordPress checkout.

## Verified account and source

Inspected the user's Chrome Health-1 tab, Rezerv business Healthtinity:

- Settings > Embed Widget offers timetable, class, appointment, course,
  membership and package widgets. Used the timetable, package and membership
  widgets with the public business ID `a693bc84-8c0a-4266-bb42-0e796efe1cb0`.
- Source: https://support.rezerv.co/article/embed-a-booking-widget-on-your-custom-website
- Payment settings show an existing card provider with a Stripe payout link,
  plus Cash/Paynow and KPay manual payment methods. No payment setting changed.
- Domains shows `www.healthtinity.com` as primary, alongside connected
  `healthtinity.com` and provider-managed `healthtinity.rezerv.co`. Primary-domain
  redirection is enabled. These observations are dated, not permanent settings.

The full customer portal is unsuitable for an iframe: its response has a
`frame-ancestors` policy limited to Rezerv/Rezeve origins. The official widget
works on Hostinger and opens authentication/checkout in a new tab.

## Implementation

- `src/booking.mjs`: bilingual page, widget options, public business ID.
- `src/assets/js/booking.js`: one iframe at a time; accessible tabs, URL/history,
  language-switch view preservation, persistent direct-portal recovery link.
- Inter and Healthtinity colours use supported widget options. Rezerv branding
  stays enabled. GA stays disabled; no payment keys or admin credentials are used.
- URL configuration is base64-encoded in markup solely to preserve the correct
  booking hostname through Hostinger's preview-domain rewrite (not encryption).
- UTM relay follows Rezerv's copied snippet, validates both message origin and
  source window, and sends only the five named UTM fields to widgets.rezerv.co.
- Loading/error recovery does not claim that a cross-origin iframe load event
  proves successful catalogue rendering. The external portal link stays visible.
- Promotion popups are suppressed only while booking. Inline promotions remain.
  Floating WhatsApp is replaced with an inline help link on this page to avoid
  covering controls on phones.
- `BOOKING_URL` configures the external Rezerv origin for a future domain move;
  the current default is still `https://healthtinity.com`.

## Before the main-domain cutover

Recommended destination arrangement:

- Main website: `healthtinity.com` on Hostinger.
- Existing Rezerv customer accounts, booking and payments: `book.healthtinity.com`.

Do not move the main domain first. When launch is authorized:

1. Connect the booking subdomain in Rezerv using the exact DNS records provided
   by its domain setup screen. Verify its certificate and customer routes.
2. Set/verify the appropriate Rezerv primary domain and redirects. Ensure the
   booking address does not redirect back to the main website. The existing
   provider-managed subdomain is an alternative only after that is verified.
3. Build with `BOOKING_URL=https://book.healthtinity.com`, then verify the live
   widget handoff, existing-member login, account access, packages, recurring
   plans and return navigation on the new address. Check branded-app links too.
4. Have an authorized member complete a controlled booking/payment test, checking
   price, billing frequency, confirmation and class-credit allocation. This has
   not been done in this session.
5. Only after the above passes, switch the main website to Hostinger and add
   suitable legacy booking-path redirects. Preserve existing DNS mail records.

No DNS records, Rezerv domain settings, payment settings, prices, customers or
bookings were changed during this integration.

## Validation and limits

- Built 75 HTML files; 430 generic booking links resolve to the correct local
  booking route across English/Chinese and nested pages. Preserved direct,
  deep and query-bearing links; checked official widget flags and JavaScript.
- Chrome on the public HTTPS staging URL: real Starter Pack and holiday offers,
  upfront/recurring memberships, live classes and booking-window/waitlist states.
- Starter Pack Buy Now opened the correct Healthtinity member-login page in a new
  tab with the expected business ID. Stopped before login; no purchase or test
  booking submitted. Payment completion and selected-item persistence after
  authentication remain to be checked with a member account.
- Reviewed desktop, 768px tablet and 375px phone layouts; tested tab clicking,
  arrow-key switching, browser Back, and view-preserving language links.
- Rezerv's widget document responses currently log HTTP 404 in Chrome even
  though their application loads the real catalogue and the Buy Now handoff
  works. This is a third-party response-status issue; retain direct fallback
  links and recheck with Rezerv before production launch.
- The surrounding page is bilingual; widget labels follow Rezerv's own content
  and currently include English controls plus bilingual class/package names.

Backup before staging update:
`/home/u146877548/healthtinity-backups/before-rezerv-uf97iJ/staging.tar.gz`.
