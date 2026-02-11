import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sparkles, Loader2, UserCheck, ChevronDown } from "lucide-react";
import { useAmazonAI } from "@/hooks/useAmazonAI";
import { useToast } from "@/hooks/use-toast";

interface AuthenticityEnhancerProps {
  reviewContent: string;
  onEnhanced: (content: string) => void;
}

export function AuthenticityEnhancer({ reviewContent, onEnhanced }: AuthenticityEnhancerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [testingDuration, setTestingDuration] = useState("2-weeks");
  const [primaryUseCase, setPrimaryUseCase] = useState("");
  const [notableExperience, setNotableExperience] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { enhanceAuthenticity } = useAmazonAI();
  const { toast } = useToast();

  const handleEnhance = async () => {
    if (!reviewContent) {
      toast({ title: "Generate a review first", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const result = await enhanceAuthenticity({
        reviewContent,
        testingDuration,
        primaryUseCase,
        notableExperience,
      });
      onEnhanced(result);
      toast({ title: "Review enhanced!", description: "Personal details woven into the review." });
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
            <UserCheck className="h-4 w-4 text-green-500" />
            Add Personal Touch (Optional)
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 pt-3">
        <div className="space-y-1">
          <Label className="text-xs">Testing Duration</Label>
          <Select value={testingDuration} onValueChange={setTestingDuration}>
            <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1-week">1 Week</SelectItem>
              <SelectItem value="2-weeks">2 Weeks</SelectItem>
              <SelectItem value="1-month">1 Month</SelectItem>
              <SelectItem value="3-months">3+ Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Primary Use Case</Label>
          <Input
            placeholder="e.g. Daily commute noise cancellation"
            value={primaryUseCase}
            onChange={(e) => setPrimaryUseCase(e.target.value)}
            className="text-sm h-9"
            maxLength={200}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Notable Experience</Label>
          <Textarea
            placeholder="e.g. Used them on a 12-hour flight and the battery still had 30% left..."
            value={notableExperience}
            onChange={(e) => setNotableExperience(e.target.value)}
            className="min-h-[60px] text-sm resize-none"
            maxLength={500}
          />
        </div>
        <Button size="sm" onClick={handleEnhance} disabled={isLoading || !reviewContent} className="w-full gap-1">
          {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
          Enhance with Personal Details
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
}
