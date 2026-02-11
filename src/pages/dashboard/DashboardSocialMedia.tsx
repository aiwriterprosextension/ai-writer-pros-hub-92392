
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageSquare, Zap, Copy, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
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

const platforms = [
  { id: 'twitter', name: 'Twitter/X', icon: Twitter, charLimit: 280 },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, charLimit: 3000 },
  { id: 'instagram', name: 'Instagram', icon: Instagram, charLimit: 2200 },
  { id: 'facebook', name: 'Facebook', icon: Facebook, charLimit: 63206 },
];

export default function DashboardSocialMedia() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("engaging");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["twitter", "linkedin"]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  const [chatPrefill, setChatPrefill] = useState("");
  const { toast } = useToast();

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResult("");
    try {
      const { data, error } = await supabase.functions.invoke('ai-tools', {
        body: { tool: 'social', topic, platforms: selectedPlatforms, tone },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data.result || "");
      toast({ title: "Posts generated!", description: `Content created for ${selectedPlatforms.length} platforms.` });
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to generate posts", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text?: string) => {
    navigator.clipboard.writeText(text || result);
    toast({ title: "Copied!" });
  };

  const platformSections = useMemo(() => {
    if (!result) return {};
    const sections: Record<string, string> = {};
    for (const p of platforms) {
      const regex = new RegExp(`###\\s*${p.id}[\\s/]*(?:\\w*)\\s*\\n([\\s\\S]*?)(?=###|$)`, "i");
      const match = result.match(regex);
      if (match) {
        sections[p.id] = match[1].replace(/CHARACTER_COUNT:\s*\d+/gi, '').trim();
      }
    }
    return sections;
  }, [result]);

  const currentConfig = { topic, tone, selectedPlatforms };
  const loadConfig = useCallback((config: Record<string, any>) => {
    if (config.topic) setTopic(config.topic);
    if (config.tone) setTone(config.tone);
    if (config.selectedPlatforms) setSelectedPlatforms(config.selectedPlatforms);
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Social Media Suite</h1>
        <p className="text-muted-foreground">Generate optimized posts for Twitter, LinkedIn, Instagram & Facebook.</p>
      </div>

      <HistoryFavorites tool="social" currentConfig={currentConfig} onLoadConfig={loadConfig} />

      <Card className="p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center"><MessageSquare className="h-5 w-5 mr-2 text-pink-500" />Post Settings</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Topic / Content Idea</Label>
                <div className="flex gap-1">
                  <ImproveInputButton fieldType="social media topic" currentValue={topic} toolName="Social Media Suite" onAccept={setTopic} />
                  <AskAIButton question="What tone works best for LinkedIn vs Twitter?" onAsk={setChatPrefill} />
                </div>
              </div>
              <Input placeholder="e.g. New product launch, behind the scenes..." value={topic} onChange={(e) => setTopic(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="engaging">Engaging</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="humorous">Humorous</SelectItem>
                  <SelectItem value="inspirational">Inspirational</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Platforms</Label>
              <div className="grid grid-cols-2 gap-3">
                {platforms.map(p => (
                  <div key={p.id} onClick={() => togglePlatform(p.id)}
                    className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedPlatforms.includes(p.id) ? 'border-pink-500 bg-pink-50 dark:bg-pink-950/20' : 'border-border hover:border-pink-300'
                    }`}>
                    <Checkbox checked={selectedPlatforms.includes(p.id)} />
                    <p.icon className="h-4 w-4" />
                    <div>
                      <span className="text-sm font-medium">{p.name}</span>
                      <span className="text-xs text-muted-foreground ml-1">({p.charLimit.toLocaleString()})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <QualityScorePreview toolName="Social Media Suite" formData={currentConfig} disabled={!topic} />
              <Button onClick={handleGenerate} disabled={!topic || selectedPlatforms.length === 0 || isGenerating} className="flex-1" size="lg">
                {isGenerating ? <><Zap className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><MessageSquare className="mr-2 h-4 w-4" />Generate Posts ({selectedPlatforms.length})</>}
              </Button>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center"><Zap className="h-5 w-5 mr-2 text-pink-500" />Generated Posts</h3>
              <div className="flex gap-2">
                {result && <ExportHub content={result} filename="social-media-posts" />}
                {result && <Button variant="outline" size="sm" onClick={() => handleCopy()}><Copy className="h-3 w-3 mr-1" /> Copy All</Button>}
              </div>
            </div>
            {Object.keys(platformSections).length > 0 ? (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {selectedPlatforms.map(pId => {
                  const platform = platforms.find(p => p.id === pId);
                  const content = platformSections[pId];
                  if (!platform || !content) return null;
                  const charCount = content.length;
                  const isOverLimit = charCount > platform.charLimit;
                  const PIcon = platform.icon;
                  return (
                    <Card key={pId} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2"><PIcon className="h-4 w-4" /><span className="font-medium text-sm">{platform.name}</span></div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs ${isOverLimit ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>{charCount.toLocaleString()} / {platform.charLimit.toLocaleString()}</span>
                          <Button variant="outline" size="sm" onClick={() => handleCopy(content)}><Copy className="h-3 w-3" /></Button>
                        </div>
                      </div>
                      <div className="text-sm bg-muted/50 p-3 rounded whitespace-pre-wrap">{content}</div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="bg-muted/50 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
                {isGenerating ? (
                  <div className="animate-pulse text-muted-foreground">Creating platform-optimized posts...</div>
                ) : (
                  <div className="text-muted-foreground text-center">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select platforms and enter a topic to generate posts</p>
                  </div>
                )}
              </div>
            )}
            <WorkflowSuggestions
              contentType="social media posts"
              summary={result.substring(0, 200)}
              currentTool="Social Media Suite"
              visible={!!result}
            />
          </div>
        </div>
      </Card>

      <AIChatWidget currentTool="social-media" prefillQuestion={chatPrefill} onPrefillConsumed={() => setChatPrefill("")} />
    </div>
  );
}
