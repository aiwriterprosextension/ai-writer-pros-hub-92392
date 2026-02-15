import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";
import { blogPosts, type BlogPost } from "@/data/blog-posts";
import { blogCategories } from "@/data/blog-categories";
import { BlogFeaturedImage } from "./BlogFeaturedImage";

interface FromOurBlogProps {
  postIds: string[];
  heading?: string;
}

export function FromOurBlog({ postIds, heading = "From Our Blog" }: FromOurBlogProps) {
  const posts = postIds
    .map((id) => blogPosts.find((p) => p.id === id))
    .filter((p): p is BlogPost => !!p);

  if (posts.length === 0) return null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">{heading}</h2>
          <p className="text-muted-foreground">Expert guides to help you get the most from AI writing tools</p>
        </div>
        <div className={`grid gap-6 ${posts.length === 2 ? "sm:grid-cols-2 max-w-4xl mx-auto" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
          {posts.map((post) => (
            <Link key={post.id} to={`/blog/${post.categorySlug}/${post.slug}`}>
              <Card className="h-full overflow-hidden group hover:shadow-lg transition-shadow">
                <BlogFeaturedImage
                  categorySlug={post.categorySlug}
                  title={post.title}
                  isPillar={post.isPillar}
                  alt={post.featuredImageAlt}
                  size="sm"
                />
                <CardContent className="p-5">
                  <Badge variant="outline" className="mb-2 text-[10px] uppercase tracking-wider">
                    {blogCategories.find((c) => c.slug === post.categorySlug)?.name}
                  </Badge>
                  <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                    <span className="text-primary font-medium flex items-center gap-1">Read More <ArrowRight className="h-3 w-3" /></span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}