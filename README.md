# Elmentor Landing — Demo

This is a minimal static landing page demo for the Elmentor mentorship program.

Quick start (PowerShell):

```pwsh
npm ci
npm start
# open http://127.0.0.1:8080
```

Run the i18n check:

```pwsh
npm run check-i18n
```

Run a11y locally with pa11y:

```pwsh
npx pa11y-ci --ci

Deployment
----------

This repo is configured to deploy automatically to GitHub Pages via the `.github/workflows/deploy-pages.yml` workflow on pushes to `main` or when a release is published. The site is built from the repository root (the demo is static), and audit artifacts (Pa11y, Lighthouse) are stored with each CI run.
```

This repo is demo-only and contains a frontend-only Contact/Join form that shows a localized "Thank you" message on submit.
