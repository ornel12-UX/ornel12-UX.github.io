# Picard Finance

Site vitrine statique pour Picard Finance.

## Structure

- `index/` : pages HTML du site
- `css/` : feuilles de style
- `js/` : scripts JavaScript
- `images/` : visuels du site

## Déploiement GitHub Pages

Ce dépôt est prêt pour un déploiement GitHub Pages en mode statique.

### Option 1 : GitHub Pages depuis le dépôt

1. Créez un dépôt GitHub vide ou publiez ce dossier sur GitHub.
2. Dans le dépôt GitHub, ouvrez `Settings > Pages`.
3. Choisissez `GitHub Actions` comme source.
4. Poussez le projet sur la branche `main`.
5. Le workflow `.github/workflows/pages.yml` se chargera du déploiement.

### Option 2 : déploiement manuel via branche `gh-pages`

Vous pouvez aussi utiliser la branche `gh-pages` et choisir `Deploy from a branch` dans GitHub Pages.

## Lancement local

Ouvrez simplement le fichier `index/index.html` dans un navigateur, ou lancez un petit serveur local :

```bash
python -m http.server 8000
```

Ensuite ouvrez : http://localhost:8000/
