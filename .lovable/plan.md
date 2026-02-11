
# Landing Page SEO Enhancement Plan

## Overview
Rebuild the Index.tsx landing page with new sections and SEO improvements to increase organic search visibility, dwell time, and conversions. The page will go from ~5 sections to ~12 sections, use proper structured data (JSON-LD), semantic HTML, and reuse existing reusable components.

---

## New Sections to Add (in order)

### 1. SEO Head with Structured Data
- Add the existing `SEOHead` component to set page title, meta description, keywords, canonical URL, and Organization + SoftwareApplication JSON-LD schema markup
- Target keywords: "AI writing tools", "AI content creation platform", "AI humanizer", "Amazon affiliate review generator"

### 2. Problem/Solution Section (NEW)
- "Still Writing Content the Hard Way?" heading
- Two-column layout: Left shows 4-5 pain points (time-consuming, inconsistent quality, AI detection, etc.), Right shows how AI Writer Pros solves each
- Uses semantic `<h2>` and descriptive paragraph text for keyword density

### 3. "How It Works" Section (NEW on homepage)
- Reuse the existing `HowItWorks` component with 3 steps: Sign Up -> Choose a Tool -> Generate & Publish
- CTA links to /auth

### 4. Comparison Table (NEW)
- Reuse existing `ComparisonTable` component
- Compare "AI Writer Pros" vs "ChatGPT" vs "Jasper" across 8-10 features:
  - Amazon Affiliate Reviews, AI Humanizer, Content Repurposing, SEO Optimization, Multi-platform output, Built-in templates, Bulk generation, Free trial, etc.
- Great for "AI Writer Pros vs ChatGPT" long-tail search queries

### 5. Use Cases / Who It's For Section (NEW)
- Grid of 4-5 audience segments: Affiliate Marketers, Bloggers, Social Media Managers, Email Marketers, Agencies
- Each with icon, title, 2-sentence description, and relevant tool links
- Targets long-tail queries like "AI writing tools for affiliate marketers"

### 6. FAQ Section (NEW)
- Reuse existing `FAQSection` component with FAQ JSON-LD schema (already built in)
- 8-10 SEO-targeted questions:
  - "What is AI Writer Pros?"
  - "How does the AI Humanizer work?"
  - "Is AI-generated content good for SEO?"
  - "How much does AI Writer Pros cost?"
  - "Can AI Writer Pros generate Amazon product reviews?"
  - "Does AI Writer Pros bypass AI detection?"
  - "What content formats does the Content Repurposing tool support?"
  - "Is there a free trial?"
- Each answer includes natural keyword usage

### 7. Trust Bar / Social Proof Badges (NEW)
- Horizontal strip with trust signals: "50,000+ Users", "4.8/5 Rating", "SOC 2 Compliant", "99.9% Uptime"
- Lightweight, adds credibility above the fold area or after hero

### 8. Final CTA Section (Enhanced)
- Update existing CTA with stronger copy and link buttons to /auth
- Add structured breadcrumb-style trust indicators

---

## SEO Technical Improvements

### On-Page SEO
- Add `SEOHead` component with optimized title: "AI Writer Pros - Professional AI Writing Tools for Content Creators"
- Meta description targeting primary keywords
- Organization JSON-LD schema
- Proper heading hierarchy: single `<h1>`, multiple `<h2>` for sections, `<h3>` for sub-items

### Content Improvements
- Increase page word count from ~400 to 2,000+ words (matching tool landing page architecture)
- Add keyword-rich descriptive paragraphs in each new section
- Internal linking to all 6 tool pages from multiple sections

### Existing Section Updates
- Hero: Update CTA buttons to link to /auth
- Tool Showcase: Keep as-is (already links to tool pages)
- Testimonials: Keep existing 3
- Features: Keep existing 6-feature grid
- Footer copyright year: Update from 2024 to 2025

---

## Technical Details

### Files to Create
- None -- all reusable components already exist

### Files to Modify
1. **`src/pages/Index.tsx`** -- Major rewrite to add all new sections, import reusable components (`SEOHead`, `ComparisonTable`, `FAQSection`, `HowItWorks`), update CTA links to /auth, add proper heading hierarchy
2. **`src/components/footer.tsx`** -- Update copyright year
3. **`index.html`** -- Ensure meta tags align with SEOHead defaults
4. **`public/robots.txt`** -- Add sitemap reference (Sitemap: https://aiwriterpros.com/sitemap.xml)

### Component Reuse
- `SEOHead` for meta tags + JSON-LD
- `FAQSection` for FAQ with automatic schema markup
- `ComparisonTable` for competitor comparison
- `HowItWorks` for 3-step process
- All existing UI components (Card, Badge, Button, etc.)

### No database changes needed
