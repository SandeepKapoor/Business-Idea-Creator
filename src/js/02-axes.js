/* ---------- engine data ---------- */
const AX={
WHO:["Career switchers (non-design → design)","Junior designers, 0–2 yrs","Mid-level designers, 3–6 yrs",
"Senior individual contributors, 7–12 yrs","Newly promoted design managers","Heads of design / design leads",
"Design agency owners (5–20 people)","Engineers forced to design (HMI, frontend)","Product managers",
"Non-design startup founders","Corporate L&D buyers","Enterprise / GCC design teams",
"Design college students","Parents of design aspirants","Design college faculty",
"Recruiters and HR who hire designers","Other design educators","Tier-2/3 vernacular learners",
"Indian designers targeting global remote roles","EU/US studios hiring in India"],
OUT:["Get hired at all","Get hired abroad or fully remote","Get promoted","Raise my salary",
"Switch specialism (consumer → enterprise)","Survive AI eating my job","Build a portfolio that works",
"Write a case study I'm not ashamed of","Stop freezing in interviews","Learn to lead a team",
"Sell design internally to execs","Ship faster","Prove design ROI with numbers",
"Find peers and stop feeling alone","Get freelance clients","Choose a career direction",
"Get into a good design school","Meet a compliance deadline","Hire designers who are actually good",
"Leave design gracefully"],
HOW:["Live cohort","Self-paced video","1:1 coaching","Small-group mastermind","Async video critique",
"Membership with office hours","Newsletter","Podcast","Short-form video","In-person workshop",
"Residential retreat","Ticketed live show","Competition or awards","Physical card deck or book",
"Template / kit / swipe file","Directory or database","Software tool","Assessment + certification",
"Done-for-you service","Advisory retainer","Job board or marketplace","Study tour"],
PAY:["Learner, upfront","Learner, in EMI","Learner, monthly subscription","Employer L&D budget",
"Employer placement fee","% of the salary increase","Income share after placement","Brand sponsor",
"Design-tool vendor (co-marketing)","Ads / affiliate","Ticket sales","Entry fees",
"Licence fee from other educators","Certification fee","Monthly retainer","Equity in the client",
"Government or CSR grant","University or institution","Parents","Recruiter / hiring platform",
"Take-rate on a marketplace","Expert-network hourly"]};

/* ---------- the axis picker ----------
   ONE component, two hosts: the report's engine and the workspace. The workspace used four
   <select> elements, which hid nineteen of twenty options behind a click and gave no sense of
   the space you are choosing inside — the whole point of the page. Two different controls for
   one job is also the inconsistency operate.md warns about, so there is now one renderer.

   ACCESSIBILITY. Twenty clickable divs is not a control. Each column is a radiogroup with roving
   tabindex: one option is in the tab order, arrows move and select (standard radio behaviour),
   Home/End jump to the ends. That is a documented pattern rather than an invented affordance —
   operate.md refuses "reinventing standard affordances for flavor".

   The 'on' option is scrolled into view whenever state is set from outside (loading a bank idea,
   Surprise me), because in a 20-row scroller a selection you cannot see has not been made. */
const AXMETA=[{k:'WHO',n:1,t:'Who',c:'c1'},{k:'OUT',n:2,t:'Outcome they want',c:'c2'},
              {k:'HOW',n:3,t:"How it's delivered",c:'c3'},{k:'PAY',n:4,t:'Who pays',c:'c4'}];

/* Rendered once. Re-selecting swaps classes rather than rebuilding, so the scroll position of a
   column survives a click in it — rebuilding threw you back to the top of a 20-item list. */
function buildPicker(hostId,pfx,handler){
  const host=document.getElementById(hostId);
  if(!host)return;
  host.className='axpick';
  host.innerHTML=AXMETA.map(a=>`
    <div class="col ${a.c}">
      <div class="colhead" id="${pfx}h${a.k}"><span class="k">Axis ${a.n}</span>
        <span class="t">${a.t}</span></div>
      <div class="colbody" role="radiogroup" aria-labelledby="${pfx}h${a.k}"
           id="${pfx}${a.k}" data-ax="${a.k}" data-h="${handler}">
        ${AX[a.k].map((o,i)=>`<div class="opt" role="radio" aria-checked="false" tabindex="-1"
          data-i="${i}" onclick="${handler}('${a.k}',${i})">${o}</div>`).join('')}
      </div>
    </div>`).join('');
  host.querySelectorAll('.colbody').forEach(g=>g.addEventListener('keydown',axKey));
}

/* Paint selection. `scroll` is true only when the value changed from outside the picker. */
function syncPicker(pfx,state,scroll){
  AXMETA.forEach(a=>{
    const g=document.getElementById(pfx+a.k); if(!g)return;
    const sel=state[a.k];
    Array.from(g.children).forEach((el,i)=>{
      const on=i===sel;
      el.classList.toggle('on',on);
      el.setAttribute('aria-checked',String(on));
      el.tabIndex=on?0:-1;             /* roving: exactly one stop per column */
    });
    if(scroll&&g.children[sel])g.children[sel].scrollIntoView({block:'nearest'});
  });
}

function axKey(e){
  const g=e.currentTarget, n=g.children.length;
  const cur=Array.from(g.children).findIndex(c=>c.tabIndex===0);
  let to=-1;
  if(e.key==='ArrowDown'||e.key==='ArrowRight')to=(cur+1)%n;
  else if(e.key==='ArrowUp'||e.key==='ArrowLeft')to=(cur-1+n)%n;
  else if(e.key==='Home')to=0;
  else if(e.key==='End')to=n-1;
  else if(e.key===' '||e.key==='Enter')to=cur;
  else return;
  e.preventDefault();
  window[g.dataset.h](g.dataset.ax,to);
  const el=document.getElementById(g.id).children[to];
  if(el){el.focus();el.scrollIntoView({block:'nearest'});}
}

/* ---------- the report's engine ---------- */
const sel={WHO:2,OUT:1,HOW:19,PAY:3};
function renderAx(){
  if(!document.getElementById('engPick').firstChild)buildPicker('engPick','e','pick');
  syncPicker('e',sel,false);
  const t=document.getElementById('comboTxt');
  t.innerHTML = `<em style="color:var(--f1)">${AX.WHO[sel.WHO]}</em> who want to
   <em style="color:var(--f2)">${AX.OUT[sel.OUT].toLowerCase()}</em>, delivered as
   <em style="color:var(--f3)">${AX.HOW[sel.HOW].toLowerCase()}</em>, paid for by
   <em style="color:var(--f4)">${AX.PAY[sel.PAY].toLowerCase()}</em>.`;
}
function pick(k,i){sel[k]=i;renderAx();}
function roll(log){
  const R=k=>Math.floor(Math.random()*AX[k].length);
  if(!log){Object.keys(sel).forEach(k=>sel[k]=R(k));renderAx();syncPicker('e',sel,true);return;}
  const rows=[];
  for(let n=0;n<5;n++){const w=R('WHO'),o=R('OUT'),h=R('HOW'),p=R('PAY');
    rows.push(`<div class="card" style="padding:var(--sp-3) var(--sp-4);font-size:var(--t-sm)">
      <span style="color:var(--f1)">${AX.WHO[w]}</span> ·
      <span style="color:var(--f2)">${AX.OUT[o].toLowerCase()}</span> ·
      <span style="color:var(--f3)">${AX.HOW[h].toLowerCase()}</span> ·
      <span style="color:var(--f4)">${AX.PAY[p].toLowerCase()}</span></div>`);}
  document.getElementById('rollLog').innerHTML=rows.join('');
}
