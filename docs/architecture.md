# Architecture and development handoff

## Current implementation

Buildless HTML, CSS, and plain JavaScript. No external runtime libraries. `app.js` owns the sample catalog and planning state; `accounts.js` uses the shared page helpers and role selector after `app.js` loads. It is not a React application and has no server backend.

The user requested separate familiar interfaces: retailer screens draw on supplied Dutchie Backoffice screenshots, while distributors use a LeafLink-inspired palette and blue sidebar. Keep Par branding independent. Uploaded reference images, videos, and the Dutchie PDF are not included in the deployable files.

## Planning model

- Stock is the sum of sales-floor and back-stock quantities.
- Baseline suggestions use daily velocity × (7 review days + 3 delivery days + 2 safety days), less stock, rounded to case packs.
- Adjustable coverage targets show projected stock after 3 days of sales and an on-time delivery.
- Proposed inventory is visibly distinct from inventory already held.
- Plan cost uses sample wholesale unit costs. A fixed $1,200 placeholder represents other supplier commitments.
- The system checks budget before retailer approval and returns changed proposals to Draft.
- Forecasts do not yet adjust for historical stockouts, promotions, seasonality, reservations, expiry, or actual incoming inventory.

Flower gram tiers represent the retailer's desired merchandising structure, not verified global Dutchie category IDs. Ounce specials use ounce packs. Other products use the units specified in each sample row; never sum different quantity units into a single inventory unit total.

## Browser state

- `par-pilot-v1`: historical prototype state, no longer used by current application.
- `par-pilot-v2`: prior 22-section planning state retained for migration.
- `par-pilot-v3`: current 40-section planning state.
- `par-account-preferences-v1`: delivery preferences and internal sample notes, keyed by owning demo role and partner ID.

Migration preserves existing budget/targets and 22 quantities by stable legacy index, initializes new quantities to zero, and returns the expanded plan to Draft. Account edits keep unsaved drafts separate from saved records and warn on page exit when drafts remain.

## Verification

Run `npm test` for syntax, catalog/migration checks, and role/account preference partitioning. These tests exercise local state behavior, not production tenant authorization.

Manual browser checks performed during development: inventory floor/back/total switching; category filters; proposal/approval flow; retailer overview/chart/purchasing tabs; distributor theme; account search; saving and reloading delivery preferences/notes; switching between independent demo workspace records.

## Integration boundary

No production API credentials or live connectors are present. This repository does not connect to or alter the separate Indulge CRM. Its Python LeafLink client and mapping experience are potential references for future adapters, not dependencies of this prototype.

Keep source category/subcategory, normalized category, format, extract type, package size, pricing tier, and source product ID separate when designing the backend. Do not infer a retailer's POS vendor merely because it has a Dutchie online menu. Uncertain product mappings require explicit review.

## Publishing

Current Sites source commit: `ce788cf92a42709ab35e725d4929e2fe110976e9`.

Current deployment: https://par-planning-pilot.wholehero2.chatgpt.site/

This GitHub repository is a source snapshot with documentation/tests added. No automatic GitHub deployment exists. Runtime app files were copied byte-for-byte from the current Sites checkout. Preserve the existing Site identity and private audience unless the user requests otherwise.
