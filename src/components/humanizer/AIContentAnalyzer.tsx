import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, Sparkles, AlertTriangle, Loader2, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface HumanizerAnalysis {
  aiScore: number;
  contentType: string;
  writingStyle: string;
  readingLevel: string;
  recommendedIntensity: string;
  aiPatterns: { phrase: string; reason: string }[];
  sentenceVariety: string;
  avgSentenceLength: number;
}

interface Props {
  content: string;
  onAnalysisComplete: (result: HumanizerAnalysis) => void;
  analysis: HumanizerAnalysis | null;
}

export function AIContentAnalyzer({ content, onAnalysisComplete, analysis }: Props) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [patternsOpen, setPatternsOpen] = useState(false);
  const { toast } = useToast();

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  const handleAnalyze = async () => {
    if (wordCount < 50) {
      toast({ title: "Content too short", description: "Add at least 50 words.", variant: "destructive" });
      return;
    }
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { action: "humanizer-analyze", content },
      });
      if (error) throw error;
      const parsed = typeof data.result === "string" ? JSON.parse(data.result.replace(/```json\n?|\n?```/g, "")) : data.result;
      onAnalysisComplete(parsed);
    } catch (e: any) {
      toast({ title: "Analysis failed", description: e.message || "Please try again.", variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (wordCount < 50) return null;

  const scoreColor = (score: number) => score >= 70 ? "text-red-600" : score >= 40 ? "text-yellow-600" : "text-green-600";
  const scoreBg = (score: number) => score >= 70 ? "bg-red-500" : score >= 40 ? "bg-yellow-500" : "bg-green-500";

  return (
    <div className="space-y-3">
      <Button onClick={handleAnalyze} disabled={isAnalyzing} variant="outline" className="w-full" aria-label="Analyze AI patterns">
        {isAnalyzing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Analyzing...</> : <><Search className="mr-2 h-4 w-4" /><Sparkles className="mr-1 h-3 w-3" />Analyze AI Patterns</>}
      </Button>

      {analysis && (
        <Card className="p-4 space-y-3">
          {/* AI Score Gauge */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium">AI Detection Score</span>
                <span className={`text-lg font-bold ${scoreColor(analysis.aiScore)}`}>{analysis.aiScore}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${scoreBg(analysis.aiScore)}`} style={{ width: `${analysis.aiScore}%` }} />
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {analysis.aiScore >= 70 ? "High AI probability" : analysis.aiScore >= 40 ? "Moderate AI signals" : "Mostly human-like"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <Badge variant="secondary" className="text-xs">{analysis.contentType}</Badge>
            <Badge variant="outline" className="text-xs">{analysis.writingStyle}</Badge>
            <Badge variant="outline" className="text-xs">📖 {analysis.readingLevel}</Badge>
            <Badge variant="outline" className="text-xs">Variety: {analysis.sentenceVariety}</Badge>
            <Badge className="text-xs bg-primary/10 text-primary border-primary/20">
              Recommended: {analysis.recommendedIntensity}
            </Badge>
          </div>

          {analysis.aiPatterns.length > 0 && (
            <Collapsible open={patternsOpen} onOpenChange={setPatternsOpen}>
              <CollapsibleTrigger className="flex items-center gap-1 text-xs font-medium text-primary w-full">
                <AlertTriangle className="h-3 w-3" />
                AI Patterns Detected ({analysis.aiPatterns.length})
                <ChevronDown className={`h-3 w-3 ml-auto transition-transform ${patternsOpen ? "rotate-180" : ""}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-1.5">
                {analysis.aiPatterns.map((p, i) => (
                  <Alert key={i} className="py-2 px-3">
                    <AlertDescription className="text-xs">
                      <span className="font-medium text-yellow-700 dark:text-yellow-300">"{p.phrase}"</span>
                      <span className="text-muted-foreground ml-1">— {p.reason}</span>
                    </AlertDescription>
                  </Alert>
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}
        </Card>
      )}
    </div>
  );
}
