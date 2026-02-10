import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chrome, Star, CheckCircle, ArrowRight, Users, TrendingUp, Zap, Copy, Plus, X, ShoppingCart, DollarSign, BarChart3, Target, Briefcase, PenTool, Search, FileText, Award } from "lucide-react";
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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

export default function AmazonAffiliateExtension() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("electronics");
  const [features, setFeatures] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<"single" | "compare">("single");
  const [comparisonProducts, setComparisonProducts] = useState<string[]>([""]);
  const { toast } = useToast();
  const toolRef = useRef<HTMLDivElement>(null);

  const scrollToTool = () => toolRef.current?.scrollIntoView({ behavior: "smooth" });

  const addComparisonProduct = () => {
    if (comparisonProducts.length < 3) {
      setComparisonProducts([...comparisonProducts, ""]);
    }
  };

  const removeComparisonProduct = (index: number) => {
    setComparisonProducts(comparisonProducts.filter((_, i) => i !== index));
  };

  const updateComparisonProduct = (index: number, value: string) => {
    const updated = [...comparisonProducts];
    updated[index] = value;
    setComparisonProducts(updated);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResult("");
    try {
      const body: any = { tool: 'amazon', productName, category, features };
      if (mode === "compare") {
        body.comparisonProducts = comparisonProducts.filter(p => p.trim());
      }
      const { data, error } = await supabase.functions.invoke('ai-tools', { body });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data.result || "");
      toast({ title: mode === "compare" ? "Comparison generated!" : "Review generated!", description: "Your content is ready." });
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to generate content", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    toast({ title: "Copied!", description: "Content copied to clipboard." });
  };

  const canGenerate = mode === "single"
    ? !!productName
    : !!productName && comparisonProducts.some(p => p.trim());

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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
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
              <p className="text-xl text-muted-foreground mb-8">
                Stop spending hours writing product reviews. Generate SEO-optimized, conversion-focused Amazon affiliate reviews and comparison tables in seconds — complete with pros/cons, ratings, and buyer recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="text-lg px-8" onClick={scrollToTool}>
                  Generate My Review Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                  <a href="#demo">See Examples</a>
                </Button>
              </div>
              <div className="flex items-center flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />4.9/5 (2,847 reviews)</div>
                <div className="flex items-center"><Users className="h-4 w-4 mr-1" />25,000+ Users</div>
                <div className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-1" />Free to start</div>
              </div>
            </div>

            {/* Review Generator */}
            <div ref={toolRef}>
              <Card className="p-6">
                <Tabs value={mode} onValueChange={(v) => setMode(v as "single" | "compare")}>
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="single" className="flex-1">Single Review</TabsTrigger>
                    <TabsTrigger value="compare" className="flex-1">Compare Products</TabsTrigger>
                  </TabsList>

                  <TabsContent value="single" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Product Name</Label>
                      <Input placeholder="e.g. Sony WH-1000XM5 Wireless Headphones" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="home-kitchen">Home & Kitchen</SelectItem>
                          <SelectItem value="sports-outdoors">Sports & Outdoors</SelectItem>
                          <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                          <SelectItem value="books">Books</SelectItem>
                          <SelectItem value="toys">Toys & Games</SelectItem>
                          <SelectItem value="clothing">Clothing</SelectItem>
                          <SelectItem value="tools">Tools & Home Improvement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Key Features (optional)</Label>
                      <Input placeholder="e.g. Noise cancelling, 30h battery, USB-C..." value={features} onChange={(e) => setFeatures(e.target.value)} />
                    </div>
                  </TabsContent>

                  <TabsContent value="compare" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Product 1 (Primary)</Label>
                      <Input placeholder="e.g. Sony WH-1000XM5" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    </div>
                    {comparisonProducts.map((product, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Product {index + 2}</Label>
                          {comparisonProducts.length > 1 && (
                            <Button variant="ghost" size="sm" onClick={() => removeComparisonProduct(index)}>
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                        <Input placeholder={`e.g. Bose QuietComfort Ultra`} value={product} onChange={(e) => updateComparisonProduct(index, e.target.value)} />
                      </div>
                    ))}
                    {comparisonProducts.length < 3 && (
                      <Button variant="outline" size="sm" onClick={addComparisonProduct} className="w-full">
                        <Plus className="h-3 w-3 mr-1" /> Add Product (max 4 total)
                      </Button>
                    )}
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="home-kitchen">Home & Kitchen</SelectItem>
                          <SelectItem value="sports-outdoors">Sports & Outdoors</SelectItem>
                          <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                          <SelectItem value="books">Books</SelectItem>
                          <SelectItem value="toys">Toys & Games</SelectItem>
                          <SelectItem value="clothing">Clothing</SelectItem>
                          <SelectItem value="tools">Tools & Home Improvement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                </Tabs>

                <Button onClick={handleGenerate} disabled={!canGenerate || isGenerating} className="w-full mt-4" size="lg">
                  {isGenerating ? (
                    <><Zap className="mr-2 h-4 w-4 animate-spin" />Generating {mode === "compare" ? "Comparison" : "Review"}...</>
                  ) : (
                    <><Chrome className="mr-2 h-4 w-4" />{mode === "compare" ? "Generate Comparison Table" : "Generate Product Review"}</>
                  )}
                </Button>
              </Card>
            </div>
          </div>

          {/* Generated Content */}
          {(result || isGenerating) && (
            <div className="mt-12 max-w-5xl mx-auto" id="demo">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-amber-500" />
                    {mode === "compare" ? "Product Comparison" : "Generated Review"}
                  </h3>
                  {result && <Button variant="outline" size="sm" onClick={handleCopy}><Copy className="h-3 w-3 mr-1" /> Copy</Button>}
                </div>
                <div className="bg-muted/50 rounded-lg p-4 max-h-[600px] overflow-y-auto whitespace-pre-wrap text-sm">
                  {isGenerating ? (
                    <div className="animate-pulse text-muted-foreground">
                      {mode === "compare" ? "Building product comparison table..." : "Writing your product review..."}
                    </div>
                  ) : result}
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar stats={[
        { label: "Active Users", value: "25,000+", icon: "users" },
        { label: "Reviews Generated", value: "1.2M+", icon: "star" },
        { label: "Avg. Rating", value: "4.9/5", icon: "star" },
        { label: "Commission Increase", value: "340%", icon: "award" },
      ]} />

      {/* Problem-Solution */}
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

      {/* Features Grid - 6 cards */}
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

      {/* How It Works */}
      <HowItWorks
        steps={[
          { icon: PenTool, title: "Enter Product Details", description: "Type the product name, select a category, and add key features you want highlighted in the review." },
          { icon: Zap, title: "AI Generates Review", description: "Our AI creates a comprehensive, SEO-optimized review with pros/cons, ratings, and buyer recommendations." },
          { icon: Copy, title: "Copy & Publish", description: "Copy the review to your blog, add your affiliate links, and start earning commissions." },
        ]}
        ctaText="Generate My First Review"
        onCtaClick={scrollToTool}
      />

      {/* Use Cases */}
      <UseCases
        title="Perfect for Every Affiliate Strategy"
        subtitle="Whether you're a beginner or earning six figures, our tool adapts to your needs."
        cases={[
          { icon: DollarSign, title: "Niche Site Owners", description: "Build out entire product review sites 10x faster with consistent, high-quality content.", example: "Generate 50 kitchen gadget reviews in a weekend" },
          { icon: TrendingUp, title: "SEO Content Writers", description: "Create reviews that rank on the first page of Google with built-in keyword optimization.", example: "Rank for 'best wireless headphones 2025' queries" },
          { icon: Target, title: "YouTube Reviewers", description: "Use generated reviews as video scripts and blog companion content.", example: "Turn a review into a 10-minute video script" },
          { icon: Briefcase, title: "Marketing Agencies", description: "Scale affiliate content production for multiple clients simultaneously.", example: "Produce 100+ reviews monthly for client portfolios" },
          { icon: ShoppingCart, title: "Comparison Bloggers", description: "Create detailed comparison tables that help readers make informed decisions.", example: "Compare 4 laptops with specs, pros/cons, and verdicts" },
          { icon: FileText, title: "Content Managers", description: "Maintain consistent quality across large content teams and freelancers.", example: "Standardize review format across 20+ writers" },
        ]}
      />

      {/* Testimonials */}
      <Testimonials
        heading="Trusted by 25,000+ Affiliate Marketers"
        testimonials={[
          { name: "Sarah Chen", title: "Niche Site Owner", rating: 5, quote: "I went from publishing 4 reviews a month to 40. My affiliate income tripled in just 3 months.", metric: "300% increase in affiliate revenue" },
          { name: "Marcus Thompson", title: "SEO Content Writer", rating: 5, quote: "The comparison table feature alone is worth it. My readers spend 3x longer on comparison pages.", metric: "3x longer time on page" },
          { name: "Emily Rodriguez", title: "Marketing Agency Owner", rating: 5, quote: "We manage 12 affiliate sites. This tool cut our content production costs by 60% while improving quality.", metric: "60% cost reduction" },
          { name: "David Kim", title: "YouTube Tech Reviewer", rating: 5, quote: "I use the generated reviews as outlines for my video scripts. It's incredibly well-structured.", metric: "2x faster video production" },
          { name: "Lisa Patel", title: "Amazon Associates Top Earner", rating: 5, quote: "The SEO optimization is on point. Three of my reviews hit page 1 within two weeks of publishing.", metric: "Page 1 rankings in 14 days" },
          { name: "James Wilson", title: "Freelance Blogger", rating: 4, quote: "Great starting point for reviews. I add my personal touch and publish in half the time.", metric: "50% faster content creation" },
        ]}
      />

      {/* Comparison Table */}
      <ComparisonTable
        title="Why Choose AI Writer Pros for Amazon Affiliate Content?"
        ourName="AI Writer Pros"
        competitor1Name="Jasper AI"
        competitor2Name="Manual Writing"
        rows={[
          { feature: "Amazon-specific review templates", us: true, competitor1: false, competitor2: false },
          { feature: "Comparison table generation", us: true, competitor1: false, competitor2: true },
          { feature: "SEO optimization built-in", us: true, competitor1: true, competitor2: false },
          { feature: "Pros/cons auto-generation", us: true, competitor1: false, competitor2: true },
          { feature: "Star rating integration", us: true, competitor1: false, competitor2: true },
          { feature: "Time per review", us: "< 60 sec", competitor1: "5-10 min", competitor2: "3-5 hours" },
          { feature: "Free tier available", us: true, competitor1: false, competitor2: true },
          { feature: "8 product categories", us: true, competitor1: true, competitor2: true },
        ]}
      />

      {/* FAQ */}
      <FAQSection
        toolName="the Amazon Affiliate Review Generator"
        faqs={[
          { question: "How does the Amazon Affiliate Review Generator work?", answer: "Simply enter a product name, select a category, and optionally add key features. Our AI analyzes the product and generates a comprehensive, SEO-optimized review with pros/cons, ratings, and a buyer verdict — all in under 60 seconds." },
          { question: "What makes this different from other AI writing tools?", answer: "Unlike general-purpose AI writers, our tool is specifically designed for Amazon affiliate content. It understands product review structure, includes comparison table generation, and optimizes for affiliate conversion — not just readability." },
          { question: "Is the generated content unique and plagiarism-free?", answer: "Yes! Every review is generated fresh and unique. Our AI creates original content tailored to the specific product and features you provide. We recommend adding your personal experience to make it even more authentic." },
          { question: "Can I generate comparison tables for multiple products?", answer: "Absolutely! Use the 'Compare Products' tab to add up to 4 products. The AI generates a detailed comparison table with feature breakdowns, winner recommendations, and budget/premium picks." },
          { question: "Is it free to use?", answer: "Yes, you can start generating reviews for free. Our free tier includes a generous number of daily generations. For unlimited access and advanced features, check our pricing page." },
          { question: "What product categories are supported?", answer: "We support 8 major Amazon categories: Electronics, Home & Kitchen, Sports & Outdoors, Beauty & Personal Care, Books, Toys & Games, Clothing, and Tools & Home Improvement." },
          { question: "How do I add my affiliate links?", answer: "After generating the review, copy the content and paste it into your blog or website. Then simply add your Amazon affiliate links to the product mentions. The review is structured to make link placement easy and natural." },
          { question: "Will the reviews rank on Google?", answer: "Our reviews are optimized with SEO best practices including keyword placement, structured headings, and schema-ready formatting. Many users report page 1 rankings within 2-4 weeks of publishing." },
          { question: "Can I customize the tone and style?", answer: "The generator creates professional, balanced reviews by default. You can edit the output freely to match your brand voice. The key features input also helps guide the AI's focus areas." },
          { question: "How many reviews can I generate per day?", answer: "Free users get a daily generation allowance. Paid plans offer higher limits and priority processing. Check our pricing page for specific plan details." },
          { question: "Does it work for any Amazon product?", answer: "Yes! As long as you provide a product name and select a category, the AI can generate a review for any Amazon product. Adding key features helps produce even more accurate and detailed content." },
          { question: "Is my data secure?", answer: "Absolutely. We don't store your generated content on our servers after you copy it. Your account data is encrypted and protected with enterprise-grade security." },
        ]}
      />

      {/* Final CTA */}
      <FinalCTA
        headline="Start Earning More From Amazon Affiliates Today"
        subheadline="Join 25,000+ affiliate marketers who generate high-converting product reviews in seconds, not hours."
        ctaText="Generate My First Review Free"
        onCtaClick={scrollToTool}
        secondaryCtaText="View Pricing Plans"
        benefits={["Free to start", "No credit card required", "Comparison tables included", "Instant results"]}
      />

      <Footer />
    </div>
  );
}
