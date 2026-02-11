
import { useState, useEffect, useCallback } from "react";
import { ShoppingCart, X } from "lucide-react";

const socialProofEntries = [
  { name: "Sarah M.", location: "Austin, TX", action: "signed up for the Pro plan", time: "2 minutes ago" },
  { name: "James T.", location: "London, UK", action: "generated 15 blog posts", time: "4 minutes ago" },
  { name: "Maria G.", location: "São Paulo, Brazil", action: "upgraded to Business plan", time: "5 minutes ago" },
  { name: "David L.", location: "Toronto, Canada", action: "humanized 3,200 words", time: "6 minutes ago" },
  { name: "Aisha K.", location: "Dubai, UAE", action: "created an email sequence", time: "8 minutes ago" },
  { name: "Ryan P.", location: "Sydney, Australia", action: "signed up for Pro plan", time: "9 minutes ago" },
  { name: "Elena V.", location: "Berlin, Germany", action: "repurposed content into 12 formats", time: "11 minutes ago" },
  { name: "Michael C.", location: "Chicago, IL", action: "generated 8 Amazon reviews", time: "12 minutes ago" },
  { name: "Priya S.", location: "Mumbai, India", action: "upgraded to Business plan", time: "14 minutes ago" },
  { name: "Lucas R.", location: "Paris, France", action: "created a social media calendar", time: "15 minutes ago" },
  { name: "Olivia W.", location: "New York, NY", action: "signed up for the free trial", time: "17 minutes ago" },
  { name: "Kenji H.", location: "Tokyo, Japan", action: "humanized 5,000 words", time: "18 minutes ago" },
  { name: "Anna B.", location: "Stockholm, Sweden", action: "generated 20 email subject lines", time: "20 minutes ago" },
  { name: "Carlos D.", location: "Mexico City, Mexico", action: "signed up for Pro plan", time: "22 minutes ago" },
  { name: "Fatima A.", location: "Lagos, Nigeria", action: "created 10 social media posts", time: "24 minutes ago" },
  { name: "Tom H.", location: "Denver, CO", action: "upgraded to Business plan", time: "25 minutes ago" },
  { name: "Sophie L.", location: "Amsterdam, Netherlands", action: "repurposed a blog into 8 formats", time: "27 minutes ago" },
  { name: "Ahmed R.", location: "Cairo, Egypt", action: "generated 5 product reviews", time: "29 minutes ago" },
  { name: "Jessica N.", location: "Seattle, WA", action: "signed up for the free trial", time: "31 minutes ago" },
  { name: "Wei Z.", location: "Singapore", action: "humanized 2,800 words", time: "33 minutes ago" },
  { name: "Isabelle F.", location: "Melbourne, Australia", action: "created a 7-email welcome sequence", time: "35 minutes ago" },
  { name: "Daniel K.", location: "Seoul, South Korea", action: "signed up for Pro plan", time: "37 minutes ago" },
  { name: "Natasha P.", location: "Moscow, Russia", action: "generated a content calendar", time: "39 minutes ago" },
  { name: "Chris B.", location: "San Francisco, CA", action: "upgraded to Business plan", time: "40 minutes ago" },
];

export function SocialProofPopup() {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Show first popup after 8 seconds
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 8000);

    return () => clearTimeout(initialTimer);
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;

    // Auto-hide after 5 seconds, then show next after 15-25s interval
    if (visible) {
      const hideTimer = setTimeout(() => {
        setVisible(false);
      }, 5000);

      return () => clearTimeout(hideTimer);
    } else if (currentIndex > 0 || !visible) {
      const delay = 15000 + Math.random() * 10000; // 15-25 seconds
      const showTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % socialProofEntries.length);
        setVisible(true);
      }, delay);

      return () => clearTimeout(showTimer);
    }
  }, [visible, currentIndex, dismissed]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  if (!visible || dismissed) return null;

  const entry = socialProofEntries[currentIndex];

  return (
    <div className="fixed bottom-4 left-4 z-40 animate-in slide-in-from-left-full fade-in duration-500 max-w-xs">
      <div className="bg-card border border-border rounded-lg shadow-lg p-3 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-1.5 right-1.5 text-muted-foreground hover:text-foreground p-0.5 rounded"
          aria-label="Dismiss notifications"
        >
          <X className="h-3 w-3" />
        </button>
        <div className="flex items-start gap-3 pr-4">
          <div className="p-1.5 bg-primary/10 rounded-full shrink-0 mt-0.5">
            <ShoppingCart className="h-3.5 w-3.5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground leading-tight">
              {entry.name} from {entry.location}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {entry.action}
            </p>
            <p className="text-xs text-muted-foreground/70 mt-0.5">
              {entry.time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
