import { BOOK, wa } from './data.mjs';
import { t } from './i18n.mjs';
import { esc, icon, pageHero } from './layout.mjs';

// Public business ID and widget options copied from Rezerv > Settings > Embed Widget.
// No API key, payment credential or customer data belongs in this integration.
export const REZERV_BUSINESS_ID = 'a693bc84-8c0a-4266-bb42-0e796efe1cb0';
export function widgetUrl(view) {
  if (!['timetable', 'packages', 'memberships'].includes(view)) throw new Error('Unknown booking view');
  const params = new URLSearchParams({
    businessId: REZERV_BUSINESS_ID, businessUrl: BOOK,
    fontFamily: 'Inter', gaEnabled: 'false', gaId: '', hideBranding: 'false',
    layout: 'list', openInNewTab: 'true', outlinedButtonColor: '#00708F',
    primaryBackground: '#FFFFFF', secondaryBackground: '#EAF6FA',
    solidButtonBackground: '#007EA1', solidButtonText: '#FFFFFF', textColor: '#0F2B46',
    subCategory: 'Show all', showRatings: 'false', showPrice: 'true',
    scheduleViewType: 'list', scheduleViewTypeOrder: JSON.stringify(['list', 'grid']),
    scheduleViewTypeVisibility: JSON.stringify({ list: true, grid: true }),
  });
  if (view === 'timetable') {
    params.set('noClassDisplay', '4');
    params.set('showSlotsLeft', 'false');
    params.set('showSwitcherTabs', 'true');
    params.set('scheduleTabs', JSON.stringify([
      { id: 'classes', label: 'Classes', source: 'classes', visible: true },
      { id: 'appointments', label: 'Appointments', source: 'appointments', visible: true },
    ]));
  }
  return `https://widgets.rezerv.co/${view}?${params}`;
}

export function bookingPage() {
  const views = [
    ['timetable', t('Live schedule', '实时课表'), '/timetable'],
    ['packages', t('Class packages', '课程配套'), '/package'],
    ['memberships', t('Memberships', '会员方案'), '/membership'],
  ];
  return {
    path: 'book/', title: t('Book & buy', '预约与购买'), active: 'book',
    description: t('View the live Healthtinity schedule, choose a class package or membership, and continue to Rezerv to book and pay.', '查看 Healthtinity 实时课表、课程配套与会员方案，并通过 Rezerv 完成预约及付款。'),
    body: `${pageHero({
      r: '../', title: t('Your next class starts here.', '从这里，预约下一堂课。'),
      lead: t('Find your class or choose a plan below. Sign-in, booking and payment continue with Rezerv in a new tab.', '查看课表或选择适合您的方案。登录、预约及付款将在新标签页的 Rezerv 系统中完成。'),
      crumbs: [[t('Book & buy', '预约与购买')]],
    })}
<section class="section section--flush booking" data-rezerv-booking>
  <div class="container">
    <div class="booking__intro">
      <p>${t('Already a member? Use your existing Healthtinity / HT Life account when prompted.', '已有会员账号？请使用现有的 Healthtinity / HT Life 账号登录。')}</p>
      <a href="${esc(BOOK + '/timetable')}" data-rezerv-direct data-rezerv-fallback target="_blank" rel="noopener">${t('Open booking portal', '打开预约平台')} ${icon.arrow}</a>
    </div>
    <div class="booking__tabs" role="tablist" aria-label="${t('Booking options', '预约选项')}" hidden>
      ${views.map(([view, label], index) => `<button type="button" role="tab" id="booking-tab-${view}" aria-controls="booking-panel" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}" data-booking-view="${view}" data-widget="${Buffer.from(widgetUrl(view)).toString('base64')}">${label}</button>`).join('')}
    </div>
    <div id="booking-panel" role="tabpanel" aria-labelledby="booking-tab-timetable" tabindex="0" hidden>
      <p class="booking__status" role="status" aria-live="polite" data-booking-status></p>
      <iframe class="booking__frame" data-booking-frame title="${t('Healthtinity live schedule', 'Healthtinity 实时课表')}" referrerpolicy="strict-origin-when-cross-origin"></iframe>
    </div>
    <p class="booking__help">${t('If the list does not load or a new tab is blocked, use the booking portal above. Availability, prices and terms are shown by Rezerv before you confirm.', '若列表无法加载或新标签页被拦截，请使用上方的预约平台链接。确认前，请查看 Rezerv 显示的名额、价格及条款。')}</p>
    <p class="booking__help"><a href="${esc(wa(t('Hi Healthtinity! I need help with booking.', '您好 Healthtinity！我想咨询课程预约。')))}" target="_blank" rel="noopener">${t('Need a hand? WhatsApp our team', '需要协助？通过 WhatsApp 联系我们')}</a></p>
    <noscript><p>${t('Use these links to book or buy directly with Rezerv:', '请通过以下链接前往 Rezerv 预约或购买：')}</p><div class="actions">${views.map(([, label, path]) => `<a class="btn btn--primary" data-rezerv-direct href="${esc(BOOK + path)}" target="_blank" rel="noopener">${label}</a>`).join('')}</div></noscript>
  </div>
</section>`,
  };
}
