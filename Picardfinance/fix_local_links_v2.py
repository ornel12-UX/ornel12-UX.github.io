from pathlib import Path

root = Path(r'c:\Users\hp\Documents\Picardfinance')

mapping = {
    'https://picardfinance.fr/#organization': 'index.html#organization',
    'https://picardfinance.fr/#website': 'index.html#website',
    'https://picardfinance.fr/': 'index.html',
    'https://www.picardfinance.fr/': 'index.html',
    '../index.html': 'index.html',
    '../about/index.html': 'about.html',
    '../assurance-pret/index.html': 'assurance-pret.html',
    '../contact/index.html': 'contact.html',
    '../credit-consommation/index.html': 'credit-consommation.html',
    '../credit-immobilier/index.html': 'credit-immobilier.html',
    '../credit-professionnel/index.html': 'credit-professionnel.html',
    '../credit-travaux/index.html': 'credit-travaux.html',
    '../demande-credit/index.html': 'demande-credit.html',
    '../faq/index.html': 'faq.html',
    '../mentions-legales/index.html': 'mentions-legales.html',
    '../politique-confidentialite/index.html': 'politique-confidentialite.html',
    '../simulateur/index.html': 'simulateur.html',
    '../services/index.html': 'services.html',
    '../services_index/index.html': 'services.html',
    '../outils/index.html': 'outils.html',
    '../villes/index.html': 'villes.html',
    '../villes_index/index.html': 'villes.html',
    '../about.html': 'about.html',
    '../assurance-pret.html': 'assurance-pret.html',
    '../contact.html': 'contact.html',
    '../credit-consommation.html': 'credit-consommation.html',
    '../credit-immobilier.html': 'credit-immobilier.html',
    '../credit-professionnel.html': 'credit-professionnel.html',
    '../credit-travaux.html': 'credit-travaux.html',
    '../demande-credit.html': 'demande-credit.html',
    '../faq.html': 'faq.html',
    '../mentions-legales.html': 'mentions-legales.html',
    '../politique-confidentialite.html': 'politique-confidentialite.html',
    '../simulateur.html': 'simulateur.html',
    '../services.html': 'services.html',
    '../outils.html': 'outils.html',
    '../villes.html': 'villes.html',
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
    'index.htmlabout.html': 'about.html',
    'index.htmlassurance-pret.html': 'assurance-pret.html',
    'index.htmlavis-clients.html': 'avis-clients.html',
    'index.htmlcontact.html': 'contact.html',
    'index.htmlcredit-consommation.html': 'credit-consommation.html',
    'index.htmlcredit-immobilier.html': 'credit-immobilier.html',
    'index.htmlcredit-professionnel.html': 'credit-professionnel.html',
    'index.htmlcredit-travaux.html': 'credit-travaux.html',
    'index.htmldemande-credit.html': 'demande-credit.html',
    'index.htmlfaq.html': 'faq.html',
    'index.htmlmentions-legales.html': 'mentions-legales.html',
    'index.htmlpolitique-confidentialite.html': 'politique-confidentialite.html',
    'index.htmlsimulateur.html': 'simulateur.html',
    'index.htmlservices.html': 'services.html',
    'index.htmlservices/index.html': 'services.html',
    'index.htmlservices/credit-immobilier.html': 'services_credit-immobilier.html',
    'index.htmlservices/pret-professionnel.html': 'services_pret-professionnel.html',
    'index.htmlservices/assurance-pret.html': 'services_assurance-pret.html',
    'index.htmlservices/rachat-credit.html': 'services_rachat-credit.html',
    'index.htmloutils/index.html': 'outils.html',
    'index.htmloutils/capacite-emprunt.html': 'outils_capacite-emprunt.html',
    'index.htmloutils/comparateur-taux.html': 'outils_comparateur-taux.html',
    'index.htmloutils/simulateur-credit.html': 'outils_simulateur-credit.html',
    'index.htmlvilles/index.html': 'villes.html',
    'index.htmlvilles/bois-darcy.html': 'villes_bois-darcy.html',
    'index.htmlvilles/guyancourt.html': 'villes_guyancourt.html',
    'index.htmlvilles/le-chesnay.html': 'villes_le-chesnay.html',
    'index.htmlvilles/montigny-le-bretonneux.html': 'villes_montigny-le-bretonneux.html',
    'index.htmlvilles/paris.html': 'villes_paris.html',
    'index.htmlvilles/saint-germain-en-laye.html': 'villes_saint-germain-en-laye.html',
    'index.htmlvilles/trappes.html': 'villes_trappes.html',
    'index.htmlvilles/velizy-villacoublay.html': 'villes_velizy-villacoublay.html',
    'index.htmlvilles/versailles.html': 'villes_versailles.html',
    'index.htmlvilles/viroflay.html': 'villes_viroflay.html',
    'index.html': 'index.html',
}

for path in root.glob('index/*.html'):
    if path.name == 'blog.html':
        continue
    text = path.read_text(encoding='utf-8')
    updated = text
    for old, new in sorted(mapping.items(), key=lambda kv: len(kv[0]), reverse=True):
        updated = updated.replace(old, new)
    if updated != text:
        path.write_text(updated, encoding='utf-8')
        print(f'updated {path.name}')

# fix blog separately because it contains many more generated article links that do not exist in the project
for path in root.glob('index/blog.html'):
    text = path.read_text(encoding='utf-8')
    updated = text.replace('../services/index.html', 'services.html')
    updated = updated.replace('../simulateur/index.html', 'simulateur.html')
    updated = updated.replace('../about/index.html', 'about.html')
    updated = updated.replace('../faq/index.html', 'faq.html')
    updated = updated.replace('../contact/index.html', 'contact.html')
    updated = updated.replace('../index.html', 'index.html')
    if updated != text:
        path.write_text(updated, encoding='utf-8')
        print(f'updated {path.name}')

print('local-links-cleaned')

for path in root.glob('index/*.html'):
    if path.name == 'blog.html':
        continue
    text = path.read_text(encoding='utf-8')
    updated = text
    for old, new in sorted(mapping.items(), key=lambda kv: len(kv[0]), reverse=True):
        updated = updated.replace(old, new)
    if updated != text:
        path.write_text(updated, encoding='utf-8')
        print(f'updated {path.name}')

print('local-links-cleaned')
