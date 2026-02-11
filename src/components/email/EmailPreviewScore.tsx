import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Loader2, BarChart3 } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";

interface PredictionData {
  openRate: string;
  conversionPotential: string;
  conversionPercent: string;
  spamRisk: number;
  overallScore: number;
  warnings: string[];
  suggestions: string[];
}

interface Props {
  topic: string;
  audience: string;
  emailType: string;
  tone: string;
  sequenceLength: string;
  ctaGoal: string;
  disabled: boolean;
}

export function EmailPreviewScore({ topic, audience, emailType, tone, sequenceLength, ctaGoal, disabled }: Props) {
  const [data, setData] = useState<PredictionData | null>(null);
  const { callAI, isLoading } = useBlogAI();

  const handlePreview = async () => {
    const result = await callAI("email-preview-score", { topic, audience, emailType, tone, sequenceLength: parseInt(sequenceLength), ctaGoal });
    if (result?.overallScore !== undefined) setData(result);
  };

  const scoreColor = (s: number) => s >= 70 ? "text-green-600" : s >= 40 ? "text-yellow-600" : "text-red-500";
  const riskColor = (r: number) => r <= 3 ? "text-green-600" : r <= 6 ? "text-yellow-600" : "text-red-500";
  const convColor = (c: string) => c === "High" ? "bg-green-500/10 text-green-600" : c === "Medium" ? "bg-yellow-500/10 text-yellow-600" : "bg-red-500/10 text-red-500";

  if (!data) {
    return (
      <Button variant="outline" size="sm" onClick={handlePreview} disabled={disabled || isLoading("email-preview-score")} className="gap-1.5">
        {isLoading("email-preview-score") ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <BarChart3 className="h-3.5 w-3.5" />}
        Preview Score
      </Button>
    );
  }

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />Campaign Prediction
        </h4>
        <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={handlePreview} disabled={isLoading("email-preview-score")}>
          {isLoading("email-preview-score") ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
        </Button>
      </div>

      <div className="text-center">
        <div className={`text-3xl font-bold ${scoreColor(data.overallScore)}`}>{data.overallScore}</div>
        <p className="text-xs text-muted-foreground">Overall Score</p>
        <Progress value={data.overallScore} className="h-1.5 mt-1" />
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="bg-muted/50 rounded p-2 text-center">
          <p className="text-muted-foreground">Open Rate</p>
          <p className="font-bold text-sm">{data.openRate}</p>
        </div>
        <div className="bg-muted/50 rounded p-2 text-center">
          <p className="text-muted-foreground">Conversion</p>
          <Badge variant="secondary" className={`text-[10px] ${convColor(data.conversionPotential)}`}>{data.conversionPotential}</Badge>
          <p className="text-[10px] mt-0.5">{data.conversionPercent}</p>
        </div>
        <div className="bg-muted/50 rounded p-2 text-center">
          <p className="text-muted-foreground">Spam Risk</p>
          <p className={`font-bold text-sm ${riskColor(data.spamRisk)}`}>{data.spamRisk}/10</p>
        </div>
      </div>

      {data.warnings?.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-yellow-600">⚠️ Warnings</p>
          {data.warnings.map((w, i) => <p key={i} className="text-xs text-muted-foreground">• {w}</p>)}
        </div>
      )}

      {data.suggestions?.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium">💡 Suggestions</p>
          {data.suggestions.map((s, i) => <p key={i} className="text-xs text-muted-foreground">• {s}</p>)}
        </div>
      )}
    </Card>
  );
}
