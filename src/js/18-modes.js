let LAST=null, ORIGIN=null;
/* The idea the workspace opens on. Both entry points read it, so the picker and the four
   dropdowns agree from the first paint instead of pointing at different combinations. */
const DEFAULT_IDEA=1;
/* Which way into the workspace is on screen. Never both: the four axes are the single input the
   engine reads, and showing two editors for one value only raises "which is it using?". */
let WMODE='bank';
function pickMode(m){
  WMODE=m;
  document.getElementById('wtabBank').classList.toggle('on',m==='bank');
  document.getElementById('wtabAxes').classList.toggle('on',m==='axes');
  document.getElementById('wBank').hidden = m!=='bank';
  document.getElementById('wAxes').hidden = m!=='axes';
}
/* The workspace's four axis values. This is the single source of truth the engine reads — it
   used to be four <select> elements, i.e. the DOM. Holding it in one object means openInBuilder,
   Surprise me and the picker all set the same thing, and gen() has one place to look. */
/* Named AXPICK, not PICK: 10-picks.js already declares `const PICK` for the five recommended
   ideas, and build.js concatenates every file into ONE scope, so the clash is a boot-time throw
   that takes the whole page down. tools/verify.js now checks for this across the whole script. */
const AXPICK={WHO:2,OUT:4,HOW:0,PAY:3};

/* Every route that changes an axis from OUTSIDE the picker passes scroll=true, so the newly
   selected row is brought into view. In a 20-row scroller a selection you cannot see has not
   really been made. */
function setPick(v,scroll){
  Object.assign(AXPICK,v);
  syncPicker('w',AXPICK,!!scroll);
}
/* Clicking an option. Regenerates only if something has already been generated — same rule the
   income-target field follows, so the whole panel behaves one way. */
function wpick(k,i){
  AXPICK[k]=i; syncPicker('w',AXPICK,false);
  ORIGIN=null;                    /* the combination is no longer the bank idea it started as */
  if(LAST)gen(1);
}

/* clicking a row in Part 7 loads that idea's four axis values into the builder */
function openInBuilder(n){
  const t=TAGS[n]; if(!t)return;
  setPick({WHO:t[0],OUT:t[1],HOW:t[2],PAY:t[3]},true);
  ORIGIN=n; mode('custom'); gen();
}
function backToTable(){mode('report');openFold('score',1);}
function fillSel(){
  buildPicker('wPick','w','wpick');
  const t=TAGS[DEFAULT_IDEA]||[2,4,0,3];
  setPick({WHO:t[0],OUT:t[1],HOW:t[2],PAY:t[3]},false);
}
function surprise(){
  const R=k=>Math.floor(Math.random()*AX[k].length);
  setPick({WHO:R('WHO'),OUT:R('OUT'),HOW:R('HOW'),PAY:R('PAY')},true);
  ORIGIN=null; gen();
}
let CURMODE='report';
function mode(m){
  if(m===CURMODE)return;          /* a no-op switch shouldn't re-scroll or re-collapse anything */
  CURMODE=m;
  document.getElementById('tabR').classList.toggle('on',m==='report');
  document.getElementById('tabC').classList.toggle('on',m==='custom');
  document.getElementById('navRow').hidden=m!=='report';
  document.getElementById('srcBlock').hidden=m!=='report';
  document.querySelectorAll('.sec').forEach(s=>{
    const own=(s.id==='custom');
    s.hidden = own ? s.id!==m : m!=='report';});
  syncFoldAll();                  /* the global toggle now counts only the mode on screen */
  window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('#navRow a').forEach(a=>a.addEventListener('click',()=>mode('report')));

