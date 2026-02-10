
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

export function MockToolPreview({ toolName, dashboardPath, gradient, children }: MockToolPreviewProps) {
  return (
    <div className="relative">
      <Card className="p-6 overflow-hidden">
        <div className="pointer-events-none opacity-60 blur-[1px]">
          {children}
        </div>
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg">
          <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center mb-4`}>
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2">Try {toolName} Free</h3>
          <p className="text-muted-foreground mb-4 text-center max-w-md px-4">
            Sign up for free to access the full {toolName} tool with all features.
          </p>
          <div className="flex gap-3">
            <Button asChild size="lg">
              <Link to="/auth">Get Started Free</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to={dashboardPath}>Go to Tool →</Link>
            </Button>
          </div>
          <Badge variant="secondary" className="mt-3">No credit card required</Badge>
        </div>
      </Card>
    </div>
  );
}
