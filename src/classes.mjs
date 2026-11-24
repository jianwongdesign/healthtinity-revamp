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
  <section class="section class-directory">
    <div class="container class-details">
      <div class="class-details__intro">
        <h2>${t(c.category === 'private' ? 'Your one-to-one options.' : 'Find your class.', c.category === 'private' ? '选择一对一课程。' : '找到适合您的课程。')}</h2>
        <p class="lead">${t('Choose a type to explore. Our team can help you find the right fit.', '选择课程类型，了解更多。我们也可以协助您选择。')}</p>
        <div data-class-expect-section hidden><h3>${t('What to expect', '课程体验')}</h3><p data-class-expect></p></div>
      </div>
      <div class="class-types" data-class-types data-class-enquiry="${esc(enquiry)}">
        ${c.types.map(type => `<details class="class-type"><summary>${esc(isZh() ? type.name_zh || type.name : type.name)}</summary><div class="class-type__body"><p>${t('Contact our team for details about this class and help choosing a session.', '欢迎联系我们，了解课程详情并选择合适的课程。')}</p></div></details>`).join('')}
      </div>
    </div>
  </section>
</article>`,
  };
}
