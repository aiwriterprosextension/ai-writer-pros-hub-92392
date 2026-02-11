import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, Loader2, Copy, ChevronDown, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SEOData {
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  internalLinks: { anchorText: string; opportunity: string }[];
}

interface Props {
  content: string;
  visible: boolean;
}

export function SEOMetadataGenerator({ content, visible }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const { toast } = useToast();

  if (!visible) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { action: "repurpose-seo", content },
      });
      if (error) throw error;
      const parsed = typeof data.result === "string" ? JSON.parse(data.result.replace(/```json\n?|\n?```/g, "")) : data.result;
      setSeoData(parsed);
    } catch (e: any) {
      toast({ title: "Failed", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const copyAll = () => {
    if (!seoData) return;
    const text = `Meta Title: ${seoData.metaTitle}\nMeta Description: ${seoData.metaDescription}\nFocus Keyword: ${seoData.focusKeyword}\n\nInternal Links:\n${seoData.internalLinks.map((l) => `- ${l.anchorText} → ${l.opportunity}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    toast({ title: "SEO data copied!" });
  };

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="border rounded-lg">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-sm hover:bg-muted/50">
        <span className="flex items-center gap-2"><Search className="h-4 w-4" />SEO Optimization</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-3 pt-0 space-y-3">
        {!seoData && (
          <Button onClick={handleGenerate} disabled={loading} variant="outline" size="sm" className="w-full">
            {loading ? <><Loader2 className="mr-2 h-3 w-3 animate-spin" />Generating...</> : <><Sparkles className="mr-2 h-3 w-3" />Generate SEO Metadata</>}
          </Button>
        )}
        {seoData && (
          <Card className="p-3 space-y-2 text-xs">
            <div>
              <span className="font-medium">Meta Title:</span>
              <p className="text-muted-foreground">{seoData.metaTitle} <span className="text-[10px]">({seoData.metaTitle.length}/60)</span></p>
            </div>
            <div>
              <span className="font-medium">Meta Description:</span>
              <p className="text-muted-foreground">{seoData.metaDescription} <span className="text-[10px]">({seoData.metaDescription.length}/160)</span></p>
            </div>
            <div>
              <span className="font-medium">Focus Keyword:</span>
              <span className="ml-1 text-primary">{seoData.focusKeyword}</span>
            </div>
            {seoData.internalLinks.length > 0 && (
              <div>
                <span className="font-medium">Internal Links:</span>
                {seoData.internalLinks.map((l, i) => (
                  <p key={i} className="text-muted-foreground ml-2">• <span className="text-primary">{l.anchorText}</span> → {l.opportunity}</p>
                ))}
              </div>
            )}
            <Button onClick={copyAll} variant="outline" size="sm" className="w-full text-xs">
              <Copy className="h-3 w-3 mr-1" />Copy All SEO Data
            </Button>
          </Card>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
