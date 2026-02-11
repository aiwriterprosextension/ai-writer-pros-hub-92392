
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Bot, ShoppingCart, FileText, Mail, MessageSquare, PenTool,
  Lightbulb, Target, Zap, CheckCircle, ArrowRight, BookOpen,
  TrendingUp, Clock, Shield, Star, Sparkles
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const toolGuides = [
  {
    id: "ai-humanizer",
    title: "AI Humanizer",
    icon: Bot,
    color: "from-primary to-primary/70",
    description: "Transform AI-generated content into natural, human-sounding text that bypasses detection tools.",
    tips: [
      {
        title: "Always Run the AI Pattern Analyzer First",
        detail: "Before humanizing, use the '🔍 Analyze AI Patterns' button to get a detection score and see exactly which phrases trigger AI detectors. This lets you focus your efforts where they matter most.",
        impact: "high"
      },
      {
        title: "Match Your Target Industry",
        detail: "Select the correct industry from the Content Industry dropdown (e.g., Healthcare, Finance, Technology). The AI adapts terminology and phrasing conventions specific to your niche, producing far more authentic output.",
        impact: "high"
      },
      {
        title: "Start with Medium Intensity, Then Adjust",
        detail: "The default Medium intensity (34-66%) provides the best balance between preserving meaning and removing AI patterns. Only switch to Aggressive if your detection score stays above 40% after the first pass.",
        impact: "medium"
      },
      {
        title: "Use the Side-by-Side Comparison View",
        detail: "Enable the comparison toggle to see exactly what changed. Yellow highlights show modified phrases, green shows additions, and red shows removals. This helps you verify nothing important was lost.",
        impact: "medium"
      },
      {
        title: "Try Multiple Versions for Important Content",
        detail: "Click '🔄 Try Different Versions' to generate Conversational, Professional, and Creative alternatives. Mix elements from different versions using the Blend feature for the most natural result.",
        impact: "medium"
      },
      {
        title: "Set the Right Reading Level",
        detail: "Match your target audience: Elementary for broad consumer content, College for B2B, Professional for technical papers. The AI adjusts vocabulary complexity and sentence structure accordingly.",
        impact: "low"
      },
      {
        title: "Use Bulk Mode for Long Documents",
        detail: "For content over 500 words, enable 'Process Multiple Paragraphs Separately.' This maintains consistent tone across sections while allowing you to regenerate individual paragraphs that need more work.",
        impact: "medium"
      },
      {
        title: "Save Presets for Recurring Content Types",
        detail: "If you regularly humanize blog posts or academic papers, save your preferred settings (style, industry, reading level, intensity) as a preset. One click applies all settings for your next project.",
        impact: "low"
      }
    ]
  },
  {
    id: "amazon-affiliate",
    title: "Amazon Affiliate Assistant",
    icon: ShoppingCart,
    color: "from-amber-500 to-orange-500",
    description: "Generate high-converting product reviews with SEO-optimized content and FTC-compliant disclosures.",
    tips: [
      {
        title: "Enter the Full Product Name for Best Results",
        detail: "Include brand, model number, and key variant (e.g., 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones - Black'). The more specific you are, the more accurate and detailed the generated review.",
        impact: "high"
      },
      {
        title: "Use Product URL Extraction When Available",
        detail: "Paste the Amazon product URL and let the AI auto-extract product data including price, ratings, and specifications. This ensures your review contains accurate, up-to-date information.",
        impact: "high"
      },
      {
        title: "Generate Buyer Personas Before Writing",
        detail: "Use the Buyer Persona tool to define who you're writing for — their experience level, price sensitivity, and pain points. Reviews targeted to a specific audience convert 3x better than generic ones.",
        impact: "high"
      },
      {
        title: "Always Include a Comparison Table",
        detail: "Use the Comparison Suggester to pit your product against 2-3 alternatives. Comparison tables keep readers on your page longer, improve SEO, and increase affiliate click-through rates by 40%.",
        impact: "high"
      },
      {
        title: "Add FAQ Sections for SEO Boost",
        detail: "Generate 5-8 FAQs using the FAQ Builder. These target long-tail keywords, can appear in Google's 'People Also Ask' sections, and add valuable word count to your review.",
        impact: "medium"
      },
      {
        title: "Never Skip the Disclosure Generator",
        detail: "FTC compliance is mandatory for affiliate content. Use the built-in Disclosure Generator to create a proper affiliate disclaimer. Place it prominently at the top of your review.",
        impact: "high"
      },
      {
        title: "Balance Your Tone with the Slider",
        detail: "Set the tone balance between 40-60% for the most authentic reviews. Overly positive reviews (80%+) feel fake and reduce trust. Including genuine cons actually increases conversion rates.",
        impact: "medium"
      },
      {
        title: "Target a Specific SEO Keyword",
        detail: "Enter your primary keyword in the SEO field (e.g., 'best wireless headphones 2025'). The AI weaves it naturally into headings, body text, and meta descriptions for better search rankings.",
        impact: "medium"
      }
    ]
  },
  {
    id: "content-repurposing",
    title: "Content Repurposing",
    icon: FileText,
    color: "from-green-500 to-teal-500",
    description: "Transform one piece of content into 10+ platform-optimized formats instantly.",
    tips: [
      {
        title: "Start with Your Highest-Quality Content",
        detail: "The AI works best with well-written source material. Use your best-performing blog posts, newsletters, or articles as input. Better input = dramatically better output across all formats.",
        impact: "high"
      },
      {
        title: "Use the Content Analyzer Before Repurposing",
        detail: "The Smart Content Analyzer identifies your content's key themes, tone, and structure. It recommends which formats will work best — don't skip this step, it prevents wasting time on poor format matches.",
        impact: "high"
      },
      {
        title: "Customize Per Platform, Not One-Size-Fits-All",
        detail: "Use Platform Customization to adjust tone, length, and CTAs for each channel. A LinkedIn post should sound different from an Instagram caption. Let the AI handle these nuances automatically.",
        impact: "high"
      },
      {
        title: "Generate Hashtags Separately for Each Platform",
        detail: "The Hashtag Recommendations tool provides platform-specific hashtag strategies. Instagram uses 20-30 hashtags; LinkedIn uses 3-5. Never use the same hashtag set across platforms.",
        impact: "medium"
      },
      {
        title: "Leverage the Scheduling Suggestions",
        detail: "The AI recommends optimal posting times based on platform best practices. Schedule your repurposed content strategically — don't publish everything at once. Stagger over 5-7 days for maximum reach.",
        impact: "medium"
      },
      {
        title: "Create Content Series from Long-Form Pieces",
        detail: "Use the Content Series Creator to break a 2,000-word blog post into a 5-part social media series with consistent branding and cliffhangers that keep your audience coming back.",
        impact: "medium"
      },
      {
        title: "Use Batch Export for Efficiency",
        detail: "Once you've generated multiple formats, use Batch Export to download everything at once. This saves time and ensures you have all formats ready for your content calendar.",
        impact: "low"
      },
      {
        title: "Add SEO Metadata to All Web Formats",
        detail: "Use the SEO Metadata Generator for blog summaries, web pages, and any content going on your site. Proper meta titles and descriptions can double your organic click-through rate.",
        impact: "medium"
      }
    ]
  },
  {
    id: "email-generator",
    title: "Email Generator",
    icon: Mail,
    color: "from-blue-500 to-cyan-500",
    description: "Create high-converting email campaigns, sequences, and newsletters with AI-powered optimization.",
    tips: [
      {
        title: "Define Your Audience Before Writing",
        detail: "Use the Email Audience tool to specify demographics, pain points, and goals. An email targeted at 'SaaS founders struggling with churn' will dramatically outperform one written for 'business owners.'",
        impact: "high"
      },
      {
        title: "Generate Multiple Subject Lines and A/B Test",
        detail: "The Subject Line Generator creates 5-10 variations per email. Always test at least 2-3 subject lines. A 10% improvement in open rates compounds across your entire list.",
        impact: "high"
      },
      {
        title: "Use the Email Type Suggestion Tool",
        detail: "Not sure if you need a newsletter, promotional email, or nurture sequence? The Email Type Suggestion analyzes your goal and recommends the format most likely to achieve it.",
        impact: "medium"
      },
      {
        title: "Build Multi-Step Sequences for Nurturing",
        detail: "Use the Sequence Strategy Modal to plan 3-7 email sequences. Map each email's purpose: introduce → educate → social proof → offer → urgency. The AI maintains narrative flow across all emails.",
        impact: "high"
      },
      {
        title: "Set a Clear CTA Goal for Every Email",
        detail: "Specify what action you want (click a link, reply, purchase, sign up). Emails with one focused CTA see 42% higher click rates than those with multiple competing actions.",
        impact: "high"
      },
      {
        title: "Match Tone to Your Brand Voice",
        detail: "Select the appropriate tone (Professional, Friendly, Urgent, Casual). Consistency in brand voice across email campaigns builds recognition and trust over time.",
        impact: "medium"
      },
      {
        title: "Preview Your Email Score Before Sending",
        detail: "The Email Preview Score estimates open rate, click rate, and spam score. If any metric is below target, iterate on the subject line and body copy before adding to your ESP.",
        impact: "medium"
      },
      {
        title: "Use A/B Test Variations for Key Campaigns",
        detail: "Generate A/B test variants with different hooks, CTAs, or angles. Test the winning variation on a small segment before sending to your full list. Small tests prevent big mistakes.",
        impact: "medium"
      }
    ]
  },
  {
    id: "social-media",
    title: "Social Media Suite",
    icon: MessageSquare,
    color: "from-pink-500 to-rose-500",
    description: "Create platform-optimized social content with engagement hooks, hashtags, and scheduling recommendations.",
    tips: [
      {
        title: "Choose the Right Platform First",
        detail: "Each platform has unique character limits, formatting rules, and audience expectations. Always select your target platform before generating content — a Twitter thread and a LinkedIn article need fundamentally different approaches.",
        impact: "high"
      },
      {
        title: "Use Engagement Hooks to Stop the Scroll",
        detail: "The Engagement Hooks tool generates attention-grabbing opening lines optimized for each platform. On social media, you have 1.3 seconds to capture attention. Lead with your strongest hook.",
        impact: "high"
      },
      {
        title: "Research Hashtags Before Posting",
        detail: "Use the Hashtag Research tool to find trending, niche, and branded hashtags. Mix high-volume tags (for reach) with low-competition ones (for visibility). The tool shows estimated reach for each set.",
        impact: "medium"
      },
      {
        title: "Create Thread & Carousel Content for Depth",
        detail: "The Thread/Carousel Creator breaks complex topics into digestible slides or tweets. Threads get 3x more engagement than single posts on Twitter. Carousels are the highest-saved format on Instagram.",
        impact: "high"
      },
      {
        title: "Generate Content Ideas When You're Stuck",
        detail: "The Content Idea Generator creates 10+ post ideas based on your niche, trending topics, and audience interests. Batch-generate a week's worth of content ideas in under 2 minutes.",
        impact: "medium"
      },
      {
        title: "Use the Content Calendar for Consistency",
        detail: "Map out your weekly posting schedule with the built-in Content Calendar. Consistency is the #1 factor in social media growth. Aim for 3-5 posts per week per platform minimum.",
        impact: "medium"
      },
      {
        title: "Optimize Formatting Per Platform",
        detail: "The Formatting Optimizer adds line breaks, emojis, and spacing that perform best on each platform. LinkedIn posts with line breaks get 20% more engagement than wall-of-text posts.",
        impact: "low"
      },
      {
        title: "Follow Platform Tips for Algorithm Wins",
        detail: "Check the Platform Tips section for current algorithm insights. Posting times, content types, and engagement tactics change frequently — stay updated for maximum organic reach.",
        impact: "medium"
      }
    ]
  },
  {
    id: "blog-creator",
    title: "Blog Content Creator",
    icon: PenTool,
    color: "from-violet-500 to-purple-500",
    description: "Create SEO-optimized blog posts with AI-powered outlines, research, and section-by-section writing.",
    tips: [
      {
        title: "Start with Keyword Research",
        detail: "Use the Keyword Research Modal to find high-opportunity keywords before writing. Target keywords with decent search volume (100+ monthly searches) and low-to-medium competition for the fastest ranking results.",
        impact: "high"
      },
      {
        title: "Generate and Refine Your Outline First",
        detail: "The Outline Generator creates a structured framework with H2s, H3s, and key points for each section. Review and adjust the outline before writing — a strong outline produces 10x better content than diving in blind.",
        impact: "high"
      },
      {
        title: "Write Section by Section, Not All at Once",
        detail: "Use the Section-by-Section writer to generate one section at a time. This gives you granular control over each part and lets you review/edit as you go instead of facing a wall of text at the end.",
        impact: "high"
      },
      {
        title: "Define Your Audience Persona",
        detail: "Use the Audience Profile Modal to specify who you're writing for. Content written for a defined audience scores 30-50% higher on readability and engagement metrics.",
        impact: "high"
      },
      {
        title: "Check SEO Analysis Before Publishing",
        detail: "Run the SEO Analysis Panel to verify keyword density, heading hierarchy, meta description quality, and internal linking opportunities. Fix any issues before hitting publish.",
        impact: "high"
      },
      {
        title: "Use the Readability Panel to Simplify",
        detail: "Aim for a Flesch-Kincaid score of 60-70 (8th-9th grade level) for most blog content. The Readability Panel highlights complex sentences and suggests simpler alternatives.",
        impact: "medium"
      },
      {
        title: "Generate Topic Ideas When Stuck",
        detail: "The Topic Generator creates content ideas based on your niche, competitor gaps, and trending topics. Generate 20+ ideas in seconds and build a 3-month content calendar.",
        impact: "medium"
      },
      {
        title: "Add Visual Suggestions for Engagement",
        detail: "The Visual Suggestions Panel recommends where to place images, infographics, and charts in your post. Blog posts with images every 300-400 words get 94% more total views.",
        impact: "medium"
      },
      {
        title: "Fact-Check Claims Before Publishing",
        detail: "Run the Fact Checker Panel to flag statistics, dates, and claims that need verification. A single factual error can destroy credibility and reduce organic shares by 50%.",
        impact: "high"
      },
      {
        title: "Use Content Repurposing After Publishing",
        detail: "Once your blog post is live, send it directly to the Content Repurposing tool to create social media posts, email newsletters, and video scripts from the same content. Maximize ROI on every article.",
        impact: "medium"
      }
    ]
  }
];

const generalTips = [
  {
    icon: Target,
    title: "Define Your Goal Before You Start",
    description: "Every piece of content should have a clear objective: drive traffic, generate leads, build authority, or convert sales. Tell the AI your goal and it optimizes accordingly."
  },
  {
    icon: Zap,
    title: "Use the Smart Input Enhancer",
    description: "Available on every tool, the ✨ Smart Input button refines your prompts before sending to AI. Better input prompts produce dramatically better output every time."
  },
  {
    icon: Clock,
    title: "Review and Edit AI Output",
    description: "AI generates excellent first drafts, but the best content comes from human review. Spend 5-10 minutes editing AI output to add personal insights, examples, and brand voice."
  },
  {
    icon: TrendingUp,
    title: "Track What Works",
    description: "Use the Dashboard to monitor which content types perform best. Double down on winning formats and refine your approach for underperforming ones."
  },
  {
    icon: Shield,
    title: "Always Humanize for High-Stakes Content",
    description: "For published blog posts, client deliverables, and academic submissions, run content through the AI Humanizer. It takes 30 seconds and prevents detection flags."
  },
  {
    icon: Sparkles,
    title: "Combine Multiple Tools for Best Results",
    description: "The most successful users chain tools together: Blog Creator → AI Humanizer → Content Repurposing. This workflow produces polished, multi-platform content in under 15 minutes."
  }
];

const impactColors: Record<string, string> = {
  high: "bg-primary/10 text-primary border-primary/20",
  medium: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  low: "bg-muted text-muted-foreground border-border"
};

export default function BestPractices() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Lightbulb className="h-3 w-3 mr-1" />
              Expert Guidance
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-secondary">
              Best Practices Guide
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Actionable tips and proven strategies for getting the most out of every AI Writer Pros tool. Follow these guidelines to produce better content, faster.
            </p>
          </div>

          {/* General Tips */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-secondary flex items-center gap-2">
              <Star className="h-6 w-6 text-primary" />
              Universal Best Practices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generalTips.map((tip) => (
                <Card key={tip.title} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <tip.icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">{tip.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Tool-Specific Guides */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-secondary flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Tool-by-Tool Guide
            </h2>
            <div className="space-y-6">
              {toolGuides.map((tool) => (
                <Card key={tool.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 bg-gradient-to-r ${tool.color} rounded-lg`}>
                        <tool.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {tool.tips.map((tip, i) => (
                        <AccordionItem key={i} value={`${tool.id}-${i}`} className="border-border/50">
                          <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-3">
                            <div className="flex items-center gap-2 flex-1 mr-2">
                              <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                              <span>{tip.title}</span>
                              <Badge variant="outline" className={`ml-auto text-xs shrink-0 ${impactColors[tip.impact]}`}>
                                {tip.impact} impact
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-sm text-muted-foreground pl-6">
                            {tip.detail}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="text-center mt-16 p-8 rounded-2xl bg-muted/50 border border-border">
            <h2 className="text-2xl font-bold mb-3 text-secondary">Ready to Put These Tips Into Practice?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Start your free trial and experience how these best practices transform your content workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild>
                <Link to="/auth">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/knowledge-base">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Knowledge Base
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
