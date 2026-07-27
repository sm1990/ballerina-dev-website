---
title: Deployment Flow
---

## Current branch flow

The existing site uses a two-stage publication model:

1. Build and export the website in `ballerina-dev-website`.
2. Publish that static output to the `gh-pages` branch of
   `ballerina-dev-website` for staging.
3. Sync the staged output into the `gh-pages` branch of
   `ballerina-platform.github.io` for production.

## Workflow references

- `.github/workflows/pre-prod_sync.yml`
- `.github/workflows/prod_sync_gh-pages.yml`
- `.github/workflows/ballerina_by_example_on_demand_update.yml`

## Migration requirement

The Docusaurus build should fit into the same release shape:

- build static files
- add `.nojekyll`
- apply any required post-build path shaping
- publish to `ballerina-dev-website` `gh-pages`
- sync forward to `ballerina-platform.github.io` `gh-pages`

## Important production detail

The production sync currently preserves and restores parts of `spec/lang`
separately. We need to account for that when replacing the old build pipeline so
spec assets are not lost during production publishing.
