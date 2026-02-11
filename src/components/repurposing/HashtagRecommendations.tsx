import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Hash, Loader2, Copy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface HashtagData {
  hashtags: { tag: string; category: string }[];
  mentions: { handle: string; reason: string }[];
}

interface Props {
  platform: string;
  contentSummary: string;
  onAddHashtags: (tags: string[]) => void;
  visible: boolean;
}

export function HashtagRecommendations({ platform, contentSummary, onAddHashtags, visible }: Props) {
  const [data, setData] = useState<HashtagData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  if (!visible) return null;

  const socialPlatforms = ["twitter", "linkedin", "instagram", "facebook"];
  if (!socialPlatforms.includes(platform)) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const { data: res, error } = await supabase.functions.invoke("ai-assistant", {
        body: { action: "repurpose-hashtags", platform, contentSummary },
      });
      if (error) throw error;
      const parsed = typeof res.result === "string" ? JSON.parse(res.result.replace(/```json\n?|\n?```/g, "")) : res.result;
      setData(parsed);
      setSelected(new Set(parsed.hashtags.map((h: any) => h.tag)));
    } catch (e: any) {
      toast({ title: "Failed", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const toggleTag = (tag: string) => {
    const next = new Set(selected);
    next.has(tag) ? next.delete(tag) : next.add(tag);
    setSelected(next);
  };

  const categoryColor: Record<string, string> = {
    Trending: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    Niche: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    Branded: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  };

  return (
    <Card className="p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium flex items-center gap-1"><Hash className="h-3 w-3" />Hashtags & Mentions</span>
        <Button onClick={handleGenerate} disabled={loading} variant="ghost" size="sm" className="h-7 text-xs">
          {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : "Generate"}
        </Button>
      </div>
      {data && (
        <>
          <div className="flex flex-wrap gap-1">
            {data.hashtags.map((h) => (
              <label key={h.tag} className="flex items-center gap-1 cursor-pointer">
                <Checkbox checked={selected.has(h.tag)} onCheckedChange={() => toggleTag(h.tag)} className="h-3 w-3" />
                <Badge variant="outline" className={`text-[10px] ${categoryColor[h.category] || ""}`}>{h.tag}</Badge>
              </label>
            ))}
          </div>
          {data.mentions.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {data.mentions.map((m) => (
                <Badge key={m.handle} variant="secondary" className="text-[10px]" title={m.reason}>{m.handle}</Badge>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => onAddHashtags(Array.from(selected))}>
              Add Selected ({selected.size})
            </Button>
            <Button size="sm" variant="ghost" className="text-xs h-7" onClick={() => { onAddHashtags(data.hashtags.map((h) => h.tag)); }}>
              Add All
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}
