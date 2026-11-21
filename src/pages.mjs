import { site as siteEn, wa, topups, schedule, classCategory } from './data.mjs';
import { terms, privacy } from './legal.mjs';
import { esc, icon, initials, pageHero } from './layout.mjs';
import { t, ar, isZh, L, className } from './i18n.mjs';
import { readFileSync } from 'node:fs';
import { classPages, classPage } from './classes.mjs';
import { academyPage } from './academy.mjs';

// Official Lianhe Zaobao logo (Wikipedia: File:Lianhe_Zaobao_new_logo.svg); mono by default, brand colours on hover
const zaobaoLogo = readFileSync(new URL('./assets/img/press/zaobao.svg', import.meta.url), 'utf8')
  .replace('<svg ', '<svg class="press__svg" role="img" aria-label="Lianhe Zaobao" ')
  .replace(/fill="black"/g, 'fill="currentColor"')
  .replace(/fill="(#A80034|#E90044)"/g, 'class="zb-brand" style="--c:$1" fill="currentColor"');

const site = siteEn; // links, phone, address: same in both languages
const money = (n) => n.toLocaleString('en-SG');
const avatar = (m, r, cls = '') =>
  m.photo
    ? `<img class="${cls}" src="${ar(r)}assets/img/team/${m.photo}" alt="${esc(m.name)}" loading="lazy" width="560" height="560">`
    : `<div class="${cls} avatar-fallback" aria-hidden="true">${initials(m.name)}</div>`;

// Use the actual instructor portraits until an official group photograph is supplied.
const teamGroup = r => `<figure class="team-group">
  <div class="team-group__portraits">
    ${L.team().map(m => m.photo
      ? `<img src="${ar(r)}assets/img/team/${m.photo}" alt="${esc(m.name)}" loading="lazy" width="560" height="700">`
      : `<div class="team-group__placeholder" role="img" aria-label="${esc(m.name)}"><span aria-hidden="true">${initials(m.name)}</span><small>${esc(m.name)}</small></div>`).join('')}
  </div>
  <figcaption>${t('The Healthtinity instructor team', 'Healthtinity 导师团队')}</figcaption>
</figure>`;

const faqList = (items) => `
<div class="faq">
  ${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n  ')}
</div>`;

const getting = () => L.site().getting;

/** First sentence(s) of a bio, trimmed to fit a share preview (~160 chars EN, ~80 ZH) */
const snippet = (text) => {
  const max = isZh() ? 80 : 160;
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const stop = Math.max(cut.lastIndexOf(isZh() ? '。' : '. '), cut.lastIndexOf(isZh() ? '，' : ', '));
  return (stop > max * 0.5 ? cut.slice(0, stop) : cut.replace(/\s+\S*$/, '')) + '…';
};

// ---------------------------------------------------------------------
// Pricing cards
// ---------------------------------------------------------------------
const priceCard = (p, href, cta = t('Buy now', '立即购买')) => `
<article class="price${p.featured ? ' price--hot' : ''} reveal">
  ${p.badge ? `<span class="ribbon">${esc(p.badge)}</span>` : ''}
  <h3>${esc(p.name)}</h3>
  ${p.sub ? `<p class="price__sub">${esc(p.sub)}</p>` : ''}
  <p class="price__amt"><sup>S$</sup>${money(p.price)}${p.per ? `<small>/ ${p.per}</small>` : ''}</p>
  <p class="price__meta">${esc(p.credits || p.billing || t('One-time payment', '一次性付款'))}${p.credits ? t(' · One-time payment', ' · 一次性付款') : ''}</p>
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
    <h3>${t('Top Up &amp; Flow: more flexibility, more you.', '储值随心练：更灵活，更自在。')}</h3>
    <p>${t("Not everyone wants to commit to a package, and now you don't have to. Top up your HT Wallet, receive bonus credits and use them however you like.", '不是每个人都想绑定课程配套，现在您不必了。为 HT 钱包储值，获得额外赠送额度，随心使用。')}</p>
  </div>
  <ul class="topup__tiers">
    ${topups.map((x) => `<li><strong>$${x.pay}</strong><span>${t(`+ $${x.bonus} bonus`, `额外送 $${x.bonus}`)}</span></li>`).join('')}
  </ul>
  <a class="btn btn--light" href="${wa(t("Hi Healthtinity! 👋 I saw the Top Up & Flow offer on your website and would like to find out more about the HT Wallet Top Up options", '您好 Healthtinity！👋 我在网站上看到储值随心练（Top Up & Flow）优惠，想了解 HT 钱包储值的详情。'))}" target="_blank" rel="noopener">${t('Enquire on WhatsApp', 'WhatsApp 咨询')}</a>
</div>`;

const classTypes = () => [
  ['yoga', t('Yoga', '瑜伽'), t('Hatha, Vinyasa, Ashtanga, Wheel Yoga, Yin &amp; Restore, and Hot &amp; Warm flows.', '哈他、流瑜伽、阿斯汤加、瑜伽轮、阴瑜伽与修复，以及热瑜伽与温热流瑜伽。'), 'class-yoga.jpg', t('A small group class holding warrior two pose', '小班瑜伽课正在练习战士二式')],
  ['pilates', t('Mat Pilates', '垫上普拉提'), t('Foundation, Dynamic and Warm Mat Pilates for core, posture and stability.', '基础、动态与温热垫上普拉提，强化核心、改善体态与稳定性。'), 'class-pilates.jpg', t('A Mat Pilates class doing single-leg lifts while a coach gives a cue', '垫上普拉提课，导师正在指导单腿抬举')],
  ['therapy', t('Therapy &amp; Stretch', '理疗伸展'), t('Mobility, Full Body Stretch, Myofascial Release and Upper Body Stretch.', '关节灵活、全身伸展、筋膜放松与上半身伸展。'), 'hero.jpg', t('A Healthtinity therapy and stretch group class', 'Healthtinity 理疗伸展团体课')],
  ['sculpt', t('Tone &amp; Sculpt', '紧致塑形'), t('Low-impact, high-energy sculpting and Barre-inspired strength.', '低冲击、高能量的塑形训练，融合芭蕾式力量练习。'), 'class-sculpt.jpg', t('A Tone and Sculpt class squatting with light dumbbells', '紧致塑形课学员手持轻哑铃深蹲')],
];

// =====================================================================
// HOME
// =====================================================================
function home() {
  const r = '';
  const A = ar(r);
  const packages = L.packages();
  const membershipsRecurring = L.membershipsRecurring();
  // Class photos for the hero reel. Repeated so the loop is wide enough on large screens.
  const reelBase = [
    ['yoga', t('Yoga', '瑜伽'), 'class-yoga.jpg', t('A small group yoga class holding warrior two', '小班瑜伽课正在练习战士二式')],
    ['mat-pilates', t('Mat Pilates', '垫上普拉提'), 'class-pilates.jpg', t('A Mat Pilates class doing single-leg lifts while a coach gives a cue', '垫上普拉提课，导师正在指导单腿抬举')],
    ['therapy-stretch', t('Therapy &amp; Stretch', '理疗伸展'), 'hero.jpg', t('A therapy and stretch class easing into a knee hug', '理疗伸展课学员抱膝放松')],
    ['tone-sculpt', t('Tone &amp; Sculpt', '紧致塑形'), 'class-sculpt.jpg', t('A Tone and Sculpt class squatting with light dumbbells', '紧致塑形课学员手持轻哑铃深蹲')],
    ['private-1-to-1', t('Private 1:1', '私人一对一'), 'hero-coach.jpg', t('A coach guiding a seated side stretch', '导师指导坐姿侧伸展')],
  ];
  const reel = [...reelBase, ...reelBase];
  // Headline split into words (EN) or phrases (ZH) for the staggered rise
  const words = t('Coaches who know your name.', '叫得出|你名字的|教练。').split(t(' ', '|'));
  return {
    path: '',
    active: 'home',
    og: {
      title: t('Healthtinity · Coaches who know your name', 'Healthtinity · 叫得出你名字的教练'),
      description: t('Yoga, Mat Pilates and Yoga Rehab Therapy at Upper Thomson, led by a Doctor of Osteopathy and taught in English and Mandarin. New here? Your first 5 classes are $60.', 'Upper Thomson 的瑜伽、垫上普拉提与瑜伽康复疗法工作室，由整骨医学博士带领，提供英语及华语教学。新朋友前 5 堂课只需 $60。'),
    },
    title: t('Home', '首页'),
    description: t("Singapore's first boutique Yoga, Pilates & Rehab Therapy studio at Upper Thomson. Expert-led yoga, Mat Pilates, private coaching, yoga therapy and rehabilitation for back, neck and shoulder pain.", '新加坡首家精品瑜伽、普拉提与康复疗法工作室，位于 Upper Thomson。专业导师带领瑜伽、垫上普拉提、私人教练、瑜伽疗法，以及针对腰背、颈部和肩膀疼痛的康复课程。'),
    schema: `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org', '@type': 'HealthClub', name: 'Healthtinity', url: 'https://healthtinity.com',
      telephone: site.phone, email: site.email, foundingDate: '2019',
      address: { '@type': 'PostalAddress', streetAddress: '246J Upper Thomson Road', addressLocality: 'Singapore', postalCode: '574370', addressCountry: 'SG' },
      sameAs: Object.values(site.social),
    })}</script>`,
    body: `
<section class="hero">
  <img class="hero__bg" src="${A}assets/img/hero-studio.jpg" srcset="${A}assets/img/hero-studio-1200.jpg 1200w, ${A}assets/img/hero-studio.jpg 2400w" sizes="100vw" alt="" width="2400" height="1350" fetchpriority="high">
  <div class="hero__panel">
    <div class="hero__copy">
      <a class="hero__tag" href="${r}blog/yoga-for-better-sleep-in-singapore-healthtinity-featured-in-lianhe-zaobao/">
        <span>${t('Featured in', '媒体报道')}</span><span class="hero__tag-logo">${zaobaoLogo}</span><span class="hero__tag-more">${t('Read the feature', '阅读报道')} ${icon.arrow}</span>
      </a>
      <h1>${words.map((w, i) => `<span class="hero__word" style="--i:${i}">${w}</span>`).join(t(' ', ''))}</h1>
      <p class="hero__lead">${t('Yoga, Mat Pilates and Yoga Rehab Therapy at Upper Thomson, taught in English and Mandarin and led by Dr Kai, Doctor of Osteopathy.', '位于 Upper Thomson 的瑜伽、垫上普拉提与瑜伽康复疗法工作室，提供英语及华语教学，由整骨医学博士 Dr Kai 带领。')}</p>
      <div class="actions">
        <a class="btn btn--primary" href="${site.links.packages}">${t('Start with 5 classes for $60', '$60 体验 5 堂课')} ${icon.arrow}</a>
        <a class="wa-link" href="${wa(t("Hi Healthtinity! I'm new and would like to find out which class suits me.", '您好 Healthtinity！我是新朋友，想了解哪一堂课适合我。'))}" target="_blank" rel="noopener">${icon.wa} ${t('WhatsApp us', 'WhatsApp 我们')}</a>
      </div>
    </div>
    <div class="reel">
      <div class="reel__track">
        ${[...reel, ...reel].map(([c, label, img, alt], i) => { const dup = i >= reelBase.length; return `<a class="reel__card" href="${r}classes/${c}/"${dup ? ' aria-hidden="true" tabindex="-1"' : ''}><img src="${A}assets/img/hero-reel/${img}" alt="${dup ? '' : alt}" width="480" height="640"${i < 3 ? ' fetchpriority="high"' : ''}><span class="reel__name">${label}</span></a>`; }).join('')}
      </div>
    </div>
  </div>
</section>

<div class="marquee" aria-hidden="true">
  <div class="marquee__track">
    ${Array(4).fill(reelBase.map(([, label]) => `<span>${label}</span><i></i>`).join('')).join('')}
  </div>
</div>

<section class="section" id="start">
  <div class="container">
    <div class="section__head reveal">
      <h2>${t('Your first week, sorted.', '第一周，帮你安排好。')}</h2>
      <p class="lead">${t('Five classes to try anything on the schedule, from gentle therapy stretches to Hot Vinyasa. Beginners are always welcome.', '五堂课，课表上的课程任你体验，从温和的理疗伸展到热流瑜伽。我们永远欢迎初学者。')}</p>
    </div>
    <div class="welcome">
      <div class="stamp reveal">
        <p class="stamp__kind">${t('New Members Starter Pack', '新会员体验配套')}</p>
        <p class="stamp__offer">${t('5 classes · $60', '5 堂课 · $60')}</p>
        <ol class="stamp__dots" aria-label="${t('Five classes', '五堂课')}">
          <li class="is-stamped"><img src="${A}assets/img/logo-180.png" alt="" width="40" height="40"></li><li>2</li><li>3</li><li>4</li><li>5</li>
        </ol>
        <ul class="stamp__perks">
          <li>${icon.check} <span>${t('Any group class: Yoga, Mat Pilates, Therapy, Tone &amp; Sculpt', '任何团体课：瑜伽、垫上普拉提、理疗、紧致塑形')}</span></li>
          <li>${icon.check} <span>${t('Plus <strong>$22 credit</strong> in your Healthtinity Wallet', '另送 <strong>$22 额度</strong>存入 Healthtinity 钱包')}</span></li>
          <li>${icon.check} <span>${t('Book in the HT Life app, up to 7 days ahead', '在 HT Life 应用程序预约，最多可提前 7 天')}</span></li>
        </ul>
        <div class="actions">
          <a class="btn btn--primary" href="${site.links.packages}">${t('Get the Starter Pack', '购买体验配套')} ${icon.arrow}</a>
          <a class="arrow-link" href="${r}package/">${t('All packages', '所有配套')}</a>
        </div>
      </div>
      <div class="today reveal" data-today>
        <div class="today__head">
          <h3 data-today-title>${t('Today at the studio', '今日课程')}</h3>
          <span>${site.room} · 246J Upper Thomson Rd</span>
        </div>
        ${schedule.map((d, i) => `<ol class="today__list" data-today-day="${d.day}"${i ? ' hidden' : ''}>
          ${d.classes.map((c) => `<li class="today__row" data-time="${c.time}"><span class="today__time">${c.time}</span><span class="today__class">${esc(className(c.name).name)}<small>${t('with', '导师：')} ${esc(c.coach)}</small></span><a href="${site.links.schedule}">${t('Book', '预约')}</a></li>`).join('')}
        </ol>`).join('')}
        <a class="arrow-link" href="${r}timetable/">${t('See the full week', '查看整周课表')} ${icon.arrow}</a>
      </div>
    </div>
  </div>
</section>

<section class="section section--sand" id="story">
  <div class="container team-intro">
    <div class="section__head section__head--row">
      <div><h2>${t('Meet the people behind your practice.', '认识陪伴您练习的团队。')}</h2>
      <p class="lead">${t('Get to know our studio and the instructors who guide every class.', '了解我们的工作室，以及每堂课背后用心指导的导师。')}</p></div>
    </div>
    ${teamGroup(r)}
    <div class="actions actions--center">
      <a class="btn btn--primary" href="${r}about-us/">${t('About Us', '关于我们')} ${icon.arrow}</a>
      <a class="btn btn--ghost" href="${r}team/">${t('Meet the Instructors', '认识导师团队')} ${icon.arrow}</a>
    </div>
  </div>
</section>

<section class="section" id="classes">
  <div class="container">
    <div class="section__head section__head--row reveal">
      <div>
        <h2>${t('Find what moves you.', '找到让你心动的课程。')}</h2>
        <p class="lead" style="margin:0">${t('More than 50 classes a week across four kinds of practice.', '每周超过 50 堂课，涵盖四大类练习。')}</p>
      </div>
      <a class="arrow-link" href="${r}timetable/">${t('View the weekly schedule', '查看每周课表')} ${icon.arrow}</a>
    </div>
    <div class="tiles">
      ${classTypes().map(([c, title, d, img, alt]) => `<a class="tile reveal" href="${r}classes/${classPages.find(item => item.category === c).slug}/">
        <div class="tile__img"><img src="${A}assets/img/${img}" alt="${alt}" loading="lazy" width="1200" height="900">${c === 'therapy' ? `<span class="tag">${t('Most loved', '最受欢迎')}</span>` : ''}</div>
        <div class="tile__body"><h3>${title} ${icon.arrow}</h3><p>${d}</p></div>
      </a>`).join('')}
    </div>
    <div class="private reveal">
      <div><h3>${t('Prefer one-to-one?', '想要一对一？')}</h3><p>${t('Private coaching and therapy built around your body and goals.', '根据您的身体状况和目标量身定制的私人教练与理疗。')}</p></div>
      <a class="btn btn--ghost" href="${r}classes/private-1-to-1/">${t('Explore Private 1:1', '了解私人一对一')}</a>
    </div>
  </div>
</section>

<section class="section section--sun" id="pricing">
  <div class="container">
    <div class="section__head section__head--row reveal">
      <h2>${t('Flexible ways to flow.', '灵活的练习方式。')}</h2>
      <a class="arrow-link" href="${r}package/">${t('Compare all options', '比较所有方案')} ${icon.arrow}</a>
    </div>
    <div class="pricing">
      ${priceCard(packages[0], site.links.packages, t('Get started', '立即开始'))}
      ${priceCard(packages[3], site.links.packages, t('Choose pack', '选择配套'))}
      ${priceCard({ ...membershipsRecurring[2], featured: false, badge: null }, site.links.memberships, t('See memberships', '查看会员方案'))}
    </div>
    ${topupBlock()}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section__head section__head--row reveal">
      <h2>${t('From the studio.', '工作室动态。')}</h2>
      <a class="arrow-link" href="${r}blog/">${t('See all articles', '查看所有文章')} ${icon.arrow}</a>
    </div>
    <div class="posts">
      ${L.posts().map((p) => postCard(p, r)).join('')}
    </div>
  </div>
</section>

${visitBlock(r)}
`,
  };
}

const postCard = (p, r) => `
<a class="post reveal" href="${r}blog/${p.slug}/">
  <div class="post__img"><img src="${ar(r)}assets/img/${p.image}" alt="" loading="lazy" width="640" height="360"></div>
  <div class="post__meta"><span class="tag tag--soft">${esc(p.category)}</span><span>${esc(p.date)}</span></div>
  <h3>${esc(p.title)}</h3>
  <p class="muted">${esc(p.excerpt)}</p>
</a>`;

const directions = 'https://www.google.com/maps/dir/?api=1&amp;destination=246J+Upper+Thomson+Road+Singapore+574370';

const visitBlock = (r, withMap = true) => `
<section class="section">
  <div class="container">
    <div class="visit reveal">
      <div class="visit__copy">
        <h2>${t('Your first class is <em>closer</em> than you think.', '你的第一堂课，<em>比你想象的更近</em>。')}</h2>
        <address>${site.address.join('<br>')}</address>
        <ul class="visit__how">
          ${getting().map(([e, x]) => `<li><span>${e}</span>${esc(x)}</li>`).join('')}
        </ul>
        <div class="actions">
          <a class="btn btn--light" href="${directions}" target="_blank" rel="noopener">${t('Get directions', '获取路线')}</a>
          <a class="btn btn--outline-light" href="${site.phoneHref}">${site.phone}</a>
        </div>
      </div>
      ${withMap ? `<div class="visit__map"><iframe title="${t('Map of Healthtinity, 246J Upper Thomson Road', 'Healthtinity 地图，246J Upper Thomson Road')}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=246J+Upper+Thomson+Road+Singapore+574370&amp;output=embed${isZh() ? '&amp;hl=zh-CN' : ''}"></iframe></div>` : ''}
    </div>
  </div>
</section>`;

// =====================================================================
// BLOG
// =====================================================================
function blogIndex() {
  const r = '../';
  const [first, ...rest] = L.posts();
  return {
    path: 'blog/',
    active: 'blog',
    og: {
      title: t('Articles from Healthtinity', 'Healthtinity 文章'),
      description: t('Studio news, our Lianhe Zaobao feature and practical tips to help you move better, feel stronger and live brighter.', '工作室新闻、《联合早报》报道，以及帮助您动得更好、感觉更强壮的实用小贴士。'),
    },
    title: t('Articles', '文章'),
    description: t('News, features and wellness tips from Healthtinity, the Yoga, Pilates & Rehab Therapy studio at Upper Thomson, Singapore.', '来自 Healthtinity 的新闻、媒体报道与健康小贴士。我们是位于新加坡 Upper Thomson 的瑜伽、普拉提与康复疗法工作室。'),
    body: `
${pageHero({ r, title: t('Stories, news &amp; <em>gentle wisdom</em>.', '故事、新闻与<em>温柔的智慧</em>。'), lead: t('Studio news, press features and practical tips to help you move better, feel stronger and live brighter.', '工作室新闻、媒体报道和实用小贴士，帮助您动得更好、感觉更强壮、活得更精彩。'), crumbs: [[t('Articles', '文章')]] })}
<section class="section section--flush">
  <div class="container">
    <a class="post-feature reveal" href="${first.slug}/">
      <div class="post-feature__img"><img src="${ar(r)}assets/img/${first.image}" alt="" width="640" height="360"></div>
      <div class="post-feature__copy">
        <div class="post__meta"><span class="tag tag--soft">${esc(first.category)}</span><span>${esc(first.date)}</span></div>
        <h2>${esc(first.title)}</h2>
        <p class="muted">${esc(first.excerpt)}</p>
        <span class="arrow-link">${t('Read article', '阅读文章')} ${icon.arrow}</span>
      </div>
    </a>
    <div class="posts posts--spaced">
      ${rest.map((p) => postCard(p, r)).join('')}
      <div class="press-card reveal">
        <h3>${t('Lianhe Zaobao', '《联合早报》')}</h3>
        <p class="muted">${t('Healthtinity shared gentle yoga practices for better sleep and relaxation in a September 2026 feature.', 'Healthtinity 在 2026 年 9 月的专题报道中，分享了有助睡眠与放松的温和瑜伽练习。')}</p>
      </div>
    </div>
  </div>
</section>
`,
  };
}

function blogPost(p) {
  const r = '../../';
  const related = L.posts().filter((x) => x.slug !== p.slug);
  return {
    path: `blog/${p.slug}/`,
    active: 'blog',
    og: {
      title: p.title,
      description: p.excerpt,
      type: 'article',
      meta: [['article:published_time', p.iso], ['article:author', p.author], ['article:section', p.category]],
    },
    title: p.title,
    description: p.excerpt,
    body: `
<article>
  <section class="page-hero page-hero--post">
    <div class="container container--narrow">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="${r}">${t('Home', '首页')}</a> <span>/</span> <a href="${r}blog/">${t('Articles', '文章')}</a> <span>/</span> <span aria-current="page">${esc(p.category)}</span></nav>
      <div class="post__meta"><span class="tag tag--soft">${esc(p.category)}</span><span>${t('By', '作者：')} ${esc(p.author)} · ${esc(p.date)}</span></div>
      <h1>${esc(p.title)}</h1>
    </div>
  </section>
  <div class="container container--narrow">
    <div class="post-cover reveal"><img src="${ar(r)}assets/img/${p.image}" alt="" width="640" height="360"></div>
    <div class="prose">${isZh() ? p.body : p.body.replace(/\s*\(联合早报\)/g, '')}</div>
    <div class="post-cta">
      <div><strong>${t('Ready to try a class?', '准备好来上课了吗？')}</strong><span>${t('New members: 5 classes for $60.', '新会员：$60 体验 5 堂课。')}</span></div>
      <a class="btn btn--primary" href="${site.links.packages}">${t('Get the Starter Pack', '购买体验配套')}</a>
    </div>
  </div>
</article>
<section class="section section--sand">
  <div class="container">
    <div class="section__head reveal"><h2>${t('Keep <em>reading</em>.', '<em>继续阅读</em>。')}</h2></div>
    <div class="posts">${related.map((x) => postCard(x, r)).join('')}</div>
  </div>
</section>`,
  };
}

// =====================================================================
// TEAM
// =====================================================================
function aboutPage() {
  const r = '../';
  return {
    path: 'about-us/', active: 'about', title: t('About Us', '关于我们'),
    description: t('Get to know Healthtinity, our Upper Thomson studio and the instructors behind our Yoga, Mat Pilates and Rehab Therapy classes.', '认识 Healthtinity、我们的 Upper Thomson 工作室，以及瑜伽、垫上普拉提与康复疗法导师。'),
    body: `
${pageHero({ r, title: t('A neighbourhood studio. A team that knows you.', '邻里工作室，懂您的导师团队。'), lead: t('Yoga, Mat Pilates and Rehab Therapy at Upper Thomson, Singapore. Helping people move better since 2019.', '位于新加坡 Upper Thomson，提供瑜伽、垫上普拉提与康复疗法。自 2019 年起，陪伴大家动得更好。'), crumbs: [[t('About Us', '关于我们')]] })}
<section class="section">
  <div class="container about-story">
    <div><h2>${t('Movement, with people at its heart.', '以人为本，用心练习。')}</h2></div>
    <div>
      <p class="lead">${t('Healthtinity is a boutique Yoga, Pilates and Rehab Therapy studio at 246J Upper Thomson Road. We bring group classes and personalised one-to-one sessions together in a welcoming neighbourhood space.', 'Healthtinity 是位于 246J Upper Thomson Road 的精品瑜伽、普拉提与康复疗法工作室。我们在温暖的邻里空间里，提供团体课程与个性化一对一练习。')}</p>
      <p>${t('Our instructors teach in English and Mandarin, across Yoga, Mat Pilates, Therapy & Stretch, and Tone & Sculpt. The team is led by Dr Kai, a Doctor of Osteopathy, alongside our senior rehab coach and instructors.', '我们的导师以英语及华语授课，涵盖瑜伽、垫上普拉提、理疗伸展与紧致塑形。团队由整骨医学博士 Dr Kai 带领，与资深康复教练及导师共同为学员提供指导。')}</p>
      <div class="actions"><a class="arrow-link" href="${r}classes/yoga/">${t('Explore our classes', '浏览我们的课程')} ${icon.arrow}</a><a class="arrow-link" href="${r}classes/private-1-to-1/">${t('Discover Private 1:1', '了解私人一对一')} ${icon.arrow}</a></div>
    </div>
  </div>
</section>
<section class="section section--sand">
  <div class="container team-intro">
    <div class="section__head section__head--row"><div><h2>${t('The people you will meet.', '即将与您相遇的导师。')}</h2><p class="lead">${t('Get to know their teaching styles, backgrounds and classes.', '了解导师的教学风格、专业背景与课程。')}</p></div></div>
    ${teamGroup(r)}
    <div class="actions actions--center"><a class="btn btn--primary" href="${r}team/">${t('Meet the Instructors', '认识导师团队')} ${icon.arrow}</a></div>
  </div>
</section>
<section class="section"><div class="container about-visit"><div><h2>${t('Come say hello.', '欢迎来认识我们。')}</h2><p class="lead">${t('246J Upper Thomson Road, Singapore 574370. A 1-minute walk from Upper Thomson MRT, Exit 3.', '246J Upper Thomson Road，Singapore 574370。距 Upper Thomson 地铁站 3 号出口步行约 1 分钟。')}</p></div><div class="actions"><a class="btn btn--primary" href="${r}contact-us/#visit">${t('Find the studio', '查看交通位置')} ${icon.arrow}</a><a class="btn btn--ghost" href="${r}contact-us/">${t('Contact us', '联系我们')}</a></div></div></section>`,
  };
}

function teamIndex() {
  const r = '../';
  const team = L.team();
  const leads = team.filter((m) => m.lead);
  const rest = team.filter((m) => !m.lead);
  return {
    path: 'team/',
    active: 'team',
    og: {
      title: t('Meet the Healthtinity coaches', '认识 Healthtinity 导师团队'),
      description: t(`${team.length} instructors led by a Doctor of Osteopathy and a senior rehab coach, teaching Yoga, Mat Pilates and Barre in English and Mandarin at Upper Thomson.`, `${team.length} 位导师，由整骨医学博士与资深康复教练带领，在 Upper Thomson 以英语及华语教授瑜伽、垫上普拉提与芭蕾。`),
    },
    title: t('Our Team', '我们的团队'),
    description: t('Meet the Healthtinity team: Doctor of Osteopathy, rehab therapists and certified Yoga, Mat Pilates and Barre instructors in Singapore.', '认识 Healthtinity 团队：整骨医学博士、康复治疗师，以及持证的瑜伽、垫上普拉提与芭蕾导师。'),
    body: `
${pageHero({ r, title: t('Coaches who <em>care</em>.', '<em>用心</em>的教练团队。'), lead: t(`Led by a Doctor of Osteopathy and our senior rehab coach, our ${team.length} instructors teach in English and Mandarin. All of them are passionate about helping you move with confidence.`, `由整骨医学博士与资深康复教练带领，我们的 ${team.length} 位导师提供英语及华语教学，热衷于帮助您自信地活动身体。`), crumbs: [[t('Team', '团队')]] })}
<section class="section section--flush">
  <div class="container">
    <div class="leads">
      ${leads.map((m) => `
      <a class="lead-card reveal" href="${m.slug}/">
        ${avatar(m, r, 'lead-card__img')}
        <div class="lead-card__copy">
          <p class="role">${esc(m.role)}</p>
          <h2>${esc(m.name)}</h2>
          <p class="muted">${esc(m.bio[0].slice(0, isZh() ? 90 : 210))}…</p>
          <span class="arrow-link">${t('Read full bio', '阅读完整简介')} ${icon.arrow}</span>
        </div>
      </a>`).join('')}
    </div>
    <div class="section__head reveal" style="margin-top:48px"><h2>${t('The <em>team</em>.', '<em>团队</em>成员。')}</h2></div>
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
`,
  };
}

function teamMember(m) {
  const r = '../../';
  const others = L.team().filter((x) => x.slug !== m.slug && x.photo).slice(0, 4);
  const coachClasses = schedule.flatMap((d) => d.classes.filter((c) => c.coach === m.name.replace(/^Dr /, '')).map((c) => ({ ...c, d })));
  const first = m.name.split(' ')[0];
  return {
    path: `team/${m.slug}/`,
    active: 'team',
    og: {
      title: t(`${m.name} · ${m.role} at Healthtinity`, `${m.name} · Healthtinity ${m.role}`),
      description: snippet(m.bio[0]),
      image: m.photo ? `assets/img/team/${m.photo}` : null,
      width: m.photo ? 560 : null,
      height: m.photo ? 560 : null,
      alt: m.photo ? t(`${m.name}, ${m.role} at Healthtinity`, `Healthtinity ${m.role} ${m.name}`) : null,
      type: 'profile',
    },
    title: `${m.name}, ${m.role}`,
    description: t(`${m.name}, ${m.role} at Healthtinity Singapore. ${m.bio[0].slice(0, 120)}`, `${m.name}，Healthtinity 新加坡${m.role}。${m.bio[0].slice(0, 60)}`),
    body: `
<section class="page-hero">
  <div class="container">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="${r}">${t('Home', '首页')}</a> <span>/</span> <a href="${r}team/">${t('Team', '团队')}</a> <span>/</span> <span aria-current="page">${esc(m.name)}</span></nav>
    <div class="profile">
      <div class="profile__photo reveal">${avatar(m, r, 'profile__img')}</div>
      <div class="profile__copy reveal">
        <p class="role">${esc(m.role)}</p>
        <h1>${esc(m.name)}</h1>
        ${m.headline ? `<p class="lead">${esc(m.headline)}</p>` : `<p class="lead">${esc(m.skills)}</p>`}
        <p class="profile__skills"><strong>${t('Skilled in', '专长')}</strong> ${esc(m.skills)}</p>
        <div class="actions">
          <a class="btn btn--primary" href="${site.links.schedule}">${t('Book a class', '预约课程')}</a>
          <a class="btn btn--ghost" href="${wa(t(`Hi Healthtinity! I'd like to enquire about a private session with ${m.name}.`, `您好 Healthtinity！我想咨询与 ${m.name} 的私人课程。`))}" target="_blank" rel="noopener">${t('Enquire about 1:1', '咨询一对一课程')}</a>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="section section--flush">
  <div class="container profile-body">
    <div class="prose">
      <h2>${t('Bio', '简介')}</h2>
      ${m.bio.map((p) => `<p>${esc(p)}</p>`).join('\n')}
      ${m.quote ? `<blockquote>${t('“', '「')}${esc(m.quote)}${t('”', '」')}<cite>— ${esc(first)}</cite></blockquote>` : ''}
    </div>
    <aside class="profile-aside">
      ${m.specialties ? `<div class="aside-card"><h3>${t('Specialties', '专长领域')}</h3><ul class="checklist checklist--sm">${m.specialties.map((s) => `<li>${icon.check} ${esc(s)}</li>`).join('')}</ul></div>` : ''}
      ${coachClasses.length ? `<div class="aside-card"><h3>${t('Weekly classes', '每周课程')}</h3><ul class="mini-sched">${coachClasses.map((c) => `<li><span>${L.day(c.d)} · ${c.time}</span>${esc(className(c.name).name.replace(/^Therapy:\s*/, t('Therapy: ', '')))}</li>`).join('')}</ul><a class="arrow-link" href="${r}timetable/">${t('Full schedule', '完整课表')} ${icon.arrow}</a></div>` : ''}
    </aside>
  </div>
</section>
<section class="section section--sand">
  <div class="container">
    <div class="section__head section__head--row reveal"><div><h2>${t('Meet more <em>coaches</em>.', '认识更多<em>导师</em>。')}</h2></div><a class="arrow-link" href="${r}team/">${t('All coaches', '所有导师')} ${icon.arrow}</a></div>
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
    og: {
      title: t('Class packs from $60 · Healthtinity', '课程配套 $60 起 · Healthtinity'),
      description: t('Start with 5 classes for $60, or save with shareable class packs that come with up to 20 bonus classes. Yoga, Mat Pilates and Therapy at Upper Thomson.', '$60 体验 5 堂课，或选择可共享的课程配套，最多赠送 20 堂课。Upper Thomson 的瑜伽、垫上普拉提与理疗课程。'),
    },
    title: t('Class Packages', '课程配套'),
    description: t('Healthtinity class packages: New Members Starter Pack (5 classes for $60), shareable class packs with bonus classes, and HT Wallet Top Up & Flow.', 'Healthtinity 课程配套：新会员体验配套（$60 体验 5 堂课）、可共享并附赠课程的课程配套，以及 HT 钱包储值随心练。'),
    body: `
${pageHero({ r, title: t('Class <em>packages</em>.', '课程<em>配套</em>。'), lead: t('Practise at your own pace. Larger packs come with bonus classes, and many are shareable with family and friends.', '按自己的节奏练习。较大的配套附赠更多课程，而且多数可与家人朋友共享。'), crumbs: [[t('Pricing', '价格')], [t('Packages', '课程配套')]], extra: pricingTabs('package') })}
<section class="section section--flush">
  <div class="container">
    <div class="pricing pricing--packs">
      ${L.packages().map((p) => priceCard(p, site.links.packages)).join('')}
    </div>
    ${topupBlock()}
    <div class="compare reveal">
      <h2>${t('Which option is right for <em>me</em>?', '哪个方案<em>适合我</em>？')}</h2>
      <div class="compare__grid">
        <div><h3>${t('Just starting out', '刚开始练习')}</h3><p>${t('Try the <strong>Starter Pack</strong>: 5 classes in 30 days for $60, plus $22 wallet credit in the HT Life app.', '试试<strong>新会员体验配套</strong>：30 天内 5 堂课只需 $60，另送 $22 HT Life 钱包额度。')}</p></div>
        <div><h3>${t('Coming 1–2× a week', '每周来 1–2 次')}</h3><p>${t('A <strong>class pack</strong> gives you bonus classes and flexible validity from your first booking.', '<strong>课程配套</strong>附赠额外课程，有效期从首次预约起计算，更灵活。')}</p></div>
        <div><h3>${t('Coming 3×+ a week', '每周来 3 次以上')}</h3><p>${t(`Go <strong>unlimited</strong> with a <a href="${r}membership/">membership</a>, from $162/month.`, `选择<a href="${r}membership/">会员方案</a>，<strong>无限上课</strong>，每月 $162 起。`)}</p></div>
        <div><h3>${t('Prefer no commitment', '不想有任何承诺')}</h3><p>${t('<strong>Top Up &amp; Flow</strong>: load your wallet, get bonus credit and book as you go.', '<strong>储值随心练</strong>：为钱包储值，获赠额外额度，想上就预约。')}</p></div>
      </div>
    </div>
  </div>
</section>
${faqSection(r, L.faqs().slice(1, 4))}`,
  };
}

function membershipPage() {
  const r = '../';
  return {
    path: 'membership/',
    active: 'pricing',
    og: {
      title: t('Unlimited classes from $162/month · Healthtinity', '团体课无限上，每月 $162 起 · Healthtinity'),
      description: t('Unlimited Yoga, Mat Pilates and Therapy group classes at Upper Thomson. Pay upfront or monthly; the longer you commit, the lower the rate.', 'Upper Thomson 瑜伽、垫上普拉提与理疗团体课无限上。可一次性付款或按月付款，承诺期越长，月费越低。'),
    },
    title: t('Memberships', '会员方案'),
    description: t('Unlimited group class memberships at Healthtinity Singapore, from $162/month. Upfront and recurring options.', 'Healthtinity 新加坡团体课无限上会员方案，每月 $162 起，提供一次性付款及自动续费选项。'),
    body: `
${pageHero({ r, title: t('Unlimited <em>memberships</em>.', '无限上课<em>会员</em>。'), lead: t('Build a consistent practice with unlimited group classes: Yoga, Mat Pilates, Therapy and more.', '团体课无限上：瑜伽、垫上普拉提、理疗等，帮助您建立持续的练习习惯。'), crumbs: [[t('Pricing', '价格')], [t('Memberships', '会员')]], extra: pricingTabs('membership') })}
<section class="section section--flush">
  <div class="container">
    <div class="group-head reveal"><h2>${t('Upfront payment', '一次性付款')}</h2><p class="muted">${t('Pay once, practise unlimited.', '付款一次，无限练习。')}</p></div>
    <div class="pricing pricing--2">
      ${L.membershipsUpfront().map((p) => priceCard(p, site.links.memberships)).join('')}
    </div>
    <div class="group-head reveal"><h2>${t('Recurring membership', '自动续费会员')}</h2><p class="muted">${t('Auto-renewing. The longer the commitment, the lower the monthly rate.', '自动续费。承诺期越长，月费越低。')}</p></div>
    <div class="pricing pricing--4">
      ${L.membershipsRecurring().map((p) => priceCard(p, site.links.memberships)).join('')}
    </div>
    <p class="fineprint reveal">${t(`Recurring memberships renew automatically at the billing interval shown. A S$350 cancellation fee applies before the minimum commitment ends. See our <a href="${r}terms/terms-and-conditions/">Terms &amp; Conditions</a>.`, `自动续费会员将按所示的计费周期自动续费。在最低承诺期结束前取消，须缴付 S$350 手续费。详情请参阅<a href="${r}terms/terms-and-conditions/">条款与细则</a>。`)}</p>
  </div>
</section>
`,
  };
}

const pricingTabs = (active) => `
<div class="tabs" role="tablist">
  <a href="../package/" class="tab${active === 'package' ? ' is-active' : ''}">${t('Packages', '课程配套')}</a>
  <a href="../membership/" class="tab${active === 'membership' ? ' is-active' : ''}">${t('Memberships', '会员')}</a>
  <a href="../package/#topup" class="tab">${t('Top Up &amp; Flow', '储值随心练')}</a>
</div>`;

const faqSection = (r, items) => `
<section class="section section--sand">
  <div class="container split split--faq">
    <div class="reveal">
      <h2>${t('Good to <em>know</em>.', '<em>须知</em>。')}</h2>
      <p class="muted">${t(`More answers on our <a href="${r}faqs/">FAQ page</a>, or <a href="${site.whatsapp}" target="_blank" rel="noopener">message us on WhatsApp</a>.`, `更多解答请看<a href="${r}faqs/">常见问题</a>，或<a href="${site.whatsapp}" target="_blank" rel="noopener">通过 WhatsApp 联系我们</a>。`)}</p>
    </div>
    <div class="reveal">${faqList(items)}</div>
  </div>
</section>`;

// =====================================================================
// TIMETABLE
// =====================================================================
function timetable() {
  const r = '../';
  const coachSlug = Object.fromEntries(L.team().map((m) => [m.name.replace(/^Dr /, ''), m.slug]));
  const total = schedule.reduce((n, d) => n + d.classes.length, 0);
  const categories = L.categories();
  const faqs = L.faqs();
  return {
    path: 'timetable/',
    active: 'timetable',
    og: {
      title: t(`This week at Healthtinity: ${total} classes`, `Healthtinity 本周课表：${total} 堂课`),
      description: t('Yoga, Mat Pilates, Therapy & Stretch and Tone & Sculpt, morning to evening, 7 days a week at Upper Thomson. Book up to 7 days ahead in the HT Life app.', '瑜伽、垫上普拉提、理疗伸展与紧致塑形，每周 7 天从早到晚在 Upper Thomson 开课。可在 HT Life 应用程序提前 7 天预约。'),
    },
    title: t('Group Class Schedule', '团体课课表'),
    description: t(`Weekly Yoga, Mat Pilates and Therapy class schedule at Healthtinity, Upper Thomson. ${total} classes a week.`, `Healthtinity（Upper Thomson）每周瑜伽、垫上普拉提与理疗课表，每周 ${total} 堂课。`),
    body: `
${pageHero({ r, title: t('This week at <em>the studio</em>.', '本周<em>课表</em>。'), lead: t(`${total} classes a week across Yoga, Mat Pilates, Therapy &amp; Stretch and Tone &amp; Sculpt. Bookings open 7 days ahead and close 1 hour before class.`, `每周 ${total} 堂课，涵盖瑜伽、垫上普拉提、理疗伸展与紧致塑形。预约于 7 天前开放，课程开始前 1 小时截止。`), crumbs: [[t('Schedule', '课表')]], extra: `<div class="actions"><a class="btn btn--primary" href="${site.links.schedule}">${t('Book on live schedule', '在线预约')}</a><a class="btn btn--ghost" href="${site.apps.ios}" target="_blank" rel="noopener">${t('Get the HT Life app', '下载 HT Life 应用程序')}</a></div>` })}
<section class="section section--flush">
  <div class="container">
    <div class="sched-controls">
      <div class="day-tabs" role="tablist" aria-label="${t('Day', '日期')}">
        ${schedule.map((d, i) => `<button role="tab" class="day-tab" data-day="${d.day}" aria-selected="${i === 0}"><span>${L.day(d)}</span><small>${t(`${d.classes.length} classes`, `${d.classes.length} 堂课`)}</small></button>`).join('')}
      </div>
      <div class="chips" aria-label="${t('Filter by category', '按类别筛选')}">
        ${categories.map(([k, label], i) => `<button class="chip${i === 0 ? ' is-active' : ''}" data-cat="${k}">${label}</button>`).join('')}
      </div>
    </div>
    ${schedule.map((d, i) => `
    <div class="day" data-day-panel="${d.day}"${i === 0 ? '' : ' hidden'}>
      <h2 class="day__title">${L.dayFull(d)}</h2>
      <ul class="sched">
        ${d.classes.map((c) => {
          const cat = classCategory(c.name);
          const n = className(c.name);
          const slug = coachSlug[c.coach];
          return `
        <li class="sched__row" data-cat="${cat}">
          <div class="sched__time"><strong>${c.time}</strong><span>${t(`${c.mins} mins`, `${c.mins} 分钟`)}</span></div>
          <div class="sched__info">
            <span class="sched__cat sched__cat--${cat}">${categories.find(([k]) => k === cat)[1]}</span>${n.flag ? `<span class="sched__flag">${n.flag}</span>` : ''}
            <h3>${esc(n.name)}</h3>
            <p>${t('with', '导师：')} ${slug ? `<a href="${r}team/${slug}/">${esc(c.coach)}</a>` : esc(c.coach)} · ${site.room}</p>
          </div>
          <a class="btn btn--ghost btn--sm" href="${site.links.schedule}">${t('Book', '预约')}</a>
        </li>`;
        }).join('')}
      </ul>
    </div>`).join('')}
    <p class="fineprint">${t(`This is our typical weekly schedule. Instructors and classes can change; see the <a href="${site.links.schedule}">live schedule</a> for real-time availability and waitlists.`, `以上为一般每周课表，导师和课程可能有所变动。实时名额及候补情况请查看<a href="${site.links.schedule}">在线课表</a>。`)}</p>
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
  const subjects = t(
    ['General', 'Group classes', 'Yoga Rehab Therapy', 'Private 1:1 sessions', 'Packages &amp; memberships', 'My account / booking'],
    ['一般咨询', '团体课', '瑜伽康复疗法', '私人一对一课程', '配套与会员', '我的账户／预约'],
  );
  return {
    path: 'contact-us/',
    active: 'contact',
    og: {
      title: t('Contact Healthtinity', '联系 Healthtinity'),
      description: t('WhatsApp +65 8282 9515 for the fastest reply, email ask@healthtinity.com, or drop by 246J Upper Thomson Road.', 'WhatsApp +65 8282 9515 回复最快，或电邮 ask@healthtinity.com，也欢迎亲临 246J Upper Thomson Road。'),
    },
    title: t('Contact Us', '联系我们'),
    description: t('Contact Healthtinity: WhatsApp +65 8282 9515, email ask@healthtinity.com, or visit us at 246J Upper Thomson Road, Singapore 574370.', '联系 Healthtinity：WhatsApp +65 8282 9515，电邮 ask@healthtinity.com，或亲临 246J Upper Thomson Road, Singapore 574370。'),
    body: `
${pageHero({ r, title: t("We're here to <em>help</em>.", '我们随时为您<em>服务</em>。'), lead: t('Questions about classes or planning a visit? Contact our team, send an enquiry or find your way to our Upper Thomson studio.', '对课程有疑问，或计划来访？联系我们、发送咨询，或查看前往 Upper Thomson 工作室的路线。'), crumbs: [[t('Contact us', '联系我们')]], extra: `<div class="actions"><a class="btn btn--primary" href="#enquiry">${t('Send an enquiry', '发送咨询')}</a><a class="btn btn--ghost" href="#visit">${t('Map & directions', '地图与路线')}</a></div>` })}
<section class="section section--flush">
  <div class="container contact">
    <div class="contact__cards">
      <a class="info-card reveal" href="${site.whatsapp}" target="_blank" rel="noopener"><span class="info-card__icon info-card__icon--wa">${icon.wa}</span><div><strong>WhatsApp</strong><span>${t('Fastest reply', '回复最快')} · ${site.phone}</span></div></a>
      <a class="info-card reveal" href="${site.phoneHref}"><span class="info-card__icon">${icon.phone}</span><div><strong>${t('Call us', '致电我们')}</strong><span>${site.phone}</span></div></a>
      <a class="info-card reveal" href="mailto:${site.email}"><span class="info-card__icon">${icon.mail}</span><div><strong>${t('Email', '电邮')}</strong><span>${site.email}</span></div></a>
      <a class="info-card reveal" href="#visit"><span class="info-card__icon">${icon.pin}</span><div><strong>${t('Visit', '到访')}</strong><span>${site.address.join(', ')}</span></div></a>
      <div class="info-card info-card--plain reveal">
        <div><strong>${t('New to Healthtinity?', '第一次来 Healthtinity？')}</strong><span>${t(`Check out our <a href="${r}faqs/">FAQ</a> for booking, arrival and cancellation info.`, `请查看<a href="${r}faqs/">常见问题</a>，了解预约、到达及取消须知。`)}</span></div>
      </div>
    </div>
    <form id="enquiry" class="form reveal" data-contact-form data-wa="${site.whatsapp}" data-email="${site.email}">
      <h2>${t('What can we help you with?', '有什么可以帮您？')}</h2>
      <div class="form__row">
        <label>${t('Name', '姓名')}<input name="name" required autocomplete="name"></label>
        <label>${t('Email address', '电邮地址')}<input name="email" type="email" required autocomplete="email"></label>
      </div>
      <div class="form__row">
        <label>${t('Mobile number', '手机号码')}<input name="mobile" type="tel" autocomplete="tel" placeholder="+65"></label>
        <label>${t('Subject', '主题')}
          <select name="subject">
            ${subjects.map((x) => `<option>${x}</option>`).join('\n            ')}
          </select>
        </label>
      </div>
      <label>${t('Description', '详情')}<textarea name="message" rows="5" required placeholder="${t("Tell us a little about what you're looking for…", '请简单告诉我们您的需求……')}"></textarea></label>
      <div class="form__actions">
        <button class="btn btn--primary" type="submit" data-via="wa">${icon.wa} ${t('Send via WhatsApp', '通过 WhatsApp 发送')}</button>
        <button class="btn btn--ghost" type="submit" data-via="email">${t('Send via email', '通过电邮发送')}</button>
      </div>
      <p class="fineprint">${t(`By contacting us you agree to our <a href="${r}terms/private-policy/">Privacy Policy</a>.`, `联系我们即表示您同意我们的<a href="${r}terms/private-policy/">隐私政策</a>。`)}</p>
    </form>
  </div>
</section>
${visitSection(r)}
<section class="section section--tight">
  <div class="container social-band reveal">
    <h2>${t('Connect with us on <em>social</em>.', '在<em>社交媒体</em>关注我们。')}</h2>
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
const visitSection = (r) => `<section class="section section--sand" id="visit">
  <div class="container section__head section__head--row"><div><h2>${t('Visit our studio.', '欢迎来到我们的工作室。')}</h2><p class="lead">${t('Find us at Upper Thomson, a 1-minute walk from the MRT, Exit 3.', '我们位于 Upper Thomson，距地铁站 3 号出口步行约 1 分钟。')}</p></div></div>
  <div class="container location">
    <div class="location__map reveal">
      <iframe title="${t('Map of Healthtinity', 'Healthtinity 地图')}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=246J+Upper+Thomson+Road+Singapore+574370&amp;output=embed${isZh() ? '&amp;hl=zh-CN' : ''}"></iframe>
    </div>
    <div class="location__card reveal">
      <img class="location__logo" src="${ar(r)}assets/img/logo-180.png" alt="" width="56" height="56">
      <h2>Healthtinity</h2>
      <p class="muted">${site.room}</p>
      <ul class="info-list">
        <li>${icon.pin}<span>${site.address.join(', ')}</span></li>
        <li>${icon.phone}<a href="${site.phoneHref}">${site.phone}</a></li>
        <li>${icon.mail}<a href="mailto:${site.email}">${site.email}</a></li>
      </ul>
      <h3>${t('Getting here', '如何前往')}</h3>
      <ul class="visit__how visit__how--dark">
        ${getting().map(([e, x]) => `<li><span>${e}</span>${esc(x)}</li>`).join('')}
      </ul>
      <div class="actions">
        <a class="btn btn--primary" href="${directions}" target="_blank" rel="noopener">${t('Get directions', '获取路线')}</a>
        <a class="btn btn--ghost" href="${site.whatsapp}" target="_blank" rel="noopener">${t('WhatsApp us', 'WhatsApp 我们')}</a>
      </div>
    </div>
  </div>
</section>`;

// =====================================================================
// FAQ
// =====================================================================
function faqPage() {
  const r = '../';
  const faqs = L.faqs();
  return {
    path: 'faqs/',
    active: '',
    og: {
      title: t('Before your first class · Healthtinity FAQ', '第一堂课前须知 · Healthtinity 常见问题'),
      description: t('How to book, when to arrive, cancellations, what to bring and which class suits beginners, answered.', '如何预约、何时到达、取消政策、需要带什么，以及初学者适合哪一堂课，一次解答。'),
    },
    title: t('Frequently Asked Questions', '常见问题'),
    description: t('Answers to common questions about booking, arrival, cancellations, equipment and beginner classes at Healthtinity.', '关于 Healthtinity 预约、到达、取消、器材及初学者课程的常见问题解答。'),
    schema: `<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org', '@type': 'FAQPage', inLanguage: t('en', 'zh-Hans'),
      mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    })}</script>`,
    body: `
${pageHero({ r, title: t('Frequently asked <em>questions</em>.', '常见<em>问题</em>。'), lead: t("Everything you need to know before your first class. Can't find your answer? We're a WhatsApp away.", '第一堂课前需要知道的一切。找不到答案？WhatsApp 我们就好。'), crumbs: [[t('FAQ', '常见问题')]] })}
<section class="section section--flush">
  <div class="container split split--faq">
    <div class="reveal">
      <div class="aside-card aside-card--sticky">
        <h3>${t('Still have questions?', '还有疑问？')}</h3>
        <p class="muted">${t('Our team is happy to help you choose the right class or programme.', '我们的团队很乐意帮您选择合适的课程或方案。')}</p>
        <div class="actions actions--stack">
          <a class="btn btn--primary btn--block" href="${site.whatsapp}" target="_blank" rel="noopener">${icon.wa} ${t('WhatsApp us', 'WhatsApp 我们')}</a>
          <a class="btn btn--ghost btn--block" href="${r}contact-us/">${t('Contact form', '联系表格')}</a>
        </div>
      </div>
    </div>
    <div class="reveal">${faqList(faqs)}</div>
  </div>
</section>
`,
  };
}

// =====================================================================
// LEGAL (English only; the Chinese site shows the English text with a note)
// =====================================================================
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function legal(doc, path, other, zhTitle, otherZh) {
  const r = '../../';
  const numbered = !doc.intro;
  const title = t(doc.title, zhTitle);
  return {
    path,
    active: '',
    title,
    description: t(`${doc.title} for Healthtinity classes, packages, memberships, website and booking application.`, `Healthtinity 课程、配套、会员、网站及预约应用程序的${zhTitle}。`),
    body: `
${pageHero({ r, title, lead: doc.effective ? t(`Effective date: ${doc.effective}`, `生效日期：${doc.effective}`) : `${site.legalName} · ${t('Reg.', '注册号')} ${site.reg}`, crumbs: [[title]] })}
<section class="section section--flush">
  <div class="container legal">
    <aside class="legal__toc">
      <div class="aside-card aside-card--sticky">
        <h3>${t('Contents', '目录')}</h3>
        <ol>${doc.sections.map(([h]) => `<li><a href="#${slugify(h)}">${esc(h)}</a></li>`).join('')}</ol>
        <a class="arrow-link" href="${r}${other[1]}">${t(other[0], otherZh)} ${icon.arrow}</a>
      </div>
    </aside>
    <div class="prose prose--legal" lang="en">
      ${isZh() ? `<p class="legal__note" lang="zh-Hans">本${zhTitle}仅提供英文版本，并以英文版本为准。如有疑问，欢迎<a href="${site.whatsapp}" target="_blank" rel="noopener">通过 WhatsApp 联系我们</a>。</p>` : ''}
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
    <p class="lead">The page you're looking for has moved or doesn't exist. <span lang="zh-Hans">您要找的页面已移动或不存在。</span></p>
    <div class="actions actions--center"><a class="btn btn--primary" href="./">Back to home</a><a class="btn btn--ghost" href="zh/">返回中文首页</a></div>
  </div>
</section>`,
  };
}

export function allPages() {
  return [
    home(),
    aboutPage(),
    academyPage(),
    ...classPages.map(classPage),
    blogIndex(),
    ...L.posts().map(blogPost),
    teamIndex(),
    ...L.team().map(teamMember),
    packagePage(),
    membershipPage(),
    timetable(),
    contact(),
    { path: 'location/', redirect: '../contact-us/#visit' },
    faqPage(),
    legal(terms, 'terms/terms-and-conditions/', ['Privacy Policy', 'terms/private-policy/'], '条款与细则', '隐私政策'),
    legal(privacy, 'terms/private-policy/', ['Terms & Conditions', 'terms/terms-and-conditions/'], '隐私政策', '条款与细则'),
    ...(isZh() ? [] : [notFound()]),
  ];
}
