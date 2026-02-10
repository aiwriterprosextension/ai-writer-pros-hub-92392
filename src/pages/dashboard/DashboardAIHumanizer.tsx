
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Bot, Shield, Zap, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const intensityLabels: Record<string, { label: string; description: string }> = {
  light: { label: "Light", description: "Minimal changes, subtle rewording" },
  medium: { label: "Medium", description: "Balanced rewrite, natural flow" },
  heavy: { label: "Heavy", description: "Complete rewrite from scratch" },
};

export default function DashboardAIHumanizer() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [intensity, setIntensity] = useState("medium");
  const { toast } = useToast();

  const intensityFromSlider = (val: number) => {
    if (val <= 33) return "light";
    if (val <= 66) return "medium";
    return "heavy";
  };
  const sliderFromIntensity = (i: string) => {
    if (i === "light") return 16;
    if (i === "heavy") return 83;
    return 50;
  };

  const handleHumanize = async () => {
    setIsProcessing(true);
    setOutputText("");
    try {
      const { data, error } = await supabase.functions.invoke('ai-tools', {
        body: { tool: 'humanize', content: inputText, intensity },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setOutputText(data.result || "");
      toast({ title: "Content humanized!", description: `Intensity: ${intensityLabels[intensity].label}` });
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to humanize content", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    toast({ title: "Copied!", description: "Humanized content copied to clipboard." });
  };

  const inputWordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const outputWordCount = outputText.trim() ? outputText.trim().split(/\s+/).length : 0;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">AI Humanizer</h1>
        <p className="text-muted-foreground">Transform AI-generated text into natural, human-like content.</p>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <Label className="text-sm font-medium mb-3 block">
            Humanization Intensity: <span className="text-primary font-semibold">{intensityLabels[intensity].label}</span>
          </Label>
          <Slider
            value={[sliderFromIntensity(intensity)]}
            onValueChange={(val) => setIntensity(intensityFromSlider(val[0]))}
            max={100}
            step={1}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>🔵 Light</span><span>🟡 Medium</span><span>🔴 Heavy</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{intensityLabels[intensity].description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
              <span className="flex items-center"><Bot className="h-5 w-5 mr-2 text-destructive" />AI-Generated Content</span>
              {inputWordCount > 0 && <span className="text-xs text-muted-foreground font-normal">{inputWordCount} words</span>}
            </h3>
            <Textarea placeholder="Paste your AI-generated content here..." value={inputText} onChange={(e) => setInputText(e.target.value)} className="min-h-[300px] resize-none" />
            <Button onClick={handleHumanize} disabled={!inputText || isProcessing} className="w-full mt-4">
              {isProcessing ? <><Zap className="mr-2 h-4 w-4 animate-spin" />Humanizing...</> : <><Shield className="mr-2 h-4 w-4" />Humanize Content</>}
            </Button>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
              <span className="flex items-center"><Shield className="h-5 w-5 mr-2 text-green-600" />Humanized Content</span>
              {outputWordCount > 0 && <span className="text-xs text-muted-foreground font-normal">{outputWordCount} words</span>}
            </h3>
            <Textarea placeholder="Your humanized content will appear here..." value={outputText} readOnly className="min-h-[300px] resize-none bg-muted/30" />
            <div className="mt-4 flex items-center justify-between">
              <Button variant="outline" disabled={!outputText || isProcessing} onClick={handleHumanize} size="sm">
                <RefreshCw className="h-4 w-4 mr-1" /> Re-humanize
              </Button>
              <Button variant="outline" disabled={!outputText} onClick={handleCopy} size="sm">
                <Copy className="h-4 w-4 mr-1" /> Copy Result
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
