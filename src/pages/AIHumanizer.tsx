import { Navigation } from "@/components/navigation";
import { FromOurBlog } from "@/components/blog/FromOurBlog";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Bot, Shield, CheckCircle, Zap, Star, Users, FileText, Eye, Lock, GraduationCap, Briefcase, PenTool, Settings, Layers, ArrowRight, Home, ChevronRight } from "lucide-react";
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
import { MockToolPreview } from "@/components/landing/MockToolPreview";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function AIHumanizer() {

  // Define FAQs data for Schema injection
  const faqs = [
    { question: "How does the AI Humanizer work?", answer: "Our AI analyzes the patterns that AI detectors (like GPTZero and Originality.ai) look for and rewrites your content to eliminate those patterns while preserving the original meaning and quality." },
    { question: "Which AI detectors can it bypass?", answer: "We consistently bypass GPTZero, Turnitin, Originality.ai, Content at Scale, Copyleaks, and other major detection tools with a 99% success rate." },
    { question: "Will the meaning of my content change?", answer: "No. Our AI preserves the core meaning while rewriting the text structure and word choices. The message stays the same, only the delivery changes." },
    { question: "What's the difference between intensity levels?", answer: "Light makes subtle word-level changes, Medium rewrites sentences while keeping structure, and Heavy completely restructures and rewrites the entire content." },
    { question: "Is there a word limit?", answer: "Free accounts can process up to 1,000 words per generation. Premium accounts have no word limits." },
    { question: "Is my content stored?", answer: "No. We process your content in real-time and do not store any input or output text. Your content remains completely private." },
    { question: "Can I use this for academic papers?", answer: "Yes, many students use our tool for AI-assisted academic writing. However, always follow your institution's policies on AI tool usage." },
    { question: "How fast is the processing?", answer: "Most content is humanized in under 10 seconds, regardless of length. Complex or heavy-mode processing may take slightly longer." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <SEOHead 
        title="AI Humanizer: Bypass AI Detection - Turnitin & GPTZero Remover"
        description="Transform AI-generated text into natural, human-like content that bypasses GPTZero, Turnitin, and Originality.ai with 99% success rate."
        keywords="AI humanizer, bypass AI detection, GPTZero bypass, undetectable AI, content humanizer, Turnitin bypass"
        canonical="https://aiwriterpros.com/ai-humanizer"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              "name": "AI Humanizer",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "3214", "bestRating": "5" },
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
              "review": [
                {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Alex Rivera" },
                    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                    "reviewBody": "Saved my thesis. Every chapter passed Turnitin with flying colors after humanization."
                },
                {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Jennifer Lee" },
                    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                    "reviewBody": "We process 50+ articles weekly through this tool. Not a single one has been flagged."
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
            <span className="text-foreground font-medium" aria-current="page">AI Humanizer</span>
        </nav>
      </div>

      <main>
        {/* Hero Section */}
        <section className="relative pt-10 pb-16 md:pt-20 md:pb-24 overflow-hidden">
          <div className="container px-4 mx-auto relative z-10 text-center">
            {/* Freshness Badge - "Updated for 2026" */}
            <Badge variant="outline" className="mb-6 py-2 px-4 rounded-full text-sm font-medium bg-primary/10 text-primary border-primary/20 animate-fade-in">
              🛡️ Updated for 2026: 99% Success Rate vs Turnitin
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              AI Humanizer: <br className="hidden md:block" />
              <span className="text-primary">Make AI Content Truly Undetectable</span>
            </h1>

            {/* ANSWER-FIRST AEO DEFINITION BLOCK */}
            <div className="max-w-3xl mx-auto mb-8 text-left md:text-center">
              <p className="text-lg text-foreground/90 leading-relaxed">
                <strong className="text-primary">AI Writer Pros Humanizer</strong> is a free AI-to-human text converter designed to 
                <strong> bypass AI detection</strong>. It restructures machine-generated text to remove the digital watermarks tracked by 
                <strong> Turnitin, GPTZero, and Originality.ai</strong> while preserving your original meaning.
              </p>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              Transform AI-generated content into natural, human-like text that bypasses all major AI detection tools. Adjustable intensity from light touch-ups to complete rewrites.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 w-full sm:w-auto">
                Humanize My Content Now
                <Zap className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                <span className="flex items-center"><CheckCircle className="h-4 w-4 mr-1 text-green-500" /> 99% Bypass Rate</span>
                <span className="flex items-center"><Star className="h-4 w-4 mr-1 text-yellow-500" /> 4.8/5 Rating</span>
                <span className="flex items-center"><Users className="h-4 w-4 mr-1 text-blue-500" /> 10,000+ Users</span>
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
                    Humanization Intensity: Medium
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center text-muted-foreground"><Bot className="h-5 w-5 mr-2" />AI-Generated Content</h3>
                    {/* Added ARIA Label for Accessibility SEO */}
                    <Textarea 
                        placeholder="Paste your ChatGPT or Claude text here..." 
                        aria-label="Input text to humanize"
                        className="min-h-[200px] resize-none border-dashed" 
                    />
                    <div className="mt-4 flex justify-between items-center">
                       <span className="text-xs text-muted-foreground">0 words</span>
                       <div className="flex gap-2">
                         <span className="h-2 w-2 rounded-full bg-blue-500" title="Light"></span>
                         <span className="h-2 w-2 rounded-full bg-yellow-500 ring-2 ring-offset-1 ring-yellow-500" title="Medium"></span>
                         <span className="h-2 w-2 rounded-full bg-red-500" title="Heavy"></span>
                       </div>
                    </div>
                  </div>
                  <div className="p-6 bg-muted/10">
                    <h3 className="text-lg font-semibold mb-2 flex items-center"><Shield className="h-5 w-5 mr-2 text-green-600" />Humanized Content</h3>
                    {/* Added ARIA Label for Accessibility SEO */}
                    <Textarea 
                        placeholder="Your humanized content will appear here..." 
                        aria-label="Humanized text output"
                        className="min-h-[200px] resize-none bg-muted/30" 
                        disabled 
                    />
                  </div>
                </div>
              </MockToolPreview>
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

        {/* Before/After Comparison - Multimodal Evidence */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Proof: See the Difference in Detection Scores</h2>
              <p className="text-xl text-muted-foreground">Real results showing how we lower AI detection scores from 98% to nearly 0%.</p>
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
            {/* Visual Context for AI Bots - Hidden Text for Data Extraction */}
             <p className="sr-only">
               Table showing detection reduction: GPTZero drops from 98% to 2%, 
               Originality.ai from 95% to 1%, and Turnitin from 92% to 3%.
             </p>
          </div>
        </section>

        {/* Renamed Feature Header for SEO - Action Oriented */}
        <FeaturesGrid 
          title="How Our Technology Bypasses AI Detection" 
          subtitle="AI pattern analysis, 7 writing styles, 15 industry customizations, bulk processing, and version alternatives."
          features={[
            { icon: Eye, title: "AI Pattern Analyzer: Scan for GPTZero", description: "Pre-humanization intelligence", bullets: ["AI detection score (0-100%)", "Flagged patterns with reasons", "Content type detection", "Intensity recommendation"], gradient: "from-green-500 to-teal-500" },
            { icon: Settings, title: "Style & Industry Control", description: "Deep customization", bullets: ["7 writing style options", "15 industry adaptations", "Readability target slider", "Content source detector"], gradient: "from-blue-500 to-purple-500" },
            { icon: Shield, title: "Intensity & Comparison", description: "Full control over output", bullets: ["3-level intensity slider", "Side-by-side diff view", "Before/after metrics", "Synchronized scrolling"], gradient: "from-amber-500 to-orange-500" },
            { icon: Layers, title: "Bulk & Version Control", description: "Process at scale", bullets: ["Paragraph-by-paragraph mode", "3 alternative versions", "Version blending", "Per-paragraph regeneration"], gradient: "from-red-500 to-pink-500" },
            { icon: Star, title: "Originality & Quality", description: "Beyond detection bypass", bullets: ["Uniqueness scoring", "Cliché detection", "Rephrasing suggestions", "Platform destination tuning"], gradient: "from-indigo-500 to-blue-500" },
            { icon: Lock, title: "Export & Integration", description: "Seamless workflow", bullets: ["5 export formats", "Tracked changes in .docx", "Send to Blog Creator", "Send to Email Generator"], gradient: "from-purple-500 to-pink-500" },
          ]}
        />
        
        {/* Internal Linking Block - Safe implementation outside FeaturesGrid */}
        <div className="container mx-auto px-4 text-center pb-12">
            <p className="text-muted-foreground">
                Looking for more tools? Seamlessly integrate your humanized content with our <Link to="/blog-creator" className="text-primary hover:underline">Blog Post Creator</Link> or create a distribution strategy with our <Link to="/social-media-suite" className="text-primary hover:underline">Social Media Suite</Link>.
            </p>
        </div>

        <HowItWorks 
          steps={[
            { icon: Bot, title: "Paste AI Content", description: "Copy your AI-generated text from ChatGPT, Claude, or any AI tool and paste it into the input field." },
            { icon: Settings, title: "Set Intensity", description: "Choose light for subtle changes, medium for balanced rewriting, or heavy for a complete overhaul." },
            { icon: Shield, title: "Get Human Content", description: "Click humanize and receive undetectable, natural-sounding text in seconds. Copy and use anywhere." },
          ]}
          ctaText="Try It Free Now"
          ctaLink="/auth"
        />

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
            { feature: "Free tier available", us: true, competitor1: true, competitor2: true },
            { feature: "Processing speed", us: "< 10 sec", competitor1: "5-15 sec", competitor2: "10-30 sec" },
          ]}
        />

        {/* COMPETITOR CONTEXT BLOCK FOR SEO RANKING */}
        <div className="max-w-4xl mx-auto mt-8 text-center bg-muted/30 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">AI Writer Pros vs. QuillBot and Undetectable AI</h3>
          <p className="text-muted-foreground leading-relaxed">
            While <strong>QuillBot</strong> is excellent for basic paraphrasing, it often fails to remove deep AI watermarks detected by Turnitin. 
            <strong>Undetectable AI</strong> offers strong humanization but lacks the granular control and side-by-side verification that AI Writer Pros provides. 
            Our tool is specifically engineered to preserve your original word count and intent while ensuring a 99% bypass rate across all major detectors.
          </p>
        </div>

        <FAQSection 
          toolName="the AI Humanizer" 
          faqs={faqs}
        />

        <FromOurBlog 
          postIds={["complete-guide-ai-writing", "ai-writing-best-practices", "google-ai-content-guidelines"]}
          heading="Learn More About AI Writing"
        />

        <FinalCTA 
          headline="Ready to Make Your AI Content Undetectable?" 
          subheadline="Join 10,000+ users who trust AI Writer Pros Humanizer to bypass all AI detection tools." 
          ctaText="Start Humanizing Free" 
          ctaLink="/auth" 
          benefits={["99% bypass rate", "No credit card required", "Adjustable intensity", "Instant results"]}
        />

        {/* Experience Signal Text Block for E-E-A-T */}
        <div className="text-center pb-12 text-sm text-muted-foreground">
             <p>Trusted by <strong>10,000+ active users</strong> who have humanized over <strong>2 million texts</strong> to bypass detection with a 99% success rate.</p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
