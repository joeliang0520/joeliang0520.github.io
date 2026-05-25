# Joe (Jiazhou) Liang — Personal Website

A modern, animated personal site for an academic researcher. Built as plain
HTML/CSS/JS — no build step, no framework — so it deploys directly to GitHub Pages.

## Structure

```
.
├── index.html            # Home / hero / featured publications
├── about.html            # Background / resume timeline
├── publications.html     # Full BibBase-style list with filters
├── contact.html          # Contact + socials
├── assets/
│   ├── css/main.css
│   ├── js/main.js              # theme, nav, scroll reveal, hero canvas
│   ├── js/publications.js      # publication data + renderer
│   └── images/                 # drop portrait.jpg + other images here
├── papers/               # drop paper PDFs here (linked from publications.js)
└── uploads/
    └── joe_resume.pdf    # downloadable CV
```

## Editing publications

Open `assets/js/publications.js`. Each publication is an object in the
`PUBLICATIONS` array with the following keys:

| key         | description                                           |
| ----------- | ----------------------------------------------------- |
| `id`        | unique slug                                           |
| `year`      | publication year                                      |
| `venue`     | short venue tag, e.g. `ACL 2026`                      |
| `venueLong` | full venue name (shown in muted text)                 |
| `venueTier` | `"top"` to highlight as a top-tier venue              |
| `tags`      | array used by the filter chips on `publications.html` |
| `title`     | paper title                                           |
| `authors`   | array of `{name, me?: true, equal?: true}`            |
| `abstract`  | short abstract for the expandable section             |
| `pdf`       | path to your PDF, e.g. `papers/foo.pdf`               |
| `code`      | code link (GitHub repo)                               |
| `project`   | project page link (optional)                          |
| `bibtex`    | raw BibTeX string                                     |

Bold styling for "me" and "equal contribution" is automatic.

## Adding images

- **Portrait:** drop a square or 4:5 image at `assets/images/portrait.jpg`. The
  background page will use it automatically; if missing, a placeholder shows.
- Add more images by referencing `assets/images/<your-file>` from any HTML.

## Adding paper PDFs

Drop your PDFs into `papers/` and update the `pdf:` path in
`assets/js/publications.js` to match. See `papers/README.md` for expected names.

## Deploying to GitHub Pages

1. Push the repo to GitHub.
2. In **Settings → Pages**, set the source to `main` branch, root folder.
3. Wait a minute. Your site is live at `https://<user>.github.io/<repo>/`.

Because it's plain static HTML, no build action is needed.

## Customising

- **Colors:** edit the CSS custom properties at the top of `assets/css/main.css`
  (look for `:root { … }` and `[data-theme="dark"] { … }`).
- **Fonts:** swap the Google Fonts `<link>` at the top of each HTML page, then
  update the `--serif`, `--serif-body`, `--sans`, `--mono` variables.
- **Hero animation:** the constellation lives in `assets/js/main.js`
  (`initConstellation`). Tweak the particle count or `linkDist` to taste.

## Browser support

Targets evergreen browsers. Uses `backdrop-filter`, `color-mix()`,
CSS custom properties, IntersectionObserver. Respects `prefers-reduced-motion`.
