from pathlib import Path

root = Path(r'c:\Users\hp\Documents\Picardfinance')
index_dir = root / 'index'

mapping = {
    '../index/index.html': 'index.html',
    '../index.html': 'index.html',
    '../about/index.html': 'about.html',
    '../assurance-pret/index.html': 'assurance-pret.html',
    '../avis-clients/index.html': 'avis-clients.html',
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
    '../services_index/__qd1179d8e3f.html': 'services.html',
    '../services_index/__q0933497c20.html': 'services.html',
    '../services_index/__q79a8892e30.html': 'services.html',
    '../services_index/__q035b4b8495.html': 'services.html',
    '../outils/index.html': 'outils.html',
    '../villes/index.html': 'villes.html',
    '../villes_index/index.html': 'villes.html',
    '../villes_index/__qd1179d8e3f.html': 'villes.html',
    '../villes_index/__q0933497c20.html': 'villes.html',
    '../villes_index/__q79a8892e30.html': 'villes.html',
    '../villes_index/__q035b4b8495.html': 'villes.html',
    '../rachat-credits/index.html': 'services_rachat-credit.html',
    '../rachat-credit/index.html': 'services_rachat-credit.html',
    '../pret-professionnel/index.html': 'services_pret-professionnel.html',
    '../assurance-pret.html': 'assurance-pret.html',
    '../contact.html': 'contact.html',
    '../simulateur.html': 'simulateur.html',
    '../faq.html': 'faq.html',
    '../services.html': 'services.html',
    '../about.html': 'about.html',
    '../villes.html': 'villes.html',
    '../outils.html': 'outils.html',
    '../__qd1179d8e3f.html': 'index.html',
    '../__q0933497c20.html': 'index.html',
    '../__q79a8892e30.html': 'index.html',
    '../__q035b4b8495.html': 'index.html',
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

invalid_blog_links = [
    'calculer-capacite-emprunt-immobilier-2026.html',
    'conditions-obtention-pret-immobilier-2026.html',
    'credit-immobilier-taux-fixe-variable-choix-2026.html',
    'comprendre-taeg-cout-reel-credit-immobilier.html',
    'delegation-assurance-pret-immobilier-economies-2026',
    'regroupement-credits-locataire-2026',
    'capacite-emprunt-immobilier-calcul-2026',
    'credit-professionnel-artisan-versailles-2026',
    'investissement-locatif-versailles-quartiers-rendements-2026',
    'rachat-credits-proprietaire-guide-2026',
    'simulation-pret-immobilier-300000-euros-2026',
    'barometre-taux-immobilier-yvelines-juin-2026',
    'delegation-assurance-emprunteur-economies-2026',
    'credit-immobilier-vefa-neuf-2026',
    'combien-emprunter-4000-euros-salaire-2026',
    'investissement-locatif-lmnp-versailles-2026',
    'pret-relais-versailles-guide-2026',
    'capacite-emprunt-2026-salaire',
    'dossier-pret-immobilier-documents-2026',
    'llms-txt-visibilite-ia-picard-finance.html',
    'schema-org-organization-localbusiness-financialservice.html',
    'rapport-seo-quotidien-picard-finance-2026-05-04.html',
]

for path in sorted(index_dir.glob('*.html')):
    text = path.read_text(encoding='utf-8', errors='ignore')
    updated = text
    for old, new in sorted(mapping.items(), key=lambda kv: len(kv[0]), reverse=True):
        updated = updated.replace(old, new)
    if path.name == 'blog.html':
        for target in invalid_blog_links:
            updated = updated.replace(f'href="{target}"', 'href="blog.html"')
            updated = updated.replace(f"href='{target}'", "href='blog.html'")
    if updated != text:
        path.write_text(updated, encoding='utf-8')
        print(f'updated {path.name}')

print('done')
