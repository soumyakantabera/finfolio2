# FinFolio — Finance Portfolio Template

A deployable portfolio web app template built with **Vite + React + Material UI**, designed for finance students and professionals. Features a sharp, editorial black-and-white design and a built-in **Admin Portal** for managing all content without editing code.

## Features

- **Public Portfolio Pages** — Home, Projects, About, Resume, Contact
- **Project Detail Pages** — Dedicated pages for each project with rich markdown content and embeds
- **Block-Based Project Articles** — Projects support an ordered blocks array (markdown, embed, callout, divider, gallery, attachments) with drag-to-reorder in admin
- **Markdown Authoring** — Write project content in Markdown via the admin portal with live preview
- **Rich Embed Support** — 13 embed types (YouTube, PDF, audio, Google Docs/Sheets, MS Office, image, gallery, Figma, code, GitHub Gist, iframe, chart, file) with responsive rendering
- **Auto Table of Contents + Reading Progress** — Project detail pages auto-generate a TOC from headings and show a reading progress bar at the top
- **Code Blocks with Syntax Highlighting** — B&W syntax highlighting, copy button, and line wrap support in markdown and embed code blocks
- **Callout Blocks** — Styled callout blocks with variants: insight, assumption, risk, result, and key takeaway
- **Asset Upload Library** — Upload PDFs and images in the admin project editor; assets stored as base64 data URLs and available for embed `src` fields
- **Research Papers / Journals** — First-class research paper content type with abstract, key findings, methodology, citation/BibTeX support, and PDF viewer
- **Clean Project Card Design** — Project cards with always-visible CTAs and subtle hover effects (border, translate)
- **Certification Click-to-View Modal** — Certifications with media attachments open in a modal viewer with download, open in new tab, and metadata display
- **Admin Portal (CMS)** — Full CRUD dashboard to manage all content from the browser (hidden from public navigation)
- **Quotes / Own Words CMS** — Manage personal quotes with CRUD, featured toggle, ordering, and attribution
- **Modern About Page** — Polished design with timeline, skill progress bars, metrics, achievements, and contact links
- **Sharp B&W Design** — Professional, editorial typography with Manrope font, minimal borders, no rounded corners
- **Responsive** — Desktop, tablet, and mobile layouts with a unified codebase
- **GitHub Pages Ready** — HashRouter for SPA compatibility, GitHub Actions deploy workflow
- **Custom Pages** — Create and manage additional pages from the admin portal

## Spacing System

All spacing uses a consistent token system defined as CSS custom properties in `src/index.css`. Use tokens only — no ad-hoc margin or padding values.

### Spacing Scale

| Token | Value | MUI Units | Usage |
|-------|-------|-----------|-------|
| `--s1` | 4px | 0.5 | Tight inline gaps |
| `--s2` | 8px | 1 | Small gaps, icon spacing |
| `--s3` | 12px | 1.5 | Row gaps (`--row-gap`) |
| `--s4` | 16px | 2 | Block gap (`--block-gap`), paragraph spacing |
| `--s5` | 24px | 3 | Section header margins |
| `--s6` | 32px | 4 | Mobile section spacing |
| `--s7` | 40px | 5 | Desktop horizontal page padding |
| `--s8` | 48px | 6 | Desktop section gaps |
| `--s9` | 64px | 8 | Desktop page vertical padding |

### Layout Tokens

| Token | Desktop | Mobile | Usage |
|-------|---------|--------|-------|
| `--page-pad-x` | 40px | 16px | Page horizontal padding |
| `--page-pad-y` | 64px | 32px | Page vertical padding |
| `--section-gap` | 48px | 32px | Gap between major sections |
| `--block-gap` | 16px | 16px | Gap between blocks within a section |
| `--row-gap` | 12px | 12px | Gap between list/row items |

### Usage Rules

1. **Pages** (in `src/pages/` and `pages/`): Use MUI responsive breakpoints (e.g., `py: { xs: 4, md: 8 }` for 32px/64px).
2. **Section padding**: Hero/CTA sections use `py: { xs: 4, md: 8 }`. Content sections use `py: { xs: 4, md: 6 }`.
4. **Container horizontal padding**: `px: { xs: 2, md: 5 }` (16px/40px).
5. **Grid spacing**: `spacing: { xs: 2, md: 3 }` (16px/24px).
6. **Markdown vertical rhythm**: Headings get `mt: 3–4`, paragraphs get `mb: 2`, code/tables/quotes get `my: 3`.

## Typography & Fonts

The site uses a custom font system loaded via `@fontsource`:

| Usage | Font | Weights |
|-------|------|---------|
| **Headings / Display** | Manrope | 400–700 |
| **Body / UI text** | Manrope | 300–700 |

**Type scale**: display, h1–h6, body1, body2, caption, overline — all defined in `src/theme/theme.js`.

**Tabular numerals** are enabled for finance content (tables, metrics, stats) via the `.tabular-nums` CSS class and global CSS rules.

Fallback fonts: Helvetica → Arial → sans-serif.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Admin Portal Access

The admin portal is hidden from the public navigation but remains accessible via direct URL.

1. Navigate to `/admin` in the browser (e.g. `https://<your-domain>/finfolio/admin`)
2. Enter the passcode (default: **Soumya01**, or set `NEXT_PUBLIC_ADMIN_PASSCODE` env variable at build time)
3. Use the dashboard to manage all portfolio sections

### What You Can Edit

| Section      | Fields                                                                 |
| ------------ | ---------------------------------------------------------------------- |
| **Home**     | Hero title/subtitle, intro text, snapshot panel (location/role/availability), CTA buttons, stats, custom sections |
| **About**    | Profile, bio, education, experience, skills, certifications (name, issuer, date, credential ID, link, media attachment), achievements, metrics, contact links |
| **Projects** | Title, slug, subtitle, description, category, tags, tech stack, links, block-based content (markdown, embed, callout, divider, gallery, attachments), hero image, date, status (draft/published), featured toggle, asset library. **Research Papers**: publication, authors, year, DOI link, PDF link, citation text, BibTeX, abstract, key findings, methodology, data sources |
| **Resume**   | Summary, downloadable file link, structured sections                   |
| **Contact**  | Email, phone, address, LinkedIn, GitHub, social links                 |
| **Quotes**   | Quote text, attribution label, context/tag, featured toggle, order control |
| **Settings** | Site title, page visibility toggles, custom pages                     |

## Quotes / Own Words

A CMS-managed section for personal quotes that appear on the homepage and optionally other pages.

### Admin Portal (Quotes Manager)

1. Go to **Admin → Quotes**
2. Add quotes with:
   - **Quote text** (required) — the quote content
   - **Attribution** (optional) — e.g., "Me", "Principle", "Note to self"
   - **Context / Tag** (optional) — e.g., "Work ethic", "Markets", "Learning"
   - **Featured** toggle — show on homepage
   - **Order** — use up/down arrows to reorder
3. Click **Save Changes**

### Public Display

- The homepage displays the first featured quote in an editorial block
- The `QuoteBlock` component supports `mode="featured"` (single) or `mode="rotating"` (auto-rotate)
- Quotes use large typography with minimal styling: opening quote mark, bold text, attribution

## Homepage Sections

The redesigned homepage features an editorial layout with these sections:

| Section | Description |
|---------|-------------|
| **01 / Hero** | Editorial split layout — headline + subtitle on left, snapshot panel on right (name, role, location, availability, quick links) |
| **02 / Key Metrics** | Stats row with tabular numerals and vertical separators |
| **03 / Featured Work** | Project grid with category filter buttons, sharp bordered cards |
| **04 / Featured Quote** | Quote block pulled from the Quotes CMS |
| **05 / Custom Sections** | User-defined content sections |
| **06 / CTA Footer** | "Let's connect" call-to-action with email and contact page links |

## Creating Project Detail Pages

Each project can have a dedicated detail page accessible at `/#/projects/:slug`.

### Via Admin Portal

1. Go to **Admin → Projects**
2. Click **Add Project** or **Edit** an existing project
3. Fill in the project metadata:
   - **Title** — The project name
   - **Slug** — Auto-generated from the title (editable). This becomes the URL path (e.g., `my-project` → `/#/projects/my-project`)
   - **Subtitle** — Short summary shown below the title
   - **Category** — Used for filtering on the projects gallery
   - **Tags** — Comma-separated tags
   - **Tech Stack** — Comma-separated technologies used
   - **Hero Image URL** — Full-width image at the top of the detail page
   - **Date / Timeline** — When the project was completed
   - **Status** — `published` (visible) or `draft` (hidden from gallery)
   - **Featured** — Toggle to highlight on the home page
4. Write the project content in the **Markdown Content** editor
5. Add **Embeds** for rich media (YouTube, PDFs, etc.)
6. Add **Links** (GitHub, live demo, docs, etc.)
7. Set **Related Projects** as comma-separated slugs
8. Click **Save Changes**

### Adding a Research Paper

Research Papers are a specialized project type with richer metadata for academic publications.

1. Go to **Admin → Projects**
2. Click **Add Project**
3. Set **Category** to `Research Papers`
4. Fill in the standard fields (title, slug, description, tags, etc.)
5. The **Research Paper Fields** section will appear automatically with:
   - **Publication / Journal** — e.g., "Journal of Sustainable Finance & Investment"
   - **Authors** — e.g., "Jane Smith, Robert Chen"
   - **Year** — publication year
   - **DOI Link** (optional) — digital object identifier URL
   - **PDF Link** (required) — link to the PDF file or embed
   - **Abstract** — short summary of the paper
   - **Citation Text** (optional) — formatted citation string
   - **BibTeX** (optional) — BibTeX entry for the paper
   - **Methodology** — description of the research methodology
   - **Key Findings** — one finding per line
   - **Data Sources** — label + URL pairs for datasets used
6. Add block-based content (markdown, callouts, etc.) for the full paper body
7. Click **Save Changes**

#### Research Paper Detail Page

The detail page for research papers automatically displays:

- **Abstract** (prominent, at the top)
- **Publication info** (journal, authors, year)
- **Key Findings** (bulleted list in a bordered box)
- **Methodology** (structured text block)
- **Data Sources** (linked buttons)
- **Open PDF** button + optional **View DOI** button
- **Citation block** with copy-to-clipboard and optional BibTeX entry
- Standard block-based content below

#### Research Paper Card (Projects Page)

Research paper cards on the Projects page show:

- Title, abstract/description, tags
- Publication name and year (italicized)
- Author names
- **Read Paper** (primary CTA) and **DOI** (secondary CTA) buttons — always visible, not hover-based

Filter research papers using the **RESEARCH PAPERS** tab on the Projects page.

### Markdown Usage

The markdown editor supports full **GitHub Flavored Markdown** (GFM):

```markdown
## Section Heading

This is a paragraph with **bold** and *italic* text.

### Subsection

- Bullet list item 1
- Bullet list item 2

1. Numbered list
2. Second item

| Column 1 | Column 2 |
|-----------|----------|
| Data      | Value    |

> Blockquote text

`inline code` and code blocks:

​```python
def calculate():
    return result
​```

[Link text](https://example.com)

![Image alt](https://example.com/image.png)
```

#### Embed Shortcodes in Markdown

You can embed rich content directly in markdown using shortcodes:

```
[embed:youtube url="https://youtube.com/watch?v=VIDEO_ID" title="My Video"]
[embed:pdf url="https://example.com/document.pdf" title="Report"]
[embed:gdocs url="https://docs.google.com/document/d/DOC_ID/preview" title="Document"]
[embed:gsheets url="https://docs.google.com/spreadsheets/d/SHEET_ID/preview" title="Spreadsheet"]
[embed:msoffice url="https://example.com/presentation.pptx" title="Slides"]
[embed:image url="https://example.com/photo.jpg" title="Photo"]
```

### Embed Support

Embeds can be added in two ways:

1. **Embed shortcodes in markdown** — Insert `[embed:TYPE url="URL" title="TITLE"]` directly in the markdown content
2. **Structured embed sections** — Add embeds via the admin UI under the "Embeds" section of each project

Supported embed types:

| Type         | Description                              | Behavior                                    |
| ------------ | ---------------------------------------- | ------------------------------------------- |
| `youtube`    | YouTube videos                           | Lazy-loaded embedded player with click-to-play (16:9) |
| `pdf`        | PDF documents                            | In-page PDF viewer with download button     |
| `audio`      | Audio files                              | Audio player element                        |
| `gdocs`      | Google Docs                              | Google Docs preview iframe                  |
| `gsheets`    | Google Sheets                            | Google Sheets preview iframe                |
| `msoffice`   | Microsoft Office (Word/Excel/PowerPoint) | Office Online viewer iframe                 |
| `image`      | Images                                   | Responsive image with lightbox              |
| `gallery`    | Image galleries                          | Multi-image gallery with lightbox and keyboard navigation |
| `figma`      | Figma designs                            | Figma embed iframe                          |
| `code`       | Code snippets                            | Syntax-highlighted code block with copy button |
| `gist`       | GitHub Gists                             | GitHub Gist embed                           |
| `iframe`     | Generic iframes                          | Whitelisted iframe embed                    |
| `chart`      | Charts (Plotly/Vega/generic)             | Chart embed iframe                          |
| `file`       | Downloadable files                       | File card with download link                |

If an embed fails to load (iframe restrictions, invalid URL, etc.), it gracefully falls back to a preview card with an external link button.

## Block-Based Project Articles

Projects now support an ordered **blocks** array as the primary content model. Each block has a `type` and type-specific fields:

| Block Type      | Description                                                         |
| --------------- | ------------------------------------------------------------------- |
| `markdown`      | Markdown content rendered with GFM support and syntax highlighting  |
| `embed`         | Rich embed (any of the 13 supported embed types)                    |
| `callout`       | Styled callout with variant: `insight`, `assumption`, `risk`, `result`, or `takeaway` |
| `divider`       | Horizontal divider between content sections                         |
| `gallery`       | Image gallery with lightbox support                                 |
| `attachments`   | File attachments with download / open buttons                       |

In the admin project editor, blocks can be **added**, **reordered** (move up/down), and **deleted**. The system is **backward compatible** — projects with legacy `markdownContent` still render correctly.

## Embed Whitelist Configuration

The `config.embedWhitelist` array in the data model controls which domains are allowed for iframe-based embeds. The default whitelist includes:

```
youtube.com, youtu.be, docs.google.com, sheets.google.com,
drive.google.com, figma.com, gist.github.com,
codepen.io, codesandbox.io, plotly.com,
view.officeapps.live.com, onedrive.live.com
```

Customize the whitelist by editing the `embedWhitelist` array in `src/data/portfolioData.js` or via the admin data model.

## Asset Upload Flow

The admin project editor includes an **Asset Library** for managing file uploads:

1. Open a project in **Admin → Projects**
2. Scroll to the **Asset Library** section in the editor sidebar
3. Click **Upload Asset** to add PDFs, images, or other files
4. Uploaded assets are stored as **base64 data URLs** in localStorage
5. When editing an embed block's `src` field, use the **Pick from Assets** dropdown to select an uploaded asset
6. Assets can be copied (data URL) or deleted from the library

## Certifications Click-to-View

Certifications on the About page now support rich media attachments:

- Each certification can have a **media attachment** (PDF or image) via the `mediaUrl` and `mediaType` fields
- Clicking a certification card with media opens a **modal viewer** displaying the PDF (via iframe) or image
- The modal footer shows metadata: issuer, date, and credential ID
- Action buttons: **Download** and **Open in new tab**
- **Keyboard accessible** — press Esc to close the modal

## About Page Content

The About page features a modern, section-based layout managed entirely through the admin portal.

### Sections

| Section             | Description                                      |
| ------------------- | ------------------------------------------------ |
| **Profile**         | Photo, name, headline, intro description         |
| **Bio**             | Detailed biography text                          |
| **Metrics**         | Key stats (e.g., "10+ Projects", "15+ Models")  |
| **Contact Links**   | Quick links (Email, LinkedIn, GitHub, etc.)      |
| **Experience**      | Vertical timeline with role, company, period     |
| **Education**       | Card grid with degree, institution, year         |
| **Skills**          | Progress bars with proficiency levels            |
| **Certifications**  | Clickable cards with name, issuer, date, credential ID, link, and optional media attachment (PDF/image) — click to view in modal |
| **Achievements**    | Cards with title, description, and year          |
| **Custom Sections** | User-defined additional sections                 |

### Managing About Content

1. Go to **Admin → About**
2. Edit the profile fields (name, title, photo URL, intro)
3. Write a detailed bio
4. Add education entries, experience timeline items, skills with proficiency levels
5. Add certifications, achievements, metrics/stats
6. Add contact quick links (Email, LinkedIn, GitHub, etc.)
7. Click **Save Changes**

## Save & Publish Workflow

1. Make changes in the Admin Portal
2. Click **Save Changes** — content is saved to browser localStorage
3. To publish to GitHub Pages:
   - Push changes to the `main` branch
   - GitHub Actions automatically builds and deploys the site

### GitHub Actions Deployment

The included `.github/workflows/deploy.yml` workflow:
- Triggers on push to `main` or manual dispatch
- Installs dependencies, builds the project
- Deploys the `dist` folder to GitHub Pages

### GitHub Pages Setup

1. Go to **Settings → Pages** in your GitHub repository
2. Under **Source**, select **GitHub Actions**
3. Push to `main` to trigger the first deployment

## Project Structure

```
├── .github/workflows/deploy.yml   # GitHub Actions deploy pipeline
├── public/                        # Static assets
├── src/
│   ├── admin/                     # Admin portal
│   │   ├── AdminLogin.jsx         # Passcode login
│   │   ├── AdminDashboard.jsx     # Dashboard with sidebar navigation
│   │   └── editors/               # Section editors
│   │       ├── HomeEditor.jsx
│   │       ├── AboutEditor.jsx
│   │       ├── ProjectsEditor.jsx
│   │       ├── ContactEditor.jsx
│   │       ├── QuotesEditor.jsx   # Quotes CRUD manager
│   │       └── SettingsEditor.jsx
│   ├── components/
│   │   ├── Navbar.jsx             # Responsive navigation bar
│   │   ├── QuoteBlock.jsx         # Quote display component (featured / rotating)
│   │   ├── MarkdownRenderer.jsx   # Markdown rendering with embed shortcodes
│   │   ├── EmbedBlock.jsx         # Rich embed component (13 types)
│   │   └── BlockRenderer.jsx      # Block-based content renderer (markdown, embed, callout, etc.)
│   ├── data/
│   │   └── portfolioData.js       # Data layer with sample content + quotes + embed whitelist
│   ├── pages/                     # Public pages
│   │   ├── Home.jsx               # Redesigned editorial homepage
│   │   ├── Projects.jsx           # Project gallery with filtering
│   │   ├── ProjectDetail.jsx      # Project detail page with TOC + reading progress
│   │   ├── About.jsx              # Modern About page with certification modal
│   │   ├── Contact.jsx
│   │   └── CustomPage.jsx
│   ├── theme/
│   │   └── theme.js               # MUI theme (B&W, sharp corners, Manrope)
│   ├── App.jsx                    # Root component with routing
│   ├── main.jsx                   # Entry point + font imports
│   └── index.css                  # Global styles + tabular numerals
├── index.html
├── vite.config.js
└── package.json
```

## Tech Stack

- **Next.js 16** — React framework with static export
- **React 19** — UI library
- **Material UI (MUI) v7** — Component library (sharp styling overrides)
- **Manrope** — Font via @fontsource
- **Next.js Pages Router** — File-based routing
- **react-markdown** — Markdown rendering
- **remark-gfm** — GitHub Flavored Markdown support
- **rehype-sanitize** — XSS-safe HTML sanitization
- **GitHub Actions** — CI/CD pipeline
- **GitHub Pages** — Hosting

## Customization

### Changing the Passcode

The admin passcode defaults to `Soumya01` and is checked in `pages/admin/index.jsx`. You can override it by setting the `NEXT_PUBLIC_ADMIN_PASSCODE` environment variable at build time. For production use, consider implementing a more secure authentication mechanism.

### Changing the Base URL

Update the `basePath` property in `next.config.mjs` to match your repository name:

```js
const nextConfig = {
  basePath: '/your-repo-name',
};
```

### Sample Content

The default portfolio content is defined in `src/data/portfolioData.js`. This serves as the initial data when no changes have been saved. Edit this file to change the default template content.

## License

MIT
