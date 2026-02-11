
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PenTool, Users, Star, Zap, Search, TrendingUp, Download, FileText, BarChart3, Target, Briefcase, BookOpen, GraduationCap } from "lucide-react";
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
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="AI Blog Content Creator - SEO Articles That Rank | AI Writer Pros"
        description="Generate comprehensive, SEO-optimized blog posts with readability scores, keyword optimization, and export to Markdown or HTML. Articles up to 4,000 words."
        keywords="blog content creator, AI blog writer, SEO article generator, blog post generator, content writing tool"
        canonical="https://aiwriterpros.com/blog-content-creator"
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800">
              📚 SEO-Optimized Blog Articles That Rank on Google
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AI Blog Content Creator</span>
              <br />Publish Articles That Rank & Convert
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Generate comprehensive, SEO-optimized blog posts with built-in readability analysis, keyword density tracking, and one-click export to Markdown or HTML. From 800-word posts to 4,000-word pillar content — all optimized for search engines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/auth">Generate My Blog Post Now <PenTool className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
            <div className="flex items-center justify-center flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center"><Search className="h-4 w-4 text-indigo-600 mr-2" />SEO Optimized</div>
              <div className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-2 fill-yellow-500" />Readability Score</div>
              <div className="flex items-center"><Download className="h-4 w-4 mr-2" />MD & HTML Export</div>
            </div>
          </div>

          {/* Mock Tool */}
          <div className="max-w-6xl mx-auto">
            <MockToolPreview toolName="Blog Content Creator" dashboardPath="/dashboard/blog-creator" gradient="from-indigo-500 to-purple-500">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center"><PenTool className="h-5 w-5 mr-2 text-indigo-500" />Article Settings</h3>
                  <div className="space-y-2">
                    <Label>Blog Post Topic</Label>
                    <Input placeholder="e.g. Best practices for remote team management..." disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Target Keywords</Label>
                    <Input placeholder="e.g. remote work, productivity..." disabled />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Word Count</Label>
                      <Select disabled><SelectTrigger><SelectValue placeholder="~1,500 words" /></SelectTrigger></Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Tone</Label>
                      <Select disabled><SelectTrigger><SelectValue placeholder="Informative" /></SelectTrigger></Select>
                    </div>
                  </div>
                  <Button disabled className="w-full" size="lg"><PenTool className="mr-2 h-4 w-4" />Generate Blog Post</Button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Generated Article</h3>
                  <div className="bg-muted/50 rounded-lg p-4 min-h-[250px] flex items-center justify-center text-muted-foreground">
                    <PenTool className="h-12 w-12 opacity-50" />
                  </div>
                </div>
              </div>
            </MockToolPreview>
          </div>
        </div>
      </section>

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

      <FeaturesGrid
        title="Complete Blog Creation Suite"
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
        title="Why Choose AI Writer Pros for Blog Content?"
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

      <FAQSection
        toolName="the Blog Content Creator"
        faqs={[
          { question: "How long are the generated articles?", answer: "Choose from ~800, ~1,500, ~2,500, or ~4,000-word articles. Our AI generates comprehensive, well-structured content at any length." },
          { question: "Is the content SEO-optimized?", answer: "Yes! Every article includes keyword integration, proper heading hierarchy (H1-H3), meta descriptions, and readability scoring for maximum search engine performance." },
          { question: "Can I export the content?", answer: "Absolutely! Export to Markdown (.md), HTML (.html), or copy directly to clipboard. Perfect for any CMS or publishing platform." },
          { question: "What readability metrics are provided?", answer: "We provide Flesch reading score, grade level, average sentence length, and keyword density — all calculated in real-time." },
          { question: "What tones are available?", answer: "Choose from Informative, Conversational, Authoritative, Beginner-Friendly, or Technical to match your content strategy." },
          { question: "Is there a free tier?", answer: "Yes, you can generate blog posts for free. Premium plans unlock longer articles and advanced features." },
        ]}
      />

      <FinalCTA
        headline="Start Publishing SEO-Optimized Blog Content Today"
        subheadline="Join 15,000+ content creators producing articles that rank and convert."
        ctaText="Generate My First Blog Post Free"
        ctaLink="/auth"
        benefits={["SEO optimized", "Readability scoring", "Export to MD/HTML", "No credit card required"]}
      />

      <Footer />
    </div>
  );
}
