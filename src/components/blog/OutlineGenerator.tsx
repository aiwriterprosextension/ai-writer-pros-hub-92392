import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, Plus, Minus, GripVertical, Check } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";

export interface OutlineSection {
  id: string;
  type: "h2" | "h3";
  title: string;
  suggestedWords: number;
  keyPoints: string[];
  subsections?: OutlineSection[];
}

export interface OutlineData {
  title: string;
  sections: OutlineSection[];
  totalWords: number;
}

interface Props {
  topic: string;
  keywords: string;
  audience: string;
  wordCount: string;
  onOutlineReady: (outline: OutlineData) => void;
  onGenerateFromOutline: (outline: OutlineData) => void;
}

export function OutlineGenerator({ topic, keywords, audience, wordCount, onOutlineReady, onGenerateFromOutline }: Props) {
  const [outline, setOutline] = useState<OutlineData | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { callAI, isLoading } = useBlogAI();

  const handleGenerate = async () => {
    const result = await callAI("generate-outline", { topic, keywords, audience, wordCount: parseInt(wordCount) });
    if (result?.sections) {
      setOutline(result);
      onOutlineReady(result);
    }
  };

  const updateSectionTitle = (sectionId: string, newTitle: string) => {
    if (!outline) return;
    const updateInSections = (sections: OutlineSection[]): OutlineSection[] =>
      sections.map(s => {
        if (s.id === sectionId) return { ...s, title: newTitle };
        if (s.subsections) return { ...s, subsections: updateInSections(s.subsections) };
        return s;
      });
    setOutline({ ...outline, sections: updateInSections(outline.sections) });
  };

  const removeSection = (sectionId: string) => {
    if (!outline) return;
    const removeFromSections = (sections: OutlineSection[]): OutlineSection[] =>
      sections.filter(s => s.id !== sectionId).map(s => ({
        ...s,
        subsections: s.subsections ? removeFromSections(s.subsections) : undefined,
      }));
    setOutline({ ...outline, sections: removeFromSections(outline.sections) });
  };

  const addSection = () => {
    if (!outline) return;
    const newSection: OutlineSection = {
      id: `section-${Date.now()}`,
      type: "h2",
      title: "New Section",
      suggestedWords: 200,
      keyPoints: ["Key point to cover"],
      subsections: [],
    };
    setOutline({ ...outline, sections: [...outline.sections, newSection] });
  };

  if (!outline) {
    return (
      <Button onClick={handleGenerate} disabled={!topic || isLoading("generate-outline")} variant="secondary" className="w-full">
        {isLoading("generate-outline") ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating Outline...</> : <><Sparkles className="mr-2 h-4 w-4" />Generate Outline</>}
      </Button>
    );
  }

  const totalWords = outline.sections.reduce((sum, s) => sum + s.suggestedWords + (s.subsections?.reduce((ss, sub) => ss + sub.suggestedWords, 0) || 0), 0);

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-sm">Content Outline</h4>
        <Badge variant="outline" className="text-xs">~{totalWords} words</Badge>
      </div>

      <div className="space-y-2">
        {outline.sections.map((section, i) => (
          <div key={section.id} className="space-y-1">
            <div className="flex items-center gap-2 group">
              <GripVertical className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100" />
              <span className="text-xs text-muted-foreground font-mono">H2</span>
              {editingId === section.id ? (
                <Input
                  value={section.title}
                  onChange={e => updateSectionTitle(section.id, e.target.value)}
                  onBlur={() => setEditingId(null)}
                  onKeyDown={e => e.key === "Enter" && setEditingId(null)}
                  className="h-7 text-sm"
                  autoFocus
                />
              ) : (
                <span className="text-sm font-medium flex-1 cursor-pointer hover:text-primary" onClick={() => setEditingId(section.id)}>
                  {section.title}
                </span>
              )}
              <Badge variant="secondary" className="text-[10px]">~{section.suggestedWords}w</Badge>
              <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => removeSection(section.id)}>
                <Minus className="h-3 w-3" />
              </Button>
            </div>
            {section.subsections?.map(sub => (
              <div key={sub.id} className="flex items-center gap-2 pl-8 group">
                <span className="text-xs text-muted-foreground font-mono">H3</span>
                {editingId === sub.id ? (
                  <Input
                    value={sub.title}
                    onChange={e => updateSectionTitle(sub.id, e.target.value)}
                    onBlur={() => setEditingId(null)}
                    className="h-6 text-xs"
                    autoFocus
                  />
                ) : (
                  <span className="text-xs flex-1 cursor-pointer hover:text-primary" onClick={() => setEditingId(sub.id)}>
                    {sub.title}
                  </span>
                )}
                <Badge variant="secondary" className="text-[10px]">~{sub.suggestedWords}w</Badge>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={addSection} className="text-xs">
          <Plus className="h-3 w-3 mr-1" />Add Section
        </Button>
        <Button size="sm" onClick={() => onGenerateFromOutline(outline)} className="flex-1 text-xs">
          <Check className="h-3 w-3 mr-1" />Approve & Generate
        </Button>
      </div>
    </Card>
  );
}
