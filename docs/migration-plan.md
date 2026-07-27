---
title: Migration Plan
---

## Objectives

- Rebuild the current `ballerina.io` website from Next.js into Docusaurus.
- Preserve the current public URL structure as closely as possible.
- Keep the site deployable as static files through GitHub Pages.
- Maintain the current staging flow through `ballerina-dev-website` and the
  production sync into `ballerina-platform.github.io`.

## Confirmed constraints

- The migration work now lives on the `revamp-v3` branch of
  `ballerina-dev-website`.
- Legacy content roots are preserved in place while Docusaurus-specific docs,
  generated data, pages, and static assets live beside them.
- Branding should use the Ballerina trademark palette:
  `#585A5E`, `#52C3C2`, `#E6EAEB`, and `#FFFFFF`.
- The current site uses `trailingSlash: true`.
- `next.config.js` contains SEO-sensitive rewrite rules.
- `utils/rearrangeFiles.sh` performs post-export path flattening that also
  affects public URLs and sitemap entries.

## Work phases

1. Audit the current content, routes, assets, data files, and generators.
2. Build a URL parity map from pages, rewrites, and post-build flattening.
3. Define Docusaurus content/plugin architecture around those URLs.
4. Migrate markdown-first sections with explicit permalinks.
5. Rebuild custom landing pages and route-heavy sections as Docusaurus pages.
6. Reimplement generated sections such as Ballerina By Example.
7. Recreate the static deployment pipeline for staging and production.
8. Validate the built output for broken links, redirect behavior, and path
   parity before moving section by section.

## Immediate next steps

1. Inventory all current routes and group them into native pages, docs, copied
   static assets, or generated outputs.
2. Translate `next.config.js` rewrites plus `rearrangeFiles.sh` behavior into a
   single migration route map.
3. Decide where Docusaurus should preserve routes directly and where we need
   alias or redirect pages.
