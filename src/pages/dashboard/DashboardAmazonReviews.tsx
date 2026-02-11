
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Chrome, Zap, Copy, Plus, X, Info, FileText } from "lucide-react";
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { AIChatWidget } from "@/components/dashboard/AIChatWidget";
import { ImproveInputButton } from "@/components/dashboard/ImproveInputButton";
import { HistoryFavorites } from "@/components/dashboard/HistoryFavorites";
import { QualityScorePreview } from "@/components/dashboard/QualityScorePreview";
import { WorkflowSuggestions } from "@/components/dashboard/WorkflowSuggestions";
import { ExportHub } from "@/components/dashboard/ExportHub";
import { AskAIButton } from "@/components/dashboard/AskAIButton";
import { ProductExtractor } from "@/components/amazon/ProductExtractor";
import { FeatureDetector } from "@/components/amazon/FeatureDetector";
import { BuyerPersona } from "@/components/amazon/BuyerPersona";
import { ComparisonSuggester } from "@/components/amazon/ComparisonSuggester";
import { FAQBuilder } from "@/components/amazon/FAQBuilder";
import { DisclosureGenerator } from "@/components/amazon/DisclosureGenerator";
import { AuthenticityEnhancer } from "@/components/amazon/AuthenticityEnhancer";
import { ReviewScoreCard } from "@/components/amazon/ReviewScoreCard";

const depthOptions = [
  { value: "quick", label: "Quick Review", words: "300-400", time: "3 min", icon: "📄" },
  { value: "standard", label: "Standard Review", words: "600-800", time: "5 min", icon: "📄📄" },
  { value: "in-depth", label: "In-Depth Analysis", words: "1200-1500", time: "8 min", icon: "📄📄📄" },
];

const toneLabels = (val: number) => {
  if (val <= 35) return { label: "Critical Focus", emoji: "😐", desc: "Emphasizes cons and drawbacks" };
  if (val <= 65) return { label: "Balanced Review", emoji: "😊", desc: "Equal pros and cons coverage" };
  return { label: "Positive Focus", emoji: "😍", desc: "Emphasizes strengths and benefits" };
};

export default function DashboardAmazonReviews() {
  const { user } = useAuth();
  const { toast } = useToast();

  // Form state
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("electronics");
  const [features, setFeatures] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<"single" | "compare">("single");
  const [comparisonProducts, setComparisonProducts] = useState<string[]>([""]);
  const [chatPrefill, setChatPrefill] = useState("");

  // New features state
  const [reviewDepth, setReviewDepth] = useState("standard");
  const [toneBalance, setToneBalance] = useState(50);
  const [seoKeyword, setSeoKeyword] = useState("");
  const [seoEnabled, setSeoEnabled] = useState(false);
  const [includeFAQ, setIncludeFAQ] = useState(false);
  const [faqItems, setFaqItems] = useState<any[]>([]);
  const [persona, setPersona] = useState("");
  const [disclosure, setDisclosure] = useState("");
  const [disclosurePlacement, setDisclosurePlacement] = useState("top");
  const [includeComparison, setIncludeComparison] = useState(false);
  const [suggestedAlternatives, setSuggestedAlternatives] = useState<string[]>([]);

  // Comparison tab state
  const addComparisonProduct = () => {
    if (comparisonProducts.length < 3) setComparisonProducts([...comparisonProducts, ""]);
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
      const depthInfo = depthOptions.find(d => d.value === reviewDepth) || depthOptions[1];
      const toneInfo = toneLabels(toneBalance);

      const body: any = {
        tool: 'amazon',
        productName,
        category,
        features,
        reviewDepth: `${depthInfo.label} (${depthInfo.words} words)`,
        toneBalance: `${toneInfo.label} (${toneBalance}% positive)`,
      };

      if (persona) body.persona = persona;
      if (seoEnabled && seoKeyword) body.seoKeyword = seoKeyword;
      if (includeFAQ && faqItems.length > 0) body.includeFAQ = true;
      if (disclosure) {
        body.disclosure = disclosure;
        body.disclosurePlacement = disclosurePlacement;
      }

      if (mode === "compare") {
        body.comparisonProducts = comparisonProducts.filter(p => p.trim());
      } else if (includeComparison && suggestedAlternatives.length > 0) {
        body.comparisonProducts = suggestedAlternatives;
      }

      const { data, error } = await supabase.functions.invoke('ai-tools', { body });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      let fullResult = data.result || "";

      // Append FAQ section if generated
      if (includeFAQ && faqItems.length > 0) {
        fullResult += "\n\n## Frequently Asked Questions\n\n";
        faqItems.forEach(faq => {
          fullResult += `**Q: ${faq.question}**\n${faq.answer}\n\n`;
        });
      }

      // Append disclosure
      if (disclosure) {
        if (disclosurePlacement === "top" || disclosurePlacement === "both") {
          fullResult = `*${disclosure}*\n\n---\n\n${fullResult}`;
        }
        if (disclosurePlacement === "bottom" || disclosurePlacement === "both") {
          fullResult += `\n\n---\n\n*${disclosure}*`;
        }
      }

      setResult(fullResult);

      // Save to database
      if (user) {
        try {
          await supabase.from("affiliate_reviews").insert({
            user_id: user.id,
            product_name: productName,
            category,
            review_content: fullResult,
            word_count: fullResult.trim().split(/\s+/).length,
            seo_keyword: seoEnabled ? seoKeyword : null,
            review_depth: reviewDepth,
            tone_balance: toneBalance,
            faq_content: includeFAQ ? faqItems : null,
            disclosure: disclosure || null,
            persona: persona ? { description: persona } : null,
            config: body,
          });
        } catch { /* ignore save errors */ }
      }

      toast({ title: mode === "compare" ? "Comparison generated!" : "Review generated!" });
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to generate content", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const canGenerate = mode === "single" ? !!productName : !!productName && comparisonProducts.some(p => p.trim());

  const currentConfig = { productName, category, features, mode, comparisonProducts, reviewDepth, toneBalance, seoKeyword, seoEnabled, includeFAQ, persona };
  const loadConfig = useCallback((config: Record<string, any>) => {
    if (config.productName) setProductName(config.productName);
    if (config.category) setCategory(config.category);
    if (config.features) setFeatures(config.features);
    if (config.mode) setMode(config.mode);
    if (config.comparisonProducts) setComparisonProducts(config.comparisonProducts);
    if (config.reviewDepth) setReviewDepth(config.reviewDepth);
    if (config.toneBalance !== undefined) setToneBalance(config.toneBalance);
    if (config.seoKeyword) setSeoKeyword(config.seoKeyword);
    if (config.seoEnabled !== undefined) setSeoEnabled(config.seoEnabled);
    if (config.persona) setPersona(config.persona);
  }, []);

  const currentDepth = depthOptions.find(d => d.value === reviewDepth) || depthOptions[1];
  const currentTone = toneLabels(toneBalance);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Amazon Affiliate Reviews</h1>
        <p className="text-muted-foreground">Generate SEO-optimized product reviews with AI-powered enhancements.</p>
      </div>

      <HistoryFavorites tool="amazon" currentConfig={currentConfig} onLoadConfig={loadConfig} />

      {/* Product Extractor */}
      <ProductExtractor onExtracted={(data) => {
        setProductName(data.productName);
        setCategory(data.category);
        setFeatures(data.features);
      }} />

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Settings */}
        <div className="space-y-4">
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
                  <Input placeholder="e.g. Sony WH-1000XM5 Wireless Headphones" value={productName} onChange={(e) => setProductName(e.target.value)} maxLength={200} />
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
                    <Label>Key Features</Label>
                    <div className="flex gap-1">
                      <FeatureDetector productName={productName} onFeaturesSelected={setFeatures} currentFeatures={features} />
                      <ImproveInputButton fieldType="product features" currentValue={features} toolName="Amazon Reviews" onAccept={setFeatures} />
                    </div>
                  </div>
                  <Input placeholder="e.g. Noise cancelling, 30h battery, USB-C..." value={features} onChange={(e) => setFeatures(e.target.value)} maxLength={500} />
                  {features && <p className="text-[10px] text-muted-foreground">{features.split(",").filter(Boolean).length} features</p>}
                </div>
              </TabsContent>

              <TabsContent value="compare" className="space-y-4">
                <div className="space-y-2">
                  <Label>Product 1 (Primary)</Label>
                  <Input placeholder="e.g. Sony WH-1000XM5" value={productName} onChange={(e) => setProductName(e.target.value)} maxLength={200} />
                </div>
                {comparisonProducts.map((product, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Product {index + 2}</Label>
                      {comparisonProducts.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removeComparisonProduct(index)}><X className="h-3 w-3" /></Button>
                      )}
                    </div>
                    <Input placeholder="e.g. Bose QuietComfort Ultra" value={product} onChange={(e) => updateComparisonProduct(index, e.target.value)} maxLength={200} />
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
          </Card>

          {/* Review Depth & Tone */}
          <Card className="p-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                Review Depth
                <span className="text-xs text-muted-foreground font-normal">{currentDepth.icon} {currentDepth.time} read</span>
              </Label>
              <Select value={reviewDepth} onValueChange={setReviewDepth}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {depthOptions.map(d => (
                    <SelectItem key={d.value} value={d.value}>
                      {d.icon} {d.label} ({d.words} words)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                Review Tone
                <span className="text-xs text-muted-foreground font-normal">{currentTone.emoji} {currentTone.label} ({toneBalance}%)</span>
              </Label>
              <Slider
                value={[toneBalance]}
                onValueChange={(val) => setToneBalance(val[0])}
                min={10}
                max={90}
                step={5}
                className="mb-1"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>😐 Critical</span><span>😊 Balanced</span><span>😍 Positive</span>
              </div>
              <p className="text-[10px] text-muted-foreground">{currentTone.desc}</p>
            </div>
          </Card>

          {/* SEO Keyword */}
          <Card className="p-4 space-y-3">
            <div className="flex items-center gap-2" onClick={() => setSeoEnabled(!seoEnabled)}>
              <Checkbox checked={seoEnabled} />
              <Label className="text-sm cursor-pointer flex items-center gap-1">
                🎯 Optimize for SEO Keyword
                <Tooltip>
                  <TooltipTrigger><Info className="h-3 w-3 text-muted-foreground" /></TooltipTrigger>
                  <TooltipContent className="max-w-[200px]">
                    <p className="text-xs">AI will naturally incorporate this keyword throughout the review for better search rankings. Target: 1-2% density.</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
            </div>
            {seoEnabled && (
              <Input
                placeholder="e.g. best wireless headphones under $200"
                value={seoKeyword}
                onChange={(e) => setSeoKeyword(e.target.value)}
                className="text-sm"
                maxLength={200}
              />
            )}
          </Card>

          {/* Buyer Persona */}
          <Card className="p-4">
            <BuyerPersona productName={productName} onPersonaGenerated={setPersona} />
          </Card>

          {/* Comparison Suggester (single mode only) */}
          {mode === "single" && (
            <Card className="p-4 space-y-3">
              <div className="flex items-center gap-2" onClick={() => setIncludeComparison(!includeComparison)}>
                <Checkbox checked={includeComparison} />
                <Label className="text-sm cursor-pointer">📊 Include Product Comparison</Label>
              </div>
              {includeComparison && (
                <ComparisonSuggester
                  productName={productName}
                  category={category}
                  onAlternativesSelected={setSuggestedAlternatives}
                />
              )}
            </Card>
          )}

          {/* FAQ Builder */}
          <Card className="p-4 space-y-3">
            <div className="flex items-center gap-2" onClick={() => setIncludeFAQ(!includeFAQ)}>
              <Checkbox checked={includeFAQ} />
              <Label className="text-sm cursor-pointer">Add FAQ Section</Label>
            </div>
            {includeFAQ && (
              <FAQBuilder productName={productName} category={category} onFAQGenerated={setFaqItems} />
            )}
          </Card>

          {/* Disclosure Generator */}
          <Card className="p-4">
            <DisclosureGenerator onDisclosureGenerated={(d, p) => { setDisclosure(d); setDisclosurePlacement(p); }} />
          </Card>

          {/* Generate Button */}
          <div className="flex items-center gap-2">
            <QualityScorePreview toolName="Amazon Reviews" formData={currentConfig} disabled={!canGenerate} />
            <Button onClick={handleGenerate} disabled={!canGenerate || isGenerating} className="flex-1" size="lg">
              {isGenerating ? (
                <><Zap className="mr-2 h-4 w-4 animate-spin" />Generating {mode === "compare" ? "Comparison" : "Review"}...</>
              ) : (
                <><Chrome className="mr-2 h-4 w-4" />{mode === "compare" ? "Generate Comparison" : "Generate Review"}</>
              )}
            </Button>
          </div>
        </div>

        {/* Right Column - Output */}
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Zap className="h-5 w-5 mr-2 text-amber-500" />
                {mode === "compare" ? "Product Comparison" : "Generated Review"}
              </h3>
              <div className="flex gap-2">
                {result && <ExportHub content={result} filename={productName.replace(/\s+/g, '-').toLowerCase() || 'review'} />}
                {result && (
                  <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText(result); toast({ title: "Copied!" }); }}>
                    <Copy className="h-3 w-3 mr-1" /> Copy
                  </Button>
                )}
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto whitespace-pre-wrap text-sm">
              {isGenerating ? (
                <div className="animate-pulse text-muted-foreground">
                  <div className="space-y-3">
                    <p>{mode === "compare" ? "Building product comparison..." : "Writing your product review..."}</p>
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </div>
              ) : result ? (
                <>
                  {seoEnabled && seoKeyword && (
                    <div className="mb-3 text-[10px] text-muted-foreground flex items-center gap-2">
                      🎯 SEO Keyword: <span className="font-medium text-primary">{seoKeyword}</span>
                      <span>•</span>
                      Density: {((result.toLowerCase().split(seoKeyword.toLowerCase()).length - 1) / result.split(/\s+/).length * 100).toFixed(1)}%
                    </div>
                  )}
                  {result}
                </>
              ) : (
                <div className="text-muted-foreground text-center py-12">
                  <Chrome className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Configure your review settings and click generate</p>
                  <p className="text-xs mt-2">Use the AI-powered features on the left to enhance your review</p>
                </div>
              )}
            </div>
          </Card>

          {/* Post-generation features */}
          {result && (
            <>
              {/* Authenticity Enhancer */}
              <Card className="p-4">
                <AuthenticityEnhancer reviewContent={result} onEnhanced={setResult} />
              </Card>

              {/* Review Score Card */}
              <ReviewScoreCard
                reviewContent={result}
                seoKeyword={seoEnabled ? seoKeyword : undefined}
                targetWordCount={currentDepth.words}
                productName={productName}
                onRegenerated={(newSection) => {
                  toast({ title: "Section regenerated", description: "Check the output for the new section text. You can copy and replace manually." });
                }}
              />

              {/* Workflow Suggestions */}
              <WorkflowSuggestions
                contentType={mode === "compare" ? "product comparison" : "product review"}
                summary={result.substring(0, 200)}
                currentTool="Amazon Reviews"
                visible={true}
              />
            </>
          )}
        </div>
      </div>

      <AIChatWidget currentTool="amazon-reviews" prefillQuestion={chatPrefill} onPrefillConsumed={() => setChatPrefill("")} />
    </div>
  );
}
