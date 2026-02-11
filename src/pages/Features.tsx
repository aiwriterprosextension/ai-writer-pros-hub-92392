
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/landing/SEOHead";
import {
  CheckCircle, Zap, Shield, Users, Star, TrendingUp, ArrowRight,
  Mail, MessageSquare, PenTool, ShoppingCart, FileText, Bot,
  Search, BarChart3, Target, Layers, Hash, Calendar, Eye, Lock,
  Settings, Download, Copy, RefreshCw, Sparkles, Palette, Clock,
  BookOpen, GraduationCap, Award, Globe, Lightbulb, Heart
} from "lucide-react";

const universalFeatures = [
  { icon: Sparkles, title: "AI Chat Assistant", description: "Contextual help on every tool page with a floating chat widget that answers questions about best practices, optimal settings, and content strategy in real-time." },
  { icon: Lightbulb, title: "Smart Input Enhancement", description: "One-click input optimization that refines your rough topics, keywords, and descriptions into AI-optimized prompts for better generation results." },
  { icon: Star, title: "History & Favorites", description: "Save your best configurations, load previous settings, and star your favorite workflows for instant one-click access across all tools." },
  { icon: BarChart3, title: "Quality Score Preview", description: "Pre-generation scoring predicts SEO score, engagement potential, readability level, and platform suitability — with color-coded improvement suggestions." },
  { icon: ArrowRight, title: "Workflow Suggestions", description: "After generating content, get AI-powered 'What's Next?' recommendations that guide you to the next logical tool in your content pipeline." },
  { icon: Download, title: "Universal Export Hub", description: "Export any output as plain text, formatted .docx, .pdf, or copy to clipboard with formatting preserved. Download preferences saved automatically." },
];

const toolSections = [
  {
    id: "email-generator",
    name: "Email Campaign Generator",
    icon: Mail,
    gradient: "from-red-500 to-pink-500",
    tagline: "High-converting email campaigns in seconds",
    link: "/email-generator",
    features: [
      { title: "AI Topic Ideas Generator", desc: "Get 10 actionable email topic ideas filtered by industry, campaign goal, and season — displayed as clickable cards that auto-fill your form." },
      { title: "Audience Intelligence Assistant", desc: "Answer 4 quick questions and the AI creates a detailed target audience description optimized for your campaign's conversion goals." },
      { title: "Email Type Smart Suggestions", desc: "As you type your topic, AI analyzes it in real-time and suggests the optimal email type (Promotional, Informational, Newsletter, etc.) with match percentages." },
      { title: "Subject Line Generator", desc: "Generate 5 compelling subject line variations — urgency-focused, curiosity-driven, benefit-led, personalized, and question-based — each with estimated open rates." },
      { title: "Sequence Strategy Advisor", desc: "AI recommends the optimal number of emails, purpose of each, and timing between sends based on your campaign goal, timeline, and audience temperature." },
      { title: "A/B Test Variations", desc: "Automatically generate alternative versions of your email using story-driven, data-focused, and original approaches for data-driven optimization." },
      { title: "6 Campaign Templates", desc: "Welcome sequences, product launches, newsletters, sales funnels, re-engagement, and promotional templates — all pre-optimized for conversions." },
      { title: "Multi-Email Sequences", desc: "Create 3, 5, or 7-email series with suggested send timing, progressive messaging, and CTA optimization built into every step." },
      { title: "CTA Optimizer", desc: "Choose your primary CTA goal (Sign Up, Purchase, Download, etc.) and AI optimizes placement and copy throughout your email for maximum conversions." },
      { title: "Preview & Score", desc: "Before generating, get predicted open rates, conversion potential, spam risk scores, and actionable warnings based on all your campaign settings." },
    ],
  },
  {
    id: "social-media",
    name: "Social Media Suite",
    icon: MessageSquare,
    gradient: "from-pink-500 to-rose-500",
    tagline: "Platform-optimized content for every network",
    link: "/social-media-suite",
    features: [
      { title: "Content Idea Generator", desc: "Generate 10 specific content ideas filtered by business type and industry, with recommended platforms and engagement potential ratings for each." },
      { title: "Smart Hashtag Research", desc: "Categorized hashtag suggestions: 5 high-volume (100K+ uses), 5 niche-specific (10K-50K), and 3 trending — with optimal count recommendations per platform." },
      { title: "Platform Optimization Guide", desc: "Auto-generated best practices for each selected platform: ideal character counts, recommended hashtag counts, best posting times, and engagement tactics." },
      { title: "Content Calendar Suggestions", desc: "AI recommends optimal posting days and times per platform with reasoning, displayed in a mini calendar view with export-to-ICS capability." },
      { title: "Thread & Carousel Creator", desc: "Convert any content into engaging Twitter/X threads (5-10 tweets) or LinkedIn carousel slides (6-8 slides) with character counts and hook optimization." },
      { title: "Engagement Prompt Generator", desc: "Add engagement hooks: questions to boost comments, poll ideas, and platform-appropriate CTAs that feel natural and drive interaction." },
      { title: "Formatting Optimizer", desc: "AI adds strategic emojis, line breaks, and platform-specific formatting for maximum engagement — with before/after comparison view." },
      { title: "Visual Content Recommendations", desc: "AI suggests visual types (infographic, photo, quote-card), color palettes with hex codes, and ready-to-copy image generation prompts for every post." },
      { title: "Platform-Specific Output", desc: "Preview tabs for each platform with auto-formatted versions: hashtag placement, mention formatting, and character optimization unique to each network." },
      { title: "4-Platform Simultaneous Generation", desc: "Generate optimized content for Twitter/X, LinkedIn, Instagram, and Facebook from a single topic with real-time character tracking." },
    ],
  },
  {
    id: "amazon-affiliate",
    name: "Amazon Affiliate Assistant",
    icon: ShoppingCart,
    gradient: "from-amber-500 to-orange-500",
    tagline: "SEO-optimized product reviews that convert",
    link: "/amazon-affiliate-extension",
    features: [
      { title: "Product Information Extractor", desc: "Enter an Amazon URL or ASIN to auto-extract product name, category, brand, key features, and estimated price range — auto-filling your review form." },
      { title: "Smart Feature Detector", desc: "AI researches and suggests 7-10 key features ranked by buyer importance, displayed as a checklist with star ratings for easy selection." },
      { title: "Target Buyer Persona Generator", desc: "Define the problem, price sensitivity, and experience level — AI generates a detailed buyer persona that influences the review's tone, focus, and recommendations." },
      { title: "Comparison Product Suggester", desc: "Toggle comparison mode to find 2-3 alternative products with key differentiators, then auto-generate side-by-side comparison tables with winner badges." },
      { title: "Review Depth Selector", desc: "Choose Quick Review (300-400 words), Standard (600-800), or In-Depth Analysis (1200-1500) with estimated reading times and visual depth indicators." },
      { title: "Pros & Cons Balance Control", desc: "Slide between Critical Focus, Balanced Review, and Positive Focus to control review sentiment — affecting which features get emphasized and overall tone." },
      { title: "SEO Keyword Optimizer", desc: "Add a target keyword and AI naturally incorporates it throughout the review with density tracking (target 1-2%) and highlighted placement." },
      { title: "FAQ Section Builder", desc: "Auto-generate 6-8 buyer FAQ questions optimized for Google featured snippets — each editable and reorderable for maximum SEO impact." },
      { title: "FTC Disclosure Generator", desc: "Generate FTC-compliant affiliate disclosures in Standard, Friendly, or Minimal tones with flexible placement options (top, bottom, or both)." },
      { title: "Review Authenticity Enhancer", desc: "Add personal testing details — duration, use case, notable experiences — and AI weaves them naturally throughout the review for genuine, trustworthy content." },
      { title: "Review Score Card", desc: "Post-generation quality metrics: SEO score, readability grade, bias detection, authenticity rating, and word count vs. target range with regeneration options." },
      { title: "Multi-Product Comparison Mode", desc: "Compare up to 4 products with automated feature tables, checkmarks, winner badges (Best Value, Best Features, Best for Beginners), and overall recommendations." },
    ],
  },
  {
    id: "content-repurposing",
    name: "Content Repurposing",
    icon: FileText,
    gradient: "from-green-500 to-teal-500",
    tagline: "Turn 1 piece of content into 10+ formats",
    link: "/content-repurposing",
    features: [
      { title: "Content Analyzer & Optimizer", desc: "AI detects content type, key themes, reading level, and tone — then ranks best output formats with match percentages and actionable warnings." },
      { title: "Smart Format Recommendations", desc: "10 output formats (Twitter Thread, LinkedIn, Instagram, Facebook, Email, Blog, Video Script, Podcast, Pinterest, TikTok) with AI-scored match percentages." },
      { title: "Platform-Specific Customization", desc: "Unique options per format: thread length controls, subject line generators, LinkedIn audience targeting, Instagram hashtag sliders, and more." },
      { title: "Tone Transformation Engine", desc: "7 tone options per format: Keep Original, Casual, Professional, Simplified, Humorous, Urgent, and Empathetic — with AI recommendations per platform." },
      { title: "Multi-Length Versions", desc: "Generate Short (50%), Standard (100%), and Long (150%) versions for each format — displayed in tabs with estimated reading times and word counts." },
      { title: "CTA Generator", desc: "AI creates platform-appropriate CTAs for 6 goals: website traffic, engagement, lead generation, product promotion, thought leadership, or no CTA." },
      { title: "Visual Content Suggestions", desc: "Per-format visual recommendations with visual type, extracted quotes, color palettes (clickable hex codes), and ready-to-copy image generation prompts." },
      { title: "Hashtag & Mention Recommendations", desc: "Auto-generated hashtags (Trending, Niche, Branded categories) and influencer/brand handles to mention — with selective add controls per platform." },
      { title: "Scheduling Suggestions", desc: "Optimal posting schedule displayed in a weekly calendar view with platform-colored events, hover reasoning, and ICS file export." },
      { title: "Content Series Creator", desc: "Break long content (1000+ words) into a 3-5 part series with titles and summaries — each part independently repurposable to different formats." },
      { title: "SEO Metadata Generator", desc: "Auto-generate meta titles, descriptions, focus keywords, and internal linking suggestions with character count tracking for blog/website formats." },
      { title: "Batch Export", desc: "Download all formats as ZIP, copy all to clipboard, or save to content calendar — with progress indicators for bulk operations." },
    ],
  },
  {
    id: "blog-creator",
    name: "Blog Content Creator",
    icon: PenTool,
    gradient: "from-indigo-500 to-purple-500",
    tagline: "SEO-optimized articles that rank and convert",
    link: "/blog-content-creator",
    features: [
      { title: "AI Topic Generator", desc: "Generate 10 trending, SEO-friendly blog topics filtered by 20+ niches, target audience, and content goal — each with angle descriptions and SEO potential ratings." },
      { title: "Smart Keyword Research", desc: "Three-tier keyword research: 3 primary keywords with volume/difficulty, 5 LSI keywords with explanations, and 5 long-tail variations — all selectable with one click." },
      { title: "Audience Profile Assistant", desc: "Define expertise level, pain points, desired actions, and demographics — AI generates a detailed reader persona that shapes content tone and structure." },
      { title: "Content Outline Generator", desc: "Interactive hierarchical outline with 5-8 H2 sections, 2-3 H3 subsections each, key points, word count targets, and drag-to-reorder editing." },
      { title: "Section-by-Section Mode", desc: "Build articles progressively by generating individual sections, reviewing each, then continuing — with progress tracking (e.g., '3 of 6 sections complete')." },
      { title: "8 Expanded Tone Options", desc: "Authoritative, Conversational, Educational, Persuasive, Storytelling, Data-Driven, Inspirational, and Humorous — with optional per-section tone mixing." },
      { title: "Content Purpose Optimizer", desc: "Select from Rank on Google, Generate Leads, Educate Readers, or Build Authority — AI adjusts CTA frequency, structure, header optimization, and linking." },
      { title: "SEO Analysis Dashboard", desc: "Real-time SEO scoring, keyword density tracking, meta description variations, title tag options, internal linking suggestions, and featured snippet optimization." },
      { title: "Visual Content Suggestions", desc: "AI recommends visual placements with type (infographic, chart, photo), detailed image prompts, SEO-optimized alt text, and insertion markers in content." },
      { title: "Readability Scoring", desc: "Flesch-Kincaid reading ease, grade level, average sentence length, passive voice percentage, and complex word ratio — with AI rewriting to target levels." },
      { title: "Multi-Format Export", desc: "Export to WordPress-ready HTML, Markdown, Google Docs format, plain text, or PDF — each including generated meta descriptions and title tag options." },
      { title: "Built-In Content Editor", desc: "Rich text editor with formatting toolbar and AI-powered context actions: Regenerate Paragraph, Expand Point, Add Example, and Simplify Section." },
      { title: "Fact-Checking Assistant", desc: "AI flags factual claims with confidence levels (High/Medium/Low concern), provides suggested verification sources, and allows marking claims as verified." },
      { title: "Content Repurposing Quick Actions", desc: "One-click conversion to Social Media Posts, Email Newsletter, Video Script, or Infographic Outline — pre-filling the Repurposing tool automatically." },
    ],
  },
  {
    id: "ai-humanizer",
    name: "AI Humanizer",
    icon: Bot,
    gradient: "from-blue-500 to-purple-500",
    tagline: "99% undetectable AI content",
    link: "/ai-humanizer",
    features: [
      { title: "AI Content Analyzer", desc: "Pre-humanization analysis: AI detection score (0-100%), flagged AI patterns with reasons, content type detection, and recommended humanization intensity." },
      { title: "Smart Content Generator", desc: "Need content to humanize? Generate AI text by topic, type (blog/email/social/academic), and length — then immediately humanize in one seamless workflow." },
      { title: "7 Writing Style Options", desc: "Professional, Casual & Conversational, Academic, Creative & Expressive, Technical, Friendly, and Authoritative — with auto-detection from analyzed content." },
      { title: "15 Industry Customizations", desc: "Healthcare, Finance, Technology, Education, Legal, Marketing, E-commerce, Real Estate, Lifestyle, Food, Travel, Entertainment, Manufacturing, Nonprofit, and General." },
      { title: "Readability Target Selector", desc: "Slider from Elementary to Professional/Expert with Flesch-Kincaid grade equivalents — AI adjusts vocabulary complexity and sentence structure accordingly." },
      { title: "Side-by-Side Comparison View", desc: "Split-screen with synchronized scrolling, diff highlighting (yellow=changed, green=added, red=removed), and 'Accept All Changes' for easy review." },
      { title: "Before/After Detection Metrics", desc: "Automated comparison of AI detection scores, readability grades, and sentence variety before and after — with prominent improvement percentages." },
      { title: "Bulk Humanization Mode", desc: "Process multiple paragraphs separately while maintaining consistent tone — with per-paragraph regeneration and expandable accordion display." },
      { title: "Humanization Intensity Control", desc: "Three-level slider: Light (subtle, preserve structure), Medium (balanced rewriting), and Aggressive (heavy rewrite for maximum humanization)." },
      { title: "Version Alternatives", desc: "Generate 3 alternative humanized versions (Conversational, Professional, Creative) as tabbed views — compare and select the best, or blend elements together." },
      { title: "Originality Checker", desc: "AI-based uniqueness analysis: scores content for clichéd phrases, overused expressions, and common structures — with rephrasing suggestions for flagged areas." },
      { title: "Multi-Format Export", desc: "Copy plain text, formatted text, download as .txt, .docx (with tracked changes), or .pdf — plus one-click send to Blog Creator or Email Generator." },
      { title: "Content Source Detector", desc: "Specify the AI source (ChatGPT, Claude, Gemini, Jasper, etc.) to optimize humanization for that tool's specific characteristic patterns." },
      { title: "Platform Destination Selector", desc: "Select publishing platform (Blog, Social Media, Email, Academic, Landing Page) — AI adjusts humanization approach for platform-specific natural patterns." },
    ],
  },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="All Features - 6 AI Writing Tools with 80+ Features | AI Writer Pros"
        description="Explore 80+ features across 6 professional AI writing tools: Email Generator, Social Media Suite, Blog Creator, AI Humanizer, Content Repurposing, and Amazon Affiliate Assistant."
        keywords="AI writing features, content creation tools, AI email generator, social media AI, blog writer features, AI humanizer features, content repurposing, amazon affiliate tool"
        canonical="https://aiwriterpros.com/features"
        ogTitle="80+ AI Writing Features | AI Writer Pros"
        ogDescription="The most comprehensive AI writing platform with 6 specialized tools and 80+ features for professional content creators."
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "AI Writer Pros Features",
          description: "Complete feature overview of AI Writer Pros — 6 AI writing tools with 80+ features.",
          url: "https://aiwriterpros.com/features",
        }}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            80+ Features Across 6 AI Writing Tools
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Every Feature You Need to
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Scale Your Content Creation
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            From AI-powered email campaigns to SEO-optimized blog posts, undetectable AI humanization 
            to multi-platform content repurposing — discover every feature that makes AI Writer Pros 
            the most comprehensive AI writing platform for professional creators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link to="/auth">Start Free Trial <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Universal Platform Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Universal Platform Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every tool includes these powerful AI enhancements that work across your entire content workflow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {universalFeatures.map((feature) => (
              <Card key={feature.title} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-base">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Tool Sections */}
      {toolSections.map((tool, toolIndex) => (
        <section
          key={tool.id}
          id={tool.id}
          className={`py-20 px-4 sm:px-6 lg:px-8 ${toolIndex % 2 === 0 ? "" : "bg-muted/30"}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 gap-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-gradient-to-r ${tool.gradient} rounded-xl`}>
                  <tool.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{tool.name}</h2>
                  <p className="text-lg text-muted-foreground">{tool.tagline}</p>
                </div>
              </div>
              <Button asChild>
                <Link to={tool.link}>
                  Explore {tool.name.split(" ")[0]} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tool.features.map((feature, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "80+", label: "AI-Powered Features" },
              { value: "6", label: "Specialized Tools" },
              { value: "50,000+", label: "Active Users" },
              { value: "10+", label: "Hours Saved Weekly" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Content Workflow?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join 50,000+ content creators using AI Writer Pros to produce professional content at scale. 
            Start your free trial today — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link to="/auth">Start Free Trial <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link to="/pricing">Compare Plans</Link>
            </Button>
          </div>
          <div className="flex items-center justify-center flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />No credit card required</div>
            <div className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />All 6 tools included</div>
            <div className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Cancel anytime</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
