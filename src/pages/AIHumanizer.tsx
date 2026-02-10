import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, Shield, CheckCircle, ArrowRight, Zap, Star, Users, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";

const intensityLabels: Record<string, { label: string; description: string }> = {
  light: { label: "Light", description: "Minimal changes, subtle rewording" },
  medium: { label: "Medium", description: "Balanced rewrite, natural flow" },
  heavy: { label: "Heavy", description: "Complete rewrite from scratch" },
};

export default function AIHumanizer() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [intensity, setIntensity] = useState<string>("medium");
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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
              🤖 99% Success Rate Against AI Detection
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Humanizer
              </span>
              <br />
              Make AI Content Undetectable
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transform AI-generated content into natural, human-like text that bypasses 
              all major AI detection tools including GPTZero, Turnitin, and Originality.ai.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center"><Shield className="h-4 w-4 text-green-600 mr-2" />99% Success Rate</div>
              <div className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-2" />Maintains Quality</div>
              <div className="flex items-center"><Users className="h-4 w-4 mr-2" />10,000+ Happy Users</div>
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="max-w-5xl mx-auto">
            <Card className="p-6">
              {/* Intensity Slider */}
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
                  <span>🔵 Light</span>
                  <span>🟡 Medium</span>
                  <span>🔴 Heavy</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{intensityLabels[intensity].description}</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
                    <span className="flex items-center">
                      <Bot className="h-5 w-5 mr-2 text-red-500" />
                      AI-Generated Content
                    </span>
                    {inputWordCount > 0 && (
                      <span className="text-xs text-muted-foreground font-normal">{inputWordCount} words</span>
                    )}
                  </h3>
                  <Textarea 
                    placeholder="Paste your AI-generated content here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[250px] resize-none"
                  />
                  <Button onClick={handleHumanize} disabled={!inputText || isProcessing} className="w-full mt-4">
                    {isProcessing ? (
                      <><Zap className="mr-2 h-4 w-4 animate-spin" />Humanizing...</>
                    ) : (
                      <><Shield className="mr-2 h-4 w-4" />Humanize Content</>
                    )}
                  </Button>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
                    <span className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-green-500" />
                      Humanized Content
                    </span>
                    {outputWordCount > 0 && (
                      <span className="text-xs text-muted-foreground font-normal">{outputWordCount} words</span>
                    )}
                  </h3>
                  <Textarea 
                    placeholder="Your humanized content will appear here..."
                    value={outputText}
                    readOnly
                    className="min-h-[250px] resize-none bg-green-50 dark:bg-green-950/20"
                  />
                  <div className="mt-4 flex items-center justify-between">
                    <Button
                      variant="outline"
                      disabled={!outputText || isProcessing}
                      onClick={handleHumanize}
                      size="sm"
                    >
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
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Advanced Humanization Technology</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our proprietary AI humanizer uses advanced natural language processing 
              to create content that's indistinguishable from human writing.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle>99% Success Rate</CardTitle>
                <CardDescription>Bypasses all major AI detection tools</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />GPTZero bypass</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Turnitin detection</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Originality.ai bypass</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Content at Scale</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Quality Preservation</CardTitle>
                <CardDescription>Maintains meaning and readability</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Original meaning preserved</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Natural flow maintained</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Grammar checking</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Tone consistency</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Instant Results</CardTitle>
                <CardDescription>Get humanized content in seconds</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Real-time processing</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />No word limits</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />One-click copy</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Multiple rewrites</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Detection Tool Results</h2>
            <p className="text-xl text-muted-foreground">See how our humanizer performs against popular AI detection tools</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/50">
              <CardHeader>
                <CardTitle className="text-red-700 dark:text-red-300">Before Humanization</CardTitle>
                <CardDescription>Raw AI-generated content detection scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center"><span>GPTZero</span><Badge variant="destructive">98% AI</Badge></div>
                  <div className="flex justify-between items-center"><span>Originality.ai</span><Badge variant="destructive">95% AI</Badge></div>
                  <div className="flex justify-between items-center"><span>Turnitin</span><Badge variant="destructive">92% AI</Badge></div>
                  <div className="flex justify-between items-center"><span>Content at Scale</span><Badge variant="destructive">89% AI</Badge></div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50">
              <CardHeader>
                <CardTitle className="text-green-700 dark:text-green-300">After Humanization</CardTitle>
                <CardDescription>Same content after our AI humanizer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center"><span>GPTZero</span><Badge className="bg-green-100 text-green-800">2% AI</Badge></div>
                  <div className="flex justify-between items-center"><span>Originality.ai</span><Badge className="bg-green-100 text-green-800">1% AI</Badge></div>
                  <div className="flex justify-between items-center"><span>Turnitin</span><Badge className="bg-green-100 text-green-800">3% AI</Badge></div>
                  <div className="flex justify-between items-center"><span>Content at Scale</span><Badge className="bg-green-100 text-green-800">0% AI</Badge></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Start Humanizing Your AI Content Today</h2>
          <p className="text-xl text-muted-foreground mb-8">Join thousands of content creators who trust our AI humanizer to make their content undetectable.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="text-lg px-8">
              <Shield className="mr-2 h-5 w-5" />Try AI Humanizer Free<ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">View Pricing</Button>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Free trial included</div>
            <div className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />No setup required</div>
            <div className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Instant results</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
