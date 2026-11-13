// Healthtinity: progressive enhancements (all content works without JS)
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

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
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }

  // ---- Pricing dropdown (click / keyboard support; hover handled in CSS)
  $$('[data-dropdown]').forEach((btn) => {
    const wrap = btn.parentElement;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = wrap.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', () => $$('.dropdown.is-open').forEach((d) => d.classList.remove('is-open')));

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
        t.querySelector('small').textContent = `${n} class${n === 1 ? '' : 'es'}`;
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
    let via = 'wa';
    $$('button[data-via]', form).forEach((b) => b.addEventListener('click', () => (via = b.dataset.via)));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = new FormData(form);
      const text = `Hi Healthtinity! 👋\n\nName: ${f.get('name')}\nEmail: ${f.get('email')}\nMobile: ${f.get('mobile') || '-'}\nSubject: ${f.get('subject')}\n\n${f.get('message')}`;
      const url = via === 'wa'
        ? `${form.dataset.wa}?text=${encodeURIComponent(text)}`
        : `mailto:${form.dataset.email}?subject=${encodeURIComponent(`[Website] ${f.get('subject')}`)}&body=${encodeURIComponent(text)}`;
      window.open(url, via === 'wa' ? '_blank' : '_self');
    });
  }

  // ---- Home: "Today at the studio" shows today's classes, past ones dimmed
  const today = $('[data-today]');
  if (today) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const full = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const mins = (t) => { const m = t.match(/(\d+):(\d+)(am|pm)/); let h = +m[1] % 12; if (m[3] === 'pm') h += 12; return h * 60 + +m[2]; };
    const nowMin = now.getHours() * 60 + now.getMinutes();
    let d = now.getDay();
    let list = $(`[data-today-day="${days[d]}"]`, today);
    const rows = list ? $$('.today__row', list) : [];
    const allPast = rows.length > 0 && rows.every((r) => mins(r.dataset.time) < nowMin);
    if (allPast) { d = (d + 1) % 7; list = $(`[data-today-day="${days[d]}"]`, today); }
    $$('.today__list', today).forEach((l) => (l.hidden = l !== list));
    $('[data-today-title]', today).textContent = `${allPast ? 'Tomorrow' : 'Today'}, ${full[d]}`;
    // Show the next five classes only
    if (list) {
      const upcoming = $$('.today__row', list).filter((r) => allPast || mins(r.dataset.time) >= nowMin);
      $$('.today__row', list).forEach((r) => (r.hidden = !upcoming.slice(0, 5).includes(r)));
    }
  }

  // ---- Footer year
  const y = $('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
