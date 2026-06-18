// ==UserScript==
// @name         Ancestry DNA - Shared Matches Button
// @namespace    https://ancest4.com/
// @version      1.7-final
// @description  Uses real href from name link + forces 50/page + preserves filters
// @author       Grok + Tim Conrad
// @match        https://www.ancestry.com/dna/matches*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const BUTTON_TEXT = '🔗 Shared Matches';
    const BUTTON_STYLE = `
        background: #e61e2b;
        color: white;
        border: none;
        padding: 3px 6px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
        font-weight: bold;
        margin-left: auto;
        white-space: nowrap;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    `;

    function getCurrentFilters() {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        let filters = '?itemsPerPage=50';

        if (params.has('surname')) {
            filters += `&surname=${encodeURIComponent(params.get('surname'))}`;
        }
        if (params.has('parentalSides')) {
            filters += `&parentalSides=${encodeURIComponent(params.get('parentalSides'))}`;
        }
        return filters;
    }

    function addButtons() {
        const matchCards = document.querySelectorAll('div[class*="MatchCard"], div[data-testid*="match"], article');
        // === More specific selectors for individual match rows only FIX LATER... ===
        /*const matchCards = document.querySelectorAll(`
            div[class*="MatchCard"],
            div[data-testid*="match-card"],
            article,
            div[role="listitem"],
            div[class*="matchInfo"],  // TRC
            div[class*="matchlistentry"],
            div[class*="match-entry"]
        `);*/

        matchCards.forEach(card => {
            if (card.querySelector('.tim-shared-matches-btn')) return;

            // Skip headers, footers, pagination, and summary rows
            /*if (card.closest('header') ||
                card.closest('footer') ||
                card.textContent.includes('Items per page') ||
                card.textContent.includes('Shared match:') ||
                card.classList.toString().includes('header') ||
                card.classList.toString().includes('pagination')) {
                return;
            } */

            // Find the name link — it already has the perfect href with both IDs
            const nameLink = card.querySelector('a[href*="/compare/"]') ||
                            card.querySelector('a[href*="/dna/matches/"]');
            if (!nameLink) return;

            const originalHref = nameLink.getAttribute('href');
            if (!originalHref) return;

            const button = document.createElement('button');
            button.className = 'tim-shared-matches-btn';
            button.innerHTML = BUTTON_TEXT;
            button.style.cssText = BUTTON_STYLE;

            button.addEventListener('click', (e) => {
                e.stopImmediatePropagation();

                // Take the base path from the real link and replace query params
                let baseUrl = originalHref.split('?')[0];   // remove existing query

                // Ensure we go into shared-matches mode
                if (!baseUrl.includes('/shared-matches')) {
                    baseUrl = baseUrl + '/shared-matches';
                }

                const fullUrl = baseUrl + getCurrentFilters();

                console.log('🔗 Opening:', fullUrl);
                window.open(fullUrl, '_blank');
            });

            // Right-aligned
            card.style.display = 'flex';
            card.style.alignItems = 'center';
            card.style.flexWrap = 'wrap';
            card.style.gap = '8px';
            card.appendChild(button);
        });
    }

    const observer = new MutationObserver(addButtons);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('load', () => {
        setTimeout(addButtons, 1200);
        setTimeout(addButtons, 3500);
    });
})();