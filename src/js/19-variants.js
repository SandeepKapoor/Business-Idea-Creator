/* ---------- variants ----------
   The four axes fix the SHAPE of a business. They do not fix the strategic angle.
   Each archetype below is a different way to build the same combination — and each
   moves the scores, the price and the kill criteria, which is the whole point.

   an: what the angle is    gv: what it costs you    ex: the same angle, applied to THIS idea
   ex(W,H,O,C) is built from the live combination, so the reader never has to translate a
   generic analogy onto their own market. C carries {s: a nameable slice of W, y: the
   conventional advice W is given, core: this variant's price, base: the same idea at x1}.
   Both C.s and C.y are editorial characterisations, not measured facts — see the
   provenance note rendered under the cards. */
const ARCH=[
{k:'wedge',nm:'Wedge',pm:1.3,dS:[1,1,1,1,-1,1,0,0],
 w1:`WHO`,
 lem:`Same stand, same lemonade — but it is parked outside one gym, and it is only for people finishing a workout.`,
 df:`Who you sell to — one narrow slice, not everyone`,
 ti:t=>`The ${t} Wedge`,
 an:(W,H)=>`Same ${H}, same promise — but built for one narrow slice of ${W} rather than all of them. Fewer people to sell to, and far more precise about what you say to each one.`,
 ex:(W,H,O,C)=>`Instead of the ${H} for ${W} in general, you run it only for ${C.s}. Someone who fits that reads your first line and thinks: that is me.`,
 gv:`A smaller top end, on purpose. A tenth of the audience is a tenth of the money — what you buy with that is a message that lands.`,
 f:{who:(W,H,O,C)=>`Not all ${W} — only ${C.s}. Everyone else is deliberately out of scope.`},
 kl:W=>`If you cannot name the sub-group of ${W} in five words, the wedge does not exist yet.`,
 ts:`Interview twenty people from that one slice only. Ten of them describing the same pain in the same words means the wedge is real.`},
{k:'proof',nm:'Proof engine',pm:1.0,dS:[1,0,0,1,0,0,0,-1],
 w1:`WHAT`,
 lem:`Same stand — but the sign promises one thing: the best lemonade in town. No smoothies, no coffee, no snacks.`,
 df:`What you promise — one finished thing, and nothing else`,
 ti:t=>`The ${t} Proof Engine`,
 an:(W,H,O)=>`You promise one finished thing — ${O} — and nothing else at all. The ${H} stops being the product and becomes the machine that gets it done.`,
 ex:(W,H,O,C)=>`Strip the page down to one line: they leave with ${O}. On the last day it exists or it does not, which is exactly why people will pay before it starts.`,
 gv:`Repetitive by about month six. You trade variety in your own work for a promise nobody can argue with.`,
 f:{out:(W,H,O,C)=>`That, and nothing else. Promise one thing and on the last day it exists or it does not.`},
 kl:W=>`If a buyer cannot tell from the outside whether the thing got made, this is not a proof engine — it is a course with a promise attached.`,
 ts:`Pre-sell it as a dated deliverable with a written refund clause. If the deadline scares you, the scope is wrong, not the idea.`},
{k:'flagship',nm:'Flagship',pm:3.0,dS:[-1,-1,1,-1,2,1,0,0],
 w1:`PRICE`,
 lem:`Same lemonade — but ₹1,000 a glass, pressed in front of you, ten glasses a day and no more.`,
 df:`The price — far higher, far fewer people, much more of your time`,
 ti:t=>`The ${t} Flagship`,
 an:(W,H)=>`The expensive version: far fewer people, much more of your own time, and a price only serious buyers will accept. The ${H} is unchanged — what they are buying is access to you.`,
 ex:(W,H,O,C)=>C.core>C.base
   ?`Rather than ${inr(C.base)} for a seat among many, you charge ${inr(C.core)} to work on ${O} with a handful of ${W} directly.`
   :`Rather than a seat among many, you charge several times as much to work on ${O} with a handful of ${W} directly.`,
 gv:`Far fewer buyers, and each sale takes much longer. Nobody buys at this price on impulse, and most of them will say no.`,
 f:{run:(W,H,O,C)=>`A handful of people instead of a room, and far more of your own time on each one.`,
    pay:(W,H,O,C)=>`About ${inr(C.core)} — three times the usual price. Nobody buys at that on impulse, so expect a long conversation before every yes.`},
 kl:W=>`If nobody among ${W} has paid anything like this price in the last year, nothing similar has ever sold. Kill it.`,
 ts:`Do not build it. Sell three seats by hand, on calls, at full price. If three is hard, thirty is impossible.`},
{k:'container',nm:'Container only',pm:0.7,dS:[0,0,-1,2,-1,-1,1,1],ap:h=>[0,1,3,5].includes(h),
 w1:`DELIVERY`,
 lem:`Same lemonade — but you do not buy a cup. You join a 30-day challenge with dates, a group, and someone who notices if you skip.`,
 df:`What you deliver — deadlines and a group, instead of teaching`,
 ti:t=>`The ${t} Container`,
 an:(W,H)=>`You stop teaching. You sell deadlines, a group going through the same thing, and someone who notices when one of them goes quiet — they bring their own work.`,
 ex:(W,H,O,C)=>`No lessons, no slides. You publish the dates, put ${W} in one room, and have each of them show their work on a fixed day. They still leave with ${O} — made by them.`,
 gv:`Easy to copy, and it can feel like too little for the money. You give up content nobody needed for the one thing a recorded course cannot do.`,
 f:{run:(W,H,O,C)=>`No lessons and no slides. You publish the dates, and each of them shows their own work on a fixed day.`,
    out:(W,H,O,C)=>`Made by them, on your deadlines. You never teach it.`},
 kl:W=>`If fewer than half the first cohort finish, the container is not tight enough. That is a design failure, not a marketing one.`,
 ts:`Run one free cohort of eight people with nothing but a calendar and a call link. Measure completion, not satisfaction.`},
{k:'ladder',nm:'Ladder',pm:0.35,dS:[-1,2,0,1,1,-1,0,-1],ap:h=>![19,21].includes(h),
 w1:`STEPS`,
 lem:`Same lemonade — but a ₹20 taster first. The people who come back buy the ₹200 jug, and later the party order.`,
 df:`The way in — a cheap first step that leads to the real thing`,
 ti:t=>`The ${t} Ladder`,
 an:(W,H)=>`You start with something cheap and genuinely useful. Its job is not the money — it is to find out who is serious, and make the expensive step feel obvious.`,
 ex:(W,H,O,C)=>C.core<C.base
   ?`One small piece at about ${inr(C.core)}, roughly a third of full price. The people who finish it are the ones who later pay ${inr(C.base)} for the whole ${H}.`
   :`One small piece at a fraction of full price. The people who finish it are the ones who come back for the whole ${H}.`,
 gv:`The cheap thing alone will never pay your bills, and you now run two products. It only works if the step up is real and obvious.`,
 f:{pay:(W,H,O,C)=>C.core<C.base
      ?`About ${inr(C.core)} for the small first step. The ones who finish it come back for the ${inr(C.base)} version — that second payment is the business.`
      :`A small amount for the first step. The ones who finish it come back for the full version — that second payment is the business.`},
 kl:W=>`If under 10% of entry buyers climb to the next rung within 90 days, the ladder has no second rung — it is just a cheap product.`,
 ts:`Sell only the bottom rung to thirty people, then count how many ask, unprompted, what comes next.`},
{k:'anti',nm:'Contrarian',pm:1.6,dS:[-1,1,1,1,-1,2,0,1],
 w1:`MESSAGE`,
 lem:`Same lemonade — but the sign reads: cold-pressed juice is a con. People stop to argue, and some of them stay.`,
 df:`How you sell it — a public argument, not a list of features`,
 ti:t=>`The Anti-${t} Play`,
 an:(W,H)=>`You disagree in public, under your own name, with the thing everyone in this market repeats. The ${H} then becomes the proof that you were right.`,
 ex:(W,H,O,C)=>`The usual advice given to ${W} is ${C.y}. You say plainly that this is wrong, and run the ${H} as your evidence.`,
 gv:`Fewer buyers, because you have to win the argument first. In return: attention you could not have bought, and a position nobody can copy without looking like a copy.`,
 f:{who:(W,H,O,C)=>`The part of ${W} who already suspect the usual advice — ${C.y} — is wrong. You lose the rest, and that is the trade.`},
 kl:W=>`If you would not say it on the record, with your name on it, you do not believe it enough to build on it.`,
 ts:`Publish the argument first, for free, and see whether it makes anyone angry. The thing to fear is that nobody cares. Someone disagreeing is fine.`},
{k:'synd',nm:'Syndicate',pm:0.9,dS:[0,-1,-1,-2,2,1,1,-1],ap:h=>![21].includes(h),
 w1:`TEAM`,
 lem:`Same lemonade — but three other people run stands using your recipe and your name, and you take a cut of each.`,
 df:`Who delivers it — other people, to your standard, for a cut`,
 ti:t=>`The ${t} Syndicate`,
 an:(W,H)=>`You stop delivering it. Other people run it to your standard and you take a share — your job becomes deciding who is allowed to use your name.`,
 ex:(W,H,O,C)=>`Train three people to run this ${H} for ${W}, and take a cut of each. You stop teaching and start choosing who may teach.`,
 gv:`By far the slowest to start, and two groups to keep happy instead of one. In return, it runs when you are ill, busy or asleep.`,
 f:{run:(W,H,O,C)=>`You are not in the room. Other people run it to your standard, and your job is deciding who is allowed to.`,
    pay:(W,H,O,C)=>`You take a share of what each of them collects, not the whole fee. Two groups to keep happy instead of one.`},
 kl:W=>`If you cannot name three people who would deliver this at your standard, for your cut, you are the syndicate — and that is the version you already have.`,
 ts:`Sign one deliverer before you sign one buyer. Supply is the hard side here, not demand.`}];
/* An idea on this page is now PREMISE × ANGLE on top of the four axes. PIDX picks what happens
   inside, VIDX picks the one structural thing that changes about how it is built. PREMS[0] is
   always 'none' with zero deltas and a ×1 multiplier, so the default state of this page scores
   and prices exactly as it did before the premise dimension existed. */
let VARS=[],VIDX=0,PREMS=[],PIDX=0,AXS=[0,0,0,0],LASTKEY='',VI=false,PI=false;
/* Which sub-problem of the outcome this business is about. -1 = not chosen, which is the default
   so the page scores exactly as it did before routes existed. See 18b-routes.js. */
let RTS=[],RIDX=-1;
const curRoute=()=>RIDX>=0&&RTS[RIDX]?RTS[RIDX]:null;
const clamp5=v=>Math.max(1,Math.min(5,v));
/* Premise and angle deltas are summed and clamped ONCE. Clamping after each in turn would let
   a premise that pushes a criterion to 5 swallow an angle's +1 and quietly hide the trade-off. */
function buildVars(w,o,h,p,P,R){
  const base=scoreIt(w,o,h,p), F=rules(w,o,h,p), rd=routeD(R);
  const tag=MO[o][4];
  return ARCH.filter(a=>!a.ap||a.ap(h)).map(a=>{
    /* Route, work and twist all land on the same eight numbers and are clamped together. */
    const S=base.map((v,i)=>clamp5(v+rd[i]+P.dS[i]+a.dS[i]));
    const V=verdict(S,F);
    let core=HOW_BASE[h]*PAY_MULT[p]*(0.85+MW[w][2]*0.06)*P.pm*a.pm;
    core=Math.max(500,Math.round(core/500)*500);
    return {a,P,S,tot:S.reduce((x,y)=>x+y),V,F,core,
      /* A chosen route names the business. It is the most concrete thing on the card, so it
         outranks both the work and the twist for the title. */
      title:R?R.nm:(P.k==='none'?a.ti(tag):`The ${tag} ${P.tn}`),nm:a.nm};});
}
function setVar(i){
  if(i<0)i=VARS.length-1; if(i>=VARS.length)i=0;
  VIDX=i; renderVars(1);
  document.getElementById('vnav').scrollIntoView({behavior:'smooth',block:'start'});
}
/* Switching premise rebuilds the angle set, because every angle's score and price sit on top of
   the premise's. The angle you were reading is kept — the whole point is comparing like for like. */
/* Picking a business. -1 clears it and the page goes back to the four axes alone. */
function setRoute(i){
  RIDX=(i===RIDX?-1:i);
  const [w,o,h,p]=AXS;
  VARS=buildVars(w,o,h,p,PREMS[PIDX],curRoute());
  if(VIDX>=VARS.length)VIDX=0;
  renderVars(1);
  document.getElementById('rtlist').scrollIntoView({behavior:'smooth',block:'start'});
}
function setPrem(i){
  if(i<0)i=PREMS.length-1; if(i>=PREMS.length)i=0;
  PIDX=i;
  const [w,o,h,p]=AXS;
  VARS=buildVars(w,o,h,p,PREMS[PIDX],curRoute());
  if(VIDX>=VARS.length)VIDX=0;
  renderVars(1);
  document.getElementById('vnav').scrollIntoView({behavior:'smooth',block:'start'});
}
function gen(silent){
  const w=AXPICK.WHO,o=AXPICK.OUT,h=AXPICK.HOW,p=AXPICK.PAY;
  LAST=[w,o,h,p]; AXS=[w,o,h,p];
  const key=[w,o,h,p].join();
  if(key!==LASTKEY){VIDX=0;PIDX=0;RIDX=-1;LASTKEY=key;}  /* new combination → clear all three */
  PREMS=premFor(h,o);   /* format decides which premises exist; outcome rules out the impossible */
  RTS=routesFor(o);     /* routes come off the outcome alone — the container does not filter them */
  if(PIDX>=PREMS.length)PIDX=0;
  if(RIDX>=RTS.length)RIDX=-1;
  VARS=buildVars(w,o,h,p,PREMS[PIDX],curRoute());
  if(VIDX>=VARS.length)VIDX=0;
  renderVars(silent);
}
function renderVars(silent){
  const [w,o,h,p]=AXS;
  const dark=document.documentElement.dataset.theme==='dark';
  const CUR=VARS[VIDX], A=CUR.a;
  const S=CUR.S, F=CUR.F, V=CUR.V, tot=CUR.tot, title=CUR.title, core=CUR.core;
  const eF=core>=500000?0.08:core>=100000?0.2:0.4;
  const entry=Math.max(500,Math.round(core*eF/500)*500), prem=Math.round(core*2.6/500)*500;
  const target=Math.max(25000,+document.getElementById('tgt').value||250000);
  const recur=RECUR_H.includes(h)||p===2;
  /* recurring → standing members needed. one-off → sales per year to hit the annual target. */
  const units=recur?Math.ceil(target/core):Math.ceil(target*12/core);
  const perMonth=recur?units:target*12/core/12;
  const yearly=recur?core*units*12:core*units;
  const tight=units;
  const near=nearest(w,o,h,p);
  const PC=priceCheck(h,p,core);
  const WS=MW[w][4], HS=MH[h][6].toLowerCase(), OS=MO[o][5];
  /* Context for the worked examples. base is this same idea with no angle applied — the Proof
     engine carries pm 1.0 and has no format filter, so it is always present to read it off. */
  const baseCore=(VARS.find(x=>x.a.pm===1)||CUR).core;
  const exc=v=>({s:MW[w][6],y:MW[w][7],core:v.core,base:baseCore});

  let html="";
  /* loaded-from-the-bank banner — dropped the moment any dropdown is changed */
  if(ORIGIN&&TAGS[ORIGIN]&&TAGS[ORIGIN].join()!==[w,o,h,p].join())ORIGIN=null;
  if(ORIGIN){
    const src=ALLC.find(c=>c.n===ORIGIN);
    let diff="";
    if(src&&src.hand&&src.tot!==tot)diff=` In the bank it carries my hand score of <b>${src.tot}</b>;
      the engine derives <b>${tot}</b> from these four axes. Where they disagree, trust the hand score —
      the axes are a summary of the idea, not the whole of it.`;
    else if(src&&src.hand)diff=` My hand score and the derived score agree at <b>${tot}</b>.`;
    const rw=CL.flatMap(c=>c.i).find(x=>x[0]===ORIGIN);
    const revenue=recur?`recurring — ${inr(core)} a month per customer`
      :`one-off — ${inr(core)} a sale`;
    const shape=MH[h][4]===1
      ?`It bills your calendar: every sale costs you hours, so the time you have is the limit.`
      :`It runs without you once built, so revenue is not capped by your hours.`;
    html+=`<div class="origin"><div><b>Loaded from the bank · #${ORIGIN} ${src?src.nm:''}</b>
      <div class="obiz">
        <p style="margin:0 0 8px">${rw?rw[2]:''}</p>
        <p style="margin:0 0 8px"><b>What it is as a business:</b> you sell
        ${/^[aeiou]/i.test(HS)?'an':'a'} ${HS} to ${WS} so they get ${OS}.
        ${AX.PAY[p]} pays, revenue is ${revenue}, and the sales cycle runs ${MOTION[p][1]}.</p>
        <p style="margin:0"><b>The shape of it:</b> ${shape} ${
        MH[h][2]>=4?'It works from any timezone.':'It ties you to a specific place on a specific date.'}
        ${S[0]<=2?'<b style="color:var(--warn)">And nobody will pay much for it — treat it as an audience asset, not a revenue line.</b>':''}</p>
      </div>
      <div class="tiny" style="margin-top:10px">These four dropdowns are my reading of that idea's axes.
      Change any one to fork it — the banner disappears once you do.${diff}</div></div>
      <button class="chip oback" onclick="backToTable()">${icon('arrow-left','sm')} back to the table</button></div>`;
  }
  /* statement */
  html+=`<div class="stmt"><div class="lb">${ORIGIN?`Bank idea #${ORIGIN}`:'Your combination'} · #${w+1}·${o+1}·${h+1}·${p+1} of 193,600</div>
    <div class="sx"><em style="color:var(--f1)">${AX.WHO[w]}</em> who want to
    <em style="color:var(--f2)">${AX.OUT[o].toLowerCase()}</em>, delivered as
    <em style="color:var(--f3)">${AX.HOW[h].toLowerCase()}</em>, paid for by
    <em style="color:var(--f4)">${AX.PAY[p].toLowerCase()}</em>.</div></div>`;

  /* ---------- the businesses ----------
     Under the statement, before anything structural. These are not variations of one idea the
     way the work and the twist are: they are different businesses, told apart by which
     sub-problem of the outcome they attack. "Get hired abroad" is five problems, not one.

     Scored at the work and twist currently selected, so the column is a like-for-like comparison
     of the businesses themselves rather than each quoting its own best case. */
  const baseS0=scoreIt(w,o,h,p), baseF0=rules(w,o,h,p);
  if(RTS.length){
    const rAt=R=>{const rd=routeD(R);
      const s=baseS0.map((v,i)=>clamp5(v+rd[i]+PREMS[PIDX].dS[i]+VARS[VIDX].a.dS[i]));
      return{tot:s.reduce((x,y)=>x+y),V:verdict(s,baseF0)};};
    const none=rAt(null);
    html+=`<div class="rtlist" id="rtlist">
      <div class="rthead"><b>${RTS.length} businesses</b> you could build from these four axes.
        They are not versions of one idea — each attacks a different part of
        <em style="color:var(--f2)">${AX.OUT[o].toLowerCase()}</em>. Pick one and the whole page
        builds for it.</div>
      <table class="rtab"><tbody>
        <tr class="rrow${RIDX<0?' on':''}" onclick="setRoute(-1)">
          <td class="rn">${RIDX<0?icon('chevron','xs')+' ':''}Not chosen</td>
          <td class="rv">The four axes alone, with no particular subject.</td>
          <td class="rs" style="color:var(${none.V.c})">${none.tot}</td>
          <td class="rvd" style="color:var(${none.V.c})">${none.V.t.split(' —')[0]}</td></tr>
        ${RTS.map((R,i)=>{const q=rAt(R);return `<tr class="rrow${i===RIDX?' on':''}" onclick="setRoute(${i})">
          <td class="rn">${i===RIDX?icon('chevron','xs')+' ':''}${R.nm}</td>
          <td class="rv">${R.v}<span class="rmore">${R.an}</span></td>
          <td class="rs" style="color:var(${q.V.c})">${q.tot}</td>
          <td class="rvd" style="color:var(${q.V.c})">${q.V.t.split(' —')[0]}</td></tr>`;}).join('')}
      </tbody></table>
      <div class="prov judg" style="margin-top:var(--sp-3)">These are my reading of what
      <i>${AX.OUT[o].toLowerCase()}</i> actually breaks into, not a list mined from anywhere. They
      are hypotheses in exactly the way the 112 ideas are — the value is that they are different
      from each other, not that any one of them is right. Nothing here is a market claim.</div>
    </div>`;
  }

  /* ---------- the navigator ----------
     Two rows, because an idea here is two independent choices. The old single row said
     "Idea 1 of 7", which was a lie — those were seven twists on ONE idea, and it is what made
     the whole page look like a single combination could only ever produce one business.
     The work on top (what you actually do), the twist below (the one thing that changes).

     "Premise" and "angle" were my words, not plain English, so the UI says "work" and "twist"
     everywhere. The identifiers stay PREM / ARCH — renaming those buys nothing and costs a
     diff nobody can read. */
  const vdot=v=>v.V.k==='dead'?'--crit':v.V.k==='live'?'--good':'--warn';
  const kdot=k=>k==='dead'?'--crit':k==='live'?'--good':'--warn';
  /* What every premise would score AT THE ANGLE CURRENTLY SELECTED, so the premise row is a
     like-for-like comparison rather than each pill quoting its own best case. */
  const baseS=scoreIt(w,o,h,p), baseF=rules(w,o,h,p);
  const pAt=P=>{const s=baseS.map((v,i)=>clamp5(v+P.dS[i]+A.dS[i]));
    return{tot:s.reduce((x,y)=>x+y),V:verdict(s,baseF)};};
  const CURP=PREMS[PIDX], total=PREMS.length*VARS.length;
  html+=`<div class="vnav2" id="vnav">
    <div class="vhead">${curRoute()?`Building <b style="color:var(--f2)">${curRoute().nm}</b> — `:''}<b>${total} ideas</b> from this one combination:
      ${PREMS.length} kinds of work × ${VARS.length} twists. You are on
      <b style="color:var(--f2)">${CURP.nm}</b> × <b style="color:var(--f1)">${A.nm}</b>,
      number <b>${PIDX*VARS.length+VIDX+1}</b>.</div>
    <div class="nrow">
      <div class="vrl">The work<span>what you actually do</span></div>
      <div class="vpills">${PREMS.map((P,i)=>{const q=pAt(P);
        return `<button class="vpill${i===PIDX?' on':''}" onclick="setPrem(${i})"
          title="${P.v}"><span class="vd" style="background:var(${kdot(q.V.k)})"></span>${P.nm}
          <span class="vt">${q.tot}</span></button>`;}).join('')}<button
        class="vpill vinfo${PI?' on':''}" onclick="PI=!PI;renderVars(1)"
        title="What the work means, and where this list came from"
        aria-label="What the work means, and where this list came from">${icon('info','sm')}</button></div>
    </div>
    <div class="nrow">
      <div class="vrl">The twist<span>one thing you change</span></div>
      <div class="vpills">${VARS.map((v,i)=>
        `<button class="vpill${i===VIDX?' on':''}" onclick="setVar(${i})">
          <span class="vd" style="background:var(${vdot(v)})"></span>${v.nm}
          <span class="vt">${v.tot}</span></button>`).join('')}<button
        class="vpill vinfo${VI?' on':''}" onclick="VI=!VI;renderVars(1)"
        title="Show every twist in full" aria-label="Show every twist in full">${icon('info','sm')}</button></div>
    </div>
  </div>`;
  if(PI)html+=premPanel(w,o,h,p,WS,HS,OS,pAt);
  if(VI){
    const up=d=>d.map((x,i)=>x>0?CRIT2[i].toLowerCase():null).filter(Boolean);
    const dn=d=>d.map((x,i)=>x<0?CRIT2[i].toLowerCase():null).filter(Boolean);
    html+=`<div class="viexp">
      <div class="ht-t">What is different between them</div>
      <p class="tiny" style="margin-bottom:12px">Your four dropdowns set <b>what</b> the business is.
      Every twist keeps those four the same and changes exactly <b>one</b> thing about how you build
      it. Each has a word to remember it by.</p>

      <p class="tiny" style="margin-bottom:8px"><b style="color:var(--ink-1)">Start with a lemonade
      stand.</b> Anyone can walk up and buy a cup. Watch each twist change one thing —
      and leave the rest alone.</p>
      <table class="dtab acmp">
        <thead><tr><th>Twist</th><th>In a word</th><th>The same stand, one thing changed</th></tr></thead>
        <tbody>${VARS.map((v)=>`<tr>
          <td class="dl">${v.nm}</td>
          <td><span class="w1">${v.a.w1}</span></td>
          <td>${v.a.lem}</td></tr>`).join('')}</tbody>
      </table>

      <p class="tiny" style="margin:14px 0 8px"><b style="color:var(--ink-1)">Now the same seven, on
      your idea.</b> Click a row to switch. Every price is for this one combination, so the gap you
      see is the twist alone.</p>
      <table class="dtab acmp">
        <thead><tr><th>Twist</th><th>In a word</th><th>The one thing it changes</th>
          <th>Price</th><th>Score</th></tr></thead>
        <tbody>${VARS.map((v,i)=>`<tr class="vrow${i===VIDX?' on':''}" onclick="setVar(${i})">
          <td class="dl">${i===VIDX?icon('chevron','xs')+' ':''}${v.nm}</td>
          <td><span class="w1">${v.a.w1}</span></td>
          <td>${v.a.df}</td>
          <td class="anum">×${v.a.pm}<span class="asub">${inr(v.core)}</span></td>
          <td class="anum" style="color:var(${v.V.c})">${v.tot}</td></tr>`).join('')}</tbody>
      </table>
      <p class="tiny" style="margin-bottom:16px">Same seven twists, same words — first on a lemonade
      stand, then on the business you are actually building.</p>

      <div class="ht-t">All ${VARS.length} twists in full</div>
      <div class="vitab">${VARS.map((v,i)=>`
        <div class="viv${i===VIDX?' on':''}">
          <div class="vivh"><b>${v.nm}</b>
            <span class="w1">${v.a.w1}</span>
            <span class="vivp">price ×${v.a.pm} · ${inr(v.core)}</span>
            <span class="vivt" style="color:var(${vdot(v)})">${v.tot}/40 · ${v.V.t.split(' —')[0]}</span></div>
          <div class="vivd">${v.a.an(WS,HS,OS)}</div>
          <div class="vivx"><b>For this idea:</b> ${v.a.ex(WS,HS,OS,exc(v))}</div>
          <div class="vivg"><b>Trades away:</b> ${v.a.gv}</div>
          <div class="vivs">
            <span class="vplus">${icon('chevron','xs up')} ${up(v.a.dS).join(', ')||'nothing'}</span>
            <span class="vminus">${icon('chevron','xs down')} ${dn(v.a.dS).join(', ')||'nothing'}</span></div>
        </div>`).join('')}</div>
      <p class="tiny" style="margin-top:12px">Only the twists that fit your format show up.
      <b>Container only</b> needs a teaching format. <b>Ladder</b> and <b>Syndicate</b> do not work for
      retainers or study tours. So you get four to seven, never a fixed list.</p>
      <div class="prov judg" style="margin-top:10px"><b>Which way</b> each number moves is sound:
      going narrow raises what people will pay, charging a lot lowers it, handing delivery to other
      people trades speed for size. <b>How far</b> it moves is my guess, not a measurement. Use the row
      to compare, not to predict. The &ldquo;for this idea&rdquo; lines are worked examples: the named
      sub-group and the usual advice are how <i>I</i> read the market. They are there to make the twist
      concrete, not for you to take on trust.</div>
    </div>`;
  }

  /* the idea */
  /* The card was eight stacked "Label. sentence" paragraphs, which read as one grey block and
     buried the two things worth reading. It is now shaped by kind: the angle leads, the worked
     example and the cost are set off against a rule, the four fixed facts go in a scannable
     grid, and the pitch — the only line you actually say out loud — closes it. */
  const aHS = `${/^[aeiou]/i.test(HS)?'an':'a'} ${HS}`;   /* "through a cohort", not "through cohort" */
  const payer = p===3||p===4 ? 'their employer pays for it'
    : p===18 ? 'their parents pay for it'
    : `they pay ${inr(core)}`;
  /* With no premise chosen the card is exactly what it always was: the angle leads. With one
     chosen the two layer in the order you would actually decide them — what happens inside
     first, then the one structural thing the angle changes about building it. */
  const hasP = CURP.k!=='none';
  const pev = premEv(CURP,h);
  html+=`<div class="ideacard">
   <div class="tt">${title}</div>
   <div class="st">${curRoute()?`${AX.OUT[o]} · `:''}${hasP?`${CURP.nm} work · `:''}${A.nm} twist · ${HS} · for ${WS}
     · paid by ${AX.PAY[p].toLowerCase().replace("l&d","L&D")}</div>
   ${curRoute()?`<p class="ilead">${curRoute().v}</p>
     <div class="ibox subject"><span class="ik">What this business actually is</span>
       <p>${curRoute().an}</p></div>
     <div class="ibox route"><span class="ik">Then how you build it</span>
       <p>${hasP?CURP.an(WS,HS,OS):A.an(WS,HS,OS)}</p></div>`
    :`<p class="ilead">${hasP?CURP.an(WS,HS,OS):A.an(WS,HS,OS)}</p>`}
   <div class="ibox"><span class="ik">In practice</span>
     <p>${hasP?CURP.ex(WS,HS,OS):A.ex(WS,HS,OS,exc(CUR))}</p>
     ${pev?`<span class="prov ${pev.k}" style="margin-top:8px;display:block">${pev.t}</span>`:''}</div>
   ${hasP?`<div class="ibox angle"><span class="ik">Then the ${A.nm.toLowerCase()} twist</span>
     <p>${A.an(WS,HS,OS)}</p>
     <p style="margin-top:8px">${A.ex(WS,HS,OS,exc(CUR))}</p></div>`:''}
   ${/* THE FOUR FACTS. These are axis-level: MW[w][5], MO[o][5], MH[h][7], MP[p][5] read the
        same for every twist and every kind of work at one combination, which made the card look
        identical whichever angle you were on. But they are not actually the same. Container only
        genuinely changes how it runs; Flagship genuinely changes how you get paid; Wedge
        genuinely narrows who it is for; Teardown genuinely changes what they leave with.

        So each fact prints the axis base and then, underneath, what the chosen work and the
        chosen twist do to it — attributed, so it is always clear which of the two moved it and
        which part is the axis talking. Every one of the seven twists and seven kinds of work
        touches at least one of the four; tools/verify.js asserts that, and asserts that no two
        twists render the same block. */''}
   <div class="ifacts">
     ${[['who','Who it is for',MW[w][5]],
        ['out','What they leave with',`${cap(OS)} — something they can point at.
          If they cannot, you have not delivered.`],
        ['run','How it runs',MH[h][7]],
        ['pay','How you get paid',MP[p][5]]].map(([k,label,base])=>{
       const pm = hasP&&CURP.f&&CURP.f[k] ? CURP.f[k](WS,HS,OS) : null;
       const tm = A.f&&A.f[k] ? A.f[k](WS,HS,OS,exc(CUR)) : null;
       return `<div><span class="ik">${label}</span>${base}
         ${pm?`<span class="fmod work"><b>${CURP.nm}:</b> ${pm}</span>`:''}
         ${tm?`<span class="fmod twist"><b>${A.nm}:</b> ${tm}</span>`:''}</div>`;}).join('')}
   </div>
   <div class="ibox cost"><span class="ik">What it costs you</span>
     ${/* No "The ${nm}" here: one kind of work is already called "The record", which produced
          "The the record work". Work names lead, twist names follow "the". */''}
     ${hasP?`<p><b>${CURP.nm} work:</b> ${CURP.gv}</p>
       <p style="margin-top:8px"><b>The ${A.nm.toLowerCase()} twist:</b> ${A.gv}</p>`
      :`<p>${A.gv}</p>`}</div>
   <div class="ipitch">&ldquo;I help ${WS} get ${OS}, through ${aHS}, and ${payer}.&rdquo;
     <span class="ipn">Say it out loud to a stranger. If they do not get it immediately, the
     sentence is wrong before the idea is.</span></div>
  </div>`;

  /* flags */
  if(F.length){html+=`<h3 style="margin:26px 0 10px">Flags on this combination</h3>
    <p class="tiny" style="margin:-4px 0 10px">These come from the four axes, so they apply to
    <b style="color:var(--ink-1)">every one of the ${VARS.length} twists</b> — changing the twist does not fix them.</p>`;
    F.forEach(f=>{html+=`<div class="flag ${f.t}"><div class="ic">${f.ic}</div>
      <div><b>${f.tt}</b><br><span style="color:var(--ink-2)">${f.tx}</span></div></div>`;});}

  /* PART 6 — four stages */
  html+=`<h3 style="margin:30px 0 12px">Part 6 · The four stages, for <span style="color:var(--f1)">${title}</span></h3>`;
  const q5=[
   ["Can you name ten people who want this today?",MW[w][0]>=4?"LIKELY YES":"PROBABLY NOT",MW[w][0]>=4],
   ["Do you have access, or a name, that others do not?",MW[w][1]>=4?"YES":"NO",MW[w][1]>=4],
   ["Can you deliver v1 alone inside 30 days?",MH[h][0]<=2?"YES":"NO",MH[h][0]<=2],
   ["Would you still do it in month 14, when it is boring?",S[7]>=4?"PROBABLY":"DOUBTFUL",S[7]>=4],
   ["Does it work from another country?",MH[h][2]>=4?"YES":"NO",MH[h][2]>=4]];
  const yes=q5.filter(q=>q[2]).length;
  html+=`<div class="stage" style="border-left-color:var(--s4)">
    <div class="sh"><span class="sn">Stage 1</span><span class="stt">Founder-fit cut · keep only 3+ yes</span></div>
    <div class="q5">${q5.map(q=>`<div class="qq">${q[0]}</div>
      <div class="qa" style="color:var(${q[2]?'--good':'--crit'})">${q[1]}</div>`).join('')}</div>
    <div style="margin-top:11px;font-size:13.5px;color:var(--ink-1)"><b>${yes} of 5</b> on my guesses.</div>
    <div class="prov judg" style="margin-top:8px">These five are <b>not your answers</b> — they are
      inferred from the axes. Questions 1 and 2 assume things about your network and credibility that I
      cannot verify; questions 4 and 5 are read off the format, not off you. Answer them yourself and
      trust your version over mine.</div></div>`;
  html+=`<div class="stage" style="border-left-color:var(--s5)">
    <div class="sh"><span class="sn">Stage 2</span><span class="stt">Scorecard and hard gates</span></div>
    <ul><li>Total <b>${tot} of 40</b>. The two gates are what they will pay (<b>${S[0]}</b>)
      and how many you can reach (<b>${S[1]}</b>). Full table below.</li>
      <li>Weakest axis: <b>${CRIT2[S.indexOf(Math.min(...S))]}</b> at ${Math.min(...S)}.
      That is the thing to change first if you want a better idea.</li></ul></div>`;
  html+=`<div class="stage" style="border-left-color:var(--s6)">
    <div class="sh"><span class="sn">Stage 3</span><span class="stt">Twenty interviews · ask about the past, never the future</span></div>
    <ul>
     <li>Find twenty ${MW[w][4]}. ${MW[w][0]>=4?"You can reach these people directly — start with your existing network.":"You do not have easy access to this group, which is itself a finding. Budget a week just to find them."}</li>
     <li>Ask: <b>&ldquo;Tell me about the last time you tried to ${MO[o][4].toLowerCase()==="raise"?"ask for a raise":"get "+MO[o][5]}. What did you actually do?&rdquo;</b></li>
     <li>Ask: <b>&ldquo;What is the last thing you paid for to solve this, how much was it, and did you finish it?&rdquo;</b></li>
     ${EMPLOYER.includes(p)?`<li>Ask the budget holder: <b>&ldquo;What did this line item get spent on last year, and who signed it off?&rdquo;</b> You are listening for a budget code, not enthusiasm.</li>`:``}
     <li><b>Only for the ${A.nm.toLowerCase()} twist:</b> ${A.ts}</li>
     <li>Banned question: &ldquo;would you pay for this?&rdquo; Everyone says yes and it means nothing.</li></ul></div>`;
  html+=`<div class="stage" style="border-left-color:var(--crit)">
    <div class="sh"><span class="sn">Stage 4</span><span class="stt">Kill criteria · write these down before you start</span></div>
    <ul>
     <li>Fewer than <b>12 of 20</b> describe this pain unprompted → kill it.</li>
     <li><b>Zero</b> people pay ${inr(entry)} before it exists, within 14 days → kill it.</li>
     <li>You cannot reach ${WS} without buying ads → kill it.</li>
     <li>${MH[h][0]>=4?`Delivery needs more than <b>30 days</b> of build before anyone can pay → this format already fails that test. Sell a smaller version first.`:`Delivery needs someone you have not hired → kill it.`}</li>
     ${curRoute()?`<li><b>Only for ${curRoute().nm}:</b> ${curRoute().kl}</li>`:''}
     <li><b>Only for the ${A.nm.toLowerCase()} twist:</b> ${A.kl(WS)}</li></ul></div>`;

  /* PART 7 — all variants scored side by side, active row emphasised */
  const RMP=ramp(), RINK=rink();
  const best=Math.max(...VARS.map(v=>v.tot));
  html+=`<h3 style="margin:30px 0 12px">Part 7 · All ${VARS.length} twists, side by side</h3>
   <div class="card"><div class="tscroll"><table class="stab">${scols(['tot','ver'])}
     <thead><tr><th class="l">Twist</th>
     ${CRIT2.map((c,i)=>`<th>${c}${i<2?'<br><span style="color:var(--crit)">gate</span>':''}</th>`).join('')}
     <th>Total</th><th class="l">Verdict</th></tr></thead><tbody>
     ${VARS.map((v,i)=>`<tr class="${i===VIDX?'vrow on':'vrow'}" onclick="setVar(${i})">
       <td class="l">${i===VIDX?icon('chevron','xs')+' ':''}<b>${v.nm}</b>${v.tot===best&&VARS.length>1?' <span class="vbest">best total</span>':''}</td>
       ${v.S.map((x,j)=>`<td><div class="cell${(j<2&&x===1)?' gate':''}" style="background:${RMP[x-1]};color:${RINK[x-1]}">${x}</div></td>`).join('')}
       <td class="tot">${v.tot}</td>
       <td class="l"><span class="verdict v-${v.V.k==='live'?'live':v.V.k==='dead'?'dead':'hold'}">${v.V.t.split(' —')[0]}</span></td></tr>`).join('')}
     </tbody></table></div>
   <p class="tiny" style="margin-top:12px">Click any row to switch. Everything above and below rebuilds
   for it. Every row here has the same four axes and the same work — only the twist changes, which is
   the point: <b style="color:var(--ink-1)">how you build it moves the score as much as what you
   build.</b></p>
   <div style="margin-top:16px"><span class="vbadge" style="color:var(${V.c});border:1px solid currentColor">${title} — ${V.t}</span>
   <p style="margin-top:11px;max-width:780px">${V.d}</p></div>
   ${readRow(S)}${HOWTO()}</div>`;

  /* The same table down the other axis. Without this the premise row is just pills you have to
     click one at a time to compare, which is exactly the problem the angle table already solved. */
  const pRows=PREMS.map((P,i)=>{
    const s=baseS.map((v,j)=>clamp5(v+P.dS[j]+A.dS[j]));
    const pc=Math.max(500,Math.round(HOW_BASE[h]*PAY_MULT[p]*(0.85+MW[w][2]*0.06)*P.pm*A.pm/500)*500);
    return {P,i,S:s,tot:s.reduce((x,y)=>x+y),V:verdict(s,baseF),core:pc,ev:premEv(P,h)};});
  const pBest=Math.max(...pRows.map(r=>r.tot));
  html+=`<h3 style="margin:30px 0 12px">Part 7b · All ${PREMS.length} kinds of work, with the
    <span style="color:var(--f1)">${A.nm.toLowerCase()}</span> twist</h3>
   <p class="tiny" style="margin:-6px 0 12px">The table above keeps the work and changes the twist.
   This one keeps the twist and changes the work. Together they are the ${total} ideas you can get
   out of these four dropdowns.</p>
   <div class="card"><div class="tscroll"><table class="stab">${scols(['price','tot'])}
     <thead><tr><th class="l">The work</th>
     ${CRIT2.map((c,i)=>`<th>${c}${i<2?'<br><span style="color:var(--crit)">gate</span>':''}</th>`).join('')}
     <th>Price</th><th>Total</th></tr></thead><tbody>
     ${pRows.map(r=>`<tr class="${r.i===PIDX?'vrow on':'vrow'}" onclick="setPrem(${r.i})">
       <td class="l">${r.i===PIDX?icon('chevron','xs')+' ':''}<b>${r.P.nm}</b>${r.tot===pBest&&PREMS.length>1?' <span class="vbest">best total</span>':''}
         ${r.ev&&r.ev.k==='weak'?'<span class="pjudg" title="No bank example at this format — my judgement">J</span>':''}
         <span class="subl">${r.P.v}</span></td>
       ${r.S.map((x,j)=>`<td><div class="cell${(j<2&&x===1)?' gate':''}" style="background:${RMP[x-1]};color:${RINK[x-1]}">${x}</div></td>`).join('')}
       <td class="tot num">${inr(r.core)}</td>
       <td class="tot" style="color:var(${r.V.c})">${r.tot}</td></tr>`).join('')}
     </tbody></table></div>
   <p class="tiny" style="margin-top:12px">Only the ${PREMS.length} of ${PREM.length} that fit
   <b style="color:var(--ink-1)">${HS}</b> show up. A <span class="pjudg">J</span> means nothing in
   your bank does that work at this format — I think it would still work, and that is a guess, not
   proof. Click a row to switch.</p>
   <div class="prov judg" style="margin-top:10px">Same warning as the twists. <b>Which way</b> each
   number moves is sound: judging pays more than teaching, a reference is slow and cheap, access is
   hard to copy. <b>How far</b> it moves is my guess. Use the column to rank, not to predict.</div></div>`;

  /* PART 8 — position map, every variant plotted */
  html+=`<h3 style="margin:30px 0 12px">Part 8 · Where the ${VARS.length} twists land</h3>
   <div class="mapwrap"><div id="cScatter"></div></div>
   <p class="tiny" style="margin-top:10px">Every twist is plotted. The filled marker is the one you
   are reading; the hollow ones are its siblings, so you can see the spread a single combination covers.
   Small grey dots are the twenty-four benchmarks from the main report — useful for checking whether you
   have found something better than the bank, or merely something different.</p>`;

  /* PART 9 — money */
  html+=`<h3 style="margin:30px 0 12px">Part 9 · The money for <span style="color:var(--f1)">${title}</span></h3>
   <p class="tiny" style="margin:-6px 0 12px">${(()=>{
     const hi=VARS.reduce((a,b)=>b.core>a.core?b:a), lo=VARS.reduce((a,b)=>b.core<a.core?b:a);
     const r=hi.core/lo.core;
     return VARS.length>1&&r>1.2
       ? `Price moves with the twist: across these ${VARS.length} of them it runs from
          <b style="color:var(--ink-1)">${inr(lo.core)}</b> (${lo.nm.toLowerCase()}) to
          <b style="color:var(--ink-1)">${inr(hi.core)}</b> (${hi.nm.toLowerCase()}) off identical axes —
          a factor of ${r.toFixed(1)}. Below is the ${A.nm.toLowerCase()} version.`
       : `Below is the ${A.nm.toLowerCase()} version of the pricing.`;})()}</p>
   <div class="ladder">
    <div class="tier"><div class="tl">Entry</div><div class="tp">${inr(entry)}</div>
      <div class="td">The smallest real version. This is the number you use for the money test — if
      nobody pays this, nothing above it matters.</div></div>
    <div class="tier core"><div class="tl">Core${recur?" · per month":""}</div><div class="tp">${inr(core)}</div>
      <div class="td">${AX.PAY[p].toLowerCase()} as payer, ${WS}' budget authority,
      ${A.nm.toLowerCase()} twist.<br>
      <span class="prov ${PC.k}">${PC.t}</span></div></div>
    <div class="tier"><div class="tl">Premium</div><div class="tp">${inr(prem)}</div>
      <div class="td">Same delivery, more access or more accountability. Roughly one buyer in six
      takes this, and it usually carries the margin.</div></div>
   </div>
   <div class="mathbox">
    <div class="mathrow"><span class="mk">Your monthly target</span><span class="mv">${inr(target)}</span></div>
    <div class="mathrow"><span class="mk">Annual target (12 × monthly)</span><span class="mv">${inr(target*12)}</span></div>
    <div class="mathrow"><span class="mk">Core price${recur?", per member per month":", one-off"}</span><span class="mv">${inr(core)}</span></div>
    <div class="mathrow"><span class="mk">${recur?"Paying members you need at any one time":"Sales you need per year"}</span>
      <span class="mv">${units}${recur?"":" &nbsp;·&nbsp; "+(perMonth<1?"about one every "+(1/perMonth).toFixed(1)+" months":perMonth.toFixed(1)+" a month")}</span></div>
    <div class="mathrow"><span class="mk">Revenue that produces</span><span class="mv">${inr(yearly)} / year</span></div>
    <div class="mathrow"><span class="mk">Speed to first rupee</span>
      <span class="mv">${["6 months+","3–6 months","6–10 weeks","3–5 weeks","Under 2 weeks"][S[3]-1]}</span></div>
    <div class="mathrow"><span class="mk">Verdict on the arithmetic</span>
      <span class="mv" style="color:var(${tight<=12?'--good':tight<=60?'--warn':'--crit'})">
      ${tight<=12?"Very reachable — few enough buyers to close by hand, with no advertising":
        tight<=60?"Reachable, but you now need a repeatable way to find people":
        tight<=400?"This is a volume business. Budget for marketing, or raise the price.":
        "Implausible at this price. Raise the price or change the payer."}</span></div>
   </div>
   <p class="tiny" style="margin-top:10px">${tight>60?`At ${units} ${recur?"paying members":"sales a year"}, the hard part stops being the product and becomes finding people. Every idea in the bank that clears the gates does it by needing <b>fewer, bigger</b> cheques — that is Observation 1, in numbers.`:`${units} ${recur?"paying members":"sales a year"} is a number you can reach by hand, one conversation at a time. That is the shape you want, and it is why the payer axis matters more than the product axis.`}
   ${core>=target?`<br>One sale at ${inr(core)} covers <b style="color:var(--ink-1)">${(core/target).toFixed(1)} months</b> of your target — which is exactly why a small number of large cheques beats a large number of small ones.`:``}</p>`;

  /* nearest */
  if(near.length){html+=`<h3 style="margin:30px 0 12px">Closest ideas already in the bank</h3>
    <div class="nearlist">${near.map(n=>
      `<a href="#bank" onclick="mode('report')"><b style="color:var(--ink-1)">#${n.n}</b> ${n.nm}</a>`).join('')}</div>
    <p class="tiny" style="margin-top:9px">Matched by overlap, not by judgment — read them for prior art
    before you assume this is new.</p>`;}

  /* PART 10 — the full business case, for the angle currently selected.
     This is what used to be a separate tab, available only for the 112 bank ideas and only at
     their implied twist. Built from the variant's own scores and price multiplier, so the money
     here matches the money on the card above rather than quietly reverting to the ×1 version. */
  html+=`<h3 style="margin:30px 0 12px">Part 10 · The full business case for
    <span style="color:var(--f1)">${title}</span></h3>
    <p class="tiny" style="margin:-6px 0 12px">Ten sections, each one collapsible. Every number
    carries its provenance: where a market figure is verified you get the source, and where it is
    not, the plan says so and leaves you the arithmetic rather than inventing a total.</p>`;
  html+=deepPlanFor({w,o,h,p,S,tot,V,pm:CURP.pm*A.pm,
    kicker:hasP?`${CURP.nm} work · ${A.nm} twist`:`${A.nm} twist`,
    nm:title,hand:false,blurb:hasP?CURP.an(WS,HS,OS):A.an(WS,HS,OS)});

  document.getElementById('cOut').innerHTML=html;

  /* custom scatter */
  const W=1000,H=520,P={t:34,r:170,b:52,l:64};
  const grid=dark?'#2c2c2a':'#e1e0d9',axis=dark?'#383835':'#c3c2b7';
  const mu=dark?'#4a4a47':'#cfcec7';
  const col=k=>k==='dead'?'#d03b3b':k==='hold'?'#fab219':'#0ca30c';
  const X=v=>P.l+(v/100)*(W-P.l-P.r),Y=v=>H-P.b-(v/100)*(H-P.t-P.b);
  const cx=S[3]*20-10, cy=S[4]*20-10, cc=col(V.k);
  let s=`<svg viewBox="0 0 ${W} ${H}">`;
  [0,25,50,75,100].forEach(v=>{
    s+=`<line x1="${X(v)}" y1="${P.t}" x2="${X(v)}" y2="${H-P.b}" stroke="${v===50?axis:grid}" stroke-width="${v===50?2:1}"/>`;
    s+=`<line x1="${P.l}" y1="${Y(v)}" x2="${W-P.r}" y2="${Y(v)}" stroke="${v===50?axis:grid}" stroke-width="${v===50?2:1}"/>`;});
  s+=`<text class="qlab" x="${X(52)}" y="${P.t+16}">fast money, gets big</text>`;
  s+=`<text class="qlab" x="${P.l+8}" y="${H-P.b-10}">slow and capped — avoid</text>`;
  s+=`<text class="axlab" x="${(P.l+W-P.r)/2}" y="${H-14}" text-anchor="middle">Speed to first rupee →</text>`;
  s+=`<text class="axlab" transform="rotate(-90 18 ${(P.t+H-P.b)/2})" x="18" y="${(P.t+H-P.b)/2}" text-anchor="middle">Revenue ceiling →</text>`;
  PTS.forEach(q=>{s+=`<circle cx="${X(q.x)}" cy="${Y(q.y)}" r="4" fill="${mu}"/>
    <text class="dlab" style="fill:${mu}" x="${X(q.x)+8}" y="${Y(q.y)+3.5}">${q.n}</text>`;});
  /* siblings first, so the active variant always draws on top */
  const seen={};
  VARS.forEach((v,i)=>{
    if(i===VIDX)return;
    const vx=v.S[3]*20-10, vy=v.S[4]*20-10, c=col(v.V.k);
    const kk=vx+'_'+vy; const bump=(seen[kk]=(seen[kk]||0)+1);
    s+=`<circle cx="${X(vx)}" cy="${Y(vy)}" r="6" fill="none" stroke="${c}" stroke-width="2" opacity=".72"/>
        <text class="dlab" style="fill:${c};opacity:.85" x="${X(vx)+11}" y="${Y(vy)+3.5+(bump-1)*13}">${v.nm} · ${v.tot}</text>`;});
  s+=`<circle cx="${X(cx)}" cy="${Y(cy)}" r="16" fill="${cc}" opacity=".2"/>
      <circle class="dot" cx="${X(cx)}" cy="${Y(cy)}" r="8.5" fill="${cc}"/>
      <text class="dlab pick" x="${X(cx)+17}" y="${Y(cy)+4}" style="font-size:13px;font-weight:700">${title} · ${tot}</text>`;
  document.getElementById('cScatter').innerHTML=s+'</svg>';
  foldOut();   /* innerHTML above destroyed the wrappers — rebuild them */
  if(!silent)document.getElementById('cOut').scrollIntoView({behavior:'smooth',block:'start'});
}

/* ---------- the premise explainer ----------
   Same shape as the twist panel deliberately: lemonade stand first, then the identical list on
   the live combination, then every kind of work in full. The reader learns one pattern and reuses
   it.

   The difference is that this panel has to carry provenance the twist panel does not need. A
   twist is a way of building anything; a kind of work is a claim that a particular sort of
   business exists, so every card names the bank ideas that already are it, and says plainly when
   the current format has no bank example behind it. */
function premPanel(w,o,h,p,WS,HS,OS,pAt){
  const built=P=>P.ev.filter(n=>TAGS[n]&&TAGS[n][2]===h);
  let s=`<div class="viexp">
    <div class="ht-t">What &ldquo;the work&rdquo; means</div>
    <p class="tiny" style="margin-bottom:12px">Your four dropdowns set the <b>shape</b>: who you
    sell to, what they get, how it is delivered, who pays. They do not say what you actually
    <b>do all day</b>. Two businesses can have all four the same and still be nothing alike.</p>
    <p class="tiny" style="margin-bottom:12px"><b style="color:var(--ink-1)">Your own bank proves
    it.</b> #36 <i>The Roast, Live</i> and #99 <i>Design Court</i> have the same four axes:
    mid-level designers, portfolio, ticketed live show, ticket sales. One rips portfolios apart on
    stage. The other runs a fake trial. Same shape. Different work.</p>

    <p class="tiny" style="margin-bottom:8px"><b style="color:var(--ink-1)">Back to the lemonade
    stand.</b> A twist changes one thing about how you run the stand. The work changes what you
    are doing there at all.</p>
    <table class="dtab acmp">
      <thead><tr><th>The work</th><th>In a word</th><th>What you are actually doing</th></tr></thead>
      <tbody>${PREM.map(P=>`<tr>
        <td class="dl">${P.nm}</td>
        <td><span class="w1">${P.w1}</span></td>
        <td>${P.lem}</td></tr>`).join('')}</tbody>
    </table>

    <p class="tiny" style="margin:14px 0 8px"><b style="color:var(--ink-1)">The ${PREMS.length} that
    fit ${aAn(HS)}.</b> Click a row to switch. Every score uses the twist you have picked, so the
    gap you see is the work alone.</p>
    <table class="dtab acmp">
      <thead><tr><th>The work</th><th>In a word</th><th>The question it asks</th>
        <th>Price</th><th>Score</th></tr></thead>
      <tbody>${PREMS.map((P,i)=>{const q=pAt(P);
        const pc=Math.max(500,Math.round(HOW_BASE[h]*PAY_MULT[p]*(0.85+MW[w][2]*0.06)*P.pm*VARS[VIDX].a.pm/500)*500);
        return `<tr class="vrow${i===PIDX?' on':''}" onclick="setPrem(${i})">
        <td class="dl">${i===PIDX?icon('chevron','xs')+' ':''}${P.nm}</td>
        <td><span class="w1">${P.w1}</span></td>
        <td>${P.q}</td>
        <td class="anum">×${P.pm}<span class="asub">${inr(pc)}</span></td>
        <td class="anum" style="color:var(${q.V.c})">${q.tot}</td></tr>`;}).join('')}</tbody>
    </table>

    <div class="ht-t" style="margin-top:16px">All ${PREMS.length} kinds of work in full</div>
    <div class="vitab">${PREMS.map((P,i)=>{
      const b=built(P);
      return `<div class="viv${i===PIDX?' on':''}">
        <div class="vivh"><b>${P.nm}</b>
          <span class="w1">${P.w1}</span>
          <span class="vivp">price ×${P.pm}</span>
          <span class="vivt" style="color:var(${P.k==='none'?'--ink-3':b.length?'--good':'--warn'})">
            ${P.k==='none'?'the default':b.length?`your bank does this`:`not in your bank`}</span></div>
        <div class="vivd">${P.an(WS,HS,OS)}</div>
        <div class="vivx"><b>For this idea:</b> ${P.ex(WS,HS,OS)}</div>
        ${P.gv?`<div class="vivg"><b>Trades away:</b> ${P.gv}</div>`:''}
        ${P.ev.length?`<div class="vivev"><b>Already in your bank:</b> ${P.ev.map(n=>
          `<a href="#bank" onclick="mode('report')">#${n}</a>`).join(' ')}
          ${b.length?`<span class="pok">${b.map(n=>'#'+n).join(', ')} at this exact format</span>`
            :`<span class="pjudg">J</span> but none as ${aAn(HS)}. I think it carries over. That is a guess.`}</div>`:''}
      </div>`;}).join('')}</div>

    <p class="tiny" style="margin-top:12px">You see ${PREMS.length} of ${PREM.length} because the
    format rules some out, the same way it does for twists. ${PREMS.length} × ${VARS.length} =
    <b style="color:var(--ink-1)">${PREMS.length*VARS.length} ideas</b> from these four dropdowns.</p>
    <div class="prov judg" style="margin-top:10px"><b>Where this list came from.</b> I did not make
    it up. All ${PREM.length} came out of your own 112 ideas — run <code>npm run premise</code> to
    see the working. To get on the list, a kind of work had to turn up in three or more formats,
    with no single format holding more than 60% of it. Anything that failed was really just the
    format wearing a new name, so <i>Contest</i>, <i>Matchmaking</i> and <i>Frontier</i> were cut.
    What is left is still <i>my</i> reading of which idea is which: you can check the counting, the
    labelling is my call. One thing is missing on purpose. #46 <i>Studio Tour</i> and #72 <i>How
    They Design</i> are both Access work, and differ only in <i>which</i> doors you open. To list
    those I would have to invent rooms you can get into. That part stays yours.</div>
  </div>`;
  return s;
}
