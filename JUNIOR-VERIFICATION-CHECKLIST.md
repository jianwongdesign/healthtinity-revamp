# Healthtinity change register and junior verification checklist

Prepared 22 November 2026 from the project implementation, handover records, conversation and the two supplied handwritten meeting notes. Website build reference: `219aff8`.

The redesigned site is on Hostinger staging. The main domain still serves the existing Rezerv site. The website changes have not been lost. This checklist records implementation status; every junior verification box is intentionally unchecked.

Reviewer: ____________________  Review date: ____________________

24 November update: footer shortened into Studio, Classes (five links), Booking & pricing, and Visit groups beside the brand. The footer's Live class schedule link opens the Rezerv booking page. Recheck this responsive layout during review. The public Book a class button was also rechecked: it loads the live Rezerv timetable, including today's classes and remaining spaces; the separate Schedule page is still a static weekly overview.

Record each result as **Pass**, **Fail**, **Blocked** or **Not applicable**, with the page URL, language, screen size and screenshot or explanation. “Implemented” below means built in staging, not final client approval or production launch.

## Review links

| Destination | Link and purpose |
| --- | --- |
| Updated website | [Hostinger staging](https://welcome-lightsteelblue-mosquito-41.hostingersite.com/staging/) — use this for design review |
| Chinese website | [Chinese staging](https://welcome-lightsteelblue-mosquito-41.hostingersite.com/staging/zh/) |
| Promotion review | [Show eligible promotion](https://welcome-lightsteelblue-mosquito-41.hostingersite.com/staging/?promo=1) — bypasses normal delay/cooldown, not disabled status or dates |
| Booking integration | [Book and buy](https://welcome-lightsteelblue-mosquito-41.hostingersite.com/staging/book/) |
| Corporate Wellness | [Corporate pricing](https://welcome-lightsteelblue-mosquito-41.hostingersite.com/staging/corporate-wellness/) |
| Existing customer website | [Current Rezerv site](https://www.healthtinity.com/) — still the existing production site |
| Future booking address | `https://book.healthtinity.com` — SSL failed at the last check on 22 November; recheck before use |
| Repository | [Healthtinity GitHub](https://github.com/jianwongdesign/healthtinity-revamp) |
| Secondary design preview | [GitHub Pages](https://jianwongdesign.github.io/healthtinity-revamp/) — use Hostinger as the primary review destination |
| Admin | Open the Healthtinity installation through Hostinger → WP Admin; use the existing authorised account |
| Academy source | [Client-supplied Wix courses](https://ask2929.wixsite.com/my-site-3/courses) — historical reference, not confirmed current offers |

## Reconciliation with the handwritten notes

| Recorded request | Implementation and remaining work |
| --- | --- |
| GoDaddy domain; business.rezerv.co | Rezerv account inspected. DNS was managed in Wix in this session, with Wix authoritative nameservers. GoDaddy in the notes may refer to the registrar; registrar ownership has not been confirmed. Do not move DNS based only on the handwritten label. |
| More solid font; logo to be updated | Professional fonts implemented: IBM Plex Sans for headings/navigation, Source Sans 3 for body. Existing logo remains; replacement logo still needed. |
| Remove What's New and About Us from header | Main header has neither item. Articles remain under their existing URLs. About Us remains accessible from the homepage and footer, as subsequently requested. |
| Pop-out promotion window | Implemented, controlled through WordPress Promotions. |
| Team page bottom promotion banner that can slide | Shared lower-page promotion area implemented, including Team. Multiple eligible promotions scroll horizontally. |
| Pricing/package page client editable | Partial: Rezerv manages the live booking catalogue. Static marketing package/membership pages are still source-edited; there is no WordPress pricing-page editor. Do not mark this original requirement complete. |
| Homepage hero with four class types | Superseded by the later explicit request for five categories, including Private 1:1. Five are implemented. |
| Remove therapist section; use About Us | Founder/rehabilitation section removed from homepage. Replaced with instructor portrait collage and About Us / Meet the Instructors buttons. Official group photograph still needed. |
| Contact combined with Locate Us in header | Implemented as one Contact Us page, including enquiry, map and directions. |
| Corporate Wellness with contact | Implemented under Pricing with enquiry links. S$30/person, minimum 15; from S$20/person for 30+. Includes yoga instruction and instructor transport as interpreted from the note. |
| Testimonials, possibly with video | Pending. No dedicated testimonial/video section implemented. Request approved testimonials and permission to publish; video is optional in the note, not confirmed scope. |
| WhatsApp community chat group | Pending. Current WhatsApp buttons open a direct business chat, not a group. Obtain the approved group invitation URL and desired placement. |
| SEO setup | Partial. Page titles/descriptions, canonical URLs, language alternates, social previews and some structured data exist. Staging is intentionally noindex. Production SEO configuration, sitemap, redirects and Search Console verification remain to be completed/verified at launch. |
| Header: Home, one-to-one coach, Team, Pricing, Academy / learn yoga | Later navigation instructions take precedence. Current header: Home, Classes, Team, Pricing, Schedule, Contact Us, Academy. Private 1:1 is inside Classes, not a separate top-level tab. |
| Academy page with simple description | Implemented and expanded using the supplied Wix reference: 200-hour Hatha/Vinyasa, 300-hour Multi-style, Reiki Levels 1 and 2, plus an enquiry form. Current dates/fees/accreditation need client confirmation. |

## Completed changes to verify

For page paths below, use the Hostinger staging root above. Repeat in English and Chinese unless stated otherwise.

1. **Professional typography.** Rounded fonts replaced with IBM Plex Sans and Source Sans 3.
   - [ ] Check home, headings, body copy, buttons and forms. No old rounded font should remain in the site shell; embedded Rezerv controls use their own typography.

2. **Consistent navigation.** Classes/Pricing dropdown labels now match the other main labels in weight and style.
   - [ ] Check desktop alignment, dropdown opening, keyboard access, mobile menu and EN/中文 switching. Academy must appear after Contact Us.

3. **Tighter spacing.** Reduced large gaps in page headers, sections, pricing, team cards, forms and footer.
   - [ ] Review home, `/team/`, `/package/`, `/contact-us/` and `/academy/`. Check that content is compact without touching or overlapping.

4. **Text width and wrapping.** Removed unnecessarily narrow text caps and fixed small-screen overflow.
   - [ ] Check long titles, blue-header introductions, card descriptions, buttons, contact email and timetable. Text should use its available width and wrap naturally, without clipping or page-wide horizontal scrolling.

5. **Five homepage class options.** Hero photo reel and yellow strip show Yoga, Mat Pilates, Therapy & Stretch, Tone & Sculpt and Private 1:1.
   - [ ] Confirm exactly five unique categories and correct destinations. Repeated cards used for the continuous animation are expected.

6. **Classes menu beside Home.** Five categories added to desktop/mobile navigation and related homepage/footer links.
   - [ ] Open every category. Paths: `/classes/yoga/`, `/classes/mat-pilates/`, `/classes/therapy-stretch/`, `/classes/tone-sculpt/`, `/classes/private-1-to-1/`.

7. **Individual class pages.** Added category introductions and class-type sections, ready for client descriptions, audience/level and duration.
   - [ ] Verify five pages in both languages, images, category links and enquiry/schedule buttons. Flag missing client content; do not invent descriptions or durations.

8. **WordPress class editor.** WP Admin → Classes supports introductions, optional photos/expectations and ordered class-type details.
   - [ ] With authorised access, check fields and language fallback. If testing a save, capture the original values, make a reversible staging edit, verify it on a fresh page load and restore it. Saving is immediately reflected in previews; there is no draft workflow.

9. **What's New removal.** Removed the navigation item and renamed remaining article-index labels to Articles; retained article URLs/content.
   - [ ] Check desktop/mobile menus, `/blog/`, article breadcrumbs and page titles. Existing article links should still work.

10. **Promotion pop-up and admin controls.** Added English/Chinese copy, images, optional mobile artwork, buttons, start/end dates, display order, master on/off and individual placement controls.
    - [ ] Review WP Admin → Promotions and Display settings. Verify enabled/disabled and date eligibility in Singapore time, page placement versus pop-up placement, image fit and button destinations. Preserve existing settings after any authorised test.

11. **Promotion placement and scrolling.** Shared lower-page banner uses one card for one promotion and horizontal scrolling for multiple promotions.
    - [ ] Check Home, Team and another inner page. For multiple eligible promotions, test swipe, arrow and keyboard controls. No automatic slide movement is implemented. Restore any test promotions/settings afterward.

12. **Promotion behaviour.** Delay and browser cooldown are adjustable; closing supports the close button, Escape and backdrop. Pop-ups defer while a visitor edits a form or uses the mobile menu, and are suppressed on the booking page.
    - [ ] Test normal visits separately from `?promo=1`. Confirm the booking page has no promotional pop-up; the inline promotion area may remain.

13. **Homepage team replacement and About Us.** Removed the founder portrait/therapy checklist section. Added a collage of existing instructor portraits, an initials placeholder for Xenia Na, and two navigation buttons.
    - [ ] Verify both buttons, `/about-us/` and `/team/`. Do not report the collage as an official group photograph. Flag the missing group photograph and Xenia portrait for the client.

14. **Combined Contact Us and Locate Us.** Contact form, phone/email/WhatsApp, address, map and travel directions are on `/contact-us/`; old `/location/` links redirect to the visit section.
    - [ ] Test enquiry/map shortcuts, map, external directions, telephone link and old location URL in both languages.

15. **Contact icon and email corrections.** WhatsApp icon is white on green. Contact email remains `ask@healthtinity.com` despite the temporary Hostinger domain.
    - [ ] Check the displayed email, mailto destination and form handoff. Test required-field validation and prepared WhatsApp/email text without sending a test message to the client. Forms prepare a visitor-sent message; they do not save leads in WordPress or send server-side email.

16. **Chinese wording improvements.** Homepage headline updated to “用心指导，陪您一起进步。”; related introductions, section headings and enquiry wording improved.
    - [ ] Have a fluent Chinese reviewer check meaning, consistency and layout. This was not a full proofread of every article, bio or legal page. Legal pages retain English terms.

17. **Academy navigation, content and enquiry form.** Added `/academy/` after Contact Us and populated the four courses from the Wix reference, with images and expandable curriculum/assessment content.
    - [ ] Check all four courses, image loading, expand/collapse, course preselection and WhatsApp/email handoff. Fees and durations from the old source must remain labelled historical. No expired 2023 intake dates, seat counts or unsupported accreditation claims should appear as current offers.

18. **Corporate Wellness pricing.** Added `/corporate-wellness/` to Pricing, pricing-page navigation, mobile menu and footer; includes two rate cards and Contact Us links.
    - [ ] Confirm S$30/person with a 15-person minimum and from S$20/person for 30+. Confirm yoga instruction/transport wording with the client. Both buttons should open Contact Us with Corporate Wellness selected and a prompt for company, group size, date, venue and duration.

19. **Rezerv booking integration.** Added `/book/` with live schedule, packages and memberships. Generic Book/Buy buttons route to the appropriate view; hosted member login/checkout stays in Rezerv.
    - [ ] Check all three tabs, visible live content, tab keyboard navigation, browser Back, language switch, phone layout and direct-portal fallback. Check representative homepage, pricing and promotion booking links. A rendered iframe or HTTP status alone is not proof of a working catalogue.
    - [ ] Confirm Buy Now reaches the correct Healthtinity login/checkout handoff. Do not count this as a completed payment test. Rezerv widgets previously returned a 404 document status while rendering working content; record both visible behaviour and errors for follow-up.

20. **Staging publication and recovery.** Website design uploaded to Hostinger staging; source and generated GitHub Pages files saved in Git. Latest website implementation commit is `219aff8`.
    - [ ] Confirm the reviewed URL contains `/staging/`, verify the latest Corporate Wellness page and navigation, and record the reviewed commit/date. Check backups through the technical handoff before future deployments. The main-domain switch has not been completed.

## Client content and implementation still outstanding

| Item | Status and required follow-up | Suggested owner |
| --- | --- | --- |
| Replacement logo | Await approved logo artwork, ideally SVG, before replacing header/footer/favicon/share graphics as appropriate. | Client / designer |
| Official instructor group photo | Current collage is a temporary alternative; obtain approved group photo. | Client |
| Other team content | Verify missing Xenia photo; short bios for Zi Wei Ng, Xenia Na and Ariel Swee; schedule/team coverage for Cindy Tan and Ethan Lim. These remain client-confirmation items in the project README. | Client / junior |
| Client-editable pricing pages | Build/agree the editing workflow for static marketing prices; changing Rezerv packages currently updates the live widget, not all static marketing copy. | Developer / client |
| Testimonials | Obtain approved quote, name/display attribution and publication permission. No testimonial section is currently implemented. | Client / designer |
| Testimonial video | Confirm whether wanted, then obtain approved video, poster image and captions. “Maybe” in the notes is not completion or a supplied asset. | Client |
| WhatsApp community | Obtain approved invitation URL and decide placement; current direct chat is a different feature. | Client / developer |
| Academy current details | Confirm intakes, fees, duration, trainers, prerequisites, accreditation and application process. Academy content is presently source-edited, not a WordPress editor. | Client |
| Corporate Wellness details | Confirm the handwritten price tiers and inclusions, plus session duration, venue requirements and quote terms. Do not invent them. | Client |
| Static schedule and price accuracy | Compare marketing pages with current Rezerv offers/classes; the typical-week timetable is not the live availability feed. | Client / junior |
| General launch copy | Resolve T&C phone mismatch (+65 8282 2665 versus main contact +65 8282 9515), confirm DPO contact, current promotions and permission to use press logos. | Client |
| Full WordPress migration | Promotions and class sections have WordPress editors. The entire design is still a static staging build, not a fully editable WordPress theme. Class data should render server-side in an eventual WordPress theme so saved edits also update initial HTML/SEO. | Developer |
| Production SEO | Finish and verify production canonical URLs, hreflang, metadata, structured data, sitemap, redirects and indexing settings. Arrange Search Console ownership/access and submission. Search performance is not guaranteed by metadata alone. | Developer / SEO owner |

## Booking and domain launch gates

Last verified on 22 November 2026: `book.healthtinity.com` resolves to `shops.rezerv.co`, and Rezerv shows Connected, but HTTPS presents a certificate for `mygym.rezeve.com`. Existing `www.healthtinity.com` remains the working primary. Connected DNS does not prove valid SSL or a completed booking flow.

- [ ] Rezerv provisions the correct certificate for `book.healthtinity.com`; verify HTTPS without bypassing browser warnings.
- [ ] Verify the intended booking primary domain and redirects. Earlier verification automatically promoted the new domain; it was restored to `www` while SSL was broken. Avoid accidentally redirecting all customers to an unready address.
- [ ] Configure the website with `BOOKING_URL=https://book.healthtinity.com` only when the address is ready, then verify the deployed widget and fallback destinations.
- [ ] Have an authorised existing member verify login, existing account access and selected-package persistence after login.
- [ ] With an agreed test account/transaction, verify booking, checkout, amount/billing frequency, payment result, confirmation and credit allocation. Actual payments and bookings were not completed in our earlier checks.
- [ ] Check return navigation and relevant HT Life/app links after the domain change.
- [ ] Confirm design/content approval and the intended WordPress editing scope before launch.
- [ ] Back up site and database, agree rollback, preserve email DNS, configure legacy booking-path redirects, and only then switch the main site to Hostinger under the owner's launch instruction.
- [ ] After launch, verify public HTTPS, primary/canonical URLs, navigation, forms, booking, redirects and mobile layout. Remove staging-only indexing restrictions from the production build while keeping staging excluded.

The junior review itself does not authorise DNS changes, a main-domain launch, payment-setting changes or real customer transactions. Report failures with evidence; arrange the relevant owner to perform or authorise those steps.

## Device coverage and sign-off

Check English and Chinese at phone widths 320–390px, tablet around 768–820px, and desktop around 1280–1440px. Use a real phone if available. Previous checks used Chromium; do not assume Safari/iPhone behaviour has passed.

- [ ] Phone: readable text, suitable image crop, no overflow, usable menu/buttons/forms and unobstructed booking controls.
- [ ] Tablet: deliberate stacking, adequate card widths and no header crowding.
- [ ] Desktop: consistent spacing, navigation weight and full use of intended text width.
- [ ] Keyboard: navigation, dropdowns, forms, pricing links, booking tabs and promotion closing are usable.
- [ ] All failed/blocked items have an owner and a specific next action.

| Check ID / page | Language and device | Result | Evidence / defect | Owner and next action |
| --- | --- | --- | --- | --- |
| | | | | |
| | | | | |
| | | | | |

Junior review completed by: ____________________  Date: ____________________

Open blockers: ___________________________________________________________

Client design/content approval: ____________________  Date: ________________

Launch owner and go-live approval: ____________________  Date: _____________

## Supporting project documents

- [Technical handoff and deployment history](HANDOFF.md)
- [Promotions editor guide](PROMOTIONS.md)
- [Class editor guide](CLASSES.md)
- [Academy sources and historical-content limitations](ACADEMY.md)
- [Rezerv integration and domain investigation](REZERV-INTEGRATION.md)

Older README and handoff sections describe earlier stages. Use the dated current change register above and inspect the deployed site when an older statement conflicts. This checklist creates no new website features and makes no launch changes.
