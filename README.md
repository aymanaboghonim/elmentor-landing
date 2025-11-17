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


Note on GitHub Pages source
---------------------------

- This project uses the official GitHub Actions Pages flow to publish the site. Make sure your repository's Pages settings are set to use _GitHub Actions_ (not `gh-pages` branch or `docs/` folder).
- If you previously used the `gh-pages` branch (older workflow runs), you can delete it to avoid conflicts: `git push origin --delete gh-pages` or `gh repo delete-branch gh-pages` (requires GitHub CLI). After that, re-run the CI to publish using Actions.
This repo is configured to deploy automatically to GitHub Pages via the `.github/workflows/deploy-pages.yml` workflow on pushes to `main` or when a release is published. The site is built from the repository root (the demo is static), and audit artifacts (Pa11y, Lighthouse) are stored with each CI run.
```

This repo is demo-only and contains a frontend-only Contact/Join form that shows a localized "Thank you" message on submit.
