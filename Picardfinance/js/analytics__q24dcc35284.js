/* ============================================================================
   ANALYTICS & CONVERSION TRACKING — Picard Crédit Solutions
   Google Ads (compte 730-028-4443)
   Seul tracking actif : soumission du formulaire de demande de crédit.
   ========================================================================== */
(function () {
  'use strict';

  /* ==================== CONFIGURATION ==================== */
  var GOOGLE_ADS_ID = 'AW-18267937257';
  var CONVERSION_LABEL = 'G-29CM7k8tMcEOmz6oZE';
  var CONVERSION_VALUE = 1; // euro

  /* ==================== INSTALLATION GTAG ==================== */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GOOGLE_ADS_ID;
  document.head.appendChild(s);
  gtag('js', new Date());
  gtag('config', GOOGLE_ADS_ID);

  /* ==================== TRACKING DEMANDE DE CRÉDIT ==================== */
  function trackCreditRequest(details) {
    // Google Ads conversion
    gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_ID + '/' + CONVERSION_LABEL,
      value: CONVERSION_VALUE,
      currency: 'EUR'
    });

    // dataLayer (compatibilité GTM)
    window.dataLayer.push({
      event: 'credit_request_submit',
      conversion_key: 'credit_request',
      value: CONVERSION_VALUE,
      currency: 'EUR',
      page: location.pathname
    });
  }

  // Exposition globale — utilisée par main.js
  window.trackCreditRequest = trackCreditRequest;
  window.pcsTrack = { creditRequest: trackCreditRequest };

  // Fonctions vides pour éviter les erreurs si d'autres scripts les appellent
  window.trackContactForm   = function () {};
  window.trackGuideDownload = function () {};
  window.trackPhoneClick    = function () {};
  window.trackSimulatorUse  = function () {};
  window.trackKeyPageView   = function () {};

})();