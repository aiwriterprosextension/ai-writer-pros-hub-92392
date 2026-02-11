import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sparkles, Loader2, RotateCcw, Expand, BookOpen, Wand2 } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";
import { useToast } from "@/hooks/use-toast";

interface Props {
  content: string;
  onChange: (content: string) => void;
}

export function ContentEditor({ content, onChange }: Props) {
  const [selectedText, setSelectedText] = useState("");
  const [selectionRange, setSelectionRange] = useState<{ start: number; end: number } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { callAI, isLoading } = useBlogAI();
  const { toast } = useToast();

  const handleSelect = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    if (start !== end) {
      setSelectedText(content.substring(start, end));
      setSelectionRange({ start, end });
    }
  };

  const applyEdit = async (instruction: string) => {
    const textToEdit = selectedText || content;
    const result = await callAI("rewrite-section", { content: textToEdit, instruction });
    if (typeof result !== "string") return;

    if (selectionRange && selectedText) {
      const newContent = content.substring(0, selectionRange.start) + result + content.substring(selectionRange.end);
      onChange(newContent);
      setSelectedText("");
      setSelectionRange(null);
    } else {
      onChange(result);
    }
    toast({ title: "Content updated!" });
  };

  const actions = [
    { label: "Regenerate", icon: RotateCcw, instruction: "Rewrite this content with a fresh perspective while maintaining the same key information." },
    { label: "Expand", icon: Expand, instruction: "Expand this content by adding 2-3 more detailed sentences with examples and explanations." },
    { label: "Add Example", icon: BookOpen, instruction: "Add a relevant, practical example to illustrate the main point of this content." },
    { label: "Simplify", icon: Wand2, instruction: "Simplify this content to be easier to understand. Use shorter sentences and simpler vocabulary." },
  ];

  const anyLoading = isLoading("rewrite-section");

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {selectedText ? `Selected: ${selectedText.length} chars` : "Select text for targeted edits, or edit the full content"}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline" disabled={anyLoading} className="text-xs gap-1">
              {anyLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
              AI Edit
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {actions.map(a => (
              <DropdownMenuItem key={a.label} onClick={() => applyEdit(a.instruction)}>
                <a.icon className="h-3.5 w-3.5 mr-2" />{a.label} {selectedText ? "Selection" : "All"}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Textarea
        ref={textareaRef}
        value={content}
        onChange={e => onChange(e.target.value)}
        onSelect={handleSelect}
        className="min-h-[400px] max-h-[600px] font-mono text-sm resize-y"
        placeholder="Your generated content will appear here..."
      />
    </div>
  );
}
