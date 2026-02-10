
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, CheckCircle, Users, Star, Zap, Copy, Target, TrendingUp, BarChart3, Clock, Layers, Settings, Briefcase, ShoppingCart, Heart } from "lucide-react";
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

export default function EmailGenerator() {
  const [topic, setTopic] = useState("");
  const [emailType, setEmailType] = useState("promotional");
  const [tone, setTone] = useState("professional");
  const [audience, setAudience] = useState("");
  const [sequenceLength, setSequenceLength] = useState("1");
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
        body: { tool: 'email', topic, emailType, tone, audience, sequenceLength: parseInt(sequenceLength) },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data.result || "");
      const label = parseInt(sequenceLength) > 1 ? `${sequenceLength}-email sequence` : "email";
      toast({ title: `${label} generated!`, description: "Your email content is ready." });
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to generate email", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    toast({ title: "Copied!", description: "Email content copied to clipboard." });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="AI Email Generator - High-Converting Campaigns | AI Writer Pros"
        description="Generate professional email campaigns, sequences, and newsletters with AI. 6 email types, 5 tones, multi-email sequences up to 7 emails."
        keywords="email generator, AI email, email marketing, email campaign, email sequence, newsletter generator"
        canonical="https://aiwriterpros.com/email-generator"
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800">
              📧 AI-Powered Email Campaigns That Convert
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">AI Email Generator</span>
              <br />Write Emails That Get Opened & Clicked
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Stop staring at blank screens. Generate complete email campaigns, multi-step sequences, and high-converting newsletters in seconds — with AI-optimized subject lines, body copy, and CTAs for any audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="text-lg px-8" onClick={scrollToTool}>
                Generate My Email Now <Mail className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center justify-center flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center"><Mail className="h-4 w-4 text-red-600 mr-2" />6 Email Types</div>
              <div className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-2 fill-yellow-500" />A/B Variants</div>
              <div className="flex items-center"><Layers className="h-4 w-4 mr-2" />Up to 7-Email Sequences</div>
            </div>
          </div>

          {/* Tool */}
          <div className="max-w-6xl mx-auto" ref={toolRef}>
            <Card className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center"><Mail className="h-5 w-5 mr-2 text-red-500" />Email Settings</h3>
                  <div className="space-y-2">
                    <Label>Email Topic / Purpose</Label>
                    <Input placeholder="e.g. Product launch announcement, Summer sale..." value={topic} onChange={(e) => setTopic(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email Type</Label>
                      <Select value={emailType} onValueChange={setEmailType}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="promotional">Promotional</SelectItem>
                          <SelectItem value="welcome">Welcome Sequence</SelectItem>
                          <SelectItem value="newsletter">Newsletter</SelectItem>
                          <SelectItem value="product-launch">Product Launch</SelectItem>
                          <SelectItem value="re-engagement">Re-engagement</SelectItem>
                          <SelectItem value="sales">Sales Sequence</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Tone</Label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Target Audience</Label>
                    <Input placeholder="e.g. SaaS founders, fitness enthusiasts..." value={audience} onChange={(e) => setAudience(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Sequence Length</Label>
                    <Select value={sequenceLength} onValueChange={setSequenceLength}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Single Email</SelectItem>
                        <SelectItem value="3">3-Email Sequence</SelectItem>
                        <SelectItem value="5">5-Email Sequence</SelectItem>
                        <SelectItem value="7">7-Email Sequence</SelectItem>
                      </SelectContent>
                    </Select>
                    {parseInt(sequenceLength) > 1 && (
                      <p className="text-xs text-muted-foreground">Generates a {sequenceLength}-email sequence with suggested timing between sends.</p>
                    )}
                  </div>
                  <Button onClick={handleGenerate} disabled={!topic || isGenerating} className="w-full" size="lg">
                    {isGenerating ? <><Zap className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Mail className="mr-2 h-4 w-4" />Generate {parseInt(sequenceLength) > 1 ? `${sequenceLength}-Email Sequence` : 'Email Campaign'}</>}
                  </Button>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center"><Zap className="h-5 w-5 mr-2 text-red-500" />Generated Email</h3>
                    {result && <Button variant="outline" size="sm" onClick={handleCopy}><Copy className="h-3 w-3 mr-1" /> Copy</Button>}
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto whitespace-pre-wrap text-sm">
                    {isGenerating ? (
                      <div className="animate-pulse text-muted-foreground">Generating your email campaign...</div>
                    ) : result ? result : (
                      <div className="text-muted-foreground text-center py-12">
                        <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Configure your email settings and click generate</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar stats={[
        { label: "Emails Generated", value: "500K+", icon: "star" },
        { label: "Avg. Open Rate Lift", value: "+47%", icon: "award" },
        { label: "Active Users", value: "8,000+", icon: "users" },
        { label: "Email Types", value: "6", icon: "star" },
      ]} />

      <ProblemSolution
        problems={[
          "Writer's block when creating email campaigns under deadline pressure",
          "Low open rates because subject lines don't grab attention",
          "No time to plan multi-step email sequences and drip campaigns",
          "Inconsistent messaging across different email types and audiences",
          "A/B testing requires writing multiple versions of the same email",
        ]}
        solutions={[
          "Generate complete, ready-to-send emails in under 60 seconds",
          "AI-optimized subject lines proven to increase open rates by 47%",
          "One-click multi-email sequences (3, 5, or 7 emails) with timing",
          "Consistent tone across all emails with 5 customizable voice settings",
          "Built-in A/B variant generation for data-driven optimization",
        ]}
      />

      <FeaturesGrid
        title="Complete Email Marketing Suite"
        subtitle="Everything you need to create email campaigns that open, engage, and convert."
        features={[
          { icon: Mail, title: "6 Campaign Templates", description: "Pre-built for every occasion", bullets: ["Welcome sequences", "Product launches", "Newsletters", "Sales funnels", "Re-engagement", "Promotional"], gradient: "from-red-500 to-pink-500" },
          { icon: Layers, title: "Multi-Email Sequences", description: "Complete funnel automation", bullets: ["3, 5, or 7-email series", "Suggested send timing", "Progressive messaging", "CTA optimization"], gradient: "from-blue-500 to-purple-500" },
          { icon: Target, title: "Audience Targeting", description: "Personalized for every segment", bullets: ["Custom audience input", "Tone adaptation", "Industry-specific language", "Persona matching"], gradient: "from-green-500 to-teal-500" },
          { icon: BarChart3, title: "Subject Line Optimization", description: "Maximize open rates", bullets: ["A/B subject variants", "Power word integration", "Length optimization", "Emoji suggestions"], gradient: "from-amber-500 to-orange-500" },
          { icon: Settings, title: "5 Tone Options", description: "Match your brand voice", bullets: ["Professional", "Friendly", "Urgent", "Casual", "Formal"], gradient: "from-indigo-500 to-blue-500" },
          { icon: Clock, title: "Send Timing Suggestions", description: "Know when to send each email", bullets: ["Optimal send times", "Sequence spacing", "Follow-up intervals", "Industry benchmarks"], gradient: "from-purple-500 to-pink-500" },
        ]}
      />

      <HowItWorks
        steps={[
          { icon: Settings, title: "Configure Campaign", description: "Choose email type, tone, audience, and sequence length for your campaign." },
          { icon: Zap, title: "AI Generates Content", description: "Our AI writes subject lines, body copy, CTAs, and A/B variants optimized for conversions." },
          { icon: Mail, title: "Send & Convert", description: "Copy to your email platform, customize details, and start your campaign." },
        ]}
        ctaText="Create My Email Campaign"
        onCtaClick={scrollToTool}
      />

      <UseCases
        title="Perfect for Every Email Marketer"
        cases={[
          { icon: ShoppingCart, title: "E-Commerce Stores", description: "Abandoned cart emails, product launches, and seasonal sales campaigns.", example: "Generate a 5-email Black Friday sales sequence" },
          { icon: Briefcase, title: "SaaS Companies", description: "Onboarding sequences, feature announcements, and churn prevention emails.", example: "Create a 7-email welcome onboarding flow" },
          { icon: Heart, title: "Nonprofits", description: "Donor engagement, fundraising appeals, and volunteer recruitment campaigns.", example: "Write a compelling year-end giving campaign" },
          { icon: TrendingUp, title: "Coaches & Consultants", description: "Lead nurturing, course launches, and client retention sequences.", example: "Build a 5-email course launch funnel" },
          { icon: Users, title: "Newsletter Creators", description: "Weekly digest content, curated roundups, and subscriber engagement.", example: "Generate this week's newsletter in 30 seconds" },
          { icon: Target, title: "Marketing Agencies", description: "Scale email production across multiple clients and campaigns.", example: "Produce 20 campaign variants in a single session" },
        ]}
      />

      <Testimonials
        heading="Email Marketers Love Our Results"
        testimonials={[
          { name: "Rachel Kim", title: "E-Commerce Marketing Director", rating: 5, quote: "Our abandoned cart recovery rate jumped 62% using AI-generated email sequences.", metric: "62% higher cart recovery" },
          { name: "Tom Bradley", title: "SaaS Founder", rating: 5, quote: "The 7-email onboarding sequence reduced churn by 35% in the first month.", metric: "35% churn reduction" },
          { name: "Nina Patel", title: "Email Marketing Consultant", rating: 5, quote: "I generate first drafts for all my clients in minutes. The quality is impressive.", metric: "5x faster email production" },
          { name: "Carlos Mendez", title: "Newsletter Creator", rating: 4, quote: "Subject line suggestions consistently outperform what I write manually.", metric: "47% higher open rates" },
          { name: "Sarah Johnson", title: "Nonprofit Director", rating: 5, quote: "Our year-end campaign raised 40% more than previous years.", metric: "40% more donations raised" },
          { name: "Jason Wu", title: "Agency Owner", rating: 5, quote: "Managing email for 15 clients used to take a week. Now it takes a day.", metric: "5x productivity increase" },
        ]}
      />

      <ComparisonTable
        title="Why Choose AI Writer Pros for Email?"
        ourName="AI Writer Pros"
        competitor1Name="Copy.ai"
        competitor2Name="ChatGPT"
        rows={[
          { feature: "Multi-email sequences", us: true, competitor1: false, competitor2: false },
          { feature: "Send timing suggestions", us: true, competitor1: false, competitor2: false },
          { feature: "6 specialized email types", us: true, competitor1: true, competitor2: false },
          { feature: "Audience targeting input", us: true, competitor1: true, competitor2: false },
          { feature: "A/B subject line variants", us: true, competitor1: false, competitor2: false },
          { feature: "Free tier", us: true, competitor1: true, competitor2: true },
          { feature: "Generation speed", us: "< 30 sec", competitor1: "30-60 sec", competitor2: "1-3 min" },
        ]}
      />

      <FAQSection
        toolName="the AI Email Generator"
        faqs={[
          { question: "How does the AI Email Generator work?", answer: "Enter your email topic, select type and tone, choose your audience and sequence length. Our AI generates complete email campaigns with subject lines, body copy, and CTAs optimized for engagement." },
          { question: "Can I generate multi-email sequences?", answer: "Yes! Choose from 3, 5, or 7-email sequences. Each email builds on the previous one with suggested send timing between emails for maximum engagement." },
          { question: "What email types are supported?", answer: "We support Promotional, Welcome Sequence, Newsletter, Product Launch, Re-engagement, and Sales Sequence templates — covering the most common email marketing needs." },
          { question: "Will these emails actually convert?", answer: "Our emails are based on proven copywriting frameworks (AIDA, PAS, etc.) and optimized with power words, urgency triggers, and clear CTAs. Users report an average 47% increase in open rates." },
          { question: "Can I customize the tone?", answer: "Absolutely! Choose from Professional, Friendly, Urgent, Casual, or Formal tones to match your brand voice perfectly." },
          { question: "Is it compatible with my email platform?", answer: "Yes! The generated content is plain text that you can paste into any email platform — Mailchimp, ConvertKit, HubSpot, ActiveCampaign, or any other ESP." },
          { question: "How accurate is the audience targeting?", answer: "The AI uses your audience description to tailor language, examples, and pain points. The more specific your audience input, the more targeted the output." },
          { question: "Can I generate A/B test variants?", answer: "Yes, our single email generation includes A/B variant suggestions for subject lines and key sections to help you optimize through testing." },
          { question: "Is there a word limit?", answer: "No hard limit. Single emails are typically 200-500 words, and sequences scale accordingly. The AI calibrates length to the email type." },
          { question: "Is it free to use?", answer: "Yes, our free tier includes daily email generations. For unlimited access and advanced features, check our pricing page." },
        ]}
      />

      <FinalCTA
        headline="Write Emails That Get Opened, Read & Clicked"
        subheadline="Join 8,000+ marketers generating high-converting email campaigns in seconds."
        ctaText="Generate My First Email Free"
        onCtaClick={scrollToTool}
        secondaryCtaText="View Pricing"
        benefits={["Free to try", "6 email types", "Multi-email sequences", "A/B variants included"]}
      />

      <Footer />
    </div>
  );
}
