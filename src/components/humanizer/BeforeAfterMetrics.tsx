import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ScoreData {
  before: { aiScore: number; readability: string; sentenceVariety: string };
  after: { aiScore: number; readability: string; sentenceVariety: string };
  improvement: number;
  humanLikelihood: number;
}

interface Props {
  scoreData: ScoreData | null;
}

export function BeforeAfterMetrics({ scoreData }: Props) {
  if (!scoreData) return null;

  const scoreColor = (score: number) => score >= 70 ? "text-red-600" : score >= 40 ? "text-yellow-600" : "text-green-600";
  const scoreBg = (score: number) => score >= 70 ? "bg-red-500" : score >= 40 ? "bg-yellow-500" : "bg-green-500";

  return (
    <Card className="p-4 space-y-3">
      <h4 className="text-sm font-semibold">Before/After Metrics</h4>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Before</p>
          <div className="flex items-center gap-2">
            <span className="text-xs">AI Detection:</span>
            <span className={`text-sm font-bold ${scoreColor(scoreData.before.aiScore)}`}>{scoreData.before.aiScore}%</span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full">
            <div className={`h-full rounded-full ${scoreBg(scoreData.before.aiScore)}`} style={{ width: `${scoreData.before.aiScore}%` }} />
          </div>
          <p className="text-[10px] text-muted-foreground">📖 {scoreData.before.readability}</p>
          <p className="text-[10px] text-muted-foreground">Variety: {scoreData.before.sentenceVariety}</p>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">After</p>
          <div className="flex items-center gap-2">
            <span className="text-xs">AI Detection:</span>
            <span className={`text-sm font-bold ${scoreColor(scoreData.after.aiScore)}`}>{scoreData.after.aiScore}%</span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full">
            <div className={`h-full rounded-full ${scoreBg(scoreData.after.aiScore)}`} style={{ width: `${scoreData.after.aiScore}%` }} />
          </div>
          <p className="text-[10px] text-muted-foreground">📖 {scoreData.after.readability}</p>
          <p className="text-[10px] text-muted-foreground">Variety: {scoreData.after.sentenceVariety} ✓</p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 border-t">
        <div>
          <span className="text-xs text-muted-foreground">Improvement:</span>
          <span className="text-lg font-bold text-green-600 ml-2">+{scoreData.improvement}%</span>
        </div>
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
          {scoreData.humanLikelihood}% Human-like
        </Badge>
      </div>
    </Card>
  );
}
