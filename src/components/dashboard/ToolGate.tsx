
import { useSubscription } from "@/hooks/useSubscription";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

interface ToolGateProps {
  toolId: string;
  toolName: string;
  children: React.ReactNode;
}

export function ToolGate({ toolId, toolName, children }: ToolGateProps) {
  const { canAccessTool, plan } = useSubscription();

  if (canAccessTool(toolId)) {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="max-w-md text-center">
        <CardContent className="pt-8 pb-6 space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Lock className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold">{toolName} — Pro Feature</h2>
          <p className="text-muted-foreground text-sm">
            This tool requires a Pro or Business plan. Upgrade to unlock all 6 AI writing tools.
          </p>
          <p className="text-xs text-muted-foreground">
            Current plan: <span className="font-medium capitalize">{plan}</span>
          </p>
          <Link to="/pricing">
            <Button className="mt-2">View Plans & Start Free Trial</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
