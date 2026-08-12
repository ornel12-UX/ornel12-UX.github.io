/* Picard Crédit Solutions - main.js */
(function () {
  'use strict';

  const STORAGE_KEY = 'pcs_lang';
  const DEFAULT_LANG = 'fr';

  const I = window.PCS_I18N || { dict: {}, langs: ['fr'], labels: {}, flags: {} };

  function getLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && I.langs.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function setLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    applyTranslations(lang);
    document.documentElement.lang = lang;
    document.dispatchEvent(new CustomEvent('pcs:langchange', { detail: { lang } }));
  }

  function t(lang, key, fb) {
    const d = (I.dict && I.dict[lang]) || {};
    if (d[key] !== undefined) return d[key];
    const fallback = (I.dict && I.dict[DEFAULT_LANG]) || {};
    if (fallback[key] !== undefined) return fallback[key];
    return fb !== undefined ? fb : key;
  }
  window.pcsT = function (key) { return t(getLang(), key); };

  function applyTranslations(lang) {
    const nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const val = t(lang, key);
      if (typeof val === 'string') el.textContent = val;
    });
    const attrs = document.querySelectorAll('[data-i18n-attr]');
    attrs.forEach(function (el) {
      // data-i18n-attr="placeholder:key,aria-label:key2"
      const cfg = el.getAttribute('data-i18n-attr') || '';
      cfg.split(',').forEach(function (pair) {
        const parts = pair.split(':');
        if (parts.length !== 2) return;
        const attr = parts[0].trim();
        const key = parts[1].trim();
        const val = t(lang, key);
        if (typeof val === 'string') el.setAttribute(attr, val);
      });
    });
    // Shortcut: data-i18n-placeholder="key"
    const phs = document.querySelectorAll('[data-i18n-placeholder]');
    phs.forEach(function (el) {
      const key = el.getAttribute('data-i18n-placeholder');
      if (!key) return;
      const val = t(lang, key);
      if (typeof val === 'string') el.setAttribute('placeholder', val);
    });
  }
  window.pcsApplyTranslations = applyTranslations;

  /* ============ ICONS (inline SVG) ============ */
  const ICON = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 1-15.9 5.8L3 15"/><path d="M3 12a9 9 0 0 1 15.9-5.8L21 9"/><path d="M21 3v6h-6"/><path d="M3 21v-6h6"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M2 13h20"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
    hammer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2.5 21 9l-4 4-6.5-6.5z"/><path d="m12 7-8 8 3 3 8-8"/><path d="m5 19-2 2"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.9L22 10l-5.4 4.7L18.2 22 12 18l-6.2 4 1.6-7.3L2 10l7.1-1.1z"/></svg>',
    sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    trend: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
    wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"/><path d="M16 12h6"/><circle cx="17" cy="12" r="1" fill="currentColor"/></svg>',
  };
  window.PCS_ICON = ICON;

  /* ============ NAV + FOOTER INJECTION ============ */
  const NAV_ITEMS = [
    { key: 'Accueil', href: '/index.html', id: 'home' },
    { key: 'Nos Services', href: '/services/index.html', id: 'services', children: [
      { key: 'Crédit immobilier', href: '/services/credit-immobilier.html' },
      { key: 'Rachat de crédit', href: '/services/rachat-credit.html' },
      { key: 'Assurance prêt', href: '/services/assurance-pret.html' },
      { key: 'Prêt professionnel', href: '/services/pret-professionnel.html' }
    ] },
    { key: 'Villes', href: '/villes/index.html', id: 'villes' },
    { key: 'Outils', href: '/outils/index.html', id: 'outils' },
    { key: 'Avis Clients', href: '/avis-clients.html', id: 'avis' },
    { key: 'À Propos', href: '/a-propos.html', id: 'apropos' },
    { key: 'FAQ', href: '/faq.html', id: 'faq' },
    { key: 'Blog', href: '/blog/index.html', id: 'blog' },
    { key: 'Contact', href: '/contact.html', id: 'contact' },
  ];

  /* WhatsApp config */
  const WA_NUMBER = '33756823279'; // company WhatsApp (international format, no '+')
  const WA_ICON = '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16.003 3.2c-7.074 0-12.8 5.726-12.8 12.8 0 2.26.593 4.466 1.72 6.41L3.2 28.8l6.58-1.712a12.742 12.742 0 006.222 1.58h.001c7.073 0 12.8-5.727 12.8-12.8s-5.727-12.67-12.8-12.67zm0 23.36c-1.918 0-3.79-.517-5.425-1.494l-.389-.23-3.903 1.016 1.04-3.8-.253-.39a10.56 10.56 0 01-1.62-5.662c0-5.84 4.75-10.59 10.59-10.59s10.59 4.75 10.59 10.59-4.753 10.56-10.59 10.56h-.04zm5.8-7.924c-.317-.159-1.883-.93-2.176-1.036-.293-.107-.507-.159-.72.16-.214.317-.828 1.036-1.015 1.25-.187.212-.374.24-.692.08-.317-.16-1.34-.495-2.55-1.578-.942-.84-1.578-1.879-1.763-2.197-.186-.317-.02-.49.14-.648.143-.143.317-.374.475-.56.159-.186.213-.318.32-.532.106-.213.053-.4-.027-.559-.08-.16-.72-1.733-.986-2.373-.26-.624-.527-.54-.72-.55l-.615-.012c-.213 0-.56.08-.853.4-.293.317-1.12 1.093-1.12 2.666 0 1.574 1.146 3.093 1.306 3.306.159.213 2.253 3.44 5.465 4.823.764.33 1.36.528 1.824.676.767.245 1.463.21 2.015.128.615-.092 1.883-.77 2.15-1.513.267-.744.267-1.38.187-1.513-.08-.134-.293-.213-.614-.374z"/></svg>';

  // Brand logo (inline SVG): upward trending chart + monogram P, rendered as a compact badge
  const LOGO_SVG = '<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">'
    + '<g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none">'
    + '<path d="M12 46 L24 34 L33 40 L48 22" stroke-width="3"/>'
    + '<path d="M44 22 L48 22 L48 26" stroke-width="3"/>'
    + '</g>'
    + '<path d="M20 18 h12 a8 8 0 0 1 0 16 h-7 v10 h-5 z M25 22 v8 h7 a4 4 0 0 0 0-8 z" fill="currentColor" opacity=".95"/>'
    + '<circle cx="48" cy="22" r="2.6" fill="currentColor" opacity=".85"/>'
    + '</svg>';
  const BRAND_MARKUP = '<span class="brand-mark" aria-hidden="true">' + LOGO_SVG + '</span>'
    + '<span class="brand-text">'
    + '<span class="brand-primary">Picard</span>'
    + '<span class="brand-sub">Crédit Solutions</span>'
    + '</span>';

  function renderNav() {
    const activePage = document.body.getAttribute('data-page') || '';
    const navLinks = NAV_ITEMS.map(function (item) {
      const isActive = item.id === activePage ? ' class="is-active"' : '';
      if (item.children && item.children.length) {
        const childLinks = item.children.map(function (child) {
          return '<li><a href="' + child.href + '">' + child.key + '</a></li>';
        }).join('');
        return '<li class="nav-dropdown"><a href="' + item.href + '"' + isActive + '>' + item.key + '</a><ul class="dropdown-menu">' + childLinks + '</ul></li>';
      }
      return '<li><a href="' + item.href + '"' + isActive + '>' + item.key + '</a></li>';
    }).join('');

    const mobileLinks = NAV_ITEMS.map(function (item) {
      const isActive = item.id === activePage ? ' class="is-active"' : '';
      return '<li><a href="' + item.href + '"' + isActive + '>' + item.key + '</a></li>';
    }).join('');

    const navHtml = '\n      <header class="nav" id="mainNav">\n        <div class="nav-inner">\n          <a href="/index.html" class="brand" aria-label="Picard Crédit Solutions">'
      + BRAND_MARKUP
      + '</a>\n          <nav aria-label="Primary">\n            <ul class="nav-links">' + navLinks + '</ul>\n          </nav>\n          <div class="nav-right">\n            <div class="lang-switch">\n              <button class="lang-btn" id="langBtn" aria-haspopup="true" aria-expanded="false">\n                <span id="langFlag">🇨🇵</span><span id="langCode">FR</span>\n                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>\n              </button>\n              <div class="lang-menu" id="langMenu" role="menu"></div>\n            </div>\n            <a href="/demande-credit.html" class="btn nav-cta nav-cta-apply"><span data-i18n="nav.apply">Demander un crédit</span>' + ICON.arrow + '</a>\n            <button class="hamburger" id="hamburger" aria-label="Menu">' + ICON.menu + '</button>\n          </div>\n        </div>\n      </header>\n      <div class="mobile-panel" id="mobilePanel">\n        <div class="mobile-panel-inner">\n          <button class="close" id="mobileClose" aria-label="Close">' + ICON.close + '</button>\n          <ul class="mobile-links">' + mobileLinks + '</ul>\n          <a href="/simulateur.html" class="btn btn-primary" style="justify-content:center;margin-top:8px"><span data-i18n="nav.cta">Simuler</span>' + ICON.arrow + '</a>\n          <a href="/demande-credit.html" class="btn btn-dark" style="justify-content:center;margin-top:10px"><span data-i18n="nav.apply">Demander un crédit</span>' + ICON.arrow + '</a>\n        </div>\n      </div>\n    ';

    const navPlaceholder = document.getElementById('header-placeholder');
    if (navPlaceholder) navPlaceholder.innerHTML = navHtml;
  }

  function renderFooter() {
    const footerHtml = '\n      <footer class="footer">\n        <div class="container">\n          <div class="footer-inner">\n            <div>\n              <a href="/index.html" class="brand" style="color:#fff">' + BRAND_MARKUP + '</a>\n              <p class="footer-desc" data-i18n="footer.desc"></p>\n              <p style="margin-top:18px;color:rgba(255,255,255,0.55);font-size:13px" data-i18n="footer.siren"></p>\n              <a href="https://www.orias.fr/search" target="_blank" rel="noopener" class="footer-orias"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>N\u00b0 ORIAS : 13007456</a>\n              <a href="https://authentiavis.fr/entreprises/picard-credit-solutions" target="_blank" rel="noopener" style="display:inline-block;margin-top:12px"><img src="https://authentiavis.fr/badge/picard-credit-solutions.svg" alt="Note AuthentiAvis" width="240" height="80" loading="lazy" /></a>\n            </div>\n            <div>\n              <h4 data-i18n="footer.services">Services</h4>\n              <ul>\n                <li><a href="/credit-immobilier.html" data-i18n="service.immo"></a></li>\n                <li><a href="/rachat-credits.html" data-i18n="service.rachat"></a></li>\n                <li><a href="/credit-professionnel.html" data-i18n="service.pro"></a></li>\n                <li><a href="/assurance-pret.html" data-i18n="service.assurance"></a></li>\n                <li><a href="/credit-consommation.html" data-i18n="service.conso"></a></li>\n                <li><a href="/credit-travaux.html" data-i18n="service.travaux"></a></li>\n              </ul>\n            </div>\n            <div>\n              <h4 data-i18n="footer.company">Société</h4>\n              <ul>\n                <li><a href="/a-propos.html">À Propos</a></li>\n                <li><a href="/services/index.html">Nos Services</a></li>\n                <li><a href="/villes/index.html">Villes</a></li>\n                <li><a href="/outils/index.html">Outils</a></li>\n                <li><a href="/avis-clients.html">Avis Clients</a></li>\n                <li><a href="/faq.html" data-i18n="nav.faq"></a></li>\n                <li><a href="/contact.html" data-i18n="nav.contact"></a></li>\n                <li><a href="/blog/index.html" data-i18n="nav.blog">Blog</a></li>\n              </ul>\n            </div>\n            <div>\n              <h4 data-i18n="footer.legal">Légal</h4>\n              <ul>\n                <li><a href="/mentions-legales.html" data-i18n="footer.legal.mentions"></a></li>\n                <li><a href="/politique-confidentialite.html">Politique confidentialité</a></li>\n                <li><a href="mailto:contact@picardfinance.fr">contact@picardfinance.fr</a></li>\n                <li><a href="tel:+33756823279">+33 7 56 82 32 79</a></li>\n              </ul>\n            </div>\n          </div>\n          <div class="footer-bottom">\n            <span data-i18n="footer.copyright"></span>\n            <span>5 Rue Neuve Notre-Dame, 78000 Versailles, France</span>\n          </div>\n        </div>\n      </footer>\n      <button class="to-top" id="toTop" aria-label="Scroll to top">' + ICON.up + '</button>\n    ';
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) footerPlaceholder.innerHTML = footerHtml;
  }

  /* ============ LANGUAGE SWITCHER UI ============ */
  function initLangSwitcher() {
    const btn = document.getElementById('langBtn');
    const menu = document.getElementById('langMenu');
    const codeEl = document.getElementById('langCode');
    const flagEl = document.getElementById('langFlag');
    if (!btn || !menu) return;

    const labels = I.labels || {};
    const flags = I.flags || {};
    const langs = I.langs || ['fr'];
    const current = getLang();

    if (codeEl) codeEl.textContent = current.toUpperCase();
    if (flagEl) flagEl.textContent = flags[current] || '';

    menu.innerHTML = langs.map(function (l) {
      const active = l === current ? ' is-active' : '';
      return '<button type="button" class="lang-option' + active + '" data-lang="' + l + '" onclick="window.__pcsSetLang && window.__pcsSetLang(\'' + l + '\');"><span>' + (flags[l] || '') + '</span> ' + (labels[l] || l) + '</button>';
    }).join('');
    window.__pcsSetLang = function (newLang) {
      setLang(newLang);
      if (codeEl) codeEl.textContent = newLang.toUpperCase();
      if (flagEl) flagEl.textContent = flags[newLang] || '';
      menu.querySelectorAll('.lang-option').forEach(function (o) { o.classList.remove('is-active'); });
      const a = menu.querySelector('.lang-option[data-lang="' + newLang + '"]');
      if (a) a.classList.add('is-active');
      menu.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    };

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      menu.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', menu.classList.contains('is-open') ? 'true' : 'false');
    });
    document.addEventListener('click', function () { menu.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); });
    menu.addEventListener('click', function (e) {
      const opt = e.target.closest('.lang-option');
      if (!opt) return;
      const newLang = opt.getAttribute('data-lang');
      if (!newLang) return;
      setLang(newLang);
      if (codeEl) codeEl.textContent = newLang.toUpperCase();
      if (flagEl) flagEl.textContent = flags[newLang] || '';
      menu.querySelectorAll('.lang-option').forEach(function (o) { o.classList.remove('is-active'); });
      opt.classList.add('is-active');
      menu.classList.remove('is-open');
    });
  }

  /* ============ NAV SCROLL + MOBILE ============ */
  function initNavBehavior() {
    const nav = document.getElementById('mainNav');
    function onScroll() {
      if (!nav) return;
      if (window.scrollY > 12) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const ham = document.getElementById('hamburger');
    const panel = document.getElementById('mobilePanel');
    const closeBtn = document.getElementById('mobileClose');
    function openPanel() { if (panel) panel.classList.add('is-open'); }
    function closePanel() { if (panel) panel.classList.remove('is-open'); }
    if (ham) ham.addEventListener('click', openPanel);
    if (closeBtn) closeBtn.addEventListener('click', closePanel);
    if (panel) panel.addEventListener('click', function (e) {
      if (e.target === panel) closePanel();
    });
    const mobileLinks = document.querySelectorAll('.mobile-links a');
    mobileLinks.forEach(function (a) { a.addEventListener('click', closePanel); });
  }

  /* ============ SCROLL TO TOP ============ */
  function initScrollTop() {
    const btn = document.getElementById('toTop');
    if (!btn) return;
    function update() {
      if (window.scrollY > 400) btn.classList.add('is-visible');
      else btn.classList.remove('is-visible');
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============ REVEAL ON SCROLL ============ */
  function initReveal() {
    const nodes = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('is-visible'); });
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ============ COUNTERS ============ */
  function initCounters() {
    const nodes = document.querySelectorAll('[data-count]');
    if (!nodes.length) return;
    function animate(el) {
      const target = parseFloat(el.getAttribute('data-count') || '0');
      const dur = parseInt(el.getAttribute('data-count-duration') || '1600', 10);
      const decimals = parseInt(el.getAttribute('data-count-decimals') || '0', 10);
      const suffix = el.getAttribute('data-count-suffix') || '';
      const prefix = el.getAttribute('data-count-prefix') || '';
      const start = performance.now();
      function step(now) {
        const elapsed = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - elapsed, 3);
        const val = target * eased;
        el.textContent = prefix + val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + suffix;
        if (elapsed < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if (!('IntersectionObserver' in window)) {
      nodes.forEach(animate);
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ============ FAQ accordion ============ */
  function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(function (item) {
      const q = item.querySelector('.faq-q');
      const a = item.querySelector('.faq-a');
      if (!q || !a) return;
      q.addEventListener('click', function () {
        const open = item.classList.toggle('is-open');
        if (open) {
          a.style.maxHeight = a.scrollHeight + 'px';
        } else {
          a.style.maxHeight = '0px';
        }
      });
    });
    // recompute heights after language change
    document.addEventListener('pcs:langchange', function () {
      setTimeout(function () {
        document.querySelectorAll('.faq-item.is-open .faq-a').forEach(function (el) {
          el.style.maxHeight = el.scrollHeight + 'px';
        });
      }, 50);
    });
  }

  /* ============ MAIL ENDPOINT HELPERS ============ */
  // Détecte l'environnement :
  //   - Si Next.js (Abacus, `/api/send-mail` existe)         → utilise /api/send-mail
  //   - Sinon (Hostinger / hébergement statique + PHP)      → utilise api/send-mail.php
  // Override possible via window.PCS_MAIL_ENDPOINT.
  function mailEndpoints() {
    if (typeof window !== 'undefined' && window.PCS_MAIL_ENDPOINT) {
      return [window.PCS_MAIL_ENDPOINT];
    }
    // Priorité 1 : Next.js API route (fonctionne sur Abacus)
    // Priorité 2 : PHP (fonctionne sur Hostinger)
    return ['/api/send-mail', 'api/send-mail.php'];
  }

  function postOnce(url, payload) {
    return fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (res) {
      return res.text().then(function (txt) {
        var data;
        try { data = txt ? JSON.parse(txt) : null; } catch (e) { data = null; }
        if (!res.ok || !data || data.ok !== true) {
          var err = new Error((data && (data.message || data.error)) || ('HTTP ' + res.status));
          err.status = res.status; err.data = data; err.rawText = txt;
          throw err;
        }
        return data;
      });
    });
  }

  function postMail(payload) {
    var urls = mailEndpoints();
    function tryNext(i, lastErr) {
      if (i >= urls.length) {
        return Promise.reject(lastErr || new Error('no_endpoint'));
      }
      return postOnce(urls[i], payload).catch(function (err) {
        // Si l'endpoint renvoie 404 ou n'existe pas (ex: /api/send-mail sur Hostinger,
        // api/send-mail.php sur Abacus) → on tente le suivant.
        // Si l'erreur est métier (422 validation, 429 rate limit), on NE bascule PAS.
        var st = err && err.status;
        var isMissing = !st || st === 404 || st === 405;
        if (isMissing) return tryNext(i + 1, err);
        throw err;
      });
    }
    return tryNext(0, null);
  }
  function nowFr() {
    try {
      return new Date().toLocaleString(getLang() === 'fr' ? 'fr-FR' : 'en-GB', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
      }).replace(',', ' à');
    } catch (e) { return new Date().toISOString(); }
  }

  function openModalById(id) {
    const m = document.getElementById(id);
    if (!m) return null;
    m.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    return m;
  }
  function closeModalById(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  function wireModalClose(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.addEventListener('click', function (e) {
      if (e.target === m || (e.target.closest && e.target.closest('[data-close]'))) closeModalById(id);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      ['confirmationModal', 'contactModal'].forEach(closeModalById);
    }
  });

  /* ============ CONTACT FORM ============ */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const status = document.getElementById('formStatus');
    const submitBtn = form.querySelector('button[type="submit"]');
    wireModalClose('contactModal');

    // Timestamp pour anti-bot (dur\u00e9e min de remplissage).
    const loadedAt = Date.now();

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (status) { status.textContent = ''; status.classList.remove('is-visible'); }
      const raw = Object.fromEntries(new FormData(form).entries());
      const lang = getLang();

      const payload = {
        form: 'contact',
        full_name: raw.name || '',
        email: raw.email || '',
        phone: raw.phone || '',
        project: raw.subject || '',
        message: raw.message || '',
        rgpd: !!raw.consent,
        lang: lang,
        _hp: raw._hp || '',
        _ts: loadedAt
      };

      if (submitBtn) { submitBtn.disabled = true; form.classList.add('form-loading'); }

      postMail(payload).then(function () {
        // Tracking conversion Google Ads / Bing (formulaire de contact)
        if (window.trackContactForm) window.trackContactForm({ label: 'contactForm' });
        form.reset();
        const m = document.getElementById('contactModal');
        if (m) {
          const sentTo = m.querySelector('[data-sent-to]');
          if (sentTo) sentTo.textContent = payload.email;
          openModalById('contactModal');
        } else if (status) {
          status.textContent = t(lang, 'contact.form.success', 'Merci ! Votre message a bien \u00e9t\u00e9 envoy\u00e9.');
          status.classList.add('is-visible');
        }
      }).catch(function (err) {
        console.error('[PCS] Erreur envoi contact', err);
        if (status) {
          var apiMessage = err && err.data && err.data.message ? String(err.data.message) : '';
          status.textContent = apiMessage || t(lang, 'contact.form.error', "Une erreur s'est produite. R\u00e9essayez ou \u00e9crivez-nous directement \u00e0 contact@picardfinance.fr.");
          status.className = 'form-error is-visible';
        }
      }).finally(function () {
        if (submitBtn) { submitBtn.disabled = false; form.classList.remove('form-loading'); }
      });
    });
  }

  /* ============ APPLY FORM (credit request) ============ */
  function initApplyForm() {
    const form = document.getElementById('applyForm');
    const modal = document.getElementById('confirmationModal');
    if (!form || !modal) return;
    wireModalClose('confirmationModal');
    const submitBtn = form.querySelector('button[type="submit"]');
    const loadedAt = Date.now();

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const lang = getLang();
      const fullName = data.fullName || '';
      const email = data.email || '';

      // Libell\u00e9 du projet lisible par un humain.
      const projectLabelMap = {
        immobilier: 'Cr\u00e9dit immobilier',
        rachat: 'Rachat de cr\u00e9dits',
        professionnel: 'Cr\u00e9dit professionnel',
        consommation: 'Cr\u00e9dit consommation',
        travaux: 'Cr\u00e9dit travaux',
        assurance: 'Assurance de pr\u00eat'
      };
      const projectRaw = data.projectType || '';
      const projectLabel = projectLabelMap[projectRaw] || projectRaw || '\u2014';

      const amountFmt   = data.montantCredit ? (Number(data.montantCredit).toLocaleString('fr-FR') + ' \u20ac') : '\u2014';
      // IMPORTANT : on transmet la valeur BRUTE saisie par le client (nombre de mois),
      // sans aucune conversion — elle est reprise telle quelle dans le mail admin et le mail client.
      const durationFmt = data.dureeRemboursement ? (String(data.dureeRemboursement).trim() + ' mois') : '\u2014';
      const incomeFmt   = data.revenuMensuel ? (Number(data.revenuMensuel).toLocaleString('fr-FR') + ' \u20ac') : '\u2014';

      const payload = {
        form: 'credit',
        full_name:   fullName,
        email:       email,
        phone:       data.phone || '',
        project:     projectLabel,
        amount:      amountFmt,
        duration:    durationFmt,
        monthly:     '', // calcul\u00e9 ensuite si besoin
        birth:       data.dateNaissance || '',
        nationality: data.nationalite || '',
        situation:   data.situationMatrimoniale || '',
        profession:  data.profession || '',
        employer:    data.employeur || '',
        income:      incomeFmt,
        dependents:  data.nombreEnfants || '0',
        address:     data.adresse || '',
        zip:         data.codePostal || '',
        city:        data.ville || '',
        country:     data.pays || '',
        message:     data.message || '',
        rgpd:        !!data.consent,
        lang:        lang,
        _hp:         data._hp || '',
        _ts:         loadedAt
      };

      if (submitBtn) { submitBtn.disabled = true; form.classList.add('form-loading'); }

      postMail(payload).then(function () {
        // Tracking conversion Google Ads / Bing (demande de crédit)
        if (window.trackCreditRequest) window.trackCreditRequest({ label: 'applyForm' });
        form.reset();
        const sentTo = modal.querySelector('[data-sent-to]');
        if (sentTo) sentTo.textContent = payload.email;
        openModalById('confirmationModal');
      }).catch(function (err) {
        console.error('[PCS] Erreur envoi demande cr\u00e9dit', err);
        var apiMessage = err && err.data && err.data.message ? String(err.data.message) : '';
        alert(apiMessage || t(lang, 'apply.error', "Une erreur s'est produite lors de l'envoi. Merci de r\u00e9essayer ou de nous appeler au +33 7 56 82 32 79."));
      }).finally(function () {
        if (submitBtn) { submitBtn.disabled = false; form.classList.remove('form-loading'); }
      });
    });
  }

  /* ============ WHATSAPP FLOATING BUBBLE ============ */
  const WA_ICON_SVG = '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16.003 3.2c-7.074 0-12.8 5.726-12.8 12.8 0 2.26.593 4.466 1.72 6.41L3.2 28.8l6.58-1.712a12.742 12.742 0 006.222 1.58h.001c7.073 0 12.8-5.727 12.8-12.8s-5.727-12.67-12.8-12.67zm0 23.36c-1.918 0-3.79-.517-5.425-1.494l-.389-.23-3.903 1.016 1.04-3.8-.253-.39a10.56 10.56 0 01-1.62-5.662c0-5.84 4.75-10.59 10.59-10.59s10.59 4.75 10.59 10.59-4.753 10.56-10.59 10.56h-.04zm5.8-7.924c-.317-.159-1.883-.93-2.176-1.036-.293-.107-.507-.159-.72.16-.214.317-.828 1.036-1.015 1.25-.187.212-.374.24-.692.08-.317-.16-1.34-.495-2.55-1.578-.942-.84-1.578-1.879-1.763-2.197-.186-.317-.02-.49.14-.648.143-.143.317-.374.475-.56.159-.186.213-.318.32-.532.106-.213.053-.4-.027-.559-.08-.16-.72-1.733-.986-2.373-.26-.624-.527-.54-.72-.55l-.615-.012c-.213 0-.56.08-.853.4-.293.317-1.12 1.093-1.12 2.666 0 1.574 1.146 3.093 1.306 3.306.159.213 2.253 3.44 5.465 4.823.764.33 1.36.528 1.824.676.767.245 1.463.21 2.015.128.615-.092 1.883-.77 2.15-1.513.267-.744.267-1.38.187-1.513-.08-.134-.293-.213-.614-.374z"/></svg>';

  function renderWhatsApp() {
    if (document.getElementById('pcsWhatsApp')) return;
    const a = document.createElement('a');
    a.id = 'pcsWhatsApp';
    a.className = 'wa-fab';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', 'WhatsApp');
    const prefill = t(getLang(), 'whatsapp.prefill') || 'Bonjour, je souhaite obtenir plus d’informations.';
    a.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(prefill);
    a.innerHTML = '<span class="wa-icon">' + WA_ICON_SVG + '</span><span class="wa-txt" data-i18n="whatsapp.tooltip">WhatsApp</span>';
    document.body.appendChild(a);
    // Re-sync href when language changes
    document.addEventListener('pcs:langchange', function () {
      const next = t(getLang(), 'whatsapp.prefill') || 'Bonjour, je souhaite obtenir plus d’informations.';
      a.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(next);
    });
  }

  /* ============ JSON-LD schema injection ============ */
  function injectJsonLd() {
    const origin = (typeof window !== 'undefined' && window.location && window.location.origin) ? window.location.origin : 'https://picardfinance.fr';
    const page = (typeof window !== 'undefined' && window.location && window.location.href) ? window.location.href : origin + '/';
    const title = document.title || 'Picard Crédit Solutions';
    const descMeta = document.querySelector('meta[name="description"]');
    const desc = descMeta ? descMeta.getAttribute('content') : '';
    const ORG_ID = 'https://picardfinance.fr/#organization';

    // Breadcrumbs based on path segments
    const pathSegs = (window.location.pathname || '/').replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
    const breadcrumbs = {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://picardfinance.fr/' },
      ],
    };
    if (pathSegs.length) {
      const last = pathSegs[pathSegs.length - 1].replace(/\.html$/, '').replace(/[-_]/g, ' ');
      breadcrumbs.itemListElement.push({
        '@type': 'ListItem', position: 2, name: last.charAt(0).toUpperCase() + last.slice(1), item: page,
      });
    }

    const graph = [
      {
        '@type': ['Organization', 'FinancialService', 'LocalBusiness'],
        '@id': ORG_ID,
        name: 'Picard Crédit Solutions',
        legalName: 'Picard Crédit Solutions',
        alternateName: ['Picard Finance', 'PCS'],
        url: 'https://picardfinance.fr/',
        telephone: '+33756823279',
        email: 'contact@picardfinance.fr',
        priceRange: '€€',
        foundingDate: '2010',
        description: 'Courtier en crédit indépendant basé à Versailles. Crédit immobilier, rachat de crédits, crédit professionnel, assurance emprunteur, crédit consommation et crédit travaux. Taux négocié à 3 %.',
        slogan: 'Le crédit à votre service, chaque jour.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '5 Rue Neuve Notre-Dame',
          postalCode: '78000',
          addressLocality: 'Versailles',
          addressRegion: 'Île-de-France',
          addressCountry: 'FR',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 48.8054, longitude: 2.1351 },
        areaServed: [
          { '@type': 'Country', name: 'France' },
          { '@type': 'Country', name: 'Belgique' },
          { '@type': 'Country', name: 'Luxembourg' },
          { '@type': 'Country', name: 'Suisse' },
          { '@type': 'Country', name: 'Allemagne' },
          { '@type': 'Country', name: 'Pays-Bas' },
        ],
        identifier: '802 245 225',
        vatID: 'FR00802245225',
        taxID: '802245225',
        contactPoint: [
          {
            '@type': 'ContactPoint', telephone: '+33756823279', contactType: 'customer service',
            areaServed: ['FR', 'BE', 'LU', 'CH', 'DE', 'NL'], availableLanguage: ['French', 'English', 'Dutch', 'German'],
          },
        ],
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '17:00' },
        ],
        knowsAbout: [
          'Crédit immobilier', 'Rachat de crédits', 'Crédit professionnel', 'Assurance emprunteur',
          'Crédit consommation', 'Crédit travaux', 'Courtage', 'Financement',
        ],
        makesOffer: [
          { '@type': 'Offer', name: 'Crédit immobilier', url: 'https://picardfinance.fr/credit-immobilier.html' },
          { '@type': 'Offer', name: 'Rachat de crédits', url: 'https://picardfinance.fr/rachat-credits.html' },
          { '@type': 'Offer', name: 'Crédit professionnel', url: 'https://picardfinance.fr/credit-professionnel.html' },
          { '@type': 'Offer', name: 'Assurance emprunteur', url: 'https://picardfinance.fr/assurance-pret.html' },
          { '@type': 'Offer', name: 'Crédit consommation', url: 'https://picardfinance.fr/credit-consommation.html' },
          { '@type': 'Offer', name: 'Crédit travaux', url: 'https://picardfinance.fr/credit-travaux.html' },
        ],
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '342' },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://picardfinance.fr/#website',
        url: 'https://picardfinance.fr/',
        name: 'Picard Crédit Solutions',
        inLanguage: ['fr-FR', 'en', 'nl', 'de'],
        publisher: { '@id': ORG_ID },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://picardfinance.fr/?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebPage',
        '@id': page + '#webpage',
        url: page,
        name: title,
        description: desc,
        isPartOf: { '@id': 'https://picardfinance.fr/#website' },
        about: { '@id': ORG_ID },
        breadcrumb: breadcrumbs,
        inLanguage: document.documentElement.lang || 'fr',
      },
    ];

    // Add FAQ schema if on the FAQ page
    if (document.body && document.body.getAttribute('data-page') === 'faq') {
      const faqItems = Array.from(document.querySelectorAll('.faq-item, .acc-item, details'));
      if (faqItems.length) {
        graph.push({
          '@type': 'FAQPage',
          mainEntity: faqItems.slice(0, 10).map(function (it) {
            const q = (it.querySelector('summary, .faq-q, .acc-q, h3') || {}).textContent || '';
            const a = (it.querySelector('.faq-a, .acc-a, p') || {}).textContent || '';
            return { '@type': 'Question', name: q.trim(), acceptedAnswer: { '@type': 'Answer', text: a.trim() } };
          }).filter(function (i) { return i.name; }),
        });
      }
    }

    const site = { '@context': 'https://schema.org', '@graph': graph };
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(site);
    document.head.appendChild(s);
  }

  /* ============ ICON LIBRARY (Font Awesome CDN) ============ */
  function injectIconLib() {
    if (document.querySelector('link[href*="font-awesome"]')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';
    l.crossOrigin = 'anonymous';
    l.referrerPolicy = 'no-referrer';
    document.head.appendChild(l);
  }

  /* ============ FORMS: champs obligatoires + validation temps réel ============ */
  var HONEYPOT_NAMES = ['_hp', 'website', 'fax', 'company'];
  function enforceRequiredFields(root) {
    var forms = (root || document).querySelectorAll('form');
    forms.forEach(function (form) {
      form.removeAttribute('novalidate');
      var fields = form.querySelectorAll('input, select, textarea');
      fields.forEach(function (f) {
        var name = (f.getAttribute('name') || '').toLowerCase();
        var type = (f.getAttribute('type') || 'text').toLowerCase();
        if (HONEYPOT_NAMES.indexOf(name) !== -1) return;               // honeypot anti-spam
        if (type === 'hidden' || type === 'submit' || type === 'button') return;
        if (f.hasAttribute('readonly')) return;
        if (f.style && f.style.display === 'none') return;
        if (f.closest('[aria-hidden="true"]')) return;
        f.setAttribute('required', '');
        wireLiveValidation(f);
      });
    });
  }
  function fieldIsValid(f) {
    if (typeof f.checkValidity === 'function') return f.checkValidity();
    return !!(f.value && f.value.trim());
  }
  function wireLiveValidation(f) {
    if (f.__pcsLiveVal) return;
    f.__pcsLiveVal = true;
    function update() {
      var wrap = f.closest('label') || f;
      if (!f.value || (typeof f.value === 'string' && !f.value.trim() && f.type !== 'checkbox')) {
        f.classList.remove('is-valid', 'is-error');
        wrap.classList.remove('field-valid', 'field-error');
        return;
      }
      var ok = fieldIsValid(f);
      f.classList.toggle('is-valid', ok);
      f.classList.toggle('is-error', !ok);
      wrap.classList.toggle('field-valid', ok);
      wrap.classList.toggle('field-error', !ok);
    }
    f.addEventListener('input', update);
    f.addEventListener('change', update);
    f.addEventListener('blur', update);
  }
  // Observe dynamically injected forms (quick forms, callback, exit popup…)
  function observeDynamicForms() {
    if (!('MutationObserver' in window)) return;
    var mo = new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        m.addedNodes.forEach(function (n) {
          if (n.nodeType !== 1) return;
          if (n.matches && n.matches('form')) enforceRequiredFields(n.parentNode || document);
          else if (n.querySelector && n.querySelector('form')) enforceRequiredFields(n);
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  /* ============ PAGE LOADER élégant ============ */
  function initPageLoader() {
    var loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.setAttribute('aria-hidden', 'true');
    loader.innerHTML = '<div class="loader-inner"><div class="loader-ring"></div><div class="loader-logo">P</div></div>';
    document.body.appendChild(loader);
    function hide() {
      loader.classList.add('is-done');
      setTimeout(function () { loader.remove(); }, 700);
    }
    if (document.readyState === 'complete') setTimeout(hide, 150);
    else window.addEventListener('load', function () { setTimeout(hide, 150); });
    // Sécurité : jamais plus de 2,5 s
    setTimeout(hide, 2500);
  }

  /* ============ HERO PARTICLES (effet subtil futuriste) ============ */
  function initHeroParticles() {
    var hero = document.querySelector('.hero');
    if (!hero || hero.querySelector('.hero-particles')) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var canvas = document.createElement('canvas');
    canvas.className = 'hero-particles';
    canvas.setAttribute('aria-hidden', 'true');
    hero.insertBefore(canvas, hero.firstChild);
    var ctx = canvas.getContext('2d');
    var parts = [];
    var W, H;
    function resize() {
      W = canvas.width = hero.offsetWidth;
      H = canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });
    var COUNT = Math.min(70, Math.floor(window.innerWidth / 18));
    for (var i = 0; i < COUNT; i++) {
      parts.push({
        x: Math.random(), y: Math.random(),
        r: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.00045,
        vy: (Math.random() - 0.5) * 0.00045,
        o: Math.random() * 0.5 + 0.15
      });
    }
    var running = true;
    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(96,165,250,' + p.o + ')';
        ctx.fill();
      }
      // lignes de connexion subtiles
      ctx.lineWidth = 0.5;
      for (var a = 0; a < parts.length; a++) {
        for (var b = a + 1; b < parts.length; b++) {
          var dx = (parts[a].x - parts[b].x) * W;
          var dy = (parts[a].y - parts[b].y) * H;
          var d2 = dx * dx + dy * dy;
          if (d2 < 130 * 130) {
            ctx.beginPath();
            ctx.moveTo(parts[a].x * W, parts[a].y * H);
            ctx.lineTo(parts[b].x * W, parts[b].y * H);
            ctx.strokeStyle = 'rgba(96,165,250,' + (0.10 * (1 - Math.sqrt(d2) / 130)) + ')';
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    // Pause quand hors écran
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var was = running;
          running = e.isIntersecting;
          if (running && !was) requestAnimationFrame(draw);
        });
      }).observe(hero);
    }
    requestAnimationFrame(draw);
  }

  /* ============ AVIS CLIENTS (reviews.json) ============ */
  function starHtml(rating) {
    var s = '';
    for (var i = 1; i <= 5; i++) s += i <= rating ? '★' : '☆';
    return s;
  }
  function reviewCardHtml(r) {
    var initial = (r.name || '?').charAt(0).toUpperCase();
    return '<article class="review-card">'
      + '<div class="review-head">'
      + '<span class="review-avatar">' + initial + '</span>'
      + '<div><strong class="review-name">' + r.name + '</strong>'
      + '<span class="review-city">' + (r.city || '') + '</span></div>'
      + '<span class="review-stars" aria-label="' + r.rating + '/5">' + starHtml(r.rating) + '</span>'
      + '</div>'
      + '<p class="review-text">\u00ab\u2009' + r.text + '\u2009\u00bb</p>'
      + '<div class="review-foot"><span class="review-type">' + (r.type || '') + '</span><span class="review-date">' + (r.date || '') + '</span></div>'
      + '</article>';
  }
  function loadReviews(cb) {
    var base = '';
    // gère les pages dans des sous-dossiers
    var depth = (window.location.pathname.replace(/^\/+/, '').match(/\//g) || []).length;
    var prefix = depth > 0 ? '/' : '';
    fetch(prefix + 'assets/reviews.json', { credentials: 'same-origin' })
      .then(function (r) { return r.json(); })
      .then(function (data) { cb(data && data.reviews ? data.reviews : []); })
      .catch(function () {
        fetch('assets/reviews.json').then(function (r) { return r.json(); })
          .then(function (data) { cb(data && data.reviews ? data.reviews : []); })
          .catch(function () { cb([]); });
      });
  }
  function initReviewsCarousel() {
    var track = document.getElementById('reviewsTrack');
    if (!track) return;
    loadReviews(function (reviews) {
      if (!reviews.length) return;
      // Mélange léger puis sélection pour le carrousel
      var pick = reviews.slice(0, 24);
      var html = pick.map(reviewCardHtml).join('');
      // duplication pour un défilement infini fluide
      track.innerHTML = html + html;
      track.classList.add('is-ready');
      var wrap = track.closest('.reviews-carousel');
      if (wrap) {
        wrap.addEventListener('mouseenter', function () { track.style.animationPlayState = 'paused'; });
        wrap.addEventListener('mouseleave', function () { track.style.animationPlayState = 'running'; });
      }
      // Met à jour les compteurs
      var counters = document.querySelectorAll('[data-reviews-count]');
      counters.forEach(function (el) {
        el.setAttribute('data-count', String(reviews.length));
        el.textContent = reviews.length + '+';
      });
      initCounters();
    });
  }
  function initReviewsPage() {
    var grid = document.getElementById('reviewsGrid');
    if (!grid) return;
    loadReviews(function (reviews) {
      if (!reviews.length) return;
      var shown = 30;
      function render() {
        grid.innerHTML = reviews.slice(0, shown).map(reviewCardHtml).join('');
        var more = document.getElementById('reviewsMore');
        if (more) more.style.display = shown >= reviews.length ? 'none' : '';
      }
      render();
      var more = document.getElementById('reviewsMore');
      if (more) more.addEventListener('click', function () { shown += 30; render(); });
      var avg = reviews.reduce(function (s, r) { return s + r.rating; }, 0) / reviews.length;
      var avgEl = document.getElementById('reviewsAvg');
      if (avgEl) avgEl.textContent = avg.toFixed(1).replace('.', ',') + '/5';
      var cntEl = document.getElementById('reviewsCount');
      if (cntEl) cntEl.textContent = String(reviews.length);
      document.querySelectorAll('[data-reviews-count]').forEach(function (el) {
        el.setAttribute('data-count', String(reviews.length));
        el.textContent = reviews.length + '+';
      });
      initCounters();
    });
  }

  /* ============ INIT ============ */
  document.addEventListener('DOMContentLoaded', function () {
    injectIconLib();
    initPageLoader();
    renderNav();
    renderFooter();
    applyTranslations(getLang());
    document.documentElement.lang = getLang();
    initLangSwitcher();
    initNavBehavior();
    initScrollTop();
    initReveal();
    initCounters();
    initFAQ();
    initContactForm();
    initApplyForm();
    renderWhatsApp();
    injectJsonLd();
    enforceRequiredFields(document);
    observeDynamicForms();
    initReviewsCarousel();
    initReviewsPage();
  });

  // When dynamic content (e.g., service pages) is injected, re-run observers
  document.addEventListener('pcs:dom-updated', function () {
    initReveal();
    initCounters();
    initFAQ();
  });
})();
