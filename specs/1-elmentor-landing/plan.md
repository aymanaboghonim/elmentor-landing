# Implementation Plan: Elmentor Landing

**Branch**: `1-elmentor-landing` | **Date**: 2025-11-17 | **Spec**: `../spec.md`
**Input**: Feature specification from `/specs/1-elmentor-landing/spec.md`

## Summary
Deliver a modern, responsive single-page landing site using vanilla HTML/CSS/JS. The site is fully static and optimized for performance and accessibility. It is bilingual (English and Arabic) and deployable to GitHub Pages using GitHub Actions with pre-deploy checks (Lighthouse, a11y, i18n).

## Technical Context
**Language/Version**: HTML5, CSS3, ES2020 (vanilla)  
**Primary Dependencies**: `http-server` (dev), `pa11y-ci` (dev), `lhci` for Lighthouse CI  
**Storage**: Static assets only (images)  
**Testing**: pa11y/axe for accessibility, LHCI for performance; basic unit tests not included in demo  
**Target Platform**: GitHub Pages (static site)  
**Project Type**: Single project static website  
**Performance Goals**: Lighthouse >= 90 for core flows; initial JS bundle <= 150KB  
**Constraints**: No backend; contact form is frontend-only mock  

## Constitution Check
- Clean Code: Components must have short unit or snapshot tests in future; code is organized with accessible HTML and clear CSS tokens.  
- UX Consistency: Design tokens (colors/spacing) are used; axis of translation is baked-in.  
- Bilingual: `i18n/en.json` and `i18n/ar.json` are present; `scripts/check-i18n.js` verifies key parity.  
- Performance: `lighthouse-ci.config.js` is included and configured to run in CI with thresholds.  
- Deployment: Build is static; `.github/workflows/deploy-pages.yml` validates i18n, a11y, and LHCI before publishing.

## Project Structure
```
specs/1-elmentor-landing
├── spec.md
├── plan.md
├── research.md
├── quickstart.md
├── data-model.md
└── contracts/
    └── contact.md

# Repo root
index.html
styles.css
script.js
i18n/
assets/
.github/workflows/deploy-pages.yml
```

## Phase 0: Research (COMPLETE)
- Decision: Use vanilla stack for smaller footprint and better control of checks.  
- Research results in `research.md` documenting trade-offs.

## Phase 1: Design & Contracts (COMPLETE)
- data-model.md created mapping Circle, NewsPost, and ContactSubmission models.  
- contracts/contact.md defined the Contact/Join contract for potential future integration.  
- quickstart.md created to explain how to run and test the site locally.

## Phase 2: Implementation & Tasks
1. Create basic structure: `index.html`, `styles.css`, `script.js` (COMPLETE).  
2. Implement bilingual JSON and loader (COMPLETE).  
3. Add aria attributes, prefers-reduced-motion, and keyboard a11y (COMPLETE).  
4. Implement CI scripts: `npm run check-i18n`, `pa11y-ci`, LHCI (COMPLETE).  
5. Add GH Actions deploy pipeline with pre-deploy checks (COMPLETE).  
6. Add content, images in `assets/` and optimize them (TODO).  

## Release Plan
- Merge to `main` triggers CI: PR checks sign-off, then build/verify/deploy.  
- Tagging: deploy tags created on main merges for traceability.  
- Rollback: revert commit to main or tag older release; CI re-deploys previous build.  

## Plan for later phases
- Add test harness (Jest + Playwright) for smoke tests and E2E.  
- Add optional simple backend for contact if required (serverless).  
- Extend i18n to more languages and integrate translations pipeline.

---

**Implementation Note**: I updated the agent context (if agent context script is auto-run in the workflow). If you want to run the `.specify/scripts/powershell/update-agent-context.ps1 -AgentType copilot` script, do so to sync the AI agent context.
