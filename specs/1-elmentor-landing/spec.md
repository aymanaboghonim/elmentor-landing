# Feature Specification: Elmentor Landing Page

**Feature Branch**: `1-elmentor-landing`  
**Created**: 2025-11-17  
**Status**: Draft  
**Input**: User description: "Build a single-page landing website for the Elmentor Program mentorship community."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Discover & Join (Priority: P1)
A visitor lands on the page and learns what Elmentor is, who the community serves, and can quickly join or contact program organizers.

**Why this priority**: Primary conversion flow; main metric for community growth.  
**Independent Test**: Verify an unregistered user can view hero, about, circles, benefits, and complete the join/contact form (English and Arabic).  

**Acceptance Scenarios**:

1. Given: Visitor lands on the hero section, When: they review the main message and CTA, Then: clicking CTA scrolls to the Contact/Join section and opens a localized exchange (English/Arabic).
2. Given: A visitor selects Arabic, When: they navigate, Then: all public content, alt text, and SEO metadata are localized and the route is preserved.

---

### User Story 2 - Explore Circles & Activities (Priority: P2)
Members or prospective members browse `Circles` and `Activities & Benefits` to find relevant groups and sessions.

**Why this priority**: Helps users self-select into member cohorts and encourages retention.  
**Independent Test**: Ensure each circle card shows a localized title, description, and CTA to learn more or join; test responsive grid on mobile and desktop.

**Acceptance Scenarios**:

1. Given: User is on Circles section, When: they tap on a circle, Then: a modal with more details opens and CTA leads to contact form pre-filled for that circle.
2. Given: a screen width of 320px, When: Circles layout is viewed, Then: cards stack vertically and maintain accessible contrast and spacing.

---

### User Story 3 - Founder & Updates (Priority: P3)
Users read the founder story and recent updates; they should be able to follow for news.

**Why this priority**: Builds trust and keeps members returning for new content.  
**Independent Test**: Verify founder story text loads in both languages; news items are listed with timestamps; RSS link or newsletter CTA exists.

**Acceptance Scenarios**:

1. Given: `News` displays three latest posts, When: a user clicks a post, Then: it expands across the page or navigates to a detail route without losing language state.

---

### Edge Cases
- Visitor with JS disabled should see a readable, accessible fallback with core content and join CTA.  
- If translation is incomplete, the default language (English) must show with a clear link to report translation issues.  
- Mobile steady-state performance: If JS bundle fails to load completely, ensure hero, contact CTA, and essential metadata still render.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: Landing page MUST have navigation with smooth scroll anchors for all sections (hero, about, circles, activities/benefits, founder, news/updates, contact/join, footer).
- **FR-002**: The hero section MUST contain an accessible main message and a clear primary CTA that links to Contact/Join.
- **FR-003**: About MUST detail the community purpose with localizable content for English and Arabic.
- **FR-004**: Circles MUST be displayed as responsive cards with accessible contrast and keyboard navigation support; clicking opens a detail modal.
- **FR-005**: Activities & Benefits MUST list features and actionable CTAs; items must be localizable.
- **FR-006**: Founder story MUST be accessible with optional portrait and accessible image alt text.
- **FR-007**: News MUST list latest posts; the CMS or static content pipeline must produce per-language posts.
- **FR-008**: Contact/Join MUST collect minimal info, be accessible, protect user privacy, and send submissions to maintainers or a serverless email function (if available).
- **FR-009**: Footer MUST contain links and social media; links must open in a new tab and include `rel="noopener"`.
- **FR-010**: The whole site MUST support English & Arabic and preserve the route and scroll position when switching languages.
- **FR-011**: Smooth scroll must be enabled and accessible (prefers-reduced-motion respects the user OS preference).
- **FR-012**: The site MUST be static and deployable to GitHub Pages via the CI pipeline described in the Constitution.  

### Non-functional Requirements
- **NFR-001**: Lighthouse score of >= 90 for performance core flows (homepage hero to primary CTA).
- **NFR-002**: WCAG AA accessibility target: color contrast, keyboard focus, form semantics.
- **NFR-003**: Page load for core content must be under 1.5s on a typical 3G throttled mobile in CI simulation.
- **NFR-004**: No more than 150KB of JavaScript required for initial paint (decouple optional widgets behind lazy-loading).

### Key Entities
- **Circle**: {id, title_localized, description_localized, image, CTA}
- **NewsPost**: {id, title_localized, date, summary_localized, content_localized, link}
- **ContactSubmission**: {name, email, message, circleId (optional)}

## Success Criteria *(mandatory)*

- **SC-001**: 90% of users can get from Hero to Contact/Join within 3 clicks.
- **SC-002**: 95% of the primary CTA interactions are successful in both languages.
- **SC-003**: 90% Lighthouse score on main flows (measured in CI audits).
- **SC-004**: 100% of critical content (navigation, hero, contact-joint CTA) is accessible via keyboard and respects WCAG AA contrast.
- **SC-005**: All pages are deployable via an automated GitHub Actions pipeline that validates i18n, Lighthouse, and a11y checks and publishes to GitHub Pages.

## Assumptions
- Static site with no private data stored, contact submissions may use serverless functions or third-party forms depending on project decisions.
- Arabic content is right-to-left (RTL) and requires a mirrored layout and distinct typography rules; we will provide the translations via localizable JSON or a static content pipeline.

## Implementation Notes
- Follow the Elmentor Constitution for Clean Code, UX Consistency, bilingual support, performance budgets, and CI/CD deploy rules.  
- Use a small component library and design tokens (colors, spacing, typography) for consistency.  
- Navigation anchors use smooth CSS/JS; prefers-reduced-motion is respected.  
- All images must be optimized and lazy-loaded; use modern image formats (AVIF/WebP fallback) where possible.

## Contact/Join Decision — Frontend-only Mock
**Choice**: The `Contact/Join` form will be a frontend-only mock for demo purposes.

- The form collects only `email` and optionally `name`.
- On form submission we show a localized "Thank you" message (English/Arabic) and store nothing server-side.
- No backend integration, no automated emails, no third-party forms — fully static and demo-ready.

Implications:
- Quick to implement, minimal risk, aligns with the static GitHub Pages deployment.
- Will still require UI tests and visual validation to ensure bilingual messaging.
- The implementation will demonstrate UX and i18n flows without exposing private data.

---

## Delivery Checklist (minimal)
- [ ] PR with localized content for English and Arabic
 - [ ] PR with localized content for English and Arabic
- [ ] Component tests for Hero, Circle, and Contact/Join
- [ ] a11y checks (pa11y/axe) pass in CI
- [ ] Lighthouse audit meets threshold in CI
- [ ] CI verifies i18n keys exist in both languages
- [ ] Deployment via GH Actions with traceable tag


---

**Notes**: This spec aims to provide a testable, technology-agnostic approach for the single-page Elmentor landing page. Once the language decision for the Contact/Join form is given, the spec can be updated to reflect serverless or third-party integrations.
