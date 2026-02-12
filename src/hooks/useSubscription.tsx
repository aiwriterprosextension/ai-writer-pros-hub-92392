
import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type PlanTier = "free" | "pro" | "business";

interface Subscription {
  id: string;
  user_id: string;
  plan: PlanTier;
  is_trial_active: boolean;
  trial_started_at: string | null;
  trial_ends_at: string | null;
  words_used_this_month: number;
  word_limit: number;
  generations_today: number;
  generation_limit: number;
  last_generation_date: string | null;
  last_word_reset: string | null;
}

interface SubscriptionContextType {
  subscription: Subscription | null;
  loading: boolean;
  plan: PlanTier;
  isTrialActive: boolean;
  trialDaysLeft: number;
  wordsUsed: number;
  wordLimit: number;
  wordsRemaining: number;
  generationsToday: number;
  generationLimit: number;
  canGenerate: boolean;
  canAccessTool: (tool: string) => boolean;
  canUseFeature: (feature: string) => boolean;
  trackWordUsage: (wordCount: number) => Promise<boolean>;
  trackGeneration: () => Promise<boolean>;
  startTrial: (plan: PlanTier) => Promise<boolean>;
  refetch: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

// Tools available per plan
const PLAN_TOOLS: Record<PlanTier, string[]> = {
  free: ["blog-creator", "email-generator", "social-media"],
  pro: ["blog-creator", "email-generator", "social-media", "ai-humanizer", "amazon-reviews", "content-repurposing"],
  business: ["blog-creator", "email-generator", "social-media", "ai-humanizer", "amazon-reviews", "content-repurposing"],
};

// Features available per plan
const PLAN_FEATURES: Record<PlanTier, string[]> = {
  free: ["basic-tones", "clipboard-export", "knowledge-base"],
  pro: [
    "basic-tones", "all-tones", "all-industries", "clipboard-export", "full-export",
    "ai-chat", "smart-input", "history-favorites", "quality-score", "workflow-suggestions",
    "knowledge-base", "priority-support",
  ],
  business: [
    "basic-tones", "all-tones", "all-industries", "clipboard-export", "full-export",
    "ai-chat", "smart-input", "history-favorites", "quality-score", "workflow-suggestions",
    "knowledge-base", "priority-support",
    "bulk-humanization", "content-series", "batch-export", "ab-testing",
    "multi-comparison", "section-by-section", "fact-checking", "content-calendar",
    "commercial-license", "live-chat-support",
  ],
};

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscription = useCallback(async () => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("user_subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching subscription:", error);
      setLoading(false);
      return;
    }

    if (!data) {
      // Create a default subscription row for existing users
      const { data: newSub, error: insertError } = await supabase
        .from("user_subscriptions")
        .insert({ user_id: user.id, plan: "free", word_limit: 5000, generation_limit: 3 })
        .select()
        .single();

      if (!insertError && newSub) {
        setSubscription(newSub as Subscription);
      }
    } else {
      // Check if word count needs monthly reset
      const today = new Date().toISOString().split("T")[0];
      const lastReset = data.last_word_reset;
      const lastResetMonth = lastReset ? new Date(lastReset).getMonth() : -1;
      const currentMonth = new Date().getMonth();

      if (lastResetMonth !== currentMonth) {
        const { data: updated } = await supabase
          .from("user_subscriptions")
          .update({ words_used_this_month: 0, last_word_reset: today })
          .eq("user_id", user.id)
          .select()
          .single();
        if (updated) {
          setSubscription(updated as Subscription);
        } else {
          setSubscription(data as Subscription);
        }
      } else {
        // Check daily generation reset
        const lastGenDate = data.last_generation_date;
        if (lastGenDate !== today && data.generations_today > 0) {
          const { data: updated } = await supabase
            .from("user_subscriptions")
            .update({ generations_today: 0, last_generation_date: today })
            .eq("user_id", user.id)
            .select()
            .single();
          if (updated) {
            setSubscription(updated as Subscription);
          } else {
            setSubscription(data as Subscription);
          }
        } else {
          setSubscription(data as Subscription);
        }
      }

      // Check trial expiration
      if (data.is_trial_active && data.trial_ends_at) {
        const trialEnd = new Date(data.trial_ends_at);
        if (trialEnd < new Date()) {
          // Trial expired, downgrade to free
          await supabase
            .from("user_subscriptions")
            .update({
              plan: "free",
              is_trial_active: false,
              word_limit: 5000,
              generation_limit: 3,
            })
            .eq("user_id", user.id);
          setSubscription(prev => prev ? {
            ...prev,
            plan: "free",
            is_trial_active: false,
            word_limit: 5000,
            generation_limit: 3,
          } : null);
        }
      }
    }

    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const plan: PlanTier = subscription?.plan || "free";
  const isTrialActive = subscription?.is_trial_active || false;

  const trialDaysLeft = (() => {
    if (!isTrialActive || !subscription?.trial_ends_at) return 0;
    const diff = new Date(subscription.trial_ends_at).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  })();

  const wordsUsed = subscription?.words_used_this_month || 0;
  const wordLimit = subscription?.word_limit || 5000;
  const wordsRemaining = Math.max(0, wordLimit - wordsUsed);
  const generationsToday = subscription?.generations_today || 0;
  const generationLimit = subscription?.generation_limit || 3;

  const canGenerate = (() => {
    if (plan === "business") return true; // unlimited
    if (plan === "pro") return wordsRemaining > 0;
    // free: check both generation limit and word limit
    return generationsToday < generationLimit && wordsRemaining > 0;
  })();

  const canAccessTool = (tool: string) => PLAN_TOOLS[plan]?.includes(tool) || false;
  const canUseFeature = (feature: string) => PLAN_FEATURES[plan]?.includes(feature) || false;

  const trackWordUsage = async (wordCount: number): Promise<boolean> => {
    if (!user || !subscription) return false;
    if (plan === "business") {
      // Unlimited, still track
      await supabase
        .from("user_subscriptions")
        .update({ words_used_this_month: wordsUsed + wordCount })
        .eq("user_id", user.id);
      setSubscription(prev => prev ? { ...prev, words_used_this_month: prev.words_used_this_month + wordCount } : null);
      return true;
    }
    if (wordsUsed + wordCount > wordLimit) return false;
    await supabase
      .from("user_subscriptions")
      .update({ words_used_this_month: wordsUsed + wordCount })
      .eq("user_id", user.id);
    setSubscription(prev => prev ? { ...prev, words_used_this_month: prev.words_used_this_month + wordCount } : null);
    return true;
  };

  const trackGeneration = async (): Promise<boolean> => {
    if (!user || !subscription) return false;
    const today = new Date().toISOString().split("T")[0];
    if (plan === "free" && generationsToday >= generationLimit) return false;
    await supabase
      .from("user_subscriptions")
      .update({ generations_today: generationsToday + 1, last_generation_date: today })
      .eq("user_id", user.id);
    setSubscription(prev => prev ? { ...prev, generations_today: prev.generations_today + 1, last_generation_date: today } : null);
    return true;
  };

  const startTrial = async (trialPlan: PlanTier): Promise<boolean> => {
    if (!user || trialPlan === "free") return false;
    const now = new Date();
    const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const limits = trialPlan === "pro"
      ? { word_limit: 50000, generation_limit: 999999 }
      : { word_limit: 999999, generation_limit: 999999 };

    const { error } = await supabase
      .from("user_subscriptions")
      .update({
        plan: trialPlan,
        is_trial_active: true,
        trial_started_at: now.toISOString(),
        trial_ends_at: trialEnd.toISOString(),
        ...limits,
      })
      .eq("user_id", user.id);

    if (!error) {
      await fetchSubscription();
      return true;
    }
    return false;
  };

  return (
    <SubscriptionContext.Provider value={{
      subscription, loading, plan, isTrialActive, trialDaysLeft,
      wordsUsed, wordLimit, wordsRemaining, generationsToday, generationLimit,
      canGenerate, canAccessTool, canUseFeature, trackWordUsage, trackGeneration,
      startTrial, refetch: fetchSubscription,
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) throw new Error("useSubscription must be used within SubscriptionProvider");
  return context;
}
