/* ---------- theme ---------- */
function tog(){const h=document.documentElement;
  h.dataset.theme = h.dataset.theme==='dark'?'light':'dark'; draw();}

/* open a collapsed section and scroll to it — used by the nav chips */
function openM(id){const d=document.getElementById(id);if(!d)return;
  const s=d.closest('.sec.fold');if(s)setFold(s,true);  /* open the part before its inner detail */
  d.open=true;d.scrollIntoView({behavior:'smooth',block:'start'});}

