import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Copy, Loader2, Sparkles, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface VisualSuggestion {
  format: string;
  visualType: string;
  quote: string | null;
  colorPalette: string[];
  imagePrompt: string;
}

interface Props {
  formats: string[];
  contentSummary: string;
  visible: boolean;
}

export function VisualSuggestions({ formats, contentSummary, visible }: Props) {
  const [suggestions, setSuggestions] = useState<VisualSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  if (!visible) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { action: "repurpose-visual-suggestions", formats, contentSummary },
      });
      if (error) throw error;
      const parsed = typeof data.result === "string" ? JSON.parse(data.result.replace(/```json\n?|\n?```/g, "")) : data.result;
      setSuggestions(parsed);
    } catch (e: any) {
      toast({ title: "Failed to get suggestions", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!" });
  };

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium flex items-center gap-2"><Palette className="h-4 w-4" />🎨 Visual Content Suggestions</h4>
        <Button onClick={handleGenerate} disabled={loading} variant="outline" size="sm">
          {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
          <span className="ml-1">{suggestions.length ? "Regenerate" : "Generate"}</span>
        </Button>
      </div>
      {suggestions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {suggestions.map((s, i) => (
            <Card key={i} className="p-3 space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs capitalize">{s.format.replace("-", " ")}</Badge>
                <Badge variant="outline" className="text-xs">{s.visualType}</Badge>
              </div>
              {s.quote && (
                <blockquote className="text-xs italic border-l-2 border-primary pl-2 text-muted-foreground">"{s.quote}"</blockquote>
              )}
              <div className="flex items-center gap-1">
                {s.colorPalette.map((c, j) => (
                  <button key={j} onClick={() => copyText(c)} className="w-6 h-6 rounded border cursor-pointer hover:scale-110 transition-transform" style={{ backgroundColor: c }} title={c} />
                ))}
              </div>
              <Collapsible>
                <CollapsibleTrigger className="text-xs text-primary flex items-center gap-1">
                  Image Prompt <ChevronDown className="h-3 w-3" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-1">
                  <div className="bg-muted/50 p-2 rounded text-xs relative">
                    <p>{s.imagePrompt}</p>
                    <Button variant="ghost" size="sm" className="absolute top-1 right-1 h-6 w-6 p-0" onClick={() => copyText(s.imagePrompt)}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
}
