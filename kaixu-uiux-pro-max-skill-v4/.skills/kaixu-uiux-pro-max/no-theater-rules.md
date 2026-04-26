# No Theater Rules

The following are forbidden:

- fake dashboards
- fake connected status
- fake AI output
- fake payment success
- fake auth
- fake integrations
- fake export buttons
- fake route links
- fake smoke proof

If a capability depends on env vars, code the integration path and fail loudly when vars are missing.

Use clear truth states:

- configured
- missing env var
- offline local mode
- sample data mode
- provider unavailable
