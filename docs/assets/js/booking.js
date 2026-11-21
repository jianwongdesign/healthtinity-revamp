/* Official Rezerv widgets: live catalogue here; login and checkout on Rezerv. */
(() => {
  const root = document.querySelector('[data-rezerv-booking]');
  if (!root) return;
  const tabs = [...root.querySelectorAll('[data-booking-view]')];
  const panel = root.querySelector('#booking-panel');
  const frame = root.querySelector('[data-booking-frame]');
  const status = root.querySelector('[data-booking-status]');
  const fallback = root.querySelector('[data-rezerv-fallback]');
  const zh = document.documentElement.lang.startsWith('zh');
  const widgetOrigin = 'https://widgets.rezerv.co';
  const paths = { timetable: '/timetable', packages: '/package', memberships: '/membership' };
  const utmKeys = ['utm_source', 'utm_campaign', 'utm_medium', 'utm_term', 'utm_content'];
  const query = new URLSearchParams(location.search);
  const utms = Object.fromEntries(utmKeys.filter(key => query.has(key)).map(key => [key, query.get(key).slice(0, 500)]));
  let timers = [];
  const sendUtms = () => {
    if (Object.keys(utms).length) frame.contentWindow?.postMessage({ type: 'UTM_PARAMS', utms }, widgetOrigin);
  };
  window.addEventListener('message', event => {
    if (event.origin === widgetOrigin && event.source === frame.contentWindow && event.data?.type === 'REQUEST_UTM_PARAMS') sendUtms();
  });
  frame.addEventListener('load', () => {
    // A cross-origin load does not prove the catalogue loaded successfully.
    // Keep the visible recovery link and do not announce a false success.
    status.textContent = '';
    timers.forEach(clearTimeout);
    sendUtms();
    timers = [setTimeout(sendUtms, 500), setTimeout(sendUtms, 1500)];
  });
  frame.addEventListener('error', () => {
    status.textContent = zh ? '暂时无法加载，请使用“打开预约平台”链接。' : 'Unable to load. Please use “Open booking portal” above.';
  });
  function select(view, updateHistory = false) {
    const tab = tabs.find(item => item.dataset.bookingView === view) || tabs[0];
    view = tab.dataset.bookingView;
    const url = new URL(atob(tab.dataset.widget));
    if (url.origin !== widgetOrigin || url.pathname !== '/' + view) return;
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', tab.id);
    frame.title = `Healthtinity — ${tab.textContent}`;
    fallback.href = new URL(paths[view], url.searchParams.get('businessUrl')).href;
    status.textContent = zh ? '正在加载实时预约信息…' : 'Loading live booking options…';
    timers.forEach(clearTimeout);
    timers = [setTimeout(() => {
      status.textContent = zh ? '加载时间较长？请使用上方的预约平台链接。' : 'Taking a while? Use the booking portal link above.';
    }, 12000)];
    frame.src = url.href;
    if (updateHistory) {
      const next = new URL(location.href);
      next.searchParams.set('view', view);
      history.pushState({ view }, '', next);
    }
    // Keep the chosen view when switching between the English and Chinese page.
    document.querySelectorAll('.lang a').forEach(link => {
      const next = new URL(link.href);
      next.searchParams.set('view', view);
      link.href = next.href;
    });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab.dataset.bookingView, true));
    tab.addEventListener('keydown', event => {
      const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length
        : event.key === 'ArrowLeft' ? (index + tabs.length - 1) % tabs.length
        : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : null;
      if (next === null) return;
      event.preventDefault(); tabs[next].focus(); select(tabs[next].dataset.bookingView, true);
    });
  });
  window.addEventListener('popstate', () => select(new URLSearchParams(location.search).get('view')));
  root.querySelector('[role="tablist"]').hidden = false;
  panel.hidden = false;
  select(query.get('view'));
})();
