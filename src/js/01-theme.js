/* ---------- theme ---------- */
function tog(){const h=document.documentElement;
  h.dataset.theme = h.dataset.theme==='dark'?'light':'dark'; draw();}

/* The sticky bar takes its shadow only while content is actually underneath it. A bar that is
   always elevated is decoration; this reports a state. Class flip rather than an inline style so
   the transition in 03-header.css owns the timing, and passive+rAF so a 250 KB document still
   scrolls at frame rate. */
function initLift(){
  const bar=document.querySelector('.topbar');
  if(!bar)return;
  let queued=false;
  const sync=()=>{queued=false;bar.classList.toggle('lifted',window.scrollY>4);};
  addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(sync);}},{passive:true});
  sync();
}

/* open a collapsed section and scroll to it — used by the nav chips */
function openM(id){const d=document.getElementById(id);if(!d)return;
  const s=d.closest('.sec.fold');if(s)setFold(s,true);  /* open the part before its inner detail */
  d.open=true;d.scrollIntoView({behavior:'smooth',block:'start'});}

