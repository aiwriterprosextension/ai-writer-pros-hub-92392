import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share2, Mail, Video, BarChart3 } from "lucide-react";

interface Props {
  content: string;
  visible: boolean;
}

export function ContentRepurposingActions({ content, visible }: Props) {
  const navigate = useNavigate();

  if (!visible || !content) return null;

  const actions = [
    { label: "Social Media Posts", icon: Share2, path: "/dashboard/social-media" },
    { label: "Email Newsletter", icon: Mail, path: "/dashboard/email-generator" },
    { label: "Content Repurposing", icon: BarChart3, path: "/dashboard/content-repurposing" },
  ];

  return (
    <Card className="p-3 mt-3">
      <p className="text-xs font-medium mb-2">Convert this blog post into:</p>
      <div className="flex flex-wrap gap-2">
        {actions.map(a => (
          <Button key={a.label} size="sm" variant="outline" className="text-xs gap-1.5" onClick={() => navigate(a.path)}>
            <a.icon className="h-3.5 w-3.5" />{a.label}
          </Button>
        ))}
      </div>
    </Card>
  );
}
