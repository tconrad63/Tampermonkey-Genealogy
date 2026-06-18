// ==UserScript==
// @name         FamilySearch - Force Explore View Button
// @namespace    https://www.familysearch.org/
// @version      0.2
// @description  Adds a button in the top-right corner to switch to ?view=explore mode
// @author       Grok
// @match        https://www.familysearch.org/ark:/*
// @exclude      https://www.familysearch.org/ark:*view=explore*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    function addExploreButton() {
        // Avoid adding the button multiple times
        if (document.getElementById('fs-explore-button')) return;

        const button = document.createElement('button');
        button.id = 'fs-explore-button';
        button.textContent = '🔍 Explore View';
        button.title = 'Switch to ?view=explore mode';

        // Styling - top right corner, nice and visible
        button.style.position = 'fixed';
        button.style.top = '15px';
        button.style.right = '150px';
        button.style.zIndex = '999999';
        button.style.padding = '10px 16px';
        button.style.backgroundColor = '#1a73e8';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '6px';
        button.style.fontSize = '14px';
        button.style.fontWeight = 'bold';
        button.style.cursor = 'pointer';
        button.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
        button.style.transition = 'all 0.2s';

        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#1557b0';
            button.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = '#1a73e8';
            button.style.transform = 'scale(1)';
        });

        button.addEventListener('click', () => {
            let url = new URL(window.location.href);

            // Remove all existing query parameters and set only view=explore
            url.search = '?view=explore';

            // Optional: you can also force thumbnail mode if needed
            // url.searchParams.set('view', 'explore');
            // url.searchParams.set('mode', 'thumbnail'); // or whatever works

            window.location.href = url.toString();
        });

        document.body.appendChild(button);
    }

    // Run immediately and also watch for navigation (FamilySearch is a SPA)
    addExploreButton();

    // Re-add button if the page content changes (common on FamilySearch)
    const observer = new MutationObserver(() => {
        if (!document.getElementById('fs-explore-button')) {
            addExploreButton();
        }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });

})();