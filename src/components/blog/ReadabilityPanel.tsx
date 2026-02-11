import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Loader2, BookOpen } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";

interface Props {
  content: string;
  onContentUpdate: (content: string) => void;
}

export function ReadabilityPanel({ content, onContentUpdate }: Props) {
  const [targetGrade, setTargetGrade] = useState("Grade 8");
  const { callAI, isLoading } = useBlogAI();

  const stats = useMemo(() => {
    if (!content) return null;
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = content.split(/\s+/).filter(w => w.length > 0);
    const avgSentenceLen = sentences.length > 0 ? Math.round(words.length / sentences.length) : 0;
    const complexWords = words.filter(w => w.replace(/[^aeiouy]/gi, '').length >= 3).length;
    const complexPct = words.length > 0 ? Math.round((complexWords / words.length) * 100) : 0;

    // Simplified Flesch-Kincaid
    const syllables = words.reduce((sum, w) => sum + Math.max(1, w.replace(/[^aeiouy]/gi, '').length), 0);
    const flesch = Math.round(206.835 - 1.015 * avgSentenceLen - 84.6 * (syllables / Math.max(1, words.length)));
    const grade = Math.round(0.39 * avgSentenceLen + 11.8 * (syllables / Math.max(1, words.length)) - 15.59);

    return { flesch: Math.max(0, Math.min(100, flesch)), grade: Math.max(1, grade), avgSentenceLen, complexPct, wordCount: words.length, sentenceCount: sentences.length };
  }, [content]);

  const handleAdjust = async () => {
    const result = await callAI("adjust-readability", { content, targetGrade });
    if (typeof result === "string") onContentUpdate(result);
  };

  if (!content || !stats) return null;

  const assessment = stats.flesch >= 60 ? { color: "text-green-600", bg: "bg-green-500/10", label: "Easy to read" }
    : stats.flesch >= 30 ? { color: "text-yellow-600", bg: "bg-yellow-500/10", label: "Moderate" }
    : { color: "text-red-500", bg: "bg-red-500/10", label: "Difficult" };

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-primary" />
        <h4 className="text-sm font-semibold">Readability</h4>
        <Badge variant="outline" className={`text-[10px] ml-auto ${assessment.color}`}>{assessment.label}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className={`rounded p-2 ${assessment.bg}`}>
          <p className="text-muted-foreground">Flesch Score</p>
          <p className={`text-lg font-bold ${assessment.color}`}>{stats.flesch}</p>
        </div>
        <div className="bg-muted/50 rounded p-2">
          <p className="text-muted-foreground">Grade Level</p>
          <p className="text-lg font-bold">Grade {stats.grade}</p>
        </div>
        <div className="bg-muted/50 rounded p-2">
          <p className="text-muted-foreground">Avg Sentence</p>
          <p className="font-medium">{stats.avgSentenceLen} words</p>
        </div>
        <div className="bg-muted/50 rounded p-2">
          <p className="text-muted-foreground">Complex Words</p>
          <p className="font-medium">{stats.complexPct}%</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Select value={targetGrade} onValueChange={setTargetGrade}>
          <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            {["Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 10", "Grade 12"].map(g => (
              <SelectItem key={g} value={g}>{g}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button size="sm" variant="outline" onClick={handleAdjust} disabled={isLoading("adjust-readability")} className="text-xs whitespace-nowrap">
          {isLoading("adjust-readability") ? <Loader2 className="h-3 w-3 animate-spin" /> : <><Sparkles className="h-3 w-3 mr-1" />Adjust</>}
        </Button>
      </div>
    </Card>
  );
}
