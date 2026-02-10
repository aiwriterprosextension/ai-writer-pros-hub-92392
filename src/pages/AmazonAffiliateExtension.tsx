
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Chrome, Star, CheckCircle, ArrowRight, Download, Users, TrendingUp, Zap, Copy } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AmazonAffiliateExtension() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("electronics");
  const [features, setFeatures] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResult("");
    try {
      const { data, error } = await supabase.functions.invoke('ai-tools', {
        body: { tool: 'amazon', productName, category, features },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data.result || "");
      toast({ title: "Review generated!", description: "Your product review is ready." });
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to generate review", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    toast({ title: "Copied!", description: "Review copied to clipboard." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
                🏆 Most Popular Tool - 25,000+ Active Users
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Amazon Affiliate Assistant
                </span>
                <br />
                Product Review Generator
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Generate compelling, SEO-optimized Amazon product reviews in seconds.
                Enter a product name and get a complete review with pros, cons, and ratings.
              </p>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-1" />4.9/5 Rating</div>
                <div className="flex items-center"><Users className="h-4 w-4 mr-1" />25,000+ Users</div>
                <div className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-1" />SEO Optimized</div>
              </div>
            </div>

            {/* Review Generator */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Chrome className="h-5 w-5 mr-2 text-amber-600" />
                Generate Product Review
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Product Name</Label>
                  <Input placeholder="e.g. Sony WH-1000XM5 Wireless Headphones" value={productName} onChange={(e) => setProductName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="home-kitchen">Home & Kitchen</SelectItem>
                      <SelectItem value="sports-outdoors">Sports & Outdoors</SelectItem>
                      <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="toys">Toys & Games</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="tools">Tools & Home Improvement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Key Features (optional)</Label>
                  <Input placeholder="e.g. Noise cancelling, 30h battery, USB-C..." value={features} onChange={(e) => setFeatures(e.target.value)} />
                </div>
                <Button onClick={handleGenerate} disabled={!productName || isGenerating} className="w-full" size="lg">
                  {isGenerating ? <><Zap className="mr-2 h-4 w-4 animate-spin" />Generating Review...</> : <><Chrome className="mr-2 h-4 w-4" />Generate Review</>}
                </Button>
              </div>
            </Card>
          </div>

          {/* Generated Review */}
          {(result || isGenerating) && (
            <div className="mt-12 max-w-5xl mx-auto">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-amber-500" />Generated Review
                  </h3>
                  {result && <Button variant="outline" size="sm" onClick={handleCopy}><Copy className="h-3 w-3 mr-1" /> Copy</Button>}
                </div>
                <div className="bg-muted/50 rounded-lg p-4 max-h-[600px] overflow-y-auto whitespace-pre-wrap text-sm">
                  {isGenerating ? (
                    <div className="animate-pulse text-muted-foreground">Writing your product review...</div>
                  ) : result}
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need for Affiliate Success</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our tool includes everything to create compelling, SEO-optimized Amazon product reviews that convert.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle>SEO-Optimized Reviews</CardTitle>
                <CardDescription>Content that ranks and converts</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Keyword optimization</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Meta descriptions</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Structured content</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Pros & Cons format</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Comprehensive Analysis</CardTitle>
                <CardDescription>Detailed product breakdowns</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Feature highlights</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Value assessment</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Target audience match</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Rating with verdict</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Chrome className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Quick Generation</CardTitle>
                <CardDescription>Reviews in seconds, not hours</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Multiple categories</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Custom features input</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />One-click copy</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Instant results</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join 25,000+ Affiliate Marketers</h2>
          <p className="text-xl text-muted-foreground mb-8">Start generating professional Amazon product reviews today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="text-lg px-8">
              <Chrome className="mr-2 h-5 w-5" />Try Product Review Generator<ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Free to use</div>
            <div className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />SEO optimized</div>
            <div className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Instant results</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
