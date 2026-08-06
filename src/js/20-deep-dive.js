/* ================= THE BUSINESS CASE =================
   The ten-section plan used to be its own tab, reachable only for the 114 bank ideas. It is now
   the detail layer of the workspace, so it has to build for an arbitrary combination and for a
   chosen strategic angle — neither of which has an idea number.

   So the plan is built from a CONTEXT, not from `n`:
     deepPlan(n)      bank idea -> context -> plan. Unchanged behaviour, and this is the entry
                      point tools/verify.js exercises across all 114 ideas and three invariants.
     deepPlanFor(C)   the generalised builder. C carries the axes, the scores, the verdict and a
                      price multiplier; `n` is optional and only decorates the header and footer.
   Keep deepPlan(n) intact — it is the tested surface. */
function fillDeepSel(){
  const s=document.getElementById('dSel');
  if(!s)return;
  s.innerHTML=CL.map(c=>`<optgroup label="${c.L} · ${c.t.replace(/&amp;/g,'&')}">`+
    c.i.map(x=>`<option value="${x[0]}">#${x[0]} — ${x[1]}</option>`).join('')+
    `</optgroup>`).join('');
  s.value=String(DEFAULT_IDEA);
}
/* One income target for the whole workspace. The old deep tab had its own input; prefer whichever
   exists, so deepPlan(n) keeps working from the harness and from the merged page alike. */
function planTarget(){
  const el=document.getElementById('tgt')||document.getElementById('dTgt');
  return Math.max(25000,+(el&&el.value)||250000);
}
function planCtx(n){
  const idea=ALLC.find(c=>c.n===n);
  const raw=CL.flatMap(c=>c.i).find(x=>x[0]===n);
  const [w,o,h,p]=TAGS[n];
  return {w,o,h,p,n,S:idea.s,tot:idea.tot,pm:1,
    V:verdict(idea.s,idea.hand?[]:rules(w,o,h,p)),
    kicker:idea.cl,nm:idea.nm,hand:idea.hand,blurb:raw[2]};
}
function deepPlan(n){ return deepPlanFor(planCtx(n)); }
function deepPlanFor(C){
  const {w,o,h,p}=C, n=C.n;
  const S=C.S, tot=C.tot, V=C.V, F=rules(w,o,h,p);
  const WS=MW[w][4], HS=MH[h][6].toLowerCase(), OS=MO[o][5];
  const target=planTarget();

  let core=HOW_BASE[h]*PAY_MULT[p]*(0.85+MW[w][2]*0.06)*(C.pm||1);
  core=Math.max(500,Math.round(core/500)*500);
  const eF=core>=500000?0.08:core>=100000?0.2:0.4;
  const entry=Math.max(500,Math.round(core*eF/500)*500), prem=Math.round(core*2.6/500)*500;
  const recur=RECUR_H.includes(h)||p===2;
  const units=recur?Math.ceil(target/core):Math.ceil(target*12/core);
  const PC=priceCheck(h,p,core);
  const seg=SEG_EV[w], cmp=compFor(h,p,w), mot=MOTION[p];
  const lo=S.indexOf(Math.min(...S));

  let H=`<div class="dhead">
    <div class="dh-l"><span class="cl">${C.kicker}</span>
      ${n?`<span class="dh-n">#${n}</span>`:''}
      <span class="dh-t">${C.nm}</span>
      ${C.hand?'<span class="hand">HAND-SCORED</span>':'<span class="hand" style="color:var(--ink-3)">DERIVED SCORE</span>'}</div>
    <div class="dh-r"><span class="vbadge" style="color:var(${V.c});border:1px solid currentColor">${V.t}</span>
      <span class="dh-tot">${tot}<span>/40</span></span></div>
  </div>`;

  /* 1 · thesis */
  H+=`<div class="dsec"><div class="dnum">01</div><div class="dbody">
    <h4>The thesis</h4>
    <p class="dlead">${C.blurb}</p>
    <div class="dgrid4">
      <div><span class="dk">Who</span>${AX.WHO[w]}</div>
      <div><span class="dk">Outcome they buy</span>${OS}</div>
      <div><span class="dk">How it is delivered</span>${AX.HOW[h]}</div>
      <div><span class="dk">Who signs the cheque</span>${AX.PAY[p]}</div>
    </div>
    <p><b>The pain, stated plainly.</b> ${MW[w][5]}</p>
    <p><b>What they must be able to point at afterwards.</b> ${OS}. If they cannot show it to
    someone else, you have not delivered, whatever they say on the feedback form.</p>
  </div></div>`;

  /* 2 · buyer & payer map */
  const signer=EMPLOYER.includes(p)?"a manager with a budget code":p===18?"a parent":
    [19,20].includes(p)?"a company procuring talent":[7,8].includes(p)?"a marketing or growth lead":
    p===16?"a government or CSR programme officer":p===17?"an institution's procurement office":
    "the user themselves";
  H+=`<div class="dsec"><div class="dnum">02</div><div class="dbody">
    <h4>Buyer map — who uses it, who pays, who can say no</h4>
    <table class="dtab"><tbody>
      <tr><td class="dl">User</td><td>${AX.WHO[w]}</td></tr>
      <tr><td class="dl">Payer</td><td>${AX.PAY[p]}</td></tr>
      <tr><td class="dl">Person who signs</td><td>${signer}</td></tr>
      <tr><td class="dl">Their budget authority</td><td>${["none — personal spend","very limited","some discretionary","controls a line item","owns the budget"][MW[w][2]-1]} <span class="tiny">(my estimate, not a measurement)</span></td></tr>
      <tr><td class="dl">Sales motion</td><td>${mot[0]}</td></tr>
      <tr><td class="dl">Expected cycle</td><td><b>${mot[1]}</b> from first contact to money</td></tr>
      <tr><td class="dl">Can you reach them now?</td><td>${MW[w][0]>=4
        ?"Probably yes, from your existing network — but that is my assumption about your contacts, not a fact I can check."
        :"Probably not directly. Budget the first week purely to find twenty of them."}</td></tr>
    </tbody></table>
  </div></div>`;

  /* 3 · market size, with the chain exposed */
  H+=`<div class="dsec"><div class="dnum">03</div><div class="dbody">
    <h4>Market size — the arithmetic, with the top number labelled</h4>
    <div class="flag ${seg.v?'ok':'warn'}"><div class="ic">${icon(seg.v?'check':'alert')}</div>
      <div><b>${seg.v?'Verified anchor for this segment':'No verified anchor for this segment'}</b><br>
      <span style="color:var(--ink-2)">${seg.txt}</span></div></div>`;
  if(seg.v&&seg.pool){
    H+=`<table class="dtab sizing"><thead><tr><th class="dl">Capture assumption</th>
      <th>Customers</th><th>At ${inr(core)}</th><th>vs your ₹${(target*12/100000).toFixed(1)}L annual target</th></tr></thead><tbody>
      ${[0.005,0.01,0.03,0.05].map(r=>{const cu=Math.round(seg.pool*r),rev=cu*core;
        return `<tr><td class="dl">${(r*100).toFixed(1)}% of ${seg.pool.toLocaleString('en-IN')}</td>
          <td class="mono">${cu.toLocaleString('en-IN')}</td>
          <td class="mono">${inr(rev)}</td>
          <td class="mono" style="color:var(${rev>=target*12?'--good':'--ink-3'})">${(rev/(target*12)).toFixed(1)}×</td></tr>`;}).join('')}
    </tbody></table>
    <p class="tiny">The pool is verified. <b>The capture rates are not</b> — they are illustrative,
    shown as a range so you can see the sensitivity rather than being handed one confident number.
    A first-year solo operator with no advertising is realistically at the top row, not the bottom.</p>`;
  } else {
    H+=`<p>I will not invent a total. Here is the chain with the first line blank —
    fill it from your own research before you commit anything:</p>
    <table class="dtab sizing"><tbody>
      <tr><td class="dl">Addressable pool</td><td class="mono" style="color:var(--warn)">? &nbsp;— you must establish this</td></tr>
      <tr><td class="dl">× realistic year-one capture</td><td class="mono">0.5% – 5%</td></tr>
      <tr><td class="dl">× core price</td><td class="mono">${inr(core)}</td></tr>
      <tr><td class="dl">= year-one revenue</td><td class="mono">depends entirely on line one</td></tr>
      <tr><td class="dl">Customers needed for your target</td><td class="mono"><b>${units}</b> ${recur?"paying members at once":"sales a year"}</td></tr>
    </tbody></table>
    <p class="tiny">The useful number here is the last row: <b>${units}</b>. You do not need the market
    size to start — you need to know whether ${units} ${recur?"people will hold a subscription":"purchases a year"}
    is plausible. That is answerable in twenty conversations.</p>`;
  }
  H+=`</div></div>`;

  /* 4 · competition */
  H+=`<div class="dsec"><div class="dnum">04</div><div class="dbody">
    <h4>Competition — only names I verified</h4>`;
  if(cmp){
    H+=`<table class="dtab"><tbody>${cmp.names.map(x=>
      `<tr><td class="dl">${x[0]}</td><td>${x[1]}</td></tr>`).join('')}</tbody></table>
      <p class="tiny">These are the ones that appeared in research with a figure attached. The list is
      certainly incomplete — it is not a market map, it is what I could stand behind.</p>`;
  } else {
    H+=`<div class="flag warn"><div class="ic">!</div><div><b>No competitor verified for this
      format-and-segment pair.</b><br><span style="color:var(--ink-2)">That does not mean none exist —
      it means I found none I could name honestly, and inventing plausible-sounding company names is
      exactly the failure mode you asked me to avoid. Run this search yourself before you build
      anything.</span></div></div>
      <div class="dsearch">Search: <b>${cmp?cmp.q:searchFor(h,p,w)}</b></div>`;
  }
  H+=`<p style="margin-top:12px"><b>Your differentiator, if the idea has one.</b> ${
    MW[w][1]>=4&&MO[o][3]>=4
    ? "Both your credibility with this audience and your fit for this outcome score high — the regulated-industry and strategic-design background is the part competitors cannot copy in six months."
    : MW[w][1]>=4 ? "You have credibility with this audience, but the outcome sits outside your strongest ground. Lean on the audience relationship, not the subject expertise."
    : MO[o][3]>=4 ? "The outcome plays to your background, but this audience does not know you yet. Expect to spend the first three months earning the right to be heard."
    : "This audience does not know you, and the subject is not really yours either. That is the honest read, and it is the main argument against this idea."}</p>
  </div></div>`;

  /* 5 · pricing + unit economics */
  H+=`<div class="dsec"><div class="dnum">05</div><div class="dbody">
    <h4>Pricing and unit economics</h4>
    <div class="ladder">
     <div class="tier"><div class="tl">Entry</div><div class="tp">${inr(entry)}</div>
       <div class="td">The money-test price. If nobody pays this, nothing above it matters.</div></div>
     <div class="tier core"><div class="tl">Core${recur?" · per month":""}</div><div class="tp">${inr(core)}</div>
       <div class="td">The main offer.</div></div>
     <div class="tier"><div class="tl">Premium</div><div class="tp">${inr(prem)}</div>
       <div class="td">More access or more accountability, same delivery.</div></div>
    </div>
    <div class="prov ${PC.k}" style="margin-bottom:14px">${PC.t}</div>
    <div class="mathbox">
     <div class="mathrow"><span class="mk">Your annual target</span><span class="mv">${inr(target*12)}</span></div>
     <div class="mathrow"><span class="mk">${recur?"Paying members needed at once":"Sales needed per year"}</span><span class="mv">${units}</span></div>
     <div class="mathrow"><span class="mk">Which is</span><span class="mv">${recur?units+" people paying every month":(units/12).toFixed(1)+" a month"}</span></div>
     <div class="mathrow"><span class="mk">Delivery cost per unit</span><span class="mv">${
       MH[h][4]===1?"your time — this caps the business at your calendar":"near zero once built — it scales past you"}</span></div>
     <div class="mathrow"><span class="mk">Sales cycle</span><span class="mv">${mot[1]}</span></div>
     <div class="mathrow"><span class="mk">Verdict on the arithmetic</span>
      <span class="mv" style="color:var(${units<=12?'--good':units<=60?'--warn':'--crit'})">${
        units<=12?"Reachable by hand — no advertising needed":
        units<=60?"Needs a repeatable way to find people":
        units<=400?"A volume business. Budget for marketing or raise the price.":
        "Implausible at this price. Change the payer."}</span></div>
    </div>
  </div></div>`;

  /* 6 · riskiest assumption */
  const risk=[
   ["That anyone will pay at all","Sell the entry tier to five strangers — not friends — before building anything."],
   ["That you can reach these people without buying ads","List twenty named individuals with a route to each. If you cannot fill the list, the idea stops here."],
   ["That you are credible enough to be chosen","Publish one piece of work that only you could have made, and see whether the right people respond."],
   ["That you can get to money before you run out of patience","Cut scope until something is sellable in two weeks. Then sell that."],
   ["That this can grow beyond a small income","Work out how big it really gets. If it stops in the low lakhs, decide whether that is enough before you start."],
   ["That it cannot be copied the moment it works","Name what a competitor would have to acquire to match you. If the answer is nothing, expect company."],
   ["That it survives you moving countries","Remove every element that requires you in a specific room on a specific date, then see what is left."],
   ["That you will still want to do it in month fourteen","Do the delivery four times before you commit to a year of it."]][lo];
  /* A minimum of 3 is not a weakness — naming it as "the riskiest assumption" would overstate.
     Only single out an axis when it is genuinely low. */
  const mn=Math.min(...S), diffuse=mn>=3;
  H+=`<div class="dsec"><div class="dnum">06</div><div class="dbody">
    <h4>The riskiest assumption</h4>
    <div class="flag ${diffuse?'warn':'bad'}"><div class="ic">${icon('alert')}</div><div>
      ${diffuse
        ? `<b>No single axis is weak — the lowest score here is ${mn} of 5.</b><br>
           <span style="color:var(--ink-2)">So there is no one flaw to point at, which is a better
           position than it sounds and a worse one than it feels. When nothing is obviously broken,
           the binding risk is always the same: <b>demand you have not tested.</b> The weakest of the
           eight is ${CRIT2[lo].toLowerCase()} at ${mn}, but treat that as a tilt, not a verdict.</span>`
        : `<b>${risk[0]}</b><br><span style="color:var(--ink-2)">Derived mechanically: your lowest
           score is <b>${CRIT2[lo].toLowerCase()}</b> at ${mn} of 5, so that is the assumption
           carrying the most weight.</span>`}</div></div>
    <p><b>The cheapest way to test it:</b> ${diffuse
      ? `Skip straight to the money test. Ask ${units<=12?'two':'five'} people for ${inr(entry)} in the
         next fortnight. With no structural flaw to fix, payment is the only information left worth buying.`
      : risk[1]}</p>
    ${F.length?`<p><b>Structural flags on this combination</b> — these do not go away with better
      execution:</p>${F.map(f=>`<div class="flag ${f.t}"><div class="ic">${f.ic}</div>
      <div><b>${f.tt}</b><br><span style="color:var(--ink-2)">${f.tx}</span></div></div>`).join('')}`:''}
  </div></div>`;

  /* 7 · execution 30/60/90 */
  const heavy=MH[h][0]>=4, slowPay=/month/.test(mot[1]);
  H+=`<div class="dsec"><div class="dnum">07</div><div class="dbody">
    <h4>Execution — first ninety days</h4>
    <div class="phase"><div class="ph">Days 1–14 · evidence, not building</div><ul>
      <li>Twenty conversations with ${WS}. Ask what they last <i>paid for</i> to get ${OS} — never what they would pay for.</li>
      ${EMPLOYER.includes(p)?`<li>Of those twenty, at least eight must be budget holders. Ask what the line item was spent on last year and who signed it.</li>`:``}
      <li>Write down the kill criteria in section 09 before you start, not after.</li>
      <li>Build nothing. ${heavy?"This format is heavy to build, which makes skipping this step the expensive mistake.":"The format is light, so the temptation to build first is strong. Resist it for two weeks."}</li>
    </ul></div>
    <div class="phase"><div class="ph">Days 15–30 · the smallest sellable thing</div><ul>
      <li>Make exactly this and nothing more: <b>${FIRST[h]}</b>.</li>
      <li>Take real money at <b>${inr(entry)}</b> from at least ${units<=12?'two':'five'} people, with a written refund promise.</li>
      <li>${mot[0]}</li>
    </ul></div>
    <div class="phase"><div class="ph">Days 31–60 · deliver it by hand</div><ul>
      <li>Deliver to the first buyers personally, badly, and over-attentively. Automate nothing.</li>
      <li>Write down every question they ask. That list becomes the actual product.</li>
      <li>Raise the price for buyer group two. ${core>entry*2?`Core is ${inr(core)} — the gap from ${inr(entry)} is where you learn what they truly value.`:`Entry and core are close here, so test the premium tier at ${inr(prem)} instead.`}</li>
    </ul></div>
    <div class="phase"><div class="ph">Days 61–90 · repeat or stop</div><ul>
      <li>Run it a second and third time. ${MH[h][4]===1?"Watch how many hours each delivery costs you — this format bills your calendar, and that is the limit.":"Watch what breaks when you are not in the room, because this format is meant to run without you."}</li>
      <li>${slowPay?`The payer's cycle is ${mot[1]}, so deals opened in week two may only close now. Judge the pipeline, not the bank balance.`:`With a ${mot[1]} cycle you should have real revenue by now. If not, the problem is demand, not patience.`}</li>
      <li>Decide against section 09. Do not renegotiate the criteria at this point.</li>
    </ul></div>
  </div></div>`;

  /* 8 · 12-month + success ladder */
  H+=`<div class="dsec"><div class="dnum">08</div><div class="dbody">
    <h4>What "working" looks like — the success ladder</h4>
    <table class="dtab"><thead><tr><th class="dl">By</th><th>Working</th><th>Not working</th></tr></thead><tbody>
     <tr><td class="dl">Month 3</td>
       <td>${units<=12?'One or two':'Five'} paying customers acquired by hand, and you can quote back their words.</td>
       <td>Still refining the offer. Nobody has paid. You are calling research "traction".</td></tr>
     <tr><td class="dl">Month 6</td>
       <td>Delivered three times. A repeat or referral has appeared unprompted. Price has risen at least once.</td>
       <td>Every sale still takes a bespoke conversation and a discount.</td></tr>
     <tr><td class="dl">Month 12</td>
       <td>${recur?`${Math.max(3,Math.round(units*0.5))}+ paying members, with under 10% a month quitting.`
         :`${Math.max(2,Math.round(units*0.5))}+ sales, roughly half your target run-rate, and a named source of new enquiries.`}
       ${MH[h][4]===0?' Some revenue arrived while you were not working.':''}</td>
       <td>Revenue flat, all of it from your own outreach, and you are still the only channel.</td></tr>
    </tbody></table>
    <p class="tiny">These thresholds are set relative to <b>your</b> ${inr(target)}/month target and this
    idea's price, not pulled from a benchmark. Change the target at the top and they move.</p>
  </div></div>`;

  /* 9 · kill criteria */
  H+=`<div class="dsec"><div class="dnum">09</div><div class="dbody">
    <h4>Kill criteria — commit to these now</h4>
    <div class="stage" style="border-left-color:var(--crit)"><ul>
      <li>Fewer than <b>12 of 20</b> interviewees describe this problem without you prompting → stop.</li>
      <li><b>Zero</b> people pay ${inr(entry)} within 14 days of asking → stop.</li>
      <li>You cannot list twenty named ${WS} with a route to each → stop.</li>
      <li>${EMPLOYER.includes(p)?`No budget holder can name the line item this would come from → stop. Enthusiasm without a budget code is not a signal.`:`Everyone wants it "later" and nobody wants it now → stop. "Later" is a polite no.`}</li>
      <li>By day 90 you have not delivered it ${units<=12?'twice':'three times'} → stop, whatever the pipeline says.</li>
      ${S[0]<=2?`<li style="color:var(--crit)">Willingness to pay already scores ${S[0]} of 5. Treat this as an audience asset and put the invoice somewhere else — see the verdict at the top.</li>`:''}
    </ul></div>
  </div></div>`;

  /* 10 · epistemic status of THIS plan */
  const rCount=[seg.v?1:0,cmp?1:0,BASE_EV[h]?1:0,PC.k==='ok'?1:0].reduce((a,b)=>a+b);
  H+=`<div class="dsec"><div class="dnum">10</div><div class="dbody">
    <h4>What this plan actually knows</h4>
    <table class="dtab"><tbody>
      <tr><td class="dl">Market size</td><td>${seg.v?'<span class="eb src">verified figure</span> for this segment':'<span class="eb bad">no verified figure</span> — the plan refuses to state a total'}</td></tr>
      <tr><td class="dl">Competitors</td><td>${cmp?'<span class="eb src">named, with figures</span> — incomplete but honest':'<span class="eb bad">none verified</span> — a search query is given instead of invented names'}</td></tr>
      <tr><td class="dl">Base price</td><td>${BASE_EV[h]?'<span class="eb src">anchored to published data</span>':'<span class="eb est">my estimate</span> — no market figure for this format'}</td></tr>
      <tr><td class="dl">Final price</td><td>${PC.k==='ok'?'<span class="eb src">inside the evidenced band</span>':'<span class="eb est">outside or beyond the evidenced band</span>'}</td></tr>
      <tr><td class="dl">The 8 scores</td><td><span class="eb jud">judgment</span> — and three of them (distribution, founder fit, energy) are guesses about you, not the market</td></tr>
      <tr><td class="dl">Timelines and milestones</td><td><span class="eb jud">judgment</span> — derived from format weight and payer cycle, not from measured outcomes</td></tr>
      <tr><td class="dl">The idea itself</td><td><span class="eb jud">hypothesis</span> — no customer has been asked</td></tr>
    </tbody></table>
    <p style="margin-top:12px"><b>${rCount} of 4</b> checkable claims in this plan rest on a published
    figure. ${rCount>=3?"That is unusually strong for this bank — this is one of the better-evidenced ideas in it."
      :rCount===2?"That is mid-range. The plan is usable, but the sizing or the pricing is doing work it cannot fully support."
      :"That is weak. Treat this plan as a structured argument, not a forecast, and spend your first week on desk research rather than building."}</p>
    <p class="tiny">Nothing here tells you whether anyone will pay. Sections 07 and 09 are the only
    parts that generate evidence. Everything above them exists to make those two worth running.</p>
  </div></div>`;

  H+=`<div class="dfoot">
    ${n?`<button class="chip" onclick="mode('report');openFold('score',1)">${icon('arrow-left','sm')} back to all 114 scored</button>
    <span class="tiny">Want this written out properly, with me doing fresh research on the gaps above?
    Ask me for <b style="color:var(--ink-1)">&ldquo;go deep on ${n}&rdquo;</b> in chat.</span>`
    :`<span class="tiny">Every number above says where it came from. Where a market figure is checked
    you get the source; where it is not, the plan says so and leaves you the arithmetic rather than
    inventing a total.</span>`}
  </div>`;
  return H;
}
function searchFor(h,p,w){
  return `"${MH[h][6].toLowerCase()}" ${MW[w][4]} India price competitors 2026`;
}

