import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Step {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface HowItWorksProps {
  steps: Step[];
  ctaText?: string;
  onCtaClick?: () => void;
}

export function HowItWorks({ steps, ctaText, onCtaClick }: HowItWorksProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground">Get results in just a few simple steps</p>
        </div>
        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-border" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 relative z-10">
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </div>
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        {ctaText && (
          <div className="text-center mt-12">
            <Button size="lg" onClick={onCtaClick}>
              {ctaText} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
