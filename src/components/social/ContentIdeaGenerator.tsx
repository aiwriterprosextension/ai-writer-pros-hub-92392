import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Lightbulb, Loader2, RefreshCw, Twitter, Linkedin, Instagram, Facebook } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";

const industries = [
  "Technology", "Healthcare", "Finance", "E-commerce", "Education", "Marketing",
  "Real Estate", "Travel", "Food & Beverage", "Fitness", "Fashion", "SaaS",
  "Entertainment", "Automotive", "Non-Profit", "Other",
];

const platformIcons: Record<string, any> = {
  twitter: Twitter, linkedin: Linkedin, instagram: Instagram, facebook: Facebook,
};

interface ContentIdeaGeneratorProps {
  onSelectIdea: (idea: string) => void;
}

export function ContentIdeaGenerator({ onSelectIdea }: ContentIdeaGeneratorProps) {
  const [open, setOpen] = useState(false);
  const [businessType, setBusinessType] = useState("");
  const [industry, setIndustry] = useState("");
  const [wins, setWins] = useState("");
  const [challenges, setChallenges] = useState("");
  const [ideas, setIdeas] = useState<any[]>([]);
  const { callAI, isLoading } = useBlogAI();

  const handleGenerate = async () => {
    const result = await callAI("social-content-ideas", { businessType, industry, wins, challenges });
    if (Array.isArray(result)) setIdeas(result);
    else if (result) {
      try { setIdeas(JSON.parse(result)); } catch { setIdeas([]); }
    }
  };

  const handleUse = (title: string) => {
    onSelectIdea(title);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full border-dashed border-2 border-primary/30 hover:border-primary/60" size="lg">
          <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
          🤔 I Need Content Ideas
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            AI Content Idea Generator
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Business Type</Label>
              <Input placeholder="e.g. SaaS startup, local bakery..." value={businessType} onChange={e => setBusinessType(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Industry</Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
                <SelectContent>{industries.map(i => <SelectItem key={i} value={i.toLowerCase()}>{i}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Recent Wins/Products (optional)</Label>
              <Textarea placeholder="e.g. Just launched v2.0..." value={wins} onChange={e => setWins(e.target.value)} maxLength={100} className="h-20" />
              <span className="text-xs text-muted-foreground">{wins.length}/100</span>
            </div>
            <div className="space-y-2">
              <Label>Current Challenges (optional)</Label>
              <Textarea placeholder="e.g. Low engagement on LinkedIn..." value={challenges} onChange={e => setChallenges(e.target.value)} maxLength={100} className="h-20" />
              <span className="text-xs text-muted-foreground">{challenges.length}/100</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleGenerate} disabled={!businessType || isLoading("social-content-ideas")} className="flex-1">
              {isLoading("social-content-ideas") ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : "✨ Generate Ideas"}
            </Button>
            {ideas.length > 0 && (
              <Button variant="outline" onClick={handleGenerate} disabled={isLoading("social-content-ideas")}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
          </div>
          {ideas.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
              {ideas.map((idea, i) => (
                <Card key={i} className="p-4 space-y-2 hover:border-primary/50 transition-colors">
                  <h4 className="font-semibold text-sm">{idea.title}</h4>
                  <p className="text-xs text-muted-foreground">{idea.angle}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {(idea.platforms || []).map((p: string) => {
                      const Icon = platformIcons[p];
                      return Icon ? <Icon key={p} className="h-3.5 w-3.5 text-muted-foreground" /> : null;
                    })}
                    <Badge variant={idea.engagementPotential === "High" ? "default" : idea.engagementPotential === "Medium" ? "secondary" : "outline"} className="text-xs ml-auto">
                      {idea.engagementPotential}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => handleUse(idea.title)}>
                    Use This Idea
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
