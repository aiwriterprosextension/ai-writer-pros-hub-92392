
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Lightbulb, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const STORAGE_KEY = "awp-exit-intent-shown";

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 5 && !sessionStorage.getItem(STORAGE_KEY) && !localStorage.getItem(STORAGE_KEY)) {
      setOpen(true);
      sessionStorage.setItem(STORAGE_KEY, "true");
      localStorage.setItem(STORAGE_KEY, "true");
    }
  }, []);

  useEffect(() => {
    // Don't show if already shown
    if (localStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000); // Only activate after 5s on page

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Lightbulb className="h-5 w-5 text-primary" />
            Wait — Don't Leave Empty-Handed!
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Grab our free <strong>AI Content Best Practices Guide</strong> — expert tips to create content that ranks, converts, and sounds human.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm font-medium mb-2">What you'll learn:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✅ How to bypass AI detection every time</li>
              <li>✅ SEO strategies that actually work in 2025</li>
              <li>✅ Pro tips for all 6 AI writing tools</li>
              <li>✅ Content workflows that save 10+ hours/week</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <Button asChild size="lg" className="w-full">
              <Link to="/best-practices" onClick={() => setOpen(false)}>
                <Lightbulb className="mr-2 h-4 w-4" />
                Get the Free Guide
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/auth" onClick={() => setOpen(false)}>
                Or Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            No email required • Instant access • 100% free
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
