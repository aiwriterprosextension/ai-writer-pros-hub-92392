
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEOHead } from "@/components/landing/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Lightbulb, Clock, Users, Award, Heart } from "lucide-react";
import founderPhoto from "@/assets/founder-photo.jpg";

export default function AboutUs() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About AI Writer Pros",
    "description": "Learn about the founder behind AI Writer Pros and the mission to empower content creators with intelligent writing tools.",
    "url": "https://aiwriterpros.com/about"
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="About Us – AI Writer Pros | Built by a 20+ Year IT Veteran"
        description="Meet the founder behind AI Writer Pros. With over 20 years of IT experience, we're on a mission to make professional content creation accessible to everyone."
        canonical="https://aiwriterpros.com/about"
        ogTitle="About AI Writer Pros"
        ogDescription="Built by a 20+ year IT veteran who saw content creators struggling with AI tools that felt robotic."
        schema={schema}
      />
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                  Our Story
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  Built by a Creator,{" "}
                  <span className="text-primary">for Creators</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  AI Writer Pros wasn't born in a boardroom. It was born out of frustration — watching talented 
                  content creators waste hours wrestling with AI tools that produced generic, robotic content 
                  that nobody wanted to read.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  After more than two decades in the IT industry, I knew technology could do better. 
                  So I built the tools I wished existed — ones that actually understand the craft of writing 
                  and help creators scale without sacrificing their voice.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl" />
                  <img
                    src={founderPhoto}
                    alt="Founder of AI Writer Pros"
                    className="relative rounded-2xl shadow-2xl w-80 h-auto object-cover border-2 border-border"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl px-4 py-3 shadow-lg">
                    <p className="font-semibold text-sm">Founder & Creator</p>
                    <p className="text-xs text-muted-foreground">20+ Years in IT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why I Built This */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why I Built AI Writer Pros</h2>
              <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
            </div>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                For over 20 years, I've worked across every corner of the IT landscape — from infrastructure 
                and software development to emerging technologies and automation. Throughout my career, I've 
                seen firsthand how the right technology can transform the way people work.
              </p>
              <p>
                When AI writing tools started appearing, I was excited. But the more I used them, the more 
                disappointed I became. The content they produced was flat, repetitive, and instantly 
                recognizable as machine-generated. Content creators — bloggers, marketers, affiliate 
                publishers — deserved better.
              </p>
              <p>
                I saw an opportunity to combine my deep technical expertise with a genuine understanding of 
                what writers actually need. The result is AI Writer Pros: a suite of purpose-built tools 
                that don't just generate words — they help you create content that connects, converts, 
                and sounds unmistakably <em>human</em>.
              </p>
              <p>
                This isn't a faceless corporation. It's a one-person mission to democratize professional 
                content creation and give every creator — whether you're just starting out or managing 
                a content empire — the tools to compete at the highest level.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold mb-4">What Drives Us</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every feature, every update, every decision is guided by these core principles.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Heart, title: "Creator-First", desc: "Every tool is designed from the perspective of the person using it — not the algorithm." },
                { icon: Shield, title: "Quality Over Quantity", desc: "We'd rather help you write one great piece than ten mediocre ones." },
                { icon: Lightbulb, title: "Continuous Innovation", desc: "With 20+ years in tech, I'm always exploring what's next to keep you ahead of the curve." },
                { icon: Clock, title: "Time is Everything", desc: "Your time is valuable. Our tools are built to save you hours every single week." },
                { icon: Users, title: "Accessible to All", desc: "Professional-grade content creation shouldn't require a professional budget." },
                { icon: Award, title: "Authenticity Matters", desc: "AI should enhance your voice, not replace it. That's our promise." },
              ].map((item) => (
                <Card key={item.title} className="border-border/50 bg-card/50 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Content?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of creators who are already saving hours and producing better content with AI Writer Pros.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/auth">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/features">Explore Features</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
