/* ---------- scatter ---------- */
const PTS=[
{n:6,l:"Portfolio surgery",x:95,y:20},{n:112,l:"Fractional head of design",x:85,y:40},
{n:111,l:"Expert network calls",x:80,y:15},{n:43,l:"Async critique",x:90,y:25},
{n:16,l:"Salary negotiation",x:74,y:30},{n:41,l:"Container, no curriculum",x:70,y:46},
{n:34,l:"Study-abroad apps",x:65,y:60},{n:110,l:"Workshop a month",x:60,y:50},
{n:109,l:"Six-person mastermind",x:55,y:35},{n:2,l:"Enterprise bootcamp",x:50,y:70,p:1},
{n:85,l:"AI-proof practice",x:55,y:76,p:1},{n:80,l:"EU accessibility compliance",x:54,y:78},
{n:33,l:"UCEED / NID prep",x:45,y:74},{n:29,l:"Corporate L&D workshops",x:44,y:72},
{n:23,l:"GCC upskilling",x:40,y:90,p:1},{n:75,l:"Hinglish education",x:39,y:80},
{n:87,l:"Agentic UX",x:34,y:85,p:1},{n:78,l:"Global remote placement",x:30,y:86,p:1},
{n:70,l:"India Design Awards",x:25,y:65},{n:67,l:"Enterprise UX newsletter",x:24,y:55,p:1},
{n:50,l:"Take-rate marketplace",x:20,y:80},{n:89,l:"Honest AI tool lab",x:19,y:45},
{n:37,l:"India's Got Designers",x:14,y:50},{n:52,l:"Certification body",x:10,y:95},
/* Plotted next to #29, because it is the same motion: an L&D budget, a 4–12 week cycle, and a
   ceiling set by how many teams you can run a cohort for. Placed by hand like every other point. */
{n:113,l:"Business thinking",x:42,y:72},
/* Faster to cash than #113 — a learner pays by card, with no procurement — and a lower ceiling,
   because the people who will pay to leave their job are a much smaller pool than the teams an
   employer will fund. Same content, different buyer, and the map should show that as a trade. */
{n:114,l:"First company",x:52,y:58}];
function drawScatter(){
  const W=1000,H=560,P={t:34,r:150,b:52,l:64};
  const dark=document.documentElement.dataset.theme==='dark';
  const grid=dark?'#2c2c2a':'#e1e0d9', axis=dark?'#383835':'#c3c2b7';
  const pk=dark?'#3987e5':'#2a78d6', mu=dark?'#5f5f5c':'#b9b8b1';
  const X=v=>P.l+(v/100)*(W-P.l-P.r), Y=v=>H-P.b-(v/100)*(H-P.t-P.b);
  let s=`<svg viewBox="0 0 ${W} ${H}">`;
  s+=`<rect x="${X(50)}" y="${P.t}" width="${W-P.r-X(50)}" height="${Y(50)-P.t}" fill="${pk}" opacity="${dark?.07:.05}"/>`;
  [0,25,50,75,100].forEach(v=>{
    s+=`<line x1="${X(v)}" y1="${P.t}" x2="${X(v)}" y2="${H-P.b}" stroke="${v===50?axis:grid}" stroke-width="${v===50?2:1}"/>`;
    s+=`<line x1="${P.l}" y1="${Y(v)}" x2="${W-P.r}" y2="${Y(v)}" stroke="${v===50?axis:grid}" stroke-width="${v===50?2:1}"/>`;});
  s+=`<text class="qlab" x="${X(52)}" y="${P.t+16}">build here — fast money, gets big</text>`;
  s+=`<text class="qlab" x="${P.l+8}" y="${P.t+16}">slow, but the ceiling is real</text>`;
  s+=`<text class="qlab" x="${P.l+8}" y="${H-P.b-10}">avoid — slow and capped</text>`;
  s+=`<text class="qlab" x="${X(52)}" y="${H-P.b-10}">cash now, no ceiling — use as runway</text>`;
  s+=`<text class="axlab" x="${(P.l+W-P.r)/2}" y="${H-14}" text-anchor="middle">Speed to first rupee →</text>`;
  s+=`<text class="axlab" transform="rotate(-90 18 ${(P.t+H-P.b)/2})" x="18" y="${(P.t+H-P.b)/2}" text-anchor="middle">Revenue ceiling →</text>`;
  PTS.forEach(p=>{
    s+=`<circle class="dot" cx="${X(p.x)}" cy="${Y(p.y)}" r="${p.p?8:5.5}" fill="${p.p?pk:mu}"/>`;
    s+=`<text class="dlab${p.p?' pick':''}" x="${X(p.x)+12}" y="${Y(p.y)+4}">${p.n} ${p.l}</text>`;});
  document.getElementById('scatter').innerHTML=s+'</svg>';
}

/* ---------- gantt ---------- */
const G=[["Pick 3 finalists",1,2,"--s4"],["20 problem interviews",2,6,"--f1"],
["Synthesise: is the pain real?",7,7,"--s5"],["Money test — pre-sell for real money",8,10,"--f2"],
["Concierge-deliver to 3 buyers",11,13,"--f3"],["Decide against kill criteria",14,14,"--crit"]];
function drawGantt(){
  let h='<div></div><div class="gdays">'+Array.from({length:14},(_,i)=>`<div>${i+1}</div>`).join('')+'</div>';
  G.forEach(([n,a,b,c])=>{
    const L=(a-1)/14*100, W=(b-a+1)/14*100;
    h+=`<div class="gname">${n}</div><div class="gtrack">
      <div class="gbar" style="left:${L}%;width:${W}%;background:var(${c})">Day ${a}${b>a?'–'+b:''}</div></div>`;});
  document.getElementById('gantt').innerHTML=h;
}

