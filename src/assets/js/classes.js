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
  const list = page.querySelector('[data-class-types]');
  const fallback = zh ? '欢迎联系我们，了解课程详情并选择合适的课程。' : 'Contact our team for details about this class and help choosing a session.';
  let types = [];
  let selected = 0;
  const picker = make('select');
  picker.id = 'class-type-picker';
  picker.setAttribute('aria-controls', 'class-type-panel');
  const label = make('label', zh ? '选择课程类型' : 'Choose a class type');
  label.htmlFor = picker.id;
  const heading = make('div', '', 'class-browser__heading');
  const total = make('span', '', 'class-browser__total');
  heading.append(label, total);
  const chooser = make('div', '', 'class-browser__chooser');
  chooser.append(heading, picker);
  const panel = make('div', '', 'class-browser__panel');
  panel.id = 'class-type-panel';
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-labelledby', 'class-type-title');
  panel.setAttribute('aria-live', 'polite');
  const title = make('h3'); title.id = 'class-type-title';
  const meta = make('dl', '', 'class-type__meta');
  const description = make('p', '', 'class-browser__description');
  panel.append(title, meta, description);
  const enquiry = make('a', zh ? '咨询这项课程' : 'Ask about this class', 'btn btn--primary');
  const actions = make('div', '', 'class-browser__actions');
  actions.append(enquiry);
  const navigation = make('div', '', 'class-browser__navigation');
  const previous = make('button', zh ? '← 上一个' : '← Previous');
  const next = make('button', zh ? '下一个 →' : 'Next →');
  const position = make('span');
  previous.type = next.type = 'button';
  previous.setAttribute('aria-controls', panel.id);
  next.setAttribute('aria-controls', panel.id);
  navigation.append(previous, position, next);
  const empty = make('p', zh ? '欢迎联系我们，了解课程选项。' : 'Contact our team to explore the class options.');

  const show = () => {
    const type = types[selected];
    if (!type) return;
    picker.value = String(selected);
    title.textContent = type.name;
    description.textContent = type.description || fallback;
    meta.replaceChildren();
    for (const [name, value] of [[zh ? '程度' : 'Level', type.level], [zh ? '时长' : 'Duration', type.duration]]) {
      if (!value) continue;
      const group = make('div'); group.append(make('dt', name), make('dd', value)); meta.append(group);
    }
    meta.hidden = !meta.childElementCount;
    const url = new URL(list.dataset.classEnquiry);
    url.searchParams.set('text', zh ? `您好 Healthtinity！我想了解 ${type.name}。` : `Hi Healthtinity! I'd like to find out more about ${type.name}.`);
    enquiry.href = url.href;
    position.textContent = `${selected + 1} / ${types.length}`;
    previous.disabled = selected === 0;
    next.disabled = selected === types.length - 1;
  };
  const render = incoming => {
    const selectedName = types[selected]?.name;
    types = incoming.filter(type => type && typeof type.name === 'string' && type.name.trim());
    selected = Math.max(0, types.findIndex(type => type.name === selectedName));
    picker.replaceChildren(...types.map((type, index) => {
      const option = make('option', type.name); option.value = String(index); return option;
    }));
    total.textContent = zh ? `${types.length} 种选择` : `${types.length} options`;
    chooser.hidden = panel.hidden = navigation.hidden = !types.length;
    empty.hidden = !!types.length;
    enquiry.textContent = types.length ? (zh ? '咨询这项课程' : 'Ask about this class') : (zh ? '咨询我们的团队' : 'Talk to our team');
    enquiry.href = list.dataset.classEnquiry;
    show();
  };
  picker.addEventListener('change', () => { selected = Number(picker.value); show(); });
  previous.addEventListener('click', () => { selected = Math.max(0, selected - 1); show(); });
  next.addEventListener('click', () => { selected = Math.min(types.length - 1, selected + 1); show(); });
  const initial = [...list.querySelectorAll('details')].map(details => ({ name: details.querySelector('summary').textContent, description: details.querySelector('p').textContent }));
  list.classList.add('class-browser');
  list.replaceChildren(chooser, panel, empty, actions, navigation);
  render(initial);
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
    render(data.types);
  }).catch(() => { /* Keep the built introduction and class names on failure. */ }).finally(() => clearTimeout(timeout));
})();
