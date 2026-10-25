# Vendor–Retail Inventory Interface

A shared inventory and purchasing planning prototype for cannabis retailers and distributors.

**Status: sample-data prototype with a shared demo login.** No live LeafLink or Dutchie connection, real orders, or individual business accounts exist yet.

[Open the private hosted prototype](https://par-planning-pilot.wholehero2.chatgpt.site/)

## What it does

- Retailer workspace inspired by Dutchie Backoffice: inventory overview, room values, charts, and purchasing plans.
- Distributor workspace inspired by LeafLink: blue navigation, retailer relationships, and purchasing proposals.
- Forty planning sections across Flower, Pre-Rolls, Vaporizers, Concentrates, Edibles, Tinctures, Topicals, and Accessories.
- Sales floor, back stock, and total inventory views; purchasing uses total inventory.
- Coverage targets of 7, 10, or 14 days, case-pack rounding, budget checks, proposals, and retailer approvals.
- Searchable vendor/retailer directories with weekly, every-two-weeks, or monthly delivery preferences and internal sample notes.
- Browser-local saved plans, account preferences, history, and CSV plan export.

Par is the working name in the interface. This is an independent prototype, not an official Dutchie or LeafLink application.

## Run locally

Use Node.js 22.13 or later and npm. Install the locked dependencies:

```sh
npm ci
```

Create an ignored `.env.local` using `.env.example` as the list of required keys. Configure `DEMO_USERNAME`, a salted PBKDF2-SHA256 password verifier (`pbkdf2-sha256:100000:<salt hex>:<digest hex>`), and a cryptographically random `DEMO_SESSION_SECRET`. Hosted credentials are managed through Sites runtime secrets and are intentionally absent from GitHub.

Start the local authenticated preview:

```sh
node --env-file=.env.local scripts/demo-server.mjs
```

Open http://127.0.0.1:4173. Run checks with `npm test`. Build with `npm run build`.

### Authentication

A server-side credential check gates every application page and asset. The eight-hour session is signed and uses an HttpOnly, SameSite cookie, with Secure cookies on HTTPS. Hosted sessions bind to the existing Sites visitor identity. Login and logout POSTs require the same request origin. Basic per-process failed-attempt throttling is included; it is not a distributed account-security system.

The shared demo login is an additional gate. The Site's private ChatGPT access policy remains unchanged; these credentials alone do not grant another person access to the private Site. Demo role switching is still not individual account authorization, and browser-local notes remain demonstration data.

## Try the workflow

1. Log in, then start in **Retailer view** and review the Inventory overview.
2. Open **Purchasing plan**, adjust the budget and quantities, and request distributor confirmation. The sample plan may exceed its starting budget; adjust it before approval.
3. Switch to **Distributor view** and submit the proposal.
4. Switch back to Retailer view and approve the plan.
5. Use **Vendors** or **Retailers** to select an account, change delivery cadence, enter a sample internal note, and save.
6. Read **Category guide** for research sources and mapping limitations.

Approving a plan does not create an external order. Delivery preferences do not schedule actual deliveries. Switching demo views is not authentication.

## Storage and privacy

Data lives in the browser's localStorage, separately for each site origin/browser. Localhost and the hosted site do not share saved data. Clearing browser storage removes saved plans and preferences. Existing older plan data is retained under its earlier storage key during migration.

Notes are separated by demo role/account in the interface and are omitted from purchasing-plan exports. This is not a security boundary: there is no server-side account isolation yet. Use fictional notes only. Browser-saved preferences, actual business data, passwords, and API keys are not included in this repository.

## Files

| Path | Purpose |
| --- | --- |
| `ui/index.html` | Application layout and category guide |
| `ui/app.js` | Sample catalog, planning, approvals, charts, inventory views |
| `ui/accounts.js` | Demo account directory, preferences, and notes |
| `ui/leaf-style.css` | Base/LeafLink-inspired visual theme |
| `ui/retailer-style.css` | Retailer/Dutchie-inspired theme |
| `ui/accounts.css` | Account screens and distributor blue sidebar |
| `worker/auth.mjs` | Password verifier, session validation, and login/logout routes |
| `worker/index.ts` | Supported Sites/Vinext Worker with the credential gate |
| `scripts/embed-ui.mjs` | Embed protected UI source into the server build |
| `tests/` | Authentication, planning migration, and account-storage checks |
| `docs/` | Architecture, handoff, and Oregon category research |
| `.openai/hosting.json` | Existing private Sites deployment identity; contains no credentials |

## GitHub and deployment

This repository contains the prototype source and the server-based demo login. Application source now lives in `ui/`; `dist/` is generated server output and is ignored. The supported Sites/Vinext build integration is preserved.

The existing private Sites URL remains the live application. This GitHub repository does **not** configure GitHub Pages or automatic deployment. The password-protected application requires a server runtime; serving `ui/` as an ordinary static site does not provide authentication. GitHub and Sites are separate remotes; changes must be deliberately synchronized. Do not create another Site or change the existing `project_id` when updating the current deployment.

## Next development steps

1. Add authenticated business accounts and server-enforced permissions.
2. Move records to a shared database with account ownership and audit history.
3. Adapt the distributor's existing read-only LeafLink integration.
4. Validate retailer API access, products, rooms, units, and mappings against its POS catalog.
5. Replace fictional data with reviewed read-only imports before considering any external write workflow.

See [architecture and handoff](docs/architecture.md) and [Oregon category research](docs/oregon-category-research.md).
