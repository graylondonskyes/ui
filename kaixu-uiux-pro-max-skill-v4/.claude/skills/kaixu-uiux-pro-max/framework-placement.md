# Framework Placement Rules

## Static HTML

Place styles in:

```text
styles.css
assets/css/*.css
or inline only if the project is already single-file
```

Do not convert to React unless explicitly ordered.

## React / Vite

Preferred locations:

```text
src/components/
src/pages/
src/App.jsx or src/App.tsx
src/styles/
```

Preserve router and state.

## Next.js App Router

Preferred locations:

```text
app/page.tsx
app/**/page.tsx
components/
styles/globals.css
```

Do not break server/client component boundaries.

## Next.js Pages Router

Preferred locations:

```text
pages/*.tsx
components/
styles/globals.css
```

## Theia / IDE

Only add UI through existing extension/plugin architecture. Do not replace shell.
