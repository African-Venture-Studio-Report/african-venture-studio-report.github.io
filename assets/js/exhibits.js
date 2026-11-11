/* Exhibit data for the African Venture Studio Report 2026. Transcribed from the final PDF (November 2026); aggregated figures only.
   Funding data: Africa: The Big Deal, January 2019 to September 2026, used with permission. */
var EX = {};
// Exhibits 1 to 17. Values transcribed from the final PDF (11 Nov 2026). Aggregates only.
// Colour keys: P dark purple, L lavender, LL light lavender, T tint, G gold, GL light gold, M slate, Gy grey
EX[1] = { type: 'stackbar',
  top: '124 companies (27%) with a recorded external round', topSpan: 124,
  segments: [
    { v: 70, label: '70', below: 'Two or more external rounds', c: 'P' },
    { v: 54, label: '54', below: 'Exactly one external round', c: 'L' },
    { v: 332, label: '332 companies (73%) with no recorded external round', c: 'T', dark: true }
  ],
  bottom: 'All 456 companies in the 49 disclosed portfolios, funded or not' };

EX[2] = { type: 'flow', steps: [
    { k: '1 Studio builds', t: 'Studio owns a stake', d: 'Held at cost, with no outside price' },
    { k: '2 First external round', t: 'Outside capital arrives', d: '73% of portfolio companies (332 of 456) have not reached this step', hi: true },
    { k: '3 Reference value', t: 'A priced round values the stake', d: 'No shares sold, no cash returned yet' },
    { k: '4 Exit or share sale', t: 'The value is realised', d: 'Cash returns to the studio and its investors' } ],
  loop: 'Proceeds fund the next build' };

EX[3] = { type: 'vbars', max: 50, panels: [
    { title: 'Development finance institutions’ share of commitments to Africa-focused venture funds', sub: 'Africa',
      bars: [ { l: '2022 to 2024', v: 45, d: 'about 45%', c: 'G' }, { l: '2025', v: 27, d: '27%', c: 'M' } ] },
    { title: 'Private equity distributions as a share of assets under management', sub: 'Global',
      bars: [ { l: '2015 to 2019 average', v: 16, d: '16%', c: 'G' }, { l: 'Year to June 2025', v: 6, d: '6%', c: 'M' } ] } ] };

EX[5] = { type: 'funnel', steps: [
    { l: 'Organisations assessed', v: 89, c: 'L', drop: '12 operate a different model' },
    { l: 'Candidate studios', v: 77, c: 'L', drop: '9 held out after review' },
    { l: 'Verified studios', v: 68, c: 'P', drop: '19 disclose no portfolio' },
    { l: 'Studios disclosing a portfolio', v: 49, c: 'P', inside: '456 portfolio companies' } ] };

EX[6] = { type: 'map', legendTitle: 'Studios per country',
  bins: [ { min: 1, max: 1, c: 'T', l: '1' }, { min: 2, max: 3, c: 'LL', l: '2 to 3' }, { min: 4, max: 10, c: 'L', l: '4 to 10' }, { min: 11, max: 99, c: 'P', l: '11 or more' } ],
  rows: [ ['Nigeria', 16, 'NGA'], ['South Africa', 13, 'ZAF'], ['Kenya', 11, 'KEN'], ['Egypt', 7, 'EGY'], ['Ethiopia', 3, 'ETH'], ['Ghana', 3, 'GHA'],
    ['Côte d’Ivoire', 2, 'CIV'], ['Morocco', 2, 'MAR'], ['Tanzania', 2, 'TZA'], ['Tunisia', 2, 'TUN'], ['Angola', 1, 'AGO'], ['Rwanda', 1, 'RWA'],
    ['Senegal', 1, 'SEN'], ['Sudan', 1, 'SDN'], ['Uganda', 1, 'UGA'], ['Zimbabwe', 1, 'ZWE'], ['Remote studio', 1, null] ],
  bracket: { rows: 3, text: '40 of 68', sub: 'Studios are domiciled in these three countries' } };

EX[7] = { type: 'waterfall', max: 68, steps: [
    { l: 'Named in Briter’s publications', v: 48, kind: 'total', c: 'G' },
    { l: 'Reclassified on review', v: -1, c: 'Gy' },
    { l: 'Too recently established', v: -1, c: 'Gy' },
    { l: 'Not yet assessed', sub: 'Summit Directory only', v: -5, c: 'Gy' },
    { l: 'Retained in our sample', v: 41, kind: 'total', c: 'G' },
    { l: 'Added by this study', v: 27, kind: 'add', parts: [ { l: 'West 12', v: 12, c: 'P' }, { l: 'East 7', v: 7, c: 'L' }, { l: 'North 4', v: 4, c: 'L2' }, { l: 'Southern 4', v: 4, c: 'LL' } ], d: '+27' },
    { l: 'Verified sample', v: 68, kind: 'total', parts: [ { l: 'Retained 41', v: 41, c: 'G' }, { l: 'Added 27', v: 27, c: 'P' } ] } ] };

EX[8] = { type: 'hbars', max: 100, suffix: '%', ref: { v: 72, l: 'Average 72%' }, groups: [
    { h: 'By directory listing', rows: [ { l: 'In published directories (n = 41)', v: 73 }, { l: 'Added by this study (n = 27)', v: 70 } ] },
    { h: 'By structure', rows: [ { l: 'Single entity studios (n = 38)', v: 74 }, { l: 'With their own funds (n = 10)', v: 70 } ] },
    { h: 'By region', rows: [ { l: 'West Africa (n = 22)', v: 73 }, { l: 'East Africa (n = 19)', v: 74 }, { l: 'Southern Africa (n = 15)', v: 87 }, { l: 'North Africa (n = 11)', v: 55, c: 'P', bold: true } ] } ],
  defaultC: 'LL' };

EX[9] = { type: 'units', groups: [
    { h: 'Studios and portfolios', units: [
      { n: '68', t: 'Studios', d: 'Organisations that meet the conditions in Exhibit 4', u: 'Geography, structure and studio-level comparisons' },
      { n: '456', t: 'Companies', d: 'Each company in the 49 disclosed portfolios, counted once', u: 'Headline funding rate, round funnel and comparison with other startups' },
      { n: '464', t: 'Portfolio entries', d: 'Counted once per listing studio, so eight companies count twice', u: 'Group comparisons by structure, region and Briter listing' } ] },
    { h: 'Funding outcomes', units: [
      { n: '124', t: 'Funded companies', d: 'Companies with an external round, forming 132 entries', u: 'Follow-on progression, first cheque, dormancy and sectors' },
      { n: '316', t: 'External rounds', d: 'Rounds raised, 303 of them naming an outside investor', u: 'Capital raised, round stage and round size' } ] },
    { h: 'Investor activity', units: [
      { n: '906', t: 'Investor participations', d: 'Each named investor counted once per round', u: 'Investor origin at each round stage' },
      { n: '451', t: 'Named investors', d: 'Each distinct investor, counted once', u: 'Who invests, and how often' } ] } ] };

EX[10] = { type: 'hpanels', panels: [
    { title: 'Studios', sub: '68 verified studios', max: 72, rows: [
      { l: 'Single entity studios', v: 38, d: '38', s: '(56%)' }, { l: 'Studios with their own funds', v: 10, d: '10', s: '(15%)', c: 'P', bold: true },
      { l: 'Hybrid', v: 9, d: '9', s: '(13%)' }, { l: 'Unclassified', v: 7, d: '7', s: '(10%)' }, { l: 'Corporate embedded', v: 2, d: '2', s: '(3%)' },
      { l: 'Donor backed', v: 1, d: '1', s: '(1%)' }, { l: 'Studio with a sidecar fund', v: 1, d: '1', s: '(1%)' } ] },
    { title: 'Funded portfolio entries', sub: '132 entries with an external round', max: 72, rows: [
      { l: 'Single entity studios', v: 35, d: '35', s: '(27%)' }, { l: 'Studios with their own funds', v: 72, d: '72', s: '(55%)', c: 'P', bold: true },
      { l: 'Hybrid', v: 8, d: '8', s: '(6%)' }, { l: 'Unclassified', v: 4, d: '4', s: '(3%)' }, { l: 'Corporate embedded', v: 6, d: '6', s: '(5%)' },
      { l: 'Donor backed', v: 0, d: '0', s: '(0%)' }, { l: 'Studio with a sidecar fund', v: 7, d: '7', s: '(5%)' } ] } ],
  defaultC: 'LL', shareLabels: true };

EX[11] = { type: 'columns', max: 456, bars: [
    { l: 'Portfolio companies', v: 456, d: '456', c: 'LL' },
    { l: 'One or more external rounds', v: 124, d: '124', s: '27%', c: 'P' },
    { l: 'Two or more', v: 70, d: '70', s: '56%', c: 'P' },
    { l: 'Three or more', v: 45, d: '45', s: '64%', c: 'P' },
    { l: 'Four or more', v: 28, d: '28', s: '62%', c: 'P' } ] };

EX[12] = { type: 'hbars', max: 35, suffix: '%', decimals: 1, groups: [ { rows: [
    { l: 'Reported rule: rounds not funded by the studio alone', v: 27.2, x: '124 of 456', c: 'P' },
    { l: 'Rounds funded only by the studio counted as external', v: 28.9, x: '132 of 456' },
    { l: 'Rounds with the studio and unnamed angels counted as external', v: 27.4, x: '125 of 456' },
    { l: 'Unverified company match accepted', v: 27.4, x: '125 of 456' },
    { l: 'Two investors linked to one studio treated as the studio', v: 26.3, x: '120 of 456' } ] } ],
  defaultC: 'L' };

EX[13] = { type: 'grouped', max: 55, suffix: '%',
  series: [ { l: 'Briter, FMO-hosted edition, in-house studio companies', c: 'G' }, { l: 'Briter, second edition of the same figure, in-house studio companies', c: 'GL' }, { l: 'This study, all 456 disclosed portfolio companies', c: 'P' } ],
  cats: [ { l: 'First round after studio support', v: [40, 49, 27.2], d: ['40%', '49%', '27.2%'], side: ['12.8 lower', '21.8 lower'] },
    { l: 'Second round', v: [22, 28, 15.4], d: ['22%', '28%', '15.4%'], side: ['6.6 lower', '12.6 lower'] },
    { l: 'Third round', v: [9, 14, 9.9], d: ['9%', '14%', '9.9%'], side: ['0.9 higher', '4.1 lower'] } ],
  sideHead: 'Difference from Briter, percentage points', sideCols: ['FMO edition', 'Second edition'] };

EX[14] = { type: 'spec', max: 60, outsideLabel: 'Startups outside studios', studioLabel: 'Studio companies',
  rows: [
    { l: 'Base: region and first round year', n: '80 vs 1,612', o: 28, s: 48, gap: '+20', or: '2.21 (1.39 to 3.52)', sig: true },
    { l: 'Also stratified by sector', n: '80 vs 1,612', o: 28, s: 48, gap: '+20', or: '2.02 (1.24 to 3.31)', sig: true },
    { l: 'Grant, pre-seed or seed first rounds', n: '45 vs 745', o: 29, s: 49, gap: '+20', or: '2.41 (1.29 to 4.52)', sig: true },
    { l: 'Launched 2019 or later', n: '56 vs 958', o: 28, s: 48, gap: '+20', or: '2.19 (1.24 to 3.87)', sig: true },
    { l: 'Without the largest portfolio', n: '59 vs 1,612', o: 28, s: 39, gap: '+11', or: '1.60 (0.93 to 2.77)', sig: false } ] };

EX[15] = { type: 'hbars', max: 100, suffix: '%', groups: [ { rows: [
    { l: 'Studios with their own funds', v: 69, x: 'n = 39', c: 'P' },
    { l: 'All studio companies', v: 48, x: 'n = 80', c: 'G' },
    { l: 'All studio companies excluding the largest portfolio', v: 39, x: 'n = 59', c: 'L' },
    { l: 'Single entity studios', v: 29, x: 'n = 24', c: 'LL' },
    { l: 'Startups outside studios', v: 28, x: 'n = 1,612', c: 'M' } ] } ] };

EX[16] = { type: 'line', max: 75, ticks: [0, 25, 50, 75], suffix: '%',
  points: [ { x: 0, l: '0', v: 0 }, { x: 12, l: '12 (n = 117)', v: 29 }, { x: 24, l: '24 (n = 102)', v: 50 }, { x: 36, l: '36 (n = 88)', v: 64 } ],
  xmax: 48, xTitle: 'Months after the first external round',
  annot: 'Median months, first to second round, 13. Median years, launch to first round, 2 (n = 78)' };

EX[17] = { type: 'hbars', max: 100, suffix: '%', groups: [ { rows: [
    { l: 'All funded studio companies', v: 52, x: '(124 companies)', c: 'M' },
    { l: 'Studios with their own funds', v: 43, x: '(67 companies)', c: 'P' },
    { l: 'Single entity studios', v: 60, x: '(35 companies)', c: 'M' } ] } ] };

// Exhibits 18 to 27
EX[18] = { type: 'hbars', max: 14, suffix: '%', decimals: 1, groups: [ { rows: [
    { l: 'Funded companies', v: 4.9, c: 'L' }, { l: 'Funding rounds', v: 7.1, c: 'L' }, { l: 'Capital raised', v: 10.9, c: 'G' } ] } ] };

EX[19] = { type: 'hbars', max: 1200, noValue: true, groups: [ { rows: [
    { l: 'Grants', v: 12, x: '$12 million (0.5%), 37 rounds', c: 'O' },
    { l: 'Pre-seed', v: 32, x: '$32 million (1.3%), 40 rounds', c: 'L' },
    { l: 'Seed', v: 136, x: '$136 million (5.6%), 50 rounds', c: 'L' },
    { l: 'Pre-Series A to pre-Series B', v: 369, x: '$369 million (15%), 27 rounds', c: 'P' },
    { l: 'Series B and later', v: 1130, x: '$1.13 billion (46%), 13 rounds', c: 'P' },
    { l: 'Equity, stage not recorded', v: 264, x: '$264 million (11%), 100 rounds', c: 'LL' },
    { l: 'Debt', v: 502, x: '$502 million (21%), 49 rounds', c: 'G' } ] } ] };

EX[20] = { type: 'hbars', max: 100, suffix: '%', groups: [ { rows: [
    { l: 'Logistics and transport', v: 90, x: '(10 funded companies)', c: 'P' },
    { l: 'Agriculture and food', v: 67, x: '(12 funded companies)', c: 'P' },
    { l: 'Fintech', v: 62, x: '(37 funded companies)', c: 'P' },
    { l: 'Education and jobs', v: 58, x: '(12 funded companies)', c: 'L' },
    { l: 'Energy and water', v: 47, x: '(15 funded companies)', c: 'L' },
    { l: 'Services', v: 36, x: '(11 funded companies)', c: 'L' },
    { l: 'Healthcare', v: 31, x: '(13 funded companies)', c: 'M' } ] } ] };

EX[21] = { type: 'hpanels', panels: [
    { title: 'By regional cluster', max: 60, suffix: '%', rows: [
      { l: 'West Africa', v: 38, x: '(149)', c: 'P' }, { l: 'Southern Africa', v: 26, x: '(108)', c: 'L' },
      { l: 'East Africa', v: 25, x: '(160)', c: 'L' }, { l: 'North Africa', v: 17, x: '(47)', c: 'M' } ] },
    { title: 'By country, ten or more entries', max: 60, suffix: '%', rows: [
      { l: 'Côte d’Ivoire', v: 54, x: '(13)', c: 'P' }, { l: 'Nigeria', v: 37, x: '(110)', c: 'P' }, { l: 'Kenya', v: 30, x: '(134)', c: 'P' },
      { l: 'South Africa', v: 27, x: '(103)', c: 'L' }, { l: 'Egypt', v: 24, x: '(33)', c: 'L' }, { l: 'Ghana', v: 22, x: '(18)', c: 'L' },
      { l: 'Uganda', v: 0, x: '(13)', c: 'L' }, { l: 'Tunisia', v: 0, x: '(10)', c: 'L' } ] } ] };

EX[22] = { type: 'combo', left: { title: 'All 906 named participations, by investor HQ', max: 45, suffix: '%', decimals: 1, rows: [
      { l: 'North America', v: 37.4, c: 'M' }, { l: 'Africa', v: 31.1, c: 'P', bold: true }, { l: 'Europe', v: 22.3, c: 'L' }, { l: 'Other or unknown', v: 9.2, c: 'LL' } ] },
  right: { title: 'African-headquartered share, by stage', max: 64, suffix: '%', bars: [
      { l: 'Pre-seed', n: 'n 148', v: 59, c: 'P' }, { l: 'Seed', n: 'n 224', v: 30, c: 'P' }, { l: 'Pre-Series A', n: 'n 28', v: 46, c: 'P' },
      { l: 'Series A', n: 'n 126', v: 23, c: 'L' }, { l: 'Series B', n: 'n 56', v: 9, c: 'M' }, { l: 'Series C and later', n: 'n 25', v: 4, c: 'M' } ] } };

EX[23] = { type: 'split', max: 8, title: 'Companies backed in a first round', sub: 'Number of companies, by investor type',
  keys: [ { l: 'Went on to raise again', c: 'P' }, { l: 'No later round yet', c: 'T' } ],
  groups: [
    { h: 'Early-stage venture funds', rows: [ ['Kepple Africa Ventures', 'Japan', 6, 8], ['Launch Africa', 'Mauritius', 5, 8], ['Future Africa', 'Nigeria', 5, 7], ['LoftyInc Capital', 'Nigeria', 5, 6], ['Zedcrest Capital', 'Nigeria', 4, 5], ['Saviu Ventures', 'France', 2, 5], ['Microtraction', 'Nigeria', 4, 4] ] },
    { h: 'Accelerators', rows: [ ['Y Combinator', 'United States', 6, 7], ['Techstars', 'United States', 3, 4] ] },
    { h: 'Studio vehicles', rows: [ ['A studio vehicle', '', 3, 7], ['A studio fund', '', 2, 5] ] },
    { h: 'Development agency', rows: [ ['GIZ', 'Germany', 2, 4] ] } ] };

// Stage mix: counts of rounds [pre-seed or seed, Series A or later, no stage label]; note replaces bar where the report shows text
EX[24] = { type: 'investors',
  cols: [ { h: 'Studio company rounds', s: 'Number of rounds joined', max: 20 }, { h: 'Stage of those rounds', s: 'Share by stage label' }, { h: 'Studio share of all deals', s: 'Share of its deals across Africa', max: 75 } ],
  keys: [ { l: 'Pre-seed or seed', c: 'P2' }, { l: 'Series A or later', c: 'M' }, { l: 'No stage label', c: 'T' } ],
  rows: [
    ['Y Combinator', 'US', 19, [7, 5, 7], 14, '37%'], ['Launch Africa', 'Mauritius', 13, [2, 3, 8], 6.6, ''], ['DEG', 'Germany', 11, 'Mainly grants', 6.8],
    ['LoftyInc Capital', 'Nigeria', 10, [9, 1, 0], 10, '90%'], ['Kepple Africa Ventures', 'Japan', 10, [8, 1, 1], 13, '80%'], ['Techstars', 'US', 9, [2, 0, 7], 5.9, '22%'],
    ['GIZ', 'Germany', 9, 'Mainly grants', 13], ['Future Africa', 'Nigeria', 9, [6, 0, 3], 12, '67%'], ['Ventures Platform', 'Nigeria', 8, [6, 1, 1], 14, '75%'],
    ['54 Collective (closed 2025)', 'UK', 8, [7, 0, 1], 9.2, '88%'], ['Renew Capital', 'Ethiopia', 7, [3, 2, 2], 18, '43%'], ['Lendahand', 'Netherlands', 7, 'Mainly debt', 27],
    ['Studio vehicle A', '', 7, 'Withheld', 70, '', true], ['Studio vehicle B', '', 7, 'Withheld', 64, '', true], ['Saviu Ventures', 'France', 7, [5, 2, 0], 26, '71%'] ] };

EX[25] = { type: 'stackrows', keys: [ { l: 'Lead published', c: 'P' }, { l: 'Two or more investors, no lead published', c: 'T' }, { l: 'Single named investor', c: 'Gy2' } ],
  max: 77, rows: [ { l: 'Below $1 million', s: '77 first rounds', v: [5, 25, 47] }, { l: '$1 million or more', s: '47 first rounds', v: [18, 21, 8] } ],
  foot: 'Only 23 of 124 first rounds have a published lead, and 18 of those 23 are rounds of $1 million or more. No investor is named as lead in more than two first rounds.' };

EX[26] = { type: 'heat', cols: ['West Africa', 'East Africa', 'Southern Africa', 'North Africa'],
  head: [ { l: 'Funding rate of portfolio entries', v: ['38%', '25%', '26%', '17%'], strong: true }, { l: 'Studios and funded companies', v: ['22 studios, 54 funded companies', '19 studios, 36 funded companies', '15 studios, 26 funded companies', '11 studios, 8 funded companies'] } ],
  bins: [ { min: 1, max: 2, c: 'T' }, { min: 3, max: 4, c: 'LL' }, { min: 5, max: 6, c: 'L' }, { min: 7, max: 99, c: 'P' } ],
  binLabels: ['1 to 2', '3 to 4', '5 to 6', '7 or more'], legendTitle: 'Studio companies backed:',
  groups: [
    { h: 'Most frequent in West Africa (six or more)', rows: [ ['Y Combinator', 'United States', [11, 0, 1, 0]], ['Kepple Africa Ventures', 'Japan', [7, 2, 0, 0]], ['LoftyInc Capital', 'Nigeria', [7, 0, 1, 0]], ['A studio vehicle', '', [7, 0, 0, 0]], ['Future Africa', 'Nigeria', [6, 3, 0, 0]], ['Launch Africa', 'Mauritius', [6, 1, 4, 1], true], ['Techstars', 'United States', [6, 1, 1, 0]] ] },
    { h: 'Most frequent in East Africa (four or more)', rows: [ ['A studio vehicle', '', [0, 7, 0, 0]], ['A studio fund', '', [0, 6, 0, 0]], ['DEG', 'Germany', [1, 5, 1, 0]], ['British International Investment', 'UK', [1, 4, 0, 0]], ['Equator VC', 'Kenya', [0, 4, 0, 0]] ] },
    { h: 'Most frequent in Southern Africa (three or more)', rows: [ ['A corporate studio', '', [0, 0, 4, 0]], ['E Squared Investments', 'South Africa', [0, 0, 3, 0]], ['GIZ', 'Germany', [4, 0, 3, 0]], ['Invenfin', 'South Africa', [0, 0, 3, 0]], ['A studio', '', [0, 0, 3, 0]] ] },
    { h: 'Most frequent in North Africa (three or more)', rows: [ ['Ed Ventures', 'Egypt', [0, 0, 0, 3]] ] } ],
  foot: { l: 'Investor mix', v: ['US accelerators, the Lagos seed network and a studio co-investment model in Côte d’Ivoire', 'Studio funds and development finance', 'Local venture capital, corporate and studio capital', 'Thin and domestic'] } };

EX[27] = { type: 'hbars', max: 50, title: 'Other named investors sharing a round', groups: [ { rows: [
    { l: 'LoftyInc Capital', v: 48, c: 'P', bold: true }, { l: 'Kepple Africa Ventures', v: 48, c: 'P', bold: true }, { l: 'Launch Africa', v: 44 }, { l: 'DFS Lab', v: 41 },
    { l: 'Y Combinator', v: 40 }, { l: 'Ingressive Capital', v: 36 }, { l: 'Greycroft Partners', v: 34 }, { l: 'Future Africa', v: 34 }, { l: 'Endeavor', v: 34 } ] } ],
  defaultC: 'LL' };

// Exhibits 28 to 42. Exhibits not listed here are rendered from the report's own Word tables.
EX[28] = { type: 'pairs', max: 4, cols: ['Earlier round', 'Later round', 'Companies with both investors'],
  groups: [
    { h: 'Local seed funds to US accelerators and global investors (Nigeria)', rows: [ ['Ventures Platform', 'Y Combinator', 3], ['Kepple Africa Ventures', 'Y Combinator', 2], ['Y Combinator', 'Tencent', 3], ['Google for Startups Black Founders Fund', 'Plug and Play', 3] ] },
    { h: 'Studio package to European development finance (Côte d’Ivoire)', rows: [ ['Studio vehicle', 'Digital Africa', 3], ['Studio vehicle', 'GIZ', 2], ['Saviu Ventures', 'Digital Africa', 2], ['Saviu Ventures', 'GIZ', 2] ] },
    { h: 'Development finance to impact investors (Kenya and Nigeria)', rows: [ ['DEG', 'Renew Capital', 3], ['Renew Capital', 'DEG', 2] ] },
    { h: 'Repeat co-investment in the same round', cols: ['Investor', 'Co-investor'], same: true, rows: [ ['Studio vehicle', 'Saviu Ventures', 4], ['Studio vehicle', 'Ring Capital', 3], ['LoftyInc Capital', 'Zedcrest Capital', 3] ] } ] };

EX[29] = { type: 'hbars', max: 60, title: 'Companies with at least one external round, % of portfolio', groups: [ { rows: [
    { l: 'Studios with their own funds', v: 52, d: '52%', x: 'n = 138', c: 'P', bold: true },
    { l: 'Excluding the largest portfolio', v: 45, d: '45%', x: 'n = 91', c: 'P3', muted: true },
    { l: 'Corporate embedded', v: 40, d: '40%', x: 'n = 15', c: 'LL' },
    { l: 'All portfolio entries', v: 28.4, d: '28.4%', x: 'n = 464', c: 'Gy' },
    { l: 'Hybrid', v: 17, d: '17%', x: 'n = 47', c: 'LL' },
    { l: 'Single entity studios', v: 17, d: '17%', x: 'n = 209', c: 'M', bold: true },
    { l: 'Unclassified', v: 11, d: '11%', x: 'n = 35', c: 'LL' },
    { l: 'Donor backed', v: 0, d: '0%', x: 'n = 11', c: 'LL' } ] } ] };

EX[30] = { type: 'hbars', max: 4.6, groups: [ { rows: [
    { l: 'Studios with their own funds', v: 4.19, d: '$4.19 million', c: 'P' },
    { l: 'Single entity studios', v: 1.05, d: '$1.05 million', c: 'M' } ] } ] };

EX[32] = { type: 'hbars', max: 45, groups: [ { rows: [
    { l: '41 studios in published directories', v: 34, d: '34%', x: 'n = 341', c: 'P' },
    { l: '27 studios added by this study', v: 13, d: '13%', x: 'n = 123', c: 'M' } ] } ] };

EX[36] = { type: 'taper' };

// "Evidence at a glance" charts (executive summary pages 9 and 10)
EX.g1 = { type: 'hbars', max: 456, groups: [ { rows: [
    { l: 'Companies in disclosed portfolios', v: 456, c: 'LL' }, { l: 'One or more external rounds', v: 124, c: 'P' },
    { l: 'Two or more rounds', v: 70, c: 'P' }, { l: 'Three or more rounds', v: 45, c: 'P' }, { l: 'Four or more rounds', v: 28, c: 'P' } ] } ] };
EX.g2 = { type: 'hbars', max: 100, suffix: '%', groups: [ { rows: [
    { l: 'Studios with their own funds', v: 69, x: '(n = 39)', c: 'P' }, { l: 'All studio companies', v: 48, x: '(n = 80)', c: 'P' },
    { l: 'Single entity studios', v: 29, x: '(n = 24)', c: 'L' }, { l: 'Startups outside studios', v: 28, x: '(n = 1,612)', c: 'M' } ] } ] };
EX.g3 = { type: 'glance3', max: 64, title: 'African investors’ share of named participations (%)',
  stats: [ { v: '71%', l: 'First round investors who backed only one first round (222 in all)' }, { v: '42%', l: '75 of the 179 later rounds that can be compared include an investor from an earlier round' } ],
  bars: [ { l: 'Pre-seed', n: 'n = 148', v: 59, d: '59%', c: 'P' }, { l: 'Seed', n: 'n = 224', v: 30, d: '30%', c: 'P' }, { l: 'Pre-Series A', n: 'n = 28', v: 46, d: '46%', c: 'P' },
    { l: 'Series A', n: 'n = 126', v: 23, d: '23%', c: 'L' }, { l: 'Series B', n: 'n = 56', v: 9, d: '9%', c: 'L' }, { l: 'Series C+', n: 'n = 25', v: 4, d: '4%', c: 'L' } ] };
EX.g4 = { type: 'hbars', max: 100, suffix: '%', groups: [
    { h: '04 Studios with their own funds against single entity studios', rows: [ { l: 'Studios with their own funds', v: 52, c: 'P' }, { l: 'Single entity studios', v: 17, c: 'L' } ] },
    { h: '05 Studios in published directories against studios added by this study', rows: [ { l: 'In published directories', v: 34, c: 'P' }, { l: 'Added by this study', v: 13, c: 'L' } ] } ] };
EX.g5 = { type: 'range', max: 100, rows: [
    { l: 'Published findings', lo: 72, hi: 72, d: '72%', c: 'G' }, { l: 'African studio companies', lo: 7, hi: 17, d: '7% to 17%', c: 'P' }, { l: 'Other African startups', lo: 9, hi: 17, d: '9% to 17%', c: 'M' } ] };

