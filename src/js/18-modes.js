let LAST=null, ORIGIN=null;
/* The idea the workspace opens on. Both entry points read it, so the picker and the four
   dropdowns agree from the first paint instead of pointing at different combinations. */
const DEFAULT_IDEA=1;
/* Which way into the workspace is on screen. Never both: the four axes are the single input the
   engine reads, and showing two editors for one value only raises "which is it using?". */
let WMODE='bank';
function pickMode(m){
  WMODE=m;
  document.getElementById('wtabBank').classList.toggle('on',m==='bank');
  document.getElementById('wtabAxes').classList.toggle('on',m==='axes');
  document.getElementById('wBank').hidden = m!=='bank';
  document.getElementById('wAxes').hidden = m!=='axes';
}
/* clicking a row in Part 7 loads that idea's four axis values into the builder */
function openInBuilder(n){
  const t=TAGS[n]; if(!t)return;
  document.getElementById('sWHO').value=t[0];
  document.getElementById('sOUT').value=t[1];
  document.getElementById('sHOW').value=t[2];
  document.getElementById('sPAY').value=t[3];
  ORIGIN=n; mode('custom'); gen();
}
function backToTable(){mode('report');openFold('score',1);}
function fillSel(){
  [["sWHO","WHO"],["sOUT","OUT"],["sHOW","HOW"],["sPAY","PAY"]].forEach(([id,k])=>{
    document.getElementById(id).innerHTML=AX[k].map((o,i)=>
      `<option value="${i}">${o}</option>`).join('');});
  const t=TAGS[DEFAULT_IDEA]||[2,4,0,3];
  ['sWHO','sOUT','sHOW','sPAY'].forEach((id,i)=>{document.getElementById(id).value=t[i];});
}
function surprise(){
  ["sWHO","sOUT","sHOW","sPAY"].forEach((id,i)=>{
    const k=["WHO","OUT","HOW","PAY"][i];
    document.getElementById(id).value=Math.floor(Math.random()*AX[k].length);});
  gen();
}
let CURMODE='report';
function mode(m){
  if(m===CURMODE)return;          /* a no-op switch shouldn't re-scroll or re-collapse anything */
  CURMODE=m;
  document.getElementById('tabR').classList.toggle('on',m==='report');
  document.getElementById('tabC').classList.toggle('on',m==='custom');
  document.getElementById('navRow').hidden=m!=='report';
  document.getElementById('srcBlock').hidden=m!=='report';
  document.querySelectorAll('.sec').forEach(s=>{
    const own=(s.id==='custom');
    s.hidden = own ? s.id!==m : m!=='report';});
  syncFoldAll();                  /* the global toggle now counts only the mode on screen */
  window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('#navRow a').forEach(a=>a.addEventListener('click',()=>mode('report')));

