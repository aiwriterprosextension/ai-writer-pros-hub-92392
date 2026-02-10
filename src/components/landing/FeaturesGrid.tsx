import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
  gradient: string;
}

interface FeaturesGridProps {
  title: string;
  subtitle?: string;
  features: Feature[];
}

export function FeaturesGrid({ title, subtitle, features }: FeaturesGridProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 bg-gradient-to-r ${f.gradient} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{f.title}</CardTitle>
                  <CardDescription>{f.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {f.bullets.map((b, j) => (
                      <li key={j} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
