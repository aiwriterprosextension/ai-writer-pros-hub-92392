import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/landing/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Clock, ArrowRight, Mail, ChevronRight } from "lucide-react";
import { blogCategories, getCategoryBySlug } from "@/data/blog-categories";
import { getPostsByCategory } from "@/data/blog-posts";
import NotFound from "./NotFound";

export default function BlogCategory() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;

  if (!category) return <NotFound />;

  const posts = getPostsByCategory(category.slug);
  const pillarPost = posts.find((p) => p.isPillar);
  const supportingPosts = posts.filter((p) => !p.isPillar);
  const Icon = category.icon;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={category.metaTitle}
        description={category.metaDescription}
        canonical={`https://aiwriterpros.com/blog/${category.slug}/`}
        keywords={category.keywords}
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": category.name,
          "description": category.metaDescription,
          "url": `https://aiwriterpros.com/blog/${category.slug}/`,
        }}
      />
      <Navigation />

      {/* Breadcrumb */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{category.name}</h1>
              <p className="text-muted-foreground">{posts.length} articles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Description */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="prose prose-sm max-w-none text-muted-foreground">
            {category.description.split("\n\n").slice(0, 2).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Pillar Post */}
      {pillarPost && (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">📌 Pillar Article</h2>
            <Link to={`/blog/${pillarPost.categorySlug}/${pillarPost.slug}`}>
              <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-transparent hover:shadow-lg transition-shadow">
                <CardContent className="p-6 sm:p-8">
                  <Badge variant="secondary" className="mb-3 text-xs">Comprehensive Guide</Badge>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3 leading-snug hover:text-primary transition-colors">
                    {pillarPost.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{pillarPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {pillarPost.readTime} · {pillarPost.wordCount.toLocaleString()} words
                    </span>
                    <span className="text-sm text-primary font-semibold flex items-center gap-1">
                      Read Article <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      )}

      {/* Supporting Posts */}
      {supportingPosts.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-lg font-semibold mb-6">All Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportingPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.categorySlug}/${post.slug}`}>
                  <Card className="h-full overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <span className="text-2xl opacity-40">📄</span>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>{post.publishedAt}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Categories */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Explore Other Categories</h2>
          <div className="flex flex-wrap gap-2">
            {blogCategories.filter((c) => c.slug !== category.slug).map((cat) => (
              <Link key={cat.id} to={`/blog/${cat.slug}`}>
                <Button variant="outline" size="sm" className="rounded-full">{cat.name}</Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-2xl mx-auto text-center bg-secondary/5 border border-border rounded-2xl p-8">
          <Mail className="h-8 w-8 mx-auto mb-3 text-primary" />
          <h2 className="text-xl font-bold mb-2">Get Weekly AI Writing Tips</h2>
          <p className="text-muted-foreground text-sm mb-4">Expert strategies delivered to your inbox.</p>
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
