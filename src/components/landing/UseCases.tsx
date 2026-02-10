import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface UseCase {
  title: string;
  description: string;
  icon: LucideIcon;
  example?: string;
}

interface UseCasesProps {
  title?: string;
  subtitle?: string;
  cases: UseCase[];
}

export function UseCases({ title = "Who Is This For?", subtitle, cases }: UseCasesProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{uc.title}</CardTitle>
                  <CardDescription>{uc.description}</CardDescription>
                </CardHeader>
                {uc.example && (
                  <CardContent>
                    <p className="text-xs text-muted-foreground italic bg-muted/50 p-2 rounded">
                      💡 {uc.example}
                    </p>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
