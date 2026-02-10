
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageSquare, CheckCircle, Users, Star, Zap, Copy, Instagram, Twitter, Linkedin, Facebook, Calendar, Hash, TrendingUp, Target, Clock, BarChart3, Briefcase, ShoppingCart } from "lucide-react";
import { useState, useMemo, useRef } from "react";
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

const platforms = [
  { id: 'twitter', name: 'Twitter/X', icon: Twitter, charLimit: 280 },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, charLimit: 3000 },
  { id: 'instagram', name: 'Instagram', icon: Instagram, charLimit: 2200 },
  { id: 'facebook', name: 'Facebook', icon: Facebook, charLimit: 63206 },
];

export default function SocialMediaSuite() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("engaging");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["twitter", "linkedin"]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  const { toast } = useToast();
  const toolRef = useRef<HTMLDivElement>(null);

  const scrollToTool = () => toolRef.current?.scrollIntoView({ behavior: "smooth" });

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResult("");
    try {
      const { data, error } = await supabase.functions.invoke('ai-tools', {
        body: { tool: 'social', topic, platforms: selectedPlatforms, tone },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data.result || "");
      toast({ title: "Posts generated!", description: `Content created for ${selectedPlatforms.length} platforms.` });
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to generate posts", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text?: string) => {
    navigator.clipboard.writeText(text || result);
    toast({ title: "Copied!" });
  };

  const platformSections = useMemo(() => {
    if (!result) return {};
    const sections: Record<string, string> = {};
    for (const p of platforms) {
      const regex = new RegExp(`###\\s*${p.id}[\\s/]*(?:\\w*)\\s*\\n([\\s\\S]*?)(?=###|$)`, "i");
      const match = result.match(regex);
      if (match) {
        sections[p.id] = match[1].replace(/CHARACTER_COUNT:\s*\d+/gi, '').trim();
      }
    }
    return sections;
  }, [result]);

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

          {/* Tool */}
          <div className="max-w-6xl mx-auto" ref={toolRef}>
            <Card className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center"><MessageSquare className="h-5 w-5 mr-2 text-pink-500" />Post Settings</h3>
                  <div className="space-y-2">
                    <Label>Topic / Content Idea</Label>
                    <Input placeholder="e.g. New product launch, behind the scenes..." value={topic} onChange={(e) => setTopic(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engaging">Engaging</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                        <SelectItem value="inspirational">Inspirational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Platforms</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {platforms.map(p => (
                        <div key={p.id} onClick={() => togglePlatform(p.id)}
                          className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                            selectedPlatforms.includes(p.id) ? 'border-pink-500 bg-pink-50 dark:bg-pink-950/20' : 'border-border hover:border-pink-300'
                          }`}>
                          <Checkbox checked={selectedPlatforms.includes(p.id)} />
                          <p.icon className="h-4 w-4" />
                          <div>
                            <span className="text-sm font-medium">{p.name}</span>
                            <span className="text-xs text-muted-foreground ml-1">({p.charLimit.toLocaleString()})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleGenerate} disabled={!topic || selectedPlatforms.length === 0 || isGenerating} className="w-full" size="lg">
                    {isGenerating ? <><Zap className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><MessageSquare className="mr-2 h-4 w-4" />Generate Posts ({selectedPlatforms.length})</>}
                  </Button>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center"><Zap className="h-5 w-5 mr-2 text-pink-500" />Generated Posts</h3>
                    {result && <Button variant="outline" size="sm" onClick={() => handleCopy()}><Copy className="h-3 w-3 mr-1" /> Copy All</Button>}
                  </div>
                  {Object.keys(platformSections).length > 0 ? (
                    <div className="space-y-4 max-h-[600px] overflow-y-auto">
                      {selectedPlatforms.map(pId => {
                        const platform = platforms.find(p => p.id === pId);
                        const content = platformSections[pId];
                        if (!platform || !content) return null;
                        const charCount = content.length;
                        const isOverLimit = charCount > platform.charLimit;
                        const PIcon = platform.icon;
                        return (
                          <Card key={pId} className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2"><PIcon className="h-4 w-4" /><span className="font-medium text-sm">{platform.name}</span></div>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs ${isOverLimit ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>{charCount.toLocaleString()} / {platform.charLimit.toLocaleString()}</span>
                                <Button variant="outline" size="sm" onClick={() => handleCopy(content)}><Copy className="h-3 w-3" /></Button>
                              </div>
                            </div>
                            <div className="text-sm bg-muted/50 p-3 rounded whitespace-pre-wrap">{content}</div>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-muted/50 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto whitespace-pre-wrap text-sm">
                      {isGenerating ? (
                        <div className="animate-pulse text-muted-foreground">Creating platform-optimized posts...</div>
                      ) : (
                        <div className="text-muted-foreground text-center py-12">
                          <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Select platforms and enter a topic to generate posts</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
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
          { name: "Alex Turner", title: "E-Commerce Founder", rating: 5, quote: "Our Instagram engagement jumped 85% after switching to AI-generated captions.", metric: "85% engagement increase" },
          { name: "Priya Sharma", title: "Content Creator", rating: 5, quote: "The character count feature is brilliant. No more accidentally going over Twitter limits.", metric: "0 character limit issues" },
          { name: "Jake Martinez", title: "Agency Creative Director", rating: 5, quote: "We produce 200+ posts monthly for clients. Quality has been incredibly consistent.", metric: "200+ posts/month" },
          { name: "Emma Chen", title: "Personal Brand Coach", rating: 4, quote: "The tone settings are spot-on. Casual for Instagram, professional for LinkedIn — perfect.", metric: "Consistent brand voice" },
          { name: "David Okafor", title: "Startup CEO", rating: 5, quote: "From zero social presence to 10K followers in 3 months using AI-generated content.", metric: "10K followers in 3 months" },
        ]}
      />

      <ComparisonTable
        title="Why Choose AI Writer Pros for Social Media?"
        ourName="AI Writer Pros"
        competitor1Name="Buffer AI"
        competitor2Name="Hootsuite AI"
        rows={[
          { feature: "Multi-platform simultaneous generation", us: true, competitor1: false, competitor2: false },
          { feature: "Real-time character counting", us: true, competitor1: true, competitor2: true },
          { feature: "5 customizable tones", us: true, competitor1: false, competitor2: false },
          { feature: "Hashtag suggestions", us: true, competitor1: true, competitor2: true },
          { feature: "Per-platform copy buttons", us: true, competitor1: false, competitor2: false },
          { feature: "Free tier available", us: true, competitor1: true, competitor2: false },
          { feature: "Generation speed", us: "< 15 sec", competitor1: "30+ sec", competitor2: "30+ sec" },
        ]}
      />

      <FAQSection
        toolName="the Social Media Post Generator"
        faqs={[
          { question: "How does the Social Media Suite work?", answer: "Enter your content topic, select platforms (Twitter, LinkedIn, Instagram, Facebook), choose a tone, and click generate. Our AI creates optimized posts for each platform simultaneously." },
          { question: "Does it respect platform character limits?", answer: "Yes! Each post is generated within the platform's character limit, and we display a real-time character counter for each post with warnings if you're approaching the limit." },
          { question: "Are hashtags included automatically?", answer: "Yes, the AI generates relevant hashtags tailored to each platform. Instagram posts include more hashtags, while LinkedIn and Twitter use fewer, more targeted ones." },
          { question: "Can I generate posts for all 4 platforms at once?", answer: "Absolutely! Select all 4 platforms and generate content for Twitter, LinkedIn, Instagram, and Facebook from a single topic in one click." },
          { question: "What tones are available?", answer: "Choose from Engaging, Professional, Casual, Humorous, or Inspirational — each tailored to match different brand voices and content strategies." },
          { question: "Can I copy individual platform posts?", answer: "Yes! Each generated post has its own copy button, so you can copy just the Twitter post or just the Instagram caption independently." },
          { question: "Is the content unique each time?", answer: "Yes, every generation produces unique content. If you generate again with the same topic, you'll get fresh posts." },
          { question: "Does it work for business and personal accounts?", answer: "Yes! The tone settings let you switch between professional (great for B2B LinkedIn) and casual/humorous (perfect for personal brands on Instagram)." },
          { question: "How many posts can I generate daily?", answer: "Our free tier includes a generous daily allowance. Paid plans offer higher limits for power users and agencies." },
          { question: "Can I edit the generated posts?", answer: "Of course! Copy the generated content and make any edits you like before publishing. The AI provides a strong starting point." },
        ]}
      />

      <FinalCTA
        headline="Create a Week of Social Content in 15 Minutes"
        subheadline="Join 12,000+ social media professionals generating viral-worthy posts across all platforms."
        ctaText="Generate My Social Posts Free"
        onCtaClick={scrollToTool}
        secondaryCtaText="View Pricing"
        benefits={["4 platforms supported", "Character tracking", "Hashtag suggestions", "Free to try"]}
      />

      <Footer />
    </div>
  );
}
