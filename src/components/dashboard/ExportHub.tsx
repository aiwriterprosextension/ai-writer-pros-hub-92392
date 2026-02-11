import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, Copy, FileText, File, FileDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExportHubProps {
  content: string;
  filename?: string;
}

export function ExportHub({ content, filename = "export" }: ExportHubProps) {
  const { toast } = useToast();

  if (!content) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    toast({ title: "Copied!", description: "Content copied to clipboard with formatting." });
    savePreference("clipboard");
  };

  const downloadTxt = () => {
    const blob = new Blob([content], { type: "text/plain" });
    triggerDownload(blob, `${filename}.txt`);
    toast({ title: "Downloaded!", description: "Text file saved." });
    savePreference("txt");
  };

  const downloadDocx = () => {
    // Simple .doc compatible HTML
    const html = `<html><head><meta charset="UTF-8"></head><body><pre style="font-family: Arial, sans-serif; white-space: pre-wrap;">${content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre></body></html>`;
    const blob = new Blob([html], { type: "application/msword" });
    triggerDownload(blob, `${filename}.doc`);
    toast({ title: "Downloaded!", description: "Document file saved." });
    savePreference("docx");
  };

  const downloadPdf = () => {
    // Use browser print to PDF
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`<html><head><title>${filename}</title><style>body{font-family:Arial,sans-serif;padding:40px;white-space:pre-wrap;line-height:1.6;}</style></head><body>${content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</body></html>`);
      printWindow.document.close();
      printWindow.print();
    }
    toast({ title: "Print/PDF", description: "Use your browser's print dialog to save as PDF." });
    savePreference("pdf");
  };

  const triggerDownload = (blob: Blob, name: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const savePreference = (format: string) => {
    localStorage.setItem("export_preference", format);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs gap-1">
          <Download className="h-3 w-3" /> Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={copyToClipboard}>
          <Copy className="h-4 w-4 mr-2" /> Copy to Clipboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadTxt}>
          <FileText className="h-4 w-4 mr-2" /> Download as .txt
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadDocx}>
          <File className="h-4 w-4 mr-2" /> Download as .doc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadPdf}>
          <FileDown className="h-4 w-4 mr-2" /> Save as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
