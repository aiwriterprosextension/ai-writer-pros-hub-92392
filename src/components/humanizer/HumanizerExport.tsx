import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, Copy, FileDown, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Props {
  content: string;
  visible: boolean;
}

export function HumanizerExport({ content, visible }: Props) {
  const { toast } = useToast();
  const navigate = useNavigate();
  if (!visible || !content) return null;

  const copyPlain = () => {
    navigator.clipboard.writeText(content);
    toast({ title: "Copied!" });
  };

  const downloadTxt = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `humanized-content-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Downloaded!" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm"><FileDown className="h-4 w-4 mr-1" />Export</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={copyPlain}><Copy className="h-4 w-4 mr-2" />Copy to Clipboard</DropdownMenuItem>
        <DropdownMenuItem onClick={downloadTxt}><Download className="h-4 w-4 mr-2" />Download as .txt</DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/dashboard/blog-creator")}><ArrowRight className="h-4 w-4 mr-2" />Send to Blog Creator</DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/dashboard/email-generator")}><ArrowRight className="h-4 w-4 mr-2" />Send to Email Generator</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
