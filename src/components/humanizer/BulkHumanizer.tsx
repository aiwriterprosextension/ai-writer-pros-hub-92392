import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader2, Layers, RefreshCw, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BulkResult {
  original: string;
  humanized: string;
}

interface Props {
  content: string;
  style: string;
  industry: string;
  intensity: string;
  onResult: (combined: string) => void;
}

export function BulkHumanizer({ content, style, industry, intensity, onResult }: Props) {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<BulkResult[]>([]);
  const [regeneratingIdx, setRegeneratingIdx] = useState<number | null>(null);
  const { toast } = useToast();

  const paragraphs = content.split(/\n\n+/).filter((p) => p.trim().length > 0);

  if (paragraphs.length < 2) return null;

  const handleBulk = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { action: "humanizer-bulk", paragraphs, style, industry, intensity },
      });
      if (error) throw error;
      const parsed = typeof data.result === "string" ? JSON.parse(data.result.replace(/```json\n?|\n?```/g, "")) : data.result;
      setResults(parsed);
    } catch (e: any) {
      toast({ title: "Failed", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async (idx: number) => {
    setRegeneratingIdx(idx);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { action: "humanizer-bulk", paragraphs: [paragraphs[idx]], style, industry, intensity },
      });
      if (error) throw error;
      const parsed = typeof data.result === "string" ? JSON.parse(data.result.replace(/```json\n?|\n?```/g, "")) : data.result;
      if (parsed[0]) {
        setResults((prev) => prev.map((r, i) => (i === idx ? parsed[0] : r)));
      }
    } catch (e: any) {
      toast({ title: "Failed", description: e.message, variant: "destructive" });
    } finally {
      setRegeneratingIdx(null);
    }
  };

  const combineAll = () => {
    const combined = results.map((r) => r.humanized).join("\n\n");
    onResult(combined);
    toast({ title: "Combined!", description: "All paragraphs merged into output." });
  };

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium flex items-center gap-2 cursor-pointer">
          <Layers className="h-4 w-4" />Bulk Paragraph Mode
        </Label>
        <Switch checked={enabled} onCheckedChange={setEnabled} />
      </div>
      {enabled && (
        <>
          <p className="text-xs text-muted-foreground">{paragraphs.length} paragraphs detected</p>
          {results.length === 0 && (
            <Button onClick={handleBulk} disabled={loading} variant="outline" size="sm" className="w-full">
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing...</> : <><Sparkles className="mr-2 h-4 w-4" />Humanize All Paragraphs</>}
            </Button>
          )}
          {results.length > 0 && (
            <>
              <Accordion type="single" collapsible className="w-full">
                {results.map((r, i) => (
                  <AccordionItem key={i} value={`p-${i}`}>
                    <AccordionTrigger className="text-xs py-2">Paragraph {i + 1}</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-xs p-2 bg-muted/30 rounded">
                          <p className="font-medium text-[10px] text-muted-foreground mb-1">Original</p>
                          {r.original}
                        </div>
                        <div className="text-xs p-2 bg-green-50 dark:bg-green-950/20 rounded">
                          <p className="font-medium text-[10px] text-muted-foreground mb-1">Humanized</p>
                          {r.humanized}
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="text-xs h-7" onClick={() => handleRegenerate(i)} disabled={regeneratingIdx === i}>
                        {regeneratingIdx === i ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <RefreshCw className="h-3 w-3 mr-1" />}
                        Regenerate
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Button onClick={combineAll} size="sm" className="w-full">Combine All Paragraphs</Button>
            </>
          )}
        </>
      )}
    </Card>
  );
}
