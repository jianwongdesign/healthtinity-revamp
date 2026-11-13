import {
  site, wa, packages, membershipsUpfront, membershipsRecurring, topups,
  team, schedule, classCategory, categories, posts, faqs,
} from './data.mjs';
import { terms, privacy } from './legal.mjs';
import { esc, icon, initials, pageHero, ctaBand } from './layout.mjs';
import { readFileSync } from 'node:fs';

// Official Lianhe Zaobao logo (Wikipedia: File:Lianhe_Zaobao_new_logo.svg); mono by default, brand colours on hover
const zaobaoLogo = readFileSync(new URL('./assets/img/press/zaobao.svg', import.meta.url), 'utf8')
  .replace('<svg ', '<svg class="press__svg" role="img" aria-label="Lianhe Zaobao 联合早报" ')
  .replace(/fill="black"/g, 'fill="currentColor"')
  .replace(/fill="(#A80034|#E90044)"/g, 'class="zb-brand" style="--c:$1" fill="currentColor"');

const money = (n) => n.toLocaleString('en-SG');
const avatar = (m, r, cls = '') =>
  m.photo
    ? `<img class="${cls}" src="${r}assets/img/team/${m.photo}" alt="${esc(m.name)}" loading="lazy" width="560" height="560">`
    : `<div class="${cls} avatar-fallback" aria-hidden="true">${initials(m.name)}</div>`;

const faqList = (items) => `
<div class="faq">
  ${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n  ')}
</div>`;

// ---------------------------------------------------------------------
// Pricing cards
// ---------------------------------------------------------------------
const priceCard = (p, href, cta = 'Buy now') => `
<article class="price${p.featured ? ' price--hot' : ''} reveal">
  ${p.badge ? `<span class="ribbon">${esc(p.badge)}</span>` : ''}
  <h3>${esc(p.name)}</h3>
  ${p.sub ? `<p class="price__sub">${esc(p.sub)}</p>` : ''}
  <p class="price__amt"><sup>S$</sup>${money(p.price)}${p.per ? `<small>/ ${p.per}</small>` : ''}</p>
  <p class="price__meta">${esc(p.credits || p.billing || 'One-time payment')}${p.credits ? ' · One-time payment' : ''}</p>
  <ul>
    <li>${esc(p.validity)}</li>
    ${(p.perks || []).map((x) => `<li>${esc(x)}</li>`).join('')}
  </ul>
  ${p.note ? `<p class="price__note">${esc(p.note)}</p>` : ''}
  <a class="btn ${p.featured ? 'btn--light' : 'btn--ghost'} btn--block" href="${href}">${cta}</a>
</article>`;

const topupBlock = () => `
<div class="topup reveal" id="topup">
  <div>
    <h3>Top Up &amp; Flow: more flexibility, more you.</h3>
    <p>Not everyone wants to commit to a package, and now you don't have to. Top up your HT Wallet, receive bonus credits and use them however you like.</p>
  </div>
  <ul class="topup__tiers">
    ${topups.map((t) => `<li><strong>$${t.pay}</strong><span>+ $${t.bonus} bonus</span></li>`).join('')}
  </ul>
  <a class="btn btn--light" href="${wa("Hi Healthtinity! 👋 I saw the Top Up & Flow offer on your website and would like to find out more about the HT Wallet Top Up options")}" target="_blank" rel="noopener">Enquire on WhatsApp</a>
</div>`;

// =====================================================================
// HOME
// =====================================================================
function home() {
  const r = '';
  const pick = ['kai', 'mary-low', 'sam-chen', 'jade-lim', 'zenn-lim', 'daniel-ding'];
  const faces = pick.map((slug) => team.find((m) => m.slug === slug)).filter((m) => m && m.photo)
    .map((m) => ({ ...m, short: m.slug === 'kai' ? 'Dr Kai' : m.name.split(' ')[0] }));
  return {
    path: '',
    active: 'home',
    title: 'Home',
    description: "Singapore's first boutique Yoga, Pilates & Rehab Therapy studio at Upper Thomson. Expert-led yoga, Mat Pilates, private coaching, yoga therapy and rehabilitation for back, neck and shoulder pain.",
    schema: `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org', '@type': 'HealthClub', name: 'Healthtinity', url: 'https://healthtinity.com',
      telephone: site.phone, email: site.email, foundingDate: '2019',
      address: { '@type': 'PostalAddress', streetAddress: '246J Upper Thomson Road', addressLocality: 'Singapore', postalCode: '574370', addressCountry: 'SG' },
      sameAs: Object.values(site.social),
    })}</script>`,
    body: `
<section class="hero">
  <div class="container hero__panel">
    <div class="hero__copy">
      <h1>Coaches who know your name.</h1>
      <p class="hero__lead">Yoga, Mat Pilates and Yoga Rehab Therapy at Upper Thomson, taught in English and 华语 and led by Dr Kai, Doctor of Osteopathy.</p>
      <div class="actions">
        <a class="btn btn--sun" href="${site.links.packages}">Start with 5 classes for $60 ${icon.arrow}</a>
        <a class="wa-link" href="${wa("Hi Healthtinity! I'm new and would like to find out which class suits me.")}" target="_blank" rel="noopener">${icon.wa} WhatsApp us</a>
      </div>
      <div class="press">
        <p class="press__label">Featured in</p>
        <a class="press__logo" href="blog/yoga-for-better-sleep-in-singapore-healthtinity-featured-in-lianhe-zaobao/" aria-label="Read our Lianhe Zaobao feature">${zaobaoLogo}</a>
        <a class="press__more" href="blog/yoga-for-better-sleep-in-singapore-healthtinity-featured-in-lianhe-zaobao/">Read the feature</a>
      </div>
    </div>
    <div class="faces">
      ${faces.map((m) => `<a class="face" href="team/${m.slug}/"><img src="assets/img/team/${m.photo}" alt="${esc(m.name)}, ${esc(m.role)}" width="560" height="560"${m.slug === 'kai' ? ' fetchpriority="high"' : ''}><span class="face__name">${esc(m.short)}</span></a>`).join('')}
    </div>
  </div>
</section>

<div class="marquee" aria-hidden="true">
  <div class="marquee__track">
    ${Array(2).fill(['Yoga', 'Mat Pilates', 'Yoga Rehab Therapy', 'Therapy &amp; Stretch', 'Hot Yoga', 'Tone &amp; Sculpt', 'Private 1:1', 'Osteopathy-informed'].map((x) => `<span>${x}</span><i></i>`).join('')).join('')}
  </div>
</div>

<section class="section" id="start">
  <div class="container">
    <div class="section__head reveal">
      <h2>Your first week, sorted.</h2>
      <p class="lead">Five classes to try anything on the schedule, from gentle therapy stretches to Hot Vinyasa. Beginners are always welcome.</p>
    </div>
    <div class="welcome">
      <div class="stamp reveal">
        <p class="stamp__kind">New Members Starter Pack</p>
        <p class="stamp__offer">5 classes · $60</p>
        <ol class="stamp__dots" aria-label="Five classes">
          <li class="is-stamped"><img src="assets/img/logo-180.png" alt="" width="40" height="40"></li><li>2</li><li>3</li><li>4</li><li>5</li>
        </ol>
        <ul class="stamp__perks">
          <li>${icon.check} <span>Any group class: Yoga, Mat Pilates, Therapy, Tone &amp; Sculpt</span></li>
          <li>${icon.check} <span>Plus <strong>$22 credit</strong> in your Healthtinity Wallet</span></li>
          <li>${icon.check} <span>Book in the HT Life app, up to 7 days ahead</span></li>
        </ul>
        <div class="actions">
          <a class="btn btn--primary" href="${site.links.packages}">Get the Starter Pack ${icon.arrow}</a>
          <a class="arrow-link" href="package/">All packages</a>
        </div>
      </div>
      <div class="today reveal" data-today>
        <div class="today__head">
          <h3 data-today-title>Today at the studio</h3>
          <span>${site.room} · 246J Upper Thomson Rd</span>
        </div>
        ${schedule.map((d, i) => `<ol class="today__list" data-today-day="${d.day}"${i ? ' hidden' : ''}>
          ${d.classes.map((c) => `<li class="today__row" data-time="${c.time}"><span class="today__time">${c.time}</span><span class="today__class">${esc(c.name.replace(/\s*·\s*Off Peak$/, '').replace(/\s+[一-鿿].*$/, ''))}<small>with ${esc(c.coach)}</small></span><a href="${site.links.schedule}">Book</a></li>`).join('')}
        </ol>`).join('')}
        <a class="arrow-link" href="timetable/">See the full week ${icon.arrow}</a>
      </div>
    </div>
  </div>
</section>

<section class="section section--sand" id="story">
  <div class="container founder">
    <div class="founder__card reveal">
      <img src="assets/img/team/kai.jpg" alt="Dr Kai, founder and Master Therapist at Healthtinity" loading="lazy" width="560" height="560">
      <p><strong>Dr Kai</strong><span>Doctor of Osteopathy · Founder</span></p>
    </div>
    <div class="reveal">
      <h2>Where fitness meets healing.</h2>
      <p class="lead">Since 2019, Healthtinity has bridged fitness and rehabilitation. Our signature Yoga Rehab Therapy brings Osteopathy, Yoga and Mat Pilates together to relieve pain, restore mobility and build strength, for every age.</p>
      <ul class="checklist">
        <li>${icon.check} Chronic neck &amp; back pain, sciatica, scoliosis</li>
        <li>${icon.check} Sports injuries &amp; post-surgical rehabilitation</li>
        <li>${icon.check} Postural dysfunction &amp; joint mobility</li>
        <li>${icon.check} Personalised 1:1 plans that target the root cause</li>
      </ul>
      <div class="actions">
        <a class="btn btn--primary" href="${wa("Hi Healthtinity! I'd like to speak to someone about my pain or mobility concerns. Could you help me choose the right programme?")}" target="_blank" rel="noopener">Talk to a therapist ${icon.arrow}</a>
        <a class="arrow-link" href="team/kai/">About Dr Kai</a>
      </div>
    </div>
  </div>
</section>

<section class="section" id="classes">
  <div class="container">
    <div class="section__head section__head--row reveal">
      <div>
        <h2>Find what moves you.</h2>
        <p class="lead" style="margin:0">More than 50 classes a week across four kinds of practice.</p>
      </div>
      <a class="arrow-link" href="timetable/">View the weekly schedule ${icon.arrow}</a>
    </div>
    <div class="tiles">
      ${[
        ['yoga', 'Yoga', 'Hatha, Vinyasa, Ashtanga, Wheel Yoga, Yin &amp; Restore, and Hot &amp; Warm flows.', 'class-yoga.jpg', 'A small group class holding warrior two pose'],
        ['pilates', 'Mat Pilates', 'Foundation, Dynamic and Warm Mat Pilates for core, posture and stability.', 'class-pilates.jpg', 'A Mat Pilates class doing single-leg lifts while a coach gives a cue'],
        ['therapy', 'Therapy &amp; Stretch', 'Mobility, Full Body Stretch, Myofascial Release and Upper Body Stretch.', 'hero.jpg', 'A Healthtinity therapy and stretch group class'],
        ['sculpt', 'Tone &amp; Sculpt', 'Low-impact, high-energy sculpting and Barre-inspired strength.', 'class-sculpt.jpg', 'A Tone and Sculpt class squatting with light dumbbells'],
      ].map(([c, t, d, img, alt]) => `<a class="tile reveal" href="timetable/?c=${c}">
        <div class="tile__img"><img src="assets/img/${img}" alt="${alt}" loading="lazy" width="1200" height="900">${c === 'therapy' ? '<span class="tag">Most loved</span>' : ''}</div>
        <div class="tile__body"><h3>${t} ${icon.arrow}</h3><p>${d}</p></div>
      </a>`).join('')}
    </div>
    <div class="private reveal">
      <div><h3>Prefer one-to-one?</h3><p>Private coaching and therapy built around your body and goals.</p></div>
      <a class="btn btn--ghost" href="${wa("Hi Healthtinity! I'm interested in private 1:1 sessions.")}" target="_blank" rel="noopener">Ask about Private 1:1</a>
    </div>
  </div>
</section>

<section class="section section--sun" id="pricing">
  <div class="container">
    <div class="section__head section__head--row reveal">
      <h2>Flexible ways to flow.</h2>
      <a class="arrow-link" href="package/">Compare all options ${icon.arrow}</a>
    </div>
    <div class="pricing">
      ${priceCard(packages[0], site.links.packages, 'Get started')}
      ${priceCard(packages[3], site.links.packages, 'Choose pack')}
      ${priceCard({ ...membershipsRecurring[2], featured: false, badge: null }, site.links.memberships, 'See memberships')}
    </div>
    ${topupBlock()}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section__head section__head--row reveal">
      <h2>From the studio.</h2>
      <a class="arrow-link" href="blog/">See all articles ${icon.arrow}</a>
    </div>
    <div class="posts">
      ${posts.map((p) => postCard(p, r)).join('')}
    </div>
  </div>
</section>

${visitBlock(r)}
${ctaBand(r)}`,
  };
}

const postCard = (p, r) => `
<a class="post reveal" href="${r}blog/${p.slug}/">
  <div class="post__img"><img src="${r}assets/img/${p.image}" alt="" loading="lazy" width="640" height="360"></div>
  <div class="post__meta"><span class="tag tag--soft">${esc(p.category)}</span><span>${esc(p.date)}</span></div>
  <h3>${esc(p.title)}</h3>
  <p class="muted">${esc(p.excerpt)}</p>
</a>`;

const visitBlock = (r, withMap = true) => `
<section class="section">
  <div class="container">
    <div class="visit reveal">
      <div class="visit__copy">
        <h2>Your first class is <em>closer</em> than you think.</h2>
        <address>${site.address.join('<br>')}</address>
        <ul class="visit__how">
          ${site.getting.map(([e, t]) => `<li><span>${e}</span>${esc(t)}</li>`).join('')}
        </ul>
        <div class="actions">
          <a class="btn btn--light" href="https://www.google.com/maps/dir/?api=1&amp;destination=246J+Upper+Thomson+Road+Singapore+574370" target="_blank" rel="noopener">Get directions</a>
          <a class="btn btn--outline-light" href="${site.phoneHref}">${site.phone}</a>
        </div>
      </div>
      ${withMap ? `<div class="visit__map"><iframe title="Map of Healthtinity, 246J Upper Thomson Road" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=246J+Upper+Thomson+Road+Singapore+574370&amp;output=embed"></iframe></div>` : ''}
    </div>
  </div>
</section>`;

// =====================================================================
// BLOG
// =====================================================================
function blogIndex() {
  const r = '../';
  const [first, ...rest] = posts;
  return {
    path: 'blog/',
    active: 'blog',
    title: "What's new",
    description: 'News, features and wellness tips from Healthtinity, the Yoga, Pilates & Rehab Therapy studio at Upper Thomson, Singapore.',
    body: `
${pageHero({ r, eyebrow: "What's new", title: 'Stories, news &amp; <em>gentle wisdom</em>.', lead: 'Studio news, press features and practical tips to help you move better, feel stronger and live brighter.', crumbs: [["What's new"]] })}
<section class="section section--flush">
  <div class="container">
    <a class="post-feature reveal" href="${first.slug}/">
      <div class="post-feature__img"><img src="${r}assets/img/${first.image}" alt="" width="640" height="360"></div>
      <div class="post-feature__copy">
        <div class="post__meta"><span class="tag tag--soft">${esc(first.category)}</span><span>${esc(first.date)}</span></div>
        <h2>${esc(first.title)}</h2>
        <p class="muted">${esc(first.excerpt)}</p>
        <span class="arrow-link">Read article ${icon.arrow}</span>
      </div>
    </a>
    <div class="posts posts--spaced">
      ${rest.map((p) => postCard(p, r)).join('')}
      <div class="press-card reveal">
        <h3>Lianhe Zaobao 联合早报</h3>
        <p class="muted">Healthtinity shared gentle yoga practices for better sleep and relaxation in a September 2026 feature.</p>
      </div>
    </div>
  </div>
</section>
${ctaBand(r)}`,
  };
}

function blogPost(p) {
  const r = '../../';
  const related = posts.filter((x) => x !== p);
  return {
    path: `blog/${p.slug}/`,
    active: 'blog',
    title: p.title,
    description: p.excerpt,
    body: `
<article>
  <section class="page-hero page-hero--post">
    <div class="container container--narrow">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="${r}">Home</a> <span>/</span> <a href="${r}blog/">What's new</a> <span>/</span> <span aria-current="page">${esc(p.category)}</span></nav>
      <div class="post__meta"><span class="tag tag--soft">${esc(p.category)}</span><span>By ${esc(p.author)} · ${esc(p.date)}</span></div>
      <h1>${esc(p.title)}</h1>
    </div>
  </section>
  <div class="container container--narrow">
    <div class="post-cover reveal"><img src="${r}assets/img/${p.image}" alt="" width="640" height="360"></div>
    <div class="prose">${p.body}</div>
    <div class="post-cta">
      <div><strong>Ready to try a class?</strong><span>New members: 5 classes for $60.</span></div>
      <a class="btn btn--primary" href="${site.links.packages}">Get the Starter Pack</a>
    </div>
  </div>
</article>
<section class="section section--sand">
  <div class="container">
    <div class="section__head reveal"><h2>Keep <em>reading</em>.</h2></div>
    <div class="posts">${related.map((x) => postCard(x, r)).join('')}</div>
  </div>
</section>`,
  };
}

// =====================================================================
// TEAM
// =====================================================================
function teamIndex() {
  const r = '../';
  const leads = team.filter((m) => m.lead);
  const rest = team.filter((m) => !m.lead);
  return {
    path: 'team/',
    active: 'team',
    title: 'Our Team',
    description: 'Meet the Healthtinity team: Doctor of Osteopathy, rehab therapists and certified Yoga, Mat Pilates and Barre instructors in Singapore.',
    body: `
${pageHero({ r, eyebrow: 'Our instructors', title: 'Coaches who <em>care</em>.', lead: `Led by a Doctor of Osteopathy and our senior rehab coach, our ${team.length} instructors teach in English and Mandarin. All of them are passionate about helping you move with confidence.`, crumbs: [['Team']] })}
<section class="section section--flush">
  <div class="container">
    <div class="leads">
      ${leads.map((m) => `
      <a class="lead-card reveal" href="${m.slug}/">
        ${avatar(m, r, 'lead-card__img')}
        <div class="lead-card__copy">
          <p class="role">${esc(m.role)}</p>
          <h2>${esc(m.name)}</h2>
          <p class="muted">${esc(m.bio[0].slice(0, 210))}…</p>
          <span class="arrow-link">Read full bio ${icon.arrow}</span>
        </div>
      </a>`).join('')}
    </div>
    <div class="section__head reveal" style="margin-top:96px"><h2>The <em>team</em>.</h2></div>
    <div class="team-grid">
      ${rest.map((m) => `
      <a class="coach reveal" href="${m.slug}/">
        ${avatar(m, r, 'coach__img')}
        <strong>${esc(m.name)}</strong>
        <span>${esc(m.role)}</span>
      </a>`).join('')}
    </div>
  </div>
</section>
${ctaBand(r)}`,
  };
}

function teamMember(m) {
  const r = '../../';
  const others = team.filter((x) => x !== m && x.photo).slice(0, 4);
  const coachClasses = schedule.flatMap((d) => d.classes.filter((c) => c.coach === m.name.replace(/^Dr /, '')).map((c) => ({ ...c, day: d.day })));
  return {
    path: `team/${m.slug}/`,
    active: 'team',
    title: `${m.name}, ${m.role}`,
    description: `${m.name}, ${m.role} at Healthtinity Singapore. ${m.bio[0].slice(0, 120)}`,
    body: `
<section class="page-hero">
  <div class="container">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="${r}">Home</a> <span>/</span> <a href="${r}team/">Team</a> <span>/</span> <span aria-current="page">${esc(m.name)}</span></nav>
    <div class="profile">
      <div class="profile__photo reveal">${avatar(m, r, 'profile__img')}</div>
      <div class="profile__copy reveal">
        <p class="role">${esc(m.role)}</p>
        <h1>${esc(m.name)}</h1>
        ${m.headline ? `<p class="lead">${esc(m.headline)}</p>` : `<p class="lead">${esc(m.skills)}</p>`}
        <p class="profile__skills"><strong>Skilled in</strong> ${esc(m.skills)}</p>
        <div class="actions">
          <a class="btn btn--primary" href="${site.links.schedule}">Book a class</a>
          <a class="btn btn--ghost" href="${wa(`Hi Healthtinity! I'd like to enquire about a private session with ${m.name}.`)}" target="_blank" rel="noopener">Enquire about 1:1</a>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="section section--flush">
  <div class="container profile-body">
    <div class="prose">
      <h2>Bio</h2>
      ${m.bio.map((p) => `<p>${esc(p)}</p>`).join('\n')}
      ${m.quote ? `<blockquote>“${esc(m.quote)}”<cite>— ${esc(m.name.split(' ')[0])}</cite></blockquote>` : ''}
      ${m.zh ? `<details class="zh"><summary>中文简介</summary>${m.zh.map((p) => `<p>${esc(p)}</p>`).join('')}</details>` : ''}
    </div>
    <aside class="profile-aside">
      ${m.specialties ? `<div class="aside-card"><h3>Specialties</h3><ul class="checklist checklist--sm">${m.specialties.map((s) => `<li>${icon.check} ${esc(s)}</li>`).join('')}</ul></div>` : ''}
      ${coachClasses.length ? `<div class="aside-card"><h3>Weekly classes</h3><ul class="mini-sched">${coachClasses.map((c) => `<li><span>${c.day} · ${c.time}</span>${esc(c.name.split(' · ')[0].replace(/[一-鿿（）]+.*$/, '').trim())}</li>`).join('')}</ul><a class="arrow-link" href="${r}timetable/">Full schedule ${icon.arrow}</a></div>` : ''}
    </aside>
  </div>
</section>
<section class="section section--sand">
  <div class="container">
    <div class="section__head section__head--row reveal"><div><h2>Meet more <em>coaches</em>.</h2></div><a class="arrow-link" href="${r}team/">All coaches ${icon.arrow}</a></div>
    <div class="team-grid team-grid--4">
      ${others.map((o) => `<a class="coach reveal" href="${r}team/${o.slug}/">${avatar(o, r, 'coach__img')}<strong>${esc(o.name)}</strong><span>${esc(o.role)}</span></a>`).join('')}
    </div>
  </div>
</section>`,
  };
}

// =====================================================================
// PRICING
// =====================================================================
function packagePage() {
  const r = '../';
  return {
    path: 'package/',
    active: 'pricing',
    title: 'Class Packages',
    description: 'Healthtinity class packages: New Members Starter Pack (5 classes for $60), shareable class packs with bonus classes, and HT Wallet Top Up & Flow.',
    body: `
${pageHero({ r, eyebrow: 'Pricing', title: 'Class <em>packages</em>.', lead: 'Practise at your own pace. Larger packs come with bonus classes, and many are shareable with family and friends.', crumbs: [['Pricing'], ['Packages']], extra: pricingTabs('package') })}
<section class="section section--flush">
  <div class="container">
    <div class="pricing pricing--packs">
      ${packages.map((p) => priceCard(p, site.links.packages)).join('')}
    </div>
    ${topupBlock()}
    <div class="compare reveal">
      <h2>Which option is right for <em>me</em>?</h2>
      <div class="compare__grid">
        <div><h3>Just starting out</h3><p>Try the <strong>Starter Pack</strong>: 5 classes in 30 days for $60, plus $22 wallet credit in the HT Life app.</p></div>
        <div><h3>Coming 1–2× a week</h3><p>A <strong>class pack</strong> gives you bonus classes and flexible validity from your first booking.</p></div>
        <div><h3>Coming 3×+ a week</h3><p>Go <strong>unlimited</strong> with a <a href="${r}membership/">membership</a>, from $162/month.</p></div>
        <div><h3>Prefer no commitment</h3><p><strong>Top Up &amp; Flow</strong>: load your wallet, get bonus credit and book as you go.</p></div>
      </div>
    </div>
  </div>
</section>
${faqSection(r, faqs.slice(1, 4))}`,
  };
}

function membershipPage() {
  const r = '../';
  return {
    path: 'membership/',
    active: 'pricing',
    title: 'Memberships',
    description: 'Unlimited group class memberships at Healthtinity Singapore, from $162/month. Upfront and recurring options.',
    body: `
${pageHero({ r, eyebrow: 'Pricing', title: 'Unlimited <em>memberships</em>.', lead: 'Build a consistent practice with unlimited group classes: Yoga, Mat Pilates, Therapy and more.', crumbs: [['Pricing'], ['Memberships']], extra: pricingTabs('membership') })}
<section class="section section--flush">
  <div class="container">
    <div class="group-head reveal"><h2>Upfront payment</h2><p class="muted">Pay once, practise unlimited.</p></div>
    <div class="pricing pricing--2">
      ${membershipsUpfront.map((p) => priceCard(p, site.links.memberships)).join('')}
    </div>
    <div class="group-head reveal"><h2>Recurring membership</h2><p class="muted">Auto-renewing. The longer the commitment, the lower the monthly rate.</p></div>
    <div class="pricing pricing--4">
      ${membershipsRecurring.map((p) => priceCard(p, site.links.memberships)).join('')}
    </div>
    <p class="fineprint reveal">Recurring memberships renew automatically at the billing interval shown. A S$350 cancellation fee applies before the minimum commitment ends. See our <a href="${r}terms/terms-and-conditions/">Terms &amp; Conditions</a>.</p>
  </div>
</section>
${ctaBand(r)}`,
  };
}

const pricingTabs = (active) => `
<div class="tabs" role="tablist">
  <a href="../package/" class="tab${active === 'package' ? ' is-active' : ''}">Packages</a>
  <a href="../membership/" class="tab${active === 'membership' ? ' is-active' : ''}">Memberships</a>
  <a href="../package/#topup" class="tab">Top Up &amp; Flow</a>
</div>`;

const faqSection = (r, items) => `
<section class="section section--sand">
  <div class="container split split--faq">
    <div class="reveal">
      <h2>Good to <em>know</em>.</h2>
      <p class="muted">More answers on our <a href="${r}faqs/">FAQ page</a>, or <a href="${site.whatsapp}" target="_blank" rel="noopener">message us on WhatsApp</a>.</p>
    </div>
    <div class="reveal">${faqList(items)}</div>
  </div>
</section>`;

// =====================================================================
// TIMETABLE
// =====================================================================
function timetable() {
  const r = '../';
  const coachSlug = Object.fromEntries(team.map((m) => [m.name.replace(/^Dr /, ''), m.slug]));
  const total = schedule.reduce((n, d) => n + d.classes.length, 0);
  return {
    path: 'timetable/',
    active: 'timetable',
    title: 'Group Class Schedule',
    description: `Weekly Yoga, Mat Pilates and Therapy class schedule at Healthtinity, Upper Thomson. ${total} classes a week.`,
    body: `
${pageHero({ r, eyebrow: 'Group class schedule', title: 'This week at <em>the studio</em>.', lead: `${total} classes a week across Yoga, Mat Pilates, Therapy &amp; Stretch and Tone &amp; Sculpt. Bookings open 7 days ahead and close 1 hour before class.`, crumbs: [['Schedule']], extra: `<div class="actions"><a class="btn btn--primary" href="${site.links.schedule}">Book on live schedule</a><a class="btn btn--ghost" href="${site.apps.ios}" target="_blank" rel="noopener">Get the HT Life app</a></div>` })}
<section class="section section--flush">
  <div class="container">
    <div class="sched-controls">
      <div class="day-tabs" role="tablist" aria-label="Day">
        ${schedule.map((d, i) => `<button role="tab" class="day-tab" data-day="${d.day}" aria-selected="${i === 0}"><span>${d.day}</span><small>${d.classes.length} classes</small></button>`).join('')}
      </div>
      <div class="chips" aria-label="Filter by category">
        ${categories.map(([k, label], i) => `<button class="chip${i === 0 ? ' is-active' : ''}" data-cat="${k}">${label}</button>`).join('')}
      </div>
    </div>
    ${schedule.map((d, i) => `
    <div class="day" data-day-panel="${d.day}"${i === 0 ? '' : ' hidden'}>
      <h2 class="day__title">${d.full}</h2>
      <ul class="sched">
        ${d.classes.map((c) => {
          const cat = classCategory(c.name);
          const [title, flag] = c.name.split(' · ');
          const m = title.match(/^(.*?)\s*([一-鿿].*)?$/);
          const slug = coachSlug[c.coach];
          return `
        <li class="sched__row" data-cat="${cat}">
          <div class="sched__time"><strong>${c.time}</strong><span>${c.mins} mins</span></div>
          <div class="sched__info">
            <span class="sched__cat sched__cat--${cat}">${categories.find(([k]) => k === cat)[1]}</span>${flag ? `<span class="sched__flag">${flag}</span>` : ''}
            <h3>${esc(m[1])}${m[2] ? ` <span class="zh-name">${esc(m[2])}</span>` : ''}</h3>
            <p>with ${slug ? `<a href="${r}team/${slug}/">${esc(c.coach)}</a>` : esc(c.coach)} · ${site.room}</p>
          </div>
          <a class="btn btn--ghost btn--sm" href="${site.links.schedule}">Book</a>
        </li>`;
        }).join('')}
      </ul>
    </div>`).join('')}
    <p class="fineprint">This is our typical weekly schedule. Instructors and classes can change; see the <a href="${site.links.schedule}">live schedule</a> for real-time availability and waitlists.</p>
  </div>
</section>
${faqSection(r, [faqs[0], faqs[1], faqs[2]])}`,
  };
}

// =====================================================================
// CONTACT
// =====================================================================
function contact() {
  const r = '../';
  return {
    path: 'contact-us/',
    active: 'contact',
    title: 'Contact Us',
    description: 'Contact Healthtinity: WhatsApp +65 8282 9515, email ask@healthtinity.com, or visit us at 246J Upper Thomson Road, Singapore 574370.',
    body: `
${pageHero({ r, eyebrow: 'Contact us', title: "We're here to <em>help</em>.", lead: 'Questions about classes, therapy or your account? Reach out and our team will get back to you.', crumbs: [['Contact us']] })}
<section class="section section--flush">
  <div class="container contact">
    <div class="contact__cards">
      <a class="info-card reveal" href="${site.whatsapp}" target="_blank" rel="noopener"><span class="info-card__icon info-card__icon--wa">${icon.wa}</span><div><strong>WhatsApp</strong><span>Fastest reply · ${site.phone}</span></div></a>
      <a class="info-card reveal" href="${site.phoneHref}"><span class="info-card__icon">${icon.phone}</span><div><strong>Call us</strong><span>${site.phone}</span></div></a>
      <a class="info-card reveal" href="mailto:${site.email}"><span class="info-card__icon">${icon.mail}</span><div><strong>Email</strong><span>${site.email}</span></div></a>
      <a class="info-card reveal" href="${r}location/"><span class="info-card__icon">${icon.pin}</span><div><strong>Visit</strong><span>${site.address.join(', ')}</span></div></a>
      <div class="info-card info-card--plain reveal">
        <div><strong>New to Healthtinity?</strong><span>Check out our <a href="${r}faqs/">FAQ</a> for booking, arrival and cancellation info.</span></div>
      </div>
    </div>
    <form class="form reveal" data-contact-form data-wa="${site.whatsapp}" data-email="${site.email}">
      <h2>What can we help you with?</h2>
      <div class="form__row">
        <label>Name<input name="name" required autocomplete="name"></label>
        <label>Email address<input name="email" type="email" required autocomplete="email"></label>
      </div>
      <div class="form__row">
        <label>Mobile number<input name="mobile" type="tel" autocomplete="tel" placeholder="+65"></label>
        <label>Subject
          <select name="subject">
            <option>General</option>
            <option>Group classes</option>
            <option>Yoga Rehab Therapy</option>
            <option>Private 1:1 sessions</option>
            <option>Packages &amp; memberships</option>
            <option>My account / booking</option>
          </select>
        </label>
      </div>
      <label>Description<textarea name="message" rows="5" required placeholder="Tell us a little about what you're looking for…"></textarea></label>
      <div class="form__actions">
        <button class="btn btn--primary" type="submit" data-via="wa">${icon.wa} Send via WhatsApp</button>
        <button class="btn btn--ghost" type="submit" data-via="email">Send via email</button>
      </div>
      <p class="fineprint">By contacting us you agree to our <a href="${r}terms/private-policy/">Privacy Policy</a>.</p>
    </form>
  </div>
</section>
<section class="section section--sand section--tight">
  <div class="container social-band reveal">
    <h2>Connect with us on <em>social</em>.</h2>
    <div class="social social--lg">
      <a href="${site.social.instagram}" target="_blank" rel="noopener">${icon.ig}<span>Instagram</span></a>
      <a href="${site.social.facebook}" target="_blank" rel="noopener">${icon.fb}<span>Facebook</span></a>
      <a href="${site.social.tiktok}" target="_blank" rel="noopener">${icon.tt}<span>TikTok</span></a>
    </div>
  </div>
</section>`,
  };
}

// =====================================================================
// LOCATION
// =====================================================================
function location() {
  const r = '../';
  return {
    path: 'location/',
    active: 'location',
    title: 'Locate Us',
    description: 'Find Healthtinity at 246J Upper Thomson Road, Singapore 574370. 1 min walk from Upper Thomson MRT (Exit 3), with free roadside parking nearby.',
    body: `
${pageHero({ r, eyebrow: 'Locate us', title: 'Find us at <em>Upper Thomson</em>.', lead: 'A 1-minute walk from Upper Thomson MRT (Exit 3), with plenty of buses and free roadside parking nearby.', crumbs: [['Locate us']] })}
<section class="section section--flush">
  <div class="container location">
    <div class="location__map reveal">
      <iframe title="Map of Healthtinity" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=246J+Upper+Thomson+Road+Singapore+574370&amp;output=embed"></iframe>
    </div>
    <div class="location__card reveal">
      <img class="location__logo" src="${r}assets/img/logo-180.png" alt="" width="56" height="56">
      <h2>Healthtinity</h2>
      <p class="muted">${site.room}</p>
      <ul class="info-list">
        <li>${icon.pin}<span>${site.address.join(', ')}</span></li>
        <li>${icon.phone}<a href="${site.phoneHref}">${site.phone}</a></li>
        <li>${icon.mail}<a href="mailto:${site.email}">${site.email}</a></li>
      </ul>
      <h3>Getting here</h3>
      <ul class="visit__how visit__how--dark">
        ${site.getting.map(([e, t]) => `<li><span>${e}</span>${esc(t)}</li>`).join('')}
      </ul>
      <div class="actions">
        <a class="btn btn--primary" href="https://www.google.com/maps/dir/?api=1&amp;destination=246J+Upper+Thomson+Road+Singapore+574370" target="_blank" rel="noopener">Get directions</a>
        <a class="btn btn--ghost" href="${site.whatsapp}" target="_blank" rel="noopener">WhatsApp us</a>
      </div>
    </div>
  </div>
</section>
${ctaBand(r)}`,
  };
}

// =====================================================================
// FAQ
// =====================================================================
function faqPage() {
  const r = '../';
  return {
    path: 'faqs/',
    active: '',
    title: 'Frequently Asked Questions',
    description: 'Answers to common questions about booking, arrival, cancellations, equipment and beginner classes at Healthtinity.',
    schema: `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    })}</script>`,
    body: `
${pageHero({ r, eyebrow: 'FAQ', title: 'Frequently asked <em>questions</em>.', lead: "Everything you need to know before your first class. Can't find your answer? We're a WhatsApp away.", crumbs: [['FAQ']] })}
<section class="section section--flush">
  <div class="container split split--faq">
    <div class="reveal">
      <div class="aside-card aside-card--sticky">
        <h3>Still have questions?</h3>
        <p class="muted">Our team is happy to help you choose the right class or programme.</p>
        <div class="actions actions--stack">
          <a class="btn btn--primary btn--block" href="${site.whatsapp}" target="_blank" rel="noopener">${icon.wa} WhatsApp us</a>
          <a class="btn btn--ghost btn--block" href="${r}contact-us/">Contact form</a>
        </div>
      </div>
    </div>
    <div class="reveal">${faqList(faqs)}</div>
  </div>
</section>
${ctaBand(r)}`,
  };
}

// =====================================================================
// LEGAL
// =====================================================================
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function legal(doc, path, other) {
  const r = '../../';
  const numbered = !doc.intro;
  return {
    path,
    active: '',
    title: doc.title,
    description: `${doc.title} for Healthtinity classes, packages, memberships, website and booking application.`,
    body: `
${pageHero({ r, eyebrow: 'Legal', title: doc.title, lead: doc.effective ? `Effective date: ${doc.effective}` : `${site.legalName} · Reg. ${site.reg}`, crumbs: [[doc.title]] })}
<section class="section section--flush">
  <div class="container legal">
    <aside class="legal__toc">
      <div class="aside-card aside-card--sticky">
        <h3>Contents</h3>
        <ol>${doc.sections.map(([h]) => `<li><a href="#${slugify(h)}">${esc(h)}</a></li>`).join('')}</ol>
        <a class="arrow-link" href="${r}${other[1]}">${other[0]} ${icon.arrow}</a>
      </div>
    </aside>
    <div class="prose prose--legal">
      ${doc.intro ? `<p class="lead">${esc(doc.intro)}</p>` : ''}
      ${doc.sections.map(([h, ps], i) => `
      <section id="${slugify(h)}">
        <h2>${numbered ? `<span>${i + 1}.</span> ` : ''}${esc(h)}</h2>
        ${ps.map((p) => `<p>${esc(p)}</p>`).join('')}
      </section>`).join('')}
      ${numbered ? `<div class="aside-card"><p><strong>Data Protection Officer</strong><br>${site.legalName}<br>${site.address.join(', ')}<br><a href="mailto:${site.email}">${site.email}</a> · ${site.phone}</p></div>` : ''}
    </div>
  </div>
</section>`,
  };
}

// =====================================================================
// 404
// =====================================================================
function notFound() {
  return {
    path: '',
    file: '404.html',
    title: 'Page not found',
    description: 'Page not found',
    body: `
<section class="section">
  <div class="container center-block">
    <h1>Let's find your <em>flow</em> again.</h1>
    <p class="lead">The page you're looking for has moved or doesn't exist.</p>
    <div class="actions actions--center"><a class="btn btn--primary" href="./">Back to home</a><a class="btn btn--ghost" href="timetable/">View schedule</a></div>
  </div>
</section>`,
  };
}

export function allPages() {
  return [
    home(),
    blogIndex(),
    ...posts.map(blogPost),
    teamIndex(),
    ...team.map(teamMember),
    packagePage(),
    membershipPage(),
    timetable(),
    contact(),
    location(),
    faqPage(),
    legal(terms, 'terms/terms-and-conditions/', ['Privacy Policy', 'terms/private-policy/']),
    legal(privacy, 'terms/private-policy/', ['Terms & Conditions', 'terms/terms-and-conditions/']),
    notFound(),
  ];
}
