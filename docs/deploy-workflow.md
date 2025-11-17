# Elmentor — Deployment & Rollback Guide

This document describes the CI-driven deployment approach for the Elmentor landing page.

## Overview
- All feature changes are submitted as Pull Requests targeting `main`.
- The GitHub Actions pipeline runs on PRs (build & verify) and on `push` to `main` (build, verify, and deploy).
- Pre-deploy checks include: unit tests, accessibility (pa11y/axe), translation validation (i18n), and Lighthouse performance audits.
- Deploy artifacts are published to GitHub Pages by GitHub Actions using the Pages artifact workflow (no manual `gh-pages` pushes or branch juggling).
- Each deployment is linked to the commit and has an automatic tag for traceability.

## Pre-deploy: PR Checks
- PRs target `main`; the pipeline verifies that code meets Constitution requirements.
- PR checks:
  - `npm test` — unit tests
  - `npx pa11y-ci` — accessibility
  - `npm run check-i18n` — verifies English/Spanish keys
  - Lighthouse can be run locally or on an ephemeral preview if provided
- If any PR check fails, the PR must be fixed before merging.

## On merge-to-main: Deploy
- When `main` receives a merge, the `build` job does all verification work and stages the deployment artifact, then the `deploy` job publishes:
  - Build/tests/audits/i18n validation happen once inside the `build` job; failures block promotion.
  - The job creates a sanitized `dist/` directory (no `node_modules`, `.github`, etc.), runs `actions/configure-pages@v5`, and uploads the folder with `actions/upload-pages-artifact@v3`.
  - A minimal `deploy` job (with the `github-pages` environment) invokes `actions/deploy-pages@v4` so the only artifact promoted is what the `build` job verified. Repository Pages source must remain **GitHub Actions**.
  - Successful deployments trigger a follow-up tagging job that creates `deploy-YYYYMMDD-HHMM-<SHA>` tags for traceability; release events also tag `v<release>` against the release SHA.

## Rollback
- Rollback is typically performed by reverting a `main` merge commit and allowing CI to redeploy the previous state (this is auditable and keeps history clean).
- Steps:
  1. Find last good tag or commit (e.g., `deploy-20251117-1133-abcdef0`).
  2. Create a rollback PR that reverts the bad changes.
  3. Merge the rollback PR into `main` or create a recovery release.
  4. The CI pipeline will redeploy the restored build.

## Traceability & Auditing
- CI artifacts (a11y JSON, Lighthouse reports) are uploaded as build artifacts and kept per CI retention policy; the Pages artifact is separate and only contains deployable assets.
- Release notes should document translation changes and any public content updates.
- All builds are linked to commit SHAs and tags.

## Local checks (developers)
- Run tests: `npm test`
- Check i18n: `npm run check-i18n`
- Run a11y: `npx pa11y-ci`
- Run Lighthouse locally after building: `npx http-server ./build -p 8080 &` then use Lighthouse CLI or Chrome devtools

## CI Secrets & Configuration
- Ensure `secrets.GITHUB_TOKEN` is available for Actions (default) and has permission to create tags and to deploy Pages. If you still have a `gh-pages` branch created by earlier runs, delete it to avoid conflicts with the Actions-based deployment. Pages deployments run under a workflow-level concurrency lock (`group: pages`) so only one publish can run at a time.
- Optional: use a personal access token for cross-repository deploys or organization-wide secrets.

---

If you want, I can add an automated `rerun-deploy` GitHub Action to programmatically roll back to a specific tag using CI tokens (requires extra permissions).