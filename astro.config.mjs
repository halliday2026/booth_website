import { defineConfig } from 'astro/config';

// --- CUSTOM DOMAIN SWITCH (2 lines) ---
// This site is currently configured for the GitHub Pages staging subpath.
// To go live on a custom domain, change exactly these two values:
//
//   STAGING  → site: 'https://halliday2026.github.io',  base: '/booth-accounting/'
//   LIVE     → site: 'https://boothaccounting.com',      base: '/'
//
// Also add a file at public/CNAME containing just: boothaccounting.com
// That's it — a 10-second switch.
// ----------------------------

export default defineConfig({
  site: 'https://halliday2026.github.io',
  base: '/booth-accounting/',
});
