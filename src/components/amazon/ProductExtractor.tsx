import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Sparkles, Loader2, Check, Link as LinkIcon, AlertCircle } from "lucide-react";
import { useAmazonAI } from "@/hooks/useAmazonAI";
import { useToast } from "@/hooks/use-toast";

interface ProductExtractorProps {
  onExtracted: (data: { productName: string; category: string; features: string }) => void;
}

export function ProductExtractor({ onExtracted }: ProductExtractorProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [extracted, setExtracted] = useState<any>(null);
  const { extractProduct } = useAmazonAI();
  const { toast } = useToast();

  const handleExtract = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setExtracted(null);
    try {
      const data = await extractProduct(input.trim());
      setExtracted(data);
      onExtracted({
        productName: data.productName || "",
        category: mapCategory(data.category || ""),
        features: (data.features || []).join(", "),
      });
      toast({ title: "✓ Information Extracted", description: `Confidence: ${Math.round((data.confidence || 0.7) * 100)}%` });
    } catch (e: any) {
      toast({ title: "Extraction failed", description: e.message || "Could not extract product info. Try entering details manually.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4 mb-4 border-dashed border-2 border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/10">
      <div className="flex items-center gap-2 mb-3">
        <LinkIcon className="h-4 w-4 text-blue-500" />
        <span className="text-sm font-semibold">Fetch from Amazon</span>
        <span className="text-[10px] text-muted-foreground">(AI-powered estimates)</span>
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Enter Amazon URL or ASIN (e.g. B09XS7JWHH)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 text-sm"
          maxLength={500}
        />
        <Button size="sm" onClick={handleExtract} disabled={!input.trim() || isLoading} className="shrink-0 gap-1">
          {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
          Extract Info
        </Button>
      </div>
      {extracted && (
        <div className="mt-3 flex items-center gap-2 text-sm">
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-green-700 dark:text-green-400 font-medium">
            Found: {extracted.productName}
          </span>
          <span className="text-xs text-muted-foreground ml-auto">
            {extracted.brand && `${extracted.brand} • `}{extracted.estimatedPriceRange || ""}
          </span>
        </div>
      )}
      <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1">
        <AlertCircle className="h-3 w-3" /> AI provides educated guesses. Verify details for accuracy.
      </p>
    </Card>
  );
}

function mapCategory(cat: string): string {
  const lower = cat.toLowerCase();
  if (lower.includes("electron")) return "electronics";
  if (lower.includes("home") || lower.includes("kitchen")) return "home-kitchen";
  if (lower.includes("sport") || lower.includes("outdoor")) return "sports-outdoors";
  if (lower.includes("beauty") || lower.includes("personal")) return "beauty";
  if (lower.includes("book")) return "books";
  if (lower.includes("toy") || lower.includes("game")) return "toys";
  if (lower.includes("cloth") || lower.includes("fashion")) return "clothing";
  if (lower.includes("tool") || lower.includes("improvement")) return "tools";
  return "electronics";
}
