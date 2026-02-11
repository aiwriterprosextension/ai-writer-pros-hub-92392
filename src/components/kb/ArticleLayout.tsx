
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, BookOpen } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { SEOHead } from "@/components/landing/SEOHead";

interface ArticleLayoutProps {
  title: string;
  description: string;
  category: string;
  categoryIcon: LucideIcon;
  readTime: string;
  keywords: string;
  children: React.ReactNode;
  prevArticle?: { title: string; link: string };
  nextArticle?: { title: string; link: string };
}

export function ArticleLayout({
  title,
  description,
  category,
  categoryIcon: CategoryIcon,
  readTime,
  keywords,
  children,
  prevArticle,
  nextArticle,
}: ArticleLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${title} | AI Writer Pros Knowledge Base`}
        description={description}
        keywords={keywords}
        canonical={`https://aiwriterpros.com${window.location.pathname}`}
        ogTitle={title}
        ogDescription={description}
      />
      <Navigation />

      <article className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
            <Link to="/knowledge-base" className="hover:text-foreground transition-colors">Knowledge Base</Link>
            <span>/</span>
            <span className="text-foreground">{category}</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                <CategoryIcon className="h-3 w-3 mr-1" />
                {category}
              </Badge>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {readTime}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">{title}</h1>
            <p className="text-lg text-muted-foreground">{description}</p>
          </header>

          {/* Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-secondary [&_h2]:mt-10 [&_h2]:mb-4
            [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-secondary [&_h3]:mt-8 [&_h3]:mb-3
            [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-secondary [&_h4]:mt-6 [&_h4]:mb-2
            [&_p]:text-foreground/80 [&_p]:leading-relaxed [&_p]:mb-4
            [&_ul]:space-y-2 [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6
            [&_ol]:space-y-2 [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6
            [&_li]:text-foreground/80
            [&_strong]:text-foreground [&_strong]:font-semibold
            [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary/80
            [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-6
            [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
            [&_hr]:border-border [&_hr]:my-8
          ">
            {children}
          </div>

          {/* Navigation */}
          <nav className="flex flex-col sm:flex-row justify-between gap-4 mt-12 pt-8 border-t border-border">
            {prevArticle ? (
              <Button variant="outline" asChild className="justify-start">
                <Link to={prevArticle.link}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {prevArticle.title}
                </Link>
              </Button>
            ) : <div />}
            {nextArticle ? (
              <Button variant="outline" asChild className="justify-end">
                <Link to={nextArticle.link}>
                  {nextArticle.title}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : <div />}
          </nav>

          {/* Back to KB */}
          <div className="text-center mt-8">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/knowledge-base">
                <BookOpen className="mr-2 h-4 w-4" />
                Back to Knowledge Base
              </Link>
            </Button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
