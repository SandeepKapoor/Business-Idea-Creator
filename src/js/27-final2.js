/* ---------- FINAL 2.0 ----------
   Six full plans, each with its own ten-anchor sub-nav — nothing here folds shut, because unlike
   the four-stage funnel this replaces nothing and re-derives nothing; every plan is meant to be
   read start to finish. The only job left is scroll-spy, twice: which idea (in the left rail) and
   which section of that idea (in the anchor row) currently owns the top of the viewport. Two
   independent spies rather than one, because "the anchor for problem/customer/model" only makes
   sense once an idea is on screen, and the idea rail must keep working even when nobody has
   scrolled into a specific plan's anchor row yet. */
function initFinal2(){
  const panel=document.getElementById('final2');
  if(!panel)return;

  const ideaLinks=Array.from(panel.querySelectorAll('.fin2-idea-link'));
  const plans=Array.from(panel.querySelectorAll('.fin2-plan'));
  if(!ideaLinks.length||!plans.length)return;

  let queued=false, lastIdea=null, lastAnchor=null;

  const pick=()=>{
    queued=false;
    const line=(parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--stick'),10)||0)+80;

    /* Which plan owns the line — same "last heading above the fold" rule as the report's own
       spy in 21-collapse.js, so the two navigation systems agree on what "current" means. */
    let curPlan=null;
    plans.forEach(p=>{ if(p.getBoundingClientRect().top<=line)curPlan=p; });
    if(curPlan!==lastIdea){
      if(lastIdea){
        const prevLink=ideaLinks.find(a=>a.dataset.f2===lastIdea.id);
        if(prevLink)prevLink.classList.remove('here');
      }
      lastIdea=curPlan;
      if(curPlan){
        const link=ideaLinks.find(a=>a.dataset.f2===curPlan.id);
        if(link){
          link.classList.add('here');
          link.scrollIntoView({block:'nearest'});
        }
      }
    }

    /* Which anchor inside the current plan — scoped to curPlan's own anchor row only, so two
       plans open on screen at once (a tall viewport) never light up two rows at a time. */
    let curAnchor=null;
    if(curPlan){
      const anchors=Array.from(curPlan.querySelectorAll(':scope > .fin2-anchors a'));
      const sections=anchors.map(a=>document.getElementById((a.getAttribute('href')||'').slice(1)));
      anchors.forEach((a,i)=>{
        const el=sections[i];
        if(el&&el.getBoundingClientRect().top<=line)curAnchor=a;
      });
    }
    if(curAnchor!==lastAnchor){
      if(lastAnchor)lastAnchor.classList.remove('here');
      lastAnchor=curAnchor;
      if(curAnchor)curAnchor.classList.add('here');
    }
  };

  const queue=()=>{ if(!queued){queued=true;requestAnimationFrame(pick);} };
  addEventListener('scroll',queue,{passive:true});
  addEventListener('resize',queue);

  /* Jumping via the idea rail should land at the top of that plan, not wherever "here" happens
     to already be — a plain anchor jump does this for free, so no click handler is needed beyond
     letting mode('final2') run first if the reader arrives from another tab. */
  pick();
}
