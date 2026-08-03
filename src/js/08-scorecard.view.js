const VGROUP={build:"BUILD",test:"Worth testing",asset:"Asset only",weak:"Weak",gate:"Dead / gate fail"};
const fState={verd:new Set()};
function buildFilterUI(){
  document.getElementById('fCrit').innerHTML=
    '<option value="-1">Total score</option>'+CRIT.map((c,i)=>
      `<option value="${i}">${c}${i<2?' (gate)':''}</option>`).join('');
  document.getElementById('fCrit').value="-1";
  document.getElementById('fClus').innerHTML='<option value="">All 11 clusters</option>'+
    CL.map(c=>`<option value="${c.L}">${c.L} · ${c.t.replace(/&amp;/g,'&')} (${c.i.length})</option>`).join('');
  document.getElementById('fVerd').innerHTML=Object.entries(VGROUP).map(([k,v])=>
    `<button class="chip" data-v="${k}">${v}</button>`).join('');
  document.querySelectorAll('#fVerd .chip').forEach(b=>b.onclick=()=>{
    const v=b.dataset.v;fState.verd.has(v)?fState.verd.delete(v):fState.verd.add(v);
    b.classList.toggle('on');drawHeat();});
  document.getElementById('fCrit').onchange=()=>{syncVal();drawHeat();};
  ['fOp','fVal','fClus'].forEach(id=>document.getElementById(id).onchange=drawHeat);
  document.getElementById('fReset').onclick=()=>{
    document.getElementById('fCrit').value="-1";document.getElementById('fOp').value="gte";
    document.getElementById('fClus').value="";syncVal();fState.verd.clear();
    document.querySelectorAll('#fVerd .chip').forEach(b=>b.classList.remove('on'));drawHeat();};
  syncVal();
}
/* the value dropdown means different things for a single column (1–5) vs the Total (out of 40) */
function syncVal(){
  const ci=+document.getElementById('fCrit').value, s=document.getElementById('fVal');
  s.innerHTML='<option value="0">any</option>'+(ci<0
    ? [21,24,26,28,30,32,34].map(v=>`<option value="${v}">${v}</option>`).join('')
    : [1,2,3,4,5].map(v=>`<option value="${v}">${v}</option>`).join(''));
  s.value="0";
}
function drawHeat(){
  const dark=document.documentElement.dataset.theme==='dark';
  const RAMP=ramp(), ink=rink();
  const rawC=document.getElementById('fCrit').value;
  const ci=rawC===''?-1:+rawC;
  const op=document.getElementById('fOp').value||'gte';
  const val=+document.getElementById('fVal').value;
  const clus=document.getElementById('fClus').value;
  const valOf=c=>ci<0?c.tot:c.s[ci];

  let rows=ALLC.filter(c=>{
    if(clus&&c.cl!==clus)return false;
    if(fState.verd.size&&!fState.verd.has(c.vg))return false;
    if(!val)return true;
    const v=valOf(c);
    return op==='gte'?v>=val:op==='lte'?v<=val:v===val;});
  if(ci>=0)rows=[...rows].sort((a,b)=>b.s[ci]-a.s[ci]||b.tot-a.tot);

  let h='<div class="heatscroll"><table><thead><tr><th class="l">Candidate</th>'+
    CRIT.map((c,i)=>`<th${ci>=0&&i!==ci?' class="dimcol"':''}>${c}${i<2?'<br><span style="color:var(--crit)">gate</span>':''}${ci===i?`<br><span style="color:var(--f1)">${icon('chevron','xs down')} sorted</span>`:''}</th>`).join('')+
    `<th${ci>=0?' class="dimcol"':''}>Total</th><th class="l">Verdict</th></tr></thead><tbody>`;
  rows.forEach(c=>{
    h+=`<tr onclick="openInBuilder(${c.n})" title="Open #${c.n} in Build my own idea">
      <td class="l"><span class="cl">${c.cl}</span><b>#${c.n}</b> ${c.nm}${c.hand?'<span class="hand">HAND-SCORED</span>':''}<span class="go">→ build</span></td>`;
    c.s.forEach((v,i)=>{const g=(i<2&&v===1);
      h+=`<td${ci>=0&&i!==ci?' class="dimcol"':''}><div class="cell${g?' gate':''}" style="background:${RAMP[v-1]};color:${ink[v-1]}">${v}</div></td>`;});
    h+=`<td class="tot${ci>=0?' dimcol':''}">${c.tot}</td>
        <td class="l"><span class="verdict v-${c.v}">${c.vt}</span></td></tr>`;});
  h+='</tbody></table></div>';
  if(!rows.length)h='<div class="empty">No idea matches that filter. '+
    'Loosen the score, change the cluster, or clear the verdict chips.</div>';
  document.getElementById('heat').innerHTML=h;
  const g=k=>rows.filter(r=>r.vg===k).length;
  document.getElementById('fCnt').innerHTML=
    `<b style="color:var(--ink-1)">${rows.length}</b> of ${ALLC.length}`+
    (rows.length?` · ${g('build')} build · ${g('test')} test · ${g('asset')} asset · ${g('weak')} weak · ${g('gate')} dead`:'')+
    (ci>=0?` · sorted by ${CRIT[ci].toLowerCase()}`:'');
  document.getElementById('scoreHow').innerHTML=HOWTO();
}

