import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sparkles, Loader2, HelpCircle, ChevronDown, Pencil } from "lucide-react";
import { useAmazonAI } from "@/hooks/useAmazonAI";
import { useToast } from "@/hooks/use-toast";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQBuilderProps {
  productName: string;
  category: string;
  onFAQGenerated: (faq: FAQItem[]) => void;
}

export function FAQBuilder({ productName, category, onFAQGenerated }: FAQBuilderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const { generateFAQ } = useAmazonAI();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!productName) return;
    setIsLoading(true);
    try {
      const data = await generateFAQ(productName, category);
      setFaqItems(data);
      onFAQGenerated(data);
      setIsOpen(true);
      toast({ title: "FAQ generated!", description: `${data.length} questions created.` });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = (index: number, field: "question" | "answer", value: string) => {
    const updated = faqItems.map((item, i) => i === index ? { ...item, [field]: value } : item);
    setFaqItems(updated);
    onFAQGenerated(updated);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleGenerate}
          disabled={!productName || isLoading}
          className="gap-1 text-xs"
        >
          {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <HelpCircle className="h-3 w-3" />}
          Generate FAQ Section
        </Button>
        {faqItems.length > 0 && (
          <span className="text-xs text-muted-foreground">{faqItems.length} Q&As</span>
        )}
      </div>

      {faqItems.length > 0 && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full justify-between text-xs h-8">
              <span>Preview FAQ ({faqItems.length} questions)</span>
              <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-2 mt-2 max-h-[300px] overflow-y-auto">
              {faqItems.map((item, i) => (
                <Card key={i} className="p-3">
                  {editingIndex === i ? (
                    <div className="space-y-2">
                      <Textarea
                        value={item.question}
                        onChange={(e) => updateItem(i, "question", e.target.value)}
                        className="min-h-[40px] text-sm resize-none font-medium"
                        maxLength={500}
                      />
                      <Textarea
                        value={item.answer}
                        onChange={(e) => updateItem(i, "answer", e.target.value)}
                        className="min-h-[60px] text-sm resize-none"
                        maxLength={1000}
                      />
                      <Button size="sm" variant="outline" onClick={() => setEditingIndex(null)} className="text-xs">Done</Button>
                    </div>
                  ) : (
                    <div onClick={() => setEditingIndex(i)} className="cursor-pointer">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium">Q: {item.question}</p>
                        <Pencil className="h-3 w-3 text-muted-foreground shrink-0 mt-1" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">A: {item.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}
