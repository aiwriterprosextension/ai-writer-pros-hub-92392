import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";

interface FormattingOptimizerProps {
  content: string;
  platform: string;
  platformName: string;
  onApply: (optimized: string) => void;
}

export function FormattingOptimizer({ content, platform, platformName, onApply }: FormattingOptimizerProps) {
  const [optimized, setOptimized] = useState<string | null>(null);
  const { callAI, isLoading } = useBlogAI();

  const handleOptimize = async () => {
    const result = await callAI("social-optimize-formatting", { content, platform });
    if (typeof result === "string") setOptimized(result);
  };

  return (
    <div className="space-y-2">
      <Button variant="outline" size="sm" onClick={handleOptimize} disabled={!content || isLoading("social-optimize-formatting")}>
        {isLoading("social-optimize-formatting") ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Sparkles className="h-3 w-3 mr-1" />}
        ✨ Optimize for {platformName}
      </Button>
      {optimized && (
        <Card className="p-3 space-y-2">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <h5 className="text-xs font-semibold text-muted-foreground mb-1">Before</h5>
              <div className="text-sm bg-muted/50 p-2 rounded whitespace-pre-wrap max-h-[200px] overflow-y-auto">{content}</div>
            </div>
            <div>
              <h5 className="text-xs font-semibold text-muted-foreground mb-1">After</h5>
              <div className="text-sm bg-primary/5 border border-primary/10 p-2 rounded whitespace-pre-wrap max-h-[200px] overflow-y-auto">{optimized}</div>
            </div>
          </div>
          <Button size="sm" onClick={() => onApply(optimized)}>Apply Optimization</Button>
        </Card>
      )}
    </div>
  );
}
