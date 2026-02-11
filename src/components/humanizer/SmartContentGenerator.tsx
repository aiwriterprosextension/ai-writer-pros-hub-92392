import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sparkles, Loader2, Lightbulb } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Props {
  onContentGenerated: (content: string) => void;
  visible: boolean;
}

export function SmartContentGenerator({ onContentGenerated, visible }: Props) {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState("blog-post");
  const [length, setLength] = useState("300-600");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  if (!visible) return null;

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({ title: "Topic required", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { action: "humanizer-generate-content", topic, contentType, length },
      });
      if (error) throw error;
      onContentGenerated(data.result || "");
      setOpen(false);
      setTopic("");
      toast({ title: "Content generated!", description: "Now you can humanize it." });
    } catch (e: any) {
      toast({ title: "Failed", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full border-dashed" size="sm">
          <Lightbulb className="mr-2 h-4 w-4" />Need AI Content to Humanize?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5" />Generate AI Content</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Topic</Label>
            <Input placeholder="e.g., Benefits of remote work" value={topic} onChange={(e) => setTopic(e.target.value)} />
          </div>
          <div>
            <Label>Content Type</Label>
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {[{ v: "blog-post", l: "Blog Post" }, { v: "email", l: "Email" }, { v: "social-post", l: "Social Post" }, { v: "academic", l: "Academic" }, { v: "product-description", l: "Product Description" }].map((t) => (
                  <SelectItem key={t.v} value={t.v}>{t.l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Desired Length</Label>
            <Select value={length} onValueChange={setLength}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="100-300">Short (100-300 words)</SelectItem>
                <SelectItem value="300-600">Medium (300-600 words)</SelectItem>
                <SelectItem value="600-1000">Long (600-1000 words)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleGenerate} disabled={loading || !topic.trim()} className="w-full">
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Sparkles className="mr-2 h-4 w-4" />Generate Content</>}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
