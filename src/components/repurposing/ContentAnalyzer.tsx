import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, Sparkles, AlertTriangle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AnalysisResult {
  contentType: string;
  confidence: number;
  themes: string[];
  takeaways: string[];
  readingLevel: string;
  tone: string;
  formatRecommendations: { format: string; matchScore: number; reason: string }[];
  warnings: string[];
}

interface Props {
  content: string;
  onAnalysisComplete: (result: AnalysisResult) => void;
  analysis: AnalysisResult | null;
}

export function ContentAnalyzer({ content, onAnalysisComplete, analysis }: Props) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!content || content.trim().length < 50) {
      toast({ title: "Content too short", description: "Please add at least 50 characters to analyze.", variant: "destructive" });
      return;
    }
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { action: "repurpose-analyze", content },
      });
      if (error) throw error;
      const parsed = typeof data.result === "string" ? JSON.parse(data.result.replace(/```json\n?|\n?```/g, "")) : data.result;
      onAnalysisComplete(parsed);
      toast({ title: "Analysis complete!" });
    } catch (e: any) {
      toast({ title: "Analysis failed", description: e.message || "Please try again.", variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!content || content.trim().length < 50) return null;

  const themeColors = ["bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200", "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200", "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"];

  return (
    <div className="space-y-4">
      <Button onClick={handleAnalyze} disabled={isAnalyzing} variant="outline" className="w-full" aria-label="Analyze content with AI">
        {isAnalyzing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Analyzing...</> : <><Search className="mr-2 h-4 w-4" /><Sparkles className="mr-1 h-3 w-3" />Analyze My Content</>}
      </Button>

      {analysis && (
        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-sm">{analysis.contentType}</Badge>
            <Badge variant="outline" className="text-xs">{analysis.confidence}% confident</Badge>
            <Badge variant="outline" className="text-xs">📖 {analysis.readingLevel}</Badge>
            <Badge variant="outline" className="text-xs">🎯 {analysis.tone}</Badge>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Key Themes</p>
            <div className="flex flex-wrap gap-1">
              {analysis.themes.map((t, i) => (
                <Badge key={i} className={`text-xs ${themeColors[i % themeColors.length]}`}>{t}</Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Format Recommendations</p>
            <div className="grid grid-cols-2 gap-2">
              {analysis.formatRecommendations.slice(0, 6).map((r) => (
                <div key={r.format} className="flex items-center gap-2 text-xs p-2 rounded border">
                  <span>{r.matchScore >= 80 ? "✅" : r.matchScore >= 60 ? "🟡" : "⚠️"}</span>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium capitalize">{r.format.replace('-', ' ')}</span>
                    <span className={`ml-1 ${r.matchScore >= 80 ? 'text-green-600' : r.matchScore >= 60 ? 'text-yellow-600' : 'text-muted-foreground'}`}>
                      ({r.matchScore}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {analysis.warnings.length > 0 && (
            <Alert variant="destructive" className="bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-xs text-yellow-800 dark:text-yellow-200">
                {analysis.warnings.join(" • ")}
              </AlertDescription>
            </Alert>
          )}
        </Card>
      )}
    </div>
  );
}
