/* Floating "back to top" button for the Brainstorm/Strategy tabs (.ed-original). Cards there
   link to anchors further down the page; without this, getting back means scrolling all the way
   up by hand. Jumps with window.scrollTo({behavior:'auto'}) rather than el.scrollIntoView, since
   html{scroll-behavior:smooth} (02-base.css) would otherwise animate every jump. */
function initEdTop(){
  document.querySelectorAll('.ed-original').forEach((sec) => {
    const btn = sec.querySelector('[data-ed-top]');
    if (!btn) return;
    const onScroll = () => { btn.classList.toggle('is-visible', sec.scrollTop > 400 || window.scrollY > 400); };
    sec.addEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll);
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'auto' });
      sec.scrollTop = 0;
    });
  });
}
