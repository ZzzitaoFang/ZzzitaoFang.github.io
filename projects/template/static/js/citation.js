// static/js/citation.js
(function () {
  function getBibText() {
    const ta = document.getElementById('bibtex-ta');
    if (ta) return ta.value.trim();
    const pre = document.getElementById('bibtex');
    return pre ? pre.innerText.trim() : '';
  }

  // 替换原来的 flash()：通过添加/移除 .copied 类来切换样式与图标
  function flash(btn) {
    if (!btn) return;
    const oldAria = btn.getAttribute('aria-label') || 'Copy BibTeX';
    btn.classList.add('copied');
    btn.setAttribute('aria-label', 'Copied!');
    btn.disabled = true;
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.setAttribute('aria-label', oldAria);
      btn.disabled = false;
    }, 1200);
  }


  function selectAll() {
    const ta = document.getElementById('bibtex-ta');
    if (ta) { ta.focus(); ta.select(); return; }

    const pre = document.getElementById('bibtex');
    if (!pre) return;

    const range = document.createRange();
    range.selectNodeContents(pre);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    // pre.classList.add('selected');
    // setTimeout(() => pre.classList.remove('selected'), 800);
  }

  function copyBibtex() {
    const text = getBibText();
    const btn = document.getElementById('copy-bib');
    const ok = () => flash(btn);

    function fallback() {
      selectAll();
      try { document.execCommand('copy'); ok(); } catch (e) {}
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(ok).catch(fallback);
    } else {
      fallback();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copy-bib');
    if (copyBtn) copyBtn.addEventListener('click', copyBibtex);

    const pre = document.getElementById('bibtex');
    if (pre) {
      pre.setAttribute('tabindex', '0');
      pre.addEventListener('click', selectAll);
      pre.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectAll(); }
      });
    }

    document.querySelectorAll('a[href="#citation-ref"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        document.getElementById('citation-ref')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', '#citation-ref');
      });
    });
  });

  window.copyBibtex = copyBibtex;
})();

document.addEventListener('DOMContentLoaded', () => {
  const floatBtn = document.getElementById('back-to-top-float');
  if (!floatBtn) return;

  const onScroll = () => {
    if (window.scrollY > 400) floatBtn.classList.add('is-visible');
    else floatBtn.classList.remove('is-visible');
  };

  floatBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // 初始状态
});