import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, RefreshCw, Loader2 } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";

const INDUSTRIES = [
  "Technology", "Healthcare", "Finance", "E-commerce", "Education",
  "Marketing", "Real Estate", "SaaS", "Fitness", "Food & Beverage",
  "Travel", "Fashion", "Legal", "Consulting", "Non-Profit", "Other"
];

const CAMPAIGN_GOALS = [
  { value: "sales", label: "Sales" },
  { value: "re-engagement", label: "Re-engagement" },
  { value: "announcement", label: "Announcement" },
  { value: "education", label: "Education" },
  { value: "onboarding", label: "Onboarding" },
  { value: "nurture", label: "Nurture" },
];

interface TopicIdea {
  title: string;
  description: string;
}

export function EmailTopicIdeasModal({ onSelectTopic }: { onSelectTopic: (topic: string) => void }) {
  const [open, setOpen] = useState(false);
  const [industry, setIndustry] = useState("");
  const [goal, setGoal] = useState("sales");
  const [seasonEvent, setSeasonEvent] = useState("");
  const [topics, setTopics] = useState<TopicIdea[]>([]);
  const { callAI, isLoading } = useBlogAI();

  const handleGenerate = async () => {
    if (!industry) return;
    const result = await callAI("email-topic-ideas", { industry, campaignGoal: goal, seasonEvent });
    if (Array.isArray(result)) setTopics(result);
  };

  const handleSelect = (title: string) => {
    onSelectTopic(title);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Sparkles className="h-3.5 w-3.5" /> Get AI Topic Ideas
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" />AI Topic Ideas</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Industry</Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger><SelectValue placeholder="Select industry..." /></SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Campaign Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CAMPAIGN_GOALS.map(g => <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Season / Event <span className="text-muted-foreground text-xs">(optional)</span></Label>
            <Input placeholder="e.g. Black Friday, New Year, Product Launch..." value={seasonEvent} onChange={e => setSeasonEvent(e.target.value)} />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleGenerate} disabled={!industry || isLoading("email-topic-ideas")} className="flex-1">
              {isLoading("email-topic-ideas") ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Sparkles className="mr-2 h-4 w-4" />Generate Ideas</>}
            </Button>
            {topics.length > 0 && (
              <Button variant="outline" onClick={handleGenerate} disabled={isLoading("email-topic-ideas")}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
          </div>

          {topics.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-3">
              {topics.map((t, i) => (
                <div key={i} className="border rounded-lg p-3 space-y-2 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => handleSelect(t.title)}>
                  <h4 className="font-medium text-sm leading-tight">{t.title}</h4>
                  <p className="text-xs text-muted-foreground">{t.description}</p>
                  <Button size="sm" variant="outline" className="w-full text-xs">Use This Topic</Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
