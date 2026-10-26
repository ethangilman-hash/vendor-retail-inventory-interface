# GitHub Pages migration — separate Par accounts

Status: implemented and tested locally, **not deployed**. This does not change the working Sites deployment or the CRM.

## Architecture

- GitHub Pages serves an AES-256-GCM encrypted, self-contained copy of the current UI, plus a login shell.
- A new Cloudflare Worker named `par-inventory-auth` checks Par-only salted password hashes and releases the page key on successful login.
- Initial account: `demo` with the user-requested demo password. The password and page key are never committed or placed in public JavaScript.
- No CRM endpoint, account database, session, secret, or LeafLink integration is reused.
- The decrypted app runs in an iframe. Logout removes that iframe and its in-memory key. Reload requires login. Browser-local demo preferences retain the existing behavior.
- This is an initial single-account demo. Adding accounts requires extending the separate auth store; it is not a multi-user production account system.
- Encryption protects the published artifact before unlock. Authorized viewers can retain a decrypted copy; logout cannot revoke a previously downloaded copy.

## Deployment requirements

1. GitHub Pages is currently unavailable for this private repository on the user's plan. User must choose to upgrade GitHub, or explicitly approve public source visibility. Do not make this source repository public automatically. A separate public artifact-only repository is another option, but changes the URL unless the repositories are renamed.
2. Authenticate the installed Wrangler CLI to the user's Cloudflare account. No authenticated Cloudflare session is present in this workspace.
3. Use `auth/wrangler.jsonc` to deploy the new Worker; retain the configured platform login rate-limit binding.
4. Provision Worker secrets `DEMO_USERNAME`, `DEMO_PASSWORD_HASH`, and a fresh random 32-byte base64 `PAGE_KEY`. Hash format follows `worker/auth.mjs`: PBKDF2 SHA-256, 100000 iterations, random salt, 32-byte digest. Provide secrets through stdin, never command arguments, tracked files, or logs.
5. Build using `node migration/build-pages.mjs`, supplying one JSON object on stdin: `endpoint` (actual deployed HTTPS Worker origin), `keyBase64` (the same PAGE_KEY), and `output` (artifact directory). Do not guess a Worker URL or commit temporary secret configuration.
6. Publish **only** generated `index.html` and `.nojekyll` to the selected Pages source. Root/main matches the reference site; a dedicated artifact branch also works without exposing application source on the Pages endpoint.
7. Verify rejected credentials, successful unlock, the inventory cards, room tabs, logout, and access without ChatGPT. Check the final Pages URL is live before calling the migration complete.

Run `node migration/test.mjs` for credential, CORS, throttle, fail-closed configuration and encryption checks. Run the existing `npm test` for application regression checks.
