import { blogCategories } from "@/data/blog-categories";

const categoryGradients: Record<string, string> = {
  "ai-writing-fundamentals": "from-blue-600 via-indigo-500 to-purple-600",
  "ai-tools-reviews": "from-amber-500 via-orange-500 to-red-500",
  "content-strategy": "from-emerald-500 via-teal-500 to-cyan-600",
  "writing-tips": "from-pink-500 via-rose-500 to-red-500",
  "ai-news-trends": "from-violet-500 via-purple-500 to-indigo-600",
};

const categoryPatterns: Record<string, string> = {
  "ai-writing-fundamentals": "🧠",
  "ai-tools-reviews": "🔧",
  "content-strategy": "🎯",
  "writing-tips": "✏️",
  "ai-news-trends": "📰",
};

interface BlogFeaturedImageProps {
  categorySlug: string;
  title: string;
  isPillar: boolean;
  alt: string;
  size?: "sm" | "md" | "lg";
}

export function BlogFeaturedImage({ categorySlug, title, isPillar, alt, size = "md" }: BlogFeaturedImageProps) {
  const gradient = categoryGradients[categorySlug] || "from-primary to-secondary";
  const emoji = categoryPatterns[categorySlug] || "📝";
  const category = blogCategories.find((c) => c.slug === categorySlug);
  const Icon = category?.icon;

  const sizeClasses = {
    sm: "aspect-video",
    md: "aspect-video",
    lg: "aspect-[2/1]",
  };

  return (
    <div
      className={`relative ${sizeClasses[size]} w-full bg-gradient-to-br ${gradient} rounded-lg overflow-hidden`}
      role="img"
      aria-label={alt}
    >
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), 
                           radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 40%),
                           radial-gradient(circle at 60% 80%, rgba(255,255,255,0.12) 0%, transparent 45%)`,
        }} />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center p-4 text-center">
        {isPillar && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1">
            Comprehensive Guide
          </span>
        )}
        <span className={`${size === "sm" ? "text-2xl" : "text-4xl"} mb-2`}>{emoji}</span>
        {Icon && (
          <Icon className={`${size === "sm" ? "h-4 w-4" : "h-5 w-5"} text-white/60 mb-2`} />
        )}
        <p className={`text-white font-semibold leading-tight max-w-[80%] ${
          size === "sm" ? "text-[10px] line-clamp-2" : size === "md" ? "text-xs line-clamp-2" : "text-sm line-clamp-3"
        }`}>
          {title}
        </p>
      </div>
    </div>
  );
}