
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PenTool, Zap, Copy, Download, FileText } from "lucide-react";
import { useState, useMemo, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AIChatWidget } from "@/components/dashboard/AIChatWidget";
import { ImproveInputButton } from "@/components/dashboard/ImproveInputButton";
import { HistoryFavorites } from "@/components/dashboard/HistoryFavorites";
import { QualityScorePreview } from "@/components/dashboard/QualityScorePreview";
import { WorkflowSuggestions } from "@/components/dashboard/WorkflowSuggestions";
import { ExportHub } from "@/components/dashboard/ExportHub";
import { AskAIButton } from "@/components/dashboard/AskAIButton";

export default function DashboardBlogCreator() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [wordCount, setWordCount] = useState("1500");
  const [tone, setTone] = useState("informative");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  const [chatPrefill, setChatPrefill] = useState("");
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResult("");
    try {
      const { data, error } = await supabase.functions.invoke('ai-tools', {
        body: { tool: 'blog', topic, keywords, wordCount: parseInt(wordCount), tone },
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

  const readabilityStats = useMemo(() => {
    if (!result) return null;
    const readMatch = result.match(/###\s*READABILITY\s*\n([\s\S]*?)(?=###|$)/i);
    if (!readMatch) return null;
    const text = readMatch[1];
    return {
      flesch: text.match(/Flesch.*?:\s*(\d+)/i)?.[1],
      grade: text.match(/Grade.*?:\s*(.+)/i)?.[1]?.trim(),
      avgSentence: text.match(/Average.*?:\s*(.+)/i)?.[1]?.trim(),
      density: text.match(/Keyword.*?:\s*(.+)/i)?.[1]?.trim(),
    };
  }, [result]);

  const articleSection = useMemo(() => {
    if (!result) return "";
    const match = result.match(/###\s*ARTICLE\s*\n([\s\S]*?)$/i);
    return match ? match[1].trim() : result;
  }, [result]);

  const resultWordCount = result.trim() ? result.trim().split(/\s+/).length : 0;

  const currentConfig = { topic, keywords, wordCount, tone };
  const loadConfig = useCallback((config: Record<string, any>) => {
    if (config.topic) setTopic(config.topic);
    if (config.keywords) setKeywords(config.keywords);
    if (config.wordCount) setWordCount(config.wordCount);
    if (config.tone) setTone(config.tone);
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Blog Content Creator</h1>
        <p className="text-muted-foreground">Generate SEO-optimized blog posts with readability scoring and export options.</p>
      </div>

      <HistoryFavorites tool="blog" currentConfig={currentConfig} onLoadConfig={loadConfig} />

      <Card className="p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center"><PenTool className="h-5 w-5 mr-2 text-indigo-500" />Article Settings</h3>
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
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Target Keywords (comma-separated)</Label>
                <ImproveInputButton fieldType="SEO keywords" currentValue={keywords} toolName="Blog Creator" onAccept={setKeywords} />
              </div>
              <Input placeholder="e.g. remote work, team management, productivity..." value={keywords} onChange={(e) => setKeywords(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
                <Label>Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="informative">Informative</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                    <SelectItem value="beginner-friendly">Beginner-Friendly</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <QualityScorePreview toolName="Blog Creator" formData={currentConfig} disabled={!topic} />
              <Button onClick={handleGenerate} disabled={!topic || isGenerating} className="flex-1" size="lg">
                {isGenerating ? <><Zap className="mr-2 h-4 w-4 animate-spin" />Generating Article...</> : <><PenTool className="mr-2 h-4 w-4" />Generate Blog Post</>}
              </Button>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Zap className="h-5 w-5 mr-2 text-indigo-500" />Generated Article
                {resultWordCount > 0 && <span className="text-xs text-muted-foreground font-normal ml-2">({resultWordCount} words)</span>}
              </h3>
              <div className="flex gap-2">
                {result && <ExportHub content={result} filename={topic.replace(/\s+/g, '-').toLowerCase() || 'blog-post'} />}
                {result && <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(result); toast({ title: "Copied!" }); }}><Copy className="h-3 w-3 mr-1" /> Copy</Button>}
              </div>
            </div>
            {readabilityStats && (
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  { val: readabilityStats.flesch || '—', label: "Flesch Score" },
                  { val: readabilityStats.grade || '—', label: "Grade Level" },
                  { val: readabilityStats.avgSentence || '—', label: "Avg Sentence" },
                  { val: readabilityStats.density || '—', label: "Keyword Density" },
                ].map((s, i) => (
                  <div key={i} className="bg-muted/50 rounded-lg p-2 text-center">
                    <div className="text-sm font-bold text-primary">{s.val}</div>
                    <div className="text-[10px] text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
            <div className="bg-muted/50 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto whitespace-pre-wrap text-sm">
              {isGenerating ? (
                <div className="animate-pulse text-muted-foreground">Writing your SEO-optimized blog post...</div>
              ) : result ? result : (
                <div className="text-muted-foreground text-center py-12">
                  <PenTool className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter a topic and click generate to create your blog post</p>
                </div>
              )}
            </div>
            <WorkflowSuggestions
              contentType="blog post"
              summary={result.substring(0, 200)}
              currentTool="Blog Creator"
              visible={!!result}
            />
          </div>
        </div>
      </Card>

      <AIChatWidget currentTool="blog-creator" prefillQuestion={chatPrefill} onPrefillConsumed={() => setChatPrefill("")} />
    </div>
  );
}
