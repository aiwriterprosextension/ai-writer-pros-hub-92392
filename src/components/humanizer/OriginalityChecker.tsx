import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Shield, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface OriginalityData {
  uniquenessScore: number;
  flaggedPhrases: { phrase: string; issue: string }[];
  suggestions: string[];
}

interface Props {
  content: string;
  visible: boolean;
}

export function OriginalityChecker({ content, visible }: Props) {
  const [data, setData] = useState<OriginalityData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  if (!visible) return null;

  const handleCheck = async () => {
    setLoading(true);
    try {
      const { data: res, error } = await supabase.functions.invoke("ai-assistant", {
        body: { action: "humanizer-originality", content },
      });
      if (error) throw error;
      const parsed = typeof res.result === "string" ? JSON.parse(res.result.replace(/```json\n?|\n?```/g, "")) : res.result;
      setData(parsed);
    } catch (e: any) {
      toast({ title: "Check failed", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (s: number) => s >= 80 ? "text-green-600" : s >= 50 ? "text-yellow-600" : "text-red-600";

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium flex items-center gap-2"><Shield className="h-4 w-4" />Originality Check</h4>
        <Button onClick={handleCheck} disabled={loading} variant="outline" size="sm">
          {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
          <span className="ml-1">Check</span>
        </Button>
      </div>
      {data && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs">Uniqueness:</span>
            <span className={`text-lg font-bold ${scoreColor(data.uniquenessScore)}`}>{data.uniquenessScore}/100</span>
          </div>
          {data.flaggedPhrases.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Flagged Phrases:</p>
              {data.flaggedPhrases.map((f, i) => (
                <div key={i} className="text-xs p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded border border-yellow-200 dark:border-yellow-800">
                  <span className="font-medium">"{f.phrase}"</span>
                  <span className="text-muted-foreground ml-1">— {f.issue}</span>
                </div>
              ))}
            </div>
          )}
          {data.suggestions.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Suggestions:</p>
              {data.suggestions.map((s, i) => (
                <p key={i} className="text-xs text-muted-foreground">💡 {s}</p>
              ))}
            </div>
          )}
          <p className="text-[10px] text-muted-foreground italic">AI-based analysis. For comprehensive plagiarism detection, use dedicated tools.</p>
        </div>
      )}
    </Card>
  );
}
