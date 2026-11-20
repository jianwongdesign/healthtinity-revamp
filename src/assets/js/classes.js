/* Class content is edited in WordPress; built copy remains available offline. */
(() => {
  const page = document.querySelector('[data-class-page]');
  if (!page?.dataset.classesApi) return;
  const zh = document.documentElement.lang.startsWith('zh');
  const endpoint = new URL(page.dataset.classesApi, location.origin);
  endpoint.searchParams.set('lang', zh ? 'zh' : 'en');
  const make = (tag, text, cls) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (cls) node.className = cls;
    return node;
  };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  fetch(endpoint, { signal: controller.signal, cache: 'no-store' }).then(response => {
    if (!response.ok) throw new Error('Class content unavailable');
    return response.json();
  }).then(data => {
    if (typeof data.intro !== 'string' || !Array.isArray(data.types)) return;
    const intro = page.querySelector('[data-class-intro]');
    intro.textContent = data.intro; intro.hidden = !data.intro;
    const expect = page.querySelector('[data-class-expect]');
    expect.textContent = data.expect || '';
    page.querySelector('[data-class-expect-section]').hidden = !data.expect;
    if (data.image?.src) {
      const url = new URL(data.image.src, endpoint.origin);
      if (url.protocol === 'https:') {
        const image = page.querySelector('[data-class-image]');
        image.src = url.href; image.alt = data.image.alt || '';
      }
    }
    const list = page.querySelector('[data-class-types]');
    const fragment = document.createDocumentFragment();
    for (const type of data.types) {
      if (!type.name) continue;
      const details = make('details', '', 'class-type');
      details.append(make('summary', type.name));
      const body = make('div', '', 'class-type__body');
      if (type.level || type.duration) {
        const meta = make('dl', '', 'class-type__meta');
        for (const [label, value] of [[zh ? '程度' : 'Level', type.level], [zh ? '时长' : 'Duration', type.duration]]) {
          if (!value) continue;
          const group = make('div'); group.append(make('dt', label), make('dd', value)); meta.append(group);
        }
        body.append(meta);
      }
      body.append(make('p', type.description || (zh ? '欢迎联系我们，了解课程详情并选择合适的课程。' : 'Contact our team for details about this class and help choosing a session.')));
      details.append(body); fragment.append(details);
    }
    if (!fragment.childElementCount) fragment.append(make('p', zh ? '欢迎联系我们，了解课程选项。' : 'Contact our team to explore the class options.'));
    list.replaceChildren(fragment);
  }).catch(() => { /* Keep the built introduction and class names on failure. */ }).finally(() => clearTimeout(timeout));
})();
