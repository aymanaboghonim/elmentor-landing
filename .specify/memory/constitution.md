<!--
Sync Impact Report
- Version change: (initial commit) → 1.0.0
- Modified principles: Clean Code, UX Consistency, Bilingual Support, Performance, Simple GitHub Pages Deployment
- Added sections: Additional Constraints, Development Workflow
- Removed sections: none
- Templates updated: .specify/templates/spec-template.md ✅, .specify/templates/tasks-template.md ✅, .specify/templates/plan-template.md (no changes, includes gate already) ⚠ pending manual review
 - Templates updated: .specify/templates/spec-template.md ✅, .specify/templates/tasks-template.md ✅, .specify/templates/plan-template.md ✅
 - New CI sample added: `.github/workflows/deploy-pages.yml` (Actions-driven deploy, Lighthouse, a11y, i18n checks) ✅
- Follow-up TODOs: If RATIFICATION_DATE must be different, update `Last Amended` and `Ratified` fields.
<!--
Sync Impact Report
- Version change: (initial commit) → 1.0.1
- Modified principles: Clean Code, UX Consistency, Bilingual Support, Performance, Modern GitHub Pages Deployment
- Added sections: Additional Constraints, Development Workflow
- Removed sections: none
- Templates updated: .specify/templates/spec-template.md ✅, .specify/templates/tasks-template.md ✅, .specify/templates/plan-template.md ✅
- New CI sample added: `.github/workflows/deploy-pages.yml` (Actions-driven deploy, Lighthouse, a11y, i18n checks) ✅
- Docs added: `docs/deploy-workflow.md` ✅
- Follow-up TODOs: If RATIFICATION_DATE must be different, update `Last Amended` and `Ratified` fields.
-->
<!-- Example: Every feature starts as a standalone library; Libraries must be self-contained, independently testable, documented; Clear purpose required - no organizational-only libraries -->

II. UX Consistency
<!-- Example: II. CLI Interface -->
UX and visual language MUST be consistent across the landing page: colors, spacing, typography, and interactions are shared via a small design token system or component library. Components SHOULD be accessible by default (WCAG AA) and consistent across breakpoints. All user-facing microcopy and affordances MUST be reviewed in design reviews to avoid divergent experiences.
<!-- Example: Every library exposes functionality via CLI; Text in/out protocol: stdin/args → stdout, errors → stderr; Support JSON + human-readable formats -->

III. Bilingual Support
<!-- Example: III. Test-First (NON-NEGOTIABLE) -->
Content MUST be available in both English and Spanish. All text, alt attributes, form placeholders, error messages, and SEO metadata MUST be localizable. Language toggles or detection MUST preserve the user’s current page/route. Translation quality checks and a clear deployment path for translations MUST be established before public release.
<!-- Example: TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced -->

IV. Performance
<!-- Example: IV. Integration Testing -->
Landing page performance is a first-class requirement: prioritize fast initial paint, reduced JS/CSS bundles, and optimized images. Performance budgets SHOULD be set (e.g., Lighthouse performance score >= 90 for core flows, Time to Interactive within acceptable thresholds). Build-time optimization and lazy-loading for non-critical assets MUST be used.
<!-- Example: Focus areas requiring integration tests: New library contract tests, Contract changes, Inter-service communication, Shared schemas -->

V. Modern GitHub Pages Deployment (GitHub Actions)
<!-- Example: V. Observability, VI. Versioning & Breaking Changes, VII. Simplicity -->

The site MUST be deployable as a static site on GitHub Pages using a modern GitHub Actions pipeline. Feature changes MUST be submitted via Pull Requests into the `main` branch. A merge to `main` (or a published Release) MUST trigger a fully automated build → verify → deploy workflow. The pipeline MUST run the following verification steps before deployment:

- Performance: Lighthouse audit within defined budgets for the core landing flows
- Accessibility: a11y scans (axe/pa11y or equivalent) to enforce accessibility gates
- Bilingual content: i18n key checks to validate English + Spanish content exists for all public text and SEO metadata

Deployments MUST publish built artifacts directly to GitHub Pages via Actions; manual pushes to `gh-pages` or any legacy upload steps are PROHIBITED. Each deployment MUST be linked to a commit and/or Git tag, and CI logs MUST store the audit results for accessibility and performance. Releases MUST be tracked with tags and/or GitHub Releases; release notes SHOULD document changes to translations and public content.

Rollback MUST be simple and automated where possible: documented rollback steps MUST exist, such as reverting the deploy commit, re-tagging a previous release, or running a documented CI rollback workflow. The workflow and release strategy MUST make rollbacks traceable by commit/tag for quick diagnostics. Avoid relying on manual legacy gh-pages workflows; prefer Actions-driven deployments to a `gh-pages` or `pages` branch managed by CI only.
<!-- Example: Text I/O ensures debuggability; Structured logging required; Or: MAJOR.MINOR.BUILD format; Or: Start simple, YAGNI principles -->

Additional Constraints
<!-- Example: Additional Constraints, Security Requirements, Performance Standards, etc. -->

- No server-side dependencies required for the public landing routes; use static-hostable assets.  
- Keep third-party scripts to a minimum and prefer preloading essential assets; respect user privacy by minimizing trackers.  
- Images and fonts MUST be optimized and served with proper cache headers in CI/deployment.  
- Bilingual SEO metadata and canonical tags MUST be validated before public release.
<!-- Example: Technology stack requirements, compliance standards, deployment policies, etc. -->

Development Workflow
<!-- Example: Development Workflow, Review Process, Quality Gates, etc. -->

Branching MUST follow the pattern `feature/<short-id>-<what>`. All PRs MUST include: a) a spec link, b) a declaration of how the change aligns with the Constitution, and c) a `Constitution Check` that lists any new translations, a Lighthouse score target, and a11y scan.  
Pull requests MUST be reviewed by at least one developer and one designer when UI/UX changes are included. CI MUST run lint, tests, a11y checks, and a minimal Lighthouse audit.
<!-- Example: Code review requirements, testing gates, deployment approval process, etc. -->

## Governance
<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

Governance Rules
Amendments to this Constitution MUST be proposed as a Pull Request to this repository and include: a rationale, a migration or rollout plan if relevant, and (where necessary) backward compatibility notes. A simple majority of active maintainers MUST approve amendments; significant governance or principle changes that broaden or remove a core principle are treated as a MINOR version bump and require two approvers. All feature PRs that touch landing-page UX MUST reference and pass the Constitution Check in `/specify/templates/plan-template.md`.
<!-- Example: All PRs/reviews must verify compliance; Complexity must be justified; Use GUIDANCE_FILE for runtime development guidance -->

**Version**: 1.0.1 | **Ratified**: 2025-11-17 | **Last Amended**: 2025-11-17
<!-- Example: Version: 2.1.1 | Ratified: 2025-06-13 | Last Amended: 2025-07-16 -->
