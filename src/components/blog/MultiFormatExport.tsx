import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, FileText, Code, Hash, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  content: string;
  topic: string;
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function toSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'blog-post';
}

function contentToHTML(content: string): string {
  let html = content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>');
  
  // Wrap consecutive <li> tags in <ul>
  html = html.replace(/((<li>.*<\/li>\n?)+)/g, '<ul>\n$1</ul>\n');
  
  // Wrap remaining text in <p> tags
  const lines = html.split('\n');
  html = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<li') || trimmed.startsWith('</')) return line;
    return `<p>${trimmed}</p>`;
  }).join('\n');
  
  return `<!DOCTYPE html>\n<html>\n<head><meta charset="utf-8"></head>\n<body>\n${html}\n</body>\n</html>`;
}

export function MultiFormatExport({ content, topic }: Props) {
  const { toast } = useToast();
  const slug = toSlug(topic);

  const exports = [
    {
      label: "WordPress HTML",
      icon: Code,
      action: () => {
        downloadFile(contentToHTML(content), `${slug}.html`, "text/html");
        toast({ title: "HTML exported!" });
      },
    },
    {
      label: "Markdown",
      icon: Hash,
      action: () => {
        downloadFile(content, `${slug}.md`, "text/markdown");
        toast({ title: "Markdown exported!" });
      },
    },
    {
      label: "Plain Text",
      icon: FileText,
      action: () => {
        const plain = content
          .replace(/^#{1,3}\s/gm, '')
          .replace(/\*\*(.+?)\*\*/g, '$1')
          .replace(/\*(.+?)\*/g, '$1');
        downloadFile(plain, `${slug}.txt`, "text/plain");
        toast({ title: "Text exported!" });
      },
    },
    {
      label: "JSON (structured)",
      icon: File,
      action: () => {
        const data = { title: topic, content, exportedAt: new Date().toISOString() };
        downloadFile(JSON.stringify(data, null, 2), `${slug}.json`, "application/json");
        toast({ title: "JSON exported!" });
      },
    },
  ];

  if (!content) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Download className="h-3 w-3" /> Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {exports.map(e => (
          <DropdownMenuItem key={e.label} onClick={e.action}>
            <e.icon className="h-3.5 w-3.5 mr-2" />{e.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
