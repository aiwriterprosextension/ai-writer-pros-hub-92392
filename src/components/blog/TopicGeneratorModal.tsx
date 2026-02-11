import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Sparkles, RefreshCw, Loader2 } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";

const NICHES = [
  "Technology", "Health & Wellness", "Finance & Investing", "E-commerce", "Education",
  "Travel", "Food & Cooking", "Fitness", "Real Estate", "Marketing",
  "Personal Development", "Parenting", "Fashion", "Gaming", "Automotive",
  "Pets & Animals", "Home Improvement", "Photography", "Music", "Legal", "Other"
];

const GOALS = [
  { value: "educate", label: "Educate Readers" },
  { value: "convert", label: "Convert to Customers" },
  { value: "engage", label: "Engage & Entertain" },
  { value: "authority", label: "Build Authority" },
  { value: "traffic", label: "Drive Organic Traffic" },
];

interface Topic {
  title: string;
  angle: string;
  seoPotential: string;
}

export function TopicGeneratorModal({ onSelectTopic }: { onSelectTopic: (topic: string) => void }) {
  const [open, setOpen] = useState(false);
  const [niche, setNiche] = useState("");
  const [otherNiche, setOtherNiche] = useState("");
  const [audience, setAudience] = useState("");
  const [goal, setGoal] = useState("educate");
  const [topics, setTopics] = useState<Topic[]>([]);
  const { callAI, isLoading } = useBlogAI();

  const handleGenerate = async () => {
    const selectedNiche = niche === "Other" ? otherNiche : niche;
    if (!selectedNiche) return;
    const result = await callAI("generate-topics", { niche: selectedNiche, audience, goal });
    if (Array.isArray(result)) setTopics(result);
  };

  const handleSelect = (title: string) => {
    onSelectTopic(title);
    setOpen(false);
  };

  const badgeColor = (potential: string) => {
    switch (potential?.toLowerCase()) {
      case "high": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Sparkles className="h-3.5 w-3.5" /> Can't Think of a Topic?
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" />AI Topic Generator</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Niche / Industry</Label>
            <Select value={niche} onValueChange={setNiche}>
              <SelectTrigger><SelectValue placeholder="Select your niche..." /></SelectTrigger>
              <SelectContent>
                {NICHES.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
              </SelectContent>
            </Select>
            {niche === "Other" && (
              <Input placeholder="Enter your niche..." value={otherNiche} onChange={e => setOtherNiche(e.target.value)} />
            )}
          </div>

          <div className="space-y-2">
            <Label>Target Audience <span className="text-muted-foreground text-xs">(optional)</span></Label>
            <Input placeholder="e.g. Small business owners, college students..." value={audience} onChange={e => setAudience(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Content Goal</Label>
            <RadioGroup value={goal} onValueChange={setGoal} className="grid grid-cols-2 gap-2">
              {GOALS.map(g => (
                <div key={g.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={g.value} id={`goal-${g.value}`} />
                  <Label htmlFor={`goal-${g.value}`} className="cursor-pointer text-sm">{g.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleGenerate} disabled={(!niche || (niche === "Other" && !otherNiche)) || isLoading("generate-topics")} className="flex-1">
              {isLoading("generate-topics") ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Sparkles className="mr-2 h-4 w-4" />Generate Topics</>}
            </Button>
            {topics.length > 0 && (
              <Button variant="outline" onClick={handleGenerate} disabled={isLoading("generate-topics")}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
          </div>

          {topics.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-3">
              {topics.map((t, i) => (
                <div key={i} className="border rounded-lg p-3 space-y-2 hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-sm leading-tight">{t.title}</h4>
                    <Badge variant="outline" className={`text-[10px] shrink-0 ${badgeColor(t.seoPotential)}`}>
                      {t.seoPotential}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{t.angle}</p>
                  <Button size="sm" variant="outline" className="w-full text-xs" onClick={() => handleSelect(t.title)}>
                    Use This Topic
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
