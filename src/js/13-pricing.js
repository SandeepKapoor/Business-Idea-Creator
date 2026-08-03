/* PRICING MODEL — the FORMAT sets the retail price to an individual Indian buyer, the
   PAYER multiplies it, the audience's budget authority nudges it.

   The previous version of this comment claimed the bases were "calibrated against the real
   numbers quoted in the idea bank". That was circular: those bank figures were my own
   estimates, so the model was validated against its own author. Rebuilt below against
   published market figures. [R] = researched, [J] = my judgment with no source found.

     0  cohort       45,000 [R] Indian UI/UX bootcamps ₹10k–1.5L; GrowthSchool ₹50–70k
     1  self-paced    4,000 [R] between Udemy India (₹500–3,000) and the ₹10k bootcamp floor
     2  1:1 90 min    6,000 [R] skilled freelance UX in India ₹1,500–4,000/hr  (was 9,000)
     3  mastermind  150,000 [J] no India benchmark found
     4  critique      2,500 [R] ~40 min of senior time at the same hourly band
     5  membership    1,500 [R] global paid communities avg $48/mo, niche $29–49; India discount
     6  newsletter      500 [J] no India paid-newsletter benchmark
     7  podcast         400 [J]
     8  shorts          300 [J]
     9  workshop     30,000 [R] specialist corporate training in India ₹30,000–1.5L per DAY.
                              Was 120,000, which produced ₹5.5L/day — above the market ceiling.
    10  retreat      45,000 [J] no India design-retreat benchmark
    11  live show     1,200 [J]
    12  awards        3,500 [J]
    13  card deck     2,500 [J]
    14  kit           3,500 [J]
    15  directory       900 [J]
    16  tool          1,500 [J]
    17  certification 12,000 [J]
    18  done-for-you 50,000 [R] study-abroad packages ₹30k–1.5L; comprehensive ₹50k–1.5L
    19  retainer/mo  60,000 [R] fractional CXO India: CMO ₹1.5–4L growth-stage, CTO ₹1.5–10L.
                              ×3.5 payer multiple → ₹2.4L, inside the observed band.
    20  marketplace   2,500 [J]
    21  study tour  180,000 [J]

   PAY_MULT is [J] throughout — a B2B pricing heuristic, not a measured quantity. One
   exception: index 21, expert networks, where published rates for mid-level specialists are
   $400–600/hr, so the multiple was cut 8 → 6 to land near ₹40,000 a call instead of ₹83,000
   (which was a C-suite rate being applied to a mid-career designer). */
const HOW_BASE=[45000,4000,6000,150000,2500,1500,500,400,300,30000,45000,1200,
                3500,2500,3500,900,1500,12000,50000,60000,2500,180000];
const PAY_MULT=[1,1,1,4,5,3,2.5,3,4,0.4,1,1.2,5,1.5,3.5,0.5,6,5,2,4,1,6];
/* 1 = this format's base price rests on a published figure. Surfaced in Part 9. */
const BASE_EV=[1,1,1,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0];
/* Scenarios where I have a published price band for a specific FORMAT + PAYER pair.
   Part 9 checks the computed price against these and says so when it falls outside —
   the payer multiple and the variant angle can push a figure past its own evidence,
   and an extrapolation that does not announce itself is indistinguishable from a guess. */
const SCEN=[
 {h:0, p:[0,1,2], lo:10000,  hi:150000, w:"Indian UI/UX bootcamp fees (GrowthSchool ₹50–70k)"},
 {h:1, p:[0,1,2], lo:500,    hi:10000,  w:"Udemy India up to the Indian bootcamp floor"},
 {h:2, p:[0,1,2], lo:2000,   hi:9000,   w:"freelance UX India ₹1,500–4,000/hr, ~90 minutes"},
 {h:2, p:[21],    lo:33000,  hi:50000,  w:"expert-network pay, mid-level specialist, $400–600/hr"},
 {h:4, p:[0,1,2], lo:1000,   hi:4000,   w:"~40 minutes of senior time at the same hourly band"},
 {h:5, p:[2],     lo:400,    hi:4100,   w:"paid communities $29–49/mo global, India discounted"},
 {h:9, p:[3,4],   lo:30000,  hi:150000, w:"specialist corporate training in India, per day"},
 {h:18,p:[18],    lo:30000,  hi:150000, w:"study-abroad consultant packages, India"},
 {h:19,p:[14],    lo:150000, hi:800000, w:"fractional CXO retainers India (CMO ₹1.5–4L growth-stage)"}];
function priceCheck(h,p,core){
  const s=SCEN.find(x=>x.h===h&&x.p.includes(p));
  if(!s)return{k:"weak",t:BASE_EV[h]
    ? "The base price for this format is anchored to published data, but I have no figure for this format-and-payer pair. Treat the number as an estimate."
    : "No published figure for this format. This price is my estimate — the least trustworthy number on the page."};
  if(core>=s.lo*0.8&&core<=s.hi*1.25)
    return{k:"ok",t:`Inside the range I found evidence for: <b>${inr(s.lo)}–${inr(s.hi)}</b> · ${s.w}.`};
  return{k:"weak",t:`<b>Outside</b> the evidenced range of <b>${inr(s.lo)}–${inr(s.hi)}</b>
    (${s.w}). The payer multiple and the chosen angle pushed it there, so this is extrapolation,
    not a market figure. Price near the band unless you can name why you are above it.`};
}
const RECUR_H=[5,6,15,16,19];
const inr=n=>"₹"+Math.round(n).toLocaleString("en-IN");
/* Small text helpers, here because this is the earliest file that already owns formatting and
   because three later files need them. aAn is a spelling rule, not a pronunciation one: every
   string it is fed is checked exactly in tools/verify.js, so a "an hour" case would be caught
   rather than reasoned about. */
function aAn(s){return `${/^[aeiou]/i.test(s)?'an':'a'} ${s}`;}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1);}

