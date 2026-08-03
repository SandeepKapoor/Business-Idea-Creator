let LAST=null, ORIGIN=null;
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
  document.getElementById('sWHO').value=2;document.getElementById('sOUT').value=4;
  document.getElementById('sHOW').value=0;document.getElementById('sPAY').value=3;
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

