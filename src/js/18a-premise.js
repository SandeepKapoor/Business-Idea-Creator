/* ---------- premise: the fifth dimension ----------
   The four axes fix WHO / OUTCOME / HOW / PAY. The seven angles change one structural thing
   about how you build it. Neither fixes what actually HAPPENS inside — and that is a real,
   separate variable, not a gap in the model I am papering over.

   The proof is in Sandeep's own bank. 112 ideas occupy only 106 four-axis combinations, and
   #36 The Roast and #99 Design Court sit on identical axes: mid-level designers, portfolio,
   ticketed live show, ticket sales. One tears work apart on stage; the other runs a mock trial.
   Same shape, different premise, genuinely different businesses.

   WHY THE FILE IS 18a AND NOT 19. build.js concatenates src/js in lexicographic order and warns
   that renumbering is a behavioural change. "18-modes.js" < "18a-premise.js" < "19-variants.js",
   so this lands where it belongs — PREM defined before 19-variants.js consumes it — without
   shifting 19, 20 and 21 underneath everything that depends on them.

   PROVENANCE, which matters more here than anywhere else in the engine.
     ev   the bank ideas that already ARE this premise. This is the evidence the premise exists
          at all. Not a claim about the market — a claim about Sandeep's own idea list, and one
          you can check by opening the ideas.
     ob   the delivery formats the bank has actually built this premise at. Observed.
     xt   formats I judge it transfers to, with no bank example. Extended. Surfaced in the UI as
          a different chip, because "this has been done" and "I think this would work" are not
          the same claim and must never be rendered as though they were.
     dS   score deltas, and pm the price multiplier. Both are my judgement, exactly like the
          angles' — the DIRECTIONS are defensible, the magnitudes are not measured. Read a
          premise as a comparison against its siblings, never as a forecast.

   Which premises are here, and which were cut, came out of tools/premise.js. The test: a
   premise must appear across three or more delivery formats with no single format holding more
   than 60% of its instances. Anything failing that is the HOW axis under a new name. That test
   killed Contest (only ever awards or live show), Matchmaking (only ever done-for-you or
   marketplace) and Frontier (83% live cohort), plus Instrument and Done-for-them on judgement,
   since their dominant format is literally the premise's own name. Run `npm run premise`.

   NOT MODELLED, deliberately: the SUBJECT. #46 Studio Tour and #72 How They Design share the
   Access premise and differ only in which doors get opened. Generating options there would mean
   inventing companies Sandeep can get into, which is exactly the kind of fabrication the rest of
   this engine refuses to do. That dimension stays his. */

const PREM=[
{k:'none',nm:'Not chosen',tn:'Idea',w1:'—',pm:1.0,dS:[0,0,0,0,0,0,0,0],ev:[],ob:null,xt:[],
 v:`The four axes and nothing more`,
 q:`What if the shape is the whole idea?`,
 lem:`A stand. It sells lemonade.`,
 an:(W,H)=>`You have set the four axes and left the inside open. That is a real place to be, not
   an unfinished one — 32 of the 112 ideas in your bank are exactly this: change the payer, change
   the audience, change the format, and stop there.`,
 ex:(W,H,O)=>`${cap(aAn(H))} for ${W}, aimed at ${O}. What you actually do inside it is still
   yours to decide — pick a kind of work above and the whole page rebuilds around it.`},

{k:'teardown',nm:'Teardown',tn:'Teardown',w1:'BREAK',pm:0.8,dS:[0,1,0,2,-1,0,0,1],
 ev:[6,36,43,67,68,69,74,97,98],ob:[2,4,6,7,8,11],xt:[0,1,3,5,9,10,18,19],
 v:`You take existing work apart`,
 q:`What if the raw material is real work, not your curriculum?`,
 lem:`You taste the lemonade other people already make, and say exactly why it is bad.`,
 an:(W,H,O)=>`You build no curriculum. Your raw material is work that already exists — theirs,
   or the world's — and you take it apart in front of ${W} until they can see for themselves
   what is wrong with it.`,
 ex:(W,H,O)=>`Rather than teaching ${W} how to get ${O}, you pull real examples apart in the
   ${H}: the ones that worked, the ones that did not, and the exact line where they diverged.
   You can start on Monday, because the material already exists.`,
 pp:{via:aH=>`by taking real work apart, in ${aH}`},
 f:{who:(W,H,O)=>`Only ${W} who already have work worth taking apart. Anyone with nothing to show is out.`,
    out:(W,H,O)=>`Reached by pulling real examples apart, not by being taught a method.`,
    run:(W,H,O)=>`Nothing to build first. The material is work that already exists, so you can start this week.`},
 gv:`It is your eye doing the work every single time, so it bills your calendar and it is hard
   to hand over. And you will make enemies of the people whose work you tear apart.`},

{k:'record',nm:'The record',tn:'Record',w1:'TRUTH',pm:0.5,dS:[-1,2,0,-2,1,2,0,0],
 ev:[40,45,62,71,89,101,103],ob:[6,7,11,13,15],xt:[5,8,12,16],
 v:`You publish the reference everyone else cites`,
 q:`What does this market have no trustworthy record of?`,
 lem:`You publish the honest list of every lemonade stand in town, and how good each one is.`,
 an:(W,H,O)=>`You become the reference. One place ${W} check to find out what is actually true,
   kept current, and eventually the thing every argument links back to.`,
 ex:(W,H,O)=>`For ${W}, nobody has honestly written down what it actually takes to get ${O} —
   what works, what does not, and what it really costs. You publish that as ${aAn(H)}, keep it
   current, and let being cited do the selling.`,
 pp:{via:aH=>`by keeping the reference they check, published as ${aH}`},
 f:{who:(W,H,O)=>`Any of ${W} who look things up — a far wider circle than the ones who buy courses.`,
    out:(W,H,O)=>`A reference they keep coming back to, not a thing they finish once.`,
    pay:(W,H,O)=>`Very little, directly. A reference earns its money from whatever stands next to it.`},
 gv:`Slow, and people do not pay much for a reference. The money has to come from something next
   to it. Give it a year before anyone treats yours as the one to trust.`},

{k:'drill',nm:'Drill',tn:'Drill',w1:'REPS',pm:1.0,dS:[1,0,0,1,0,-1,0,-1],
 ev:[7,16,20,33,44,91],ob:[0,2,5,16,20],xt:[1,3,4,9,10,11,12],
 v:`You rehearse the hard moment until it stops being hard`,
 q:`What if they practise the moment instead of learning about it?`,
 lem:`People come to practise squeezing, over and over, until they are fast.`,
 an:(W,H,O)=>`They already know what to do. They cannot do it under pressure. So you make ${W}
   rehearse the one moment that actually decides the outcome, repeatedly, until it is boring.`,
 ex:(W,H,O)=>`${cap(W)} do not fail at this for lack of information — they fail in the moment
   itself. So the ${H} does exactly one thing: it makes them rehearse their way to ${O}, over and
   over, until the moment stops frightening them.`,
 pp:{via:aH=>`by drilling the moment until it is boring, in ${aH}`},
 f:{who:(W,H,O)=>`${cap(W)} who already know what to do and still freeze. Not the ones who need teaching.`,
    run:(W,H,O)=>`The same hard moment, again and again, until it stops frightening them. No new information.`,
    out:(W,H,O)=>`Plus the nerve to go through the moment that produces it.`},
 gv:`Repetitive for you as well as for them, and easy to copy once someone has watched it. You
   are selling the practice, and nobody owns practice.`},

{k:'diagnose',nm:'Diagnosis',tn:'Diagnostic',w1:'JUDGE',pm:1.4,dS:[1,-1,0,-1,1,2,0,0],
 ev:[11,12,52,59,81,86],ob:[1,2,17,18],xt:[0,4,9,14,16,19],
 v:`You measure them and say where they stand`,
 q:`What if you judge rather than teach?`,
 lem:`You taste it and grade it. The good ones get a sticker people look for.`,
 an:(W,H,O)=>`You stop teaching and start judging. You measure where someone actually stands and
   tell them plainly — which is the one thing almost nobody in this market is willing to do.`,
 ex:(W,H,O)=>`You assess ${W} against ${O} and hand back a straight answer, in writing. The ${H}
   is only how it is delivered; the verdict is the product, and the verdict is what they pay for.`,
 pp:{via:aH=>`by telling them exactly where they stand, through ${aH}`},
 f:{who:(W,H,O)=>`The ones who want a verdict rather than a lesson. Fewer people, further along.`,
    out:(W,H,O)=>`A straight written answer about where they actually stand. The verdict is the product.`,
    run:(W,H,O)=>`You assess rather than teach, so almost none of your time goes on preparing material.`,
    pay:(W,H,O)=>`They pay for the verdict, not for your time — a higher price for a much shorter job.`},
 gv:`Nobody takes your verdict seriously until they know who you are, so this one needs an
   audience before anything else. Start too early and you are a stranger marking someone's
   homework.`},

{k:'translate',nm:'Translation',tn:'Translation',w1:'CARRY',pm:1.2,dS:[0,0,2,0,0,1,0,0],
 ev:[4,10,75,76,83],ob:[0,1,14],xt:[2,3,6,9,10,13,21],
 v:`You carry a method across a border or a language`,
 q:`What exists elsewhere that has not arrived here yet?`,
 lem:`You bring the recipe back from Italy and write it down in Hindi.`,
 an:(W,H,O)=>`Something already works elsewhere — another country, another industry, another
   language — and has not arrived here. You are the one who carries it across, which means you
   compete with nobody while you are the only one who has made the trip.`,
 ex:(W,H,O)=>`The method that reliably produces ${O} exists somewhere ${W} cannot get to it. You
   bring it over as ${aAn(H)}, in the language they actually think in.`,
 pp:{via:aH=>`by bringing over a method that already works, through ${aH}`},
 f:{who:(W,H,O)=>`The ones who cannot reach the original. That gap is the whole reason they need you.`,
    out:(W,H,O)=>`Produced by a method that already works somewhere they cannot get to.`,
    run:(W,H,O)=>`You are carrying something across, not inventing it, so the work is translation and not design.`},
 gv:`It lasts exactly as long as the gap does. Once two other people make the same trip, the
   edge is gone and you are competing on delivery like everyone else.`},

/* The only premise with an OUTCOME filter. "They leave holding one finished thing" is not a
   promise you can make about an outcome nobody can hold. Belonging, Clarity, AI-Proof and Exit
   all score 1–2 on MO's measurable column, and offering Artefact against them produced lines
   like "leaves the membership with the habit of still turning up in week nine in their hands". */
{k:'artefact',nm:'The object',tn:'Build',w1:'OBJECT',pm:1.3,dS:[1,0,0,0,-1,0,0,-1],
 ev:[1,5,8,90],ob:[0],xt:[1,2,3,4,5,9,10,18],apO:o=>MO[o][2]>=3,
 v:`They leave holding one finished thing`,
 q:`What is the object they walk out with?`,
 lem:`Everyone goes home holding a bottle they pressed themselves.`,
 an:(W,H,O)=>`They walk out holding one finished thing. Not notes, not a certificate — a made
   object you could put on a table, that exists or does not.`,
 ex:(W,H,O)=>`Every one of your ${W} leaves the ${H} with ${O} — a real, finished thing that on
   the last day either exists or does not. If it does not, you have not delivered, whatever else
   happened in the room.`,
 pp:{via:aH=>`by making the thing with them, in ${aH}`},
 f:{who:(W,H,O)=>`The ones who need something to show, not something to know.`,
    out:(W,H,O)=>`Finished and in their hands — not notes about how to make one.`,
    run:(W,H,O)=>`Every session goes on making the thing, so your attention is the limit on how many can run.`},
 gv:`Every finished thing costs you real hours, so your calendar is the limit. And the promise
   is a hard one: on the last day it exists, or it does not.`},

{k:'door',nm:'Access',tn:'Access',w1:'ROOM',pm:1.6,dS:[0,1,2,-1,0,2,-1,0],
 ev:[46,72,82],ob:[7,21],xt:[3,5,6,8,9,10,11],
 v:`You open a room nobody else can open`,
 q:`Whose door can you open that others cannot?`,
 lem:`You get people into the orchard where the lemons are actually grown.`,
 an:(W,H,O)=>`You open a door almost nobody else can. What you are selling is not what you know —
   it is the room you can get people into, and the fact that they cannot get there alone.`,
 /* "the people who decide whether they get X" was wrong for outcomes with no gatekeeper —
    nobody decides whether you find peers. "People who already have it" holds for all twenty,
    and is closer to what #46, #72 and #82 actually are. */
 ex:(W,H,O)=>`You can put ${W} in rooms they have no route to, alongside people who already
   have ${O}. The ${H} is only the vehicle; the access is the product, and it is the one thing
   here nobody can copy over a weekend.`,
 pp:{via:aH=>`by getting them into the room, through ${aH}`},
 f:{who:(W,H,O)=>`The ones for whom the room is the obstacle, not the knowledge.`,
    out:(W,H,O)=>`Plus time inside a room they had no route to, alongside people who already have it.`,
    run:(W,H,O)=>`Most of your effort goes on keeping the door open, not on what happens once they are through it.`,
    pay:(W,H,O)=>`You are charging for the door, so the price follows how hard it is to open, not how long you spend.`},
 gv:`It rests entirely on relationships you have to keep warm, and usually on being physically
   somewhere. Lose the relationship and there is no business left underneath it.`}];

/* aAn ("a cohort" / "an in-person workshop") and cap live in 13-pricing.js — 14-rules.js needs
   aAn too, and it loads first. The HOW strings are lowercased before they reach either. */

/* Which premises are available for a format, and on what evidence.
   'none' is always first and always applies: it is the honest default, and it keeps every score
   on this page identical to what it was before this dimension existed. */
function premFor(h,o){
  return PREM.filter(P=>P.k==='none'
    ||((P.ob.includes(h)||P.xt.includes(h)) && (!P.apO||o===undefined||P.apO(o))));
}
/* 'built'   the bank contains this premise at this exact format — name the ideas.
   'judged'  no bank example at this format. Say so, plainly, and do not dress it up. */
function premEv(P,h){
  if(P.k==='none')return null;
  const built=P.ev.filter(n=>TAGS[n]&&TAGS[n][2]===h);
  if(built.length)return{k:'ok',t:`Your bank already does this at this format: ${built.map(n=>'#'+n).join(', ')}.`};
  return{k:'weak',t:`Nothing in your bank does this work at this format. ${P.ev.length
    ? `It turns up elsewhere (${P.ev.slice(0,4).map(n=>'#'+n).join(', ')}${P.ev.length>4?'…':''}) and I think it carries over here. That is a guess, not proof.`
    : `That is a guess, not proof.`}`};
}
