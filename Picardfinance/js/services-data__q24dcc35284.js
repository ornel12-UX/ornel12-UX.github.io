/* Picard Crédit Solutions - service pages data (i18n) */
(function () {
  // Shared banking partners list
  const PARTNERS = ['BNP Paribas', 'Crédit Agricole', 'Société Générale', 'LCL', 'CIC', 'BPCE', 'HSBC', 'ING', 'Boursorama', 'Fortuneo'];

  const DATA = {
    immo: {
      titleKey: 'svc.immo.title',
      heroKey: 'svc.immo.hero',
      heroImg: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1920&q=80',
      why: [
        { key: 'immo.why.1', value: '3%' },
        { key: 'immo.why.2', value: '72h' },
        { key: 'immo.why.3', value: '100%' },
        { key: 'immo.why.4', value: '15+' },
      ],
      services: ['immo.svc.1','immo.svc.2','immo.svc.3','immo.svc.4','immo.svc.5','immo.svc.6'],
      stats: [
        { num: 3, suffix: '%', labelKey: 'immo.stat.1' },
        { num: 72, suffix: 'h', labelKey: 'immo.stat.2' },
        { num: 15, suffix: '+', labelKey: 'immo.stat.3' },
        { num: 100, suffix: '%', labelKey: 'immo.stat.4' },
      ],
      explanation: { titleKey: 'immo.expl.title', textKey: 'immo.expl.text', featureKeys: ['immo.expl.f1','immo.expl.f2','immo.expl.f3'] },
      partners: PARTNERS,
    },
    rachat: {
      titleKey: 'svc.rachat.title',
      heroKey: 'svc.rachat.hero',
      heroImg: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1920&q=80',
      why: [
        { key: 'rachat.why.1', value: '3%' },
        { key: 'rachat.why.2', value: '72h' },
        { key: 'rachat.why.3', value: '-60%' },
        { key: 'rachat.why.4', value: '1' },
      ],
      services: ['rachat.svc.1','rachat.svc.2','rachat.svc.3','rachat.svc.4','rachat.svc.5','rachat.svc.6'],
      stats: [
        { num: 40, suffix: '%', labelKey: 'rachat.stat.1' },
        { num: 1, suffix: '', labelKey: 'rachat.stat.2' },
        { num: 896, suffix: '€', labelKey: 'rachat.stat.3' },
        { num: 67, suffix: '%', labelKey: 'rachat.stat.4' },
      ],
      explanation: { titleKey: 'rachat.expl.title', textKey: 'rachat.expl.text', featureKeys: ['rachat.expl.f1','rachat.expl.f2','rachat.expl.f3'] },
      example: true,
      partners: PARTNERS,
    },
    pro: {
      titleKey: 'svc.pro.title',
      heroKey: 'svc.pro.hero',
      heroImg: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1920&q=80',
      why: [
        { key: 'pro.why.1', value: '3%' },
        { key: 'pro.why.2', value: '72h' },
        { key: 'pro.why.3', value: '100%' },
        { key: 'pro.why.4', value: '★' },
      ],
      services: ['pro.svc.1','pro.svc.2','pro.svc.3','pro.svc.4','pro.svc.5','pro.svc.6'],
      stats: [
        { num: 3, suffix: '%', labelKey: 'pro.stat.1' },
        { num: 72, suffix: 'h', labelKey: 'pro.stat.2' },
        { num: 5, suffix: 'M€', labelKey: 'pro.stat.3' },
        { num: 15, suffix: '+', labelKey: 'pro.stat.4' },
      ],
      explanation: { titleKey: 'pro.expl.title', textKey: 'pro.expl.text', featureKeys: ['pro.expl.f1','pro.expl.f2','pro.expl.f3'] },
      partners: PARTNERS,
    },
    assurance: {
      titleKey: 'svc.assurance.title',
      heroKey: 'svc.assurance.hero',
      heroImg: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1920&q=80',
      why: [
        { key: 'ass.why.1', value: '-50%' },
        { key: 'ass.why.2', value: '48h' },
        { key: 'ass.why.3', value: '100%' },
        { key: 'ass.why.4', value: '15+' },
      ],
      services: ['ass.svc.1','ass.svc.2','ass.svc.3','ass.svc.4','ass.svc.5','ass.svc.6'],
      stats: [
        { num: 50, suffix: '%', labelKey: 'ass.stat.1' },
        { num: 48, suffix: 'h', labelKey: 'ass.stat.2' },
        { num: 4, suffix: '', labelKey: 'ass.stat.3' },
        { num: 15, suffix: '+', labelKey: 'ass.stat.4' },
      ],
      explanation: { titleKey: 'ass.expl.title', textKey: 'ass.expl.text', featureKeys: ['ass.expl.f1','ass.expl.f2','ass.expl.f3'] },
      partners: PARTNERS,
    },
    conso: {
      titleKey: 'svc.conso.title',
      heroKey: 'svc.conso.hero',
      heroImg: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1920&q=80',
      why: [
        { key: 'conso.why.1', value: '3%' },
        { key: 'conso.why.2', value: '24h' },
        { key: 'conso.why.3', value: '✓' },
        { key: 'conso.why.4', value: '75k' },
      ],
      services: ['conso.svc.1','conso.svc.2','conso.svc.3','conso.svc.4','conso.svc.5','conso.svc.6'],
      stats: [
        { num: 3, suffix: '%', labelKey: 'conso.stat.1' },
        { num: 24, suffix: 'h', labelKey: 'conso.stat.2' },
        { num: 1000, suffix: '€', labelKey: 'conso.stat.3' },
        { num: 75000, suffix: '€', labelKey: 'conso.stat.4' },
      ],
      explanation: { titleKey: 'conso.expl.title', textKey: 'conso.expl.text', featureKeys: ['conso.expl.f1','conso.expl.f2','conso.expl.f3'] },
      partners: PARTNERS,
    },
    travaux: {
      titleKey: 'svc.travaux.title',
      heroKey: 'svc.travaux.hero',
      heroImg: 'https://images.unsplash.com/photo-1581094289810-adf5d25690e3?auto=format&fit=crop&w=1920&q=80',
      why: [
        { key: 'tvx.why.1', value: '3%' },
        { key: 'tvx.why.2', value: '72h' },
        { key: 'tvx.why.3', value: '200k€' },
        { key: 'tvx.why.4', value: '15+' },
      ],
      services: ['tvx.svc.1','tvx.svc.2','tvx.svc.3','tvx.svc.4','tvx.svc.5','tvx.svc.6'],
      stats: [
        { num: 3, suffix: '%', labelKey: 'tvx.stat.1' },
        { num: 72, suffix: 'h', labelKey: 'tvx.stat.2' },
        { num: 200000, suffix: '€', labelKey: 'tvx.stat.3' },
        { num: 84, suffix: '', labelKey: 'tvx.stat.4' },
      ],
      explanation: { titleKey: 'tvx.expl.title', textKey: 'tvx.expl.text', featureKeys: ['tvx.expl.f1','tvx.expl.f2','tvx.expl.f3'] },
      partners: PARTNERS,
    },
  };

  window.PCS_SERVICES = DATA;
})();
