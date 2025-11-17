# Quickstart: Elmentor Landing (Local)

This quickstart demonstrates how to run the static demo locally and verify the Constitution checks.

1. Install dependencies

```pwsh
npm ci
```

2. Run local server

```pwsh
npm start
# opens at http://127.0.0.1:8080
```

3. Check i18n keys

```pwsh
npm run check-i18n
```

4. Run a11y check (pa11y)

```pwsh
npx pa11y-ci --ci
```

5. Run Lighthouse (locally)

```pwsh
npx lhci autorun --config=./lighthouse-ci.config.js
```

6. Deploy (CI) — this repo is configured with CI to run the above checks (a11y, i18n, Lighthouse) before publishing to GitHub Pages.

---

If you need the project to be portable to other static hosts, replace the GitHub Actions deploy step with the target host's CLI and ensure the same pre-deploy checks run.
