---
# AGENTS.md — Codex instructions (PadelMate Site)

## Directive non négociable
Quand tu écris du code ou modifies des fichiers :
"Sois précis, robuste et exhaustif. Reste simple. Crée une structure cohérente et documente-la. Mets à jour la doc si nécessaire. Vérifie que le projet build correctement à la fin."

## Principes
- KISS : solutions simples, lisibles, maintenables.
- DRY : factoriser seulement si un pattern revient réellement.
- Cohérence : réutiliser les patterns existants du repo avant d’en inventer.
- Pas d’optimisation prématurée : priorité au socle.

## Qualité
- Si TypeScript est utilisé : mode strict, pas de `any` sauf cas rarissime et justifié.
- Éviter les contournements (`as any`, `unknown as X`) sauf justification.
- Garder les dépendances au minimum.

## Front web (site vitrine)
- Priorité au contenu + SEO + stabilité des URLs.
- Pages légales publiques, accessibles sans login.
- HTML sémantique, accessibilité basique.
- Styles : simples et cohérents (CSS variables / design tokens légers autorisés).

## Commandes & git
- NE PAS faire d’opérations git (commit/push/merge/checkout) sauf demande explicite.
- NE PAS lancer de process long (serveurs) sauf demande explicite.
- Les commandes de validation sont autorisées si nécessaires (lint/build/typecheck).

## Sécurité d’encodage
- Tous les fichiers texte (.md,.json,.ts,.tsx,.yml,.mjs,.css,.html) doivent rester UTF-8 sans BOM.
- Interdiction d’écrire via redirection PowerShell (>, >>) ou Out-File / Set-Content / Add-Content.
- Préférer des modifications patch-based (apply_patch) ou des writers Node/Python en UTF-8 no BOM.

## Documentation
- Tout nouveau pattern important doit être expliqué dans README.md ou docs/*.
---
