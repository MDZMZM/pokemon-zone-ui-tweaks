// ==UserScript==
// @name         Pokemon-zone.com UI Tweaks
// @namespace    https://github.com/MDZMZM/pokemon-zone-ui-tweaks
// @version      1.0.0
// @description  Dark navy theme, full-width layout, improved grids, and UI overhaul 
// @author       MDZMZM
// @license      MIT
// @match        https://www.pokemon-zone.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pokemon-zone.com
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    /* ==============================================
       CHART.JS CANVAS PATCH
       Overdraw dark canvas text with light text on
       tournament pie charts.  Patches prototype
       BEFORE Chart.js loads.
       ============================================== */
    var NATIVE_FILL = CanvasRenderingContext2D.prototype.fillText;
    CanvasRenderingContext2D.prototype.fillText = function(text, x, y, maxWidth) {
        if (maxWidth !== undefined) NATIVE_FILL.call(this, text, x, y, maxWidth);
        else NATIVE_FILL.call(this, text, x, y);
        if (this.canvas && this.canvas.closest && this.canvas.closest('.tourney-meta-chart-wrapper')) {
            this.save();
            this.fillStyle = '#e0e0e0';
            if (maxWidth !== undefined) NATIVE_FILL.call(this, text, x, y, maxWidth);
            else NATIVE_FILL.call(this, text, x, y);
            this.restore();
        }
    };

    /* ==============================================
       MAIN STYLESHEET
       ============================================== */
    GM_addStyle(`

    /* ==========================================================
       §1  HIDDEN ELEMENTS & SECTION TOGGLE
       ========================================================== */
    .discord-widget,
    .discord-widget__link,
    .global-footer,
    .pz-footer,
    .l-sidebar__sidebar,
    .pz-sidebar__sidebar,
    .pz-section-switcher-row,
    .pz-section-bar { display: none !important; }

    .pz-section-toggle {
        display: inline-flex !important;
        align-items: center !important;
        padding: 4px 10px !important;
        border-radius: 4px !important;
        font-size: 0.75rem !important;
        font-weight: 600 !important;
        text-decoration: none !important;
        white-space: nowrap !important;
        transition: background 0.15s, color 0.15s !important;
    }
    .pz-section-toggle--inactive {
        background-color: #3a3a5c !important;
        color: #888 !important;
        border: 1px solid #444470 !important;
    }
    .pz-section-toggle--inactive:hover { background-color: #4a4a6c !important; color: #e0e0e0 !important; }
    .pz-section-toggle--active {
        background-color: #ffc424 !important;
        color: #1a1a2e !important;
        border: 1px solid #ffc424 !important;
    }
    .pz-section-toggle-wrap {
        display: flex !important;
        align-items: center !important;
        gap: 4px !important;
        margin-right: 10px !important;
    }

    .pz-sidebar {
        grid-template-columns: 1fr !important;
        grid-template-areas: "main" !important;
        column-gap: 0 !important;
    }

    /* ==========================================================
       §2  WIDER WISHLIST GRID
       ========================================================== */
    main.pz-content > .container {
        max-width: none !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
    .player-wishlist-card-list.card-grid.card-grid--size-3-6 {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)) !important;
        gap: 0.75rem !important;
        width: 100% !important;
    }
    @media (min-width: 1200px) {
        .player-wishlist-card-list.card-grid.card-grid--size-3-6 {
            grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)) !important;
        }
    }
    @media (min-width: 1600px) {
        .player-wishlist-card-list.card-grid.card-grid--size-3-6 {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)) !important;
        }
    }

    /* ==========================================================
       §3  GLOBAL DARK BASE
       ========================================================== */
    html, body                { background-color: #1a1a2e !important; }
    .pz-header                { background-color: #1a1a2e !important; }
    .pz-content__content      { background-color: #1a1a2e !important; color: #e0e0e0 !important; }

    .pz-content__content *:not(img):not(svg):not(canvas) {
        color: #e0e0e0 !important;
    }
    .pz-content__content h1,
    .pz-content__content h2,
    .pz-content__content h3,
    .pz-content__content h4 { color: #ffffff !important; }

    .pz-content__content a                      { color: #7eb8ff !important; }
    .pz-content__content a:hover                { color: #ffc424 !important; }
    .pz-content__content a.router-link-active,
    .pz-content__content a.router-link-exact-active { color: #ffc424 !important; }

    /* ==========================================================
       §4  USER MENU
       ========================================================== */
    .user-menu__popout .content-box,
    .user-menu__popout .content-box *:not(img):not(svg):not(canvas) {
        color: #e0e0e0 !important;
    }
    .user-menu__popout .content-box a       { color: #7eb8ff !important; }
    .user-menu__popout .content-box a:hover { color: #ffc424 !important; }

    .user-menu__popout .content-box .heading-container,
    .user-menu__popout .content-box .heading-container *:not(img):not(svg):not(canvas),
    .user-menu__popout .content-box .button--primary,
    .user-menu__popout .content-box .button--primary *:not(img):not(svg):not(canvas) {
        color: #1a1a2e !important; text-shadow: none !important;
    }

    /* ==========================================================
       §5  MOBILE NAV
       ========================================================== */
    .pz-mobile-menu__panel { background-color: #1a1a2e !important; }
    .pz-mobile-menu__panel *:not(img):not(svg):not(canvas) { color: #e0e0e0 !important; }
    .pz-mobile-menu__panel a       { color: #7eb8ff !important; }
    .pz-mobile-menu__panel a:hover { color: #ffc424 !important; }
    .pz-mobile-menu__panel svg     { fill: #c0c0d0 !important; }
    .pz-mobile-menu__header        { border-bottom: 1px solid #444470 !important; }
    .pz-mobile-nav__item           { border-color: #444470 !important; }
    .pz-mobile-nav__link           { color: #e0e0e0 !important; }
    .pz-mobile-nav__link:hover     { color: #ffc424 !important; }
    .pz-mobile-nav__submenu        { background-color: #2a2a4a !important; }
    .pz-mobile-nav__submenu a      { color: #7eb8ff !important; }
    .pz-mobile-nav__submenu a:hover { color: #ffc424 !important; }

    /* ==========================================================
       §6  YELLOW ELEMENT BACKGROUNDS
       ========================================================== */
    .heading-container              { background-color: #ffc424 !important; }
    .set-summary-card__content      { background-color: #ffc424 !important; }
    .article-content-menu__header   { background-color: #ffc424 !important; }
    .button--primary                { background-color: #ffc424 !important; }
    .pz-pagination__link--is-active { background-color: #ffc424 !important; }

    /* ==========================================================
       §7  DARK-THEMED CONTAINERS
       ========================================================== */
    .pz-content__content .player-deck-card__number,
    .pz-content__content .theme-collection-mission-card,
    .pz-content__content .theme-collection-mission-card *:not(img):not(svg):not(canvas),
    .pz-content__content .mission-list-card,
    .pz-content__content .mission-list-card *:not(img):not(svg):not(canvas),
    .pz-content__content .pz-article-preview,
    .pz-content__content .pz-article-preview *:not(img):not(svg):not(canvas) {
        color: #1a1a2e !important;
    }

    .expansion-pack-set-card       { background-color: #2a2a4a !important; border: 1px solid #444470 !important; border-radius: 8px !important; box-shadow: none !important; }
    .expansion-pack-set-card__image { background-image: linear-gradient(to right top, #1a1a2e, #2a2a4a) !important; }
    .rarity-group-bar              { background-color: #2a2a4a !important; border: 1px solid #444470 !important; border-radius: 6px !important; box-shadow: none !important; align-items: center !important; flex-shrink: 1 !important; min-width: 0 !important; padding: 0 6px !important; font-size: 0.85rem !important; }
    .rarity-group-bar .rarity-group-icon__icon { background-color: #ffffff !important; }
    .flex.row-gap-2.gap-x-6.justify-center.flex-wrap { flex-wrap: nowrap !important; gap: 0.4rem !important; }
    .grid.gap-6.align-content-start { align-items: start !important; gap: 0.5rem !important; height: min-content !important; }
    .common-item-icon__preview     { background-color: #2a2a4a !important; border: 1px solid #444470 !important; box-shadow: none !important; }
    .product-price-bar             { background-color: #2a2a4a !important; border: 1px solid #444470 !important; box-shadow: none !important; }
    .player-deck-card__name        { background-color: #2a2a4a !important; border: 1px solid #444470 !important; border-radius: 6px !important; box-shadow: none !important; }
    .theme-collection-mission-card { background-color: #ffffff !important; border: 1px solid #d0d0d0 !important; border-radius: 8px !important; }
    .mission-list-card             { background-color: #ffffff !important; border: 1px solid #d0d0d0 !important; border-radius: 8px !important; }
    .pz-article-preview            { background-color: #ffffff !important; border: 1px solid #d0d0d0 !important; border-radius: 8px !important; }

    /* Amount badges & card-count (0,3,0 beats §7's 0,2,3) */
    .pz-content__content .common-item-icon__amount.common-item-icon__amount {
        background-image: linear-gradient(to right, rgba(20,20,40,0.85), rgba(30,30,55,0.95)) !important;
        color: #ffffff !important;
    }
    .pz-content__content .theme-collection-mission-card__card-count.theme-collection-mission-card__card-count {
        background-image: linear-gradient(to right, rgba(20,20,40,0.85), rgba(30,30,55,0.95)) !important;
        color: #ffffff !important;
    }

    /* ==========================================================
       §8  CARD DETAIL PAGE
       ========================================================== */
    .pz-content__content .card-detail__content-body.card-detail__content-body {
        background-color: #1a1a2e !important;
        border: 1px solid #444470 !important;
        border-radius: 8px !important;
    }
    .pz-content__content .card-detail__content-body,
    .pz-content__content .card-detail__content-body *:not(img):not(svg):not(canvas) {
        color: #e0e0e0 !important;
    }
    .pz-content__content .card-detail__content-body a { color: #7eb8ff !important; }

    /* ==========================================================
       §9  DARK CONTAINERS  (site-wide)
       ========================================================== */
    .content-box              { background-color: #1a1a2e !important; border-color: #444470 !important; }
    .pz-paper                 { background-color: #2a2a4a !important; border: 1px solid #444470 !important; }
    .meta-deck-link           { background-color: #2a2a4a !important; border: 1px solid #444470 !important; }
    .meta-deck-link__icon     { background-color: #3a3a5c !important; }
    .pz-content__content .meta-deck-link.meta-deck-link *:not(img):not(svg):not(canvas) {
        color: #e0e0e0 !important; text-shadow: none !important;
    }
    .latest-tier-report-block,
    .sync-feature,
    .article-detail__body     { background-color: #1a1a2e !important; }
    .article-content-menu__menu,
    .article-content-menu__list { background-color: #2a2a4a !important; }
    .message                  { background-color: #1a1a2e !important; border: 1px solid #444470 !important; }
    .pz-content__content .message,
    .pz-content__content .message *:not(img):not(svg):not(canvas) { color: #ffffff !important; }

    /* ==========================================================
       §10  SCHEDULE PAGE
       ========================================================== */
    .swiper,
    .schedule-highlight-card__header,
    .shop-group-card,
    .solo-battle-group-card,
    .solo-battle-group-card__difficulty,
    .solo-battle-group-card__date { background-color: #2a2a4a !important; }
    .gold-shop-product-card__body,
    .solo-battle-group-card__header { background-color: #3a3a5c !important; }
    [class*="solo-battle-group-card__battle"] { background-color: #2a2a4a !important; }

    /* ==========================================================
       §10b  CHAMPIONS PAGE
       ========================================================== */
    .battle-pass-season-grid       { grid-template-columns: repeat(6, 1fr) !important; }
    .battle-pass-season-card.battle-pass-season-card,
    .champs-pokemon-card.champs-pokemon-card,
    .team-core-card-wrap,
    .team-core-card,
    .team-core-card__member,
    .build-card__full-member,
    .ts-team-card__summary,
    .champs-listing-card,
    .rental-ticket-card,
    .build-card,
    .champ-stat-grid__tile,
    .battle-pass-level,
    .ts-team-card,
    .tb-analysis__section,
    .tb-stats-sidebar,
    .tb-slot-card,
    .championship-card             { background-color: #2a2a4a !important; border: 1px solid #444470 !important; box-shadow: none !important; }
    .team-core-card__pokemon,
    .team-core-card__stats,
    .champs-tournament-card__tag,
    .ts-filter__bar,
    .reward-card__icon,
    .seg-toggle,
    .tb-btn,
    .rank-delta                    { background-color: #3a3a5c !important; }
    .tb-btn                        { border: 1px solid #444470 !important; }
    .champs-tournament-card__tag,
    .seg-toggle__option,
    .rank-delta                    { color: #e0e0e0 !important; }
    .pz-section-switcher           { box-shadow: none !important; }
    .champs-stat-btn,
    .champs-stat-btn *:not(img):not(svg):not(canvas),
    .champs-home-btn,
    .champs-home-btn *:not(img):not(svg):not(canvas),
    .champs-import-btn,
    .champs-import-btn *:not(img):not(svg):not(canvas) { color: #1a1a2e !important; }
    .champs-tournament-card__pinned-tag { background-color: #ffc424 !important; color: #1a1a2e !important; }

    /* ==========================================================
       §11  TRADE SEARCH
       ========================================================== */
    .trade-player-results {
        display: flex !important;
        flex-wrap: wrap !important;
        gap: 10px !important;
    }
    .trade-player-result {
        background-color: #2a2a4a !important;
        border: 1px solid #444470 !important;
        border-radius: 8px !important;
        width: calc(50% - 5px) !important;
        box-sizing: border-box !important;
    }
    .trade-player-result *:not(img):not(svg):not(canvas) { color: #e0e0e0 !important; }

    /* ==========================================================
       §12  ACCESSORIES
       ========================================================== */
    .accessory-card {
        background-color: #2a2a4a !important;
        background-image: none !important;
        border: 1px solid #444470 !important;
    }

    /* ==========================================================
       §13  ADVANCED SEARCH TOGGLES
       ========================================================== */
    .triple-toggle__track { background-color: #3a3a5c !important; }
    .pz-content__content .triple-toggle__label--is-active { color: #1a1a2e !important; }

    /* ==========================================================
       §14  FILTER MODAL
       ========================================================== */
    .ReactModal__Content.ReactModal__Content.modal,
    .ReactModal__Content.ReactModal__Content--after-open.modal,
    div.ReactModal__Content.modal {
        background-color: #2a2a4a !important;
        border: 1px solid #444470 !important;
        color: #e0e0e0 !important;
    }
    .ReactModal__Content *:not(img):not(svg):not(canvas) { color: #e0e0e0 !important; }
    .ReactModal__Content h1, .ReactModal__Content h2,
    .ReactModal__Content h3, .ReactModal__Content h4 { color: #7eb8ff !important; }
    .ReactModal__Content label,
    .ReactModal__Content .card-filters__label { color: #7eb8ff !important; }
    .ReactModal__Content .form-control {
        background-color: #1a1a2e !important; color: #e0e0e0 !important; border-color: #444470 !important;
    }
    .ReactModal__Content .button {
        background-color: #3a3a5c !important; color: #e0e0e0 !important; border-color: #444470 !important;
    }
    .ReactModal__Content .button *:not(img):not(svg):not(canvas) { color: #e0e0e0 !important; }
    .ReactModal__Content .triple-toggle__label { color: #c0c0d0 !important; }
    .ReactModal__Content .triple-toggle__label--is-active { color: #1a1a2e !important; }

    /* ==========================================================
       §15  ARTICLE GRIDS
       ========================================================== */
    .pz-featured-article-panel {
        max-width: none !important;
        display: grid !important;
        grid-template-columns: repeat(5, 1fr) !important;
        gap: 1.5rem !important;
    }
    .pz-featured-article-preview     { max-width: 100% !important; }
    .pz-featured-article-preview__primary {
        grid-template-rows: auto auto auto !important;
        height: auto !important;
    }
    .pz-featured-article-preview__poster-img {
        max-height: 300px !important;
        object-fit: cover !important;
        width: 100% !important;
    }

    /* ==========================================================
       §16  PROFILE PAGE
       ========================================================== */
    .player-detail-header__subnav-item--is-active .player-detail-header__subnav-link {
        border-bottom-color: #ffc424 !important;
    }
    .player-detail-header {
        background-image: linear-gradient(-15deg, #1a1a3e, #252547) !important;
        border-color: #444470 !important;
    }
    .player-detail-header__nav-trigger {
        background-image: linear-gradient(to top, #1a1a3e, #252547) !important;
    }
    .player-detail-header__profile { background-color: #2a2a4a !important; border-color: #444470 !important; }
    .trophy-summary__stand         { background-color: #2a2a4a !important; }
    .trophy-summary__stand::before  { background-color: #3a3a5c !important; }
    .trophy-summary__stand::after   { background-color: #2a2a4a !important; }
    .rarity-group-icon__icon       { background-color: #3a3a5c !important; }
    .card-dot-grid__cell:not(.card-dot-grid__cell--is-collected) {
        background-color: #2a2a4a !important; border-color: #444470 !important;
        filter: none !important; box-shadow: none !important;
    }

    /* ==========================================================
       §17  BINDERS / DISPLAY BOARDS / PLAY SETS
       ========================================================== */
    .play-set-row { background-color: #2a2a4a !important; border-color: #444470 !important; }
    .play-set-row *:not(img):not(svg):not(canvas) { color: #e0e0e0 !important; }

    .player-album.player-album {
        display: flex !important;
        flex-direction: row !important;
        gap: 1rem !important;
        align-items: flex-start !important;
        overflow: visible !important;
    }
    .player-album__hero {
        flex: 0 0 30% !important;
        max-width: 500px !important;
        min-width: 200px !important;
        align-self: stretch !important;
        border-radius: 8px !important;
        background-size: cover !important;
        background-position: center center !important;
    }
    .player-album__body { flex: 1 !important; min-width: 0 !important; }
    .pz-content__content .player-album__name.player-album__name { color: #1a1a2e !important; }
    .player-album__cards {
        grid-template-columns: repeat(10, 1fr) !important;
        gap: 0.4rem !important;
    }

    .player-album-card__preview,
    .player-mount-card__preview { background-color: #2a2a4a !important; }
    .player-album-card *:not(img):not(svg):not(canvas),
    .player-mount-card *:not(img):not(svg):not(canvas) { color: #e0e0e0 !important; }

    /* ==========================================================
       §18  PAGINATION
       ========================================================== */
    .pz-pagination__link {
        background-color: #2a2a4a !important;
        border-color: #444470 !important;
        color: #e0e0e0 !important;
    }
    .pz-pagination__link *:not(img):not(svg):not(canvas) { color: #e0e0e0 !important; }

    /* ==========================================================
       §19  BUTTONS
       ========================================================== */
    .pz-content__content .button:not(.button--primary):not(.button--danger) {
        background-color: #3a3a5c !important;
        color: #e0e0e0 !important;
        border-color: #4a4a6c !important;
    }
    .pz-content__content .button:not(.button--primary):not(.button--danger):hover {
        background-color: #4a4a6c !important;
    }

    /* ==========================================================
       §20  BORDERS & ICONS
       ========================================================== */
    .pz-sidebar, .card-grid__cell, .trophy-summary { border-color: #444470 !important; }
    .pz-content__content svg.ico { fill: #c0c0d0 !important; }
    .card-grid__cell img,
    .common-item-icon__preview img,
    .player-detail-header__avatar img { filter: none !important; }

    /* ==========================================================
       §21  FORMS / INPUTS / DROPDOWNS
       ========================================================== */
    .pz-content__content input,
    .pz-content__content select,
    .pz-content__content textarea {
        background-color: #2a2a4a !important;
        color: #e0e0e0 !important;
        border-color: #444470 !important;
    }
    .card-search-controls,
    .card-search-controls__search { background-color: transparent !important; }

    [class*="css-"][class*="-control"]  { background-color: #2a2a4a !important; border-color: #444470 !important; }
    [class*="css-"][class*="-menu"]     { background-color: #2a2a4a !important; border-color: #444470 !important; }
    [class*="css-"][class*="-option"]   { background-color: #2a2a4a !important; color: #e0e0e0 !important; }
    [class*="css-"][class*="-option"]:hover { background-color: #3a3a5c !important; }
    [class*="-singleValue"]        { color: #e0e0e0 !important; }
    [class*="-placeholder"]        { color: #888 !important; }
    [class*="-indicatorSeparator"] { background-color: #444470 !important; }

    .dropdown__content, .dropdown__menu, .dropdown-menu {
        background-color: #2a2a4a !important; border-color: #444470 !important;
    }
    .dropdown-item       { color: #e0e0e0 !important; }
    .dropdown-item:hover { background-color: #3a3a5c !important; }

    /* ==========================================================
       §22  TABLES
       ========================================================== */
    .pz-content__content table       { border-color: #444470 !important; }
    .pz-content__content th          { background-color: #2a2a4a !important; }
    .pz-content__content td          { background-color: #1a1a2e !important; }
    .pz-content__content tr:hover td { background-color: #2a2a4a !important; }

    /* ==========================================================
       §23  CATCH-ALL
       ========================================================== */
    [class*="content-box"],
    [class*="block-table"],
    [class*="sync-feature"],
    [class*="tier-report"] {
        background-color: #1a1a2e !important;
    }

    /* ==========================================================
       §24  DARK TEXT ON YELLOW BACKGROUNDS
       Doubled class selectors (0,2,0) beat the global rule (0,1,3).
       ========================================================== */
    .heading-container.heading-container,
    .set-summary-card__content.set-summary-card__content,
    .article-content-menu__header.article-content-menu__header,
    .button--primary.button--primary,
    .theme-collection-mission-card__header.theme-collection-mission-card__header {
        color: #1a1a2e !important;
        text-shadow: none !important;
    }
    .heading-container.heading-container *:not(img):not(svg):not(canvas),
    .set-summary-card__content.set-summary-card__content *:not(img):not(svg):not(canvas),
    .article-content-menu__header.article-content-menu__header *:not(img):not(svg):not(canvas),
    .button--primary.button--primary *:not(img):not(svg):not(canvas),
    .theme-collection-mission-card__header.theme-collection-mission-card__header *:not(img):not(svg):not(canvas) {
        color: #1a1a2e !important;
        text-shadow: none !important;
    }

    .article-detail__body.article-detail__body h2,
    .article-detail__body.article-detail__body h3,
    .article-detail.article-detail h2,
    .article-detail.article-detail h3,
    .l-article__main.l-article__main h2,
    .l-article__main.l-article__main h3 {
        color: #1a1a2e !important;
        text-shadow: none !important;
    }

    .user-menu__popout .button--primary,
    .user-menu__popout .button--primary *:not(img):not(svg):not(canvas),
    .play-set-row .heading-container,
    .play-set-row .heading-container *:not(img):not(svg):not(canvas),
    .play-set-row .my-2,
    .play-set-row .my-2 *:not(img):not(svg):not(canvas) {
        color: #1a1a2e !important;
        text-shadow: none !important;
    }

    .article-callout-category.article-callout-category,
    .article-callout-category.article-callout-category *:not(img):not(svg):not(canvas) {
        color: #ffffff !important;
        text-shadow: none !important;
    }

    .card-filters__button.card-filters__button--is-active,
    .card-filters__button.card-filters__button--is-active *:not(img):not(svg):not(canvas) {
        color: #1a1a2e !important;
        text-shadow: none !important;
    }

    .pz-pagination__link.pz-pagination__link--is-active,
    .pz-pagination__link.pz-pagination__link--is-active *:not(img):not(svg):not(canvas) {
        background-color: #ffc424 !important;
        color: #1a1a2e !important;
    }

    /* Modal buttons: 0,3,0 beats §24's 0,2,0 */
    .ReactModal__Content .button.button--primary.button--primary,
    .ReactModal__Content .button.button--primary.button--primary *:not(img):not(svg):not(canvas),
    .ReactModal__Content .button.button,
    .ReactModal__Content .button.button *:not(img):not(svg):not(canvas) {
        color: #e0e0e0 !important;
    }

    `); /* end main GM_addStyle */

    /* ==========================================================
       PAGE-SPECIFIC OVERRIDES
       ========================================================== */
    if (window.location.pathname === '/') {
        GM_addStyle(`.pz-featured-article-panel { grid-template-columns: repeat(4, 1fr) !important; }`);
    }

    var SIDEBAR_RESTORE = `
        .pz-sidebar__sidebar { display: block !important; }
        .pz-sidebar {
            grid-template-columns: 1fr 310px !important;
            grid-template-areas: "main sidebar" !important;
            column-gap: 20px !important;
        }
        .pz-sidebar__sidebar .content-box {
            background-color: #2a2a4a !important;
            border: 1px solid #444470 !important;
            border-radius: 8px !important;
        }
        .pz-sidebar__sidebar a       { color: #7eb8ff !important; }
        .pz-sidebar__sidebar a:hover { color: #ffc424 !important; }
    `;

    if (window.location.pathname.startsWith('/schedule')) {
        GM_addStyle(SIDEBAR_RESTORE + `
            .pz-sidebar__sidebar .article-content-menu__header {
                background-color: #ffc424 !important;
                border-radius: 8px 8px 0 0 !important;
            }
            .pz-sidebar__sidebar .article-content-menu__header,
            .pz-sidebar__sidebar .article-content-menu__header *:not(img):not(svg):not(canvas) {
                color: #1a1a2e !important;
            }
            .pz-sidebar__sidebar .article-content-menu__menu,
            .pz-sidebar__sidebar .article-content-menu__list { background-color: #2a2a4a !important; }
            .pz-sidebar__sidebar a.router-link-active,
            .pz-sidebar__sidebar a.router-link-exact-active { color: #ffc424 !important; }
            .pz-sidebar__sidebar .pz-sidebar__sidebar-sticky { background-color: transparent !important; }
        `);
    }

    if (/^\/cards\/.+\/.+\//.test(window.location.pathname)) {
        GM_addStyle(SIDEBAR_RESTORE);
    }

    /* ==========================================================
       JS RUNTIME FIXES
       ========================================================== */
    var _fixTimer = 0;

    function fixYellowText() {
        var modal = document.querySelector('.ReactModal__Content.modal');
        if (modal) {
            modal.style.setProperty('background-color', '#2a2a4a', 'important');
        }

        var sel = [
            '.heading-container', '.button--primary',
            '.set-summary-card__content', '.article-content-menu__header',
            '.theme-collection-mission-card__header',
            '.pz-pagination__link--is-active',
            '.card-filters__button--is-active'
        ].join(',');

        document.querySelectorAll(sel).forEach(function(el) {
            if (el.closest('.ReactModal__Content')) return;
            el.style.setProperty('color', '#1a1a2e', 'important');
            el.style.setProperty('text-shadow', 'none', 'important');
            el.querySelectorAll('*:not(img):not(svg):not(canvas)').forEach(function(ch) {
                if (ch.classList.contains('common-item-icon__amount') ||
                    ch.classList.contains('theme-collection-mission-card__card-count') ||
                    ch.closest('.common-item-icon__amount') ||
                    ch.closest('.theme-collection-mission-card__card-count')) {
                    ch.style.setProperty('color', '#ffffff', 'important');
                    return;
                }
                ch.style.setProperty('color', '#1a1a2e', 'important');
                ch.style.setProperty('text-shadow', 'none', 'important');
            });
        });
    }

    function fixChampionsBg() {
        if (!location.pathname.startsWith('/champions')) return;
        var root = document.querySelector('.pz-content__content');
        if (!root) return;
        root.querySelectorAll('*').forEach(function(el) {
            var bg = getComputedStyle(el).backgroundColor;
            if (bg.indexOf('color(srgb') !== -1) {
                var sm = bg.match(/color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
                if (sm && parseFloat(sm[1]) > 0.6 && parseFloat(sm[2]) > 0.6 && parseFloat(sm[3]) > 0.6) {
                    el.style.setProperty('background-color', '#2a2a4a', 'important');
                }
                return;
            }
            var m = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (!m) return;
            var r = parseInt(m[1]), g = parseInt(m[2]), b = parseInt(m[3]);
            if ((r + g + b) / 3 < 150) return;
            if (r > 200 && g > 150 && b < 100) return;
            if (r > 200 && g < 100) return;
            if (r < 100 && g < 100 && b > 200) return;
            if (Math.abs(r - g) > 30 || Math.abs(g - b) > 30) return;
            el.style.setProperty('background-color', '#2a2a4a', 'important');
        });
    }

    function injectSectionToggle() {
        if (document.querySelector('.pz-section-toggle-wrap')) return;
        var headerInner = document.querySelector('.pz-header__inner');
        if (!headerInner) return;
        var logo = headerInner.querySelector('.pz-header__logo');
        if (!logo) return;

        var isChampions = location.pathname.startsWith('/champions');
        var wrap = document.createElement('div');
        wrap.className = 'pz-section-toggle-wrap';

        var pocket = document.createElement('a');
        pocket.href = '/';
        pocket.className = 'pz-section-toggle ' + (isChampions ? 'pz-section-toggle--inactive' : 'pz-section-toggle--active');
        pocket.textContent = 'TCG Pocket';

        var champs = document.createElement('a');
        champs.href = '/champions/';
        champs.className = 'pz-section-toggle ' + (isChampions ? 'pz-section-toggle--active' : 'pz-section-toggle--inactive');
        champs.textContent = 'Champions';

        wrap.appendChild(pocket);
        wrap.appendChild(champs);
        headerInner.insertBefore(wrap, logo);
    }

    function runFixes() {
        injectSectionToggle();
        fixYellowText();
        fixChampionsBg();
    }

    function boot() {
        runFixes();
        setTimeout(runFixes, 1000);
        setTimeout(runFixes, 3000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

    var obs = new MutationObserver(function() {
        clearTimeout(_fixTimer);
        _fixTimer = setTimeout(runFixes, 150);
    });
    if (document.body) {
        obs.observe(document.body, { childList: true, subtree: true });
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            obs.observe(document.body, { childList: true, subtree: true });
        });
    }
})();
