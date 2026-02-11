import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hash, Loader2 } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";

interface HashtagResearchProps {
  topic: string;
  platform: string;
  platformName: string;
  onAddHashtags: (tags: string[]) => void;
}

export function HashtagResearch({ topic, platform, platformName, onAddHashtags }: HashtagResearchProps) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const { callAI, isLoading } = useBlogAI();

  const handleOpen = async () => {
    setOpen(true);
    setSelected(new Set());
    const result = await callAI("social-hashtag-research", { topic, platform });
    if (result && typeof result === "object") setData(result);
    else if (typeof result === "string") {
      try { setData(JSON.parse(result)); } catch { /* ignore */ }
    }
  };

  const toggle = (tag: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  };

  const addSelected = () => {
    onAddHashtags(Array.from(selected));
    setOpen(false);
  };

  const addAll = (tags: any[]) => {
    onAddHashtags(tags.map(t => t.tag));
    setOpen(false);
  };

  const renderTags = (tags: any[], showReach = true) => (
    <div className="space-y-2 max-h-[300px] overflow-y-auto">
      {(tags || []).map((t, i) => (
        <div key={i} className="flex items-center gap-3 p-2 rounded-lg border hover:bg-muted/50 cursor-pointer" onClick={() => toggle(t.tag)}>
          <Checkbox checked={selected.has(t.tag)} />
          <span className="font-mono text-sm flex-1">{t.tag}</span>
          {showReach && <span className="text-xs text-muted-foreground">{t.estimatedReach}</span>}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Button variant="ghost" size="sm" onClick={handleOpen} disabled={!topic} className="text-xs h-7 px-2">
        <Hash className="h-3 w-3 mr-1" />#
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5" />
              Hashtags for {platformName}
            </DialogTitle>
          </DialogHeader>
          {isLoading("social-hashtag-research") ? (
            <div className="flex items-center justify-center py-12"><Loader2 className="h-6 w-6 animate-spin" /></div>
          ) : data ? (
            <div className="space-y-4">
              {data.optimalCount && (
                <p className="text-sm text-muted-foreground">Optimal hashtag count: <Badge variant="secondary">{data.optimalCount}</Badge></p>
              )}
              <Tabs defaultValue="high">
                <TabsList className="w-full">
                  <TabsTrigger value="high" className="flex-1">High Volume</TabsTrigger>
                  <TabsTrigger value="niche" className="flex-1">Niche</TabsTrigger>
                  <TabsTrigger value="trending" className="flex-1">Trending</TabsTrigger>
                </TabsList>
                <TabsContent value="high">{renderTags(data.highVolume)}</TabsContent>
                <TabsContent value="niche">{renderTags(data.niche)}</TabsContent>
                <TabsContent value="trending">{renderTags(data.trending)}</TabsContent>
              </Tabs>
              <div className="flex gap-2">
                <Button onClick={addSelected} disabled={selected.size === 0} className="flex-1">
                  Add Selected ({selected.size})
                </Button>
                <Button variant="outline" onClick={() => addAll(data.highVolume || [])}>
                  Add All Top
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No data yet</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
