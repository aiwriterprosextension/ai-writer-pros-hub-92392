import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Loader2, Clock } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";

const platformColors: Record<string, string> = {
  twitter: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  linkedin: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  instagram: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  facebook: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
};

interface ContentCalendarProps {
  topic: string;
  platforms: string[];
}

export function ContentCalendar({ topic, platforms }: ContentCalendarProps) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const { callAI, isLoading } = useBlogAI();

  const handleGenerate = async () => {
    setOpen(true);
    const result = await callAI("social-calendar", { topic, platforms });
    if (result && typeof result === "object") setData(result);
    else if (typeof result === "string") {
      try { setData(JSON.parse(result)); } catch { /* ignore */ }
    }
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={handleGenerate} disabled={!topic}>
        <CalendarDays className="h-4 w-4 mr-1" />📅 When Should I Post?
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Posting Schedule
            </DialogTitle>
          </DialogHeader>
          {isLoading("social-calendar") ? (
            <div className="flex items-center justify-center py-12"><Loader2 className="h-6 w-6 animate-spin" /></div>
          ) : data ? (
            <div className="space-y-4">
              <div className="space-y-3">
                {(data.schedule || []).map((s: any, i: number) => (
                  <Card key={i} className="p-3">
                    <div className="flex items-center gap-3">
                      <Badge className={platformColors[s.platform] || ""}>{s.platform}</Badge>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 font-medium text-sm">
                          <Clock className="h-3.5 w-3.5" />
                          {s.bestDay}, {s.bestTime}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{s.reasoning}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              {data.contentMixStrategy && (
                <div className="bg-muted/50 rounded-lg p-3">
                  <h4 className="font-semibold text-sm mb-1">Content Mix Strategy</h4>
                  <p className="text-xs text-muted-foreground">{data.contentMixStrategy}</p>
                </div>
              )}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
