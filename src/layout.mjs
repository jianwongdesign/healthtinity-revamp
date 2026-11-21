import { site as siteEn, wa, SITE_URL, BOOK } from './data.mjs';
import { t, ar, isZh, L } from './i18n.mjs';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { classPages, classLabel } from './classes.mjs';

// Content hash per asset, so each deploy busts browser/CDN caches when a file changes
const v = (f) => createHash('md5').update(readFileSync(new URL(`./assets/${f}`, import.meta.url))).digest('hex').slice(0, 8);
const ver = { css: v('css/styles.css'), js: v('js/main.js'), promos: v('js/promotions.js'), classes: v('js/classes.js') };
const promotionsApi = process.env.PROMOTIONS_API ?? (process.env.STAGING === '1'
  ? '/index.php?rest_route=/healthtinity/v1/promotions'
  : 'https://welcome-lightsteelblue-mosquito-41.hostingersite.com/index.php?rest_route=/healthtinity/v1/promotions');

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
      <a href="${r || './'}">${t('Home', '首页')}</a>${crumbs.map(([label, href]) => ` <span>/</span> ${href ? `<a href="${href}">${esc(label)}</a>` : `<span aria-current="page">${esc(label)}</span>`}`).join('')}
    </nav>
    <h1>${title}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
    ${extra}
  </div>
</section>`;

/** Closing call-to-action band */
export const ctaBand = (r) => {
  if (promotionsApi) return `<section class="promotions" data-promotions-api="${esc(promotionsApi)}" aria-label="${t('Studio promotions', '工作室优惠')}" hidden></section>`;
  const site = siteEn; return `
<section class="section section--tight">
  <div class="container">
    <div class="cta-band reveal">
      <div>
        <h2>${t('New here? Your first 5 classes are $60.', '新朋友？前 5 堂课只需 $60。')}</h2>
        <p>${t('Download the HT Life app, grab the New Members Starter Pack and get <strong>$22 credit</strong> in your Healthtinity Wallet to use on your next purchase or a drop-in class.', '下载 HT Life 应用程序，购买新会员体验配套，即可获得 <strong>$22 额度</strong>存入 Healthtinity 钱包，可用于下次购买或单堂课程。')}</p>
      </div>
      <div class="cta-band__actions">
        <a class="btn btn--light" href="${site.links.packages}">${t('Get the Starter Pack', '购买体验配套')}</a>
        <a class="btn btn--outline-light" href="${r}timetable/">${t('View schedule', '查看课表')}</a>
      </div>
    </div>
  </div>
</section>`; };

export function layout({ path = '', title, description, body, active = '', schema = '', file, og = {} }) {
  const site = L.site();
  const depth = path.split('/').filter(Boolean).length;
  const r = '../'.repeat(depth);
  const A = ar(r); // asset root
  const home = r || './';
  const a = (key) => (active === key ? ' aria-current="page"' : '');
  const fullTitle = path === '' ? t('Healthtinity | Yoga, Pilates & Rehab Therapy Studio in Singapore', 'Healthtinity | 新加坡瑜伽、普拉提与康复疗法工作室') : `${title} | Healthtinity`;
  // Same page in the other language
  const enHref = isZh() ? `${r}../${path}` : `${r}${path}`;
  const zhHref = isZh() ? `${r}${path}` : `${r}zh/${path}`;
  // Absolute URLs for share previews (Open Graph / X) and search engines
  const abs = (p) => SITE_URL + p;
  const pageUrl = abs((isZh() ? 'zh/' : '') + (file || path));
  const enUrl = abs(path);
  const zhUrl = abs('zh/' + path);
  const share = {
    title: og.title || fullTitle,
    description: og.description || description,
    image: abs(og.image || `assets/img/og/share-${t('en', 'zh')}.jpg`),
    width: og.width || 1200,
    height: og.height || 630,
    alt: og.alt || t('Healthtinity: coaches who know your name. Yoga, Mat Pilates and Yoga Rehab Therapy at Upper Thomson, Singapore.', 'Healthtinity：叫得出你名字的教练。新加坡 Upper Thomson 的瑜伽、垫上普拉提与瑜伽康复疗法。'),
    type: og.type || 'website',
  };
  const langSwitch = (cls = '') => `<div class="lang${cls}" role="group" aria-label="Language / 语言">
        <a href="${enHref || './'}" lang="en" hreflang="en"${isZh() ? '' : ' aria-current="true"'}>EN</a>
        <a href="${zhHref || './'}" lang="zh-Hans" hreflang="zh-Hans"${isZh() ? ' aria-current="true"' : ''}>中文</a>
      </div>`;

  return `<!doctype html>
<html lang="${t('en', 'zh-Hans')}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="theme-color" content="#007EA1">
  <link rel="canonical" href="${pageUrl}">
  <meta property="og:type" content="${share.type}">
  <meta property="og:site_name" content="Healthtinity">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:title" content="${esc(share.title)}">
  <meta property="og:description" content="${esc(share.description)}">
  <meta property="og:image" content="${share.image}">
  <meta property="og:image:width" content="${share.width}">
  <meta property="og:image:height" content="${share.height}">
  <meta property="og:image:alt" content="${esc(share.alt)}">
  <meta property="og:locale" content="${t('en_SG', 'zh_SG')}">
  <meta property="og:locale:alternate" content="${t('zh_SG', 'en_SG')}">
  ${(og.meta || []).map(([k, v]) => `<meta property="${k}" content="${esc(v)}">`).join('\n  ')}
  <meta name="twitter:card" content="${share.width === share.height ? 'summary' : 'summary_large_image'}">
  <meta name="twitter:title" content="${esc(share.title)}">
  <meta name="twitter:description" content="${esc(share.description)}">
  <meta name="twitter:image" content="${share.image}">
  <meta name="twitter:image:alt" content="${esc(share.alt)}">
  <link rel="icon" type="image/png" href="${A}assets/img/logo-64.png">
  <link rel="apple-touch-icon" href="${A}assets/img/logo-180.png">
  <link rel="alternate" hreflang="en" href="${enUrl}">
  <link rel="alternate" hreflang="zh-Hans" href="${zhUrl}">
  <link rel="alternate" hreflang="x-default" href="${enUrl}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${A}assets/css/styles.css?v=${ver.css}">
  <script>document.documentElement.classList.add('js')</script>
  ${schema}
</head>
<body>
  <a class="skip" href="#main">${t('Skip to content', '跳至内容')}</a>

  <div class="announce">
    <div class="container announce__inner">
      <span><strong>${t('New:', '新推出：')}</strong> ${t('Top Up &amp; Flow. Top up $90, get $10 bonus credit.', '储值随心练：储值 $90，额外获赠 $10。')}</span>
      <a href="${r}package/#topup">${t('Learn more', '了解更多')} →</a>
    </div>
  </div>

  <header class="nav" data-nav>
    <div class="container nav__inner">
      <a href="${home}" class="brand" aria-label="${t('Healthtinity home', 'Healthtinity 首页')}">
        <img src="${A}assets/img/logo-180.png" alt="" width="40" height="40">
        <span>Healthtinity</span>
      </a>
      <nav class="nav__links" aria-label="${t('Main', '主菜单')}">
        <a href="${home}"${a('home')}>${t('Home', '首页')}</a>
        <div class="dropdown">
          <button class="dropdown__btn${active === 'classes' ? ' is-active' : ''}" aria-expanded="false" aria-controls="classes-menu" data-dropdown>${t('Classes', '课程')} ${icon.chev}</button>
          <div class="dropdown__menu" id="classes-menu">
            ${classPages.map(c => `<a href="${r}classes/${c.slug}/"${path === `classes/${c.slug}/` ? ' aria-current="page"' : ''}>${esc(classLabel(c))}</a>`).join('')}
          </div>
        </div>
        <a href="${r}team/"${a('team')}>${t('Team', '团队')}</a>
        <div class="dropdown">
          <button class="dropdown__btn${active === 'pricing' ? ' is-active' : ''}" aria-expanded="false" data-dropdown>${t('Pricing', '价格')} ${icon.chev}</button>
          <div class="dropdown__menu">
            <a href="${r}package/"><strong>${t('Packages', '课程配套')}</strong><span>${t('Class packs &amp; Starter Pack', '课程配套与体验配套')}</span></a>
            <a href="${r}membership/"><strong>${t('Memberships', '会员')}</strong><span>${t('Unlimited group classes', '团体课无限上')}</span></a>
            <a href="${r}package/#topup"><strong>${t('Top Up &amp; Flow', '储值随心练')}</strong><span>${t('Wallet credits with bonus', '钱包储值送额度')}</span></a>
          </div>
        </div>
        <a href="${r}timetable/"${a('timetable')}>${t('Schedule', '课表')}</a>
        <a href="${r}contact-us/"${a('contact')}>${t('Contact Us', '联系我们')}</a>
      </nav>
      <div class="nav__cta">
        ${langSwitch()}
        <a class="btn btn--primary btn--sm" href="${site.links.schedule}">${t('Book a class', '预约课程')}</a>
      </div>
      ${langSwitch(' lang--bar')}
      <button class="nav__toggle" aria-label="${t('Open menu', '打开菜单')}" aria-expanded="false" aria-controls="mobile-navigation" data-menu-toggle>
        <span></span><span></span>
      </button>
    </div>
    <div class="mobile-menu" id="mobile-navigation" data-menu inert>
      <a href="${home}">${t('Home', '首页')}</a>
      <details class="mobile-classes"${active === 'classes' ? ' open' : ''}>
        <summary>${t('Classes', '课程')}</summary>
        <div>${classPages.map(c => `<a href="${r}classes/${c.slug}/"${path === `classes/${c.slug}/` ? ' aria-current="page"' : ''}>${esc(classLabel(c))}</a>`).join('')}</div>
      </details>
      <a href="${r}team/">${t('Team', '团队')}</a>
      <a href="${r}package/">${t('Packages', '课程配套')}</a>
      <a href="${r}membership/">${t('Memberships', '会员')}</a>
      <a href="${r}timetable/">${t('Group class schedule', '团体课课表')}</a>
      <a href="${r}contact-us/">${t('Contact us', '联系我们')}</a>
      <a href="${r}faqs/">${t('FAQ', '常见问题')}</a>
      <a class="btn btn--primary" href="${site.links.schedule}">${t('Book a class', '预约课程')}</a>
    </div>
  </header>

  <main id="main">
${body}
${ctaBand(r)}
  </main>

  <footer class="footer">
    <div class="container footer__grid">
      <div class="footer__about">
        <a href="${home}" class="brand">
          <img src="${A}assets/img/logo-180.png" alt="" width="40" height="40">
          <span>Healthtinity</span>
        </a>
        <p class="muted">${esc(site.tagline)}${t('. Helping people move better since 2019.', '。自 2019 年起，帮助大家动得更好。')}</p>
        <div class="social">
          <a href="${site.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon.ig}</a>
          <a href="${site.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon.fb}</a>
          <a href="${site.social.tiktok}" target="_blank" rel="noopener" aria-label="TikTok">${icon.tt}</a>
          <a href="${site.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon.wa}</a>
        </div>
      </div>
      <div>
        <h4>${t('Studio', '工作室')}</h4>
        <a href="${r}about-us/">${t('About Us', '关于我们')}</a>
        <a href="${r}team/">${t('Our team', '我们的团队')}</a>
        <a href="${r}contact-us/">${t('Contact us', '联系我们')}</a>
      </div>
      <div>
        <h4>${t('Classes', '课程')}</h4>
        ${classPages.map(c => `<a href="${r}classes/${c.slug}/">${esc(classLabel(c))}</a>`).join('')}
        <a href="${r}timetable/">${t('Group class schedule', '团体课课表')}</a>
        <a href="${r}package/">${t('Packages', '课程配套')}</a>
        <a href="${r}membership/">${t('Memberships', '会员')}</a>
        <a href="${r}faqs/">${t('FAQ', '常见问题')}</a>
      </div>
      <div>
        <h4>${t('Visit', '到访')}</h4>
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
      <span>© <span data-year>2026</span> ${site.legalName} · ${t('Reg.', '注册号')} ${site.reg}</span>
      <span><a href="${r}terms/terms-and-conditions/">${t('Terms &amp; Conditions', '条款与细则')}</a> · <a href="${r}terms/private-policy/">${t('Privacy Policy', '隐私政策')}</a> · <a href="${r}faqs/">${t('FAQ', '常见问题')}</a></span>
    </div>
  </footer>

  <a class="wa-fab" href="${wa(t('Hi Healthtinity! 👋 I have a question.', '您好 Healthtinity！👋 我想咨询一下。'))}" target="_blank" rel="noopener" aria-label="${t('Chat with us on WhatsApp', '通过 WhatsApp 联系我们')}">
    ${icon.wa}<span>${t('Chat with us', '联系我们')}</span>
  </a>

  <script src="${A}assets/js/main.js?v=${ver.js}" defer></script>
${active === 'classes' ? `  <script src="${A}assets/js/classes.js?v=${ver.classes}" defer></script>` : ''}
${promotionsApi ? `  <script src="${A}assets/js/promotions.js?v=${ver.promos}" defer></script>` : ''}
</body>
</html>
`.replace(/<a\b[^>]*>/g, (tag) => {
  const href = tag.match(/\bhref="([^"]+)"/);
  if (!href || !(href[1] === BOOK || href[1].startsWith(BOOK + '/'))) return tag;
  // The Hostinger preview proxy rewrites absolute hrefs. Keep the intended
  // external booking destination separately for the browser to restore.
  const original = href[1].replace(/&amp;/g, '&');
  return tag.replace('<a ', `<a data-booking-href="${Buffer.from(original).toString('base64')}" `);
});
}
