
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Zap, Copy } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function DashboardEmailGenerator() {
  const [topic, setTopic] = useState("");
  const [emailType, setEmailType] = useState("promotional");
  const [tone, setTone] = useState("professional");
  const [audience, setAudience] = useState("");
  const [sequenceLength, setSequenceLength] = useState("1");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResult("");
    try {
      const { data, error } = await supabase.functions.invoke('ai-tools', {
        body: { tool: 'email', topic, emailType, tone, audience, sequenceLength: parseInt(sequenceLength) },
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

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    toast({ title: "Copied!" });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Email Generator</h1>
        <p className="text-muted-foreground">Generate high-converting email campaigns, sequences, and newsletters.</p>
      </div>

      <Card className="p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center"><Mail className="h-5 w-5 mr-2 text-red-500" />Email Settings</h3>
            <div className="space-y-2">
              <Label>Email Topic / Purpose</Label>
              <Input placeholder="e.g. Product launch announcement, Summer sale..." value={topic} onChange={(e) => setTopic(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
            <div className="space-y-2">
              <Label>Target Audience</Label>
              <Input placeholder="e.g. SaaS founders, fitness enthusiasts..." value={audience} onChange={(e) => setAudience(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Sequence Length</Label>
              <Select value={sequenceLength} onValueChange={setSequenceLength}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Single Email</SelectItem>
                  <SelectItem value="3">3-Email Sequence</SelectItem>
                  <SelectItem value="5">5-Email Sequence</SelectItem>
                  <SelectItem value="7">7-Email Sequence</SelectItem>
                </SelectContent>
              </Select>
              {parseInt(sequenceLength) > 1 && (
                <p className="text-xs text-muted-foreground">Generates a {sequenceLength}-email sequence with suggested timing.</p>
              )}
            </div>
            <Button onClick={handleGenerate} disabled={!topic || isGenerating} className="w-full" size="lg">
              {isGenerating ? <><Zap className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Mail className="mr-2 h-4 w-4" />Generate {parseInt(sequenceLength) > 1 ? `${sequenceLength}-Email Sequence` : 'Email Campaign'}</>}
            </Button>
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center"><Zap className="h-5 w-5 mr-2 text-red-500" />Generated Email</h3>
              {result && <Button variant="outline" size="sm" onClick={handleCopy}><Copy className="h-3 w-3 mr-1" /> Copy</Button>}
            </div>
            <div className="bg-muted/50 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto whitespace-pre-wrap text-sm">
              {isGenerating ? (
                <div className="animate-pulse text-muted-foreground">Generating your email campaign...</div>
              ) : result ? result : (
                <div className="text-muted-foreground text-center py-12">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Configure your email settings and click generate</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
