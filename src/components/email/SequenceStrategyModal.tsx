import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, Brain } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";

interface SequenceEmail {
  number: number;
  purpose: string;
  dayAfterPrevious: number;
  subjectAngle: string;
}

interface StrategyData {
  totalEmails: number;
  suggestedTone: string;
  emails: SequenceEmail[];
}

export function SequenceStrategyModal({
  onApplyStrategy
}: {
  onApplyStrategy: (length: string, tone: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [goal, setGoal] = useState("drive-sales");
  const [timeline, setTimeline] = useState("1-week");
  const [temp, setTemp] = useState("warm");
  const [strategy, setStrategy] = useState<StrategyData | null>(null);
  const { callAI, isLoading } = useBlogAI();

  const handleGenerate = async () => {
    const result = await callAI("email-sequence-strategy", { campaignGoal: goal, timeline, audienceTemp: temp });
    if (result?.totalEmails) setStrategy(result);
  };

  const handleApply = () => {
    if (!strategy) return;
    const len = String(strategy.totalEmails <= 1 ? 1 : strategy.totalEmails <= 3 ? 3 : strategy.totalEmails <= 5 ? 5 : 7);
    onApplyStrategy(len, strategy.suggestedTone || "professional");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Brain className="h-3.5 w-3.5" /> AI Strategy
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Brain className="h-5 w-5 text-primary" />Sequence Strategy Advisor</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Campaign Goal</Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {[
                  { value: "build-awareness", label: "Build Awareness" },
                  { value: "drive-sales", label: "Drive Sales" },
                  { value: "educate", label: "Educate" },
                  { value: "re-engage", label: "Re-engage" },
                  { value: "onboard", label: "Onboard" },
                ].map(g => <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Timeline</Label>
            <Select value={timeline} onValueChange={setTimeline}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {[
                  { value: "3-days", label: "3 Days" },
                  { value: "1-week", label: "1 Week" },
                  { value: "2-weeks", label: "2 Weeks" },
                  { value: "1-month", label: "1 Month" },
                ].map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Audience Temperature</Label>
            <Select value={temp} onValueChange={setTemp}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="cold">Cold</SelectItem>
                <SelectItem value="warm">Warm</SelectItem>
                <SelectItem value="hot">Hot</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleGenerate} disabled={isLoading("email-sequence-strategy")} className="w-full">
            {isLoading("email-sequence-strategy") ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Sparkles className="mr-2 h-4 w-4" />Generate Strategy</>}
          </Button>

          {strategy && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{strategy.totalEmails} emails</Badge>
                <Badge variant="outline">Tone: {strategy.suggestedTone}</Badge>
              </div>

              {/* Timeline stepper */}
              <div className="space-y-0">
                {strategy.emails.map((email, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">{email.number}</div>
                      {i < strategy.emails.length - 1 && <div className="w-0.5 h-8 bg-border" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium">{email.purpose}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-[10px] text-muted-foreground">Day +{email.dayAfterPrevious}</span>
                        <span className="text-[10px] text-muted-foreground">• {email.subjectAngle}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={handleApply} className="w-full">Use This Strategy</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
