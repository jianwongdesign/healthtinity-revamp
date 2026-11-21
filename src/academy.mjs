import { pageHero, icon } from './layout.mjs';
import { t } from './i18n.mjs';
import { wa } from './data.mjs';

// Client copy pending. Add approved programme details here when supplied:
// overview, syllabus, entry requirements, trainers, dates/duration, fees,
// accreditation (only if confirmed), application process and FAQs.
// Do not publish speculative course hours, qualifications or intake dates.
export function academyPage() {
  const r = '../';
  return {
    path: 'academy/', active: 'academy', title: t('Academy — Yoga Instructor Training', '学院 — 瑜伽导师培训'),
    description: t('Yoga instructor training at Healthtinity Academy. Course details will be shared soon. Contact our team for enquiries.', 'Healthtinity 学院瑜伽导师培训。课程详情即将公布，欢迎联系我们咨询。'),
    body: `
${pageHero({ r, title: t('Train to be a yoga instructor.', '成为瑜伽导师。'), lead: t('Yoga instructor training at Healthtinity Academy.', 'Healthtinity 学院瑜伽导师培训。'), crumbs: [[t('Academy', '学院')]] })}
<section class="section section--flush">
  <div class="container about-story">
    <div><h2>${t('Course details coming soon.', '课程详情即将公布。')}</h2></div>
    <div>
      <p class="lead">${t('Interested in becoming a yoga instructor? More information about our training programme will be shared here soon.', '有兴趣成为瑜伽导师？我们将在此分享培训课程的更多信息。')}</p>
      <p>${t('For enquiries in the meantime, get in touch with our team.', '如需提前咨询，欢迎联系我们的团队。')}</p>
      <div class="actions">
        <a class="btn btn--primary" href="${wa(t('Hi Healthtinity! I would like to enquire about the Academy yoga instructor training.', '您好 Healthtinity！我想咨询学院的瑜伽导师培训。'))}" target="_blank" rel="noopener">${t('Enquire about training', '咨询导师培训')} ${icon.arrow}</a>
        <a class="btn btn--ghost" href="${r}contact-us/#enquiry">${t('Contact us', '联系我们')}</a>
      </div>
    </div>
  </div>
</section>`,
  };
}
