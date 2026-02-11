import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FileText, Zap, Copy, Loader2 } from "lucide-react";
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AIChatWidget } from "@/components/dashboard/AIChatWidget";
import { ImproveInputButton } from "@/components/dashboard/ImproveInputButton";
import { HistoryFavorites } from "@/components/dashboard/HistoryFavorites";
import { QualityScorePreview } from "@/components/dashboard/QualityScorePreview";
import { WorkflowSuggestions } from "@/components/dashboard/WorkflowSuggestions";
import { AskAIButton } from "@/components/dashboard/AskAIButton";
import { ContentAnalyzer } from "@/components/repurposing/ContentAnalyzer";
import { FormatSelector, allFormats } from "@/components/repurposing/FormatSelector";
import { PlatformCustomization, type FormatCustomization } from "@/components/repurposing/PlatformCustomization";
import { FormatPreview } from "@/components/repurposing/FormatPreview";
import { VisualSuggestions } from "@/components/repurposing/VisualSuggestions";
import { HashtagRecommendations } from "@/components/repurposing/HashtagRecommendations";
import { SchedulingSuggestions } from "@/components/repurposing/SchedulingSuggestions";
import { ContentSeriesCreator } from "@/components/repurposing/ContentSeriesCreator";
import { SEOMetadataGenerator } from "@/components/repurposing/SEOMetadataGenerator";
import { BatchExport } from "@/components/repurposing/BatchExport";

interface AnalysisResult {
  contentType: string;
  confidence: number;
  themes: string[];
  takeaways: string[];
  readingLevel: string;
  tone: string;
  formatRecommendations: { format: string; matchScore: number; reason: string }[];
  warnings: string[];
}

export default function DashboardContentRepurposing() {
  const [inputContent, setInputContent] = useState("");
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<Record<string, string>>({});
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [multiLength, setMultiLength] = useState(false);
  const [customizations, setCustomizations] = useState<Record<string, FormatCustomization>>({});
  const [chatPrefill, setChatPrefill] = useState("");
  const { toast } = useToast();

  const handleFormatToggle = (formatId: string) => {
    setSelectedFormats((prev) =>
      prev.includes(formatId) ? prev.filter((f) => f !== formatId) : [...prev, formatId]
    );
    if (!customizations[formatId]) {
      setCustomizations((prev) => ({ ...prev, [formatId]: { tone: "original", ctaGoal: "none" } }));
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResults({});
    try {
      const customizationInstructions = selectedFormats.map((f) => {
        const c = customizations[f];
        let extra = "";
        if (c?.tone && c.tone !== "original") extra += ` Tone: ${c.tone}.`;
        if (c?.ctaGoal && c.ctaGoal !== "none") extra += ` CTA Goal: ${c.ctaGoal}.`;
        if (f === "twitter" && c?.threadLength) extra += ` Thread length: ${c.threadLength} tweets.`;
        if (f === "twitter" && c?.hookTweet) extra += " Add hook tweet.";
        if (f === "linkedin" && c?.professionalIntro) extra += " Add professional introduction.";
        if (f === "linkedin" && c?.targetAudience) extra += ` Target: ${c.targetAudience}.`;
        if (f === "instagram" && c?.captionStyle) extra += ` Style: ${c.captionStyle}.`;
        if (f === "instagram" && c?.hashtagCount) extra += ` Use ${c.hashtagCount} hashtags.`;
        if (f === "email" && c?.emailGoal) extra += ` Email goal: ${c.emailGoal}.`;
        return { id: f, extra };
      });

      const lengthInstruction = multiLength
        ? "\n\nIMPORTANT: For EACH format, generate THREE versions labeled [SHORT], [STANDARD], [LONG]. Short = 50% of optimal length, Standard = 100%, Long = 150%. Separate them clearly."
        : "";

      const { data, error } = await supabase.functions.invoke("repurpose-content", {
        body: {
          content: inputContent,
          formats: selectedFormats,
          tone: undefined,
          customizations: customizationInstructions,
          lengthInstruction,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResults(data.results || {});
      toast({ title: "Content repurposed!", description: `Generated ${selectedFormats.length} formats.` });
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to generate content", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, formatName: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: `${formatName} copied to clipboard.` });
  };

  const allResultsText = Object.entries(results).map(([k, v]) => `--- ${k} ---\n${v}`).join("\n\n");
  const inputWordCount = inputContent.trim() ? inputContent.trim().split(/\s+/).length : 0;
  const inputCharCount = inputContent.length;
  const hasResults = Object.keys(results).length > 0;

  const currentConfig = { inputContent: inputContent.substring(0, 500), selectedFormats };
  const loadConfig = useCallback((config: Record<string, any>) => {
    if (config.inputContent) setInputContent(config.inputContent);
    if (config.selectedFormats) setSelectedFormats(config.selectedFormats);
  }, []);

  const hasBlogFormat = selectedFormats.includes("blog") || selectedFormats.includes("email");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Content Repurposing</h1>
        <p className="text-muted-foreground">Transform one piece of content into multiple platform-optimized formats.</p>
      </div>

      <HistoryFavorites tool="repurpose" currentConfig={currentConfig} onLoadConfig={loadConfig} />

      <Card className="p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN: Input & Configuration */}
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center justify-between">
                <span className="flex items-center"><FileText className="h-5 w-5 mr-2 text-primary" />Original Content</span>
                <div className="flex items-center gap-1">
                  {inputWordCount > 0 && (
                    <span className="text-xs text-muted-foreground font-normal">{inputWordCount} words · {inputCharCount} chars</span>
                  )}
                  <AskAIButton question="What's the best content length for repurposing?" onAsk={setChatPrefill} />
                </div>
              </h3>
              <Textarea
                placeholder="Paste your blog post, article, or any content..."
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
                className="min-h-[180px] resize-none"
              />
            </div>

            {/* Content Analyzer */}
            <ContentAnalyzer content={inputContent} onAnalysisComplete={setAnalysis} analysis={analysis} />

            {/* Multi-length toggle */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <Label className="text-sm cursor-pointer">Generate 3 Length Versions (Short, Standard, Long)</Label>
              <Switch checked={multiLength} onCheckedChange={setMultiLength} />
            </div>

            {/* Content Series Creator */}
            <ContentSeriesCreator content={inputContent} wordCount={inputWordCount} />

            {/* Format Selector */}
            <FormatSelector
              selectedFormats={selectedFormats}
              onToggle={handleFormatToggle}
              recommendations={analysis?.formatRecommendations || null}
            />

            {/* Per-format customization */}
            {selectedFormats.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">⚙️ Per-Format Customization</h4>
                {selectedFormats.map((fId) => (
                  <PlatformCustomization
                    key={fId}
                    formatId={fId}
                    customization={customizations[fId] || { tone: "original", ctaGoal: "none" }}
                    onChange={(c) => setCustomizations((prev) => ({ ...prev, [fId]: c }))}
                  />
                ))}
              </div>
            )}

            {/* Preview */}
            <FormatPreview content={inputContent} selectedFormats={selectedFormats} visible={inputContent.length > 50 && selectedFormats.length > 0} />

            {/* Generate button */}
            <div className="flex items-center gap-2">
              <QualityScorePreview toolName="Content Repurposing" formData={currentConfig} disabled={!inputContent || selectedFormats.length === 0} />
              <Button onClick={handleGenerate} disabled={!inputContent || selectedFormats.length === 0 || isGenerating} className="flex-1" size="lg">
                {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Zap className="mr-2 h-4 w-4" />Repurpose Content ({selectedFormats.length} formats)</>}
              </Button>
            </div>
          </div>

          {/* RIGHT COLUMN: Results */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold flex items-center"><Zap className="h-5 w-5 mr-2 text-green-500" />Repurposed Content</h3>
              <BatchExport results={results} visible={hasResults} />
            </div>

            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-1">
              {selectedFormats.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select formats to see your repurposed content here</p>
                </div>
              ) : (
                selectedFormats.map((formatId) => {
                  const format = allFormats.find((f) => f.id === formatId);
                  if (!format) return null;
                  const FormatIcon = format.icon;
                  const content = results[formatId];
                  const isSocial = ["twitter", "linkedin", "instagram", "facebook"].includes(formatId);

                  return (
                    <Card key={formatId} className="p-4 space-y-2">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <FormatIcon className="h-4 w-4" />
                          <span className="font-medium text-sm">{format.name}</span>
                        </div>
                        {content && (
                          <Button variant="outline" size="sm" onClick={() => handleCopy(content, format.name)}>
                            <Copy className="h-3 w-3 mr-1" /> Copy
                          </Button>
                        )}
                      </div>

                      {multiLength && content ? (
                        <Tabs defaultValue="standard" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="short">Short</TabsTrigger>
                            <TabsTrigger value="standard">Standard</TabsTrigger>
                            <TabsTrigger value="long">Long</TabsTrigger>
                          </TabsList>
                          {["short", "standard", "long"].map((len) => {
                            const regex = new RegExp(`\\[${len.toUpperCase()}\\]([\\s\\S]*?)(?=\\[(?:SHORT|STANDARD|LONG)\\]|$)`, "i");
                            const match = content.match(regex);
                            const text = match ? match[1].trim() : content;
                            return (
                              <TabsContent key={len} value={len}>
                                <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded whitespace-pre-wrap">{text}</div>
                              </TabsContent>
                            );
                          })}
                        </Tabs>
                      ) : (
                        <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded whitespace-pre-wrap">
                          {isGenerating ? <div className="animate-pulse">Generating {format.name.toLowerCase()}...</div> : content || (inputContent ? 'Click "Repurpose Content" to generate' : "Add content to generate")}
                        </div>
                      )}

                      {/* Hashtag recommendations for social formats */}
                      {isSocial && content && (
                        <HashtagRecommendations
                          platform={formatId}
                          contentSummary={content.substring(0, 500)}
                          onAddHashtags={(tags) => {
                            setResults((prev) => ({
                              ...prev,
                              [formatId]: prev[formatId] + "\n\n" + tags.join(" "),
                            }));
                          }}
                          visible={true}
                        />
                      )}
                    </Card>
                  );
                })
              )}
            </div>

            {/* SEO Metadata for blog/email formats */}
            {hasResults && hasBlogFormat && (
              <SEOMetadataGenerator content={results.blog || results.email || allResultsText.substring(0, 2000)} visible={true} />
            )}

            {/* Visual Suggestions */}
            <VisualSuggestions
              formats={selectedFormats}
              contentSummary={allResultsText.substring(0, 1500)}
              visible={hasResults}
            />

            {/* Scheduling */}
            <SchedulingSuggestions formats={selectedFormats} visible={hasResults} />

            {/* Workflow Suggestions */}
            <WorkflowSuggestions
              contentType="repurposed content"
              summary={allResultsText.substring(0, 200)}
              currentTool="Content Repurposing"
              visible={hasResults}
            />
          </div>
        </div>
      </Card>

      <AIChatWidget currentTool="content-repurposing" prefillQuestion={chatPrefill} onPrefillConsumed={() => setChatPrefill("")} />
    </div>
  );
}
