
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/landing/SEOHead";
import { TrustBar } from "@/components/landing/TrustBar";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ComparisonTable } from "@/components/landing/ComparisonTable";
import { UseCases } from "@/components/landing/UseCases";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { 
  Play, 
  Star, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap, 
  Clock,
  CheckCircle,
  ArrowRight,
  Bot,
  FileText,
  Mail,
  MessageSquare,
  PenTool,
  ShoppingCart,
  Briefcase,
  Share2,
  UserPlus,
  GraduationCap
} from "lucide-react";

const seoSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AI Writer Pros",
  url: "https://aiwriterpros.com",
  description: "Professional AI writing tools for content creators. Amazon Affiliate Assistant, AI Humanizer, Content Repurposing and more.",
  sameAs: [],
  offers: {
    "@type": "SoftwareApplication",
    name: "AI Writer Pros",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free trial available" },
  },
};

const trustStats = [
  { label: "Active Users", value: "50,000+", icon: "users" as const },
  { label: "Average Rating", value: "4.8/5", icon: "star" as const },
  { label: "SOC 2 Compliant", value: "✓", icon: "shield" as const },
  { label: "Uptime", value: "99.9%", icon: "award" as const },
];

const problems = [
  "Writing quality content takes 4-6 hours per article with no guarantee of SEO ranking",
  "AI-generated text gets flagged by detection tools like GPTZero and Originality.ai",
  "Repurposing a single blog post for social media, email, and other channels is tedious and time-consuming",
  "Hiring freelance writers costs $200-$500 per article and quality is inconsistent",
  "Keeping up with content demands across Amazon reviews, blogs, email, and social media is overwhelming",
];

const solutions = [
  "Generate SEO-optimized articles, Amazon reviews, and blog posts in under 5 minutes with AI Writer Pros",
  "Our AI Humanizer makes content 99% undetectable while preserving readability and brand voice",
  "Turn 1 piece of content into 10+ formats instantly — social posts, emails, threads, and more",
  "Professional-quality output at a fraction of the cost with built-in templates and tone control",
  "One platform with 6 specialized AI tools handles every content need from a single dashboard",
];

const howItWorksSteps = [
  { title: "Sign Up Free", description: "Create your account in 30 seconds. No credit card required — start with a generous free trial.", icon: UserPlus },
  { title: "Choose Your Tool", description: "Pick from 6 AI writing tools: Amazon reviews, AI Humanizer, Content Repurposing, Email, Social Media, or Blog Creator.", icon: Zap },
  { title: "Generate & Publish", description: "Get polished, SEO-optimized content in seconds. Edit, export, and publish across all your channels.", icon: ArrowRight },
];

const comparisonRows = [
  { feature: "Amazon Affiliate Reviews", us: true, competitor1: false, competitor2: false },
  { feature: "AI Humanizer (Bypass Detection)", us: true, competitor1: false, competitor2: false },
  { feature: "Content Repurposing (10+ Formats)", us: true, competitor1: false, competitor2: true },
  { feature: "SEO Optimization Built-In", us: true, competitor1: false, competitor2: true },
  { feature: "Multi-Platform Output", us: true, competitor1: false, competitor2: true },
  { feature: "Built-In Templates", us: true, competitor1: false, competitor2: true },
  { feature: "Bulk Generation", us: true, competitor1: false, competitor2: false },
  { feature: "Free Trial (No Credit Card)", us: true, competitor1: true, competitor2: false },
  { feature: "Dedicated Email Generator", us: true, competitor1: false, competitor2: true },
];

const useCases = [
  { title: "Affiliate Marketers", description: "Generate high-converting Amazon product reviews with SEO-optimized pros, cons, and comparison tables. Scale your affiliate content from 2 reviews/week to 20+.", icon: ShoppingCart, example: "Use the Amazon Affiliate Assistant to auto-extract product data and generate reviews in minutes." },
  { title: "Bloggers & Content Writers", description: "Create long-form blog posts, listicles, and how-to guides that rank on Google. AI Writer Pros handles research, outlines, and full drafts.", icon: PenTool, example: "Generate a 2,000-word blog post with keyword targeting using the Blog Content Creator." },
  { title: "Social Media Managers", description: "Repurpose blog content into platform-optimized posts for Twitter/X, LinkedIn, Instagram, and Facebook. Save hours of manual rewriting every week.", icon: Share2, example: "Turn one blog post into 10+ social media posts using Content Repurposing." },
  { title: "Email Marketers", description: "Craft compelling email sequences, newsletters, and promotional campaigns with AI. Improve open rates with subject line optimization and A/B copy variants.", icon: Mail, example: "Use the Email Generator to build a 5-email welcome sequence in under 10 minutes." },
  { title: "Agencies & Teams", description: "Scale content production across multiple clients without sacrificing quality. Maintain brand voice consistency with configurable tone and style settings.", icon: Briefcase, example: "Manage 10+ client accounts from a single AI Writer Pros dashboard." },
  { title: "Educators & Students", description: "Create polished academic papers, study guides, and course materials. Humanize AI-assisted writing to maintain authenticity and academic integrity.", icon: GraduationCap, example: "Use the AI Humanizer to refine research drafts while keeping your original voice intact." },
];

const faqs = [
  { question: "What is AI Writer Pros?", answer: "AI Writer Pros is a professional AI content creation platform with 6 specialized writing tools: Amazon Affiliate Assistant, AI Humanizer, Content Repurposing, Email Generator, Social Media Suite, and Blog Content Creator. It helps content creators, marketers, and agencies produce high-quality content at scale." },
  { question: "How does the AI Humanizer work?", answer: "The AI Humanizer uses advanced natural language processing to rewrite AI-generated text so it reads naturally and passes AI detection tools like GPTZero, Originality.ai, and Turnitin. It maintains your original meaning and quality while achieving a 99% undetectable rate." },
  { question: "Is AI-generated content good for SEO?", answer: "Yes — when done correctly. AI Writer Pros generates content with built-in SEO optimization including keyword targeting, proper heading hierarchy, meta descriptions, and internal linking suggestions. Google's guidelines allow AI-assisted content as long as it provides genuine value to readers, which is exactly what our tools produce." },
  { question: "How much does AI Writer Pros cost?", answer: "AI Writer Pros offers a generous free trial with no credit card required. Paid plans start at affordable monthly rates with options for individuals, teams, and agencies. Visit our Pricing page for detailed plan comparisons." },
  { question: "Can AI Writer Pros generate Amazon product reviews?", answer: "Absolutely. The Amazon Affiliate Assistant is our most popular tool with 25,000+ active users. It auto-extracts product data from Amazon, generates detailed pros and cons, creates comparison tables, builds FAQ sections, and produces FTC-compliant affiliate disclosures — all in minutes." },
  { question: "Does AI Writer Pros bypass AI detection?", answer: "Yes. Our AI Humanizer is specifically designed to transform AI-generated text into natural, human-sounding content. It achieves a 99% success rate against leading AI detection tools while preserving the quality, accuracy, and readability of your original content." },
  { question: "What content formats does the Content Repurposing tool support?", answer: "The Content Repurposing tool transforms one piece of content into 10+ formats including Twitter/X threads, LinkedIn posts, Instagram captions, Facebook posts, email newsletters, YouTube descriptions, Pinterest pins, Reddit posts, TikTok scripts, and blog summaries." },
  { question: "Is there a free trial?", answer: "Yes! AI Writer Pros offers a free trial with no credit card required. You can test all 6 AI writing tools and experience the full platform before committing to a paid plan. Sign up takes less than 30 seconds." },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="AI Writer Pros – Professional AI Writing Tools for Content Creators"
        description="Save 10+ hours per week with AI Writer Pros. Amazon Affiliate Assistant, AI Humanizer, Content Repurposing, Email Generator & more. Free trial, no credit card."
        keywords="AI writing tools, AI content creation platform, AI humanizer, Amazon affiliate review generator, content repurposing, AI email generator, blog content creator"
        canonical="https://aiwriterpros.com"
        ogTitle="AI Writer Pros – Professional AI Writing Tools"
        ogDescription="Join 50,000+ content creators scaling their writing with AI. Generate, humanize, and repurpose content across all platforms."
        schema={seoSchema}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8" style={{ background: "linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(210 17% 97%) 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Join 50,000+ Content Creators
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-secondary">
              Professional AI Writing Tools <br />
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                That Actually Work
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Save 10+ hours per week on content creation. Generate high-quality, SEO-optimized content that converts, 
              humanize AI text to bypass detection, and repurpose content across all platforms — from one powerful dashboard.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/auth">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link to="/features">
                  <Play className="mr-2 h-5 w-5" />
                  See All Features
                </Link>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              <strong>2.5M+ words generated this month</strong> • No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar stats={trustStats} />

      {/* Tool Showcase Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-secondary">
              AI Writing Tools for Every Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From Amazon affiliate marketing to social media management, AI Writer Pros has the specialized AI tools to scale your content creation workflow and drive real results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Amazon Affiliate Assistant */}
            <Card className="relative overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                    <ShoppingCart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Amazon Affiliate Assistant</CardTitle>
                    <CardDescription>AI-Powered Product Reviews</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Generate high-converting Amazon product reviews with AI. Auto-extract product data, create SEO-optimized reviews with pros, cons, comparison tables, and FTC-compliant disclosures.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Auto product data extraction
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    SEO-optimized reviews with pros & cons
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Comparison tables & FAQ builder
                  </div>
                </div>
                <Link to="/amazon-affiliate-extension">
                  <Button className="w-full">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* AI Humanizer */}
            <Card className="relative overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-primary to-primary/70 rounded-lg">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">AI Humanizer</CardTitle>
                    <CardDescription>Bypass AI Detection</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Make AI content undetectable with advanced humanization. Analyze AI patterns, adjust tone and style per industry, and get before/after detection scores — all in one powerful tool.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    AI pattern analyzer with detection score
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Tone, style & industry customization
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Bulk processing & version alternatives
                  </div>
                </div>
                <Link to="/ai-humanizer">
                  <Button className="w-full">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Content Repurposing */}
            <Card className="relative overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Content Repurposing</CardTitle>
                    <CardDescription>Multi-Format Content</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Turn 1 piece of content into 10+ formats. AI analyzes your content, recommends best formats, customizes per platform, and generates hashtags, visuals, and posting schedules.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Smart content analyzer & format matching
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Platform-specific customization & CTA generator
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Hashtags, scheduling & batch export
                  </div>
                </div>
                <Link to="/content-repurposing">
                  <Button className="w-full">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Email Generator */}
            <Card className="relative overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Email Generator</CardTitle>
                    <CardDescription>AI-Powered Campaigns</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Create high-converting email campaigns with AI. Generate subject lines, build email sequences, A/B test variations, and optimize for opens and clicks across any audience.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    AI subject line generator & A/B testing
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Multi-step email sequence builder
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Audience targeting & preview scoring
                  </div>
                </div>
                <Link to="/email-generator">
                  <Button className="w-full">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Social Media Suite */}
            <Card className="relative overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Social Media Suite</CardTitle>
                    <CardDescription>Multi-Platform Posts</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Create engaging, platform-optimized social posts for Twitter/X, LinkedIn, Instagram, and Facebook. Generate content ideas, threads, carousels, and hashtag strategies with AI.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Content calendar & idea generator
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Thread & carousel creator
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Hashtag research & engagement hooks
                  </div>
                </div>
                <Link to="/social-media-suite">
                  <Button className="w-full">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Blog Content Creator */}
            <Card className="relative overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                    <PenTool className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Blog Content Creator</CardTitle>
                    <CardDescription>SEO-Optimized Articles</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Generate SEO-optimized blog posts that rank on Google. AI handles topic research, outlines, section-by-section writing, readability analysis, and keyword optimization.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Topic generator & keyword research
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Outline builder & section-by-section writing
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    SEO analysis & readability scoring
                  </div>
                </div>
                <Link to="/blog-content-creator">
                  <Button className="w-full">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <ProblemSolution
        problemTitle="Still Writing Content the Hard Way?"
        solutionTitle="AI Writer Pros Makes It Easy"
        problems={problems}
        solutions={solutions}
      />

      {/* How It Works */}
      <HowItWorks
        steps={howItWorksSteps}
        ctaText="Get Started Free"
        ctaLink="/auth"
      />

      {/* Comparison Table */}
      <ComparisonTable
        title="AI Writer Pros vs. The Competition"
        ourName="AI Writer Pros"
        competitor1Name="ChatGPT"
        competitor2Name="Jasper"
        rows={comparisonRows}
      />

      {/* Social Proof Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-secondary">
              Trusted by Content Creators Worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of professionals who have scaled their content production with AI Writer Pros
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2.5M+</div>
              <div className="text-muted-foreground">Words Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10+</div>
              <div className="text-muted-foreground">Hours Saved Weekly</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The Amazon Affiliate Assistant has completely transformed my review process. 
                  I'm generating 10x more content in half the time. My affiliate income has doubled since switching to AI Writer Pros."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/70 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    S
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Chen</div>
                    <div className="text-sm text-muted-foreground">Affiliate Marketer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The AI Humanizer is a game-changer. My content passes all detection tools 
                  while maintaining perfect quality and readability. It's the only humanizer that actually works consistently."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    M
                  </div>
                  <div>
                    <div className="font-semibold">Marcus Rodriguez</div>
                    <div className="text-sm text-muted-foreground">Content Creator</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Content repurposing used to take hours. Now I turn one blog post into 
                  social media content for the entire week in minutes. AI Writer Pros is the best investment I've made for my business."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    L
                  </div>
                  <div>
                    <div className="font-semibold">Lisa Thompson</div>
                    <div className="text-sm text-muted-foreground">Social Media Manager</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company Logos */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-8">Used by teams at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-2xl font-bold">TechCorp</div>
              <div className="text-2xl font-bold">MediaFlow</div>
              <div className="text-2xl font-bold">ContentPro</div>
              <div className="text-2xl font-bold">WriteWell</div>
              <div className="text-2xl font-bold">ScaleUp</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <UseCases
        title="Who Uses AI Writer Pros?"
        subtitle="Specialized AI writing tools for every content professional — from solo bloggers to enterprise agencies"
        cases={useCases}
      />

      {/* Features Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-secondary">
              Why Choose AI Writer Pros?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional-grade AI tools designed for serious content creators who demand quality, speed, and efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Generate high-quality content in seconds, not hours. Our AI is optimized for speed without compromising quality.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Undetectable AI</h3>
              <p className="text-muted-foreground">
                Advanced humanization technology ensures your AI content passes all detection tools with 99% success rate.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">SEO Optimized</h3>
              <p className="text-muted-foreground">
                Every piece of content is optimized for search engines, helping you rank higher and drive more organic traffic.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
              <p className="text-muted-foreground">
                Work together with your team, share templates, and maintain consistent brand voice across all content.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save 10+ Hours Weekly</h3>
              <p className="text-muted-foreground">
                Our users report saving an average of 10+ hours per week on content creation and optimization tasks.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">
                Professional-grade content that matches your brand voice and converts readers into customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} toolName="AI Writer Pros" />

      {/* Final CTA */}
      <FinalCTA
        headline="Ready to Transform Your Content Creation?"
        subheadline="Join 50,000+ content creators who've already scaled their writing with AI Writer Pros. Start your free trial today — no credit card required."
        ctaText="Start Free Trial"
        ctaLink="/auth"
        secondaryCtaText="View Pricing"
        secondaryCtaLink="/pricing"
        benefits={["14-day free trial", "No credit card required", "Cancel anytime", "24/7 support"]}
      />

      <Footer />
    </div>
  );
}
