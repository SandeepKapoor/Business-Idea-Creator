#!/usr/bin/env node
/* ---------- tools/plain.js — find the sentences a reader will stumble on ----------
   Renders the builder for a real combination and scores every sentence it puts on screen.
   The point is to stop guessing which copy is hard. Eyeballing finds the sentence you happen
   to reread; this finds the ones that are measurably worse than their neighbours.

   The score is deliberately crude and deliberately transparent:
     length   words in the sentence. Past ~24 a reader loses the start before reaching the end.
     hard     words from HARD below — abstract nouns and business register that carry no picture.
     clause   commas, semicolons and dashes. Each one is a place the sentence changes direction.

   It is not a reading-age formula. Flesch-Kincaid rewards short words, which would push this
   copy toward clipped fragments rather than plain sentences. What matters here is whether one
   sentence holds one idea, so that is what gets counted.

   Run: node tools/plain.js            worst 25 sentences
        node tools/plain.js --all      every sentence over threshold
        node tools/plain.js --stats    distribution only, for before/after comparison */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'sandeep-idea-map.html'), 'utf8');
const script = html.slice(html.indexOf('<script>') + 8, html.lastIndexOf('</script>'));

/* Abstract or Latinate words that make a sentence work harder than it needs to. Each one has a
   plainer everyday twin. This list is the editorial judgement in this tool; the counting is not. */
const HARD = `magnitude magnitudes defensible defensibility syndication commoditised commoditises
 arbitrage provenance epistemic archetype archetypes instantiate derivative indifference
 unforgiving canonical adjacent acquisition constraint constraints proprietary precedent
 characterisation characterise illustrative illustration illustrations conventional
 established territory transfers transferable orthogonal dimension dimensions structural
 substantive incumbent aggregate aggregated inherently intrinsically consequently
 accordingly notwithstanding thereby whereby herein therein albeit
 leverage utilise utilize facilitate optimise optimize methodology paradigm
 ceiling threshold trajectory ecosystem infrastructure scalability granular
 heuristic mechanism mechanic mechanics artefact premise premises
 forecast forecasts comparison comparisons distribution attribution
 quartile percentile calibrated calibration measured unmeasured
 standing seniority credibility legitimacy plausible plausibility
 stipulate presuppose predicate contingent requisite`.split(/\s+/).filter(Boolean);
const HARDSET = new Set(HARD);

const store = {};
const El = (id) => ({ id, value: '250000', innerHTML: '', textContent: '', dataset: {}, style: {},
  classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
  children: [], childNodes: [], hidden: false,
  scrollIntoView() {}, appendChild() {}, insertBefore() {}, setAttribute() {}, addEventListener() {},
  querySelector() { return null; }, querySelectorAll() { return []; }, closest() { return null; },
  getAttribute() { return ''; } });
const doc = { documentElement: { dataset: { theme: 'dark' } },
  getElementById(id) { return store[id] || (store[id] = El(id)); },
  querySelectorAll() { return []; }, querySelector() { return null; },
  createElement(t) { return El(t); }, body: El('body'), addEventListener() {} };
const sb = { document: doc, console, location: { hash: '' }, Math, JSON, Date,
  requestAnimationFrame() {}, setTimeout() {}, matchMedia() { return { matches: false, addEventListener() {} }; } };
sb.window = sb; sb.globalThis = sb;
vm.createContext(sb);
vm.runInContext(`${script}
;globalThis.__api={renderVars,buildVars,premFor,PREM,AX,
  set AXSv(v){AXS=v},set VARSv(v){VARS=v},set VIDXv(v){VIDX=v},set PREMSv(v){PREMS=v},
  set PIDXv(v){PIDX=v},set VIv(v){VI=v},set PIv(v){PI=v},set ORIGINv(v){ORIGIN=v}};`,
sb, { timeout: 120000 });
const A = sb.__api;

/* A handful of combinations rather than one, so a bad sentence that only appears for, say, a
   recurring payer or a filtered format is not missed. Both explainers open. */
const COMBOS = [[2, 8, 5, 4], [0, 0, 0, 0], [10, 12, 9, 3], [17, 15, 6, 9], [5, 12, 19, 14]];
const seen = new Map();   // sentence -> {score, len, hard, clause, where}

/* Block boundaries break the text BEFORE tags are stripped. Without this a seven-row table
   collapses into one 122-word "sentence" with 26 commas and dominates the whole ranking —
   which is a measurement artefact, not hard prose. Table cells are labels; they are scored as
   the separate short fragments they actually are, and mostly fall under the 5-word floor. */
const BLOCK = /<\/(p|div|li|td|th|tr|h[1-6]|table|thead|tbody|span|b|em|section|details|summary)\s*>/gi;
const clean = (s) => s
  .replace(/<(script|style|svg)[\s\S]*?<\/\1>/g, ' ')
  .replace(/<br\s*\/?>/gi, '\n')
  .replace(BLOCK, '\n')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&ldquo;|&rdquo;/g, '"').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
  .replace(/&mdash;/g, '—').replace(/&[a-z]+;/g, ' ')
  .split('\n').map((l) => l.replace(/[ \t]+/g, ' ').trim()).filter(Boolean).join('\n');

/* Split each block into sentences. Decimals, ₹1,50,000, "#6." and "1:1" must not split. */
const sentences = (t) => t.split('\n')
  .flatMap((line) => line.split(/(?<=[.?!])\s+(?=[A-Z"“(₹])/g))
  .map((s) => s.trim()).filter((s) => s.split(' ').length >= 5);

function score(s) {
  const words = s.replace(/[^A-Za-z\s-]/g, ' ').split(/\s+/).filter(Boolean);
  const len = words.length;
  const hard = words.filter((w) => HARDSET.has(w.toLowerCase())).length;
  const clause = (s.match(/[,;—]|\s-\s/g) || []).length;
  return { len, hard, clause, score: len + hard * 8 + Math.max(0, clause - 1) * 4 };
}

for (const [w, o, h, p] of COMBOS) {
  const PS = A.premFor(h, o);
  A.PREMSv = PS; A.AXSv = [w, o, h, p]; A.ORIGINv = null;
  for (let pi = 0; pi < PS.length; pi++) {
    A.PIDXv = pi;
    const V = A.buildVars(w, o, h, p, PS[pi]);
    A.VARSv = V;
    for (let vi = 0; vi < V.length; vi++) {
      A.VIDXv = vi; A.VIv = vi === 0; A.PIv = pi === 0;
      A.renderVars(1);
      const where = `${A.AX.HOW[h]} · ${PS[pi].nm}×${V[vi].nm}`;
      for (const s of sentences(clean(store.cOut.innerHTML))) {
        if (!seen.has(s)) seen.set(s, { ...score(s), where });
      }
    }
  }
}

const all = [...seen.entries()].map(([s, m]) => ({ s, ...m })).sort((a, b) => b.score - a.score);
const args = process.argv.slice(2);
const HARDLINE = 55;   // score at which a sentence is worth rewriting

if (args.includes('--stats') || true) {
  const over = all.filter((x) => x.score >= HARDLINE);
  const lens = all.map((x) => x.len).sort((a, b) => a - b);
  const med = lens[Math.floor(lens.length / 2)];
  const p90 = lens[Math.floor(lens.length * 0.9)];
  console.log(`\n${all.length} distinct sentences on screen across ${COMBOS.length} combinations.`);
  console.log(`words per sentence: median ${med}, p90 ${p90}, longest ${lens[lens.length - 1]}`);
  console.log(`${over.length} score >= ${HARDLINE} (${Math.round(over.length / all.length * 100)}%)`);
  const hw = {};
  all.forEach((x) => x.s.replace(/[^A-Za-z\s-]/g, ' ').split(/\s+/)
    .forEach((w) => { const l = w.toLowerCase(); if (HARDSET.has(l)) hw[l] = (hw[l] || 0) + 1; }));
  const top = Object.entries(hw).sort((a, b) => b[1] - a[1]).slice(0, 14);
  if (top.length) console.log(`hard words in use: ${top.map(([w, n]) => `${w}(${n})`).join(' ')}`);
}

if (!args.includes('--stats')) {
  const list = args.includes('--all') ? all.filter((x) => x.score >= HARDLINE) : all.slice(0, 25);
  console.log(`\n${'—'.repeat(78)}`);
  list.forEach((x, i) => {
    console.log(`\n${i + 1}. score ${x.score}  (${x.len} words, ${x.hard} hard, ${x.clause} clauses)  ${x.where}`);
    console.log(`   ${x.s}`);
  });
}
console.log('');
