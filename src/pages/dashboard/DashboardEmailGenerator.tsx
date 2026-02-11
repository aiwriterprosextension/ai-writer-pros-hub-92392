import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Mail, Zap, Copy, Info, Loader2 } from "lucide-react";
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AIChatWidget } from "@/components/dashboard/AIChatWidget";
import { ImproveInputButton } from "@/components/dashboard/ImproveInputButton";
import { HistoryFavorites } from "@/components/dashboard/HistoryFavorites";
import { QualityScorePreview } from "@/components/dashboard/QualityScorePreview";
import { WorkflowSuggestions } from "@/components/dashboard/WorkflowSuggestions";
import { ExportHub } from "@/components/dashboard/ExportHub";
import { AskAIButton } from "@/components/dashboard/AskAIButton";

import { EmailTopicIdeasModal } from "@/components/email/EmailTopicIdeasModal";
import { EmailAudienceModal } from "@/components/email/EmailAudienceModal";
import { EmailTypeSuggestion } from "@/components/email/EmailTypeSuggestion";
import { SubjectLineGenerator } from "@/components/email/SubjectLineGenerator";
import { SequenceStrategyModal } from "@/components/email/SequenceStrategyModal";
import { EmailPreviewScore } from "@/components/email/EmailPreviewScore";
import { ABTestVariations } from "@/components/email/ABTestVariations";

const CTA_GOALS = [
  { value: "sign-up", label: "Sign Up" },
  { value: "purchase", label: "Purchase" },
  { value: "download", label: "Download" },
  { value: "book-demo", label: "Book Demo" },
  { value: "reply", label: "Reply" },
  { value: "learn-more", label: "Learn More" },
  { value: "share", label: "Share" },
  { value: "visit-website", label: "Visit Website" },
];

export default function DashboardEmailGenerator() {
  const [topic, setTopic] = useState("");
  const [emailType, setEmailType] = useState("promotional");
  const [tone, setTone] = useState("professional");
  const [audience, setAudience] = useState("");
  const [sequenceLength, setSequenceLength] = useState("1");
  const [subjectLine, setSubjectLine] = useState("");
  const [ctaGoal, setCtaGoal] = useState("");
  const [optimizeCta, setOptimizeCta] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  const [chatPrefill, setChatPrefill] = useState("");
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResult("");
    try {
      const { data, error } = await supabase.functions.invoke('ai-tools', {
        body: {
          tool: 'email',
          topic,
          emailType,
          tone,
          audience,
          sequenceLength: parseInt(sequenceLength),
          subjectLine,
          ctaGoal: optimizeCta ? ctaGoal : undefined,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data.result || "");
      const label = parseInt(sequenceLength) > 1 ? `${sequenceLength}-email sequence` : "email";
      toast({ title: `${label} generated!` });
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to generate email", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyStrategy = (length: string, suggestedTone: string) => {
    setSequenceLength(length);
    setTone(suggestedTone);
    toast({ title: "Strategy applied!", description: `Set to ${length}-email sequence with ${suggestedTone} tone.` });
  };

  const currentConfig = { topic, emailType, tone, audience, sequenceLength, ctaGoal };
  const loadConfig = useCallback((config: Record<string, any>) => {
    if (config.topic) setTopic(config.topic);
    if (config.emailType) setEmailType(config.emailType);
    if (config.tone) setTone(config.tone);
    if (config.audience) setAudience(config.audience);
    if (config.sequenceLength) setSequenceLength(config.sequenceLength);
    if (config.ctaGoal) setCtaGoal(config.ctaGoal);
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Email Campaign Generator</h1>
        <p className="text-muted-foreground">Generate high-converting email campaigns with AI-powered topic ideas, subject lines, and sequence strategies.</p>
      </div>

      <HistoryFavorites tool="email" currentConfig={currentConfig} onLoadConfig={loadConfig} />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT: Settings */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center"><Mail className="h-5 w-5 mr-2 text-primary" />Email Settings</h3>

              {/* Topic */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Email Topic / Purpose</Label>
                  <div className="flex gap-1">
                    <EmailTopicIdeasModal onSelectTopic={setTopic} />
                    <ImproveInputButton fieldType="email topic" currentValue={topic} toolName="Email Generator" onAccept={setTopic} />
                    <AskAIButton question="What makes a good email topic for high open rates?" onAsk={setChatPrefill} />
                  </div>
                </div>
                <Input placeholder="e.g. Product launch announcement, Summer sale..." value={topic} onChange={(e) => setTopic(e.target.value)} />
              </div>

              {/* AI Type Suggestion */}
              <EmailTypeSuggestion topic={topic} onAccept={setEmailType} />

              {/* Email Type & Tone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email Type</Label>
                  <Select value={emailType} onValueChange={setEmailType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="promotional">Promotional</SelectItem>
                      <SelectItem value="welcome">Welcome Sequence</SelectItem>
                      <SelectItem value="newsletter">Newsletter</SelectItem>
                      <SelectItem value="product-launch">Product Launch</SelectItem>
                      <SelectItem value="re-engagement">Re-engagement</SelectItem>
                      <SelectItem value="sales">Sales Sequence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Subject Line */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Subject Line</Label>
                  <SubjectLineGenerator topic={topic} audience={audience} emailType={emailType} onSelect={setSubjectLine} />
                </div>
                <Input placeholder="Generated or custom subject line..." value={subjectLine} onChange={(e) => setSubjectLine(e.target.value)} />
              </div>

              {/* Audience */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Target Audience</Label>
                  <div className="flex gap-1">
                    <EmailAudienceModal onSetAudience={setAudience} />
                    <ImproveInputButton fieldType="target audience" currentValue={audience} toolName="Email Generator" onAccept={setAudience} />
                  </div>
                </div>
                <Input placeholder="e.g. SaaS founders, fitness enthusiasts..." value={audience} onChange={(e) => setAudience(e.target.value)} />
              </div>

              {/* Sequence Length */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Sequence Length</Label>
                  <SequenceStrategyModal onApplyStrategy={handleApplyStrategy} />
                </div>
                <Select value={sequenceLength} onValueChange={setSequenceLength}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Single Email</SelectItem>
                    <SelectItem value="3">3-Email Sequence</SelectItem>
                    <SelectItem value="5">5-Email Sequence</SelectItem>
                    <SelectItem value="7">7-Email Sequence</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* CTA Optimizer */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Checkbox checked={optimizeCta} onCheckedChange={(c) => setOptimizeCta(!!c)} id="optimize-cta" />
                    <Label htmlFor="optimize-cta" className="text-sm cursor-pointer">AI-optimize CTA placement</Label>
                  </div>
                  <Tooltip>
                    <TooltipTrigger><Info className="h-3.5 w-3.5 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent className="max-w-xs"><p className="text-xs">AI will optimize CTA placement and wording based on your goal</p></TooltipContent>
                  </Tooltip>
                </div>
                {optimizeCta && (
                  <div className="space-y-2 pl-6">
                    <Label className="text-sm">Primary CTA Goal</Label>
                    <Select value={ctaGoal} onValueChange={setCtaGoal}>
                      <SelectTrigger><SelectValue placeholder="Select CTA goal..." /></SelectTrigger>
                      <SelectContent>
                        {CTA_GOALS.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Generate Button */}
              <div className="flex items-center gap-2">
                <QualityScorePreview toolName="Email Generator" formData={currentConfig} disabled={!topic} />
                <Button onClick={handleGenerate} disabled={!topic || isGenerating} className="flex-1" size="lg">
                  {isGenerating ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</>
                  ) : (
                    <><Mail className="mr-2 h-4 w-4" />Generate {parseInt(sequenceLength) > 1 ? `${sequenceLength}-Email Sequence` : 'Email Campaign'}</>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* Generated Email */}
          <Card className="p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center"><Zap className="h-5 w-5 mr-2 text-primary" />Generated Email</h3>
              <div className="flex gap-2">
                {result && <ExportHub content={result} filename="email-campaign" />}
                {result && <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(result); toast({ title: "Copied!" }); }}><Copy className="h-3 w-3 mr-1" /> Copy</Button>}
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto whitespace-pre-wrap text-sm">
              {isGenerating ? (
                <div className="flex items-center justify-center h-full min-h-[350px]">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3 text-primary" />
                    <p className="text-muted-foreground">Generating your email campaign...</p>
                  </div>
                </div>
              ) : result ? result : (
                <div className="text-muted-foreground text-center py-12">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Configure your email settings and click generate</p>
                </div>
              )}
            </div>

            {/* A/B Test Variations */}
            <ABTestVariations content={result} />

            <WorkflowSuggestions
              contentType="email campaign"
              summary={result.substring(0, 200)}
              currentTool="Email Generator"
              visible={!!result}
            />
          </Card>
        </div>

        {/* RIGHT: Prediction Sidebar */}
        <div className="space-y-4">
          <EmailPreviewScore
            topic={topic}
            audience={audience}
            emailType={emailType}
            tone={tone}
            sequenceLength={sequenceLength}
            ctaGoal={ctaGoal}
            disabled={!topic}
          />
        </div>
      </div>

      <AIChatWidget currentTool="email-generator" prefillQuestion={chatPrefill} onPrefillConsumed={() => setChatPrefill("")} />
    </div>
  );
}
