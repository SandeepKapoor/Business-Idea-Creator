/* ---------- heatmap ---------- */
/* The eight columns. Renamed from the original business register — "Defensibility",
   "Willingness to pay", "Revenue ceiling" — because these strings are not only column headers:
   readRow() drops them into running sentences ("the best you have is X at 4"), so they have to
   be plain noun phrases a reader parses at a glance, not terms of art. CRIT2 in 15-scoring.js
   must stay identical; verify.js asserts it. */
const CRIT=["What they’ll pay",
  "People you can reach",
  "Your edge here",
  "How soon you get paid",
  "How big it can get",
  "How hard to copy",
  "Works anywhere",
  "Your energy for it"];

/* the eight hand-scored finalists now live in HAND, below, keyed by idea number */
/* THE RAMP IS FIVE TINTS OF CORAL — the Airbnb-style redesign's ordinal device, replacing the
   two-colour-press blue/vermillion plate the ramp used in two earlier worlds. Rank is still
   carried by ink coverage rather than by five unrelated hues, so it survives greyscale, and the
   verdict word beside every row still means nothing rides on hue alone.

   Both ladders are the same ladder. The light one darkens as the score rises, from a pale pink
   at step 1 to a deep berry-coral at step 5; the dark one is its mirror and brightens, because on
   near-black stock more ink means more light, not less. All ten cell/ink pairs clear AA 4.5:1,
   every adjacent pair is separable (ΔL ≥ .045), step 1 is visible against its own stock and step
   5 still leaves its numeral readable. tools/verify.js re-measures all of that on the built CSS
   AND asserts these four arrays match src/styles/01a-field.css's .den-N declarations exactly —
   that check is what caught this ramp and 01a-field.css's ramp disagreeing after the Airbnb pass:
   the CSS had already moved to pink tints, this file was still the old vermillion five.

   THE INK FLIPS AT THE CROSSOVER — this is the step that has shipped broken in three worlds now,
   and this time the reason was a genuine dead zone: at this hue and saturation, lightness values
   roughly 0.50–0.60 (light theme) and 0.49–0.53 (dark theme) clear NEITHER ink at 4.5:1 — the tint
   is simultaneously too dark for white text and too light for dark text. A ramp that steps
   smoothly through lightness will land a step inside that band by construction. The fix is not a
   gentler curve; it is refusing to place a step there at all. Steps 1–3 sit above the light-theme
   dead zone, steps 4–5 sit below it (and the mirror image in dark theme) — the jump across the
   band happens between step 3 and step 4, which is a bigger visual gap than an evenly-spaced ramp
   would give, and that unevenness is the price of every step clearing AA.

   Light flips after step 3 (1–3 dark ink, 4–5 white ink); dark flips after step 3 (1–3 light ink,
   4–5 dark ink). Do not hand-edit one array, one theme, or one file without the other three. */
const RAMP_L=["#fdced7","#fa89a0","#f74569","#e10935","#76051b"];
const INK_L =["#222222","#222222","#222222","#ffffff","#ffffff"];
const RAMP_D=["#550716","#890b24","#cb1036","#ef395d","#f5849b"];
const INK_D =["#f5f5f6","#f5f5f6","#f5f5f6","#14110f","#14110f"];
const isDark=()=>document.documentElement.dataset.theme!=='light';
/* Column geometry for every score table on the page. Auto layout cannot do this job: the eight
   criteria are equal in meaning and must be equal in width, but their LABELS are wildly unequal
   in length ("Works anywhere" against "How soon you get paid"), so auto layout sized the columns
   by header text and let the numerals collapse to 14px while the label column ate the rest.
   table-layout:fixed plus an explicit colgroup makes the grid deterministic. Only the label
   column is auto, so it absorbs whatever is left over.

   tail: extra columns after the eight scores, in order, as [class, width]. */
function scols(tail){
  return '<colgroup><col class="c-lab">' +
    '<col class="c-sc">'.repeat(8) +
    tail.map(t=>`<col class="c-${t}">`).join('') + '</colgroup>';
}
const ramp=()=>isDark()?RAMP_D:RAMP_L;
const rink=()=>isDark()?INK_D:INK_L;
/* Every idea in the bank, tagged with its position on the four axes: [who, outcome, how, money].
   Scores are then derived by the SAME engine that powers custom mode, so the bank and the
   builder can never disagree. Index = idea number. */
const TAGS=[null,
/*A 1-10*/  [2,4,0,0],[2,4,0,0],[3,4,0,3],[3,2,0,0],[8,10,0,3],[2,6,2,0],[18,8,0,0],[2,7,0,0],[1,4,0,0],[3,10,14,0],
/*B 11-22*/ [0,15,2,0],[0,15,1,0],[1,0,18,4],[2,6,18,0],[1,0,18,0],[3,3,2,5],[1,15,5,2],[4,9,14,3],[2,0,20,19],[18,8,20,20],[2,6,14,0],[2,14,18,0],
/*C 23-34*/ [11,4,0,3],[7,11,0,3],[8,11,0,3],[9,11,2,0],[8,10,9,3],[6,14,3,0],[10,10,9,3],[12,15,0,17],[14,9,0,17],[13,15,2,18],[12,16,0,18],[12,16,18,18],
/*D 35-46*/ [3,13,10,0],[2,6,11,10],[1,0,12,7],[15,18,12,7],[3,10,13,0],[3,4,13,0],[2,6,0,0],[2,13,5,2],[2,6,4,0],[1,6,5,2],[3,13,7,2],[2,15,7,7],
/*E 47-56*/ [2,4,0,3],[0,0,0,6],[2,6,0,8],[2,4,20,20],[16,4,14,12],[2,4,17,13],[5,12,19,14],[9,11,19,15],[17,0,0,16],[2,6,15,9],
/*F 57-66*/ [16,11,16,12],[16,18,14,12],[15,18,17,19],[16,11,14,12],[16,11,18,12],[12,16,15,19],[16,7,18,12],[16,10,14,12],[16,13,19,14],[16,14,20,7],
/*G 67-74*/ [3,4,6,7],[2,6,7,7],[2,4,7,7],[2,13,12,11],[3,3,6,7],[2,15,7,7],[3,1,20,19],[1,6,8,7],
/*H 75-84*/ [17,0,0,0],[17,0,1,16],[19,18,18,4],[18,1,18,4],[11,17,9,16],[11,17,18,3],[19,11,18,14],[3,15,21,0],[18,1,14,0],[11,12,19,14],
/*I 85-94*/ [3,5,0,0],[11,11,18,3],[2,5,0,0],[3,5,0,3],[2,11,15,9],[11,11,0,3],[18,8,16,2],[3,14,14,0],[11,11,18,3],[11,11,19,14],
/*J 95-106*/[2,0,0,0],[3,19,2,0],[5,12,2,3],[9,11,11,7],[2,6,11,10],[9,11,1,0],[2,13,11,10],[1,6,11,10],[2,13,6,2],[3,19,0,0],[0,15,16,9],[10,18,9,3],
/*K 107-112*/[9,12,18,14],[5,12,19,14],[3,2,3,0],[10,10,9,3],[19,12,2,21],[9,12,19,14],
/*L 113-114*/[3,10,0,3],[3,15,0,0]];
/* The eight I scored by hand and argued about in prose — those judgments win over the engine. */
const HAND={23:[5,4,5,3,5,4,3,4],85:[4,3,5,4,4,3,5,5],2:[3,3,5,3,4,4,5,4],
  78:[5,2,3,2,5,3,5,3],67:[2,3,5,1,3,4,5,5],34:[5,2,4,4,3,2,5,2],
  52:[3,1,3,1,5,5,5,3],37:[1,2,4,1,3,3,2,5]};
const SHORTV={"DEAD — GATE FAILURE":["GATE FAIL","dead","gate"],
  "STRUCTURALLY BROKEN":["BROKEN","dead","gate"],
  "ASSET, NOT REVENUE":["ASSET","hold","asset"],
  "BUILD — TEST THIS":["BUILD","live","build"],
  "WORTH TESTING":["TEST","hold","test"],
  "WEAK — KEEP ROLLING":["WEAK","hold","weak"]};
