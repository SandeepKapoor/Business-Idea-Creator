/* ---------- BUSINESS MODEL ANALYSER ----------
   Twenty-three Indian design-education providers, read for how the money actually works, then
   collapsed into the ten distinct models underneath them. The tab answers one question:
   WHICH OF THESE MODELS COULD YOU RUN, AND WHICH ARE ALREADY FULL?

   THREE KINDS OF NUMBER, KEPT APART. This is the whole discipline of the tab.
     counted   how many of the 23 run a model. A fact about my sample, never about India.
     published the provider's own price. A fact, with the source named.
     judged    the 8 criteria out of 40, scored by hand as if Sandeep ran it. Not a measurement.

   WHAT IS DELIBERATELY ABSENT. Revenue, margin, enrolment and profitability are not published
   by private Indian institutes, and I will not estimate them. A model’s economics are described
   in structure — who pays, when, what it costs to run — never in invented rupees.

   FOUR OF THE TEN MODELS ARE MARKED CLOSED. They need a licence, a campus, or a platform he
   cannot build. Scoring those out of 40 would imply a choice that does not exist, so they carry
   a reason instead of a number. That is most of the formal market, and saying so is the finding.

   Reuses FSTR/FSTRW from 17b-frontier.js — one strength scale for the whole document. */

const BSRC=[
 {k:'nidfee', n:'NID — official B.Des fee structure 2026-27 (PDF)', s:1,
  u:'https://admissions.nid.edu/NIDA2026/download/BDES_FeeSturcture_202627.pdf'},
 {k:'pearl',  n:'Pearl Academy — official fee structure', s:1,
  u:'https://www.pearlacademy.com/admissions/fee-structure'},
 {k:'pearlntu',n:'Pearl Academy — international bachelor’s progression', s:1,
  u:'https://www.pearlacademy.com/pearl-advantage/global-exposure/international-bachelors-degree'},
 {k:'ixdf',   n:'IxDF — membership pricing, incl. India rate', s:2,
  u:'https://www.interaction-design.org/membership'},
 {k:'ixdfco', n:'IxDF — corporate membership terms', s:1,
  u:'https://ixdf.org/corporate'},
 {k:'google', n:'Google UX Design Certificate — India page', s:1,
  u:'https://grow.google/intl/en_in/ux-design-course/'},
 {k:'cour',   n:'Coursera — Google UX Design Professional Certificate', s:1,
  u:'https://www.coursera.org/professional-certificates/google-ux-design'},
 {k:'drop',   n:'Dropout Academy — pay-later model', s:1,
  u:'https://www.thedropoutacademy.in/pay-later-model'},
 {k:'upgrad', n:'upGrad — M.Des UX with O.P. Jindal Global University', s:1,
  u:'https://www.upgrad.com/master-of-design-in-user-experience-design-jindal-school-of-art-and-architecture-jgu/'},
 {k:'maac',   n:'MAAC — become a franchisee', s:1,
  u:'https://www.maacindia.com/become-a-franchisee.aspx'},
 {k:'fbaz',   n:'FranchiseBazar — Aptech franchise brands, 2026', s:3,
  u:'https://www.franchisebazar.com/blog/aptech-franchise-2026-maac-lakme-arena-driving-indias-skill-boom'},
 {k:'find',   n:'Franchise India — MAAC investment and outlet counts', s:3,
  u:'https://www.franchiseindia.com/brands/MAAC.3825'},
 {k:'desg',   n:'Designerrs — course pages', s:1,
  u:'https://designerrs.com/'},
 {k:'gsrev',  n:'GrowthSchool UX course review, 2026 — competitor-published', s:4,
  u:'https://indianschoolofskills.org/blog/growthschool-ux-course-review/'},
 {k:'bootcmp',n:'Best UI/UX bootcamps in India, 2026 — competitor-published', s:4,
  u:'https://indianschoolofskills.org/blog/best-ui-ux-bootcamps-india/'},
 {k:'shik',   n:'Shiksha — Pearl Academy fee structure 2026', s:3,
  u:'https://www.shiksha.com/design/articles/pearl-academy-fee-structure-blogId-178505'},
 {k:'cdun',   n:'Collegedunia — NID courses and fees 2026', s:3,
  u:'https://collegedunia.com/college/5884-national-institute-of-design-nid-ahmedabad/courses-fees'},
 {k:'itm',    n:'Top design colleges in India 2026 — fee bands', s:4,
  u:'https://www.itm.edu/blog/top-design-colleges-in-india/'},
 {k:'gl',     n:'Great Learning — UI/UX programmes and university partners', s:3,
  u:'https://www.shiksha.com/provider/great-learning-213163/courses/ui-ux-spl515'}];

/* The ten models. `cl` = closed to Sandeep, with the reason. `S` = the eight criteria, hand-scored
   as if he ran it — same eight as the idea bank so the two tabs are comparable. */
const BMOD=[
{k:'state',nm:'State-subsidised selection',
 one:'The government funds the campus. The entrance exam is the product.',
 payShort:`Learner + the state`,
 how:`The state pays for the campus, so the fee does not have to. What they sell is <b>scarcity</b> — thousands sit the exam for a few hundred seats, and that filter is what employers trust.`,
 pay:`The learner, at a regulated fee. And the taxpayer.`,
 run:`A campus, salaried faculty, and an act of government.`,
 tell:`Almost no marketing. The queue forms by itself — which is also why they never have to change.`,
 cl:`You cannot start one. It needs an act of government and a campus.`},

{k:'privdeg',nm:'Full-fee private degree',
 one:'A campus paid for entirely by fees, sold on placement and studio culture.',
 payShort:`The family, over 4 years`,
 how:`Three or four years of fees against a fixed cost base. An empty seat costs the same as a full one, so the whole business is admissions.`,
 pay:`The learner’s family, usually on a loan.`,
 run:`Campus capex, an affiliation, faculty, year-round admissions.`,
 tell:`Watch what they photograph: campus and placement stats. Those are the two things a parent compares.`,
 cl:`Requires a campus and a regulator. Not a thing one person starts.`},

{k:'foreign',nm:'Foreign validation and progression',
 one:'Rent another country’s brand, and charge for the final year abroad.',
 payShort:`The family, then abroad`,
 how:`Partner with a foreign university so the last year transfers. The Indian years are priced normally; you are paying for the <b>name on the certificate</b>.`,
 pay:`The learner’s family — Indian rates first, foreign rates last.`,
 run:`An accredited institution plus an articulation agreement. That agreement takes years.`,
 tell:`The partner list <i>is</i> the marketing. Pearl names five.`,
 cl:`The agreement is with an institution, not a person. There is nothing here to start small.`},

{k:'unipart',nm:'University-partnership edtech',
 one:'The platform sells and delivers. The university lends the certificate.',
 payShort:`Learner, ₹1.5–4L`,
 how:`The platform sells and delivers; the university accredits. They split the fee. One buys legitimacy, the other rents out a brand.`,
 pay:`The learner, ₹1.5–4 lakh, usually in EMI.`,
 run:`Heavy paid marketing, a sales floor, one signed university.`,
 tell:`The university’s name is bigger than the platform’s in every ad. That tells you what is being bought.`,
 S:[3,5,4,2,4,2,5,2],
 fit:`Open to you as a <b>content partner</b>, not the platform. Fast distribution, poor margin, and their brand grows, not yours.`},

{k:'cohort',nm:'Cohort bootcamp, learner pays upfront',
 one:'Three to six months, live-ish, ₹40,000 to ₹1.5 lakh, paid before it starts.',
 payShort:`Learner, upfront`,
 how:`Cash arrives before delivery. Cost per head falls as the batch grows, so the pressure is always toward bigger batches and more recorded content.`,
 pay:`The learner, upfront or in EMI.`,
 run:`Paid acquisition, a curriculum, mentors, a batch calendar that never stops.`,
 tell:`Ask what is actually live. GrowthSchool’s core is reported to be pre-recorded — sold as a cohort, costed as a course.`,
 S:[3,3,4,4,3,2,5,3],
 fit:`Open, and the most crowded thing here. You would compete on ad spend against people who have more of it.`},

{k:'deferred',nm:'Deferred fee — pay after placement',
 one:'The provider carries the risk, and becomes a recruiter to survive it.',
 payShort:`Learner, after a job`,
 how:`Nothing upfront; the fee falls due on placement. That inverts everything — <b>admissions becomes underwriting</b>, and you fund delivery months before any money arrives.`,
 pay:`The learner, after employment.`,
 run:`Real hiring relationships, tight selection, and a balance sheet that can wait.`,
 tell:`Read the exclusions. Dropout Academy’s applies if a job comes within a month of finishing.`,
 S:[4,3,3,1,3,3,4,2],
 fit:`Open, and expensive. You fund every cohort yourself and can only take students you are sure about. A hiring business wearing a course.`},

{k:'sub',nm:'Global subscription, priced per country',
 one:'One catalogue, sold at whatever each country will bear.',
 payShort:`Learner, monthly`,
 how:`Flat monthly for everything, priced by country — about ₹800 a month in India against roughly $264 a year international. The catalogue is fixed cost; each new member is almost pure margin.`,
 pay:`The learner, monthly, until they stop.`,
 run:`A big library, a renewal machine, and a lot of members.`,
 tell:`The upsell is the business. The same people sell coaching at ₹15,000 a month — nineteen times the membership.`,
 S:[2,2,3,2,5,3,5,3],
 fit:`Open in principle, brutal in practice. At ₹800 a month you need thousands of members before it pays a salary.`},

{k:'platform',nm:'Platform credential as a funnel',
 one:'A company with another business subsidises the certificate.',
 payShort:`Learner, ~$20/mo`,
 how:`Google does not need this to be profitable. About <b>$20 a month</b>, because its job is to grow Google’s ecosystem. The education is someone else’s marketing budget.`,
 pay:`The learner, monthly — so finishing faster costs less.`,
 run:`A platform, a name employers know, and a profit centre somewhere else.`,
 tell:`This is the price floor. Every ₹60,000 bootcamp is silently answering “why not the Google one?”`,
 cl:`It only works if you are subsidising it from somewhere else. You have no somewhere else.`},

{k:'franchise',nm:'Franchise skilling network',
 one:'You do not run the centres. You sell the right to run one.',
 payShort:`The franchisee`,
 how:`The brand supplies courseware and marketing; an operator finds ₹25–50 lakh and takes the lease and staffing risk. Revenue scales with <b>operators</b>, not students.`,
 pay:`The franchisee, upfront and in royalties. Students pay the franchisee.`,
 run:`A courseware factory, a franchise sales team, quality control across cities.`,
 tell:`MAAC lists ~80 franchised outlets against 3 owned. Operating is the low-margin half, handed out on purpose.`,
 S:[4,4,3,2,5,4,3,2],
 fit:`Not now, but real later. A method written down well enough for someone else to run is worth more than any cohort.`},

{k:'b2b',nm:'Company contract, per team',
 one:'One invoice, many seats, and no consumer marketing at all.',
 payShort:`The company`,
 how:`Sell to the employer, not the learner. IxDF charges a flat fee whatever the team studies, from two people up — so cost per course falls the more they use it, which is what renews the contract.`,
 pay:`The company, from a budget that expires each year.`,
 run:`Almost no funnel. A few relationships and a purchase order.`,
 tell:`Nobody advertises this. Least visible model here, and per customer the most valuable.`,
 S:[5,3,5,3,4,4,4,4],
 fit:`<b>The one everything else keeps pointing at.</b> Three customers cover your target. No ad war, and your credibility does the selling.`}];

/* The twenty-one providers. `fee` is published or reported; `sk` names the source; `md` is the
   model it belongs to. Where a figure is a band from a third party rather than the provider's own
   page, the source strength says so. */
const BINST=[
{k:'nid',nm:'NID Ahmedabad',md:'state',fmt:'B.Des 4 yr · M.Des 2 yr',
 fee:'B.Des ≈ ₹19.19 lakh total; M.Des ≈ ₹2.44 lakh a semester',sk:['nidfee','cdun'],
 note:'Entry is the Design Aptitude Test. The filter, not the fee, is the product.'},
{k:'nift',nm:'NIFT',md:'state',fmt:'B.Des · B.F.Tech · M.Des',
 fee:'Reported ≈ ₹9 lakh UG, ₹4 lakh PG for the programme',sk:['itm'],
 note:'Sixteen-plus campuses. National exam, same scarcity mechanism as NID.'},
{k:'pearl',nm:'Pearl Academy',md:'privdeg',fmt:'B.Des · M.Des, five campuses',
 fee:'B.Des ₹10.92–14 lakh total; M.Des ₹12.2 lakh; admission fee ≈ ₹82,000',sk:['pearl','shik','pearlntu'],
 note:'Also runs the foreign-progression model — two models in one institution.'},
{k:'pearlint',nm:'Pearl Academy — international progression',md:'foreign',
 fmt:'Final year transferred to a partner university abroad',
 fee:'Indian years at Pearl’s published rates; the final year is billed by the foreign partner — amount not published',
 sk:['pearlntu'],
 note:'Partners named: Nottingham Trent, Derby, Manchester Metropolitan, University for the Creative Arts, Torrens. Same institution as the row above, running a second model.'},
{k:'srishti',nm:'Srishti Manipal',md:'privdeg',fmt:'Degree, Bengaluru',
 fee:'Reported ₹1.2–3 lakh a year',sk:['itm'],note:'Inside the Manipal group.'},
{k:'mitid',nm:'MIT Institute of Design, Pune',md:'privdeg',fmt:'Degree',
 fee:'Reported ₹2–4 lakh+ a year',sk:['itm'],note:'Part of a larger private university.'},
{k:'isdi',nm:'ISDI, Mumbai',md:'privdeg',fmt:'Degree',fee:'Not published in a source I could verify',
 sk:['itm'],note:'Positioned against Pearl; the two compare themselves to each other publicly.'},
{k:'sid',nm:'Symbiosis Institute of Design',md:'privdeg',fmt:'Degree',
 fee:'Not verified',sk:['itm'],note:'University-embedded, entrance-tested.'},
{k:'iiad',nm:'IIAD, Delhi',md:'privdeg',fmt:'Degree',fee:'Not verified',sk:['itm'],
 note:'Kingston School of Art association — a fourth instance of the validation model.'},
{k:'upgrad',nm:'upGrad',md:'unipart',fmt:'M.Des UX with O.P. Jindal, 12 months, online',
 fee:'Programme fees reported ₹1.5–4 lakh',sk:['upgrad'],
 note:'The degree is Jindal’s. The funnel, the sales floor and the delivery are upGrad’s.'},
{k:'greatlearning',nm:'Great Learning',md:'unipart',fmt:'PG programme in UX with UT Austin McCombs',
 fee:'Not published on the pages I could reach',sk:['gl'],
 note:'Also partners PES, Northwestern and Deakin. The partner is the product.'},
{k:'growthschool',nm:'GrowthSchool',md:'cohort',fmt:'Hybrid cohort',
 fee:'Reported ₹50,000–70,000 depending on early-bird and scholarship',sk:['gsrev'],
 note:'Source is a competitor’s review, so treat the figure as indicative. Core material reported pre-recorded.'},
{k:'designboat',nm:'DesignBoat',md:'cohort',fmt:'14 weeks, offline-led, Bengaluru and others',
 fee:'Not published in a source I could verify',sk:['bootcmp'],
 note:'Physically present in tech hubs — rent as a deliberate differentiator.'},
{k:'designerrs',nm:'Designerrs Academy',md:'cohort',fmt:'13–14 weeks, online plus campuses',
 fee:'Not published on the page I could reach',sk:['desg'],
 note:'AR/VR and voice UX alongside the core — differentiating on subject, not on price.'},
{k:'and',nm:'AND Academy',md:'cohort',fmt:'Online design school',fee:'Not verified',sk:['bootcmp'],
 note:'Runs a large content operation; the blog is the acquisition channel.'},
{k:'iss',nm:'Indian School of Skills',md:'cohort',fmt:'6-month cohort',fee:'Not published',
 sk:['bootcmp'],note:'Publishes comparison guides ranking the category it competes in. Note the incentive.'},
{k:'dropout',nm:'Dropout Academy',md:'deferred',fmt:'4 months, pay after placement',
 fee:'No upfront fee; due on placement within a month of finishing — amount not published',sk:['drop'],
 note:'Claims 90% placement and ₹8 LPA average (2023, self-reported, unaudited).'},
{k:'ixdf',nm:'Interaction Design Foundation',md:'sub',fmt:'Subscription, ~40 courses',
 fee:'≈ $264 a year international; ≈ ₹800 a month in India, billed annually',sk:['ixdf'],
 note:'Also sells coaching at ₹15,000 a month — the subscription is the funnel.'},
{k:'ixdfcorp',nm:'IxDF Company Membership',md:'b2b',fmt:'Team seats, flat fee',
 fee:'Flat fee regardless of courses taken, amount not published; minimum 2 people, 5 recommended',sk:['ixdfco'],
 note:'Cost per course falls with use — the renewal argument is built into the pricing.'},
{k:'google',nm:'Google UX Design Certificate',md:'platform',fmt:'Self-paced on Coursera',
 fee:'≈ $20 a month after a 7-day trial; most finish in 3–6 months',sk:['google','cour'],
 note:'Sets the price floor every Indian bootcamp has to argue against.'},
{k:'arena',nm:'Arena Animation',md:'franchise',fmt:'Centre network, Aptech',
 fee:'Franchisee invests ≈ ₹25–40 lakh depending on city',sk:['fbaz'],
 note:'The student is the franchisee’s customer. The franchisee is Aptech’s.'},
{k:'maac',nm:'MAAC',md:'franchise',fmt:'Centre network, Aptech',
 fee:'Franchisee invests ≈ ₹30–50 lakh; 1,000–1,200 sq ft',sk:['find','maac'],
 note:'Roughly 80 franchised outlets against 3 company-owned.'},
{k:'upgradent',nm:'upGrad Enterprise',md:'b2b',fmt:'Corporate contracts',fee:'Not published',
 sk:['upgrad'],note:'The same catalogue, invoiced to a company instead of a person.'}];

/* Doblin's ten types, in his order. Marks: 2 = where the model genuinely innovates,
   1 = some, 0 = none. Assigned by me from the descriptions above — a reading, not a measurement. */
const DOBL=['Profit model','Network','Structure','Process','Product performance',
            'Product system','Service','Channel','Brand','Customer engagement'];
const DOBM={
 state:    [0,1,2,0,1,0,0,0,2,0],
 privdeg:  [0,1,1,0,1,1,1,1,2,1],
 foreign:  [0,2,0,0,0,1,0,1,2,0],
 unipart:  [1,2,0,1,0,0,1,2,2,1],
 cohort:   [0,0,0,1,1,1,1,2,1,1],
 deferred: [2,1,1,1,0,0,1,1,1,1],
 sub:      [2,0,0,0,0,2,1,1,1,2],
 platform: [2,1,0,0,1,1,0,2,2,0],
 franchise:[1,2,2,1,0,1,0,2,1,0],
 b2b:      [1,1,0,0,0,1,2,1,0,1]};

const bFind=(a,k)=>a.find(x=>x.k===k);

/* ORDER IS THE ARGUMENT. BMOD is authored formal-to-informal, which put three "closed to you"
   cards before anything he could act on — in a tab whose whole job is "pick a model", the first
   screen was three doors he cannot open. Open models come first, best score first; the closed
   four follow behind their own divider, because they are still worth reading as a map of what
   most of this market is. Sorting here, not in the data, keeps the data in its argued order. */
function bmaOrder(){
  const open=BMOD.filter(m=>!m.cl).sort((a,b)=>
    b.S.reduce((x,y)=>x+y,0)-a.S.reduce((x,y)=>x+y,0));
  return open.concat(BMOD.filter(m=>m.cl));
}
/* THE DECISION SURFACE. Ten cards of prose is a document, not a tool — 2,849 words landed on one
   screen and the reader had to build the comparison themselves. This table IS the comparison: one
   row a model, four columns, sortable by eye. Everything below it is the evidence for a row.
   Clicking a row opens that card, so the table is navigation as well as summary. */
/* THE TABLE CARRIES ONLY WHAT IS COMPARABLE. It used to print M.one — the model's one-line
   description — inside the name cell, and then the card twenty pixels below printed the same
   sentence again. Ten models, so ten sentences said twice on one screen, which is both the
   longest thing on the tab and the thing a decision table has least use for: you do not choose
   between models by reading ten descriptions in a column, you choose by lining up who pays, how
   many providers run it, and what it scored. Those are the columns that are left.

   It is also the second copy of a fact this tab has grown and had removed — BMOD.inst beside
   BINST.md was the first, and it had already drifted before anyone noticed. */
function bmaTableHTML(){
  const ord=bmaOrder(), total=BINST.length;
  return `<div class="bmtwrap"><table class="bmt"><thead><tr>
    <th class="bmtl">Model</th><th>Who pays</th><th class="bmtn">Of ${total}</th>
    <th class="bmtn">Score</th></tr></thead><tbody>
    ${ord.map((M,i)=>{
      const runs=BINST.filter(x=>x.md===M.k).length;
      return `<tr class="bmtr${M.cl?' shut':''}" tabindex="0" role="link"
        onclick="openModel('${M.k}')" onkeydown="if(event.key==='Enter'||event.key===' ')
          {event.preventDefault();openModel('${M.k}');}">
        <td class="bmtl"><b>${M.nm}</b></td>
        <td>${M.payShort}</td>
        <td class="bmtn">${runs}</td>
        <td class="bmtn">${M.cl?'<i>closed</i>':`<b>${M.S.reduce((a,b)=>a+b,0)}</b>`}</td>
      </tr>`;}).join('')}
    </tbody></table></div>`;
}

/* Open one model's card from the table and bring it into view. */
function openModel(k){
  const el=document.getElementById('bm-'+k);
  if(!el)return;
  if(typeof setFold==='function'&&el.classList.contains('fold'))setFold(el,true);
  el.scrollIntoView({behavior:'smooth',block:'start'});
}

/* Fold every card shut on load, so the default view is the table plus ten headlines rather than
   ten essays. Called from boot, after 21-collapse.js has defined makeFold. */
function initBma(){
  document.querySelectorAll('#bma article.bm').forEach(c=>
    makeFold(c,c.querySelector('.bmhd'),[c.querySelector('.bmone')]));
  document.querySelectorAll('#bma .bmlong').forEach(c=>
    makeFold(c,c.querySelector(':scope > h4')));
}

function bmaModelsHTML(){
  const total=BINST.length, ord=bmaOrder(), firstShut=ord.findIndex(m=>m.cl);
  return ord.map((M,i)=>{
    const runs=BINST.filter(x=>x.md===M.k);
    const tot=M.S?M.S.reduce((a,b)=>a+b,0):null;
    const divider = i===firstShut
      ? `<div class="bmsplit"><b>Closed to you</b> — ${ord.length-firstShut} of the ${ord.length}
         models need a licence, a campus or a platform. That is most of the formal market, and it
         is why the list above is short.</div>` : '';
    return `${divider}<article class="bm${M.cl?' shutdoor':''}" id="bm-${M.k}">
      <div class="bmhd"><span class="bmn">${String(i+1).padStart(2,'0')}</span>
        <h4>${M.nm}</h4>
        ${M.cl?`<span class="eb bad">closed to you</span>`
              :`<span class="bmsc"><b>${tot}</b>/40</span>`}</div>
      <p class="bmone">${M.one}</p>
      <div class="bmgrid">
        <div><span class="ik">How the money works</span>${M.how}</div>
        <div><span class="ik">Who pays</span>${M.pay}</div>
        <div><span class="ik">What it takes to run</span>${M.run}</div>
        <div><span class="ik">The tell</span>${M.tell}</div>
      </div>
      <div class="bmfit">${M.cl
        ? `<span class="ik">Why it is closed</span>${M.cl}`
        : `<span class="ik">If you ran it</span>${M.fit}
           <div class="bmcrit">${CRIT.map((c,j)=>
             `<span><i>${c}</i><b>${M.S[j]}</b></span>`).join('')}</div>`}</div>
      <div class="bmruns"><span class="ik">Running it, of the ${total} I looked at
        — <b>${runs.length}</b></span>
        ${runs.map(r=>`<span class="chip">${r.nm}</span>`).join('')}</div>
    </article>`;}).join('');
}

function bmaInstHTML(){
  return bmaOrder().map(M=>{
    const runs=BINST.filter(x=>x.md===M.k);
    if(!runs.length)return '';
    return `<div class="biband"><div class="bibh">${M.nm}</div>
      ${runs.map(r=>`<div class="birow">
        <div class="bin">${r.nm}<span>${r.fmt}</span></div>
        <div class="bif">${r.fee}</div>
        <div class="bino">${r.note}
          <span class="bicite">${r.sk.map(k=>{const c=bFind(BSRC,k);
            return c?`<a href="${c.u}" target="_blank" rel="noopener">${c.n}</a>
              <span class="frw">${FSTR[c.s][0]}</span>`:'';}).join(' · ')}</span></div>
      </div>`).join('')}</div>`;}).join('');
}

/* The heatmap is the argument: two columns are nearly full and four are nearly empty. */
function bmaDoblinHTML(){
  /* The three marks are drawn in CSS, not typed as ·, ◦ and ●. craft-floor bans unicode glyphs
     standing in for icons, and design.js caught these on the first run — the same rule that took
     ⚙ ⚖ ◐ out of the report. A span with a border and a radius gives the same three states, at a
     size tied to the type scale, and it survives a font that has no glyph for ◦. */
  const word=['none','some','strong'];
  const ord=bmaOrder();
  const col=i=>ord.reduce((a,M)=>a+(DOBM[M.k][i]===2?1:0),0);
  return `<table class="dob"><thead><tr><th class="dlab">Business model</th>
    ${DOBL.map(d=>`<th><span>${d}</span></th>`).join('')}</tr></thead><tbody>
    ${ord.map(M=>`<tr><td class="dlab">${M.nm}</td>
      ${DOBM[M.k].map((v,i)=>`<td class="d${v}"><span class="vh">${word[v]} on ${DOBL[i]}</span>
        <span class="dmk" aria-hidden="true"></span></td>`).join('')}</tr>`).join('')}
    <tr class="dsum"><td class="dlab">Models innovating strongly here</td>
      ${DOBL.map((d,i)=>`<td>${col(i)}</td>`).join('')}</tr>
    </tbody></table>`;
}

function bmaSrcHTML(){
  return [1,2,3,4].map(lvl=>{
    const got=BSRC.filter(c=>c.s===lvl).sort((a,b)=>a.n.localeCompare(b.n));
    if(!got.length)return '';
    return `<div class="frband">
      <div class="frbh"><span class="eb ${FSTR[lvl][1]}">${FSTR[lvl][0]}</span>
        <span>${FSTRW[lvl]}</span></div>
      ${got.map(c=>`<div class="frrow"><a href="${c.u}" target="_blank"
        rel="noopener">${c.n}</a></div>`).join('')}</div>`;}).join('');
}

document.getElementById('bmaTable').innerHTML=bmaTableHTML();
document.getElementById('bmaModels').innerHTML=bmaModelsHTML();
document.getElementById('bmaInst').innerHTML=bmaInstHTML();
document.getElementById('bmaDob').innerHTML=bmaDoblinHTML();
document.getElementById('bmaSrc').innerHTML=bmaSrcHTML();
