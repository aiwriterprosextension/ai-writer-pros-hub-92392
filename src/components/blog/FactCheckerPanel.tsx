import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Loader2, ShieldCheck } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";

interface FactFlag {
  claim: string;
  concernLevel: string;
  reasoning: string;
  suggestedSources: string[];
  confidence: number;
  verified?: boolean;
}

export function FactCheckerPanel({ content }: { content: string }) {
  const [flags, setFlags] = useState<FactFlag[]>([]);
  const { callAI, isLoading } = useBlogAI();

  const handleCheck = async () => {
    const result = await callAI("fact-check", { content });
    if (Array.isArray(result)) setFlags(result.map(f => ({ ...f, verified: false })));
  };

  const toggleVerified = (i: number) => {
    setFlags(prev => prev.map((f, idx) => idx === i ? { ...f, verified: !f.verified } : f));
  };

  if (!content) return null;

  const levelColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case "high": return "bg-red-500/10 text-red-600 border-red-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      default: return "bg-green-500/10 text-green-600 border-green-500/20";
    }
  };

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary" />Fact Checker
        </h4>
        <Button size="sm" variant="outline" onClick={handleCheck} disabled={isLoading("fact-check")} className="text-xs">
          {isLoading("fact-check") ? <Loader2 className="h-3 w-3 animate-spin" /> : <><Sparkles className="h-3 w-3 mr-1" />Verify Claims</>}
        </Button>
      </div>

      {flags.length > 0 && (
        <div className="space-y-2">
          {flags.map((f, i) => (
            <div key={i} className={`border rounded-lg p-3 space-y-1.5 ${f.verified ? 'opacity-50' : ''}`}>
              <div className="flex items-start gap-2">
                <Checkbox checked={f.verified} onCheckedChange={() => toggleVerified(i)} className="mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className={`text-[10px] ${levelColor(f.concernLevel)}`}>{f.concernLevel}</Badge>
                    <span className="text-xs text-muted-foreground">Confidence: {f.confidence}/100</span>
                  </div>
                  <p className="text-xs font-medium">"{f.claim}"</p>
                  <p className="text-xs text-muted-foreground mt-1">{f.reasoning}</p>
                  {f.suggestedSources?.length > 0 && (
                    <div className="mt-1">
                      <p className="text-[10px] text-muted-foreground">Sources to check:</p>
                      {f.suggestedSources.map((s, j) => (
                        <p key={j} className="text-[10px] text-primary">• {s}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <p className="text-xs text-muted-foreground text-center">
            {flags.filter(f => f.verified).length} of {flags.length} claims verified
          </p>
        </div>
      )}
    </Card>
  );
}
