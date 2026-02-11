import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sparkles, Loader2, ChevronDown, Copy, Search } from "lucide-react";
import { useBlogAI } from "@/hooks/useBlogAI";
import { useToast } from "@/hooks/use-toast";

interface SEOData {
  seoScore: number;
  keywordStrategy: string;
  contentLength: string;
  keywordDensity: string | number;
  readabilityScore: number;
  readabilityGrade: string;
  suggestions: string[];
  metaDescriptions?: string[];
  titleVariations?: string[];
  snippetOptimization?: string;
  overallAssessment: string;
}

interface Props {
  topic: string;
  keywords: string;
  wordCount: string;
  content: string;
  outlineSummary?: string;
}

export function SEOAnalysisPanel({ topic, keywords, wordCount, content, outlineSummary }: Props) {
  const [data, setData] = useState<SEOData | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const { callAI, isLoading } = useBlogAI();
  const { toast } = useToast();

  const isPostGeneration = !!content;

  const handleAnalyze = async () => {
    const result = await callAI("seo-analysis", {
      topic, keywords, wordCount: parseInt(wordCount), content, outlineSummary,
    });
    if (result?.seoScore !== undefined) setData(result);
  };

  const scoreColor = (score: number) => score >= 80 ? "text-green-600" : score >= 50 ? "text-yellow-600" : "text-red-500";
  const scoreBg = (score: number) => score >= 80 ? "bg-green-500" : score >= 50 ? "bg-yellow-500" : "bg-red-500";

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="overflow-hidden">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-muted/50">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">SEO Analysis</span>
            {data && <Badge variant="outline" className={`text-xs ${scoreColor(data.seoScore)}`}>{data.seoScore}/100</Badge>}
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-3 pb-3 space-y-3">
          <Button size="sm" onClick={handleAnalyze} disabled={!topic || isLoading("seo-analysis")} className="w-full text-xs">
            {isLoading("seo-analysis") ? <><Loader2 className="mr-1 h-3 w-3 animate-spin" />Analyzing...</> : <><Sparkles className="mr-1 h-3 w-3" />{isPostGeneration ? "Analyze Content" : "Predict SEO Score"}</>}
          </Button>

          {data && (
            <div className="space-y-3">
              <div className="text-center">
                <div className={`text-3xl font-bold ${scoreColor(data.seoScore)}`}>{data.seoScore}</div>
                <p className="text-xs text-muted-foreground">SEO Score</p>
                <Progress value={data.seoScore} className={`h-1.5 mt-1 [&>div]:${scoreBg(data.seoScore)}`} />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-muted/50 rounded p-2">
                  <p className="text-muted-foreground">Keywords</p>
                  <p className="font-medium">{data.keywordStrategy}</p>
                </div>
                <div className="bg-muted/50 rounded p-2">
                  <p className="text-muted-foreground">Length</p>
                  <p className="font-medium">{data.contentLength}</p>
                </div>
                <div className="bg-muted/50 rounded p-2">
                  <p className="text-muted-foreground">Readability</p>
                  <p className="font-medium">{data.readabilityGrade}</p>
                </div>
                <div className="bg-muted/50 rounded p-2">
                  <p className="text-muted-foreground">Density</p>
                  <p className="font-medium">{data.keywordDensity}%</p>
                </div>
              </div>

              {data.suggestions?.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs font-medium">Suggestions</p>
                  {data.suggestions.map((s, i) => (
                    <p key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                      <span className="text-primary">•</span> {s}
                    </p>
                  ))}
                </div>
              )}

              {data.metaDescriptions && data.metaDescriptions.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs font-medium">Meta Descriptions</p>
                  {data.metaDescriptions.map((m, i) => (
                    <div key={i} className="flex items-start gap-1 text-xs bg-muted/50 p-2 rounded">
                      <span className="flex-1">{m} <span className="text-muted-foreground">({m.length} chars)</span></span>
                      <Button variant="ghost" size="icon" className="h-5 w-5 shrink-0" onClick={() => { navigator.clipboard.writeText(m); toast({ title: "Copied!" }); }}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {data.titleVariations && data.titleVariations.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs font-medium">Title Variations</p>
                  {data.titleVariations.map((t, i) => (
                    <div key={i} className="flex items-center gap-1 text-xs bg-muted/50 p-2 rounded">
                      <span className="flex-1">{t} <span className="text-muted-foreground">({t.length} chars)</span></span>
                      <Button variant="ghost" size="icon" className="h-5 w-5 shrink-0" onClick={() => { navigator.clipboard.writeText(t); toast({ title: "Copied!" }); }}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
