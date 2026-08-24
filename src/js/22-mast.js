/* ---------- masthead ----------
   The opening viewport. It used to open on five hand-counted findings as a ruled table; it now
   opens on the bank itself — one specimen at a time, drawn at random from ALLC. A reader advances
   it on demand with the arrow rather than on a timer, so nothing on the opening viewport moves
   without being asked to. */
let mastSpinIdea=null;
let mastBank=null;
function mastSpinHTML(c,blurb){
  return `<span class="idx">NO. ${String(c.n).padStart(3,'0')}</span>
    <b>${c.nm}</b>
    <span class="dsc">${blurb}</span>
    <button type="button" class="mastopen" onclick="openMastSpin()">Open this idea
      <svg class="i i-sm" aria-hidden="true"><use href="#i-chevron"/></svg></button>`;
}

function spinMast(){
  const host=document.getElementById('mastSpinText');
  if(!host||!ALLC.length)return;
  if(!mastBank)mastBank=CL.flatMap(c=>c.i);
  const reduced=typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  const c=ALLC[Math.floor(Math.random()*ALLC.length)];
  const raw=mastBank.find(x=>x[0]===c.n);
  mastSpinIdea=c.n;
  host.classList.remove('spin-in');
  host.innerHTML=mastSpinHTML(c,raw[2]);
  if(!reduced){void host.offsetWidth;host.classList.add('spin-in');}
}

function openMastSpin(){ if(mastSpinIdea!=null)openInBuilder(mastSpinIdea); }

function initMast(){ spinMast(); }
