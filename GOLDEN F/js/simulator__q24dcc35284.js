/* Golden Finances & Investment - simulator.js */
(function () {
  'use strict';
  const FIXED_RATE = 0.03; // 3%

  function fmtEuro(lang, n) {
    try {
      const loc = lang === 'en' ? 'en-GB' : (lang === 'nl' ? 'nl-BE' : (lang === 'de' ? 'de-DE' : 'fr-FR'));
      return new Intl.NumberFormat(loc, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
    } catch (e) { return n.toFixed(0) + ' €'; }
  }
  function fmtEuro2(lang, n) {
    try {
      const loc = lang === 'en' ? 'en-GB' : (lang === 'nl' ? 'nl-BE' : (lang === 'de' ? 'de-DE' : 'fr-FR'));
      return new Intl.NumberFormat(loc, { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(n);
    } catch (e) { return n.toFixed(2) + ' €'; }
  }

  function monthly(amount, months, rate) {
    const n = months;
    const r = rate / 12;
    if (r === 0) return amount / n;
    return (amount * r) / (1 - Math.pow(1 + r, -n));
  }

  function getLang() {
    try { return localStorage.getItem('pcs_lang') || 'fr'; } catch (e) { return 'fr'; }
  }

  function t(key, fb) {
    try { if (typeof window.pcsT === 'function') return window.pcsT(key) || fb; } catch (e) {}
    return fb;
  }

  function compute(id) {
    const root = document.getElementById(id);
    if (!root) return;
    const amountInput = root.querySelector('[data-sim="amount"]');
    const durationInput = root.querySelector('[data-sim="duration"]');
    const amountLabels = root.querySelectorAll('[data-sim="amountLabel"]');
    const durationLabels = root.querySelectorAll('[data-sim="durationLabel"]');
    const outMonthly = root.querySelector('[data-sim="monthly"]');
    const outTotal = root.querySelector('[data-sim="total"]');
    const outInterest = root.querySelector('[data-sim="interest"]');
    const outRate = root.querySelector('[data-sim="rate"]');

    const amount = parseFloat(amountInput?.value || '0') || 0;
    const months = parseInt(durationInput?.value || '0', 10) || 0;
    const lang = getLang();

    const m = monthly(amount, months, FIXED_RATE);
    const total = m * months;
    const interest = total - amount;

    const yLabel = t('sim.years', 'ans');
    const yLabelOne = t('sim.year', 'an');
    const mLabel = t('sim.months', 'mois');
    const andLabel = t('sim.and', 'et');
    const yy = Math.floor(months / 12);
    const mm = months % 12;
    let durationText;
    if (yy > 0 && mm > 0) {
      durationText = yy + ' ' + (yy === 1 ? yLabelOne : yLabel) + ' ' + andLabel + ' ' + mm + ' ' + mLabel;
    } else if (yy > 0) {
      durationText = yy + ' ' + (yy === 1 ? yLabelOne : yLabel);
    } else {
      durationText = mm + ' ' + mLabel;
    }
    durationText += ' (' + months + ' ' + mLabel + ')';

    amountLabels.forEach(function (el) { el.textContent = fmtEuro(lang, amount); });
    durationLabels.forEach(function (el) { el.textContent = durationText; });

    if (outMonthly) outMonthly.textContent = fmtEuro2(lang, isFinite(m) ? m : 0);
    if (outTotal) outTotal.textContent = fmtEuro(lang, isFinite(total) ? total : 0);
    if (outInterest) outInterest.textContent = fmtEuro(lang, isFinite(interest) ? interest : 0);
    if (outRate) outRate.textContent = '3,00%';
  }

  /**
   * Ajoute un champ numérique synchronisé à côté de chaque curseur (slider),
   * pour permettre au client de saisir directement la valeur souhaitée.
   */
  function addNumberField(root, slider, id, suffix) {
    if (!slider || slider.__pcsNumWired) return;
    slider.__pcsNumWired = true;
    const wrap = document.createElement('div');
    wrap.className = 'sim-input-row';
    const num = document.createElement('input');
    num.type = 'number';
    num.className = 'sim-number';
    num.min = slider.min;
    num.max = slider.max;
    num.step = slider.step || '1';
    num.value = slider.value;
    num.setAttribute('inputmode', 'numeric');
    num.setAttribute('aria-label', suffix === '€' ? 'Montant du prêt en euros' : 'Durée en mois');
    num.placeholder = suffix === '€' ? 'Saisir le montant' : 'Saisir la durée (mois)';
    const unit = document.createElement('span');
    unit.className = 'sim-unit';
    unit.textContent = suffix;
    wrap.appendChild(num);
    wrap.appendChild(unit);
    slider.insertAdjacentElement('afterend', wrap);

    // Slider -> champ numérique
    slider.addEventListener('input', function () { num.value = slider.value; });
    // Champ numérique -> slider
    num.addEventListener('input', function () {
      const v = parseFloat(num.value);
      if (!isFinite(v)) return;
      slider.value = String(v);
      compute(id);
    });
    num.addEventListener('change', function () {
      let v = parseFloat(num.value);
      if (!isFinite(v)) { num.value = slider.value; return; }
      const min = parseFloat(slider.min), max = parseFloat(slider.max);
      if (v < min) v = min;
      if (v > max) v = max;
      num.value = String(v);
      slider.value = String(v);
      compute(id);
    });
  }

  function wire(id) {
    const root = document.getElementById(id);
    if (!root) return;
    const inputs = root.querySelectorAll('[data-sim="amount"], [data-sim="duration"]');
    // Tracking conversion : simulation considérée comme complétée 2 s après
    // la dernière interaction de l'utilisateur (dédupliqué côté analytics.js).
    var simTrackTimer = null;
    function scheduleSimTrack() {
      if (simTrackTimer) clearTimeout(simTrackTimer);
      simTrackTimer = setTimeout(function () {
        if (window.trackSimulatorUse) window.trackSimulatorUse({ label: id });
      }, 2000);
    }
    inputs.forEach(function (el) {
      el.addEventListener('input', function () { compute(id); scheduleSimTrack(); });
    });
    // Champs de saisie directe à côté des curseurs
    addNumberField(root, root.querySelector('input[type="range"][data-sim="amount"]'), id, '€');
    addNumberField(root, root.querySelector('input[type="range"][data-sim="duration"]'), id, 'mois');
    compute(id);
    document.addEventListener('pcs:langchange', function () { compute(id); });
  }

  window.PCS_SIM = { wire: wire, compute: compute };
  document.addEventListener('DOMContentLoaded', function () {
    const ids = ['simHome', 'simFull'];
    ids.forEach(wire);
  });
})();
