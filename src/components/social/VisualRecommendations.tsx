import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Copy, Palette, Image } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";
import { useToast } from "@/hooks/use-toast";

interface VisualRecommendationsProps {
  content: string;
}

export function VisualRecommendations({ content }: VisualRecommendationsProps) {
  const [data, setData] = useState<any>(null);
  const [fetched, setFetched] = useState(false);
  const { callAI, isLoading } = useBlogAI();
  const { toast } = useToast();

  useEffect(() => {
    if (content && !fetched) {
      setFetched(true);
      callAI("social-visual-suggestions", { content }).then(result => {
        if (result && typeof result === "object") setData(result);
        else if (typeof result === "string") {
          try { setData(JSON.parse(result)); } catch { /* ignore */ }
        }
      });
    }
  }, [content]);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!" });
  };

  if (!content) return null;

  return (
    <Card className="p-4 space-y-3">
      <h4 className="font-semibold text-sm flex items-center gap-2">
        <Image className="h-4 w-4 text-primary" />
        🎨 Visual Recommendations
      </h4>
      {isLoading("social-visual-suggestions") ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Analyzing content...</div>
      ) : data ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Type:</span>
            <Badge>{data.visualType}</Badge>
          </div>
          {data.colorPalette && (
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-1">
                {data.colorPalette.map((c: string, i: number) => (
                  <button key={i} onClick={() => copy(c)} className="w-8 h-8 rounded-md border shadow-sm hover:scale-110 transition-transform" style={{ backgroundColor: c }} title={c} />
                ))}
              </div>
            </div>
          )}
          {data.imagePrompt && (
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-muted-foreground">Image Generation Prompt</span>
                <Button variant="ghost" size="sm" className="h-6 px-2" onClick={() => copy(data.imagePrompt)}><Copy className="h-3 w-3" /></Button>
              </div>
              <p className="text-sm">{data.imagePrompt}</p>
            </div>
          )}
          {data.thumbnailPlacement && (
            <p className="text-xs text-muted-foreground">📌 Placement: {data.thumbnailPlacement}</p>
          )}
        </div>
      ) : null}
    </Card>
  );
}
