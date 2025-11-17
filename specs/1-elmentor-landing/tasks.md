---
description: "Task list for building the Elmentor landing page"
---

# Tasks: Elmentor Landing Page

**Input**: `spec.md` and `plan.md` in `specs/1-elmentor-landing/`

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Initialize Vite-based project (frontend) in repo root with minimal template (vanilla or Preact/React per preference) — run `npm create vite@latest . --template` and commit `package.json` [P]
- [ ] T002 Add development dependency `http-server` for local CI-level audits and `pa11y-ci` and `lhci` for audits — update `package.json` scripts [P]
- [ ] T003 Configure ESLint + Prettier and add GitHub pre-commit hooks (husky) for code formatting and linting [P]
- [ ] T004 Initialize `i18n/` folder with `en.json` and `ar.json`, and add `scripts/check-i18n.js` (verify key parity) under `scripts/` [P]
- [ ] T005 Create `.github/workflows/deploy-pages.yml` for CI — include build, `npm run check-i18n`, pa11y, LHCI, and actions-gh-pages deployment (verify commit/tag on deploy)

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T006 [P] Create `src/components/` structure and `src/styles/tokens.css` (design tokens: colors, space, type scale) that every component imports
- [ ] T007 [P] Implement responsive CSS utility classes and accessible layout scaffolding in `src/styles/base.css` and `src/styles/grid.css`
- [ ] T008 Add `src/i18n/index.js` loader & `src/data/` for static circle/news seed data files; confirm they load from `i18n/en.json` and `i18n/ar.json`
- [ ] T009 Implement `src/utils/a11y-checks.js` checklist for focus states and keyboard traps, add sample checks to unit tests
- [ ] T010 Configure Lighthouse CI using `lighthouse-ci.config.js` (thresholds for performance/ accessibility) and integrate into `deploy-pages.yml`
- [ ] T011 Add image assets to `assets/` and optimize (AVIF/WebP fallback) — commit images and list file paths in `specs/1-elmentor-landing/plan.md`

---

## Phase 3: User Story 1 - Discover & Join (Priority: P1) 🎯 MVP

Goal: Visitors can discover Elmentor and join via frontend mock form.

**Independent Test**: Landing shows hero with CTA, About section. Form collects `email` only (and optionally `name`), shows localized "Thank you" message on submit.

- [ ] T012 [P] [US1] Add `src/components/Hero.*` (HTML/JS/CSS) — title, subtitle, and CTA linking to Contact
- [ ] T013 [US1] Add `src/components/About.*` (HTML/JS/CSS) copy and visuals
- [ ] T014 [US1] Add UI for Contact/Join component `src/components/Contact.*` with frontend-only mock: collects `email` and `name`, shows `#thanksMessage` localized on submit
- [ ] T015 [US1] Add i18n keys for `hero`, `about`, and `contact` in `i18n/en.json` & `i18n/ar.json` and confirm with `npm run check-i18n`
- [ ] T016 [US1] Add keyboard & a11y tests for Hero CTA and contact form (pa11y test or unit + axe integration)

---

## Phase 4: User Story 2 - Explore Circles & Activities (Priority: P2)

Goal: Visitors browse circles and benefits and can choose one.

**Independent Test**: Cards show localized content; clicking opens details or pre-fills Contact.

- [ ] T017 [P] [US2] Create `src/components/CirclesGrid.*` and `src/components/CircleCard.*`; load cards from `src/data/circles.json` and include `aria-*` attributes
- [ ] T018 [US2] Create `src/components/Activities.*` to list `Activities & Benefits` with localizable CTAs
- [ ] T019 [US2] Implement `CircleDetailsModal.*` shown via JS on `CircleCard` click; supports keyboard navigation and ESC to close
- [ ] T020 [US2] Add unit/integration tests for modal open/close behavior (keyboard & mouse)

---

## Phase 5: User Story 3 - Founder & Updates (Priority: P3)

Goal: Founder story & news items are visible and localized; news items link to details.

**Independent Test**: News shows recent posts; founder content localizable.

- [ ] T021 [P] [US3] Implement `src/components/Founder.*` to show a portrait with accessible `alt` text and localized bio
- [ ] T022 [US3] Implement `src/components/NewsList.*` and `src/data/news.json` for isolated posts; include a `read more` CTA linking to either modal or markdown page
- [ ] T023 [US3] Add `news` acceptance tests verifying localized dates and expanded content behavior

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T024 [P] Implement `prefers-reduced-motion` support and smooth scroll; ensure anchor links don't break accessibility
- [ ] T025 Add `src/styles/rtl.css` rules to support Arabic layout mirroring and verify (`dir='rtl'`) behavior
- [ ] T026 [P] Configure CI pa11y rules and add `a11y-report` artifact upload in `deploy-pages.yml`
- [ ] T027 [P] Optimize images for performance — replace with AVIF/WebP, add proper `loading='lazy'` and width/height attributes
- [ ] T028 [P] Add `sitemap.xml` and localized SEO meta tags — validate for English and Arabic (SEO pages/per language)
- [ ] T029 Create `docs/quickstart.md` to show local dev, i18n check, and how to run LHCI and pa11y locally

---

## Phase 7: Deployment & Release

- [ ] T030 Ensure `deploy-pages.yml` triggers on PR merge to `main` and runs pre-deploy checks before publishing
- [ ] T031 [P] Add a preconfigured GitHub Release template and `deploy-` tagging scheme used by CI to track deploys
- [ ] T032 [P] Add `changelog` or release notes generator to ensure translation-related changes are tracked
- [ ] T033 Verify rollback procedure in `docs/deploy-workflow.md` and add a test scenario for reverting to previous tag

---

## Dependencies & Execution Order

- Setup (Phase 1) → Foundation (Phase 2) → User Stories (Phase 3+)  
- Foundation tasks must pass before individual user story tasks are merged.  
- Tasks tagged `[P]` can be worked on in parallel; tests should be included in PRs.

## Parallel examples
- T006 (Tokens), T007 (CSS grid), T008 (i18n loader) can proceed in parallel.  
- T017 (Circles) and T018 (Activities) can be developed concurrently by separate devs.

---

## Implementation Strategy

1. MVP: Implement core Hero, About, Circles, Contact (US1 + US2) with basic styling → run CI checks.  
2. Add News & Founder (US3) and polish for bilingual support and image optimization.  
3. Tighten LHCI and a11y thresholds and add E2E tests (Playwright) for final acceptance.

## Notes
- Use `specs/1-elmentor-landing/tasks.md` to track progress as PRs and checklists.  
- Make each PR atomic and small (one component or behavior).  
- Add a `CONSTITUTION_CHECK.md` snippet to each PR showing how the change satisfies the Constitution gates.
