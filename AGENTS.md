# AGENTS.md — RCPhysics Eleventy port

> **File naming note:** Claude Code natively looks for `CLAUDE.md` in the
> repo root. `AGENTS.md` is the cross-tool convention (Cursor, Aider,
> Codex, and others also read it). Either symlink one to the other, or
> just rename this file to `CLAUDE.md` if you use Claude Code exclusively.
> Recent Claude Code versions read both.

## What this project is

A static personal and lab website for **Richard C. Prince, PhD**, Assistant
Professor at East Tennessee State University and director of the LAMB
(Laboratory for Advanced Microscopy and Bioengineering). Deployed at
**rcphysics.com** via GitHub Pages.

The site was designed as a React single-page-application prototype in
Claude's design tool (in-browser Babel plus hardcoded JS data arrays plus
a live "Tweaks" panel for design iteration). This repo is a port of that
prototype to a proper static-site generator, with:

- **All content lifted into Markdown and YAML** (the original hardcoded
  JS arrays now live in `src/_data/*.yml`)
- **Design preserved verbatim**, the two CSS files
  (`colors_and_type.css`, `styles.css`, roughly 1,005 lines total)
  transferred unchanged
- **The Tweaks panel resolved** into two fixed choices: **slim sticky
  top header** for nav, and **portrait-on-left** for the home page hero

## Stack

| Concern      | Choice                                                     |
| ------------ | ---------------------------------------------------------- |
| SSG          | **Eleventy 3.x** (Nunjucks templates, `js-yaml` for data)  |
| Content      | **Markdown** (page front matter) plus **YAML** (data)      |
| Styling      | Plain CSS in `src/styles/`, copied through, no processing  |
| Hosting      | **GitHub Pages** via GitHub Actions (Pages source is "GitHub Actions") |
| Contact form | Formspree or similar third-party post (not yet wired)      |

**Why Eleventy specifically:** the primary hard requirement was
"everything in Markdown and YAML" while preserving an exact custom
design. Eleventy imposes no layout conventions; you bring the templates.
Jekyll was ruled out due to Ruby toolchain friction on macOS Apple
Silicon along with its plugin allowlist; Hugo due to Go-template
complexity for a site this size; Astro because it would keep templates
as `.astro` component files rather than pure Markdown and YAML.

## Repository layout

```
.
├── .eleventy.js              # Config; 50 lines; registers YAML data extension
├── .eleventyignore           # Keeps AGENTS.md and README.md out of the build
├── package.json              # @11ty/eleventy plus js-yaml, that's it
├── .github/workflows/
│   └── deploy.yml            # Build and publish to GH Pages on push to main
└── src/
    ├── _data/                # YAML, the "database" of the site
    ├── _includes/
    │   ├── base.njk          # HTML shell, extended by all layouts
    │   ├── layouts/          # One .njk per page type
    │   └── partials/         # header, footer, page-title, etc.
    ├── styles/               # colors_and_type.css plus styles.css (untouched)
    ├── assets/               # fonts/, images/, favicons/, files/, RCP-Logo.svg
    └── *.md                  # One .md per page; front matter picks the layout
```

## Content source note (important)

The `.jsx` reference files this doc originally assumed never existed in the
repo and could not be located. The actual content was lifted from the **live
Jekyll site** at rcphysics.com (repo `rcphysics/rcphysics.github.io`,
academicpages theme) — specifically its `_pages/about.md`, `_pages/cv.md`,
`_pages/lamb.md`, `_data/members.yml`, and CV sections. When updating content,
that live site plus these YAML files are the source of truth.

## Current state, what's done and what isn't

**All seven pages are ported and the site builds (`npm run build`, 7 files):**

| Page         | Page file        | Layout                     | Data                         |
| ------------ | ---------------- | -------------------------- | ---------------------------- |
| Home         | `index.md`       | `layouts/home.njk`         | `strands.yml` + front matter |
| Research     | `research.md`    | `layouts/research.njk`     | `strands.yml`                |
| LAMB         | `lamb.md`        | `layouts/lamb.njk`         | `projects.yml`, `members.yml`|
| Publications | `publications.md`| `layouts/publications.njk` | `publications.yml`           |
| Teaching     | `teaching.md`    | `layouts/teaching.njk`     | `teaching.yml`               |
| CV           | `cv.md`          | `layouts/cv.njk`           | `cv.yml`                     |
| Contact      | `contact.md`     | `layouts/contact.njk`      | (email + social, no form yet)|

**Assets now in place:** Nautik `.otf` fonts in `src/styles/fonts/`; real
`RCP-Logo.png`, `profile.png`, and favicons (pulled from the live site) in
`src/assets/`.

**Still open / next steps:**

- **Contact form backend.** The contact page is email + social links only.
  When a Formspree/Basin endpoint is chosen, add a `<form>` to
  `layouts/contact.njk` using the existing `.field`/`.input` styles.
- **Lab members & projects.** `members.yml` has only the PI; add students as
  they join (and drop photos in `src/assets/images/members/`). Verify the
  `projects.yml` descriptions still match current lab work.
- **Custom domain.** Not yet configured (see below).
- **Git.** This folder is not yet a git repo; initialize and push to deploy.

**Unresolved decisions:**

1. **Nautik font licensing.** The design uses Nautik (Character Type,
   Henning Skibbe) as its display face. `@font-face` from a public
   GitHub Pages origin counts as web distribution, which most foundries
   license separately from desktop use. Do not push to a public repo
   without confirming the EULA covers webfont embedding. Fallback stack
   in `colors_and_type.css` is Playfair Display, then Bodoni, then Didot,
   then Georgia.

2. **Contact form backend.** The React prototype had client-side state
   only, no actual mail sending. Needs a Formspree or Basin endpoint,
   or a `mailto:` link as a placeholder, when the contact page is ported.

3. **Custom domain (rcphysics.com).** For GH Pages, add a `CNAME` file
   at repo root and add `eleventyConfig.addPassthroughCopy("CNAME")` to
   `.eleventy.js`. Not yet configured.

## The porting pattern, three steps per page

Every page follows the same recipe. This is the pattern to use for each
of the six remaining pages.

### 1. Lift data into a YAML file in `src/_data/`

Find the hardcoded JS arrays at the top of the source `.jsx` (e.g.
`APPOINTMENTS`, `COURSES`, `STRANDS`) and convert them to YAML. Preserve
the field names exactly; templates reference them.

- Bare strings stay bare strings
- Objects and maps become YAML maps (`{key: val}` inline for short ones)
- The `{me: true, name: "..."}` author flag pattern is used in
  `publications.yml`; follow the same shape if similar flags appear
- Use `>-` block scalars for long paragraphs (abstracts, descriptions)
- Quote strings that contain colons, hashes, or leading or trailing spaces

### 2. Create the page `.md` file in `src/`

Just front matter, usually. Body is empty for data-driven pages,
Markdown prose only if the page has editorial copy. Standard front
matter shape:

```yaml
---
layout: layouts/<name>.njk
permalink: /<slug>/
title: <Page title · RCPhysics>
nav_label: <label matching nav.yml>
nav_order: <integer>
eyebrow: "§ 0X · Section"
heading_html: '<h1 contents with <em>italic</em> if needed>'
deck: >-
  <the deck paragraph under the h1>
---
```

### 3. Create the layout at `src/_includes/layouts/<name>.njk`

Translate the source React component to Nunjucks. Structure stays the
same; syntax changes.

| React (JSX)                                | Nunjucks                                 |
| ------------------------------------------ | ---------------------------------------- |
| `{items.map(i => <Foo item={i}/>)}`        | `{% for i in items %}...{% endfor %}`    |
| `{cond && <X/>}`                           | `{% if cond %}...{% endif %}`            |
| `{p.type.toUpperCase()}`                   | `{{ p.type | upper }}`                   |
| `<Component prop={value}/>` (subcomponent) | `{% include "partials/foo.njk" %}` or a Nunjucks macro |
| `typeof a === 'object' && a.me`            | `a is mapping and a.me`                  |
| `useState` / `useMemo` (client state)      | Vanilla JS at bottom of the layout, using data-attributes for state |

All layouts start with `{% extends "base.njk" %}` and put content inside
`{% block content %}...{% endblock %}`.

## Non-negotiables

- **Do not modify `src/styles/colors_and_type.css` or `src/styles/styles.css`.**
  These are the design system; they transfer verbatim. If a template
  needs a new selector, add a comment above the change and get user
  sign-off first.
- **Do not add npm dependencies beyond `@11ty/eleventy` and `js-yaml`**
  without asking. The design goal is a minimal, transparent toolchain.
- **Do not introduce React, a bundler, or a CSS preprocessor.** The
  entire point of this port was to leave the SPA runtime behind.
- **Preserve typography carefully.** The design uses several distinctive
  tokens that must survive: bra-ket display headings (`|word⟩`), corner
  registration ticks on `.specimen` cards, italic display font, and the
  eyebrow mono caps. If you're unsure whether a stylistic choice was
  intentional, assume it was; this design has been iterated on.
- **Author self-bolding uses the `{me: true, name: "..."}` YAML flag.**
  The name string may vary between publications (sometimes "Richard
  Prince", sometimes "Richard C. Prince"); preserve the exact form from
  the source `.jsx`.
- **Never use em-dashes in your own responses to the user** (a personal
  preference of theirs). Compound sentences and semicolons are welcome.
- **Ask before pushing to `main`** or before any command that would
  publish the site publicly.

## Commands

```bash
npm install         # one-time
npm run dev         # localhost:8080 with live reload
npm run build       # produces _site/
npm run clean       # rm -rf _site
```

Build should complete in well under a second for a site this size.

## Reference files

The original React prototype's `.jsx` files should be kept somewhere
outside `src/` (a `reference/` directory at repo root is a good spot)
so you can consult them while porting. Do not commit them to
production; they are historical reference, not build inputs.

Each `.jsx` file has the same shape: a `const` array of data at the top
(the thing to lift into YAML), then a top-level page component, then
subcomponents. The data array is what becomes the YAML; the component
tree tells you the template structure.

## Recommended porting order

1. **Research**, simplest data (just `strands.yml`, 3 items), reuses
   the section-head and specimen patterns from Publications
2. **Teaching**, three lists (courses, mentorship, philosophy);
   introduces the numbered mentorship-card grid
3. **CV**, six lists, but they all share one row structure; write one
   `cv-list.njk` partial and call it six times
4. **Home**, the most complex layout (hero plus 4 sections plus closing
   CTA); easier once the reusable partials from steps 1 through 3 exist
5. **Contact**, needs the Formspree decision plus a simple form
6. **LAMB**, blocked on `lamb.jsx` upload; ask user before starting

## Anti-patterns to avoid

- Recreating React idioms in templates ("component" abstractions that
  Nunjucks macros are a poor fit for). Prefer flat template plus partials.
- Adding a build step for CSS. Plain CSS, no PostCSS, no Sass.
- Reaching for a plugin when a 5-line filter in `.eleventy.js` will do.
- Assuming the user wants a particular design tweak "improved." The
  design is finished. Port it; don't redesign it.
- Storing publication data anywhere except `publications.yml`. Same
  rule for every other content type: one canonical YAML file per kind.
