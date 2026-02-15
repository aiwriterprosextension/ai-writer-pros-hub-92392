

# Plan: Featured Images, Internal Linking, and Author Update

## 1. Author Change: Alex Morgan to John Lawrence

**File:** `src/data/blog-posts.ts`
- Update the `author` constant: name to "John Lawrence", bio updated accordingly
- Copy the uploaded photo to `src/assets/john-lawrence.jpg`
- Update `avatar` to use the imported image path

**File:** `src/pages/BlogPost.tsx` (AuthorBio component)
- Replace the initials-based avatar circle with an actual `<img>` tag using `post.author.avatar`

## 2. Generate Featured Images for All 15 Posts

**File:** `src/data/blog-posts.ts`
- Add `featuredImage` and `featuredImageAlt` fields to the `BlogPost` interface
- Each post gets an AI-generated featured image (1200x630px style) using the Lovable AI image generation endpoint via an edge function, or use branded gradient placeholder cards with post-specific icons/titles rendered as styled div components

**Practical approach (no external image hosting needed):**
- Add `featuredImage` field as a gradient-based visual identifier (CSS-rendered) with SEO-optimized `featuredImageAlt` text for each post
- Create a `BlogFeaturedImage` component that renders a branded, visually distinct card for each post using the category icon, post title snippet, and brand gradient colors
- Each post gets a unique, descriptive `featuredImageAlt` string, e.g., "Complete guide to AI writing tools showing workflow diagram for content creation in 2025"

**Files to update:**
- `src/data/blog-posts.ts` -- add `featuredImageAlt` to interface and all 15 posts
- `src/pages/BlogPost.tsx` -- render featured image above article body
- `src/pages/Blog.tsx` -- show featured image on post cards
- `src/pages/BlogCategory.tsx` -- show featured image on category post cards

## 3. Internal Linking Strategy

### A. Blog-to-blog linking (pillar <-> supporting)
**File:** `src/data/blog-posts.ts`
- Ensure every supporting post links back to its pillar post in the content markdown
- Ensure every pillar post links to both its supporting posts
- Add cross-category links where topically relevant (e.g., "AI Writing Fundamentals" pillar links to "Content Strategy" pillar)

### B. Blog-to-product page linking
Add contextual links within blog post content to product/tool pages:
- AI Humanizer mentions link to `/ai-humanizer`
- Amazon Affiliate mentions link to `/amazon-affiliate-extension`
- Blog Creator mentions link to `/blog-content-creator`
- Email Generator mentions link to `/email-generator`
- Social Media mentions link to `/social-media-suite`
- Content Repurposing mentions link to `/content-repurposing`
- CTA links to `/auth` (signup) and `/pricing`

### C. Product pages linking to blog
**Files to update:**
- `src/pages/AIHumanizer.tsx` -- add "Learn more" section linking to relevant blog posts
- `src/pages/BlogContentCreator.tsx` -- link to blog writing tips and strategy posts
- `src/pages/EmailGenerator.tsx` -- link to email strategy blog posts
- `src/pages/SocialMediaSuite.tsx` -- link to social media blog posts
- `src/pages/ContentRepurposing.tsx` -- link to content strategy blog posts
- `src/pages/AmazonAffiliateExtension.tsx` -- link to AI tools reviews

Each product page gets a small "From Our Blog" section near the bottom with 2-3 relevant article cards.

### D. Footer update
- `src/components/footer.tsx` -- ensure "Blog" link text is just "Blog" (not "Blog & Updates")

### E. External links in blog posts
- Already present in the data. Verify they render correctly in the MarkdownRenderer (they do -- links starting with `http` get `target="_blank"`).

## 4. Summary of All Files Changed

| File | Changes |
|------|---------|
| `src/assets/john-lawrence.jpg` | NEW -- copy uploaded photo |
| `src/data/blog-posts.ts` | Author rename, add `featuredImageAlt` to interface + all 15 posts, add internal links in content markdown |
| `src/pages/BlogPost.tsx` | Show author photo, render featured image component |
| `src/pages/Blog.tsx` | Show featured image on cards |
| `src/pages/BlogCategory.tsx` | Show featured image on cards |
| `src/components/footer.tsx` | Fix "Blog & Updates" to "Blog" |
| `src/pages/AIHumanizer.tsx` | Add "From Our Blog" section |
| `src/pages/BlogContentCreator.tsx` | Add "From Our Blog" section |
| `src/pages/EmailGenerator.tsx` | Add "From Our Blog" section |
| `src/pages/SocialMediaSuite.tsx` | Add "From Our Blog" section |
| `src/pages/ContentRepurposing.tsx` | Add "From Our Blog" section |
| `src/pages/AmazonAffiliateExtension.tsx` | Add "From Our Blog" section |

## Technical Notes

- The `BlogFeaturedImage` component will use CSS gradients + category icons to create unique visuals per post without needing actual image files, keeping the build fast and avoiding storage complexity
- SEO alt text will be descriptive, keyword-rich, and unique per post (not just the title)
- Internal links added directly in the markdown `content` field will render automatically via the existing `MarkdownRenderer` which already handles `[text](url)` syntax
- The author photo will be imported as an ES6 module from `src/assets/` for proper bundling

