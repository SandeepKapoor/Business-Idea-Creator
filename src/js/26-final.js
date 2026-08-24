/* The FINAL tab's four stages, folded shut on load — same reasoning as initFrontier(): an
   independent re-run of the whole convergence method is a lot of tables to land on open, and
   each stage's own h3 heading already says what is inside before it is opened. */
function initFinal(){
  document.querySelectorAll('#final .finstage').forEach(el=>
    makeFold(el, el.querySelector(':scope > h3')));
}
