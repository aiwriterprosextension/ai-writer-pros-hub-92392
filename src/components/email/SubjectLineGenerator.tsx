import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Sparkles, Loader2 } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";
import { useToast } from "@/hooks/use-toast";

interface SubjectLine {
  text: string;
  style: string;
  estimatedOpenRate: string;
}

const styleColor: Record<string, string> = {
  Urgency: "bg-red-500/10 text-red-600 border-red-500/20",
  Curiosity: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  Benefit: "bg-green-500/10 text-green-600 border-green-500/20",
  Personalization: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Question: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
};

export function SubjectLineGenerator({
  topic, audience, emailType, onSelect
}: {
  topic: string; audience: string; emailType: string;
  onSelect: (line: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<SubjectLine[]>([]);
  const { callAI, isLoading } = useBlogAI();
  const { toast } = useToast();

  const handleGenerate = async () => {
    const result = await callAI("email-subject-lines", { topic, audience, emailType });
    if (Array.isArray(result)) setLines(result);
  };

  const handleUse = (text: string) => {
    onSelect(text);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" disabled={!topic} className="gap-1.5">
          <Sparkles className="h-3.5 w-3.5" /> Generate Subject Lines
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" />Subject Line Generator</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {lines.length === 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Generate 5 compelling subject line variations for: <strong>"{topic}"</strong></p>
              <Button onClick={handleGenerate} disabled={isLoading("email-subject-lines")} className="w-full">
                {isLoading("email-subject-lines") ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Sparkles className="mr-2 h-4 w-4" />Generate Subject Lines</>}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {lines.map((line, i) => (
                <div key={i} className="border rounded-lg p-3 space-y-2 hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium flex-1">{line.text}</p>
                    <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => { navigator.clipboard.writeText(line.text); toast({ title: "Copied!" }); }}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-[10px] ${styleColor[line.style] || 'bg-muted'}`}>{line.style}</Badge>
                    <span className="text-[10px] text-muted-foreground">Est. {line.estimatedOpenRate} open rate</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full text-xs" onClick={() => handleUse(line.text)}>Use This</Button>
                </div>
              ))}
              <Button variant="outline" onClick={handleGenerate} disabled={isLoading("email-subject-lines")} className="w-full text-sm">
                <Sparkles className="mr-2 h-4 w-4" />Regenerate
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
