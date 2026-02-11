import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
interface MockToolPreviewProps {
  toolName: string;
  dashboardPath: string;
  gradient: string;
  children: React.ReactNode;
}
export function MockToolPreview({
  toolName,
  dashboardPath,
  gradient,
  children
}: MockToolPreviewProps) {
  return <div className="relative">
      <Card className="p-6 overflow-hidden">
        <div className="pointer-events-none opacity-60 blur-[1px]">
          {children}
        </div>
        
      </Card>
    </div>;
}