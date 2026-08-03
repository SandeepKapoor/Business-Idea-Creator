# sandeep-idea-map.html — complete context for an AI IDE

Hand this file to Cursor / Windsurf / Copilot / Claude Code alongside the repo.
It contains everything needed to modify the artifact without breaking its logic or its
epistemic guarantees.

**Read §12 (Non-negotiable invariants) before changing anything.** The artifact's whole
value is that it does not present guesses as facts. It is easy to break that by accident.

**Edit `src/`, never `sandeep-idea-map.html`.** That file is build output and gets
overwritten. See §1a for the layout and `README.md` for the workflow.

---

## 1. What this is

A single self-contained HTML file — no dependencies, no network calls, nothing to install
— that helps one person (Sandeep Kapoor, UX designer at Boeing, MSc Strategic Design at
Politecnico di Milano, wants to leave and start a business, wants location-independent
income) decide what business to start.

It is **a business-ideation research artifact plus a deterministic rules engine**. It was
produced by a structured brainstorming method: diverge to 112 ideas across 11 clusters,
then converge through a founder-fit cut, a scorecard with hard gates, and a 2-week
validation sprint.

- **Deliverable**: `sandeep-idea-map.html` — ~2,660 lines, ~202 KB, one `<style>` block,
  one `<script>` block, no external assets. **This file is generated. Do not edit it.**
- **Source**: `src/` — 15 HTML section partials, 11 CSS files, 21 JS files.
- **Build**: `npm run build` (zero dependencies; `build.js` is ~130 lines of plain Node).
- **Verify**: `npm run verify` — 112 checks, ~11s. See §16.
- **Picker**: `npm run picker` — 32 behavioural checks on the axis picker. See §4a.
- **Layout**: `npm run probe` — measures the real layout in headless Chrome. See §13b.
- **Design scan**: `npm run design` — 16 craft checks on the built artifact. See §13a.
- **Plain English**: `npm run plain` — scores every sentence the builder renders. See §10.
- **Premise provenance**: `npm run premise` — how `PREM` was mined out of the 112. See §10.
- **Runs by**: opening the built file in a browser. `open sandeep-idea-map.html`.
- **Audience**: one reader. It is intentionally opinionated and addresses him directly.
- **Language/tone**: British-leaning English, direct, no hedging, no emoji except a few
  UI glyphs (⚙ 📄 🔍 💡 ⚖ ⓘ ★ ⟳ ⚡ ◀ ▶ ▲ ▼ ✓ ✕ !).

The runtime properties are unchanged by the build: the shipped file still has zero
dependencies, zero network calls and no runtime build step. The build exists only so the
source is editable in pieces rather than as one 2,655-line file.

---

## 1a. Repository layout

```
build.js                  src/ → sandeep-idea-map.html. Zero deps. Concatenation, not bundling.
sandeep-idea-map.html     BUILD OUTPUT — the deliverable. Never edit.
CONTEXT.md                this file
README.md                 workflow, file map, known issues
tools/verify.js           112-check harness (§16)
tools/picker.js           axis-picker behaviour: roving tabindex, arrows, aria (§4a)
tools/probe.js            real geometry, measured in headless Chrome (§13b)
tools/design.js           craft-floor mechanics: scales, states, contrast, icons (§13a)
tools/plain.js            sentence-difficulty scan, before/after copy work (§10)
tools/premise.js          premise extraction + orthogonality test (§10)
src/index.html            shell: <head>, section includes, <!--@css--> / <!--@js--> markers
src/sections/*.html       15 partials, one per report section, in document order
src/styles/*.css          11 files, concatenated in filename order
src/js/*.js               21 files, concatenated in filename order
```

**Why concatenation and not a bundler.** The script block is one shared scope, and the
markup uses inline `onclick="gen()"` handlers that resolve against it. ES modules would
scope each file separately and break every one of those handlers. Concatenation preserves
the original semantics exactly — which is how the split was proved correct: the first
build produced a file **byte-identical** to the pre-refactor original
(sha256 `bf3092f6cd047e9dde8da50b3b6da712b0e440c3cdd392071d40b1ea09e3db97`).
`node build.js --no-banner` still reproduces it byte-for-byte.

**File order is load-bearing.** Files concatenate in filename order, which is why every
one carries a two-digit prefix. Some top-level statements run at parse time (the framework
grid in `03-`, the idea bank in `05-`, the picks in `10-`) while other `const`s are still
in their temporal dead zone — see §16 "Gotchas". Renumbering a file is a behavioural
change, not a cosmetic one.

The JS split maps to this document as follows:

| File | §  | Holds |
|---|---|---|
| `00-icons.js` | §13a | `icon(name, mod)` — the only way to draw an icon |
| `01-theme.js` | §13 | `tog()`, `openM()`, `initLift()` |
| `02-axes.js` | §4 §4a | `AX`, `buildPicker`, `syncPicker`, `axKey`, `renderAx`, `pick`, `roll` |
| `03-frameworks.js` | §3 | `FW` + renders the grid at parse time |
| `04-bank.data.js` | §9 | `FAM`, `CL` — all 112 ideas — `FAST` |
| `05-bank.view.js` | §9 | bank render, family/lens chips, `filt()` |
| `06-scorecard.data.js` | §5 §13 | `CRIT`, both ramps, `TAGS`, `HAND`, `SHORTV` |
| `07-candidates.js` | §5 | `ALLC`, `buildAll()` |
| `08-scorecard.view.js` | §14 | filter UI, `syncVal`, `drawHeat` |
| `09-charts.js` | — | `PTS`/`drawScatter`, `G`/`drawGantt` |
| `10-picks.js` | — | `PICK` |
| `11-draw.js` | — | `draw()`, first `renderAx()` |
| `12-attributes.js` | §4 | `MW` `MO` `MH` `MP` |
| `13-pricing.js` | §8 | `HOW_BASE`, `PAY_MULT`, `BASE_EV`, `SCEN`, `priceCheck`, `inr`, `aAn`, `cap` |
| `14-rules.js` | §6 | membership sets, `rules()` |
| `15-scoring.js` | §5 §7 | `CRIT_DEF`, `BANDS`, `HOWTO`, `readRow`, `scoreIt`, `verdict` |
| `16-similarity.js` | — | `nearest()` |
| `17-evidence.js` | §11 | `SEG_EV`, `COMP`, `FIRST`, `MOTION` |
| `18-modes.js` | §2 | `mode()`, `openInBuilder`, `fillSel`, `surprise` |
| `18a-premise.js` | §10 | `PREM`, `premFor`, `premEv` — the fifth dimension |
| `18b-routes.js` | §10 | `ROUTES`, `routesFor`, `routeD` — what the business is about |
| `19-variants.js` | §10 | `ARCH`, `buildVars`, `gen`, `renderVars`, `setPrem`, `premPanel` |
| `20-deep-dive.js` | §11 | `goDeep`, `deepPlan` |
| `99-boot.js` | §16 | the required bottom call order |

### Critical framing
The document mixes three kinds of claim and **must always keep them visually distinct**:

| Kind | Meaning | How it is marked |
|---|---|---|
| Researched | a published figure exists, with a source in the footer | `.eb.src`, `.prov.ok`, "verified" |
| Judgment | the author reasoning, no source | `.eb.jud`, `.prov.judg`, "judgment" |
| Estimate / extrapolation | derived beyond its evidence | `.eb.est`, `.prov.weak`, "my estimate" |

An earlier version of this file was audited and **five substantive claims were found
wrong** (see §11). The correction discipline that came out of that audit is now the most
important property of the artifact.

---

## 2. Three modes / tabs

Mode switching is by `hidden` on `.sec` elements. There are 13 sections:

```
custom  deep  stuck  engine  fw  bank  obs  conv  score  map  sprint  pos  evid
```

`#custom` and `#deep` are mode-owned; the other 11 are the report.

```js
let CURMODE='report';
function mode(m){
  if(m===CURMODE)return;   // no-op switch must not re-scroll or collapse an open <details>
  CURMODE=m;
  // tabR / tabC / tabD get .on
  // #navRow and #srcBlock visible only in report mode
  document.querySelectorAll('.sec').forEach(s=>{
    const own=(s.id==='custom'||s.id==='deep');
    s.hidden = own ? s.id!==m : m!=='report';
  });
  window.scrollTo({top:0,behavior:'smooth'});
}
```

**The early-return matters.** Nav chips call `openM('dStuck')` *and* `mode('report')`.
Without the guard, the mode call would collapse the `<details>` the chip just opened.

| Mode | Tab id | Sections shown | Entry point |
|---|---|---|---|
| `report` | `tabR` | the 11 report sections + nav + sources | default |
| `custom` | `tabC` | `#custom` only | `gen()` |
| `deep` | `tabD` | `#deep` only | `goDeep()` |

---

## 3. Report structure (mode `report`)

| Section | id | Content |
|---|---|---|
| Part 1 · Diagnosis | `stuck` | collapsed `<details class="expand" id="dStuck">`, pill summary, expands to a 1-vs-193,600 comparison |
| Part 2 · The engine | `engine` | interactive 4-column combinator, click cells or Roll |
| Part 3 · Frameworks | `fw` | 15 generators, `FW[]`, 3 marked hero |
| Part 4 · Idea bank | `bank` | 112 ideas in 11 collapsible clusters, filterable |
| Part 5 · Observations | `obs` | 6 structural patterns found while generating |
| Part 6 · Convergence | `conv` | 4-stage funnel + the second-diamond note |
| Part 7 · Scorecard | `score` | all 112 scored, scrollable, filterable, rows clickable |
| Part 8 · Position map | `map` | speed × ceiling scatter, 24 benchmarks |
| Part 9 · Sprint | `sprint` | 14-day gantt, interview rules, kill criteria |
| Part 10 · Position | `pos` | 5 ranked picks, systemic mistake, dead ground, decision tree, next action |
| Appendix · Evidence ledger | `evid` | per-claim-class provenance — **the audit output** |

---

## 4. The four axes (`AX`) — the spine of everything

Every generated artefact keys off four integer indices `[w, o, h, p]`.

```js
const AX = {
  WHO: [ 20 audience strings ],   // index w
  OUT: [ 20 outcome strings  ],   // index o
  HOW: [ 22 format strings   ],   // index h
  PAY: [ 22 payer strings    ]    // index p
};
// 20 × 20 × 22 × 22 = 193,600 combinations. This number appears in copy — keep it correct.
```

### Index reference — memorise or look up before editing

**WHO (w, 0–19)**
```
0 career switchers        5 heads of design       10 corporate L&D buyers   15 recruiters
1 junior designers        6 agency owners         11 enterprise/GCC teams   16 other educators
2 mid-level designers     7 engineers who design  12 design students        17 tier-2/3 learners
3 senior ICs              8 product managers      13 parents of aspirants   18 global-remote seekers
4 new design managers     9 non-design founders   14 design faculty         19 EU/US studios
```

**OUT (o, 0–19)**
```
0 get hired          5 survive AI        10 sell design internally  15 choose direction
1 hired abroad       6 build portfolio   11 ship faster             16 get into design school
2 get promoted       7 write case study  12 prove design ROI        17 meet compliance deadline
3 raise salary       8 pass interviews   13 find peers              18 hire good designers
4 switch specialism  9 lead a team       14 get freelance clients   19 leave design
```

**HOW (h, 0–21)**
```
0 live cohort       6 newsletter    12 awards/competition  18 done-for-you service
1 self-paced        7 podcast       13 card deck / book    19 advisory retainer
2 1:1 coaching      8 short video   14 template / kit      20 job board / marketplace
3 mastermind        9 workshop      15 directory           21 study tour
4 async critique   10 retreat       16 software tool
5 membership       11 live show     17 assessment/cert
```

**PAY (p, 0–21)**
```
0 learner upfront    6 income share      12 licence to educators  18 parents
1 learner EMI        7 brand sponsor     13 certification fee     19 recruiter/platform
2 learner subs       8 tool vendor       14 monthly retainer      20 marketplace take-rate
3 employer L&D       9 ads/affiliate     15 equity                21 expert-network hourly
4 employer placement 10 ticket sales     16 gov/CSR grant
5 % of salary raise  11 entry fees       17 university/institution
```

### Attribute tables — index-aligned with the above

```js
// MW[w] = [access, fit, budget, volume, shortLabel, painSentence]
//   access  1-5  how easily Sandeep reaches them   ← GUESS about him
//   fit     1-5  his credibility with them          ← GUESS about him
//   budget  1-5  their budget authority
//   volume  1-5  market size
// MO[o] = [urgency, wtp, measurable, sandeepFit, tag, proofArtefact]
// MH[h] = [effort, speed, locIndep, scale, youAreProduct, energy, tag, mechanicSentence]
//   effort 1-5 build weight · youAreProduct 0|1 · energy = what the format demands
// MP[p] = [price, speedToCash, ceiling, recurring, defensibility, pitchSentence]
```

`shortLabel`, `tag`, `painSentence`, `mechanicSentence`, `pitchSentence`,
`proofArtefact` are **hand-written prose** used to compose output. They are what stop the
generated text reading like madlibs. Preserve their voice if you add rows.

---

## 5. Scoring engine (`scoreIt`) — exact formula

Returns 8 ordinal scores, each clamped to 1–5. **Do not change these weights without
re-running the band calibration in §7.**

```js
function scoreIt(w,o,h,p){
  const cl=v=>Math.max(1,Math.min(5,Math.round(v)));

  // 1 WILLINGNESS TO PAY  (hard gate)
  let wtp=cl((MO[o][1]+MP[p][0]+MW[w][2])/3);
  if(CONTENT.includes(h)&&[0,1,2,3,4].includes(p)) wtp=Math.min(wtp,2); // content isn't a purchase
  if(EMPLOYER.includes(p)&&NO_EMPLOYER.includes(w)) wtp=1;              // no employer exists
  if(p===18&&!KIDS.includes(w)) wtp=1;                                  // parents don't pay for adults

  // 2 DISTRIBUTION  (hard gate)
  let dist=cl(MW[w][0]+(CONTENT.includes(h)?0.5:0)-(h===20?1:0));
  if(p===13) dist=Math.min(dist, MW[w][0]>=4?2:1);   // certification needs prior trust

  const fit  = cl((MW[w][1]*2 + MO[o][3])/3);
  const spd  = cl(Math.min(MH[h][1], MP[p][1]) + 0.35);   // the slower of format and payer
  const ceil = cl((MP[p][2] + MH[h][3] + MW[w][3])/3);
  const def  = cl((MP[p][4] + MW[w][1] + MH[h][0]*0.6)/2.6);
  const loc  = MH[h][2];                                   // passthrough
  const en   = cl((MH[h][5]*2 + MO[o][3])/3);

  return [wtp,dist,fit,spd,ceil,def,loc,en];
}
```

Criterion order is fixed and referenced by index everywhere:

```
0 Willingness to pay  [GATE]     4 Revenue ceiling
1 Distribution you have [GATE]   5 Defensibility
2 Founder fit                    6 Works anywhere
3 Speed to first ₹               7 Your energy for it
```

### Which criteria are guesses about the user, not the market

```js
const CRIT_GUESS=[0,1,1,0,0,0,0,1];   // distribution, founder fit, energy
```

These get a purple `GUESS` badge and an explanation in `HOWTO()`. **This must survive any
refactor.** The engine knows two facts about Sandeep — Boeing, Politecnico di Milano —
and infers the rest.

### Membership sets used by the rules

```js
const EMPLOYER   = [3,4];               // payer indices that are an employer
const LEARNER    = [0,1,2];
const NO_EMPLOYER= [0,12,13,17];        // WHO with no employer to invoice
const KIDS       = [0,12,13];           // WHO a parent would pay for
const ORG_BUYER  = [5,6,10,11,14,15,16,19];
const CONTENT    = [6,7,8,15];          // HOW that are top-of-funnel, not purchases
const TRAVEL     = [9,10,11,21];        // HOW that break location independence
const RECUR_H    = [5,6,15,16,19];      // HOW billed monthly
```

---

## 6. Conflict & synergy rules (`rules(w,o,h,p)`)

Returns an array of flag objects `{t, ic, tt, tx}` where `t ∈ {bad, warn, ok}`.
Flags are **axis-level**: they apply to every variant of a combination. The UI says so.

`bad` flags (structural contradictions):
1. employer payer + WHO with no employer
2. `p===18` (parents) + WHO who is a working adult
3. salary-linked payer (5, 6) + an organisational WHO
4. `p===21` (expert network) + a HOW that is not 1:1 or retainer

`warn` flags:
5. certification fee + low access → needs trust first
6. any TRAVEL format → breaks the stated location-independence goal
7. CONTENT format + upfront/employer payer → content is not a purchase
8. ORG_BUYER + learner-pays → found the budget then billed the individual
9. `p===9` ads/affiliate → caps early
10. `o===13` belonging + high price → community is hard to price high

`ok` flags (synergies): GCC + employer payer; location-proof + fast-to-cash;
outcome-fit + audience-credibility both high; not-you-as-product.

---

## 7. Verdicts (`verdict(S,F)`) — percentile-anchored

Order of evaluation matters:

```
1. gate failure   S[0]===1 || S[1]===1        → DEAD — GATE FAILURE
2. any bad flag                               → STRUCTURALLY BROKEN
3. S[0] <= 2                                  → ASSET, NOT REVENUE
4. total >= 32                                → BUILD — TEST THIS
5. total >= 29                                → WORTH TESTING
6. otherwise                                  → WEAK — KEEP ROLLING
```

**The 32 and 29 are measured, not chosen.** All 193,600 combinations were scored; after
removing gate failures (10.2%), broken combinations (7.7%) and asset-only cases (11.0%),
the remaining 71.1% have totals distributed:

```
min 17 · p25 25 · median 27 · p75 29 · p90 31 · p96 32 · max 37
```

So `BUILD ≥ 32` is the top ~4% and `WORTH TESTING ≥ 29` is the top quartile.
Resulting share of all combinations: **build 3.8% · test 20.9% · weak 48.6%**.

> If you change `scoreIt`, `MW/MO/MH/MP`, or add axis values, **you must re-measure the
> distribution and update both thresholds and the copy that quotes them.** Copy quoting
> these numbers appears in: `verdict()` strings, `BANDS`, `readRow()`, `HOWTO()`, and the
> Evidence ledger. A stale percentile claim is a hallucination.

---

## 8. Pricing model — the most audited part of the file

```js
core  = HOW_BASE[h] * PAY_MULT[p] * (0.85 + MW[w][2]*0.06)
core  = max(500, round(core/500)*500)
// variant multiplier applied in buildVars: core *= ARCH[i].pm
entryFactor = core>=500000 ? 0.08 : core>=100000 ? 0.2 : 0.4
entry = max(500, round(core*entryFactor/500)*500)
prem  = round(core*2.6/500)*500
recur = RECUR_H.includes(h) || p===2
units = recur ? ceil(target/core) : ceil(target*12/core)
```

```js
const HOW_BASE=[45000,4000,6000,150000,2500,1500,500,400,300,30000,45000,1200,
                3500,2500,3500,900,1500,12000,50000,60000,2500,180000];
const PAY_MULT=[1,1,1,4,5,3,2.5,3,4,0.4,1,1.2,5,1.5,3.5,0.5,6,5,2,4,1,6];
const BASE_EV =[1,1,1,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0];  // 1 = published figure exists
```

**`HOW_BASE` semantics**: the retail price of that format to an *individual Indian buyer*.
`PAY_MULT` then scales for who actually pays. `BASE_EV` records which of the 22 have a
published anchor — **9 of 22 do.**

### Researched anchors (do not "improve" these without a source)

| h | Format | Base | Evidence |
|---|---|---|---|
| 0 | cohort | 45,000 | Indian UI/UX bootcamps ₹10k–1.5L; GrowthSchool ₹50–70k |
| 1 | self-paced | 4,000 | Udemy India ₹500–3,000 → ₹10k bootcamp floor |
| 2 | 1:1 90min | 6,000 | freelance UX India ₹1,500–4,000/hr |
| 4 | critique | 2,500 | ~40 min of senior time, same band |
| 5 | membership/mo | 1,500 | global paid communities avg $48, niche $29–49; India discount |
| 9 | workshop/day | 30,000 | specialist corporate training India ₹30,000–1.5L per day |
| 18 | done-for-you | 50,000 | study-abroad packages ₹30k–1.5L |
| 19 | retainer/mo | 60,000 | fractional CXO India: CMO ₹1.5–4L growth-stage |

`PAY_MULT` is **judgment throughout** (a 3–5× B2B heuristic), except index 21 where
published expert-network pay bands ($400–600/hr mid-level) forced it down from 8 to 6.

### `SCEN` + `priceCheck(h,p,core)` — the extrapolation detector

`SCEN` holds 9 published price bands for specific *(format, payer)* pairs.
`priceCheck` returns one of three states, rendered as a `.prov` chip in Part 9:

```
ok    core is within [lo*0.8, hi*1.25] of a published band → names the band and source
weak  core is outside the band                            → "extrapolation, not a market figure"
weak  no band exists for this pair                        → "my estimate"
```

Measured coverage across 73,150 generated prices:
**4.6% inside an evidenced band · 0.6% flagged extrapolation · 94.8% labelled estimate.**
Zero silent guesses, by construction.

> This is the artifact's central anti-hallucination mechanism. Never print a price
> without its `priceCheck` chip.

---

## 9. The 112-idea bank

```js
const CL = [ /* 11 cluster objects */ ];
// cluster = { L:'A'..'K', f:1..5 family, t:title, w:whatItDoes, q:promptQuestion,
//             i:[ [n, name, descriptionHTML, someoneElsePays01, notYouAsProduct01], ... ] }
```

Cluster quotas — **continuous numbering 1..112, no gaps, no duplicates**:

```
A Sharpened core            10   ideas 1–10
B Value-chain adjacency     12   11–22
C Segment shift             12   23–34
D Format & experience shift 12   35–46
E Business-model shift      10   47–56
F Picks & shovels           10   57–66
G Audience-first             8   67–74
H Geo/language/regulatory   10   75–84
I Newly possible            10   85–94
J Contrarian / bad-idea     12   95–106
K Anti-scale                 6   107–112
```

Quality quotas that must hold: **≥8 ideas where someone other than the end user pays**
(actual: 61) and **≥10 where the user is not the product** (actual: 44).

### Five colour families (`FAM`) — validated palette

```
1 Career outcomes for designers   (A,B)      --f1 blue
2 Someone else pays               (C,E)      --f2 orange
3 Sell to the market              (F,I)      --f3 aqua
4 Format & audience               (D,G)      --f4 violet
5 Edges: geo, contrarian, anti-scale (H,J,K) --f5 red
```

Validated with the dataviz palette validator: all 5 pass CVD separation, chroma floor,
lightness band and 3:1 contrast in **both** modes. Family colour never carries meaning
alone — every chip also has a letter label.

### `TAGS` — axis position of every idea

```js
const TAGS=[null, [w,o,h,p], ... ];   // index = idea number, 1..112
```

This is what lets one engine serve both the bank and the builder. **Editing a TAGS row
changes that idea's score, price, variants and deep-dive plan.** They are the author's
reading of each idea, not measurements.

### `HAND` — judgment overrides

```js
const HAND={23:[...],85:[...],2:[...],78:[...],67:[...],34:[...],52:[...],37:[...]};
```

8 ideas carry hand-argued scores that **override the engine**, because the prose in
Part 7 and Part 10 makes specific claims about them (e.g. "#37 scores 1 on willingness to
pay", "#52 scores 1 on distribution"). Rows get a `HAND-SCORED` badge; the other 104 get
`DERIVED SCORE`.

Verdict spread across the 112: **build 10 · test 38 · asset 19 · weak 43 · gate 2.**

Where engine and judgment disagree is documented in the Evidence ledger:
- #78 — my 5th-ranked pick, engine says 28/WEAK
- #37 — engine says 26, hand score 21 with a gate failure

`buildAll()` composes `ALLC` (the flat scored list) from `CL` + `TAGS` + `HAND`,
sorted by total descending then by number.

---

## 10. Mode `custom` — Build my own idea

Flow: 4 `<select>` → `gen()` → `buildVars()` → `renderVars()`.

```js
let VARS=[], VIDX=0, PREMS=[], PIDX=0, AXS=[w,o,h,p], LASTKEY='', VI=false, PI=false;
// VIDX and PIDX both reset to 0 only when the axis combination changes (LASTKEY guard)
// VI / PI = whether the angle / premise ⓘ explainer is expanded
```

**An idea is PREMISE × ANGLE on top of the four axes.** The axes fix the shape, the premise
fixes what happens inside, the angle changes one structural thing about how it is built.
`buildVars(w,o,h,p,P)` sums the premise deltas and the angle deltas and clamps **once** —
clamping twice would let a premise that pushes a criterion to 5 swallow an angle's +1 and
hide the trade-off. Prices multiply: `core *= P.pm * a.pm`.

### Twists (`ARCH`) — 7 ways to build the same idea

**The UI says "work" and "twist"; the code says `PREM` and `ARCH`.** "Premise" and "angle"
were jargon — the user could not read the page. The identifiers were left alone deliberately:
renaming them buys nothing and costs a diff nobody can review. When you add UI copy, use the
user's words.


Same four axes, different way to build it. Each has score deltas and a price multiplier.

| key | name | price × | score deltas (8) | availability |
|---|---|---|---|---|
| wedge | Wedge | 1.3 | `[1,1,1,1,-1,1,0,0]` | always |
| proof | Proof engine | 1.0 | `[1,0,0,1,0,0,0,-1]` | always |
| flagship | Flagship | 3.0 | `[-1,-1,1,-1,2,1,0,0]` | always |
| container | Container only | 0.7 | `[0,0,-1,2,-1,-1,1,1]` | `h ∈ [0,1,3,5]` |
| ladder | Ladder | 0.35 | `[-1,2,0,1,1,-1,0,-1]` | `h ∉ [19,21]` |
| anti | Contrarian | 1.6 | `[-1,1,1,1,-1,2,0,1]` | always |
| synd | Syndicate | 0.9 | `[0,-1,-1,-2,2,1,1,-1]` | `h ≠ 21` |

So **4 to 7 variants** per combination. Average spread between best and worst variant:
**5.0 points of 40** — enough that verdicts flip (a Flagship can be DEAD while the Wedge
is BUILD).

Each archetype also carries prose: `an()` the angle, `gv` what it trades away,
`kl()` an angle-specific kill criterion, `ts` what to test first, `w1` a one-word tag and
`lem` the lemonade-stand parallel.

**Directions are defensible; magnitudes are judgment.** The `.prov.judg` chip in the ⓘ
panel says exactly that. Keep it.

### Routes (`ROUTES`, `18b-routes.js`) — what the business is ABOUT

The axes fix the shape, the work fixes what you do all day, the twist changes one structural
thing. **None of them says what the thing is about**, and that is what separates two genuinely
different businesses at one combination. The work/twist matrix produces variations of one idea;
this produces different ideas.

**A route is a sub-problem of the OUTCOME.** "Get hired abroad" is not one problem, it is five:
the portfolio they expect, their interview loop, what the job pays in their currency, the
paperwork, and going freelance across the border first. 81 routes across the 20 outcomes, 4–5
each. Because they come off the outcome alone, they hold for all 193,600 combinations — nothing
filters them by format the way `premFor()` filters the kinds of work.

Rendered as a **list under the statement, before the navigator** — it is the first choice you
make. Picking one names the business (the route's name beats both the work's and the twist's for
the card title), leads the card, and applies its score deltas. `RIDX = -1` is the default, so the
page scores exactly as it did before routes existed.

`d` is a sparse `{criterionIndex: delta}`. Route, work and twist all land on the same eight
numbers and are **clamped once, together** — clamping in stages hides trade-offs.

**This is the weakest-sourced dimension on the page and the UI says so.** Unlike `PREM`, there
are no bank receipts: these are my reading of what each outcome breaks into. That is the same
class of claim as the 112 ideas themselves. No route names a competitor, a market size, or a
relationship Sandeep has — the reason Access was the one premise I would not generate subjects
for still holds, and no route invents a room he can get into.

verify.js enforces: one list per outcome; at least four per outcome; unique names and premises
within an outcome; well-formed deltas in range; at least three distinct score effects per outcome
(four routes that score alike are four names for one idea); and **no route claims to move more
than three of the eight criteria** — a route with a delta everywhere is a guess, not a reason.

### The four facts

The idea card's four facts — who it is for, what they leave with, how it runs, how you get paid —
come straight off the axes (`MW[w][5]`, `MO[o][5]`, `MH[h][7]`, `MP[p][5]`). By construction that
made them **identical for every twist and every kind of work at one combination**: seven different
businesses, one fact block.

They are not actually the same. Container only changes how it runs; Flagship changes how you get
paid; Wedge narrows who it is for; Teardown changes what they leave with and rules out anyone with
no work to take apart.

So every twist and every kind of work declares an `f:{who,out,run,pay}` — **only the keys it
genuinely changes.** The card prints the axis base, then the work's modifier, then the twist's,
each attributed and tinted (work `--f2`, twist `--f1`) so it is always clear which of the two
moved it.

**Do not pad `f` to make a card look busier.** Container only really does not change who pays, and
claiming otherwise is the fabrication the rest of this engine refuses. A modifier that opens by
restating the outcome is also waste — the base sentence is directly above it.

verify.js enforces: every twist and work changes at least one fact; every kind of work changes at
least three; no two ideas at one combination render the same card; and the fact block alone
differs for every twist at a given work.

### Kinds of work (`PREM`, `18a-premise.js`) — 7 things that can happen inside

The four axes and the seven angles both leave the *premise* free, and that is why one
combination used to render as a single idea. Proof it is a real variable: 112 bank ideas
occupy only 106 combinations, and #36 *The Roast* and #99 *Design Court* share all four axes.

| key | name | word | price × | score deltas (8) | availability |
|---|---|---|---|---|---|
| none | Not chosen | — | 1.0 | `[0,0,0,0,0,0,0,0]` | always |
| teardown | Teardown | BREAK | 0.8 | `[0,1,0,2,-1,0,0,1]` | 14 formats |
| record | The record | TRUTH | 0.5 | `[-1,2,0,-2,1,2,0,0]` | 9 formats |
| drill | Drill | REPS | 1.0 | `[1,0,0,1,0,-1,0,-1]` | 12 formats |
| diagnose | Diagnosis | JUDGE | 1.4 | `[1,-1,0,-1,1,2,0,0]` | 10 formats |
| translate | Translation | CARRY | 1.2 | `[0,0,2,0,0,1,0,0]` | 10 formats |
| artefact | The object | OBJECT | 1.3 | `[1,0,0,0,-1,0,0,-1]` | 9 formats, `MO[o][2]>=3` |
| door | Access | ROOM | 1.6 | `[0,1,2,-1,0,2,-1,0]` | 9 formats |

`PREM[0]` is **inert by construction** — zero deltas, ×1 price — so the default state of the
page scores and prices exactly as it did before this dimension existed. verify.js asserts it.

So **2 to 7 premises × 4 to 7 angles = 12 to 42 ideas** per combination; 5,045,920 across
the whole space. Artefact is the only premise gated on the OUTCOME: "they leave holding one
finished thing" is unsayable about Belonging or Clarity.

**Provenance is stricter here than anywhere else in the engine**, because a premise claims a
*kind of business exists*, not just a way of building one:

- `ev` — the bank ideas that already are this premise. Rendered as clickable receipts.
- `ob` — formats the bank has **built** it at. **Fully derivable from `ev` + `TAGS`, and
  verify.js recomputes it.** Never hand-edit `ob` to include a format you wish were there.
- `xt` — formats it is judged to transfer to. Rendered with a `J` chip and the words
  "my judgement is that it transfers — that judgement is not evidence."

The list was mined from the 112, not invented: `npm run premise`. A premise had to appear
across ≥3 formats with no single format over 60% of it, or it was cut as the HOW axis under
a new name. That killed *Contest*, *Matchmaking* and *Frontier*; *Instrument* and
*Done-for-them* were cut on judgement, their dominant format being the premise's own name.

**Deliberately not modelled: the SUBJECT.** #46 *Studio Tour* and #72 *How They Design* share
the Access premise and differ only in which doors get opened. Generating those would mean
inventing rooms Sandeep can get into. Do not add it.

### The copy standard

`npm run plain` renders the builder for five combinations, splits everything on screen into
sentences, and scores each one: words, plus a penalty for abstract business register and for
every clause after the first. It is deliberately not Flesch-Kincaid — that rewards short words
and would push this page toward clipped fragments. What matters is one idea per sentence.

Current: **2,254 sentences, median 9 words, p90 16, longest 29.** Baseline before the copy pass
had ~2,000 hard-word hits across 14 terms; it is now 10 across 8. If a change pushes the median
or p90 up, the copy got worse.

Two rules that came out of that pass and are worth keeping:

- **Column labels are sentence fragments.** `CRIT2` is not only table headers — `readRow()`
  drops the strings into running prose ("the best you have is *how big it can get* at 4"), so
  every one has to be a plain noun phrase. A question mark there is broken English; verify.js
  checks for it.
- **Say it in the user's words, not the model's.** "Premise", "angle", "defensibility",
  "willingness to pay", "distribution", "revenue ceiling", "top quartile", "provenance",
  "acquisition" and "standing members" all left the interface. The concepts did not.

### What `renderVars()` emits, in order

1. origin banner (if launched from the bank) — includes a 3-line "what it is as a business"
2. statement sentence
3. two-row navigator `#vnav` (premise, then angle) + both ⓘ explainers
4. idea card — premise leads, angle follows, then facts, costs, one-line pitch
5. axis-level flags
6. Part 6 — four stages (founder-fit answers labelled as *the engine's guesses*)
7. Part 7 — **all angles** at the current premise, click to switch
8. Part 7b — **all premises** at the current angle, with `J` chips and prices
9. Part 8 — all angles plotted; filled = active, hollow rings = siblings
10. Part 9 — pricing ladder + `priceCheck` chip + break-even arithmetic
11. closest ideas in the bank (`nearest`, requires ≥2 keyword hits)
12. Part 10 — the full business case, at `P.pm * a.pm`

`openInBuilder(n)` loads bank idea `n`: sets the 4 selects from `TAGS[n]`, sets `ORIGIN`,
switches mode, generates. The banner clears the moment any dropdown differs from
`TAGS[ORIGIN]`.




---

## 13b. Measuring the layout

**`npm run probe` renders the artifact in headless Chrome and measures it.** Zero dependencies:
it drives whatever Chrome is installed via `--headless --dump-dom`, having appended a measuring
script to a *copy* of the artifact that writes its findings into a `<pre>`. No CDP client.

It exists because **three harnesses passed while the page was visibly broken.** verify.js proves
the engine is right, design.js proves the CSS obeys the scales, picker.js proves the controls
behave — and not one of them lays anything out.

It asserts, for all three score tables and at any `--width`:

- every `<tr>` computes to `display:table-row` and every `<td>` to `table-cell`
- each header cell shares an x and a width with the body cell beneath it
- the eight score cells are equal width and at least 28px
- the label column is not crushed, and no cell content spills past its column

`--report` prints the measured geometry, `--shot out.png` saves a screenshot. Note that
`--screenshot` renders at scroll 0, so to capture something below the fold you must move the
content (negative `margin-top`), not the viewport.

### The bug it found

Part 7 laid out with its header row and body row in different horizontal bands. Two rounds of
work went into the colgroup and `table-layout:fixed` — **and the colgroup was never the problem.**
The probe's first run said it in one line:

```
Part 7:   "tr":"flex",      "td":"block"
heatmap:  "tr":"table-row", "td":"table-cell"
```

`.vrow` was **both** the two-row navigator's flex row and the score tables' clickable `<tr>`.
`.vrow{display:flex}`, written for the div, matched the rows too — and a flex row shrink-wraps
its children and takes no part in the table's column model. The `<thead>` had no such class, so
it laid out on the colgroup while the `<tbody>` collapsed to the width of a numeral.

**Never name a class that lands on both a `<div>` and a `<tr>`.** design.js now checks for it
statically, the probe checks the computed display, and both were verified by reintroducing the
bug on purpose.

---

## 4a. The axis picker

One component, two hosts: the report's engine (`#engPick`) and the workspace (`#wPick`).
`buildPicker(hostId, prefix, handler)` writes it once; `syncPicker(prefix, state, scroll)`
repaints the selection without rebuilding, so a column keeps its scroll position when you click
in it.

**The workspace used four `<select>` elements.** A select hides nineteen of twenty options behind
a click, which is exactly the space this page exists to show you — and two different controls for
one job is the inconsistency `operate.md` warns about.

**A `<select>` is a browser control; twenty divs are not.** Keyboard, selection semantics and
screen-reader behaviour came free before and now have to be built:

- each column is `role="radiogroup"` with a roving tabindex — one stop per column
- arrows move *and* select (standard radio behaviour), Home/End jump to the ends
- `aria-checked` tracks `.on`, and the group is `aria-labelledby` its own head
- setting state from outside (`openInBuilder`, `surprise`) scrolls the selection into view: in a
  20-row scroller a selection you cannot see has not been made

`tools/picker.js` tests all of that against a small real DOM — it parses `innerHTML`, which the
fold harness never needed. 32 checks, in `npm run check`.

### State

`AXPICK` in `18-modes.js` is the single source of truth; `gen()` reads it. It used to be the DOM.
**Named AXPICK because `10-picks.js` already declares `const PICK`** and build.js concatenates
every file into one scope, so the clash was a boot-time throw that blanked the page. verify.js
now checks for duplicate top-level names across the whole script.

Clicking an axis regenerates only when something has already been generated (`if(LAST)gen(1)`) —
the same rule the income-target field follows, so the panel behaves one way.

---

## 13a. The design system

`npm run design` is the mechanical half of what the impeccable skill calls for. Its own
`detect.mjs` is not installed (it wants PRODUCT.md / DESIGN.md scaffolding), so tools/design.js
implements the same checks against craft-floor's rules and this project's tokens. **It runs
inside `npm run check`.** What it proves: scales, banned devices, contrast, states, icon
integrity. What it cannot prove, in craft-floor's own words: "hierarchy or rhythm".

### Tokens (`01-tokens.css`)

Before this file the stylesheet carried **97 off-scale spacing values, 10 font sizes including
three half-pixel ones, and 7 radii**. That is not a system.

| Scale | Values |
|---|---|
| space | `--sp-0..10` = 2 4 8 12 16 20 24 32 40 56 80 |
| type | `--t-2xs..3xl` = 11 12 13 15 16 18 21 26 32 |
| radius | `--r-xs/sm/md/lg/full` = 3 6 10 14 999 |
| elevation | `--e-1/2/3` — offset + soft blur, never a zero-offset halo |
| motion | `--dur-1/2/3` = 120/180/260ms, `--ease` |

Add a value to a scale before using it. The scan fails on anything off-ramp.

### What was removed, and why

- **The coloured `border-left`.** Sixteen instances across seven components — the same device
  reused until it meant nothing. craft-floor refuses it by name. Replaced *by kind*: a callout
  with a state gets a tint wash and a 1px tinted border; an aside inside prose gets a 1px neutral
  rule with the colour moved to its label; a structural container gets no rule at all.
- **Unicode glyphs as icons.** ▶ ▼ ◀ ⓘ ★ ✓ ✕ ⚡ ⟳ ▸ 💡 ⚙ ⚖ ◐ 📄 — fifteen fonts' idea of an icon.
  Now one authored sprite (`sections/00-icons.html`), 1.5 stroke on a 16 grid, drawn only through
  `icon()`. The scan checks both directions: no dangling `<use>`, no unused symbol.
- **The h2 eyebrow.** `h2` rendered at 14px grey *above* a 22px `h3` — craft-floor's one outright
  ban. `h2` is now the section heading and the `h3` beneath it is a deck. This also made the open
  and collapsed states agree, which they never did.
- **Eight button shapes** (`.rollbtn .tab .chip .vpill .wtab .themebtn .foldall .nav a`) at four
  heights and five radii. One geometry now, differing only by role: filled primary, outline
  secondary, toggle pill, segmented switch.

### Contrast

Every ink/surface pair and all ten score-cell pairs are measured, not chosen. `--ink-3` was
`#898781`, failing AA on `--raise` (4.38:1) and on the whole light theme (3.18:1). Score-cell
step 3 cleared neither white nor black ink and had been failing since the ramp was written.
Both fixed and both are hard gates now.

**Only move step 3 of the light ramp.** Steps 1 and 2 are load-bearing for a second invariant —
the lightest cell must stay separable from the card surface — and lightening them broke it.

### Score tables

Three tables share one grid — the bank heatmap, Part 7 (twists), Part 7b (kinds of work):
`label · 8 scores · 1–2 numbers · sometimes a verdict`. All three declare it through
`scols(tail)` in `06-scorecard.data.js` and carry `class="stab"`, which is `table-layout:fixed`.

**Auto layout cannot do this job.** The eight criteria are equal in meaning and must be equal in
width, but their labels are wildly unequal in length — "Works anywhere" against "How soon you get
paid". Auto layout sized each column by its header text, collapsed the numeral cells to ~14px,
and handed the slack to the label column, which has `white-space:nowrap` and took all of it. The
header row and the body rows ended up in different horizontal bands. This appeared the moment the
criteria were renamed to plain English, because the old labels happened to be short.

Part 7b also dropped its "What you do" column — a full sentence in a twelfth column at 960px is
hopeless. The sentence sits under the name in the label cell instead.

`npm run design` boots the artifact, renders all three, and fails if any colgroup, header row and
body row disagree. Verified by breaking one on purpose.

### Two harness lessons

INVARIANT 4 and INVARIANT 10 both pinned **literal strings** (criterion names, ramp hex values).
A copy rewrite and a measured contrast fix each failed an invariant they had not violated. Both
now assert the *property* — which indices are guesses, which pairs clear AA. **Pin behaviour, not
spelling.**

---

## 11. Mode `deep` — Go deep on an idea

`goDeep()` validates 1–112 then calls `deepPlan(n)`. Ten numbered sections:

```
01 Thesis                 uses the hand-written description + composed axis prose
02 Buyer map              user / payer / signer / budget authority / motion / cycle
03 Market size            SEG_EV lookup — verified pool + capture sensitivity, OR a blank
04 Competition            COMP lookup — verified names, OR a search query
05 Pricing                ladder + priceCheck + unit economics
06 Riskiest assumption    from the lowest score; diffuse path when min>=3
07 Execution              days 1–14 / 15–30 / 31–60 / 61–90
08 Success ladder         month 3 / 6 / 12 — working vs not working
09 Kill criteria          numeric, from the user's own target
10 What this plan knows   per-claim provenance + "X of 4 sourced"
```

### `SEG_EV[w]` — market anchor per audience

`{v:0|1, pool:number|null, txt:string}`. **6 of 20 segments verified:**

```
WHO  7  engineers who design   pool 1,900,000   GCC workforce
WHO 10  corporate L&D buyers   pool 2,000       GCC count as buyer proxy
WHO 11  enterprise/GCC teams   pool 2,000       best-measured segment in the bank
WHO 12  design students        pool 16,601      UCEED 2025 registrations
WHO 13  parents of aspirants   pool 16,601      same, as payer proxy
WHO 18  global-remote seekers  pool null        rate gap verified, population not
```

When `v===1 && pool`, section 03 prints a **capture sensitivity table** at 0.5 / 1 / 3 / 5%
— explicitly labelling the pool as verified and the capture rates as illustrative.
When `v===0`, it **refuses to state a total** and instead surfaces `units` (customers
needed to hit the user's target), which is answerable in 20 interviews.

### `COMP` — verified competitors only

9 entries matched by `(h, p, w)`. If no entry matches, section 04 prints a warning and
`searchFor(h,p,w)` — the actual query to run — instead of a plausible-sounding name.

Coverage across the 112 plans: **20% verified market anchor · 52% named competitors ·
34% with 3-or-more of 4 checkable claims sourced.** Section 10 prints that per plan and
tells the reader what to do about a weak score.

### `FIRST[h]` and `MOTION[p]`

- `FIRST[22]` — the smallest sellable artefact per format ("a dated six-week syllabus on
  one page, eight seats, and a working payment link").
- `MOTION[22]` — `[salesMotionSentence, cycleLength]` per payer ("4–12 weeks" for employer
  L&D). Both feed the 90-day plan and make it non-generic.

### Section 06 special case

If `min(S) >= 3` there is no weak axis, so naming one as "the riskiest assumption" would
overstate. The plan switches to a *diffuse* framing: "no single axis is weak … the binding
risk is demand you have not tested" and sends the reader to the money test.
**This branch exists because a bug once told the user "will anyone pay at all" about a
market where parents verifiably spend ₹30k–1.5L. Do not remove it.**

---

## 12. Non-negotiable invariants

Anything here, if broken, turns the artifact back into something that sounds confident and
isn't. Treat these as tests.

1. **Never print a generated price without its `priceCheck` provenance chip.**
2. **Never invent a market size.** No `SEG_EV` entry ⇒ section 03 leaves the top line blank.
3. **Never invent a competitor name.** No `COMP` match ⇒ print the search query.
4. **Keep `CRIT_GUESS` visible.** Distribution, founder fit and energy are guesses about
   the user and must be badged as such.
5. **Never describe engine output as the user's own answers.** Part 6 Stage 1 must say the
   five answers are inferred.
6. **Percentile claims must match the data.** If scoring changes, re-measure and update
   every place that quotes 32 / 29 / p96 / p75 / 3.8% / 193,600.
7. **`HAND` overrides win, and say they win.** Where the engine differs, the banner
   discloses both numbers and tells the reader to trust the argued one.
8. **Vendor statistics must be marked as vendor statistics.** Specifically: the
   "85–95% cohort completion" figure is from companies selling cohort software and their
   own numbers disagree (one reports 64.2% vs 48.2%). The defensible version is
   median 12.6% across 221 MOOCs, MIT 3.13%, Harvard 3.4× dropout without accountability.
9. **Continuous idea numbering 1..112**, no gaps or duplicates.
10. **Ordinal colour ramps stay validated per mode** — see §13.
11. **Corrections are made in place, not silently deleted.** When a claim was wrong, the
    text says it was wrong. That is why the reader can trust the rest.

---

## 13. Design-system constraints

Palette follows a documented, validated system. **Colour is computable — compute it.**

```js
// Ordinal 1–5 score ramp. TWO selected ramps, not an auto-flip.
const RAMP_L=["#86b6ef","#5598e7","#2a78d6","#1c5cab","#104281"];  // light: value ↑ = darker
const INK_L =["#0b0b0b","#0b0b0b","#ffffff","#ffffff","#ffffff"];
const RAMP_D=["#184f95","#256abf","#3987e5","#6da7ec","#9ec5f4"];  // dark: value ↑ = lighter
const INK_D =["#ffffff","#ffffff","#ffffff","#0b0b0b","#0b0b0b"];
const isDark=()=>document.documentElement.dataset.theme!=='light';
const ramp =()=>isDark()?RAMP_D:RAMP_L;
const rink =()=>isDark()?INK_D:INK_L;
```

Both pass the ordinal validator in their own mode (monotone lightness, ≥0.06 ΔL adjacent
gaps, light end ≥2:1 against its own surface, single hue).

**A previous single-ramp version started at `#cde2fb` — 1.29:1 on the light surface, a
FAIL — and was flipped for dark mode. Do not reintroduce that.**

Other rules in force:
- Categorical hues assigned in fixed order, never cycled. 5 families, 5 fixed slots.
- No dual-axis charts anywhere.
- Sequential = one hue light→dark. Diverging = two hues + neutral grey midpoint.
- Identity never by colour alone — every coloured chip carries a text label.
- Status colours (`--good --warn --serious --crit`) are reserved and never reused as series.
- Text uses ink tokens, never a series colour.
- Theme: `data-theme` on `<html>`, toggled by `tog()`, which calls `draw()` so all
  canvases and ramps re-render for the new surface.

CSS custom properties are defined once on `:root` and overridden under
`html[data-theme="light"]`. Surfaces: dark `#1a1a19` / light `#fcfcfb`.

---

## 14. Interaction inventory

| Control | Function | Notes |
|---|---|---|
| theme toggle | `tog()` | flips `data-theme`, calls `draw()` |
| 3 tabs | `mode()` | early-return guard on same mode |
| engine cells / Roll | `pick()` / `roll()` | Part 2 combinator |
| cluster `<details>` | `filt()` | collapsed by default; filtering auto-opens matches and shows "n of m match"; clearing collapses again |
| expand all / collapse all | inline | Part 4 |
| bank filters | `filt()` | 5 family chips + 3 lens chips (pay / not-you / fast) |
| scorecard filters | `drawHeat()` | attribute select (also sorts + dims other columns), comparator, value (adapts 1–5 vs totals), cluster, 5 verdict chips, reset |
| scorecard row click | `openInBuilder(n)` | hover shows "→ build" |
| how-to-read | `<details class="howto">` | collapsed; present in both Part 7s |
| builder selects | `gen()` | `Surprise me` = `surprise()` |
| variant arrows / pills | `setVar(i)` | wraps at both ends |
| ⓘ variant info | `VI` toggle + re-render | state survives variant switching |
| deep number / select | `goDeep()` | Enter key bound; rejects out-of-range and non-numeric |
| monthly target inputs | `#tgt` (custom), `#dTgt` (deep) | drives all break-even arithmetic |

---

## 15. Complete function map (all 34)

In source order. `→` marks what calls it.

| Function | Purpose |
|---|---|
| `tog()` | flip `data-theme`, then `draw()` |
| `openM(id)` | set a `<details>` open and scroll to it (nav chips) |
| `renderAx()` | render Part 2's four columns + the combination sentence |
| `pick(k,i)` | select a cell in Part 2 → `renderAx()` |
| `roll(log)` | randomise Part 2; `log=true` emits 5 rows |
| `filt()` | Part 4 bank filters; also opens/closes clusters and writes match counts |
| `buildAll()` | compose `ALLC` from `CL` + `TAGS` + `HAND`; sort by total desc |
| `buildFilterUI()` | populate Part 7 filter controls; **must run before `drawHeat()`** |
| `syncVal()` | swap the value dropdown between 1–5 and total thresholds |
| `drawHeat()` | render the 112-row scorecard with filters, sorting, dimming; also injects `HOWTO()` |
| `drawScatter()` | Part 8 report scatter (24 benchmarks, 5 picks highlighted) |
| `drawGantt()` | Part 9 report 14-day gantt |
| `draw()` | `drawHeat + drawScatter + drawGantt`, then re-render custom output if `LAST` |
| `priceCheck(h,p,core)` | **anti-hallucination**: in-band / extrapolated / no-band |
| `rules(w,o,h,p)` | conflict + synergy flags for a combination |
| `HOWTO()` | the collapsible "how to read this table" block (both Part 7s) |
| `readRow(S)` | per-row reading: gates, what carries it, weakest link, cheapest fix |
| `scoreIt(w,o,h,p)` | the 8 scores |
| `verdict(S,F)` | band + gate + asset logic |
| `nearest(w,o,h,p)` | keyword match into the bank, **requires ≥2 hits** |
| `compFor(h,p,w)` | look up a verified competitor set, or `null` |
| `openInBuilder(n)` | load bank idea `n` into the builder and generate |
| `backToTable()` | return to report mode at `#score` |
| `fillSel()` | populate the builder's four selects |
| `surprise()` | randomise the builder and generate |
| `mode(m)` | three-way tab switch with same-mode early return |
| `buildVars(w,o,h,p)` | apply the 7 `ARCH` angles → `VARS` |
| `setVar(i)` | switch active variant, wrapping at both ends |
| `gen(silent)` | read the selects, build variants, reset `VIDX` on axis change |
| `renderVars(silent)` | emit the entire custom-mode output for the active variant |
| `fillDeepSel()` | populate the deep-dive picker, grouped by cluster |
| `goDeep()` | validate 1–112 then render `deepPlan` |
| `deepPlan(n)` | the 10-section plan for one idea |
| `searchFor(h,p,w)` | the search query printed when no competitor is verified |

### Remaining lookup tables

| Constant | Shape | Purpose |
|---|---|---|
| `FW` | 15 × `{n,nm,hero,q,ex}` | Part 3 frameworks; `hero:1` marks the 3 that do most work |
| `FAM` | 5 × `{t,v}` | family label + CSS colour var |
| `FAST` | `Set` of idea numbers | the "cash in <30 days" lens in Part 4 |
| `CRIT` / `CRIT2` | 8 strings each | criterion labels (`CRIT` report, `CRIT2` custom — identical content) |
| `CRIT_DEF` | 8 × `[what5, what1, whichAxisToChange]` | drives `HOWTO()` and `readRow()`'s "cheapest fix" |
| `GUESS_WHY` | 8 strings | why a `CRIT_GUESS` criterion is unknowable; blank for the 5 that aren't |
| `BANDS` | 5 × `[label, colourVar, meaning]` | the verdict ladder shown in `HOWTO()` |
| `SHORTV` | map verdict string → `[shortLabel, cssKey, filterGroup]` | compresses verdicts for the 112-row table |
| `VGROUP` | 5 × `{key: label}` | the verdict filter chips in Part 7 |
| `STOP` | `Set` of stopwords | excluded from `nearest()` keyword matching |
| `PTS` | 24 × `{n,l,x,y,p}` | Part 8 benchmark scatter points; `p:1` = one of the 5 picks |
| `PICK` | 5 × `[rank, title, whyHTML]` | Part 10's ranked picks |
| `G` | 6 × `[label, startDay, endDay, colourVar]` | Part 9 gantt rows |
| `sel` | `{WHO,OUT,HOW,PAY}` | Part 2 combinator's current selection (separate from the builder) |
| `st` | `{fam:Set, lens:Set}` | Part 4 bank filter state |
| `fState` | `{verd:Set}` | Part 7 verdict filter state |

`PTS` coordinates are **hand-placed on a 0–100 scale**, not computed from scores — they are
an editorial layout of the report's benchmark map. The custom-mode scatter, by contrast,
computes positions as `S[3]*20-10` (speed) and `S[4]*20-10` (ceiling). Don't confuse them.

---

## 16. Verification harness

**`tools/verify.js` — run it with `npm run verify`.** It used to be ad-hoc scripts in
`/tmp`; it is now a committed file. Zero dependencies, ~5 seconds, 78 checks.

It reads the **built** artifact (so it validates the build too), extracts the `<script>`
block, stubs a minimal DOM, boots the script exactly as a browser would, then reaches in
via an appended `globalThis.__api = {…}` and exercises the engine.

The DOM stub is the same shape as before: `document.getElementById` returns memoised fake
elements carrying `{value, innerHTML, textContent, dataset, style, hidden, open,
classList, scrollIntoView, addEventListener}`; `querySelectorAll` returns `[]`;
`window.scrollTo` is a no-op.

What it currently verifies:

```
193,600  scoreIt + rules + verdict        exhaustive · 0 exceptions, all scores integer 1–5
193,600  combinations × every variant     exhaustive · finite prices, 4–7 variants each
    112  deep-dive plans                  all 10 sections, no NaN/undefined/[object Object]
    484  format × payer prices            100% carry a priceCheck provenance verdict
     —   generated markup balance         div/details/summary/table/tr/td/th/span/button/ul/li/p
     —   index alignment                  MW MO MH MP HOW_BASE BASE_EV FIRST PAY_MULT MOTION SEG_EV
     —   idea numbering                   continuous 1..112, no gaps or duplicates
     —   TAGS integrity                   113 rows, every axis index in range
     —   both ordinal ramps               exact values, monotone, ≥2:1 on their own surface
     —   self-containment                 no <link>, no <script src>, no @import, no remote url()
     —   invariants §12                   items 1–8, 10, 11 asserted directly (see README)
```

`npm run verify -- --quick` samples instead of sweeping, for a sub-second loop.

**Known issues.** Two checks report through `issue()` rather than `ok()`: they fail, print
loudly, and do not break the gate, because they are pre-existing content defects rather
than build regressions. (1) score-cell text is 4.42:1 light / 3.64:1 dark at step 3 —
clears 3:1, not AA's 4.5:1. (2) the evidence ledger says "9 of 22" researched base prices
but `BASE_EV` flags 8. Full detail in `README.md`. Fix either and the harness tells you to
promote it to a hard check.

**Not yet covered, and worth adding:** out-of-range and non-numeric deep input; nav chip
opening `#dStuck` while `mode('report')` fires; empty-state messages for every filter;
theme-toggle re-render; the 112 row-click handoffs into the builder; business-summary
grammar (article + payer casing). These need a fuller DOM stub than the current one.

### Gotchas that have already caused real bugs

- **Unescaped `"` inside double-quoted JS strings** in the `CL` idea descriptions. Use
  `&ldquo;`/`&rdquo;` or escape. A stray quote silently breaks the whole script.
- **TDZ**: `drawHeat()` is defined before `CRIT_DEF`/`BANDS`/`HOWTO` but only *called*
  from `draw()` at the very bottom. Keep the bottom call order:
  `fillSel(); fillDeepSel(); buildAll(); buildFilterUI(); draw();`
- `buildFilterUI()` must run before `drawHeat()` or `fCrit.value` is `''` → treated as
  criterion 0 instead of "Total". There is a defensive `rawC===''?-1` guard; keep it.
- `Math.min(...arr)` on a 130k-element array throws *Maximum call stack size exceeded*.
  Use `reduce` in test scripts.
- `.sec` toggling uses `hidden`; the modal pattern was removed — `openM()` now just sets
  `details.open=true` and scrolls.

---

## 17. Extending it

Every one of these touches several index-aligned tables at once. Run `npm run check`
after any of them — `verify.js` catches a table you forgot to extend.

**Add an idea** → append to the right `CL` cluster with the next number, add its `TAGS`
row, keep quotas and continuous numbering, re-run `buildAll()` checks. Update the "112"
in copy if the count changes (it appears in many places).

**Add a format (HOW)** → append to `AX.HOW`, `MH`, `HOW_BASE`, `BASE_EV`; consider
`RECUR_H`, `CONTENT`, `TRAVEL`, `ARCH.ap` availability, `FIRST`, and a `SCEN` band if a
published figure exists. Update the 193,600 arithmetic everywhere it appears.

**Add a payer (PAY)** → append to `AX.PAY`, `MP`, `PAY_MULT`, `MOTION`; consider
`EMPLOYER`, `LEARNER`, and any `rules()` clauses.

**Add a variant angle** → append to `ARCH` with `k,nm,pm,dS,ti,an,gv,kl,ts` and an
optional `ap(h)`. The ⓘ explainer renders from `ARCH`, so it self-documents.

**Add researched evidence** → the correct move for almost any improvement. Fill a
`SEG_EV` row (`v:1` + `pool` + text), add a `COMP` entry, add a `SCEN` band, flip a
`BASE_EV` flag — and add the source to `#srcBlock`. Every one of these moves a claim from
judgment to sourced, which is the artifact's purpose.

---

## 18. Verified sources

Everything below was retrieved and is cited in `#srcBlock`. **Nothing else in the file is
sourced; treat unsourced numbers as judgment.**

| Claim | Figure |
|---|---|
| European Accessibility Act | deadline 28 June 2025; EN 301 549 / WCAG 2.1 AA; penalties to €100,000 or 4% of revenue; exemption under 10 staff and €2M |
| GCCs in India | 1,750–2,100+ centres; 1.9–2.3M professionals; ~870 in Bengaluru (35–40%); >2,400 forecast by 2030 |
| India corporate training market | ≈₹52,000 crore (2024), ~14% CAGR; specialist expert-led ₹30,000–1.5L per day |
| Indian UI/UX bootcamps | ₹10,000–1,50,000; GrowthSchool ₹50–70k; DesignBoat offline Bengaluru + Pune |
| Memorisely | bootstrapped 2020; $325/mo; 8-week bootcamp $4,375; 1M+ community, 150+ countries |
| Freelance UX rates | India ₹1,500–4,000/hr; global experienced $78–138/hr; international clients 2–3× domestic |
| Indian design salaries | mid ₹12–25L at product companies; senior ₹16–28L; top-tier ₹35–55L |
| Expert networks | pay experts $400–600/hr mid-level, $600–800 senior exec, $800–1,200+ C-suite; GLG bills clients $1,500–2,000/hr |
| Fractional CXO India | CMO ₹60k–1.5L early, ₹1.5–4L growth, ₹4–8L near-full-time; CTO ₹1.5–10L per month |
| Study-abroad consultants India | ₹30,000–1.5L end-to-end; comprehensive ₹50k–1.5L; free ones are commission-funded |
| Paid communities | avg $48/mo; niche $29–49; churn 5–10%/mo; lifespan 14–20 months; 44% under 100 members |
| Newsletter sponsorship | specialised B2B CPM $50–150; flat ≈2.5–5% of subscriber count |
| Completion research | median 12.6% across 221 MOOCs; MIT 3.13% (2017–18); Harvard 3.4× dropout without accountability |
| UCEED 2025 | 16,601 registered · 15,408 appeared · 5,703 qualified (37%) |
| AI tool directories | Toolify 28,000+ tools / 450+ categories / ~$500K raised; There's An AI For That 12,000+ tools |
| Cohort market | cited at $4.0B growing toward $15.2B (vendor-sourced — treat with suspicion) |

### Explicitly NOT verified — do not present these as facts

- Any count of designers, PMs, founders, faculty, recruiters, educators or agencies in
  India. The only figure found — "India needs 80,000+ UI/UX designers by 2027" — is an
  unsourced industry estimate repeated across SEO blogs.
- Enterprise-vs-consumer design pay premium. An earlier version claimed 1.6×; **that was
  fabricated**. The nearest real number is a ~28% product-designer-over-UX-designer
  premium, which is a different claim.
- NID / UCEED / NIFT coaching fees. The study-abroad figure proves parents spend at that
  level on an admissions outcome; it is not a coaching price benchmark.
- Design-retreat, card-deck, awards-entry, directory, mastermind and study-tour pricing
  in India. 13 of 22 `HOW_BASE` values are estimates for this reason.
- Tier-2/3 India design-learner population — the largest claim in the bank and the least
  evidenced.

---

## 19. The one thing to keep in mind

No part of this artifact can tell the user whether anyone will pay. Every score, price,
verdict and plan is a prior. The only instruments that generate evidence are the 20
problem interviews and the money test in the sprint. Everything else exists to decide
what to test first.

If a change makes the file *sound* more confident without adding a source, it has made
the artifact worse.
