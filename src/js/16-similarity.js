const STOP=new Set(["with","that","them","they","this","have","from","their","your","what","when","design","designer","designers","india","indian","paid","pays","pay"]);
function nearest(w,o,h,p){
  const terms=(MW[w][4]+" "+AX.WHO[w]+" "+MO[o][4]+" "+AX.OUT[o]+" "+MH[h][6]+" "+AX.HOW[h]+" "+AX.PAY[p])
    .toLowerCase().replace(/[^a-z ]/g," ").split(/\s+/)
    .filter(t=>t.length>3&&!STOP.has(t));
  const uniq=[...new Set(terms)], out=[];
  CL.forEach(c=>c.i.forEach(x=>{
    const txt=(x[1]+" "+x[2]).toLowerCase();
    let s=0;uniq.forEach(t=>{if(txt.includes(t))s++;});
    /* one shared word is noise, not similarity — a single hit on "cohort" matched a dozen
       unrelated ideas. Require at least two. */
    if(s>=2)out.push({n:x[0],nm:x[1],s});}));
  return out.sort((a,b)=>b.s-a.s).slice(0,6);
}

