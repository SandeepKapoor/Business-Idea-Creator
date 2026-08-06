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

const NOFOLD = ['custom', 'frontier', 'bma'];   /* the two mode panels — see above */
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
  /* Every mode panel, not just the workspace. This excluded #custom alone, which was right when
     #custom held the only generated folds — the frontier and the analyser had none. Both fold
     their contents now, so the report's counter was reading "1 of 36" while showing twelve parts,
     twenty-four of the thirty-six being invisible inside two hidden tabs. Derived from NOFOLD so
     a fifth mode cannot reintroduce the bug by being forgotten here. */
  return Array.from(document.querySelectorAll('.fold'))
    .filter((el) => !NOFOLD.some((id) => el.closest('#' + id)));
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
  if (!btn) return;
  const set = foldSet();
  const n = set.length;
  const openN = set.filter((el) => !el.classList.contains('shut')).length;
  /* The button used to sit in a row of its own — #foldBar — which existed to be hidden when the
     mode had nothing to fold, and cost a whole row of header height the rest of the time. The
     button lives at the end of the section rail now, so it hides itself. */
  btn.hidden = n === 0;
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

  /* ONE PART OPENS. The report used to arrive as a masthead followed by twelve closed headings
     and nothing else — a table of contents wearing a document's clothes. Opening the first part
     costs one screen of scrolling and buys the reader an actual paragraph to land on, which is
     the difference between "here is a document" and "here is what it says".

     Only the first, and only when the reader has not asked for something else: a deep link in
     the hash is a specific request and it opens its own part a few lines down.

     NO SECOND ARGUMENT. openFold's `scroll` flag smooth-scrolls to the target, which is right
     when the reader clicked a rail item and wrong at boot — passing it here landed every single
     load already scrolled past the masthead, at a position nobody asked to be at. Open it where
     it is and leave the viewport alone. */
  if (location.hash.length <= 1) openFold('stuck');

  syncFoldAll();
  initSpy();
  if (location.hash.length > 1) openFold(location.hash.slice(1), true);
}

/* ---------- where am I ----------
   Eleven rail items with no active state tell the reader nothing about which section they are
   in, which is UX-guideline territory and also just annoying in a document this long. This marks
   the one whose section currently owns the top of the viewport.

   WHY NOT IntersectionObserver. Most sections here are folded to a single heading most of the
   time, so their boxes are ~40px tall and several of them intersect the same thin band at once —
   the observer would fire constantly and pick an arbitrary winner. Measuring which heading is
   the last one above the fold is both simpler and correct for a document that is mostly folded.

   The rail scrolls, so the active item is also scrolled into view inside it — an active state
   you cannot see is not an active state. */
function initSpy() {
  const links = Array.from(document.querySelectorAll('#navRow a[href^="#"]'));
  if (!links.length) return;
  const rail = document.querySelector('#navRow .nav');
  let queued = false, last = null;

  const pick = () => {
    queued = false;
    const line = (parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--stick'), 10) || 74) + 8;
    let winner = null;
    links.forEach((a) => {
      const el = document.getElementById((a.getAttribute('href') || '').slice(1));
      if (!el || el.hidden || !el.offsetParent) return;
      if (el.getBoundingClientRect().top <= line) winner = a;
    });
    /* Above the first section — nothing is current, and pretending otherwise would point the
       reader at a section they have not reached. */
    if (winner === last) return;
    if (last) last.classList.remove('here');
    last = winner;
    if (!winner) return;
    winner.classList.add('here');
    if (rail) {
      /* The rail is a vertical column above 720px and a horizontal strip at and below it — scroll
         whichever axis the layout actually uses, or both would silently no-op on the other. */
      const vertical = (window.innerWidth || 9999) > 720;
      const r = winner.getBoundingClientRect(), b = rail.getBoundingClientRect();
      if (vertical) {
        if (r.top < b.top || r.bottom > b.bottom) {
          rail.scrollTo({ top: rail.scrollTop + (r.top - b.top) - 24, behavior: 'smooth' });
        }
      } else if (r.left < b.left || r.right > b.right) {
        rail.scrollTo({ left: rail.scrollLeft + (r.left - b.left) - 24, behavior: 'smooth' });
      }
    }
  };

  const queue = () => { if (!queued) { queued = true; requestAnimationFrame(pick); } };
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue);
  pick();
}
