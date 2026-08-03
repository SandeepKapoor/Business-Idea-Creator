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
/* Ordinal 1–5 ramp. Two selected ramps, not an auto-flip: the light end of each must clear
   2:1 against its own surface. Both pass validate_palette.js --ordinal in their own mode.
   (The previous single ramp started at step 100, #cde2fb, which failed light at 1.29:1.) */
/* The five heat steps and the ink that sits on each. Every pair is measured, not chosen by eye:
   step 3 used to be #2a78d6, which reads 4.42:1 with white and 4.46:1 with black — the one cell
   on the page that cleared neither. Light step 3 is now a darker blue carrying white ink; dark
   step 3 kept its colour and flipped to black ink, which was enough on its own.

   ONLY STEP 3 MOVED. The first attempt lightened steps 1 and 2 as well and broke a different
   invariant: the lightest step also has to stay separable from the card surface it sits on, and
   #8fbaec measured 1.97:1 against #fcfcfb. Both ramps now clear AA at every step, stay monotonic,
   and keep their end steps visible against their own surface. tools/verify.js measures all of
   that rather than pinning the hex values. */
const RAMP_L=["#86b6ef","#5598e7","#2f6fbd","#1c5cab","#104281"];
const INK_L =["#0b0b0b","#0b0b0b","#ffffff","#ffffff","#ffffff"];
const RAMP_D=["#184f95","#256abf","#3987e5","#6da7ec","#9ec5f4"];
const INK_D =["#ffffff","#ffffff","#0b0b0b","#0b0b0b","#0b0b0b"];
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
/*K 107-112*/[9,12,18,14],[5,12,19,14],[3,2,3,0],[10,10,9,3],[19,12,2,21],[9,12,19,14]];
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
