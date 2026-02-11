import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2, MessageCircle } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";

interface EngagementHooksProps {
  content: string;
  platforms: string[];
  onAppend: (text: string) => void;
}

export function EngagementHooks({ content, platforms, onAppend }: EngagementHooksProps) {
  const [options, setOptions] = useState<string[]>([]);
  const [hooks, setHooks] = useState<any>(null);
  const { callAI, isLoading } = useBlogAI();

  const toggleOption = (opt: string) => {
    setOptions(prev => prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]);
  };

  const generate = async () => {
    const result = await callAI("social-engagement-hooks", { content, options, platforms });
    if (result && typeof result === "object") setHooks(result);
    else if (typeof result === "string") {
      try { setHooks(JSON.parse(result)); } catch { /* ignore */ }
    }
  };

  if (!content) return null;

  return (
    <Card className="p-4 space-y-3">
      <h4 className="font-semibold text-sm flex items-center gap-2"><MessageCircle className="h-4 w-4" />Add Engagement Hooks</h4>
      <div className="flex flex-wrap gap-4">
        {[
          { id: "question", label: "Add question to boost comments" },
          { id: "poll", label: "Suggest poll idea" },
          { id: "cta", label: "Include call-to-action" },
        ].map(opt => (
          <div key={opt.id} className="flex items-center gap-2 cursor-pointer" onClick={() => toggleOption(opt.id)}>
            <Checkbox checked={options.includes(opt.id)} />
            <Label className="text-sm cursor-pointer">{opt.label}</Label>
          </div>
        ))}
      </div>
      <Button size="sm" onClick={generate} disabled={options.length === 0 || isLoading("social-engagement-hooks")}>
        {isLoading("social-engagement-hooks") ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : "✨ "}Generate Hooks
      </Button>
      {hooks && (
        <div className="space-y-2">
          {hooks.question && (
            <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
              <span className="text-sm flex-1">❓ {hooks.question}</span>
              <Button size="sm" variant="outline" onClick={() => onAppend(`\n\n${hooks.question}`)}>Add</Button>
            </div>
          )}
          {hooks.pollIdea && (
            <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
              <span className="text-sm flex-1">📊 {hooks.pollIdea}</span>
              <Button size="sm" variant="outline" onClick={() => onAppend(`\n\n${hooks.pollIdea}`)}>Add</Button>
            </div>
          )}
          {hooks.callToAction && (
            <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
              <span className="text-sm flex-1">👉 {hooks.callToAction}</span>
              <Button size="sm" variant="outline" onClick={() => onAppend(`\n\n${hooks.callToAction}`)}>Add</Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
