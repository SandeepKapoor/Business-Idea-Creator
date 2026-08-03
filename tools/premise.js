#!/usr/bin/env node
/* ---------- premise extraction ----------
   The four axes fix WHO / OUTCOME / HOW / PAY. The seven angles change one structural thing
   about how you build it. Neither fixes the PREMISE — the specific thing that actually happens
   inside. Proof: six combinations in the bank carry two different ideas each.

   This script mines the premise dimension OUT OF the 112 bank ideas rather than inventing a
   list. Every premise below is a pattern that already appears in Sandeep's own bank, and every
   one carries the idea numbers that instantiate it, so the claim is checkable.

   TAG is my reading of each idea, and it is editorial — the same class of judgement as MW's
   slice/advice fields. What is NOT editorial is everything this script computes from it:
   coverage, format spread, and the orthogonality tests. Those are arithmetic on the tagging.

   Run: node tools/premise.js            summary
        node tools/premise.js --full     every idea, grouped
        node tools/premise.js --untagged the ideas no premise fits, and why that matters */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const load = (f) => fs.readFileSync(path.join(ROOT, 'src/js', f + '.js'), 'utf8');
const src = ['02-axes', '04-bank.data', '06-scorecard.data'].map(load).join('\n') +
  '\n;__OUT = { AX, CL, TAGS };';
const s = { __OUT: null };
vm.createContext(s);
vm.runInContext(src, s);
const { AX, CL, TAGS } = s.__OUT;

const NAME = {}, DESC = {};
CL.flatMap((c) => c.i).forEach((x) => { NAME[x[0]] = x[1]; DESC[x[0]] = x[2]; });

/* ---------- the premise list ----------
   Each entry: k = key, nm = display name, q = the question it answers, ex = bank ideas.
   `ex` is the evidence. A premise with fewer than three instances is not a pattern, it is
   one idea — those are listed under WEAK in the report rather than promoted. */
const PREMISE = [
  { k: 'teardown', nm: 'Teardown', v: 'You take existing work apart',
    q: 'What if the raw material is their work, not your curriculum?',
    ex: [6, 36, 43, 67, 68, 69, 74, 97, 98] },
  { k: 'drill', nm: 'Drill', v: 'You rehearse the hard moment, repeatedly',
    q: 'What if they practise the moment instead of learning about it?',
    ex: [7, 16, 20, 33, 44, 91] },
  { k: 'artefact', nm: 'Artefact', v: 'They leave holding one made thing',
    q: 'What is the object they walk out with?',
    ex: [1, 5, 8, 90] },
  { k: 'diagnose', nm: 'Diagnosis', v: 'You measure them and say where they stand',
    q: 'What if you judge rather than teach?',
    ex: [11, 12, 52, 59, 81, 86] },
  { k: 'door', nm: 'Access', v: 'You open a room nobody else can open',
    q: 'Whose door can you open that others cannot?',
    ex: [46, 72, 82] },
  { k: 'translate', nm: 'Translation', v: 'You carry a method across a border or a language',
    q: 'What exists elsewhere that has not arrived here yet?',
    ex: [4, 10, 75, 76, 83] },
  { k: 'compete', nm: 'Contest', v: 'Someone wins, in public',
    q: 'What if there were a winner and an audience?',
    ex: [37, 38, 70, 99, 102] },
  { k: 'instrument', nm: 'Instrument', v: 'You hand over the thing and they run it themselves',
    q: 'What if you never deliver it — you only supply the kit?',
    ex: [18, 21, 30, 39, 51, 57, 58, 60, 64] },
  { k: 'dfy', nm: 'Done for them', v: 'You produce the outcome yourself',
    q: 'What if they never learn anything and just get the result?',
    ex: [14, 15, 22, 34, 63, 65, 92, 93, 94] },
  { k: 'record', nm: 'The record', v: 'You publish the reference everyone else cites',
    q: 'What does this market have no trustworthy record of?',
    ex: [40, 45, 62, 71, 89, 101, 103] },
  { k: 'match', nm: 'Matchmaking', v: 'You connect two sides and take a cut',
    q: 'Which two groups cannot find each other?',
    ex: [13, 19, 50, 61, 66, 73, 77, 78] },
  { k: 'frontier', nm: 'Frontier', v: 'You claim territory with no established practice yet',
    q: 'What has no curriculum because it is too new?',
    ex: [2, 23, 79, 85, 87, 88] },
  { k: 'mandate', nm: 'Mandate', v: 'A rule with a date forces the purchase',
    q: 'What rule, standard or deadline makes this non-optional?',
    ex: [3, 80] },
  { k: 'live', nm: 'In public', v: 'You do the thing yourself, in the open, and they follow',
    q: 'What are you going through right now that they could watch?',
    ex: [104] },
];

/* Rejected candidates, recorded so the omissions are deliberate rather than oversights.
   A premise must be orthogonal to the four axes AND to the seven angles, or it is not a new
   dimension — it is an existing control wearing a different name. */
const REJECTED = [
  ['Accountability / container',
   'This is the Container-only ANGLE (#41 is literally it). Same control, second knob.'],
  ['Contrarian / invert',
   'This is the Contrarian ANGLE. Ideas 95, 96, 100, 105, 106 are that angle applied, not a premise.'],
  ['Anti-scale / boutique',
   'Ideas 107-112 change price and volume — that is the Flagship ANGLE plus the HOW axis.'],
  ['Sponsored / employer-paid / ISA',
   'Ideas 47, 48, 49, 54, 55, 56 move money only. That is the PAY axis.'],
  ['Teach a different group',
   'Ideas 24-32 change who is in the room. That is the WHO axis.'],
];

const TAG = {};
PREMISE.forEach((p) => p.ex.forEach((n) => {
  if (TAG[n]) throw new Error(`idea #${n} tagged twice: ${TAG[n]} and ${p.k}`);
  TAG[n] = p.k;
}));

const ALL = Object.keys(NAME).map(Number).sort((a, b) => a - b);
const untagged = ALL.filter((n) => !TAG[n]);

/* ---------- orthogonality ----------
   A premise that only ever appears at one HOW is that format in disguise, and adding it as a
   fifth dimension would just give the user two knobs for one thing. Counting distinct formats
   is not enough on its own: "Matchmaking" spreads across two formats and still fails, because
   both of them are marketplace formats and 100% of its instances sit there.

   So the test is two-part, and a premise must pass both:
     formats >= 3          it has been built more than a couple of ways, and
     concentration <= 0.6  no single format holds more than 60% of its instances.

   PASS  the bank itself proves the premise is independent of the format.
   THIN  conceptually independent, but the bank only ever built it one way. Kept and labelled,
         not promoted — one format is under-sampling OR a hidden dependency, and 112 ideas
         cannot tell those apart.
   FAIL  the HOW axis renamed. Dropped. */
const spread = (p, axis) => {
  const i = { WHO: 0, OUT: 1, HOW: 2, PAY: 3 }[axis];
  return new Set(p.ex.filter((n) => TAGS[n]).map((n) => TAGS[n][i])).size;
};
const howMix = (p) => {
  const f = {};
  p.ex.filter((n) => TAGS[n]).forEach((n) => { const h = AX.HOW[TAGS[n][2]]; f[h] = (f[h] || 0) + 1; });
  return f;
};
const conc = (p) => {
  const f = Object.values(howMix(p));
  return f.length ? Math.max(...f) / f.reduce((a, b) => a + b) : 1;
};
const grade = (p) => {
  if (p.ex.length < 3) return 'THIN';
  if (spread(p, 'HOW') >= 3 && conc(p) <= 0.6) return 'PASS';
  return spread(p, 'HOW') <= 2 && p.ex.length >= 5 ? 'FAIL' : 'THIN';
};

const args = process.argv.slice(2);
const pad = (s, n) => String(s).padEnd(n);

console.log('\n' + '='.repeat(78));
console.log('PREMISE — the fifth dimension, mined from the 112 bank ideas');
console.log('='.repeat(78));

const by = {};
Object.keys(by);
const dupe = {};
ALL.forEach((n) => { if (TAGS[n]) { const k = TAGS[n].join(','); (dupe[k] = dupe[k] || []).push(n); } });
const twins = Object.entries(dupe).filter(([, v]) => v.length > 1);
console.log(`\n${ALL.length} ideas occupy ${Object.keys(dupe).length} distinct four-axis combinations.`);
console.log(`${twins.length} combinations carry more than one idea — the premise is what separates them:\n`);
twins.forEach(([k, v]) => {
  const a = k.split(',').map(Number);
  console.log(`  ${AX.WHO[a[0]]} · ${AX.OUT[a[1]]} · ${AX.HOW[a[2]]} · ${AX.PAY[a[3]]}`);
  v.forEach((n) => console.log(`     #${pad(n, 4)} ${pad(NAME[n], 34)} premise: ${TAG[n] || '—'}`));
  console.log('');
});

console.log('-'.repeat(78));
console.log(pad('PREMISE', 15) + pad('WHAT HAPPENS', 38) + pad('N', 3) + pad('fmts', 5) +
  pad('top fmt', 8) + 'grade');
console.log('-'.repeat(78));
['PASS', 'THIN', 'FAIL'].forEach((g) => {
  const set = PREMISE.filter((p) => grade(p) === g);
  if (!set.length) return;
  set.forEach((p) => {
    const mix = howMix(p);
    const top = Object.keys(mix).sort((a, b) => mix[b] - mix[a])[0] || '—';
    console.log(pad(p.nm, 15) + pad(p.v.slice(0, 36), 38) + pad(p.ex.length, 3) +
      pad(spread(p, 'HOW'), 5) + pad(Math.round(conc(p) * 100) + '%', 6) +
      pad(g, 6) + top);
  });
  console.log('');
});

const passing = PREMISE.filter((p) => grade(p) === 'PASS');
const thin = PREMISE.filter((p) => grade(p) === 'THIN');
const failing = PREMISE.filter((p) => grade(p) === 'FAIL');
const tagged = ALL.length - untagged.length;
console.log('-'.repeat(78));
console.log(`${passing.length} premises the bank proves are independent of the format.`);
console.log(`${thin.length} kept but labelled thin — the bank only ever built them one or two ways.`);
console.log(`${failing.length} dropped as the HOW axis renamed:`);
failing.forEach((p) => {
  console.log(`   ${pad(p.nm, 14)} every instance sits at: ` +
    Object.keys(howMix(p)).join(', '));
});
console.log(`\n${tagged} of ${ALL.length} ideas carry a premise (${Math.round(tagged / ALL.length * 100)}%). ` +
  `${untagged.length} do not — run with --untagged.`);

console.log('\nRejected before tagging (they are already controls elsewhere):');
REJECTED.forEach(([nm, why]) => console.log(`  ${pad(nm, 30)} ${why}`));

if (args.includes('--untagged')) {
  console.log('\n' + '='.repeat(78));
  console.log(`${untagged.length} IDEAS WITH NO PREMISE`);
  console.log('='.repeat(78));
  console.log('These are not gaps in the list. Each one IS a four-axis move and nothing more —');
  console.log('change the payer, change the audience, change the format. They are the ideas the');
  console.log('tool already generates perfectly well without a fifth dimension.\n');
  untagged.forEach((n) => {
    const t = TAGS[n];
    console.log(`  #${pad(n, 4)} ${pad(NAME[n], 34)} ${t ? AX.HOW[t[2]] + ' · ' + AX.PAY[t[3]] : ''}`);
  });
}

if (args.includes('--full')) {
  console.log('\n' + '='.repeat(78));
  console.log('EVERY PREMISE, WITH ITS EVIDENCE');
  console.log('='.repeat(78));
  PREMISE.forEach((p) => {
    console.log(`\n${p.nm.toUpperCase()} — ${p.v}`);
    console.log(`  asks: ${p.q}`);
    p.ex.forEach((n) => {
      const t = TAGS[n];
      console.log(`   #${pad(n, 4)} ${pad(NAME[n], 32)} ${t ? pad(AX.HOW[t[2]], 20) : ''}`);
    });
  });
}
console.log('');
