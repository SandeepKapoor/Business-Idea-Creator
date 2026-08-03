#!/usr/bin/env node
/*
 * tools/fold.js — behavioural test for the collapsible parts (src/js/21-collapse.js).
 *
 * WHY THIS IS NOT IN verify.js. That harness stubs just enough DOM to boot the artifact and
 * exercise the scoring engine; its getElementById returns a flat bag of fake nodes with no
 * tree, so initFold() finds no sections and silently does nothing. Testing collapse needs a
 * real parent/child tree, so this file carries a small one.
 *
 * The DOM here supports exactly the selectors 21-collapse.js uses — tag, .class, #id,
 * :not(.class), ':scope > a > b' child chains, and closest(). It is not a general CSS engine.
 * If you add a new selector to the module, teach match()/qs() about it or the test will lie.
 *
 * The fixture mirrors the real section inventory: 13 .sec blocks, two of which (custom, deep)
 * are mode panels that must be left alone, and one of which (stuck) has no h3.
 *
 *   node tools/fold.js
 */
/* A small DOM, sufficient for the selectors 21-collapse.js actually uses:
   tag / .class / #id / :not(.class), ':scope > a > b' child chains, and closest(). */
const fs=require('fs'),vm=require('vm');
const R='/Users/sandeepkapoor/Documents/Vibe Coding:AI/Business Idea Creator - Education';

let uid=0;
class Txt{constructor(t){this.text=t;this.parentNode=null}}
class El{
  constructor(tag){this.tag=tag;this.id='';this.childNodes=[];this.parentNode=null;
    this.attrs={};this.listeners={};this._text='';this._uid=++uid;this.scrolled=0;
    this.dataset={};this.innerHTML='';
    this.classList=new CL(this);}
  get tagName(){return this.tag.toUpperCase()}
  insertBefore(n,ref){if(n.parentNode)n.parentNode.childNodes=n.parentNode.childNodes.filter(x=>x!==n);
    n.parentNode=this;const i=this.childNodes.indexOf(ref);
    i<0?this.childNodes.push(n):this.childNodes.splice(i,0,n);return n}
  get className(){return this.classList.items.join(' ')}
  set className(v){this.classList.items=v.split(/\s+/).filter(Boolean)}
  get textContent(){return this._text}
  set textContent(v){this._text=v}
  setAttribute(k,v){this.attrs[k]=String(v)}
  getAttribute(k){return k in this.attrs?this.attrs[k]:null}
  appendChild(n){if(n.parentNode)n.parentNode.childNodes=n.parentNode.childNodes.filter(x=>x!==n);
    n.parentNode=this;this.childNodes.push(n);return n}
  addEventListener(t,f){(this.listeners[t]=this.listeners[t]||[]).push(f)}
  click(){(this.listeners.click||[]).forEach(f=>f())}
  scrollIntoView(){this.scrolled++}
  get children(){return this.childNodes.filter(n=>n instanceof El)}
  descendants(){return this.children.flatMap(c=>[c,...c.descendants()])}
  querySelector(s){return qs(this,s)[0]||null}
  querySelectorAll(s){return qs(this,s)}
  closest(s){let n=this;while(n){if(n instanceof El&&match(n,s))return n;n=n.parentNode}return null}
}
class CL{
  constructor(e){this.e=e;this.items=[]}
  add(...c){c.forEach(x=>{if(!this.items.includes(x))this.items.push(x)})}
  remove(...c){this.items=this.items.filter(x=>!c.includes(x))}
  contains(c){return this.items.includes(c)}
  toggle(c,f){const on=f===undefined?!this.contains(c):!!f;on?this.add(c):this.remove(c);return on}
}
function match(el,sel){
  sel=sel.trim();
  const nots=[...sel.matchAll(/:not\(\.([\w-]+)\)/g)].map(m=>m[1]);
  sel=sel.replace(/:not\([^)]*\)/g,'');
  const id=(sel.match(/#([\w-]+)/)||[])[1];
  const cls=[...sel.matchAll(/\.([\w-]+)/g)].map(m=>m[1]);
  const tag=(sel.match(/^([a-zA-Z][\w]*)/)||[])[1];
  if(tag&&el.tag!==tag)return false;
  if(id&&el.id!==id)return false;
  if(!cls.every(c=>el.classList.contains(c)))return false;
  if(nots.some(c=>el.classList.contains(c)))return false;
  return true;
}
function qs(root,sel){
  /* tokenise into a chain: compound selectors separated by ' ' (descendant) or '>' (child) */
  const toks=sel.replace(/\s*>\s*/g,' > ').trim().split(/\s+/);
  let level, i;
  if(toks[0]===':scope'){level=[root];i=1;}
  else{level=root.descendants().filter(n=>match(n,toks[0]));i=1;}
  while(i<toks.length){
    if(toks[i]==='>'){const c=toks[i+1];
      level=level.flatMap(n=>n.children.filter(x=>match(x,c)));i+=2;}
    else{const d=toks[i];
      level=level.flatMap(n=>n.descendants().filter(x=>match(x,d)));i+=1;}
  }
  return level;
}
const doc=new El('html');
const byId={};
function mk(tag,parent,id,cls){const e=new El(tag);if(id){e.id=id;byId[id]=e}
  if(cls)e.className=cls;if(parent)parent.appendChild(e);return e}
const document={
  createElement:t=>new El(t),
  getElementById:i=>byId[i]||null,
  querySelector:s=>qs(doc,s)[0]||null,
  querySelectorAll:s=>qs(doc,s),
};
// ---- fixture: the real section inventory -------------------------------------
const nav=mk('div',doc,'navRow');
const foldBar=mk('div',doc,'foldBar');
const foldBtn=mk('button',foldBar,'foldAll');
const SECS=[['custom',1],['deep',1],['stuck',0,false],['engine',0],['fw',0],['bank',0],
  ['obs',0],['conv',0],['score',0],['map',0],['sprint',0],['pos',0],['evid',0]];
const bodies={};
for(const [id,isMode,hasH3=true] of SECS){
  const s=mk('div',doc,id,'sec');
  mk('h2',s).appendChild(new Txt(id.toUpperCase()));
  if(hasH3)mk('h3',s).appendChild(new Txt('subtitle'));
  bodies[id]=[mk('div',s,null,'card'),mk('p',s)];   // the content that must end up wrapped
  if(!isMode){const a=mk('a',nav);a.setAttribute('href','#'+id);a.getAttribute=k=>k==='href'?'#'+id:null;}
}
// generated output lives inside the two mode panels
const cOut=mk('div',byId.custom,'cOut');
mk('div',cOut,null,'stmt');                    // content before the first h3 must stay put
mk('div',cOut,null,'ideacard');
const H3=[];
for(const t of ['Part 6','Part 7','Part 8']){
  const h=mk('h3',cOut);h.appendChild(new Txt(t));H3.push(h);
  mk('div',cOut,null,'card'); mk('p',cOut);
}
const dOut=mk('div',byId.deep,'dOut');
mk('div',dOut,null,'dhead');
const DB=[];
for(let i=0;i<3;i++){
  const ds=mk('div',dOut,null,'dsec');
  mk('div',ds,null,'dnum').appendChild(new Txt('0'+(i+1)));
  const db=mk('div',ds,null,'dbody');DB.push(db);
  mk('h4',db).appendChild(new Txt('Section '+(i+1)));
  mk('p',db); mk('div',db,null,'card');
}

// ---- run the real module ------------------------------------------------------
const src=fs.readFileSync(R+'/src/js/21-collapse.js','utf8');
const sb={document,location:{hash:''},console};sb.globalThis=sb;
vm.createContext(sb);vm.runInContext(src+'\n;globalThis.__f={initFold,foldAll,setFold,openFold,toggleFold,foldOut,syncFoldAll};',sb);
const F=sb.__f;
// ---- assertions ---------------------------------------------------------------
let pass=0;const fail=[];
const ok=(n,c,d)=>{c?pass++:fail.push(d?`${n} — ${d}`:n)};
F.initFold();
const folds=document.querySelectorAll('.sec.fold');
ok('11 report parts became foldable',folds.length===11,`got ${folds.length}`);
ok('custom and deep were left alone',
  !byId.custom.classList.contains('fold')&&!byId.deep.classList.contains('fold'));
ok('every part starts closed',folds.every(s=>s.classList.contains('shut')));
ok('every part has a secbody wrapper',folds.every(s=>qs(s,':scope > .secbody').length===1));
ok('the original content moved inside the wrapper',
  folds.every(s=>{const b=qs(s,':scope > .secbody')[0];return bodies[s.id].every(n=>n.parentNode===b)}));
ok('heading stayed outside the wrapper',
  folds.every(s=>qs(s,':scope > h2').length===1));
ok('stuck (no h3) still folded',byId.stuck.classList.contains('fold'));
ok('h3 kept out of the wrapper where present',
  qs(byId.engine,':scope > h3').length===1);
const btn=q=>qs(byId[q],':scope > h2 > button.sfold')[0];
ok('every part has a real button trigger',folds.every(s=>!!btn(s.id)));
ok('button starts aria-expanded=false',folds.every(s=>btn(s.id).getAttribute('aria-expanded')==='false'));
ok('button points at its own body',folds.every(s=>btn(s.id).getAttribute('aria-controls')==='fold-'+s.id));
{const lab=btn('engine').childNodes[1];
 ok('heading text node moved into the button label',
   lab && lab.childNodes.some(n=>n instanceof Txt && n.text==='ENGINE'));
 ok('the h2 no longer holds the text directly',
   !qs(byId.engine,':scope > h2')[0].childNodes.some(n=>n instanceof Txt));}
// individual toggle
btn('score').click();
ok('clicking a heading opens just that part',
  !byId.score.classList.contains('shut')&&byId.map.classList.contains('shut'));
ok('aria-expanded follows',btn('score').getAttribute('aria-expanded')==='true');
btn('score').click();
ok('clicking again closes it',byId.score.classList.contains('shut'));
// h3 secondary target
qs(byId.engine,':scope > h3')[0].click();
ok('clicking the h3 subtitle also toggles',!byId.engine.classList.contains('shut'));
qs(byId.engine,':scope > h3')[0].click();
// global
F.foldAll(true);
ok('expand all opens every part',document.querySelectorAll('.sec.fold:not(.shut)').length===11);
ok('global button offers Collapse all when everything is open',
  foldBtn.dataset&&foldBtn.dataset.open==='1');
F.foldAll(false);
ok('collapse all closes every part',document.querySelectorAll('.sec.fold:not(.shut)').length===0);
ok('global button offers Expand all when everything is shut',foldBtn.dataset.open==='0');
// nav + deep link
byId.pos.classList.add('shut');
nav.children.find(a=>a.getAttribute('href')==='#pos').click();
ok('a nav pill opens its target part',!byId.pos.classList.contains('shut'));
ok('and scrolls to it',byId.pos.scrolled>0);
F.openFold('evid',1);
ok('openFold opens the appendix',!byId.evid.classList.contains('shut'));
ok('openFold on an unknown id is harmless',(F.openFold('nope',1),true));
ok('openFold on a mode panel is a no-op',(F.openFold('custom',0),!byId.custom.classList.contains('fold')));

// ===== generated output ========================================================
sb.CURMODE='custom';
F.syncFoldAll();
ok('global bar hides when the mode has nothing to fold',byId.foldBar.hidden===true);

F.foldOut();
const groups=qs(cOut,'.gsec');
ok('builder output folds into one group per h3',groups.length===3,`got ${groups.length}`);
ok('content before the first heading is left alone',
  cOut.children.filter(c=>c.classList.contains('stmt')||c.classList.contains('ideacard')).length===2);
ok('each group owns its heading plus the content that followed it',
  groups.every(g=>qs(g,':scope > .foldhd').length===1 &&
                  qs(g,':scope > .secbody')[0].children.length===2));
ok('the h3 heading became the trigger',groups.every(g=>qs(g,':scope > .foldhd > button.sfold').length===1));
ok('builder groups start closed',groups.every(g=>g.classList.contains('shut')));
ok('deep-dive sections fold on their h4',DB.every(b=>b.classList.contains('fold')));
ok('the dnum stays outside the fold',
  DB.every(b=>b.parentNode.children.some(c=>c.classList.contains('dnum'))));
ok('deep-dive body wraps everything below the h4',
  DB.every(b=>qs(b,':scope > .secbody')[0].children.length===2));

// idempotency: a re-render calls foldOut again over already-folded nodes
F.foldOut();
ok('folding twice does not double-wrap',qs(cOut,'.gsec').length===3 &&
  qs(groups[0],':scope > .secbody').length===1);

// scope: the global control must not reach into a mode that is off screen.
// Close everything first — the nav tests above deliberately left two report parts open.
sb.CURMODE='report'; F.foldAll(false);
sb.CURMODE='custom';
F.foldAll(true);
ok('expand all in custom mode opens the builder groups',groups.every(g=>!g.classList.contains('shut')));
ok('and leaves the report parts alone',document.querySelectorAll('.sec.fold:not(.shut)').length===0);
ok('and leaves the deep dive alone',DB.every(b=>b.classList.contains('shut')));
ok('the count is scoped to the mode on screen',byId.foldAll.innerHTML.includes('3 of 3'));
sb.CURMODE='deep';
F.syncFoldAll();
ok('switching mode re-scopes the count',byId.foldAll.innerHTML.includes('0 of 3'));
sb.CURMODE='report';
F.syncFoldAll();
ok('back in the report the count is the eleven parts',byId.foldAll.innerHTML.includes('0 of 11'));
ok('and the bar is visible again',byId.foldBar.hidden===false);

console.log(`\n  ${pass} passed, ${fail.length} failed`);
fail.forEach(f=>console.log('    ✕ '+f));
console.log('');
process.exit(fail.length?1:0);
