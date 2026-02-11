import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Loader2, RefreshCw, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface VersionData {
  versionA: { approach: string; content: string };
  versionB: { approach: string; content: string };
  versionC: { approach: string; content: string };
}

interface Props {
  content: string;
  style: string;
  industry: string;
  readingLevel: string;
  onSelectVersion: (content: string) => void;
  visible: boolean;
}

export function VersionAlternatives({ content, style, industry, readingLevel, onSelectVersion, visible }: Props) {
  const [versions, setVersions] = useState<VersionData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  if (!visible) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { action: "humanizer-versions", content, style, industry, readingLevel },
      });
      if (error) throw error;
      const parsed = typeof data.result === "string" ? JSON.parse(data.result.replace(/```json\n?|\n?```/g, "")) : data.result;
      setVersions(parsed);
    } catch (e: any) {
      toast({ title: "Failed", description: e.message, variant: "destructive" });
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
        <h4 className="text-sm font-medium flex items-center gap-2"><RefreshCw className="h-4 w-4" />Alternative Versions</h4>
        <Button onClick={handleGenerate} disabled={loading} variant="outline" size="sm">
          {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
          <span className="ml-1">{versions ? "Regenerate" : "Generate"}</span>
        </Button>
      </div>

      {versions && (
        <Tabs defaultValue="a" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="a">Conversational</TabsTrigger>
            <TabsTrigger value="b">Professional</TabsTrigger>
            <TabsTrigger value="c">Creative</TabsTrigger>
          </TabsList>
          {[
            { key: "a", data: versions.versionA },
            { key: "b", data: versions.versionB },
            { key: "c", data: versions.versionC },
          ].map(({ key, data: v }) => (
            <TabsContent key={key} value={key} className="space-y-2">
              <div className="text-sm bg-muted/50 p-3 rounded whitespace-pre-wrap max-h-[300px] overflow-y-auto">{v.content}</div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => copyText(v.content)}><Copy className="h-3 w-3 mr-1" />Copy</Button>
                <Button size="sm" onClick={() => { onSelectVersion(v.content); toast({ title: `${v.approach} version selected!` }); }}>
                  Select This Version
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </Card>
  );
}
