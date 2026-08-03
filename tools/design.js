#!/usr/bin/env node
/* ---------- tools/design.js — mechanical design scan ----------
   The impeccable skill routes a revamp through layout.md / typeset.md / craft-floor.md, each of
   which pairs a human assessment with `detect.mjs --json --scope <x>`. That script is not
   installed here (it wants PRODUCT.md and DESIGN.md scaffolding this project does not have), so
   this is the equivalent, written against craft-floor's actual rules and this project's tokens.

   It checks the BUILT artifact, so it sees the same CSS the browser does.

   What it can prove:            arbitrary values, banned devices, contrast, missing states.
   What it cannot prove:         hierarchy, rhythm, whether the thing is any good.
   craft-floor says as much: "A clean scan cannot prove hierarchy or rhythm."

   Run: node tools/design.js           summary + failures
        node tools/design.js --all     every occurrence */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'sandeep-idea-map.html'), 'utf8');
const css = (html.match(/<style>([\s\S]*?)<\/style>/) || [])[1] || '';
const js = html.slice(html.indexOf('<script>') + 8, html.lastIndexOf('</script>'));
const body = html.slice(html.indexOf('</style>'));

const ALL = process.argv.includes('--all');
let fails = 0, passes = 0;
const out = [];

function check(name, bad, note) {
  const list = [...new Set(bad)];
  if (!list.length) { passes++; out.push(`  ok    ${name}`); return; }
  fails++;
  out.push(`  FAIL  ${name} — ${list.length} occurrence${list.length > 1 ? 's' : ''}`);
  if (note) out.push(`        ${note}`);
  (ALL ? list : list.slice(0, 6)).forEach((x) => out.push(`          ${x}`));
  if (!ALL && list.length > 6) out.push(`          … +${list.length - 6} more (--all)`);
}

/* ---------- 1. the scales ----------
   layout.md: "Use a documented spacing scale rather than one-off values."
   typeset.md: "Is there a deliberate role scale, or a collection of arbitrary values?" */
const declared = (re) => [...css.matchAll(re)].map((m) => m[0]);

const SPACE_OK = new Set([0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 120]);
const spaceBad = [];
for (const m of css.matchAll(/(?:^|[;{\s])(?:margin|padding|gap|top|bottom|left|right)(?:-(?:top|right|bottom|left))?\s*:\s*([^;}]+)/g)) {
  for (const tok of m[1].split(/\s+/)) {
    const px = /^(-?\d+(?:\.\d+)?)px$/.exec(tok.trim());
    if (px && !SPACE_OK.has(Math.abs(+px[1]))) spaceBad.push(`${tok} in "${m[0].trim().slice(0, 54)}"`);
  }
}
check('spacing uses the 4-unit scale', spaceBad,
  'off-scale px values; layout.md wants a documented scale, not one-off nudges');

const TYPE_OK = new Set([10, 11, 12, 13, 15, 16, 18, 21, 26, 32, 40]);
const typeBad = [...css.matchAll(/font-size\s*:\s*(\d+(?:\.\d+)?)px/g)]
  .filter((m) => !TYPE_OK.has(+m[1])).map((m) => m[0]);
check('type sizes come from the role scale', typeBad,
  'half-pixel sizes are nudging, not a scale — operate.md wants a fixed ramp at ~1.15');

const RAD_OK = new Set([0, 2, 3, 4, 6, 10, 14, 999]);
const radBad = [...css.matchAll(/border-radius\s*:\s*([^;}]+)/g)]
  .flatMap((m) => m[1].split(/[\s/]+/).map((t) => t.trim()))
  .filter((t) => /^\d+(\.\d+)?px$/.test(t) && !RAD_OK.has(parseFloat(t)));
check('radii come from the radius scale', radBad);

/* ---------- 2. craft-floor's named refusals ---------- */
const borderBad = [...css.matchAll(/border-(?:left|right)\s*:\s*(\d+(?:\.\d+)?)px\s+solid\s+([^;}]+)/g)]
  .filter((m) => parseFloat(m[1]) > 1)
  .map((m) => m[0].trim());
check('no colored border-left/right above 1px', borderBad,
  'craft-floor names this device explicitly: "on cards, list items, callouts, or alerts"');

/* Glyphs standing in for an icon system. Excludes ₹ (currency), × (multiplication in "6 × 7"),
   — – ' " … (punctuation) and ° ± % which are notation, not iconography. */
// The first version of this list missed ⚙ ⚖ ◐ 📄 entirely — they were in the header the whole
// time and the scan reported clean. Now it covers the emoji planes wholesale.
//
// Two deliberate exclusions, both because the character is CONTENT here, not an icon:
//   →  prose and data ("consumer → enterprise", "EU → India Talent Bridge", axis labels)
//   ←  appears only inside the ASCII tree diagram in 12-position, which is a drawing
// And comments are stripped first — the second version of this scan reported ten failures that
// were all inside the comment in 00-icons.html explaining which glyphs had been removed.
const GLYPHS = /[⚡⟳▶▼◀▲►◄★☆✓✔✕✖✗↑↓ⓘℹ●○◆◇■□▸▾▴◂⌄⌃»«↻⇄✦✧⚙⚖◐◑☀☾☽]|[\u{1F300}-\u{1FAFF}]/gu;
const decomment = (s) => s
  .replace(/<!--[\s\S]*?-->/g, ' ')
  .replace(/\/\*[\s\S]*?\*\//g, ' ')
  .replace(/^[ \t]*\/\/.*$/gm, ' ')
  .replace(/<pre[\s\S]*?<\/pre>/gi, ' ');
const glyphHits = [];
for (const src of [decomment(js), decomment(body)]) {
  for (const m of src.matchAll(GLYPHS)) {
    const at = Math.max(0, m.index - 34);
    glyphHits.push(`${m[0]}  …${src.slice(at, m.index + 26).replace(/\s+/g, ' ')}…`);
  }
}
check('no unicode glyphs standing in for icons', glyphHits,
  'craft-floor: "Icons are drawn, from a real library or authored SVG, in one consistent stroke"');

/* A <use href="#i-typo"> renders absolutely nothing and throws no error, so a misspelled icon
   name is invisible until someone notices a missing glyph. Both directions matter: a dangling
   reference is a hole in the UI, an unused symbol is dead weight in a self-contained file. */
{
  const defined = new Set([...html.matchAll(/<symbol id="(i-[\w-]+)"/g)].map((m) => m[1]));
  // Names reach icon() dynamically too — rules() stores "check" / "x" / "alert" as data and the
  // renderer calls icon(f.ic), and icon(seg.v?'check':'alert') is a ternary. A regex on the call
  // site missed both. So: every quoted literal in the script that happens to name a symbol
  // counts as a use. That over-approximates, but only toward "do not report unused", which is
  // the harmless direction — the dangling-reference check above is the one that must be exact.
  // TWO SETS, and mixing them up is what the first version did — it fed the loose literal match
  // into the dangling check and reported 437 failures, every one of them an ordinary string.
  //   refs      what the page definitely asks for. Must all resolve. Exact.
  //   maybeRefs refs plus any quoted literal that happens to name a symbol, because names reach
  //             icon() dynamically: rules() stores "check"/"x"/"alert" as data for icon(f.ic),
  //             and icon(seg.v?'check':'alert') is a ternary. Only ever used to SUPPRESS an
  //             unused-symbol report, never to raise a dangling one.
  const refs = new Set([...html.matchAll(/<use href="#(i-[\w-]+)"/g)].map((m) => m[1]));
  const maybeRefs = new Set([...refs,
    ...[...js.matchAll(/['"`]([\w-]{1,20})['"`]/g)].map((m) => 'i-' + m[1])]);
  check('every icon reference resolves to a symbol',
    [...refs].filter((u) => !defined.has(u)).map((u) => `${u} is used but never defined`),
    'a dangling <use> renders nothing and reports nothing');
  check('every defined symbol is used',
    [...defined].filter((d) => !maybeRefs.has(d)).map((d) => `${d} is defined but never used`),
    'dead weight in a file that ships as one document');
}

/* ---------- table geometry ----------
   The three score tables are declared in three places — the heatmap in 08, Part 7 and Part 7b in
   19 — and all three must agree with the colgroup scols() emits. When they disagreed, the header
   row and the body rows laid out in different horizontal bands and nothing reported it. These
   tables only exist after render, so this boots the artifact rather than reading the source. */
{
  const bad = [];
  try {
    const vm2 = require('vm');
    const store = {};
    const El = (id) => ({ id, value: '250000', innerHTML: '', textContent: '', dataset: {}, style: {},
      classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
      children: [], childNodes: [], hidden: false, scrollIntoView() {}, appendChild() {},
      insertBefore() {}, setAttribute() {}, addEventListener() {}, querySelector() { return null; },
      querySelectorAll() { return []; }, closest() { return null; }, getAttribute() { return ''; } });
    const doc = { documentElement: { dataset: { theme: 'dark' } },
      getElementById(id) { return store[id] || (store[id] = El(id)); },
      querySelectorAll() { return []; }, querySelector() { return null; },
      createElement(t) { return El(t); }, body: El('b'), addEventListener() {} };
    const sb = { document: doc, console, location: { hash: '' }, Math, JSON, Date,
      requestAnimationFrame() {}, setTimeout() {}, matchMedia() { return { matches: false, addEventListener() {} }; } };
    sb.window = sb; sb.globalThis = sb;
    vm2.createContext(sb);
    vm2.runInContext(`${js}
;globalThis.__t={renderVars,buildVars,premFor,drawHeat,
  set AXSv(v){AXS=v},set VARSv(v){VARS=v},set VIDXv(v){VIDX=v},set PREMSv(v){PREMS=v},
  set PIDXv(v){PIDX=v},set VIv(v){VI=v},set PIv(v){PI=v},set ORIGINv(v){ORIGIN=v}};`,
      sb, { timeout: 60000 });
    const T = sb.__t;
    const [w, o, h, p] = [2, 8, 5, 4];
    const PS = T.premFor(h, o);
    T.PREMSv = PS; T.AXSv = [w, o, h, p]; T.ORIGINv = null; T.VIv = false; T.PIv = false; T.PIDXv = 0;
    const V = T.buildVars(w, o, h, p, PS[0]); T.VARSv = V; T.VIDXv = 0;
    T.renderVars(1); T.drawHeat();
    const blob = Object.values(store).map((e) => e.innerHTML).join('\n');
    const tables = [...blob.matchAll(/<table class="stab">([\s\S]*?)<\/table>/g)];
    if (!tables.length) bad.push('no <table class="stab"> rendered at all');
    tables.forEach((t, i) => {
      const b = t[1];
      const cols = (b.match(/<col\b/g) || []).length;
      const ths = (b.match(/<th\b/g) || []).length;
      const rows = [...b.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)]
        .map((r) => (r[1].match(/<td\b/g) || []).length).filter((n) => n > 0);
      if (ths !== cols) bad.push(`table ${i + 1}: ${cols} <col> but ${ths} <th>`);
      const off = [...new Set(rows)].filter((n) => n !== cols);
      if (off.length) bad.push(`table ${i + 1}: ${cols} <col> but rows with ${off.join('/')} <td>`);
    });
  } catch (e) { bad.push(`could not render: ${e.message}`); }
  check('every score table\'s colgroup, header and rows agree', bad,
    'a mismatch lays out silently and wrongly — this is how Part 7 broke');
}

check('no gradient text', [...css.matchAll(/background-clip\s*:\s*text|-webkit-text-fill-color/g)].map((m) => m[0]));
check('no zero-blur block shadows', [...css.matchAll(/box-shadow\s*:\s*[^;}]*?\d+px\s+\d+px\s+0(?:px)?\s/g)].map((m) => m[0].trim()));

/* craft-floor: "shadows carry an offset and a soft blur". A shadow with no offset is a halo. */
const haloBad = [...css.matchAll(/box-shadow\s*:\s*([^;}]+)/g)]
  .filter((m) => !/inset/.test(m[1]) && /(^|[\s,])0\s+0\s+\d/.test(m[1]))
  .map((m) => m[0].trim());
check('shadows have an offset, not just a blur halo', haloBad);

/* ---------- 3. states ----------
   operate.md: "Every interactive component has: default, hover, focus, active, disabled." */
const selectorsWith = (re) => new Set([...css.matchAll(re)].map((m) => m[1]));
const cls = (s) => [...s].map((x) => x.replace(/[:.].*$/, '')).filter(Boolean);
const hoverOn = new Set(cls(selectorsWith(/([.\w-]+)\s*:hover/g)));
const focusOn = new Set(cls(selectorsWith(/([.\w-]+)\s*:focus-visible/g)));
const INTERACTIVE = ['.themebtn', '.rollbtn', '.vpill', '.vbtn', '.foldall', '.sfold', '.chip',
  '.nav a', '.nearlist a', '.opt', '.wtab', '.tab'];
const blanket = /:where\([^)]*button[^)]*\):focus-visible|^\s*:focus-visible/m.test(css);
const noFocus = blanket ? [] : INTERACTIVE.filter((s) => {
  const k = s.split(' ').pop().replace(/^\./, '');
  return !focusOn.has(k) && css.includes(s);
}).map((s) => `${s} has no :focus-visible`);
check('every interactive control has a visible focus ring', noFocus,
  'keyboard users get no indication of position');

check('native focus outline is not suppressed',
  [...css.matchAll(/outline\s*:\s*(?:none|0)(?![^;}]*focus-visible)/g)].map((m) => m[0]));

/* ---------- 4. contrast ---------- */
const hex = (h) => { const s = h.replace('#', ''); const n = s.length === 3
  ? s.split('').map((c) => c + c).join('') : s;
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16)); };
const lum = (rgb) => { const [r, g, b] = rgb.map((v) => { const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const [x, y] = [lum(hex(a)), lum(hex(b))].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05); };

function tokens(scope) {
  const block = css.slice(css.indexOf(scope));
  const end = block.indexOf('}');
  const t = {};
  for (const m of block.slice(0, end).matchAll(/(--[\w-]+)\s*:\s*(#[0-9a-f]{3,8})/gi)) t[m[1]] = m[2];
  return t;
}
const contrastBad = [];
for (const [scope, label] of [[':root{', 'dark'], ['html[data-theme="light"]{', 'light']]) {
  const t = tokens(scope);
  const surfaces = ['--plane', '--surface-1', '--raise'].filter((k) => t[k]);
  for (const ink of ['--ink-1', '--ink-2', '--ink-3']) {
    if (!t[ink]) continue;
    for (const s of surfaces) {
      const r = ratio(t[ink], t[s]);
      if (r < 4.5) contrastBad.push(`${label}: ${ink} on ${s} = ${r.toFixed(2)}:1`);
    }
  }
}
check('every ink/surface pair clears WCAG AA 4.5:1', contrastBad,
  'craft-floor: "body and placeholder text >= 4.5:1"');

/* ---------- 5. measure ---------- */
const proseNoMeasure = [];
for (const sel of ['.ilead', '.ibox', '.ipitch']) {
  const rule = new RegExp(`\\${sel}\\s*\\{[^}]*\\}`).exec(css);
  if (rule && !/max-width/.test(rule[0])) proseNoMeasure.push(`${sel} has no max-width`);
}
check('prose blocks cap their measure', proseNoMeasure);

/* ---------- 6. motion ---------- */
const noReducedMotion = /prefers-reduced-motion/.test(css) ? [] : ['no prefers-reduced-motion block'];
check('motion respects prefers-reduced-motion', noReducedMotion);

console.log(`\n${'='.repeat(72)}\nDESIGN SCAN — craft-floor mechanics\n${'='.repeat(72)}`);
console.log(out.join('\n'));
console.log(`\n  ${passes} passed, ${fails} failed\n`);
process.exitCode = fails ? 1 : 0;
