
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Play, 
  Star, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap, 
  Clock,
  CheckCircle,
  ArrowRight,
  Chrome,
  Bot,
  FileText,
  Mail,
  MessageSquare,
  PenTool
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200">
              Join 50,000+ Content Creators
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Professional AI Writing Tools
              </span>
              <br />
              That Actually Work
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Save 10+ hours per week on content creation. Generate high-quality content that converts, 
              humanize AI text, and repurpose content across all platforms.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="text-lg px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              <strong>2.5M+ words generated this month</strong> • No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* Tool Showcase Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              AI Writing Tools for Every Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From affiliate marketing to social media, we've got the AI tools to scale your content creation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Available Tools */}
            <Card className="relative overflow-hidden border-2 border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50">
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Available Now
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                    <Chrome className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Amazon Affiliate Assistant</CardTitle>
                    <CardDescription>Chrome Extension</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Generate Amazon product reviews in minutes. Our most popular tool with 25,000+ active users.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Auto product research
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    SEO-optimized reviews
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Bulk generation
                  </div>
                </div>
                <Link to="/amazon-affiliate-extension">
                  <Button className="w-full">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50">
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Available Now
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">AI Humanizer</CardTitle>
                    <CardDescription>Bypass AI Detection</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Make AI content undetectable. Bypass AI detection tools like GPTZero with advanced humanization.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    99% undetectable rate
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Maintains quality
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Bulk processing
                  </div>
                </div>
                <Link to="/ai-humanizer">
                  <Button className="w-full">
                    Try Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50">
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Available Now
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Content Repurposing Tool</CardTitle>
                    <CardDescription>Multi-Format Content</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Turn 1 piece into 10+ formats. Blog posts to social media in seconds with AI-powered repurposing.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    10+ content formats
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Platform optimization
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Instant generation
                  </div>
                </div>
                <Link to="/content-repurposing">
                  <Button className="w-full">
                    Try Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Coming Soon Tools */}
            <Card className="relative overflow-hidden border-2 border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/50">
              <div className="absolute top-4 right-4">
                <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                  Coming Soon
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Email Generator</CardTitle>
                    <CardDescription>AI-Powered Campaigns</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  AI-powered email campaigns that convert. Join waitlist for early access to advanced email automation.
                </p>
                <Link to="/email-generator">
                  <Button variant="outline" className="w-full">
                    Join Waitlist
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/50">
              <div className="absolute top-4 right-4">
                <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                  Coming Soon
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Social Media Suite</CardTitle>
                    <CardDescription>Multi-Platform Posts</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Create engaging posts across all platforms. Get notified when our comprehensive social suite launches.
                </p>
                <Link to="/social-media-suite">
                  <Button variant="outline" className="w-full">
                    Join Waitlist
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/50">
              <div className="absolute top-4 right-4">
                <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                  Coming Soon
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                    <PenTool className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Blog Content Creator</CardTitle>
                    <CardDescription>SEO-Optimized Articles</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  SEO-optimized blog posts that rank. Be first to try our advanced blog creation tool with keyword research.
                </p>
                <Link to="/blog-content-creator">
                  <Button variant="outline" className="w-full">
                    Join Waitlist
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Trusted by Content Creators Worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of professionals scaling their content with AI
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2.5M+</div>
              <div className="text-muted-foreground">Words Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10+</div>
              <div className="text-muted-foreground">Hours Saved Weekly</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The Amazon Affiliate Assistant has completely transformed my review process. 
                  I'm generating 10x more content in half the time."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    S
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Chen</div>
                    <div className="text-sm text-muted-foreground">Affiliate Marketer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The AI Humanizer is a game-changer. My content passes all detection tools 
                  while maintaining perfect quality and readability."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    M
                  </div>
                  <div>
                    <div className="font-semibold">Marcus Rodriguez</div>
                    <div className="text-sm text-muted-foreground">Content Creator</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Content repurposing used to take hours. Now I turn one blog post into 
                  social media content for the entire week in minutes."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    L
                  </div>
                  <div>
                    <div className="font-semibold">Lisa Thompson</div>
                    <div className="text-sm text-muted-foreground">Social Media Manager</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company Logos */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-8">Used by teams at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-2xl font-bold">TechCorp</div>
              <div className="text-2xl font-bold">MediaFlow</div>
              <div className="text-2xl font-bold">ContentPro</div>
              <div className="text-2xl font-bold">WriteWell</div>
              <div className="text-2xl font-bold">ScaleUp</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose AI Writer Pros?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional-grade AI tools designed for serious content creators who demand quality and efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Generate high-quality content in seconds, not hours. Our AI is optimized for speed without compromising quality.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Undetectable AI</h3>
              <p className="text-muted-foreground">
                Advanced humanization technology ensures your AI content passes all detection tools with 99% success rate.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">SEO Optimized</h3>
              <p className="text-muted-foreground">
                Every piece of content is optimized for search engines, helping you rank higher and drive more traffic.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
              <p className="text-muted-foreground">
                Work together with your team, share templates, and maintain consistent brand voice across all content.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save 10+ Hours Weekly</h3>
              <p className="text-muted-foreground">
                Our users report saving an average of 10+ hours per week on content creation and optimization tasks.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">
                Professional-grade content that matches your brand voice and converts readers into customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Transform Your Content Creation?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join 50,000+ content creators who've already scaled their writing with AI Writer Pros.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="text-lg px-8">
              Start Free Trial - No Credit Card Required
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              Cancel anytime
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              24/7 support
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
