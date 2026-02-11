import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, Image, Copy } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";
import { useToast } from "@/hooks/use-toast";

interface VisualSuggestion {
  imageNumber: number;
  type: string;
  placement: string;
  prompt: string;
  altText: string;
}

export function VisualSuggestionsPanel({ content }: { content: string }) {
  const [suggestions, setSuggestions] = useState<VisualSuggestion[]>([]);
  const { callAI, isLoading } = useBlogAI();
  const { toast } = useToast();

  const handleGenerate = async () => {
    const result = await callAI("visual-suggestions", { content });
    if (Array.isArray(result)) setSuggestions(result);
  };

  if (!content) return null;

  const typeIcon: Record<string, string> = {
    photo: "📷", infographic: "📊", chart: "📈", diagram: "🔧", screenshot: "🖥️",
  };

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          <Image className="h-4 w-4 text-primary" />Visual Content Suggestions
        </h4>
        <Button size="sm" variant="outline" onClick={handleGenerate} disabled={isLoading("visual-suggestions")} className="text-xs">
          {isLoading("visual-suggestions") ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
        </Button>
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-2">
          {suggestions.map((s, i) => (
            <div key={i} className="border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{typeIcon[s.type] || "🎨"} Image #{s.imageNumber} - {s.type}</span>
                <Badge variant="secondary" className="text-[10px]">{s.placement}</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex items-start gap-1">
                  <p className="text-xs text-muted-foreground flex-1"><strong>Prompt:</strong> {s.prompt}</p>
                  <Button variant="ghost" size="icon" className="h-5 w-5 shrink-0" onClick={() => { navigator.clipboard.writeText(s.prompt); toast({ title: "Prompt copied!" }); }}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-start gap-1">
                  <p className="text-xs text-muted-foreground flex-1"><strong>Alt:</strong> {s.altText}</p>
                  <Button variant="ghost" size="icon" className="h-5 w-5 shrink-0" onClick={() => { navigator.clipboard.writeText(s.altText); toast({ title: "Alt text copied!" }); }}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
