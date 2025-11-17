# Research: Elmentor Landing — Phase 0

Date: 2025-11-17

## Decision Summary
- Use vanilla HTML/CSS/JS for minimal footprint and best performance for static GitHub Pages so we meet the Constitution performance goals.
- i18n: Use static JSON files per language (already implemented `i18n/en.json` and `i18n/ar.json`) with a small loader that sets `dir` attribute and updates UI text keys.
- Accessibility: Use pa11y + axe rules in CI; prefer a color palette meeting WCAG AA contrast, semantic HTML, and keyboard support for interactive elements.
- Performance: Keep initial JS < 150KB; use lazy-loading images (loading="lazy"); use AVIF/WebP if possible; images stored locally under `assets/`.
- GitHub Actions deploy: Full CI must check `check-i18n`, pa11y, and Lighthouse — keep demo build static and simple.

## Alternatives considered
- Full framework (React/Vue/Svelte): Rejected to keep bundle sizes low and match Constitution.
- External i18n service: Rejected to keep content fully static and hostable on GitHub Pages.
- Serverless backend for contact: Rejected per the user's choice; mock frontend-only form used.

## Rationale
- The Constitution prioritizes performance, accessibility, and simple deploys; vanilla stack provides predictable, small payloads and easier auditability.
- Using GitHub Actions with existing tools ensures pre-deploy checks in the pipeline, aligning with the Constitution checks.

## Action Items
- Add Lighthouse and pa11y configs to the repo (done: `lighthouse-ci.config.js` and `package.json` includes pa11y dependency).
- Document the deploy workflow and rollback behavior in `docs/deploy-workflow.md`.
- Ensure `i18n/check-i18n.js` is robust (it currently fails on missing keys). Add tests if needed.
