# Healthtinity: Website Revamp (Concept)

A redesign concept for [healthtinity.com](https://healthtinity.com), Singapore's first boutique Yoga, Pilates & Rehab Therapy studio at Upper Thomson.

## Preview

No build step. It's plain HTML/CSS/JS.

```bash
# Option 1: just open the file
open index.html

# Option 2: local server (recommended)
python3 -m http.server 4321
# → http://localhost:4321
```

To share a live link, enable **GitHub Pages** on this repo (Settings → Pages → Deploy from branch → `main` / root).

## Design direction

**Modern, warm, calm.** The logo blue leads, set on warm cream and sand tones with a soft apricot accent. It should feel clinical enough to trust and warm enough to feel welcome.

| Token | Hex | Use |
|---|---|---|
| Logo Blue | `#0088AE` | Primary buttons, links, highlights (sampled from the logo) |
| Deep Blue | `#005F7C` | Hover states, gradients |
| Ink | `#12323D` | Headings, body text, dark panels |
| Cream | `#FBF6EF` | Page background |
| Sand | `#F4EADD` | Alternate sections, footer |
| Apricot | `#F0A878` | Warm accent: badges, underlines, icons |

**Type:** [Fraunces](https://fonts.google.com/specimen/Fraunces) (soft serif display, italic accents) + [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (clean body).

**Details:** an arched hero image, floating info cards, a scrolling class marquee, scroll-reveal motion (respects reduced-motion), a sticky blurred nav and a WhatsApp chat button.

## Page structure

1. **Hero:** "Move well. Heal well. Live well." with the starter-pack CTA and trust stats
2. **Our approach:** founding story and 3 pillars (relieve pain, restore mobility, build strength)
3. **Classes:** Yoga Rehab Therapy (signature), Yoga, Mat Pilates, Barre, Private Coaching
4. **Pricing:** Starter $60, 35+10 pack $990, Unlimited 3 months $594, plus the HT Wallet Top Up
5. **Team:** featured coaches, linking to the full team page
6. **Journal:** latest articles
7. **FAQ:** booking, beginners, arrival and cancellation
8. **Visit us:** address, transport and an embedded map
9. **Footer:** app links and socials

All booking buttons link to the existing Rezerv pages (`/package`, `/membership`, `/timetable`) and WhatsApp, so the booking flow keeps working.

## Project structure

```
.
├── index.html
├── assets/
│   ├── css/styles.css   # design tokens at the top (:root)
│   ├── js/main.js       # nav, mobile menu, scroll reveal
│   └── img/             # logo, hero, blog images
└── README.md
```

## To confirm with the client

- [ ] Team photos: placeholder initials are used for now
- [ ] Dr Kai's title (shown as "Rehab Therapy")
- [ ] Current promo prices (holiday promo, 35+10 pack) are still valid
- [ ] Testimonials or Google reviews to add
- [ ] More studio and class photography
- [ ] Higher-resolution / transparent (SVG) logo file
