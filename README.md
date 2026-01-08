# NDC - Nuôi Dạy Con Blog

A Vietnamese parenting/lifestyle blog built with [Eleventy](https://www.11ty.dev/) v3.1.2 and styled with the [Ghost Liebling theme](https://github.com/eddiesigner/liebling) (converted to Nunjucks).

Based on [eleventy-base-blog v8](https://github.com/11ty/eleventy-base-blog).

## Getting Started

### Prerequisites

- Node.js v20+ (see `.nvmrc`)
- pnpm v10+

### Installation

```bash
# Install dependencies
pnpm install

# Development server with live reload
pnpm start

# Production build
pnpm run build

# Debug mode
pnpm run debug
```

### Configuration

- `_data/metadata.js` - Site metadata (title, URL, author info, social links)
- `eleventy.config.js` - Eleventy configuration

## Features

### Theme
- **Ghost Liebling Theme**: Beautiful, modern design converted from Ghost to Nunjucks
- **3-Column Featured Section**: Homepage displays 7 featured posts (1 large center + 3 small on each side)
- **LATEST Section**: Grid of remaining posts with excerpts, author, and date
- **Dark Mode**: Toggle between light and dark themes
- **Search**: Built-in search functionality
- **Responsive Design**: Mobile-first responsive layouts
- **Typography**: Sans-serif (Inter) for UI/headings, serif (Source Serif 4) for post body content

### Content
- **Blog Posts**: Vietnamese parenting/lifestyle content in `content/_posts/`
- **Collections**:
  - Nuôi dạy con (Parenting)
  - Chuyện chị em (Women's Corner)
  - Review (Product/Book Reviews)
- **Draft Support**: Use `draft: true` in frontmatter to hide posts from production builds
- **Tag Pages**: Auto-generated tag archive pages

### Technical
- **Eleventy v3.1.2**: Static site generator with Nunjucks templating
- **Image Optimization**: AVIF/WebP formats via `{% image %}` shortcode
- **RSS Feeds**: Atom and JSON feeds
- **Navigation**: Content-driven menu via eleventyNavigation plugin
- **Live Reload**: Development server with hot reload

## Project Structure

```
content/                    # Site content
├── _posts/                 # Blog posts (Markdown)
├── gioi-thieu/             # About page
└── index.njk               # Homepage

_includes/
├── layouts/                # Page layouts (base, home, post, tag, collection, author)
└── partials/               # Reusable components (header, footer, cards)

public/
├── theme/                  # Ghost theme assets (CSS, JS, fonts)
└── images/                 # Blog images (organized by YYYY/MM)

_ghost/theme/               # Original Ghost Liebling theme (reference)
```

## Writing Posts

Create new posts in `content/_posts/` with frontmatter:

```yaml
---
title: Post Title
excerpt: Short excerpt shown on article cards (recommended)
date: 2024-01-15
tags:
  - Nuôi dạy con
feature_image: /images/2024/01/image.jpg
draft: false
---
```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title |
| `date` | Yes | Publish date (YYYY-MM-DD) |
| `excerpt` | No | Short description for cards (auto-generated from content if missing) |
| `feature_image` | No | Featured image path |
| `tags` | No | Array of tag names |
| `draft` | No | Set `true` to hide from production |

### Draft Posts

Set `draft: true` to hide a post from production builds. Drafts are visible during development (`pnpm start`).

## Deployment

Configured for Netlify deployment via `netlify.toml`. Output goes to `_site/`.

```bash
pnpm run build
```

## Credits

- [Eleventy](https://www.11ty.dev/) - Static site generator
- [Liebling Theme](https://github.com/eddiesigner/liebling) - Original Ghost theme by Eduardo Gómez
- [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog) - Base template
