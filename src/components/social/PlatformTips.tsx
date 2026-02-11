import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Loader2, Smartphone } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";

interface PlatformTipsProps {
  selectedPlatforms: string[];
  platformNames: Record<string, string>;
}

export function PlatformTips({ selectedPlatforms, platformNames }: PlatformTipsProps) {
  const [tips, setTips] = useState<Record<string, any>>({});
  const [open, setOpen] = useState(false);
  const { callAI, isLoading } = useBlogAI();

  const fetchTips = async () => {
    for (const p of selectedPlatforms) {
      if (tips[p]) continue;
      const result = await callAI("social-platform-tips", { platform: p });
      if (result && typeof result === "object") {
        setTips(prev => ({ ...prev, [p]: result }));
      } else if (typeof result === "string") {
        try { setTips(prev => ({ ...prev, [p]: JSON.parse(result) })); } catch { /* ignore */ }
      }
    }
  };

  useEffect(() => {
    if (open && selectedPlatforms.length > 0) {
      fetchTips();
    }
  }, [open, selectedPlatforms.join(",")]);

  if (selectedPlatforms.length === 0) return null;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium w-full p-2 rounded-lg hover:bg-muted/50 transition-colors">
        <Smartphone className="h-4 w-4 text-primary" />
        📱 Platform Tips
        <ChevronDown className={`h-4 w-4 ml-auto transition-transform ${open ? "rotate-180" : ""}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 pt-2">
        {selectedPlatforms.map(p => {
          const tip = tips[p];
          return (
            <Card key={p} className="p-3 space-y-2">
              <h4 className="font-semibold text-sm">{platformNames[p] || p}</h4>
              {isLoading("social-platform-tips") && !tip ? (
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><Loader2 className="h-3 w-3 animate-spin" />Loading...</div>
              ) : tip ? (
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Characters:</span>
                    <Badge variant="secondary">{tip.charMin}-{tip.charMax}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Hashtags:</span>
                    <Badge variant="secondary">{tip.hashtagCount}</Badge>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-muted-foreground">Best times:</span>
                    {(tip.bestTimes || []).map((t: string, i: number) => <Badge key={i} variant="outline">{t}</Badge>)}
                  </div>
                  <div className="bg-primary/5 border border-primary/10 rounded-md p-2 text-xs">{tip.engagementTip}</div>
                </div>
              ) : null}
            </Card>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}
