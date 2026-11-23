import { readFileSync } from 'node:fs';
import { t, isZh, ar } from './i18n.mjs';
import { esc, icon } from './layout.mjs';
import { wa } from './data.mjs';

export const classPages = JSON.parse(readFileSync(new URL('../wordpress/healthtinity-classes/defaults.json', import.meta.url), 'utf8'));
export const classesApi = process.env.CLASSES_API ?? (process.env.STAGING === '1'
  ? '/index.php?rest_route=/healthtinity/v1/classes/'
  : 'https://welcome-lightsteelblue-mosquito-41.hostingersite.com/index.php?rest_route=/healthtinity/v1/classes/');
export const classLabel = c => isZh() ? c.title_zh : c.title;

export function classPage(c) {
  const r = '../../';
  const title = classLabel(c);
  const intro = isZh() ? c.intro_zh : c.intro;
  const enquiry = wa(t(`Hi Healthtinity! I'd like to find out more about ${c.title}.`, `您好 Healthtinity！我想了解${c.title_zh}。`));
  const schedule = `${r}timetable/?c=${c.category}`;
  return {
    path: `classes/${c.slug}/`, title, description: intro, active: 'classes',
    body: `
<article data-class-page data-classes-api="${esc(classesApi + c.slug)}">
  <section class="class-hero container">
    <div class="class-hero__copy">
      <div class="crumbs"><a href="${r}">${t('Home', '首页')}</a><span>/</span><a href="${r}#classes">${t('Classes', '课程')}</a><span>/</span><span>${esc(title)}</span></div>
      <h1>${esc(title)}</h1>
      <p class="lead" data-class-intro>${esc(intro)}</p>
      <div class="actions">
        <a class="btn btn--sun" href="${c.category === 'private' ? enquiry : schedule}"><span class="desktop-label">${t(c.category === 'private' ? 'Ask about Private 1:1' : 'View class schedule', c.category === 'private' ? '咨询私人一对一' : '查看课程时间')}</span><span class="mobile-label">${t(c.category === 'private' ? 'Enquire about Private 1:1' : 'View schedule', c.category === 'private' ? '咨询私人一对一' : '查看课表')}</span>${icon.arrow}</a>
        ${c.category === 'private' ? '' : `<a class="btn btn--outline-light" href="${enquiry}">${t('Help me choose', '帮我选择课程')}</a>`}
      </div>
    </div>
    <img class="class-hero__image" data-class-image src="${ar(r)}assets/img/${c.image}" alt="${esc(title)}" width="1200" height="900">
  </section>
  <nav class="class-nav container" aria-label="${t('Explore classes', '浏览课程')}">
    ${classPages.map(item => `<a href="../${item.slug}/"${item.slug === c.slug ? ' aria-current="page"' : ''}>${esc(classLabel(item))}</a>`).join('')}
  </nav>
  <section class="section">
    <div class="container class-details">
      <div class="class-details__intro">
        <h2>${t(c.category === 'private' ? 'A session that starts with you.' : 'Find your kind of movement.', c.category === 'private' ? '从您的需求出发。' : '找到适合您的练习。')}</h2>
        <p class="lead">${t(c.category === 'private' ? 'Explore our one-to-one options. Tell us your goals and our team can help you choose.' : 'Explore the different class types below. Not sure where to start? Ask our team for guidance.', c.category === 'private' ? '了解一对一课程选项。告诉我们您的目标，让团队协助您选择。' : '了解以下不同类型的课程。不知道从哪里开始？欢迎向我们的团队咨询。')}</p>
        <a class="arrow-link" href="${enquiry}">${t('Talk to our team', '咨询我们的团队')} ${icon.arrow}</a>
        <div data-class-expect-section hidden><h3>${t('What to expect', '课程体验')}</h3><p data-class-expect></p></div>
      </div>
      <div class="class-types" data-class-types>
        ${c.types.map(type => `<details class="class-type"><summary>${esc(isZh() ? type.name_zh || type.name : type.name)}</summary><div class="class-type__body"><p>${t('Contact our team for details about this class and help choosing a session.', '欢迎联系我们，了解课程详情并选择合适的课程。')}</p></div></details>`).join('')}
      </div>
    </div>
  </section>
</article>`,
  };
}
