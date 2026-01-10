# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vietnamese parenting/lifestyle blog built with Eleventy v3.1.2 (eleventy-base-blog v8). The site uses a custom theme based on the **Ghost Liebling theme**, converted to Nunjucks templates. The site is statically generated with zero runtime JavaScript, optimized for perfect Lighthouse scores.

**Package Manager**: pnpm (v10.27.0)
**Node Version**: v20+ (see .nvmrc)
**Language**: Vietnamese (vi)
**Template Engine**: Nunjucks
**Theme**: Ghost Liebling (converted)

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
├── chuyen-chi-em/          # "Women's Corner" collection page
├── gioi-thieu/             # "About/Author" page
├── nuoi-day-con/           # "Parenting" collection page
├── review/                 # "Reviews" collection page
├── feed/                   # Atom/JSON feed generation
└── index.njk               # Homepage with pagination (10 posts/page)

_includes/
├── layouts/
│   ├── base.njk            # Root HTML layout (Ghost theme structure)
│   ├── home.njk            # Homepage layout (3-column featured + grid)
│   ├── post.njk            # Blog post layout (hero, share, author)
│   ├── tag.njk             # Tag page layout
│   ├── author.njk          # Author page layout
│   └── collection.njk      # Collection page layout
├── partials/
│   ├── header.njk          # Site header with logo, nav, search
│   ├── footer.njk          # Site footer with logo, social links
│   ├── search.njk          # Search overlay component
│   ├── article-card.njk    # Standard article card for grids
│   ├── article-card-small.njk  # Small card for featured sidebar
│   └── featured-card.njk   # Large featured card for homepage
└── postslist.njk           # Legacy posts list component

_data/
└── metadata.js             # Global site metadata (title, author, logo, social)

public/                     # Static Ghost Liebling assets (passthrough copied to /)
├── css/                    # Theme stylesheets (app.css, home.css, etc.)
├── js/                     # Theme JavaScript (app.js, vendor.js)
├── fonts/                  # Icon fonts (icomoon)
└── images/                 # Theme and Blog images (organized by year/month) TODO: move content images to another folder

_site/                      # Output directory (generated)
```

### Configuration Files

- **eleventy.config.js**: Main Eleventy configuration
- **eleventy.config.drafts.js**: Draft post handling plugin (drafts only in dev)

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
show_latest_posts: Boolean (page layout: shows 4 latest posts at bottom)
feature_image: String (featured image path)
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

### Ghost Theme Components

The site uses converted Ghost Liebling theme components:

**Layouts:**
- `base.njk`: Main HTML structure with theme CSS/JS includes
- `home.njk`: Homepage with 3-column featured section + "LATEST" grid
- `post.njk`: Blog post with hero image, share buttons, author bio, related posts
- `page.njk`: Static page layout with hero, share buttons, progress indicator, optional latest posts
- `tag.njk`: Tag archive pages with hero and post grid
- `collection.njk`: Collection pages (uses `collectionName` frontmatter)
- `author.njk`: Author/about page with avatar, bio, social links

**Partials:**
- `header.njk`: Logo, navigation menu, search icon, dark mode toggle
- `footer.njk`: Logo, Facebook link, "Powered by Eleventy"
- `article-card.njk`: Standard post card for grids
- `article-card-small.njk`: Compact card for featured sidebar
- `featured-card.njk`: Large card for homepage center

**Theme CSS files** (in `public/theme/css/`):
- `app.css`: Main theme styles with CSS variables
- `home.css`: Homepage-specific styles
- `listing.css`: Post grid layouts
- `post.css`: Individual post styles
- `tags.css`: Tag page styles
- `custom.css`: Custom 3-column featured layout

### Image Optimization

Uses `@11ty/eleventy-img` v6.x with `eleventyImageTransformPlugin`. Images are optimized at build time using HTML attributes:

```html
<img src="/path/to/image.jpg" alt="alt text" eleventy:widths="400,800" eleventy:sizes="(min-width: 800px) 800px, 400px">
```

- Generates: AVIF, WebP, and JPEG formats with srcset
- Adds: `loading="lazy"`, `decoding="async"` attributes
- Configured in `eleventy.config.js` with `formats`, `widths`, and `htmlOptions`
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

- **Lighthouse Scores**: Optimized for high performance scores
- **Cumulative Layout Shift**: Minimized (width/height on images)
- **Image Formats**: Modern AVIF/WebP with fallbacks
- **Theme JS**: Bundled vendor.js + app.js for search, dark mode, responsive features

## Code Style

Per `.editorconfig`:
- Indent: Tabs (size 2)
- Line endings: LF
- Charset: UTF-8
- Trim trailing whitespace
- Final newline required

## Important Notes

1. **Vietnamese Content**: All blog posts are in Vietnamese. Site language is set to `vi` in metadata.js.

2. **Favicon**: Site favicon is configured in metadata.js (`favicon: '/favicon.png'`).

3. **Author Metadata**:
   - Facebook page: `https://www.facebook.com/deconlontunhien`
   - Author's personal Facebook: `thao.rachel.nguyen`
   - Author bio: "Một bà mẹ 2 con chia sẻ về những điều căn bản, đơn giản và đem lại thanh thản trong việc chăm sóc, dạy dỗ con cái và cuộc sống thường ngày."

4. **Image Organization**: Images are stored in `public/images/YYYY/MM/` format. They are referenced in posts as `/images/2020/06/filename.jpg`.

5. **Tag System**:
   - Multi-tag support per post
   - Auto-generates tag pages at `/tags/{slug}/`
   - System tags (all, nav, post, posts, tagList) and collection names are filtered from display

6. **Draft Posts**:
   - Set `draft: true` in post frontmatter
   - Drafts are visible during `--serve`/`--watch` mode
   - Drafts are excluded from production builds (permalink returns false, excluded from collections)
   - Use `BUILD_DRAFTS=true` env var to include drafts in production builds

7. **Collection Pages**:
   - Use `layouts/collection.njk` layout
   - Set `collectionName` in frontmatter to match the tag name (with diacritics)
   - Example: `collectionName: Chuyện chị em` for posts tagged "Chuyện chị em"
   - Collection pages have custom permalinks: `/tags/chuyen-chi-em/`

8. **Pagination**:
   - Homepage shows 10 posts per page
   - URL pattern: `/`, `/page/2/`, `/page/3/`
   - Uses `pagination` in front matter

9. **Feeds**:
   - Atom: `/feed/feed.xml`
   - JSON: `/feed/feed.json`
   - Both include full post content

10. **Reading Progress Indicator**: Posts and pages display a circular progress indicator on the scroll-to-top button showing scroll position.

11. **Theme Assets**: Ghost Liebling theme assets are in `public/theme/`. Original theme source is preserved in `_ghost/theme/` for reference.

12. **Passthrough Copy**: `public/` directory contents are copied directly to `_site/` root. This includes `theme/` directory with CSS, JS, fonts, and images.

## Plugin Documentation

- **RSS**: https://www.11ty.dev/docs/plugins/rss/
- **Syntax Highlight**: https://www.11ty.dev/docs/plugins/syntaxhighlight/
- **Navigation**: https://www.11ty.dev/docs/plugins/navigation/
- **Bundle**: https://github.com/11ty/eleventy-plugin-bundle
- **Image**: https://www.11ty.dev/docs/plugins/image/
- **HTML Base**: https://www.11ty.dev/docs/plugins/html-base/
