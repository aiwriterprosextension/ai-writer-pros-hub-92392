import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/landing/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Clock, ArrowRight, Mail, Search } from "lucide-react";
import { blogCategories } from "@/data/blog-categories";
import { blogPosts, getFeaturedPosts } from "@/data/blog-posts";
import { BlogFeaturedImage } from "@/components/blog/BlogFeaturedImage";

const POSTS_PER_PAGE = 12;

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    let posts = blogPosts;
    if (activeCategory !== "all") {
      posts = posts.filter((p) => p.categorySlug === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const featured = getFeaturedPosts().slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="AI Writing Blog - Tools, Tips & Industry Insights | AI Writer Pros"
        description="Discover expert guides on AI writing tools, content strategies, and techniques. Stay updated on the latest AI content creation trends and best practices."
        canonical="https://aiwriterpros.com/blog/"
        keywords="AI writing blog, AI content creation, AI writing tools, AI writing tips"
        schema={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "AI Writer Pros Blog",
          "description": "Expert guides on AI writing tools, content strategies, and techniques.",
          "url": "https://aiwriterpros.com/blog/",
          "publisher": {
            "@type": "Organization",
            "name": "AI Writer Pros",
            "logo": { "@type": "ImageObject", "url": "https://aiwriterpros.com/og-image.png" },
          },
        }}
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary/5 via-background to-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 text-xs tracking-wider uppercase">
            AI Writer Pros Blog
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Master AI Writing: Tools, Tips &{" "}
            <span className="text-primary">Industry Insights</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Everything you need to leverage AI for content creation, from beginner guides to expert strategies.
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {blogCategories.map((cat) => {
            const Icon = cat.icon;
            const count = blogPosts.filter((p) => p.categorySlug === cat.slug).length;
            return (
              <Link
                key={cat.id}
                to={`/blog/${cat.slug}`}
                className="group"
              >
                <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all">
                  <CardContent className="p-5 text-center">
                    <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{cat.shortDescription}</p>
                    <span className="text-xs text-primary font-medium">
                      {count} articles · Explore →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Posts */}
      {!searchQuery && activeCategory === "all" && featured.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featured.map((post) => (
                <Link key={post.id} to={`/blog/${post.categorySlug}/${post.slug}`}>
                    <Card className="h-full overflow-hidden group hover:shadow-lg transition-shadow">
                      <BlogFeaturedImage
                        categorySlug={post.categorySlug}
                        title={post.title}
                        isPillar={post.isPillar}
                        alt={post.featuredImageAlt}
                        size="md"
                      />
                    <CardContent className="p-5">
                      <Badge variant="outline" className="mb-2 text-[10px] uppercase tracking-wider">
                        {blogCategories.find((c) => c.slug === post.categorySlug)?.name}
                      </Badge>
                      <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>{post.publishedAt}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />{post.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filter Bar */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => { setActiveCategory("all"); setCurrentPage(1); }}
          >
            All
          </Button>
          {blogCategories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.slug ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => { setActiveCategory(cat.slug); setCurrentPage(1); }}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </section>

      {/* Article Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-lg font-semibold mb-6">
            {activeCategory === "all" ? "All Articles" : blogCategories.find((c) => c.slug === activeCategory)?.name}
            <span className="text-muted-foreground font-normal ml-2">({filteredPosts.length})</span>
          </h2>
          {paginatedPosts.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">No articles found. Try a different search or category.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.categorySlug}/${post.slug}`}>
                    <Card className="h-full overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer">
                      <BlogFeaturedImage
                        categorySlug={post.categorySlug}
                        title={post.title}
                        isPillar={post.isPillar}
                        alt={post.featuredImageAlt}
                        size="sm"
                      />
                    <CardContent className="p-5">
                      <Badge variant="outline" className="mb-2 text-[10px] uppercase tracking-wider">
                        {blogCategories.find((c) => c.slug === post.categorySlug)?.name}
                      </Badge>
                      <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>{post.publishedAt}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />{post.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-2xl mx-auto text-center bg-secondary/5 border border-border rounded-2xl p-8 sm:p-12">
          <Mail className="h-10 w-10 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight mb-2">Get Weekly AI Writing Tips</h2>
          <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
            Join 10,000+ content creators getting weekly strategies, tool updates, and exclusive tips. No spam, unsubscribe anytime.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="you@example.com" className="flex-1" />
            <Button type="submit" className="shrink-0">Subscribe</Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
