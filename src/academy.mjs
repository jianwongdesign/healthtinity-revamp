import { pageHero, icon, esc, contactFormActions } from './layout.mjs';
import { t, ar } from './i18n.mjs';
import { site } from './data.mjs';

// Source: https://ask2929.wixsite.com/my-site-3/courses and its four detail pages.
// Retrieved 21 Nov 2026. Original intakes were in 2023; fees/durations below are
// historical reference values, not a current offer. See ACADEMY.md before updates.
const courses = () => [
  {
    id: 'yoga-200', title: t('200-hour Yoga Teacher Training', '200 小时瑜伽导师培训'),
    style: t('Hatha & Vinyasa', '哈他瑜伽与流瑜伽'), fee: '3,250', duration: t('10 weeks', '10 周'), image: 'yoga-200.jpg',
    intro: t('Build a foundation for teaching Hatha and Vinyasa yoga, with guided practice, alignment, anatomy and lesson planning.', '从哈他瑜伽与流瑜伽开始，学习体式练习、身体顺位、解剖知识与课程编排，为瑜伽教学打好基础。'),
    modules: [
      [t('Yoga philosophy', '瑜伽哲学'), t('History of yoga; the Vedas, Upanishads, Bhagavad Gita and Patanjali Sutras; Gunas, Koshas, Prana and Doshas; the four paths and eight limbs of yoga.', '瑜伽历史；吠陀、奥义书、薄伽梵歌与帕坦伽利瑜伽经；三德、五鞘、生命能量与三种体质；瑜伽四大路径与八支瑜伽。')],
      [t('Practice & alignment', '体式练习与顺位'), t('Asana and alignment workshops, meditation, pranayama, adjustments, props and modifications, and the Ashtanga primary series.', '体式与顺位练习、冥想、呼吸法、辅助调整、辅具运用、体式变化，以及阿斯汤加初级序列。')],
      [t('Anatomy & teaching theory', '解剖学与教学理论'), t('Human anatomy, biomechanics and physiology; sequencing, specialised teaching and professional development.', '人体解剖学、生物力学与生理学；课程编排、专项教学及职业发展。')],
      [t('Teaching skills', '教学技巧'), t('Vinyasa Krama, lesson planning, class structure, voice and language, and verbal and non-verbal cues.', '循序渐进的流瑜伽编排、教案设计、课堂结构、声音与语言运用，以及口头和非口头引导。')],
    ],
    assessment: t('Theory exam, practical exam and assignments.', '理论考试、实操考试及作业。'),
  },
  {
    id: 'yoga-300', title: t('300-hour Yoga Teacher Training', '300 小时瑜伽导师培训'),
    style: t('Multi-style', '多风格进阶培训'), fee: '5,400', duration: t('13 weeks', '13 周'), image: 'yoga-300.jpg',
    intro: t('For yoga instructors and experienced practitioners who want to deepen their practice and teaching. Explore multiple styles, functional anatomy, sequencing and classroom leadership.', '适合希望深化练习与教学的瑜伽导师及有经验的练习者。内容涵盖多种瑜伽风格、功能解剖学、课程编排与课堂带领技巧。'),
    modules: [
      [t('Yin yoga & restorative practice', '阴瑜伽与修复练习'), t('Yin and yang principles, more than 20 Yin asanas, modifications and class structure; meridian theory, trigger points and myofascial release.', '阴阳原理、20 多种阴瑜伽体式、体式调整与课堂编排；经络理论、触发点与筋膜放松。')],
      [t('Develop your practice', '深化个人练习'), t('Ashtanga primary and secondary series postures, Vinyasa Krama, alignment, guided meditation, Yoga Nidra and kriyas.', '阿斯汤加初级与次级序列体式、流瑜伽编排、身体顺位、冥想引导、瑜伽睡眠与净化法。')],
      [t('Anatomy, philosophy & reflection', '解剖、哲学与反思'), t('Biomechanics, body systems, the Bhagavad Gita, practice and teaching journals, introductory Ayurveda, voice and language, and professional development.', '生物力学、人体系统、薄伽梵歌、练习与教学日志、阿育吠陀入门、声音与语言运用，以及职业发展。')],
      [t('Teaching & class leadership', '教学与课堂带领'), t('Teaching ethics, verbal and non-verbal instruction, pedagogy, creative lesson planning, and the use of props, yoga wheels and heated practice spaces.', '教学伦理、口头与非口头引导、教学方法、创意教案设计，以及辅具、瑜伽轮与热瑜伽环境的运用。')],
    ],
    assessment: t('Practical and written assessments.', '实操与书面评估。'),
  },
];

const reikiCourses = () => [
  { id: 'reiki-1', title: t('Reiki Level 1', '灵气一级'), fee: '450', duration: t('1 weekend', '1 个周末'),
    intro: t('An introductory workshop covering Reiki history and foundations, basic meditation, traditional hands-on practice and a Level 1 attunement. The original outline includes a practical assessment.', '入门工作坊介绍灵气的历史与基础、基本冥想、传统手部练习及一级点化。原课程大纲包含实操评估。'),
    entry: t('For those interested in learning the basics of Reiki.', '适合希望了解灵气基础的学员。') },
  { id: 'reiki-2', title: t('Reiki Level 2', '灵气二级'), fee: '650', duration: t('2 weekends', '2 个周末'),
    intro: t('An intermediate workshop exploring further Reiki techniques and the traditional use of Reiki symbols.', '进阶工作坊，进一步学习灵气练习技巧与传统灵气符号的运用。'),
    entry: t('The original requirements specify Level 1 proficiency for students from other schools, or 50 hours of personal practice for in-house students. Confirm eligibility with our team.', '原入学要求：外校学员需具备一级能力；本校学员需完成 50 小时个人练习。具体资格请向我们确认。') },
];

export function academyPage() {
  const r = '../';
  const yoga = courses();
  const reiki = reikiCourses();
  const all = [...yoga, ...reiki];
  const enquire = c => `<a class="btn btn--primary" href="#academy-enquiry" data-course-enquiry="${esc(c.title)}">${t('Enquire about this course', '咨询此课程')} ${icon.arrow}</a>`;
  const facts = c => `<dl class="academy-facts"><div><dt>${t('Previously listed fee', '原公布学费')}</dt><dd>S$${c.fee}</dd></div><div><dt>${t('Listed duration', '原公布课时安排')}</dt><dd>${c.duration}</dd></div></dl>`;
  return {
    path: 'academy/', active: 'academy', title: t('Academy — Yoga Teacher Training & Reiki', '学院 — 瑜伽导师培训与灵气课程'),
    description: t('Explore Healthtinity Academy: 200-hour Hatha & Vinyasa training, 300-hour multi-style yoga teacher training and Reiki workshops. Enquire about the next intake.', '了解 Healthtinity 学院的 200 小时哈他与流瑜伽导师培训、300 小时多风格进阶培训及灵气工作坊。欢迎咨询下一期开课安排。'),
    body: `
${pageHero({ r, title: t('Deepen your practice. Learn to teach.', '深化练习，学习教学。'), lead: t('Explore yoga teacher training and Reiki workshops at Healthtinity Academy, from foundational study to advanced teaching practice.', '在 Healthtinity 学院，从基础学习到进阶教学，探索瑜伽导师培训与灵气工作坊。'), crumbs: [[t('Academy', '学院')]], extra: `<div class="actions"><a class="btn btn--primary" href="#teacher-training"><span class="desktop-label">${t('Explore the courses', '浏览课程')}</span><span class="mobile-label">${t('View courses', '浏览课程')}</span></a><a class="btn btn--ghost" href="#academy-enquiry"><span class="desktop-label">${t('Ask about the next intake', '咨询下一期开课安排')}</span><span class="mobile-label">${t('Next intake', '咨询开课')}</span></a></div>` })}
<section class="section section--flush" id="teacher-training">
  <div class="container">
    <div class="section__head"><h2>${t('Yoga teacher training', '瑜伽导师培训')}</h2><p class="lead">${t('Choose a foundation in Hatha and Vinyasa, or build on your experience with multi-style training.', '从哈他与流瑜伽的基础培训开始，或通过多风格课程深化现有的练习与教学经验。')}</p><p class="academy-note">${t('Fees and durations below are from our previous course listings. Contact us to confirm current fees, course arrangements and the next intake.', '以下学费与课时安排来自以往课程资料。最新费用、课程安排及下一期开课日期，请联系我们确认。')}</p></div>
    ${yoga.map(c => `<article class="academy-course" id="${c.id}">
      <img class="academy-course__image" src="${ar(r)}assets/img/academy/${c.image}" alt="${esc(c.title + ' — ' + c.style)}" width="1000" height="740" loading="lazy">
      <div class="academy-course__content"><h3>${c.title}</h3><p class="academy-course__style">${c.style}</p><p>${c.intro}</p>${facts(c)}
        <details class="academy-outline"><summary>${t('View the course outline', '查看课程大纲')}</summary><div>${c.modules.map(([title, text])=>`<h4>${title}</h4><p>${text}</p>`).join('')}<h4>${t('Assessment', '评估方式')}</h4><p>${c.assessment}</p></div></details>
        <div class="actions">${enquire(c)}</div>
      </div>
    </article>`).join('')}
    <p class="academy-trainer">${t('Yoga training in the original programme is led by Kai.', '原瑜伽培训课程由 Kai 带领。')} <a class="arrow-link" href="${r}team/kai/">${t('Meet Dr Kai', '认识 Dr Kai')} ${icon.arrow}</a></p>
  </div>
</section>
<section class="section section--sand" id="reiki-workshops"><div class="container">
  <div class="section__head"><h2>${t('Reiki workshops', '灵气工作坊')}</h2><p class="lead">${t('Explore the foundations and traditional practices of Reiki through two levels of study.', '通过两个级别的学习，了解灵气的基础与传统练习方法。')}</p></div>
  <div class="academy-workshops">${reiki.map(c=>`<article id="${c.id}"><h3>${c.title}</h3><p>${c.intro}</p>${facts(c)}<p>${c.entry}</p>${enquire(c)}</article>`).join('')}</div>
  <p class="fineprint">${t('Workshop fees, duration, instructor and entry requirements will be confirmed for the next intake.', '下一期工作坊的学费、课时、导师及入学要求将另行确认。')}</p>
</div></section>
<section class="section" id="academy-enquiry"><div class="container contact">
  <div><h2>${t('Let’s talk about your next step.', '一起规划您的下一步。')}</h2><p class="lead">${t('Tell us which course interests you and a little about your experience. Our team can help with suitability, intake dates, fees and application details.', '告诉我们您感兴趣的课程及练习经验。我们可以为您解答课程选择、开课日期、学费与报名流程等问题。')}</p><p>${t('Ask us about the current syllabus, teaching team, assessment and certificate requirements before enrolling.', '报名前，欢迎向我们了解最新课程大纲、导师安排、评估与证书要求。')}</p><a class="info-card" href="${site.whatsapp}" target="_blank" rel="noopener"><span class="info-card__icon info-card__icon--wa">${icon.wa}</span><div><strong>WhatsApp</strong><span>${site.phone}</span></div></a></div>
  <form class="form" data-contact-form data-wa="${site.whatsapp}" data-email="${site.email}" aria-labelledby="academy-form-title">
    <h2 id="academy-form-title">${t('Course enquiry', '课程咨询')}</h2>
    <div class="form__row"><label>${t('Name', '姓名')}<input name="name" autocomplete="name" required></label><label>${t('Email address', '电邮地址')}<input name="email" type="email" autocomplete="email" required></label></div>
    <label>${t('Mobile number (optional)', '手机号码（选填）')}<input name="mobile" type="tel" autocomplete="tel" placeholder="+65"></label>
    <label>${t('Course of interest', '感兴趣的课程')}<select name="subject" required><option value="">${t('Select a course', '请选择课程')}</option>${all.map(c=>`<option value="${esc(c.title)}">${c.title}${c.style ? ' — '+c.style : ''}</option>`).join('')}<option>${t('Academy — help me choose', '学院课程 — 请帮我选择')}</option></select></label>
    <label>${t('Your experience & questions', '您的经验与问题')}<textarea name="message" rows="5" required placeholder="${t('Share your practice or teaching experience, and what you would like to know.', '请简单介绍您的练习或教学经验，以及想了解的课程信息。')}"></textarea></label>
    ${contactFormActions()}
    <p class="fineprint">${t('Your enquiry opens in WhatsApp or your email app for you to send.', '填写后，将打开 WhatsApp 或您的电邮应用，由您确认发送。')}</p>
    <p class="fineprint"><a href="${r}terms/private-policy/">${t('Privacy Policy', '隐私政策')}</a></p>
  </form>
</div></section>`,
  };
}
