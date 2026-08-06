/* ---------- THE FRONTIER ----------
   The idea bank answers "what could I build?". This answers a different question:
   "what is opening right now, and how long before it shuts?"

   WHY IT IS NOT SCORED. Every other idea on this page carries a number out of 40. These do
   not, deliberately. The engine derives a score from four axis positions, and an axis position
   is a claim about a market that already exists — who the buyer is, what the format is worth,
   how fast they pay. For a niche eighteen months old there is no such market to read, so a
   score would be a confident-looking number resting on nothing. The bank's own weakest entries
   (#113, #114) already show how easily that reads as authority. Here the evidence is the
   output: a dated source, its strength, and what is still unknown.

   THE FOUR FIELDS EVERY ENTRY MUST FILL
     sg   the signal — one dated, sourced fact. Never a trend, never a feeling.
     wn   the window — my estimate of how long before it is crowded. Labelled as an estimate.
     wy   why it is still empty. If there is no specific reason, it probably is not empty.
     mv   the first move, doable in a week, costing nothing but time.

   SOURCE STRENGTH is a property of the publisher, not of how much I like the finding:
     1  primary or statutory — a government release, a law firm reading a law, a named study
     2  named research from an organisation with a method, reported first-hand
     3  a vendor survey, or solid research reported second-hand
     4  content marketing with no stated method — used only to show a term exists, never for a number

   Nothing here has been validated with a customer, and no market size appears anywhere on the
   tab. Where I could not find a number I have said so rather than estimating one. */

const FSRC=[
 {k:'nng',   n:'Nielsen Norman Group — State of UX 2026', s:1,
  u:'https://www.nngroup.com/articles/state-of-ux-2026/'},
 {k:'dfund', n:'Designer Fund — AI in Design 2026 survey', s:3,
  u:'https://designerfund.com/blog/ai-in-design-2026'},
 {k:'figma', n:'Figma — State of Designer 2026, reported second-hand', s:3,
  u:'https://www.uxdesigninstitute.com/blog/19-ux-roles-in-2026/'},
 {k:'uxdi',  n:'UX Design Institute — The UX Job Market in 2026', s:3,
  u:'https://www.uxdesigninstitute.com/blog/the-ux-job-market-in-2026-2/'},
 {k:'mcp',   n:'MCP Tool Descriptions Are Smelly! — arXiv 2602.14878, Feb 2026', s:1,
  u:'https://arxiv.org/abs/2602.14878'},
 {k:'ax',    n:'Agent Experience — where the term came from', s:4,
  u:'https://medium.com/design-bootcamp/agent-experience-ax-designing-interfaces-for-machines-and-people-474f77018000'},
 {k:'evals', n:'AI Evals Engineer — 2026 career guide', s:4,
  u:'https://jobsbyculture.com/blog/ai-evals-engineer-career-guide-2026'},
 {k:'eaa',   n:'Level Access — EAA penalties for non-compliance, 2026', s:2,
  u:'https://www.levelaccess.com/blog/penalties-for-eaa-non-compliance/'},
 {k:'eaa2',  n:'EAA fines and sanctions by EU country, 2026', s:3,
  u:'https://www.webyes.com/blogs/eaa-fines/'},
 {k:'azb',   n:'AZB Partners — CCPA enforcement on dark patterns', s:1,
  u:'https://www.azbpartners.com/bank/regulatory-crackdown-on-dark-patterns-ccpas-enforcement-actions-and-emerging-compliance-landscape-in-indian-e-commerce/'},
 {k:'pib',   n:'Press Information Bureau — 26 platforms declare dark-pattern compliance', s:1,
  u:'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2191948&reg=3&lang=2'},
 {k:'iapp',  n:'IAPP — India’s dark-pattern guidelines: the law is still soft', s:1,
  u:'https://iapp.org/news/a/india-s-ccpa-guidelines-on-dark-patterns-welcome-signal-but-law-is-still-soft'},
 {k:'gcc',   n:'Business Today — India GCC hiring hits 510,452 in 2026', s:2,
  u:'https://www.businesstoday.in/jobs/story/at-5-1-lakh-jobs-indias-global-capability-centre-hiring-boom-scales-new-peak-540328-2026-07-01'}];

/* s = source strength, 1 strongest. Rendered as a word, never as a number the reader has to
   decode, and never as colour alone. */
const FSTR=[null,
 ['primary','src'],['named research','src'],['vendor survey','est'],['unverified','jud']];

const FRONT=[
{k:'rubric',nm:'Nobody has rewritten the hiring rubric',
 one:'Designers changed how they work. The people who judge them did not.',
 sg:`<b>91%</b> of designers now use AI weekly, up from 54% a year earlier, and 75% use it daily.
     In the same survey only <b>28%</b> of design leaders have updated how they evaluate or hire.`,
 sk:['dfund'],
 wt:`A portfolio no longer proves anything, because anyone can generate a beautiful one in an
     afternoon. Every head of design knows this and almost none of them have replaced the test.
     You build the replacement: a way to tell, in ninety minutes, whether a designer can actually
     decide things — and you sell it to the employer, not the designer.`,
 wn:`Two to three years. This gap closes slowly because it needs someone to do unglamorous work,
     not because it is hard. My estimate, not a measurement.`,
 wy:`It is an assessment, not a course, so nobody in education is looking at it. And it is sold
     to a buyer most design educators have never invoiced.`,
 mv:`Write the ninety-minute test. Run it free on three designers you know. The output is a
     one-page report on each — that report is the product.`,
 by:`The employer. A head of design with a hiring problem and a budget code.`,
 nr:[52,11,12]},

{k:'ax',nm:'Designing for the agent, not the person',
 one:'Your interface has a second user now, and it cannot see.',
 sg:`A February 2026 study of <b>856 tools across 103 MCP servers</b> found <b>97.1%</b> of tool
     descriptions had at least one defect and <b>56%</b> never stated their purpose. Rewriting them
     raised agent task success by a median of <b>5.85 percentage points</b> — while increasing
     execution steps by <b>67.46%</b> and making things <i>worse</i> in <b>16.67%</b> of cases.
     The term <i>agent experience</i> itself was coined in 2025 by Netlify’s chief executive.`,
 sk:['mcp','ax'],
 wt:`Software is increasingly operated by agents rather than people. The human needs visual
     clarity and feedback. The agent needs structured data, unambiguous actions and predictable
     output. Those are different design problems and almost nobody is treating the second one as
     design work at all.`,
 wn:`Twelve to eighteen months before credible people occupy it. Earliest thing on this list, and
     the estimate is mine.`,
 wy:`Eighteen months old, and it sits between design and engineering so neither field has claimed
     it. The study above is the tell: writing for agents is measurably a craft with trade-offs —
     more words cost more steps, and a sixth of the time they make it worse — and there is nobody
     whose job is to make that judgment call.`,
 mv:`Take one product you use and write the agent-facing version of its three main actions.
     Publish it. That is currently a rare document.`,
 by:`Product teams shipping agent features. Probably a workshop before it is ever a course.`,
 nr:[87,86,88]},

{k:'evals',nm:'Evals are design research wearing a lab coat',
 one:'Someone has to decide whether the model’s answer is any good. That is a research question.',
 sg:`Frontier labs run whole teams of evals engineers, and applied AI companies hire them among
     their <b>first ten technical hires</b>, because eval speed sets product speed.`,
 sk:['evals'],
 wt:`An eval is the test that says whether an AI output is acceptable. Today engineers write them
     as a technical task, using their own judgment about what good looks like. Deciding what good
     looks like for a human being is the one thing designers are actually trained to do.`,
 wn:`Two years, and closing from the engineering side rather than the design side.`,
 wy:`It looks technical, so designers rule themselves out before reading the first page. That
     self-exclusion is the whole moat, and it will not last.`,
 mv:`Write twenty evals for one AI feature you use daily. Not code — the criteria. Show them to
     one engineer and watch which ones they argue with.`,
 by:`Product teams with an AI feature already shipped and no idea whether it is working.`,
 nr:[88,86,89]},

{k:'darkpat',nm:'India regulated dark patterns first, and nobody can audit them',
 one:'Twenty-six platforms have publicly declared themselves clean. Nobody qualified checked.',
 sg:`India is the first country in the world with dedicated dark-pattern guidelines (2023). In
     June 2025 the CCPA told e-commerce platforms to self-audit within three months; that window
     closed, and the government has published declarations from <b>26 leading platforms</b>.`,
 sk:['azb','pib','iapp'],
 wt:`A self-declaration nobody audits is a liability sitting in public. You build the audit method
     — the checklist, the evidence format, the report — and become the person a platform calls
     before a regulator does.`,
 wn:`Wide open today precisely because it is toothless. It narrows the moment penalties arrive,
     and then it narrows fast.`,
 wy:`<b>The honest reason: it is an advisory, not law.</b> No penalties, no audit mechanism. IAPP
     and Internet Freedom Foundation have both said so. Nobody has entered because there is no
     forced buyer yet — which is exactly the bet, and it is a real bet, not a sure thing.`,
 mv:`Audit three well-known Indian apps against the 2023 guidelines and publish the findings with
     screenshots. Uncomfortable, cheap, and impossible to ignore.`,
 by:`Nobody, today. Legal and compliance teams, if and when it hardens.`,
 nr:[80,79,89]},

{k:'eaa',nm:'A European deadline that already passed',
 one:'The law is live, the first lawsuits are filed, and Indian teams built a lot of the products.',
 sg:`EAA enforcement began <b>28 June 2025</b>. The first lawsuits were filed in <b>France in
     November 2025</b>. Penalties are set nationally: France runs <b>€5,000–250,000</b>, with
     some member states reaching <b>€1,000,000 per infraction</b>, plus product withdrawal and
     exclusion from public procurement.`,
 sk:['eaa','eaa2'],
 wt:`Not a trend. A statute with dates and money attached. Indian studios and capability centres
     build a large share of the products that now have to comply, and very few people here can do
     remediation work to a standard that survives a challenge.`,
 wn:`Three to five years of remediation demand, which is long for anything on this list.`,
 wy:`Accessibility has been unfashionable in Indian design education for a decade. The skill is
     rare here for cultural reasons, not technical ones.`,
 mv:`Audit one European product against the standard and send the findings to the company that
     built it. Unsolicited, free, specific.`,
 by:`The company that owns the product, out of a legal budget rather than a training budget.`,
 nr:[80,79,3]},

{k:'probui',nm:'No pattern library exists for interfaces that are never the same twice',
 one:'Every design pattern ever written assumes the same input gives the same output.',
 sg:`Probabilistic interfaces, hallucination handling and agent orchestration are named repeatedly
     across 2026 role write-ups as frontier skills, with the same observation each time: very few
     designers are there yet.`,
 sk:['figma','uxdi'],
 wt:`AI broke the assumption underneath every interaction pattern in the field. There is no
     agreed way to show uncertainty, no standard for an undo when the system already acted, no
     pattern for a confident wrong answer. Whoever writes the first credible library owns the
     reference — and a reference is a book, a deck and a course at once.`,
 wn:`Eighteen months to two years before a large company publishes one and sets the standard.`,
 wy:`Writing a pattern library is slow, unpaid work that only pays off if people adopt it. Almost
     nobody will do that on speculation.`,
 mv:`Collect thirty screenshots of AI features handling uncertainty badly. The collection is the
     first draft of the argument.`,
 by:`Nobody directly. It is an asset that sells the things above it — treat it as distribution.`,
 nr:[87,85,39]},

{k:'deseng',nm:'Half of designers ship code they cannot fully read',
 one:'The merge already happened. Nobody wrote the discipline.',
 sg:`<b>50%</b> of designers report having shipped AI-generated code to production, and
     <b>65%</b> say they have taken on more product or engineering responsibility. The average
     designer now uses <b>7</b> AI tools, up from 3.`,
 sk:['dfund'],
 wt:`Designers are pushing code into real products. There is no standard for reviewing it, no
     agreed line for what a designer should and should not ship, and no training. That is a
     safety problem and a teachable one.`,
 wn:`Two years. Engineering will impose a standard eventually, and it will be theirs, not ours.`,
 wy:`It falls between two departments, so neither owns the training budget for it.`,
 mv:`Write the review checklist you would want a designer to pass before merging. One page.`,
 by:`Engineering leaders, who carry the risk when it goes wrong.`,
 nr:[86,92,57]},

{k:'judge',nm:'When everyone can generate, judging becomes the job',
 one:'Output is free. An opinion that holds up is not.',
 sg:`Nielsen Norman Group’s reading: UI is cheaper to produce because of standardisation, and
     as tools improve <i>anyone will be able to make a decent-looking UI</i>. In the same period
     only <b>5%</b> of design leaders say they place <i>less</i> emphasis on quality.`,
 sk:['nng','dfund'],
 wt:`More output, same quality bar, no more time to check it. The scarce thing is someone who can
     look at a screen and say this one is wrong, and here is why, and be right. Sold as a
     standing review rather than a course.`,
 wn:`Long. This does not close, it just gets more valuable — which also means no urgency, and
     that is its weakness as a first move.`,
 wy:`It cannot be productised easily and it does not scale. Most educators will not touch it for
     exactly that reason.`,
 mv:`Publish one teardown a week of an AI-built product, judged on whether the decision was right
     rather than whether it looks good.`,
 by:`A team lead who is drowning in output, paying a retainer.`,
 nr:[97,43,6]},

{k:'gcc',nm:'The buyer nobody in design education is calling',
 one:'Not a subject — a room with a budget, and two-thirds of its new roles now need AI skills.',
 sg:`India has roughly <b>2,120</b> capability centres. Hiring is projected at <b>510,452</b>
     people in 2026, a 3.4× rise since 2021. <b>64%</b> of new roles created in 2026 require AI,
     data science or automation skills, and tier-2 cities are growing at <b>23%</b> a year —
     about twice the metros.`,
 sk:['gcc'],
 wt:`This is a payer, not a topic. Anything above — evals, agent design, the hiring rubric — can
     be sold into it. The numbers are the largest on this page by a wide margin and the training
     budget is allocated annually and expires.`,
 wn:`Open now, and the tier-2 growth is the part nobody is serving.`,
 wy:`Design educators sell to individuals out of habit. Selling to a company means procurement, a
     purchase order and a four-to-twelve week wait, and most people give up before the first one.`,
 mv:`Ten conversations. One question: what did last year’s training budget get spent on, who
     decided, and what did you wish existed instead.`,
 by:`A company learning budget. The largest cheque available to anyone on this page.`,
 nr:[23,29,110]},

{k:'peer',nm:'People stopped learning from teachers',
 one:'Not a subject at all. A finding about the shape everything else should take.',
 sg:`Learning from peers jumped from <b>24% to 80%</b> in a single year, in the same survey where
     weekly AI use went from 54% to 91%.`,
 sk:['dfund'],
 wt:`When a field changes every quarter, nobody stays the expert long enough to teach it. So
     people learn sideways instead. That is a format finding, and it should change how you build
     every other idea on this page: the winning shape is a room, not a curriculum.`,
 wn:`Not a window. A standing condition, for as long as the field moves this fast.`,
 wy:`A room is harder to sell than a course, because the buyer cannot see what is inside before
     paying. That is a marketing problem, not a demand problem.`,
 mv:`Run one room. Eight people, one topic, no slides, no recording. Charge for the second one.`,
 by:`Members, monthly, or an employer paying for a seat.`,
 nr:[109,41,72]}];

/* Idea number to name, read straight from CL rather than from ALLC — ALLC does not exist until
   buildAll() runs at boot, and this file renders at parse time. */
const BANKNM={};
CL.forEach(c=>c.i.forEach(x=>{BANKNM[x[0]]=x[1];}));

/* Rendered at parse time, like the picks list, so there is no boot-order dependency and the
   markup is in the DOM before initFold() runs. */
/* ---------- the index ----------
   Ten entries at roughly six hundred pixels each is six thousand pixels of linear scroll with no
   way to compare any two of them. The tab is a watch list, and a watch list you can only read
   front-to-back is a queue.

   This is NOT a repeat of the cards underneath. It carries the two things you would otherwise
   have to open all ten entries to line up — how long the window is, and how much evidence sits
   behind it — and it deliberately leaves out the one-line description, which is the first thing
   the card itself shows. A row that restates the row below it is a second place to keep the same
   fact current, and the analyser tab already taught us how that ends. */
function frontierIndexHTML(){
  const src=k=>FSRC.find(x=>x.k===k);
  return `<div class="frtwrap"><table class="frt"><caption>Ten windows, in the order they are argued</caption>
    <thead><tr><th class="frtn">№</th><th>Signal</th><th>Window</th><th>Evidence</th></tr></thead>
    <tbody>${FRONT.map((F,i)=>{
      const best=Math.min(...F.sk.map(k=>(src(k)||{s:4}).s));
      const [word,cls]=FSTR[best];
      return `<tr class="frtr" tabindex="0" role="link"
        onclick="openFr('${F.k}')" onkeydown="if(event.key==='Enter'||event.key===' ')
          {event.preventDefault();openFr('${F.k}');}">
        <td class="frtn">${String(i+1).padStart(2,'0')}</td>
        <td class="frtl"><b>${F.nm}</b></td>
        <td class="frtw">${F.wnShort||F.wn.split(/[.]/)[0]}</td>
        <td><span class="eb ${cls}">${word}</span></td>
      </tr>`;}).join('')}</tbody></table></div>`;
}

/* Open one entry from the index and bring it into view. Same shape as the analyser's openModel;
   both exist because a jump that lands on a closed heading has told the reader nothing. */
function openFr(k){
  const el=document.getElementById('fr-'+k);
  if(!el)return;
  if(typeof setFold==='function'&&el.classList.contains('fold'))setFold(el,true);
  el.scrollIntoView({behavior:'smooth',block:'start'});
}

/* Fold every entry shut on load, so the tab opens as an index plus ten headlines rather than ten
   essays. Called from boot, after 21-collapse.js has defined makeFold. */
function initFrontier(){
  document.querySelectorAll('#frontier article.fr').forEach(a=>
    makeFold(a,a.querySelector('.frhd'),[a.querySelector('.frone')]));
  const sb=document.querySelector('#frontier .frsrcblk');
  if(sb)makeFold(sb,sb.querySelector(':scope > h3'));
}

function frontierHTML(){
  const src=k=>FSRC.find(x=>x.k===k);
  return FRONT.map((F,i)=>{
    const cites=F.sk.map(k=>src(k)).filter(Boolean);
    /* The chip reports the STRONGEST source, not the weakest. It is a floor — "there is at least
       this much behind it" — and verify.js separately guarantees no figure rests on a
       content-marketing source alone, so the floor cannot be gamed. Taking the weakest instead
       labelled an entry backed by a named study as "unverified" because it also cited a blog for
       where a term came from, which reads as a warning about the wrong thing. Each citation
       carries its own strength underneath, so nothing is hidden by the summary. */
    const best=Math.min(...cites.map(c=>c.s));
    const [word,cls]=FSTR[best];
    return `<article class="fr" id="fr-${F.k}">
      <div class="frhd">
        <span class="frn">${String(i+1).padStart(2,'0')}</span>
        <h4>${F.nm}</h4>
        <span class="eb ${cls}" title="Strength of the strongest source behind this entry — a floor, not an average">${word}</span>
      </div>
      <p class="frone">${F.one}</p>
      <div class="frsig"><span class="ik">The signal</span><p>${F.sg}</p>
        <p class="frcite">${cites.map(c=>
          `<a href="${c.u}" target="_blank" rel="noopener">${c.n}</a>
           <span class="frw">${FSTR[c.s][0]}</span>`).join(' · ')}</p></div>
      <p class="frwhat">${F.wt}</p>
      <div class="frgrid">
        <div><span class="ik">The window</span>${F.wn}</div>
        <div><span class="ik">Why it is still empty</span>${F.wy}</div>
        <div><span class="ik">Who would pay</span>${F.by}</div>
        <div><span class="ik">First move, this week</span>${F.mv}</div>
      </div>
      <div class="frnear"><span class="ik">Nearest ideas in the bank</span>
        ${F.nr.map(n=>`<button class="chip" type="button" onclick="openInBuilder(${n})"
          >#${n} ${(BANKNM[n]||'').replace(/&/g,'&amp;')}</button>`).join('')}</div>
    </article>`;}).join('');
}

/* The whole evidence base in one place, so the reader is not left judging each entry only by
   whichever citation sat under it.

   GROUPED BY STRENGTH, not listed flat. The flat version printed the same sentence — "a
   government release, a law firm reading a statute, or a named study" — five times in a column
   of its own, which is four repetitions of a definition and no information. Saying it once above
   its group says the same thing and leaves the rows carrying only what differs. */
function frontierSrcHTML(){
  return [1,2,3,4].map(lvl=>{
    const got=FSRC.filter(c=>c.s===lvl).sort((a,b)=>a.n.localeCompare(b.n));
    if(!got.length)return '';
    const [word,cls]=FSTR[lvl];
    return `<div class="frband">
      <div class="frbh"><span class="eb ${cls}">${word}</span><span>${FSTRW[lvl]}</span></div>
      ${got.map(c=>`<div class="frrow"><a href="${c.u}" target="_blank"
        rel="noopener">${c.n}</a></div>`).join('')}
    </div>`;}).join('');
}
const FSTRW=[null,
 'A government release, a law firm reading a statute, or a named study. Trust the number.',
 'Named research from an organisation that states its method, reported first-hand.',
 'A vendor survey, or solid research reported second-hand. The direction is probably right; the decimal is not.',
 'Content marketing with no stated method. Used only to show that a term exists and is being used. No number on this page rests on one of these alone.'];

document.getElementById('frIndex').innerHTML=frontierIndexHTML();
document.getElementById('frList').innerHTML=frontierHTML();
document.getElementById('frSrc').innerHTML=frontierSrcHTML();
