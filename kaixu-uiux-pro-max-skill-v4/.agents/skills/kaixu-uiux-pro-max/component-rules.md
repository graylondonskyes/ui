# Component Rules

## Buttons

Every visible button must have a real action.

Allowed actions include:

- navigate to real route
- submit real form
- open/close real panel
- copy real content
- export real data
- trigger implemented local action

Do not ship inert buttons.

## Forms

Forms must either submit to existing backend logic or clearly perform a local/export action. Do not pretend to submit.

## Panels

Panels should be scrollable, minimizable, and expandable where appropriate.

## Navigation

Navigation links must point to existing files/routes or be created fully.

## Metrics

Metrics must come from data, local user input, or clearly labeled sample mode.
