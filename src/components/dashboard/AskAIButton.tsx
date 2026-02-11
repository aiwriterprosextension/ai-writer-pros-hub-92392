import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface AskAIButtonProps {
  question: string;
  onAsk: (question: string) => void;
}

export function AskAIButton({ question, onAsk }: AskAIButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => onAsk(question)}
      className="text-[10px] gap-1 h-6 px-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-950/30"
    >
      <Sparkles className="h-3 w-3" /> Ask AI
    </Button>
  );
}
