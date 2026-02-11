import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ScheduleItem {
  format: string;
  bestDay: string;
  bestTime: string;
  reasoning: string;
}

interface Props {
  formats: string[];
  visible: boolean;
}

export function SchedulingSuggestions({ formats, visible }: Props) {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  if (!visible || formats.length === 0) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { action: "repurpose-schedule", formats },
      });
      if (error) throw error;
      const parsed = typeof data.result === "string" ? JSON.parse(data.result.replace(/```json\n?|\n?```/g, "")) : data.result;
      setSchedule(parsed);
    } catch (e: any) {
      toast({ title: "Failed", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const exportICS = () => {
    const now = new Date();
    const dayMap: Record<string, number> = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
    let ics = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//WriterPros//EN\n";
    schedule.forEach((s) => {
      const dayOffset = ((dayMap[s.bestDay] || 0) - now.getDay() + 7) % 7;
      const date = new Date(now);
      date.setDate(date.getDate() + dayOffset);
      const dateStr = date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
      ics += `BEGIN:VEVENT\nDTSTART:${dateStr}\nSUMMARY:Post ${s.format}\nDESCRIPTION:${s.reasoning}\nEND:VEVENT\n`;
    });
    ics += "END:VCALENDAR";
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "posting-schedule.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  const dayColors: Record<string, string> = { Monday: "bg-blue-100 dark:bg-blue-900", Tuesday: "bg-green-100 dark:bg-green-900", Wednesday: "bg-yellow-100 dark:bg-yellow-900", Thursday: "bg-purple-100 dark:bg-purple-900", Friday: "bg-pink-100 dark:bg-pink-900", Saturday: "bg-orange-100 dark:bg-orange-900", Sunday: "bg-red-100 dark:bg-red-900" };

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium flex items-center gap-2"><Calendar className="h-4 w-4" />📅 Posting Schedule</h4>
        <Button onClick={handleGenerate} disabled={loading} variant="outline" size="sm">
          {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
          <span className="ml-1">Suggest</span>
        </Button>
      </div>
      {schedule.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {schedule.map((s) => (
              <div key={s.format} className={`p-3 rounded-lg ${dayColors[s.bestDay] || "bg-muted"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs capitalize">{s.format.replace("-", " ")}</Badge>
                </div>
                <p className="text-sm font-medium">{s.bestDay} at {s.bestTime}</p>
                <p className="text-xs text-muted-foreground">{s.reasoning}</p>
              </div>
            ))}
          </div>
          <Button onClick={exportICS} variant="outline" size="sm" className="w-full text-xs">
            <Calendar className="h-3 w-3 mr-1" />Export to Calendar (.ics)
          </Button>
        </>
      )}
    </Card>
  );
}
