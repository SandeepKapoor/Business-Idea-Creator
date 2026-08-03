/* ================= CUSTOM MODE ================= */
/* attribute tables — index-aligned with AX.WHO / AX.OUT / AX.HOW / AX.PAY */
/* WHO: [access, fit, budget, volume, short, pain, slice, advice]
   slice  — one nameable sub-group, for the Wedge angle's worked example
   advice — the conventional wisdom this group is usually given, for the Contrarian angle.
   Both are ILLUSTRATIVE and editorial: they are my characterisation of the market, not a
   measured claim about it. The provenance note under the variant cards says so. */
const MW=[
[3,2,1,5,"career switchers","They have watched forty tutorials and still cannot tell whether they are employable.","engineers in Pune moving into UX after five years in services","that you need a bootcamp and a certificate before anyone will hire you"],
[4,3,1,5,"junior designers","They are firing 300 applications into a void and cannot tell if the portfolio or the market is the problem.","first-job designers at Bangalore B2B startups, under two years in","that more applications and a prettier portfolio will fix it"],
[4,5,2,4,"mid-level designers","Three years of food-delivery screens, and a creeping fear they specialised in the most replaceable layer of the work.","product designers with four to seven years at Indian SaaS companies","that the way up is more tools, more frameworks and a Dribbble-ready portfolio"],
[3,5,3,3,"senior individual contributors","They have hit the ceiling of craft and nobody told them the next level is influence, not pixels.","staff designers at fintechs who keep being passed over for principal","that seniority is simply better craft"],
[3,4,3,3,"newly promoted design managers","Promoted on Friday, managing on Monday, trained never.","first-time managers of three-to-five person teams at Series B startups","that managing is just senior design with more meetings"],
[2,4,5,2,"heads of design","They must justify a design team to a CFO in numbers they have never had to produce.","heads of design reporting to a CFO at a listed Indian company","that good design speaks for itself and should not need numbers"],
[2,3,4,2,"design agency owners","They sell hours, get squeezed on rate, and cannot work out how to charge for judgment.","owners of five-to-fifteen person studios still billing by the hour","that the answer to being squeezed on rate is more clients"],
[4,5,3,4,"engineers who must design","They own the interface by accident and have no vocabulary for why it is bad.","backend engineers at seed-stage startups who own the admin panel","that they should hand it to a designer and stop worrying about it"],
[3,4,3,4,"product managers","They are held accountable for design quality they were never taught to evaluate.","first-time PMs at B2B companies with no designer on the team","that design is taste, and you either have it or you do not"],
[3,3,4,3,"non-design founders","They know the product looks cheap and cannot write a brief that fixes it.","technical founders shipping their first customer-facing product","that a template and a better font will make it look expensive"],
[3,4,5,3,"corporate L&D buyers","They have budget that expires in March and no credible vendor for design capability.","L&D managers at IT services firms with a March budget deadline","that a large vendor with a long deck is the safe choice"],
[5,5,5,3,"enterprise and GCC design teams","They design complex regulated systems, and every training on the market assumes a consumer app.","GCC design teams at banks working on regulated internal tools","that consumer-app best practice transfers to regulated systems"],
[3,3,1,5,"design students","College taught them software, not thinking, and placement season is coming.","final-year students at tier-2 design colleges facing placements","that software skills are what get you placed"],
[2,2,4,4,"parents of design aspirants","They are funding a career they do not understand and cannot evaluate.","parents in tier-2 cities funding a NID or NIFT attempt","that design is a risky career unless the college is famous"],
[2,3,3,2,"design college faculty","They are teaching a discipline that moved on without them.","faculty at private design colleges teaching UX with no industry practice","that the syllabus is the thing that needs fixing"],
[3,3,4,3,"recruiters who hire designers","They must judge design work with no way to tell good from merely decorated.","in-house tech recruiters screening designers with no design lead to ask","that a strong-looking portfolio means a strong designer"],
[3,4,3,2,"other design educators","They rebuild the same operational scaffolding badly, alone, every single cohort.","solo educators running their second or third paid cohort","that better content is what makes a cohort work"],
[2,3,1,5,"tier-2/3 vernacular learners","Every premium course is in an English register that quietly excludes them.","Hindi-first learners in tier-3 cities with no English design vocabulary","that they must fix their English first"],
[4,5,2,4,"designers targeting global remote roles","They are worth three times their salary in another timezone and have no idea how to prove it.","senior Indian designers applying to EU companies on euro salaries","that they should price themselves against Indian salaries"],
[3,4,5,2,"EU/US studios hiring in India","They want Indian talent and cannot assess or manage it from seven thousand kilometres away.","small EU studios hiring their first two designers in India","that hiring in India is mainly a cost decision"]];
/* OUT: [urgency, wtp, measurable, sandeep-fit, tag, proof] */
const MO=[
[5,4,5,3,"First Job","a signed offer letter"],
[5,5,5,4,"Global Offer","an offer denominated in a foreign currency"],
[4,4,4,4,"Promotion","a new title and salary band"],
[5,5,5,3,"Raise","a number on a revised offer"],
[4,4,3,5,"Enterprise Switch","one portfolio case study in a genuinely complex domain"],
[5,4,2,5,"AI-Proof","a repositioned role that AI cannot absorb"],
[4,4,4,5,"Portfolio","three case studies that actually get replies"],
[3,3,4,5,"Case Study","published writing they are not embarrassed by"],
[4,4,4,4,"Interview Nerve","a recorded mock they can watch without wincing"],
[4,4,3,4,"Design Leadership","surviving their first review cycle as a manager"],
[4,4,3,5,"Design Influence","a funded proposal they presented themselves"],
[3,3,4,4,"Velocity","cycle time, before and after"],
[4,5,5,5,"Design ROI","a metric a CFO will accept"],
[3,2,1,4,"Belonging","showing up in week nine, voluntarily"],
[5,4,5,3,"Client Pipeline","two paying clients"],
[4,3,2,4,"Clarity","a written decision they stop revisiting"],
[5,5,4,4,"Admission","an acceptance letter"],
[5,5,5,3,"Compliance","an audit that passes"],
[4,5,4,4,"Better Hiring","a hire who survives probation"],
[3,3,2,2,"Exit","a different job title entirely"]];
/* HOW: [effort, speed, locIndep, scale, youAreProduct, energy, tag, mechanic] */
const MH=[
[4,3,5,3,1,4,"Cohort","six weeks, fixed dates, deadlines and peer critique — the container is the product, not the content"],
[4,2,5,5,0,2,"Course","record once, sell forever, and watch ninety percent never finish"],
[1,5,5,1,1,3,"1:1 Intensive","ninety minutes, one person, nothing to build, cash the same week"],
[2,4,5,1,1,4,"Mastermind","six people, twelve months, one call a month, invitation only"],
[1,5,5,3,1,4,"Critique Service","they upload, you return a ten-minute Loom inside 48 hours — timezone-proof by design"],
[2,4,5,4,1,3,"Membership","two live calls a week, no curriculum to maintain, revenue that recurs"],
[1,5,5,5,0,5,"Newsletter","one teardown a week, compounding, near-zero marginal cost"],
[3,3,4,5,1,5,"Podcast","conversations you would have anyway, published"],
[2,5,5,5,1,3,"Daily Shorts","one thirty-second teardown a day — mechanical, unglamorous, compounding"],
[3,4,1,2,1,4,"Workshop","one room, one day, a high price and someone else covering expenses"],
[5,2,1,1,1,3,"Retreat","four days, twenty people, and a price nobody questions afterwards"],
[5,2,1,2,1,5,"Live Show","a stage, an audience, and a month of content per night"],
[4,2,3,4,0,4,"Awards","you create the trophy and quietly become the arbiter"],
[3,3,4,4,0,3,"Card Deck","a physical object with eighty percent margins that markets itself from a desk"],
[1,5,5,5,0,2,"Kit","build once, no delivery, no support, no calendar"],
[3,3,5,5,0,2,"Directory","a maintained index whose only moat is that people trust yours"],
[5,1,5,5,0,3,"Tool","the highest ceiling in the bank and the longest road to it"],
[4,2,5,5,0,3,"Certification","you stop teaching and start judging — the highest-margin seat in education"],
[2,5,4,1,1,3,"Done-For-You","they hand over the problem, you hand back the artefact"],
[1,5,5,1,1,4,"Retainer","two days a month, invoiced monthly, no funnel required"],
[4,2,5,4,0,3,"Marketplace","you own neither side until you own both — the hardest cold start here"],
[4,2,1,1,1,4,"Study Tour","access you can open and almost nobody else can"]];
/* PAY: [price, speedToCash, ceiling, recurring, defensibility, pitch] */
const MP=[
[2,4,3,0,2,"They pay before it starts. Clean — but you are arguing with someone spending their own money."],
[2,3,3,0,2,"You made it affordable and inherited collections, churn and a financing partner."],
[2,4,3,1,3,"Small cheques that recur. The churn number, not the price, decides whether this is a business."],
[5,3,5,0,4,"Allocated budget that expires if unspent. Nobody negotiates, and the price can be five times the consumer version."],
[5,2,5,0,3,"Paid on outcome by the party with money — and you carry all the risk until it lands."],
[4,3,3,0,3,"The fee comes out of a raise that did not exist before you. There is no price objection, ever."],
[3,1,4,1,3,"You are funding someone's education and getting repaid later. A lending business wearing a school's clothes."],
[3,2,3,0,2,"Someone else's marketing budget pays for your audience. It renews only while their CMO stays."],
[4,3,4,0,3,"Tool vendors have enormous acquisition budgets and no credible educators. You are the missing piece."],
[1,2,2,1,1,"Revenue proportional to traffic and inversely proportional to trust."],
[2,4,2,0,1,"Money on the night, and nothing at all the morning after."],
[3,3,3,0,2,"They pay to be considered. Status is the least price-elastic thing you can sell."],
[4,2,4,1,4,"You sell it once and never deliver it again."],
[4,2,5,1,5,"You charge for the judgment rather than the teaching — and it survives when teaching commoditises."],
[5,5,3,1,3,"Predictable, boring, and it replaces a salary faster than anything else on this list."],
[1,1,5,0,3,"A free lottery ticket that must never be the reason you took the work."],
[4,1,4,1,3,"A large, slow, recurring cheque with a compliance burden bolted to it."],
[4,2,4,1,4,"One signature covers a hundred learners, and procurement takes two terms."],
[4,4,4,0,2,"The most price-insensitive buyer in Indian education, and the hardest to speak to honestly."],
[4,3,4,0,3,"They have budget and no taste. That gap is the entire product."],
[3,2,5,1,3,"You stop being the product — and now you have two customers to keep happy instead of one."],
[3,5,1,0,2,"Three hundred to a thousand dollars an hour, no marketing, no product, and a hard ceiling at your available hours."]];

