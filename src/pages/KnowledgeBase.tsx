
import { useState, useMemo } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Search,
  BookOpen,
  Zap,
  Shield,
  FileText,
  Mail,
  MessageSquare,
  PenTool,
  ShoppingCart,
  CreditCard,
  ArrowRight,
  HelpCircle,
  LifeBuoy,
  MessageCircle,
  Clock,
} from "lucide-react";

interface Article {
  title: string;
  description: string;
  category: string;
  tags: string[];
  link?: string;
}

const categories = [
  { id: "getting-started", label: "Getting Started", icon: Zap, color: "bg-primary/10 text-primary" },
  { id: "ai-humanizer", label: "AI Humanizer", icon: Shield, color: "bg-primary/10 text-primary" },
  { id: "content-repurposing", label: "Content Repurposing", icon: FileText, color: "bg-primary/10 text-primary" },
  { id: "email-generator", label: "Email Generator", icon: Mail, color: "bg-primary/10 text-primary" },
  { id: "social-media", label: "Social Media Suite", icon: MessageSquare, color: "bg-primary/10 text-primary" },
  { id: "blog-creator", label: "Blog Content Creator", icon: PenTool, color: "bg-primary/10 text-primary" },
  { id: "amazon-assistant", label: "Amazon Affiliate Assistant", icon: ShoppingCart, color: "bg-primary/10 text-primary" },
  { id: "account", label: "Account & Billing", icon: CreditCard, color: "bg-primary/10 text-primary" },
];

const articles: Article[] = [
  // Getting Started
  { title: "Creating Your AI Writer Pros Account", description: "Step-by-step guide to signing up and setting up your workspace.", category: "getting-started", tags: ["signup", "account", "onboarding"], link: "/knowledge-base/creating-account" },
  { title: "Navigating the Dashboard", description: "Learn how to use the main dashboard, access tools, and manage your content.", category: "getting-started", tags: ["dashboard", "navigation", "overview"], link: "/knowledge-base/navigating-dashboard" },
  { title: "Your First AI Generation", description: "A quick walkthrough of generating your first piece of content with any tool.", category: "getting-started", tags: ["tutorial", "beginner", "generation"], link: "/knowledge-base/first-ai-generation" },
  { title: "Understanding AI Credits & Usage", description: "How AI generation credits work, tracking usage, and optimizing your quota.", category: "getting-started", tags: ["credits", "usage", "billing"], link: "/knowledge-base/ai-credits-usage" },

  // AI Humanizer
  { title: "How the AI Pattern Analyzer Works", description: "Understand how our AI detects and flags AI-generated patterns in your content.", category: "ai-humanizer", tags: ["analyzer", "detection", "patterns"] },
  { title: "Choosing the Right Humanization Intensity", description: "Light vs Medium vs Aggressive — when to use each intensity level.", category: "ai-humanizer", tags: ["intensity", "settings", "quality"] },
  { title: "Industry & Niche Customization", description: "Tailor humanized output for healthcare, finance, tech, and 12+ other industries.", category: "ai-humanizer", tags: ["industry", "customization", "tone"] },
  { title: "Bulk Humanization Mode", description: "Process multiple paragraphs separately while maintaining consistent tone.", category: "ai-humanizer", tags: ["bulk", "batch", "paragraphs"] },
  { title: "Understanding Before/After Scores", description: "What the AI detection scores mean and how to interpret improvement metrics.", category: "ai-humanizer", tags: ["scores", "metrics", "detection"] },

  // Content Repurposing
  { title: "Content Analyzer & Smart Format Matching", description: "How AI analyzes your content and recommends the best output formats.", category: "content-repurposing", tags: ["analyzer", "formats", "recommendations"] },
  { title: "Platform-Specific Customization Guide", description: "Customize output for Twitter threads, LinkedIn posts, Instagram captions, and more.", category: "content-repurposing", tags: ["platforms", "customization", "social"] },
  { title: "Using Multi-Length Versions", description: "Generate Short, Standard, and Long versions of each repurposed format.", category: "content-repurposing", tags: ["length", "versions", "variations"] },
  { title: "Hashtag & Scheduling Recommendations", description: "Leverage AI-generated hashtags, mentions, and optimal posting schedules.", category: "content-repurposing", tags: ["hashtags", "scheduling", "social media"] },
  { title: "Batch Export & Content Series", description: "Export all formats at once and create multi-part content series from long-form content.", category: "content-repurposing", tags: ["export", "series", "batch"] },

  // Email Generator
  { title: "Building Email Sequences", description: "Create multi-step email campaigns with AI-generated subject lines and A/B variations.", category: "email-generator", tags: ["sequences", "campaigns", "subject lines"] },
  { title: "A/B Testing Email Variations", description: "Generate and compare multiple versions of your email to maximize open rates.", category: "email-generator", tags: ["ab-testing", "variations", "optimization"] },
  { title: "Audience Targeting for Emails", description: "Define your audience persona to generate more relevant, high-converting emails.", category: "email-generator", tags: ["audience", "targeting", "persona"] },

  // Social Media
  { title: "Creating Twitter/X Threads", description: "Turn ideas into engaging multi-tweet threads with hooks and engagement prompts.", category: "social-media", tags: ["twitter", "threads", "engagement"] },
  { title: "Content Calendar & Idea Generator", description: "Plan your social content strategy with AI-powered topic ideas and scheduling.", category: "social-media", tags: ["calendar", "ideas", "planning"] },
  { title: "Hashtag Research & Strategy", description: "Find trending and niche hashtags to maximize reach on each platform.", category: "social-media", tags: ["hashtags", "research", "reach"] },

  // Blog Creator
  { title: "Topic Research & Keyword Targeting", description: "Use AI to discover high-potential topics and target the right keywords for SEO.", category: "blog-creator", tags: ["topics", "keywords", "seo"] },
  { title: "Outline Builder & Section Writing", description: "Generate structured outlines and write section-by-section for better long-form content.", category: "blog-creator", tags: ["outline", "sections", "writing"] },
  { title: "SEO Analysis & Readability Scoring", description: "Optimize your blog posts with built-in SEO analysis and readability metrics.", category: "blog-creator", tags: ["seo", "readability", "analysis"] },

  // Amazon Assistant
  { title: "Product Data Extraction", description: "How AI extracts product details, features, and specifications for review generation.", category: "amazon-assistant", tags: ["products", "extraction", "data"] },
  { title: "Generating SEO-Optimized Reviews", description: "Create detailed product reviews with pros, cons, ratings, and comparison tables.", category: "amazon-assistant", tags: ["reviews", "seo", "comparison"] },
  { title: "FTC Disclosure & Compliance", description: "Automatically generate FTC-compliant affiliate disclosures for your content.", category: "amazon-assistant", tags: ["ftc", "disclosure", "compliance"] },

  // Account
  { title: "Managing Your Subscription", description: "Upgrade, downgrade, or cancel your plan. View billing history and invoices.", category: "account", tags: ["subscription", "billing", "plans"] },
  { title: "Profile Settings & Preferences", description: "Update your profile, change email, and configure default tool settings.", category: "account", tags: ["profile", "settings", "preferences"] },
  { title: "Team Management & Collaboration", description: "Invite team members, manage roles, and share content across your organization.", category: "account", tags: ["team", "collaboration", "roles"] },
];

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredArticles = useMemo(() => {
    let result = articles;

    if (activeCategory) {
      result = result.filter((a) => a.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.tags.some((t) => t.includes(q))
      );
    }

    return result;
  }, [searchQuery, activeCategory]);

  const activeCategoryData = categories.find((c) => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <BookOpen className="h-3 w-3 mr-1" />
            Help & Support Center
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-secondary">
            Knowledge Base & Support
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find guides, tutorials, and answers for every AI Writer Pros tool. Search or browse by category below.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search articles, tools, or topics..."
              className="pl-12 h-12 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold mb-6 text-secondary">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              const count = articles.filter((a) => a.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(isActive ? null : cat.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border text-center transition-all ${
                    isActive
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/40 hover:bg-muted/50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${cat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">{cat.label}</span>
                  <span className="text-xs text-muted-foreground">{count} articles</span>
                </button>
              );
            })}
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-secondary">
              {activeCategory
                ? `${activeCategoryData?.label} Articles`
                : searchQuery
                ? "Search Results"
                : "All Articles"}
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArticles.map((article, i) => {
                const cat = categories.find((c) => c.id === article.category);
                const CatIcon = cat?.icon || HelpCircle;
                const CardWrapper = article.link ? Link : "div";
                const wrapperProps = article.link ? { to: article.link } : {};
                return (
                  <CardWrapper key={i} {...(wrapperProps as any)} className="block">
                    <Card className="hover:shadow-md transition-shadow group cursor-pointer h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${cat?.color || "bg-muted text-muted-foreground"}`}>
                            <CatIcon className="h-4 w-4" />
                          </div>
                          <div>
                            <CardTitle className="text-base group-hover:text-primary transition-colors">
                              {article.title}
                            </CardTitle>
                            <CardDescription className="mt-1 text-sm">
                              {article.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-1.5">
                          {article.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs font-normal">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </CardWrapper>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">
                Try a different search term or browse by category.
              </p>
              <Button variant="outline" onClick={() => { setSearchQuery(""); setActiveCategory(null); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30" id="support">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3 text-secondary">Still Need Help?</h2>
            <p className="text-muted-foreground">
              Can't find your answer above? Reach out — our team typically responds within a few hours.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-base">Live Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Chat with our support team in real-time during business hours (Mon–Fri, 9am–6pm EST).</p>
                <Button variant="outline" size="sm" className="w-full">Start Chat</Button>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-base">Email Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Send us a detailed message and we'll get back to you within 24 hours.</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="mailto:support@aiwriterpros.com">Email Us</a>
                </Button>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-base">FAQ & Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Browse expert tips and answers to frequently asked questions.</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/best-practices">View Guide</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
