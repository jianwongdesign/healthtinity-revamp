# Healthtinity: Website Revamp

A full redesign of [healthtinity.com](https://healthtinity.com), Singapore's first boutique Yoga, Pilates & Rehab Therapy studio at Upper Thomson.

**GitHub preview:** https://jianwongdesign.github.io/healthtinity-revamp/

**Hostinger staging:** https://welcome-lightsteelblue-mosquito-41.hostingersite.com/staging/?promo=1

Both previews load promotions from WordPress. The Hostinger review link opens the active pop-up immediately.

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

**The sunny neighbourhood studio.** Logo blue owns whole panels (the home hero and every page header), sunshine yellow is the warm second colour, and deep navy carries the words. Rounded, friendly forms and real people in daylight. The home hero is a grid of the real coaches with clear name labels. A Starter Pack "stamp card" and a live "Today at the studio" list (from the real schedule) make the first visit concrete.

| Token | Hex | Use |
|---|---|---|
| Logo Blue | `#0088AE` / panel `#007EA1` | Hero and page-header panels, primary buttons |
| Sunshine | `#FFCD57` | Class strip, offer buttons, tags, ticks |
| Navy | `#0F2B46` | Headings, text, Top Up and visit panels |
| Sky | `#EAF6FA` | Alternate sections, footer, schedule rows |
| Butter | `#FFF5D9` | Pricing section, soft callouts |

**Type:** IBM Plex Sans (headings, navigation and coach labels), Source Sans 3 (body). Updated on 20 November 2026 after client feedback requesting professional typography instead of rounded fonts.

## Editing & building

All content lives in `src/data.mjs` (prices, team, schedule, posts, FAQ) and `src/legal.mjs`. There are no dependencies; you only need Node 18+.

**Two languages.** Every page is built twice: English at the site root and Simplified Chinese under `/zh/`, with an EN | 中文 switch in the header that jumps to the same page in the other language.
- English text: `src/data.mjs` and the `t('English', '中文')` pairs in `src/pages.mjs` / `src/layout.mjs`.
- Chinese text: `src/zh.mjs` (prices, team bios, FAQ, posts) plus those `t()` pairs. Anything missing from `zh.mjs` falls back to English.
- Timetable class names keep both languages in one string (`'Hatha Yoga 哈他瑜伽'`); the build splits them.
- Terms and Privacy are English-only on both sites (the Chinese pages say the English version applies).
- The Chinese translation is machine-assisted. Have a native speaker proofread before launch.

```bash
npm run build   # renders src/ → docs/
npm run dev     # build + preview at http://localhost:4321
```

Commit the rebuilt `docs/` folder and GitHub Pages updates automatically.

```
src/
  data.mjs        # all site content (English)
  zh.mjs          # Chinese translations
  i18n.mjs        # language switch helpers
  legal.mjs       # T&C and Privacy Policy text
  layout.mjs      # header, footer, shared blocks
  pages.mjs       # page templates
  assets/         # css, js, images
scripts/build.mjs # static site generator
docs/             # built site (served by GitHub Pages)
```

**At launch on healthtinity.com:** change `BOOK` in `src/data.mjs` to the booking subdomain (e.g. `https://book.healthtinity.com`) and build with `BASE=/ SITE_URL=https://healthtinity.com/ npm run build`. `SITE_URL` sets the full addresses used in link previews (Open Graph) and canonical tags.

**Link previews:** share text lives in each page's `og` field in `src/pages.mjs` (both languages). Default share cards are `src/assets/img/og/share-en.jpg` and `share-zh.jpg` (1200×630); coach pages use the coach photo.

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

## WordPress-managed promotions

Hostinger staging now has **WP Admin → Promotions** for images, scheduling, bilingual copy, buttons, page-area cards and pop-ups. See [PROMOTIONS.md](PROMOTIONS.md) for the editor guide and [HANDOFF.md](HANDOFF.md) for deployment status. The What's new navigation item is removed; existing articles remain.
