import { Star, Users, Shield, Award } from "lucide-react";

interface TrustBarProps {
  stats: { label: string; value: string; icon?: "star" | "users" | "shield" | "award" }[];
}

const icons = { star: Star, users: Users, shield: Shield, award: Award };

export function TrustBar({ stats }: TrustBarProps) {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 border-y border-border bg-muted/20">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-8 sm:gap-16">
        {stats.map((stat, i) => {
          const Icon = stat.icon ? icons[stat.icon] : null;
          return (
            <div key={i} className="flex items-center gap-2 text-center">
              {Icon && <Icon className="h-5 w-5 text-primary" />}
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
