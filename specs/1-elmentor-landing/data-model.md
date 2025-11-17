# Data Model (Elmentor Landing)

This site is a static landing page. There is no persistent backend. The data model below is conceptual for content sources and local JSON files.

## Entities

- Circle
  - id: string
  - title_localized: map (language -> string)
  - description_localized: map (language -> string)
  - image: string (path relative to assets)
  - cta_url: string | null

- NewsPost
  - id: string
  - title_localized: map (language -> string)
  - summary_localized: map (language -> string)
  - date: ISO date string
  - content_localized: string (long-form); can be aggregate into a static page or modal
  - external_link: string | null

- ContactSubmission (demo-only, no persistence)
  - name (optional), email (required), message (optional), circleId (optional)

## Storage and format
- JSON files in `i18n/*.json` handle translations.
- News and circle content stored as static JSON objects in the frontend (`script.js`) or a `data` folder if needed.

## Validations
- i18n keys across languages must match — `scripts/check-i18n.js` verifies presence of English keys in Arabic translation.
- All images must exist and be optimized (max 100KB, AVIF preferred) before release.
