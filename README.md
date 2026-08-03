# sandeep-idea-map

A business-ideation research artifact plus a deterministic rules engine, shipped as **one
self-contained HTML file** — no dependencies, no network calls, no runtime build step.
Open it in a browser and it works, offline, forever.

The source is now split into editable files under `src/`. A 130-line zero-dependency build
script reassembles them back into that single file.

**Read `CONTEXT.md` before changing anything.** Especially §12 (non-negotiable invariants).
The artifact's entire value is that it does not present guesses as facts, and that is easy
to break by accident.

---

## Quick start

```bash
npm run build      # src/ → sandeep-idea-map.html
npm run watch      # rebuild on every save
npm run verify     # 78 checks against the built artifact
npm run check      # build, then verify — do this before you ship
npm run open       # build and open in the browser
```

No `npm install`. There are no dependencies. `package.json` exists only to give the
scripts names.

---

## Why it is built this way

The single-file artifact is the right shape for this project: one reader, no accounts, no
persistence, no server. So the goal of the build is **not** to introduce a framework — it
is to make 2,655 lines editable without giving up any of the properties that make the file
worth having.

So the build does exactly three things: resolve HTML includes, concatenate CSS,
concatenate JS. That's it.

**Concatenation, not a bundler.** The script block is one shared scope, and the markup uses
inline `onclick="gen()"` handlers that resolve against it. ES modules would scope each file
separately and break all of them. Concatenation preserves the original semantics exactly —
which is why the build could be proved correct:

> The first build of this structure produced a file **byte-identical** to the original
> `sandeep-idea-map.html` (sha256 `bf3092f6…`). The refactor changed no behaviour, no
> markup and no copy. The only difference in the shipped file today is a five-line
> "generated" banner comment; `node build.js --no-banner` still reproduces the original
> byte-for-byte.

---

## Layout

```
├── build.js                  assemble src/ → sandeep-idea-map.html  (zero deps)
│                             (sandeep-idea-map.html is generated, gitignored, never edited)
├── CONTEXT.md                the full spec: engine, invariants, sources, gotchas
├── README.md                 this file
├── package.json              script names only, no dependencies
├── tools/
│   └── verify.js             78-check harness — boots the artifact and exercises it
└── src/
    ├── index.html            the shell: <head>, section includes, @css / @js markers
    ├── sections/             15 HTML partials, one per report section
    ├── styles/               11 CSS files, concatenated in filename order
    └── js/                   21 JS files, concatenated in filename order
```

### `src/sections/` — the prose

One file per `.sec` block, in document order. These are the parts you will edit most: they
are almost entirely copy.

| File | `id` | What it is |
|---|---|---|
| `00-header.html` | — | title, three mode tabs, nav chips |
| `01-custom.html` | `custom` | Build-my-own-idea mode shell |
| `02-deep.html` | `deep` | Go-deep mode shell |
| `03-stuck.html` | `stuck` | Part 1 · diagnosis |
| `04-engine.html` | `engine` | Part 2 · the four-axis combinator |
| `05-frameworks.html` | `fw` | Part 3 · 15 generators |
| `06-idea-bank.html` | `bank` | Part 4 · filters + mount point for the 112 |
| `07-observations.html` | `obs` | Part 5 · what the bank reveals |
| `08-convergence.html` | `conv` | Part 6 · the funnel |
| `09-scorecard.html` | `score` | Part 7 · filters + mount point for the heatmap |
| `10-position-map.html` | `map` | Part 8 · speed × ceiling |
| `11-sprint.html` | `sprint` | Part 9 · the 2-week sprint |
| `12-position.html` | `pos` | Part 10 · picks, dead ground, decision tree |
| `13-evidence.html` | `evid` | Appendix · the evidence ledger |
| `14-sources.html` | — | `#srcBlock` — the verified source list |

### `src/js/` — the engine

**Order is load-bearing.** Files concatenate in filename order, and some statements run at
parse time while other `const`s are still in their temporal dead zone (CONTEXT.md §16
"Gotchas"). Renumbering a file is a behavioural change.

| File | Holds |
|---|---|
| `01-theme.js` | `tog()`, `openM()` |
| `02-axes.js` | `AX` (the four axes), `renderAx`, `pick`, `roll` |
| `03-frameworks.js` | `FW` + renders the grid at parse time |
| `04-bank.data.js` | `FAM`, `CL` — **all 112 ideas live here**, `FAST` |
| `05-bank.view.js` | renders the bank, family/lens chips, `filt()` |
| `06-scorecard.data.js` | `CRIT`, both colour ramps, `TAGS`, `HAND`, `SHORTV` |
| `07-candidates.js` | `ALLC`, `buildAll()` — joins the bank to the engine |
| `08-scorecard.view.js` | filter UI, `syncVal`, `drawHeat` |
| `09-charts.js` | `PTS` + `drawScatter`, `G` + `drawGantt` |
| `10-picks.js` | `PICK` — the five ranked recommendations |
| `11-draw.js` | `draw()`, and the first `renderAx()` |
| `12-attributes.js` | `MW` `MO` `MH` `MP` — the attribute tables behind every score |
| `13-pricing.js` | `HOW_BASE`, `PAY_MULT`, `BASE_EV`, `SCEN`, `priceCheck`, `inr` |
| `14-rules.js` | membership sets + `rules()` — conflicts and synergies |
| `15-scoring.js` | `CRIT_DEF`, `BANDS`, `HOWTO`, `readRow`, **`scoreIt`**, **`verdict`** |
| `16-similarity.js` | `nearest()` |
| `17-evidence.js` | `SEG_EV`, `COMP`, `FIRST`, `MOTION` — the verified-evidence layer |
| `18-modes.js` | `mode()`, `openInBuilder`, `fillSel`, `surprise` |
| `19-variants.js` | `ARCH` (7 angles), `buildVars`, `gen`, `renderVars` |
| `20-deep-dive.js` | `goDeep`, **`deepPlan`** — the 10-section business case |
| `99-boot.js` | `fillSel(); fillDeepSel(); buildAll(); buildFilterUI(); draw();` |

`99-` sorts last on purpose. That bottom call order is required — see CONTEXT.md §16.

### `src/styles/` — 11 files, also concatenated in order

`01-tokens` (custom properties + light overrides) · `02-base` · `03-header` ·
`04-report` · `05-scorecard` · `06-position` · `07-builder` · `08-deep-dive` ·
`09-blocks` (shared: evidence ledger, flags, stages, ladder, mathbox) ·
`10-disclosure` (`<details>` patterns) · `11-responsive`.

---

## Editing

| To change | Edit |
|---|---|
| Any prose in the report | `src/sections/*.html` |
| An idea's name or description | `src/js/04-bank.data.js` |
| An idea's axis position | `TAGS` in `src/js/06-scorecard.data.js` |
| How scores are derived | `scoreIt` in `src/js/15-scoring.js` |
| A price | `HOW_BASE` / `PAY_MULT` in `src/js/13-pricing.js` |
| Add researched evidence | `SEG_EV` / `COMP` / `SCEN`, then `src/sections/14-sources.html` |
| Colours, spacing, layout | `src/styles/*.css` |

Then `npm run check`. CONTEXT.md §17 lists what else has to move when you add an idea, a
format, a payer or a variant angle — those changes touch several index-aligned tables at
once, and `verify.js` will catch it if you miss one.

**Never edit `sandeep-idea-map.html` directly.** The next build overwrites it. The
generated banner at the top of the file says so.

---

## The verification harness

`tools/verify.js` is the harness CONTEXT.md §16 describes as "written ad hoc in `/tmp`". It
is now a real file. It reads the **built** artifact, stubs a minimal DOM, boots the script
exactly as a browser would, and then exercises it. Zero dependencies, ~5 seconds.

It checks two different kinds of thing.

**Mechanics** — all 193,600 combinations score without exception, producing eight integers
in 1–5 and a well-formed verdict; all 193,600 build their 4–7 variant angles with finite
prices; all 112 deep-dive plans render with all ten sections and no `NaN`, `undefined` or
`[object Object]`; generated markup balances; the artifact has no external asset of any
kind.

**Invariants** — the epistemic guarantees from CONTEXT.md §12, which are the actual point
of the document:

- every generated price carries a `priceCheck` provenance chip (all 484 format×payer pairs)
- a segment with no `SEG_EV` anchor makes the plan refuse to state a market total
- a format/segment with no `COMP` match prints a search query instead of a company name
- exactly three of the eight criteria are badged `GUESS`, and they are the right three
- Stage 1 says the five answers are inferred, not the reader's own
- the verdict bands really are 32 / 29, matching the percentiles quoted in the copy
- hand scores override the engine and disclose that they did
- the 85–95% cohort figure is still attributed to cohort-software vendors
- idea numbering is continuous 1–112
- both colour ramps are the validated pairs, monotone, ≥2:1 against their own surface
- the five corrections from the audit are still stated in place, not quietly deleted

`npm run verify -- --quick` skips the exhaustive sweeps if you want a sub-second loop.

### Known issues

Two checks report but do not fail the build. Both are **pre-existing content defects**, not
build regressions — the harness found them, it did not cause them:

1. **Score-cell contrast at step 3.** The numeral in a "3" cell is 4.42:1 (light) and
   3.64:1 (dark). At 12.5px/600 that is normal-size text, so AA wants 4.5:1. Both clear
   3:1. CONTEXT.md §13's documented validator never tested cell text — only the ramp
   against the surface, which still passes at 2.06:1 and 2.15:1.
2. **"9 of 22" vs `BASE_EV`.** The evidence ledger says nine formats have a researched base
   price. `BASE_EV` flags eight (indices 0,1,2,4,5,9,18,19), and the `[R]` markers in the
   pricing comment agree with `BASE_EV`. The safe correction is the ledger — flipping a
   `BASE_EV` flag would claim evidence that does not exist, which is the failure mode this
   whole document exists to avoid.

Fix either one and the harness tells you to promote it from `issue()` to `ok()`.

---

## If the project ever outgrows this

The single file stops being right the moment you need a server. Concretely:

- **Live LLM generation** — a Claude call to expand an idea instead of the 7 hardcoded
  `ARCH` angles. Needs somewhere to hold an API key.
- **More than one reader** — accounts, saved sessions, shareable scorecards.
- **Selling it** — payments, analytics, onboarding.

Until then, adding a framework costs you the offline guarantee, the portability and the
zero-rot property, and buys nothing. The `src/` split already solved the only real problem,
which was editability.
