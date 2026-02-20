# Quality Gates

Ce document definit les controles bloquants et la routine de verification du repo `publicWebsite`.

## Gates bloquants

Les gates suivants doivent passer en local et en CI:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run check:bom`
- `npm run check:delete-account-copy`
- `npm run audit:prod`

Un echec sur l'un de ces points bloque la fusion de la PR.

## Audit de dependances

- `npm run audit:prod` est bloquant (dependances runtime).
- `npm run audit:full` est informatif (inclut devDependencies).
- Les vulnerabilites uniquement devDependencies ne bloquent pas la release, mais doivent etre revues.

Cadence minimale de revue:

- Revue mensuelle des vulnerabilites devDependencies.
- Traitement prioritaire si une faille devient exploitable en CI, tooling expose, ou chaine de build distante.

## Checklist PR prete a merger

- Les gates bloquants passent en local.
- Le workflow GitHub Actions `CI` passe integralement.
- Les URLs publiques restent stables (`/`, `/privacy`, `/terms`, `/legal`, `/delete-account`).
- Les changements SEO restent coherents (canonical, sitemap, robots).
- Si un nouveau pattern important est introduit, la documentation est mise a jour.
