import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import authorPhoto from "@/assets/john-lawrence.jpg";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/landing/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, ChevronRight, Share2, Linkedin, Twitter, Facebook, ChevronUp } from "lucide-react";
import { blogCategories, getCategoryBySlug } from "@/data/blog-categories";
import { getPostBySlug, getRelatedPosts, type BlogPost } from "@/data/blog-posts";
import { BlogFeaturedImage } from "@/components/blog/BlogFeaturedImage";
import NotFound from "./NotFound";

function TableOfContents({ content }: { content: string }) {
  const headings = useMemo(() => {
    const matches = content.match(/^## .+$/gm);
    if (!matches) return [];
    return matches.map((h) => {
      const text = h.replace(/^## /, "").replace(/\*\*/g, "");
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return { text, id };
    });
  }, [content]);

  if (headings.length < 3) return null;

  return (
    <nav className="bg-muted/50 border rounded-lg p-4 mb-8">
      <h2 className="font-semibold text-sm mb-3">Table of Contents</h2>
      <ul className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="text-xs text-muted-foreground hover:text-primary transition-colors block py-0.5">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function MarkdownRenderer({ content }: { content: string }) {
  const html = useMemo(() => {
    let result = content
      // Tables
      .replace(/\n\|(.+)\|\n\|[-| :]+\|\n([\s\S]*?)(?=\n\n|\n##|\n$|$)/g, (_match, header, body) => {
        const headers = header.split("|").map((h: string) => h.trim()).filter(Boolean);
        const rows = body.trim().split("\n").map((row: string) =>
          row.split("|").map((c: string) => c.trim()).filter(Boolean)
        );
        return `<div class="overflow-x-auto my-6"><table class="w-full text-sm border-collapse"><thead><tr>${headers.map((h: string) => `<th class="border border-border px-3 py-2 bg-muted text-left font-medium">${h}</th>`).join("")}</tr></thead><tbody>${rows.map((r: string[]) => `<tr>${r.map((c: string) => `<td class="border border-border px-3 py-2">${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
      })
      // H2
      .replace(/^## (.+)$/gm, (_m: string, t: string) => {
        const clean = t.replace(/\*\*/g, "");
        const id = clean.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        return `<h2 id="${id}" class="text-2xl font-bold mt-10 mb-4 scroll-mt-24">${clean}</h2>`;
      })
      // H3
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>')
      // Bold
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m: string, text: string, url: string) => {
        const isExternal = url.startsWith("http");
        return `<a href="${url}" class="text-primary underline underline-offset-2 hover:text-primary/80"${isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`;
      })
      // Unordered lists
      .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-muted-foreground">$1</li>')
      // Ordered lists
      .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal text-muted-foreground">$1</li>')
      // Checkboxes
      .replace(/^- \[[ x]\] (.+)$/gm, '<li class="ml-4 list-none text-muted-foreground">☐ $1</li>')
      // Paragraphs
      .replace(/^(?!<[hultd]|<div|<strong)(.+)$/gm, '<p class="text-base leading-relaxed text-muted-foreground mb-4">$1</p>')
      // Clean empty paragraphs
      .replace(/<p class="[^"]*"><\/p>/g, "");

    return result;
  }, [content]);

  return <div className="prose-custom" dangerouslySetInnerHTML={{ __html: html }} />;
}

function AuthorBio({ post }: { post: BlogPost }) {
  return (
    <div className="border rounded-lg p-6 bg-muted/30 mt-12">
      <div className="flex items-start gap-4">
        <img
          src={authorPhoto}
          alt={`${post.author.name} - AI Writer Pros founder and content marketing strategist`}
          className="w-14 h-14 rounded-full object-cover shrink-0"
        />
        <div>
          <h3 className="font-semibold">{post.author.name}</h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{post.author.bio}</p>
        </div>
      </div>
    </div>
  );
}

export default function BlogPostPage() {
  const { categorySlug, postSlug } = useParams<{ categorySlug: string; postSlug: string }>();
  const [showBackToTop, setShowBackToTop] = useState(false);

  const post = categorySlug && postSlug ? getPostBySlug(categorySlug, postSlug) : undefined;
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  const related = post ? getRelatedPosts(post) : [];

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!post || !category) return <NotFound />;

  const shareUrl = `https://aiwriterpros.com/blog/${categorySlug}/${postSlug}/`;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={post.metaTitle}
        description={post.metaDescription}
        canonical={shareUrl}
        keywords={post.keywords}
        ogTitle={post.title}
        ogDescription={post.metaDescription}
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "description": post.metaDescription,
          "author": { "@type": "Person", "name": post.author.name },
          "publisher": {
            "@type": "Organization",
            "name": "AI Writer Pros",
            "logo": { "@type": "ImageObject", "url": "https://aiwriterpros.com/og-image.png" },
          },
          "datePublished": post.publishedAt,
          "dateModified": post.updatedAt,
          "mainEntityOfPage": { "@type": "WebPage", "@id": shareUrl },
        }}
      />
      <Navigation />

      {/* Breadcrumb */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to={`/blog/${category.slug}`} className="hover:text-foreground transition-colors">{category.name}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium line-clamp-1">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <article className="px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        <div className="max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4 text-xs uppercase tracking-wider">
            {category.name}
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
            <span className="font-medium text-foreground">{post.author.name}</span>
            <span>Published {post.publishedAt}</span>
            {post.updatedAt !== post.publishedAt && <span>Updated {post.updatedAt}</span>}
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
            <span>{post.wordCount.toLocaleString()} words</span>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <BlogFeaturedImage
              categorySlug={post.categorySlug}
              title={post.title}
              isPillar={post.isPillar}
              alt={post.featuredImageAlt}
              size="lg"
            />
          </div>

          {/* Share */}
          <div className="flex items-center gap-2 mb-8 pb-8 border-b">
            <span className="text-xs text-muted-foreground mr-1"><Share2 className="h-3.5 w-3.5 inline mr-1" />Share:</span>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-muted transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-muted transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-muted transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
          </div>

          {/* Table of Contents */}
          <TableOfContents content={post.content} />

          {/* Article Body */}
          <div className="max-w-none">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* Inline CTA */}
          <div className="my-12 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-center">
            <h3 className="font-bold text-lg mb-2">Ready to Create Better Content with AI?</h3>
            <p className="text-sm text-muted-foreground mb-4">Join 10,000+ content creators using AI Writer Pros</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link to="/auth">Start Free Trial</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/features">See Features</Link>
              </Button>
            </div>
          </div>

          {/* Author Bio */}
          <AuthorBio post={post} />

          {/* Related Posts */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6">You Might Also Like</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((rp) => (
                  <Link key={rp.id} to={`/blog/${rp.categorySlug}/${rp.slug}`}>
                    <Card className="h-full hover:shadow-md transition-shadow group">
                      <CardContent className="p-4">
                        <Badge variant="outline" className="mb-2 text-[10px] uppercase tracking-wider">
                          {blogCategories.find((c) => c.slug === rp.categorySlug)?.name}
                        </Badge>
                        <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {rp.title}
                        </h3>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />{rp.readTime}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Bottom CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto bg-secondary text-secondary-foreground rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Create Better Content with AI?</h2>
          <p className="text-secondary-foreground/80 mb-6">Join 10,000+ content creators using AI Writer Pros</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <Link to="/auth">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10" asChild>
              <Link to="/features">See Features</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors z-40"
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}

      <Footer />
    </div>
  );
}
