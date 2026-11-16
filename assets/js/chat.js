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
  function localUrl(u) { u = String(u || ''); if (u.indexOf(SITE) === 0) return u.slice(SITE.length) || '/'; return /^[a-z0-9-]+\.html(#[^ ]*)?$/i.test(u) ? u : null; }

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
      data.sources.forEach(function (s) {
        var li = el('li'); var href = localUrl(s.url); var a = el('a', null, s.label); if (href) a.href = href; li.appendChild(a);
        if (s.quote) { var bq = el('blockquote', 'ask-quote', '\u201c' + s.quote + '\u201d'); li.appendChild(bq); }
        ol.appendChild(li);
      });
      box.appendChild(ol);
    }
  }

  // Fallback when AI answers are unavailable: search the report in the browser, at no cost
  var SEARCH_URL = (document.querySelector('script[src*="chat.js"]') || {}).src ? new URL('../data/report-search.json', document.querySelector('script[src*="chat.js"]').src).href : 'assets/data/report-search.json';
  var DOCS = null, DF = null, AVG = 0;
  var STOPW = {};
  'a an and are as at be been but by can could did do does for from had has have how i if in into is it its me my of on or our should so than that the their them then there these they this to too was we were what when where which who whom why will with would you your report study about tell give show please much many more most also any some all summarise summarize explain'.split(' ').forEach(function (w) { STOPW[w] = 1; });
  function toks(t) { return (String(t).toLowerCase().replace(/[’']/g, '').replace(/cut[\s-]?off/g, 'cutoff').match(/[a-z0-9][a-z0-9.%-]*/g) || []).map(function (w) { return w.replace(/[.%-]+$/, ''); }).filter(function (w) { return w && !STOPW[w] && (w.length > 1 || /\d/.test(w)); }).map(stem); }
  function stem(w) { if (/\d/.test(w) || w.length < 5) return w; return w.replace(/(ies)$/, 'y').replace(/(ing|ed|es|s)$/, '').replace(/(e)$/, ''); }
  function loadDocs() {
    if (DOCS) return Promise.resolve(DOCS);
    return fetch(SEARCH_URL).then(function (r) { return r.json(); }).then(function (rows) {
      DF = {}; var tot = 0;
      DOCS = rows.map(function (r) { var tf = {}, ts = toks(r[2] + ' ' + r[0]); ts.forEach(function (t) { tf[t] = (tf[t] || 0) + 1; }); Object.keys(tf).forEach(function (t) { DF[t] = (DF[t] || 0) + 1; }); tot += ts.length; return { label: r[0], url: r[1], text: r[2], tf: tf, len: ts.length }; });
      AVG = tot / DOCS.length; return DOCS;
    });
  }
  function bestSentence(text, qt) {
    var units = String(text).replace(/^.*?(Data|Table) rows: /, '').split(/(?<=[.;!?])\s+(?=[A-Z0-9])| \|\| /);
    var best = '', bs = -1;
    units.forEach(function (u) { if (u.length < 40) return; var ut = toks(u), sc = 0; qt.forEach(function (t) { if (ut.indexOf(t) >= 0) sc += Math.log(1 + DOCS.length / (DF[t] || 1)); }); if (sc > bs + 1e-9 || (Math.abs(sc - bs) < 1e-9 && u.length < best.length)) { bs = sc; best = u; } });
    best = best.trim(); return best.length > 300 ? best.slice(0, 297).replace(/\s+\S*$/, '') + '…' : best;
  }
  var OVERVIEW_Q = /\b(key|main|headline|top|major|core)\s+(finding|takeaway|point|message|result)s?\b|\bwhat (are|were) the (findings|results)\b|^\s*(the )?findings?\s*\??\s*$|\bsumm?ar(y|ise|ize)\b|\boverview\b|\bwhat(\s+is|'s)\s+(this|the)\s+(report|study)\s+about\b|\bwhat did (you|they|the authors) find\b|\btl;?dr\b/i;
  var CHAP_Q = /\b(?:ch\.?|c[a-z]*h[a-z]*p[a-z]*)\s*(\d)\b/i;
  function firstSentence(t) { var m = String(t).match(/^.*?[.!?](?=\s|$)/); var x = (m ? m[0] : String(t)).trim(); return x.length > 300 ? x.slice(0, 297).replace(/\s+\S*$/, '') + '\u2026' : x; }
  function headlineFindings(docs) {
    var t = docs.filter(function (d) { return /^executive-summary/.test(d.url); }).map(function (d) { return d.text; }).join(' ');
    var re = /Finding (\d\d): (.+?)\. (.+?) \(Covered in ([^)]*?)\.\)/g, m, out = [];
    while ((m = re.exec(t)) && out.length < 6) {
      var ch = (m[4].match(/Chapter (\d)/) || [])[1], ex = (m[4].match(/Exhibits? (\d+)/) || [])[1];
      out.push({ label: 'Finding ' + m[1] + ': ' + m[2] + ' (' + m[4] + ')', url: ch ? 'chapter-' + ch + '.html' + (ex ? '#exhibit-' + ex : '') : 'executive-summary.html', quote: firstSentence(m[3]) });
    }
    return out;
  }
  function chapterSections(docs, n) {
    var seen = {}, out = [];
    docs.forEach(function (d) { if (d.url.indexOf('chapter-' + n + '.html') === 0 && !/^Exhibit /.test(d.label) && !seen[d.label] && out.length < 6) { seen[d.label] = 1; out.push({ label: d.label, url: d.url, quote: firstSentence(d.text) }); } });
    return out;
  }
  function localSearch(q) {
    return loadDocs().then(function (docs) {
      var cm = q.match(CHAP_Q);
      if (cm && +cm[1] >= 1 && +cm[1] <= 9 && !/exhibit/i.test(q)) { var cs = chapterSections(docs, +cm[1]); if (cs.length) return cs; }
      if (!cm && OVERVIEW_Q.test(q)) { var hf = headlineFindings(docs); if (hf.length) return hf; }
      var qt = toks(q).filter(function (t, i, a) { return a.indexOf(t) === i; }), n = docs.length;
      var scored = docs.map(function (d, i) { var s = 0; qt.forEach(function (t) { var f = d.tf[t]; if (!f) return; var idf = Math.log(1 + (n - DF[t] + 0.5) / (DF[t] + 0.5)); s += idf * (f * 2.4) / (f + 1.4 * (0.25 + 0.75 * d.len / AVG)); }); return { d: d, s: s }; })
        .filter(function (x) { return x.s > 0; }).sort(function (a, b) { return b.s - a.s; });
      var out = [], seen = {};
      for (var k = 0; k < scored.length && out.length < 4; k++) { var d = scored[k].d; if (seen[d.label] || scored[k].s < 2) continue; seen[d.label] = 1; out.push({ label: d.label, url: d.url, quote: /^Exhibit /.test(d.label) ? '' : bestSentence(d.text, qt) }); }
      return out;
    });
  }
  function resumeTime() {
    var d = new Date(); d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1));
    try { return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); } catch (e) { return 'midnight UTC'; }
  }
  function fallback(wait, q, why) {
    var lead = why === 'hour' ? 'You have reached the hourly limit for AI answers, so here are the passages from the report that best match your question:'
      : why === 'down' ? 'AI answers are unavailable right now. These passages from the report best match your question:'
      : (state.fellBack ? 'AI answers are still paused. These passages from the report best match your question:'
      : 'AI answers are paused because today\u2019s free allowance has been used. They resume at ' + resumeTime() + ' your time. Meanwhile, these passages from the report best match your question:');
    return localSearch(q).then(function (src) {
      var data = src.length ? { answer: lead, sources: src, mode: 'search' } : { answer: (why === 'hour' ? 'You have reached the hourly limit for AI answers. ' : why === 'down' ? 'AI answers are unavailable right now. ' : 'AI answers are paused for now. ') + 'No passage in the report closely matches that question. Try other words, or browse the chapters from the menu.', sources: [], mode: 'search' };
      state.fellBack = true; wait.className = 'ask-msg a'; wait.textContent = ''; renderAnswer(wait, data);
      state.msgs.push({ t: 'a', data: data }); save();
    }).catch(function () { wait.className = 'ask-msg a'; wait.textContent = 'The assistant is unavailable right now. Please try again later.'; state.msgs.push({ t: 'e', text: wait.textContent }); save(); });
  }
  var busy = false;
  function send(q) {
    q = String(q || '').trim(); if (!q || busy) return;
    if (intro.parentNode) intro.parentNode.removeChild(intro);
    busy = true; go.disabled = true; input.value = '';
    bubble('q').textContent = q;
    state.msgs.push({ t: 'q', text: q }); reset.hidden = false; save();
    var wait = bubble('a pending'); wait.textContent = 'Searching the report…';
    var history = [];
    for (var i = 0; i < state.msgs.length - 2; i++) {
      var m1 = state.msgs[i], m2 = state.msgs[i + 1];
      if (m1.t === 'q' && m2 && m2.t === 'a' && m2.data && m2.data.answer) history.push({ q: m1.text, a: m2.data.answer });
    }
    history = history.slice(-2);
    fetch(ENDPOINT, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ question: q, history: history }) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, status: r.status, j: j }; }); })
      .then(function (res) {
        if (res.status === 503 || res.status >= 500 || res.status === 429 || (!res.ok && !res.j.error)) return fallback(wait, q, res.status === 429 ? 'hour' : (res.j.reason === 'quota' ? 'day' : 'down'));
        wait.className = 'ask-msg a'; wait.textContent = '';
        if (!res.ok || res.j.error) { wait.textContent = res.j.error || 'Something went wrong. Please try again.'; state.msgs.push({ t: 'e', text: wait.textContent }); save(); return; }
        renderAnswer(wait, res.j);
        state.msgs.push({ t: 'a', data: { answer: res.j.answer, sources: res.j.sources || [] } });
        if (state.msgs.length > 40) state.msgs = state.msgs.slice(-40);
        save();
      })
      .catch(function () { return fallback(wait, q, 'down'); })
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
