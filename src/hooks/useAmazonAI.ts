import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UseAmazonAIOptions {
  maxRetries?: number;
  retryDelay?: number;
}

export function useAmazonAI(options: UseAmazonAIOptions = {}) {
  const { maxRetries = 2, retryDelay = 2000 } = options;
  const { toast } = useToast();

  const callWithRetry = useCallback(async (action: string, body: Record<string, any>) => {
    let lastError: any;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const { data, error } = await supabase.functions.invoke("ai-assistant", {
          body: { action, ...body },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);
        return data.result;
      } catch (e: any) {
        lastError = e;
        if (attempt < maxRetries) {
          await new Promise((r) => setTimeout(r, retryDelay));
        }
      }
    }
    throw lastError;
  }, [maxRetries, retryDelay]);

  const extractProduct = useCallback(async (input: string) => {
    const result = await callWithRetry("extract-product", { input });
    try {
      const cleaned = result.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      return JSON.parse(cleaned);
    } catch {
      throw new Error("Failed to parse product information");
    }
  }, [callWithRetry]);

  const detectFeatures = useCallback(async (productName: string) => {
    const result = await callWithRetry("detect-features", { productName });
    try {
      const cleaned = result.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      return JSON.parse(cleaned);
    } catch {
      throw new Error("Failed to parse features");
    }
  }, [callWithRetry]);

  const generatePersona = useCallback(async (data: { productName: string; problem?: string; priceSensitivity?: string; experienceLevel?: string }) => {
    return await callWithRetry("generate-persona", data);
  }, [callWithRetry]);

  const suggestAlternatives = useCallback(async (productName: string, category: string) => {
    const result = await callWithRetry("suggest-alternatives", { productName, category });
    try {
      const cleaned = result.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      return JSON.parse(cleaned);
    } catch {
      throw new Error("Failed to parse alternatives");
    }
  }, [callWithRetry]);

  const generateFAQ = useCallback(async (productName: string, category: string) => {
    const result = await callWithRetry("generate-faq", { productName, category });
    try {
      const cleaned = result.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      return JSON.parse(cleaned);
    } catch {
      throw new Error("Failed to parse FAQ");
    }
  }, [callWithRetry]);

  const generateDisclosure = useCallback(async (tone: string) => {
    return await callWithRetry("generate-disclosure", { tone });
  }, [callWithRetry]);

  const enhanceAuthenticity = useCallback(async (data: { reviewContent: string; testingDuration?: string; primaryUseCase?: string; notableExperience?: string }) => {
    return await callWithRetry("enhance-authenticity", data);
  }, [callWithRetry]);

  const getReviewScore = useCallback(async (data: { reviewContent: string; seoKeyword?: string; targetWordCount?: string }) => {
    const result = await callWithRetry("review-score", data);
    try {
      const cleaned = result.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      return JSON.parse(cleaned);
    } catch {
      throw new Error("Failed to parse review score");
    }
  }, [callWithRetry]);

  const regenerateSection = useCallback(async (data: { reviewContent: string; section: string; productName: string; tone?: string }) => {
    return await callWithRetry("regenerate-section", data);
  }, [callWithRetry]);

  return {
    extractProduct,
    detectFeatures,
    generatePersona,
    suggestAlternatives,
    generateFAQ,
    generateDisclosure,
    enhanceAuthenticity,
    getReviewScore,
    regenerateSection,
  };
}
