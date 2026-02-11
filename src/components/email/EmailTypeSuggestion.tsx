import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, X } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";

interface Suggestion {
  suggestedType: string;
  matchPercent: number;
  reason: string;
}

const typeLabels: Record<string, string> = {
  promotional: "Promotional",
  welcome: "Welcome Sequence",
  newsletter: "Newsletter",
  "product-launch": "Product Launch",
  "re-engagement": "Re-engagement",
  sales: "Sales Sequence",
};

export function EmailTypeSuggestion({ topic, onAccept }: { topic: string; onAccept: (type: string) => void }) {
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const lastTopicRef = useRef("");
  const { callAI, isLoading } = useBlogAI();

  useEffect(() => {
    if (!topic || topic.length < 10 || topic === lastTopicRef.current) return;
    setDismissed(false);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      lastTopicRef.current = topic;
      const result = await callAI("email-type-suggestion", { topic });
      if (result?.suggestedType) setSuggestion(result);
    }, 1500);

    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [topic, callAI]);

  if (!suggestion || dismissed) return null;

  return (
    <div className="flex items-center gap-2 p-2 bg-primary/5 border border-primary/20 rounded-md text-xs">
      <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
      <span className="flex-1">
        AI Suggests: <strong>{typeLabels[suggestion.suggestedType] || suggestion.suggestedType}</strong>{" "}
        <Badge variant="outline" className="text-[10px] ml-1">{suggestion.matchPercent}% match</Badge>{" "}
        <span className="text-muted-foreground">— {suggestion.reason}</span>
      </span>
      <Button variant="ghost" size="sm" className="h-6 text-xs px-2" onClick={() => { onAccept(suggestion.suggestedType); setDismissed(true); }}>
        Accept
      </Button>
      <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setDismissed(true)}>
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}
