
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chrome, Star, CheckCircle, ArrowRight, Users, TrendingUp, Zap, Copy, Plus, X } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AmazonAffiliateExtension() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("electronics");
  const [features, setFeatures] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<"single" | "compare">("single");
  const [comparisonProducts, setComparisonProducts] = useState<string[]>([""]);
  const { toast } = useToast();

  const addComparisonProduct = () => {
    if (comparisonProducts.length < 3) {
      setComparisonProducts([...comparisonProducts, ""]);
    }
  };

  const removeComparisonProduct = (index: number) => {
    setComparisonProducts(comparisonProducts.filter((_, i) => i !== index));
  };

  const updateComparisonProduct = (index: number, value: string) => {
    const updated = [...comparisonProducts];
    updated[index] = value;
    setComparisonProducts(updated);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResult("");
    try {
      const body: any = { tool: 'amazon', productName, category, features };
      if (mode === "compare") {
        body.comparisonProducts = comparisonProducts.filter(p => p.trim());
      }
      const { data, error } = await supabase.functions.invoke('ai-tools', { body });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data.result || "");
      toast({ title: mode === "compare" ? "Comparison generated!" : "Review generated!", description: "Your content is ready." });
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to generate content", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    toast({ title: "Copied!", description: "Content copied to clipboard." });
  };

  const canGenerate = mode === "single"
    ? !!productName
    : !!productName && comparisonProducts.some(p => p.trim());

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
                Reviews &amp; Comparisons
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Generate compelling, SEO-optimized product reviews or multi-product comparison tables.
                Perfect for affiliate marketers who need content that converts.
              </p>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-1" />4.9/5 Rating</div>
                <div className="flex items-center"><Users className="h-4 w-4 mr-1" />25,000+ Users</div>
                <div className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-1" />Comparison Tables</div>
              </div>
            </div>

            {/* Review Generator */}
            <Card className="p-6">
              <Tabs value={mode} onValueChange={(v) => setMode(v as "single" | "compare")}>
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="single" className="flex-1">Single Review</TabsTrigger>
                  <TabsTrigger value="compare" className="flex-1">Compare Products</TabsTrigger>
                </TabsList>

                <TabsContent value="single" className="space-y-4">
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
                </TabsContent>

                <TabsContent value="compare" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Product 1 (Primary)</Label>
                    <Input placeholder="e.g. Sony WH-1000XM5" value={productName} onChange={(e) => setProductName(e.target.value)} />
                  </div>
                  {comparisonProducts.map((product, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Product {index + 2}</Label>
                        {comparisonProducts.length > 1 && (
                          <Button variant="ghost" size="sm" onClick={() => removeComparisonProduct(index)}>
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <Input
                        placeholder={`e.g. Bose QuietComfort Ultra`}
                        value={product}
                        onChange={(e) => updateComparisonProduct(index, e.target.value)}
                      />
                    </div>
                  ))}
                  {comparisonProducts.length < 3 && (
                    <Button variant="outline" size="sm" onClick={addComparisonProduct} className="w-full">
                      <Plus className="h-3 w-3 mr-1" /> Add Product (max 4 total)
                    </Button>
                  )}
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
                </TabsContent>
              </Tabs>

              <Button onClick={handleGenerate} disabled={!canGenerate || isGenerating} className="w-full mt-4" size="lg">
                {isGenerating ? (
                  <><Zap className="mr-2 h-4 w-4 animate-spin" />Generating {mode === "compare" ? "Comparison" : "Review"}...</>
                ) : (
                  <><Chrome className="mr-2 h-4 w-4" />{mode === "compare" ? "Generate Comparison" : "Generate Review"}</>
                )}
              </Button>
            </Card>
          </div>

          {/* Generated Content */}
          {(result || isGenerating) && (
            <div className="mt-12 max-w-5xl mx-auto">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-amber-500" />
                    {mode === "compare" ? "Product Comparison" : "Generated Review"}
                  </h3>
                  {result && <Button variant="outline" size="sm" onClick={handleCopy}><Copy className="h-3 w-3 mr-1" /> Copy</Button>}
                </div>
                <div className="bg-muted/50 rounded-lg p-4 max-h-[600px] overflow-y-auto whitespace-pre-wrap text-sm">
                  {isGenerating ? (
                    <div className="animate-pulse text-muted-foreground">
                      {mode === "compare" ? "Building product comparison table..." : "Writing your product review..."}
                    </div>
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
              Our tool includes everything to create compelling, SEO-optimized Amazon product reviews and comparison tables that convert.
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
                <CardTitle>Comparison Tables</CardTitle>
                <CardDescription>Multi-product side-by-side analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Up to 4 products</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Feature-by-feature comparison</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Winner recommendations</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Budget & premium picks</li>
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
          <p className="text-xl text-muted-foreground mb-8">Start generating professional Amazon product reviews and comparisons today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="text-lg px-8">
              <Chrome className="mr-2 h-5 w-5" />Try Product Review Generator<ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Free to use</div>
            <div className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Comparison tables</div>
            <div className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" />Instant results</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
