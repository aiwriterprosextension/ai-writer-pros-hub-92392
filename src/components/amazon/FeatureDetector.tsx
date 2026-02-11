import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Loader2, Search, Plus } from "lucide-react";
import { useAmazonAI } from "@/hooks/useAmazonAI";
import { useToast } from "@/hooks/use-toast";

interface FeatureDetectorProps {
  productName: string;
  onFeaturesSelected: (features: string) => void;
  currentFeatures: string;
}

interface Feature {
  feature: string;
  importance: number;
  selected: boolean;
}

export function FeatureDetector({ productName, onFeaturesSelected, currentFeatures }: FeatureDetectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [customFeature, setCustomFeature] = useState("");
  const { detectFeatures } = useAmazonAI();
  const { toast } = useToast();

  const handleDetect = async () => {
    setIsOpen(true);
    setIsLoading(true);
    setFeatures([]);
    try {
      const data = await detectFeatures(productName);
      setFeatures(data.map((f: any) => ({ ...f, selected: true })));
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to detect features", variant: "destructive" });
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFeature = (index: number) => {
    setFeatures(prev => prev.map((f, i) => i === index ? { ...f, selected: !f.selected } : f));
  };

  const addCustom = () => {
    if (!customFeature.trim()) return;
    setFeatures(prev => [...prev, { feature: customFeature.trim(), importance: 3, selected: true }]);
    setCustomFeature("");
  };

  const handleApply = () => {
    const selected = features.filter(f => f.selected).map(f => f.feature);
    const existing = currentFeatures ? currentFeatures.split(",").map(s => s.trim()).filter(Boolean) : [];
    const merged = [...new Set([...existing, ...selected])].join(", ");
    onFeaturesSelected(merged);
    setIsOpen(false);
    toast({ title: "Features added!", description: `${selected.length} features selected.` });
  };

  const stars = (n: number) => "⭐".repeat(Math.min(n, 5));

  if (!productName) return null;

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleDetect}
        className="text-xs gap-1 h-7 px-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-950/30"
      >
        <Search className="h-3 w-3" /> Find Features
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              Key Features for {productName}
            </DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
              <span className="ml-2 text-sm text-muted-foreground">Researching features...</span>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-2">
              {features.map((f, i) => (
                <div
                  key={i}
                  onClick={() => toggleFeature(i)}
                  className="flex items-start gap-3 p-2 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <Checkbox checked={f.selected} className="mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{f.feature}</p>
                    <p className="text-[10px] text-muted-foreground">Importance: {stars(f.importance)}</p>
                  </div>
                </div>
              ))}

              <div className="flex gap-2 pt-2 border-t">
                <Input
                  placeholder="Add custom feature..."
                  value={customFeature}
                  onChange={(e) => setCustomFeature(e.target.value)}
                  className="text-sm"
                  maxLength={200}
                  onKeyDown={(e) => e.key === "Enter" && addCustom()}
                />
                <Button variant="outline" size="sm" onClick={addCustom} disabled={!customFeature.trim()}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          {!isLoading && features.length > 0 && (
            <DialogFooter>
              <Button size="sm" onClick={handleApply}>
                Add {features.filter(f => f.selected).length} Selected Features
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
