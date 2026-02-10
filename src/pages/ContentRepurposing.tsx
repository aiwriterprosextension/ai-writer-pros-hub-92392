
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, ArrowRight, CheckCircle, Zap, Star, Users, Instagram, Twitter, Linkedin, Facebook, Copy, Layers, Target, TrendingUp, Briefcase, ShoppingCart, PenTool, RefreshCw } from "lucide-react";
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

const contentFormats = [
  { id: 'twitter', name: 'Twitter Thread', icon: Twitter, description: '5-10 tweet thread' },
  { id: 'linkedin', name: 'LinkedIn Post', icon: Linkedin, description: 'Professional format' },
  { id: 'instagram', name: 'Instagram Captions', icon: Instagram, description: 'Multiple captions' },
  { id: 'facebook', name: 'Facebook Post', icon: Facebook, description: 'Engaging format' },
  { id: 'email', name: 'Email Newsletter', icon: FileText, description: 'Newsletter section' },
  { id: 'bullets', name: 'Bullet Points', icon: FileText, description: 'Key takeaways' },
];

export default function ContentRepurposing() {
  const [inputContent, setInputContent] = useState("");
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<Record<string, string>>({});
  const [tone, setTone] = useState("original");
  const { toast } = useToast();
  const toolRef = useRef<HTMLDivElement>(null);

  const scrollToTool = () => toolRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleFormatToggle = (formatId: string) => {
    setSelectedFormats(prev => prev.includes(formatId) ? prev.filter(f => f !== formatId) : [...prev, formatId]);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResults({});
    try {
      const { data, error } = await supabase.functions.invoke('repurpose-content', {
        body: { content: inputContent, formats: selectedFormats, tone: tone === "original" ? undefined : tone },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResults(data.results || {});
      toast({ title: "Content repurposed!", description: `Generated ${selectedFormats.length} formats.` });
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to generate content", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, formatName: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: `${formatName} copied to clipboard.` });
  };

  const inputWordCount = inputContent.trim() ? inputContent.trim().split(/\s+/).length : 0;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Content Repurposing Tool - Turn 1 Post Into 10+ | AI Writer Pros"
        description="Transform one piece of content into Twitter threads, LinkedIn posts, Instagram captions, newsletters, and more. 6 output formats with tone control."
        keywords="content repurposing, repurpose content, content recycling, multi-platform content, social media content"
        canonical="https://aiwriterpros.com/content-repurposing"
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800">
              📝 Turn 1 Piece of Content Into 10+ Formats
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Content Repurposing Tool</span>
              <br />Maximize Every Piece of Content You Create
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Stop creating from scratch for every platform. Paste your blog post, article, or any content and transform it into Twitter threads, LinkedIn posts, Instagram captions, email newsletters, and more — with customizable tone settings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="text-lg px-8" onClick={scrollToTool}>
                Repurpose My Content Now <RefreshCw className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center justify-center flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center"><Layers className="h-4 w-4 text-green-600 mr-2" />6 Output Formats</div>
              <div className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-2 fill-yellow-500" />Tone Control</div>
              <div className="flex items-center"><Users className="h-4 w-4 mr-2" />5,000+ Users</div>
            </div>
          </div>

          {/* Tool */}
          <div className="max-w-6xl mx-auto" ref={toolRef}>
            <Card className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
                    <span className="flex items-center"><FileText className="h-5 w-5 mr-2 text-blue-500" />Original Content</span>
                    {inputWordCount > 0 && <span className="text-xs text-muted-foreground font-normal">{inputWordCount} words</span>}
                  </h3>
                  <Textarea placeholder="Paste your blog post, article, or any content..." value={inputContent} onChange={(e) => setInputContent(e.target.value)} className="min-h-[250px] resize-none" />
                  <div className="mt-4 space-y-2">
                    <Label>Output Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="original">Keep Original Tone</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual & Friendly</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                        <SelectItem value="authoritative">Authoritative</SelectItem>
                        <SelectItem value="inspirational">Inspirational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium mb-3">Select Output Formats:</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {contentFormats.map((format) => (
                        <div key={format.id} onClick={() => handleFormatToggle(format.id)}
                          className={`p-3 border rounded-lg cursor-pointer transition-all ${
                            selectedFormats.includes(format.id) ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-border hover:border-green-300'
                          }`}>
                          <div className="flex items-center mb-1">
                            <format.icon className="h-4 w-4 mr-2" />
                            <span className="text-sm font-medium">{format.name}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{format.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleGenerate} disabled={!inputContent || selectedFormats.length === 0 || isGenerating} className="w-full mt-6" size="lg">
                    {isGenerating ? <><Zap className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><FileText className="mr-2 h-4 w-4" />Repurpose Content ({selectedFormats.length} formats)</>}
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center"><Zap className="h-5 w-5 mr-2 text-green-500" />Repurposed Content</h3>
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {selectedFormats.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Select formats to see your repurposed content here</p>
                      </div>
                    ) : (
                      selectedFormats.map((formatId) => {
                        const format = contentFormats.find(f => f.id === formatId);
                        if (!format) return null;
                        const FormatIcon = format.icon;
                        const content = results[formatId];
                        return (
                          <Card key={formatId} className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center"><FormatIcon className="h-4 w-4 mr-2" /><span className="font-medium">{format.name}</span></div>
                              {content && <Button variant="outline" size="sm" onClick={() => handleCopy(content, format.name)}><Copy className="h-3 w-3 mr-1" /> Copy</Button>}
                            </div>
                            <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded whitespace-pre-wrap">
                              {isGenerating ? <div className="animate-pulse">Generating {format.name.toLowerCase()}...</div> : content ? content : (inputContent ? 'Click "Repurpose Content" to generate' : 'Add content to generate')}
                            </div>
                          </Card>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

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

      <FeaturesGrid
        title="Platform-Optimized Content Repurposing"
        subtitle="Our AI understands each platform's unique requirements and creates content accordingly."
        features={[
          { icon: Twitter, title: "Twitter Threads", description: "Engaging multi-tweet threads", bullets: ["5-10 tweet threads", "Hook-driven openers", "Engagement prompts", "Hashtag optimization"], gradient: "from-blue-500 to-blue-600" },
          { icon: Linkedin, title: "LinkedIn Posts", description: "Professional thought leadership", bullets: ["Hook-first format", "Story-driven structure", "Industry hashtags", "CTA for engagement"], gradient: "from-blue-600 to-blue-700" },
          { icon: Instagram, title: "Instagram Captions", description: "Scroll-stopping captions", bullets: ["Multiple caption variants", "Relevant hashtags", "Emoji integration", "Story prompts"], gradient: "from-pink-500 to-rose-500" },
          { icon: Facebook, title: "Facebook Posts", description: "Shareable social content", bullets: ["Discussion starters", "Community engagement", "Share-worthy hooks", "Group-ready format"], gradient: "from-blue-700 to-blue-800" },
          { icon: FileText, title: "Email Newsletters", description: "Ready-to-send email sections", bullets: ["Subject line included", "CTA optimization", "Scannable format", "Preview text"], gradient: "from-green-500 to-teal-500" },
          { icon: Layers, title: "Bullet Point Summaries", description: "Key takeaways for any use", bullets: ["Core insights extracted", "Presentation-ready", "Meeting summaries", "Quick reference"], gradient: "from-amber-500 to-orange-500" },
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
        onCtaClick={scrollToTool}
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
          { name: "Sam Peterson", title: "Solopreneur", rating: 5, quote: "The tone selector is everything. Professional for LinkedIn, casual for Instagram — perfect.", metric: "Consistent brand across platforms" },
          { name: "Amy Liu", title: "Newsletter Creator", rating: 4, quote: "Each newsletter edition now becomes 10+ social posts. My audience reach tripled.", metric: "3x audience reach" },
          { name: "Mark Johnson", title: "Startup CMO", rating: 5, quote: "We replaced 2 content contractors with this tool. Better quality, faster delivery.", metric: "$4,000/month saved" },
        ]}
      />

      <ComparisonTable
        title="Why Choose AI Writer Pros for Repurposing?"
        ourName="AI Writer Pros"
        competitor1Name="Repurpose.io"
        competitor2Name="Manual"
        rows={[
          { feature: "6 output formats", us: true, competitor1: true, competitor2: true },
          { feature: "Tone customization", us: true, competitor1: false, competitor2: true },
          { feature: "Text-based repurposing", us: true, competitor1: false, competitor2: true },
          { feature: "Per-format copy buttons", us: true, competitor1: false, competitor2: true },
          { feature: "Word count tracking", us: true, competitor1: false, competitor2: false },
          { feature: "Free tier", us: true, competitor1: false, competitor2: true },
          { feature: "Speed per piece", us: "< 30 sec", competitor1: "1-5 min", competitor2: "2-4 hours" },
        ]}
      />

      <FAQSection
        toolName="the Content Repurposing Tool"
        faqs={[
          { question: "How does content repurposing work?", answer: "Paste any content (blog post, article, transcript) and select the output formats you want. Our AI transforms your content into platform-optimized versions — Twitter threads, LinkedIn posts, Instagram captions, newsletters, and more." },
          { question: "What output formats are available?", answer: "We currently support 6 formats: Twitter Threads, LinkedIn Posts, Instagram Captions, Facebook Posts, Email Newsletters, and Bullet Point Summaries." },
          { question: "Can I control the output tone?", answer: "Yes! Choose from Keep Original, Professional, Casual & Friendly, Humorous, Authoritative, or Inspirational to match your brand voice across all platforms." },
          { question: "How long should my input content be?", answer: "Any length works! Longer content (500+ words) produces richer output. Blog posts, articles, and transcripts all work great." },
          { question: "Is the output unique for each format?", answer: "Yes! Each format is specifically adapted for the target platform — Twitter threads are concise with hooks, LinkedIn posts are professional with stories, and Instagram captions include hashtags." },
          { question: "Can I repurpose the same content multiple times?", answer: "Absolutely! Each generation creates unique output, so you can repurpose the same content multiple times for different angles." },
          { question: "Does it work with video transcripts?", answer: "Yes! Paste any text including video or podcast transcripts. The AI extracts key ideas and adapts them for each platform." },
          { question: "How many formats can I select at once?", answer: "You can select all 6 formats simultaneously. The AI generates content for each selected format in a single click." },
          { question: "Is there a word limit on input?", answer: "No strict limit. For optimal results, we recommend input between 300-5,000 words." },
          { question: "Is it free?", answer: "Yes, our free tier includes daily repurposing sessions. Paid plans offer unlimited access." },
        ]}
      />

      <FinalCTA
        headline="Get 10x More Value From Every Piece of Content"
        subheadline="Join 5,000+ content creators who repurpose once and publish everywhere."
        ctaText="Repurpose My Content Free"
        onCtaClick={scrollToTool}
        secondaryCtaText="View Pricing"
        benefits={["6 output formats", "Tone customization", "Free to try", "Instant results"]}
      />

      <Footer />
    </div>
  );
}
