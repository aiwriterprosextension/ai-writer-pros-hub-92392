
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageSquare, CheckCircle, Users, Star, Zap, Copy, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const platforms = [
  { id: 'twitter', name: 'Twitter/X', icon: Twitter },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin },
  { id: 'instagram', name: 'Instagram', icon: Instagram },
  { id: 'facebook', name: 'Facebook', icon: Facebook },
];

export default function SocialMediaSuite() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("engaging");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["twitter", "linkedin"]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
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

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    toast({ title: "Copied!" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-pink-100 text-pink-800 border-pink-200">
              📱 Multi-Platform Content Creation
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Social Media Suite
              </span>
              <br />
              Content for Every Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Create engaging posts optimized for every major social platform. From Instagram captions
              to LinkedIn articles — AI that understands each platform's unique requirements.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center"><MessageSquare className="h-4 w-4 text-pink-600 mr-2" />4 Platforms</div>
              <div className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-2" />Platform-Optimized</div>
              <div className="flex items-center"><Users className="h-4 w-4 mr-2" />Hashtag Suggestions</div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <Card className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-pink-500" />
                    Post Settings
                  </h3>
                  <div className="space-y-2">
                    <Label>Topic / Content Idea</Label>
                    <Input placeholder="e.g. New product launch, industry insights, behind the scenes..." value={topic} onChange={(e) => setTopic(e.target.value)} />
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
                          <span className="text-sm font-medium">{p.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleGenerate} disabled={!topic || selectedPlatforms.length === 0 || isGenerating} className="w-full" size="lg">
                    {isGenerating ? <><Zap className="mr-2 h-4 w-4 animate-spin" />Generating Posts...</> : <><MessageSquare className="mr-2 h-4 w-4" />Generate Social Posts ({selectedPlatforms.length})</>}
                  </Button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-pink-500" />Generated Posts
                    </h3>
                    {result && <Button variant="outline" size="sm" onClick={handleCopy}><Copy className="h-3 w-3 mr-1" /> Copy All</Button>}
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto whitespace-pre-wrap text-sm">
                    {isGenerating ? (
                      <div className="animate-pulse text-muted-foreground">Creating platform-optimized posts...</div>
                    ) : result ? result : (
                      <div className="text-muted-foreground text-center py-12">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Select platforms and enter a topic to generate posts</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Supported Social Platforms</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create optimized content for every major social media platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Instagram, name: 'Instagram', desc: 'Captions, hashtags, stories, reels', colors: 'from-pink-500 to-rose-500' },
              { icon: Twitter, name: 'Twitter/X', desc: 'Tweets, threads, viral content', colors: 'from-blue-500 to-blue-600' },
              { icon: Linkedin, name: 'LinkedIn', desc: 'Professional posts, articles', colors: 'from-blue-600 to-blue-700' },
              { icon: Facebook, name: 'Facebook', desc: 'Posts, stories, community content', colors: 'from-blue-700 to-blue-800' },
            ].map(p => (
              <Card key={p.name} className="text-center">
                <CardContent className="pt-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${p.colors} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <p.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
