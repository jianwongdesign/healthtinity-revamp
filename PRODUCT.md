# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Two equally important audiences in Singapore (mostly the Upper Thomson / Thomson / Bishan area):
- **Class-goers**: locals looking for a friendly yoga / Mat Pilates studio near Upper Thomson MRT, browsing the schedule, pricing and Starter Pack.
- **People in pain or recovering**: adults with back, neck or shoulder pain, posture issues, sciatica, scoliosis or post-injury needs, looking for Yoga Rehab Therapy or private 1:1 sessions.
Both arrive mostly on mobile and decide whether to book a first class, buy a pack, or WhatsApp the studio.

## Product Purpose
Healthtinity (Healthtinity Adventures Pte Ltd) is a boutique Yoga, Pilates & Rehab Therapy studio at 246J Upper Thomson Road, Singapore 574370, since 2019. The website should turn visitors into first-time bookers (New Members Starter Pack: 5 classes for $60) and WhatsApp enquiries, and help existing members find the schedule, packages and memberships. Booking, payment and log-in happen on the existing Rezerv booking system and the HT Life app.

## Positioning
Lead with **community and warmth**: a friendly neighbourhood studio where bilingual (English / Mandarin) coaches know your name and all ages are welcome. Supporting it: founded and led by Dr Kai (Doctor of Osteopathy), so classes are informed by rehab ("where fitness meets healing").

## Operating Context
- Bookings open 7 days ahead and close 1 hour before class; weekly group class schedule of Yoga, Mat Pilates, Therapy & Stretch, Tone & Sculpt.
- Studio rooms include "Courage Studio".
- Visitors often contact via WhatsApp (+65 8282 9515) or email ask@healthtinity.com.
- Content source of truth: `src/data.mjs` (team, pricing, schedule, posts, FAQ) and `src/legal.mjs`.

## Capabilities and Constraints
- Static HTML/CSS/JS, no dependencies; Node build (`npm run build`) renders `src/` to `docs/`, hosted on GitHub Pages for review.
- URLs must match the current healthtinity.com pages (SEO carry-over).
- All Book / Buy buttons link to the Rezerv booking pages; no on-site checkout.
- Schedule shown is a typical week; live seats only on the booking system.
- Undecided: booking subdomain at launch, opening hours, form service for contact form.

## Brand Commitments
- Name: Healthtinity. Logo: circular blue mark (`src/assets/img/logo-*.png`), logo blue #0088AE is the brand colour.
- Owner direction: modern and warm; bold sans-serif headings (no serif "tails"); not generic / AI-looking.
- Bilingual touches (Chinese class names, Chinese coach bios) are real and should stay.

## Evidence on Hand
- Real team photos for 15 of 16 coaches (`src/assets/img/team/`), Xenia Na has none.
- Real studio/blog photos: `hero.jpg` (group class), `blog-sleep.jpg`, `blog-package.jpg`.
- Press: Lianhe Zaobao feature, 8 September 2026 (official logo at `src/assets/img/press/zaobao.svg`). No other press.
- Pricing, packages, memberships, schedule, FAQ, T&C, Privacy Policy from the current site.
- Photography: the owner approves realistic AI-generated photos alongside real ones; AI images must look like a real Singapore studio and never depict identifiable real coaches.
- Absent, must not be fabricated: testimonials / reviews, member counts beyond "thousands of members helped", other press, awards, opening hours.

## Product Principles
1. Feel like a neighbourhood studio with real people, not a chain or a template.
2. Get a nervous first-timer (or someone in pain) to a confident first booking or WhatsApp message.
3. Keep the schedule and prices honest and easy to scan on a phone.
4. Show the coaches; they are the product.
