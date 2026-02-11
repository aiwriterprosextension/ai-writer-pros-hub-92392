
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chrome, Zap, Copy, Plus, X } from "lucide-react";
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

export default function DashboardAmazonReviews() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("electronics");
  const [features, setFeatures] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<"single" | "compare">("single");
  const [comparisonProducts, setComparisonProducts] = useState<string[]>([""]);
  const [chatPrefill, setChatPrefill] = useState("");
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
      toast({ title: mode === "compare" ? "Comparison generated!" : "Review generated!" });
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to generate content", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const canGenerate = mode === "single"
    ? !!productName
    : !!productName && comparisonProducts.some(p => p.trim());

  const currentConfig = { productName, category, features, mode, comparisonProducts };
  const loadConfig = useCallback((config: Record<string, any>) => {
    if (config.productName) setProductName(config.productName);
    if (config.category) setCategory(config.category);
    if (config.features) setFeatures(config.features);
    if (config.mode) setMode(config.mode);
    if (config.comparisonProducts) setComparisonProducts(config.comparisonProducts);
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Amazon Affiliate Reviews</h1>
        <p className="text-muted-foreground">Generate SEO-optimized product reviews and comparison tables.</p>
      </div>

      <HistoryFavorites tool="amazon" currentConfig={currentConfig} onLoadConfig={loadConfig} />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <Tabs value={mode} onValueChange={(v) => setMode(v as "single" | "compare")}>
            <TabsList className="w-full mb-4">
              <TabsTrigger value="single" className="flex-1">Single Review</TabsTrigger>
              <TabsTrigger value="compare" className="flex-1">Compare Products</TabsTrigger>
            </TabsList>

            <TabsContent value="single" className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Product Name</Label>
                  <div className="flex gap-1">
                    <ImproveInputButton fieldType="product name" currentValue={productName} toolName="Amazon Reviews" onAccept={setProductName} />
                    <AskAIButton question="What makes a compelling product review title?" onAsk={setChatPrefill} />
                  </div>
                </div>
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
                <div className="flex items-center justify-between">
                  <Label>Key Features (optional)</Label>
                  <ImproveInputButton fieldType="product features" currentValue={features} toolName="Amazon Reviews" onAccept={setFeatures} />
                </div>
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
                  <Input placeholder={`e.g. Bose QuietComfort Ultra`} value={product} onChange={(e) => updateComparisonProduct(index, e.target.value)} />
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

          <div className="flex items-center gap-2 mt-4">
            <QualityScorePreview toolName="Amazon Reviews" formData={currentConfig} disabled={!canGenerate} />
            <Button onClick={handleGenerate} disabled={!canGenerate || isGenerating} className="flex-1" size="lg">
              {isGenerating ? (
                <><Zap className="mr-2 h-4 w-4 animate-spin" />Generating {mode === "compare" ? "Comparison" : "Review"}...</>
              ) : (
                <><Chrome className="mr-2 h-4 w-4" />{mode === "compare" ? "Generate Comparison Table" : "Generate Product Review"}</>
              )}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Zap className="h-5 w-5 mr-2 text-amber-500" />
              {mode === "compare" ? "Product Comparison" : "Generated Review"}
            </h3>
            <div className="flex gap-2">
              {result && <ExportHub content={result} filename={productName.replace(/\s+/g, '-').toLowerCase() || 'review'} />}
              {result && <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(result); toast({ title: "Copied!" }); }}><Copy className="h-3 w-3 mr-1" /> Copy</Button>}
            </div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto whitespace-pre-wrap text-sm">
            {isGenerating ? (
              <div className="animate-pulse text-muted-foreground">
                {mode === "compare" ? "Building product comparison table..." : "Writing your product review..."}
              </div>
            ) : result ? result : (
              <div className="text-muted-foreground text-center py-12">
                <Chrome className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter product details and click generate</p>
              </div>
            )}
          </div>
          <WorkflowSuggestions
            contentType={mode === "compare" ? "product comparison" : "product review"}
            summary={result.substring(0, 200)}
            currentTool="Amazon Reviews"
            visible={!!result}
          />
        </Card>
      </div>

      <AIChatWidget currentTool="amazon-reviews" prefillQuestion={chatPrefill} onPrefillConsumed={() => setChatPrefill("")} />
    </div>
  );
}
