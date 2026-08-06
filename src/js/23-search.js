/* ---------- search ----------
   ONE INDEX, BUILT FROM DATA, NOT FROM THE DOM. Ctrl/Cmd-F only finds text already on screen —
   and on this page that is almost nothing, because every idea, framework and business model
   starts folded shut. Indexing the arrays themselves (CL, FW, FRONT, BMOD, BINST) means a search
   for "GCC" or "portfolio surgery" finds the entry whether or not the reader has ever opened its
   section, and a hit can jump there directly: switch mode, open the right fold, scroll, mark it.

   SCORING IS DELIBERATELY SIMPLE. Every entry is reduced to one lowercase blob of its own title,
   subtitle and body. A query is split into words; an entry scores by whole-phrase substring hits
   (worth the most, and worth more in the title than the body) plus per-word substring hits, so
   "aerospace portfolio" ranks the aerospace-portfolio idea above one that only mentions
   "portfolio". This is not a ranking model — it is the smallest thing that makes "roughly the
   right words, in roughly the right order" outrank "shares no words at all", which is the entire
   job for a page this size (under 200 entries total). */

let SEARCH_IDX = null;

function buildSearchIndex(){
  const idx = [];

  /* the 114 ideas — CL is an array of clusters, each with .i: [n, title, body, pay, np] */
  CL.forEach(c=>{
    c.i.forEach(x=>{
      idx.push({
        kind:'idea', kindLabel:'Idea #'+x[0],
        title:x[1], body:stripTags(x[2]),
        sub:'Cluster '+c.L+' · '+c.t,
        go:()=>jumpToIdea(x[0]),
      });
    });
  });

  /* the 15 frameworks */
  FW.forEach(f=>{
    idx.push({
      kind:'framework', kindLabel:'Framework '+f.n,
      title:f.nm, body:stripTags(f.q)+' '+stripTags(f.ex||''),
      sub:'One of 15 frameworks',
      go:()=>{ mode('report'); openFold('fw', true); },
    });
  });

  /* the frontier — 10 entries, hidden inside its own mode */
  if (typeof FRONT !== 'undefined') FRONT.forEach(F=>{
    idx.push({
      kind:'frontier', kindLabel:'The frontier',
      title:F.nm, body:stripTags(F.one)+' '+stripTags(F.sg||'')+' '+stripTags(F.wt||''),
      sub:'What is opening right now',
      go:()=>{ mode('frontier'); requestAnimationFrame(()=>openFr(F.k)); },
    });
  });

  /* business models — providers and institutions, hidden inside the analyser's mode */
  if (typeof BMOD !== 'undefined') BMOD.forEach(M=>{
    idx.push({
      kind:'bma', kindLabel:'Business model',
      title:M.nm, body:stripTags(M.one)+' '+stripTags(M.how||'')+' '+stripTags(M.pay||''),
      sub:'How a design-education business gets paid',
      go:()=>{ mode('bma'); requestAnimationFrame(()=>openModel(M.k)); },
    });
  });
  if (typeof BINST !== 'undefined') BINST.forEach(M=>{
    idx.push({
      kind:'bma', kindLabel:'Business model',
      title:M.nm, body:stripTags(M.one)+' '+stripTags(M.how||'')+' '+stripTags(M.pay||''),
      sub:'How a design-education business gets paid',
      go:()=>{ mode('bma'); requestAnimationFrame(()=>openModel(M.k)); },
    });
  });

  /* the eleven report parts, by the same titles the section rail already uses — one entry each
     so a reader can jump straight to a part by name instead of scanning the rail. */
  const SECTIONS=[
    ['stuck','Why you’re stuck','Report'],
    ['engine','The engine','Report'],
    ['fw','15 frameworks','Report'],
    ['bank','114 ideas','Report'],
    ['obs','What the bank reveals','Report'],
    ['conv','Convergence','Report'],
    ['score','Scorecard + gates','Report'],
    ['map','Speed × ceiling','Report'],
    ['sprint','2-week sprint','Report'],
    ['pos','My position','Report'],
    ['evid','Evidence ledger','Report'],
    ['srcBlock','Sources','Report'],
  ];
  SECTIONS.forEach(([id,title])=>{
    idx.push({
      kind:'section', kindLabel:'Report section',
      title, body:'', sub:'Jump to this part of the report',
      go:()=>{ mode('report'); openFold(id, true); },
    });
  });

  SEARCH_IDX = idx.map(e=>({
    ...e,
    blobTitle:(e.title||'').toLowerCase(),
    blobAll:((e.title||'')+' '+(e.sub||'')+' '+(e.body||'')).toLowerCase(),
  }));
}

function stripTags(s){ return (s||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim(); }

/* Substring scoring over a small, fixed corpus — see the file header for why this is enough. */
function searchScore(entry, qFull, words){
  let score = 0;
  if (entry.blobTitle.includes(qFull)) score += 50;
  else if (entry.blobAll.includes(qFull)) score += 20;
  words.forEach(w=>{
    if (!w) return;
    if (entry.blobTitle.includes(w)) score += 6;
    else if (entry.blobAll.includes(w)) score += 2;
  });
  return score;
}

function runSearch(query){
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/).filter(Boolean);
  const scored = SEARCH_IDX
    .map(e=>({ e, s:searchScore(e, q, words) }))
    .filter(x=>x.s>0)
    .sort((a,b)=>b.s-a.s)
    .slice(0, 24)
    .map(x=>x.e);
  return scored;
}

/* ---------- the idea bank has no per-idea id, so a hit is found by walking the rendered
   .idea nodes and matching the number in .num — the same number the search index was built
   from, so the two can never disagree. */
function jumpToIdea(n){
  mode('report');
  requestAnimationFrame(()=>{
    const nodes = document.querySelectorAll('#bank .idea');
    let target = null;
    nodes.forEach(el=>{ if (!target && el.querySelector('.num')?.textContent.trim() === String(n)) target = el; });
    if (!target) return;
    const foldEl = foldable('bank');
    if (foldEl) setFold(foldEl, true);
    const details = target.closest('details.cluster');
    if (details) details.open = true;
    target.scrollIntoView({ behavior:'smooth', block:'center' });
    flashHit(target);
  });
}

function flashHit(el){
  el.classList.add('shit');
  setTimeout(()=>el.classList.remove('shit'), 2200);
}

/* ---------- the overlay ---------- */
let SEARCH_ACTIVE = -1;
let SEARCH_RESULTS = [];

function openSearch(){
  if (!SEARCH_IDX) buildSearchIndex();
  const veil = document.getElementById('searchVeil');
  veil.hidden = false;
  const input = document.getElementById('searchIn');
  input.value = '';
  renderSearchResults([]);
  input.focus();
}
function closeSearch(){
  document.getElementById('searchVeil').hidden = true;
}
function searchType(q){
  SEARCH_RESULTS = runSearch(q);
  SEARCH_ACTIVE = SEARCH_RESULTS.length ? 0 : -1;
  renderSearchResults(SEARCH_RESULTS, SEARCH_ACTIVE);
}
function renderSearchResults(results, activeI){
  const box = document.getElementById('searchRes');
  if (!results.length){
    box.innerHTML = `<div class="searchempty">Type to search 114 ideas, 15 frameworks, the frontier, business models and every report section.</div>`;
    return;
  }
  box.innerHTML = results.map((r,i)=>`
    <button class="sresult${i===activeI?' on':''}" type="button" data-i="${i}"
            onmouseenter="setSearchActive(${i})" onclick="pickSearch(${i})">
      <span class="sreskind">${r.kindLabel}</span>
      <span class="srestitle">${escapeHtml(r.title)}</span>
      <span class="sressub">${escapeHtml(r.sub)}</span>
    </button>`).join('');
}
function setSearchActive(i){
  SEARCH_ACTIVE = i;
  document.querySelectorAll('.sresult').forEach((el,idx)=>el.classList.toggle('on', idx===i));
}
function pickSearch(i){
  const r = SEARCH_RESULTS[i];
  if (!r) return;
  closeSearch();
  r.go();
}
function searchKey(ev){
  if (ev.key === 'Escape'){ closeSearch(); return; }
  if (ev.key === 'ArrowDown'){
    ev.preventDefault();
    if (!SEARCH_RESULTS.length) return;
    SEARCH_ACTIVE = Math.min(SEARCH_ACTIVE+1, SEARCH_RESULTS.length-1);
    setSearchActive(SEARCH_ACTIVE);
    scrollActiveIntoView();
  } else if (ev.key === 'ArrowUp'){
    ev.preventDefault();
    if (!SEARCH_RESULTS.length) return;
    SEARCH_ACTIVE = Math.max(SEARCH_ACTIVE-1, 0);
    setSearchActive(SEARCH_ACTIVE);
    scrollActiveIntoView();
  } else if (ev.key === 'Enter'){
    ev.preventDefault();
    if (SEARCH_ACTIVE>=0) pickSearch(SEARCH_ACTIVE);
  }
}
function scrollActiveIntoView(){
  const el = document.querySelector('.sresult.on');
  if (el) el.scrollIntoView({ block:'nearest' });
}
function escapeHtml(s){
  return (s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

/* The global shortcut. "/" opens search from anywhere except while the reader is already typing
   into a field — the workspace has several — and Cmd/Ctrl+K is the second, more conventional
   entry point for anyone who reaches for it by habit rather than reading the hint. */
addEventListener('keydown', (ev)=>{
  const typing = ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName);
  if (ev.key === '/' && !typing){ ev.preventDefault(); openSearch(); return; }
  if ((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === 'k'){ ev.preventDefault(); openSearch(); }
});
