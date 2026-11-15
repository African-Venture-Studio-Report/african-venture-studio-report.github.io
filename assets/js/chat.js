/* "Ask the report" chat box. Answers come only from the report text via the Cloudflare service. */
(function () {
  'use strict';
  var me = document.currentScript;
  var ENDPOINT = me && me.getAttribute('data-endpoint');
  if (!ENDPOINT) return; // not switched on yet
  var SITE = 'https://african-venture-studio-report.github.io/';
  var SUGGEST = ['What is this report about?', 'Who writes the first cheque for studio companies?', 'Do studio companies raise second rounds more often than other startups?'];

  var KEY = 'avsr-ask-v1';
  function load() { try { return JSON.parse(sessionStorage.getItem(KEY)) || null; } catch (e) { return null; } }
  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable: chat still works on this page */ } }
  var state = load() || { open: false, msgs: [] };
  var narrow = window.matchMedia ? window.matchMedia('(max-width: 600px)') : { matches: false };

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
  var reset = el('button', 'ask-reset', 'New chat'); reset.type = 'button';
  var minBtn = el('button', 'ask-min'); minBtn.type = 'button';
  var ICON_MIN = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';
  var ICON_MAX = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 15l6-6 6 6" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var count = el('span', 'ask-count');
  var titleWrap = el('button', 'ask-titlebtn'); titleWrap.type = 'button'; titleWrap.appendChild(title); titleWrap.appendChild(count);
  var tools = el('div', 'ask-tools'); tools.appendChild(reset); tools.appendChild(minBtn); tools.appendChild(close);
  head.appendChild(titleWrap); head.appendChild(tools);
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

  function setView(v, focus) {
    state.open = v === 'open' ? true : (v === 'min' ? 'min' : false); save();
    panel.hidden = v === 'closed';
    panel.classList.toggle('is-min', v === 'min');
    btn.hidden = v !== 'closed';
    btn.setAttribute('aria-expanded', v === 'closed' ? 'false' : 'true');
    document.documentElement.classList.toggle('ask-open', v === 'open' && narrow.matches);
    document.documentElement.classList.toggle('chat-minimised', v === 'min');
    minBtn.innerHTML = v === 'min' ? ICON_MAX : ICON_MIN;
    minBtn.setAttribute('aria-label', v === 'min' ? 'Expand chat' : 'Minimise chat');
    titleWrap.setAttribute('aria-label', v === 'min' ? 'Expand chat' : 'Ask the report');
    titleWrap.disabled = v !== 'min';
    var qn = state.msgs.filter(function (m) { return m.t === 'q'; }).length;
    count.textContent = (v === 'min' && qn) ? qn + (qn === 1 ? ' question' : ' questions') : '';
    if (v === 'open') { log.scrollTop = log.scrollHeight; if (focus !== false) setTimeout(function () { input.focus(); }, 30); }
    if (v === 'min' && focus !== false) minBtn.focus();
    if (v === 'closed' && focus !== false) btn.focus();
  }
  function open() { setView('open'); }
  function shut() { setView('closed'); }
  btn.addEventListener('click', open);
  minBtn.addEventListener('click', function () { setView(panel.classList.contains('is-min') ? 'open' : 'min'); });
  titleWrap.addEventListener('click', function () { if (panel.classList.contains('is-min')) open(); });
  close.addEventListener('click', shut);
  reset.addEventListener('click', function () {
    state.msgs = []; save();
    while (log.firstChild) log.removeChild(log.firstChild);
    log.appendChild(intro); reset.hidden = true; input.focus();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden && !panel.classList.contains('is-min')) setView('min'); });
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); form.requestSubmit ? form.requestSubmit() : send(input.value); } });
  form.addEventListener('submit', function (e) { e.preventDefault(); send(input.value); });

  log.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    try { sessionStorage.setItem(KEY + '-jump', '1'); } catch (x) { /* ignore */ }
    setView('min', false);
  });
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
    state.msgs.push({ t: 'q', text: q }); reset.hidden = false; save();
    var wait = bubble('a pending'); wait.textContent = 'Searching the report…';
    fetch(ENDPOINT, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ question: q }) })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        wait.className = 'ask-msg a'; wait.textContent = '';
        if (!res.ok || res.j.error) { wait.textContent = res.j.error || 'Something went wrong. Please try again.'; state.msgs.push({ t: 'e', text: wait.textContent }); save(); return; }
        renderAnswer(wait, res.j);
        state.msgs.push({ t: 'a', data: { answer: res.j.answer, sources: res.j.sources || [] } });
        if (state.msgs.length > 40) state.msgs = state.msgs.slice(-40);
        save();
      })
      .catch(function () { wait.className = 'ask-msg a'; wait.textContent = 'The assistant is unavailable right now. Please try again later.'; state.msgs.push({ t: 'e', text: wait.textContent }); save(); })
      .then(function () { busy = false; go.disabled = false; log.scrollTop = log.scrollHeight; input.focus(); });
  }
  // Restore this session's conversation after a page change or reload
  reset.hidden = !state.msgs.length;
  if (state.msgs.length) {
    if (intro.parentNode) intro.parentNode.removeChild(intro);
    state.msgs.forEach(function (m) {
      if (m.t === 'q') bubble('q').textContent = m.text;
      else if (m.t === 'a') renderAnswer(bubble('a'), m.data);
      else bubble('a').textContent = m.text;
    });
  }
  setView(state.open === true ? 'open' : (state.open === 'min' ? 'min' : 'closed'), false);
  log.scrollTop = log.scrollHeight;
  // Briefly highlight the section a chat link pointed to
  try {
    if (sessionStorage.getItem(KEY + '-jump') && location.hash) {
      sessionStorage.removeItem(KEY + '-jump');
      var t = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (t) { t.classList.add('ask-target'); setTimeout(function () { t.classList.remove('ask-target'); }, 2600); }
    }
  } catch (x) { /* ignore */ }
})();
