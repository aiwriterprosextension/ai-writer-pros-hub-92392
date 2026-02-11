
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chrome, Star, CheckCircle, ArrowRight, Users, TrendingUp, Zap, Copy, ShoppingCart, DollarSign, BarChart3, Target, Briefcase, PenTool, Search, FileText, Award } from "lucide-react";
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
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Amazon Affiliate Review Generator | AI Writer Pros"
        description="Generate SEO-optimized Amazon product reviews and comparison tables that convert. Used by 25,000+ affiliate marketers to increase commissions."
        keywords="amazon affiliate, product review generator, comparison table, affiliate marketing, SEO reviews"
        canonical="https://aiwriterpros.com/amazon-affiliate-extension"
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Amazon Affiliate Assistant",
          applicationCategory: "BusinessApplication",
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "2847", bestRating: "5" },
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800">
              🏆 #1 Amazon Affiliate Tool — 25,000+ Active Users
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Amazon Affiliate Review Generator
              </span>
              <br />
              That Actually Converts
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Stop spending hours writing product reviews. Generate SEO-optimized, conversion-focused Amazon affiliate reviews and comparison tables in seconds — complete with pros/cons, ratings, and buyer recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/auth">Generate My Review Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
            <div className="flex items-center justify-center flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />4.9/5 (2,847 reviews)</div>
              <div className="flex items-center"><Users className="h-4 w-4 mr-1" />25,000+ Users</div>
              <div className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-1" />Free to start</div>
            </div>
          </div>

          {/* Mock Tool */}
          <div className="max-w-5xl mx-auto">
            <MockToolPreview toolName="Amazon Review Generator" dashboardPath="/dashboard/amazon-reviews" gradient="from-amber-500 to-orange-500">
              <div className="space-y-4">
                <Tabs defaultValue="single">
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="single" className="flex-1" disabled>Single Review</TabsTrigger>
                    <TabsTrigger value="compare" className="flex-1" disabled>Compare Products</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="space-y-2">
                  <Label>Product Name</Label>
                  <Input placeholder="e.g. Sony WH-1000XM5 Wireless Headphones" disabled />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select disabled><SelectTrigger><SelectValue placeholder="Electronics" /></SelectTrigger></Select>
                </div>
                <div className="space-y-2">
                  <Label>Key Features (optional)</Label>
                  <Input placeholder="e.g. Noise cancelling, 30h battery..." disabled />
                </div>
                <Button disabled className="w-full" size="lg"><Chrome className="mr-2 h-4 w-4" />Generate Product Review</Button>
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

      <FeaturesGrid
        title="Everything You Need for Affiliate Success"
        subtitle="Professional-grade tools to create content that ranks on Google and converts visitors into buyers."
        features={[
          { icon: TrendingUp, title: "SEO-Optimized Reviews", description: "Content that ranks and converts", bullets: ["Keyword-rich headings", "Meta description generation", "Schema markup ready", "Internal linking suggestions"], gradient: "from-blue-500 to-purple-500" },
          { icon: Star, title: "Smart Comparison Tables", description: "Multi-product side-by-side analysis", bullets: ["Up to 4 products compared", "Feature-by-feature breakdown", "Winner recommendations", "Budget & premium picks"], gradient: "from-green-500 to-teal-500" },
          { icon: ShoppingCart, title: "Conversion Optimization", description: "Content designed to drive sales", bullets: ["Compelling CTAs", "Buyer psychology triggers", "Trust-building language", "Urgency indicators"], gradient: "from-amber-500 to-orange-500" },
          { icon: Search, title: "Keyword Integration", description: "Target the right search terms", bullets: ["Primary keyword focus", "LSI keyword variations", "Natural keyword density", "Question-based headings"], gradient: "from-red-500 to-pink-500" },
          { icon: BarChart3, title: "Structured Formatting", description: "Scannable, reader-friendly layout", bullets: ["Pros & cons format", "Star rating system", "Feature highlight boxes", "Quick verdict section"], gradient: "from-indigo-500 to-blue-500" },
          { icon: Zap, title: "Instant Generation", description: "Reviews in seconds, not hours", bullets: ["8 product categories", "Custom feature inputs", "One-click copy", "Unlimited generations"], gradient: "from-purple-500 to-pink-500" },
        ]}
      />

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
        title="Why AI Writer Pros for Affiliate Reviews?"
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

      <FAQSection
        toolName="the Amazon Affiliate Review Generator"
        faqs={[
          { question: "How does the review generator work?", answer: "Enter the product name, select a category, and optionally add key features. Our AI generates a complete, SEO-optimized product review with pros/cons, ratings, and buyer recommendations." },
          { question: "Can I compare multiple products?", answer: "Yes! Switch to 'Compare Products' mode to compare up to 4 products with a detailed side-by-side comparison table, including a winner pick and budget alternative." },
          { question: "What product categories are supported?", answer: "We support 8 categories: Electronics, Home & Kitchen, Sports & Outdoors, Beauty & Personal Care, Books, Toys & Games, Clothing, and Tools & Home Improvement." },
          { question: "Are the reviews SEO-optimized?", answer: "Absolutely. Every review includes keyword-rich headings, structured formatting, and is designed to rank well on Google for product-related search queries." },
          { question: "Can I add my affiliate links?", answer: "Yes! The generated reviews include natural CTA placement points where you can insert your Amazon affiliate links for maximum click-through rates." },
          { question: "Is there a free tier?", answer: "Yes, you can generate reviews for free. Premium plans unlock comparison tables and advanced features." },
        ]}
      />

      <FinalCTA
        headline="Start Earning More from Amazon Affiliate Marketing"
        subheadline="Join 25,000+ affiliate marketers generating SEO-optimized reviews that convert."
        ctaText="Generate My First Review Free"
        ctaLink="/auth"
        benefits={["SEO-optimized reviews", "Comparison tables", "8 categories", "No credit card required"]}
      />

      <Footer />
    </div>
  );
}
