---
title: URL Strategy
---

## Route preservation principles

- Keep existing public URLs directly whenever Docusaurus can own the route.
- Use explicit `permalink` values instead of relying on derived slugs.
- Preserve trailing slashes in the generated output.
- Only use redirect pages when an old route cannot remain the canonical route.

## Inputs that define the final URL map

### Next.js rewrites

The current site encodes many legacy and flattened routes in
`/Users/sarani/Downloads/codebase/ballerina-dev-website/next.config.js`.

Examples include:

- `/learn/get-started` -> `/learn/integration/get-started`
- `/cookie-policy` -> `/policies/cookie-policy`
- `/learn/scan-tool` ->
  `/learn/development-tutorials/static-code-analysis/scan-tool`

### Post-build flattening

The current export pipeline copies many nested paths back into flatter legacy
locations in
`/Users/sarani/Downloads/codebase/ballerina-dev-website/utils/rearrangeFiles.sh`.

That means the public route map is not defined only by source pages. It is also
defined by file copying after the build.

## Docusaurus implementation options

### Native route ownership

Use Docusaurus pages or docs with explicit permalinks for routes that should be
canonical in the new site.

### Generated alias pages

Create lightweight static pages for paths that should continue to resolve but
should point users and search engines to a newer canonical destination.

### Post-build shaping

If Docusaurus route ownership becomes awkward for some legacy flattened paths,
add a controlled post-build script that restructures output files after
`docusaurus build`, similar to the current Next.js export flow.

## Validation

Every migrated section should be checked against:

- current public URL
- desired canonical URL
- whether the route is direct, aliased, or redirected
- whether the built file layout matches GitHub Pages hosting expectations
