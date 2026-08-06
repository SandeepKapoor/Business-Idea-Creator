#!/usr/bin/env node
/*
 * tools/probe.js — measure the REAL layout in a real browser.
 *
 * WHY THIS EXISTS. Two layout bugs shipped that no other harness could see: Part 7's header row
 * sitting in a different horizontal band from its body, and the score cells collapsing to the
 * width of a numeral. verify.js proves the engine is correct, design.js proves the CSS obeys the
 * scales, picker.js proves the controls behave — and every one of them passed while the page
 * looked broken. None of them lays anything out. This does.
 *
 * Zero dependencies, in keeping with the rest of the project: it drives whatever Chrome is
 * already installed via --headless --dump-dom, having appended a measuring script to a COPY of
 * the artifact. The script writes its findings into a <pre>, which comes back in the dumped DOM.
 * No CDP client, no puppeteer, nothing to install.
 *
 *   node tools/probe.js               assert the layout invariants
 *   node tools/probe.js --report      print every measurement
 *   node tools/probe.js --shot out.png  also save a screenshot
 *   node tools/probe.js --width 1280  viewport width (default 1280)
 */

'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const ARTIFACT = path.join(ROOT, 'sandeep-idea-map.html');

const argv = process.argv.slice(2);
const opt = (f, d) => { const i = argv.indexOf(f); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };
const REPORT = argv.includes('--report');
const WIDTH = +opt('--width', 1280);
const SHOT = opt('--shot', null);

const CHROMES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  path.join(os.homedir(), '.cache/puppeteer/chrome'),
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
];
function findChrome() {
  for (const c of CHROMES) {
    if (!fs.existsSync(c)) continue;
    if (fs.statSync(c).isFile()) return c;
    /* the puppeteer cache, whose nesting varies by version — walk for the binary */
    for (const v of fs.readdirSync(c)) {
      const hits = [];
      (function walk(d, depth) {
        if (depth > 5) return;
        for (const e of fs.readdirSync(d, { withFileTypes: true })) {
          const p = path.join(d, e.name);
          if (e.isDirectory()) walk(p, depth + 1);
          else if (/^(Google Chrome for Testing|chrome|chrome-headless-shell)$/.test(e.name)) hits.push(p);
        }
      })(path.join(c, v), 0);
      if (hits.length) return hits[0];
    }
  }
  return null;
}

/* Injected into the copy. Runs after the artifact has booted, drives it into the state we care
   about, then measures. Everything it reports is a real used value from getBoundingClientRect,
   not a declared one. */
const PROBE = `
<script>
(function(){
  function rect(el){const r=el.getBoundingClientRect();
    return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)};}

  /* Column geometry of one table: where every header cell sits, and where the first body row's
     cells sit. If a header cell and the body cell beneath it do not share an x and a width, the
     table is not laying out as a grid — which is exactly the bug this file was written for. */
  function table(el,name){
    const ths=[...el.querySelectorAll('thead th')];
    const tds=[...(el.querySelector('tbody tr')||el).querySelectorAll('td')];
    const cols=[...el.querySelectorAll('col')];
    const cells=[...el.querySelectorAll('tbody .cell')].slice(0,8).map(rect);
    var tr=el.querySelector('tbody tr'), tb=el.querySelector('tbody');
    var cs=function(n){return n?getComputedStyle(n).display:'-';};
    var chain=[]; for(var n=tr; n && n!==document.body; n=n.parentNode)
      chain.push(n.nodeName.toLowerCase()+(n.className?'.'+String(n.className).split(' ')[0]:'')
        +'['+cs(n)+']');
    return {name, cols:cols.length, layout:getComputedStyle(el).tableLayout,
      diag:{table:cs(el), tbody:cs(tb), tr:cs(tr), td:cs(tds[0]),
            sameTable: tr && tr.closest('table')===el,
            colParent: cols[0] ? cols[0].parentNode.nodeName : '-',
            colgroupParent: cols[0] ? cols[0].parentNode.parentNode.nodeName : '-',
            firstChild: el.firstElementChild ? el.firstElementChild.nodeName : '-',
            kids: [...el.children].map(function(c){return c.nodeName;}).join(','),
            chain: chain.join(' < ')},
      width:Math.round(el.getBoundingClientRect().width),
      scrollW:Math.round(el.scrollWidth),
      th:ths.map(rect), td:tds.map(rect), cell:cells,
      /* Content that spills past its own cell. table-layout:fixed does not clip, so a badge
         wider than its column silently overlaps the next one. */
      spill:[...(el.querySelector('tbody tr')||el).querySelectorAll('td')].map(function(td){
        var t=td.getBoundingClientRect(), k=td.firstElementChild;
        if(!k)return 0; var r=k.getBoundingClientRect();
        return Math.round(Math.max(0, r.right-t.right, t.left-r.left));}),
      wrapper: el.closest('.tscroll') ? rect(el.closest('.tscroll')) : null};
  }

  var out={ok:true,err:null,tables:[],notes:[]};
  try{
    mode('custom');
    pickMode('axes');
    gen(1);
    document.querySelectorAll('#cOut .fold.shut').forEach(function(f){setFold(f,true);});
    [...document.querySelectorAll('#cOut table.stab')].forEach(function(t,i){
      out.tables.push(table(t,'cOut stab '+(i+1)));
    });
    var hs=document.querySelector('.heatscroll table.stab');
    if(hs){ mode('report'); openFold('score',1);
      out.tables.push(table(hs,'heatmap')); }

    /* The frontier is the only panel built entirely from prose blocks and a grid, with no table
       to anchor it. What can go wrong there is different: something wider than the viewport, or
       the four-cell grid collapsing to one column on a screen wide enough for two. Both are
       invisible to every other harness, and both are measurable. */
    mode('frontier');
    var vwF=document.documentElement.clientWidth;
    out.fr={vw:vwF, cards:document.querySelectorAll('#frontier article.fr').length, over:[], grids:[]};
    document.querySelectorAll('#frontier *').forEach(function(el){
      var r=el.getBoundingClientRect();
      if(r.right>vwF+1||r.width>vwF+1)
        out.fr.over.push((el.tagName+'.'+String(el.className||'').split(' ')[0]).toLowerCase()
          +' w='+Math.round(r.width));});
    /* The entries fold shut on load now, so their four-cell grid has no layout to measure until
       one is open — a collapsed grid reports one column and the check read that as a regression.
       Open the first entry, measure it, and put it back, so this measures the thing it is about
       (does the 2x2 hold at this width) rather than the thing it is not (is the fold working).
       Only the first: ten opens is ten reflows to answer a question about one grid. */
    out.fr.shut=document.querySelectorAll('#frontier article.fr.shut').length;
    out.fr.rows=document.querySelectorAll('#frontier .frt tbody tr').length;
    /* Visible words with everything folded — the same budget the analyser is held to, because
       the frontier had the same disease: ten entries, all open, six thousand pixels of scroll. */
    var facc=[];
    document.querySelectorAll('#frontier *').forEach(function(el){
      if(!el.getClientRects().length)return;
      [...el.childNodes].forEach(function(n){if(n.nodeType===3)facc.push(n.nodeValue);});});
    out.fr.words=facc.join(' ').replace(/\s+/g,' ').trim().split(' ').filter(Boolean).length;
    var first=document.querySelector('#frontier article.fr');
    var wasShut=first&&first.classList.contains('shut');
    if(wasShut)setFold(first,true);
    document.querySelectorAll('#frontier .frgrid').forEach(function(g){
      if(!g.getClientRects().length)return;       /* still folded — nothing to measure */
      var kids=[...g.children].map(function(k){return Math.round(k.getBoundingClientRect().x);});
      out.fr.grids.push(new Set(kids).size);});   /* distinct x positions = column count */
    if(wasShut)setFold(first,false);

    /* The analyser's default view is the measurement that matters: it shipped once as 2,849 words
       on one screen. Count what is actually visible with everything folded, and assert the cards
       start shut — a card that renders open by accident silently restores the wall of text. */
    mode('bma');
    var bs=document.getElementById('bma');
    if(bs){
      var visible=function(el){var st=getComputedStyle(el);
        return st.display!=='none'&&st.visibility!=='hidden';};
      var acc=[]; (function walk(n){ for(var c of n.childNodes){
        if(c.nodeType===3)acc.push(c.textContent);
        else if(c.nodeType===1&&visible(c))walk(c);}})(bs);
      out.bma={words:acc.join(' ').replace(/\s+/g,' ').trim().split(' ').filter(Boolean).length,
        cards:bs.querySelectorAll('article.bm').length,
        shut:bs.querySelectorAll('article.bm.fold.shut').length,
        rows:bs.querySelectorAll('table.bmt tbody tr').length,
        over:[]};
      var vwB=document.documentElement.clientWidth;
      bs.querySelectorAll('#bma *').forEach(function(el){
        var r=el.getBoundingClientRect();
        if(r.right>vwB+1||r.width>vwB+1)
          out.bma.over.push((el.tagName+'.'+String(el.className||'').split(' ')[0]).toLowerCase());});
    }

    /* ---------- touch targets and routing ----------
       Two things nothing else on the page can see. A control's tapped height is a rendered
       measurement, not a CSS value — padding, line-height and the icon all feed it — so the only
       honest way to check 44px is to measure it at a phone width in a real engine. And the mode
       hash is behaviour: it either switches the tab or it does not. */
    out.touch=[];
    mode('report');
    [['.nav a','section rail item'],['.tab','mode tab'],['.themebtn','theme switch'],
     ['.foldall','expand all']].forEach(function(pair){
      var e=document.querySelector(pair[0]); if(!e)return;
      var r=e.getBoundingClientRect();
      out.touch.push({what:pair[1],h:Math.round(r.height),w:Math.round(r.width)});});

    /* Set the hash, fire the event the way a pasted URL would, and see where the tabs land. */
    location.hash='#bma';
    dispatchEvent(new HashChangeEvent('hashchange'));
    out.route={afterHash:document.getElementById('tabB').classList.contains('on'),
               hashAfterSwitch:(mode('frontier'),location.hash)};
    location.hash='';

    out.vw=innerWidth;
    /* Leave the page where a screenshot is worth taking: the workspace, scrolled to Part 7.
       The measurement pass has to visit the report for the heatmap, so without this the shot
       would show whatever the last measurement happened to leave on screen. */
    mode('custom');
    var p7=[...document.querySelectorAll('#cOut h3')].find(function(h){
      return /Part 7 /.test(h.textContent);});
    if(p7)p7.scrollIntoView();
  }catch(e){ out.ok=false; out.err=e.message+' @ '+(e.stack||'').split('\\n')[1]; }

  var pre=document.createElement('pre');
  pre.id='PROBE';
  pre.textContent='<<<'+JSON.stringify(out)+'>>>';
  document.body.appendChild(pre);
})();
</script>
`;

const chrome = findChrome();
if (!chrome) {
  console.error('\n  no Chrome/Chromium found — probe skipped (not a failure)\n');
  process.exit(0);
}
if (!fs.existsSync(ARTIFACT)) { console.error('run npm run build first'); process.exit(1); }

const tmp = path.join(os.tmpdir(), 'probe-' + process.pid + '.html');
fs.writeFileSync(tmp, fs.readFileSync(ARTIFACT, 'utf8').replace('</body>', PROBE + '</body>'));

const args = ['--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
  `--window-size=${WIDTH},2400`, '--virtual-time-budget=4000', '--dump-dom', 'file://' + tmp];
let dom = '';
try { dom = execFileSync(chrome, args, { encoding: 'utf8', maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'] }); }
catch (e) { console.error('  chrome failed: ' + e.message); process.exit(1); }

if (SHOT) {
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-sandbox',
    `--window-size=${WIDTH},2400`, '--virtual-time-budget=4000',
    `--screenshot=${path.resolve(SHOT)}`, 'file://' + tmp], { stdio: 'ignore' });
  console.log(`  screenshot -> ${SHOT}`);
}
fs.unlinkSync(tmp);

// Scope to the <pre>, not to the marker: the injected <script> is itself in the dumped DOM, so
// a bare marker search finds the source line that BUILDS the marker before it finds the output.
const m = dom.match(/<pre id="PROBE">([\s\S]*?)<\/pre>/);
if (!m) { console.error('  probe did not run — no <pre id="PROBE"> in the dumped DOM'); process.exit(1); }
const raw = m[1].replace(/^&lt;&lt;&lt;|&gt;&gt;&gt;$/g, '')
  .replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const R = JSON.parse(raw);
if (!R.ok) { console.error(`  probe threw: ${R.err}`); process.exit(1); }

let pass = 0; const fails = [];
const ok = (n, c, d) => { if (c) { pass++; return; } fails.push(d ? `${n} — ${d}` : n); };

console.log(`\n  measured in Chrome at ${R.vw}px, ${R.tables.length} score tables\n`);

for (const t of R.tables) {
  const tag = t.name;
  ok(`${tag}: table-layout is fixed`, t.layout === 'fixed', `got ${t.layout}`);
  /* THE ROOT CAUSE, stated directly. A CSS class shared between a <div> and a <tr> — .vrow was
     both the navigator's flex row and the score tables' clickable row — silently reassigns the
     table row's display and it stops participating in the column model. Everything downstream
     (headers detached, cells collapsed) is a symptom of these two lines. */
  ok(`${tag}: rows are still table rows`, t.diag.tr === 'table-row',
    `<tr> computes to display:${t.diag.tr} — a class meant for a <div> is matching it`);
  ok(`${tag}: cells are still table cells`, t.diag.td === 'table-cell',
    `<td> computes to display:${t.diag.td}`);
  ok(`${tag}: header and body have the same cell count`, t.th.length === t.td.length,
    `${t.th.length} th vs ${t.td.length} td`);

  /* THE INVARIANT THIS FILE EXISTS FOR. Column n's header must sit directly above column n's
     cell. Two bugs shipped where they did not, and nothing caught either. */
  const off = [];
  for (let i = 0; i < Math.min(t.th.length, t.td.length); i++) {
    const dx = Math.abs(t.th[i].x - t.td[i].x), dw = Math.abs(t.th[i].w - t.td[i].w);
    if (dx > 2 || dw > 2) off.push(`col ${i}: th x=${t.th[i].x} w=${t.th[i].w} vs td x=${t.td[i].x} w=${t.td[i].w}`);
  }
  ok(`${tag}: every header sits above its own column`, off.length === 0, off.slice(0, 3).join(' | '));

  /* The eight criteria are equal in meaning and must be equal in width. */
  if (t.cell.length === 8) {
    const ws = t.cell.map((c) => c.w);
    ok(`${tag}: the eight score cells are equal width`, new Set(ws).size === 1, `widths ${ws.join(',')}`);
    ok(`${tag}: score cells are wide enough to read`, Math.min(...ws) >= 28, `narrowest ${Math.min(...ws)}px`);
  }
  /* A label column squeezed to one word per line is the other half of the same failure. */
  if (t.td.length) ok(`${tag}: the label column is not crushed`, t.td[0].w >= 120, `${t.td[0].w}px`);
  /* Nothing may spill past its scroller. */
  if (t.wrapper) ok(`${tag}: the table fits its scroller or scrolls`, t.width <= t.scrollW + 1);
  const sp = (t.spill || []).map((v, i) => (v > 1 ? `col ${i} by ${v}px` : null)).filter(Boolean);
  ok(`${tag}: no cell content spills past its column`, sp.length === 0, sp.join(', '));

  if (REPORT) {
    console.log(`  ${tag}  layout=${t.layout} width=${t.width} cols=${t.cols}`);
    console.log(`    diag: ${JSON.stringify(t.diag)}`);
    console.log(`    th : ${t.th.map((r) => `${r.x}+${r.w}`).join('  ')}`);
    console.log(`    td : ${t.td.map((r) => `${r.x}+${r.w}`).join('  ')}`);
    if (t.cell.length) console.log(`    cell widths: ${t.cell.map((c) => c.w).join(',')}\n`);
  }
}

/* ---------- the frontier panel ----------
   No table here, so the failures are different ones: something wider than the viewport, or the
   four-cell grid stacking to one column on a screen with room for two. */
if (R.fr) {
  const F = R.fr;
  ok('frontier: every entry rendered', F.cards >= 8, `${F.cards} cards`);
  ok('frontier: one index row per entry', F.rows === F.cards, `${F.rows} rows for ${F.cards} entries`);
  ok('frontier: every entry starts folded shut', F.cards > 0 && F.shut === F.cards,
    `${F.shut} of ${F.cards} shut`);
  /* Ten entries at full length measured ~4,900 visible words and about six thousand pixels of
     scroll. Folded, with the index above them, it is a few hundred. Same 800-word budget as the
     analyser: loose enough for a copy edit, tight enough that an entry re-opening by default
     trips it. */
  ok('frontier: the default view stays under 800 visible words', F.words <= 800, `${F.words} words`);
  ok('frontier: nothing is wider than the viewport', F.over.length === 0, F.over.slice(0, 4).join('; '));
  const cols = [...new Set(F.grids)];
  ok('frontier: every four-cell grid lays out the same way', cols.length <= 1, `column counts: ${cols.join(', ')}`);
  /* Below roughly 700px one column is correct — two 330px cells plus the gap will not fit. */
  const want = F.vw >= 760 ? 2 : 1;
  ok(`frontier: the grid uses ${want} column${want > 1 ? 's' : ''} at ${F.vw}px`,
    cols.length === 0 || cols[0] === want, `got ${cols[0]}`);
  if (REPORT) console.log(`  frontier  vw=${F.vw} cards=${F.cards} gridcols=${cols.join(',')}\n`);
}

/* ---------- the business model analyser ---------- */
if (R.bma) {
  const B = R.bma;
  ok('analyser: one table row per model', B.rows === 10, `${B.rows} rows`);
  ok('analyser: every model card starts folded shut', B.cards > 0 && B.shut === B.cards,
    `${B.shut} of ${B.cards} shut`);
  /* The number that caused the rewrite. The first build put 2,849 words on one screen; unfolding
     everything today still measures ~2,280. Folded it is ~670. The budget is 800 — enough room for
     a copy edit, tight enough that re-expanding a card by default trips it. */
  ok('analyser: the default view stays under 800 visible words', B.words <= 800, `${B.words} words`);
  ok('analyser: nothing is wider than the viewport', B.over.length === 0, B.over.slice(0, 4).join('; '));
  if (REPORT) console.log(`  analyser  words=${B.words} cards=${B.cards} shut=${B.shut}\n`);
}

/* ---------- touch targets ---------- */
if (R.touch && R.touch.length) {
  /* 44px below 720px, where the reader is using a thumb. Above it a pointer is a pixel and a
     26px control is comfortable, so the floor does not apply and would only cost density. */
  const floor = R.vw <= 720 ? 44 : 24;
  const small = R.touch.filter((t) => t.h < floor);
  ok(`controls clear the ${floor}px target floor at ${R.vw}px`, small.length === 0,
    small.map((t) => `${t.what} ${t.h}px`).join('; '));
  if (REPORT) console.log(`  targets   ${R.touch.map((t) => t.what + '=' + t.h).join(' ')}\n`);
}

/* ---------- the tab is addressable ---------- */
if (R.route) {
  ok('a #bma address opens the analyser tab', R.route.afterHash === true);
  ok('switching tabs writes the address', R.route.hashAfterSwitch === '#frontier',
    `got "${R.route.hashAfterSwitch}"`);
}

if (fails.length) {
  console.log(`  FAIL  ${fails.length} of ${pass + fails.length} layout checks\n`);
  fails.forEach((f) => console.log(`    ✕ ${f}`));
  console.log('');
  process.exit(1);
}
console.log(`  ${pass} layout checks passed\n`);
