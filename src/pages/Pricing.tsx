
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X, Star, Zap, Building2 } from "lucide-react";
import { useSubscription, PlanTier } from "@/hooks/useSubscription";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Get started with core AI writing tools",
    icon: Star,
    cta: "Get Started Free",
    ctaVariant: "outline" as const,
    planId: "free" as PlanTier,
    features: [
      { text: "Blog Creator, Email Generator, Social Media", included: true },
      { text: "5,000 words per month", included: true },
      { text: "3 generations per day", included: true },
      { text: "Basic tones (Professional, Casual, Educational)", included: true },
      { text: "Copy-to-clipboard export", included: true },
      { text: "Knowledge base access", included: true },
      { text: "AI Humanizer", included: false },
      { text: "Content Repurposing", included: false },
      { text: "Amazon Affiliate Assistant", included: false },
      { text: "Full export (TXT, DOCX, PDF, HTML, MD)", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For professional content creators",
    icon: Zap,
    cta: "Start 7-Day Free Trial",
    ctaVariant: "default" as const,
    planId: "pro" as PlanTier,
    popular: true,
    features: [
      { text: "All 6 AI writing tools", included: true },
      { text: "50,000 words per month", included: true },
      { text: "Unlimited generations per day", included: true },
      { text: "All tone & industry options", included: true },
      { text: "Full export (TXT, DOCX, PDF, HTML, MD)", included: true },
      { text: "AI Chat Assistant on every tool", included: true },
      { text: "Smart Input Enhancement", included: true },
      { text: "History & Favorites", included: true },
      { text: "Quality Score Preview", included: true },
      { text: "Workflow Suggestions", included: true },
      { text: "Priority email support", included: true },
    ],
  },
  {
    name: "Business",
    price: "$49",
    period: "/month",
    description: "For teams and agencies",
    icon: Building2,
    cta: "Start 7-Day Free Trial",
    ctaVariant: "outline" as const,
    planId: "business" as PlanTier,
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Unlimited words", included: true },
      { text: "Bulk Humanization mode", included: true },
      { text: "Content Series Creator", included: true },
      { text: "Batch Export (ZIP downloads)", included: true },
      { text: "A/B Test Variations for emails", included: true },
      { text: "Multi-product comparison (Amazon)", included: true },
      { text: "Section-by-Section blog building", included: true },
      { text: "Fact-Checking Assistant", included: true },
      { text: "Content Calendar with scheduling", included: true },
      { text: "Commercial license for client work", included: true },
      { text: "Priority live chat support", included: true },
    ],
  },
];

export default function Pricing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Safely try to use subscription context (may not be available on public page)
  let currentPlan: PlanTier = "free";
  let isTrialActive = false;
  let startTrial: ((plan: PlanTier) => Promise<boolean>) | null = null;

  try {
    const sub = useSubscription();
    currentPlan = sub.plan;
    isTrialActive = sub.isTrialActive;
    startTrial = sub.startTrial;
  } catch {
    // Not wrapped in SubscriptionProvider (public page without auth)
  }

  const handleCTA = async (planId: PlanTier) => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (planId === "free") {
      navigate("/dashboard");
      return;
    }
    if (planId === currentPlan) {
      toast.info("You're already on this plan!");
      return;
    }
    // Start trial
    if (startTrial) {
      const success = await startTrial(planId);
      if (success) {
        toast.success(`${planId === "pro" ? "Pro" : "Business"} trial started! You have 7 days to explore.`);
        navigate("/dashboard");
      } else {
        toast.error("Could not start trial. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your content creation needs. Start free, upgrade when you're ready.
            </p>
            {isTrialActive && (
              <Badge variant="secondary" className="mt-4">
                You're currently on a free trial
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              const isCurrent = user && tier.planId === currentPlan;
              return (
                <Card
                  key={tier.name}
                  className={`relative flex flex-col ${tier.popular ? "border-2 border-primary shadow-lg scale-[1.02]" : ""}`}
                >
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <CardTitle>{tier.name}</CardTitle>
                    </div>
                    <CardDescription>{tier.description}</CardDescription>
                    <div className="text-4xl font-bold mt-2">
                      {tier.price}
                      <span className="text-lg font-normal text-muted-foreground">{tier.period}</span>
                    </div>
                    {tier.planId !== "free" && (
                      <p className="text-xs text-muted-foreground mt-1">7-day free trial • No credit card required</p>
                    )}
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 mb-8 flex-1">
                      {tier.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          {feat.included ? (
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground/40 mt-0.5 shrink-0" />
                          )}
                          <span className={feat.included ? "" : "text-muted-foreground/60"}>{feat.text}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={tier.ctaVariant}
                      onClick={() => handleCTA(tier.planId)}
                      disabled={!!isCurrent}
                    >
                      {isCurrent ? "Current Plan" : tier.cta}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Feature comparison */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Feature</th>
                    <th className="text-center py-3 px-4 font-medium">Free</th>
                    <th className="text-center py-3 px-4 font-medium text-primary">Pro</th>
                    <th className="text-center py-3 px-4 font-medium">Business</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ["Blog Creator", true, true, true],
                    ["Email Generator", true, true, true],
                    ["Social Media Suite", true, true, true],
                    ["AI Humanizer", false, true, true],
                    ["Content Repurposing", false, true, true],
                    ["Amazon Affiliate Assistant", false, true, true],
                    ["Monthly Word Limit", "5,000", "50,000", "Unlimited"],
                    ["Daily Generations", "3", "Unlimited", "Unlimited"],
                    ["Export Formats", "Clipboard", "All (5 formats)", "All (5 formats)"],
                    ["AI Chat Assistant", false, true, true],
                    ["History & Favorites", false, true, true],
                    ["Bulk Humanization", false, false, true],
                    ["Batch Export (ZIP)", false, false, true],
                    ["A/B Email Testing", false, false, true],
                    ["Fact-Checking", false, false, true],
                    ["Content Calendar", false, false, true],
                    ["Commercial License", false, false, true],
                    ["Support", "Knowledge Base", "Priority Email", "Live Chat"],
                  ].map(([feature, free, pro, business], i) => (
                    <tr key={i} className="hover:bg-muted/50">
                      <td className="py-3 px-4">{feature as string}</td>
                      {[free, pro, business].map((val, j) => (
                        <td key={j} className="text-center py-3 px-4">
                          {typeof val === "boolean" ? (
                            val ? <CheckCircle className="h-4 w-4 text-green-600 inline" /> : <X className="h-4 w-4 text-muted-foreground/40 inline" />
                          ) : (
                            <span className="text-xs font-medium">{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
