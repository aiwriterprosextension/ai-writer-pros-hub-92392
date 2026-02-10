import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, CheckCircle } from "lucide-react";

interface ProblemSolutionProps {
  problems: string[];
  solutions: string[];
  problemTitle?: string;
  solutionTitle?: string;
}

export function ProblemSolution({
  problems,
  solutions,
  problemTitle = "The Challenge",
  solutionTitle = "The Solution",
}: ProblemSolutionProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why You Need This Tool</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-destructive/30 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <XCircle className="h-6 w-6" />
                {problemTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {problems.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-green-500/30 bg-green-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle className="h-6 w-6" />
                {solutionTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {solutions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
