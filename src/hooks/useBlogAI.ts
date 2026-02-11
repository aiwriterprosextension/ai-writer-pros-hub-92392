import { useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type AIAction = string;

export function useBlogAI() {
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  const retryCountRef = useRef<Record<string, number>>({});

  const callAI = useCallback(async (action: AIAction, params: Record<string, any>, maxRetries = 2): Promise<any> => {
    const key = action;
    setLoading(prev => ({ ...prev, [key]: true }));
    retryCountRef.current[key] = 0;

    const attempt = async (): Promise<any> => {
      try {
        const { data, error } = await supabase.functions.invoke('ai-assistant', {
          body: { action, ...params },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);
        
        // Try to parse JSON result
        let result = data?.result;
        if (typeof result === 'string') {
          // Strip markdown code fences if present
          const cleaned = result.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();
          try {
            result = JSON.parse(cleaned);
          } catch {
            // Return as string if not valid JSON
          }
        }
        return result;
      } catch (e: any) {
        const retries = retryCountRef.current[key] || 0;
        if (retries < maxRetries && !e.message?.includes('Rate limit') && !e.message?.includes('credits')) {
          retryCountRef.current[key] = retries + 1;
          await new Promise(r => setTimeout(r, 2000));
          return attempt();
        }
        throw e;
      }
    };

    try {
      return await attempt();
    } catch (e: any) {
      toast({
        title: "AI Error",
        description: e.message || "AI assistant is temporarily busy. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  }, [toast]);

  const isLoading = useCallback((action: string) => loading[action] || false, [loading]);

  return { callAI, isLoading, loading };
}
