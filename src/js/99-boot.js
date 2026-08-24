fillSel();
fillDeepSel();
buildAll();
buildFilterUI();
draw();
initMast();  /* the opening viewport reads its figures from ALLC, so it runs after buildAll */
initBma();      /* fold the analyser's cards before initFold counts them */
initFrontier(); /* and the frontier's entries, for the same reason */
bootWorkspace(); /* before initFold, so the result it renders gets folded like any other output */
initFold();   /* last: wraps each part's body, so everything above must already exist */
initLift();   /* after initFold, which changes document height and so the initial scroll state */
syncStick();  /* the header is laid out by now, so its height can be measured rather than guessed */
initRoute();  /* last: #frontier / #bma / #custom in the address switch to that tab */
initEdFilter(); /* the 26-idea type filter on the Strategy Brief tab */
initEdTop(); /* back-to-top button on the Brainstorm/Strategy tabs */
initFinal(); /* folds the FINAL tab's four stage sections */
initFinal2(); /* scroll-spy for the FINAL 2.0 tab's idea rail and per-plan anchors */
