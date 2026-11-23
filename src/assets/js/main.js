// Healthtinity: progressive enhancements (all content works without JS)
(() => {
  const zh = document.documentElement.lang.startsWith('zh');
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // Compact, user-controlled mobile card rows; desktop keeps its existing grid.
  $$('[data-mobile-carousel]').forEach(track => {
    const controls = $(`[data-carousel-controls="${track.id}"]`);
    if (!controls) return;
    const cards = [...track.children];
    const prev = $('[data-carousel-prev]', controls);
    const next = $('[data-carousel-next]', controls);
    const step = () => cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth;
    const update = () => {
      const end = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= end - 2;
      const index = end > 0 && next.disabled ? cards.length - 1 : Math.round(track.scrollLeft / step());
      $('[data-carousel-count]', controls).textContent = `${Math.min(cards.length, index + 1)} / ${cards.length}`;
    };
    const move = direction => track.scrollBy({ left: direction * step(), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    prev.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    track.addEventListener('scroll', update, { passive: true });
    track.addEventListener('keydown', event => {
      if (event.target === track && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
      }
    });
    new ResizeObserver(update).observe(track);
    update();
  });

  // Send generic booking CTAs (including WordPress promotions) to the live widget.
  // Preserve deep links and links with checkout/query details exactly as supplied.
  const bookingOrigins = new Set(['https://healthtinity.com', 'https://www.healthtinity.com']);
  try { bookingOrigins.add(atob(document.body.dataset.bookingOrigin)); } catch { /* Optional config. */ }
  window.healthtinityBookingUrl = value => {
    if (!value) return value;
    try {
      const url = new URL(value, location.href);
      const view = { '/timetable': 'timetable', '/package': 'packages', '/membership': 'memberships' }[url.pathname.replace(/\/$/, '')];
      if (bookingOrigins.has(url.origin) && view && !url.search && !url.hash) {
        const local = new URL(document.body.dataset.bookingPage, location.href);
        local.searchParams.set('view', view);
        return local.href;
      }
    } catch { /* Keep the supplied value for the caller to validate. */ }
    return value;
  };

  // Preserve external booking links when Hostinger rewrites preview-domain HTML.
  $$('[data-booking-href]').forEach(link => {
    try {
      const original = new TextDecoder().decode(Uint8Array.from(atob(link.dataset.bookingHref), c => c.charCodeAt(0)));
      const url = new URL(original);
      if (url.protocol === 'https:') link.href = url.href;
    } catch { /* Leave the rendered link intact if a value is invalid. */ }
  });

  // ---- Sticky nav state
  const nav = $('[data-nav]');
  const onScroll = () => nav && nav.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---- Mobile menu
  const toggle = $('[data-menu-toggle]');
  const menu = $('[data-menu]');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      menu.inert = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', zh ? (open ? '关闭菜单' : '打开菜单') : (open ? 'Close menu' : 'Open menu'));
    });
  }

  // ---- Navigation dropdowns (click / keyboard support; hover handled in CSS)
  const closeDropdowns = (except) => $$('.dropdown').forEach(d => {
    if (d === except) return;
    d.classList.remove('is-open');
    d.querySelector('[data-dropdown]').setAttribute('aria-expanded', 'false');
  });
  $$('[data-dropdown]').forEach((btn) => {
    const wrap = btn.parentElement;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDropdowns(wrap);
      const open = wrap.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', () => closeDropdowns());
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const open = $('.dropdown.is-open [data-dropdown]');
    closeDropdowns();
    if (open) open.focus();
    if (menu?.classList.contains('is-open')) {
      menu.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false');
      menu.inert = true;
      toggle.setAttribute('aria-label', zh ? '打开菜单' : 'Open menu'); toggle.focus();
    }
  });

  // ---- Reveal on scroll
  const items = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 60}ms`; io.observe(el); });
  } else {
    items.forEach((el) => el.classList.add('is-visible'));
  }

  // ---- Schedule: day tabs + category filter
  const dayTabs = $$('.day-tab');
  if (dayTabs.length) {
    let cat = new URLSearchParams(location.search).get('c') || 'all';
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const showDay = (d) => {
      dayTabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.day === d)));
      $$('[data-day-panel]').forEach((p) => (p.hidden = p.dataset.dayPanel !== d));
    };
    const applyCat = () => {
      $$('.chip').forEach((c) => c.classList.toggle('is-active', c.dataset.cat === cat));
      $$('.sched__row').forEach((row) => (row.hidden = cat !== 'all' && row.dataset.cat !== cat));
      dayTabs.forEach((t) => {
        const n = $$(`[data-day-panel="${t.dataset.day}"] .sched__row`).filter((r) => !r.hidden).length;
        t.querySelector('small').textContent = zh ? `${n} 堂课` : `${n} class${n === 1 ? '' : 'es'}`;
      });
    };
    dayTabs.forEach((t) => t.addEventListener('click', () => showDay(t.dataset.day)));
    $$('.chip').forEach((c) => c.addEventListener('click', () => { cat = c.dataset.cat; applyCat(); }));
    showDay(days[new Date().getDay()]);
    applyCat();
  }

  // ---- Contact form → WhatsApp or email (no backend needed)
  const form = $('[data-contact-form]');
  if (form) {
    if (new URLSearchParams(location.search).get('enquiry') === 'corporate-wellness') {
      const subject = form.elements.namedItem('subject');
      const value = zh ? '企业健康活动' : 'Corporate Wellness';
      if ([...subject.options].some(option => option.value === value)) {
        subject.value = value;
        form.elements.namedItem('message').placeholder = zh
          ? '请提供公司名称、参加人数、希望的日期、地点及课程时长。'
          : 'Please share your company name, group size, preferred date, venue and session duration.';
      }
    }
    $$('[data-course-enquiry]').forEach(link => link.addEventListener('click', () => {
      form.elements.namedItem('subject').value = link.dataset.courseEnquiry;
      form.elements.namedItem('name').focus({ preventScroll: true });
    }));
    let via = 'wa';
    $$('button[data-via]', form).forEach((b) => b.addEventListener('click', () => (via = b.dataset.via)));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = new FormData(form);
      const text = zh
        ? `您好 Healthtinity！👋\n\n姓名：${f.get('name')}\n电邮：${f.get('email')}\n手机：${f.get('mobile') || '-'}\n主题：${f.get('subject')}\n\n${f.get('message')}`
        : `Hi Healthtinity! 👋\n\nName: ${f.get('name')}\nEmail: ${f.get('email')}\nMobile: ${f.get('mobile') || '-'}\nSubject: ${f.get('subject')}\n\n${f.get('message')}`;
      const url = via === 'wa'
        ? `${form.dataset.wa}?text=${encodeURIComponent(text)}`
        : `mailto:${form.dataset.email}?subject=${encodeURIComponent(`${zh ? '[网站]' : '[Website]'} ${f.get('subject')}`)}&body=${encodeURIComponent(text)}`;
      window.open(url, via === 'wa' ? '_blank' : '_self');
    });
  }

  // ---- Home: "Today at the studio" shows today's classes, past ones dimmed
  const today = $('[data-today]');
  if (today) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const full = zh
      ? ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const mins = (t) => { const m = t.match(/(\d+):(\d+)(am|pm)/); let h = +m[1] % 12; if (m[3] === 'pm') h += 12; return h * 60 + +m[2]; };
    const nowMin = now.getHours() * 60 + now.getMinutes();
    let d = now.getDay();
    let list = $(`[data-today-day="${days[d]}"]`, today);
    const rows = list ? $$('.today__row', list) : [];
    const allPast = rows.length > 0 && rows.every((r) => mins(r.dataset.time) < nowMin);
    if (allPast) { d = (d + 1) % 7; list = $(`[data-today-day="${days[d]}"]`, today); }
    $$('.today__list', today).forEach((l) => (l.hidden = l !== list));
    $('[data-today-title]', today).textContent = zh
      ? `${allPast ? '明天' : '今天'}，${full[d]}`
      : `${allPast ? 'Tomorrow' : 'Today'}, ${full[d]}`;
    // Show the next five classes only
    if (list) {
      const upcoming = $$('.today__row', list).filter((r) => allPast || mins(r.dataset.time) >= nowMin);
      $$('.today__row', list).forEach((r) => (r.hidden = !upcoming.slice(0, 5).includes(r)));
    }
  }

  // ---- Content protection: no right-click, copy, cut or image dragging.
  // Form fields stay usable so people can still type, paste and fix their details.
  const editable = (el) => el && el.closest && el.closest('input, textarea, select, [contenteditable="true"]');
  ['contextmenu', 'copy', 'cut', 'dragstart'].forEach((type) =>
    document.addEventListener(type, (e) => { if (!editable(e.target)) e.preventDefault(); }));

  // ---- Footer year
  const y = $('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
