
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, ArrowRight, CheckCircle, Users, Star, Zap, Copy } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function EmailGenerator() {
  const [topic, setTopic] = useState("");
  const [emailType, setEmailType] = useState("promotional");
  const [tone, setTone] = useState("professional");
  const [audience, setAudience] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResult("");
    try {
      const { data, error } = await supabase.functions.invoke('ai-tools', {
        body: { tool: 'email', topic, emailType, tone, audience },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data.result || "");
      toast({ title: "Email generated!", description: "Your email content is ready." });
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to generate email", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    toast({ title: "Copied!", description: "Email content copied to clipboard." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-red-100 text-red-800 border-red-200">
              📧 AI-Powered Email Campaigns
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Email Generator
              </span>
              <br />
              High-Converting Email Campaigns
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Create professional email campaigns with AI. Generate subject lines, email bodies,
              A/B variants, and preview text — all optimized for engagement and conversions.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center"><Mail className="h-4 w-4 text-red-600 mr-2" />Campaign Templates</div>
              <div className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-2" />A/B Testing</div>
              <div className="flex items-center"><Users className="h-4 w-4 mr-2" />Personalization</div>
            </div>
          </div>

          {/* Tool */}
          <div className="max-w-6xl mx-auto">
            <Card className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-red-500" />
                    Email Settings
                  </h3>
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
                    <Input placeholder="e.g. SaaS founders, fitness enthusiasts, new subscribers..." value={audience} onChange={(e) => setAudience(e.target.value)} />
                  </div>
                  <Button onClick={handleGenerate} disabled={!topic || isGenerating} className="w-full" size="lg">
                    {isGenerating ? <><Zap className="mr-2 h-4 w-4 animate-spin" />Generating Email...</> : <><Mail className="mr-2 h-4 w-4" />Generate Email Campaign</>}
                  </Button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-red-500" />
                      Generated Email
                    </h3>
                    {result && (
                      <Button variant="outline" size="sm" onClick={handleCopy}>
                        <Copy className="h-3 w-3 mr-1" /> Copy
                      </Button>
                    )}
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto whitespace-pre-wrap text-sm">
                    {isGenerating ? (
                      <div className="animate-pulse text-muted-foreground">Generating your email campaign...</div>
                    ) : result ? (
                      result
                    ) : (
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
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Complete Email Marketing Suite</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI-powered email creation tools designed for marketers, creators, and businesses.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Campaign Templates</CardTitle>
                <CardDescription>Pre-built templates for every occasion</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Welcome sequences</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Product launches</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Newsletter templates</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Sales sequences</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <CardTitle>A/B Test Generation</CardTitle>
                <CardDescription>Multiple variations for optimal performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Subject line variants</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Content variations</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />CTA optimization</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Preview text options</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Personalization</CardTitle>
                <CardDescription>Dynamic content for each audience</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Audience targeting</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Tone customization</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Segment targeting</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Dynamic content</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
