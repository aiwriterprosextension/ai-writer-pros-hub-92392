import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sparkles, Loader2, Target, ChevronDown } from "lucide-react";
import { useAmazonAI } from "@/hooks/useAmazonAI";
import { useToast } from "@/hooks/use-toast";

interface BuyerPersonaProps {
  productName: string;
  onPersonaGenerated: (persona: string) => void;
}

export function BuyerPersona({ productName, onPersonaGenerated }: BuyerPersonaProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [problem, setProblem] = useState("");
  const [priceSensitivity, setPriceSensitivity] = useState("mid-range");
  const [experienceLevel, setExperienceLevel] = useState("intermediate");
  const [persona, setPersona] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { generatePersona } = useAmazonAI();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!productName) {
      toast({ title: "Enter product name first", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const result = await generatePersona({ productName, problem, priceSensitivity, experienceLevel });
      setPersona(result);
      onPersonaGenerated(result);
      toast({ title: "Persona generated!" });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between text-sm h-9 px-3">
          <span className="flex items-center gap-2">
            <Target className="h-4 w-4 text-purple-500" />
            Target Buyer Persona (Optional)
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 pt-3">
        <div className="space-y-2">
          <Label className="text-xs">What problem does this solve?</Label>
          <Textarea
            placeholder="e.g. Noise in open offices makes it hard to concentrate..."
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="min-h-[60px] text-sm resize-none"
            maxLength={500}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Price Sensitivity</Label>
            <Select value={priceSensitivity} onValueChange={setPriceSensitivity}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget-Conscious</SelectItem>
                <SelectItem value="mid-range">Mid-Range</SelectItem>
                <SelectItem value="premium">Premium Buyers</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Experience Level</Label>
            <Select value={experienceLevel} onValueChange={setExperienceLevel}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button size="sm" onClick={handleGenerate} disabled={isLoading || !productName} className="w-full gap-1">
          {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
          Generate Persona
        </Button>
        {persona && (
          <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
            <Textarea
              value={persona}
              onChange={(e) => { setPersona(e.target.value); onPersonaGenerated(e.target.value); }}
              className="min-h-[60px] text-sm resize-none border-0 bg-transparent p-0"
            />
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
