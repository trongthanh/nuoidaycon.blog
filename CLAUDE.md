# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vietnamese parenting/lifestyle blog built with Eleventy v3.1.2 (eleventy-base-blog v8). The site is statically generated with zero runtime JavaScript, optimized for perfect Lighthouse scores (4x 100s).

**Package Manager**: pnpm (v10.27.0)
**Node Version**: v20+ (see .nvmrc)
**Language**: Vietnamese (vi)
**Template Engine**: Nunjucks

## Development Commands

```bash
# Development server with live reload
pnpm start
# or: npx @11ty/eleventy --serve --quiet

# Production build
pnpm run build
# or: npx @11ty/eleventy

# Debug mode (see all internals)
pnpm run debug
pnpm run debugstart  # with server

# Performance benchmarking
pnpm run benchmark

# GitHub Pages build (with pathPrefix)
pnpm run build-ghpages
```

## Architecture Overview

### Directory Structure

```
content/                    # Input directory (all site content)
├── _posts/                 # Blog posts (auto-tagged with "posts")
├── chuyen-chi-em/          # "Women's Corner" collection
├── gioi-thieu/             # "About" page
├── nuoi-day-con/           # "Parenting" collection
├── review/                 # "Reviews" collection
├── feed/                   # Atom/JSON feed generation
└── index.njk               # Homepage with pagination (10 posts/page)

_includes/
├── layouts/
│   ├── base.njk            # Root HTML layout
│   ├── home.njk            # Homepage/collection layout (extends base)
│   └── post.njk            # Blog post layout (extends base)
└── postslist.njk           # Reusable posts list component

_data/
└── metadata.js             # Global site metadata (title, author, URL, language)

public/                     # Static assets (passthrough copied to /)
├── css/                    # Stylesheets
└── images/                 # Blog images (organized by year/month)

_site/                      # Output directory (generated)
```

### Configuration Files

- **eleventy.config.js**: Main Eleventy configuration
- **eleventy.config.drafts.js**: Draft post handling plugin (drafts only in dev)
- **eleventy.config.images.js**: Image optimization plugin

### Input/Output Configuration

- **Input**: `content/`
- **Output**: `_site/`
- **Includes**: `_includes/`
- **Data**: `_data/`
- **Template Formats**: Markdown (.md), Nunjucks (.njk), HTML, Liquid

## Content Management

### Blog Posts

Location: `content/_posts/`

Auto-configured via `_posts.11tydata.js`:
- Tag: `posts` (automatically applied)
- Layout: `layouts/post.njk`
- Permalink pattern: `/{slug}/index.html`

Front matter fields:
```yaml
title: String (required)
description: String
date: Date (post date)
draft: Boolean (excludes from production builds)
tags: Array of strings
date_published: ISO date
date_updated: ISO date
```

**Draft Posts**: Set `draft: true` in front matter. Drafts are visible during `--serve`/`--watch` but excluded from production builds.

### Collections

- **posts**: All published blog posts
- **Nuôi dạy con**: Parenting posts
- **Chuyện chị em**: Women's topics
- **Review**: Product/book reviews

Collection pages are in their respective directories (e.g., `content/nuoi-day-con/index.njk`).

### Navigation

Uses `eleventyNavigation` plugin. Configure in front matter:
```yaml
eleventyNavigation:
  key: Page Name
  order: 1
```

## Custom Features

### Image Shortcode

Defined in `eleventy.config.images.js`. Generates optimized responsive images with AVIF/WebP formats:

```nunjucks
{% image "/path/to/image.jpg", "alt text", [400, 800], "(min-width: 800px) 800px, 400px" %}
```

- Outputs: `<picture>` with srcset, AVIF/WebP formats
- Adds: `loading="lazy"`, `decoding="async"`, width/height attributes
- Watch target: `content/**/*.{svg,webp,png,jpeg}`
- Output directory: `_site/img/`

### Custom Filters

Defined in `eleventy.config.js`:

**Date Filters** (using Luxon):
- `readableDate(dateObj, format, zone)`: Default "dd LLLL yyyy"
- `htmlDateString(dateObj)`: Returns "yyyy-LL-dd"

**Array/Collection Filters**:
- `head(array, n)`: Get first n elements
- `min(...numbers)`: Find minimum
- `getAllTags(collection)`: Extract all tags from collection
- `filterTagList(tags)`: Remove system tags (all, nav, post, posts)

### CSS Bundling

Uses `eleventy-plugin-bundle` for per-page CSS:

```nunjucks
{% css %}
  /* page-specific CSS */
{% endcss %}

<!-- In layout: -->
<style>{% getBundle "css" %}</style>
```

Main stylesheet is inlined in `<style>` tag for optimal FCP.

### Markdown Configuration

Uses `markdown-it-anchor` for automatic heading anchors:
- Levels: h1-h4
- Symbol: `#` (placed after heading)
- Class: `header-anchor`
- Slugify: Uses Eleventy's built-in slugify filter

## Deployment

### Netlify Configuration

File: `netlify.toml`
- Build command: `npm run build`
- Publish directory: `_site/`
- Lighthouse plugin: Requires perfect 1.0 scores on all metrics
- Reports: `reports/lighthouse/index.html`

### CMS Integration

File: `.pages.yml` (Page CMS - https://app.pagescms.org)
- Media directory: `public/images/`
- Collections: Posts, About, Metadata

## Performance Targets

- **Zero JavaScript**: All output is pre-rendered HTML/CSS
- **Lighthouse Scores**: 4x 100s (performance, accessibility, best practices, SEO)
- **Cumulative Layout Shift**: 0ms (width/height on images)
- **Total Blocking Time**: 0ms (no JS)
- **Image Formats**: Modern AVIF/WebP with fallbacks

## Code Style

Per `.editorconfig`:
- Indent: Tabs (size 2)
- Line endings: LF
- Charset: UTF-8
- Trim trailing whitespace
- Final newline required

## Important Notes

1. **Vietnamese Content**: All blog posts are in Vietnamese. Site language is set to `vi` in metadata.js.

2. **Image Organization**: Images are stored in `public/images/YYYY/MM/` format. They are referenced in posts as `/images/2020/06/filename.jpg`.

3. **Tag System**:
   - Multi-tag support per post
   - Auto-generates tag pages at `/tags/{slug}/`
   - System tags (all, nav, post, posts) are filtered from display

4. **Pagination**:
   - Homepage shows 10 posts per page
   - URL pattern: `/`, `/page/2/`, `/page/3/`
   - Uses `pagination` in front matter

5. **Feeds**:
   - Atom: `/feed/feed.xml`
   - JSON: `/feed/feed.json`
   - Both include full post content

6. **CSP Considerations**: CSS is inlined by default. For strict CSP, uncomment the `<link>` tag in `base.njk` and remove inline `<style>`.

7. **Passthrough Copy**: `public/` directory contents are copied directly to `_site/` root. Prism.js CSS theme is also copied from node_modules.

## Plugin Documentation

- **RSS**: https://www.11ty.dev/docs/plugins/rss/
- **Syntax Highlight**: https://www.11ty.dev/docs/plugins/syntaxhighlight/
- **Navigation**: https://www.11ty.dev/docs/plugins/navigation/
- **Bundle**: https://github.com/11ty/eleventy-plugin-bundle
- **Image**: https://www.11ty.dev/docs/plugins/image/
- **HTML Base**: https://www.11ty.dev/docs/plugins/html-base/
