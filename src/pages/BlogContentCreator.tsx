
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PenTool, ArrowRight, CheckCircle, Users, Star, Zap, Copy, Search, TrendingUp } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function BlogContentCreator() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [wordCount, setWordCount] = useState("1500");
  const [tone, setTone] = useState("informative");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
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
      toast({ title: "Blog post generated!", description: "Your SEO-optimized article is ready." });
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to generate blog post", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    toast({ title: "Copied!", description: "Blog post copied to clipboard." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-indigo-100 text-indigo-800 border-indigo-200">
              📚 SEO-Optimized Blog Articles
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Blog Content Creator
              </span>
              <br />
              Articles That Rank on Google
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Generate comprehensive, SEO-optimized blog posts with proper structure, 
              meta tags, keyword optimization, and engaging content that ranks.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center"><Search className="h-4 w-4 text-indigo-600 mr-2" />SEO Optimized</div>
              <div className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-2" />Meta Tags</div>
              <div className="flex items-center"><TrendingUp className="h-4 w-4 mr-2" />Structured Content</div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <Card className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <PenTool className="h-5 w-5 mr-2 text-indigo-500" />
                    Article Settings
                  </h3>
                  <div className="space-y-2">
                    <Label>Blog Post Topic</Label>
                    <Input placeholder="e.g. Best practices for remote team management..." value={topic} onChange={(e) => setTopic(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Target Keywords (comma-separated)</Label>
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
                  <Button onClick={handleGenerate} disabled={!topic || isGenerating} className="w-full" size="lg">
                    {isGenerating ? <><Zap className="mr-2 h-4 w-4 animate-spin" />Generating Article...</> : <><PenTool className="mr-2 h-4 w-4" />Generate Blog Post</>}
                  </Button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-indigo-500" />Generated Article
                    </h3>
                    {result && <Button variant="outline" size="sm" onClick={handleCopy}><Copy className="h-3 w-3 mr-1" /> Copy</Button>}
                  </div>
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Complete Blog Creation Suite</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create blog content that ranks, engages, and converts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Keyword Optimization</CardTitle>
                <CardDescription>AI-powered keyword integration</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Target keyword focus</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Natural keyword placement</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Long-tail variations</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Semantic keywords</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <PenTool className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Content Generation</CardTitle>
                <CardDescription>Full article creation with structure</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Structured outlines</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Engaging introductions</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Detailed sections</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Strong conclusions</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle>SEO Optimization</CardTitle>
                <CardDescription>Built-in SEO tools</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Meta descriptions</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Header optimization</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Internal linking suggestions</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Readability optimization</li>
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
