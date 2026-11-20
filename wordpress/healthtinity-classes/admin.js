(() => {
  const root = document.querySelector('.htc-admin');
  if (!root) return;
  const form = root.querySelector('form');
  const list = root.querySelector('[data-htc-types]');
  const status = root.querySelector('[data-htc-status]');
  let dirty = false;
  const changed = () => { dirty = true; status.textContent = 'Unsaved changes. Save the class page to publish them.'; };
  form.addEventListener('input', changed);
  form.addEventListener('submit', () => { dirty = false; });
  window.addEventListener('beforeunload', event => { if (dirty) { event.preventDefault(); event.returnValue = ''; } });
  const renumber = () => {
    [...list.children].forEach((row, index) => {
      row.querySelectorAll('[name]').forEach(input => {
        input.name = input.name.replace(/htc\[types\]\[[^\]]+\]/, `htc[types][${index}]`);
        input.id = `htc-type-${index}-${input.name.split('[').pop().replace(']', '')}`;
        input.closest('label').htmlFor = input.id;
      });
      row.querySelector('[data-htc-up]').disabled = index === 0;
      row.querySelector('[data-htc-down]').disabled = index === list.children.length - 1;
    });
    root.querySelector('[data-htc-add]').disabled = list.children.length >= 40;
  };
  root.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    const row = button.closest('.htc-type');
    if (button.matches('[data-htc-add]') && list.children.length < 40) {
      list.append(root.querySelector('#htc-type-template').content.cloneNode(true));
      renumber(); list.lastElementChild.querySelector('input').focus(); changed();
    } else if (button.matches('[data-htc-remove]')) {
      const next = row.nextElementSibling || row.previousElementSibling;
      row.remove(); renumber(); (next?.querySelector('input') || root.querySelector('[data-htc-add]')).focus(); changed();
    } else if (button.matches('[data-htc-up]') && row.previousElementSibling) {
      list.insertBefore(row, row.previousElementSibling); renumber(); row.querySelector('input').focus(); changed();
    } else if (button.matches('[data-htc-down]') && row.nextElementSibling) {
      list.insertBefore(row.nextElementSibling, row); renumber(); row.querySelector('input').focus(); changed();
    } else if (button.matches('[data-htc-image]')) {
      const frame = wp.media({ title: 'Choose class photo', button: { text: 'Use photo' }, library: { type: 'image' }, multiple: false });
      frame.on('select', () => {
        const image = frame.state().get('selection').first().toJSON();
        form.querySelector('[name="htc[image_id]"]').value = image.id;
        const img = document.createElement('img'); img.src = image.sizes?.medium?.url || image.url; img.alt = image.alt || '';
        root.querySelector('[data-htc-preview]').replaceChildren(img); changed();
      }); frame.open();
    } else if (button.matches('[data-htc-reset]')) {
      form.querySelector('[name="htc[image_id]"]').value = '0'; root.querySelector('[data-htc-preview]').replaceChildren(); changed();
    }
  });
  renumber();
})();
