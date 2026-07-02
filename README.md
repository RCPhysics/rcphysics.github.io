# RCPhysics site: editing guide

How to update the content and images on rcphysics.com. You almost never need
to touch HTML or CSS; nearly all edits are to a YAML file in `src/_data/` or
to a page's front matter.

## Preview your changes

```bash
npm install     # once, first time only
npm run dev     # serves http://localhost:8080 with live reload
```

Leave `npm run dev` running while you edit; the browser refreshes on save.
Press `Ctrl+C` to stop. `npm run build` produces the final site in `_site/`.

## How it's organized

- **Content** (the lists you edit most) lives in `src/_data/*.yml`.
- **Page intro copy** (headline, deck) lives in each page's front matter at the
  top of `src/*.md`.
- **Images** live in `src/assets/images/`.

Rule of thumb: repeating things (publications, courses, people, equipment) are
YAML; a page's opening headline and blurb are that page's `.md`.

## What to edit for what

| You want to…                     | Edit…                                    |
| -------------------------------- | ---------------------------------------- |
| Add / edit a publication         | `src/_data/publications.yml`             |
| Change a research area           | `src/_data/strands.yml`                  |
| Add equipment (LAMB)             | `src/_data/equipment.yml`                |
| Add a lab member                 | `src/_data/members.yml` (`items:`)       |
| Add a lab alum                   | `src/_data/members.yml` (`alumni:`)      |
| Add / edit a course              | `src/_data/teaching.yml`                 |
| Edit the CV                      | `src/_data/cv.yml`                       |
| Update email / social links      | `src/_data/site.yml`                     |
| Change the nav menu              | `src/_data/nav.yml`                      |
| Change a page's headline or intro| that page's file in `src/` (front matter)|
| Replace the logo                 | `src/assets/images/RCP-Logo.png`         |

## Adding content

Each YAML file starts with a comment block describing its fields. Copy an
existing entry and change the values; keep the indentation identical (two
spaces, no tabs). A few common ones:

**Publication** (`publications.yml`, newest at the top):

```yaml
- year: 2025
  type: journal            # journal | conf | chapter
  role: co-author          # or "first author", "PI", …
  venue: Science
  title: Full title, with a period at the end.
  authors:
    - Some Coauthor
    - { me: true, name: Richard C. Prince }   # this flag bolds your name
    - et al.
  abstract: >-
    One paragraph. Shown when the reader expands the entry.
  tags:
    - { tone: glass, label: "CARS · SHG" }     # tone: glass | uv | signal | ""
  link: https://…/paper.pdf
  doi: 10.1126/science.xxx                      # optional
```

**Equipment card** (`equipment.yml`):

```yaml
- id: "KIT · 04"
  title: New instrument name
  photo: ""                # filename in assets/images/equipment/, "" = placeholder
  desc: >-
    One or two sentences on what it does.
  meta: [tag one, tag two]
```

**Lab member** (`members.yml`, under `items:`):

```yaml
- name: First Last
  role: Graduate Student
  since: "2025"
  initials: FL             # shown if no photo
  photo: first-last.jpg    # in assets/images/members/, or omit for initials
  bio: >-
    A sentence or two.
```

**Lab alum** (`members.yml`, under `alumni:`): uncomment the sample block.
While the list is empty the page shows a "will be listed here" placeholder.

```yaml
alumni:
  - name: First Last
    role: Graduate Student · 2021–2024
    now: PhD student, University of Somewhere   # optional
```

## Adding images

Drop the file into the right folder, then reference it by **filename only** in
the matching YAML field:

| Image                    | Put it in…                        | Point at it via…                  |
| ------------------------ | --------------------------------- | --------------------------------- |
| Equipment photo          | `src/assets/images/equipment/`    | `photo:` in `equipment.yml`       |
| Lab member photo         | `src/assets/images/members/`      | `photo:` in `members.yml`         |
| Site logo                | `src/assets/images/`              | already wired (`RCP-Logo.png`)    |
| Home page portrait       | `src/assets/images/`              | already wired (`profile.png`)     |

Notes:
- Use JPG or PNG. Equipment boxes are 4:3 and member photos are square; the
  image is center-cropped to fit, so roughly-that-shape photos look best.
- To swap the logo or portrait, save the new file over the existing one using
  the **same filename** and it updates everywhere. A transparent PNG works well
  for the logo (the header background is cream, so use dark or teal artwork).

## Editing a page's headline and intro

Open the page's file in `src/` (for example `src/research.md`) and edit the
front matter between the `---` lines:

```yaml
eyebrow: "§ 01 · Research"     # small label above the title (leave the number)
heading_html: 'What the lab <em>works on</em>.'   # <em> = the teal italic word
deck: >-
  The italic sentence under the headline.
```

The home page also has `hero_meta` (the four stat cells under the portrait);
edit those label/value/note lines to change the stats.

## Where each page's content comes from

| Page          | Front matter file    | Content data                         |
| ------------- | -------------------- | ------------------------------------ |
| Home          | `src/index.md`       | `strands.yml` + `hero_meta`          |
| Research      | `src/research.md`    | `strands.yml`                        |
| LAMB          | `src/lamb.md`        | `equipment.yml`, `members.yml`       |
| Publications  | `src/publications.md`| `publications.yml`                   |
| Teaching      | `src/teaching.md`    | `teaching.yml`                       |
| CV            | `src/cv.md`          | `cv.yml`                             |
| Contact       | `src/contact.md`     | `site.yml` (email + social)          |

## If something breaks

If `npm run dev` shows an error after an edit, it is almost always a YAML
indentation or punctuation issue in the file you just changed. Check that:
list items line up, you used two spaces (never tabs), and any value containing
a colon is wrapped in quotes. Undo your last change and the site will build
again.
