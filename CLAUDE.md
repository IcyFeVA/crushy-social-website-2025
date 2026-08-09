# Crushy Social — website

## What this repo is

**One Astro site serving two different things on one domain.**

| URL | What it is |
| --- | --- |
| `crushy.social/` | **Crushy Social Inc.** — the company site. Currently a coming-soon holding page. |
| `crushy.social/app` | **Crushy** — the dating/friend-finding app's product site (marketing, blog, legal, support). |

Crushy Social Inc. (Vancouver, Canada) is the company; Crushy is its product. The product site came
first and used to live at the root — it was moved under `/app` in Aug 2026 so the company could take
the root. Expect the root to grow into a real company site over time.

Contact: hi@crushy.social

## Stack & deploy

- **Astro 5**, `output: 'static'`, built from the [AstroWind](https://github.com/onwidget/astrowind) template. Tailwind, MDX, astro-icon, astro-compress.
- **Hosted on Vercel.** Pushing to `main` on GitHub triggers the build and deploy. There is no
  staging environment — a push to `main` is production.
- `netlify.toml` is a leftover from the template. Vercel is the deploy target; `vercel.json` is the
  file that matters.
- Analytics: Umami, injected globally in `src/components/common/Analytics.astro`.

```bash
npm run dev      # dev server, localhost:4321
npm run build    # static build into dist/
npm run preview  # serve dist/
npm run check    # astro check + eslint + prettier
npm run fix      # eslint --fix + prettier -w
```

## How the /app split works — read this before touching routing

Astro's own `base` stays `'/'`. The split is done two ways together:

1. **Physically:** every product-site page lives under `src/pages/app/`. File-based routing does the
   rest, including the `[...blog]` dynamic routes (their `getStaticPaths` params are base-free, so
   moving the folder was enough).
2. **In links:** `APP_PATHNAME` in `src/utils/permalinks.ts` prefixes `/app` onto every permalink
   that `getPermalink()` produces. Nav, footer, blog post URLs, category/tag pages and the header
   logo all flow through it.

**Consequences:**

- **Never hardcode `/app` in a link.** Use `getPermalink('/contact')` → `/app/contact`. A bare
  `href="/contact"` will land the visitor on the company page instead.
- **`getAsset()` deliberately resolves to the root**, not to `/app`. It's for things that genuinely
  live at the domain root: `/rss.xml`, `/sitemap-index.xml`.
- **`SITE.base` in `src/config.yaml` must stay `'/'`.** The astrowind integration feeds it straight
  into Astro's `base`; changing it would prefix everything a second time.

### Files that stay at the root (not under `src/pages/app/`)

| File | Why |
| --- | --- |
| `src/pages/index.astro` | The company holding page. |
| `src/pages/404.astro` | Vercel serves `dist/404.html` for anything unmatched, so it must build at the root. |
| `src/pages/rss.xml.ts` | Keeps `/rss.xml` stable for existing subscribers. Its item links point at `/app/…`. |

### Redirects

`vercel.json` carries permanent 301s from every pre-move URL to its `/app` equivalent
(`/privacy` → `/app/privacy`, etc.). These are load-bearing: **the App Store and Google Play
listings link to `/privacy`, `/terms` and `/delete-account`**, and Google Play requires the
delete-account URL to resolve.

A catch-all isn't possible, because blog posts sit at root-level slugs (`/why-the-world-needs-crushy`)
and a wildcard would swallow future company pages. So each path is listed explicitly — if you add a
root-level company page whose path collides with an old product URL, remove that redirect first.

## Layout & config

- `src/config.yaml` is the site config (name, canonical site URL, SEO defaults, blog settings,
  theme). It's read by `vendor/integration/` and exposed to components as the virtual module
  `astrowind:config` — import from `'astrowind:config'`, not from the YAML.
- `src/navigation.ts` — header and footer link data for the product site.
- Blog posts: `src/data/post/*.mdx`, collection defined in `src/content/config.ts`. The permalink
  pattern is `/%slug%`, which resolves to `/app/<slug>`.
- Layouts: `Layout.astro` is bare (head, analytics, no chrome). `PageLayout.astro` adds the product
  site's header and footer. **The company pages use `Layout.astro`** so they don't inherit Crushy
  app navigation.

## Design

- Product site: the AstroWind theme with Crushy branding. Tokens in
  `src/components/CustomStyles.astro` — primary `rgb(125 33 229)` purple, accent `rgb(203 7 150)`
  magenta, page background `rgb(250 248 252)`.
- Company pages (`index.astro`, `404.astro`): a separate, quieter visual language — editorial
  typography, hairline rules, self-contained scoped CSS declaring its own `--ink` / `--ground` /
  `--muted` / `--accent` tokens in both light and dark. Deliberately distinct from the app site.
  The wordmark is set in type; there is no company logo asset yet (`public/assets/logo-crushy*.svg`
  is the *product* mark — don't use it for the company).

## Known state — don't mistake these for regressions

- `npm run check` reports **6 pre-existing errors**: five `Object is possibly 'null'` in
  `src/components/widgets/Announcement.astro`, and a `footerData` type mismatch in
  `src/layouts/PageLayout.astro`. They predate the `/app` move.
- `src/pages/app/homes/*`, `src/pages/app/landing/*`, `content.md`, `pricing.astro` and
  `services.astro` are **unedited AstroWind demo pages**. Nothing links to them, but they build and
  appear in the sitemap. Safe to delete when someone decides to.
- `.stackblitzrc`, `sandbox.config.json` and the root `how-to-use-a-dating-app.mdx` /
  `src/not-just-another-dating-app.mdx` are template leftovers; the two mdx files are outside the
  content collection and are not published.
