import { site, wa } from './data.mjs';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const icon = {
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  chev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
  ig: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  fb: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z"/></svg>',
  tt: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 3 2.5 5 5.5 5"/></svg>',
  wa: '<svg viewBox="0 0 24 24" aria-hidden="true" class="fill"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2Z"/></svg>',
};

export const initials = (name) => name.replace(/^Dr\s+/, '').split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();

/** Page header band used on every inner page */
export const pageHero = ({ eyebrow, title, lead, crumbs = [], r, extra = '' }) => `
<section class="page-hero">
  <div class="container">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="${r || './'}">Home</a>${crumbs.map(([label, href]) => ` <span>/</span> ${href ? `<a href="${href}">${esc(label)}</a>` : `<span aria-current="page">${esc(label)}</span>`}`).join('')}
    </nav>
    ${eyebrow ? `<p class="eyebrow"><span class="dot"></span> ${eyebrow}</p>` : ''}
    <h1>${title}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
    ${extra}
  </div>
</section>`;

/** Closing call-to-action band */
export const ctaBand = (r) => `
<section class="section section--tight">
  <div class="container">
    <div class="cta-band reveal">
      <div>
        <p class="eyebrow eyebrow--light">New to Healthtinity?</p>
        <h2>Your first 5 classes for <em>$60</em>.</h2>
        <p>Download the HT Life app, grab the New Members Starter Pack and get <strong>$22 credit</strong> in your Healthtinity Wallet to use on your next purchase or a drop-in class.</p>
      </div>
      <div class="cta-band__actions">
        <a class="btn btn--light" href="${site.links.packages}">Get the Starter Pack</a>
        <a class="btn btn--outline-light" href="${r}timetable/">View schedule</a>
      </div>
    </div>
  </div>
</section>`;

export function layout({ path = '', title, description, body, active = '', schema = '' }) {
  const depth = path.split('/').filter(Boolean).length;
  const r = '../'.repeat(depth);
  const home = r || './';
  const a = (key) => (active === key ? ' aria-current="page"' : '');
  const fullTitle = path === '' ? `Healthtinity | Yoga, Pilates & Rehab Therapy Studio in Singapore` : `${title} | Healthtinity`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="theme-color" content="#0088AE">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Healthtinity">
  <meta property="og:title" content="${esc(fullTitle)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${r}assets/img/hero.jpg">
  <link rel="icon" type="image/png" href="${r}assets/img/logo-64.png">
  <link rel="apple-touch-icon" href="${r}assets/img/logo-180.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  ${path === '' ? '<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@900&text=%E8%81%94%E5%90%88%E6%97%A9%E6%8A%A5&display=swap" rel="stylesheet">' : ''}
  <link rel="stylesheet" href="${r}assets/css/styles.css">
  ${schema}
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>

  <div class="announce">
    <div class="container announce__inner">
      <span><strong>New:</strong> Top Up &amp; Flow. Top up $90, get $10 bonus credit.</span>
      <a href="${r}package/#topup">Learn more →</a>
    </div>
  </div>

  <header class="nav" data-nav>
    <div class="container nav__inner">
      <a href="${home}" class="brand" aria-label="Healthtinity home">
        <img src="${r}assets/img/logo-180.png" alt="" width="40" height="40">
        <span>Healthtinity</span>
      </a>
      <nav class="nav__links" aria-label="Main">
        <a href="${home}"${a('home')}>Home</a>
        <a href="${r}blog/"${a('blog')}>What's new</a>
        <a href="${r}team/"${a('team')}>Team</a>
        <div class="dropdown">
          <button class="dropdown__btn${active === 'pricing' ? ' is-active' : ''}" aria-expanded="false" data-dropdown>Pricing ${icon.chev}</button>
          <div class="dropdown__menu">
            <a href="${r}package/"><strong>Packages</strong><span>Class packs &amp; Starter Pack</span></a>
            <a href="${r}membership/"><strong>Memberships</strong><span>Unlimited group classes</span></a>
            <a href="${r}package/#topup"><strong>Top Up &amp; Flow</strong><span>Wallet credits with bonus</span></a>
          </div>
        </div>
        <a href="${r}timetable/"${a('timetable')}>Schedule</a>
        <a href="${r}contact-us/"${a('contact')}>Contact</a>
        <a href="${r}location/"${a('location')}>Locate us</a>
      </nav>
      <div class="nav__cta">
        <a class="btn btn--primary btn--sm" href="${site.links.schedule}">Book a class</a>
      </div>
      <button class="nav__toggle" aria-label="Open menu" aria-expanded="false" data-menu-toggle>
        <span></span><span></span>
      </button>
    </div>
    <div class="mobile-menu" data-menu>
      <a href="${home}">Home</a>
      <a href="${r}blog/">What's new</a>
      <a href="${r}team/">Team</a>
      <a href="${r}package/">Packages</a>
      <a href="${r}membership/">Memberships</a>
      <a href="${r}timetable/">Group class schedule</a>
      <a href="${r}contact-us/">Contact us</a>
      <a href="${r}location/">Locate us</a>
      <a href="${r}faqs/">FAQ</a>
      <a class="btn btn--primary" href="${site.links.schedule}">Book a class</a>
    </div>
  </header>

  <main id="main">
${body}
  </main>

  <footer class="footer">
    <div class="container footer__grid">
      <div class="footer__about">
        <a href="${home}" class="brand">
          <img src="${r}assets/img/logo-180.png" alt="" width="40" height="40">
          <span>Healthtinity</span>
        </a>
        <p class="muted">${esc(site.tagline)}. Helping people move better since 2019.</p>
        <div class="social">
          <a href="${site.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon.ig}</a>
          <a href="${site.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon.fb}</a>
          <a href="${site.social.tiktok}" target="_blank" rel="noopener" aria-label="TikTok">${icon.tt}</a>
          <a href="${site.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon.wa}</a>
        </div>
      </div>
      <div>
        <h4>Studio</h4>
        <a href="${r}team/">Our team</a>
        <a href="${r}blog/">What's new</a>
        <a href="${r}location/">Locate us</a>
        <a href="${r}contact-us/">Contact us</a>
      </div>
      <div>
        <h4>Classes</h4>
        <a href="${r}timetable/">Group class schedule</a>
        <a href="${r}package/">Packages</a>
        <a href="${r}membership/">Memberships</a>
        <a href="${r}faqs/">FAQ</a>
      </div>
      <div>
        <h4>Visit</h4>
        <p class="footer__addr">${site.address.join('<br>')}</p>
        <a href="${site.phoneHref}">${site.phone}</a>
        <a href="mailto:${site.email}">${site.email}</a>
        <div class="apps">
          <a href="${site.apps.ios}" target="_blank" rel="noopener">App Store</a>
          <a href="${site.apps.android}" target="_blank" rel="noopener">Google Play</a>
        </div>
      </div>
    </div>
    <div class="container footer__base">
      <span>© <span data-year>2026</span> ${site.legalName} · Reg. ${site.reg}</span>
      <span><a href="${r}terms/terms-and-conditions/">Terms &amp; Conditions</a> · <a href="${r}terms/private-policy/">Privacy Policy</a> · <a href="${r}faqs/">FAQ</a></span>
    </div>
  </footer>

  <a class="wa-fab" href="${wa('Hi Healthtinity! 👋 I have a question.')}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">
    ${icon.wa}<span>Chat with us</span>
  </a>

  <script src="${r}assets/js/main.js" defer></script>
</body>
</html>
`;
}
