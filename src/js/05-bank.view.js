document.getElementById('legendRow').innerHTML=Object.keys(FAM).map(k=>
 `<div class="lg"><span class="sw" style="background:var(${FAM[k].v})"></span>${FAM[k].t}</div>`).join('');
document.getElementById('famFilters').innerHTML=Object.keys(FAM).map(k=>
 `<button class="chip" data-fam="${k}">${FAM[k].t.split(' ')[0]} ${FAM[k].t.split(' ').slice(1,3).join(' ')}</button>`).join('');
document.getElementById('bankBody').innerHTML=CL.map(c=>`
 <details class="cluster" data-fam="${c.f}" style="--fam:var(${FAM[c.f].v})">
  <summary class="chead"><span class="cchev">${icon('chevron')}</span><span class="cletter">${c.L}</span>
   <span class="ctitle">${c.t}</span><span class="cwhat">${c.w}</span>
   <span class="cq">${c.q}</span><span class="cmatch"></span>
   <span class="count">${c.i.length} ideas</span></summary>
  <div class="ideas">${c.i.map(x=>`
   <div class="idea" data-fam="${c.f}" data-pay="${x[3]}" data-np="${x[4]}" data-fast="${FAST.has(x[0])?1:0}">
    <div class="num">${x[0]}</div>
    <div><div class="nm">${x[1]}</div><div class="ln">${x[2]}</div>
    <div class="tags">${x[3]?'<span class="tag pay">someone else pays</span>':''}
     ${x[4]?'<span class="tag np">not you as product</span>':''}
     ${FAST.has(x[0])?'<span class="tag">cash &lt;30 days</span>':''}</div></div></div>`).join('')}</div></details>`).join('');

const st={fam:new Set(),lens:new Set()};
document.querySelectorAll('.chip').forEach(b=>b.onclick=()=>{
  const k=b.dataset.fam?'fam':'lens', v=b.dataset.fam||b.dataset.lens;
  st[k].has(v)?st[k].delete(v):st[k].add(v); b.classList.toggle('on'); filt();});
function filt(){
  let n=0;
  document.querySelectorAll('.idea').forEach(el=>{
    const okF=!st.fam.size||st.fam.has(el.dataset.fam);
    const okL=!st.lens.size||[...st.lens].every(l=>el.dataset[l]==='1');
    const ok=okF&&okL; el.classList.toggle('hide',!ok); if(ok)n++;});
  /* a filter with everything collapsed would look broken, so filtering opens what matched
     and clearing the filters folds it all back down */
  const active=st.fam.size||st.lens.size;
  document.querySelectorAll('.cluster').forEach(c=>{
    const vis=c.querySelectorAll('.idea:not(.hide)').length;
    const tot=c.querySelectorAll('.idea').length;
    c.style.display=vis?'':'none';
    const m=c.querySelector('.cmatch');
    if(m)m.textContent=active&&vis?`${vis} of ${tot} match`:'';
    c.open=active&&vis>0;});
  document.getElementById('cnt').textContent=`${n} of 114 shown`;
}
document.getElementById('expAll').onclick=()=>
  document.querySelectorAll('.cluster').forEach(c=>{if(c.style.display!=='none')c.open=true;});
document.getElementById('colAll').onclick=()=>
  document.querySelectorAll('.cluster').forEach(c=>c.open=false);
filt();

