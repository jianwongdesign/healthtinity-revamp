# Healthtinity: Website Revamp

A full redesign of [healthtinity.com](https://healthtinity.com), Singapore's first boutique Yoga, Pilates & Rehab Therapy studio at Upper Thomson.

**Live preview:** https://jianwongdesign.github.io/healthtinity-revamp/

## Pages

Every page on the current site has been redesigned. URLs match the current site, so links and SEO carry over at launch.

| Current page | Redesigned page |
|---|---|
| Home | [`/`](https://jianwongdesign.github.io/healthtinity-revamp/) |
| What's new | [`/blog/`](https://jianwongdesign.github.io/healthtinity-revamp/blog/) and 2 article pages |
| Team | [`/team/`](https://jianwongdesign.github.io/healthtinity-revamp/team/) and **16 individual coach profiles** (new) |
| Pricing: Packages | [`/package/`](https://jianwongdesign.github.io/healthtinity-revamp/package/) |
| Pricing: Memberships | [`/membership/`](https://jianwongdesign.github.io/healthtinity-revamp/membership/) |
| Group Class Schedule | [`/timetable/`](https://jianwongdesign.github.io/healthtinity-revamp/timetable/) (filter by day & class type) |
| Contact us | [`/contact-us/`](https://jianwongdesign.github.io/healthtinity-revamp/contact-us/) |
| Locate us | [`/location/`](https://jianwongdesign.github.io/healthtinity-revamp/location/) |
| FAQ | [`/faqs/`](https://jianwongdesign.github.io/healthtinity-revamp/faqs/) |
| Terms and Conditions | [`/terms/terms-and-conditions/`](https://jianwongdesign.github.io/healthtinity-revamp/terms/terms-and-conditions/) |
| Privacy Policy | [`/terms/private-policy/`](https://jianwongdesign.github.io/healthtinity-revamp/terms/private-policy/) |

All **Book / Buy now** buttons go to the existing Rezerv booking system, so purchases, bookings and log-in keep working unchanged.

## Design direction

**The sunny neighbourhood studio.** Logo blue owns whole panels (the home hero and every page header), sunshine yellow is the warm second colour, and deep navy carries the words. Rounded, friendly forms and real people in daylight. The home hero is a grid of the real coaches with hand-written name tags. A Starter Pack "stamp card" and a live "Today at the studio" list (from the real schedule) make the first visit concrete.

| Token | Hex | Use |
|---|---|---|
| Logo Blue | `#0088AE` / panel `#007EA1` | Hero and page-header panels, primary buttons |
| Sunshine | `#FFCD57` | Class strip, offer buttons, tags, ticks |
| Navy | `#0F2B46` | Headings, text, Top Up and visit panels |
| Sky | `#EAF6FA` | Alternate sections, footer, schedule rows |
| Butter | `#FFF5D9` | Pricing section, soft callouts |

**Type:** Nunito (rounded, bold headings), Nunito Sans (body), Caveat (coach name tags only).

## Editing & building

All content lives in `src/data.mjs` (prices, team, schedule, posts, FAQ) and `src/legal.mjs`. There are no dependencies; you only need Node 18+.

```bash
npm run build   # renders src/ → docs/
npm run dev     # build + preview at http://localhost:4321
```

Commit the rebuilt `docs/` folder and GitHub Pages updates automatically.

```
src/
  data.mjs        # all site content
  legal.mjs       # T&C and Privacy Policy text
  layout.mjs      # header, footer, shared blocks
  pages.mjs       # page templates
  assets/         # css, js, images
scripts/build.mjs # static site generator
docs/             # built site (served by GitHub Pages)
```

**At launch on healthtinity.com:** change `BOOK` in `src/data.mjs` to the booking subdomain (e.g. `https://book.healthtinity.com`) and build with `BASE=/ npm run build`.

## To confirm with the client

- [ ] **Booking domain:** where Rezerv booking will live once this site takes over healthtinity.com
- [ ] **Instructors on the schedule but not the Team page:** Cindy Tan and Ethan Lim (need photo + bio)
- [ ] **Xenia Na:** no photo yet (initials shown)
- [ ] **Short bios** to expand: Zi Wei Ng, Xenia Na, Ariel Swee
- [ ] **Phone number mismatch:** the T&C lists +65 8282 2665, while everywhere else says +65 8282 9515
- [ ] **Privacy Policy section 23** had no contact details; studio email, phone and address were added. Please confirm the DPO contact.
- [ ] **Promo prices** (Holiday promo, 15 Class Pack) are still valid
- [ ] **Contact form** currently sends through WhatsApp or email. Connect a form service if they'd prefer submissions in an inbox.
- [ ] **Press logos:** the Featured-in strip uses the official Lianhe Zaobao logo. Confirm the studio is OK using it, and send any other press features to add
- [ ] **Class photos** for Yoga, Mat Pilates and Tone & Sculpt (`src/assets/img/class-*.jpg`) are AI-generated stand-ins. Swap in real class photos when available
- [ ] Testimonials / Google reviews, more studio photography, an SVG logo
- [ ] Opening hours (not on the current site)
