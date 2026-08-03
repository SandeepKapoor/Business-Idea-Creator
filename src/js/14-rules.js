/* conflict + synergy rules */
const EMPLOYER=[3,4], LEARNER=[0,1,2], NO_EMPLOYER=[0,12,13,17], KIDS=[0,12,13];
const ORG_BUYER=[5,6,10,11,14,15,16,19], TRAVEL=[9,10,11,21], CONTENT=[6,7,8,15];
function rules(w,o,h,p){
  const F=[];
  const add=(t,ic,tt,tx)=>F.push({t,ic,tt,tx});
  if(EMPLOYER.includes(p)&&NO_EMPLOYER.includes(w))
    add("bad","✕","There is no employer to invoice.",
      "You have chosen "+MW[w][4]+" as the buyer's beneficiary and an employer as the payer. Career switchers, students, parents and unemployed learners do not have a company willing to fund this. Either change the payer to the learner, or change WHO to someone already employed.");
  if(p===18&&!KIDS.includes(w))
    add("bad","✕","Parents do not pay for working professionals.",
      "Parents fund people who are 17 to 22 and pre-career. For "+MW[w][4]+" the buyer and the user are the same person. Switch WHO to students or aspirants, or switch the payer.");
  if([5,6].includes(p)&&ORG_BUYER.includes(w))
    add("bad","✕","Salary-linked pricing needs a salary you influence.",
      "A percentage of a raise, or an income share, only works when the person you serve is an individual whose pay you can move. "+MW[w][4].replace(/^./,c=>c.toUpperCase())+" do not fit that shape.");
  if(p===21&&![2,19].includes(h))
    add("bad","✕","Expert networks buy hours, not products.",
      "GLG and Third Bridge pay for a call with a named expert. They will not buy "+aAn(MH[h][6].toLowerCase())+". Set HOW to a 1:1 intensive or a retainer, or change the payer.");
  if(p===13&&MW[w][0]<4)
    add("warn","!","Certification requires trust you do not have yet.",
      "Charging for judgment is the best position in this whole bank — and it is unreachable until an audience already believes your judgment is worth something. This is a year-three move. Park it and build distribution first.");
  if(TRAVEL.includes(h))
    add("warn","!","This breaks your stated goal of living anywhere.",
      "A "+MH[h][6].toLowerCase()+" ties you to a room on a date. It can be a profitable once-a-quarter luxury, but it cannot be the engine if location independence is genuinely the point. Async critique, retainers and licensing are the location-proof equivalents.");
  if(CONTENT.includes(h)&&[0,1,3,4].includes(p))
    add("warn","!","Content is not a purchase.",
      "A "+MH[h][6].toLowerCase()+" is top-of-funnel. Almost nobody pays upfront for it, and no employer expenses it. Keep it — but as the distribution asset that feeds a paid thing, not as the revenue line itself.");
  if(ORG_BUYER.includes(w)&&LEARNER.includes(p))
    add("warn","!","You found the buyer with budget, then asked the individual to pay.",
      "You have selected "+MW[w][4]+" — people who sit near or on a budget — and then routed the invoice to a personal credit card. Switch the payer to the L&D budget and the same delivery is worth three to five times more.");
  if(p===9)
    add("warn","!","Ads and affiliate revenue cap you early.",
      "It requires enormous traffic to produce modest money and it quietly pressures you to recommend whatever pays best. Fine as a secondary stream, structurally weak as the primary one.");
  if(o===13&&MP[p][0]>=4)
    add("warn","!","Belonging is real, but it is hard to price high.",
      "People pay meaningfully for outcomes and lightly for company. Community sustains a "+inr(1500)+"-a-month membership, not a "+inr(150000)+" contract. Pair it with a measurable outcome or lower the price.");
  if(w===11&&EMPLOYER.includes(p))
    add("ok","✓","This is the strongest payer structure available to you.",
      "Enterprise and GCC design teams, funded by an L&D budget. You already work inside this world, the budget is allocated and expiring, and one contract is worth a year of consumer course revenue. This is idea #23's structure.");
  if(MH[h][2]===5&&MP[p][1]>=4)
    add("ok","✓","Location-proof and fast to cash.",
      "This combination pays quickly and works from any timezone — exactly the shape that funds slower, bigger bets without touching your savings.");
  if(MO[o][3]===5&&MW[w][1]>=4)
    add("ok","✓","This sits directly on your unfair advantage.",
      "The outcome plays to your regulated-industry and strategic-design background, and this audience will recognise that credential in about thirty seconds. Most educators cannot say either thing.");
  if(MH[h][4]===0)
    add("ok","✓","You are not the product here.",
      "This one keeps earning when you are asleep, ill, travelling or simply bored of it. Fewer than half the ideas in the bank can say that.");
  return F;
}

