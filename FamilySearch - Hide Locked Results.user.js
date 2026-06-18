// ==UserScript==
// @name         FamilySearch Hide Locked Results
// @namespace    https://yourname.local
// @version      1.4
// @description  Automatically hides all the blue lock / FamilySearch Center results in Full-Text Search
// @author       Grok-assisted for Tim
// @match        https://www.familysearch.org/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const KEYWORDS = [
        "FamilySearch Center",
        "affiliate library",
        "additional restrictions",
        "viewable with additional restrictions"
    ];

    function hideLocked() {
        const cards = document.querySelectorAll('div[class*="cardCss_"]');
        let hidden = 0;

        cards.forEach(card => {
            if (card.style.display === 'none') return;

            const text = (card.textContent || '').toLowerCase();
            const isLocked = KEYWORDS.some(kw => text.includes(kw.toLowerCase()));

            if (isLocked) {
                card.style.setProperty('display', 'none', 'important');
                hidden++;
            }
        });

        if (hidden > 0) {
            console.log(`[FamilySearch] Hidden ${hidden} locked results`);
        }
    }

    // Run after page loads
    setTimeout(hideLocked, 1500);

    // Keep watching when you apply filters or load more results
    const observer = new MutationObserver(hideLocked);
    observer.observe(document.body, { childList: true, subtree: true });

    // Press "H" on your keyboard to manually re-run it anytime
    document.addEventListener('keydown', e => {
        if (e.key.toLowerCase() === 'h') hideLocked();
    });

    console.log('%c[FamilySearch] Script loaded — locked results will be hidden automatically', 'color:#0a0');
})();