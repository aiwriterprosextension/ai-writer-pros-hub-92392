import { CheckCircle, XCircle } from "lucide-react";

interface ComparisonRow {
  feature: string;
  us: boolean | string;
  competitor1: boolean | string;
  competitor2?: boolean | string;
}

interface ComparisonTableProps {
  title?: string;
  ourName: string;
  competitor1Name: string;
  competitor2Name?: string;
  rows: ComparisonRow[];
}

export function ComparisonTable({
  title = "Why Choose Us",
  ourName,
  competitor1Name,
  competitor2Name,
  rows,
}: ComparisonTableProps) {
  const renderCell = (val: boolean | string) => {
    if (typeof val === "string") return <span className="text-sm">{val}</span>;
    return val ? (
      <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
    ) : (
      <XCircle className="h-5 w-5 text-muted-foreground/40 mx-auto" />
    );
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-4 font-semibold">Feature</th>
                <th className="text-center p-4 font-semibold text-primary">{ourName} ⭐</th>
                <th className="text-center p-4 font-semibold text-muted-foreground">{competitor1Name}</th>
                {competitor2Name && (
                  <th className="text-center p-4 font-semibold text-muted-foreground">{competitor2Name}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                  <td className="p-4 font-medium">{row.feature}</td>
                  <td className="p-4 text-center">{renderCell(row.us)}</td>
                  <td className="p-4 text-center">{renderCell(row.competitor1)}</td>
                  {competitor2Name && (
                    <td className="p-4 text-center">{renderCell(row.competitor2 ?? false)}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
