import { Navigation } from "@/components/navigation";
import { FromOurBlog } from "@/components/blog/FromOurBlog";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chrome, Star, CheckCircle, ArrowRight, Users, TrendingUp, Zap, Copy, ShoppingCart, DollarSign, BarChart3, Target, Briefcase, PenTool, Search, FileText, Award, Home, ChevronRight, Layers } from "lucide-react";
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
import { Link } from "react-router-dom";

export default function AmazonAffiliateExtension() {

  // Define FAQs for Schema Injection
  const faqs = [
    { question: "How does the review generator work?", answer: "Enter the product name, select a category, and optionally add key features. Our AI generates a complete, SEO-optimized product review with pros/cons, ratings, and buyer recommendations." },
    { question: "Can I compare multiple products?", answer: "Yes! Switch to 'Compare Products' mode to compare up to 4 products with a detailed side-by-side comparison table, including a winner pick and budget alternative." },
    { question: "What product categories are supported?", answer: "We support 8 categories: Electronics, Home & Kitchen, Sports & Outdoors, Beauty & Personal Care, Books, Toys & Games, Clothing, and Tools & Home Improvement." },
    { question: "Are the reviews SEO-optimized?", answer: "Absolutely. Every review includes keyword-rich headings, structured formatting, and is designed to rank well on Google for product-related search queries." },
    { question: "Can I add my affiliate links?", answer: "Yes! The generated reviews include natural CTA placement points where you can insert your Amazon affiliate links for maximum click-through rates." },
    { question: "Is there a free tier?", answer: "Yes, you can generate reviews for free. Premium plans unlock comparison tables and advanced features." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <SEOHead 
        title="Amazon Affiliate Review Generator | AI Writer Pros"
        description="Generate SEO-optimized Amazon product reviews and comparison tables that convert. Used by 25,000+ affiliate marketers to increase commissions."
        keywords="amazon affiliate, product review generator, comparison table, affiliate marketing, SEO reviews, Jasper alternative"
        canonical="https://aiwriterpros.com/amazon-affiliate-extension"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              "name": "Amazon Affiliate Assistant",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "2847", "bestRating": "5" },
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
              "review": [
                {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Marcus Williams" },
                    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                    "reviewBody": "My affiliate income went from $200/month to $3,400/month after scaling my review output with this tool."
                },
                {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Samantha Brown" },
                    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                    "reviewBody": "My click-through rate increased by 85% after switching to AI-generated reviews with better CTAs."
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
            <span className="text-foreground font-medium" aria-current="page">Amazon Affiliate Generator</span>
        </nav>
      </div>

      <main>
        {/* Hero Section */}
        <section className="relative pt-10 pb-16 md:pt-20 md:pb-24 overflow-hidden">
          <div className="container px-4 mx-auto relative z-10 text-center">
            {/* Freshness Badge - CTR Optimization */}
            <Badge variant="outline" className="mb-6 py-2 px-4 rounded-full text-sm font-medium bg-primary/10 text-primary border-primary/20 animate-fade-in">
              🏆 Updated for 2026: #1 Amazon Affiliate Tool
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Amazon Affiliate Review Generator <br className="hidden md:block" />
              <span className="text-primary">That Actually Converts</span>
            </h1>

            {/* ANSWER-FIRST AEO DEFINITION BLOCK */}
            <div className="max-w-3xl mx-auto mb-8 text-left md:text-center">
              <p className="text-lg text-foreground/90 leading-relaxed">
                The <strong className="text-primary">Amazon Affiliate Review Generator</strong> is a free AI tool that creates 
                <strong> SEO-optimized product reviews</strong> and <strong>comparison tables</strong> for affiliate marketers. 
                Unlike generic writers, it automatically structures content with pros/cons, winner badges, and FTC-compliant 
                disclosures to maximize conversion rates.
              </p>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              Stop spending hours writing product reviews. Generate SEO-optimized, conversion-focused Amazon affiliate reviews and comparison tables in seconds — complete with pros/cons, ratings, and buyer recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 w-full sm:w-auto">
                Generate My Review Now
                <Zap className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                <span className="flex items-center"><Star className="h-4 w-4 mr-1 text-yellow-500" /> 4.9/5 (2,847 reviews)</span>
                <span className="flex items-center"><Users className="h-4 w-4 mr-1 text-blue-500" /> 25,000+ Users</span>
                <span className="flex items-center"><CheckCircle className="h-4 w-4 mr-1 text-green-500" /> Free to start</span>
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
                  <Tabs defaultValue="single" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="single">Single Review</TabsTrigger>
                      <TabsTrigger value="compare">Compare Products</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="p-6 md:p-8 grid gap-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="product-name">Product Name</Label>
                        {/* Added ARIA Label for SEO/Accessibility */}
                        <Input id="product-name" placeholder="e.g. Sony WH-1000XM5 Headphones" aria-label="Enter product name for review" />
                      </div>
                      <div className="space-y-2">
                         <Label htmlFor="category">Category</Label>
                         <Select>
                           <SelectTrigger id="category" aria-label="Select product category">
                             <SelectValue placeholder="Select Category" />
                           </SelectTrigger>
                         </Select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="features">Key Features (optional)</Label>
                        <Input id="features" placeholder="e.g. Noise canceling, 30hr battery" aria-label="Enter key product features" />
                      </div>
                      <Button className="w-full mt-8" size="lg">Generate Product Review <Zap className="ml-2 h-4 w-4" /></Button>
                    </div>
                  </div>
                </div>
              </MockToolPreview>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <TrustBar stats={[
          { label: "Active Users", value: "25,000+", icon: "users" },
          { label: "Reviews Generated", value: "1.2M+", icon: "star" },
          { label: "Avg. Rating", value: "4.9/5", icon: "star" },
          { label: "Commission Increase", value: "340%", icon: "award" },
        ]} />

        <ProblemSolution 
          problems={[
            "Spending 3-5 hours writing a single product review that may not even rank",
            "Struggling to create unbiased, comprehensive pros and cons lists",
            "Missing SEO keywords and structured formatting that Google rewards",
            "Can't keep up with the volume of reviews needed to earn significant commissions",
            "Comparison tables take hours to research and format properly",
          ]}
          solutions={[
            "Generate complete, publish-ready product reviews in under 60 seconds",
            "AI-powered balanced pros/cons with specific product insights",
            "Built-in SEO optimization with keyword targeting and schema markup",
            "Produce 10x more reviews without sacrificing quality or accuracy",
            "One-click comparison tables with side-by-side feature analysis",
          ]}
        />

        {/* Renamed to Descriptive Heading for SEO */}
        <FeaturesGrid 
          title="AI Tools for High-Converting Affiliate Reviews" 
          subtitle="AI-powered tools that extract product data, generate buyer personas, build comparisons, and create FTC-compliant reviews."
          features={[
            { icon: Search, title: "Product Data Extractor", description: "Auto-fill from Amazon URL/ASIN", bullets: ["Product info extraction", "Key feature detection", "Category auto-detect", "Price range estimation"], gradient: "from-blue-500 to-purple-500" },
            { icon: Target, title: "Buyer Persona Generator", description: "AI audience profiling", bullets: ["Problem-based targeting", "Price sensitivity matching", "Experience level tuning", "Persona-driven tone"], gradient: "from-green-500 to-teal-500" },
            { icon: Star, title: "Smart Comparison Mode", description: "Up to 4 products compared", bullets: ["Alternative product finder", "Feature comparison tables", "Winner badges system", "Overall recommendations"], gradient: "from-amber-500 to-orange-500" },
            { icon: BarChart3, title: "Review Depth & Balance", description: "Control length and sentiment", bullets: ["3 depth levels (300-1500w)", "Pros/cons balance slider", "SEO keyword optimizer", "Density tracking (1-2%)"], gradient: "from-red-500 to-pink-500" },
            { icon: Award, title: "FAQ & Disclosure Builder", description: "SEO & compliance ready", bullets: ["6-8 buyer FAQs generated", "Featured snippet optimized", "FTC disclosure generator", "3 disclosure tones"], gradient: "from-indigo-500 to-blue-500" },
            { icon: Zap, title: "Authenticity & Scoring", description: "Genuine, trustworthy reviews", bullets: ["Personal touch enhancer", "Testing details weaving", "Review quality scorecard", "SEO & readability metrics"], gradient: "from-purple-500 to-pink-500" },
          ]}
        />

        {/* Internal Linking Block */}
        <div className="container mx-auto px-4 text-center pb-12">
             <p className="text-muted-foreground">
                 Need to promote these reviews? Use our <Link to="/social-media-suite" className="text-primary hover:underline">Social Media Generator</Link> to drive traffic or humanize your content with our <Link to="/ai-humanizer" className="text-primary hover:underline">AI Text Humanizer</Link>.
             </p>
        </div>

        <HowItWorks 
          steps={[
            { icon: PenTool, title: "Enter Product Details", description: "Type the product name, select a category, and add key features you want highlighted in the review." },
            { icon: Zap, title: "AI Generates Review", description: "Our AI creates a comprehensive, SEO-optimized review with pros/cons, ratings, and buyer recommendations." },
            { icon: Copy, title: "Copy & Publish", description: "Copy the review to your blog, add your affiliate links, and start earning commissions." },
          ]}
          ctaText="Generate My First Review"
          ctaLink="/auth"
        />

        <UseCases 
          title="Perfect for Every Affiliate Strategy" 
          subtitle="Whether you're a beginner or earning six figures, our tool adapts to your needs."
          cases={[
            { icon: DollarSign, title: "Niche Site Owners", description: "Build out entire product review sites 10x faster with consistent, high-quality content.", example: "Generate 50 kitchen gadget reviews in a weekend" },
            { icon: TrendingUp, title: "SEO Content Writers", description: "Create reviews that rank on the first page of Google with built-in keyword optimization.", example: "Rank for 'best wireless headphones 2025' queries" },
            { icon: Target, title: "YouTube Reviewers", description: "Use generated reviews as video scripts and blog companion content.", example: "Turn a review into a 10-minute video script" },
            { icon: Briefcase, title: "Marketing Agencies", description: "Scale affiliate content production for multiple clients simultaneously.", example: "Produce 100+ reviews monthly for client portfolios" },
            { icon: ShoppingCart, title: "Comparison Bloggers", description: "Create detailed comparison tables that help readers make informed decisions.", example: "Compare 4 laptops with specs, pros/cons, and verdicts" },
            { icon: Award, title: "New Affiliates", description: "Start earning commissions faster with professional-quality reviews from day one.", example: "Launch an affiliate site with 20 reviews in your first week" },
          ]}
        />

        <Testimonials 
          heading="Trusted by 25,000+ Marketers" 
          testimonials={[
            { name: "Marcus Williams", title: "Niche Site Owner", rating: 5, quote: "My affiliate income went from $200/month to $3,400/month after scaling my review output with this tool.", metric: "$200 → $3,400/month" },
            { name: "Jessica Taylor", title: "Content Writer", rating: 5, quote: "I produce 50+ reviews monthly for my clients. This tool made it possible without sacrificing quality.", metric: "50+ reviews/month" },
            { name: "David Park", title: "Tech Blogger", rating: 5, quote: "The comparison table feature alone saves me 3 hours per article. Readers love the side-by-side format.", metric: "3 hours saved per article" },
            { name: "Samantha Brown", title: "Amazon Associate", rating: 5, quote: "My click-through rate increased by 85% after switching to AI-generated reviews with better CTAs.", metric: "85% higher CTR" },
            { name: "Robert Chen", title: "SEO Specialist", rating: 4, quote: "The SEO optimization is built in. My reviews rank on the first page consistently.", metric: "Page 1 rankings consistently" },
            { name: "Laura Martinez", title: "Lifestyle Blogger", rating: 5, quote: "I review beauty products across 8 categories. This tool understands the nuances of each one.", metric: "8 categories covered" },
          ]}
        />

        <ComparisonTable 
          title="Why We Beat Jasper AI and ChatGPT" 
          ourName="AI Writer Pros" 
          competitor1Name="Jasper AI" 
          competitor2Name="ChatGPT" 
          rows={[
            { feature: "Multi-product comparison tables", us: true, competitor1: false, competitor2: false },
            { feature: "8 product categories", us: true, competitor1: true, competitor2: false },
            { feature: "Winner/budget pick logic", us: true, competitor1: false, competitor2: false },
            { feature: "SEO-optimized structure", us: true, competitor1: true, competitor2: false },
            { feature: "Pros/cons formatting", us: true, competitor1: true, competitor2: false },
            { feature: "Free tier", us: true, competitor1: false, competitor2: true },
            { feature: "Generation speed", us: "< 30 sec", competitor1: "30-60 sec", competitor2: "1-3 min" },
          ]}
        />

        {/* COMPETITOR CONTEXT BLOCK FOR SEO RANKING */}
        <div className="max-w-4xl mx-auto mt-8 text-center bg-muted/30 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">AI Writer Pros vs. Jasper AI and ChatGPT</h3>
          <p className="text-muted-foreground leading-relaxed">
            While <strong>ChatGPT</strong> offers generic text, AI Writer Pros provides 
            <strong>structured comparison tables</strong> and <strong>winner logic</strong> specific to affiliate marketing. 
            Unlike <strong>Jasper AI</strong>, which requires complex prompting, our tool includes built-in 
            <strong>buyer persona targeting</strong> and <strong>FTC disclosure generation</strong> to ensure compliance and higher conversions.
          </p>
        </div>

        <FAQSection 
          toolName="the Amazon Affiliate Review Generator" 
          faqs={faqs}
        />

        <FromOurBlog 
          postIds={["best-ai-writing-tools-2025", "ai-content-strategy-playbook", "google-ai-content-guidelines"]}
          heading="Affiliate Marketing Resources"
        />

        <FinalCTA 
          headline="Start Earning More from Amazon Affiliate Marketing" 
          subheadline="Join 25,000+ affiliate marketers generating SEO-optimized reviews that convert." 
          ctaText="Generate My First Review Free" 
          ctaLink="/auth" 
          benefits={["SEO-optimized reviews", "Comparison tables", "8 categories", "No credit card required"]}
        />

        {/* Experience Signal Text Block for E-E-A-T */}
        <div className="text-center pb-12 text-sm text-muted-foreground">
             <p>Trusted by <strong>25,000+ affiliate marketers</strong> who have generated over <strong>1.2 million reviews</strong> to increase commissions by an average of 340%.</p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
