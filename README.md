# FishEye – Plateforme de photographes

Prototype de la plateforme FishEye, réalisé avec Next.js et React dans le cadre de la formation OpenClassrooms « Développeur IA ».
Priorité du projet : **l'accessibilité** (WCAG).

## Fonctionnalités

- **Accueil** : liste des photographes (portrait, nom, ville, slogan, prix).
- **Page photographe** (`/photographer/[id]`) : bandeau, galerie de photos et vidéos.
- **Tri** des médias par popularité, date ou titre (menu déroulant accessible au clavier).
- **Likes** enregistrés en base, avec le total dans l'encart en bas de page.
- **Lightbox** : navigation avec les boutons ou les flèches du clavier, fermeture avec la croix ou Échap.
- **Modale de contact** : formulaire dont le contenu est affiché dans la console.

## Installation

```bash
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Puis ouvrir http://localhost:3000

## Stack

Next.js 16 (App Router) · React 19 · Prisma 6 · SQLite · ESLint

## Accessibilité

- Balises sémantiques (`header`, `main`, `section`, `article`, `aside`, `figure`) et hiérarchie de titres respectée.
- Navigation complète au clavier, focus visible.
- Modales natives `<dialog>` : focus piégé en boucle, fermeture avec Échap, focus rendu à l'élément d'origine.
- Menu de tri sur le modèle ARIA « listbox » (`aria-expanded`, `aria-activedescendant`, `aria-selected`).
- Likes en boutons bascule (`aria-pressed`).
- Textes alternatifs : titre du média, nom du photographe.
- Testé avec le lecteur d'écran NVDA.

**Résultats des audits :**

- **AChecker** : aucun problème connu
- **Lighthouse** (bureau) : 100 en accessibilité sur l'accueil et la page photographe

![Résultat AChecker](docs/audits/achecker.png)
![Lighthouse - accueil](docs/audits/lighthouse-accueil.png)
![Lighthouse - page photographe](docs/audits/lighthouse-photographe.png)
