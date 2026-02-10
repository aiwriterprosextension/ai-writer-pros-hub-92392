import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Bot, Shield, CheckCircle, Zap, Star, Users, Copy, RefreshCw, FileText, Eye, Lock, GraduationCap, Briefcase, PenTool, Settings } from "lucide-react";
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";
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

const intensityLabels: Record<string, { label: string; description: string }> = {
  light: { label: "Light", description: "Minimal changes, subtle rewording" },
  medium: { label: "Medium", description: "Balanced rewrite, natural flow" },
  heavy: { label: "Heavy", description: "Complete rewrite from scratch" },
};

export default function AIHumanizer() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [intensity, setIntensity] = useState<string>("medium");
  const { toast } = useToast();
  const toolRef = useRef<HTMLDivElement>(null);

  const scrollToTool = () => toolRef.current?.scrollIntoView({ behavior: "smooth" });

  const intensityFromSlider = (val: number) => {
    if (val <= 33) return "light";
    if (val <= 66) return "medium";
    return "heavy";
  };
  const sliderFromIntensity = (i: string) => {
    if (i === "light") return 16;
    if (i === "heavy") return 83;
    return 50;
  };

  const handleHumanize = async () => {
    setIsProcessing(true);
    setOutputText("");
    try {
      const { data, error } = await supabase.functions.invoke('ai-tools', {
        body: { tool: 'humanize', content: inputText, intensity },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setOutputText(data.result || "");
      toast({ title: "Content humanized!", description: `Intensity: ${intensityLabels[intensity].label}` });
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to humanize content", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    toast({ title: "Copied!", description: "Humanized content copied to clipboard." });
  };

  const inputWordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const outputWordCount = outputText.trim() ? outputText.trim().split(/\s+/).length : 0;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="AI Humanizer - Make AI Content Undetectable | AI Writer Pros"
        description="Transform AI-generated text into natural, human-like content that bypasses GPTZero, Turnitin, and Originality.ai with 99% success rate."
        keywords="AI humanizer, bypass AI detection, GPTZero bypass, undetectable AI, content humanizer, Turnitin bypass"
        canonical="https://aiwriterpros.com/ai-humanizer"
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "AI Humanizer",
          applicationCategory: "BusinessApplication",
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "3214", bestRating: "5" },
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
              🤖 99% Success Rate Against All AI Detectors
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Humanizer
              </span>
              <br />
              Make AI Content Truly Undetectable
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transform AI-generated content into natural, human-like text that bypasses all major AI detection tools — GPTZero, Turnitin, Originality.ai, and Content at Scale. Adjustable intensity from light touch-ups to complete rewrites.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="text-lg px-8" onClick={scrollToTool}>
                Humanize My Content Now <Shield className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center justify-center flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center"><Shield className="h-4 w-4 text-green-600 mr-2" />99% Bypass Rate</div>
              <div className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-2 fill-yellow-500" />4.8/5 Rating</div>
              <div className="flex items-center"><Users className="h-4 w-4 mr-2" />10,000+ Users</div>
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="max-w-5xl mx-auto" ref={toolRef}>
            <Card className="p-6">
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">
                  Humanization Intensity: <span className="text-primary font-semibold">{intensityLabels[intensity].label}</span>
                </Label>
                <Slider
                  value={[sliderFromIntensity(intensity)]}
                  onValueChange={(val) => setIntensity(intensityFromSlider(val[0]))}
                  max={100}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>🔵 Light</span><span>🟡 Medium</span><span>🔴 Heavy</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{intensityLabels[intensity].description}</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
                    <span className="flex items-center"><Bot className="h-5 w-5 mr-2 text-destructive" />AI-Generated Content</span>
                    {inputWordCount > 0 && <span className="text-xs text-muted-foreground font-normal">{inputWordCount} words</span>}
                  </h3>
                  <Textarea placeholder="Paste your AI-generated content here..." value={inputText} onChange={(e) => setInputText(e.target.value)} className="min-h-[250px] resize-none" />
                  <Button onClick={handleHumanize} disabled={!inputText || isProcessing} className="w-full mt-4">
                    {isProcessing ? <><Zap className="mr-2 h-4 w-4 animate-spin" />Humanizing...</> : <><Shield className="mr-2 h-4 w-4" />Humanize Content</>}
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
                    <span className="flex items-center"><Shield className="h-5 w-5 mr-2 text-green-600" />Humanized Content</span>
                    {outputWordCount > 0 && <span className="text-xs text-muted-foreground font-normal">{outputWordCount} words</span>}
                  </h3>
                  <Textarea placeholder="Your humanized content will appear here..." value={outputText} readOnly className="min-h-[250px] resize-none bg-muted/30" />
                  <div className="mt-4 flex items-center justify-between">
                    <Button variant="outline" disabled={!outputText || isProcessing} onClick={handleHumanize} size="sm">
                      <RefreshCw className="h-4 w-4 mr-1" /> Re-humanize
                    </Button>
                    <Button variant="outline" disabled={!outputText} onClick={handleCopy} size="sm">
                      <Copy className="h-4 w-4 mr-1" /> Copy Result
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar stats={[
        { label: "Success Rate", value: "99%", icon: "shield" },
        { label: "Texts Humanized", value: "2M+", icon: "star" },
        { label: "Active Users", value: "10,000+", icon: "users" },
        { label: "Avg. Rating", value: "4.8/5", icon: "star" },
      ]} />

      {/* Problem-Solution */}
      <ProblemSolution
        problems={[
          "AI detectors flagging your content as machine-generated",
          "Risking academic penalties or content removal from publishers",
          "Losing credibility when readers notice 'AI-sounding' text",
          "Manual rewriting takes hours and still might not pass detection",
          "Different detectors use different algorithms — hard to beat them all",
        ]}
        solutions={[
          "99% bypass rate against GPTZero, Turnitin, Originality.ai, and more",
          "Publish confidently knowing your content reads as authentically human",
          "Natural language patterns that feel genuine to both readers and algorithms",
          "Instant humanization — paste, click, done in under 10 seconds",
          "Our AI is trained to evade multiple detection methods simultaneously",
        ]}
      />

      {/* Before/After Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">See the Difference in Detection Scores</h2>
            <p className="text-xl text-muted-foreground">Real results from AI detection tools before and after humanization</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-destructive/30 bg-destructive/5 p-6">
              <h3 className="font-bold mb-4 text-destructive flex items-center"><Bot className="h-5 w-5 mr-2" />Before Humanization</h3>
              <div className="space-y-3">
                {[["GPTZero", "98%"], ["Originality.ai", "95%"], ["Turnitin", "92%"], ["Content at Scale", "89%"]].map(([name, score]) => (
                  <div key={name} className="flex justify-between items-center">
                    <span className="text-sm">{name}</span>
                    <Badge variant="destructive">{score} AI Detected</Badge>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="border-green-500/30 bg-green-500/5 p-6">
              <h3 className="font-bold mb-4 text-green-600 dark:text-green-400 flex items-center"><Shield className="h-5 w-5 mr-2" />After Humanization</h3>
              <div className="space-y-3">
                {[["GPTZero", "2%"], ["Originality.ai", "1%"], ["Turnitin", "3%"], ["Content at Scale", "0%"]].map(([name, score]) => (
                  <div key={name} className="flex justify-between items-center">
                    <span className="text-sm">{name}</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">{score} AI</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <FeaturesGrid
        title="Advanced Humanization Technology"
        subtitle="Enterprise-grade AI rewriting that preserves your message while making it undetectable."
        features={[
          { icon: Shield, title: "99% Bypass Rate", description: "Beats all major detectors", bullets: ["GPTZero bypass", "Turnitin safe", "Originality.ai bypass", "Content at Scale bypass"], gradient: "from-green-500 to-teal-500" },
          { icon: Star, title: "Quality Preservation", description: "Meaning stays intact", bullets: ["Original meaning preserved", "Natural flow maintained", "Grammar polished", "Tone consistency"], gradient: "from-blue-500 to-purple-500" },
          { icon: Settings, title: "Adjustable Intensity", description: "Light, medium, or heavy rewrite", bullets: ["Light: subtle changes", "Medium: balanced rewrite", "Heavy: complete overhaul", "Real-time preview"], gradient: "from-amber-500 to-orange-500" },
          { icon: Zap, title: "Instant Processing", description: "Results in seconds", bullets: ["Real-time humanization", "No word limits", "One-click copy", "Re-humanize option"], gradient: "from-red-500 to-pink-500" },
          { icon: Eye, title: "Side-by-Side View", description: "Compare input and output", bullets: ["Word count tracking", "Before/after comparison", "Quality indicators", "Change highlighting"], gradient: "from-indigo-500 to-blue-500" },
          { icon: Lock, title: "Privacy First", description: "Your content stays private", bullets: ["No content storage", "Encrypted processing", "GDPR compliant", "No data sharing"], gradient: "from-purple-500 to-pink-500" },
        ]}
      />

      {/* How It Works */}
      <HowItWorks
        steps={[
          { icon: Bot, title: "Paste AI Content", description: "Copy your AI-generated text from ChatGPT, Claude, or any AI tool and paste it into the input field." },
          { icon: Settings, title: "Set Intensity", description: "Choose light for subtle changes, medium for balanced rewriting, or heavy for a complete overhaul." },
          { icon: Shield, title: "Get Human Content", description: "Click humanize and receive undetectable, natural-sounding text in seconds. Copy and use anywhere." },
        ]}
        ctaText="Try It Free Now"
        onCtaClick={scrollToTool}
      />

      {/* Use Cases */}
      <UseCases
        title="Who Uses AI Humanizer?"
        subtitle="Trusted by students, professionals, and content creators worldwide."
        cases={[
          { icon: GraduationCap, title: "Students & Academics", description: "Ensure your AI-assisted research papers pass Turnitin and institutional checks.", example: "Humanize a 3,000-word essay in under 30 seconds" },
          { icon: PenTool, title: "Content Writers", description: "Speed up content production while maintaining an authentic voice.", example: "Process 20 blog posts per hour with natural output" },
          { icon: Briefcase, title: "Marketing Teams", description: "Scale content creation without triggering AI detection on publishing platforms.", example: "Humanize email campaigns and social media copy" },
          { icon: FileText, title: "SEO Professionals", description: "Generate AI content that passes Google's helpful content guidelines.", example: "Bulk process SEO articles for authentic readability" },
          { icon: Users, title: "Freelancers", description: "Deliver content that clients can't distinguish from fully human-written work.", example: "Meet client quality standards while working 3x faster" },
          { icon: Star, title: "Bloggers & Publishers", description: "Maintain editorial standards across high-volume publishing schedules.", example: "Publish 5 articles daily that all read naturally" },
        ]}
      />

      {/* Testimonials */}
      <Testimonials
        heading="Trusted by 10,000+ Content Creators"
        testimonials={[
          { name: "Alex Rivera", title: "Graduate Student", rating: 5, quote: "Saved my thesis. Every chapter passed Turnitin with flying colors after humanization.", metric: "0% AI detected on Turnitin" },
          { name: "Jennifer Lee", title: "Content Marketing Manager", rating: 5, quote: "We process 50+ articles weekly through this tool. Not a single one has been flagged.", metric: "50+ articles/week processed" },
          { name: "Raj Patel", title: "Freelance Writer", rating: 5, quote: "The intensity slider is a game-changer. Light mode is perfect for quick touch-ups.", metric: "3x faster content delivery" },
          { name: "Sofia Martinez", title: "SEO Agency Owner", rating: 5, quote: "Our clients' content reads naturally and ranks well. This tool is essential to our workflow.", metric: "200+ clients served" },
          { name: "Mike Chen", title: "Blogger", rating: 4, quote: "The heavy mode completely transforms the text. It's like having a professional editor.", metric: "Published 1,000+ humanized posts" },
          { name: "Anna Kowalski", title: "Academic Researcher", rating: 5, quote: "Originality.ai shows 0% AI every time. This is the most reliable humanizer I've tested.", metric: "0% AI on Originality.ai" },
        ]}
      />

      {/* Comparison Table */}
      <ComparisonTable
        title="Why AI Writer Pros Humanizer Leads the Market"
        ourName="AI Writer Pros"
        competitor1Name="QuillBot"
        competitor2Name="Undetectable AI"
        rows={[
          { feature: "Adjustable intensity levels", us: true, competitor1: false, competitor2: true },
          { feature: "99% bypass rate", us: true, competitor1: false, competitor2: true },
          { feature: "Side-by-side comparison", us: true, competitor1: true, competitor2: false },
          { feature: "Word count preservation", us: true, competitor1: true, competitor2: false },
          { feature: "Re-humanize option", us: true, competitor1: false, competitor2: false },
          { feature: "Free tier available", us: true, competitor1: true, competitor2: false },
          { feature: "No word limits", us: true, competitor1: false, competitor2: false },
          { feature: "Processing speed", us: "< 10 sec", competitor1: "5-15 sec", competitor2: "30-60 sec" },
        ]}
      />

      {/* FAQ */}
      <FAQSection
        toolName="the AI Humanizer"
        faqs={[
          { question: "How does the AI Humanizer work?", answer: "Our AI analyzes the patterns that AI detectors look for — repetitive sentence structures, predictable word choices, and uniform paragraph lengths — then rewrites your content with natural variations, idiomatic expressions, and human-like imperfections." },
          { question: "Which AI detectors does it bypass?", answer: "Our humanizer is tested against GPTZero, Turnitin, Originality.ai, Content at Scale, Copyleaks, and Writer.com's AI detector. We maintain a 99% success rate across all major platforms." },
          { question: "Does it preserve the original meaning?", answer: "Yes! Our AI is designed to maintain the core meaning, facts, and arguments of your original text. The 'Light' intensity mode makes minimal changes while still bypassing detection." },
          { question: "What's the difference between Light, Medium, and Heavy?", answer: "Light makes subtle word substitutions and sentence restructuring. Medium provides a balanced rewrite that significantly changes the text while preserving meaning. Heavy completely rewrites the content from scratch using the same ideas." },
          { question: "Is there a word limit?", answer: "There's no hard word limit per submission. However, for best results, we recommend processing content in chunks of 2,000-3,000 words at a time." },
          { question: "Is my content stored or shared?", answer: "No. We process your content in real-time and don't store it after generation. Your privacy is our priority, and we never share content with third parties." },
          { question: "Can it humanize content from any AI tool?", answer: "Yes! It works with content from ChatGPT, Claude, Gemini, Copilot, Jasper, and any other AI writing tool." },
          { question: "Will humanized content rank well on Google?", answer: "Yes. Google's guidelines focus on content quality and helpfulness, not whether AI was involved. Our humanizer improves readability and natural flow, which can actually help with SEO." },
          { question: "Can I re-humanize content?", answer: "Absolutely! Use the re-humanize button to generate a different version without re-pasting your original text. Each run produces unique output." },
          { question: "Is it suitable for academic use?", answer: "Our tool is designed for content that you've created with AI assistance. We encourage ethical use — the humanizer helps ensure your AI-assisted work reads naturally, not to misrepresent fully AI-generated work as your own." },
        ]}
      />

      {/* Final CTA */}
      <FinalCTA
        headline="Make Your AI Content Undetectable in Seconds"
        subheadline="Join 10,000+ creators who trust AI Writer Pros to humanize their content with a 99% success rate."
        ctaText="Humanize My Content Free"
        onCtaClick={scrollToTool}
        secondaryCtaText="View Pricing"
        benefits={["99% bypass rate", "Free to try", "No word limits", "Instant results"]}
      />

      <Footer />
    </div>
  );
}
