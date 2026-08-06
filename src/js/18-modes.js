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

/* THE WORKSPACE ARRIVED EMPTY, and that was the worst screen in the artifact. Everything needed
   to produce a result was already set — the dropdown on #1, the four axes loaded behind it, the
   income target at 250,000 — and the tab still showed a form above an instruction telling the
   reader to press the button next to it. A whole viewport of nothing, on the tab that gets
   opened most.

   So it runs once at boot. There is no cost to hedge against: the engine is deterministic, it
   scores in a few milliseconds, and the file is opened locally. `silent` keeps it from stealing
   focus or scrolling, because this is a starting position, not something the reader asked for.

   ORIGIN is set so the output names the idea it came from, exactly as it would have if the
   reader had pressed the button themselves. A result that cannot say where it came from would
   be worse than the empty state it replaces. */
function bootWorkspace(){
  if(!TAGS[DEFAULT_IDEA])return;      /* the bank could be re-numbered; do not guess */
  ORIGIN=DEFAULT_IDEA;
  gen(1);
}
function surprise(){
  const R=k=>Math.floor(Math.random()*AX[k].length);
  setPick({WHO:R('WHO'),OUT:R('OUT'),HOW:R('HOW'),PAY:R('PAY')},true);
  ORIGIN=null; gen();
}
let CURMODE='report';
/* Sections that belong to a mode rather than to the report. Each is shown only in its own mode;
   everything else is report-only. It was a single `s.id==='custom'` test until the frontier
   arrived — one more mode and that test silently shows the new panel inside the report. */
const MODESEC={custom:'tabC',frontier:'tabF',bma:'tabB'};
function mode(m){
  if(m===CURMODE)return;          /* a no-op switch shouldn't re-scroll or re-collapse anything */
  CURMODE=m;
  document.getElementById('tabR').classList.toggle('on',m==='report');
  Object.keys(MODESEC).forEach(k=>
    document.getElementById(MODESEC[k]).classList.toggle('on',m===k));
  /* aria-selected has to move with the class or a screen reader reads four unselected tabs. */
  ['tabR','tabC','tabF','tabB'].forEach(id=>{
    const b=document.getElementById(id);
    b.setAttribute('aria-selected',b.classList.contains('on')?'true':'false');});
  document.getElementById('navRow').hidden=m!=='report';
  /* #srcBlock used to need its own line here because it was a loose <div>. It is a numbered part
     with a heading now, so the .sec loop below already owns it — and a second line setting the
     same property is the kind of duplicate that survives until the two disagree. */
  document.querySelectorAll('.sec').forEach(s=>{
    const own=Object.prototype.hasOwnProperty.call(MODESEC,s.id);
    s.hidden = own ? s.id!==m : m!=='report';});
  syncFoldAll();                  /* the global toggle now counts only the mode on screen */
  syncStick();
  syncHash(m);
  window.scrollTo({top:0,behavior:'smooth'});
}

/* THE STICKY HEADER IS TWO TIERS IN REPORT MODE AND ONE EVERYWHERE ELSE, so the offset that
   keeps a jump target from landing underneath it is not a constant. It was a constant — 80px of
   scroll-margin against a header that is 38px on three of the four tabs, which pushed every
   anchor 42px too far down. Measured rather than assumed, because the tiers change height with
   the font size and at the mobile breakpoint. */
function syncStick(){
  /* Above 720px the header is a fixed left column with nothing to duck under, so scroll-margin
     collapses to 0. Below it, the header is the original sticky top bar and jump targets need
     the measured offset back. */
  if((window.innerWidth||9999)>720){
    document.documentElement.style.setProperty('--stick','0px');
    return;
  }
  const t1=document.querySelector('.topbar');
  const t2=document.getElementById('navRow');
  const h=(t1?t1.offsetHeight:0)+((t2&&!t2.hidden)?t2.offsetHeight:0);
  document.documentElement.style.setProperty('--stick',h+'px');
  document.documentElement.style.setProperty('--tier1',(t1?t1.offsetHeight:0)+'px');
}
addEventListener('resize',syncStick);

/* ---------- the tab you were on is a place, so it gets an address ----------
   Four tabs and one URL. Opening the file always landed on the report, even when the reason for
   opening it was the analyser, and there was no way to bookmark a tab or send yourself back to
   one. The hash already deep-links into a folded part of the report; the three mode panels are
   .sec blocks with ids exactly like those parts, so the same mechanism covers them for free —
   #frontier, #bma and #custom already name real elements, they were simply never read as modes.

   WHY replaceState AND NOT pushState. The tabs are a view switch, not navigation: four entries in
   the back stack for four clicks of the same control is the "broken back button" the guidelines
   warn about. The address updates, the history does not grow, and Back still leaves the page. */
function modeFromHash(){
  const h=location.hash.slice(1);
  if(Object.prototype.hasOwnProperty.call(MODESEC,h))mode(h);
}
function initRoute(){
  modeFromHash();
  addEventListener('hashchange',modeFromHash);
}
/* Called at the end of mode(), so the address follows the tab rather than the other way round. */
function syncHash(m){
  if(!history.replaceState)return;
  history.replaceState(null,'',m==='report'?location.pathname+location.search:'#'+m);
}
document.querySelectorAll('#navRow a').forEach(a=>a.addEventListener('click',()=>mode('report')));

