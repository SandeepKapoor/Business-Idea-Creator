#!/usr/bin/env node
/*
 * tools/verify.js — the harness CONTEXT.md §16 describes but never had as a file.
 *
 * Loads the BUILT artifact (not src/), stubs a minimal DOM, boots the script exactly
 * as a browser would, and then exercises the engine. Zero dependencies.
 *
 * It checks two different kinds of thing:
 *   MECHANICS  — does the engine run over its whole input space without exceptions,
 *                producing integers in range and no NaN/undefined in rendered output?
 *   INVARIANTS — the epistemic guarantees from CONTEXT.md §12. These are the reason
 *                the artifact is worth anything. A change that breaks one of these has
 *                made the document sound more confident than it is.
 *
 *   node tools/verify.js            full run
 *   node tools/verify.js --quick    skip the 193,600-combination sweep
 */

'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const ARTIFACT = path.join(ROOT, 'sandeep-idea-map.html');
const QUICK = process.argv.includes('--quick');

let pass = 0;
const fails = [];
const notes = [];
const known = [];   // pre-existing content defects — reported loudly, but not regressions
const fixed = [];   // a known issue that now passes: promote it to a hard check

function ok(name, cond, detail) {
  if (cond) { pass++; return true; }
  fails.push(detail ? `${name} — ${detail}` : name);
  return false;
}
function eq(name, actual, expected) {
  return ok(name, actual === expected, `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

/* A check that currently fails for a reason that predates this harness. It is a real
   finding about the document's content, not a broken build — so it is printed every run
   but does not fail the gate. Fix the content, and the harness tells you to promote it. */
function issue(name, cond, detail) {
  if (cond) { fixed.push(name); return true; }
  known.push(detail ? `${name} — ${detail}` : name);
  return false;
}

// ---------------------------------------------------------------- load
if (!fs.existsSync(ARTIFACT)) {
  console.error(`no artifact at ${ARTIFACT} — run "npm run build" first`);
  process.exit(1);
}
const html = fs.readFileSync(ARTIFACT, 'utf8');
const script = (html.match(/<script>([\s\S]*)<\/script>/) || [])[1];
if (!script) { console.error('could not find the <script> block in the artifact'); process.exit(1); }

// ---------------------------------------------------------------- DOM stub
function el(id) {
  const e = {
    id, value: undefined, innerHTML: '', textContent: '', hidden: false, open: false,
    dataset: {}, style: {}, children: [],
    classList: { _s: new Set(), add(c) { this._s.add(c); }, remove(c) { this._s.delete(c); },
      toggle(c, f) { const on = f === undefined ? !this._s.has(c) : !!f; on ? this._s.add(c) : this._s.delete(c); },
      contains(c) { return this._s.has(c); } },
    scrollIntoView() {}, addEventListener() {}, removeEventListener() {},
    querySelector() { return null; }, querySelectorAll() { return []; },
    appendChild() {}, setAttribute() {}, getAttribute() { return null; },
  };
  return e;
}
const nodes = new Map();
const documentElement = el('html');
documentElement.dataset.theme = 'dark';

const sandbox = {
  console,
  document: {
    documentElement,
    body: el('body'),
    getElementById(id) { if (!nodes.has(id)) nodes.set(id, el(id)); return nodes.get(id); },
    querySelectorAll() { return []; },
    querySelector() { return null; },
    addEventListener() {},
    createElement(tag) { return el(tag); },
  },
  window: { scrollTo() {}, addEventListener() {} },
  location: { hash: '' },   // read at boot to deep-link into a collapsed part
  setTimeout, clearTimeout,
};
sandbox.window.document = sandbox.document;
sandbox.window.location = sandbox.location;
sandbox.globalThis = sandbox;

// Names the harness needs to reach. Appended, so the artifact itself stays untouched.
const EXPORTS = ['scoreIt', 'rules', 'verdict', 'buildVars', 'deepPlan', 'priceCheck', 'nearest',
  'readRow', 'HOWTO', 'compFor', 'inr', 'AX', 'CL', 'TAGS', 'HAND', 'FAST', 'ALLC', 'MW', 'MO', 'MH', 'MP',
  'HOW_BASE', 'PAY_MULT', 'BASE_EV', 'SCEN', 'SEG_EV', 'COMP', 'MOTION', 'FIRST', 'ARCH',
  'PREM', 'premFor', 'premEv', 'aAn', 'cap', 'ROUTES', 'routesFor', 'routeD',
  'CRIT', 'CRIT2', 'CRIT_GUESS', 'CRIT_DEF', 'BANDS', 'RAMP_L', 'RAMP_D', 'INK_L', 'INK_D',
  'EMPLOYER', 'LEARNER', 'NO_EMPLOYER', 'KIDS', 'ORG_BUYER', 'TRAVEL', 'CONTENT', 'RECUR_H'];

let A;
try {
  vm.createContext(sandbox);
  // __card renders one idea card so the harness can compare cards to each other. Built here
  // rather than exported by name because it needs to set module-scope state (AXS, PREMS, VIDX)
  // that the artifact deliberately does not expose.
  vm.runInContext(`${script}
;globalThis.__api={${EXPORTS.join(',')},
  __card:function(w,o,h,p,pi,vi){
    AXS=[w,o,h,p]; ORIGIN=null; VI=false; PI=false;
    PREMS=premFor(h,o); if(!RTS.length)RTS=routesFor(o); PIDX=pi; VARS=buildVars(w,o,h,p,PREMS[pi]); VIDX=vi;
    renderVars(1);
    var s=document.getElementById('cOut').innerHTML;
    var i=s.indexOf('<div class="ideacard">'), j=s.indexOf('Part 6 &middot;');
    if(j<0)j=s.indexOf('Part 6 ·');
    return j>i?s.slice(i,j):s.slice(i);
  },
  __pitch:function(w,o,h,p,pi,vi,ri){
    RTS=routesFor(o); RIDX=(ri===undefined?-1:ri);
    var c=globalThis.__api.__card(w,o,h,p,pi,vi);
    var i=c.indexOf('<div class="ipitch">');
    return i<0?'':c.slice(i, c.indexOf('</div>', i));
  },
  __facts:function(w,o,h,p,pi,vi){
    var c=globalThis.__api.__card(w,o,h,p,pi,vi);
    var i=c.indexOf('<div class="ifacts">');
    return i<0?'':c.slice(i, c.indexOf('</div>\\n   <div class="ibox cost"', i)+1);
  }};`, sandbox,
    { filename: 'artifact.js', timeout: 120000 });
  A = sandbox.__api;
  pass++; // boots without throwing
} catch (e) {
  console.error(`\n  FATAL: the artifact script threw while booting.\n  ${e.message}\n`);
  process.exit(1);
}

// --- one shared scope -----------------------------------------------------
// build.js concatenates all 24 JS files into a single <script>, so two files declaring the same
// top-level name is a boot-time throw that blanks the page. It has happened: 18-modes.js declared
// `const PICK` for the workspace's four axes while 10-picks.js already used it for the five
// recommended ideas. The artifact booting above proves the current build is clean; this names the
// offender instead of leaving "Identifier X has already been declared" as the only clue.
{
  const seen = new Set(), dupes = new Set();
  for (const m of script.matchAll(/^(?:const|let|var|function)\s+([A-Za-z_$][\w$]*)/gm)) {
    if (seen.has(m[1])) dupes.add(m[1]); else seen.add(m[1]);
  }
  ok('no two source files declare the same top-level name', dupes.size === 0,
    `clashing: ${[...dupes].join(', ')}`);
  notes.push(`${seen.size} top-level names share the one script scope.`);
}

// ================================================================ MECHANICS

// --- shape of the four axes and every index-aligned table --------------
const NW = A.AX.WHO.length, NO = A.AX.OUT.length, NH = A.AX.HOW.length, NP = A.AX.PAY.length;
eq('AX.WHO length', NW, 20);
eq('AX.OUT length', NO, 20);
eq('AX.HOW length', NH, 22);
eq('AX.PAY length', NP, 22);
eq('combination count matches the 193,600 quoted throughout', NW * NO * NH * NP, 193600);

// CRIT (the heatmap) and CRIT2 (the builder) are two copies of the same eight column labels.
// Nothing in the code links them, so a rename in one place silently leaves the other behind and
// the two views of the same score start disagreeing about what they measure.
eq('CRIT and CRIT2 are the same eight labels', A.CRIT.join('|'), A.CRIT2.join('|'));
eq('eight criteria', A.CRIT2.length, 8);
// These strings go into running sentences via toLowerCase(), not just table headers.
ok('every criterion reads as a noun phrase, not a question',
  A.CRIT2.every((c) => !c.endsWith('?')),
  'readRow() writes "the best you have is <name> at 4" — a question there is broken English');

const aligned = [['MW', A.MW, NW], ['MO', A.MO, NO], ['MH', A.MH, NH], ['MP', A.MP, NP],
  ['HOW_BASE', A.HOW_BASE, NH], ['BASE_EV', A.BASE_EV, NH], ['FIRST', A.FIRST, NH],
  ['PAY_MULT', A.PAY_MULT, NP], ['MOTION', A.MOTION, NP], ['SEG_EV', A.SEG_EV, NW]];
for (const [n, t, want] of aligned) eq(`${n} is index-aligned with its axis`, t.length, want);

// --- the idea bank ------------------------------------------------------
const ideas = A.CL.flatMap((c) => c.i);
eq('idea bank holds 112 ideas', ideas.length, 112);
eq('11 clusters', A.CL.length, 11);
const nums = ideas.map((x) => x[0]);
ok('idea numbering is continuous 1..112 with no gaps or duplicates',
  nums.length === new Set(nums).size && nums.every((n, i) => n === i + 1),
  `first mismatch at index ${nums.findIndex((n, i) => n !== i + 1)}`);
eq('TAGS has an entry per idea (plus the null at 0)', A.TAGS.length, 113);
ok('every TAGS row is a valid 4-axis position',
  A.TAGS.slice(1).every((t) => Array.isArray(t) && t.length === 4 &&
    t[0] < NW && t[1] < NO && t[2] < NH && t[3] < NP && t.every((v) => Number.isInteger(v) && v >= 0)),
  'a row is missing, wrong length, or points off the end of an axis');
ok('every hand-scored idea number exists in the bank',
  Object.keys(A.HAND).every((n) => nums.includes(+n)));
ok('every hand score is eight integers in 1..5',
  Object.values(A.HAND).every((s) => s.length === 8 && s.every((v) => Number.isInteger(v) && v >= 1 && v <= 5)));
ok('every "cash in <30 days" tag points at a real idea',
  [...A.FAST].every((n) => nums.includes(n)));

// --- the full scoring sweep --------------------------------------------
if (QUICK) {
  notes.push('SKIPPED the 193,600-combination sweep (--quick). Run without --quick before shipping.');
} else {
  let n = 0, bad = 0, firstBad = null;
  const seenVerdicts = new Set();
  for (let w = 0; w < NW; w++) for (let o = 0; o < NO; o++) for (let h = 0; h < NH; h++) for (let p = 0; p < NP; p++) {
    n++;
    let S, V;
    try {
      S = A.scoreIt(w, o, h, p);
      V = A.verdict(S, A.rules(w, o, h, p));
    } catch (e) { bad++; firstBad = firstBad || `[${w},${o},${h},${p}] threw ${e.message}`; continue; }
    if (S.length !== 8 || !S.every((v) => Number.isInteger(v) && v >= 1 && v <= 5)) {
      bad++; firstBad = firstBad || `[${w},${o},${h},${p}] produced ${JSON.stringify(S)}`;
    }
    if (!V || typeof V.t !== 'string' || typeof V.d !== 'string') {
      bad++; firstBad = firstBad || `[${w},${o},${h},${p}] verdict malformed`;
    } else seenVerdicts.add(V.t);
  }
  eq('every one of the 193,600 combinations scored', n, 193600);
  ok('all 193,600 produce eight integers in 1..5 and a well-formed verdict', bad === 0, firstBad);
  ok('every verdict band is reachable', seenVerdicts.size >= 5, `only saw: ${[...seenVerdicts].join(' / ')}`);
}

// --- the premise dimension ----------------------------------------------
// The load-bearing check here is `ob`. A premise claims two different things: "this kind of
// business exists" (ev, pointing at bank ideas) and "the bank has built it at these formats"
// (ob). The second is fully derivable from the first plus TAGS, so it is verified rather than
// trusted — otherwise `ob` could quietly drift into a wish list and the UI would go on printing
// "built this way in your own bank" about formats where nothing was.
{
  const P0 = A.PREM[0];
  ok('PREM[0] is the no-premise default', P0.k === 'none');
  ok('the default premise is inert — zero deltas, ×1 price',
    P0.dS.every((d) => d === 0) && P0.pm === 1,
    'a non-inert default would silently change every score this page produced before premises existed');

  const real = A.PREM.filter((P) => P.k !== 'none');
  ok('every premise carries eight score deltas',
    A.PREM.every((P) => Array.isArray(P.dS) && P.dS.length === 8 && P.dS.every(Number.isInteger)));
  ok('every premise cites bank ideas that exist',
    real.every((P) => P.ev.length && P.ev.every((n) => nums.includes(n))));
  ok('every premise has a one-word tag, and they are unique',
    new Set(real.map((P) => P.w1)).size === real.length &&
    real.every((P) => /^[A-Z]+$/.test(P.w1)));

  // ob must BE the observed set — not a superset, not a subset.
  let obBad = null;
  for (const P of real) {
    const derived = [...new Set(P.ev.map((n) => A.TAGS[n][2]))].sort((a, b) => a - b);
    const stated = [...P.ob].sort((a, b) => a - b);
    if (derived.join() !== stated.join()) {
      obBad = `${P.nm}: ob=[${stated}] but its bank ideas actually sit at [${derived}]`;
      break;
    }
  }
  ok('each premise\'s "observed" formats are exactly those its bank ideas use', !obBad, obBad);
  ok('no format is claimed as both observed and judged',
    real.every((P) => !P.ob.some((h) => P.xt.includes(h))),
    'a format in both ob and xt would render as evidenced and as judgement at the same time');
  ok('every premise stays inside the 22 formats',
    real.every((P) => [...P.ob, ...P.xt].every((h) => Number.isInteger(h) && h >= 0 && h < NH)));

  // premEv is what puts the chip on screen. It must say "built" only when that is literally true.
  let evBad = null;
  for (let h = 0; h < NH && !evBad; h++) for (const P of real) {
    const truth = P.ev.some((n) => A.TAGS[n][2] === h);
    const said = A.premEv(P, h);
    if ((said.k === 'ok') !== truth) { evBad = `${P.nm} at format ${h}: chip says ${said.k}, truth is ${truth}`; break; }
  }
  ok('the evidence chip claims "built in your bank" only where a bank idea actually is', !evBad, evBad);
  ok('premEv is silent for the default premise', A.premEv(P0, 0) === null);

  let minP = 99, maxP = 0;
  for (let h = 0; h < NH; h++) for (let o = 0; o < NO; o++) {
    const set = A.premFor(h, o);
    minP = Math.min(minP, set.length); maxP = Math.max(maxP, set.length);
  }

  // Artefact is the one premise gated on the outcome. "They leave holding one finished thing"
  // is unsayable about Belonging or Clarity, so it must not be offered there — and it must
  // still be offered wherever the outcome IS pointable, or the filter is suppression, not logic.
  const artefact = A.PREM.find((P) => P.k === 'artefact');
  eq('exactly one premise is outcome-gated', A.PREM.filter((P) => P.apO).length, 1);
  const vague = [], solid = [];
  for (let o = 0; o < NO; o++) (A.MO[o][2] >= 3 ? solid : vague).push(o);
  ok('Artefact is withheld from outcomes nobody can hold',
    vague.length > 0 && vague.every((o) => !A.premFor(0, o).includes(artefact)),
    `measurable<3: ${vague.map((o) => A.AX.OUT[o]).join(', ')}`);
  ok('Artefact still appears for every pointable outcome',
    solid.every((o) => A.premFor(0, o).includes(artefact)));
  notes.push(`Artefact withheld from ${vague.length} of ${NO} outcomes: ` +
    vague.map((o) => A.AX.OUT[o]).join(', ') + '.');
  // aAn is a spelling rule and will be wrong for "an hour" / "a user" style words. Rather than
  // trust that no such string ever enters these tables, check every string it is actually fed.
  // WRONG lists the known exceptions in both directions; if a future axis or format name lands
  // on one, this fails rather than shipping "a hour".
  const WRONG = /^(hour|honest|honou?r|heir)|^(one|once|uniqu|unit|user|usual|util|europ|eu)/i;
  const fed = [...A.AX.HOW.map((s) => s.toLowerCase()), ...A.MH.map((r) => r[6].toLowerCase())];
  const artBad = fed.filter((s) => WRONG.test(s));
  ok('no format name needs an article exception', artBad.length === 0,
    `aAn() would mis-article: ${artBad.join(', ')}`);
  // Spot-check the real aAn against hand-written expectations, so this tests the function
  // rather than restating its implementation.
  const artCases = [['live cohort', 'a live cohort'], ['in-person workshop', 'an in-person workshop'],
    ['advisory retainer', 'an advisory retainer'], ['async video critique', 'an async video critique'],
    ['assessment + certification', 'an assessment + certification'], ['1:1 coaching', 'a 1:1 coaching'],
    ['awards', 'an awards'], ['podcast', 'a podcast']];
  const artFail = artCases.find(([s, want]) => A.aAn(s) !== want);
  ok('aAn articles every format string correctly', !artFail,
    artFail && `aAn(${artFail[0]}) = "${A.aAn(artFail[0])}", expected "${artFail[1]}"`);

  ok('every format offers at least the default premise', minP >= 1, `saw ${minP}`);
  ok('no format offers more premises than exist', maxP <= A.PREM.length, `saw ${maxP}`);
  notes.push(`premises available per format: ${minP}–${maxP} of ${A.PREM.length}.`);
}

// --- routes: the sub-problems of each outcome ------------------------------
// A route is what the business is ABOUT. It is the weakest-sourced dimension on the page — no
// bank receipts, unlike PREM — so what can be checked is that it is well-formed, that every
// outcome has real alternatives rather than one route wearing four names, and that choosing one
// actually changes the page.
{
  eq('one route list per outcome', A.ROUTES.length, NO);
  const thin = [];
  for (let o = 0; o < NO; o++) {
    const R = A.routesFor(o);
    if (R.length < 4) thin.push(`${A.AX.OUT[o]} has ${R.length}`);
  }
  ok('every outcome offers at least four different businesses', thin.length === 0, thin.join(', '));

  const bad = [];
  for (let o = 0; o < NO; o++) {
    const R = A.routesFor(o);
    if (new Set(R.map((r) => r.nm)).size !== R.length) bad.push(`${A.AX.OUT[o]}: duplicate name`);
    if (new Set(R.map((r) => r.v)).size !== R.length) bad.push(`${A.AX.OUT[o]}: duplicate premise`);
    R.forEach((r) => {
      if (!r.nm || !r.v) bad.push(`${A.AX.OUT[o]}/${r.nm}: empty field`);
      Object.entries(r.d).forEach(([k, v]) => {
        if (!(+k >= 0 && +k < 8)) bad.push(`${r.nm}: delta index ${k}`);
        if (!Number.isInteger(v) || Math.abs(v) > 2) bad.push(`${r.nm}: delta ${v} out of range`);
      });
    });
  }
  ok('every route is well formed', bad.length === 0, bad.slice(0, 3).join(' | '));

  // A route with only a one-liner is a topic, not an idea — which is exactly the complaint that
  // produced these fields. Every one has to explain itself and name what would kill it.
  const bare = [];
  for (let o = 0; o < NO; o++) A.routesFor(o).forEach((r) => {
    if (!r.an || r.an.split(' ').length < 25) bare.push(`${r.nm}: explanation too thin`);
    if (!r.kl || r.kl.split(' ').length < 10) bare.push(`${r.nm}: no real kill criterion`);
    if (r.an && r.an === r.v) bare.push(`${r.nm}: explanation just repeats the one-liner`);
  });
  ok('every route explains itself and names what kills it', bare.length === 0,
    bare.slice(0, 3).join(' | '));

  // Shape check, added after a generator whose regex could not cross an escaped apostrophe
  // silently dropped one route's pitch phrase into the NEXT route — leaving one entry with five
  // fields and one with seven. Both still parsed, and nothing noticed.
  const shape = [];
  A.ROUTES.forEach((rs, o) => rs.forEach((r) => {
    if (r.length !== 6) shape.push(`${A.AX.OUT[o]}/${r[0]} has ${r.length} fields, not 6`);
  }));
  ok('every route tuple has exactly six fields', shape.length === 0, shape.join(' | '));
  const noPg = [];
  for (let o = 0; o < NO; o++) A.routesFor(o).forEach((r) => {
    if (!r.pg) noPg.push(r.nm);
    else if (/^[A-Z]/.test(r.pg)) noPg.push(`${r.nm}: pitch phrase must continue "I help them …"`);
  });
  ok('every route supplies a pitch phrase that completes the sentence', noPg.length === 0,
    noPg.slice(0, 3).join(', '));

  // The whole point: the say-it-out-loud line must change with the selection.
  {
    const pitches = new Set(), dup = [];
    const [w, o, h, p] = [0, 7, 0, 0];
    const PS = A.premFor(h, o), RS = A.routesFor(o);
    for (let ri = -1; ri < RS.length; ri++) for (let pi = 0; pi < PS.length; pi++) {
      const card = A.__pitch(w, o, h, p, pi, 0, ri);
      if (pitches.has(card)) dup.push(`route ${ri}/work ${pi}`); else pitches.add(card);
    }
    ok('the pitch differs for every route and every kind of work', dup.length === 0,
      `${dup.length} repeats — the say-it-out-loud line is the one thing that must be specific`);
    notes.push(`${pitches.size} distinct pitches at one combination.`);
  }
  {
    const all = [];
    for (let o = 0; o < NO; o++) A.routesFor(o).forEach((r) => all.push(r.an, r.kl));
    ok('no two routes share an explanation or a kill criterion',
      new Set(all).size === all.length,
      'copy-paste between routes makes them look like one idea again');
    const words = all.reduce((n, t) => n + t.split(' ').length, 0);
    notes.push(`route prose: ${words} words across 81 explanations and kill criteria.`);
  }

  // Four routes that all score the same are four names for one idea.
  const flat = [];
  for (let o = 0; o < NO; o++) {
    const sigs = new Set(A.routesFor(o).map((r) => A.routeD(r).join(',')));
    if (sigs.size < 3) flat.push(`${A.AX.OUT[o]}: only ${sigs.size} distinct score effects`);
  }
  ok('the routes for an outcome score differently from each other', flat.length === 0, flat.join(', '));

  // Restraint check: a route with a delta on every axis is a guess, not a reason.
  const wide = [];
  for (let o = 0; o < NO; o++) A.routesFor(o).forEach((r) => {
    if (Object.keys(r.d).length > 3) wide.push(`${r.nm} touches ${Object.keys(r.d).length}`);
  });
  ok('no route claims to move more than three of the eight criteria', wide.length === 0,
    wide.slice(0, 3).join(', '));

  const total = A.ROUTES.reduce((n, r) => n + r.length, 0);
  notes.push(`${total} routes across ${NO} outcomes, ` +
    `${Math.min(...A.ROUTES.map((r) => r.length))}–${Math.max(...A.ROUTES.map((r) => r.length))} each.`);
}

// --- the four facts must move with the work and the twist ------------------
// The card's four facts come straight off the axes, so for a long time they read identically
// whichever twist you were on — the page looked the same for seven different businesses. Each
// twist and each kind of work now declares, in `f`, which of the four it actually changes.
{
  const FK = ['who', 'out', 'run', 'pay'];
  const noF = [];
  A.ARCH.forEach((a) => { if (!a.f || !Object.keys(a.f).length) noF.push(`twist ${a.nm}`); });
  A.PREM.filter((P) => P.k !== 'none').forEach((P) => {
    if (!P.f || !Object.keys(P.f).length) noF.push(`work ${P.nm}`);
  });
  ok('every twist and every kind of work changes at least one of the four facts', noF.length === 0,
    `${noF.join(', ')} would render an identical fact block`);
  // A kind of work is the bigger of the two choices, so it should move more than one fact. Every
  // one now touches who, what they leave with and how it runs; pay only where it truly changes.
  const thin = A.PREM.filter((P) => P.k !== 'none' && Object.keys(P.f || {}).length < 3)
    .map((P) => `${P.nm} touches only ${Object.keys(P.f || {}).length}`);
  ok('every kind of work changes at least three of the four facts', thin.length === 0, thin.join(', '));
  ok('fact modifiers only use the four known keys',
    [...A.ARCH, ...A.PREM].every((x) => !x.f || Object.keys(x.f).every((k) => FK.includes(k))));
  ok('every fact modifier is a function',
    [...A.ARCH, ...A.PREM].every((x) => !x.f || Object.values(x.f).every((v) => typeof v === 'function')));

  // The real claim: no two ideas at one combination render the same card.
  const dupes = [];
  for (const [w, o, h, p] of [[2, 4, 0, 0], [2, 8, 5, 4], [10, 12, 9, 3], [5, 12, 19, 14]]) {
    const seen = new Map();
    const PS = A.premFor(h, o);
    for (let pi = 0; pi < PS.length; pi++) {
      const V = A.buildVars(w, o, h, p, PS[pi]);
      for (let vi = 0; vi < V.length; vi++) {
        const card = A.__card(w, o, h, p, pi, vi);
        const key = `${PS[pi].nm} × ${V[vi].nm}`;
        if (seen.has(card)) dupes.push(`[${w},${o},${h},${p}] ${key} is identical to ${seen.get(card)}`);
        else seen.set(card, key);
      }
    }
  }
  ok('no two ideas at one combination render the same card', dupes.length === 0,
    dupes.slice(0, 3).join(' | '));

  // Tighter: the FACT BLOCK alone must differ per twist, which is what the reader compares.
  const same = [];
  for (const [w, o, h, p] of [[2, 4, 0, 0], [2, 8, 5, 4]]) {
    const PS = A.premFor(h, o);
    for (let pi = 0; pi < PS.length; pi++) {
      const V = A.buildVars(w, o, h, p, PS[pi]);
      const blocks = new Map();
      for (let vi = 0; vi < V.length; vi++) {
        const f = A.__facts(w, o, h, p, pi, vi);
        if (blocks.has(f)) same.push(`${PS[pi].nm}: ${V[vi].nm} and ${blocks.get(f)} share a fact block`);
        else blocks.set(f, V[vi].nm);
      }
    }
  }
  ok('the four facts differ for every twist at a given work', same.length === 0,
    same.slice(0, 3).join(' | '));
}

// --- variants, across every premise --------------------------------------
{
  let bad = 0, minV = 99, maxV = 0, sampled = 0, ideas = 0, firstBad = null;
  let minIdeas = 1e9, maxIdeas = 0;
  const STRIDE = QUICK ? 997 : 1; // 1 = exhaustive; the sweep is cheap enough to not sample
  for (let i = 0; i < NW * NO * NH * NP; i += STRIDE) {
    const w = Math.floor(i / (NO * NH * NP)) % NW, o = Math.floor(i / (NH * NP)) % NO;
    const h = Math.floor(i / NP) % NH, p = i % NP;
    sampled++;
    try {
      const PS = A.premFor(h, o);
      let here = 0;
      for (const P of PS) {
        const V = A.buildVars(w, o, h, p, P);
        minV = Math.min(minV, V.length); maxV = Math.max(maxV, V.length);
        here += V.length; ideas += V.length;
        for (const v of V) {
          if (!v.S.every((x) => Number.isInteger(x) && x >= 1 && x <= 5) ||
              !Number.isFinite(v.core) || v.core < 500 || !v.title || !v.V) {
            bad++; firstBad = firstBad || `[${w},${o},${h},${p}] ${P.nm}×${v.nm}: core=${v.core}, S=${v.S}`;
          }
        }
      }
      minIdeas = Math.min(minIdeas, here); maxIdeas = Math.max(maxIdeas, here);
    } catch (e) { bad++; firstBad = firstBad || `[${w},${o},${h},${p}] threw ${e.message}`; }
  }
  ok(`premise × angle builds cleanly across ${sampled} combinations`, bad === 0, firstBad);
  ok('every combination yields 4–7 variant angles', minV >= 4 && maxV <= 7, `saw ${minV}–${maxV}`);
  ok('every combination now yields more than one idea', minIdeas > 1, `saw a low of ${minIdeas}`);
  notes.push(STRIDE === 1
    ? `swept all ${sampled.toLocaleString('en-US')} combinations × every applicable premise — ` +
      `${ideas.toLocaleString('en-US')} distinct ideas, ${minIdeas}–${maxIdeas} per combination.`
    : `variant sweep sampled ${sampled.toLocaleString('en-US')} of 193,600 combinations (stride ${STRIDE}) — NOT exhaustive.`);
}

// --- all 112 deep-dive plans -------------------------------------------
{
  const dTgt = sandbox.document.getElementById('dTgt'); dTgt.value = 250000;
  const BAD_TOKEN = /(undefined|NaN|\[object Object\]|₹0\b)/;
  let bad = 0, missingSection = 0, noProv = 0, first = null;
  for (const n of nums) {
    let out;
    try { out = A.deepPlan(n); } catch (e) { bad++; first = first || `#${n} threw ${e.message}`; continue; }
    if (BAD_TOKEN.test(out)) { bad++; first = first || `#${n} contains "${out.match(BAD_TOKEN)[0]}"`; }
    for (let s = 1; s <= 10; s++) {
      if (!out.includes(`<div class="dnum">${String(s).padStart(2, '0')}</div>`)) {
        missingSection++; first = first || `#${n} is missing section ${s}`;
      }
    }
    if (!/class="prov (ok|weak|judg)"/.test(out)) { noProv++; first = first || `#${n} prints a price with no provenance chip`; }
  }
  ok('all 112 deep-dive plans render without bad tokens', bad === 0, first);
  ok('every plan carries all 10 sections', missingSection === 0, first);
  ok('INVARIANT 1 — every plan\'s price carries a provenance chip', noProv === 0, first);
}

// --- generated markup balances -----------------------------------------
{
  const PAIRED = ['div', 'details', 'summary', 'table', 'thead', 'tbody', 'tr', 'td', 'th', 'span', 'button', 'ul', 'li', 'p', 'h4'];
  const check = (label, s) => {
    const broken = PAIRED.filter((t) => {
      const open = (s.match(new RegExp(`<${t}[\\s>]`, 'g')) || []).length;
      const close = (s.match(new RegExp(`</${t}>`, 'g')) || []).length;
      return open !== close;
    });
    ok(`${label} markup balances`, broken.length === 0, `unbalanced: ${broken.join(', ')}`);
  };
  check('deep plan #23 (best-evidenced)', A.deepPlan(23));
  check('deep plan #37 (argues against itself)', A.deepPlan(37));
  check('deep plan #112 (fastest to cash)', A.deepPlan(112));
  check('how-to-read block', A.HOWTO());
  check('score row reader', A.readRow([3, 3, 4, 3, 4, 3, 5, 4]));
}

// --- the built artifact is genuinely self-contained ---------------------
ok('no external stylesheet', !/<link[^>]+stylesheet/i.test(html));
ok('no external script', !/<script[^>]+\bsrc=/i.test(html));
ok('no @import', !/@import/i.test(html));
ok('no remote asset in CSS', !/url\(\s*['"]?https?:/i.test(html));
ok('exactly one style block', (html.match(/<style>/g) || []).length === 1);
ok('exactly one script block', (html.match(/<script>/g) || []).length === 1);

// ================================================================ INVARIANTS (CONTEXT §12)

// 2 — never invent a market size
{
  const noAnchor = A.SEG_EV.map((s, i) => [s, i]).filter(([s]) => !s.v);
  ok('INVARIANT 2 — segments without evidence declare it and give no pool',
    noAnchor.every(([s]) => s.pool === null && /no verified/i.test(s.txt)),
    'a v:0 segment carries a pool or fails to say it is unverified');
  ok('INVARIANT 2 — every evidenced segment actually has a pool or an explicit rate-only note',
    A.SEG_EV.filter((s) => s.v).every((s) => s.pool !== null || /verified/i.test(s.txt)));
  // a segment with no anchor must make the plan refuse to state a total
  const orphan = noAnchor[0][1];
  const ideaWithNoAnchor = nums.find((n) => A.TAGS[n][0] === orphan);
  if (ideaWithNoAnchor) {
    const out = A.deepPlan(ideaWithNoAnchor);
    ok('INVARIANT 2 — an unevidenced plan leaves the top line blank rather than inventing it',
      out.includes('I will not invent a total') && out.includes('you must establish this'));
  }
}

// 3 — never invent a competitor name
{
  let bad = 0;
  for (const n of nums) {
    const [w, , h, p] = A.TAGS[n];
    const out = A.deepPlan(n);
    if (!A.compFor(h, p, w) && !out.includes('<div class="dsearch">')) bad++;
  }
  ok('INVARIANT 3 — plans with no verified competitor print a search query instead', bad === 0,
    `${bad} plans named nobody and offered no search`);
}

// 4 — keep CRIT_GUESS visible
{
  eq('INVARIANT 4 — three of the eight criteria are flagged as guesses',
    A.CRIT_GUESS.reduce((a, b) => a + b, 0), 3);
  // Pinned by INDEX, not by label. The invariant is that columns 1, 2 and 7 — reach, edge and
  // energy — are the three the engine cannot know about Sandeep. Pinning the strings instead
  // meant a copy rewrite failed a content invariant it had not actually violated.
  const guessedIx = A.CRIT_GUESS.map((g, i) => (g ? i : null)).filter((i) => i !== null);
  ok('INVARIANT 4 — the guesses are columns 1, 2 and 7 (reach, edge, energy)',
    guessedIx.join('|') === '1|2|7',
    `flagged: ${guessedIx.map((i) => `${i} ${A.CRIT2[i]}`).join(', ')}`);
  ok('INVARIANT 4 — the how-to-read block badges them', /GUESS/.test(A.HOWTO()));
}

// 5 — never describe engine output as the user's own answers
ok('INVARIANT 5 — Stage 1 says the five answers are inferred, not the user\'s',
  html.includes('These five are <b>not your answers</b>'));

// 6 — percentile claims match the scoring
{
  const probe = (tot) => { const S = [3, 3, 3, 3, 3, 3, 3, 3]; let r = tot - 24, i = 2;
    while (r > 0 && i < 8) { const add = Math.min(2, r); S[i] += add; r -= add; i++; } return S; };
  eq('INVARIANT 6 — BUILD floor is 32', A.verdict(probe(32), []).t, 'BUILD — TEST THIS');
  eq('INVARIANT 6 — 31 is not BUILD', A.verdict(probe(31), []).t, 'WORTH TESTING');
  eq('INVARIANT 6 — WORTH TESTING floor is 29', A.verdict(probe(29), []).t, 'WORTH TESTING');
  eq('INVARIANT 6 — 28 is WEAK', A.verdict(probe(28), []).t, 'WEAK — KEEP ROLLING');
  ok('INVARIANT 6 — the copy quotes the same 193,600', html.includes('193,600'));
  ok('INVARIANT 6 — the copy quotes the same bands', /median 27, p75 = 29, p96 = 32/.test(html));
  const band = A.BANDS.map((b) => b[0]).join('|');
  eq('INVARIANT 6 — five verdict bands documented', band, 'DEAD|ASSET, NOT REVENUE|WEAK|WORTH TESTING|BUILD');
}

// 7 — HAND overrides win and say they win
{
  ok('INVARIANT 7 — hand-scored rows are badged in the table', html.includes('HAND-SCORED'));
  ok('INVARIANT 7 — the builder banner discloses both numbers when they disagree',
    html.includes('the engine derives') && html.includes('trust the hand score'));
  const handIdea = A.ALLC.find((c) => c.hand);
  ok('INVARIANT 7 — a hand score is what reaches the table',
    handIdea && handIdea.tot === A.HAND[handIdea.n].reduce((a, b) => a + b, 0));
}

// 8 — vendor statistics marked as vendor statistics
{
  ok('INVARIANT 8 — the defensible completion figures are present',
    /12\.6%/.test(html) && /3\.13%/.test(html) && /3\.4×/.test(html));
  ok('INVARIANT 8 — the 85–95% cohort figure is attributed to cohort-software vendors',
    /85[–-]95%/.test(html) && /vendor|companies that sell cohort software|cohort-platform vendors/i.test(html));
}

// 1 (gates) — the two hard gates really are fatal
{
  ok('INVARIANT — a 1 on willingness to pay is fatal regardless of total',
    A.verdict([1, 5, 5, 5, 5, 5, 5, 5], []).t === 'DEAD — GATE FAILURE');
  ok('INVARIANT — a 1 on distribution is fatal regardless of total',
    A.verdict([5, 1, 5, 5, 5, 5, 5, 5], []).t === 'DEAD — GATE FAILURE');
  ok('INVARIANT — low willingness to pay downgrades to asset, not revenue',
    A.verdict([2, 5, 5, 5, 5, 5, 5, 5], []).t === 'ASSET, NOT REVENUE');
}

// 10 — both ordinal ramps stay validated (CONTEXT §13)
{
  const hex = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
  const lum = (c) => { const [r, g, b] = hex(c).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
  const mono = (r, dir) => r.every((c, i) => i === 0 || (dir > 0 ? lum(c) > lum(r[i - 1]) : lum(c) < lum(r[i - 1])));

  // Pinned by PROPERTY, not by hex list. The literal-string version failed a measured contrast
  // fix that improved the very thing the invariant exists to protect.
  eq('INVARIANT 10 — five steps in each ramp', `${A.RAMP_L.length}/${A.RAMP_D.length}`, '5/5');
  ok('INVARIANT 10 — every ramp step is a 6-digit hex',
    [...A.RAMP_L, ...A.RAMP_D].every((c) => /^#[0-9a-f]{6}$/i.test(c)));
  {
    const bad = [];
    [['light', A.RAMP_L, A.INK_L], ['dark', A.RAMP_D, A.INK_D]].forEach(([n, r, ink]) =>
      r.forEach((c, i) => { const v = ratio(ink[i], c);
        if (v < 4.5) bad.push(`${n} step ${i + 1}: ${ink[i]} on ${c} = ${v.toFixed(2)}:1`); }));
    ok('INVARIANT 10 — every one of the ten cell/ink pairs clears AA 4.5:1', !bad.length, bad.join('; '));
  }
  ok('INVARIANT 10 — light ramp darkens monotonically as score rises', mono(A.RAMP_L, -1));
  ok('INVARIANT 10 — dark ramp lightens monotonically as score rises', mono(A.RAMP_D, +1));
  ok('INVARIANT 10 — light ramp\'s lightest step clears 2:1 on the light surface',
    ratio(A.RAMP_L[0], '#fcfcfb') >= 2, `got ${ratio(A.RAMP_L[0], '#fcfcfb').toFixed(2)}:1`);
  ok('INVARIANT 10 — dark ramp\'s darkest step clears 2:1 on the dark surface',
    ratio(A.RAMP_D[0], '#1a1a19') >= 2, `got ${ratio(A.RAMP_D[0], '#1a1a19').toFixed(2)}:1`);
  ok('INVARIANT 10 — the failed #cde2fb ramp has not come back', !A.RAMP_L.includes('#cde2fb') && !A.RAMP_D.includes('#cde2fb'));

  /* Cell text is the score numeral at weight 600. That is NOT WCAG "large text" (which needs
     18.66px bold or 24px), so the bar is 4.5:1, not 3:1. §13's documented validator never tested
     this — it only tested the ramp against the surface, so step 3 shipped failing for months.
     Promoted from issue() to ok() once the ramp was fixed; it is a hard gate now. */
  const worst = (r, ink) => Math.min(...r.map((c, i) => ratio(c, ink[i])));
  ok('score-cell text clears WCAG AA 4.5:1 in both modes',
    worst(A.RAMP_L, A.INK_L) >= 4.5 && worst(A.RAMP_D, A.INK_D) >= 4.5,
    `worst pair: ${worst(A.RAMP_L, A.INK_L).toFixed(2)}:1 light, ` +
    `${worst(A.RAMP_D, A.INK_D).toFixed(2)}:1 dark`);
}

// 11 — corrections stay in place
ok('INVARIANT 11 — the five corrections are still stated, not quietly deleted',
  /Five claims were wrong/.test(html) && /that figure was invented/.test(html) &&
  /not the ₹4[–-]8L I originally asserted/.test(html) && /not the \$1,000 I implied/.test(html));

// pricing evidence discipline
{
  /* The evidence ledger claims "9 of 22 are anchored to published market figures".
     BASE_EV actually flags 8 (formats 0,1,2,4,5,9,18,19), and the [R] markers in the
     pricing comment agree with BASE_EV, not with the ledger. One of the two is wrong. */
  const researched = A.BASE_EV.reduce((a, b) => a + b, 0);
  const claimed = +(html.match(/(\d+) of 22 are anchored to published market figures/) || [])[1];
  issue('the evidence ledger\'s "N of 22" matches BASE_EV', researched === claimed,
    `ledger says ${claimed}, BASE_EV flags ${researched} (indices ${A.BASE_EV.map((v, i) => v ? i : null).filter((v) => v !== null).join(',')})`);
  eq('BASE_EV flags a stable set of researched formats', researched, 8);
  ok('every SCEN band points at a real format and real payers',
    A.SCEN.every((s) => s.h < NH && s.p.every((p) => p < NP) && s.lo < s.hi && s.w));
  let unlabelled = 0;
  for (let h = 0; h < NH; h++) for (let p = 0; p < NP; p++) {
    const r = A.priceCheck(h, p, A.HOW_BASE[h] * A.PAY_MULT[p]);
    if (!r || !r.t || !['ok', 'weak'].includes(r.k)) unlabelled++;
  }
  eq('INVARIANT 1 — all 484 format×payer prices carry a provenance verdict', unlabelled, 0);
}

// ---------------------------------------------------------------- report
console.log('');
if (fails.length === 0) {
  console.log(`  PASS  ${pass} checks`);
} else {
  console.log(`  FAIL  ${fails.length} of ${pass + fails.length} checks`);
  console.log('');
  for (const f of fails) console.log(`    ✕ ${f}`);
}
if (known.length) {
  console.log('');
  console.log(`  ${known.length} KNOWN ISSUE${known.length > 1 ? 'S' : ''} — real content defects, not build regressions:`);
  for (const k of known) console.log(`    ! ${k}`);
}
if (fixed.length) {
  console.log('');
  console.log('  A known issue now passes — promote issue() to ok() in tools/verify.js:');
  for (const f of fixed) console.log(`    ✓ ${f}`);
}
if (notes.length) { console.log(''); for (const n of notes) console.log(`    note: ${n}`); }
console.log('');
process.exit(fails.length ? 1 : 0);
