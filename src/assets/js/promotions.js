/* Published, date-filtered promotions are managed in WordPress. */
(() => {
  const host = document.querySelector('[data-promotions-api]');
  if (!host?.dataset.promotionsApi) return;
  const zh = document.documentElement.lang.startsWith('zh');
  const t = (en, cn) => zh ? cn : en;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  const safeUrl = (value, base = location.origin) => {
    if (!value) return null;
    try { const url = new URL(value, base); return ['http:', 'https:'].includes(url.protocol) ? url.href : null; } catch { return null; }
  };
  const bookingUrl = (promo, key) => {
    let value = promo[key];
    try { if (promo[key + 'Encoded']) value = new TextDecoder().decode(Uint8Array.from(atob(promo[key + 'Encoded']), c => c.charCodeAt(0))); } catch { /* Use the plain URL. */ }
    return window.healthtinityBookingUrl ? window.healthtinityBookingUrl(value) : value;
  };
  const storageKey = 'healthtinity-promotion-last-shown';
  // A review link can show eligible promotions immediately without clearing storage.
  const previewPopup = new URLSearchParams(location.search).get('promo') === '1';
  let shownAt = 0;
  try { shownAt = Number(localStorage.getItem(storageKey)) || 0; } catch { /* Storage is optional. */ }
  let popupShown = false;
  let popupTimer;
  let dialog;
  let lastBanner = '';
  let stopped = false;
  window.addEventListener('storage', event => {
    if (event.key === storageKey) { shownAt = Number(event.newValue) || 0; clearTimeout(popupTimer); }
  });
  const endpoint = new URL(host.dataset.promotionsApi, location.origin);
  endpoint.searchParams.set('lang', zh ? 'zh' : 'en');

  function card(promo, popup) {
    const article = el('article', 'promo-card' + (promo.image || promo.mobileImage ? ' promo-card--image' : ''));
    const imageData = promo.image || promo.mobileImage;
    if (imageData && safeUrl(imageData.src, endpoint.origin)) {
      const picture = el('picture', 'promo-card__picture');
      if (promo.mobileImage && safeUrl(promo.mobileImage.src, endpoint.origin)) {
        const source = document.createElement('source');
        source.media = '(max-width: 600px)'; source.srcset = safeUrl(promo.mobileImage.src, endpoint.origin); picture.append(source);
      }
      const img = el('img');
      img.src = safeUrl(imageData.src, endpoint.origin); img.alt = promo.alt || promo.title;
      img.width = imageData.width || 1200; img.height = imageData.height || 800;
      img.loading = popup ? 'eager' : 'lazy'; img.style.objectFit = promo.imageFit === 'cover' ? 'cover' : 'contain';
      picture.append(img); article.append(picture);
    }
    const copy = el('div', 'promo-card__copy');
    if (promo.badge) copy.append(el('span', 'promo-card__badge', promo.badge));
    copy.append(el(popup ? 'h3' : 'h2', 'promo-card__title', promo.title));
    if (promo.summary) copy.append(el('p', 'promo-card__summary', promo.summary));
    const actions = el('div', 'promo-card__actions');
    for (const [label, url, secondary] of [[promo.button, bookingUrl(promo, 'url'), false], [promo.secondaryButton, bookingUrl(promo, 'secondaryUrl'), true]]) {
      if (!label || !safeUrl(url)) continue;
      const link = el('a', 'btn ' + (secondary ? 'promo-card__secondary' : 'promo-card__primary'), label);
      const mobileLabel = {
        'Get the Starter Pack': 'Starter Pack',
        'View schedule': 'Schedule',
        '购买体验配套': '体验配套',
      }[label];
      if (mobileLabel) {
        link.setAttribute('aria-label', label);
        link.replaceChildren(el('span', 'desktop-label', label), el('span', 'mobile-label', mobileLabel));
      }
      link.href = safeUrl(url); actions.append(link);
    }
    if (actions.children.length) copy.append(actions);
    article.append(copy); return article;
  }
  function carousel(promos, popup = false) {
    const wrap = el('div', 'promo-carousel');
    const label = t('Studio promotions', '工作室优惠');
    wrap.setAttribute('role', 'region'); wrap.setAttribute('aria-label', label);
    wrap.setAttribute('aria-roledescription', t('carousel', '轮播'));
    const track = el('div', 'promo-track'); track.tabIndex = 0;
    track.setAttribute('aria-label', t('Promotion cards. Use left and right arrow keys to browse.', '优惠卡片。使用左右方向键浏览。'));
    promos.forEach((p, i) => {
      const node = card(p, popup); node.setAttribute('role', 'group');
      node.setAttribute('aria-label', `${i + 1} / ${promos.length}`); track.append(node);
    });
    wrap.append(track);
    if (promos.length > 1) {
      wrap.classList.add('promo-carousel--multiple');
      const controls = el('div', 'promo-controls');
      const previous = el('button', 'promo-arrow', '←'); previous.type = 'button'; previous.setAttribute('aria-label', t('Previous promotion', '上一个优惠'));
      const next = el('button', 'promo-arrow', '→'); next.type = 'button'; next.setAttribute('aria-label', t('Next promotion', '下一个优惠'));
      const count = el('span', 'promo-count'); count.setAttribute('aria-live', 'polite'); count.setAttribute('aria-atomic', 'true');
      const index = () => {
        const start = track.getBoundingClientRect().left;
        return [...track.children].reduce((best, node, i, nodes) => Math.abs(node.getBoundingClientRect().left - start) < Math.abs(nodes[best].getBoundingClientRect().left - start) ? i : best, 0);
      };
      const move = (direction) => {
        const target = track.children[Math.max(0, Math.min(promos.length - 1, index() + direction))];
        track.scrollBy({left: target.getBoundingClientRect().left - track.getBoundingClientRect().left, behavior: reduced.matches ? 'instant' : 'smooth'});
      };
      const update = () => {
        const i = index(); count.textContent = `${i + 1} / ${promos.length}`;
        previous.disabled = i === 0; next.disabled = i === promos.length - 1;
      };
      previous.addEventListener('click', () => move(-1)); next.addEventListener('click', () => move(1));
      track.addEventListener('keydown', (event) => {
        if (event.target !== track || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
      });
      track.addEventListener('scroll', update, {passive: true});
      controls.append(previous, count, next); wrap.append(controls); requestAnimationFrame(update);
    }
    return wrap;
  }
  function removePopup() {
    if (!dialog) return;
    if (dialog.open) dialog.close();
    dialog.remove(); dialog = null;
  }
  function openPopup(promos) {
    if (popupShown || !promos.length || typeof HTMLDialogElement === 'undefined') return;
    // Defer while someone is using a form or the mobile menu.
    if (document.hidden || document.activeElement?.matches('input, textarea, select, [contenteditable="true"]') || document.querySelector('.mobile-menu.is-open, dialog[open]')) return;
    popupShown = true; shownAt = Date.now();
    try { localStorage.setItem(storageKey, String(shownAt)); } catch { /* Still closeable if storage is blocked. */ }
    const previousFocus = document.activeElement;
    dialog = el('dialog', 'promo-dialog'); dialog.setAttribute('aria-labelledby', 'promo-popup-heading');
    if (!promos.some(p => p.image || p.mobileImage)) dialog.classList.add('promo-dialog--text');
    const top = el('div', 'promo-dialog__top');
    const title = el('h2', '', t('At the studio', '工作室优惠')); title.id = 'promo-popup-heading';
    const close = el('button', 'promo-dialog__close', '×'); close.type = 'button'; close.autofocus = true;
    close.setAttribute('aria-label', t('Close promotions', '关闭优惠')); close.addEventListener('click', () => dialog.close());
    top.append(title, close); dialog.append(top, carousel(promos, true));
    const hint = el('p', 'promo-dialog__hint', t('Offers are subject to the studio’s terms and availability.', '优惠须遵守工作室条款，并视供应情况而定。')); dialog.append(hint);
    dialog.addEventListener('click', (e) => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
    dialog.addEventListener('close', () => { document.documentElement.classList.remove('promo-open'); previousFocus?.focus({preventScroll: true}); });
    document.body.append(dialog); dialog.showModal(); document.documentElement.classList.add('promo-open'); close.focus();
  }
  async function refresh() {
    if (stopped || document.hidden) return;
    try {
      const response = await fetch(endpoint, {cache: 'no-store', credentials: 'omit', signal: AbortSignal.timeout(8000)});
      if (!response.ok) throw new Error('Promotion feed unavailable');
      const data = await response.json();
      if (!Array.isArray(data.promotions) || !data.settings) throw new Error('Invalid promotion feed');
      clearTimeout(popupTimer);
      const promos = data.promotions.filter(p => p && typeof p.title === 'string' && (!p.endsAt || p.endsAt > data.serverTime));
      const banners = data.settings.enabled && data.settings.banner ? promos.filter(p => p.banner) : [];
      const bannerKey = JSON.stringify(banners);
      if (bannerKey !== lastBanner) {
        host.replaceChildren();
        if (banners.length) { const container = el('div', 'container'); container.append(carousel(banners)); host.append(container); }
        lastBanner = bannerKey;
      }
      host.hidden = !banners.length;
      const popups = data.settings.enabled && data.settings.popup ? promos.filter(p => p.popup) : [];
      if (dialog?.open && dialog.dataset.items !== JSON.stringify(popups)) removePopup();
      if (!document.body.dataset.bookingActive && !popupShown && popups.length && (previewPopup || Date.now() - shownAt >= Math.max(1, Number(data.settings.cooldown) || 24) * 3600000)) {
        const delay = previewPopup ? 0 : Math.max(0, Math.min(60, Number(data.settings.delay) || 0));
        popupTimer = setTimeout(() => {
          // Revalidate the dates after the delay using elapsed server time.
          const valid = popups.filter(p => !p.endsAt || p.endsAt > data.serverTime + delay);
          openPopup(valid); if (dialog) dialog.dataset.items = JSON.stringify(popups);
        }, delay * 1000);
      }
    } catch {
      // Never retain a potentially expired promotion after a failed refresh.
      host.hidden = true; host.replaceChildren(); lastBanner = ''; clearTimeout(popupTimer); removePopup();
    }
  }
  refresh();
  // Changes and expiry also apply to visitors who leave a page open.
  const interval = setInterval(refresh, 60000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
  window.addEventListener('pagehide', () => { clearTimeout(popupTimer); clearInterval(interval); stopped = true; });
  window.addEventListener('pageshow', e => { if (e.persisted) location.reload(); });
})();
