# Booth Accounting — Claude Code Notes

Non-obvious decisions and conventions for future sessions.

---

## Tech Stack

- **Astro 6** (static output — no adapter needed for GitHub Pages)
- **Tailwind CSS v4** via `@tailwindcss/postcss` + `postcss.config.mjs` — NOT `@astrojs/tailwind` (v3 only) and NOT `@tailwindcss/vite` (incompatible with Vite 8 / Rolldown — see below)
- **TypeScript** via `astro/tsconfigs/strictest`
- **Prettier** with `prettier-plugin-astro` and `prettier-plugin-tailwindcss`

---

## GitHub Pages — Staging vs. Custom Domain

The site is currently built for a **GitHub Pages subpath** at `halliday2026.github.io/booth-accounting/`.

### The 2-Line Switch

To go live on a custom domain, open `astro.config.mjs` and change **exactly these two values**:

| | `site` | `base` |
|---|---|---|
| **Staging** | `'https://halliday2026.github.io'` | `'/booth-accounting/'` |
| **Production** | `'https://boothaccounting.com'` | `'/'` |

Then add `public/CNAME` containing just: `boothaccounting.com`

That's the complete switch. Do not change anything else.

### Asset Paths

Every internal asset reference must use `import.meta.env.BASE_URL`, e.g.:

```astro
<link rel="icon" href={`${import.meta.env.BASE_URL}favicon.svg`} />
```

Anchor fragment links (`#contact`, `#about`, etc.) do **not** need `BASE_URL` — they're relative to the current page and work under any base path.

---

## `||` vs `??` for Env Var Fallbacks

**Always use `||`, never `??`**, when reading env vars with a fallback default.

```js
// CORRECT — empty string is falsy, so || falls through to the default
const noindex = (import.meta.env.NOINDEX || 'true') === 'true';

// WRONG — empty string is not nullish, so ?? keeps the empty string
const noindex = (import.meta.env.NOINDEX ?? 'true') === 'true';
```

This matters because CI/CD environments often set variables to empty strings (`NOINDEX=`) rather than leaving them unset. The `||` form treats both cases identically.

---

## NOINDEX (Staging Safety)

The site defaults to **noindex on** (search engines blocked) in all environments.

- Default: `NOINDEX` unset → `'' || 'true'` → noindexed ✓
- To enable indexing on production: set `NOINDEX=false` in the GitHub Actions environment or hosting environment variables.

The GitHub Actions workflow intentionally does **not** set `NOINDEX`, so staging stays blocked without extra configuration.

---

## FormSpree Endpoint

**Location:** top of `src/components/Contact.astro`

```js
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
```

Replace `YOUR_FORM_ID` with the real ID from formspree.io once the account and form are set up. This is the only place that needs changing — the form's `action` attribute points to this constant.

---

## Content Rule — No Licensure Claims

**Jamie Booth must never be described as a "CPA" or "licensed CPA."**

Use: `accounting professional`, `accountant`, or `principal`.

This is a firm content rule. Do not add any licensure or credential claims without explicit confirmation from the client.

---

## Tailwind v4 Notes

- `@import "tailwindcss"` (single line) replaces all three old `@tailwind` directives
- All design tokens live in `@theme { }` in `src/styles/global.css` — no `tailwind.config.js`
- Tokens in `@theme` generate utility classes (`bg-primary`, `text-accent`, etc.)
- Tokens in `:root` do **not** generate utilities — use `@theme` for everything
- `prettier-plugin-tailwindcss` v4 mode requires `"tailwindStylesheet": "./src/styles/global.css"` in `.prettierrc`
- **`@tailwindcss/vite` is NOT used** — it is incompatible with Vite 8's Rolldown bundler (`Missing field 'tsconfigPaths'` error). Use `@tailwindcss/postcss` + `postcss.config.mjs` instead. Astro auto-detects the PostCSS config.

---

## TODO Placeholders — Required Before Launch

These must all be resolved before the site goes live:

| # | What | Where |
|---|---|---|
| 1 | **FormSpree ID** — replace `YOUR_FORM_ID` | `src/components/Contact.astro` (line 3) |
| 2 | **Email address** — verify `hello@boothaccounting.com` | `src/components/Contact.astro`, `src/layouts/BaseLayout.astro` (JSON-LD) |
| 3 | **Phone number** — replace `(xxx) xxx-xxxx` | `src/components/Contact.astro`, `src/layouts/BaseLayout.astro` (JSON-LD) |
| 4 | **Custom domain switch** — change 2 lines in `astro.config.mjs` + add `public/CNAME` | `astro.config.mjs` |
| 6 | **NOINDEX flip** — set `NOINDEX=false` in production environment | GitHub Actions env / hosting env vars |

---

## Commands

```bash
npm run dev      # Local dev server at http://localhost:4321/booth-accounting/
npm run build    # Production build → dist/
npm run preview  # Preview the built dist/ locally
```
