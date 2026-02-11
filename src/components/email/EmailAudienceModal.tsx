import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sparkles, Target, Loader2 } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";

const INDUSTRIES = [
  "Technology", "Healthcare", "Finance", "E-commerce", "Education",
  "Marketing", "Real Estate", "SaaS", "Fitness", "Food & Beverage",
  "Travel", "Fashion", "Legal", "Consulting", "Non-Profit", "Other"
];

export function EmailAudienceModal({ onSetAudience }: { onSetAudience: (audience: string) => void }) {
  const [open, setOpen] = useState(false);
  const [industry, setIndustry] = useState("");
  const [problem, setProblem] = useState("");
  const [awareness, setAwareness] = useState("warm");
  const [demographics, setDemographics] = useState("");
  const { callAI, isLoading } = useBlogAI();

  const handleGenerate = async () => {
    const result = await callAI("email-audience-profile", { industry, problem, awarenessLevel: awareness, demographics });
    if (typeof result === "string") {
      onSetAudience(result);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Target className="h-3.5 w-3.5" /> Describe Audience
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" />Audience Intelligence</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
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
            <Label>Main Problem <span className="text-muted-foreground text-xs">(50-200 chars)</span></Label>
            <Textarea placeholder="What problem does your audience face?" value={problem} onChange={e => setProblem(e.target.value)} maxLength={200} rows={2} />
            <p className="text-xs text-muted-foreground text-right">{problem.length}/200</p>
          </div>

          <div className="space-y-2">
            <Label>Awareness Level</Label>
            <RadioGroup value={awareness} onValueChange={setAwareness} className="space-y-2">
              {[
                { value: "cold", label: "Cold", desc: "Never heard of you" },
                { value: "warm", label: "Warm", desc: "Aware but not converted" },
                { value: "hot", label: "Hot", desc: "Ready to buy" },
              ].map(a => (
                <div key={a.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={a.value} id={`awareness-${a.value}`} />
                  <Label htmlFor={`awareness-${a.value}`} className="cursor-pointer text-sm">
                    {a.label} <span className="text-muted-foreground">— {a.desc}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Demographics <span className="text-muted-foreground text-xs">(optional)</span></Label>
            <Input placeholder="e.g. 25-45, urban, tech-savvy" value={demographics} onChange={e => setDemographics(e.target.value)} />
          </div>

          <Button onClick={handleGenerate} disabled={!industry || problem.length < 10 || isLoading("email-audience-profile")} className="w-full">
            {isLoading("email-audience-profile") ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Sparkles className="mr-2 h-4 w-4" />Generate Audience Profile</>}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
