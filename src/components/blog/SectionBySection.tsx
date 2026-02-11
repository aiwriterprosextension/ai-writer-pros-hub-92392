import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Loader2 } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";
import type { OutlineData, OutlineSection } from "./OutlineGenerator";

interface SectionContent {
  id: string;
  title: string;
  content: string;
}

interface Props {
  outline: OutlineData;
  topic: string;
  keywords: string;
  tone: string;
  onContentUpdate: (fullContent: string) => void;
}

export function SectionBySection({ outline, topic, keywords, tone, onContentUpdate }: Props) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [generatedSections, setGeneratedSections] = useState<SectionContent[]>([]);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const { callAI } = useBlogAI();

  const allSections: { id: string; title: string; words: number }[] = [];
  outline.sections.forEach(s => {
    allSections.push({ id: s.id, title: s.title, words: s.suggestedWords });
    s.subsections?.forEach(sub => {
      allSections.push({ id: sub.id, title: sub.title, words: sub.suggestedWords });
    });
  });

  const completedCount = generatedSections.length;
  const totalCount = allSections.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const toggleSection = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const generateSelected = async () => {
    const toGenerate = allSections.filter(s => selectedIds.has(s.id) && !generatedSections.find(g => g.id === s.id));
    const previousContent = generatedSections.map(s => s.content).join("\n\n");

    for (const section of toGenerate) {
      setGeneratingId(section.id);
      const outlineSection = findSection(outline.sections, section.id);
      const result = await callAI("generate-section", {
        sectionTitle: section.title,
        keyPoints: outlineSection?.keyPoints || [],
        suggestedWords: section.words,
        topic,
        keywords,
        tone,
        previousContent: previousContent.substring(0, 500),
      });
      if (typeof result === "string") {
        const newSection = { id: section.id, title: section.title, content: result };
        setGeneratedSections(prev => {
          const updated = [...prev, newSection];
          onContentUpdate(updated.map(s => s.content).join("\n\n"));
          return updated;
        });
      }
    }
    setGeneratingId(null);
    setSelectedIds(new Set());
  };

  const generateAll = async () => {
    const remaining = allSections.filter(s => !generatedSections.find(g => g.id === s.id));
    setSelectedIds(new Set(remaining.map(s => s.id)));
    // Small delay then trigger
    setTimeout(() => generateSelected(), 100);
  };

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-sm">Section-by-Section Builder</h4>
        <Badge variant="outline" className="text-xs">{completedCount} of {totalCount} sections</Badge>
      </div>

      <Progress value={progress} className="h-2" />

      <div className="space-y-1.5">
        {allSections.map(section => {
          const isGenerated = generatedSections.find(g => g.id === section.id);
          const isGenerating = generatingId === section.id;
          return (
            <div key={section.id} className={`flex items-center gap-2 p-2 rounded-md border ${isGenerated ? 'bg-green-500/5 border-green-500/20' : ''}`}>
              <Checkbox
                checked={!!isGenerated || selectedIds.has(section.id)}
                disabled={!!isGenerated || !!generatingId}
                onCheckedChange={() => toggleSection(section.id)}
              />
              <span className={`text-sm flex-1 ${isGenerated ? 'text-muted-foreground line-through' : ''}`}>
                {section.title}
              </span>
              <span className="text-xs text-muted-foreground">~{section.words}w</span>
              {isGenerating && <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />}
              {isGenerated && <Badge variant="secondary" className="text-[10px]">Done</Badge>}
            </div>
          );
        })}
      </div>

      <div className="flex gap-2">
        <Button size="sm" onClick={generateSelected} disabled={selectedIds.size === 0 || !!generatingId} className="flex-1 text-xs">
          {generatingId ? <><Loader2 className="mr-1 h-3 w-3 animate-spin" />Writing...</> : <><Sparkles className="mr-1 h-3 w-3" />Generate Selected</>}
        </Button>
        {completedCount < totalCount && (
          <Button size="sm" variant="secondary" onClick={generateAll} disabled={!!generatingId} className="text-xs">
            Generate All Remaining
          </Button>
        )}
      </div>
    </Card>
  );
}

function findSection(sections: OutlineSection[], id: string): OutlineSection | undefined {
  for (const s of sections) {
    if (s.id === id) return s;
    if (s.subsections) {
      const found = findSection(s.subsections, id);
      if (found) return found;
    }
  }
  return undefined;
}
