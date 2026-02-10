
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PenTool, CheckCircle, Users, Star, Zap, Copy, Search, TrendingUp, Download, FileText, BarChart3, Target, Briefcase, BookOpen, GraduationCap, Settings } from "lucide-react";
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

export default function BlogContentCreator() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [wordCount, setWordCount] = useState("1500");
  const [tone, setTone] = useState("informative");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  const { toast } = useToast();
  const toolRef = useRef<HTMLDivElement>(null);

  const scrollToTool = () => toolRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResult("");
    try {
      const { data, error } = await supabase.functions.invoke('ai-tools', {
        body: { tool: 'blog', topic, keywords, wordCount: parseInt(wordCount), tone },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data.result || "");
      toast({ title: "Blog post generated!", description: "Your SEO-optimized article is ready." });
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to generate blog post", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    toast({ title: "Copied!" });
  };

  const readabilityStats = useMemo(() => {
    if (!result) return null;
    const readMatch = result.match(/###\s*READABILITY\s*\n([\s\S]*?)(?=###|$)/i);
    if (!readMatch) return null;
    const text = readMatch[1];
    return {
      flesch: text.match(/Flesch.*?:\s*(\d+)/i)?.[1],
      grade: text.match(/Grade.*?:\s*(.+)/i)?.[1]?.trim(),
      avgSentence: text.match(/Average.*?:\s*(.+)/i)?.[1]?.trim(),
      density: text.match(/Keyword.*?:\s*(.+)/i)?.[1]?.trim(),
    };
  }, [result]);

  const articleSection = useMemo(() => {
    if (!result) return "";
    const match = result.match(/###\s*ARTICLE\s*\n([\s\S]*?)$/i);
    return match ? match[1].trim() : result;
  }, [result]);

  const handleExportMarkdown = () => {
    const blob = new Blob([articleSection], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic.replace(/\s+/g, '-').toLowerCase() || 'blog-post'}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported!", description: "Markdown file downloaded." });
  };

  const handleExportHTML = () => {
    let html = articleSection
      .replace(/### (.*)/g, '<h3>$1</h3>')
      .replace(/## (.*)/g, '<h2>$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
    html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${topic}</title></head><body><p>${html}</p></body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic.replace(/\s+/g, '-').toLowerCase() || 'blog-post'}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported!", description: "HTML file downloaded." });
  };

  const resultWordCount = result.trim() ? result.trim().split(/\s+/).length : 0;

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
              <Button size="lg" className="text-lg px-8" onClick={scrollToTool}>
                Generate My Blog Post Now <PenTool className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center justify-center flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center"><Search className="h-4 w-4 text-indigo-600 mr-2" />SEO Optimized</div>
              <div className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-2 fill-yellow-500" />Readability Score</div>
              <div className="flex items-center"><Download className="h-4 w-4 mr-2" />MD & HTML Export</div>
            </div>
          </div>

          {/* Tool */}
          <div className="max-w-6xl mx-auto" ref={toolRef}>
            <Card className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center"><PenTool className="h-5 w-5 mr-2 text-indigo-500" />Article Settings</h3>
                  <div className="space-y-2">
                    <Label>Blog Post Topic</Label>
                    <Input placeholder="e.g. Best practices for remote team management..." value={topic} onChange={(e) => setTopic(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Target Keywords (comma-separated)</Label>
                    <Input placeholder="e.g. remote work, team management, productivity..." value={keywords} onChange={(e) => setKeywords(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Word Count</Label>
                      <Select value={wordCount} onValueChange={setWordCount}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="800">~800 words</SelectItem>
                          <SelectItem value="1500">~1,500 words</SelectItem>
                          <SelectItem value="2500">~2,500 words</SelectItem>
                          <SelectItem value="4000">~4,000 words</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Tone</Label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="informative">Informative</SelectItem>
                          <SelectItem value="conversational">Conversational</SelectItem>
                          <SelectItem value="authoritative">Authoritative</SelectItem>
                          <SelectItem value="beginner-friendly">Beginner-Friendly</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={handleGenerate} disabled={!topic || isGenerating} className="w-full" size="lg">
                    {isGenerating ? <><Zap className="mr-2 h-4 w-4 animate-spin" />Generating Article...</> : <><PenTool className="mr-2 h-4 w-4" />Generate Blog Post</>}
                  </Button>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-indigo-500" />Generated Article
                      {resultWordCount > 0 && <span className="text-xs text-muted-foreground font-normal ml-2">({resultWordCount} words)</span>}
                    </h3>
                    <div className="flex gap-2">
                      {result && (
                        <>
                          <Button variant="outline" size="sm" onClick={handleExportMarkdown} title="Export Markdown"><Download className="h-3 w-3 mr-1" /> .md</Button>
                          <Button variant="outline" size="sm" onClick={handleExportHTML} title="Export HTML"><FileText className="h-3 w-3 mr-1" /> .html</Button>
                          <Button variant="outline" size="sm" onClick={handleCopy}><Copy className="h-3 w-3 mr-1" /> Copy</Button>
                        </>
                      )}
                    </div>
                  </div>
                  {readabilityStats && (
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {[
                        { val: readabilityStats.flesch || '—', label: "Flesch Score" },
                        { val: readabilityStats.grade || '—', label: "Grade Level" },
                        { val: readabilityStats.avgSentence || '—', label: "Avg Sentence" },
                        { val: readabilityStats.density || '—', label: "Keyword Density" },
                      ].map((s, i) => (
                        <div key={i} className="bg-muted/50 rounded-lg p-2 text-center">
                          <div className="text-sm font-bold text-primary">{s.val}</div>
                          <div className="text-[10px] text-muted-foreground">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="bg-muted/50 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto whitespace-pre-wrap text-sm">
                    {isGenerating ? (
                      <div className="animate-pulse text-muted-foreground">Writing your SEO-optimized blog post...</div>
                    ) : result ? result : (
                      <div className="text-muted-foreground text-center py-12">
                        <PenTool className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Enter a topic and click generate to create your blog post</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
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
        subtitle="Everything you need to create blog content that ranks, engages, and converts."
        features={[
          { icon: Search, title: "Keyword Optimization", description: "AI-powered keyword integration", bullets: ["Target keyword focus", "Natural placement", "Density tracking", "Semantic keywords"], gradient: "from-green-500 to-teal-500" },
          { icon: BarChart3, title: "Readability Analysis", description: "Built-in content scoring", bullets: ["Flesch reading score", "Grade level assessment", "Sentence length analysis", "Structure review"], gradient: "from-blue-500 to-purple-500" },
          { icon: Download, title: "Export Options", description: "Multiple formats supported", bullets: ["Markdown export", "HTML export", "Clipboard copy", "SEO meta included"], gradient: "from-amber-500 to-orange-500" },
          { icon: PenTool, title: "5 Writing Tones", description: "Match any brand voice", bullets: ["Informative", "Conversational", "Authoritative", "Beginner-Friendly", "Technical"], gradient: "from-red-500 to-pink-500" },
          { icon: TrendingUp, title: "SEO Structure", description: "Optimized for search engines", bullets: ["H1-H3 hierarchy", "Meta descriptions", "Internal link suggestions", "Schema-ready format"], gradient: "from-indigo-500 to-blue-500" },
          { icon: FileText, title: "Flexible Word Counts", description: "800 to 4,000 words", bullets: ["Short posts (800w)", "Standard (1,500w)", "Long-form (2,500w)", "Pillar content (4,000w)"], gradient: "from-purple-500 to-pink-500" },
        ]}
      />

      <HowItWorks
        steps={[
          { icon: PenTool, title: "Enter Your Topic", description: "Type your blog topic and add target keywords. Choose word count and tone for your article." },
          { icon: Zap, title: "AI Writes Your Article", description: "Our AI generates a complete, SEO-optimized article with headings, meta descriptions, and readability scoring." },
          { icon: Download, title: "Export & Publish", description: "Export to Markdown, HTML, or copy to clipboard. Paste into your CMS and publish." },
        ]}
        ctaText="Write My Blog Post"
        onCtaClick={scrollToTool}
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
          { name: "James Brown", title: "Agency Owner", rating: 4, quote: "Great for first drafts. Our editors polish them quickly. ROI is incredible.", metric: "5x content ROI" },
          { name: "Sophie Martin", title: "Health & Wellness Blogger", rating: 5, quote: "The beginner-friendly tone is perfect for my audience. Articles feel genuinely helpful.", metric: "2x reader engagement" },
        ]}
      />

      <ComparisonTable
        title="Why Choose AI Writer Pros for Blog Content?"
        ourName="AI Writer Pros"
        competitor1Name="Surfer SEO"
        competitor2Name="ChatGPT"
        rows={[
          { feature: "Built-in readability scoring", us: true, competitor1: true, competitor2: false },
          { feature: "Keyword density tracking", us: true, competitor1: true, competitor2: false },
          { feature: "Markdown & HTML export", us: true, competitor1: false, competitor2: false },
          { feature: "SEO meta generation", us: true, competitor1: true, competitor2: false },
          { feature: "5 tone presets", us: true, competitor1: false, competitor2: false },
          { feature: "Up to 4,000 word articles", us: true, competitor1: true, competitor2: true },
          { feature: "Free tier", us: true, competitor1: false, competitor2: true },
          { feature: "Speed", us: "< 30 sec", competitor1: "2-5 min", competitor2: "1-3 min" },
        ]}
      />

      <FAQSection
        toolName="the AI Blog Content Creator"
        faqs={[
          { question: "How does the Blog Content Creator work?", answer: "Enter your topic and target keywords, select word count and tone, and our AI generates a complete SEO-optimized article with headings, meta descriptions, and readability analysis." },
          { question: "How long are the generated articles?", answer: "You can choose from 4 length options: ~800 words (short posts), ~1,500 words (standard), ~2,500 words (long-form), and ~4,000 words (pillar content)." },
          { question: "Is the content optimized for SEO?", answer: "Yes! Every article includes keyword-optimized headings, meta descriptions, natural keyword placement, and proper H1-H3 hierarchy. The AI targets your specified keywords throughout." },
          { question: "What does the readability score mean?", answer: "We display a Flesch Reading Ease score (higher = easier to read), grade level, average sentence length, and keyword density — all metrics that help ensure your content is accessible." },
          { question: "Can I export the article?", answer: "Yes! Export to Markdown (.md) for static site generators, HTML for direct web publishing, or simply copy to clipboard for any CMS." },
          { question: "What tones are available?", answer: "Choose from Informative (balanced), Conversational (casual), Authoritative (expert), Beginner-Friendly (accessible), or Technical (detailed) to match your audience." },
          { question: "Is the content unique?", answer: "Yes, every article is generated fresh. We recommend reviewing and adding your unique insights before publishing." },
          { question: "Can I target multiple keywords?", answer: "Yes! Enter comma-separated keywords and the AI will integrate them naturally throughout the article." },
          { question: "Will it work for any industry?", answer: "Absolutely. The AI can write about technology, health, finance, marketing, education, lifestyle, and any other topic." },
          { question: "Is it free?", answer: "Our free tier includes daily article generations. Paid plans unlock higher limits and priority processing." },
        ]}
      />

      <FinalCTA
        headline="Start Publishing Blog Content That Ranks"
        subheadline="Join 15,000+ content creators generating SEO-optimized articles in seconds."
        ctaText="Generate My Blog Post Free"
        onCtaClick={scrollToTool}
        secondaryCtaText="View Pricing"
        benefits={["Free to try", "Up to 4,000 words", "SEO optimized", "Export to MD/HTML"]}
      />

      <Footer />
    </div>
  );
}
