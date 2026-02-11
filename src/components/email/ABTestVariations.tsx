import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Sparkles, Loader2 } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";
import { useToast } from "@/hooks/use-toast";

interface ABVariations {
  variationB: { approach: string; content: string };
  variationC: { approach: string; content: string };
}

export function ABTestVariations({ content }: { content: string }) {
  const [variations, setVariations] = useState<ABVariations | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const { callAI, isLoading } = useBlogAI();
  const { toast } = useToast();

  if (!content) return null;

  const handleGenerate = async () => {
    setShowPanel(true);
    const result = await callAI("email-ab-variations", { content });
    if (result?.variationB) setVariations(result);
  };

  if (!showPanel) {
    return (
      <Button variant="outline" size="sm" onClick={handleGenerate} disabled={isLoading("email-ab-variations")} className="gap-1.5 mt-3">
        {isLoading("email-ab-variations") ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
        Generate A/B Test Variations
      </Button>
    );
  }

  const copyContent = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!" });
  };

  return (
    <Card className="p-4 mt-4">
      <Tabs defaultValue="a">
        <div className="flex items-center justify-between mb-3">
          <TabsList>
            <TabsTrigger value="a" className="text-xs">Version A (Original)</TabsTrigger>
            <TabsTrigger value="b" className="text-xs" disabled={!variations}>Version B (Story)</TabsTrigger>
            <TabsTrigger value="c" className="text-xs" disabled={!variations}>Version C (Data)</TabsTrigger>
          </TabsList>
          {!variations && isLoading("email-ab-variations") && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
        </div>

        <TabsContent value="a">
          <div className="relative">
            <div className="bg-muted/50 rounded-lg p-4 max-h-[300px] overflow-y-auto whitespace-pre-wrap text-sm">{content}</div>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => copyContent(content)}>
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </TabsContent>

        {variations && (
          <>
            <TabsContent value="b">
              <div className="relative">
                <div className="bg-muted/50 rounded-lg p-4 max-h-[300px] overflow-y-auto whitespace-pre-wrap text-sm">{variations.variationB.content}</div>
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => copyContent(variations.variationB.content)}>
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="c">
              <div className="relative">
                <div className="bg-muted/50 rounded-lg p-4 max-h-[300px] overflow-y-auto whitespace-pre-wrap text-sm">{variations.variationC.content}</div>
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => copyContent(variations.variationC.content)}>
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>
    </Card>
  );
}
