---
title: Content Audit
---

## Major source groups identified so far

- `pages/` custom Next.js routes and route handlers
- `policy/` markdown policy pages
- `community/newsletter/` markdown newsletters
- `case-studies/` markdown case studies
- `contributions/` markdown contributor docs
- `spec/` markdown specs and static spec HTML
- `_data/` JSON and YAML data sources
- `public/` images, CSS, static HTML, fonts, and downloadable assets
- `.github/scripts/bbe/` Ballerina By Example generators

## High-risk migration areas

- Routes affected by both Next.js rewrites and export-time file copying
- Ballerina By Example generated pages
- Release note and download flows
- Static HTML passthrough areas such as specs and API docs
- Pages that rely heavily on old layout components and hand-authored HTML
