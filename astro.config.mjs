import { defineConfig } from 'astro/config';

// --- CUSTOM DOMAIN SWITCH (2 lines) ---
// The base must match the GitHub repo name exactly — that's the subpath Pages uses.
// To go live on a custom domain, change exactly these two values:
//
//   STAGING  → site: 'https://halliday2026.github.io',  base: '/booth_website/'
//   LIVE     → site: 'https://boothaccounting.com',      base: '/'
//
// Also add a file at public/CNAME containing just: boothaccounting.com
// That's it — a 10-second switch.
// ----------------------------

export default defineConfig({
  site: 'https://halliday2026.github.io',
  base: '/booth_website/',
});
