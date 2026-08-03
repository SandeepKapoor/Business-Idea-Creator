/* ---------- routes: what the business is actually ABOUT ----------
   The four axes fix the shape, the work fixes what you do all day, the twist changes one
   structural thing. None of them says what the thing is ABOUT — and that is what separates two
   genuinely different businesses at the same combination. #46 Studio Tour and #72 How They
   Design share all four axes AND the Access premise; they differ only in which doors get opened.

   I left this out when the premise dimension went in, on the grounds that generating it meant
   inventing rooms Sandeep can get into. That objection is real for Access specifically, and it
   is not a reason to leave the whole dimension unmodelled — so here it is, sourced the one way
   that does not require inventing anything about him.

   A ROUTE IS A SUB-PROBLEM OF THE OUTCOME. "Get hired abroad" is not one problem, it is five:
   the portfolio they expect, their interview loop, what the job pays in their currency, the
   paperwork, and going freelance across the border first. Each is a different business. All five
   are derived from the outcome, so they hold for all 193,600 combinations rather than only the
   ones the bank happens to touch.

   THIS IS EDITORIAL AND THE UI SAYS SO. The routes are my reading of what each outcome breaks
   into — the same class of judgement as MW's slice/advice, and a weaker claim than PREM's, which
   at least carries bank receipts. Nothing here is a market fact. No route names a competitor, a
   market size, or a relationship Sandeep has.

   d = sparse score deltas by criterion index, and ONLY where a route genuinely moves one:
     0 what they'll pay   1 people you can reach   2 your edge here   3 how soon you get paid
     4 how big it can get 5 how hard to copy       6 works anywhere   7 your energy for it
   Most routes touch two or three. A route with a delta on every axis is a route I was guessing
   about, not one I had a reason for. */

const ROUTES=[
/* 0 · Get hired at all */[

 ['The First Three Pieces','They have nothing to show yet, so the whole job is producing the first three things worth showing.',{3:1},
  'They cannot apply for anything because there is nothing to attach. The business is not teaching design — it is getting three defensible pieces out of somebody who has never shipped, fast enough that they can start applying this month.',
  'If they already have three pieces and still get no replies, the portfolio was never the problem and you are selling the wrong thing.'],
 ['Where The Jobs Actually Are','A current map of who hires at this level at all. Nobody maintains one, and it goes stale in months.',{1:1,5:1,0:-1},
  'Job boards are a lagging, spam-filled index of a market that moves in weeks. The product is a maintained answer to one question — who is actually hiring somebody like me, right now — which is dull to keep current and therefore nobody does it.',
  'If your list is more than three weeks old it is worse than nothing, because people will trust it and waste applications on it.'],
 ['Getting Introduced','Nobody is hired off a careers page. This is the business of engineering a referral.',{0:1,2:1,4:-1},
  'Almost nobody at this level is hired from a cold application, everybody knows it, and they apply cold anyway. The work is the uncomfortable, mechanical business of finding the person inside the company and giving them a reason to pass a name along.',
  'If they will not send the first message after you have written it for them, coaching is not the gap and no amount of teaching will close it.'],
 ['The Application Grind','Volume, tracking, follow-up. Unglamorous, and it is the part that actually produces replies.',{0:-1,3:1,7:-1},
  'The people who get hired apply far more times than they admit to, and they track it. The product is the system and the discipline around it: a pipeline, a follow-up rhythm, and somebody who notices when this week\'s number is zero.',
  'If they will not do fifteen a week while you are watching, they will do none without you, and the system is decoration.']],
/* 1 · Get hired abroad or fully remote */[

 ['The Portfolio They Expect','Foreign employers read work differently. Same craft, rebuilt to their conventions.',{2:1},
  'The craft travels and the conventions do not. How long a case study runs, how much process to show, how blunt to be about impact, what a hiring manager in Berlin skims for first — all different. You are rebuilding the same work for a different reader.',
  'If you cannot name the specific conventions of one named market, you are selling general portfolio advice with a flag on it.'],
 ['Their Interview Loop','Take-homes, panels and system questions that barely exist in Indian hiring.',{0:1,3:1},
  'The loop is the barrier, not the skill. A take-home with a deadline, a panel that includes engineers, a systems question nobody asked them here. Every part of it is learnable and almost nobody teaches it.',
  'If you have not sat through one of these loops or debriefed somebody who has, you are guessing at the format and it will show in the first session.'],
 ['Priced In Their Currency','What the role actually pays there, and how to ask for it without flinching.',{0:2,4:1,2:-1},
  'The most expensive mistake is anchoring on an Indian number in a foreign conversation. The business is the research — what the band really is for that role, in that city, at that level — and then the nerve to hold it when they push.',
  'If your bands come from aggregator sites rather than from people who took the offer, you are selling numbers you cannot defend.'],
 ['The Paperwork','Visas, contractor structures, tax residency. Dull, frightening, and almost nobody covers it.',{0:1,2:-2,5:1},
  'Visa routes, contractor versus employee, where tax is owed, what a company will and will not sponsor. It is boring, it is frightening, and it is the thing that actually stops people. It is also where being wrong is expensive.',
  'You are not qualified to give immigration or tax advice. If this cannot be delivered as structured questions plus a referral, do not build it.'],
 ['A Foreign Client First','Freelance across the border before trying to be employed across it.',{3:1,4:-1},
  'Getting employed across a border is hard. Getting paid across one is not. One foreign client sets the rate, produces the reference and builds the working relationship that makes the employment conversation credible a year later.',
  'If the first client is worth less than a month of their current salary, this is a hobby with an invoice, not a route.']],
/* 2 · Get promoted */[

 ['The Case For You','A promotion is a document someone else has to defend in a room you are not in. Write it for them.',{0:1,3:1},
  'The decision happens in a calibration meeting they will never attend, argued by a manager defending them against people who have not seen the work. The product is the document that manager needs: evidence, scope, and the two sentences they will actually say out loud.',
  'If their manager will not read a draft, you have no channel into the room where this is decided.'],
 ['Scope Before Title','The work that earns the next level, done before anybody asks for it.',{2:1},
  'Nobody is promoted for doing their current job well. They are promoted for visibly doing the next one for two review cycles already. The business is working out what that looks like at their specific company, and getting them to start.',
  'If the next level does not exist on their team\'s ladder, no amount of scope creates it — they need to move, not be coached.'],
 ['Managing Upward','The relationship with the person who decides, treated as the actual product.',{0:1,5:1},
  'One relationship decides this and most people treat it as reporting rather than as work. The business is teaching them to run it deliberately: what to surface, when, in what form, and what their manager is being measured on.',
  'If their manager is themselves stuck or leaving, the whole strategy rests on a person who cannot deliver it.'],
 ['The Review Cycle','The calendar and the machinery of how promotions are really awarded, learned before it matters.',{1:-1,3:1},
  'Promotions run on a calendar with a paperwork deadline and a quiet cut-off for evidence. People discover this the year after they missed it. Knowing the machinery is worth more than any amount of extra effort in the wrong month.',
  'If the company has no defined cycle there is no machinery to teach, and this becomes generic career advice.']],
/* 3 · Raise my salary */[

 ['Know The Number','What this role pays right now, from real data rather than what a friend said.',{0:1,1:1,5:1},
  'Most people negotiate against a rumour. The product is a defensible band for this exact role, level and city, built from people who actually took the offer rather than from a site that averages everything into meaninglessness.',
  'If you cannot show where each number came from, you are selling confidence rather than data — and one wrong band destroys the whole product.'],
 ['The Conversation','The twenty minutes that decide it, rehearsed until it is boring.',{0:2,3:1},
  'It is twenty minutes and it is almost entirely a nerve problem, not an information problem. The business is rehearsal: the ask, the silence that follows it, the pushback, and the second ask.',
  'If they will not say the number out loud to you, they will not say it to their manager.'],
 ['The Competing Offer','The only reliable lever there is, and how to get one you would actually accept.',{0:2,2:-1},
  'It is the only lever that reliably moves a salary, and most people will not pull it because getting an offer they might have to accept is frightening. The business is running that process end to end with them.',
  'If they would not actually take the competing offer, do not let them use it. The bluff gets called more often than anyone admits.'],
 ['Paid For Impact','Turning what they already did into a number their employer already cares about.',{0:1,2:1},
  'They already did the work that justifies the raise. Nobody wrote it down in a form the business recognises. This is translation, not achievement — turning shipped work into a number the company already reports on.',
  'If nothing they touched last year moved a number the company reports, there is nothing to translate yet.']],
/* 4 · Switch specialism (consumer to enterprise) */[

 ['One Complex Case Study','The single artefact that makes the switch credible. Everything else is decoration.',{0:1,3:1},
  'A hiring manager needs one piece of evidence that this person can hold complexity — not five consumer pieces and a claim. The entire business is producing that single artefact to a standard that survives being read closely.',
  'If they have no access to a genuinely complex problem, real or simulated, you cannot manufacture credibility and should not pretend to.'],
 ['The Domain Vocabulary','Enterprise interviews are failed on language long before they are failed on craft.',{2:2},
  'These interviews are lost in the first ten minutes, on words. Roles, permissions, audit trails, states, exceptions — the vocabulary an interviewer uses to check whether you have lived in that world. It is learnable and nearly nobody teaches it.',
  'If you cannot list the twenty terms that matter in one named domain, you are teaching a vibe.'],
 ['Who Hires Switchers','The companies that take consumer designers, and the ones that never will.',{1:1,5:1},
  'Some companies move consumer designers into enterprise roles routinely. Others have never once done it. Applying to the second group is the main way this transition fails, and no map of the difference exists anywhere.',
  'If the list names sectors rather than companies, it is not a map and it saves nobody an application.'],
 ['The Side Door','A contract or an internal transfer instead of applying cold.',{3:1,4:-1},
  'The front door screens on a background they do not have. A contract engagement, an internal transfer, or one small paid project routes around that screen entirely — nobody vets a contractor\'s specialism the way they vet a full-time hire\'s. Six months of real domain work makes the same CV read completely differently.',
  'If their employer has no enterprise work at all and they cannot afford a pay cut for a contract, both side doors are shut and this route is closed to them.']],
/* 5 · Survive AI eating my job */[

 ['What Is Actually Safe','An honest map of which parts of the job survive and which do not. Most of this is reassurance; this is not.',{0:-1,1:1,5:1},
  'Almost everything written about this is either reassurance or panic. The product is a specific, unflinching map of which parts of the job a model already does well, which it does badly, and which it will not touch — with the reasoning shown so it can be argued with.',
  'If the map does not name at least one thing your own audience does today that is already gone, you have written reassurance.'],
 ['Judgement, Not Production','Moving up the stack to the decisions a model cannot make.',{0:1,2:1},
  'Production is what is being automated. Deciding what to produce is not. The business is moving somebody from executing briefs to writing them, which is a different job with a different day — not a better version of the same one.',
  'If their organisation has nobody senior enough to hand judgement to, there is no role to move into and this is advice with no destination.'],
 ['Working With The Tools','Becoming the person who ships three times faster, not the one who resists.',{3:1,7:1},
  'The people who will be fine are the ones shipping three times as much, not the ones arguing about whether they should. Practical and unromantic: which tool for which step, where each one fails, and how to check what it produced.',
  'If the tools change faster than you can update the material, you have signed up for a treadmill, not a product.'],
 ['Reviewing The Machine','Checking what the AI produced. A job that barely exists yet and will be enormous.',{2:1,5:2},
  'Teams now ship AI-built interfaces quickly and badly. Somebody has to check them against a standard, and almost nobody has written that standard down. This is a job that did not exist two years ago and has no incumbent.',
  'If you cannot produce the rubric, you have a service rather than a product, and it will bill your calendar forever.']],
/* 6 · Build a portfolio that works */[

 ['Rebuild The Three','Most portfolios need three pieces replaced, not twenty polished.',{3:1},
  'Portfolios fail on a handful of weak pieces, not on a lack of polish. The business is triage: find the three that are actively hurting and replace them. Faster, cheaper and more honest than a general rebuild.',
  'If they have fewer than three pieces at all, this is the wrong product and they need the first-portfolio version.'],
 ['The Story, Not The Screens','Recruiters read the narrative and skip the visuals. That single fact is the whole fix.',{0:1,2:1},
  'Reviewers spend under two minutes and read the narrative. Most portfolios are a gallery with captions. Restructuring around a claim, its evidence and its outcome changes the reply rate without changing a single pixel.',
  'If they will not cut work they are proud of, the restructure cannot happen and you are editing at the margins.'],
 ['A Portfolio For One Reader','One target company, one person reading it, one version. Not a general-purpose site.',{2:1,4:-1},
  'A portfolio built for everybody is optimised for nobody. One version aimed at one company — their domain, their problems, their language — converts far better and takes about a day to make.',
  'If they will not name a specific target company, there is no reader to write for and this collapses back into generic advice.'],
 ['The Live Review','A real hiring manager reads it in front of them and says what they think.',{0:1,2:1,4:-1},
  'Written feedback is polite and vague. A hiring manager reading it out loud in real time, saying exactly where they stopped and why, is a different order of information — and it is the one thing candidates cannot get anywhere.',
  'If you cannot get real hiring managers into the room, this is just you giving an opinion, which is a much cheaper product.']],
/* 7 · Write a case study I am not ashamed of */[

 ['Finding The Argument','A case study is a claim, not a diary. Most of them have no claim in them at all.',{2:1},
  'A case study without a claim is a diary with screenshots. The work is finding what this project actually proves and then cutting everything that does not support it. That is an editorial skill, and designers are never taught it.',
  'If the project genuinely proves nothing, the honest answer is to pick a different project — and you have to be willing to say so.'],
 ['Writing It Down','Designers can design and cannot write. This is a writing business wearing a design badge.',{0:1,3:1},
  'Designers can design and cannot write, and the gap costs them jobs. This is a writing course wearing a design badge: structure, sentences, cutting, and the discipline of producing a bad first draft on time.',
  'If they will not produce a bad first draft, there is nothing to edit and no process to run.'],
 ['The Editor','You do not teach. You edit what they already wrote, which is faster for both of you.',{3:1,4:-1,7:1},
  'You do not teach writing, you edit what exists. Faster for both sides, and the result is better because it stays in their voice with your judgement applied on top.',
  'If the raw material is thin, editing cannot save it — you are ghostwriting, which is a different job at a different price.'],
 ['Publishing It','Where it goes and who actually reads it — half the value, and the half everyone skips.',{0:-1,1:1},
  'A case study nobody reads has done half a job. Where it goes, how it is titled, who is tagged and when it is posted are separate skills from writing it, and they are the difference between a portfolio piece and a source of leads.',
  'If they will not publish under their own name, the distribution half does not exist and you are back to a private portfolio.']],
/* 8 · Stop freezing in interviews */[

 ['The Whiteboard','The one exercise that decides it, run until it is dull.',{0:1,3:1},
  'One exercise decides most design interviews, and it is a performance rather than a test of taste. Reps under time pressure, with a real prompt and a stranger watching, is the entire product.',
  'If your prompts are not the ones companies actually use, you are drilling the wrong exercise and building false confidence.'],
 ['What They Are Scoring','The rubric on the other side of the table, which no company ever shares.',{2:1,5:1},
  'There is a rubric on the other side of the table and candidates never see it. Knowing what is being scored — structure, the questions you ask, the trade-offs you name out loud — changes what you spend the forty minutes doing.',
  'If you cannot show a real rubric from a real company, you are guessing at the scoring and teaching your own preferences instead.'],
 ['Recorded And Reviewed','They watch themselves. More useful than any advice you could give them.',{0:1,3:1},
  'Nothing you say about somebody\'s interview manner lands the way watching themselves does. The product is the recording plus a structured way to watch it — not your commentary over the top.',
  'If they will not watch the recording, the mechanism is gone and you are back to giving notes.'],
 ['The Nerve Itself','The physical part. Breathing, pacing, and recovering from a blank.',{0:1,2:-1,7:1},
  'The freeze is physical. Breathing, pacing, what to say out loud while you think, and how to recover once you have gone blank. This is closer to performance coaching than to design, which is exactly why nobody in design offers it.',
  'If the freeze is anxiety rather than unfamiliarity, you are outside your competence and should say so rather than sell more reps.']],
/* 9 · Learn to lead a team */[

 ['The First Ninety Days','The transition nobody is trained for, week by week.',{0:1,3:1},
  'Promoted on Friday, managing on Monday, trained never. The first ninety days set patterns that are painful to undo: one-to-ones, delegation, and the moment they stop doing the work themselves. A week-by-week structure beats any amount of theory.',
  'If they have been managing for more than a year the patterns are set, and this is the wrong product for them.'],
 ['Difficult Conversations','Feedback, underperformance, and letting someone go. The part they lie awake about.',{0:2,2:1},
  'Feedback, underperformance and letting somebody go are what they lie awake about, and no design course goes near them. Rehearsed properly, with somebody playing the other side of the table.',
  'If HR owns these conversations entirely at their company, they cannot practise something they will never be allowed to run.'],
 ['Running The Craft','Holding quality without doing the work yourself.',{2:1},
  'The hardest part of the transition is holding quality without touching the work. Critique, standards, and knowing when to intervene — a skill in restraint rather than in design.',
  'If they keep taking the work back, the coaching has not landed, and their team knows it before you do.'],
 ['The Calendar Is The Job','It is meetings now. Making them worth the hours.',{3:1,7:-1},
  'The day is meetings now, and most new managers treat that as an interruption to the real job rather than as the job. Redesigning the week — which meetings, what shape, what gets protected — is concrete and felt immediately.',
  'If they do not control their own calendar there is nothing to redesign, and the problem sits above them.']],
/* 10 · Sell design internally to execs */[

 ['Speaking Their Language','Cost, risk and revenue instead of usability and delight.',{0:1,2:1},
  'Design arguments made in design words lose to finance arguments made in finance words, every time. Translating the same proposal into cost, risk and revenue is a learnable move and it changes outcomes almost immediately.',
  'If they cannot get in front of the person holding the budget, translation does not help — the problem is access, not language.'],
 ['The One-Slide Case','The only artefact that survives an executive meeting intact.',{0:1,3:1},
  'Executive attention is about one slide long. The business is the discipline of getting a proposal onto one — the ask, the number, the risk of not doing it — and then defending it for three minutes.',
  'If their organisation decides by written document rather than by meeting, one slide is the wrong artefact entirely.'],
 ['Finding The Sponsor','One senior ally beats any presentation you will ever build.',{2:1,5:1},
  'One senior person willing to say your name in a room you are not in beats any deck. Working out who that is, what they are measured on, and how to become useful to them is the real mechanism of internal influence.',
  'If there is no plausible sponsor above them, this is not a skills gap and no coaching will create one.'],
 ['Saying No Well','Influence is mostly what you decline, and how you decline it.',{2:1,4:-1},
  'Influence is largely what you refuse. Teams that accept every request become order-takers and get treated as such. The skill is declining without becoming the department that blocks things.',
  'If they have no authority to decline anything, teaching them to is setting them up to be overruled in public.']],
/* 11 · Ship faster */[

 ['Where The Time Goes','Measure before changing anything. Most teams are wrong about their own bottleneck.',{2:1,5:1},
  'Every team believes it knows its own bottleneck and most are wrong. Two weeks of honest measurement usually finds the delay somewhere nobody was looking. Running that measurement is the product.',
  'If the team will not let you see the real timings, you are consulting on anecdote.'],
 ['The Handoff','Design to engineering, which is where most of the delay actually lives.',{0:1,3:1},
  'Most of the delay sits between design and engineering rather than inside either one. Specs, states, edge cases and who decides — dull, fixable, and worth more than any process framework.',
  'If engineering will not be in the room, you are fixing one side of a two-sided problem.'],
 ['Reusing What Exists','A component library nobody maintains is a tax, not a saving.',{2:1},
  'A component library nobody maintains costs more than it saves. The work is deciding what to keep, killing the rest, and naming an owner — which is governance, not design.',
  'If nobody will own it after you leave, it decays within two quarters and you have sold a temporary result.'],
 ['Deciding Faster','The delay is rarely the work. It is waiting for somebody to choose.',{0:1,5:1},
  'Teams are rarely slow at working. They are slow at deciding — waiting on a person, a meeting, or a permission nobody can name. Assigning a decider to each type of decision usually recovers weeks.',
  'If the slowness is one specific person who will not delegate, this is an organisational problem wearing a process costume.']],
/* 12 · Prove design ROI with numbers */[

 ['Pick The Metric','One number the finance side already tracks. Not a design metric they have never heard of.',{0:2,2:1},
  'The mistake is inventing a design metric. The move is borrowing one the finance side already reports on and showing that design moved it. Choosing that metric well is most of the work.',
  'If nobody can tell you which numbers the business reports each month, you cannot pick one — and you must not invent one.'],
 ['The Before And After','Instrumenting one change so the difference is arguable rather than asserted.',{0:1,3:-1,5:1},
  'A number is only an argument if there is a credible before. Instrumenting one change properly, and being honest about what else moved at the same time, is slower than asserting impact and far harder to dismiss.',
  'If they cannot get a clean baseline, any after-number will be attributed to something else and the exercise is wasted.'],
 ['The Annual Case','The document that defends headcount at budget time. Written once a year, worth the whole year.',{0:2,3:-1,4:1},
  'Headcount is defended once a year, in a document. Most design leaders write it in a panic the week before. Building it as a standing artefact, updated quarterly, is a completely different product from a one-off deck.',
  'If design headcount is not actually under threat, this is a solution looking for its year.'],
 ['What Cannot Be Measured','Being straight about the limits, which is what buys credibility for everything else.',{0:-1,2:1},
  'Overclaiming is the fastest way to lose a finance audience. Being explicit about what design does that cannot be measured, and refusing to fabricate a number for it, is what makes the measured claims believable.',
  'If the buyer wants a number attached to everything, they are not ready for this and will read honesty as weakness.']],
/* 13 · Find peers and stop feeling alone */[

 ['The Small Room','Six people who know each other work, not a Slack with five hundred silent members.',{0:1,4:-1,5:1},
  'Large communities are lonely places. Six people who know each other\'s work, meeting on a fixed schedule, produce the thing everybody says they want from a five-hundred-person Slack and never gets.',
  'If more than two of the six go quiet for a month, the room is dead and adding people will not revive it.'],
 ['Work In Progress','Showing unfinished work. The thing nobody does in public and everybody needs.',{3:1,7:1},
  'Everybody shows finished work and nobody shows the middle, which is exactly where the loneliness lives. A place with a genuine norm of posting unfinished things is rare, valuable, and hard to start.',
  'If you will not post your own unfinished work first, the norm never establishes and the space stays silent.'],
 ['The Standing Time','A fixed slot every week. The slot is the entire product.',{0:-1,3:1,7:1},
  'The product is a slot in the calendar. Same day, same hour, no agenda required. Almost nothing else is needed and almost nobody sustains it, which is precisely why it is worth paying for.',
  'If you cancel twice, the habit breaks and attendance does not come back.'],
 ['Peers At Your Level','Seniority-matched, because advice from the wrong rung is just noise.',{1:-1,2:1},
  'Advice from two rungs above lands as noise and from two rungs below as flattery. Matching seniority tightly is the entire design, and it means turning people away.',
  'If you cannot fill a level-matched room, do not mix levels to make the numbers — that is the failure mode, not the fix.']],
/* 14 · Get freelance clients */[

 ['The First Two','Getting from zero to two clients, which is a different problem from getting from two to ten.',{0:1,3:1},
  'Zero to two is a different problem from two to ten and needs different advice. It is almost entirely about the network they already have and their willingness to ask, not about positioning or a website.',
  'If they will not contact twenty people they already know, no channel strategy will help them.'],
 ['Pricing The Work','Quoting a project instead of an hour, and holding the number when they push.',{0:2,2:1},
  'Hourly billing caps them and invites arguments. Moving to a project price means scoping it, writing it down, and holding the number under pressure — three separate skills, all learnable, none of them taught.',
  'If they discount the moment a client hesitates, the pricing has not changed — only the words have.'],
 ['Where They Come From','The two channels that actually produce clients for this kind of work, and the six that do not.',{1:1,5:1},
  'Most freelance advice lists ten channels. Two of them work for any given kind of work and the rest are a way to feel busy. Working out which two, for this person, is the product.',
  'If the two channels turn out to be ones they refuse to use, the honest answer is that this is not their business.'],
 ['The Boring Paperwork','Contracts, scope and late payment. Where freelancers actually lose their money.',{0:1,2:-1,5:1},
  'Freelancers lose money on scope creep and late payment, not on their rate. Contracts, deposits, change orders and a chasing rhythm — unglamorous, and worth more than a rate rise.',
  'If they will not send the first chasing email, the templates change nothing.']],
/* 15 · Choose a career direction */[

 ['The Honest Assessment','Where they actually stand, said plainly, before a word of advice.',{0:1,2:1,3:1},
  'Most career advice starts before anybody has said where this person actually stands. A blunt, evidenced assessment is uncomfortable, rare, and the only thing that makes the advice afterwards worth anything.',
  'If you soften it, you have sold reassurance. If they cannot take it, you have the wrong buyer.'],
 ['The Map Of Options','What the paths from here really are, including the ones nobody mentions out loud.',{1:1,5:1},
  'People choose from the three paths they have heard of. Laying out what actually exists from where they stand — including the sideways moves and the exits nobody says out loud — is a different service from coaching.',
  'If the map comes out the same for everybody, it is an article and not a product.'],
 ['Trying Before Committing','Small reversible experiments instead of one large decision.',{2:1,3:-1},
  'A career decision made in the abstract is a guess. Designing three small reversible experiments — a project, a conversation, one weekend — replaces the guess with evidence.',
  'If none of the experiments can be run inside a month, they are not experiments, they are plans.'],
 ['Leaving The Default','The path they are on only because nobody ever stopped them.',{0:1,7:1},
  'Most people are on their current path because nobody ever stopped them. Naming the default out loud, and what another five years on it costs, is often the entire intervention.',
  'If they are genuinely happy on the default, there is no problem here and you should say so.']],
/* 16 · Get into a good design school */[

 ['The Portfolio They Score','Admissions read against a rubric. Almost no applicant has ever seen it.',{0:1,2:1,5:1},
  'Admissions score against a rubric applicants never see: structure, breadth, evidence of thinking. Building to the rubric rather than to taste is the single biggest lever in the whole process.',
  'If you cannot obtain or reconstruct the rubric for a named school, you are selling generic portfolio craft at an admissions price.'],
 ['The Entrance Exam','Drilled, timed, repeated.',{0:1,3:1},
  'Timed, drilled, repeated. Everything about the exam rewards practice and almost nothing rewards insight, which makes it unglamorous to teach and extremely reliable to sell.',
  'If your practice papers are not close to the real format, the reps build the wrong reflexes.'],
 ['Choosing The School','Where to apply is the bigger decision and gets a tenth of the attention.',{1:1,5:1},
  'Where to apply matters more than how well, and gets a tenth of the attention. Fit, cost, placement record and what each school is genuinely good at — researched properly, not repeated from forums.',
  'If your comparison cannot be defended to the parent paying for it, it is opinion and will be treated as such.'],
 ['The Statement','The written part everyone leaves to the last night.',{0:1,3:1},
  'The written part is left to the last night by almost everybody, including strong candidates. It is also what admissions reach for to break ties. Starting it early is a small, high-leverage product.',
  'If the school does not weight the statement, this is a small add-on rather than a business.']],
/* 17 · Meet a compliance deadline */[

 ['The Audit','Where they stand against the standard today, in writing, with a date on it.',{0:2,2:1,3:1},
  'Before anything can be fixed, somebody has to state in writing where the product stands against the standard. Dated, specific, defensible. That document is the product, and it is what unlocks the budget for everything after it.',
  'If you cannot cite the clause behind each finding, the audit will not survive their legal team.'],
 ['Fixing The Worst Of It','Triage against a deadline, not a full remediation nobody has time for.',{0:2,3:1},
  'Full remediation is not on the table before a deadline. Triage is: what breaks the standard worst, what is cheapest to fix, and what can defensibly be documented as in progress.',
  'If the deadline has already passed, this is a legal problem and not a design one.'],
 ['Keeping It Passed','Compliance is a state, not an event, and it decays the moment you stop.',{0:1,4:1,5:1},
  'Compliance decays the moment shipping resumes. A check in the release process, a named owner and a quarterly re-test turn a one-off audit into something that recurs — which is a different business with a different price.',
  'If nobody internally owns it, the retainer is just a subscription to your own re-work.'],
 ['Training The Team','So it does not break again the week after you leave.',{3:-1,4:1},
  'The audit finds the same twenty issues every time because the team keeps making them. Teaching the rules to the people who actually write the code is the only version that stops the cycle.',
  'If engineering is not in the room, you are training the group that did not cause the problem.']],
/* 18 · Hire designers who are actually good */[

 ['The Scoring Instrument','A rubric for people who cannot judge the work themselves.',{0:2,2:1,5:1},
  'A recruiter who cannot judge design work is guessing, expensively. A rubric a non-designer can actually apply — with worked examples of a 2 and a 4 — turns guessing into screening.',
  'If two people applying your rubric to the same portfolio disagree wildly, it is not an instrument and you must not sell it as one.'],
 ['The Exercise','One task that separates the good from the merely presentable.',{0:1,3:1},
  'Most take-home tasks test whether somebody had a free weekend, which selects for the wrong people and quietly filters out anyone with a job or children. One well-designed exercise separates real judgement from presentation, takes under two hours, and can be scored by somebody who is not a designer.',
  'If good candidates refuse it, the exercise is too long and you have designed for the company rather than for the market.'],
 ['Reading A Portfolio','Teaching a non-designer what to look for, in twenty minutes.',{1:1,3:1},
  'Twenty minutes teaching a founder or a recruiter what to look for saves months of bad hiring. Short, cheap, repeatable, and priced far below its value — which is the opportunity in it.',
  'If they will not sit still for the twenty minutes, the whole product depends on attention you do not have.'],
 ['The Offer That Lands','Losing the good ones at the final step is the expensive failure nobody audits.',{0:1,2:-1},
  'Losing a strong candidate at the final step is the most expensive failure in hiring and almost nobody audits it. Timing, framing, and what to do in the twenty-four hours when they hesitate.',
  'If their offers are simply below market, this is a compensation problem and no amount of framing fixes it.']],
/* 19 · Leave design gracefully */[

 ['What Transfers','The parts of the craft that are worth something outside design.',{0:1,2:1},
  'Most people leaving design believe they have nothing else to offer. They are wrong, but they cannot see it from the inside. Naming what genuinely transfers — and what genuinely does not — is the first honest step.',
  'If you inflate what transfers to make them feel better, they find out in the first interview and it is worse.'],
 ['The Adjacent Move','Product, research, ops. Leaving without starting from zero.',{0:1,3:1},
  'Product, research, operations and content all take designers, and none of them requires starting over. The adjacent move preserves seniority and salary in a way a clean break does not.',
  'If they want out of the industry entirely, the adjacent move is a compromise they will resent inside a year.'],
 ['Telling People','The conversation with a manager, a team, and a family.',{0:1,2:-1,7:-1},
  'The conversation with a manager, a team and often a family is what keeps people stuck for years. It is emotional work, it is not design work, and pretending otherwise makes it worse.',
  'If this is depression rather than a career decision, you are not the right help and you should say so plainly.'],
 ['The Runway','What leaving actually costs and how many months it really takes.',{0:1,2:-1,5:1},
  'Leaving costs a specific amount and takes a specific number of months. Most people never do that arithmetic and so stay by default. Doing it together turns dread into a date.',
  'If the number says they cannot leave for two years, the honest product becomes a two-year plan and not an exit.']]];

/* Routes available for an outcome. Unlike premFor(), nothing filters on format: a sub-problem of
   the outcome is a sub-problem whatever container you put it in. */
function routesFor(o){
  return (ROUTES[o]||[]).map(([nm,v,d,an,kl],i)=>({i,nm,v,d:d||{},an,kl}));
}
/* Apply a route's sparse deltas. Returns a plain 8-array so callers can sum it with the work's
   and the twist's and clamp the lot ONCE — clamping in stages hides trade-offs. */
function routeD(R){
  const out=[0,0,0,0,0,0,0,0];
  if(R&&R.d)Object.keys(R.d).forEach(k=>{out[+k]=R.d[k];});
  return out;
}
