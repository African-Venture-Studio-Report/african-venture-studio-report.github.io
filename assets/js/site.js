(function () {
  'use strict';
  // Accessible tabs: [role=tablist] > [role=tab][aria-controls]
  document.querySelectorAll('[role=tablist]').forEach(function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role=tab]'));
    function select(t, focus) {
      tabs.forEach(function (x) {
        var on = x === t;
        x.setAttribute('aria-selected', on ? 'true' : 'false');
        x.tabIndex = on ? 0 : -1;
        var p = document.getElementById(x.getAttribute('aria-controls'));
        if (p) p.hidden = !on;
      });
      if (focus) t.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var k = e.key, j = null;
        if (k === 'ArrowRight') j = (i + 1) % tabs.length;
        if (k === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
        if (k === 'Home') j = 0;
        if (k === 'End') j = tabs.length - 1;
        if (j !== null) { e.preventDefault(); select(tabs[j], true); }
      });
    });
  });
  // Copy citation
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var src = document.getElementById(b.getAttribute('data-copy'));
      if (!src || !navigator.clipboard) return;
      navigator.clipboard.writeText(src.innerText.trim()).then(function () {
        var old = b.textContent; b.textContent = 'Copied'; setTimeout(function () { b.textContent = old; }, 1800);
      });
    });
  });
})();
(function () {
  var btn = document.querySelector('.menu-btn'), menu = document.getElementById('site-menu');
  if (!btn || !menu) return;
  var here = location.pathname.split('/').pop() || 'index.html';
  menu.querySelectorAll('a').forEach(function (a) { if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page'); });
  function set(open) { btn.setAttribute('aria-expanded', open ? 'true' : 'false'); menu.hidden = !open; }
  btn.addEventListener('click', function (e) { e.stopPropagation(); set(menu.hidden); });
  document.addEventListener('click', function (e) { if (!menu.hidden && !menu.contains(e.target)) set(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { set(false); btn.focus(); } });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
})();
