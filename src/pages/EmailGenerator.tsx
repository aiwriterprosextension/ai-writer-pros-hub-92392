
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight, CheckCircle, Users, Star, Clock } from "lucide-react";

export default function EmailGenerator() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200">
            📧 Coming Soon - Join the Waitlist
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              Email Generator
            </span>
            <br />
            AI-Powered Email Campaigns
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Create high-converting email campaigns that engage your audience and drive results. 
            From welcome sequences to promotional emails, our AI writes emails that convert.
          </p>
          
          {/* Waitlist Form */}
          <Card className="max-w-md mx-auto mb-12">
            <CardHeader>
              <CardTitle className="text-center">Join the Waitlist</CardTitle>
              <CardDescription className="text-center">
                Be the first to access our Email Generator when it launches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input placeholder="Enter your email address" type="email" />
                <Button className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Join Waitlist
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Get early access + 50% launch discount
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              2,500+ on waitlist
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Launching Q2 2024
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-2" />
              Early access perks
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What's Coming in Email Generator
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI-powered email creation tools designed for marketers, creators, and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Campaign Templates</CardTitle>
                <CardDescription>Pre-built templates for every occasion</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Welcome sequences
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Product launches
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Newsletter templates
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Sales sequences
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <CardTitle>A/B Test Generation</CardTitle>
                <CardDescription>Multiple variations for optimal performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Subject line variants
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Content variations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    CTA optimization
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Performance tracking
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Personalization</CardTitle>
                <CardDescription>Dynamic content for each subscriber</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Name personalization
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Behavioral triggers
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Segment targeting
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Dynamic content
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
