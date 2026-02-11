import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BarChart3, Loader2, TrendingUp, BookOpen, Target, Lightbulb } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface QualityScorePreviewProps {
  toolName: string;
  formData: Record<string, any>;
  disabled?: boolean;
}

interface Scores {
  seo: { score: number; explanation: string };
  engagement: { score: number; explanation: string };
  readability: { grade: string; score: number; explanation: string };
  suitability: { score: number; explanation: string };
  suggestions: string[];
}

const scoreColor = (score: number) => {
  if (score >= 80) return "text-green-600 dark:text-green-400";
  if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
};

const scoreBg = (score: number) => {
  if (score >= 80) return "bg-green-100 dark:bg-green-950/30";
  if (score >= 60) return "bg-yellow-100 dark:bg-yellow-950/30";
  return "bg-red-100 dark:bg-red-950/30";
};

export function QualityScorePreview({ toolName, formData, disabled }: QualityScorePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState<Scores | null>(null);
  const { toast } = useToast();

  const handlePreview = async () => {
    setIsOpen(true);
    setIsLoading(true);
    setScores(null);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { action: "quality-score", toolName, formData },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      // Parse JSON from result
      let parsed: Scores;
      try {
        const cleaned = data.result.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        parsed = JSON.parse(cleaned);
      } catch {
        throw new Error("Failed to parse quality scores");
      }
      setScores(parsed);
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to get quality scores", variant: "destructive" });
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const scoreItems = scores ? [
    { icon: Target, label: "SEO Score", score: scores.seo.score, explanation: scores.seo.explanation },
    { icon: TrendingUp, label: "Engagement", score: scores.engagement.score, explanation: scores.engagement.explanation },
    { icon: BookOpen, label: "Readability", score: scores.readability.score, explanation: `${scores.readability.grade} - ${scores.readability.explanation}` },
    { icon: BarChart3, label: "Suitability", score: scores.suitability.score, explanation: scores.suitability.explanation },
  ] : [];

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handlePreview}
        disabled={disabled}
        className="text-xs gap-1"
      >
        <BarChart3 className="h-3 w-3" /> Preview Quality Score
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Quality Score Preview
            </DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2 text-sm text-muted-foreground">Analyzing your settings...</span>
            </div>
          ) : scores ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {scoreItems.map((item) => (
                  <Card key={item.label} className={cn("p-3", scoreBg(item.score))}>
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className={cn("h-4 w-4", scoreColor(item.score))} />
                      <span className="text-xs font-medium">{item.label}</span>
                    </div>
                    <div className={cn("text-2xl font-bold", scoreColor(item.score))}>{item.score}</div>
                    <p className="text-[10px] text-muted-foreground mt-1">{item.explanation}</p>
                  </Card>
                ))}
              </div>

              {scores.suggestions && scores.suggestions.length > 0 && (
                <Card className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    <span className="text-xs font-semibold">Suggestions</span>
                  </div>
                  <ul className="space-y-1">
                    {scores.suggestions.map((s, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex gap-2">
                        <span className="text-primary">•</span> {s}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
