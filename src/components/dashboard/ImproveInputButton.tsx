import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, Check, Pencil } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ImproveInputButtonProps {
  fieldType: string;
  currentValue: string;
  toolName: string;
  onAccept: (value: string) => void;
}

export function ImproveInputButton({ fieldType, currentValue, toolName, onAccept }: ImproveInputButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [editedSuggestion, setEditedSuggestion] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleImprove = async () => {
    if (!currentValue.trim()) {
      toast({ title: "Enter some text first", description: "Type something in the field before improving it.", variant: "destructive" });
      return;
    }
    setIsOpen(true);
    setIsLoading(true);
    setSuggestion("");
    setIsEditing(false);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { action: "improve-input", fieldType, userInput: currentValue, toolName },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setSuggestion(data.result || "");
      setEditedSuggestion(data.result || "");
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to improve input", variant: "destructive" });
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUse = () => {
    onAccept(isEditing ? editedSuggestion : suggestion);
    setIsOpen(false);
    toast({ title: "Input updated!", description: "AI-improved text applied." });
  };

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleImprove}
        className="text-xs gap-1 h-7 px-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-950/30"
      >
        <Sparkles className="h-3 w-3" /> Improve
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              AI-Improved {fieldType}
            </DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
              <span className="ml-2 text-sm text-muted-foreground">Improving your input...</span>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Original:</p>
                <p className="text-sm bg-muted/50 p-2 rounded line-through opacity-60">{currentValue}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Improved:</p>
                {isEditing ? (
                  <Textarea
                    value={editedSuggestion}
                    onChange={(e) => setEditedSuggestion(e.target.value)}
                    className="min-h-[80px] text-sm"
                  />
                ) : (
                  <p className="text-sm bg-purple-50 dark:bg-purple-950/20 p-2 rounded border border-purple-200 dark:border-purple-800">{suggestion}</p>
                )}
              </div>
            </div>
          )}

          {!isLoading && (
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                <Pencil className="h-3 w-3 mr-1" /> {isEditing ? "Preview" : "Edit"}
              </Button>
              <Button size="sm" onClick={handleUse}>
                <Check className="h-3 w-3 mr-1" /> Use This
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
