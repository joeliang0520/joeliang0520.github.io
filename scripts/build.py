#!/usr/bin/env python3
"""Render the publication lists from data/publications.json into the HTML pages.

Usage (from the repository root):

    python3 scripts/build.py

The script replaces everything between the marker comments
<!-- BEGIN:<name> --> and <!-- END:<name> --> in index.html and
publications.html. Edit data/publications.json, then re-run it.
Only the Python standard library is needed.
"""
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ME = "Jiazhou Liang"

SECTIONS = [
    ("preprint", "Preprints"),
    ("peer", "Conference and Journal Papers"),
    ("thesis", "Thesis"),
]


def esc(s):
    return html.escape(s, quote=True)


def render_authors(authors):
    parts = []
    for a in authors:
        equal = a.endswith("*")
        name = a.rstrip("*")
        s = esc(name)
        if name == ME:
            s = f'<span class="me">{s}</span>'
        if equal:
            s += "<sup>*</sup>"
        parts.append(s)
    if len(parts) <= 2:
        return " and ".join(parts)
    return ", ".join(parts[:-1]) + ", and " + parts[-1]


def bib_name(name):
    name = name.rstrip("*")
    first, _, last = name.rpartition(" ")
    return f"{last}, {first}" if first else last


def bib_escape(s):
    return s.replace("&", r"\&")


def render_bibtex(p):
    fields = [("title", bib_escape(p["title"])),
              ("author", " and ".join(bib_name(a) for a in p["authors"]))]
    t = p["type"]
    if t == "preprint":
        kind = "article"
        fields.append(("journal", p["venue"]))
    elif t == "conference":
        kind = "inproceedings"
        fields.append(("booktitle", bib_escape(p["venue"])))
    elif t == "journal":
        kind = "article"
        fields.append(("journal", bib_escape(p["venue"])))
    else:
        kind = "mastersthesis"
        fields.append(("school", p.get("school", "")))
    for k in ("volume", "number", "pages", "doi"):
        if p.get(k):
            fields.append((k, p[k]))
    fields.append(("year", str(p["year"])))
    width = max(len(k) for k, _ in fields)
    body = ",\n".join(f"  {k.ljust(width)} = {{{v}}}" for k, v in fields)
    return f"@{kind}{{{p['id']},\n{body}\n}}"


def render_venue(p):
    v = f"<em>{esc(p['venue'])}</em>"
    if p["type"] == "journal" and p.get("volume"):
        v += f", {esc(p['volume'])}"
        if p.get("number"):
            v += f"({esc(p['number'])})"
        if p.get("pages"):
            v += ":" + esc(p["pages"].replace("--", "–"))
    elif p["type"] == "conference" and p.get("pages"):
        v += ", pp. " + esc(p["pages"].replace("--", "–"))
    return f"{v}, {p['year']}."


def render_links(p):
    links = []
    if p.get("pdf"):
        links.append(f'<a href="{esc(p["pdf"])}">PDF</a>')
    if p.get("arxiv"):
        links.append(f'<a href="https://arxiv.org/abs/{esc(p["arxiv"])}">arXiv</a>')
    if p.get("doi"):
        links.append(f'<a href="https://doi.org/{esc(p["doi"])}">DOI</a>')
    if p.get("code"):
        links.append(f'<a href="{esc(p["code"])}">Code</a>')
    if p.get("demo"):
        links.append(f'<a href="{esc(p["demo"])}">Demo</a>')
    pid = esc(p["id"])
    links.append(f'<button type="button" class="toggle" aria-expanded="false" '
                 f'aria-controls="abs-{pid}">Abstract</button>')
    links.append(f'<button type="button" class="toggle" aria-expanded="false" '
                 f'aria-controls="bib-{pid}">BibTeX</button>')
    return " ".join(f"[{l}]" for l in links)


def render_figure(p):
    tag = f'<span class="pub-tag">{esc(p["short"])}</span>'
    if not p.get("fig"):
        return f'<div class="pub-side">{tag}</div>'
    return f"""<div class="pub-side">
    <button type="button" class="pub-thumb" data-full="{esc(p['fig'])}" aria-label="Enlarge figure: {esc(p['title'])}">
      <img src="{esc(p['fig'])}" alt="Figure from: {esc(p['title'])}" loading="lazy">
    </button>
    {tag}
  </div>"""


def render_pub(p):
    pid = esc(p["id"])
    topics = esc(" ".join(p.get("topics", [])))
    return f"""<li class="pub" id="{pid}" data-topics="{topics}">
  {render_figure(p)}
  <div class="pub-body">
    <div class="pub-title">{esc(p['title'])}</div>
    <div class="pub-authors">{render_authors(p['authors'])}</div>
    <div class="pub-venue">{render_venue(p)}</div>
    <div class="pub-links">{render_links(p)}</div>
    <div class="pub-panel abstract" id="abs-{pid}" hidden><p>{esc(p['abstract'])}</p></div>
    <div class="pub-panel bibtex" id="bib-{pid}" hidden><button type="button" class="copy">Copy</button><pre>{esc(render_bibtex(p))}</pre></div>
  </div>
</li>"""


def render_list(pubs):
    return '<ul class="pubs">\n' + "\n".join(render_pub(p) for p in pubs) + "\n</ul>"


def render_full(pubs):
    out = []
    for key, heading in SECTIONS:
        if key == "peer":
            items = [p for p in pubs if p["type"] in ("conference", "journal")]
        else:
            items = [p for p in pubs if p["type"] == key]
        if not items:
            continue
        block = [f'<h2 id="{key}">{heading}</h2>']
        if key == "peer":
            for year in sorted({p["year"] for p in items}, reverse=True):
                block.append(f'<div class="year-group">\n<h3 class="year">{year}</h3>')
                block.append(render_list([p for p in items if p["year"] == year]) + "\n</div>")
        else:
            block.append(render_list(items))
        out.append('<section class="pub-section">\n' + "\n".join(block) + "\n</section>")
    return "\n\n".join(out)


def splice(path, name, content):
    text = path.read_text(encoding="utf-8")
    pattern = re.compile(rf"(<!-- BEGIN:{name} -->)(.*?)(<!-- END:{name} -->)", re.S)
    if not pattern.search(text):
        raise SystemExit(f"marker {name} not found in {path.name}")
    text = pattern.sub(lambda m: f"{m.group(1)}\n{content}\n{m.group(3)}", text)
    path.write_text(text, encoding="utf-8")


def main():
    pubs = json.loads((ROOT / "data" / "publications.json").read_text(encoding="utf-8"))
    for p in pubs:
        for k in ("pdf", "fig"):
            if p.get(k) and not (ROOT / p[k]).exists():
                print(f"warning: missing file {p[k]}")
    splice(ROOT / "index.html", "selected", render_list([p for p in pubs if p.get("selected")]))
    splice(ROOT / "publications.html", "publications", render_full(pubs))
    print(f"rendered {len(pubs)} publications")


if __name__ == "__main__":
    main()
