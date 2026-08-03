fillSel();
fillDeepSel();
buildAll();
buildFilterUI();
draw();
initFold();   /* last: wraps each part's body, so everything above must already exist */
initLift();   /* after initFold, which changes document height and so the initial scroll state */
