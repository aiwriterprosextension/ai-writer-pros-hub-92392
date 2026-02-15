import { Navigation } from "@/components/navigation";
import { FromOurBlog } from "@/components/blog/FromOurBlog";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, ArrowRight, Zap, Star, Users, Instagram, Twitter, Linkedin, Facebook, Layers, Target, TrendingUp, Briefcase, ShoppingCart, PenTool, RefreshCw, Copy, Search, Settings, Calendar, Home, ChevronRight, CheckCircle } from "lucide-react";
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

export default function ContentRepurposing() {

  // Define FAQs for Schema Injection
  const faqs = [
    { question: "What content can I repurpose?", answer: "Any text content — blog posts, articles, video transcripts, podcast notes, newsletters, guides, or any written content." },
    { question: "What output formats are available?", answer: "Twitter threads, LinkedIn posts, Instagram captions, Facebook posts, email newsletters, and bullet point summaries." },
    { question: "Can I control the output tone?", answer: "Yes! Choose from Original, Professional, Casual, Humorous, Authoritative, or Inspirational tones." },
    { question: "How long should my input content be?", answer: "Any length works, but 300+ words provide enough material for the AI to generate high-quality repurposed content." },
    { question: "Is there a free tier?", answer: "Yes, you can repurpose content for free. Premium plans unlock advanced tone options and additional features." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <SEOHead 
        title="Content Repurposing Tool - Turn 1 Post Into 10+ | AI Writer Pros"
        description="Transform one piece of content into Twitter threads, LinkedIn posts, Instagram captions, newsletters, and more. 6 output formats with tone control."
        keywords="content repurposing, repurpose content, content recycling, multi-platform content, social media content, Repurpose.io alternative"
        canonical="https://aiwriterpros.com/content-repurposing"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              "name": "Content Repurposing Tool",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "5000", "bestRating": "5" },
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
              "review": [
                {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Kate Williams" },
                    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                    "reviewBody": "We went from publishing on 2 platforms to 5, with less effort than before. Incredible ROI."
                },
                {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Ryan Brooks" },
                    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                    "reviewBody": "I paste my episode transcript and get a full week of social content. Life-changing."
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
            <span className="text-foreground font-medium" aria-current="page">Content Repurposing</span>
        </nav>
      </div>

      <main>
        {/* Hero Section */}
        <section className="relative pt-10 pb-16 md:pt-20 md:pb-24 overflow-hidden">
          <div className="container px-4 mx-auto relative z-10 text-center">
            {/* Freshness Badge - CTR Optimization */}
            <Badge variant="outline" className="mb-6 py-2 px-4 rounded-full text-sm font-medium bg-primary/10 text-primary border-primary/20 animate-fade-in">
              📝 Updated for 2026: Turn 1 Post Into 10+ Formats
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Content Repurposing Tool <br className="hidden md:block" />
              <span className="text-primary">Maximize Every Piece of Content</span>
            </h1>

            {/* ANSWER-FIRST AEO DEFINITION BLOCK */}
            <div className="max-w-3xl mx-auto mb-8 text-left md:text-center">
              <p className="text-lg text-foreground/90 leading-relaxed">
                The <strong className="text-primary">AI Writer Pros Content Repurposing Tool</strong> is a free content recycling engine that transforms 
                a single source (like a blog post or video transcript) into <strong>10+ optimized formats</strong>. 
                It automatically generates <strong>Twitter threads, LinkedIn posts, and Newsletters</strong> while preserving your 
                brand voice, allowing you to scale distribution without writing from scratch.
              </p>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              Stop creating from scratch for every platform. Paste your blog post, article, or any content and transform it into Twitter threads, LinkedIn posts, Instagram captions, email newsletters, and more — with customizable tone settings.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 w-full sm:w-auto">
                Repurpose My Content Now
                <Zap className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                <span className="flex items-center"><Layers className="h-4 w-4 mr-1 text-blue-500" /> 6 Output Formats</span>
                <span className="flex items-center"><Settings className="h-4 w-4 mr-1 text-purple-500" /> Tone Control</span>
                <span className="flex items-center"><Users className="h-4 w-4 mr-1 text-green-500" /> 5,000+ Users</span>
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
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Repurpose Settings
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Original Content</h3>
                    <Textarea 
                        placeholder="Paste your blog post, article, or video transcript here..." 
                        className="min-h-[200px] resize-none border-dashed" 
                        aria-label="Input content to repurpose"
                    />
                    <div className="mt-4 space-y-2">
                      <Label>Output Tone</Label>
                      <Select disabled>
                          <SelectTrigger aria-label="Select tone">
                              <SelectValue placeholder="Keep Original Tone" />
                          </SelectTrigger>
                      </Select>
                    </div>
                    <Button disabled className="w-full mt-6" size="lg">
                        <FileText className="mr-2 h-4 w-4" />Repurpose Content
                    </Button>
                  </div>
                  <div className="p-6 bg-muted/10">
                    <h3 className="text-lg font-semibold mb-4">Repurposed Content</h3>
                    <div className="bg-muted/50 rounded-lg p-4 min-h-[250px] flex items-center justify-center text-muted-foreground">
                      <FileText className="h-12 w-12 opacity-50" />
                    </div>
                  </div>
                </div>
              </MockToolPreview>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <TrustBar stats={[
          { label: "Content Repurposed", value: "400K+", icon: "star" },
          { label: "Active Users", value: "5,000+", icon: "users" },
          { label: "Output Formats", value: "6", icon: "star" },
          { label: "Time Saved Weekly", value: "8+ hrs", icon: "award" },
        ]} />

        <ProblemSolution 
          problems={[
            "Spending hours manually rewriting content for each social platform",
            "Inconsistent messaging when adapting content across channels",
            "Blog posts that get published once and never reach their full audience",
            "Missing platform-specific best practices for each social network",
            "Content calendar gaps because creation takes too long",
          ]}
          solutions={[
            "Generate 6+ content formats from one piece of content in seconds",
            "Consistent messaging with customizable tone across all platforms",
            "Turn every blog post into 10+ pieces of social and email content",
            "AI understands each platform's unique requirements and optimizes accordingly",
            "Fill your content calendar for the entire week in one session",
          ]}
        />

        {/* Renamed to Descriptive Heading for SEO */}
        <FeaturesGrid 
          title="AI-Powered Content Repurposing Suite" 
          subtitle="Smart content analysis, 10 output formats, platform customization, and visual recommendations — all powered by AI."
          features={[
            { icon: Search, title: "Content Analyzer", description: "AI content intelligence", bullets: ["Content type detection", "Key theme extraction", "Format match scoring", "Missing element alerts"], gradient: "from-blue-500 to-blue-600" },
            { icon: Layers, title: "10 Output Formats", description: "Every platform covered", bullets: ["Twitter, LinkedIn, Instagram", "Email, Blog, Video Script", "Podcast, Pinterest, TikTok", "AI match % per format"], gradient: "from-blue-600 to-blue-700" },
            { icon: Settings, title: "Platform Customization", description: "Fine-tuned per format", bullets: ["Thread length controls", "Subject line generators", "Audience targeting", "Hashtag count sliders"], gradient: "from-pink-500 to-rose-500" },
            { icon: RefreshCw, title: "Multi-Length Versions", description: "3 lengths per format", bullets: ["Short (50% length)", "Standard (100%)", "Long (150% deep dive)", "Reading time estimates"], gradient: "from-blue-700 to-blue-800" },
            { icon: Target, title: "CTA & Visual Suggestions", description: "Complete creative direction", bullets: ["6 CTA goal options", "Color palette swatches", "Image generation prompts", "Visual type recommendations"], gradient: "from-green-500 to-teal-500" },
            { icon: Calendar, title: "Scheduling & Export", description: "Plan and distribute", bullets: ["Optimal posting calendar", "Hashtag recommendations", "Batch ZIP download", "Content series creator"], gradient: "from-amber-500 to-orange-500" },
          ]}
        />

        {/* Content Multiplier Visual */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">10x Your Content Output</h2>
                <p className="text-muted-foreground">See how one piece of content transforms into a complete multi-platform strategy.</p>
                {[
                  ["1 Blog Post", "5 Twitter Threads"],
                  ["1 Article", "3 LinkedIn Posts"],
                  ["1 Guide", "1 Email Series"],
                  ["1 Case Study", "10 Social Posts"],
                ].map(([from, to], i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span>{from}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-green-600 dark:text-green-400 font-medium">{to}</span>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl p-8 text-center">
                <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">10x</div>
                <div className="text-muted-foreground mb-4">More content from each piece</div>
                <div className="text-3xl font-bold mb-2">8+ hrs</div>
                <div className="text-muted-foreground">Saved per week</div>
              </div>
            </div>
          </div>
        </section>

        <HowItWorks 
          steps={[
            { icon: FileText, title: "Paste Your Content", description: "Copy-paste your blog post, article, video transcript, or any existing content." },
            { icon: Layers, title: "Select Formats & Tone", description: "Choose which platforms to target and set the output tone to match your brand." },
            { icon: Copy, title: "Copy & Distribute", description: "Copy each formatted output and paste directly into your platform or scheduler." },
          ]}
          ctaText="Repurpose My Content Now"
          ctaLink="/auth"
        />

        <UseCases 
          title="Perfect for Content-First Teams" 
          cases={[
            { icon: PenTool, title: "Content Marketers", description: "Maximize ROI from every blog post by distributing across all channels.", example: "Turn a 2,000-word guide into 15 social posts" },
            { icon: Briefcase, title: "Marketing Agencies", description: "Scale content operations across multiple client accounts efficiently.", example: "Repurpose client content into 6 formats in minutes" },
            { icon: ShoppingCart, title: "E-Commerce Brands", description: "Turn product descriptions into social posts, email blurbs, and more.", example: "Transform product launch blogs into multi-channel campaigns" },
            { icon: Target, title: "Podcasters & YouTubers", description: "Convert transcripts into written content for every platform.", example: "Turn a 30-min podcast into a week of social content" },
            { icon: Users, title: "Solopreneurs", description: "Maintain presence on 5+ platforms without a content team.", example: "Be everywhere without being overwhelmed" },
            { icon: TrendingUp, title: "Newsletter Writers", description: "Repurpose newsletter editions into social media posts and threads.", example: "Turn each newsletter into 10 social posts automatically" },
          ]}
        />

        <Testimonials 
          testimonials={[
            { name: "Kate Williams", title: "Content Marketing Lead", rating: 5, quote: "We went from publishing on 2 platforms to 5, with less effort than before. Incredible ROI.", metric: "5 platforms, less effort" },
            { name: "Ryan Brooks", title: "Podcaster", rating: 5, quote: "I paste my episode transcript and get a full week of social content. Life-changing.", metric: "1 episode = 1 week of content" },
            { name: "Diana Cruz", title: "Agency Content Director", rating: 5, quote: "Managing 8 client accounts with content repurposing saves us 30+ hours weekly.", metric: "30+ hours saved weekly" },
            { name: "James Foster", title: "Startup CMO", rating: 5, quote: "We maintain presence on 5 platforms with a 2-person marketing team. This tool is the secret.", metric: "5 platforms, 2 people" },
            { name: "Priya Sharma", title: "Newsletter Writer", rating: 4, quote: "Each newsletter now generates 10+ social posts automatically. My reach has tripled.", metric: "3x reach increase" },
            { name: "Mike O'Brien", title: "YouTuber", rating: 5, quote: "Video transcripts turn into perfect blog posts and social content. Saves me 10 hours weekly.", metric: "10 hours saved weekly" },
          ]}
        />

        <ComparisonTable 
          title="Why Choose AI Writer Pros for Content Repurposing?" 
          ourName="AI Writer Pros" 
          competitor1Name="Repurpose.io" 
          competitor2Name="ChatGPT" 
          rows={[
            { feature: "6 output formats", us: true, competitor1: true, competitor2: false },
            { feature: "Tone customization", us: true, competitor1: false, competitor2: false },
            { feature: "Platform-specific optimization", us: true, competitor1: true, competitor2: false },
            { feature: "Word count display", us: true, competitor1: false, competitor2: false },
            { feature: "Instant generation", us: true, competitor1: true, competitor2: true },
            { feature: "Free tier", us: true, competitor1: false, competitor2: true },
          ]}
        />

        {/* COMPETITOR CONTEXT BLOCK FOR SEO RANKING */}
        <div className="max-w-4xl mx-auto mt-8 text-center bg-muted/30 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">AI Writer Pros vs. Repurpose.io and ChatGPT</h3>
          <p className="text-muted-foreground leading-relaxed">
            While <strong>ChatGPT</strong> requires manual prompting for every format, AI Writer Pros acts as a specialized 
            <strong>content multiplier</strong> that generates 10+ assets instantly. Unlike <strong>Repurpose.io</strong>, which focuses heavily on video, 
            we specialize in high-quality <strong>text transformation</strong>, preserving your unique brand voice across Twitter, LinkedIn, and Email.
          </p>
        </div>

        {/* Internal Linking Block */}
        <div className="container mx-auto px-4 text-center py-12">
            <p className="text-muted-foreground">
                Want to create new content from scratch? Try our <Link to="/blog-content-creator" className="text-primary hover:underline">Blog Content Creator</Link> or promote your repurpose content with our <Link to="/social-media-suite" className="text-primary hover:underline">Social Media Suite</Link>.
            </p>
        </div>

        <FAQSection 
          toolName="the Content Repurposing Tool" 
          faqs={faqs}
        />

        <FromOurBlog 
          postIds={["ai-content-strategy-playbook", "ai-social-media-strategy", "ai-writing-best-practices"]}
          heading="Content Strategy Resources"
        />

        <FinalCTA 
          headline="Turn Every Piece of Content Into 10+" 
          subheadline="Join 5,000+ content creators maximizing their output with AI-powered repurposing." 
          ctaText="Start Repurposing Free" 
          ctaLink="/auth" 
          benefits={["6 output formats", "Tone control", "No credit card required", "Instant results"]}
        />
        
        {/* Experience Signal Text Block for E-E-A-T */}
        <div className="text-center pb-12 text-sm text-muted-foreground">
             <p>Trusted by <strong>5,000+ active users</strong> who have repurposed over <strong>400,000 pieces of content</strong> to save an average of 8+ hours weekly.</p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
