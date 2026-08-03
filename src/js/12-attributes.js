/* ================= CUSTOM MODE ================= */
/* attribute tables — index-aligned with AX.WHO / AX.OUT / AX.HOW / AX.PAY */
/* WHO: [access, fit, budget, volume, short, pain, slice, advice]
   slice  — one nameable sub-group, for the Wedge angle's worked example
   advice — the conventional wisdom this group is usually given, for the Contrarian angle.
   Both are ILLUSTRATIVE and editorial: they are my characterisation of the market, not a
   measured claim about it. The provenance note under the variant cards says so. */
const MW=[
[3,2,1,5,"career switchers","People moving into design from another job. They have watched a lot of tutorials and still cannot tell whether anyone would actually hire them.","engineers in Pune moving into UX after five years in services","that you need a bootcamp and a certificate before anyone will hire you"],
[4,3,1,5,"junior designers","Designers in their first job or two. They send out hundreds of applications, hear almost nothing back, and cannot tell whether the problem is their portfolio or the job market.","first-job designers at Bangalore B2B startups, under two years in","that more applications and a prettier portfolio will fix it"],
[4,5,2,4,"mid-level designers","Designers with a few years behind them. Most of it has been ordinary app screens, and they are quietly worried that this is the easiest kind of design to replace.","product designers with four to seven years at Indian SaaS companies","that the way up is more tools, more frameworks and a Dribbble-ready portfolio"],
[3,5,3,3,"senior individual contributors","Very experienced designers who are excellent at the actual craft. They are stuck, because the next step up is about influencing people, and nobody ever told them that.","staff designers at fintechs who keep being passed over for principal","that seniority is simply better craft"],
[3,4,3,3,"newly promoted design managers","Designers who have just been made managers. Promoted on Friday, managing on Monday, and trained for it never.","first-time managers of three-to-five person teams at Series B startups","that managing is just senior design with more meetings"],
[2,4,5,2,"heads of design","The person who runs the whole design team. They have to explain to the finance boss, in numbers, why that team is worth what it costs.","heads of design reporting to a CFO at a listed Indian company","that good design speaks for itself and should not need numbers"],
[2,3,4,2,"design agency owners","People who run a small design studio. They sell hours, clients keep pushing the rate down, and they cannot work out how to charge for good judgement.","owners of five-to-fifteen person studios still billing by the hour","that the answer to being squeezed on rate is more clients"],
[4,5,3,4,"engineers who must design","Engineers who ended up in charge of how a product looks, by accident. They can tell it is bad, but they have no words for why.","backend engineers at seed-stage startups who own the admin panel","that they should hand it to a designer and stop worrying about it"],
[3,4,3,4,"product managers","The people who decide what a product should do. They are held responsible for the design being good, but were never taught how to judge it.","first-time PMs at B2B companies with no designer on the team","that design is taste, and you either have it or you do not"],
[3,3,4,3,"non-design founders","Founders who are not designers. They know their product looks cheap, and they cannot write the brief that would fix it.","technical founders shipping their first customer-facing product","that a template and a better font will make it look expensive"],
[3,4,5,3,"corporate L&D buyers","The person at a big company whose job is to buy training. They have money that vanishes if it is not spent by March, and nobody good to spend it on.","L&D managers at IT services firms with a March budget deadline","that a large vendor with a long deck is the safe choice"],
[5,5,5,3,"enterprise and GCC design teams","In-house teams at large companies building complicated, heavily regulated software. Every course they can find is about simple consumer apps instead.","GCC design teams at banks working on regulated internal tools","that consumer-app best practice transfers to regulated systems"],
[3,3,1,5,"design students","Students still at college. They were taught the software but not how to think, and placement season is coming.","final-year students at tier-2 design colleges facing placements","that software skills are what get you placed"],
[2,2,4,4,"parents of design aspirants","Parents paying for a design education they do not understand and have no way to judge.","parents in tier-2 cities funding a NID or NIFT attempt","that design is a risky career unless the college is famous"],
[2,3,3,2,"design college faculty","Teachers at design colleges. The industry moved on and the course they are teaching did not.","faculty at private design colleges teaching UX with no industry practice","that the syllabus is the thing that needs fixing"],
[3,3,4,3,"recruiters who hire designers","People who hire designers without being designers themselves. They cannot tell genuinely good work from work that merely looks pretty.","in-house tech recruiters screening designers with no design lead to ask","that a strong-looking portfolio means a strong designer"],
[3,4,3,2,"other design educators","Other people who teach design. Each of them rebuilds the same scheduling and admin from scratch, alone, for every single group.","solo educators running their second or third paid cohort","that better content is what makes a cohort work"],
[2,3,1,5,"tier-2/3 vernacular learners","Learners in smaller Indian cities who do not think in English. Every good course is written in a kind of English that quietly leaves them out.","Hindi-first learners in tier-3 cities with no English design vocabulary","that they must fix their English first"],
[4,5,2,4,"designers targeting global remote roles","Indian designers who could earn several times more working for a company abroad, and have no idea how to prove they are worth it.","senior Indian designers applying to EU companies on euro salaries","that they should price themselves against Indian salaries"],
[3,4,5,2,"EU/US studios hiring in India","Small studios in Europe or America who want to hire in India. They cannot judge the work or manage the people from seven thousand kilometres away.","small EU studios hiring their first two designers in India","that hiring in India is mainly a cost decision"]];
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
[3,3,4,4,"Velocity","a before-and-after number showing their team got faster"],
[4,5,5,5,"Design ROI","a metric a CFO will accept"],
[3,2,1,4,"Belonging","the habit of still turning up in week nine"],
[5,4,5,3,"Client Pipeline","two paying clients"],
[4,3,2,4,"Clarity","a written decision they stop revisiting"],
[5,5,4,4,"Admission","an acceptance letter"],
[5,5,5,3,"Compliance","an audit that passes"],
[4,5,4,4,"Better Hiring","a hire who survives probation"],
[3,3,2,2,"Exit","a different job title entirely"]];
/* HOW: [effort, speed, locIndep, scale, youAreProduct, energy, tag, mechanic] */
const MH=[
[4,3,5,3,1,4,"Cohort","Everyone starts and finishes together over about six weeks. Fixed dates, real deadlines, and they give each other feedback. The schedule is the product, not the material."],
[4,2,5,5,0,2,"Course","You record it once and sell it for ever. The catch is that most people who buy it never finish it."],
[1,5,5,1,1,3,"1:1 Intensive","One person, about ninety minutes. Nothing to build in advance, and the money arrives the same week."],
[2,4,5,1,1,4,"Mastermind","Six people, once a month, for a year. You invite them — they cannot simply sign up."],
[1,5,5,3,1,4,"Critique Service","They send you their work and you send back a short video within two days. Nobody has to be awake at the same time."],
[2,4,5,4,1,3,"Membership","Two live calls a week, ongoing. There is no course to keep updating, and the money comes in every month."],
[1,5,5,5,0,5,"Newsletter","One piece of writing a week. Sending it to one more person costs you nothing, so it builds up over time."],
[3,3,4,5,1,5,"Podcast","Conversations you would happily be having anyway, recorded and published."],
[2,5,5,5,1,3,"Daily Shorts","One thirty-second video a day. It is repetitive and unglamorous, and it slowly stacks up."],
[3,4,1,2,1,4,"Workshop","Everyone in one room for a day. You can charge a lot, and usually someone else pays for the travel."],
[5,2,1,1,1,3,"Retreat","Four days away with about twenty people. By the end, nobody argues about what it cost."],
[5,2,1,2,1,5,"Live Show","You on a stage in front of an audience. One night gives you a month of clips to post."],
[4,2,3,4,0,4,"Awards","You create the prize — and quietly become the person who decides what counts as good."],
[3,3,4,4,0,3,"Card Deck","A real object you can post to people. Very high margin, and it keeps selling from your desk."],
[1,5,5,5,0,2,"Kit","You build it once. No lessons to run, no support to give, nothing in your calendar."],
[3,3,5,5,0,2,"Directory","A list you keep up to date. The only thing protecting it is that people trust yours."],
[5,1,5,5,0,3,"Tool","The biggest thing you could build here, and by a long way the slowest to get there."],
[4,2,5,5,0,3,"Certification","You stop teaching and start judging. It is the most profitable seat in education."],
[2,5,4,1,1,3,"Done-For-You","They hand you the problem and you hand back the finished thing."],
[1,5,5,1,1,4,"Retainer","About two days a month, invoiced every month. No marketing machine required."],
[4,2,5,4,0,3,"Marketplace","You need buyers and sellers before either will turn up. The hardest possible start."],
[4,2,1,1,1,4,"Study Tour","You open a door that almost nobody else can open."]];
/* PAY: [price, speedToCash, ceiling, recurring, defensibility, pitch] */
const MP=[
[2,4,3,0,2,"The learner pays before it starts. Simple and clean — but you are asking one person to spend their own money."],
[2,3,3,0,2,"They pay in monthly instalments. That makes it affordable, but you have now taken on chasing late payments and dealing with a finance company."],
[2,4,3,1,3,"Small amounts, every month. What decides whether this is a business is not the price — it is how many people quit."],
[5,3,5,0,4,"A company sets money aside for training, and it disappears if nobody spends it. Nobody haggles, and you can charge several times what an individual would pay."],
[5,2,5,0,3,"The company pays only once it works. They have the money, but you carry all of the risk until then."],
[4,3,3,0,3,"Your fee comes out of a pay rise they would not have got without you. Nobody ever argues about the price."],
[3,1,4,1,3,"You pay for their education now and they pay you back later. That is a lending business wearing a school uniform."],
[3,2,3,0,2,"Another company's marketing budget pays for your audience. It lasts exactly as long as their marketing boss does."],
[4,3,4,0,3,"Software companies have huge budgets for finding customers and nobody credible to teach. You are the piece they are missing."],
[1,2,2,1,1,"You earn more the more visitors you get — and less the more your audience trusts you."],
[2,4,2,0,1,"You get paid on the night, and nothing at all the next morning."],
[3,3,3,0,2,"People pay simply to be considered. Status is the one thing almost nobody haggles over."],
[4,2,4,1,4,"You sell it once and never have to deliver it again."],
[4,2,5,1,5,"You charge for the judgement rather than the teaching. That still earns when teaching itself gets cheap."],
[5,5,3,1,3,"Predictable and slightly boring, and it replaces a salary faster than anything else here."],
[1,1,5,0,3,"A free lottery ticket. It must never be the reason you took the work."],
[4,1,4,1,3,"A large, slow, repeating payment with a lot of paperwork bolted to it."],
[4,2,4,1,4,"One signature covers a hundred learners — but getting that signature takes two terms."],
[4,4,4,0,2,"The buyer in Indian education least likely to argue about price, and the hardest to be honest with."],
[4,3,4,0,3,"They have money and no taste. That gap is the entire product."],
[3,2,5,1,3,"You stop being the product. Now you have two sets of customers to keep happy instead of one."],
[3,5,1,0,2,"Very high hourly rates, no marketing and no product to build — but you can only ever sell the hours you have."]];

