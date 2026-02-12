
import { useSubscription } from "@/hooks/useSubscription";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function UsageMeter() {
  const { plan, wordsUsed, wordLimit, wordsRemaining, generationsToday, generationLimit, isTrialActive, trialDaysLeft } = useSubscription();

  const wordPercent = plan === "business" ? 0 : Math.min(100, (wordsUsed / wordLimit) * 100);

  return (
    <div className="space-y-3 p-4 rounded-lg border bg-card">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Plan</span>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="capitalize">{plan}</Badge>
          {isTrialActive && (
            <Badge variant="outline" className="text-xs">Trial: {trialDaysLeft}d left</Badge>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Words used this month</span>
          <span>{plan === "business" ? `${wordsUsed.toLocaleString()} (unlimited)` : `${wordsUsed.toLocaleString()} / ${wordLimit.toLocaleString()}`}</span>
        </div>
        {plan !== "business" && <Progress value={wordPercent} className="h-2" />}
      </div>

      {plan === "free" && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Generations today</span>
            <span>{generationsToday} / {generationLimit}</span>
          </div>
          <Progress value={(generationsToday / generationLimit) * 100} className="h-2" />
        </div>
      )}
    </div>
  );
}
