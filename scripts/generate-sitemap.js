import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import blog posts data
const blogPostsPath = path.join(__dirname, '../src/data/blog-posts.ts');
const blogPostsContent = fs.readFileSync(blogPostsPath, 'utf-8');

// Extract blog posts array from the TypeScript file
// This is a simple parser - in production you might want to use a proper TS parser
const extractBlogPosts = (content) => {
  const posts = [];
  const postMatches = content.matchAll(/\{[\s\S]*?id:\s*"([^"]+)"[\s\S]*?slug:\s*"([^"]+)"[\s\S]*?categorySlug:\s*"([^"]+)"[\s\S]*?publishedAt:\s*"([^"]+)"[\s\S]*?updatedAt:\s*"([^"]+)"[\s\S]*?\}/g);
  
  for (const match of postMatches) {
    posts.push({
      id: match[1],
      slug: match[2],
      categorySlug: match[3],
      publishedAt: match[4],
      updatedAt: match[5]
    });
  }
  
  return posts;
};

const blogPosts = extractBlogPosts(blogPostsContent);

// Static URLs with their priorities and change frequencies
const staticUrls = [
  { loc: 'https://aiwriterpros.com/', changefreq: 'weekly', priority: '1.0' },
  { loc: 'https://aiwriterpros.com/features', changefreq: 'monthly', priority: '0.9' },
  { loc: 'https://aiwriterpros.com/pricing', changefreq: 'monthly', priority: '0.9' },
  { loc: 'https://aiwriterpros.com/ai-writer-pros-review', changefreq: 'monthly', priority: '0.9' },
  { loc: 'https://aiwriterpros.com/blog', changefreq: 'weekly', priority: '0.8' },
  { loc: 'https://aiwriterpros.com/amazon-affiliate-extension', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://aiwriterpros.com/ai-humanizer', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://aiwriterpros.com/content-repurposing', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://aiwriterpros.com/email-generator', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://aiwriterpros.com/social-media-suite', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://aiwriterpros.com/blog-content-creator', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://aiwriterpros.com/knowledge-base', changefreq: 'weekly', priority: '0.8' },
  { loc: 'https://aiwriterpros.com/best-practices', changefreq: 'monthly', priority: '0.7' },
  { loc: 'https://aiwriterpros.com/about', changefreq: 'monthly', priority: '0.7' },
  { loc: 'https://aiwriterpros.com/contact', changefreq: 'monthly', priority: '0.7' },
  { loc: 'https://aiwriterpros.com/auth', changefreq: 'monthly', priority: '0.5' },
  { loc: 'https://aiwriterpros.com/privacy-policy', changefreq: 'monthly', priority: '0.4' },
  { loc: 'https://aiwriterpros.com/terms-of-service', changefreq: 'monthly', priority: '0.4' },
  { loc: 'https://aiwriterpros.com/knowledge-base/creating-account', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/navigating-dashboard', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/first-ai-generation', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/ai-credits-usage', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/pattern-analyzer', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/humanization-intensity', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/industry-customization', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/bulk-humanization', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/before-after-scores', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/content-analyzer', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/platform-customization', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/multi-length-versions', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/hashtag-scheduling', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/batch-export', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/email-sequences', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/ab-testing-emails', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/audience-targeting-emails', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/twitter-threads', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/content-calendar', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/hashtag-research', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/topic-keywords', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/outline-builder', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/seo-readability', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/product-extraction', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/seo-reviews', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/ftc-disclosure', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/managing-subscription', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/profile-settings', changefreq: 'monthly', priority: '0.6' },
  { loc: 'https://aiwriterpros.com/knowledge-base/team-management', changefreq: 'monthly', priority: '0.6' },
];

// Generate blog category URLs
const blogCategories = [
  'ai-writing-fundamentals',
  'ai-tools-software-reviews',
  'content-strategy-use-cases',
  'writing-tips-techniques',
  'industry-news-trends'
];

const categoryUrls = blogCategories.map(category => ({
  loc: `https://aiwriterpros.com/blog/${category}`,
  changefreq: 'weekly',
  priority: '0.7',
  lastmod: new Date().toISOString().split('T')[0]
}));

// Generate blog post URLs
const blogPostUrls = blogPosts.map(post => ({
  loc: `https://aiwriterpros.com/blog/${post.categorySlug}/${post.slug}`,
  changefreq: 'monthly',
  priority: '0.7',
  lastmod: post.updatedAt
}));

// Combine all URLs
const allUrls = [...staticUrls, ...categoryUrls, ...blogPostUrls];

// Generate XML
const generateSitemapXML = (urls) => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    if (url.lastmod) {
      xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    }
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>\n';
  return xml;
};

// Write sitemap to public directory
const sitemapXML = generateSitemapXML(allUrls);
const outputPath = path.join(__dirname, '../public/sitemap.xml');

fs.writeFileSync(outputPath, sitemapXML, 'utf-8');

console.log(`✅ Sitemap generated successfully!`);
console.log(`📊 Total URLs: ${allUrls.length}`);
console.log(`   - Static pages: ${staticUrls.length}`);
console.log(`   - Blog categories: ${categoryUrls.length}`);
console.log(`   - Blog posts: ${blogPostUrls.length}`);
console.log(`📁 Output: ${outputPath}`);
