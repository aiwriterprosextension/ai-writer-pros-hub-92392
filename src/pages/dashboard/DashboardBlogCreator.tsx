import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PenTool, Zap, Copy, Info, Sparkles, Loader2 } from "lucide-react";
import { useState, useMemo, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AIChatWidget } from "@/components/dashboard/AIChatWidget";
import { ImproveInputButton } from "@/components/dashboard/ImproveInputButton";
import { HistoryFavorites } from "@/components/dashboard/HistoryFavorites";
import { QualityScorePreview } from "@/components/dashboard/QualityScorePreview";
import { WorkflowSuggestions } from "@/components/dashboard/WorkflowSuggestions";
import { AskAIButton } from "@/components/dashboard/AskAIButton";

import { TopicGeneratorModal } from "@/components/blog/TopicGeneratorModal";
import { KeywordResearchModal } from "@/components/blog/KeywordResearchModal";
import { AudienceProfileModal } from "@/components/blog/AudienceProfileModal";
import { OutlineGenerator, type OutlineData } from "@/components/blog/OutlineGenerator";
import { SectionBySection } from "@/components/blog/SectionBySection";
import { SEOAnalysisPanel } from "@/components/blog/SEOAnalysisPanel";
import { VisualSuggestionsPanel } from "@/components/blog/VisualSuggestionsPanel";
import { FactCheckerPanel } from "@/components/blog/FactCheckerPanel";
import { ContentEditor } from "@/components/blog/ContentEditor";
import { ReadabilityPanel } from "@/components/blog/ReadabilityPanel";
import { MultiFormatExport } from "@/components/blog/MultiFormatExport";
import { ContentRepurposingActions } from "@/components/blog/ContentRepurposingActions";

const EXPANDED_TONES = [
  { value: "authoritative", label: "Authoritative & Expert" },
  { value: "conversational", label: "Friendly & Conversational" },
  { value: "educational", label: "Educational & Instructive" },
  { value: "persuasive", label: "Persuasive & Compelling" },
  { value: "storytelling", label: "Storytelling & Narrative" },
  { value: "analytical", label: "Data-Driven & Analytical" },
  { value: "inspirational", label: "Inspirational & Motivational" },
  { value: "humorous", label: "Humorous & Entertaining" },
];

const CONTENT_PURPOSES = [
  { value: "educate", label: "Educate Readers", desc: "How-to, explainer, guide" },
  { value: "convert", label: "Convert to Customers", desc: "Product-focused, benefits" },
  { value: "engage", label: "Engage & Entertain", desc: "Storytelling, opinion" },
  { value: "authority", label: "Build Thought Leadership", desc: "Industry insights, predictions" },
  { value: "traffic", label: "Drive Organic Traffic", desc: "SEO-optimized, comprehensive" },
  { value: "answer", label: "Answer Specific Question", desc: "Focused, direct" },
];

export default function DashboardBlogCreator() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [wordCount, setWordCount] = useState("1500");
  const [tone, setTone] = useState("educational");
  const [contentPurpose, setContentPurpose] = useState("educate");
  const [mixTones, setMixTones] = useState(false);
  const [introTone, setIntroTone] = useState("conversational");
  const [bodyTone, setBodyTone] = useState("educational");
  const [conclusionTone, setConclusionTone] = useState("persuasive");
  const [audiencePersona, setAudiencePersona] = useState("");
  const [outlineMode, setOutlineMode] = useState(false);
  const [sectionMode, setSectionMode] = useState(false);
  const [outline, setOutline] = useState<OutlineData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  const [chatPrefill, setChatPrefill] = useState("");
  const { toast } = useToast();

  const handleGenerate = async (fromOutline?: OutlineData) => {
    setIsGenerating(true);
    setResult("");
    try {
      const effectiveTone = mixTones ? `Introduction: ${introTone}, Body: ${bodyTone}, Conclusion: ${conclusionTone}` : tone;
      const outlineContext = fromOutline
        ? `\n\nFollow this outline structure:\n${fromOutline.sections.map(s => `## ${s.title}\n${s.subsections?.map(sub => `### ${sub.title}`).join('\n') || ''}`).join('\n')}`
        : "";

      const { data, error } = await supabase.functions.invoke('ai-tools', {
        body: {
          tool: 'blog',
          topic,
          keywords,
          wordCount: parseInt(wordCount),
          tone: effectiveTone,
          contentPurpose,
          audiencePersona,
          outlineContext,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data.result || "");
      toast({ title: "Blog post generated!" });
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to generate blog post", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeywordsAppend = (newKeywords: string) => {
    setKeywords(prev => prev ? `${prev}, ${newKeywords}` : newKeywords);
  };

  const resultWordCount = result.trim() ? result.trim().split(/\s+/).length : 0;

  const currentConfig = { topic, keywords, wordCount, tone, contentPurpose };
  const loadConfig = useCallback((config: Record<string, any>) => {
    if (config.topic) setTopic(config.topic);
    if (config.keywords) setKeywords(config.keywords);
    if (config.wordCount) setWordCount(config.wordCount);
    if (config.tone) setTone(config.tone);
    if (config.contentPurpose) setContentPurpose(config.contentPurpose);
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Blog Content Creator</h1>
        <p className="text-muted-foreground">Generate SEO-optimized blog posts with AI-powered research, outlining, and optimization tools.</p>
      </div>

      <HistoryFavorites tool="blog" currentConfig={currentConfig} onLoadConfig={loadConfig} />

      {/* Topic Generator CTA */}
      <div className="mb-4">
        <TopicGeneratorModal onSelectTopic={setTopic} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT: Settings Column */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <PenTool className="h-5 w-5 mr-2 text-primary" />Article Settings
              </h3>

              {/* Topic */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Blog Post Topic</Label>
                  <div className="flex gap-1">
                    <ImproveInputButton fieldType="blog topic" currentValue={topic} toolName="Blog Creator" onAccept={setTopic} />
                    <AskAIButton question="How many keywords should I use for SEO?" onAsk={setChatPrefill} />
                  </div>
                </div>
                <Input placeholder="e.g. Best practices for remote team management..." value={topic} onChange={(e) => setTopic(e.target.value)} />
              </div>

              {/* Keywords */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Target Keywords (comma-separated)</Label>
                  <div className="flex gap-1">
                    <KeywordResearchModal topic={topic} onAddKeywords={handleKeywordsAppend} />
                    <ImproveInputButton fieldType="SEO keywords" currentValue={keywords} toolName="Blog Creator" onAccept={setKeywords} />
                  </div>
                </div>
                <Input placeholder="e.g. remote work, team management, productivity..." value={keywords} onChange={(e) => setKeywords(e.target.value)} />
              </div>

              {/* Audience Persona */}
              {audiencePersona && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">Target Audience Persona</span>
                    <Button variant="ghost" size="sm" className="h-5 text-xs" onClick={() => setAudiencePersona("")}>Clear</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{audiencePersona}</p>
                </div>
              )}

              {/* Row: Word Count, Tone, Purpose, Audience */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Word Count</Label>
                  <Select value={wordCount} onValueChange={setWordCount}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="800">~800 words</SelectItem>
                      <SelectItem value="1500">~1,500 words</SelectItem>
                      <SelectItem value="2500">~2,500 words</SelectItem>
                      <SelectItem value="4000">~4,000 words</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    <Label>Tone</Label>
                    <AudienceProfileModal onSetPersona={setAudiencePersona} />
                  </div>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {EXPANDED_TONES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    <Label>Article Goal</Label>
                    <Tooltip>
                      <TooltipTrigger><Info className="h-3.5 w-3.5 text-muted-foreground" /></TooltipTrigger>
                      <TooltipContent className="max-w-xs"><p className="text-xs">Goal affects structure, CTA placement, and optimization strategy</p></TooltipContent>
                    </Tooltip>
                  </div>
                  <Select value={contentPurpose} onValueChange={setContentPurpose}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CONTENT_PURPOSES.map(p => (
                        <SelectItem key={p.value} value={p.value}>
                          <div>
                            <span>{p.label}</span>
                            <span className="text-xs text-muted-foreground ml-1">— {p.desc}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Mix Tones */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Checkbox checked={mixTones} onCheckedChange={(c) => setMixTones(!!c)} id="mix-tones" />
                  <Label htmlFor="mix-tones" className="text-sm cursor-pointer">Mix tones by section</Label>
                </div>
              </div>
              {mixTones && (
                <div className="grid grid-cols-3 gap-3 pl-6">
                  {[
                    { label: "Introduction", value: introTone, set: setIntroTone },
                    { label: "Body", value: bodyTone, set: setBodyTone },
                    { label: "Conclusion", value: conclusionTone, set: setConclusionTone },
                  ].map(t => (
                    <div key={t.label} className="space-y-1">
                      <Label className="text-xs">{t.label}</Label>
                      <Select value={t.value} onValueChange={t.set}>
                        <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {EXPANDED_TONES.map(tone => <SelectItem key={tone.value} value={tone.value}>{tone.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              )}

              {/* Mode Toggles */}
              <div className="flex flex-wrap gap-4 pt-2 border-t">
                <div className="flex items-center gap-2">
                  <Switch checked={outlineMode} onCheckedChange={(c) => { setOutlineMode(c); if (c) setSectionMode(false); }} id="outline-mode" />
                  <Label htmlFor="outline-mode" className="text-sm cursor-pointer">📝 Generate Outline First</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={sectionMode} onCheckedChange={(c) => { setSectionMode(c); if (c) setOutlineMode(true); }} id="section-mode" />
                  <Label htmlFor="section-mode" className="text-sm cursor-pointer">🧩 Build Progressively</Label>
                </div>
              </div>

              {/* Outline Generator */}
              {outlineMode && (
                <OutlineGenerator
                  topic={topic}
                  keywords={keywords}
                  audience={audiencePersona || "general"}
                  wordCount={wordCount}
                  onOutlineReady={setOutline}
                  onGenerateFromOutline={(o) => { setOutline(o); handleGenerate(o); }}
                />
              )}

              {/* Section-by-Section */}
              {sectionMode && outline && (
                <SectionBySection
                  outline={outline}
                  topic={topic}
                  keywords={keywords}
                  tone={tone}
                  onContentUpdate={setResult}
                />
              )}

              {/* Generate Button (non-outline mode) */}
              {!outlineMode && !sectionMode && (
                <div className="flex items-center gap-2">
                  <QualityScorePreview toolName="Blog Creator" formData={currentConfig} disabled={!topic} />
                  <Button onClick={() => handleGenerate()} disabled={!topic || isGenerating} className="flex-1" size="lg">
                    {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating Article...</> : <><PenTool className="mr-2 h-4 w-4" />Generate Blog Post</>}
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Content Editor / Result */}
          <Card className="p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Zap className="h-5 w-5 mr-2 text-primary" />Generated Article
                {resultWordCount > 0 && <span className="text-xs text-muted-foreground font-normal ml-2">({resultWordCount} words)</span>}
              </h3>
              <div className="flex gap-2">
                <MultiFormatExport content={result} topic={topic} />
                {result && (
                  <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(result); toast({ title: "Copied!" }); }}>
                    <Copy className="h-3 w-3 mr-1" /> Copy
                  </Button>
                )}
              </div>
            </div>

            {isGenerating ? (
              <div className="bg-muted/50 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3 text-primary" />
                  <p className="text-muted-foreground">Writing your SEO-optimized blog post...</p>
                </div>
              </div>
            ) : result ? (
              <ContentEditor content={result} onChange={setResult} />
            ) : (
              <div className="bg-muted/50 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
                <div className="text-muted-foreground text-center">
                  <PenTool className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter a topic and click generate to create your blog post</p>
                </div>
              </div>
            )}

            <ContentRepurposingActions content={result} visible={!!result} />
            <WorkflowSuggestions contentType="blog post" summary={result.substring(0, 200)} currentTool="Blog Creator" visible={!!result} />
          </Card>
        </div>

        {/* RIGHT: Analysis Sidebar */}
        <div className="space-y-4">
          <SEOAnalysisPanel topic={topic} keywords={keywords} wordCount={wordCount} content={result} />
          <ReadabilityPanel content={result} onContentUpdate={setResult} />
          <VisualSuggestionsPanel content={result} />
          <FactCheckerPanel content={result} />
        </div>
      </div>

      <AIChatWidget currentTool="blog-creator" prefillQuestion={chatPrefill} onPrefillConsumed={() => setChatPrefill("")} />
    </div>
  );
}
