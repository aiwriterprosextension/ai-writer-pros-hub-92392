import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, Copy, Calendar, FileDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  results: Record<string, string>;
  visible: boolean;
}

export function BatchExport({ results, visible }: Props) {
  const { toast } = useToast();
  if (!visible || Object.keys(results).length === 0) return null;

  const copyAll = () => {
    const text = Object.entries(results).map(([k, v]) => `=== ${k.toUpperCase()} ===\n\n${v}`).join("\n\n---\n\n");
    navigator.clipboard.writeText(text);
    toast({ title: "All content copied!" });
  };

  const downloadAll = () => {
    Object.entries(results).forEach(([format, content]) => {
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${format}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    });
    toast({ title: "Files downloaded!", description: `${Object.keys(results).length} files saved.` });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm"><FileDown className="h-4 w-4 mr-1" />Export All</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={downloadAll}><Download className="h-4 w-4 mr-2" />Download All Files</DropdownMenuItem>
        <DropdownMenuItem onClick={copyAll}><Copy className="h-4 w-4 mr-2" />Copy All to Clipboard</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
