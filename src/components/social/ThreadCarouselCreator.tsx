import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2, Copy, Twitter, Linkedin } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";
import { useToast } from "@/hooks/use-toast";

interface ThreadCarouselCreatorProps {
  content: string;
}

export function ThreadCarouselCreator({ content }: ThreadCarouselCreatorProps) {
  const [threadEnabled, setThreadEnabled] = useState(false);
  const [carouselEnabled, setCarouselEnabled] = useState(false);
  const [threadData, setThreadData] = useState<any>(null);
  const [carouselData, setCarouselData] = useState<any>(null);
  const { callAI, isLoading } = useBlogAI();
  const { toast } = useToast();

  const generateThread = async () => {
    const result = await callAI("social-thread-creator", { content, platform: "twitter" });
    if (result && typeof result === "object") setThreadData(result);
    else if (typeof result === "string") {
      try { setThreadData(JSON.parse(result)); } catch { /* ignore */ }
    }
  };

  const generateCarousel = async () => {
    const result = await callAI("social-thread-creator", { content, platform: "linkedin" });
    if (result && typeof result === "object") setCarouselData(result);
    else if (typeof result === "string") {
      try { setCarouselData(JSON.parse(result)); } catch { /* ignore */ }
    }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!" });
  };

  if (!content) return null;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2">
          <Switch checked={threadEnabled} onCheckedChange={v => { setThreadEnabled(v); if (v && !threadData) generateThread(); }} />
          <Label className="flex items-center gap-1 text-sm"><Twitter className="h-4 w-4" />📱 Twitter Thread</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={carouselEnabled} onCheckedChange={v => { setCarouselEnabled(v); if (v && !carouselData) generateCarousel(); }} />
          <Label className="flex items-center gap-1 text-sm"><Linkedin className="h-4 w-4" />📊 LinkedIn Carousel</Label>
        </div>
      </div>

      {threadEnabled && (
        <Card className="p-4 space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2"><Twitter className="h-4 w-4" />Twitter Thread Preview</h4>
          {isLoading("social-thread-creator") ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Generating thread...</div>
          ) : threadData?.tweets ? (
            <div className="space-y-2">
              {threadData.tweets.map((t: any) => (
                <div key={t.number} className="flex gap-2 p-2 bg-muted/50 rounded-lg">
                  <Badge variant="outline" className="shrink-0 h-6 w-6 flex items-center justify-center rounded-full p-0 text-xs">{t.number}</Badge>
                  <div className="flex-1">
                    <p className="text-sm">{t.text}</p>
                    <span className={`text-xs ${(t.charCount || t.text.length) > 280 ? "text-destructive" : "text-muted-foreground"}`}>
                      {t.charCount || t.text.length}/280
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="shrink-0 h-7 w-7 p-0" onClick={() => copy(t.text)}><Copy className="h-3 w-3" /></Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => copy(threadData.tweets.map((t: any) => `${t.number}/ ${t.text}`).join("\n\n"))}>
                <Copy className="h-3 w-3 mr-1" />Copy Full Thread
              </Button>
            </div>
          ) : null}
        </Card>
      )}

      {carouselEnabled && (
        <Card className="p-4 space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2"><Linkedin className="h-4 w-4" />LinkedIn Carousel Preview</h4>
          {isLoading("social-thread-creator") ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Generating slides...</div>
          ) : carouselData?.slides ? (
            <div className="grid sm:grid-cols-2 gap-2">
              {carouselData.slides.map((s: any) => (
                <div key={s.number} className="p-3 bg-muted/50 rounded-lg border">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">Slide {s.number}</Badge>
                  </div>
                  <h5 className="font-semibold text-sm">{s.title}</h5>
                  <p className="text-xs text-muted-foreground mt-1">{s.content}</p>
                </div>
              ))}
            </div>
          ) : null}
        </Card>
      )}
    </div>
  );
}
