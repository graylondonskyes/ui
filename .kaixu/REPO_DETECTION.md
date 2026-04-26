# Repo Detection Rules

## STATIC_HTML
Signals: `index.html`, no frontend build system, styles.css/assets/css.
Action: upgrade HTML/CSS/vanilla JS directly. Do not convert to React unless explicitly ordered.

## REACT_VITE
Signals: `vite.config.*`, `src/main.*`, `src/App.*`.
Action: upgrade components/styles inside `src/`, preserve router/state/API calls.

## NEXT_APP_ROUTER
Signals: `next.config.*`, `app/**/page.*`.
Action: respect server/client component boundaries.

## NEXT_PAGES_ROUTER
Signals: `next.config.*`, `pages/**`.
Action: preserve API routes under `pages/api`.

## ASTRO
Signals: `astro.config.*`, `src/pages/**.astro`.

## SVELTEKIT
Signals: `svelte.config.*`, `src/routes/**`.

## THEIA_IDE
Signals: package names include `@theia`, `platform/ide-core`, Theia extension packages.
Action: add UI through extension/plugin lanes only.

## NODE_BACKEND_WITH_FRONTEND
Signals: package.json, server/API files, public/client frontend.

## UNKNOWN
Inspect more. Do not install dependencies automatically.
