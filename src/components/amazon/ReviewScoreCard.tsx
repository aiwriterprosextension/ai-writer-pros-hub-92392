import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, Loader2, Target, BookOpen, TrendingUp, UserCheck, Lightbulb, RefreshCw } from "lucide-react";
import { useAmazonAI } from "@/hooks/useAmazonAI";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ReviewScoreCardProps {
  reviewContent: string;
  seoKeyword?: string;
  targetWordCount?: string;
  productName: string;
  onRegenerated: (content: string) => void;
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

export function ReviewScoreCard({ reviewContent, seoKeyword, targetWordCount, productName, onRegenerated }: ReviewScoreCardProps) {
  const [scores, setScores] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regenSection, setRegenSection] = useState("intro");
  const { getReviewScore, regenerateSection } = useAmazonAI();
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!reviewContent) return;
    setIsLoading(true);
    try {
      const data = await getReviewScore({ reviewContent, seoKeyword, targetWordCount });
      setScores(data);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const result = await regenerateSection({
        reviewContent,
        section: regenSection,
        productName,
      });
      onRegenerated(result);
      toast({ title: `${regenSection} section regenerated!` });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setIsRegenerating(false);
    }
  };

  if (!reviewContent) return null;

  const wordCount = reviewContent.trim().split(/\s+/).length;

  return (
    <Card className="p-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">Review Quality Score</span>
        </div>
        <Button size="sm" variant="outline" onClick={handleAnalyze} disabled={isLoading} className="text-xs gap-1">
          {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <BarChart3 className="h-3 w-3" />}
          Analyze
        </Button>
      </div>

      <div className="text-xs text-muted-foreground mb-3">
        Word count: <span className="font-medium text-foreground">{wordCount}</span>
        {targetWordCount && (
          <span> / {targetWordCount} target</span>
        )}
      </div>

      {scores && (
        <>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Card className={cn("p-2", scoreBg(scores.seoScore || 0))}>
              <div className="flex items-center gap-1 mb-1">
                <Target className="h-3 w-3" />
                <span className="text-[10px] font-medium">SEO</span>
              </div>
              <div className={cn("text-lg font-bold", scoreColor(scores.seoScore || 0))}>{scores.seoScore || 0}</div>
              {seoKeyword && scores.keywordDensity !== undefined && (
                <p className="text-[10px] text-muted-foreground">Density: {scores.keywordDensity}%</p>
              )}
            </Card>
            <Card className={cn("p-2", scoreBg(scores.readabilityScore || 0))}>
              <div className="flex items-center gap-1 mb-1">
                <BookOpen className="h-3 w-3" />
                <span className="text-[10px] font-medium">Readability</span>
              </div>
              <div className={cn("text-lg font-bold", scoreColor(scores.readabilityScore || 0))}>{scores.readabilityGrade || "—"}</div>
            </Card>
            <Card className="p-2 bg-muted/50">
              <div className="flex items-center gap-1 mb-1">
                <TrendingUp className="h-3 w-3" />
                <span className="text-[10px] font-medium">Bias</span>
              </div>
              <div className="text-sm font-bold">{scores.biasDetection || "—"}</div>
            </Card>
            <Card className={cn("p-2", scoreBg(scores.authenticityScore || 0))}>
              <div className="flex items-center gap-1 mb-1">
                <UserCheck className="h-3 w-3" />
                <span className="text-[10px] font-medium">Authenticity</span>
              </div>
              <div className={cn("text-lg font-bold", scoreColor(scores.authenticityScore || 0))}>{scores.authenticityScore || 0}</div>
            </Card>
          </div>

          {scores.suggestions?.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center gap-1 mb-1">
                <Lightbulb className="h-3 w-3 text-yellow-500" />
                <span className="text-[10px] font-semibold">Suggestions</span>
              </div>
              <ul className="space-y-0.5">
                {scores.suggestions.map((s: string, i: number) => (
                  <li key={i} className="text-[10px] text-muted-foreground">• {s}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      <div className="flex items-center gap-2 pt-2 border-t">
        <Select value={regenSection} onValueChange={setRegenSection}>
          <SelectTrigger className="h-8 text-xs flex-1"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="intro">Introduction</SelectItem>
            <SelectItem value="pros">Pros Section</SelectItem>
            <SelectItem value="cons">Cons Section</SelectItem>
            <SelectItem value="conclusion">Conclusion</SelectItem>
            <SelectItem value="faq">FAQ</SelectItem>
          </SelectContent>
        </Select>
        <Button size="sm" variant="outline" onClick={handleRegenerate} disabled={isRegenerating} className="text-xs gap-1 shrink-0">
          {isRegenerating ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
          Regenerate
        </Button>
      </div>
    </Card>
  );
}
