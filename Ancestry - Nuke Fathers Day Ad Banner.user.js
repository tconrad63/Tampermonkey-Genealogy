// ==UserScript==
// @name         Ancestry - Nuke Ad Banner
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Completely removes the ad banner and reclaims the full inch of space
// @author       You
// @match        https://www.ancestry.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    //const selector = '#WebOfferRecommendationSpot_us_subs_2026_mothers_day';
    const selector = '#WebOfferRecommendationSpot_us_2026_fathers_day';

    function nukeAd() {
        const ad = document.querySelector(selector);
        if (ad) {
            // Completely delete the element
            ad.remove();

            // Fix any leftover space on parent containers
            let parent = ad.parentElement;
            while (parent && parent !== document.body) {
                parent.style.setProperty('margin-top', '0', 'important');
                parent.style.setProperty('padding-top', '0', 'important');
                parent.style.setProperty('height', 'auto', 'important');
                parent = parent.parentElement;
            }

            // Extra cleanup on body
            document.body.style.setProperty('margin-top', '0', 'important');
            document.documentElement.style.setProperty('padding-top', '0', 'important');

            console.log('✅ Ancestry Mothers Day ad completely removed + space reclaimed');
        }
    }

    // Run immediately and keep watching
    nukeAd();

    new MutationObserver(nukeAd).observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    setInterval(nukeAd, 1000);
})();
