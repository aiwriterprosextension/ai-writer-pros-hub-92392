import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sparkles, Loader2, Shield, AlertTriangle } from "lucide-react";
import { useAmazonAI } from "@/hooks/useAmazonAI";
import { useToast } from "@/hooks/use-toast";

interface DisclosureGeneratorProps {
  onDisclosureGenerated: (disclosure: string, placement: string) => void;
}

export function DisclosureGenerator({ onDisclosureGenerated }: DisclosureGeneratorProps) {
  const [enabled, setEnabled] = useState(false);
  const [tone, setTone] = useState("standard");
  const [placement, setPlacement] = useState("top");
  const [disclosure, setDisclosure] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { generateDisclosure } = useAmazonAI();
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const toneMap: Record<string, string> = {
        standard: "standard and professional",
        friendly: "friendly and transparent",
        minimal: "minimal and brief",
      };
      const result = await generateDisclosure(toneMap[tone] || tone);
      setDisclosure(result);
      onDisclosureGenerated(result, placement);
      toast({ title: "Disclosure generated!" });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2" onClick={() => setEnabled(!enabled)}>
        <Checkbox checked={enabled} />
        <Label className="text-sm cursor-pointer flex items-center gap-1">
          <Shield className="h-3 w-3" /> Include FTC Affiliate Disclosure
        </Label>
      </div>

      {enabled && (
        <div className="pl-6 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Disclosure Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard & Professional</SelectItem>
                  <SelectItem value="friendly">Friendly & Transparent</SelectItem>
                  <SelectItem value="minimal">Minimal & Brief</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Placement</Label>
              <Select value={placement} onValueChange={(v) => { setPlacement(v); if (disclosure) onDisclosureGenerated(disclosure, v); }}>
                <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="top">Top of Review</SelectItem>
                  <SelectItem value="bottom">Bottom of Review</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button size="sm" onClick={handleGenerate} disabled={isLoading} className="w-full gap-1 text-xs">
            {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
            Generate Disclosure
          </Button>

          {disclosure && (
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-300 dark:border-yellow-800 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600 shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-800 dark:text-yellow-200">{disclosure}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
