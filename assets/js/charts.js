/* African Venture Studio Report 2026: exhibit renderer.
   Every figure comes from assets/js/exhibits.js, transcribed from the published PDF. */
(function () {
  'use strict';
  var COL = { P: '#4C1D7D', P2: '#5A2390', P3: '#8A4FC8', L: '#A77BD8', L2: '#8E5FCC', LL: '#C9B6E4', T: '#E6DCF4',
    G: '#D9A227', GL: '#EBCB7A', M: '#786B88', Gy: '#C8C2D0', Gy2: '#A79DB5', O: 'transparent' };
  var DARK = { P: 1, P2: 1, P3: 1, M: 1, L2: 1 };
  function c(k) { return COL[k] || k || COL.L; }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function pct(v, max) { return Math.max(0, Math.min(100, v / max * 100)); }
  function hw(v, max) { return pct(v, max) * 0.8; }
  function fmt(v, ex) {
    var d = ex.decimals != null ? v.toFixed(ex.decimals) : String(v);
    return d + (ex.suffix || '');
  }
  function bar(v, max, col, extra) {
    var outline = col === 'O' ? ';box-shadow: inset 0 0 0 1.5px ' + COL.P : '';
    return '<span class="bar" style="width:' + hw(v, max).toFixed(2) + '%;background:' + c(col) + outline + (extra || '') + '"></span>';
  }
  function keys(list) {
    return '<div class="ex-keys">' + list.map(function (k) {
      return '<span class="ex-key"><i style="background:' + c(k.c) + '"></i>' + esc(k.l) + '</span>';
    }).join('') + '</div>';
  }

  /* Horizontal bar rows: label | bar | value */
  function hrows(rows, ex, def) {
    return rows.map(function (r) {
      var col = r.c || def || ex.defaultC || 'P';
      var val = r.d != null ? r.d : (ex.noValue ? '' : fmt(r.v, ex));
      var title = r.l + ': ' + (val || '') + (r.x ? ' ' + r.x : '');
      return '<div class="hrow' + (r.bold ? ' is-bold' : '') + (r.muted ? ' is-muted' : '') + '" title="' + esc(title) + '">' +
        '<span class="hlabel">' + esc(r.l) + '</span>' +
        '<span class="htrack">' + bar(r.v, ex.max, col) +
        '<span class="hval"><b>' + esc(val) + '</b>' + (r.s ? ' <span class="sub">' + esc(r.s) + '</span>' : '') + (r.x ? ' <span class="sub">' + esc(r.x) + '</span>' : '') + '</span></span></div>';
    }).join('');
  }

  var R = {};

  R.hbars = function (ex) {
    var h = ex.title ? '<p class="ex-axis-title">' + esc(ex.title) + '</p>' : '';
    h += '<div class="hbars' + (ex.ref ? ' has-ref' : '') + '"' + (ex.ref ? ' style="--ref:' + hw(ex.ref.v, ex.max) + '%"' : '') + '>';
    ex.groups.forEach(function (g) {
      if (g.h) h += '<p class="ex-group">' + esc(g.h) + '</p>';
      h += hrows(g.rows, ex);
    });
    if (ex.ref) h += '<div class="ref-wrap"><span class="hlabel"></span><span class="htrack"><span class="ref" style="left:' + pct(ex.ref.v, ex.max) + '%"><span>' + esc(ex.ref.l) + '</span></span></span></div>';
    return h + '</div>';
  };

  R.hpanels = function (ex) {
    return '<div class="panels">' + ex.panels.map(function (p) {
      var e = { max: p.max, suffix: p.suffix, decimals: p.decimals, defaultC: ex.defaultC };
      return '<div class="panel"><p class="ex-panel-title">' + esc(p.title) + '</p>' + (p.sub ? '<p class="ex-panel-sub">' + esc(p.sub) + '</p>' : '') +
        '<div class="hbars compact">' + hrows(p.rows, e) + '</div></div>';
    }).join('') + '</div>';
  };

  function vcols(bars, max, opts) {
    opts = opts || {};
    return '<div class="vcols">' + bars.map(function (b) {
      return '<div class="vcol" title="' + esc(b.l + ': ' + (b.d || b.v + (opts.suffix || ''))) + '"><span class="vval">' + esc(b.d || (b.v + (opts.suffix || ''))) + '</span>' +
        '<span class="vbar" style="height:' + pct(b.v, max).toFixed(2) + '%;background:' + c(b.c) + '"></span></div>';
    }).join('') + '</div><div class="vlabels">' + bars.map(function (b) {
      return '<div class="vlabel">' + (b.s ? '<b>' + esc(b.s) + '</b>' : '') + (b.n ? '<span class="sub">' + esc(b.n) + '</span>' : '') + '<span>' + esc(b.l) + '</span></div>';
    }).join('') + '</div>';
  }

  R.vbars = function (ex) {
    return '<div class="panels">' + ex.panels.map(function (p) {
      return '<div class="panel"><p class="ex-panel-title">' + esc(p.title) + '</p><p class="ex-panel-sub"><i>' + esc(p.sub) + '</i></p>' + vcols(p.bars, ex.max) + '</div>';
    }).join('') + '</div>';
  };

  R.columns = function (ex) {
    return vcols(ex.bars, ex.max) + (ex.subNote ? '<p class="ex-mini">' + esc(ex.subNote) + '</p>' : '');
  };

  R.stackbar = function (ex) {
    var total = ex.segments.reduce(function (a, s) { return a + s.v; }, 0);
    var h = '<div class="stack-top" style="width:' + pct(ex.topSpan, total) + '%"><span>' + esc(ex.top) + '</span></div>';
    h += '<div class="stackbar">' + ex.segments.map(function (s) {
      return '<span class="seg' + (DARK[s.c] ? ' on-dark' : '') + '" style="flex:' + s.v + ' 1 0;background:' + c(s.c) + '" title="' + esc(s.label) + '">' + esc(s.label) + '</span>';
    }).join('') + '</div>';
    h += '<div class="stack-below">' + ex.segments.map(function (s) {
      return '<span style="flex:' + s.v + ' 1 0">' + esc(s.below || '') + '</span>';
    }).join('') + '</div>';
    return h + '<div class="stack-bottom"><span>' + esc(ex.bottom) + '</span></div>';
  };

  R.flow = function (ex) {
    var h = '<ol class="flow">' + ex.steps.map(function (s) {
      return '<li class="flow-step' + (s.hi ? ' is-hi' : '') + '"><span class="flow-k">' + esc(s.k) + '</span><b>' + esc(s.t) + '</b><span>' + esc(s.d) + '</span></li>';
    }).join('') + '</ol>';
    return h + '<div class="flow-loop"><span>' + esc(ex.loop) + '</span></div>';
  };

  R.funnel = function (ex) {
    var max = ex.steps[0].v;
    return '<div class="funnel">' + ex.steps.map(function (s) {
      return '<div class="fstep"><div class="fcol"><span class="vval big">' + s.v + '</span><span class="vbar" style="--w:' + pct(s.v, max) + '%;height:' + pct(s.v, max) + '%;background:' + c(s.c) + '">' +
        (s.inside ? '<em>' + esc(s.inside) + '</em>' : '') + '</span></div>' + (s.drop ? '<div class="fdrop">' + esc(s.drop) + '</div>' : '') +
        '<div class="flabel">' + esc(s.l) + '</div></div>';
    }).join('') + '</div>';
  };

  var ISO = { NGA: 'Nigeria', ZAF: 'South Africa', KEN: 'Kenya', EGY: 'Egypt', ETH: 'Ethiopia', GHA: 'Ghana', CIV: "Côte d'Ivoire", MAR: 'Morocco', TZA: 'Tanzania', TUN: 'Tunisia', AGO: 'Angola', RWA: 'Rwanda', SEN: 'Senegal', SDN: 'Sudan', UGA: 'Uganda', ZWE: 'Zimbabwe' };
  R.map = function (ex) {
    var by = {}; ex.rows.forEach(function (r) { if (r[2]) by[ISO[r[2]]] = r; });
    function bin(v) { for (var i = 0; i < ex.bins.length; i++) { if (v >= ex.bins[i].min && v <= ex.bins[i].max) return ex.bins[i]; } return null; }
    var paths = (window.AFRICA || []).map(function (f) {
      var r = by[f.n]; var b = r ? bin(r[1]) : null;
      var label = r ? r[0] + ': ' + r[1] + (r[1] === 1 ? ' studio' : ' studios') : f.n;
      return '<path d="' + f.d + '" fill="' + (b ? c(b.c) : '#F1EEF4') + '" class="' + (r ? 'has' : '') + '"><title>' + esc(label) + '</title></path>';
    }).join('');
    var svg = '<svg class="map" viewBox="0 0 460 500" role="img" aria-label="Map of Africa shaded by number of verified studios per country">' + paths + '</svg>';
    var legend = '<div class="map-legend"><span class="sub">' + esc(ex.legendTitle) + '</span>' + ex.bins.map(function (b) {
      return '<span class="ex-key"><i style="background:' + c(b.c) + '"></i>' + esc(b.l) + '</span>';
    }).join('') + '</div>';
    var rows = ex.rows.map(function (r, i) {
      var b = bin(r[1]);
      return { l: r[0], v: r[1], c: r[2] ? b.c : 'Gy', muted: !r[2], top: i < ex.bracket.rows };
    });
    var list = '<div class="hbars compact map-bars">' + hrows(rows, { max: 17 }) +
      '<div class="map-bracket"><b>' + esc(ex.bracket.text) + '</b><span>' + esc(ex.bracket.sub) + '</span></div></div>';
    return '<div class="map-wrap"><div class="map-left">' + svg + legend + '</div><div class="map-right">' + list + '</div></div>';
  };

  R.waterfall = function (ex) {
    var run = 0, cols = [];
    ex.steps.forEach(function (s) {
      var base, hgt, parts;
      if (s.kind === 'total') { base = 0; hgt = s.v; run = s.v; }
      else if (s.kind === 'add') { base = run; hgt = s.v; run += s.v; }
      else { run += s.v; base = run; hgt = -s.v; }
      parts = s.parts || [{ v: hgt, c: s.c }];
      cols.push({ s: s, base: base, hgt: hgt, parts: parts });
    });
    return '<div class="wfall">' + cols.map(function (o) {
      var s = o.s, segs = o.parts.slice().reverse().map(function (p) {
        return '<span class="wseg' + (DARK[p.c] ? ' on-dark' : '') + '" style="flex:' + p.v + ' 1 0;background:' + c(p.c) + '" title="' + esc(p.l || '') + '">' + (p.l && o.parts.length > 1 && s.kind === 'add' ? esc(p.l) : '') + '</span>';
      }).join('');
      var lab = s.d || (s.kind === 'total' ? String(s.v) : String(-s.v));
      return '<div class="wcol" title="' + esc(s.l + ': ' + lab) + '"><div class="wplot"><div class="wstack" style="bottom:' + pct(o.base, ex.max) + '%;height:' + pct(o.hgt, ex.max) + '%">' +
        '<span class="wval' + (s.kind ? '' : ' is-muted') + '">' + esc(lab) + '</span>' + segs + '</div></div><div class="vlabel"><span>' + esc(s.l) + '</span>' + (s.sub ? '<span class="sub">' + esc(s.sub) + '</span>' : '') + '</div></div>';
    }).join('') + '</div>';
  };

  R.units = function (ex) {
    return '<div class="units">' + ex.groups.map(function (g, gi) {
      return '<div class="unit-group g' + gi + '"><p class="ex-group">' + esc(g.h) + '</p><div class="unit-row">' + g.units.map(function (u) {
        return '<div class="unit"><b class="unit-n">' + esc(u.n) + '</b><b class="unit-t">' + esc(u.t) + '</b><span class="unit-d">' + esc(u.d) + '</span><span class="unit-u">' + esc(u.u) + '</span></div>';
      }).join('') + '</div></div>';
    }).join('') + '</div>';
  };

  R.grouped = function (ex) {
    var h = '<div class="grouped">';
    h += '<div class="grouped-head"><span></span><span></span><span class="side-head">' + esc(ex.sideHead) + '<span class="side-cols">' + ex.sideCols.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('') + '</span></span></div>';
    ex.cats.forEach(function (cat) {
      h += '<div class="gcat"><span class="hlabel">' + esc(cat.l) + '</span><span class="gbars">' + cat.v.map(function (v, i) {
        return '<span class="htrack" title="' + esc(ex.series[i].l + ': ' + cat.d[i]) + '">' + bar(v, ex.max, ex.series[i].c) + '<span class="hval"><b>' + esc(cat.d[i]) + '</b></span></span>';
      }).join('') + '</span><span class="side-cols">' + cat.side.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('') + '</span></div>';
    });
    return h + '</div>' + keys(ex.series);
  };

  R.spec = function (ex) {
    var ticks = [0, 20, 40, 60];
    var h = '<div class="spec"><div class="spec-head"><span>Specification (studio vs outside, n)</span><span>Second round within 24 months</span><span>Gap</span><span>Odds ratio (95% CI)</span></div>';
    ex.rows.forEach(function (r, i) {
      var lo = Math.min(r.o, r.s), hi = Math.max(r.o, r.s);
      h += '<button type="button" class="spec-row' + (r.sig ? '' : ' not-sig') + '" aria-pressed="false" data-i="' + i + '">' +
        '<span class="spec-l"><b>' + esc(r.l) + '</b><span class="sub">' + esc(r.n) + '</span></span>' +
        '<span class="spec-track"><span class="spec-line" style="left:' + pct(lo, ex.max) + '%;width:' + (pct(hi, ex.max) - pct(lo, ex.max)) + '%"></span>' +
        '<span class="dot out" style="left:' + pct(r.o, ex.max) + '%"><span>' + r.o + '%</span></span>' +
        '<span class="dot in" style="left:' + pct(r.s, ex.max) + '%"><span>' + r.s + '%</span></span></span>' +
        '<span class="spec-gap">' + esc(r.gap) + '</span><span class="spec-or">' + esc(r.or) + (r.sig ? '' : '<span class="sub">Not significant</span>') + '</span></button>';
    });
    h += '<div class="spec-axis"><span></span><span class="ticks">' + ticks.map(function (t) { return '<span style="left:' + pct(t, ex.max) + '%">' + t + '%</span>'; }).join('') + '</span><span></span><span></span></div></div>';
    h += keys([{ l: ex.outsideLabel, c: 'G' }, { l: ex.studioLabel, c: 'P' }]);
    h += '<p class="spec-verdict" aria-live="polite">Select a specification to read it in full.</p>';
    return h;
  };
  function wireSpec(root, ex) {
    var btns = root.querySelectorAll('.spec-row'), out = root.querySelector('.spec-verdict');
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        var r = ex.rows[+b.dataset.i];
        out.innerHTML = '<b>' + esc(r.l) + '</b> (' + esc(r.n) + ' companies): ' + r.s + '% of studio companies raised a second round within 24 months, against ' + r.o + '% of startups outside studios, a gap of ' + esc(r.gap) + ' points. Odds ratio ' + esc(r.or) + ', ' + (r.sig ? 'statistically significant.' : 'not statistically significant, as the interval includes 1.');
      });
    });
  }

  R.line = function (ex) {
    var W = 640, H = 300, L = 44, B = 40, T = 16, Rt = 16;
    var xs = function (x) { return L + x / ex.xmax * (W - L - Rt); };
    var ys = function (v) { return H - B - v / ex.max * (H - B - T); };
    var g = ex.ticks.map(function (t) { return '<line x1="' + L + '" x2="' + (W - Rt) + '" y1="' + ys(t) + '" y2="' + ys(t) + '" class="grid"/><text x="' + (L - 8) + '" y="' + (ys(t) + 4) + '" class="tick" text-anchor="end">' + t + (t ? ex.suffix : '') + '</text>'; }).join('');
    var pts = ex.points.map(function (p) { return xs(p.x) + ',' + ys(p.v); }).join(' ');
    var last = ex.points[ex.points.length - 1];
    var area = '<polygon points="' + xs(0) + ',' + ys(0) + ' ' + pts + ' ' + xs(last.x) + ',' + ys(0) + '" class="area"/>';
    var dots = ex.points.map(function (p) {
      return '<g><title>' + esc(p.l + ' months: ' + p.v + '%') + '</title>' + (p.v ? '<circle cx="' + xs(p.x) + '" cy="' + ys(p.v) + '" r="6" class="pt"/><text x="' + xs(p.x) + '" y="' + (ys(p.v) - 14) + '" text-anchor="middle" class="lab">' + p.v + '%</text>' : '') +
        '<text x="' + xs(p.x) + '" y="' + (H - B + 18) + '" text-anchor="middle" class="tick">' + esc(p.l) + '</text></g>';
    }).join('');
    var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="linechart" role="img" aria-label="' + esc(ex.xTitle) + '">' + g + area + '<polyline points="' + pts + '" class="ln"/>' +
      '<line x1="' + xs(last.x) + '" x2="' + xs(last.x) + '" y1="' + ys(last.v) + '" y2="' + ys(0) + '" class="vline"/>' + dots +
      '<text x="' + ((L + W - Rt) / 2) + '" y="' + (H - 4) + '" text-anchor="middle" class="axis">' + esc(ex.xTitle) + '</text></svg>';
    return '<div class="line-wrap">' + svg + '<p class="line-note">' + esc(ex.annot) + '</p></div>';
  };

  R.combo = function (ex) {
    var l = ex.left, r = ex.right;
    return '<div class="panels"><div class="panel"><p class="ex-panel-title">' + esc(l.title) + '</p><div class="hbars compact">' + hrows(l.rows, l) + '</div></div>' +
      '<div class="panel"><p class="ex-panel-title">' + esc(r.title) + '</p>' + vcols(r.bars, r.max, { suffix: r.suffix }) + '</div></div>';
  };

  R.split = function (ex) {
    var h = '<p class="ex-axis-title">' + esc(ex.title) + '<span class="sub">' + esc(ex.sub) + '</span></p><div class="hbars">';
    ex.groups.forEach(function (g) {
      h += '<p class="ex-group gold">' + esc(g.h) + '</p>';
      g.rows.forEach(function (r) {
        h += '<div class="hrow" title="' + esc(r[0] + ': ' + r[2] + ' of ' + r[3] + ' went on to raise again') + '"><span class="hlabel">' + esc(r[0]) + (r[1] ? ' <span class="sub">' + esc(r[1]) + '</span>' : '') + '</span>' +
          '<span class="htrack"><span class="bar-split" style="width:' + hw(r[3], ex.max) + '%"><span style="flex:' + r[2] + ' 1 0;background:' + COL.P + '"></span><span style="flex:' + (r[3] - r[2]) + ' 1 0;background:' + COL.T + '"></span></span>' +
          '<span class="hval"><b>' + r[2] + ' of ' + r[3] + '</b></span></span></div>';
      });
    });
    return h + '</div>' + keys(ex.keys);
  };

  R.investors = function (ex) {
    var h = '<p class="scroll-hint">Scroll sideways to see all columns</p><div class="inv"><div class="inv-head"><span></span>' + ex.cols.map(function (col) { return '<span><b>' + esc(col.h) + '</b><span class="sub">' + esc(col.s) + '</span></span>'; }).join('') + '</div>';
    ex.rows.forEach(function (r) {
      var stage = typeof r[3] === 'string' ? '<span class="inv-text">' + esc(r[3]) + '</span>' :
        '<span class="bar-split full">' + r[3].map(function (n, i) {
          var k = ['P2', 'M', 'T'][i];
          return n ? '<span style="flex:' + n + ' 1 0;background:' + c(k) + '" title="' + esc(ex.keys[i].l + ': ' + n + ' of ' + r[2] + ' rounds') + '">' + (i === 0 && r[5] ? '<em>' + esc(r[5]) + '</em>' : '') + '</span>' : '';
        }).join('') + '</span>';
      h += '<div class="inv-row' + (r[6] ? ' is-bold' : '') + '"><span class="hlabel">' + esc(r[0]) + (r[1] ? ' <span class="sub">' + esc(r[1]) + '</span>' : '') + '</span>' +
        '<span class="htrack">' + bar(r[2], ex.cols[0].max, r[6] ? 'P' : 'L') + '<span class="hval"><b>' + r[2] + '</b></span></span>' +
        '<span class="htrack">' + stage + '</span>' +
        '<span class="htrack">' + bar(r[4], ex.cols[2].max, r[6] ? 'P' : 'L') + '<span class="hval"><b>' + r[4] + '%</b></span></span></div>';
    });
    return h + '</div>' + keys(ex.keys);
  };

  R.stackrows = function (ex) {
    var h = keys(ex.keys) + '<div class="srows">';
    ex.rows.forEach(function (r) {
      var tot = r.v.reduce(function (a, b) { return a + b; }, 0);
      h += '<div class="hrow"><span class="hlabel"><b>' + esc(r.l) + '</b><span class="sub">' + esc(r.s) + '</span></span><span class="htrack"><span class="bar-split tall" style="width:' + hw(tot, ex.max) + '%">' +
        r.v.map(function (n, i) { var k = ex.keys[i]; return '<span class="' + (DARK[k.c] ? 'on-dark' : '') + '" style="flex:' + n + ' 1 0;background:' + c(k.c) + '" title="' + esc(k.l + ': ' + n) + '">' + n + '</span>'; }).join('') + '</span></span></div>';
    });
    return h + '</div><p class="ex-mini strong">' + esc(ex.foot) + '</p>';
  };

  R.heat = function (ex) {
    function bin(v) { for (var i = 0; i < ex.bins.length; i++) { if (v >= ex.bins[i].min && v <= ex.bins[i].max) return ex.bins[i]; } return null; }
    var h = '<p class="scroll-hint">Scroll sideways to see all regions</p><div class="table-scroll"><table class="heat"><thead><tr><th scope="col">Investor</th>' + ex.cols.map(function (x) { return '<th scope="col">' + esc(x) + '</th>'; }).join('') + '</tr></thead><tbody>';
    ex.head.forEach(function (r) { h += '<tr class="heat-meta"><th scope="row">' + esc(r.l) + '</th>' + r.v.map(function (v) { return '<td>' + (r.strong ? '<b>' + esc(v) + '</b>' : esc(v)) + '</td>'; }).join('') + '</tr>'; });
    ex.groups.forEach(function (g) {
      h += '<tr class="heat-group"><th colspan="' + (ex.cols.length + 1) + '" scope="rowgroup">' + esc(g.h) + '</th></tr>';
      g.rows.forEach(function (r) {
        h += '<tr><th scope="row"' + (r[3] ? ' class="hl"' : '') + '>' + esc(r[0]) + (r[1] ? ' <span class="sub">' + esc(r[1]) + '</span>' : '') + '</th>' + r[2].map(function (v, i) {
          var b = v ? bin(v) : null;
          return '<td' + (b ? ' style="background:' + c(b.c) + ';color:' + (DARK[b.c] ? '#fff' : '#1B0D2B') + '"' : '') + ' title="' + esc(r[0] + ', ' + ex.cols[i] + ': ' + (v || 'none')) + '">' + (v || '') + '</td>';
        }).join('') + '</tr>';
      });
    });
    h += '<tr class="heat-meta foot"><th scope="row">' + esc(ex.foot.l) + '</th>' + ex.foot.v.map(function (v) { return '<td>' + esc(v) + '</td>'; }).join('') + '</tr></tbody></table></div>';
    return h + '<div class="ex-keys"><span class="sub">' + esc(ex.legendTitle) + '</span>' + ex.bins.map(function (b, i) { return '<span class="ex-key"><i style="background:' + c(b.c) + '"></i>' + esc(ex.binLabels[i]) + '</span>'; }).join('') + '</div>';
  };

  R.pairs = function (ex) {
    var h = '<div class="pairs"><div class="pair-head">' + ex.cols.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join('') + '</div>';
    ex.groups.forEach(function (g) {
      h += '<p class="ex-group plain">' + esc(g.h) + '</p>';
      if (g.cols) h += '<div class="pair-sub"><span>' + esc(g.cols[0]) + '</span><span>' + esc(g.cols[1]) + '</span><span></span></div>';
      g.rows.forEach(function (r) {
        var col = g.same ? 'M' : (r[2] >= 3 ? 'P' : 'LL');
        h += '<div class="pair-row" title="' + esc(r[0] + ' then ' + r[1] + ': ' + r[2] + ' companies') + '"><span>' + esc(r[0]) + '</span><span>' + esc(r[1]) + '</span><span class="htrack">' + bar(r[2], ex.max, col) + '<span class="hval"><b>' + r[2] + '</b></span></span></div>';
      });
    });
    return h + '</div>';
  };

  R.range = function (ex) {
    return '<div class="hbars">' + ex.rows.map(function (r) {
      return '<div class="hrow" title="' + esc(r.l + ': ' + r.d) + '"><span class="hlabel">' + esc(r.l) + '</span><span class="htrack"><span class="bar-split" style="width:' + hw(r.hi, ex.max) + '%">' +
        '<span style="flex:' + r.lo + ' 1 0;background:' + c(r.c) + '"></span>' + (r.hi > r.lo ? '<span style="flex:' + (r.hi - r.lo) + ' 1 0;background:' + c(r.c) + ';opacity:.4"></span>' : '') +
        '</span><span class="hval"><b>' + esc(r.d) + '</b></span></span></div>';
    }).join('') + '</div>';
  };

  R.glance3 = function (ex) {
    return '<div class="glance3"><div class="g3-stats">' + ex.stats.map(function (s) { return '<div class="stat"><b>' + esc(s.v) + '</b><span>' + esc(s.l) + '</span></div>'; }).join('') + '</div>' +
      '<div class="g3-chart"><p class="ex-panel-title">' + esc(ex.title) + '</p>' + vcols(ex.bars, ex.max) + '</div></div>';
  };

  R.taper = function () {
    var W = 680, H = 300, L = 30, Rt = 50, T = 20, B = 40;
    var xs = function (m) { return L + m / 48 * (W - L - Rt); };
    var ys = function (v) { return H - B - v * (H - B - T - 80); };
    var line = [[0, 1], [24, 0.97], [36, 0.45], [40, 0.33], [48, 0.33]];
    var pts = line.map(function (p) { return xs(p[0]) + ',' + ys(p[1]); }).join(' ');
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" class="linechart taper" role="img" aria-label="Schematic of studio support intensity from launch to month 48">' +
      '<polygon points="' + xs(0) + ',' + ys(0) + ' ' + pts + ' ' + xs(48) + ',' + ys(0) + '" class="area2"/>' +
      '<polyline points="' + pts + '" class="ln"/><line x1="' + xs(48) + '" x2="' + (W - 14) + '" y1="' + ys(0.33) + '" y2="' + ys(0.33) + '" class="ln" marker-end="url(#arr)"/>' +
      '<defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#4C1D7D"/></marker></defs>' +
      '<line x1="' + xs(24) + '" x2="' + xs(36) + '" y1="' + ys(0.97) + '" y2="' + ys(0.97) + '" class="dash"/>' +
      '<line x1="' + xs(24) + '" x2="' + xs(24) + '" y1="' + 6 + '" y2="' + ys(0) + '" class="vdash"/><line x1="' + xs(36) + '" x2="' + xs(36) + '" y1="' + (ys(0.97) - 14) + '" y2="' + ys(0) + '" class="vdash"/>' +
      '<text x="' + (xs(24) + 8) + '" y="18" class="tick">Review at month 24 for extension</text>' +
      '<text x="' + (xs(24) + 8) + '" y="' + (ys(0.97) - 6) + '" class="tick it">If extended, to month 36</text>' +
      '<text x="' + xs(0) + '" y="' + (ys(1) - 8) + '" class="tick">Intensity of studio support (schematic)</text>' +
      '<text x="' + (xs(0) + 14) + '" y="' + (ys(0.75)) + '" class="lab">Deep, bespoke support</text><text x="' + (xs(0) + 14) + '" y="' + (ys(0.75) + 20) + '" class="lab">24 to 36 months</text>' +
      '<text x="' + (W - 14) + '" y="' + (ys(0.72)) + '" text-anchor="end" class="lab sm">Continued involvement until exit,</text><text x="' + (W - 14) + '" y="' + (ys(0.72) + 18) + '" text-anchor="end" class="lab sm">no graduation date</text>' +
      [['Launch', 0], ['12 months', 12], ['24', 24], ['36', 36], ['48', 48]].map(function (t) { return '<text x="' + xs(t[1]) + '" y="' + (H - B + 20) + '" text-anchor="middle" class="tick">' + t[0] + '</text>'; }).join('') +
      '</svg><p class="line-note">From year three, the studio stops producing materials for the company and helps it reach investors using the company’s own.</p>';
  };

  function render(fig) {
    var n = fig.getAttribute('data-ex'), ex = (window.EX || {})[n], host = fig.querySelector('.ex-chart');
    if (!ex || !host || !R[ex.type]) return;
    host.innerHTML = R[ex.type](ex);
    host.classList.add('t-' + ex.type);
    if (ex.type === 'spec') wireSpec(host, ex);
  }
  function init() { document.querySelectorAll('figure.exhibit[data-ex]').forEach(render); }
  window.AVSR = { render: render, R: R, COL: COL };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
