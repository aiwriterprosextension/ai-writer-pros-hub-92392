
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Zap, Copy, Instagram, Twitter, Linkedin, Facebook, Layers } from "lucide-react";
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

const contentFormats = [
  { id: 'twitter', name: 'Twitter Thread', icon: Twitter, description: '5-10 tweet thread' },
  { id: 'linkedin', name: 'LinkedIn Post', icon: Linkedin, description: 'Professional format' },
  { id: 'instagram', name: 'Instagram Captions', icon: Instagram, description: 'Multiple captions' },
  { id: 'facebook', name: 'Facebook Post', icon: Facebook, description: 'Engaging format' },
  { id: 'email', name: 'Email Newsletter', icon: FileText, description: 'Newsletter section' },
  { id: 'bullets', name: 'Bullet Points', icon: Layers, description: 'Key takeaways' },
];

export default function DashboardContentRepurposing() {
  const [inputContent, setInputContent] = useState("");
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<Record<string, string>>({});
  const [tone, setTone] = useState("original");
  const [chatPrefill, setChatPrefill] = useState("");
  const { toast } = useToast();

  const handleFormatToggle = (formatId: string) => {
    setSelectedFormats(prev => prev.includes(formatId) ? prev.filter(f => f !== formatId) : [...prev, formatId]);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResults({});
    try {
      const { data, error } = await supabase.functions.invoke('repurpose-content', {
        body: { content: inputContent, formats: selectedFormats, tone: tone === "original" ? undefined : tone },
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

  const currentConfig = { inputContent: inputContent.substring(0, 500), selectedFormats, tone };
  const loadConfig = useCallback((config: Record<string, any>) => {
    if (config.inputContent) setInputContent(config.inputContent);
    if (config.selectedFormats) setSelectedFormats(config.selectedFormats);
    if (config.tone) setTone(config.tone);
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Content Repurposing</h1>
        <p className="text-muted-foreground">Transform one piece of content into multiple platform-optimized formats.</p>
      </div>

      <HistoryFavorites tool="repurpose" currentConfig={currentConfig} onLoadConfig={loadConfig} />

      <Card className="p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
              <span className="flex items-center"><FileText className="h-5 w-5 mr-2 text-blue-500" />Original Content</span>
              <div className="flex items-center gap-1">
                {inputWordCount > 0 && <span className="text-xs text-muted-foreground font-normal">{inputWordCount} words</span>}
                <AskAIButton question="What's the best content length for repurposing?" onAsk={setChatPrefill} />
              </div>
            </h3>
            <Textarea placeholder="Paste your blog post, article, or any content..." value={inputContent} onChange={(e) => setInputContent(e.target.value)} className="min-h-[200px] resize-none" />
            <div className="mt-4 space-y-2">
              <Label>Output Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="original">Keep Original Tone</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual & Friendly</SelectItem>
                  <SelectItem value="humorous">Humorous</SelectItem>
                  <SelectItem value="authoritative">Authoritative</SelectItem>
                  <SelectItem value="inspirational">Inspirational</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-3">Select Output Formats:</h4>
              <div className="grid grid-cols-2 gap-3">
                {contentFormats.map((format) => (
                  <div key={format.id} onClick={() => handleFormatToggle(format.id)}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedFormats.includes(format.id) ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-border hover:border-green-300'
                    }`}>
                    <div className="flex items-center mb-1">
                      <format.icon className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">{format.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{format.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <QualityScorePreview toolName="Content Repurposing" formData={currentConfig} disabled={!inputContent || selectedFormats.length === 0} />
              <Button onClick={handleGenerate} disabled={!inputContent || selectedFormats.length === 0 || isGenerating} className="flex-1" size="lg">
                {isGenerating ? <><Zap className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><FileText className="mr-2 h-4 w-4" />Repurpose Content ({selectedFormats.length} formats)</>}
              </Button>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center"><Zap className="h-5 w-5 mr-2 text-green-500" />Repurposed Content</h3>
              {allResultsText && <ExportHub content={allResultsText} filename="repurposed-content" />}
            </div>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {selectedFormats.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select formats to see your repurposed content here</p>
                </div>
              ) : (
                selectedFormats.map((formatId) => {
                  const format = contentFormats.find(f => f.id === formatId);
                  if (!format) return null;
                  const FormatIcon = format.icon;
                  const content = results[formatId];
                  return (
                    <Card key={formatId} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center"><FormatIcon className="h-4 w-4 mr-2" /><span className="font-medium">{format.name}</span></div>
                        {content && <Button variant="outline" size="sm" onClick={() => handleCopy(content, format.name)}><Copy className="h-3 w-3 mr-1" /> Copy</Button>}
                      </div>
                      <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded whitespace-pre-wrap">
                        {isGenerating ? <div className="animate-pulse">Generating {format.name.toLowerCase()}...</div> : content ? content : (inputContent ? 'Click "Repurpose Content" to generate' : 'Add content to generate')}
                      </div>
                    </Card>
                  );
                })
              )}
            </div>
            <WorkflowSuggestions
              contentType="repurposed content"
              summary={allResultsText.substring(0, 200)}
              currentTool="Content Repurposing"
              visible={Object.keys(results).length > 0}
            />
          </div>
        </div>
      </Card>

      <AIChatWidget currentTool="content-repurposing" prefillQuestion={chatPrefill} onPrefillConsumed={() => setChatPrefill("")} />
    </div>
  );
}
