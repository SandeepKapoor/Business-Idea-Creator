/* ================= DEEP-DIVE EVIDENCE LAYER =================
   Two tables of things I actually verified. Anything absent is absent on purpose:
   the plan prints "no verified figure" rather than a plausible-looking number. */

/* Market anchor per WHO index. v:1 = a published figure exists. */
const SEG_EV=[
/*0  switchers*/      {v:0,pool:null,txt:"No verified figure for the number of career-switchers entering design in India. The only number I found — \"India needs 80,000+ UI/UX designers by 2027\" — is an unsourced industry estimate repeated across SEO blogs. Do not size on it."},
/*1  juniors*/        {v:0,pool:null,txt:"No verified count of junior designers in India."},
/*2  mid-level*/      {v:0,pool:null,txt:"No verified count of mid-level designers in India. Salary bands are verified (₹12–25L at product companies) but population is not."},
/*3  senior ICs*/     {v:0,pool:null,txt:"No verified count. Senior salary bands verified: ₹16–28L, top-tier ₹35–55L."},
/*4  new managers*/   {v:0,pool:null,txt:"No verified count of newly promoted design managers in India."},
/*5  heads*/          {v:0,pool:null,txt:"No verified count of design leaders in India. Small by definition — likely low thousands."},
/*6  agency owners*/  {v:0,pool:null,txt:"No verified count of Indian design agencies in the 5–20 person band."},
/*7  engineers*/      {v:1,pool:1900000,txt:"GCCs in India employ <b>1.9–2.3 million</b> technology and engineering professionals across 1,750–2,100+ centres. The subset who own an interface by accident is unmeasured, but the denominator is real and large."},
/*8  PMs*/            {v:0,pool:null,txt:"No verified count of product managers in India."},
/*9  founders*/       {v:0,pool:null,txt:"No verified count of seed-stage Indian startups with a non-design founder."},
/*10 L&D buyers*/     {v:1,pool:2000,txt:"India's corporate training market is <b>≈₹52,000 crore (2024), growing ~14% a year</b>, and specialist expert-led training bills <b>₹30,000–1.5 lakh per day</b>. Buyer count proxy: 1,750–2,100+ GCCs, each with an L&D function."},
/*11 GCC teams*/      {v:1,pool:2000,txt:"<b>1,750–2,100+ GCCs in India</b>, employing 1.9–2.3M professionals; ~870 in Bengaluru alone (35–40% of the base). Forecast to exceed 2,400 centres by 2030. This is the best-measured segment in the whole bank."},
/*12 students*/       {v:1,pool:16601,txt:"<b>UCEED 2025: 16,601 registered, 15,408 appeared, 5,703 qualified (37%).</b> That is one exam — NID DAT and NIFT add more, but I found no verified count for those, so treat 16,601 as a floor, not the total."},
/*13 parents*/        {v:1,pool:16601,txt:"Payer proxy is the candidate count: <b>UCEED 2025 had 16,601 registrations</b>. Study-abroad consultants in India charge ₹30,000–1.5 lakh end-to-end, which establishes parental willingness to pay at that level."},
/*14 faculty*/        {v:0,pool:null,txt:"No verified count of design faculty in India."},
/*15 recruiters*/     {v:0,pool:null,txt:"No verified count of recruiters hiring design roles in India."},
/*16 educators*/      {v:0,pool:null,txt:"No verified count of design educators or bootcamps in India. Named players are few — GrowthSchool, DesignBoat and a handful more — so this segment is small enough to enumerate by hand in a week."},
/*17 tier-2/3*/       {v:0,pool:null,txt:"No verified figure for design learners in tier-2/3 India. This is the largest claim in the bank and the least evidenced — treat it as a hypothesis requiring its own research before any investment."},
/*18 global-remote*/  {v:1,pool:null,txt:"The gap is verified even though the population is not: India freelance UX <b>₹1,500–4,000/hour</b> against a global experienced rate of <b>$78–138/hour</b>, with international clients reportedly paying <b>2–3×</b> domestic. Indian salaries: mid ₹12–25L, senior ₹16–28L, top ₹35–55L."},
/*19 EU/US studios*/  {v:0,pool:null,txt:"No verified count of Western studios hiring in India. The rate differential above is the verified part."}];

/* Verified competitors only — every name below appeared in the research, with the figure I found.
   Where a format/segment has no verified competitor, the plan gives you the search to run
   instead of a name I would otherwise be inventing. */
const COMP=[
 {h:[0],p:null,w:[0,1,2,3,4,17],names:[
   ["GrowthSchool","₹50,000–70,000 for UI/UX programmes"],
   ["DesignBoat","offline centres in Bengaluru and Pune"],
   ["Memorisely","bootstrapped since 2020, live cohorts, $325/mo or $4,375 for an 8-week certification bootcamp, 1M+ designer community across 150+ countries"],
   ["Maven","cohort marketplace; the cohort category it sits in is cited at $4.0B growing toward $15.2B"]],
  q:"Indian UI UX bootcamp fees 2026 placement guarantee"},
 {h:[1],p:null,w:null,names:[
   ["Udemy India","₹500–3,000 per course, permanent discounting"],
   ["Indian bootcamps, self-paced tier","from ₹10,000"]],
  q:"self-paced UX course India price completion rate"},
 {h:[2],p:[21],w:null,names:[
   ["GLG","charges clients ~$1,500–2,000/hr; pays experts $400–600 mid-level, $600–800 senior exec, $800–1,200+ C-suite"],
   ["Third Bridge, AlphaSights, Guidepoint, Tegus","same model, comparable bands"]],
  q:"expert network design aerospace expert signup rate"},
 {h:[15],p:null,w:null,names:[
   ["Toolify","28,000+ AI tools, 450+ categories, ~$500K raised"],
   ["There's An AI For That","12,000+ tools indexed, voting and tagging"]],
  q:"design tool directory revenue affiliate model 2026"},
 /* Anything a parent pays for on behalf of a design aspirant. */
 {h:[0,1,2,17,18,21],p:[18],w:[12,13,0],names:[
   ["Leap Scholar and the Indian study-abroad consultant category","₹30,000–1.5 lakh end-to-end; comprehensive packages ₹50,000–1.5 lakh; the free consultants are funded by university commissions, so their advice is not neutral"],
   ["UCEED / NID / NIFT coaching institutes","<b>I did not verify their fees.</b> The study-abroad figure above establishes that Indian parents will spend at that level on an admissions outcome — it is not a coaching price benchmark. Treat the two as separate claims."],
   ["The exam itself, as the market boundary","UCEED 2025: 16,601 registered, 15,408 appeared, 5,703 qualified. Your addressable pool is bounded by that number, not by the size of India."]],
  q:"NID DAT UCEED NIFT coaching fees India portfolio preparation price 2026"},
 {h:[19],p:[14],w:null,names:[
   ["The Indian fractional-executive market","fractional CMO ₹60k–1.5L early-stage, ₹1.5–4L growth-stage, ₹4–8L near-full-time; fractional CTO ₹1.5–10L per month"]],
  q:"fractional head of design India retainer rate"},
 {h:[5],p:null,w:null,names:[
   ["Paid communities generally","average $48/mo, niche-expertise sweet spot $29–49/mo, 5–10% monthly churn, member lifespan 14–20 months, and 44% of successful ones run under 100 members"]],
  q:"paid design community India subscription price churn"},
 {h:[6,7,8],p:[7,9],w:null,names:[
   ["Newsletter sponsorship market","specialised B2B CPM $50–150; flat rates around 2.5–5% of subscriber count"]],
  q:"design newsletter sponsorship rate card subscribers"},
 /* Any format sold into an employer L&D budget competes with the corporate-training market,
    not with consumer bootcamps — so this entry covers cohorts and courses too, not just workshops. */
 {h:[0,1,9,17,18,19],p:[3,4],w:null,names:[
   ["The Indian corporate training market","≈₹52,000 crore (2024), growing ~14% a year"],
   ["Specialist expert-led providers","bill ₹30,000–1.5 lakh per day — that is the rate you are benchmarked against, not a bootcamp fee"],
   ["Internal L&D teams","your real competitor is usually \"we'll run it ourselves\" or \"we'll do nothing this year\""]],
  q:"corporate design training vendor India GCC per day rate L&D budget"}];
function compFor(h,p,w){
  const hit=COMP.find(c=>c.h.includes(h)&&(!c.p||c.p.includes(p))&&(!c.w||c.w.includes(w)));
  return hit||null;
}

/* Format-specific first artefact — the thing that must exist before anyone can pay. */
const FIRST=[
"a dated six-week syllabus on one page, eight seats, and a working payment link",
"one module recorded roughly — not the whole course",
"a booking link and a written 90-minute agenda",
"a one-page charter and five names you would actually invite",
"a Loom of you tearing apart one public portfolio, published where the audience is",
"a calendar invite for two calls a week and a payment link",
"issue one, written and sent to twenty people who already know you",
"three recorded conversations in the bank before you announce anything",
"ten scripted thirty-second teardowns, batch-filmed in a single day",
"a one-day agenda, a room, and one company that has said yes in writing",
"a venue quote, a fixed date, and four paid deposits",
"one small ticketed night, thirty seats, purely to prove the format works",
"the categories, the judges, and an entry-fee page",
"a printable PDF edition sold before you print a single physical copy",
"the one template you already use yourself, cleaned up and priced",
"fifty entries you have personally tested — not scraped",
"a spreadsheet or Notion board doing the job by hand first",
"the rubric, plus one publicly graded example so the standard is visible",
"one case delivered free for a name you are allowed to reference",
"a one-page scope, a monthly number, and two calls booked",
"ten vetted suppliers signed before you talk to a single buyer",
"the itinerary, three confirmed hosts, and four paid deposits"];

/* Payer-specific sales motion and cycle length. */
const MOTION=[
["Direct outreach, then a paid link. No funnel yet — you are looking for the first ten, not a machine.","1–3 weeks"],
["Same as upfront, plus a financing partner. Do not build this until volume exists.","2–4 weeks"],
["Monthly billing from day one. Watch the month-three churn number, not the signup number.","1–2 weeks"],
["You are selling to a manager with a budget code. Expect procurement, a security review, and a purchase order.","4–12 weeks"],
["Sign the employer first and candidates second. No placement, no fee, so their risk is zero.","6–14 weeks"],
["Get the agreement in writing before the negotiation happens, collect after the offer lands.","2–6 weeks"],
["You are effectively lending money. Do not start without capital and a contract lawyer.","8–16 weeks"],
["You need audience numbers before the conversation. One-page media kit, real figures.","4–10 weeks"],
["Pitch their growth or community lead, never their sales team. Frame it as their acquisition cost.","4–10 weeks"],
["Traffic first. Nothing else matters until it exists.","3–9 months"],
["Sell 60% of the seats before you announce publicly.","2–5 weeks"],
["Credibility first — nobody enters an award they have never heard of.","2–4 months"],
["One pilot licensee at a discount, in exchange for the case study.","6–12 weeks"],
["The standard has to exist and be respected before a fee makes any sense.","3–9 months"],
["Two warm introductions beat two hundred cold emails. Start with people who have seen your work.","2–6 weeks"],
["Only ever alongside cash work. Never as the primary consideration.","4–10 weeks"],
["Six to eighteen month cycle with real compliance overhead. Plan your cash from elsewhere meanwhile.","6–18 months"],
["Two-term procurement cycle. Start the conversation now, expect revenue next academic year.","4–8 months"],
["They buy outcomes and reassurance. Sell placement and clarity, never craft.","2–6 weeks"],
["Sell time saved per hire, quantified in hours and rupees.","4–10 weeks"],
["Build the hard side first. Supply before demand, always.","3–8 months"],
["Register with three or four networks, complete the profile properly, then wait. Zero marketing.","2–8 weeks"]];

