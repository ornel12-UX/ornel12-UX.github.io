/* ============================================================
   CONVERSION.JS — Golden Finances & Investment
   Global conversion components injected on every page:
   - Urgency bar (top)
   - Floating CTA buttons (phone + callback)
   - Callback modal
   - Exit-intent popup
   - Social proof notifications
   - Cookie consent
   - Sticky mobile CTA bar
   - Form handling (quick forms, callback, exit)
   - Conversion tracking helpers
   ============================================================ */
(function () {
  'use strict';

  var ICON = window.PCS_ICON || {};
  var PHONE = '+33756823279';
  var PHONE_DISPLAY = '07 56 82 32 79';
  var WA_NUMBER = '33756823279';
  var EMAIL = 'goldenfinanceinvestment7@gmail.com';

  /* ===== HELPERS ===== */
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
  function ce(tag, cls, html) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (html) el.innerHTML = html;
    return el;
  }
  function getCookie(name) {
    var m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }
  function setCookie(name, val, days) {
    var d = new Date(); d.setTime(d.getTime() + days * 864e5);
    document.cookie = name + '=' + encodeURIComponent(val) + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
  }
  function trackEvent(action, category, label, value) {
    if (window.gtag) {
      window.gtag('event', action, { event_category: category || 'conversion', event_label: label || '', value: value || 0 });
    }
    if (window.dataLayer) {
      window.dataLayer.push({ event: action, eventCategory: category, eventLabel: label, eventValue: value });
    }
  }

  /* ===== 1. URGENCY BAR ===== */
  function renderUrgencyBar() {
    if (getCookie('pcs_ub_closed')) return;
    // Rotate messages
    var msgs = [
      { icon: '🔥', text: '<strong>Taux négociés à partir de 3%</strong> — Offre limitée', hl: 'Mai 2026' },
      { icon: '⏰', text: '<strong>Réponse sous 24h</strong> — Étude gratuite et sans engagement', hl: 'Gratuit' },
      { icon: '📊', text: '<strong>+500 dossiers financés</strong> — Votre courtier de confiance à Versailles', hl: '98% satisfaits' },
    ];
    var msg = msgs[Math.floor(Math.random() * msgs.length)];

    var bar = ce('div', 'urgency-bar', '');
    bar.id = 'urgencyBar';
    bar.innerHTML = '<div class="ub-inner">'
      + '<span class="ub-icon">' + msg.icon + '</span>'
      + '<span class="ub-text">' + msg.text + ' — <span class="ub-highlight">' + msg.hl + '</span></span>'
      + '<a href="../contact/index.html" class="ub-cta">Profitez-en →</a>'
      + '</div>'
      + '<button class="ub-close" aria-label="Fermer" onclick="this.closest(\'.urgency-bar\').remove();document.cookie=\'pcs_ub_closed=1;path=/;max-age=86400;SameSite=Lax\'">✕</button>';

    var nav = qs('#mainNav') || qs('.nav') || qs('header');
    if (nav && nav.parentNode) {
      nav.parentNode.insertBefore(bar, nav);
    } else {
      document.body.insertBefore(bar, document.body.firstChild);
    }
    trackEvent('urgency_bar_view', 'engagement');
  }

  /* ===== 2. FLOATING CTA BUTTONS ===== */
  function renderFloatingCTAs() {
    var wrap = ce('div', 'floating-ctas');
    wrap.id = 'floatingCTAs';
    wrap.innerHTML =
      '<a href="tel:' + PHONE + '" class="float-btn float-btn-phone" aria-label="Appeler">'
      + '<span class="float-label">Appelez-nous</span>'
      + (ICON.phone || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z"/></svg>')
      + '</a>'
      + '<button class="float-btn float-btn-callback" aria-label="Être rappelé" id="openCallbackBtn">'
      + '<span class="cb-pulse"></span>'
      + '<span class="float-label">Être rappelé gratuitement</span>'
      + '<span class="float-badge">Gratuit</span>'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.05 5A5 5 0 0119 8.95M15.05 1A9 9 0 0123 8.94m-1 7.98v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72a2 2 0 011.72 2z"/></svg>'
      + '</button>';
    document.body.appendChild(wrap);
  }

  /* ===== 3. CALLBACK MODAL ===== */
  function renderCallbackModal() {
    var overlay = ce('div', 'cb-modal-overlay');
    overlay.id = 'callbackModal';
    overlay.innerHTML =
      '<div class="cb-modal">'
      + '<button class="cb-close" aria-label="Fermer">' + (ICON.close || '✕') + '</button>'
      + '<div class="cb-badge">' + (ICON.phone || '📞') + ' Rappel gratuit</div>'
      + '<h3>Être rappelé en moins de 2h</h3>'
      + '<p>Laissez vos coordonnées, un conseiller Golden Finances &amp; Investment vous rappelle gratuitement.</p>'
      + '<form class="cb-form" id="callbackForm">'
      + '<input class="cb-input" type="text" name="nom" placeholder="Votre nom" required autocomplete="name">'
      + '<input class="cb-input" type="tel" name="telephone" placeholder="Votre téléphone" required autocomplete="tel" pattern="[0-9+\\s]{8,}">'
      + '<input class="cb-input" type="email" name="email" placeholder="Votre email" required autocomplete="email">'
      + '<select class="cb-input" name="sujet" required style="cursor:pointer">'
      + '<option value="">Votre sujet *</option>'
      + '<option value="credit-immobilier">Crédit immobilier</option>'
      + '<option value="rachat-credits">Rachat de crédits</option>'
      + '<option value="assurance-pret">Assurance de prêt</option>'
      + '<option value="credit-professionnel">Prêt professionnel</option>'
      + '<option value="credit-consommation">Crédit consommation</option>'
      + '<option value="credit-travaux">Crédit travaux</option>'
      + '<option value="autre">Autre</option>'
      + '</select>'
      + '<input type="text" name="website" style="display:none" tabindex="-1" autocomplete="off">'
      + '<button type="submit" class="cb-submit">Demander un rappel gratuit ' + (ICON.arrow || '→') + '</button>'
      + '</form>'
      + '<div class="cb-trust">' + (ICON.shield || '🔒') + ' Vos données restent confidentielles — Aucun engagement</div>'
      + '</div>';
    document.body.appendChild(overlay);

    // Open/Close
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeCallbackModal();
    });
    overlay.querySelector('.cb-close').addEventListener('click', closeCallbackModal);
    document.addEventListener('click', function (e) {
      if (e.target.id === 'openCallbackBtn' || e.target.closest('#openCallbackBtn')) {
        openCallbackModal();
      }
      // Any element with data-open-callback attribute
      if (e.target.hasAttribute('data-open-callback') || e.target.closest('[data-open-callback]')) {
        openCallbackModal();
      }
    });

    // Form submit
    var form = qs('#callbackForm');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      handleFormSubmit(form, 'callback');
    });
  }

  function openCallbackModal() {
    var m = qs('#callbackModal');
    if (m) { m.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
    trackEvent('callback_modal_open', 'conversion');
  }
  function closeCallbackModal() {
    var m = qs('#callbackModal');
    if (m) { m.classList.remove('is-open'); document.body.style.overflow = ''; }
  }

  /* ===== 4. EXIT-INTENT POPUP ===== */
  function renderExitPopup() {
    var overlay = ce('div', 'exit-overlay');
    overlay.id = 'exitOverlay';
    overlay.innerHTML =
      '<div class="exit-popup">'
      + '<div class="exit-popup-top">'
      + '<button class="exit-close" aria-label="Fermer">' + (ICON.close || '✕') + '</button>'
      + '<span class="exit-icon">🎁</span>'
      + '<h2>Attendez ! Offre spéciale</h2>'
      + '<p>Téléchargez notre guide gratuit avant de partir</p>'
      + '</div>'
      + '<div class="exit-popup-body">'
      + '<ul class="exit-benefits">'
      + '<li>' + (ICON.check || '✓') + ' <span>Guide complet du crédit immobilier 2026</span></li>'
      + '<li>' + (ICON.check || '✓') + ' <span>Checklist des documents nécessaires</span></li>'
      + '<li>' + (ICON.check || '✓') + ' <span>Astuces pour obtenir le meilleur taux</span></li>'
      + '<li>' + (ICON.check || '✓') + ' <span>Simulation personnalisée offerte</span></li>'
      + '</ul>'
      + '<form class="exit-form" id="exitForm">'
      + '<input type="text" name="prenom" placeholder="Votre prénom" required autocomplete="given-name">'
      + '<input type="email" name="email" placeholder="Votre email" required autocomplete="email">'
      + '<input type="text" name="fax" style="display:none" tabindex="-1" autocomplete="off">'
      + '<button type="submit" class="exit-submit">📥 Télécharger le guide gratuit</button>'
      + '</form>'
      + '<button class="exit-no" id="exitNoThanks">Non merci, je n\'ai pas besoin d\'aide</button>'
      + '</div>'
      + '</div>';
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeExitPopup(); });
    overlay.querySelector('.exit-close').addEventListener('click', closeExitPopup);
    qs('#exitNoThanks').addEventListener('click', closeExitPopup);

    var form = qs('#exitForm');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      handleFormSubmit(form, 'guide_download');
    });
  }

  var exitShown = false;
  function initExitIntent() {
    if (getCookie('pcs_exit_shown')) return;
    // Desktop: mouse leaves viewport top
    document.addEventListener('mouseout', function (e) {
      if (exitShown) return;
      if (e.clientY <= 5 && e.relatedTarget == null) {
        showExitPopup();
      }
    });
    // Mobile: scroll up fast or back button (simplified: after 30s on page)
    setTimeout(function () {
      var lastScroll = window.scrollY;
      window.addEventListener('scroll', function onScroll() {
        if (exitShown) { window.removeEventListener('scroll', onScroll); return; }
        if (window.scrollY < lastScroll - 200 && window.scrollY < 200) {
          showExitPopup();
          window.removeEventListener('scroll', onScroll);
        }
        lastScroll = window.scrollY;
      });
    }, 15000);
  }

  function showExitPopup() {
    if (exitShown) return;
    // Don't show on merci or guide pages
    var path = window.location.pathname;
    if (path.indexOf('merci') !== -1 || path.indexOf('guide') !== -1) return;
    exitShown = true;
    var o = qs('#exitOverlay');
    if (o) { o.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
    setCookie('pcs_exit_shown', '1', 7);
    trackEvent('exit_popup_shown', 'engagement');
  }
  function closeExitPopup() {
    var o = qs('#exitOverlay');
    if (o) { o.classList.remove('is-open'); document.body.style.overflow = ''; }
  }

  /* ===== 5. STICKY MOBILE CTA BAR ===== */
  function renderStickyMobileCTA() {
    var bar = ce('div', 'sticky-mobile-cta');
    bar.id = 'stickyMobileCTA';
    bar.innerHTML =
      '<div class="smc-inner">'
      + '<a href="tel:' + PHONE + '" class="smc-btn smc-btn-phone">'
      + (ICON.phone || '📞') + ' Appeler</a>'
      + '<button class="smc-btn smc-btn-callback" data-open-callback>'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M15.05 5A5 5 0 0119 8.95M15.05 1A9 9 0 0123 8.94m-1 7.98v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72a2 2 0 011.72 2z"/></svg>'
      + ' Rappel</button>'
      + '<a href="https://wa.me/' + WA_NUMBER + '?text=Bonjour%2C%20je%20souhaite%20des%20informations%20sur%20vos%20services%20de%20courtage." class="smc-btn smc-btn-whatsapp" target="_blank" rel="noopener">'
      + '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"/><path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.88L2 22l5.23-1.24A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.63 0-3.15-.48-4.42-1.3l-.32-.19-3.27.78.82-3.2-.21-.33A7.96 7.96 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/></svg>'
      + ' WhatsApp</a>'
      + '</div>';
    document.body.appendChild(bar);
  }

  /* ===== 6. SOCIAL PROOF NOTIFICATIONS ===== */
  function initSocialProof() {
    var proofs = [
      { city: 'Versailles', action: 'a obtenu son crédit immobilier', time: 'il y a 2h' },
      { city: 'Saint-Germain-en-Laye', action: 'a finalisé son rachat de crédits', time: 'il y a 4h' },
      { city: 'Le Chesnay', action: 'a souscrit son assurance emprunteur', time: 'il y a 6h' },
      { city: 'Boulogne-Billancourt', action: 'a obtenu son prêt professionnel', time: 'il y a 8h' },
      { city: 'Viroflay', action: 'a obtenu son crédit travaux', time: 'hier' },
      { city: 'Vélizy', action: 'a finalisé son crédit consommation', time: 'hier' },
      { city: 'Meudon', action: 'a obtenu un taux à 2.89%', time: 'il y a 3h' },
    ];
    var names = ['Marie L.', 'Thomas D.', 'Sophie M.', 'Pierre B.', 'Julie R.', 'Nicolas C.', 'Camille V.'];
    var idx = 0;
    function showProof() {
      if (document.hidden) return;
      var proof = proofs[idx % proofs.length];
      var name = names[idx % names.length];
      showToast('✅ <strong>' + name + '</strong> de ' + proof.city + ' ' + proof.action + ' — <em>' + proof.time + '</em>');
      idx++;
    }
    // First after 25s, then every 45s
    setTimeout(function () {
      showProof();
      setInterval(showProof, 45000);
    }, 25000);
  }

  function showToast(html, isError) {
    var existing = qs('.pcs-toast');
    if (existing) existing.remove();
    var toast = ce('div', 'pcs-toast' + (isError ? ' toast-error' : ''), html);
    document.body.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add('is-visible'); });
    setTimeout(function () {
      toast.classList.remove('is-visible');
      setTimeout(function () { toast.remove(); }, 500);
    }, 5000);
  }

  /* ===== 7. COOKIE CONSENT ===== */
  function renderCookieConsent() {
    if (getCookie('pcs_cookies')) return;
    var bar = ce('div', 'cookie-bar');
    bar.id = 'cookieBar';
    bar.innerHTML =
      '<div class="ck-inner">'
      + '<div class="ck-text">🍪 Ce site utilise des cookies pour améliorer votre expérience et analyser le trafic. <a href="../politique-confidentialite/index.html">En savoir plus</a></div>'
      + '<div class="ck-actions">'
      + '<button class="ck-btn ck-btn-accept" id="ckAccept">Accepter</button>'
      + '<button class="ck-btn ck-btn-decline" id="ckDecline">Refuser</button>'
      + '</div>'
      + '</div>';
    document.body.appendChild(bar);
    // Show with slight delay
    setTimeout(function () { bar.classList.add('is-visible'); }, 2000);

    qs('#ckAccept').addEventListener('click', function () {
      setCookie('pcs_cookies', 'accepted', 365);
      bar.classList.remove('is-visible');
      setTimeout(function () { bar.remove(); }, 400);
      trackEvent('cookie_accept', 'privacy');
    });
    qs('#ckDecline').addEventListener('click', function () {
      setCookie('pcs_cookies', 'declined', 30);
      bar.classList.remove('is-visible');
      setTimeout(function () { bar.remove(); }, 400);
    });
  }

  /* ===== 8. TRUST BADGES INJECTION ===== */
  function renderTrustBadges(container) {
    var target = container || qs('.trust-row-auto');
    if (!target) return;
    target.innerHTML =
      '<div class="trust-badge-item">' + (ICON.shield || '🛡️') + '<div><div class="tb-value">ORIAS</div>Courtier enregistré</div></div>'
      + '<div class="trust-badge-item">' + (ICON.star || '⭐') + '<div><div class="tb-value">4,8/5</div>+340 avis</div></div>'
      + '<div class="trust-badge-item">' + (ICON.users || '👥') + '<div><div class="tb-value">+500</div>Dossiers financés</div></div>'
      + '<div class="trust-badge-item">' + (ICON.bolt || '⚡') + '<div><div class="tb-value">24h</div>Réponse garantie</div></div>'
      + '<div class="trust-badge-item">' + (ICON.check || '✅') + '<div><div class="tb-value">0€</div>Étude gratuite</div></div>';
    target.classList.add('trust-row');
  }

  /* ===== 9. INLINE CTA BANNERS ===== */
  function renderCTABanners() {
    qsa('[data-cta-banner]').forEach(function (el) {
      var type = el.getAttribute('data-cta-banner') || 'default';
      var banners = {
        'default': {
          title: 'Prêt à concrétiser votre projet\u00a0?',
          text: 'Nos courtiers négocient les meilleurs taux pour vous. Étude gratuite et sans engagement.',
          primary: { text: 'Demander une étude gratuite', href: '/contact.html' },
          secondary: { text: 'Appeler un conseiller', href: 'tel:' + PHONE },
          urgency: '⏰ Réponse sous 24h — Places limitées ce mois-ci'
        },
        'guide': {
          title: 'Guide gratuit\u00a0: Réussir son crédit immobilier',
          text: 'Téléchargez notre guide complet 2026 avec toutes les astuces pour obtenir le meilleur taux.',
          primary: { text: 'Télécharger le guide', href: '/guide-gratuit.html' },
          secondary: { text: 'En savoir plus', href: '/guide-gratuit.html' },
          urgency: '📥 Déjà téléchargé par +200 emprunteurs'
        },
        'urgency': {
          title: 'Les taux remontent\u00a0! Agissez maintenant',
          text: 'Profitez des taux actuels avant la prochaine hausse. Chaque semaine compte.',
          primary: { text: 'Simuler mon crédit', href: '/simulateur.html' },
          secondary: { text: 'Être rappelé', href: '#', onclick: 'data-open-callback' },
          urgency: '📊 Taux à partir de 3% — Mai 2026'
        }
      };
      var b = banners[type] || banners['default'];
      el.className = 'cta-banner';
      el.innerHTML =
        '<h2>' + b.title + '</h2>'
        + '<p>' + b.text + '</p>'
        + '<div class="cta-buttons">'
        + '<a href="' + b.primary.href + '" class="btn-cta-primary">' + b.primary.text + ' ' + (ICON.arrow || '→') + '</a>'
        + '<a href="' + b.secondary.href + '" class="btn-cta-secondary"' + (b.secondary.onclick ? ' ' + b.secondary.onclick : '') + '>' + (ICON.phone || '📞') + ' ' + b.secondary.text + '</a>'
        + '</div>'
        + '<div class="cta-urgency">' + b.urgency + '</div>';
    });
  }

  /* ===== 10. QUICK FORM COMPONENT ===== */
  function renderQuickForms() {
    qsa('[data-quick-form]').forEach(function (el) {
      var context = el.getAttribute('data-quick-form') || 'general';
      el.className = 'quick-form-card';
      el.innerHTML =
        '<div class="qf-badge">⚡ Réponse en 24h</div>'
        + '<h3>Étude gratuite et sans engagement</h3>'
        + '<p class="qf-sub">Remplissez ce formulaire, un conseiller vous contacte rapidement.</p>'
        + '<form class="qf-fields" data-form-context="' + context + '">'
        + '<input class="qf-input" type="text" name="nom" placeholder="Votre nom complet" required autocomplete="name">'
        + '<input class="qf-input" type="tel" name="telephone" placeholder="Votre téléphone" required autocomplete="tel" pattern="[0-9+\\s]{8,}">'
        + '<input class="qf-input" type="email" name="email" placeholder="Votre email" required autocomplete="email">'
        + '<select class="qf-select" name="projet" required>'
        + '<option value="">Votre projet *</option>'
        + '<option value="credit-immobilier">Crédit immobilier</option>'
        + '<option value="rachat-credits">Rachat de crédits</option>'
        + '<option value="assurance-pret">Assurance de prêt</option>'
        + '<option value="credit-professionnel">Prêt professionnel</option>'
        + '<option value="credit-consommation">Crédit consommation</option>'
        + '<option value="credit-travaux">Crédit travaux</option>'
        + '</select>'
        + '<input type="text" name="company" style="display:none" tabindex="-1" autocomplete="off">'
        + '<button type="submit" class="qf-submit">Envoyer ma demande ' + (ICON.arrow || '→') + '</button>'
        + '</form>'
        + '<div class="qf-trust">' + (ICON.shield || '🔒') + ' Données confidentielles — Sans engagement</div>';

      var form = el.querySelector('form');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        handleFormSubmit(form, 'quick_form');
      });
    });
  }

  /* ===== 11. FORM SUBMISSION HANDLER ===== */
  function handleFormSubmit(form, source) {
    // Honeypot check
    var honeypots = form.querySelectorAll('input[name="website"],input[name="fax"],input[name="company"]');
    for (var i = 0; i < honeypots.length; i++) {
      if (honeypots[i].value) return; // Bot detected
    }

    // Basic validation
    var inputs = form.querySelectorAll('[required]');
    var valid = true;
    inputs.forEach(function (inp) {
      inp.classList.remove('is-error');
      if (!inp.value.trim()) {
        inp.classList.add('is-error');
        valid = false;
      }
      if (inp.type === 'email' && inp.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)) {
        inp.classList.add('is-error');
        valid = false;
      }
      if (inp.type === 'tel' && inp.value && !/^[\d\s+()-]{8,}$/.test(inp.value)) {
        inp.classList.add('is-error');
        valid = false;
      }
    });
    if (!valid) return;

    var submitBtn = form.querySelector('[type="submit"]');
    var originalText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.innerHTML = '<span class="spinner"></span> Envoi en cours...';
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;
    }

    // Collect data
    var data = new FormData(form);
    var payload = {};
    data.forEach(function (v, k) {
      if (k !== 'website' && k !== 'fax' && k !== 'company') payload[k] = v;
    });
    payload.source = source || 'unknown';
    payload.page = window.location.pathname;
    payload.timestamp = new Date().toISOString();

    // Try sending to API endpoint, fall back to mailto
    sendFormData(payload, function (success) {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-loading');
      }
      if (success) {
        trackEvent('form_submit', 'conversion', source);
        // Show success or redirect to merci page
        if (source === 'guide_download') {
          // Redirect to guide PDF then merci
          window.location.href = '/merci.html?source=guide';
        } else {
          window.location.href = '/merci.html?source=' + encodeURIComponent(source);
        }
      } else {
        if (submitBtn) submitBtn.innerHTML = originalText;
        showToast('❌ Erreur d\'envoi. Appelez-nous au <a href="tel:' + PHONE + '">' + PHONE_DISPLAY + '</a>', true);
      }
    });
  }

  function sendFormData(payload, callback) {
    // Primary: try API endpoint
    var apiUrl = '/api/contact';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', apiUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.timeout = 8000;
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        callback(true);
      } else {
        // Fallback: mailto link
        sendViaMailto(payload);
        callback(true);
      }
    };
    xhr.onerror = xhr.ontimeout = function () {
      sendViaMailto(payload);
      callback(true);
    };
    try {
      xhr.send(JSON.stringify(payload));
    } catch (e) {
      sendViaMailto(payload);
      callback(true);
    }
  }

  function sendViaMailto(payload) {
    var subject = encodeURIComponent('Nouvelle demande — ' + (payload.source || 'Site web'));
    var body = encodeURIComponent(
      'Nom: ' + (payload.nom || payload.prenom || 'N/A') + '\n'
      + 'Téléphone: ' + (payload.telephone || 'N/A') + '\n'
      + 'Email: ' + (payload.email || 'N/A') + '\n'
      + 'Projet: ' + (payload.projet || payload.sujet || 'N/A') + '\n'
      + 'Source: ' + (payload.source || '') + '\n'
      + 'Page: ' + (payload.page || '') + '\n'
      + 'Date: ' + (payload.timestamp || new Date().toISOString())
    );
    // Store lead in localStorage as backup
    try {
      var leads = JSON.parse(localStorage.getItem('pcs_leads') || '[]');
      leads.push(payload);
      localStorage.setItem('pcs_leads', JSON.stringify(leads));
    } catch (e) {}
    // Open mailto
    window.open('mailto:' + EMAIL + '?subject=' + subject + '&body=' + body, '_self');
  }

  /* ===== 12. TAWK.TO LIVE CHAT ===== */
  function initTawkTo() {
    // Lazy load Tawk.to after 5 seconds for performance
    setTimeout(function () {
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://embed.tawk.to/DEFAULT_ID/default';
      // NOTE: Replace DEFAULT_ID with actual Tawk.to widget ID
      // For now, we'll skip actual loading since we don't have the ID
      // s.charset = 'UTF-8';
      // s.setAttribute('crossorigin', '*');
      // document.head.appendChild(s);
    }, 5000);
  }

  /* ===== 13. CONVERSION TRACKING HELPERS ===== */
  function initConversionTracking() {
    // Track CTA clicks
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (!link) return;
      var href = link.getAttribute('href') || '';
      if (href.indexOf('tel:') === 0) {
        trackEvent('phone_click', 'conversion', href);
      } else if (href.indexOf('mailto:') === 0) {
        trackEvent('email_click', 'conversion', href);
      } else if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp') !== -1) {
        trackEvent('whatsapp_click', 'conversion', href);
      } else if (href.indexOf('demande-credit') !== -1) {
        trackEvent('apply_cta_click', 'conversion', href);
      } else if (href.indexOf('simulateur') !== -1) {
        trackEvent('simulator_click', 'engagement', href);
      } else if (href.indexOf('contact') !== -1) {
        trackEvent('contact_click', 'conversion', href);
      } else if (href.indexOf('guide-gratuit') !== -1) {
        trackEvent('guide_click', 'engagement', href);
      }
    });

    // Track scroll depth
    var depths = [25, 50, 75, 100];
    var tracked = {};
    window.addEventListener('scroll', function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (h <= 0) return;
      var pct = Math.round(window.scrollY / h * 100);
      depths.forEach(function (d) {
        if (pct >= d && !tracked[d]) {
          tracked[d] = true;
          trackEvent('scroll_depth', 'engagement', d + '%');
        }
      });
    });

    // Track time on page
    var timeIntervals = [30, 60, 120, 300];
    timeIntervals.forEach(function (sec) {
      setTimeout(function () {
        trackEvent('time_on_page', 'engagement', sec + 's');
      }, sec * 1000);
    });
  }

  /* ===== INIT ===== */
  function init() {
    renderUrgencyBar();
    renderFloatingCTAs();
    renderCallbackModal();
    renderExitPopup();
    renderStickyMobileCTA();
    renderCookieConsent();
    renderQuickForms();
    renderCTABanners();
    qsa('.trust-row-auto').forEach(renderTrustBadges);
    initExitIntent();
    initSocialProof();
    initConversionTracking();
    // initTawkTo(); // Uncomment when Tawk.to widget ID is set
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for external use
  window.PCS_CONV = {
    openCallbackModal: openCallbackModal,
    closeCallbackModal: closeCallbackModal,
    showExitPopup: showExitPopup,
    showToast: showToast,
    trackEvent: trackEvent,
    renderTrustBadges: renderTrustBadges
  };
})();
