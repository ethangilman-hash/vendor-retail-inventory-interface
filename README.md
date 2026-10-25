# Vendor–Retail Inventory Interface

A shared inventory and purchasing planning prototype for cannabis retailers and distributors.

**Status: sample-data prototype.** No live LeafLink or Dutchie connection, real orders, or authenticated business accounts exist yet.

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

Install Python 3, then run from this repository:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173 in your browser. No package installation, build step, or API key is required. Node.js 20 or later is used only for checks:

```sh
npm test
```

## Try the workflow

1. Start in **Retailer view** and review the Inventory overview.
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
| `dist/index.html` | Application layout and category guide |
| `dist/app.js` | Sample catalog, planning, approvals, charts, inventory views |
| `dist/accounts.js` | Demo account directory, preferences, and notes |
| `dist/leaf-style.css` | Base/LeafLink-inspired visual theme |
| `dist/retailer-style.css` | Retailer/Dutchie-inspired theme |
| `dist/accounts.css` | Account screens and distributor blue sidebar |
| `tests/` | Planning migration and account-storage checks |
| `docs/` | Architecture, handoff, and Oregon category research |
| `.openai/hosting.json` | Existing private Sites deployment identity; contains no credentials |

## GitHub and deployment

This repository contains a snapshot of the prototype source deployed through Sites at source commit `ce788cf92a42709ab35e725d4929e2fe110976e9`.

The existing private Sites URL remains the live application. This initial GitHub upload does **not** configure GitHub Pages or automatic deployment. GitHub and Sites are separate remotes; changes must be deliberately synchronized. Do not create another Site or change the existing `project_id` when updating the current deployment.

## Next development steps

1. Add authenticated business accounts and server-enforced permissions.
2. Move records to a shared database with account ownership and audit history.
3. Adapt the distributor's existing read-only LeafLink integration.
4. Validate retailer API access, products, rooms, units, and mappings against its POS catalog.
5. Replace fictional data with reviewed read-only imports before considering any external write workflow.

See [architecture and handoff](docs/architecture.md) and [Oregon category research](docs/oregon-category-research.md).
