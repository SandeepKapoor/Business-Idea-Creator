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

if (fails.length) {
  console.log(`  FAIL  ${fails.length} of ${pass + fails.length} layout checks\n`);
  fails.forEach((f) => console.log(`    ✕ ${f}`));
  console.log('');
  process.exit(1);
}
console.log(`  ${pass} layout checks passed\n`);
