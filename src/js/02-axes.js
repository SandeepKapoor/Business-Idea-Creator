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
const sel={WHO:2,OUT:1,HOW:19,PAY:3};
function renderAx(){
  [["cWHO","WHO"],["cOUT","OUT"],["cHOW","HOW"],["cPAY","PAY"]].forEach(([id,k])=>{
    document.getElementById(id).innerHTML = AX[k].map((o,i)=>
      `<div class="opt${sel[k]===i?' on':''}" onclick="pick('${k}',${i})">${o}</div>`).join('');});
  const t=document.getElementById('comboTxt');
  t.innerHTML = `<em style="color:var(--f1)">${AX.WHO[sel.WHO]}</em> who want to
   <em style="color:var(--f2)">${AX.OUT[sel.OUT].toLowerCase()}</em>, delivered as
   <em style="color:var(--f3)">${AX.HOW[sel.HOW].toLowerCase()}</em>, paid for by
   <em style="color:var(--f4)">${AX.PAY[sel.PAY].toLowerCase()}</em>.`;
}
function pick(k,i){sel[k]=i;renderAx();}
function roll(log){
  const R=k=>Math.floor(Math.random()*AX[k].length);
  if(!log){Object.keys(sel).forEach(k=>sel[k]=R(k));renderAx();return;}
  const rows=[];
  for(let n=0;n<5;n++){const w=R('WHO'),o=R('OUT'),h=R('HOW'),p=R('PAY');
    rows.push(`<div class="card" style="padding:12px 14px;font-size:13.5px">
      <span style="color:var(--f1)">${AX.WHO[w]}</span> ·
      <span style="color:var(--f2)">${AX.OUT[o].toLowerCase()}</span> ·
      <span style="color:var(--f3)">${AX.HOW[h].toLowerCase()}</span> ·
      <span style="color:var(--f4)">${AX.PAY[p].toLowerCase()}</span></div>`);}
  document.getElementById('rollLog').innerHTML=rows.join('');
}

