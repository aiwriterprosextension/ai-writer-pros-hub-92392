import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Loader2, Key } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";

interface KeywordData {
  primary: { keyword: string; volume: string; difficulty: number }[];
  lsi: { keyword: string; explanation: string }[];
  longTail: { keyword: string }[];
}

export function KeywordResearchModal({ topic, onAddKeywords }: { topic: string; onAddKeywords: (keywords: string) => void }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<KeywordData | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const { callAI, isLoading } = useBlogAI();

  const handleResearch = async () => {
    const result = await callAI("keyword-research", { topic });
    if (result?.primary) {
      setData(result);
      setSelected(new Set());
    }
  };

  const toggleKeyword = (kw: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(kw) ? next.delete(kw) : next.add(kw);
      return next;
    });
  };

  const addSelected = () => {
    onAddKeywords(Array.from(selected).join(", "));
    setOpen(false);
  };

  const addAllPrimary = () => {
    if (!data) return;
    onAddKeywords(data.primary.map(p => p.keyword).join(", "));
    setOpen(false);
  };

  const diffColor = (d: number) => d < 30 ? "text-green-600" : d < 60 ? "text-yellow-600" : "text-red-500";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" disabled={!topic} className="gap-1.5">
          <Key className="h-3.5 w-3.5" /> Find Keywords
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" />Smart Keyword Research</DialogTitle>
        </DialogHeader>

        {!data ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Analyzing topic: <strong>"{topic}"</strong></p>
            <Button onClick={handleResearch} disabled={isLoading("keyword-research")} className="w-full">
              {isLoading("keyword-research") ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Researching Keywords...</> : <><Sparkles className="mr-2 h-4 w-4" />Research Keywords</>}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Tabs defaultValue="primary">
              <TabsList className="w-full">
                <TabsTrigger value="primary" className="flex-1">Primary ({data.primary.length})</TabsTrigger>
                <TabsTrigger value="lsi" className="flex-1">LSI ({data.lsi.length})</TabsTrigger>
                <TabsTrigger value="longtail" className="flex-1">Long-Tail ({data.longTail.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="primary" className="space-y-2">
                {data.primary.map((kw, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 border rounded-md">
                    <Checkbox checked={selected.has(kw.keyword)} onCheckedChange={() => toggleKeyword(kw.keyword)} />
                    <div className="flex-1">
                      <span className="text-sm font-medium">{kw.keyword}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">{kw.volume}</Badge>
                    <span className={`text-xs font-medium ${diffColor(kw.difficulty)}`}>{kw.difficulty}/100</span>
                  </div>
                ))}
                <Button size="sm" variant="secondary" onClick={addAllPrimary} className="w-full">Add All Primary</Button>
              </TabsContent>
              <TabsContent value="lsi" className="space-y-2">
                {data.lsi.map((kw, i) => (
                  <div key={i} className="flex items-start gap-3 p-2 border rounded-md">
                    <Checkbox checked={selected.has(kw.keyword)} onCheckedChange={() => toggleKeyword(kw.keyword)} className="mt-0.5" />
                    <div>
                      <span className="text-sm font-medium">{kw.keyword}</span>
                      <p className="text-xs text-muted-foreground">{kw.explanation}</p>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="longtail" className="space-y-2">
                {data.longTail.map((kw, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 border rounded-md">
                    <Checkbox checked={selected.has(kw.keyword)} onCheckedChange={() => toggleKeyword(kw.keyword)} />
                    <span className="text-sm">{kw.keyword}</span>
                  </div>
                ))}
              </TabsContent>
            </Tabs>

            <div className="flex gap-2">
              <Button onClick={addSelected} disabled={selected.size === 0} className="flex-1">
                Add Selected ({selected.size})
              </Button>
              <Button variant="outline" onClick={handleResearch} disabled={isLoading("keyword-research")}>
                <Sparkles className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
