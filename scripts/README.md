Fontshare font preparation
=========================

`npm run dev` and `npm run build` prepare six original WOFF2 files from the
Fontshare CDN in `.font-cache/` before Next.js reads `fonts.ts`. The manifest
pins each URL and SHA-256; existing matching files need no network access.
Downloads retry twice and fail clearly on corrupt or unavailable resources.
A clean deployment needs outbound HTTPS to cdn.fontshare.com. If invoking
Next.js directly, run `node scripts/prepare-fonts.mjs` first.

The original Clash Display and Satoshi families are preserved. `next/font/local`
serves them from this site's own origin with swap behavior and fallback metrics.
Only display faces are preloaded, so utility/body weights do not compete for all
initial network slots. The external render-blocking Fontshare stylesheet is removed.

Source: https://www.fontshare.com/fonts/clash-display and
https://www.fontshare.com/fonts/satoshi . ITF Free Font License v2.0, distributed
in the official family downloads, permits self-hosting on the licensee's own
website but restricts redistribution through repositories. Font binaries are
therefore ignored rather than committed. Fontshare remains the source of the files.

Regression checks: `node --test tests/performance.test.mjs`.
