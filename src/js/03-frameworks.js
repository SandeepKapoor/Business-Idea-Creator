/* ---------- frameworks ---------- */
const FW=[
{n:"01",nm:"Pain mining",hero:1,q:"What have designers complained about publicly, in the same words, more than five times in the last seven days?",ex:"Scroll r/UXDesign and LinkedIn comments for one week. \"300 applications, no replies\" and \"AI is taking my job\" will dominate. Both are businesses."},
{n:"02",nm:"Payer swap",hero:1,q:"For this exact same delivery, who else could sign the cheque?",ex:"A portfolio review: a designer pays ₹5k, reluctantly. A hiring team pays ₹5L to screen 40 candidates with the same skill."},
{n:"03",nm:"Founder-market fit inventory",hero:1,q:"What can I truthfully say that 99% of design educators cannot?",ex:"\"I designed interfaces for aircraft\" and \"I studied strategic design at Politecnico di Milano.\" Neither is copyable in six months. Everything else you'd teach is."},
{n:"04",nm:"Job to be done",q:"What is this person actually hiring the product to do — emotionally?",ex:"Almost nobody buys a UX course to learn Figma. They buy it to stop feeling behind their batchmates."},
{n:"05",nm:"Before &amp; after the moment",q:"What happens in the two weeks before someone buys, and the six months after the course ends?",ex:"Both are completely unowned in Indian design education. That's cluster B — #11 to #22."},
{n:"06",nm:"Unbundle the incumbent",q:"Which single module of a ₹1.5 lakh bootcamp would people buy on its own?",ex:"Critique. Placement. Deadlines. Never the video library — that's the part everyone can now get free."},
{n:"07",nm:"Rebundle",q:"Which three things does one person buy from three vendors that should be one purchase?",ex:"Course + portfolio website + job access. Nobody in India sells that as one product with one price."},
{n:"08",nm:"Sell to the sellers",q:"Who is already spending money to reach the exact people I want?",ex:"Bootcamps, design-tool vendors and recruiters all pay to reach Indian designers. Sell them the shovel — cluster F."},
{n:"09",nm:"Status ladder",q:"What would someone buy purely to be seen as senior by their peers?",ex:"An award, an invite-only mastermind, a seat on your show. Status is the least price-elastic thing you can sell."},
{n:"10",nm:"Mandate &amp; deadline",q:"What is somebody legally obliged to do, by a date, whether they want to or not?",ex:"European Accessibility Act remediation. The buyer has no choice, no time, and a compliance budget."},
{n:"11",nm:"Arbitrage",q:"Where does the identical skill carry two very different prices?",ex:"An Indian designer earns ₹18L; the same person in a US remote role earns ₹55L. The gap itself is the business — #78."},
{n:"12",nm:"What changed in 24 months",q:"What is now possible, necessary, or broken that wasn't in 2024?",ex:"Agentic products need new interaction patterns. AI-generated UI needs a review layer. Evals are the new usability test."},
{n:"13",nm:"Anti-scale inversion",q:"What could I charge 20 people ₹3 lakh for, instead of 3,000 people ₹2,000?",ex:"Same revenue, 1% of the support load, no funnel, no ad budget. Cluster K exists entirely for this question."},
{n:"14",nm:"Removal",q:"What if I deleted the content and kept only the container?",ex:"#41 — a cohort with deadlines, peers and critique but no curriculum at all. Completion is the product; information is free."},
{n:"15",nm:"Access audit",q:"Who can I get on a call this month that a stranger simply cannot?",ex:"Boeing's India design and engineering organisation. Polimi's alumni network across European studios. Start where the door is already open."}];
document.getElementById('fwGrid').innerHTML=FW.map(f=>
 `<div class="fw${f.hero?' hero':''}"><div class="n">FRAMEWORK ${f.n}</div><div class="nm">${f.nm}</div>
  <div class="q">${f.q}</div><div class="ex">${f.ex}</div></div>`).join('');

