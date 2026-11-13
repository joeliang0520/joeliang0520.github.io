# Jiazhou (Joe) Liang: academic homepage

Plain static HTML and CSS, served by GitHub Pages (`.github/workflows/publish.yaml`
deploys the repository root on every push to `main`).

## Structure

```
index.html            Home: bio, news, selected publications
publications.html     Full publication list (abstract, PDF, BibTeX for each paper)
cv.html               CV summary; links to the PDF in uploads/
data/publications.json  Publication data (single source of truth)
scripts/build.py      Renders publication lists into index.html and publications.html
assets/css/style.css  Stylesheet
assets/js/site.js     Abstract / BibTeX toggles, filters, figure lightbox, scroll reveal
assets/js/plan.js     Animated floor plan in the "Current Focus" section
assets/images/        Profile photo; papers/ holds the figure shown for each paper
papers/               Paper PDFs
uploads/Jiazhou_Liang_CV.pdf
```

## Adding or editing a publication

1. Put the PDF in `papers/`.
2. Add an entry to `data/publications.json`. Fields:
   - `id` (also the BibTeX key), `type` (`preprint`, `conference`, `journal`, or `thesis`), `year`
   - `title`, `authors` (full names; append `*` for equal contribution)
   - `venue` (full name), `short` (label shown at left, e.g. `ACL 2026`)
   - optional: `pages`, `volume`, `number`, `doi`, `arxiv`, `pdf`, `code`, `demo`, `school`
   - `fig`: thumbnail image (e.g. `assets/images/papers/<name>.webp`), usually Figure 1 of the paper
   - `topics`: any of `memory`, `egocentric`, `recsys`, `clustering` (used by the filter buttons)
   - `abstract`
   - `selected: true` to also list it on the home page
3. Run `python3 scripts/build.py` (standard library only), then commit.

News items and the bio are edited directly in `index.html`.
