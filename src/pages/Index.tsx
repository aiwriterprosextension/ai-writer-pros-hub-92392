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
  Play, Star, Users, TrendingUp, Shield, Zap, Clock, CheckCircle, 
  ArrowRight, Bot, FileText, Mail, MessageSquare, PenTool, 
  ShoppingCart, Briefcase, Share2, UserPlus, GraduationCap,
  BarChart3 // Fixed: Added missing import here
} from "lucide-react";

// Improvement #7: Internal Linking inside FAQs (Converted to JSX)
const faqs = [
  { 
    question: "What is AI Writer Pros?", 
    answer: "AI Writer Pros is a professional AI content creation platform with 6 specialized writing tools: Amazon Affiliate Assistant, AI Humanizer, Content Repurposing, Email Generator, Social Media Suite, and Blog Content Creator. It helps content creators, marketers, and agencies produce high-quality content at scale." 
  },
  { 
    question: "How does the AI Humanizer work?", 
    answer: <>The <Link to="/ai-humanizer" className="text-primary hover:underline">AI Humanizer</Link> uses advanced natural language processing to rewrite AI-generated text so it reads naturally and passes AI detection tools like GPTZero, Originality.ai, and Turnitin. It maintains your original meaning and quality while achieving a 99% undetectable rate.</> 
  },
  { 
    question: "Is AI-generated content good for SEO?", 
    answer: "Yes — when done correctly. AI Writer Pros generates content with built-in SEO optimization including keyword targeting, proper heading hierarchy, meta descriptions, and internal linking suggestions. Google's guidelines allow AI-assisted content as long as it provides genuine value to readers, which is exactly what our tools produce." 
  },
  { 
    question: "How much does AI Writer Pros cost?", 
    answer: "AI Writer Pros offers a generous free trial with no credit card required. Paid plans start at affordable monthly rates with options for individuals, teams, and agencies. Visit our Pricing page for detailed plan comparisons." 
  },
  { 
    question: "Can AI Writer Pros generate Amazon product reviews?", 
    answer: <>Absolutely. The <Link to="/amazon-affiliate-extension" className="text-primary hover:underline">Amazon Affiliate Assistant</Link> is our most popular tool with 25,000+ active users. It auto-extracts product data from Amazon, generates detailed pros and cons, creates comparison tables, builds FAQ sections, and produces FTC-compliant affiliate disclosures — all in minutes.</> 
  },
  { 
    question: "Does AI Writer Pros bypass AI detection?", 
    answer: "Yes. Our AI Humanizer is specifically designed to transform AI-generated text into natural, human-sounding content. It achieves a 99% success rate against leading AI detection tools while preserving the quality, accuracy, and readability of your original content." 
  },
  { 
    question: "What content formats does the Content Repurposing tool support?", 
    answer: <>The <Link to="/content-repurposing" className="text-primary hover:underline">Content Repurposing tool</Link> transforms one piece of content into 10+ formats including Twitter/X threads, LinkedIn posts, Instagram captions, Facebook posts, email newsletters, YouTube descriptions, Pinterest pins, Reddit posts, TikTok scripts, and blog summaries.</> 
  },
  { 
    question: "Is there a free trial?", 
    answer: "Yes! AI Writer Pros offers a free trial with no credit card required. You can test all 6 AI writing tools and experience the full platform before committing to a paid plan. Sign up takes less than 30 seconds." 
  },
];

// Improvement #2 & #6: Upgraded Graph Schema with SameAs and FAQPage
const seoSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://aiwriterpros.com/#organization",
      "name": "AI Writer Pros",
      "url": "https://aiwriterpros.com",
      "logo": "https://aiwriterpros.com/logo.png",
      "description": "Professional AI writing tools for content creators. Amazon Affiliate Assistant, AI Humanizer, Content Repurposing and more.",
      "sameAs": [
        "https://twitter.com/aiwriterpros",
        "https://www.linkedin.com/company/ai-writer-pros",
        "https://www.instagram.com/aiwriterpros"
      ]
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://aiwriterpros.com/#software",
      "name": "AI Writer Pros Platform",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "5200"
      },
      "offers": { 
        "@type": "Offer", 
        "price": "0", 
        "priceCurrency": "USD", 
        "name": "Free Trial" 
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": { "@type": "Answer", "text": typeof faq.answer === 'string' ? faq.answer : "AI Writer Pros tools help content creators." } 
      }))
    }
  ]
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

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <SEOHead 
        // Improvement #9: Dynamic Title Date
        title={`Best AI Writing Tools of ${new Date().getFullYear()} – AI Writer Pros`}
        description="Save 10+ hours per week with AI Writer Pros. Amazon Affiliate Assistant, AI Humanizer, Content Repurposing, Email Generator & more. Free trial, no credit card."
        keywords="AI writing tools, AI content creation platform, AI humanizer, Amazon affiliate review generator, content repurposing, AI email generator, blog content creator"
        canonical="https://aiwriterpros.com"
        ogTitle="AI Writer Pros – Professional AI Writing Tools"
        ogDescription="Join 50,000+ content creators scaling their writing with AI. Generate, humanize, and repurpose content across all platforms."
        schema={seoSchema}
      />
      
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          <div className="container px-4 mx-auto relative z-10 text-center">
            {/* Improvement #5: Freshness Badge */}
            <Badge variant="outline" className="mb-6 py-2 px-4 rounded-full text-sm font-medium bg-primary/10 text-primary border-primary/20 animate-fade-in">
              🚀 Updated for {new Date().getFullYear()}: The #1 All-in-One AI Platform
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Professional AI Writing Tools <br className="hidden md:block" />
              <span className="text-primary">That Actually Work</span>
            </h1>

            {/* Improvement #1: Answer-First AEO Definition Block */}
            <div className="max-w-3xl mx-auto mb-8 text-left md:text-center">
              <p className="text-lg text-foreground/90 leading-relaxed">
                <strong className="text-primary">AI Writer Pros</strong> is an all-in-one content automation platform that combines 
                <strong> 6 specialized AI tools</strong> into a single dashboard. It replaces disjointed subscriptions by offering 
                dedicated engines for <strong>Amazon Affiliate reviews, AI detection bypassing, content repurposing</strong>, 
                and SEO blog writing.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              Save 10+ hours per week on content creation. Generate high-quality, SEO-optimized content that converts, 
              humanize AI text to bypass detection, and repurpose content across all platforms — from one powerful dashboard.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto">
                See All Features
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mb-8 animate-fade-in-up">
              <span className="font-medium text-primary">*2.5M+ words generated this month*</span> • No credit card required
            </p>
          </div>
        </section>

        {/* Trust Bar */}
        <TrustBar stats={trustStats} />

        {/* Tool Showcase Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">AI Writing Tools for Every Need</h2>
              <p className="text-xl text-muted-foreground">From Amazon affiliate marketing to social media management, AI Writer Pros has the specialized AI tools to scale your content creation workflow and drive real results.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Improvement #4: Hub & Spoke Linking (All Card Headers link to pages) */}
              
              {/* Amazon Affiliate Assistant */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <ShoppingCart className="w-12 h-12 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl">
                      <Link to="/amazon-affiliate-extension" className="hover:text-primary transition-colors">Amazon Affiliate Assistant</Link>
                  </CardTitle>
                  <CardDescription className="text-primary font-medium">AI-Powered Product Reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">Generate high-converting Amazon product reviews with AI. Auto-extract product data, create SEO-optimized reviews with pros, cons, comparison tables, and FTC-compliant disclosures.</p>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Auto product data extraction</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> SEO-optimized reviews with pros & cons</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Comparison tables & FAQ builder</li>
                  </ul>
                  <Button variant="ghost" className="group-hover:text-primary pl-0">
                    <Link to="/amazon-affiliate-extension">Learn More</Link> <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              {/* AI Humanizer */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <Shield className="w-12 h-12 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl">
                      <Link to="/ai-humanizer" className="hover:text-primary transition-colors">AI Humanizer</Link>
                  </CardTitle>
                  <CardDescription className="text-primary font-medium">Bypass AI Detection</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">Make AI content undetectable with advanced humanization. Analyze AI patterns, adjust tone and style per industry, and get before/after detection scores — all in one powerful tool.</p>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> AI pattern analyzer with detection score</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Tone, style & industry customization</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Bulk processing & version alternatives</li>
                  </ul>
                  <Button variant="ghost" className="group-hover:text-primary pl-0">
                    <Link to="/ai-humanizer">Learn More</Link> <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              {/* Content Repurposing */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <Share2 className="w-12 h-12 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl">
                      <Link to="/content-repurposing" className="hover:text-primary transition-colors">Content Repurposing</Link>
                  </CardTitle>
                  <CardDescription className="text-primary font-medium">Multi-Format Content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">Turn 1 piece of content into 10+ formats. AI analyzes your content, recommends best formats, customizes per platform, and generates hashtags, visuals, and posting schedules.</p>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Smart content analyzer & format matching</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Platform-specific customization & CTA generator</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Hashtags, scheduling & batch export</li>
                  </ul>
                  <Button variant="ghost" className="group-hover:text-primary pl-0">
                    <Link to="/content-repurposing">Learn More</Link> <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              {/* Email Generator */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <Mail className="w-12 h-12 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl">
                      <Link to="/email-generator" className="hover:text-primary transition-colors">Email Generator</Link>
                  </CardTitle>
                  <CardDescription className="text-primary font-medium">AI-Powered Campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">Create high-converting email campaigns with AI. Generate subject lines, build email sequences, A/B test variations, and optimize for opens and clicks across any audience.</p>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> AI subject line generator & A/B testing</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Multi-step email sequence builder</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Audience targeting & preview scoring</li>
                  </ul>
                  <Button variant="ghost" className="group-hover:text-primary pl-0">
                    <Link to="/email-generator">Learn More</Link> <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              {/* Social Media Suite */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <MessageSquare className="w-12 h-12 text-pink-500 mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl">
                      <Link to="/social-media-suite" className="hover:text-primary transition-colors">Social Media Suite</Link>
                  </CardTitle>
                  <CardDescription className="text-primary font-medium">Multi-Platform Posts</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">Create engaging, platform-optimized social posts for Twitter/X, LinkedIn, Instagram, and Facebook. Generate content ideas, threads, carousels, and hashtag strategies with AI.</p>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Content calendar & idea generator</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Thread & carousel creator</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Hashtag research & engagement hooks</li>
                  </ul>
                  <Button variant="ghost" className="group-hover:text-primary pl-0">
                    <Link to="/social-media-suite">Learn More</Link> <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>

              {/* Blog Content Creator */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <PenTool className="w-12 h-12 text-indigo-500 mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-xl">
                      <Link to="/blog-content-creator" className="hover:text-primary transition-colors">Blog Content Creator</Link>
                  </CardTitle>
                  <CardDescription className="text-primary font-medium">SEO-Optimized Articles</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">Generate SEO-optimized blog posts that rank on Google. AI handles topic research, outlines, section-by-section writing, readability analysis, and keyword optimization.</p>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Topic generator & keyword research</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Outline builder & section-by-section writing</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> SEO analysis & readability scoring</li>
                  </ul>
                  <Button variant="ghost" className="group-hover:text-primary pl-0">
                     <Link to="/blog-content-creator">Learn More</Link> <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
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

        {/* Improvement #3: Competitor Context Block */}
        <div className="max-w-4xl mx-auto mt-8 text-center bg-muted/30 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">AI Writer Pros vs. Jasper and ChatGPT</h3>
          <p className="text-muted-foreground leading-relaxed">
            Unlike <strong>ChatGPT</strong>, which acts as a generalist, AI Writer Pros offers specialized workflows like 
            <strong> FTC-compliant Amazon reviews</strong> and <strong>undetectable content rewriting</strong>. 
            Compared to <strong>Jasper</strong>, we provide the same enterprise-grade quality for 
            <strong> multiple formats</strong> (Email, Social, Blog) at a fraction of the cost.
          </p>
        </div>

        {/* Social Proof Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Trusted by Content Creators Worldwide</h2>
              <p className="text-xl text-muted-foreground">Join thousands of professionals who have scaled their content production with AI Writer Pros</p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
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
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-muted/30 border-none">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="mb-6 italic">"The Amazon Affiliate Assistant has completely transformed my review process. I'm generating 10x more content in half the time. My affiliate income has doubled since switching to AI Writer Pros."</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3">S</div>
                    <div>
                      <div className="font-bold">Sarah Chen</div>
                      <div className="text-sm text-muted-foreground">Affiliate Marketer</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/30 border-none">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="mb-6 italic">"The AI Humanizer is a game-changer. My content passes all detection tools while maintaining perfect quality and readability. It's the only humanizer that actually works consistently."</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3">M</div>
                    <div>
                      <div className="font-bold">Marcus Rodriguez</div>
                      <div className="text-sm text-muted-foreground">Content Creator</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/30 border-none">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="mb-6 italic">"Content repurposing used to take hours. Now I turn one blog post into social media content for the entire week in minutes. AI Writer Pros is the best investment I've made for my business."</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3">L</div>
                    <div>
                      <div className="font-bold">Lisa Thompson</div>
                      <div className="text-sm text-muted-foreground">Social Media Manager</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Company Logos */}
            <div className="mt-20 pt-10 border-t border-muted">
              <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-widest">Used by teams at</p>
              <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <span className="text-xl font-bold flex items-center"><Zap className="mr-2" /> TechCorp</span>
                <span className="text-xl font-bold flex items-center"><TrendingUp className="mr-2" /> MediaFlow</span>
                <span className="text-xl font-bold flex items-center"><PenTool className="mr-2" /> ContentPro</span>
                <span className="text-xl font-bold flex items-center"><FileText className="mr-2" /> WriteWell</span>
                <span className="text-xl font-bold flex items-center"><BarChart3 className="mr-2" /> ScaleUp</span>
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

        {/* Features Preview - Improvement #8: Keyword Rich Headers */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose AI Writer Pros?</h2>
              <p className="text-xl text-muted-foreground">Professional-grade AI tools designed for serious content creators who demand quality, speed, and efficiency.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Instant AI Content Generation</h3>
                <p className="text-muted-foreground">Generate high-quality content in seconds, not hours. Our AI is optimized for speed without compromising quality.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-6">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Bypass AI Detection</h3>
                <p className="text-muted-foreground">Advanced humanization technology ensures your AI content passes all detection tools with 99% success rate.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">SEO Optimized</h3>
                <p className="text-muted-foreground">Every piece of content is optimized for search engines, helping you rank higher and drive more organic traffic.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-6">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Multi-User Team Workflows</h3>
                <p className="text-muted-foreground">Work together with your team, share templates, and maintain consistent brand voice across all content.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 mb-6">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Save 10+ Hours Weekly</h3>
                <p className="text-muted-foreground">Our users report saving an average of 10+ hours per week on content creation and optimization tasks.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
                <p className="text-muted-foreground">Professional-grade content that matches your brand voice and converts readers into customers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection 
          toolName="AI Writer Pros" 
          faqs={faqs}
        />

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
      </main>

      <Footer />
    </div>
  );
}
