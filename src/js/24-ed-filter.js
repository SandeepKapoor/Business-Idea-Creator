/* The 26-idea filter on the Strategy Brief tab (#ed-b-ideas), reproduced from
   combined-design-education.html unchanged: click a pill, show only ideas of that type, and hide
   any cluster left with nothing showing. */
function initEdFilter(){
  const btns = document.querySelectorAll('.ed-original .filters button');
  const ideas = document.querySelectorAll('.ed-original .idea[data-type]');
  const clusters = document.querySelectorAll('.ed-original .cluster');
  btns.forEach((b) => {
    b.addEventListener('click', () => {
      btns.forEach((x) => x.classList.remove('on'));
      b.classList.add('on');
      const f = b.dataset.f;
      ideas.forEach((i) => { i.classList.toggle('hide', f !== 'all' && i.dataset.type !== f); });
      clusters.forEach((c) => {
        c.style.display = c.querySelectorAll('.idea:not(.hide)').length ? '' : 'none';
      });
    });
  });
}
