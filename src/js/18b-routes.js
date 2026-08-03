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
 ['The First Three Pieces','They have nothing to show yet, so the whole job is producing the first three things worth showing.',{3:1}],
 ['Where The Jobs Actually Are','A current map of who hires at this level at all. Nobody maintains one, and it goes stale in months.',{1:1,5:1,0:-1}],
 ['Getting Introduced','Nobody is hired off a careers page. This is the business of engineering a referral.',{0:1,2:1,4:-1}],
 ['The Application Grind','Volume, tracking, follow-up. Unglamorous, and it is the part that actually produces replies.',{0:-1,3:1,7:-1}]],
/* 1 · Get hired abroad or fully remote */[
 ['The Portfolio They Expect','Foreign employers read work differently. Same craft, rebuilt to their conventions.',{2:1}],
 ['Their Interview Loop','Take-homes, panels and system questions that barely exist in Indian hiring.',{0:1,3:1}],
 ['Priced In Their Currency','What the role actually pays there, and how to ask for it without flinching.',{0:2,4:1,2:-1}],
 ['The Paperwork','Visas, contractor structures, tax residency. Dull, frightening, and almost nobody covers it.',{0:1,2:-2,5:1}],
 ['A Foreign Client First','Freelance across the border before trying to be employed across it.',{3:1,4:-1}]],
/* 2 · Get promoted */[
 ['The Case For You','A promotion is a document someone else has to defend in a room you are not in. Write it for them.',{0:1,3:1}],
 ['Scope Before Title','The work that earns the next level, done before anybody asks for it.',{2:1}],
 ['Managing Upward','The relationship with the person who decides, treated as the actual product.',{0:1,5:1}],
 ['The Review Cycle','The calendar and the machinery of how promotions are really awarded, learned before it matters.',{1:-1,3:1}]],
/* 3 · Raise my salary */[
 ['Know The Number','What this role pays right now, from real data rather than what a friend said.',{0:1,1:1,5:1}],
 ['The Conversation','The twenty minutes that decide it, rehearsed until it is boring.',{0:2,3:1}],
 ['The Competing Offer','The only reliable lever there is, and how to get one you would actually accept.',{0:2,2:-1}],
 ['Paid For Impact','Turning what they already did into a number their employer already cares about.',{0:1,2:1}]],
/* 4 · Switch specialism (consumer → enterprise) */[
 ['One Complex Case Study','The single artefact that makes the switch credible. Everything else is decoration.',{0:1,3:1}],
 ['The Domain Vocabulary','Enterprise interviews are failed on language long before they are failed on craft.',{2:2}],
 ['Who Hires Switchers','The companies that take consumer designers, and the ones that never will.',{1:1,5:1}],
 ['The Side Door','A contract or an internal transfer instead of applying cold.',{3:1,4:-1}]],
/* 5 · Survive AI eating my job */[
 ['What Is Actually Safe','An honest map of which parts of the job survive and which do not. Most of this is reassurance; this is not.',{0:-1,1:1,5:1}],
 ['Judgement, Not Production','Moving up the stack to the decisions a model cannot make.',{0:1,2:1}],
 ['Working With The Tools','Becoming the person who ships three times faster, not the one who resists.',{3:1,7:1}],
 ['Reviewing The Machine','Checking what the AI produced. A job that barely exists yet and will be enormous.',{2:1,5:2}]],
/* 6 · Build a portfolio that works */[
 ['Rebuild The Three','Most portfolios need three pieces replaced, not twenty polished.',{3:1}],
 ['The Story, Not The Screens','Recruiters read the narrative and skip the visuals. That single fact is the whole fix.',{0:1,2:1}],
 ['A Portfolio For One Reader','One target company, one person reading it, one version. Not a general-purpose site.',{2:1,4:-1}],
 ['The Live Review','A real hiring manager reads it in front of them and says what they think.',{0:1,2:1,4:-1}]],
/* 7 · Write a case study I'm not ashamed of */[
 ['Finding The Argument','A case study is a claim, not a diary. Most of them have no claim in them at all.',{2:1}],
 ['Writing It Down','Designers can design and cannot write. This is a writing business wearing a design badge.',{0:1,3:1}],
 ['The Editor','You do not teach. You edit what they already wrote, which is faster for both of you.',{3:1,4:-1,7:1}],
 ['Publishing It','Where it goes and who actually reads it — half the value, and the half everyone skips.',{0:-1,1:1}]],
/* 8 · Stop freezing in interviews */[
 ['The Whiteboard','The one exercise that decides it, run until it is dull.',{0:1,3:1}],
 ['What They Are Scoring','The rubric on the other side of the table, which no company ever shares.',{2:1,5:1}],
 ['Recorded And Reviewed','They watch themselves. More useful than any advice you could give them.',{0:1,3:1}],
 ['The Nerve Itself','The physical part. Breathing, pacing, and recovering from a blank.',{0:1,2:-1,7:1}]],
/* 9 · Learn to lead a team */[
 ['The First Ninety Days','The transition nobody is trained for, week by week.',{0:1,3:1}],
 ['Difficult Conversations','Feedback, underperformance, and letting someone go. The part they lie awake about.',{0:2,2:1}],
 ['Running The Craft','Holding quality without doing the work yourself.',{2:1}],
 ['The Calendar Is The Job','It is meetings now. Making them worth the hours.',{3:1,7:-1}]],
/* 10 · Sell design internally to execs */[
 ['Speaking Their Language','Cost, risk and revenue instead of usability and delight.',{0:1,2:1}],
 ['The One-Slide Case','The only artefact that survives an executive meeting intact.',{0:1,3:1}],
 ['Finding The Sponsor','One senior ally beats any presentation you will ever build.',{2:1,5:1}],
 ['Saying No Well','Influence is mostly what you decline, and how you decline it.',{2:1,4:-1}]],
/* 11 · Ship faster */[
 ['Where The Time Goes','Measure before changing anything. Most teams are wrong about their own bottleneck.',{2:1,5:1}],
 ['The Handoff','Design to engineering, which is where most of the delay actually lives.',{0:1,3:1}],
 ['Reusing What Exists','A component library nobody maintains is a tax, not a saving.',{2:1}],
 ['Deciding Faster','The delay is rarely the work. It is waiting for somebody to choose.',{0:1,5:1}]],
/* 12 · Prove design ROI with numbers */[
 ['Pick The Metric','One number the finance side already tracks. Not a design metric they have never heard of.',{0:2,2:1}],
 ['The Before And After','Instrumenting one change so the difference is arguable rather than asserted.',{0:1,3:-1,5:1}],
 ['The Annual Case','The document that defends headcount at budget time. Written once a year, worth the whole year.',{0:2,3:-1,4:1}],
 ['What Cannot Be Measured','Being straight about the limits, which is what buys credibility for everything else.',{0:-1,2:1}]],
/* 13 · Find peers and stop feeling alone */[
 ['The Small Room','Six people who know each other work, not a Slack with five hundred silent members.',{0:1,4:-1,5:1}],
 ['Work In Progress','Showing unfinished work. The thing nobody does in public and everybody needs.',{3:1,7:1}],
 ['The Standing Time','A fixed slot every week. The slot is the entire product.',{0:-1,3:1,7:1}],
 ['Peers At Your Level','Seniority-matched, because advice from the wrong rung is just noise.',{1:-1,2:1}]],
/* 14 · Get freelance clients */[
 ['The First Two','Getting from zero to two clients, which is a different problem from getting from two to ten.',{0:1,3:1}],
 ['Pricing The Work','Quoting a project instead of an hour, and holding the number when they push.',{0:2,2:1}],
 ['Where They Come From','The two channels that actually produce clients for this kind of work, and the six that do not.',{1:1,5:1}],
 ['The Boring Paperwork','Contracts, scope and late payment. Where freelancers actually lose their money.',{0:1,2:-1,5:1}]],
/* 15 · Choose a career direction */[
 ['The Honest Assessment','Where they actually stand, said plainly, before a word of advice.',{0:1,2:1,3:1}],
 ['The Map Of Options','What the paths from here really are, including the ones nobody mentions out loud.',{1:1,5:1}],
 ['Trying Before Committing','Small reversible experiments instead of one large decision.',{2:1,3:-1}],
 ['Leaving The Default','The path they are on only because nobody ever stopped them.',{0:1,7:1}]],
/* 16 · Get into a good design school */[
 ['The Portfolio They Score','Admissions read against a rubric. Almost no applicant has ever seen it.',{0:1,2:1,5:1}],
 ['The Entrance Exam','Drilled, timed, repeated.',{0:1,3:1}],
 ['Choosing The School','Where to apply is the bigger decision and gets a tenth of the attention.',{1:1,5:1}],
 ['The Statement','The written part everyone leaves to the last night.',{0:1,3:1}]],
/* 17 · Meet a compliance deadline */[
 ['The Audit','Where they stand against the standard today, in writing, with a date on it.',{0:2,2:1,3:1}],
 ['Fixing The Worst Of It','Triage against a deadline, not a full remediation nobody has time for.',{0:2,3:1}],
 ['Keeping It Passed','Compliance is a state, not an event, and it decays the moment you stop.',{0:1,4:1,5:1}],
 ['Training The Team','So it does not break again the week after you leave.',{3:-1,4:1}]],
/* 18 · Hire designers who are actually good */[
 ['The Scoring Instrument','A rubric for people who cannot judge the work themselves.',{0:2,2:1,5:1}],
 ['The Exercise','One task that separates the good from the merely presentable.',{0:1,3:1}],
 ['Reading A Portfolio','Teaching a non-designer what to look for, in twenty minutes.',{1:1,3:1}],
 ['The Offer That Lands','Losing the good ones at the final step is the expensive failure nobody audits.',{0:1,2:-1}]],
/* 19 · Leave design gracefully */[
 ['What Transfers','The parts of the craft that are worth something outside design.',{0:1,2:1}],
 ['The Adjacent Move','Product, research, ops. Leaving without starting from zero.',{0:1,3:1}],
 ['Telling People','The conversation with a manager, a team, and a family.',{0:1,2:-1,7:-1}],
 ['The Runway','What leaving actually costs and how many months it really takes.',{0:1,2:-1,5:1}]]];

/* Routes available for an outcome. Unlike premFor(), nothing filters on format: a sub-problem of
   the outcome is a sub-problem whatever container you put it in. */
function routesFor(o){
  return (ROUTES[o]||[]).map(([nm,v,d],i)=>({i,nm,v,d:d||{}}));
}
/* Apply a route's sparse deltas. Returns a plain 8-array so callers can sum it with the work's
   and the twist's and clamp the lot ONCE — clamping in stages hides trade-offs. */
function routeD(R){
  const out=[0,0,0,0,0,0,0,0];
  if(R&&R.d)Object.keys(R.d).forEach(k=>{out[+k]=R.d[k];});
  return out;
}
