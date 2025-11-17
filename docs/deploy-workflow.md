# Elmentor — Deployment & Rollback Guide

This document describes the CI-driven deployment approach for the Elmentor landing page.

## Overview
- All feature changes are submitted as Pull Requests targeting `main`.
- The GitHub Actions pipeline runs on PRs (build & verify) and on `push` to `main` (build, verify, and deploy).
- Pre-deploy checks include: unit tests, accessibility (pa11y/axe), translation validation (i18n), and Lighthouse performance audits.
- Deploy artifacts are published to GitHub Pages by a GitHub Actions job (no manual `gh-pages` pushes).
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
- When `main` receives a merge, the `deploy` job runs:
  - Build the site
  - Run audits again (Lighthouse, a11y, i18n) — any failure stops the pipeline and prevents deployment
  - Publish built artifacts to GitHub Pages via `actions-gh-pages` (CI-managed), writing audit artifacts to CI logs
  - Tag the commit with a `deploy-YYYYMMDD-HHMM-<SHA>` tag for traceability
  - Create a GitHub Release optionally if a Release was published

## Rollback
- Rollback is typically performed by reverting a `main` merge commit and allowing CI to redeploy the previous state (this is auditable and keeps history clean).
- Steps:
  1. Find last good tag or commit (e.g., `deploy-20251117-1133-abcdef0`).
  2. Create a rollback PR that reverts the bad changes.
  3. Merge the rollback PR into `main` or create a recovery release.
  4. The CI pipeline will redeploy the restored build.

## Traceability & Auditing
- CI artifacts (a11y JSON, Lighthouse reports) are uploaded as build artifacts and kept per CI retention policy.
- Release notes should document translation changes and any public content updates.
- All builds are linked to commit SHAs and tags.

## Local checks (developers)
- Run tests: `npm test`
- Check i18n: `npm run check-i18n`
- Run a11y: `npx pa11y-ci`
- Run Lighthouse locally after building: `npx http-server ./build -p 8080 &` then use Lighthouse CLI or Chrome devtools

## CI Secrets & Configuration
- Ensure `secrets.GITHUB_TOKEN` is available for Actions (default) and has permission to push tags and update `gh-pages`.
- Optional: use a personal access token for cross-repository deploys or organization-wide secrets.

---

If you want, I can add an automated `rerun-deploy` GitHub Action to programmatically roll back to a specific tag using CI tokens (requires extra permissions).