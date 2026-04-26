---
name: website-killer-stack
description: Use when building, upgrading, or auditing websites, landing pages, dashboards, SaaS pages, AI app UIs, 3D/animated interfaces, and premium client-facing web surfaces.
---

# Website Killer Stack Skill

## Purpose

Build premium websites without breaking existing plumbing.

This skill uses the local reference repos in `.reference/openai-website-power-repos/` as inspiration and implementation guidance, not as code to blindly dump into the app.

## Local Reference Repos

Use these references when useful:

- `.reference/openai-website-power-repos/openai-codex`
- `.reference/openai-website-power-repos/openai-agents-js`
- `.reference/openai-website-power-repos/openai-agents-python`
- `.reference/openai-website-power-repos/openai-cookbook`
- `.reference/openai-website-power-repos/openai-responses-starter-app`
- `.reference/openai-website-power-repos/openai-evals`
- `.reference/openai-website-power-repos/openai-guardrails-js`
- `.reference/openai-website-power-repos/openai-guardrails-python`
- `.reference/openai-website-power-repos/vercel-ai-sdk`
- `.reference/openai-website-power-repos/vercel-ai-elements`
- `.reference/openai-website-power-repos/shadcn-ui`
- `.reference/openai-website-power-repos/magicui`
- `.reference/openai-website-power-repos/react-three-fiber`
- `.reference/openai-website-power-repos/drei`
- `.reference/openai-website-power-repos/react-three-uikit`

## Mandatory First Pass

Before editing, inspect:

1. `package.json`
2. framework/runtime
3. route structure
4. existing CSS/global styles
5. existing components
6. public/assets directory
7. deployment config
8. env examples
9. build/test/smoke scripts

Do not rewrite the project blindly.

## Website Upgrade Standard

When the user asks for a better website, implement real improvements:

- premium hero section
- strong visual hierarchy
- clean spacing
- responsive layout
- modern nav
- readable sections
- polished cards
- working CTAs
- real forms only when wired
- accessible contrast
- smooth animation only when safe
- mobile-first layout
- SEO metadata where framework supports it
- no fake dashboards
- no fake counters unless clearly backed by data
- no dead buttons

## AI Website/App UI Standard

For AI apps, prefer:

- Vercel AI SDK patterns when building streaming chat or AI UX
- AI Elements patterns for chat/message/status components
- OpenAI Responses/Agents examples for OpenAI-backed flows
- Guardrails examples for validation and safety boundaries
- Evals patterns when proof/testing is requested

## Visual System Standard

For premium UI, adapt ideas from:

- shadcn/ui for accessible component structure
- Magic UI for animated copy/paste effects
- react-three-fiber for React 3D scenes
- drei for helpers, camera, environment, and ready-made abstractions
- react-three-uikit for 3D UI panels when needed

Never add visual effects that block usability.

## Preserve

Always preserve:

- existing brand identity
- existing CSS tokens
- existing logo/image usage
- existing routes
- existing backend calls
- existing auth/billing/provider logic
- existing deployment assumptions
- existing working buttons
- existing working forms
- existing navigation

## Forbidden

Do not:

- add nonfunctional buttons
- add fake provider calls
- add demo-only claims
- remove real plumbing for cosmetic reasons
- replace brand identity with generic template UI
- put developer notes inside client-facing pages
- mark anything complete without code-backed proof
- use X marks in trackers

## Completion Standard

Use this proof style:

✅ code-backed complete
☐ open / not complete

A website pass is complete only when:

✅ files were actually changed
✅ the project still builds or failure is reported honestly
✅ visible controls work or were removed
✅ client-facing UI has no dev notes
✅ responsive layout is checked
✅ no fake functionality was added
