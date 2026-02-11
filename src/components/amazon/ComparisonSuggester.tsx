import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Loader2, GitCompare } from "lucide-react";
import { useAmazonAI } from "@/hooks/useAmazonAI";
import { useToast } from "@/hooks/use-toast";

interface Alternative {
  name: string;
  differentiator: string;
  advantage: string;
  selected: boolean;
}

interface ComparisonSuggesterProps {
  productName: string;
  category: string;
  onAlternativesSelected: (products: string[]) => void;
}

export function ComparisonSuggester({ productName, category, onAlternativesSelected }: ComparisonSuggesterProps) {
  const [alternatives, setAlternatives] = useState<Alternative[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const { suggestAlternatives } = useAmazonAI();
  const { toast } = useToast();

  const handleFind = async () => {
    if (!productName) return;
    setIsLoading(true);
    try {
      const data = await suggestAlternatives(productName, category);
      setAlternatives(data.map((a: any) => ({ ...a, selected: false })));
      setHasFetched(true);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAlt = (index: number) => {
    const updated = alternatives.map((a, i) => i === index ? { ...a, selected: !a.selected } : a);
    setAlternatives(updated);
    onAlternativesSelected(updated.filter(a => a.selected).map(a => a.name));
  };

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleFind}
        disabled={!productName || isLoading}
        className="w-full gap-1 text-xs"
      >
        {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <GitCompare className="h-3 w-3" />}
        Find Alternatives
      </Button>

      {hasFetched && alternatives.length > 0 && (
        <div className="space-y-2">
          {alternatives.map((alt, i) => (
            <Card
              key={i}
              onClick={() => toggleAlt(i)}
              className={`p-3 cursor-pointer transition-all ${
                alt.selected ? "border-primary bg-primary/5" : "hover:border-primary/50"
              }`}
            >
              <div className="flex items-start gap-2">
                <Checkbox checked={alt.selected} className="mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{alt.name}</p>
                  <p className="text-xs text-muted-foreground">{alt.differentiator}</p>
                  <p className="text-[10px] text-green-600 dark:text-green-400 mt-1">✓ {alt.advantage}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
