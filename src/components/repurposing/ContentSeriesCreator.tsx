import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Link2, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SeriesPart {
  partNumber: number;
  title: string;
  summary: string;
  wordCount: number;
}

interface Props {
  content: string;
  wordCount: number;
}

export function ContentSeriesCreator({ content, wordCount }: Props) {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [series, setSeries] = useState<{ seriesName: string; parts: SeriesPart[] } | null>(null);
  const { toast } = useToast();

  if (wordCount < 200) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { action: "repurpose-series", content },
      });
      if (error) throw error;
      const parsed = typeof data.result === "string" ? JSON.parse(data.result.replace(/```json\n?|\n?```/g, "")) : data.result;
      setSeries(parsed);
    } catch (e: any) {
      toast({ title: "Failed", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium flex items-center gap-2 cursor-pointer">
          <Link2 className="h-4 w-4" />🔗 Create Content Series
        </Label>
        <Switch checked={enabled} onCheckedChange={setEnabled} />
      </div>

      {enabled && (
        <>
          {!series && (
            <Button onClick={handleGenerate} disabled={loading} variant="outline" size="sm" className="w-full">
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating series...</> : <><Sparkles className="mr-2 h-4 w-4" />Generate Series Outline</>}
            </Button>
          )}
          {series && (
            <div className="space-y-2">
              <p className="text-sm font-medium">{series.seriesName}</p>
              {series.parts.map((p) => (
                <div key={p.partNumber} className="flex items-start gap-3 p-2 border rounded">
                  <Badge variant="outline" className="shrink-0 mt-0.5">Part {p.partNumber}</Badge>
                  <div>
                    <p className="text-sm font-medium">{p.title}</p>
                    <p className="text-xs text-muted-foreground">{p.summary}</p>
                    <p className="text-[10px] text-muted-foreground">~{p.wordCount} words</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </Card>
  );
}
