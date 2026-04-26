# kAIxU UI Upgrade Playbook v4

1. Run repo intake.
2. Detect framework.
3. Read existing brand assets and CSS.
4. Inventory routes, buttons, forms, panels, modals, and API calls.
5. Use Context7 MCP for current docs where framework/library details matter.
6. Start local app when possible.
7. Use Playwright MCP for rendered UI inspection where available.
8. Preserve all functionality.
9. Upgrade layout, hierarchy, spacing, motion, responsiveness, and accessibility.
10. Remove or wire dead controls.
11. Run smoke.
12. Report truthfully.

Forbidden: replacing working app with pretty shell, removing handlers, fake buttons, fake AI claims, fake analytics, placeholder pricing, broken PWA/offline behavior, route changes without redirects, and MCP/browser claims without proof.

Preferred panels: readable, scrollable, minimizable, expandable, detachable where architecture allows, mobile safe.
