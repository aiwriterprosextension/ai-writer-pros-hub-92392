import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Twitter, Linkedin, Instagram, Facebook, FileText, Layers, Video, Mic, Image, Music } from "lucide-react";

const allFormats = [
  { id: "twitter", name: "Twitter Thread", icon: Twitter },
  { id: "linkedin", name: "LinkedIn Post", icon: Linkedin },
  { id: "instagram", name: "Instagram Caption", icon: Instagram },
  { id: "facebook", name: "Facebook Post", icon: Facebook },
  { id: "email", name: "Email Newsletter", icon: FileText },
  { id: "blog", name: "Blog Post", icon: Layers },
  { id: "video-script", name: "Video Script", icon: Video },
  { id: "podcast-script", name: "Podcast Script", icon: Mic },
  { id: "pinterest", name: "Pinterest Description", icon: Image },
  { id: "tiktok", name: "TikTok Script", icon: Music },
];

interface FormatRec {
  format: string;
  matchScore: number;
  reason: string;
}

interface Props {
  selectedFormats: string[];
  onToggle: (id: string) => void;
  recommendations: FormatRec[] | null;
}

export function FormatSelector({ selectedFormats, onToggle, recommendations }: Props) {
  const getRecommendation = (id: string) => recommendations?.find((r) => r.format === id);

  return (
    <div>
      <h4 className="font-medium mb-3 flex items-center gap-2">📱 Choose Output Formats</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
        {allFormats.map((f) => {
          const rec = getRecommendation(f.id);
          const score = rec?.matchScore ?? 0;
          const selected = selectedFormats.includes(f.id);
          const Icon = f.icon;
          return (
            <div
              key={f.id}
              onClick={() => onToggle(f.id)}
              className={`p-3 border rounded-lg cursor-pointer transition-all text-sm ${
                selected ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-border hover:border-primary/40"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className="h-4 w-4 shrink-0" />
                <span className="font-medium text-xs">{f.name}</span>
              </div>
              {rec && (
                <div className="flex items-center gap-1 flex-wrap">
                  <Badge variant="outline" className={`text-[10px] px-1 py-0 ${score >= 80 ? "text-green-600 border-green-300" : score >= 60 ? "text-yellow-600 border-yellow-300" : "text-muted-foreground"}`}>
                    {score}%
                  </Badge>
                  {score < 50 && <Badge variant="outline" className="text-[10px] px-1 py-0 text-red-500 border-red-300">Not Recommended</Badge>}
                </div>
              )}
              {rec && <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{rec.reason}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { allFormats };
