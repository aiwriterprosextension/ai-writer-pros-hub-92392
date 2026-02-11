import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lightbulb, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface WorkflowSuggestionsProps {
  contentType: string;
  summary: string;
  currentTool: string;
  visible: boolean;
}

interface Suggestion {
  title: string;
  description: string;
  toolPath: string;
  toolName: string;
  prefillData?: Record<string, any>;
}

export function WorkflowSuggestions({ contentType, summary, currentTool, visible }: WorkflowSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!visible || hasFetched || !summary) return;
    setIsLoading(true);
    setHasFetched(true);

    supabase.functions.invoke("ai-assistant", {
      body: { action: "workflow-suggestion", contentType, summary: summary.substring(0, 300), currentTool },
    }).then(({ data, error }) => {
      if (!error && data?.result) {
        try {
          const cleaned = data.result.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
          setSuggestions(JSON.parse(cleaned));
        } catch { /* ignore parse errors */ }
      }
    }).finally(() => setIsLoading(false));
  }, [visible, hasFetched, summary, contentType, currentTool]);

  if (!visible) return null;

  const handleNavigate = (suggestion: Suggestion) => {
    if (suggestion.prefillData) {
      sessionStorage.setItem("prefill_data", JSON.stringify(suggestion.prefillData));
    }
    navigate(suggestion.toolPath);
  };

  return (
    <Card className="p-4 mt-4 border-dashed border-2 border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/10">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="h-4 w-4 text-yellow-500" />
        <span className="text-sm font-semibold">What's Next?</span>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
          <Loader2 className="h-4 w-4 animate-spin" /> Analyzing your content for workflow suggestions...
        </div>
      ) : suggestions.length > 0 ? (
        <div className="space-y-2">
          {suggestions.map((s, i) => (
            <div key={i} className="flex items-center justify-between gap-3 p-2 rounded-lg bg-background border">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{s.title}</p>
                <p className="text-xs text-muted-foreground truncate">{s.description}</p>
              </div>
              <Button size="sm" variant="outline" className="shrink-0 text-xs gap-1" onClick={() => handleNavigate(s)}>
                {s.toolName} <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No suggestions available.</p>
      )}
    </Card>
  );
}
