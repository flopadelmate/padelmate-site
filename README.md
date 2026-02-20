# padelmate-site

Site vitrine public de PadelMate (landing + pages legales) pour repondre aux exigences de publication Google Play Console.

## Objectif

- Landing page simple et SEO-friendly.
- URLs legales publiques et stables:
  - `/privacy`
  - `/terms` (CGU + CGV sur la meme page)
  - `/legal`
  - `/delete-account`
- Deploiement standard Vercel (pas de static export).

## Stack

- Next.js App Router
- TypeScript strict
- Markdown + frontmatter pour le contenu legal

## Prerequis

- Node.js `20.x` (declare dans `engines.node`)
- npm

## Installation

```bash
npm install
```

## Developpement

```bash
npm run dev
```

## Validation locale

```bash
npm run lint
npm run typecheck
npm run build
npm run check:bom
npm run audit:prod
```

Ou en une commande:

```bash
npm run verify
```

## Scripts npm

- `dev`: lance le serveur de dev Next.js
- `build`: build de production
- `start`: demarre le build de production
- `lint`: lint ESLint via CLI (`eslint . --max-warnings=0`)
- `typecheck`: verification TypeScript
- `format`: formatage Prettier
- `format:check`: verification formatage
- `check:bom`: verifie BOM + tokens courants de mojibake
- `audit:prod`: audit npm bloque sur dependances runtime
- `audit:full`: audit npm informatif (inclut devDependencies)
- `verify`: suite complete lint + typecheck + build + encodage

## CI GitHub Actions

Workflow: `.github/workflows/ci.yml`

Declenchement:

- `push` sur `main` et `master`
- `pull_request` vers `main` et `master`

Gates bloquants executes en CI:

- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run check:bom`
- `npm run audit:prod`

## Politique securite dependances

- Les vulnerabilites runtime (`audit:prod`) sont bloquantes.
- Les vulnerabilites limitees aux devDependencies sont informatives dans ce repo.
- Une revue mensuelle des devDependencies est requise.

Detail des quality gates: `docs/quality-gates.md`.

## Contenu legal

Les textes legaux sont dans `content/legal/*.md` avec frontmatter obligatoire:

```md
---
title: ...
description: ...
lastUpdated: "YYYY-MM-DD"
---
```

Le chargement du contenu est isole dans `src/lib/legal-content.ts`.

- Lecture via `fs` (runtime Node).
- Rendu uniforme via `src/components/LegalDocument.tsx` (server component, sans `use client`).

## Runtime Node pour pages legales

Les routes legales forcent:

```ts
export const runtime = "nodejs";
```

Routes concernees:

- `src/app/privacy/page.tsx`
- `src/app/terms/page.tsx`
- `src/app/legal/page.tsx`
- `src/app/delete-account/page.tsx`

## /terms (canonique)

- `/terms` reste l'URL canonique et assemble les documents CGU + CGV.
- La structure permet d'ajouter plus tard `/terms/cgu` et `/terms/cgv` sans casser `/terms`.

## Configuration future web-app

Variable preparee:

- `NEXT_PUBLIC_WEB_APP_URL` (fallback: `https://app.padelmate.com`)

Fichier:

- `src/config/site.ts`

Cette variable est prete pour un usage futur, sans activer de web-app dans ce repo.

## SEO

- Metadata globale dans `src/app/layout.tsx`
- Metadata par page via `src/lib/metadata.ts`
- `sitemap.xml` via `src/app/sitemap.ts` (date derivee du contenu legal, fallback date de build)
- `robots.txt` via `src/app/robots.ts`

## Deploiement Vercel

1. Importer le repo dans Vercel.
2. Laisser les reglages Next.js standards.
3. Definir les variables d'environnement si necessaire:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_WEB_APP_URL` (optionnel, fallback deja prevu)
4. Deployer.

Important: ne pas activer de static export (`output: "export"`).

## Source legale mobile (verbatim)

Le contenu juridique de `/privacy`, `/terms` et `/legal` est repris des ecrans legaux du repo mobile `D:/dev/PadelMate/forehand`:

- `src/screens/settings/PrivacyPolicyScreen.tsx`
- `src/screens/settings/TermsScreen.tsx`
- `src/screens/settings/CGVScreen.tsx`
- `src/screens/settings/LegalNoticeScreen.tsx`

La page `/delete-account` assemble des extraits verbatim de `TermsScreen` et `PrivacyPolicyScreen` (pas de texte source dedie dans l'app mobile).
