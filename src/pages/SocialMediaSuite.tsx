
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, CheckCircle, Users, Star, Zap, Copy, Instagram, Twitter, Linkedin, Facebook, Calendar, Hash, TrendingUp, Target, Clock, BarChart3, Briefcase, ShoppingCart } from "lucide-react";
import { useRef } from "react";
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
  const toolRef = useRef<HTMLDivElement>(null);
  const scrollToTool = () => toolRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Social Media Post Generator - AI Content Suite | AI Writer Pros"
        description="Generate optimized social media posts for Twitter, LinkedIn, Instagram & Facebook. Character count tracking, hashtag suggestions, and 5 tone options."
        keywords="social media generator, AI social posts, Instagram caption generator, Twitter thread, LinkedIn post, social media content"
        canonical="https://aiwriterpros.com/social-media-suite"
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800">
              📱 Content for Every Platform in One Click
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Social Media Post Generator</span>
              <br />Create Viral Content for Every Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Stop writing posts from scratch. Generate platform-optimized social media content for Twitter, LinkedIn, Instagram, and Facebook — all from one topic. With character count tracking, hashtag suggestions, and 5 tone options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="text-lg px-8" onClick={scrollToTool}>
                Generate My Posts Now <MessageSquare className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center justify-center flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center"><MessageSquare className="h-4 w-4 text-pink-600 mr-2" />4 Platforms</div>
              <div className="flex items-center"><Hash className="h-4 w-4 text-blue-500 mr-2" />Auto Hashtags</div>
              <div className="flex items-center"><BarChart3 className="h-4 w-4 mr-2" />Character Tracking</div>
            </div>
          </div>

          {/* Mock Tool */}
          <div className="max-w-6xl mx-auto" ref={toolRef}>
            <MockToolPreview toolName="Social Media Suite" dashboardPath="/dashboard/social-media" gradient="from-pink-500 to-rose-500">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center"><MessageSquare className="h-5 w-5 mr-2 text-pink-500" />Post Settings</h3>
                  <div className="space-y-2">
                    <Label>Topic / Content Idea</Label>
                    <Input placeholder="e.g. New product launch..." disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Tone</Label>
                    <Select disabled><SelectTrigger><SelectValue placeholder="Engaging" /></SelectTrigger></Select>
                  </div>
                  <Button disabled className="w-full" size="lg"><MessageSquare className="mr-2 h-4 w-4" />Generate Posts</Button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Generated Posts</h3>
                  <div className="bg-muted/50 rounded-lg p-4 min-h-[250px] flex items-center justify-center text-muted-foreground">
                    <MessageSquare className="h-12 w-12 opacity-50" />
                  </div>
                </div>
              </div>
            </MockToolPreview>
          </div>
        </div>
      </section>

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

      <FeaturesGrid
        title="Your Complete Social Media Toolkit"
        subtitle="Platform-optimized content creation with intelligent character tracking and hashtag suggestions."
        features={[
          { icon: Instagram, title: "Instagram Captions", description: "Engaging captions up to 2,200 chars", bullets: ["Story-driven captions", "Hashtag suggestions", "CTA integration", "Emoji optimization"], gradient: "from-pink-500 to-rose-500" },
          { icon: Twitter, title: "Twitter/X Posts", description: "Concise tweets within 280 chars", bullets: ["Thread generation", "Hashtag optimization", "Engagement hooks", "Reply suggestions"], gradient: "from-blue-500 to-blue-600" },
          { icon: Linkedin, title: "LinkedIn Content", description: "Professional posts up to 3,000 chars", bullets: ["Thought leadership format", "Hook-first structure", "Industry hashtags", "CTA for engagement"], gradient: "from-blue-600 to-blue-700" },
          { icon: Facebook, title: "Facebook Posts", description: "Versatile posts for all audiences", bullets: ["Story-based format", "Share-worthy hooks", "Group-optimized", "Event promotion"], gradient: "from-blue-700 to-blue-800" },
          { icon: Hash, title: "Smart Hashtags", description: "AI-powered hashtag suggestions", bullets: ["Trending hashtags", "Niche-specific tags", "Reach optimization", "Platform-appropriate"], gradient: "from-green-500 to-teal-500" },
          { icon: BarChart3, title: "Character Tracking", description: "Never exceed platform limits", bullets: ["Real-time counting", "Over-limit warnings", "Per-platform display", "Optimized length"], gradient: "from-amber-500 to-orange-500" },
        ]}
      />

      {/* Platform Details */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Optimized for Every Platform</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Instagram, name: 'Instagram', desc: 'Captions, hashtags, stories (2,200 chars)', colors: 'from-pink-500 to-rose-500' },
              { icon: Twitter, name: 'Twitter/X', desc: 'Tweets, threads (280 chars/tweet)', colors: 'from-blue-500 to-blue-600' },
              { icon: Linkedin, name: 'LinkedIn', desc: 'Professional posts (3,000 chars)', colors: 'from-blue-600 to-blue-700' },
              { icon: Facebook, name: 'Facebook', desc: 'Posts, stories (63,206 chars)', colors: 'from-blue-700 to-blue-800' },
            ].map(p => (
              <Card key={p.name} className="text-center">
                <CardContent className="pt-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${p.colors} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <p.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </CardContent>
              </Card>
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
        onCtaClick={scrollToTool}
      />

      <UseCases
        title="Built for Social Media Professionals"
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
        title="Why AI Writer Pros for Social Media?"
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

      <FAQSection
        toolName="the Social Media Post Generator"
        faqs={[
          { question: "Which platforms are supported?", answer: "We support Twitter/X (280 chars), LinkedIn (3,000 chars), Instagram (2,200 chars), and Facebook (63,206 chars) with platform-specific optimization." },
          { question: "Does it include hashtag suggestions?", answer: "Yes! Our AI generates relevant, trending hashtags tailored to each platform's algorithm and your specific topic." },
          { question: "Can I generate for multiple platforms at once?", answer: "Absolutely! Select any combination of platforms and generate optimized content for all of them simultaneously." },
          { question: "How does character tracking work?", answer: "Each generated post shows a real-time character count compared to the platform's limit, with warnings if you're over." },
          { question: "What tone options are available?", answer: "Choose from Engaging, Professional, Casual, Humorous, or Inspirational to match your brand voice." },
          { question: "Is there a free tier?", answer: "Yes, you can generate social media posts for free. Premium plans unlock additional features." },
        ]}
      />

      <FinalCTA
        headline="Create a Week of Social Content in 15 Minutes"
        subheadline="Join 12,000+ social media professionals using AI to create platform-perfect content."
        ctaText="Start Generating Posts Free"
        ctaLink="/auth"
        benefits={["4 platforms", "Character tracking", "Auto hashtags", "No credit card required"]}
      />

      <Footer />
    </div>
  );
}
