(function () {
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => Array.from(r.querySelectorAll(s));

  const input = q('#search');
  const count = q('#count');

  function normalize(s) {
    return (s || '').toLowerCase().trim();
  }

  function filter() {
    const term = normalize(input?.value);
    let visible = 0;

    qa('[data-search]').forEach(card => {
      const hay = normalize(card.getAttribute('data-search'));
      const show = !term || hay.includes(term);
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (count) count.textContent = visible;
  }

  input?.addEventListener('input', filter);

  /* Lightbox */
  const lb = q('#lightbox');
  const lbImg = q('#lightboxImg');
  const lbTitle = q('#lightboxTitle');
  const lbClose = q('#lightboxClose');

  function open(src, title) {
    lbImg.src = src;
    lbTitle.textContent = title || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  qa('[data-lightbox]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      open(a.href, a.dataset.title);
    });
  });

  lbClose?.addEventListener('click', close);
  lb?.addEventListener('click', e => {
    if (e.target === lb) close();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
    if (e.key === '/' && input) {
      e.preventDefault();
      input.focus();
    }
  });

  filter();
})();
