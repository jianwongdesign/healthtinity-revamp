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

**Modern, warm, calm.** The logo blue leads, set on warm cream and sand tones with a soft apricot accent. It should feel clinical enough to trust and warm enough to feel welcome.

| Token | Hex | Use |
|---|---|---|
| Logo Blue | `#0088AE` | Primary buttons, links, highlights (sampled from the logo) |
| Deep Blue | `#005F7C` | Hover states, gradients |
| Ink | `#12323D` | Headings, text, dark panels |
| Cream | `#FBF6EF` | Page background |
| Sand | `#F4EADD` | Alternate sections, footer |
| Apricot | `#F0A878` | Warm accent: badges, underlines, therapy tags |

**Type:** Outfit Bold (clean, bold sans-serif headings) + Plus Jakarta Sans (body).

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
- [ ] **Home hero photo** is AI-generated (Higgsfield) as a stand-in. Swap in a real studio photo of a coach with a client when available
- [ ] Testimonials / Google reviews, more studio photography, an SVG logo
- [ ] Opening hours (not on the current site)
