# Sitemap Generator

This script automatically generates a sitemap.xml file that includes all blog posts from the data files.

## Features

- Dynamically extracts blog posts from `src/data/blog-posts.ts`
- Includes all static pages and knowledge base articles
- Adds blog category pages
- Includes `lastmod` dates for blog posts based on their `updatedAt` field
- Automatically runs before each build

## Usage

### Generate sitemap manually
```bash
npm run sitemap
```

### Generate sitemap as part of build
```bash
npm run build
```

The sitemap will be automatically generated before the build process.

## Output

The generated sitemap includes:
- Static pages (homepage, features, pricing, etc.)
- Blog category pages
- Individual blog posts with lastmod dates
- Knowledge base articles

Total URLs are logged to the console after generation.

## Maintenance

When adding new static pages or knowledge base articles, update the `staticUrls` array in `generate-sitemap.js`.

Blog posts are automatically included from `src/data/blog-posts.ts` - no manual updates needed!
