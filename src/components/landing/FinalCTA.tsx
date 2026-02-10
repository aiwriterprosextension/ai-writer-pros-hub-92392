import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface FinalCTAProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink?: string;
  onCtaClick?: () => void;
  benefits?: string[];
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export function FinalCTA({
  headline,
  subheadline,
  ctaText,
  ctaLink = "/auth",
  onCtaClick,
  benefits = ["Free to try", "No credit card required", "Instant results"],
  secondaryCtaText,
  secondaryCtaLink = "/pricing",
}: FinalCTAProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{headline}</h2>
        <p className="text-xl text-muted-foreground mb-8">{subheadline}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          {onCtaClick ? (
            <Button size="lg" className="text-lg px-8" onClick={onCtaClick}>
              {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Button size="lg" className="text-lg px-8" asChild>
              <Link to={ctaLink}>
                {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}
          {secondaryCtaText && (
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link to={secondaryCtaLink}>{secondaryCtaText}</Link>
            </Button>
          )}
        </div>
        <div className="flex items-center justify-center flex-wrap gap-6 text-sm text-muted-foreground">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
