let ALLC=[];
function buildAll(){
  ALLC=[];
  CL.forEach(c=>c.i.forEach(x=>{
    const n=x[0], t=TAGS[n];
    const S=HAND[n]||scoreIt(t[0],t[1],t[2],t[3]);
    const V=verdict(S,HAND[n]?[]:rules(t[0],t[1],t[2],t[3]));
    const sh=SHORTV[V.t]||["TEST","hold","test"];
    ALLC.push({n,nm:x[1],s:S,tot:S.reduce((a,b)=>a+b),cl:c.L,fam:c.f,
      vt:sh[0],v:sh[1],vg:sh[2],hand:!!HAND[n],tip:V.d});}));
  ALLC.sort((a,b)=>b.tot-a.tot||a.n-b.n);
}
