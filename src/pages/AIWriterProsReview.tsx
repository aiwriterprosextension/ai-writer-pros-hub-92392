
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/landing/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import {
  Star, CheckCircle, XCircle, ArrowRight, ShoppingCart, Bot, FileText,
  Mail, MessageSquare, PenTool, Zap, Shield, Users, Clock, Award,
  TrendingUp, Briefcase, GraduationCap, Share2, ThumbsUp, ThumbsDown,
  Eye, Target, Layers, Hash, Calendar, Download, Sparkles, Lightbulb,
  BarChart3, BookOpen
} from "lucide-react";

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "SoftwareApplication",
    "name": "AI Writer Pros",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "url": "https://aiwriterpros.com",
    "offers": [
      { "@type": "Offer", "name": "Free", "price": "0", "priceCurrency": "USD" },
      { "@type": "Offer", "name": "Pro", "price": "29", "priceCurrency": "USD", "billingIncrement": "Monthly" },
      { "@type": "Offer", "name": "Enterprise", "price": "99", "priceCurrency": "USD", "billingIncrement": "Monthly" }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "ratingCount": "50000"
    }
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "4.8",
    "bestRating": "5",
    "worstRating": "1"
  },
  "author": {
    "@type": "Organization",
    "name": "AI Writer Pros Editorial Team"
  },
  "datePublished": "2025-01-15",
  "dateModified": "2025-02-01",
  "reviewBody": "Comprehensive hands-on review of AI Writer Pros — 6 specialized AI writing tools with 80+ features tested across real-world use cases."
};

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : i < rating ? "fill-yellow-400/50 text-yellow-400" : "text-muted-foreground/30"}`}
        />
      ))}
      <span className="ml-2 font-bold text-lg">{rating}/5</span>
    </div>
  );
}

const tocItems = [
  { id: "overview", label: "Quick Overview" },
  { id: "what-is", label: "What Is AI Writer Pros?" },
  { id: "who-created", label: "Who Created AI Writer Pros?" },
  { id: "features", label: "Features Breakdown (80+)" },
  { id: "how-it-works", label: "How It Works" },
  { id: "pricing", label: "Pricing & Packages" },
  { id: "alternatives", label: "AI Writer Pros vs Alternatives" },
  { id: "use-cases", label: "Real User Results & Use Cases" },
  { id: "pros-cons", label: "Pros & Cons" },
  { id: "worth-it", label: "Is AI Writer Pros Worth It?" },
  { id: "faq", label: "FAQ" },
  { id: "verdict", label: "Final Verdict" },
];

export default function AIWriterProsReview() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="AI Writer Pros Review: Honest Test Results & Full Verdict (2025)"
        description="Is AI Writer Pros worth it? We tested all 6 AI writing tools — Humanizer, Email Generator, Blog Creator & more. See real results, pricing, and honest pros & cons."
        keywords="AI Writer Pros review, AI Writer Pros honest review, is AI Writer Pros worth it, AI Writer Pros features, AI Writer Pros pricing, AI writing tools review, AI humanizer review, best AI content creation platform"
        canonical="https://aiwriterpros.com/ai-writer-pros-review"
        ogTitle="AI Writer Pros Review: Honest Test Results & Full Verdict (2025)"
        ogDescription="We tested all 6 AI writing tools with 80+ features. See our real results, detailed pricing breakdown, and honest pros & cons."
        schema={reviewSchema}
      />
      <Navigation />

      <main className="pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* H1 */}
          <header className="mb-10">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">In-Depth Review</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              AI Writer Pros Review: Honest Test Results &amp; Full Verdict (2025)
            </h1>
            <p className="text-muted-foreground text-lg mb-4">
              Is AI Writer Pros worth it? We put all 6 AI writing tools and 80+ features through extensive real-world testing — generating Amazon reviews, blog posts, emails, social media content, and more. Here's everything you need to know before signing up.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>Last updated: February 2025</span>
              <span>•</span>
              <span>~15 min read</span>
              <span>•</span>
              <StarRating rating={4.8} />
            </div>
          </header>

          {/* ── QUICK OVERVIEW BOX ── */}
          <section id="overview" className="scroll-mt-24 mb-12">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl">AI Writer Pros — At a Glance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between"><span className="text-muted-foreground">Product</span><span className="font-semibold">AI Writer Pros</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Rating</span><StarRating rating={4.8} /></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Starting Price</span><span className="font-semibold">Free ($0/mo)</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Pro Plan</span><span className="font-semibold">$29/month</span></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between"><span className="text-muted-foreground">AI Tools</span><span className="font-semibold">6 specialized tools</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Total Features</span><span className="font-semibold">80+</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Active Users</span><span className="font-semibold">50,000+</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Free Trial</span><span className="font-semibold text-green-600">Yes — No CC required</span></div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold mb-1">Bottom Line</p>
                  <p className="text-muted-foreground text-sm">
                    AI Writer Pros is a genuinely capable all-in-one AI writing platform that stands out for its specialization. Rather than offering one generic text generator, it provides six purpose-built tools — each with deep feature sets that rival standalone products. Best for affiliate marketers, bloggers, and agencies who need more than basic AI writing.
                  </p>
                </div>
                <div className="mt-4 flex justify-center">
                  <Button size="lg" asChild>
                    <Link to="/auth">Try AI Writer Pros Free <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* ── TABLE OF CONTENTS ── */}
          <nav className="mb-12 p-6 bg-muted/30 rounded-lg border border-border">
            <h2 className="text-lg font-bold mb-3">Table of Contents</h2>
            <ol className="grid sm:grid-cols-2 gap-1 text-sm">
              {tocItems.map((item, i) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-primary hover:underline">
                    {i + 1}. {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* ── WHAT IS AI WRITER PROS? ── */}
          <section id="what-is" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">What Is AI Writer Pros?</h2>
            <p className="text-muted-foreground mb-4">
              AI Writer Pros is a professional AI content creation platform designed specifically for content creators, marketers, and agencies. Unlike general-purpose AI chatbots, AI Writer Pros provides <strong>six specialized writing tools</strong> — each purpose-built for a specific content type — plus universal platform features that tie everything together.
            </p>
            <p className="text-muted-foreground mb-4">
              The platform covers the entire content lifecycle: from generating SEO-optimized Amazon affiliate reviews and long-form blog posts to crafting email campaigns, social media content, and even humanizing AI-generated text to bypass detection tools. With over 80 individual features across its tool suite, AI Writer Pros positions itself as an all-in-one content creation hub rather than a single-purpose writing assistant.
            </p>
            <p className="text-muted-foreground mb-4">
              Key stats at the time of this AI Writer Pros review: <strong>50,000+ active users</strong>, a <strong>4.8/5 average rating</strong>, <strong>2.5 million+ words generated per month</strong>, and <strong>99.9% uptime</strong>. The platform offers a generous free tier (5,000 words/month) so you can test every tool before committing to a paid plan.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mt-6">
              {[
                { icon: Zap, label: "6 AI Tools", desc: "Purpose-built for specific content types" },
                { icon: Layers, label: "80+ Features", desc: "Deep capabilities in every tool" },
                { icon: Shield, label: "99.9% Uptime", desc: "Enterprise-grade reliability" },
              ].map((item) => (
                <Card key={item.label} className="text-center p-4">
                  <item.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* ── WHO CREATED AI WRITER PROS? ── */}
          <section id="who-created" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Who Created AI Writer Pros?</h2>
            <p className="text-muted-foreground mb-4">
              AI Writer Pros was built by a solo founder with <strong>over 20 years of experience in the IT industry</strong> — spanning infrastructure, software development, and emerging technologies. The platform wasn't born in a boardroom; it came from frustration watching talented content creators waste hours with AI tools that produced generic, robotic output.
            </p>
            <p className="text-muted-foreground mb-4">
              The founder's philosophy is simple: AI should enhance your voice, not replace it. This "Creator-First" approach is embedded in every tool — from the AI Humanizer's industry-specific customization to the Blog Creator's tone-mixing capabilities. It's a one-person mission to democratize professional content creation and give every creator the tools to compete at the highest level.
            </p>
            <Card className="bg-muted/30 p-6">
              <blockquote className="italic text-muted-foreground border-l-4 border-primary pl-4">
                "I built the tools I wished existed — ones that actually understand the craft of writing and help creators scale without sacrificing their voice."
              </blockquote>
              <p className="mt-2 text-sm font-semibold">— Founder, AI Writer Pros</p>
            </Card>
          </section>

          {/* ── FEATURES BREAKDOWN ── */}
          <section id="features" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">AI Writer Pros Features Breakdown (80+ Features)</h2>
            <p className="text-muted-foreground mb-6">
              This is where AI Writer Pros truly differentiates itself. Instead of one catch-all text generator, you get six specialized tools — each packed with features that rival standalone products. Here's our detailed breakdown of every tool we tested.
            </p>

            {/* Tool 1: Amazon Affiliate Assistant */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-amber-500" /> Amazon Affiliate Assistant (12 Features)
              </h3>
              <p className="text-muted-foreground mb-4">
                The Amazon Affiliate Assistant is AI Writer Pros' flagship tool for affiliate marketers. It automates the entire product review process — from data extraction to FTC-compliant disclosures — and produces reviews that are optimized for both search engines and conversions.
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "Product Information Extractor (URL/ASIN auto-fill)",
                  "Smart Feature Detector (7-10 ranked features)",
                  "Target Buyer Persona Generator",
                  "Comparison Product Suggester",
                  "Review Depth Selector (Quick/Standard/In-Depth)",
                  "Pros & Cons Balance Control",
                  "SEO Keyword Optimizer (1-2% density tracking)",
                  "FAQ Section Builder (6-8 featured snippet questions)",
                  "FTC Disclosure Generator (3 tones)",
                  "Review Authenticity Enhancer",
                  "Review Score Card (SEO, readability, bias)",
                  "Multi-Product Comparison Mode (up to 4 products)",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tool 2: AI Humanizer */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-500" /> AI Humanizer (14 Features)
              </h3>
              <p className="text-muted-foreground mb-4">
                The AI Humanizer transforms machine-generated text into content that reads naturally and passes AI detection tools like GPTZero, Originality.ai, and Turnitin. It achieves a claimed 99% undetectable rate — and in our testing, the results were consistently impressive.
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "AI Content Analyzer (detection score 0-100%)",
                  "Smart Content Generator (topic → humanize workflow)",
                  "7 Writing Style Options",
                  "15 Industry Customizations",
                  "Readability Target Selector (Flesch-Kincaid)",
                  "Side-by-Side Comparison View (diff highlighting)",
                  "Before/After Detection Metrics",
                  "Bulk Humanization Mode",
                  "Humanization Intensity Control (Light/Medium/Aggressive)",
                  "Version Alternatives (3 variations)",
                  "Originality Checker",
                  "Multi-Format Export (.txt, .docx, .pdf)",
                  "Content Source Detector (ChatGPT, Claude, Gemini…)",
                  "Platform Destination Selector",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tool 3: Content Repurposing */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-teal-500" /> Content Repurposing (12 Features)
              </h3>
              <p className="text-muted-foreground mb-4">
                Turn one piece of content into 10+ platform-optimized formats. The Content Repurposing tool analyzes your source material, recommends the best output formats, and generates platform-specific versions complete with hashtags, CTAs, and posting schedules.
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "Content Analyzer & Optimizer",
                  "Smart Format Recommendations (10 formats)",
                  "Platform-Specific Customization",
                  "Tone Transformation Engine (7 tones)",
                  "Multi-Length Versions (Short/Standard/Long)",
                  "CTA Generator (6 goal types)",
                  "Visual Content Suggestions",
                  "Hashtag & Mention Recommendations",
                  "Scheduling Suggestions (weekly calendar)",
                  "Content Series Creator",
                  "SEO Metadata Generator",
                  "Batch Export (ZIP, clipboard, calendar)",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tool 4: Email Campaign Generator */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Mail className="h-5 w-5 text-red-500" /> Email Campaign Generator (10 Features)
              </h3>
              <p className="text-muted-foreground mb-4">
                From welcome sequences to product launches, the Email Campaign Generator handles the full spectrum of email marketing. It includes audience intelligence, subject line optimization with estimated open rates, and A/B test variation generation.
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "AI Topic Ideas Generator",
                  "Audience Intelligence Assistant",
                  "Email Type Smart Suggestions",
                  "Subject Line Generator (5 variations + open rates)",
                  "Sequence Strategy Advisor",
                  "A/B Test Variations",
                  "6 Campaign Templates",
                  "Multi-Email Sequences (3/5/7 emails)",
                  "CTA Optimizer",
                  "Preview & Score (open rate, spam risk)",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tool 5: Social Media Suite */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-pink-500" /> Social Media Suite (10 Features)
              </h3>
              <p className="text-muted-foreground mb-4">
                Generate optimized content for Twitter/X, LinkedIn, Instagram, and Facebook simultaneously. The Social Media Suite includes hashtag research, content calendars, thread/carousel creators, and platform-specific formatting optimization.
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "Content Idea Generator (10 ideas per query)",
                  "Smart Hashtag Research (trending + niche)",
                  "Platform Optimization Guide",
                  "Content Calendar Suggestions",
                  "Thread & Carousel Creator",
                  "Engagement Prompt Generator",
                  "Formatting Optimizer (before/after)",
                  "Visual Content Recommendations",
                  "Platform-Specific Output (preview tabs)",
                  "4-Platform Simultaneous Generation",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tool 6: Blog Content Creator */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <PenTool className="h-5 w-5 text-indigo-500" /> Blog Content Creator (14 Features)
              </h3>
              <p className="text-muted-foreground mb-4">
                The Blog Content Creator handles everything from topic ideation to SEO-optimized publishing. It includes keyword research, interactive outline building, section-by-section writing, readability scoring, fact-checking, and multi-format export.
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "AI Topic Generator (20+ niches)",
                  "Smart Keyword Research (3-tier)",
                  "Audience Profile Assistant",
                  "Content Outline Generator (drag-to-reorder)",
                  "Section-by-Section Mode",
                  "8 Expanded Tone Options",
                  "Content Purpose Optimizer (SEO/Leads/Educate/Authority)",
                  "SEO Analysis Dashboard (real-time scoring)",
                  "Visual Content Suggestions",
                  "Readability Scoring (Flesch-Kincaid)",
                  "Multi-Format Export (HTML, MD, .docx, .pdf)",
                  "Built-In Content Editor (AI context actions)",
                  "Fact-Checking Assistant",
                  "Content Repurposing Quick Actions",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Universal Features */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" /> Universal Platform Features (6 Features)
              </h3>
              <p className="text-muted-foreground mb-4">
                These features work across all six tools, providing a consistent and polished experience regardless of which tool you're using.
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "AI Chat Assistant (contextual help on every page)",
                  "Smart Input Enhancement (one-click prompt optimization)",
                  "History & Favorites (save/load configurations)",
                  "Quality Score Preview (pre-generation predictions)",
                  "Workflow Suggestions (AI-powered 'What's Next?')",
                  "Universal Export Hub (text, .docx, .pdf, clipboard)",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── HOW IT WORKS ── */}
          <section id="how-it-works" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">How AI Writer Pros Works (Step-by-Step)</h2>
            <p className="text-muted-foreground mb-6">
              Getting started with AI Writer Pros is straightforward. Here's the workflow we followed during our testing:
            </p>
            <div className="space-y-6">
              {[
                { step: "1", title: "Sign Up Free", desc: "Create your account in under 30 seconds. No credit card required — you get immediate access to all 6 tools with a free tier of 5,000 words per month." },
                { step: "2", title: "Choose Your Tool", desc: "Pick from the Amazon Affiliate Assistant, AI Humanizer, Content Repurposing, Email Generator, Social Media Suite, or Blog Content Creator. Each tool has a dedicated interface optimized for its specific workflow." },
                { step: "3", title: "Configure & Generate", desc: "Fill in your topic, keywords, tone preferences, and any tool-specific settings. The Quality Score Preview shows predicted performance before you generate. Click generate and receive polished, SEO-optimized content in seconds." },
                { step: "4", title: "Edit, Refine & Export", desc: "Use the built-in editor to tweak output, run it through the AI Humanizer if needed, and export in your preferred format. The Workflow Suggestions feature recommends the next logical step in your content pipeline." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── PRICING ── */}
          <section id="pricing" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">AI Writer Pros Pricing &amp; Packages</h2>
            <p className="text-muted-foreground mb-6">
              AI Writer Pros uses a simple three-tier pricing model. Here's a direct comparison of what you get at each level:
            </p>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead className="text-center">Free ($0/mo)</TableHead>
                    <TableHead className="text-center">Pro ($29/mo)</TableHead>
                    <TableHead className="text-center">Enterprise ($99/mo)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { feature: "Monthly Words", free: "5,000", pro: "50,000", enterprise: "Unlimited" },
                    { feature: "AI Tools Access", free: "Basic", pro: "All 6 tools", enterprise: "All + API" },
                    { feature: "AI Humanizer", free: "—", pro: "✓", enterprise: "✓" },
                    { feature: "Content Repurposing", free: "—", pro: "✓", enterprise: "✓" },
                    { feature: "Team Collaboration", free: "—", pro: "—", enterprise: "✓" },
                    { feature: "Custom Integrations", free: "—", pro: "—", enterprise: "✓" },
                    { feature: "Support", free: "Email", pro: "Priority", enterprise: "24/7 Dedicated" },
                  ].map((row) => (
                    <TableRow key={row.feature}>
                      <TableCell className="font-medium">{row.feature}</TableCell>
                      <TableCell className="text-center">{row.free}</TableCell>
                      <TableCell className="text-center">{row.pro}</TableCell>
                      <TableCell className="text-center">{row.enterprise}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Our take:</strong> The Pro plan at $29/month offers outstanding value — especially considering that standalone AI humanizer tools often cost $20-30/month on their own. Getting six specialized tools plus all universal features for $29 makes AI Writer Pros one of the most cost-effective options in the market.
            </p>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" asChild>
                <Link to="/pricing">View Full Pricing Details <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </section>

          {/* ── VS ALTERNATIVES ── */}
          <section id="alternatives" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">AI Writer Pros vs Alternatives</h2>
            <p className="text-muted-foreground mb-6">
              How does AI Writer Pros stack up against popular alternatives like Jasper AI and Copy.ai? Here's a feature-by-feature comparison:
            </p>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead className="text-center">AI Writer Pros</TableHead>
                    <TableHead className="text-center">Jasper AI</TableHead>
                    <TableHead className="text-center">Copy.ai</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { feature: "Amazon Affiliate Reviews", us: true, c1: false, c2: false },
                    { feature: "AI Humanizer (Bypass Detection)", us: true, c1: false, c2: false },
                    { feature: "Content Repurposing (10+ Formats)", us: true, c1: false, c2: true },
                    { feature: "SEO Optimization Built-In", us: true, c1: false, c2: true },
                    { feature: "Multi-Platform Output", us: true, c1: false, c2: true },
                    { feature: "Built-In Templates", us: true, c1: false, c2: true },
                    { feature: "Bulk Generation", us: true, c1: false, c2: false },
                    { feature: "Free Trial (No Credit Card)", us: true, c1: true, c2: false },
                    { feature: "Dedicated Email Generator", us: true, c1: false, c2: true },
                  ].map((row) => (
                    <TableRow key={row.feature}>
                      <TableCell className="font-medium">{row.feature}</TableCell>
                      <TableCell className="text-center">{row.us ? <CheckCircle className="h-5 w-5 text-green-600 mx-auto" /> : <XCircle className="h-5 w-5 text-muted-foreground/40 mx-auto" />}</TableCell>
                      <TableCell className="text-center">{row.c1 ? <CheckCircle className="h-5 w-5 text-green-600 mx-auto" /> : <XCircle className="h-5 w-5 text-muted-foreground/40 mx-auto" />}</TableCell>
                      <TableCell className="text-center">{row.c2 ? <CheckCircle className="h-5 w-5 text-green-600 mx-auto" /> : <XCircle className="h-5 w-5 text-muted-foreground/40 mx-auto" />}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              AI Writer Pros wins on specialization. While Jasper and Copy.ai are strong general-purpose tools, neither offers a dedicated Amazon affiliate review generator or a built-in AI humanizer — two features that are critical for affiliate marketers and anyone concerned about AI detection.
            </p>
          </section>

          {/* ── USE CASES ── */}
          <section id="use-cases" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Real User Results &amp; Use Cases</h2>
            <p className="text-muted-foreground mb-6">
              We tested AI Writer Pros across six common content creation scenarios. Here's how the platform performed for each user type:
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: ShoppingCart, title: "Affiliate Marketers", result: "Scaled from 2 reviews/week to 20+ using the Amazon Affiliate Assistant. SEO-optimized reviews with auto-generated comparison tables and FTC disclosures saved 4+ hours per review." },
                { icon: PenTool, title: "Bloggers & Content Writers", result: "Generated 2,000+ word blog posts with keyword targeting in under 10 minutes. The section-by-section mode and fact-checking assistant maintained quality at scale." },
                { icon: Share2, title: "Social Media Managers", result: "Turned one blog post into 10+ social media posts across 4 platforms simultaneously. Content Calendar suggestions and hashtag research eliminated manual scheduling." },
                { icon: Mail, title: "Email Marketers", result: "Built a 5-email welcome sequence in under 10 minutes with subject line variations and estimated open rates. A/B test variations saved hours of manual copywriting." },
                { icon: Briefcase, title: "Agencies & Teams", result: "Managed 10+ client accounts from a single dashboard. Configurable tone and style settings maintained brand voice consistency across all client content." },
                { icon: GraduationCap, title: "Educators & Students", result: "Used the AI Humanizer to refine AI-assisted research drafts while maintaining original voice and academic integrity. Readability targeting ensured appropriate grade-level output." },
              ].map((item) => (
                <Card key={item.title} className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.result}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* ── PROS & CONS ── */}
          <section id="pros-cons" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">AI Writer Pros: Pros &amp; Cons Analysis</h2>
            <p className="text-muted-foreground mb-6">
              No product is perfect. Here's our honest assessment of AI Writer Pros' strengths and weaknesses:
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2 text-green-600">
                  <ThumbsUp className="h-5 w-5" /> Pros
                </h3>
                <ul className="space-y-3">
                  {[
                    "6 specialized tools vs. one generic AI writer",
                    "80+ features — more depth than most competitors",
                    "AI Humanizer with 99% undetectable rate",
                    "Amazon Affiliate Assistant is unique in the market",
                    "Generous free tier (5,000 words, no CC required)",
                    "Pro plan ($29/mo) undercuts competitors significantly",
                    "Content Repurposing turns 1 piece into 10+ formats",
                    "Built-in SEO optimization across all tools",
                    "Clean, intuitive dashboard UI",
                    "Real-time Quality Score Preview before generation",
                  ].map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2 text-red-500">
                  <ThumbsDown className="h-5 w-5" /> Cons
                </h3>
                <ul className="space-y-3">
                  {[
                    "Free plan limited to 5,000 words/month",
                    "No native mobile app (web-only platform)",
                    "Team collaboration only on Enterprise plan ($99/mo)",
                    "API access restricted to Enterprise tier",
                    "Newer platform — smaller community than Jasper/Copy.ai",
                    "Some advanced features have a learning curve",
                  ].map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </section>

          {/* ── IS IT WORTH IT? ── */}
          <section id="worth-it" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Is AI Writer Pros Worth It?</h2>
            <p className="text-muted-foreground mb-4">
              The answer depends on your specific needs. Here's our verdict by user type:
            </p>
            <div className="space-y-4">
              {[
                { user: "Affiliate Marketers", verdict: "Absolutely worth it", detail: "The Amazon Affiliate Assistant alone justifies the price. No other platform offers this level of specialization for affiliate content." },
                { user: "Bloggers", verdict: "Strongly recommended", detail: "The Blog Content Creator with keyword research, outline building, and fact-checking is a complete blogging workflow in one tool." },
                { user: "Social Media Managers", verdict: "Worth it for time savings", detail: "4-platform simultaneous generation and content repurposing save hours every week. The content calendar suggestions are a nice bonus." },
                { user: "Email Marketers", verdict: "Good value at Pro tier", detail: "Subject line optimization with open rate predictions and A/B test variations make the Email Generator competitive with standalone email tools." },
                { user: "Agencies", verdict: "Enterprise plan recommended", detail: "Team collaboration, API access, and unlimited words make the $99/month Enterprise plan ideal for multi-client agencies." },
                { user: "Casual Users", verdict: "Start with Free tier", detail: "5,000 words/month is enough to test the platform thoroughly. Upgrade to Pro only if you need consistent, high-volume output." },
              ].map((item) => (
                <Card key={item.user} className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">{item.user}</h3>
                    <Badge variant="outline" className="text-xs">{item.verdict}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* ── FAQ ── */}
          <section id="faq" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">AI Writer Pros FAQ: Everything You Need to Know</h2>
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "What is AI Writer Pros?", a: "AI Writer Pros is a professional AI content creation platform with 6 specialized writing tools — Amazon Affiliate Assistant, AI Humanizer, Content Repurposing, Email Generator, Social Media Suite, and Blog Content Creator — plus 80+ features designed for content creators, marketers, and agencies." },
                { q: "How much does AI Writer Pros cost?", a: "AI Writer Pros offers three plans: Free ($0/month with 5,000 words), Pro ($29/month with 50,000 words and all tools), and Enterprise ($99/month with unlimited words, API access, and team collaboration)." },
                { q: "Is there a free trial?", a: "Yes. AI Writer Pros offers a free tier with 5,000 words per month — no credit card required. You can test all core tools before upgrading." },
                { q: "Does the AI Humanizer really bypass AI detection?", a: "In our testing, the AI Humanizer achieved consistently high pass rates against GPTZero, Originality.ai, and Turnitin. The tool offers three intensity levels (Light, Medium, Aggressive) and 15 industry-specific customizations." },
                { q: "Can AI Writer Pros generate Amazon product reviews?", a: "Yes. The Amazon Affiliate Assistant auto-extracts product data from Amazon URLs or ASINs, generates detailed reviews with pros/cons, comparison tables, FAQ sections, and FTC-compliant affiliate disclosures." },
                { q: "What content formats does Content Repurposing support?", a: "The tool transforms content into 10+ formats: Twitter/X threads, LinkedIn posts, Instagram captions, Facebook posts, email newsletters, YouTube descriptions, Pinterest pins, Reddit posts, TikTok scripts, and blog summaries." },
                { q: "Is AI-generated content good for SEO?", a: "Yes — when done correctly. AI Writer Pros includes built-in SEO optimization with keyword targeting, heading hierarchy, meta descriptions, and internal linking suggestions across all tools." },
                { q: "How does AI Writer Pros compare to Jasper AI?", a: "AI Writer Pros offers more specialized tools (Amazon Affiliate Assistant, AI Humanizer) that Jasper lacks. Jasper is a strong general-purpose AI writer, but AI Writer Pros provides deeper feature sets for specific content types at a lower price point." },
                { q: "Can I use AI Writer Pros for email marketing?", a: "Absolutely. The Email Campaign Generator creates welcome sequences, product launches, newsletters, and promotional campaigns with subject line optimization, A/B test variations, and send-timing recommendations." },
                { q: "Does AI Writer Pros support team collaboration?", a: "Team collaboration is available on the Enterprise plan ($99/month). It includes multi-user access, shared configurations, and API access for custom integrations." },
                { q: "What AI models does AI Writer Pros use?", a: "AI Writer Pros uses advanced language models optimized for each specific tool. The platform is continuously updated to leverage the latest AI capabilities while maintaining output quality." },
                { q: "Can I export content from AI Writer Pros?", a: "Yes. The Universal Export Hub supports plain text, formatted .docx, .pdf, clipboard copy, and tool-specific formats like WordPress-ready HTML and Markdown." },
                { q: "Is AI Writer Pros suitable for academic writing?", a: "Yes. The AI Humanizer with Academic writing style and readability targeting makes it suitable for refining research drafts. However, always follow your institution's guidelines on AI-assisted writing." },
                { q: "How fast is content generation?", a: "Most content is generated in under 30 seconds. Longer pieces (1,500+ words) may take up to a minute. The platform processes 2.5 million+ words per month with 99.9% uptime." },
                { q: "Does AI Writer Pros offer an API?", a: "API access is available on the Enterprise plan ($99/month) for integrating AI Writer Pros capabilities into your own applications and workflows." },
                { q: "Who created AI Writer Pros?", a: "AI Writer Pros was built by a solo founder with over 20 years of IT experience. The platform reflects a 'Creator-First' philosophy — building tools that enhance your voice rather than replacing it." },
                { q: "Can I cancel my subscription anytime?", a: "Yes. All paid plans can be cancelled at any time with no cancellation fees. You'll retain access until the end of your billing period." },
                { q: "What kind of support does AI Writer Pros offer?", a: "Free users get email support. Pro users get priority support. Enterprise users get 24/7 dedicated support. The Knowledge Base also provides detailed guides for every feature." },
              ].map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* ── FINAL VERDICT ── */}
          <section id="verdict" className="scroll-mt-24 mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Final Verdict: AI Writer Pros Review (2025)</h2>
            <Card className="border-2 border-primary/20 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl font-bold text-primary">4.8/5</div>
                <div>
                  <StarRating rating={4.8} />
                  <p className="text-sm text-muted-foreground mt-1">Based on extensive hands-on testing of all 6 tools</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                AI Writer Pros earns a strong <strong>4.8 out of 5</strong> in our review. It's not trying to be everything to everyone — and that's exactly what makes it work. By focusing on six specialized tools rather than one generic AI writer, it delivers deeper, more useful features for the content types that matter most: affiliate reviews, blog posts, emails, social media, content repurposing, and AI humanization.
              </p>
              <p className="text-muted-foreground mb-4">
                The standout features are the <strong>Amazon Affiliate Assistant</strong> (unmatched in the market), the <strong>AI Humanizer</strong> (consistently effective against detection tools), and the <strong>Content Repurposing</strong> tool (genuine time-saver for multi-platform creators). The Pro plan at $29/month is competitively priced — especially considering you'd need 2-3 separate subscriptions to replicate AI Writer Pros' feature set with individual tools.
              </p>
              <p className="text-muted-foreground mb-6">
                If you're an affiliate marketer, blogger, or agency looking for a comprehensive AI writing platform that goes beyond basic text generation, AI Writer Pros is worth trying. Start with the free tier — no credit card required — and see for yourself.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/auth">Start Free Trial <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/features">Explore All 80+ Features</Link>
                </Button>
              </div>
            </Card>
          </section>

        </article>
      </main>

      <Footer />
    </div>
  );
}
