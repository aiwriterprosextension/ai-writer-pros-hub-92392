import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { allFormats } from "./FormatSelector";

interface PreviewItem {
  format: string;
  preview: string;
  status: string;
  statusReason: string;
}

interface Props {
  content: string;
  selectedFormats: string[];
  visible: boolean;
}

export function FormatPreview({ content, selectedFormats, visible }: Props) {
  const [previews, setPreviews] = useState<PreviewItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  if (!visible || selectedFormats.length === 0) return null;

  const handlePreview = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { action: "repurpose-preview", content, formats: selectedFormats },
      });
      if (error) throw error;
      const parsed = typeof data.result === "string" ? JSON.parse(data.result.replace(/```json\n?|\n?```/g, "")) : data.result;
      setPreviews(parsed);
    } catch (e: any) {
      toast({ title: "Preview failed", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Button onClick={handlePreview} disabled={loading} variant="outline" size="sm" className="w-full">
        {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating previews...</> : <><Eye className="mr-2 h-4 w-4" /><Sparkles className="mr-1 h-3 w-3" />Preview All Formats</>}
      </Button>
      {previews.length > 0 && (
        <div className="grid grid-cols-1 gap-2">
          {previews.map((p) => {
            const fmt = allFormats.find((f) => f.id === p.format);
            const Icon = fmt?.icon;
            return (
              <Card key={p.format} className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  {Icon && <Icon className="h-4 w-4" />}
                  <span className="text-xs font-medium capitalize">{p.format.replace("-", " ")}</span>
                  <Badge variant={p.status === "good" ? "default" : "destructive"} className="text-[10px] ml-auto">
                    {p.status === "good" ? "Looks Good ✓" : "May Need Adjustment ⚠️"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{p.preview}</p>
                {p.status !== "good" && <p className="text-[10px] text-yellow-600 mt-1">{p.statusReason}</p>}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
