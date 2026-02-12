
import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Clock, ArrowRight, Mail, Search } from "lucide-react";

const categories = ["All", "SEO & Content", "E-commerce", "Social Media", "Agency Growth", "Product Updates"];

const featuredPost = {
  title: "How We Generated 10,000 Blog Posts in 30 Days (And What We Learned)",
  excerpt: "A deep dive into our experiment using AI Writer Pros to scale content production for an e-commerce brand — including the mistakes, the wins, and the exact workflow we used.",
  category: "SEO & Content",
  readTime: "5 min read",
  date: "Feb 10, 2026",
};

const articles = [
  {
    title: "The Ultimate Guide to Humanizing AI Content in 2026",
    excerpt: "Stop getting flagged by AI detectors. Here's the proven framework for making AI-generated content sound authentically human.",
    category: "SEO & Content",
    readTime: "7 min read",
    date: "Feb 8, 2026",
  },
  {
    title: "Amazon Affiliate Reviews That Actually Convert",
    excerpt: "Most affiliate reviews read like spec sheets. Learn how to write reviews that build trust and drive clicks.",
    category: "E-commerce",
    readTime: "6 min read",
    date: "Feb 5, 2026",
  },
  {
    title: "How to Repurpose One Blog Post Into 15 Social Posts",
    excerpt: "Your content should work harder than you do. Here's our exact content multiplication workflow.",
    category: "Social Media",
    readTime: "4 min read",
    date: "Feb 3, 2026",
  },
  {
    title: "Scaling a Content Agency with AI: A Case Study",
    excerpt: "How a 3-person agency increased output by 400% without hiring, using AI Writer Pros as their content engine.",
    category: "Agency Growth",
    readTime: "8 min read",
    date: "Jan 30, 2026",
  },
  {
    title: "New Feature: Content Calendar & Scheduling Suggestions",
    excerpt: "Plan your entire month of content in minutes. Our new Content Calendar feature is now live for Business plan users.",
    category: "Product Updates",
    readTime: "3 min read",
    date: "Jan 28, 2026",
  },
  {
    title: "Email Sequences That Nurture: A Beginner's Playbook",
    excerpt: "From welcome series to re-engagement campaigns — the email sequences every creator needs, generated in seconds.",
    category: "E-commerce",
    readTime: "5 min read",
    date: "Jan 25, 2026",
  },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArticles = activeCategory === "All"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 text-xs tracking-wider uppercase">
            AI Writer Pros Blog
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            The AI Writer's <span className="text-primary">Playbook</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Strategies to scale your content and income.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      {/* Featured Post */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="aspect-video md:aspect-auto bg-muted flex items-center justify-center text-muted-foreground text-sm">
                <div className="text-center p-8">
                  <Search className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  <span className="opacity-50">Featured Image</span>
                </div>
              </div>
              <CardContent className="flex flex-col justify-center p-6 sm:p-8">
                <Badge variant="secondary" className="w-fit mb-3 text-xs">{featuredPost.category}</Badge>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-3 leading-snug">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {featuredPost.readTime}
                  </span>
                  <Button variant="link" className="p-0 h-auto text-primary font-semibold text-sm gap-1">
                    Read Article <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Article Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-lg font-semibold mb-6">Recent Articles</h3>
          {filteredArticles.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">No articles in this category yet. Check back soon!</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, i) => (
                <Card key={i} className="overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground text-xs">
                    <span className="opacity-40">Thumbnail</span>
                  </div>
                  <CardContent className="p-5">
                    <Badge variant="outline" className="mb-2 text-[10px] uppercase tracking-wider">{article.category}</Badge>
                    <h4 className="font-semibold text-sm leading-snug mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>{article.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-2xl mx-auto text-center bg-secondary/5 border border-border rounded-2xl p-8 sm:p-12">
          <Mail className="h-10 w-10 mx-auto mb-4 text-primary" />
          <h3 className="text-2xl font-bold tracking-tight mb-2">Join the Insider List</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
            Get weekly AI writing strategies, tool updates, and exclusive tips delivered to your inbox. No spam, unsubscribe anytime.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="email"
              placeholder="you@example.com"
              className="flex-1"
            />
            <Button type="submit" className="shrink-0">Subscribe</Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
