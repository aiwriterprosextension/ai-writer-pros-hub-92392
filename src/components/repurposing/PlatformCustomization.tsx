import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Settings, ChevronDown } from "lucide-react";

export interface FormatCustomization {
  tone: string;
  ctaGoal: string;
  // Twitter
  threadLength?: number;
  hookTweet?: boolean;
  engagementPrompt?: boolean;
  threadSummary?: boolean;
  // Email
  emailGoal?: string;
  personalization?: string;
  // LinkedIn
  professionalIntro?: boolean;
  targetAudience?: string;
  includeCta?: boolean;
  ctaType?: string;
  // Instagram
  captionStyle?: string;
  hashtagCount?: number;
  autoEmojis?: boolean;
  firstCommentHashtags?: boolean;
}

const toneOptions = [
  { value: "original", label: "Keep Original Tone" },
  { value: "casual", label: "Make More Casual" },
  { value: "professional", label: "Make More Professional" },
  { value: "simplified", label: "Simplify Language" },
  { value: "humor", label: "Add Humor" },
  { value: "urgency", label: "Add Urgency" },
  { value: "empathy", label: "Add Empathy" },
];

const ctaGoals = [
  { value: "none", label: "No specific CTA" },
  { value: "traffic", label: "Drive website traffic" },
  { value: "engagement", label: "Encourage engagement" },
  { value: "leads", label: "Generate leads" },
  { value: "promote", label: "Promote product/service" },
  { value: "thought-leadership", label: "Build thought leadership" },
];

interface Props {
  formatId: string;
  customization: FormatCustomization;
  onChange: (c: FormatCustomization) => void;
}

export function PlatformCustomization({ formatId, customization, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const update = (partial: Partial<FormatCustomization>) => onChange({ ...customization, ...partial });

  const toneRec: Record<string, string> = { linkedin: "professional", twitter: "casual", instagram: "casual", email: "professional" };

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="border rounded-lg">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-sm hover:bg-muted/50">
        <span className="flex items-center gap-2"><Settings className="h-3.5 w-3.5" />Customize</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-3 pt-0 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Tone</Label>
            <Select value={customization.tone} onValueChange={(v) => update({ tone: v })}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>{toneOptions.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
            </Select>
            {toneRec[formatId] && <p className="text-[10px] text-muted-foreground mt-0.5">💡 {toneRec[formatId]} recommended</p>}
          </div>
          <div>
            <Label className="text-xs">CTA Goal</Label>
            <Select value={customization.ctaGoal} onValueChange={(v) => update({ ctaGoal: v })}>
              <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>{ctaGoals.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>

        {formatId === "twitter" && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-xs">Thread length:</Label>
              <Input type="number" min={3} max={15} value={customization.threadLength || 7} onChange={(e) => update({ threadLength: +e.target.value })} className="h-7 w-16 text-xs" />
            </div>
            <div className="space-y-1">
              {[{ key: "hookTweet", label: "Add hook tweet at start" }, { key: "engagementPrompt", label: "Include engagement prompt" }, { key: "threadSummary", label: "Add thread summary" }].map((opt) => (
                <label key={opt.key} className="flex items-center gap-2 text-xs cursor-pointer">
                  <Checkbox checked={!!(customization as any)[opt.key]} onCheckedChange={(v) => update({ [opt.key]: !!v })} />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        )}

        {formatId === "email" && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Email Goal</Label>
              <Select value={customization.emailGoal || "inform"} onValueChange={(v) => update({ emailGoal: v })}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["inform", "engage", "convert", "promote"].map((g) => <SelectItem key={g} value={g} className="capitalize">{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Personalization</Label>
              <Select value={customization.personalization || "none"} onValueChange={(v) => update({ personalization: v })}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["none", "moderate", "high"].map((p) => <SelectItem key={p} value={p} className="capitalize">{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {formatId === "linkedin" && (
          <div className="space-y-2">
            <div>
              <Label className="text-xs">Target Audience</Label>
              <Select value={customization.targetAudience || "general"} onValueChange={(v) => update({ targetAudience: v })}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[{ v: "executives", l: "Executives" }, { v: "managers", l: "Managers" }, { v: "general", l: "General Professionals" }, { v: "job-seekers", l: "Job Seekers" }].map((a) => <SelectItem key={a.v} value={a.v}>{a.l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {[{ key: "professionalIntro", label: "Add professional introduction" }, { key: "includeCta", label: "Include call-to-action" }].map((opt) => (
              <label key={opt.key} className="flex items-center gap-2 text-xs cursor-pointer">
                <Checkbox checked={!!(customization as any)[opt.key]} onCheckedChange={(v) => update({ [opt.key]: !!v })} />
                {opt.label}
              </label>
            ))}
          </div>
        )}

        {formatId === "instagram" && (
          <div className="space-y-2">
            <div>
              <Label className="text-xs">Caption Style</Label>
              <Select value={customization.captionStyle || "educational"} onValueChange={(v) => update({ captionStyle: v })}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["inspirational", "educational", "behind-the-scenes", "promotional"].map((s) => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Hashtag Count: {customization.hashtagCount || 20}</Label>
              <Slider value={[customization.hashtagCount || 20]} min={5} max={30} step={1} onValueChange={([v]) => update({ hashtagCount: v })} />
            </div>
            {[{ key: "autoEmojis", label: "Auto-style with emojis" }, { key: "firstCommentHashtags", label: "Format hashtags for first comment" }].map((opt) => (
              <label key={opt.key} className="flex items-center gap-2 text-xs cursor-pointer">
                <Checkbox checked={!!(customization as any)[opt.key]} onCheckedChange={(v) => update({ [opt.key]: !!v })} />
                {opt.label}
              </label>
            ))}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
