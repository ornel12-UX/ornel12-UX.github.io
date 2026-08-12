/* Golden Finances & Investment - service page renderer */
(function () {
  'use strict';
  function render() {
    const root = document.getElementById('servicePage');
    if (!root) return;
    const key = root.getAttribute('data-service');
    const D = (window.PCS_SERVICES || {})[key];
    if (!D) return;
    const ICON = window.PCS_ICON || {};

    const arrow = ICON.arrow || '→';
    const check = ICON.check || '✓';

    const iconByService = {
      immo: ICON.home, rachat: ICON.refresh, pro: ICON.briefcase, assurance: ICON.shield, conso: ICON.card, travaux: ICON.hammer,
    };
    const whyIcons = [ICON.trend, ICON.bolt, ICON.star, ICON.users];

    // Hero
    const hero = ''
      + '<section class="hero hero-sm" style="min-height:56vh">'
      + '  <style>.hero.hero-sm::before{background-image:linear-gradient(135deg,rgba(15,46,33,0.82),rgba(27,67,50,0.62)),url(\'' + (D.heroImg || '') + '\')}</style>'
      + '  <div class="container hero-inner" style="padding:120px 0 60px">'
      + '    <a href="services.html" class="eyebrow on-dark reveal" style="margin-bottom:18px;text-decoration:none" data-i18n="common.back"></a>'
      + '    <h1 class="reveal" data-i18n="' + D.titleKey + '"></h1>'
      + '    <p class="lead reveal reveal-2" data-i18n="' + D.heroKey + '"></p>'
      + '    <div class="hero-actions reveal reveal-3">'
      + '      <a href="simulateur.html" class="btn btn-primary"><span data-i18n="common.simulate"></span>' + arrow + '</a>'
      + '      <a href="contact.html" class="btn btn-outline-light" data-i18n="common.contact"></a>'
      + '    </div>'
      + '  </div>'
      + '</section>';

    // Why choose us (4 cards with values)
    const whyCards = D.why.map(function (w, i) {
      const icon = whyIcons[i % whyIcons.length] || ICON.star;
      return ''
        + '<div class="card reveal' + (i > 0 ? ' reveal-' + Math.min(i + 1, 4) : '') + '">'
        + '  <div class="value">' + w.value + '</div>'
        + '  <div class="icon">' + (icon || '') + '</div>'
        + '  <h3 data-i18n="' + w.key + '.title"></h3>'
        + '  <p data-i18n="' + w.key + '.desc"></p>'
        + '</div>';
    }).join('');
    const whySection = ''
      + '<section>'
      + '  <div class="container">'
      + '    <div class="section-head reveal">'
      + '      <span class="eyebrow" data-i18n="common.whyUsEyebrow"></span>'
      + '      <h2 style="margin-top:18px" data-i18n="common.whyUs"></h2>'
      + '    </div>'
      + '    <div class="grid grid-4">' + whyCards + '</div>'
      + '  </div>'
      + '</section>';

    // Services grid (6 items)
    const serviceCards = D.services.map(function (k, i) {
      const icon = iconByService[key] || ICON.wallet;
      return ''
        + '<div class="card reveal' + (i % 3 === 1 ? ' reveal-2' : '') + (i % 3 === 2 ? ' reveal-3' : '') + '">'
        + '  <div class="icon">' + (icon || '') + '</div>'
        + '  <h3 data-i18n="' + k + '.title"></h3>'
        + '  <p data-i18n="' + k + '.desc"></p>'
        + '</div>';
    }).join('');
    const servicesSection = ''
      + '<section class="section-alt">'
      + '  <div class="container">'
      + '    <div class="section-head reveal">'
      + '      <span class="eyebrow" data-i18n="common.ourServicesEyebrow"></span>'
      + '      <h2 style="margin-top:18px" data-i18n="common.ourServices"></h2>'
      + '    </div>'
      + '    <div class="grid grid-3">' + serviceCards + '</div>'
      + '  </div>'
      + '</section>';

    // Rachat example (only for rachat)
    let exampleSection = '';
    if (D.example) {
      exampleSection = ''
        + '<section>'
        + '  <div class="container">'
        + '    <div class="section-head reveal">'
        + '      <span class="eyebrow" data-i18n="rachat.ex.eyebrow"></span>'
        + '      <h2 style="margin-top:18px" data-i18n="rachat.ex.title"></h2>'
        + '      <p class="lead" data-i18n="rachat.ex.lead"></p>'
        + '    </div>'
        + '    <div class="compare reveal">'
        + '      <div class="compare-col before"><h4 data-i18n="rachat.ex.before"></h4><dl>'
        + '        <dt data-i18n="rachat.ex.credits"></dt><dd data-i18n="rachat.ex.4sep"></dd>'
        + '        <dt data-i18n="rachat.ex.mensualites"></dt><dd>1 321 €</dd>'
        + '        <dt data-i18n="rachat.ex.endettement"></dt><dd>68%</dd>'
        + '        <dt data-i18n="rachat.ex.total"></dt><dd>51 550 €</dd>'
        + '      </dl></div>'
        + '      <div class="compare-col after"><h4 data-i18n="rachat.ex.after"></h4><dl>'
        + '        <dt data-i18n="rachat.ex.credits"></dt><dd data-i18n="rachat.ex.1one"></dd>'
        + '        <dt data-i18n="rachat.ex.mensualites"></dt><dd>424,53 €</dd>'
        + '        <dt data-i18n="rachat.ex.endettement"></dt><dd>21,86%</dd>'
        + '        <dt data-i18n="rachat.ex.total"></dt><dd>61 132 €</dd>'
        + '      </dl></div>'
        + '    </div>'
        + '    <div class="compare-result reveal">'
        + '      <div><strong data-i18n="rachat.ex.result"></strong></div>'
        + '      <div style="font-size:14px;color:rgba(255,255,255,0.82)" data-i18n="rachat.ex.save"></div>'
        + '    </div>'
        + '    <p style="color:var(--pcs-text-muted);font-size:13px;margin-top:18px" data-i18n="rachat.ex.disclaimer"></p>'
        + '  </div>'
        + '</section>';
    }

    // Explanation
    const features = D.explanation.featureKeys.map(function (k) {
      return '<li><span class="check">' + check + '</span><span data-i18n="' + k + '"></span></li>';
    }).join('');
    const expSection = ''
      + '<section' + (D.example ? ' class="section-alt"' : '') + '>'
      + '  <div class="container">'
      + '    <div class="split">'
      + '      <div class="reveal">'
      + '        <span class="eyebrow" data-i18n="common.explanationEyebrow"></span>'
      + '        <h2 style="margin-top:18px" data-i18n="' + D.explanation.titleKey + '"></h2>'
      + '        <p data-i18n="' + D.explanation.textKey + '"></p>'
      + '        <ul class="feature-list">' + features + '</ul>'
      + '      </div>'
      + '      <div class="split-img reveal reveal-2">'
      + '        <img src="' + (D.heroImg || '') + '" alt="" loading="lazy" />'
      + '      </div>'
      + '    </div>'
      + '  </div>'
      + '</section>';

    // Stats
    const statsCards = D.stats.map(function (s, i) {
      let v = s.num;
      let formatted = String(v);
      if (v >= 1000) formatted = v.toLocaleString('fr-FR');
      return ''
        + '<div class="stat"><div class="num" data-count="' + s.num + '" data-count-suffix="' + (s.suffix || '') + '">' + formatted + (s.suffix || '') + '</div>'
        + '<div class="lbl" data-i18n="' + s.labelKey + '"></div></div>';
    }).join('');
    const statsSection = ''
      + '<section class="section-dark">'
      + '  <div class="container">'
      + '    <div class="section-head reveal">'
      + '      <span class="eyebrow on-dark" data-i18n="common.keyFiguresEyebrow"></span>'
      + '      <h2 style="margin-top:18px" data-i18n="common.keyFigures"></h2>'
      + '    </div>'
      + '    <div class="stats reveal">' + statsCards + '</div>'
      + '  </div>'
      + '</section>';

    // Partners
    const partnerPills = D.partners.map(function (p) {
      return '<span class="partner-pill">' + p + '</span>';
    }).join('');
    const partnersSection = ''
      + '<section>'
      + '  <div class="container">'
      + '    <div class="section-head reveal">'
      + '      <span class="eyebrow" data-i18n="common.partnersEyebrow"></span>'
      + '      <h2 style="margin-top:18px" data-i18n="common.partners"></h2>'
      + '    </div>'
      + '    <div class="partners-row reveal">' + partnerPills + '</div>'
      + '  </div>'
      + '</section>';

    // CTA
    const ctaSection = ''
      + '<section class="section-alt">'
      + '  <div class="container">'
      + '    <div class="cta-banner reveal">'
      + '      <div>'
      + '        <h2 data-i18n="cta.title"></h2>'
      + '        <p data-i18n="cta.lead"></p>'
      + '      </div>'
      + '      <div class="actions">'
      + '        <a href="simulateur.html" class="btn btn-primary"><span data-i18n="cta.simulate"></span>' + arrow + '</a>'
      + '        <a href="contact.html" class="btn btn-outline-light" data-i18n="cta.contact"></a>'
      + '      </div>'
      + '    </div>'
      + '  </div>'
      + '</section>';

    root.innerHTML = hero + whySection + servicesSection + exampleSection + expSection + statsSection + partnersSection + ctaSection;

    // Re-run translations, reveal, counters after injection
    if (typeof window.pcsApplyTranslations === 'function') {
      const lang = (localStorage.getItem('pcs_lang') || 'fr');
      window.pcsApplyTranslations(lang);
    }
    // IntersectionObserver already initialised; manually observe new reveals
    document.dispatchEvent(new CustomEvent('pcs:dom-updated'));
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Wait a tick so main.js can render nav/footer first, but we're loaded after main.js anyway
    setTimeout(render, 0);
  });
})();
