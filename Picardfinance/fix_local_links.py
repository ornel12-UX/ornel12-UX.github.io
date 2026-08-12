from pathlib import Path

root = Path(r'c:\Users\hp\Documents\Picardfinance')

mapping = {
    'https://picardfinance.fr/': 'index.html',
    'https://www.picardfinance.fr/': 'index.html',
    'https://picardfinance.fr/about.html': 'about.html',
    'https://picardfinance.fr/assurance-pret.html': 'assurance-pret.html',
    'https://picardfinance.fr/avis-clients.html': 'avis-clients.html',
    'https://picardfinance.fr/contact.html': 'contact.html',
    'https://picardfinance.fr/credit-consommation.html': 'credit-consommation.html',
    'https://picardfinance.fr/credit-immobilier.html': 'credit-immobilier.html',
    'https://picardfinance.fr/credit-professionnel.html': 'credit-professionnel.html',
    'https://picardfinance.fr/credit-travaux.html': 'credit-travaux.html',
    'https://picardfinance.fr/demande-credit.html': 'demande-credit.html',
    'https://picardfinance.fr/faq.html': 'faq.html',
    'https://picardfinance.fr/mentions-legales.html': 'mentions-legales.html',
    'https://picardfinance.fr/politique-confidentialite.html': 'politique-confidentialite.html',
    'https://picardfinance.fr/simulateur.html': 'simulateur.html',
    'https://picardfinance.fr/services.html': 'services.html',
    'https://picardfinance.fr/services/index.html': 'services.html',
    'https://picardfinance.fr/services/credit-immobilier.html': 'services_credit-immobilier.html',
    'https://picardfinance.fr/services/rachat-credit.html': 'services_rachat-credit.html',
    'https://picardfinance.fr/services/pret-professionnel.html': 'services_pret-professionnel.html',
    'https://picardfinance.fr/services/assurance-pret.html': 'services_assurance-pret.html',
    'https://picardfinance.fr/outils/index.html': 'outils.html',
    'https://picardfinance.fr/outils/capacite-emprunt.html': 'outils_capacite-emprunt.html',
    'https://picardfinance.fr/outils/comparateur-taux.html': 'outils_comparateur-taux.html',
    'https://picardfinance.fr/outils/simulateur-credit.html': 'outils_simulateur-credit.html',
    'https://picardfinance.fr/rachat-credits.html': 'services_rachat-credit.html',
    'https://picardfinance.fr/villes/index.html': 'villes.html',
    'https://picardfinance.fr/villes/bois-darcy.html': 'villes_bois-darcy.html',
    'https://picardfinance.fr/villes/guyancourt.html': 'villes_guyancourt.html',
    'https://picardfinance.fr/villes/le-chesnay.html': 'villes_le-chesnay.html',
    'https://picardfinance.fr/villes/montigny-le-bretonneux.html': 'villes_montigny-le-bretonneux.html',
    'https://picardfinance.fr/villes/paris.html': 'villes_paris.html',
    'https://picardfinance.fr/villes/saint-germain-en-laye.html': 'villes_saint-germain-en-laye.html',
    'https://picardfinance.fr/villes/trappes.html': 'villes_trappes.html',
    'https://picardfinance.fr/villes/velizy-villacoublay.html': 'villes_velizy-villacoublay.html',
    'https://picardfinance.fr/villes/versailles.html': 'villes_versailles.html',
    'https://picardfinance.fr/villes/viroflay.html': 'villes_viroflay.html',
}

for path in root.glob('index/*.html'):
    if path.name == 'blog.html':
        continue
    text = path.read_text(encoding='utf-8')
    updated = text
    for old, new in mapping.items():
        updated = updated.replace(old, new)
    if updated != text:
        path.write_text(updated, encoding='utf-8')
        print(f'updated {path.name}')

print('local-links-fix-done')
