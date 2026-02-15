import { Navigation } from "@/components/navigation";
import { FromOurBlog } from "@/components/blog/FromOurBlog";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Users, Star, Zap, Target, TrendingUp, BarChart3, Clock, Layers, Settings, Briefcase, ShoppingCart, Heart, Home, ChevronRight, CheckCircle, Copy } from "lucide-react";
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

export default function EmailGenerator() {

  // Define FAQs for Schema Injection
  const faqs = [
    { question: "How does the AI Email Generator work?", answer: "Enter your email topic, select type and tone, choose your audience and sequence length. Our AI generates complete email campaigns with subject lines, body copy, and CTAs optimized for engagement." },
    { question: "Can I generate multi-email sequences?", answer: "Yes! Choose from 3, 5, or 7-email sequences. Each email builds on the previous one with suggested send timing between emails for maximum engagement." },
    { question: "What email types are supported?", answer: "We support Promotional, Welcome Sequence, Newsletter, Product Launch, Re-engagement, and Sales Sequence templates — covering the most common email marketing needs." },
    { question: "Will these emails actually convert?", answer: "Our emails are based on proven copywriting frameworks (AIDA, PAS, etc.) and optimized with power words, urgency triggers, and clear CTAs. Users report an average 47% increase in open rates." },
    { question: "Can I customize the tone?", answer: "Absolutely! Choose from Professional, Friendly, Urgent, Casual, or Formal tones to match your brand voice perfectly." },
    { question: "Is there a free tier?", answer: "Yes, you can generate emails for free. Premium plans unlock multi-email sequences and advanced features." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <SEOHead 
        title="AI Email Generator - High-Converting Campaigns | AI Writer Pros"
        description="Generate professional email campaigns, sequences, and newsletters with AI. 6 email types, 5 tones, multi-email sequences up to 7 emails."
        keywords="email generator, AI email, email marketing, email campaign, email sequence, newsletter generator, Copy.ai alternative"
        canonical="https://aiwriterpros.com/email-generator"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              "name": "AI Email Campaign Generator",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "8000", "bestRating": "5" },
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
              "review": [
                {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Rachel Kim" },
                    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                    "reviewBody": "Our abandoned cart recovery rate jumped 62% using AI-generated email sequences."
                },
                {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Tom Bradley" },
                    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                    "reviewBody": "The 7-email onboarding sequence reduced churn by 35% in the first month."
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
            <span className="text-foreground font-medium" aria-current="page">Email Generator</span>
        </nav>
      </div>

      <main>
        {/* Hero Section */}
        <section className="relative pt-10 pb-16 md:pt-20 md:pb-24 overflow-hidden">
          <div className="container px-4 mx-auto relative z-10 text-center">
            {/* Freshness Badge - CTR Optimization */}
            <Badge variant="outline" className="mb-6 py-2 px-4 rounded-full text-sm font-medium bg-primary/10 text-primary border-primary/20 animate-fade-in">
              📧 Updated for 2026: AI Campaigns That Convert
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              AI Email Generator <br className="hidden md:block" />
              <span className="text-primary">Write Emails That Get Opened & Clicked</span>
            </h1>

            {/* ANSWER-FIRST AEO DEFINITION BLOCK */}
            <div className="max-w-3xl mx-auto mb-8 text-left md:text-center">
              <p className="text-lg text-foreground/90 leading-relaxed">
                The <strong className="text-primary">AI Writer Pros Email Generator</strong> is a free marketing tool that creates 
                <strong> high-converting email campaigns</strong> and multi-step drip sequences in seconds. 
                It utilizes A/B tested subject lines and proven copywriting frameworks to boost open rates by up to 47%, 
                generating newsletters, welcome flows, and sales emails tailored to your specific audience.
              </p>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              Stop staring at blank screens. Generate complete email campaigns, multi-step sequences, and high-converting newsletters in seconds — with AI-optimized subject lines, body copy, and CTAs for any audience.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 w-full sm:w-auto">
                Generate My Email Now
                <Zap className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                <span className="flex items-center"><Mail className="h-4 w-4 mr-1 text-blue-500" /> 6 Email Types</span>
                <span className="flex items-center"><BarChart3 className="h-4 w-4 mr-1 text-purple-500" /> A/B Variants</span>
                <span className="flex items-center"><Layers className="h-4 w-4 mr-1 text-green-500" /> Up to 7-Email Sequences</span>
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
                    <Settings className="h-4 w-4 mr-2" />
                    Email Settings
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x">
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                        <Label>Email Topic / Purpose</Label>
                        {/* Added ARIA Label */}
                        <Input placeholder="e.g., Launching our new summer collection" aria-label="Enter email topic" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Email Type</Label>
                            <Select defaultValue="promotional">
                                <SelectTrigger aria-label="Select email type"><SelectValue /></SelectTrigger>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Tone</Label>
                            <Select defaultValue="urgent">
                                <SelectTrigger aria-label="Select tone"><SelectValue /></SelectTrigger>
                            </Select>
                        </div>
                    </div>
                    <Button className="w-full mt-2" size="lg">Generate Email Campaign <Zap className="ml-2 h-4 w-4" /></Button>
                  </div>
                  <div className="p-6 bg-muted/10">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold flex items-center"><Mail className="h-4 w-4 mr-2" /> Generated Email</h3>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Open Rate: High</Badge>
                    </div>
                    <div className="space-y-3 opacity-50">
                        <div className="h-4 bg-muted rounded w-1/3 mb-4"></div>
                        <div className="h-4 bg-muted rounded w-full"></div>
                        <div className="h-4 bg-muted rounded w-full"></div>
                        <div className="h-4 bg-muted rounded w-full"></div>
                        <div className="h-4 bg-muted rounded w-2/3"></div>
                        <div className="h-10 bg-muted rounded w-1/3 mt-6"></div>
                    </div>
                  </div>
                </div>
              </MockToolPreview>
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

        {/* Renamed to Descriptive Heading for SEO */}
        <FeaturesGrid 
          title="Complete Email Marketing Suite" 
          subtitle="Everything you need to create email campaigns that open, engage, and convert — powered by AI intelligence."
          features={[
            { icon: Mail, title: "6 Campaign Templates", description: "Pre-built for every occasion", bullets: ["Welcome sequences", "Product launches", "Newsletters", "Sales funnels", "Re-engagement", "Promotional"], gradient: "from-red-500 to-pink-500" },
            { icon: Layers, title: "Multi-Email Sequences", description: "Complete funnel automation", bullets: ["3, 5, or 7-email series", "Suggested send timing", "Progressive messaging", "CTA optimization"], gradient: "from-blue-500 to-purple-500" },
            { icon: Target, title: "AI Audience Intelligence", description: "Smart audience profiling", bullets: ["Industry-based targeting", "Awareness level matching", "Demographic customization", "Auto-persona generation"], gradient: "from-green-500 to-teal-500" },
            { icon: BarChart3, title: "Subject Line Generator", description: "5 AI-optimized variants", bullets: ["Urgency-focused lines", "Curiosity-driven hooks", "Benefit-led openers", "Estimated open rates"], gradient: "from-amber-500 to-orange-500" },
            { icon: Settings, title: "AI Topic Ideas & Type Matching", description: "Never start from scratch", bullets: ["10 topic ideas per industry", "Auto email type detection", "Match % suggestions", "Campaign goal targeting"], gradient: "from-indigo-500 to-blue-500" },
            { icon: Clock, title: "Strategy Advisor & A/B Testing", description: "Data-driven optimization", bullets: ["Sequence strategy planner", "A/B test variations", "CTA goal optimizer", "Pre-generation scoring"], gradient: "from-purple-500 to-pink-500" },
          ]}
        />

        {/* Internal Linking Block */}
        <div className="container mx-auto px-4 text-center pb-12">
             <p className="text-muted-foreground">
                 Need to distribute content? Convert your newsletter into social posts with our <Link to="/content-repurposing" className="text-primary hover:underline">Content Repurposing Tool</Link> or create visuals with our <Link to="/social-media-suite" className="text-primary hover:underline">Social Media Suite</Link>.
             </p>
        </div>

        <HowItWorks 
          steps={[
            { icon: Settings, title: "Configure Campaign", description: "Choose email type, tone, audience, and sequence length for your campaign." },
            { icon: Zap, title: "AI Generates Content", description: "Our AI writes subject lines, body copy, CTAs, and A/B variants optimized for conversions." },
            { icon: Mail, title: "Send & Convert", description: "Copy to your email platform, customize details, and start your campaign." },
          ]}
          ctaText="Create My Email Campaign"
          ctaLink="/auth"
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

        {/* COMPETITOR CONTEXT BLOCK FOR SEO RANKING */}
        <div className="max-w-4xl mx-auto mt-8 text-center bg-muted/30 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">AI Writer Pros vs. Copy.ai and ChatGPT</h3>
          <p className="text-muted-foreground leading-relaxed">
            While <strong>ChatGPT</strong> writes generic emails, AI Writer Pros acts as a specialized <strong>campaign strategist</strong> that suggests 
            <strong>multi-email sequences</strong> and optimal send times. Unlike <strong>Copy.ai</strong>, which requires manual assembly, 
            our tool generates complete <strong>7-email funnels</strong> with consistent audience targeting in a single click.
          </p>
        </div>

        <FAQSection 
          toolName="the AI Email Generator" 
          faqs={faqs}
        />

        <FromOurBlog 
          postIds={["ai-content-strategy-playbook", "ai-writing-prompts-tips-techniques", "best-ai-writing-tools-2025"]}
          heading="Email Marketing Resources"
        />

        <FinalCTA 
          headline="Start Writing Emails That Convert" 
          subheadline="Join 8,000+ marketers using AI to create high-performing email campaigns." 
          ctaText="Generate My First Email Free" 
          ctaLink="/auth" 
          benefits={["6 email types", "Multi-email sequences", "No credit card required", "A/B variants included"]}
        />
        
        {/* Experience Signal Text Block for E-E-A-T */}
        <div className="text-center pb-12 text-sm text-muted-foreground">
             <p>Trusted by <strong>8,000+ marketers</strong> who have generated over <strong>500,000 emails</strong> to increase open rates by an average of 47%.</p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
