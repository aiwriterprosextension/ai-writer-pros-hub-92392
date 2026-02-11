import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Bot, Shield, Zap, Copy, RefreshCw, Loader2, Eye, EyeOff } from "lucide-react";
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AIChatWidget } from "@/components/dashboard/AIChatWidget";
import { HistoryFavorites } from "@/components/dashboard/HistoryFavorites";
import { QualityScorePreview } from "@/components/dashboard/QualityScorePreview";
import { WorkflowSuggestions } from "@/components/dashboard/WorkflowSuggestions";
import { AskAIButton } from "@/components/dashboard/AskAIButton";
import { AIContentAnalyzer, type HumanizerAnalysis } from "@/components/humanizer/AIContentAnalyzer";
import { SmartContentGenerator } from "@/components/humanizer/SmartContentGenerator";
import { BeforeAfterMetrics } from "@/components/humanizer/BeforeAfterMetrics";
import { VersionAlternatives } from "@/components/humanizer/VersionAlternatives";
import { OriginalityChecker } from "@/components/humanizer/OriginalityChecker";
import { BulkHumanizer } from "@/components/humanizer/BulkHumanizer";
import { HumanizerExport } from "@/components/humanizer/HumanizerExport";

const intensityLabels: Record<string, { label: string; description: string }> = {
  light: { label: "Light", description: "Subtle improvements, preserves most original phrasing" },
  medium: { label: "Medium", description: "Balanced approach, noticeable improvements" },
  heavy: { label: "Aggressive", description: "Significant rewriting, maximum human-like output" },
};

const styleOptions = [
  { value: "auto", label: "Auto-detect" },
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual & Conversational" },
  { value: "academic", label: "Academic" },
  { value: "creative", label: "Creative & Expressive" },
  { value: "technical", label: "Technical" },
  { value: "friendly", label: "Friendly" },
  { value: "authoritative", label: "Authoritative" },
];

const industryOptions = [
  { value: "general", label: "General / Other" },
  { value: "healthcare", label: "Healthcare & Medical" },
  { value: "finance", label: "Finance & Banking" },
  { value: "technology", label: "Technology & SaaS" },
  { value: "education", label: "Education & Academia" },
  { value: "legal", label: "Legal & Compliance" },
  { value: "marketing", label: "Marketing & Advertising" },
  { value: "ecommerce", label: "E-commerce & Retail" },
  { value: "real-estate", label: "Real Estate" },
  { value: "lifestyle", label: "Lifestyle & Wellness" },
  { value: "food", label: "Food & Hospitality" },
  { value: "travel", label: "Travel & Tourism" },
  { value: "entertainment", label: "Entertainment & Media" },
  { value: "nonprofit", label: "Nonprofit & Social Impact" },
];

const readingLevels = [
  { value: "elementary", label: "Elementary (6-8th)" },
  { value: "high-school", label: "High School (9-12th)" },
  { value: "college", label: "College Level" },
  { value: "professional", label: "Professional/Expert" },
];

const sourceOptions = [
  { value: "unknown", label: "Unknown / Not Sure" },
  { value: "chatgpt", label: "ChatGPT / GPT-4" },
  { value: "claude", label: "Claude" },
  { value: "gemini", label: "Gemini / Bard" },
  { value: "jasper", label: "Jasper AI" },
  { value: "copyai", label: "Copy.ai" },
  { value: "other-ai", label: "Other AI Tool" },
  { value: "human", label: "Human-Written (polishing)" },
];

const platformOptions = [
  { value: "any", label: "Any / Multiple" },
  { value: "blog", label: "Blog / Website" },
  { value: "social", label: "Social Media" },
  { value: "email", label: "Email Marketing" },
  { value: "academic", label: "Academic Paper" },
  { value: "professional", label: "Professional Report" },
  { value: "product", label: "Product Description" },
  { value: "landing", label: "Landing Page Copy" },
];

export default function DashboardAIHumanizer() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [intensity, setIntensity] = useState("medium");
  const [style, setStyle] = useState("auto");
  const [industry, setIndustry] = useState("general");
  const [readingLevel, setReadingLevel] = useState("high-school");
  const [source, setSource] = useState("unknown");
  const [platform, setPlatform] = useState("any");
  const [comparisonView, setComparisonView] = useState(false);
  const [analysis, setAnalysis] = useState<HumanizerAnalysis | null>(null);
  const [scoreData, setScoreData] = useState<any>(null);
  const [chatPrefill, setChatPrefill] = useState("");
  const { toast } = useToast();

  const intensityFromSlider = (val: number) => val <= 33 ? "light" : val <= 66 ? "medium" : "heavy";
  const sliderFromIntensity = (i: string) => i === "light" ? 16 : i === "heavy" ? 83 : 50;

  const handleAnalysisComplete = (result: HumanizerAnalysis) => {
    setAnalysis(result);
    // Auto-set recommended intensity
    const rec = result.recommendedIntensity.toLowerCase();
    if (rec.includes("light")) setIntensity("light");
    else if (rec.includes("aggressive") || rec.includes("heavy")) setIntensity("heavy");
    else setIntensity("medium");
    // Auto-detect style
    if (style === "auto" && result.writingStyle) {
      const detected = result.writingStyle.toLowerCase();
      const match = styleOptions.find((s) => s.value !== "auto" && detected.includes(s.value));
      if (match) setStyle(match.value);
    }
  };

  const handleHumanize = async () => {
    setIsProcessing(true);
    setOutputText("");
    setScoreData(null);
    try {
      const extraInstructions = [];
      if (style !== "auto") extraInstructions.push(`Target writing style: ${style}`);
      if (industry !== "general") extraInstructions.push(`Industry: ${industry}`);
      if (readingLevel !== "high-school") extraInstructions.push(`Reading level: ${readingLevel}`);
      if (source !== "unknown") extraInstructions.push(`Content source: ${source}`);
      if (platform !== "any") extraInstructions.push(`Publishing platform: ${platform}`);

      const { data, error } = await supabase.functions.invoke("ai-tools", {
        body: {
          tool: "humanize",
          content: inputText,
          intensity,
          extraInstructions: extraInstructions.length > 0 ? extraInstructions.join(". ") + "." : undefined,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setOutputText(data.result || "");
      toast({ title: "Content humanized!", description: `Intensity: ${intensityLabels[intensity].label}` });

      // Auto-score after humanization
      try {
        const { data: scoreRes } = await supabase.functions.invoke("ai-assistant", {
          body: { action: "humanizer-score-after", originalContent: inputText, humanizedContent: data.result },
        });
        if (scoreRes?.result) {
          const parsed = typeof scoreRes.result === "string" ? JSON.parse(scoreRes.result.replace(/```json\n?|\n?```/g, "")) : scoreRes.result;
          setScoreData(parsed);
        }
      } catch { /* non-critical */ }
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to humanize content", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    toast({ title: "Copied!" });
  };

  const inputWordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const outputWordCount = outputText.trim() ? outputText.trim().split(/\s+/).length : 0;

  const currentConfig = { inputText: inputText.substring(0, 500), intensity, style, industry, readingLevel };
  const loadConfig = useCallback((config: Record<string, any>) => {
    if (config.inputText) setInputText(config.inputText);
    if (config.intensity) setIntensity(config.intensity);
    if (config.style) setStyle(config.style);
    if (config.industry) setIndustry(config.industry);
    if (config.readingLevel) setReadingLevel(config.readingLevel);
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">AI Humanizer</h1>
        <p className="text-muted-foreground">Transform AI-generated text into natural, human-like content.</p>
      </div>

      <HistoryFavorites tool="humanize" currentConfig={currentConfig} onLoadConfig={loadConfig} />

      <Card className="p-6 space-y-6">
        {/* Settings Row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label className="text-xs mb-1 block">Target Writing Style</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
              <SelectContent>{styleOptions.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs mb-1 block">Content Industry</Label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
              <SelectContent>{industryOptions.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs mb-1 block">Reading Level</Label>
            <Select value={readingLevel} onValueChange={setReadingLevel}>
              <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
              <SelectContent>{readingLevels.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs mb-1 block">Content Source</Label>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
              <SelectContent>{sourceOptions.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs mb-1 block">Publishing Platform</Label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
              <SelectContent>{platformOptions.map((p) => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs mb-1 block flex items-center justify-between">
              <span>Humanization Intensity: <strong>{intensityLabels[intensity].label}</strong></span>
              <AskAIButton question="What intensity level should I use?" onAsk={setChatPrefill} />
            </Label>
            <Slider
              value={[sliderFromIntensity(intensity)]}
              onValueChange={(val) => setIntensity(intensityFromSlider(val[0]))}
              max={100} step={1}
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
              <span>🔵 Light</span><span>🟡 Medium</span><span>🔴 Aggressive</span>
            </div>
            <p className="text-[10px] text-muted-foreground">{intensityLabels[intensity].description}</p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className={`grid ${comparisonView && outputText ? "lg:grid-cols-2" : "lg:grid-cols-2"} gap-6`}>
          {/* Input */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center justify-between">
              <span className="flex items-center"><Bot className="h-5 w-5 mr-2 text-destructive" />AI-Generated Content</span>
              <span className="text-xs text-muted-foreground font-normal">{inputWordCount} words · {inputText.length} chars</span>
            </h3>

            <SmartContentGenerator onContentGenerated={setInputText} visible={!inputText} />

            <Textarea
              placeholder="Paste your AI-generated content here..."
              value={inputText}
              onChange={(e) => { setInputText(e.target.value); setAnalysis(null); }}
              className="min-h-[250px] resize-none"
            />

            <AIContentAnalyzer content={inputText} onAnalysisComplete={handleAnalysisComplete} analysis={analysis} />

            <BulkHumanizer content={inputText} style={style} industry={industry} intensity={intensity} onResult={setOutputText} />

            <div className="flex items-center gap-2">
              <QualityScorePreview toolName="AI Humanizer" formData={currentConfig} disabled={!inputText} />
              <Button onClick={handleHumanize} disabled={!inputText || isProcessing} className="flex-1" size="lg">
                {isProcessing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Humanizing...</> : <><Shield className="mr-2 h-4 w-4" />Humanize Content</>}
              </Button>
            </div>
          </div>

          {/* Output */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center justify-between">
              <span className="flex items-center"><Shield className="h-5 w-5 mr-2 text-green-600" />Humanized Content</span>
              <div className="flex items-center gap-2">
                {outputWordCount > 0 && <span className="text-xs text-muted-foreground font-normal">{outputWordCount} words</span>}
                {outputText && (
                  <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setComparisonView(!comparisonView)}>
                    {comparisonView ? <><EyeOff className="h-3 w-3 mr-1" />Hide Diff</> : <><Eye className="h-3 w-3 mr-1" />Show Diff</>}
                  </Button>
                )}
              </div>
            </h3>

            {comparisonView && outputText ? (
              <div className="grid grid-cols-1 gap-2">
                <div className="text-xs p-1 text-muted-foreground text-center">🟡 = Changed content highlighted below</div>
                <div className="grid grid-cols-2 gap-2 max-h-[250px] overflow-y-auto">
                  <div className="text-sm p-3 bg-muted/30 rounded whitespace-pre-wrap border">
                    <p className="text-[10px] font-medium text-muted-foreground mb-1">Original</p>
                    {inputText}
                  </div>
                  <div className="text-sm p-3 bg-green-50 dark:bg-green-950/20 rounded whitespace-pre-wrap border border-green-200 dark:border-green-800">
                    <p className="text-[10px] font-medium text-muted-foreground mb-1">Humanized</p>
                    {outputText}
                  </div>
                </div>
              </div>
            ) : (
              <Textarea
                placeholder="Your humanized content will appear here..."
                value={outputText}
                onChange={(e) => setOutputText(e.target.value)}
                className="min-h-[250px] resize-none"
              />
            )}

            <div className="flex items-center justify-between">
              <Button variant="outline" disabled={!outputText || isProcessing} onClick={handleHumanize} size="sm">
                <RefreshCw className="h-4 w-4 mr-1" /> Re-humanize
              </Button>
              <div className="flex gap-2">
                <HumanizerExport content={outputText} visible={!!outputText} />
                <Button variant="outline" disabled={!outputText} onClick={handleCopy} size="sm">
                  <Copy className="h-4 w-4 mr-1" /> Copy
                </Button>
              </div>
            </div>

            {/* Before/After Metrics */}
            <BeforeAfterMetrics scoreData={scoreData} />

            {/* Version Alternatives */}
            <VersionAlternatives
              content={inputText}
              style={style}
              industry={industry}
              readingLevel={readingLevel}
              onSelectVersion={setOutputText}
              visible={!!outputText}
            />

            {/* Originality Check */}
            <OriginalityChecker content={outputText} visible={!!outputText} />
          </div>
        </div>

        <WorkflowSuggestions
          contentType="humanized content"
          summary={outputText.substring(0, 200)}
          currentTool="AI Humanizer"
          visible={!!outputText}
        />
      </Card>

      <AIChatWidget currentTool="ai-humanizer" prefillQuestion={chatPrefill} onPrefillConsumed={() => setChatPrefill("")} />
    </div>
  );
}
