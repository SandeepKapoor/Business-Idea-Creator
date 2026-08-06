/* ---------- masthead ----------
   The opening viewport. Its job is to show the mechanism rather than describe it: the space as a
   field, one column lit, and four counts underneath that are read from the engine rather than
   typed into the HTML.

   WHY THE FIGURES ARE COMPUTED. A masthead with hand-typed numbers is a caption that goes stale
   the first time the bank changes — and this bank changed twice last week. Reading them from
   ALLC means the opening claim and the table further down cannot disagree. verify.js checks that
   they match.

   WHY 220 BARS AND NOT 193,600. The field is a portrait of a quantity, not a plot of it: one bar
   per combination would be a 4-pixel smear. 220 is what fits at a legible bar width on a desktop
   viewport, and the label says what it stands for, so nothing is claimed that is not true. */
const MAST_BARS=220;

function mastFieldHTML(){
  /* Bar widths follow a fixed pseudo-random sequence so the field reads as data rather than as a
     repeating pattern, and so it is identical on every load — a masthead that reshuffles on
     refresh is an animation nobody asked for. No Math.random: this must be deterministic. */
  let out='', seed=193600;
  const rnd=()=>{seed=(seed*1103515245+12345)&0x7fffffff;return seed/0x7fffffff;};
  /* The lit column is the default idea's position in the space, scaled to the strip. */
  const t=TAGS[DEFAULT_IDEA]||[2,4,0,3];
  const pos=((t[0]*20*22*22)+(t[1]*22*22)+(t[2]*22)+t[3])/193600;
  const lit=Math.round(pos*MAST_BARS);
  for(let i=0;i<MAST_BARS;i++){
    const g=1+Math.floor(rnd()*3), o=(.10+rnd()*.34).toFixed(2);
    out+= i===lit
      ? `<i class="mb on"></i>`
      : `<i class="mb" style="flex-grow:${g};opacity:${o}"></i>`;
  }
  return out;
}

function mastNumsHTML(){
  const n=ALLC.length;
  const build=ALLC.filter(c=>c.vt==='BUILD').length;
  const gate=ALLC.filter(c=>c.vt==='GATE FAIL').length;
  const hand=Object.keys(HAND).length;
  const cells=[
    ['193,600','combinations reachable'],
    [String(n),'ideas written down'],
    [String(build),`scoring BUILD`],
    [`${hand} of ${n}`,'scored by hand, not derived'],
    [String(gate),'dead on a gate'],
  ];
  return cells.map(([v,l],i)=>
    `<div class="mn"><span class="idx">${String(i+1).padStart(2,'0')}</span>
      <b>${v}</b><span class="lbl">${l}</span></div>`).join('');
}

function initMast(){
  const f=document.getElementById('mastField');
  const n=document.getElementById('mastNums');
  if(f)f.innerHTML=mastFieldHTML();
  if(n)n.innerHTML=mastNumsHTML();
}
