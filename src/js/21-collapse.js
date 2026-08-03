/* ---------- collapsible parts ----------
   Everything foldable on the page goes through makeFold(). It takes a block and the heading
   inside it, moves the rest of the block into one wrapper, and turns the heading into a real
   button. Three callers use it:

     initFold()   the report's eleven parts     — .sec with an h2
     foldOut()    the workspace output          — h3-delimited runs inside #cOut
     foldOut()    the business case's sections  — the h4 inside each #cOut .dsec > .dbody

   The report's parts are static, so they fold once at boot. The other two are rebuilt from
   innerHTML on every render, which destroys the wrappers — so foldOut() runs again after each
   render and makeFold() is idempotent, returning early on anything already folded.

   WHY THE WORKSPACE PANEL ITSELF IS NOT FOLDED. mode() shows or hides #custom
   by toggling `hidden`. Folding the panel too would mean a section could be "open" and still
   invisible — two sources of truth for one question. Their *contents* fold instead, which is
   what actually costs the reader anything.

   Charts are safe: every chart here is viewBox SVG written with innerHTML, so nothing measures
   layout width and nothing needs redrawing when a block opens. */

const NOFOLD = ['custom'];   /* the workspace panel — see above */
let FOLDSEQ = 0;

/* The folds the global button acts on: only those the current mode is actually showing.
   This has to be a filtered list, not a container. Report mode has no element that wraps
   just the report — .wrap holds the mode panels too — so scoping it to a container would
   count the builder's and the deep dive's blocks while both are hidden, and report "3 of 17"
   on a page showing eleven closed parts. */
function foldSet() {
  const m = (typeof CURMODE === 'string') ? CURMODE : 'report';
  if (m !== 'report') {
    const panel = document.getElementById(m);
    return panel ? Array.from(panel.querySelectorAll('.fold')) : [];
  }
  return Array.from(document.querySelectorAll('.fold'))
    .filter((el) => !el.closest('#custom'));
}

/* Turn `el` into a foldable block. `head` becomes the trigger; anything in `keep` stays
   visible beside it. Everything else moves into a single wrapper so open/close is one class. */
function makeFold(el, head, keep) {
  if (!el || !head || el.classList.contains('fold')) return;   /* idempotent across re-renders */
  const bodyId = 'fold-' + (el.id || ('n' + (++FOLDSEQ)));
  const body = document.createElement('div');
  body.className = 'secbody';
  body.id = bodyId;
  const skip = [head].concat(keep || []);
  Array.from(el.childNodes).forEach((n) => { if (!skip.includes(n)) body.appendChild(n); });
  el.appendChild(body);

  /* Built from nodes, not an innerHTML string, so any markup inside the heading survives.
     The button carries the semantics — focusable, and it announces its own state. */
  head.classList.add('foldhd');
  const btn = document.createElement('button');
  btn.className = 'sfold';
  btn.type = 'button';
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', bodyId);
  const chev = document.createElement('span');
  chev.className = 'schev';
  chev.innerHTML = icon('chevron', 'sm');
  const lab = document.createElement('span');
  Array.from(head.childNodes).forEach((n) => lab.appendChild(n));
  btn.appendChild(chev);
  btn.appendChild(lab);
  head.appendChild(btn);
  btn.addEventListener('click', () => toggleFold(el));

  /* Subtitles are a convenience click target only; the button above is the real control. */
  (keep || []).forEach((k) => {
    k.classList.add('foldh3');
    k.addEventListener('click', () => toggleFold(el));
  });
  el.classList.add('fold', 'shut');
}

/* Open or close one block. Every route in and out goes through here, so the class, the arrow,
   the ARIA state and the global button can never disagree. */
function setFold(el, open) {
  if (!el || !el.classList.contains('fold')) return;
  el.classList.toggle('shut', !open);
  const b = el.querySelector(':scope > .foldhd > button.sfold');
  if (b) b.setAttribute('aria-expanded', String(!!open));
  syncFoldAll();
}

function toggleFold(el) { setFold(el, el.classList.contains('shut')); }

function foldable(id) {
  const s = document.getElementById(id);
  return s && s.classList.contains('fold') ? s : null;
}

/* Used by the nav pills, the hash on load, and backToTable(): reveal a part, then bring it
   into view. Scrolling happens after the class flips so the target is at its final height. */
function openFold(id, scroll) {
  const s = foldable(id);
  if (s) setFold(s, true);
  if (scroll) {
    const t = document.getElementById(id);
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  return s;
}

function foldAll(open) {
  foldSet().forEach((el) => setFold(el, open));
}

/* One toggle rather than two buttons: it offers whichever action is not already true, and
   hides itself when the current mode has nothing to fold. dataset.open is what onclick reads. */
function syncFoldAll() {
  const btn = document.getElementById('foldAll');
  const bar = document.getElementById('foldBar');
  if (!btn) return;
  const set = foldSet();
  const n = set.length;
  const openN = set.filter((el) => !el.classList.contains('shut')).length;
  if (bar) bar.hidden = n === 0;
  const allOpen = n > 0 && openN === n;
  btn.dataset.open = allOpen ? '1' : '0';
  btn.innerHTML = icon(allOpen ? 'collapse' : 'expand', 'sm') +
    `<span>${allOpen ? 'Collapse all' : 'Expand all'}</span>` +
    `<span class="fcount">${openN} of ${n} open</span>`;
  btn.setAttribute('aria-label', allOpen ? 'Collapse all' : 'Expand all');
}

/* Generated output is a flat list: a heading, then its content as siblings, then the next
   heading. Wrap each run so it can fold as a unit. Anything before the first heading (the
   idea card, the deep dive's summary bar) is left alone — it is the part you came to read. */
function foldRuns(box, tag) {
  if (!box) return;
  const kids = Array.from(box.children);
  let i = 0;
  while (i < kids.length) {
    if (kids[i].tagName.toLowerCase() !== tag) { i++; continue; }
    const group = document.createElement('div');
    group.className = 'gsec';
    box.insertBefore(group, kids[i]);
    group.appendChild(kids[i]);
    let j = i + 1;
    while (j < kids.length && kids[j].tagName.toLowerCase() !== tag) { group.appendChild(kids[j]); j++; }
    makeFold(group, group.children[0]);
    i = j;
  }
}

/* Called after every render of the two generated views. */
function foldOut() {
  foldRuns(document.getElementById('cOut'), 'h3');
  document.querySelectorAll('#cOut .dsec > .dbody').forEach((b) => {
    makeFold(b, b.querySelector(':scope > h4'));
  });
  syncFoldAll();
}

function initFold() {
  document.querySelectorAll('.sec').forEach((s) => {
    if (NOFOLD.includes(s.id) || !s.id) return;
    const h2 = s.querySelector(':scope > h2');
    if (!h2) return;                                   /* no heading, nothing to hang it on */
    makeFold(s, h2, [s.querySelector(':scope > h3')].filter(Boolean));
  });

  /* Jumping to a part from the nav must open it, or the jump lands on a closed heading. */
  document.querySelectorAll('#navRow a').forEach((a) => {
    a.addEventListener('click', () => openFold((a.getAttribute('href') || '').slice(1), true));
  });

  syncFoldAll();
  if (location.hash.length > 1) openFold(location.hash.slice(1), true);
}
