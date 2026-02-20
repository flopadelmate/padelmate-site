# padelmate-site

Site vitrine public de PadelMate (landing + pages légales) pour répondre aux exigences de publication Google Play Console.

## Objectif

- Landing page simple et SEO-friendly.
- URLs légales publiques et stables:
  - `/privacy`
  - `/terms` (CGU + CGV sur la même page)
  - `/legal`
  - `/delete-account`
- Déploiement standard Vercel (pas de static export).

## Stack

- Next.js App Router
- TypeScript strict
- Markdown + frontmatter pour le contenu légal

## Prérequis

- Node.js `20.x` (déclaré dans `engines.node`)
- npm

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

## Validation

```bash
npm run lint
npm run typecheck
npm run build
npm run check:bom
```

Ou en une commande:

```bash
npm run verify
```

## Scripts npm

- `dev`: lance le serveur de dev Next.js
- `build`: build de production
- `start`: démarre le build de production
- `lint`: lint ESLint
- `typecheck`: vérification TypeScript
- `format`: formatage Prettier
- `format:check`: vérification formatage
- `check:bom`: vérifie BOM + tokens courants de mojibake
- `verify`: suite complète lint + typecheck + build + encodage

## Contenu légal

Les textes légaux sont dans `content/legal/*.md` avec frontmatter obligatoire:

```md
---
title: ...
description: ...
lastUpdated: "YYYY-MM-DD"
---
```

Le chargement du contenu est isolé dans `src/lib/legal-content.ts`.

- Lecture via `fs` (runtime Node).
- Rendu uniforme via `src/components/LegalDocument.tsx` (server component, sans `use client`).

## Runtime Node pour pages légales

Les routes légales forcent:

```ts
export const runtime = "nodejs";
```

Routes concernées:

- `src/app/privacy/page.tsx`
- `src/app/terms/page.tsx`
- `src/app/legal/page.tsx`
- `src/app/delete-account/page.tsx`

## `/terms` (canonique)

- `/terms` reste l’URL canonique et assemble les documents CGU + CGV.
- La structure permet d’ajouter plus tard `/terms/cgu` et `/terms/cgv` sans casser `/terms`.

## Configuration future web-app

Variable préparée:

- `NEXT_PUBLIC_WEB_APP_URL` (fallback: `https://app.padelmate.com`)

Fichier:

- `src/config/site.ts`

Cette variable est prête pour un usage futur, sans activer de web-app dans ce repo.

## SEO

- Metadata globale dans `src/app/layout.tsx`
- Metadata par page via `src/lib/metadata.ts`
- `sitemap.xml` via `src/app/sitemap.ts`
- `robots.txt` via `src/app/robots.ts`

## Déploiement Vercel

1. Importer le repo dans Vercel.
2. Laisser les réglages Next.js standards.
3. Définir les variables d’environnement si nécessaire:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_WEB_APP_URL` (optionnel, fallback déjà prévu)
4. Déployer.

Important: ne pas activer de static export (`output: "export"`).

## Source legale mobile (verbatim)

Le contenu juridique de `/privacy`, `/terms` et `/legal` est repris des ecrans legaux du repo mobile `D:/dev/PadelMate/forehand`:

- `src/screens/settings/PrivacyPolicyScreen.tsx`
- `src/screens/settings/TermsScreen.tsx`
- `src/screens/settings/CGVScreen.tsx`
- `src/screens/settings/LegalNoticeScreen.tsx`

La page `/delete-account` assemble des extraits verbatim de `TermsScreen` et `PrivacyPolicyScreen` (pas de texte source dedie dans l'app mobile).
