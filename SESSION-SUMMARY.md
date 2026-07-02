# RCPhysics site port, session summary

**Date:** July 2026
**Goal:** Take the Claude-designed React prototype of rcphysics.com and
port it to a GitHub-Pages-hosted static site with all content in
Markdown and YAML.

## The decision tree we walked

**Question 1: What framework?**
Considered Jekyll, Hugo, Eleventy, and Astro. Landed on **Eleventy**
because:

- It imposes no layout conventions, so the exact custom design ports
  cleanly (Jekyll and Hugo want you to fit their templates)
- Content is genuinely Markdown and YAML (Astro would keep templates
  as `.astro` component files, which is a partial win on the requirement)
- Ruby toolchain issues on macOS Apple Silicon and the plugin allowlist
  ruled out Jekyll
- Go template syntax made Hugo overkill for a site of this size

**Question 2: What did the prototype actually consist of?**
On inspection, the "design" from Claude was not static HTML/CSS. It was
a **React SPA** that:

- Used `@babel/standalone` to compile JSX in the browser at page load
- Hardcoded all content (publications, courses, appointments, research
  strands) as JS arrays at the top of each `.jsx` file
- Used hash-based routing between pages
- Included a live "Tweaks" panel for design iteration (hero layout,
  nav style)

That framing changed the porting strategy from "wrap Markdown in
existing templates" to "translate React components into Nunjucks and
lift content out of JS arrays into YAML."

**Question 3: Which design variants win in production?**
Two Tweaks-panel choices had to be committed to at port time:

- **Nav style:** slim sticky top header (over side-rail or minimal
  uppercase-mono)
- **Home hero:** portrait on left (over portrait-right or full-bleed)

## What was built

A complete, verified-building Eleventy project delivered as
`rcphysics-eleventy-port.tar.gz`, containing:

- `.eleventy.js` config with YAML data extension registered
- `.eleventyignore` so docs at repo root do not break the template scan
- `package.json` (only `@11ty/eleventy` and `js-yaml` as dependencies)
- GitHub Actions workflow that publishes to Pages on push to `main`
- Base HTML shell, slim sticky header, footer, page-title partial
- **Publications page ported end-to-end and building correctly:**
  - All 12 publications lifted from the JSX `PUBS` array into
    `_data/publications.yml`
  - Nunjucks layout that renders authors with self-bolding via the
    `{me: true}` YAML flag
  - Client-side filter pills (all, journal, chapter, conf, first
    author) implemented in roughly 40 lines of vanilla JS
  - Abstract expand/collapse toggle in the same vanilla JS block
  - Reverse-chronological sort at template time via
    `publications | sort(attribute='year', reverse=true)`
- Both original CSS files (`colors_and_type.css` and `styles.css`,
  1,005 lines total) copied in unchanged
- README with edit guide and porting roadmap for the remaining pages
- **AGENTS.md** file for handoff to Claude Code (see below)

## What's left

Six pages still need porting; each follows the same three-step recipe
(YAML data file, then Markdown page front matter, then Nunjucks layout).

1. Research (simplest, just `strands.yml`)
2. Teaching
3. CV
4. Home (most complex, hero plus four sections)
5. Contact (needs Formspree or similar for the form)
6. LAMB (blocked: `lamb.jsx` source file was referenced but never
   uploaded, so the source content for this page is unknown)

## Open questions to resolve

- **Nautik font licensing.** The design's display face is Nautik
  (Character Type, Henning Skibbe). Web embedding via `@font-face`
  from a public GitHub Pages origin counts as web distribution and
  usually requires a separate license from desktop use. Confirm the
  EULA covers this before the repo goes public.
- **Contact form backend.** The React prototype's form was
  client-state-only and never sent mail. Options include Formspree,
  Basin, or a simple `mailto:` fallback.
- **Custom domain (rcphysics.com).** GH Pages needs a `CNAME` file at
  repo root and a passthrough copy directive in `.eleventy.js`. Not
  yet configured.
- **Reference `.jsx` files.** These should be kept in a `reference/`
  directory alongside `src/`, outside the build, so future porting can
  refer back to them. Not committed yet.

## The handoff artifact

`AGENTS.md` (in the project root) is designed to be picked up by
Claude Code or any other AI coding agent to continue the port without
losing context. It contains:

- What the project is and what stack it uses
- Full repository layout
- Exactly what's done and what isn't (the six pages remaining)
- The three-step porting recipe with a JSX-to-Nunjucks translation
  cheat sheet
- Non-negotiables (don't modify the CSS, don't add dependencies, don't
  reintroduce React or a bundler, preserve the bra-ket display idiom,
  avoid em-dashes when talking to the user)
- Recommended porting order (Research first, LAMB last)
- Anti-patterns to avoid

The file naming caveat: Claude Code's native project memory file is
`CLAUDE.md`, while `AGENTS.md` is the cross-tool convention that other
agents (Cursor, Aider, Codex) also read. Recent versions of Claude
Code read both. If Claude Code doesn't pick it up automatically, either
rename the file to `CLAUDE.md` or symlink one to the other.

## How to resume

```bash
tar -xzf rcphysics-eleventy-port.tar.gz
cd rcphysics-site
npm install
npm run dev        # http://localhost:8080/publications/
```

Point Claude Code at the project root, and `AGENTS.md` will orient it
to continue with the Research page next.
