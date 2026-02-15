import { Navigation } from "@/components/navigation";
import { FromOurBlog } from "@/components/blog/FromOurBlog";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PenTool, Users, Star, Zap, Search, TrendingUp, Download, FileText, BarChart3, Target, Briefcase, BookOpen, GraduationCap, Home, ChevronRight, CheckCircle } from "lucide-react";
import { SEOHead } from "@/components/landing/SEOHead";
import { TrustBar } from "@/components/landing/TrustBar";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { UseCases } from "@/components/landing/UseCases";
import { Testimonials } from "@/components/landing/Testimonials";
import { ComparisonTable } from "@/components/landing/ComparisonTable";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { MockToolPreview } from "@/components/landing/MockToolPreview";

export default function BlogContentCreator() {

  // Define FAQs for Schema Injection
  const faqs = [
    { question: "How long are the generated articles?", answer: "Choose from ~800, ~1,500, ~2,500, or ~4,000-word articles. Our AI generates comprehensive, well-structured content at any length." },
    { question: "Is the content SEO-optimized?", answer: "Yes! Every article includes keyword integration, proper heading hierarchy (H1-H3), meta descriptions, and readability scoring for maximum search engine performance." },
    { question: "Can I export the content?", answer: "Absolutely! Export to Markdown (.md), HTML (.html), or copy directly to clipboard. Perfect for any CMS or publishing platform." },
    { question: "What readability metrics are provided?", answer: "We provide Flesch reading score, grade level, average sentence length, and keyword density — all calculated in real-time." },
    { question: "What tones are available?", answer: "Choose from Informative, Conversational, Authoritative, Beginner-Friendly, or Technical to match your content strategy." },
    { question: "Is there a free tier?", answer: "Yes, you can generate blog posts for free. Premium plans unlock longer articles and advanced features." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <SEOHead 
        title="AI Blog Content Creator - SEO Articles That Rank | AI Writer Pros"
        description="Generate comprehensive, SEO-optimized blog posts with readability scores, keyword optimization, and export to Markdown or HTML. Articles up to 4,000 words."
        keywords="blog content creator, AI blog writer, SEO article generator, blog post generator, content writing tool, Jasper alternative"
        canonical="https://aiwriterpros.com/blog-content-creator"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              "name": "AI Blog Content Creator",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "15000", "bestRating": "5" },
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
              "review": [
                {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Michael Torres" },
                    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                    "reviewBody": "Our blog traffic increased 180% in 4 months using AI-generated articles as our starting point."
                },
                {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Amanda Reeves" },
                    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                    "reviewBody": "The readability scores help us maintain consistent quality across our 30-article monthly output."
                }
              ]
            },
            {
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            }
          ]
        }}
      />
      
      <Navigation />

      {/* Breadcrumb Navigation - SEO Structure Improvement */}
      <div className="container mx-auto px-4 py-4">
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors flex items-center"><Home className="w-3 h-3 mr-1"/> Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium" aria-current="page">Blog Creator</span>
        </nav>
      </div>

      <main>
        {/* Hero Section */}
        <section className="relative pt-10 pb-16 md:pt-20 md:pb-24 overflow-hidden">
          <div className="container px-4 mx-auto relative z-10 text-center">
            {/* Freshness Badge - CTR Optimization */}
            <Badge variant="outline" className="mb-6 py-2 px-4 rounded-full text-sm font-medium bg-primary/10 text-primary border-primary/20 animate-fade-in">
              📚 Updated for 2026: Write Articles That Rank on Google
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              AI Blog Content Creator <br className="hidden md:block" />
              <span className="text-primary">Publish Articles That Rank & Convert</span>
            </h1>

            {/* ANSWER-FIRST AEO DEFINITION BLOCK */}
            <div className="max-w-3xl mx-auto mb-8 text-left md:text-center">
              <p className="text-lg text-foreground/90 leading-relaxed">
                The <strong className="text-primary">AI Writer Pros Blog Content Creator</strong> is a free SEO writing assistant that generates 
                <strong> rank-ready articles</strong> complete with real-time <strong>readability scoring</strong> and keyword density tracking. 
                Unlike standard AI writers, it structures content with proper H1-H3 hierarchy and exports clean <strong>Markdown or HTML</strong> code 
                for immediate publishing on any CMS.
              </p>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              Generate comprehensive, SEO-optimized blog posts with built-in readability analysis, keyword density tracking, and one-click export to Markdown or HTML. From 800-word posts to 4,000-word pillar content.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 w-full sm:w-auto">
                Generate My Blog Post Now
                <Zap className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                <span className="flex items-center"><CheckCircle className="h-4 w-4 mr-1 text-green-500" /> SEO Optimized</span>
                <span className="flex items-center"><BarChart3 className="h-4 w-4 mr-1 text-blue-500" /> Readability Score</span>
                <span className="flex items-center"><Download className="h-4 w-4 mr-1 text-purple-500" /> MD & HTML Export</span>
              </div>
            </div>

            {/* Mock Tool Preview */}
            <div className="max-w-5xl mx-auto relative animate-fade-in-up delay-200">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-20"></div>
              <MockToolPreview className="relative bg-card border shadow-2xl rounded-xl overflow-hidden">
                <div className="p-4 border-b bg-muted/30 flex justify-between items-center">
                   <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Article Settings
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x">
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                        <Label>Blog Post Topic</Label>
                        {/* Added ARIA Label */}
                        <Input placeholder="e.g., The Future of AI in Marketing" aria-label="Enter blog topic" />
                    </div>
                    <div className="space-y-2">
                        <Label>Target Keywords</Label>
                        <Input placeholder="e.g., ai marketing, automation, 2026 trends" aria-label="Enter target keywords" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Word Count</Label>
                            <Select defaultValue="1500">
                                <SelectTrigger aria-label="Select word count"><SelectValue /></SelectTrigger>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Tone</Label>
                            <Select defaultValue="authoritative">
                                <SelectTrigger aria-label="Select tone"><SelectValue /></SelectTrigger>
                            </Select>
                        </div>
                    </div>
                    <Button className="w-full mt-2" size="lg">Generate Blog Post <Zap className="ml-2 h-4 w-4" /></Button>
                  </div>
                  <div className="p-6 bg-muted/10">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold flex items-center"><FileText className="h-4 w-4 mr-2" /> Generated Article</h3>
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Score: 92/100</Badge>
                    </div>
                    <div className="space-y-3 opacity-50">
                        <div className="h-6 bg-muted rounded w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-full"></div>
                        <div className="h-4 bg-muted rounded w-full"></div>
                        <div className="h-4 bg-muted rounded w-5/6"></div>
                        <div className="h-20 bg-muted rounded w-full mt-4"></div>
                    </div>
                  </div>
                </div>
              </MockToolPreview>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <TrustBar stats={[
          { label: "Articles Generated", value: "600K+", icon: "star" },
          { label: "Active Users", value: "15,000+", icon: "users" },
          { label: "Avg. Ranking Improvement", value: "+12 positions", icon: "award" },
          { label: "Export Formats", value: "3", icon: "star" },
        ]} />

        <ProblemSolution 
          problems={[
            "Hours spent researching and writing a single blog post",
            "Articles that don't rank because SEO optimization is an afterthought",
            "No way to measure readability or keyword density during writing",
            "Inconsistent quality across articles and team members",
            "Manual formatting for different CMS platforms is tedious",
          ]}
          solutions={[
            "Generate complete articles from 800 to 4,000 words in seconds",
            "Built-in keyword targeting and SEO structure from the start",
            "Real-time Flesch readability score and keyword density tracking",
            "Consistent quality with 5 tone presets for any content strategy",
            "One-click export to Markdown or HTML for any CMS",
          ]}
        />

        {/* Renamed to Descriptive Heading for SEO */}
        <FeaturesGrid 
          title="Everything You Need to Rank on Google" 
          subtitle="AI-powered topic research, keyword analysis, outline building, SEO scoring, and multi-format export."
          features={[
            { icon: Search, title: "AI Topic & Keyword Research", description: "Smart content discovery", bullets: ["10 trending topics per niche", "3-tier keyword research", "Volume & difficulty scores", "Long-tail variations"], gradient: "from-green-500 to-teal-500" },
            { icon: PenTool, title: "Outline & Section Builder", description: "Progressive article creation", bullets: ["Interactive outline editor", "Section-by-section mode", "Drag-to-reorder sections", "Progress tracking"], gradient: "from-blue-500 to-purple-500" },
            { icon: BarChart3, title: "SEO & Readability Dashboard", description: "Real-time content scoring", bullets: ["SEO score (1-100)", "Flesch-Kincaid grading", "Keyword density tracking", "Meta description generator"], gradient: "from-amber-500 to-orange-500" },
            { icon: Target, title: "8 Tones & Audience Profiling", description: "Precision targeting", bullets: ["8 expanded tone options", "Reader persona generator", "Content purpose optimizer", "Per-section tone mixing"], gradient: "from-red-500 to-pink-500" },
            { icon: Download, title: "Editor & Multi-Format Export", description: "Built-in content editing", bullets: ["Rich text editor", "AI rewrite actions", "5 export formats", "Fact-checking assistant"], gradient: "from-indigo-500 to-blue-500" },
            { icon: FileText, title: "Visual & Repurposing", description: "Complete content workflow", bullets: ["Visual placement suggestions", "Image prompt generation", "One-click repurposing", "Content series creation"], gradient: "from-purple-500 to-pink-500" },
          ]}
        />

        {/* Internal Linking Block */}
        <div className="container mx-auto px-4 text-center pb-12">
             <p className="text-muted-foreground">
                 Worried about AI detection? Run your article through our <Link to="/ai-humanizer" className="text-primary hover:underline">AI Humanizer</Link> before publishing, or promote it using our <Link to="/social-media-suite" className="text-primary hover:underline">Social Media Generator</Link>.
             </p>
        </div>

        <HowItWorks 
          steps={[
            { icon: PenTool, title: "Enter Your Topic", description: "Type your blog topic and add target keywords. Choose word count and tone for your article." },
            { icon: Zap, title: "AI Writes Your Article", description: "Our AI generates a complete, SEO-optimized article with headings, meta descriptions, and readability scoring." },
            { icon: Download, title: "Export & Publish", description: "Export to Markdown, HTML, or copy to clipboard. Paste into your CMS and publish." },
          ]}
          ctaText="Write My Blog Post"
          ctaLink="/auth"
        />

        <UseCases 
          title="Who Uses the Blog Content Creator?" 
          subtitle="From freelancers to enterprise teams, everyone writes faster with AI Writer Pros."
          cases={[
            { icon: Target, title: "SEO Professionals", description: "Keyword-optimized articles that climb search rankings fast.", example: "Rank for competitive keywords with 2,500-word pillar content" },
            { icon: Briefcase, title: "Marketing Teams", description: "Consistent blog output without burning out your writers.", example: "Publish 20 articles per month with 3-person team" },
            { icon: BookOpen, title: "Bloggers", description: "High-quality content that keeps readers engaged and coming back.", example: "Generate a week's worth of posts in one sitting" },
            { icon: GraduationCap, title: "Thought Leaders", description: "Authoritative long-form content that establishes expertise.", example: "Create 4,000-word guides that position you as the expert" },
            { icon: Users, title: "Freelance Writers", description: "Speed up your workflow while maintaining quality standards.", example: "Deliver 3x more articles to clients each month" },
            { icon: TrendingUp, title: "Startup Founders", description: "Build organic traffic with consistent, SEO-driven blog content.", example: "10x your organic traffic in 6 months" },
          ]}
        />

        <Testimonials 
          heading="Trusted by 15,000+ Writers" 
          testimonials={[
            { name: "Michael Torres", title: "SEO Director", rating: 5, quote: "Our blog traffic increased 180% in 4 months using AI-generated articles as our starting point.", metric: "180% traffic increase" },
            { name: "Amanda Reeves", title: "Content Marketing Manager", rating: 5, quote: "The readability scores help us maintain consistent quality across our 30-article monthly output.", metric: "30 articles/month" },
            { name: "Chris Patel", title: "Freelance Blogger", rating: 5, quote: "I went from 5 articles a week to 15. The Markdown export saves me another hour per article.", metric: "3x article output" },
            { name: "Laura Nguyen", title: "Startup CEO", rating: 5, quote: "We built our entire content strategy with this tool. Organic traffic is now our #1 lead source.", metric: "#1 lead source" },
            { name: "David Kim", title: "Agency Content Director", rating: 5, quote: "Managing 10 client blogs is now feasible with a 3-person team. Quality stays consistently high.", metric: "10 client blogs managed" },
            { name: "Emily Watson", title: "Technical Writer", rating: 4, quote: "The technical tone option produces surprisingly accurate content. Minimal editing needed.", metric: "80% less editing time" },
          ]}
        />

        <ComparisonTable 
          title="Why AI Writer Pros Beats Generic AI" 
          ourName="AI Writer Pros" 
          competitor1Name="Jasper" 
          competitor2Name="ChatGPT" 
          rows={[
            { feature: "Built-in readability scoring", us: true, competitor1: false, competitor2: false },
            { feature: "Keyword density tracking", us: true, competitor1: true, competitor2: false },
            { feature: "Markdown & HTML export", us: true, competitor1: false, competitor2: false },
            { feature: "5 tone presets", us: true, competitor1: true, competitor2: false },
            { feature: "Up to 4,000 words", us: true, competitor1: true, competitor2: true },
            { feature: "Free tier", us: true, competitor1: false, competitor2: true },
            { feature: "Generation speed", us: "< 30 sec", competitor1: "30-60 sec", competitor2: "1-3 min" },
          ]}
        />

        {/* COMPETITOR CONTEXT BLOCK FOR SEO RANKING */}
        <div className="max-w-4xl mx-auto mt-8 text-center bg-muted/30 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">AI Writer Pros vs. Jasper and ChatGPT</h3>
          <p className="text-muted-foreground leading-relaxed">
            While <strong>ChatGPT</strong> generates generic text blocks, AI Writer Pros provides a structured <strong>SEO workflow</strong> with 
            real-time <strong>readability scoring</strong> and <strong>keyword density analysis</strong>. Unlike <strong>Jasper</strong>, 
            which charges heavily per word, our tool offers a generous free tier and specific features for <strong>long-form pillar content</strong> up to 4,000 words.
          </p>
        </div>

        <FAQSection 
          toolName="the Blog Content Creator" 
          faqs={faqs}
        />

        <FromOurBlog 
          postIds={["ai-for-blog-writing", "ai-writing-prompts-tips-techniques", "edit-ai-content-checklist"]}
          heading="Blog Writing Resources"
        />

        <FinalCTA 
          headline="Start Publishing SEO-Optimized Blog Content Today" 
          subheadline="Join 15,000+ content creators producing articles that rank and convert." 
          ctaText="Generate My First Blog Post Free" 
          ctaLink="/auth" 
          benefits={["SEO optimized", "Readability scoring", "Export to MD/HTML", "No credit card required"]}
        />

        {/* Experience Signal Text Block for E-E-A-T */}
        <div className="text-center pb-12 text-sm text-muted-foreground">
             <p>Trusted by <strong>15,000+ active users</strong> who have generated over <strong>600,000 articles</strong> to improve search rankings by an average of 12 positions.</p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
