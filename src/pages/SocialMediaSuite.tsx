import { Navigation } from "@/components/navigation";
import { FromOurBlog } from "@/components/blog/FromOurBlog";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, CheckCircle, Users, Star, Zap, Copy, Instagram, Twitter, Linkedin, Facebook, Calendar, Hash, TrendingUp, Target, Clock, BarChart3, Briefcase, ShoppingCart, Layers } from "lucide-react";
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

export default function SocialMediaSuite() {
  
  // Define FAQs data for Schema injection
  const faqs = [
    { question: "Which platforms are supported?", answer: "We support Twitter/X (280 chars), LinkedIn (3,000 chars), Instagram (2,200 chars), and Facebook (63,206 chars) with platform-specific optimization." },
    { question: "Does it include hashtag suggestions?", answer: "Yes! Our AI generates relevant, trending hashtags tailored to each platform's algorithm and your specific topic." },
    { question: "Can I generate for multiple platforms at once?", answer: "Absolutely! Select any combination of platforms and generate optimized content for all of them simultaneously." },
    { question: "How does character tracking work?", answer: "Each generated post shows a real-time character count compared to the platform's limit, with warnings if you're over." },
    { question: "What tone options are available?", answer: "Choose from Engaging, Professional, Casual, Humorous, or Inspirational to match your brand voice." },
    { question: "Is there a free tier?", answer: "Yes, you can generate social media posts for free. Premium plans unlock additional features." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <SEOHead 
        title="Social Media Post Generator - AI Content Suite | AI Writer Pros"
        description="Generate optimized social media posts for Twitter, LinkedIn, Instagram & Facebook. Character count tracking, hashtag suggestions, and 5 tone options."
        keywords="social media generator, AI social posts, Instagram caption generator, Twitter thread, LinkedIn post, social media content, Buffer alternative"
        canonical="https://aiwriterpros.com/social-media-suite"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              "name": "Social Media Post Generator",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
              "aggregateRating": { 
                "@type": "AggregateRating", 
                "ratingValue": "4.8", 
                "reviewCount": "12000" 
              }
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

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          <div className="container px-4 mx-auto relative z-10 text-center">
            <Badge variant="outline" className="mb-6 py-2 px-4 rounded-full text-sm font-medium bg-primary/10 text-primary border-primary/20 animate-fade-in">
              📱 Content for Every Platform in One Click
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Social Media Post Generator
            </h1>
            
            {/* ANSWER-FIRST AEO DEFINITION BLOCK */}
            <div className="max-w-3xl mx-auto mb-8 text-left md:text-center">
              <p className="text-lg text-foreground/90 leading-relaxed">
                The <strong className="text-primary">AI Writer Pros Social Media Suite</strong> is a free content generator designed to create 
                <strong> platform-optimized posts</strong> for Twitter, LinkedIn, Instagram, and Facebook simultaneously. 
                Unlike generic writing tools, it includes <strong>real-time character counting</strong>, algorithm-specific 
                hashtag suggestions, and engagement optimization for social media professionals.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              Stop writing posts from scratch. Generate viral content for every platform — all from one topic. With character count tracking, hashtag suggestions, and 5 tone options.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 w-full sm:w-auto">
                Generate My Posts Now
                <Zap className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                <span className="flex items-center"><CheckCircle className="h-4 w-4 mr-1 text-green-500" /> 4 Platforms</span>
                <span className="flex items-center"><Hash className="h-4 w-4 mr-1 text-blue-500" /> Auto Hashtags</span>
                <span className="flex items-center"><BarChart3 className="h-4 w-4 mr-1 text-purple-500" /> Character Tracking</span>
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
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Post Settings
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x">
                  <div className="p-6 space-y-4">
                    <div>
                      <Label className="mb-2 block">Topic / Content Idea</Label>
                      <Input placeholder="e.g., Launching our new summer collection..." />
                    </div>
                    <div>
                      <Label className="mb-2 block">Tone</Label>
                      <Select defaultValue="engaging">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                      </Select>
                    </div>
                    <Button className="w-full mt-2">Generate Posts</Button>
                  </div>
                  <div className="p-6 bg-muted/10">
                    <Label className="mb-4 block flex items-center"><Zap className="h-4 w-4 mr-2 text-primary" /> Generated Posts</Label>
                    <div className="space-y-4">
                        <div className="bg-card p-3 rounded border text-sm">
                            <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground font-bold"><Twitter className="h-3 w-3"/> Twitter/X</div>
                            <div className="h-2 bg-muted rounded w-3/4 mb-2"></div>
                            <div className="h-2 bg-muted rounded w-1/2"></div>
                        </div>
                        <div className="bg-card p-3 rounded border text-sm">
                            <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground font-bold"><Linkedin className="h-3 w-3"/> LinkedIn</div>
                            <div className="h-2 bg-muted rounded w-full mb-2"></div>
                            <div className="h-2 bg-muted rounded w-full mb-2"></div>
                            <div className="h-2 bg-muted rounded w-2/3"></div>
                        </div>
                    </div>
                  </div>
                </div>
              </MockToolPreview>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <TrustBar stats={[
          { label: "Posts Generated", value: "800K+", icon: "star" },
          { label: "Active Users", value: "12,000+", icon: "users" },
          { label: "Platforms", value: "4", icon: "star" },
          { label: "Avg. Engagement Lift", value: "+65%", icon: "award" },
        ]} />

        <ProblemSolution 
          problems={[
            "Spending hours adapting one idea into posts for multiple platforms",
            "Exceeding character limits and having to rewrite from scratch",
            "Missing trending hashtags that could boost your reach",
            "Inconsistent posting because content creation takes too long",
            "Posts feel generic because you're rushing to fill your content calendar",
          ]}
          solutions={[
            "Generate posts for 4 platforms simultaneously from a single topic",
            "Real-time character count tracking per platform — never exceed limits",
            "AI-suggested hashtags tailored to each platform's algorithm",
            "Create a week's worth of content in 15 minutes",
            "5 tone options ensure every post matches your brand personality",
          ]}
        />

        {/* Renamed to Descriptive H2 for SEO */}
        <FeaturesGrid 
          title="Generate Content for 4 Platforms Simultaneously" 
          subtitle="AI-powered content creation with smart hashtag research, engagement optimization, and visual recommendations."
          features={[
            { icon: MessageSquare, title: "Content Idea Generator", description: "10 ideas per business type", bullets: ["Industry-filtered ideas", "Platform recommendations", "Engagement potential scores", "One-click topic fill"], gradient: "from-pink-500 to-rose-500" },
            { icon: Hash, title: "Smart Hashtag Research", description: "Categorized AI research", bullets: ["High-volume (100K+ uses)", "Niche-specific (10K-50K)", "Trending hashtags", "Optimal count per platform"], gradient: "from-blue-500 to-blue-600" },
            { icon: Calendar, title: "Content Calendar & Timing", description: "AI posting schedule", bullets: ["Best day/time per platform", "Weekly calendar view", "Export to ICS", "Platform-specific reasoning"], gradient: "from-blue-600 to-blue-700" },
            { icon: Layers, title: "Thread & Carousel Creator", description: "Multi-format conversion", bullets: ["5-10 tweet threads", "LinkedIn carousel slides", "Character counts per slide", "Hook optimization"], gradient: "from-blue-700 to-blue-800" },
            { icon: Target, title: "Engagement & Formatting", description: "Maximize interaction", bullets: ["Comment-boosting questions", "Poll idea generation", "Strategic emoji placement", "Before/after formatting"], gradient: "from-green-500 to-teal-500" },
            { icon: BarChart3, title: "Visual Recommendations", description: "AI creative direction", bullets: ["Visual type suggestions", "Color palette with hex codes", "Image generation prompts", "Platform-specific output"], gradient: "from-amber-500 to-orange-500" },
          ]}
        />

        {/* Platform Details - Optimized for Every Platform */}
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-12">Optimized for Every Major Network</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                    { icon: Instagram, name: 'Instagram', desc: 'Captions, hashtags, stories (2,200 chars)', colors: 'from-pink-500 to-rose-500' },
                    { icon: Twitter, name: 'Twitter/X', desc: 'Tweets, threads (280 chars/tweet)', colors: 'from-blue-500 to-blue-600' },
                    { icon: Linkedin, name: 'LinkedIn', desc: 'Professional posts (3,000 chars)', colors: 'from-blue-600 to-blue-700' },
                    { icon: Facebook, name: 'Facebook', desc: 'Posts, stories (63,206 chars)', colors: 'from-blue-700 to-blue-800' },
                    ].map(p => (
                        <div key={p.name} className="bg-background p-6 rounded-xl border shadow-sm hover:shadow-md transition-all">
                            <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br ${p.colors} flex items-center justify-center text-white mb-4`}>
                                <p.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">{p.name}</h3>
                            <p className="text-sm text-muted-foreground">{p.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <HowItWorks 
          steps={[
            { icon: MessageSquare, title: "Enter Your Topic", description: "Type your content idea — a product launch, tip, behind-the-scenes, or industry insight." },
            { icon: CheckCircle, title: "Select Platforms & Tone", description: "Choose which platforms to target and the tone that matches your brand." },
            { icon: Copy, title: "Copy & Schedule", description: "Copy each platform-optimized post and paste into your scheduler or publish directly." },
          ]}
          ctaText="Create My Social Posts"
          ctaLink="/auth"
        />

        <UseCases 
          title="Built for Social Media Professionals" 
          subtitle="Scale your content production without sacrificing quality."
          cases={[
            { icon: Briefcase, title: "Marketing Agencies", description: "Manage multiple client accounts efficiently with batch post generation.", example: "Create 20 client posts in under 10 minutes" },
            { icon: ShoppingCart, title: "E-Commerce Brands", description: "Product announcements, seasonal campaigns, and UGC prompts.", example: "Launch a new product across all 4 platforms instantly" },
            { icon: Users, title: "Personal Brands", description: "Build thought leadership with consistent, high-quality content.", example: "Post daily across all platforms without burnout" },
            { icon: Target, title: "Influencers", description: "Engaging captions with trending hashtags for maximum reach.", example: "Generate Instagram captions with 30 relevant hashtags" },
            { icon: Calendar, title: "Content Managers", description: "Fill your content calendar weeks ahead with minimal effort.", example: "Plan a month of social content in one session" },
            { icon: TrendingUp, title: "Startup Founders", description: "Build awareness across platforms without a dedicated social team.", example: "Share your startup story on LinkedIn and Twitter simultaneously" },
          ]}
        />

        <Testimonials 
          heading="Trusted by 12,000+ Creators" 
          testimonials={[
            { name: "Maya Johnson", title: "Social Media Manager", rating: 5, quote: "I manage 8 accounts. This tool cut my content creation time by 75%. Absolute game-changer.", metric: "75% time saved" },
            { name: "Derek Thompson", title: "E-Commerce Brand Owner", rating: 5, quote: "Our Instagram engagement tripled after switching to AI-generated captions with proper hashtags.", metric: "3x Instagram engagement" },
            { name: "Lisa Park", title: "Marketing Agency CEO", rating: 5, quote: "We handle 20 client accounts and produce all social content in under 2 hours daily.", metric: "20 accounts in 2 hours" },
            { name: "Jordan Ellis", title: "LinkedIn Influencer", rating: 5, quote: "My LinkedIn posts consistently get 10x more impressions since using this tool.", metric: "10x more impressions" },
            { name: "Sam Rodriguez", title: "Content Creator", rating: 4, quote: "The character count tracking alone saves me from constant editing. Love the platform-specific output.", metric: "Zero character limit issues" },
            { name: "Amy Zhang", title: "Startup Founder", rating: 5, quote: "Built our social media presence from zero to 50K followers using AI-generated content.", metric: "0 to 50K followers" },
          ]}
        />

        <ComparisonTable 
          title="Why AI Writer Pros Leads the Market" 
          ourName="AI Writer Pros" 
          competitor1Name="Buffer AI" 
          competitor2Name="ChatGPT" 
          rows={[
            { feature: "Multi-platform simultaneous generation", us: true, competitor1: false, competitor2: false },
            { feature: "Real-time character counting", us: true, competitor1: false, competitor2: false },
            { feature: "Platform-specific hashtag suggestions", us: true, competitor1: true, competitor2: false },
            { feature: "Individual post copy buttons", us: true, competitor1: true, competitor2: false },
            { feature: "5 tone presets", us: true, competitor1: false, competitor2: false },
            { feature: "Free tier", us: true, competitor1: true, competitor2: true },
          ]}
        />

        {/* COMPETITOR CONTEXT BLOCK FOR SEO RANKING */}
        <div className="max-w-4xl mx-auto mt-8 text-center bg-muted/30 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">AI Writer Pros vs. Buffer and ChatGPT</h3>
          <p className="text-muted-foreground leading-relaxed">
            While <strong>ChatGPT</strong> provides generic text, AI Writer Pros offers 
            <strong>real-time character tracking</strong> and <strong>simultaneous multi-platform generation</strong>. 
            Unlike <strong>Buffer AI</strong>, which focuses on scheduling, we provide deep content creation features 
            like tone presets and hashtag research specifically designed for engagement.
          </p>
        </div>

        <FAQSection 
          toolName="the Social Media Post Generator" 
          faqs={faqs}
        />

        <FromOurBlog 
            postIds={["ai-social-media-strategy", "ai-content-strategy-playbook", "ai-writing-best-practices"]}
            heading="Social Media Resources"
        />

        <FinalCTA 
          headline="Create a Week of Social Content in 15 Minutes" 
          subheadline="Join 12,000+ social media professionals using AI to create platform-perfect content." 
          ctaText="Start Generating Posts Free" 
          ctaLink="/auth" 
          benefits={["4 platforms", "Character tracking", "Auto hashtags", "No credit card required"]}
        />
        
        {/* Experience Signal Text Block */}
        <div className="text-center pb-12 text-sm text-muted-foreground">
             <p>Trusted by <strong>12,000+ active users</strong> who have generated over <strong>800,000 posts</strong> to boost engagement by an average of 65%.</p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
