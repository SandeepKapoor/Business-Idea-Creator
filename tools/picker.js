#!/usr/bin/env node
/*
 * tools/picker.js — behavioural test for the axis picker (src/js/02-axes.js).
 *
 * The picker replaced the workspace's four <select> elements. A <select> is a browser control:
 * keyboard, selection and screen-reader semantics come free. Twenty divs in a scroller get none
 * of that unless the code provides it, so the things that used to be guaranteed now need
 * testing — roving tabindex, aria-checked, arrow keys, and the fact that gen() reads the same
 * value the user clicked.
 *
 * Same approach as tools/fold.js: a small real DOM rather than a stub that returns [] for
 * everything, because the bugs here are all about tree shape. It parses innerHTML, which the
 * fold harness never needed — buildPicker writes markup and syncPicker then walks .children.
 *
 *   node tools/picker.js
 */

'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const R = path.join(__dirname, '..');
let pass = 0; const fails = [];
const ok = (n, c, d) => { if (c) { pass++; return true; } fails.push(d ? `${n} — ${d}` : n); return false; };
const eq = (n, a, b) => ok(n, a === b, `expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`);

/* ---------------- a small DOM ---------------- */
let SEQ = 0;
function Node(tag) {
  return {
    tag, id: '', children: [], parent: null, text: '', attrs: {},
    _cls: new Set(), tabIndex: -1, _listeners: {}, _scrolled: 0,
    get className() { return [...this._cls].join(' '); },
    set className(v) { this._cls = new Set(String(v).split(/\s+/).filter(Boolean)); },
    classList: {
      add(...c) { c.forEach((x) => this._o._cls.add(x)); },
      remove(...c) { c.forEach((x) => this._o._cls.delete(x)); },
      contains(c) { return this._o._cls.has(c); },
      toggle(c, f) { const on = f === undefined ? !this._o._cls.has(c) : !!f;
        on ? this._o._cls.add(c) : this._o._cls.delete(c); return on; },
    },
    dataset: {},
    setAttribute(k, v) { this.attrs[k] = String(v); if (k === 'id') this.id = String(v); },
    getAttribute(k) { return k in this.attrs ? this.attrs[k] : null; },
    addEventListener(t, fn) { (this._listeners[t] = this._listeners[t] || []).push(fn); },
    dispatch(t, ev) { (this._listeners[t] || []).forEach((f) => f({ currentTarget: this, ...ev })); },
    focus() { FOCUS = this; },
    scrollIntoView() { this._scrolled++; },
    appendChild(c) { c.parent = this; this.children.push(c); return c; },
    querySelectorAll(sel) { return all(this).filter((n) => match(n, sel)); },
    querySelector(sel) { return this.querySelectorAll(sel)[0] || null; },
    get firstChild() { return this.children[0] || null; },
    get innerHTML() { return this._html || ''; },
    set innerHTML(v) { this._html = v; this.children = parse(v, this); index(this); },
  };
}
let FOCUS = null;
const ALLID = new Map();
function mk(tag) { const n = Node(tag); n.classList._o = n; n._seq = ++SEQ; return n; }
const all = (n) => n.children.flatMap((c) => [c, ...all(c)]);
function match(n, sel) {
  return sel.split(',').map((s) => s.trim()).some((s) =>
    s.startsWith('.') ? n._cls.has(s.slice(1)) : s === n.tag);
}
function index(root) { all(root).forEach((n) => { if (n.id) ALLID.set(n.id, n); }); }

/* Enough of an HTML parser for what buildPicker emits: nested divs and spans with quoted
   attributes and text. Void elements and comments do not appear in that markup. */
function parse(html, parent) {
  const out = []; const stack = [{ children: out }];
  const re = /<(\/?)([a-zA-Z][\w-]*)((?:\s+[\w:-]+="[^"]*")*)\s*(\/?)>|([^<]+)/g;
  let m;
  while ((m = re.exec(html))) {
    const [, close, tag, attrs, self, text] = m;
    if (text !== undefined) {
      const t = text.trim();
      if (t) { const top = stack[stack.length - 1]; if (top.node) top.node.text += t; }
      continue;
    }
    if (close) { if (stack.length > 1) stack.pop(); continue; }
    const n = mk(tag.toLowerCase());
    for (const a of attrs.matchAll(/([\w:-]+)="([^"]*)"/g)) {
      const [, k, v] = a;
      if (k === 'class') n.className = v;
      else if (k === 'id') { n.id = v; n.attrs.id = v; }
      else if (k === 'tabindex') n.tabIndex = +v;
      else if (k.startsWith('data-')) n.dataset[k.slice(5).replace(/-(\w)/g, (_, c) => c.toUpperCase())] = v;
      else n.attrs[k] = v;
    }
    const top = stack[stack.length - 1];
    n.parent = top.node || parent;
    top.children.push(n);
    if (!self) stack.push({ node: n, children: n.children });
  }
  return out;
}

/* ---------------- boot ---------------- */
const root = mk('body');
['engPick', 'wPick', 'comboTxt', 'rollLog'].forEach((id) => { const n = mk('div'); n.id = id; root.appendChild(n); ALLID.set(id, n); });
const doc = {
  documentElement: mk('html'),
  body: root,
  getElementById(id) { return ALLID.get(id) || null; },
  createElement: mk,
  querySelectorAll(sel) { return root.querySelectorAll(sel); },
  querySelector(sel) { return root.querySelector(sel); },
  addEventListener() {},
};
const sb = { document: doc, console, Math, JSON, location: { hash: '' } };
sb.window = sb; sb.globalThis = sb;
vm.createContext(sb);

const files = ['02-axes'];
const src = files.map((f) => fs.readFileSync(path.join(R, 'src/js', f + '.js'), 'utf8')).join('\n');
/* A stand-in for the workspace handler; the real one lives in 18-modes.js and drags in the whole
   engine. What is under test is the picker, so the handler only has to record the call. */
const CALLS = [];
vm.runInContext(`${src}
;function wpick(k,i){ CALLS.push([k,i]); STATE[k]=i; syncPicker('w',STATE,false); }
;var STATE={WHO:2,OUT:4,HOW:0,PAY:3};
;globalThis.__p={buildPicker,syncPicker,renderAx,pick,roll,AX,AXMETA,sel,STATE};`, sb);
sb.CALLS = CALLS;
const P = sb.__p;

/* ---------------- the checks ---------------- */
P.buildPicker('wPick', 'w', 'wpick');
P.syncPicker('w', P.STATE, false);

const host = doc.getElementById('wPick');
eq('four columns render', host.querySelectorAll('.col').length, 4);
eq('WHO column has 20 options', doc.getElementById('wWHO').children.length, 20);
eq('HOW column has 22 options', doc.getElementById('wHOW').children.length, 22);

const groups = P.AXMETA.map((a) => doc.getElementById('w' + a.k));
ok('every column is a radiogroup', groups.every((g) => g.getAttribute('role') === 'radiogroup'));
ok('every column names itself for assistive tech',
  groups.every((g) => ALLID.has(g.getAttribute('aria-labelledby'))));
ok('every option carries role=radio',
  groups.every((g) => g.children.every((c) => c.getAttribute('role') === 'radio')));

const checked = (g) => g.children.filter((c) => c.getAttribute('aria-checked') === 'true');
const tabbable = (g) => g.children.filter((c) => c.tabIndex === 0);
ok('exactly one option per column is checked', groups.every((g) => checked(g).length === 1));
ok('exactly one option per column is in the tab order (roving tabindex)',
  groups.every((g) => tabbable(g).length === 1),
  `counts: ${groups.map((g) => tabbable(g).length).join(',')}`);
ok('the checked option is the tabbable one',
  groups.every((g) => checked(g)[0] === tabbable(g)[0]));
ok('the checked option matches the state',
  P.AXMETA.every((a, i) => groups[i].children.indexOf(checked(groups[i])[0]) === P.STATE[a.k]));
ok('exactly one option per column carries the .on class',
  groups.every((g) => g.children.filter((c) => c._cls.has('on')).length === 1));

/* clicking */
const before = P.STATE.WHO;
sb.wpick('WHO', 7);
eq('clicking an option updates the state', P.STATE.WHO, 7);
ok('clicking moves the checked flag',
  groups[0].children.indexOf(checked(groups[0])[0]) === 7 && before !== 7);

/* keyboard: selection follows focus, the standard radio behaviour */
const g0 = groups[0];
g0.dispatch('keydown', { key: 'ArrowDown', preventDefault() {} });
eq('ArrowDown selects the next option', P.STATE.WHO, 8);
g0.dispatch('keydown', { key: 'ArrowUp', preventDefault() {} });
g0.dispatch('keydown', { key: 'ArrowUp', preventDefault() {} });
eq('ArrowUp walks back', P.STATE.WHO, 6);
g0.dispatch('keydown', { key: 'Home', preventDefault() {} });
eq('Home jumps to the first option', P.STATE.WHO, 0);
g0.dispatch('keydown', { key: 'End', preventDefault() {} });
eq('End jumps to the last option', P.STATE.WHO, P.AX.WHO.length - 1);
g0.dispatch('keydown', { key: 'ArrowDown', preventDefault() {} });
eq('ArrowDown wraps from the end', P.STATE.WHO, 0);
g0.dispatch('keydown', { key: 'ArrowUp', preventDefault() {} });
eq('ArrowUp wraps from the start', P.STATE.WHO, P.AX.WHO.length - 1);
const noop = CALLS.length;
g0.dispatch('keydown', { key: 'a', preventDefault() {} });
eq('an unrelated key changes nothing', CALLS.length, noop);
ok('keyboard navigation moves focus with the selection', FOCUS !== null);

/* Scrolling a programmatic change into view. Counters are reset first: the keyboard block above
   legitimately scrolled six rows in column 0 on its way through, and counting those made the
   next assertion read 6 when the behaviour under test was fine. */
groups.forEach((g) => g.children.forEach((c) => { c._scrolled = 0; }));
const OUTSIDE = { WHO: 15, OUT: 3, HOW: 9, PAY: 11 };
P.syncPicker('w', OUTSIDE, true);
ok('setting state from outside scrolls the selection into view',
  groups.every((g) => g.children.some((c) => c._scrolled > 0)),
  'a selection you cannot see in a 20-row scroller has not been made');
ok('exactly one row per column is scrolled to',
  groups.every((g) => g.children.filter((c) => c._scrolled > 0).length === 1),
  `counts: ${groups.map((g) => g.children.filter((c) => c._scrolled > 0).length).join(',')}`);
ok('the scrolled row is the selected one',
  P.AXMETA.every((a, i) => groups[i].children[OUTSIDE[a.k]]._scrolled > 0));
// syncPicker paints from the object it is handed; it must not write back into it.
ok('syncPicker paints without mutating the caller\'s state',
  P.STATE.WHO !== OUTSIDE.WHO && P.STATE.OUT !== OUTSIDE.OUT);

/* the report's engine shares the component */
P.renderAx();
eq('the engine builds from the same component', doc.getElementById('engPick').querySelectorAll('.col').length, 4);
ok('the engine and the workspace do not share element ids',
  doc.getElementById('eWHO') !== doc.getElementById('wWHO'));
ok('the engine still writes its combination sentence',
  doc.getElementById('comboTxt').innerHTML.includes('who want to'));
const wasOut = P.STATE.OUT;
P.pick('OUT', 5);
eq('picking in the engine updates its own state', P.sel.OUT, 5);
eq('picking in the engine leaves the workspace state alone', P.STATE.OUT, wasOut);
ok('picking in the engine leaves the workspace painting alone',
  groups[1].children.indexOf(checked(groups[1])[0]) === OUTSIDE.OUT,
  'the two hosts must not share a selection');

/* every option label is real content, not an index */
ok('option labels are the axis strings',
  P.AXMETA.every((a, i) => groups[i].children.every((c, j) => c.text === P.AX[a.k][j])),
  'a mismatch means the picker and the engine disagree about what index means what');

/* ---------------- report ---------------- */
if (fails.length) {
  console.log(`\n  FAIL  ${fails.length} of ${pass + fails.length} picker checks\n`);
  fails.forEach((f) => console.log(`    ✕ ${f}`));
  console.log('');
  process.exit(1);
}
console.log(`\n  ${pass} picker checks passed\n`);
