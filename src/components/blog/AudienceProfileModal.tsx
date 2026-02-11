import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Users, Loader2 } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";

const LEVELS = [
  { value: "beginner", label: "Complete Beginners" },
  { value: "intermediate", label: "Intermediate Learners" },
  { value: "expert", label: "Professionals/Experts" },
  { value: "general", label: "General Audience" },
];

export function AudienceProfileModal({ onSetPersona }: { onSetPersona: (persona: string) => void }) {
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState("general");
  const [painPoint, setPainPoint] = useState("");
  const [desiredAction, setDesiredAction] = useState("");
  const [demographics, setDemographics] = useState("");
  const [persona, setPersona] = useState("");
  const { callAI, isLoading } = useBlogAI();

  const handleGenerate = async () => {
    const result = await callAI("generate-audience-persona", {
      targetLevel: level,
      painPoint,
      desiredAction,
      demographics,
    });
    if (typeof result === "string") setPersona(result);
  };

  const handleUse = () => {
    onSetPersona(persona);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Users className="h-3.5 w-3.5" /> Define Audience
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" />Audience Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Who's your target reader?</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {LEVELS.map(l => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Main pain point <span className="text-muted-foreground text-xs">(100-200 chars)</span></Label>
            <Textarea placeholder="What problem does your reader have?" value={painPoint} onChange={e => setPainPoint(e.target.value)} maxLength={200} rows={2} />
            <p className="text-xs text-muted-foreground text-right">{painPoint.length}/200</p>
          </div>

          <div className="space-y-2">
            <Label>Desired action after reading</Label>
            <Textarea placeholder="What should they do after reading?" value={desiredAction} onChange={e => setDesiredAction(e.target.value)} rows={2} />
          </div>

          <div className="space-y-2">
            <Label>Demographics <span className="text-muted-foreground text-xs">(optional)</span></Label>
            <Input placeholder="e.g. 25-35, urban professionals, tech-savvy" value={demographics} onChange={e => setDemographics(e.target.value)} />
          </div>

          <Button onClick={handleGenerate} disabled={isLoading("generate-audience-persona")} className="w-full">
            {isLoading("generate-audience-persona") ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Sparkles className="mr-2 h-4 w-4" />Generate Persona</>}
          </Button>

          {persona && (
            <div className="space-y-3">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <Textarea value={persona} onChange={e => setPersona(e.target.value)} className="border-0 bg-transparent p-0 resize-none focus-visible:ring-0" rows={4} />
              </div>
              <Button onClick={handleUse} className="w-full">Use This Persona</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
