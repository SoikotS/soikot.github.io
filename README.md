# Academic Personal Website

A fast, static, five-page academic site — **Home, Research, Publications, Projects, Profile** — built with plain HTML/CSS/JS (no framework, no build step) and designed to host on **GitHub Pages** for free.

Live sections:
- **Home** — intro, live Google Scholar snapshot, recent updates, featured publications/projects
- **Research** — research experience timeline
- **Publications** — filterable list (conference / workshop / preprint / thesis)
- **Projects** — academic & open-source project cards
- **Profile** — full bio, education, skills, awards, teaching

Design concept: a "card catalog" — publications, experience, and projects are rendered as index cards with a punched ID, filing tab, and folded corner, tying the visual language to the academic-archive subject matter.

---

## 1. Customize your content

All content lives in `/data/*.json` — **you never need to touch the HTML or CSS** to update your info.

| File | Controls |
|---|---|
| `data/profile.json` | Name, role, tagline, links, bio paragraphs, news/updates |
| `data/education.json` | Education timeline |
| `data/research.json` | Research experience entries |
| `data/publications.json` | Publications list (title, venue, year, type, links) |
| `data/projects.json` | Academic/open-source projects |
| `data/skills.json` | Skills, awards, teaching |
| `data/scholar_data.json` | Google Scholar stats: citations, h-index, publications (updated manually — see below) |

Open each file, edit the values, save. Add or remove list entries freely — the site re-renders from whatever is in the JSON.

Replace the placeholder files in `/assets/`:
- `assets/profile.jpg` — your photo (delete `README-photo.txt` once added)
- `assets/cv.pdf` — your CV (delete `README-cv.txt` once added)

---

## 2. Updating your Google Scholar stats (citations, h-index, publications)

There's no backend and no scraping — Google Scholar has no public API and blocks automated browser access, so these three numbers are updated by hand. Two ways to do it:

**A. Edit the file directly (permanent, recommended)**
Open `data/scholar_data.json` and update the numbers:
```json
{
  "updated": "2026-08-01",
  "citations": 47,
  "h_index": 3,
  "publications": 4
}
```
Save, commit, and push — the live site updates for everyone.

**B. Use the in-page "Edit stats" button (quick local preview)**
On the Home page, next to "Google Scholar," click **Edit stats**. A panel lets you type in new numbers:
- **Save & preview** shows the new numbers immediately, but only in your own browser (stored in `localStorage` — other visitors won't see it, and it resets if you clear browser data).
- **Copy JSON** copies a ready-to-paste snippet for `data/scholar_data.json`, so you can quickly make it permanent using method A.
- **Reset to file data** clears the local preview and goes back to whatever's in the JSON file.

This panel is just a convenience for previewing/generating the JSON — the only way to update the numbers for all visitors is committing the change to `data/scholar_data.json` and pushing to GitHub.

---

## 3. Deploy to GitHub Pages

1. Push this folder's contents to a GitHub repository (root of the repo, or a `docs/` folder — see below).
2. In your repo: **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Pick your branch (e.g. `main`) and folder (`/root` or `/docs`).
5. Save. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

A `.nojekyll` file is included so GitHub Pages serves the files as-is without running them through Jekyll.

> **Note on local preview:** opening `index.html` directly from disk (`file://...`) will not load the JSON data, because browsers block `fetch()` for local files. To preview locally, run a tiny local server from the project folder, e.g.:
> ```bash
> npx serve .
> # or
> python3 -m http.server 8000
> ```
> Then open `http://localhost:8000`. Once deployed to GitHub Pages, this isn't an issue.

---

## 4. File structure

```
.
├── index.html              Home
├── research.html            Research experience
├── publications.html        Publications (filterable)
├── projects.html            Academic projects
├── profile.html              Full profile
├── css/style.css            Design system + all styling
├── js/
│   ├── main.js              Shared: theme toggle, mobile nav, data fetch, scroll reveal
│   ├── home.js               Renders index.html
│   ├── research.js           Renders research.html
│   ├── publications.js       Renders publications.html
│   ├── projects.js           Renders projects.html
│   └── profile.js            Renders profile.html
├── data/                    All editable content (see table above)
├── assets/                  Your photo + CV go here
└── .nojekyll
```

## 5. Design notes

- **Type**: Fraunces (display) + Source Sans 3 (body) + IBM Plex Mono (metadata/labels), loaded from Google Fonts.
- **Color**: ink navy on paper sage, with a single garnet-red accent reserved for links, flags, and the current nav item. Includes a dark mode (toggle in the nav, persisted via `localStorage`).
- **Accessibility**: semantic landmarks, visible focus states, a skip-to-content link, and `prefers-reduced-motion` support.
- Everything is plain HTML/CSS/JS — no build tooling, no npm install required to run it.
