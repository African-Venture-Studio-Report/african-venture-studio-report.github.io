/* "Ask the report" chat box. Answers come only from the report text via the Cloudflare service. */
(function () {
  'use strict';
  var me = document.currentScript;
  var ENDPOINT = me && me.getAttribute('data-endpoint');
  if (!ENDPOINT) return; // not switched on yet
  var SITE = 'https://african-venture-studio-report.github.io/';
  var SUGGEST = ['What is this report about?', 'Who writes the first cheque for studio companies?', 'Do studio companies raise second rounds more often than other startups?'];

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function localUrl(u) { return u.indexOf(SITE) === 0 ? u.slice(SITE.length) : null; }

  var btn = el('button', 'ask-btn');
  btn.type = 'button';
  btn.setAttribute('aria-haspopup', 'dialog');
  btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg><span>Ask the report</span>';

  var panel = el('div', 'ask-panel');
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'false');
  panel.setAttribute('aria-labelledby', 'ask-title');
  panel.hidden = true;
  var head = el('div', 'ask-head');
  var title = el('h2', null, 'Ask the report'); title.id = 'ask-title';
  var close = el('button', 'ask-close'); close.type = 'button'; close.setAttribute('aria-label', 'Close'); close.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
  head.appendChild(title); head.appendChild(close);
  var log = el('div', 'ask-log'); log.setAttribute('aria-live', 'polite');
  var intro = el('div', 'ask-intro');
  intro.appendChild(el('p', null, 'Ask about the findings. Every answer is drawn from the report and linked to its source chapter or exhibit.'));
  var chips = el('div', 'ask-chips');
  SUGGEST.forEach(function (s) { var c = el('button', 'ask-chip', s); c.type = 'button'; c.addEventListener('click', function () { send(s); }); chips.appendChild(c); });
  intro.appendChild(chips);
  log.appendChild(intro);
  var form = el('form', 'ask-form');
  var label = el('label', 'visually-hidden', 'Your question'); label.htmlFor = 'ask-input';
  var input = el('textarea'); input.id = 'ask-input'; input.rows = 1; input.maxLength = 400; input.placeholder = 'Ask about the findings…';
  var go = el('button', 'ask-send', 'Ask'); go.type = 'submit';
  form.appendChild(label); form.appendChild(input); form.appendChild(go);
  var note = el('p', 'ask-note', 'AI-assisted responses, drawn strictly from the report. The full report is the authoritative source.');
  panel.appendChild(head); panel.appendChild(log); panel.appendChild(form); panel.appendChild(note);
  document.body.appendChild(btn); document.body.appendChild(panel);

  function open() { panel.hidden = false; btn.setAttribute('aria-expanded', 'true'); document.documentElement.classList.add('ask-open'); setTimeout(function () { input.focus(); }, 30); }
  function shut() { panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); document.documentElement.classList.remove('ask-open'); btn.focus(); }
  btn.addEventListener('click', function () { panel.hidden ? open() : shut(); });
  close.addEventListener('click', shut);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) shut(); });
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); form.requestSubmit ? form.requestSubmit() : send(input.value); } });
  form.addEventListener('submit', function (e) { e.preventDefault(); send(input.value); });

  function bubble(cls) { var b = el('div', 'ask-msg ' + cls); log.appendChild(b); log.scrollTop = log.scrollHeight; return b; }
  function renderAnswer(box, data) {
    var p = el('p');
    var parts = String(data.answer || '').split(/(\[\d+\])/);
    parts.forEach(function (part) {
      var m = part.match(/^\[(\d+)\]$/);
      if (m && data.sources && data.sources[+m[1] - 1]) {
        var s = data.sources[+m[1] - 1], href = localUrl(s.url);
        var a = el('a', 'ask-ref', m[1]); if (href) a.href = href; a.title = s.label; p.appendChild(a);
      } else p.appendChild(document.createTextNode(part));
    });
    box.appendChild(p);
    if (data.sources && data.sources.length) {
      var h = el('p', 'ask-src-h', 'From the report:'); box.appendChild(h);
      var ol = el('ol', 'ask-src');
      data.sources.forEach(function (s) { var li = el('li'); var href = localUrl(s.url); var a = el('a', null, s.label); if (href) a.href = href; li.appendChild(a); ol.appendChild(li); });
      box.appendChild(ol);
    }
  }
  var busy = false;
  function send(q) {
    q = String(q || '').trim(); if (!q || busy) return;
    if (intro.parentNode) intro.parentNode.removeChild(intro);
    busy = true; go.disabled = true; input.value = '';
    bubble('q').textContent = q;
    var wait = bubble('a pending'); wait.textContent = 'Searching the report…';
    fetch(ENDPOINT, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ question: q }) })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        wait.className = 'ask-msg a'; wait.textContent = '';
        if (!res.ok || res.j.error) { wait.textContent = res.j.error || 'Something went wrong. Please try again.'; return; }
        renderAnswer(wait, res.j);
      })
      .catch(function () { wait.className = 'ask-msg a'; wait.textContent = 'The assistant is unavailable right now. Please try again later.'; })
      .then(function () { busy = false; go.disabled = false; log.scrollTop = log.scrollHeight; input.focus(); });
  }
})();
