const CRIT2=["What they’ll pay",
             "People you can reach",
             "Your edge here",
             "How soon you get paid",
             "How big it can get",
             "How hard to copy",
             "Works anywhere",
             "Your energy for it"];
/* [what a 5 means, what a 1 means, which axis to change to fix it] */
const CRIT_DEF=[
["they already spend money on this problem today","they would like it, for free","who pays — or pick a more urgent outcome"],
["you can reach twenty of them this week, from contacts you already have","you would have to buy ads to find a single one","who — pick a group you can already reach"],
["you can say something here that almost nobody else can","you are a generic entrant with no edge","the outcome — pick one your background actually supports"],
["money in the bank inside two weeks","six months of building before anyone can pay","how — pick a lighter format"],
["₹1 crore a year is reachable without a team","capped in the low lakhs however hard you work","who pays — an organisation, not an individual"],
["hard to copy inside a year","copyable over a weekend","the outcome, or move toward assessment and certification"],
["fully async, any timezone, no travel","tied to a specific room on a specific date","how — away from rooms and dates"],
["you would still want to do it in month fourteen","bored of it by week three","how — a format you would genuinely enjoy repeating"]];
/* Which criteria the engine cannot actually know about Sandeep, and is therefore guessing. */
const CRIT_GUESS=[0,1,1,0,0,0,0,1];
const GUESS_WHY=["","assumes how far your network reaches — all I know is that you work at Boeing",
  "assumes how much this group would trust you","","","","",
  "read off the format's demands, not off your temperament"];
const BANDS=[
["DEAD","--crit","Either gate reads 1. Stop. No total rescues this."],
["ASSET, NOT REVENUE","--warn","Willingness to pay is 1–2. Run it to build audience, put the invoice elsewhere."],
["WEAK","--serious","28 or below — outside the best 25% of all combinations. Change an axis."],
["WORTH TESTING","--warn","29–31. In the best 25%. Twenty interviews, not six months."],
["BUILD","--good","32–40. Top 4% of 193,600, both gates clear. Take money for it this fortnight."]];
function HOWTO(){
  return `<details class="howto">
   <summary><span class="chev">${icon('chevron','sm')}</span>How to read this table
     <span class="hint">what "gate" means, what each column measures, and the verdict bands</span></summary>
   <div class="ht-body">
   <div class="ht-gate"><b>A gate is pass/fail, not a score.</b> Only the first two columns are gates.
    If either one reads <b>1</b>, the idea is dead regardless of the total — because every other
    weakness here is fixable later and these two are not. You can raise a ceiling, build a moat, or
    find energy. You cannot sell to people who will not pay, and you cannot sell to people you cannot
    reach. Everything to the right of the gates is a trade-off. The gates are preconditions.</div>
   <div class="ht-grid">${CRIT2.map((c,i)=>`<div class="ht-c">
     <div class="cn">${c}${i<2?'<span class="cg">GATE</span>':''}${CRIT_GUESS[i]?'<span class="cg" style="color:var(--f4)">GUESS</span>':''}</div>
     <div class="cd"><b>5</b> ${CRIT_DEF[i][0]} · <b>1</b> ${CRIT_DEF[i][1]}
     ${CRIT_GUESS[i]?`<br><span style="color:var(--f4)">Not knowable by me: ${GUESS_WHY[i]}. Override it.</span>`:''}</div></div>`).join('')}</div>
   <div class="ht-gate" style="border-left-color:var(--f4);margin-top:12px">
    <b>Three of these eight are guesses about you, not about the market.</b> How many people you can
    reach and whether you have an edge both depend on your network and on how much people trust you.
    All I know is that you work at Boeing and studied at Politecnico di Milano. Energy is read off
    what the format demands, not off what you are like. Where you disagree, you are right and the
    engine is wrong. The other five follow from the axes and the pricing evidence.</div>
   <div class="ht-t">Each column is 1–5, so 40 is the maximum. Darker blue is higher.</div>
   <div class="ht-bands">${BANDS.map(b=>
     `<span class="bb" style="color:var(${b[1]})">${b[0]}</span><span class="bd">${b[2]}</span>`).join('')}</div>
  </div></details>`;
}
function readRow(S){
  const tot=S.reduce((a,b)=>a+b), mn=Math.min(...S), mx=Math.max(...S);
  const lo=S.indexOf(mn), hi=S.indexOf(mx);
  const gateFail=S[0]===1||S[1]===1;
  const fives=S.map((v,i)=>[v,i]).filter(x=>x[0]===5).map(x=>CRIT2[x[1]].toLowerCase());
  const weak=S.map((v,i)=>[v,i]).filter(x=>x[0]<=2).map(x=>CRIT2[x[1]].toLowerCase());
  const carry=fives.length?`<b>${fives.join(", ")}</b> at 5`
    :mx===4?`nothing reaches 5 — the best you have is <b>${CRIT2[hi].toLowerCase()}</b> at 4`
    :`nothing scores above ${mx}, which is itself the finding`;
  let gap="";
  if(gateFail)gap="Irrelevant — a gate failed.";
  else if(S[0]<=2)gap=`The total is respectable, but willingness to pay at ${S[0]} overrides it: this is an audience asset, not a revenue line.`;
  else if(tot>=32)gap="That is a BUILD — the best 4% of all 193,600 combinations.";
  else if(tot>=29)gap=`<b>${32-tot} point${32-tot>1?'s':''}</b> short of BUILD, and inside the best 25%.`;
  else gap=`<b>${32-tot} points</b> short of BUILD and outside the best 25% — more than one axis needs to change.`;
  return `<div class="readrow"><div class="rt">Reading this specific row</div><ul>
   <li><b>Gates:</b> what they will pay ${S[0]}, people you can reach ${S[1]} —
     ${gateFail?`<b style="color:var(--crit)">one of them reads 1, so this is dead.</b> Nothing else on the row matters.`
     :`neither reads 1, so the idea survives and the rest of the row is worth reading.`}</li>
   <li><b>Carrying it:</b> ${carry}.</li>
   <li><b>Dragging it:</b> ${weak.length?weak.join(", "):"nothing scores 2 or below, so there is no single obvious hole"}.
     Weakest link is <b>${CRIT2[lo].toLowerCase()}</b> at ${mn}.</li>
   <li><b>Total ${tot} of 40.</b> ${gap}</li>
   <li><b>Cheapest thing to change:</b> ${CRIT_DEF[lo][2]}. That is the axis to move first —
     re-pick it above and press Create idea again to see whether the total moves.</li>
  </ul></div>`;
}
function scoreIt(w,o,h,p){
  const cl=v=>Math.max(1,Math.min(5,Math.round(v)));
  const wtpRaw=(MO[o][1]+MP[p][0]+MW[w][2])/3;
  let wtp=cl(wtpRaw);
  if(CONTENT.includes(h)&&[0,1,2,3,4].includes(p))wtp=Math.min(wtp,2);
  if(EMPLOYER.includes(p)&&NO_EMPLOYER.includes(w))wtp=1;
  if(p===18&&!KIDS.includes(w))wtp=1;
  let dist=cl(MW[w][0]+(CONTENT.includes(h)?0.5:0)-(h===20?1:0));
  if(p===13)dist=Math.min(dist,MW[w][0]>=4?2:1);
  const fit=cl((MW[w][1]*2+MO[o][3])/3);
  const spd=cl(Math.min(MH[h][1],MP[p][1])+0.35);
  const ceil=cl((MP[p][2]+MH[h][3]+MW[w][3])/3);
  const def=cl((MP[p][4]+MW[w][1]+MH[h][0]*0.6)/2.6);
  const loc=MH[h][2];
  const en=cl((MH[h][5]*2+MO[o][3])/3);
  return [wtp,dist,fit,spd,ceil,def,loc,en];
}
function verdict(S,F){
  const gate=(S[0]===1||S[1]===1), tot=S.reduce((a,b)=>a+b);
  if(gate)return{k:"dead",t:"DEAD — GATE FAILURE",c:"--crit",
    d:"A 1 on what they will pay, or on how many you can reach, kills an idea whatever the total says. Do not argue with it. Change an axis and roll again."};
  if(F.some(f=>f.t==="bad"))return{k:"dead",t:"STRUCTURALLY BROKEN",c:"--crit",
    d:"The combination contains a contradiction flagged above. The scores are academic until you fix it."};
  if(S[0]<=2)return{k:"hold",t:"ASSET, NOT REVENUE",c:"--warn",
    d:"What they will pay is "+S[0]+". Whatever else this scores, nobody is handing over real money for it. That does not make it worthless — it makes it a way to build an audience, like idea #67. Run it for the audience, and send the invoice somewhere else."};
  /* Bands are anchored to the measured distribution of all 193,600 combinations, not chosen by
     feel. Across the scoreable remainder: median 27, p75 = 29, p96 = 32, max 37.
     So BUILD >= 32 is the top ~4% and TEST >= 29 is the top quartile.
     The old TEST floor of 26 sat below the median and passed 47% of everything — useless. */
  if(tot>=32)return{k:"live",t:"BUILD — TEST THIS",c:"--good",
    d:"Top 4% of all 193,600 combinations, and it clears both gates. Take it into the two-week sprint below and try to take money for it before you build anything."};
  if(tot>=29)return{k:"hold",t:"WORTH TESTING",c:"--warn",
    d:"In the best 25%, no fatal flaw, nothing that stands out either. Worth twenty interviews, not six months. Compare it against the top of the bank before you commit."};
  return{k:"hold",t:"WEAK — KEEP ROLLING",c:"--serious",
    d:"Outside the best 25%, with no gate failure. Nothing here is pulling its weight. That is a fine result: you learned it in ten seconds instead of ten months. Change the axis that scored lowest and go again."};
}

