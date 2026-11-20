/* WordPress media-library controls for promotion artwork. */
jQuery(($) => {
  $(document).on('click', '.htp-select-image', function () {
    const box = $(this).closest('.htp-media');
    const frame = wp.media({ title: 'Choose promotion image', button: { text: 'Use this image' }, library: { type: 'image' }, multiple: false });
    frame.on('select', () => {
      const image = frame.state().get('selection').first().toJSON();
      box.find('input').val(image.id);
      const img = $('<img>').attr({ src: image.sizes?.medium?.url || image.url, alt: image.alt || '' }).css({maxWidth: '300px', height: 'auto'});
      box.find('.htp-media-preview').empty().append(img);
    });
    frame.open();
  });
  $(document).on('click', '.htp-remove-image', function () {
    const box = $(this).closest('.htp-media');
    box.find('input').val('0'); box.find('.htp-media-preview').empty();
  });
});
