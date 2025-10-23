
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Chrome, Star, CheckCircle, ArrowRight, Download, Users, TrendingUp } from "lucide-react";

export default function AmazonAffiliateExtension() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
                🏆 Most Popular Tool - 25,000+ Active Users
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Amazon Affiliate Assistant
                </span>
                <br />
                Chrome Extension
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Generate compelling Amazon product reviews in minutes, not hours. 
                Our AI-powered Chrome extension automates research, writes SEO-optimized reviews, 
                and helps you scale your affiliate marketing business.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="text-lg px-8">
                  <Chrome className="mr-2 h-5 w-5" />
                  Add to Chrome - Free
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Download className="mr-2 h-5 w-5" />
                  Download Guide
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  4.9/5 Rating
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  25,000+ Users
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                  Free to Use
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 border-2 border-amber-200 dark:border-amber-800">
                <div className="text-center">
                  <Chrome className="h-16 w-16 mx-auto mb-4 text-amber-600" />
                  <h3 className="text-xl font-semibold mb-2">Chrome Extension</h3>
                  <p className="text-muted-foreground mb-4">
                    Works directly in your browser for seamless Amazon research and review generation.
                  </p>
                  <div className="bg-background rounded-lg p-4 text-left text-sm">
                    <div className="font-mono text-green-600 mb-2"># Product Analysis Complete</div>
                    <div className="text-muted-foreground">
                      ✓ Price comparison: $29.99 (15% below avg)<br/>
                      ✓ Reviews analyzed: 1,247 reviews<br/>
                      ✓ Rating: 4.3/5 stars<br/>
                      ✓ SEO keywords: wireless earbuds, bluetooth
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need for Affiliate Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our Chrome extension includes all the tools you need to create compelling, 
              SEO-optimized Amazon product reviews that convert.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Auto Product Research</CardTitle>
                <CardDescription>Intelligent data extraction and analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Price history analysis
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Competitor comparison
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Review sentiment analysis
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Feature extraction
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <CardTitle>SEO-Optimized Reviews</CardTitle>
                <CardDescription>Content that ranks and converts</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Keyword optimization
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Meta descriptions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Structured content
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Internal linking
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Chrome className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Bulk Generation</CardTitle>
                <CardDescription>Scale your affiliate business</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Multiple products at once
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Template customization
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Export to WordPress
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    CSV export options
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get started in minutes with our simple 3-step process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Install Extension</h3>
              <p className="text-muted-foreground">
                Add our Chrome extension to your browser with one click. No setup required.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Amazon</h3>
              <p className="text-muted-foreground">
                Navigate to any Amazon product page and click our extension icon.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Generate Review</h3>
              <p className="text-muted-foreground">
                Get a complete, SEO-optimized product review in under 60 seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Join 25,000+ Affiliate Marketers
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start generating professional Amazon product reviews today. 
            Our extension is completely free to use.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="text-lg px-8">
              <Chrome className="mr-2 h-5 w-5" />
              Add to Chrome - Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              View Demo
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              Free forever
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              No registration required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              Works instantly
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
