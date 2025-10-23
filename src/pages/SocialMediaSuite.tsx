
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageSquare, ArrowRight, CheckCircle, Users, Star, Clock, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";

export default function SocialMediaSuite() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200">
            📱 Coming Soon - Join the Waitlist
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Social Media Suite
            </span>
            <br />
            Multi-Platform Content Creation
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Create engaging posts across all social platforms with AI that understands each platform's unique requirements. 
            From Instagram stories to LinkedIn articles - we've got you covered.
          </p>
          
          {/* Waitlist Form */}
          <Card className="max-w-md mx-auto mb-12">
            <CardHeader>
              <CardTitle className="text-center">Join the Waitlist</CardTitle>
              <CardDescription className="text-center">
                Be among the first to access our comprehensive social media suite
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input placeholder="Enter your email address" type="email" />
                <Button className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Join Waitlist
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Early access + exclusive beta features
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              1,800+ on waitlist
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Launching Q3 2024
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-2" />
              Beta testing available
            </div>
          </div>
        </div>
      </section>

      {/* Platform Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Supported Social Platforms
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create optimized content for every major social media platform with platform-specific AI optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Instagram className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Instagram</h3>
                <p className="text-sm text-muted-foreground">Stories, Reels, Feed posts, Captions with hashtags</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Twitter className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Twitter/X</h3>
                <p className="text-sm text-muted-foreground">Tweets, Threads, Replies, Viral content</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Linkedin className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">LinkedIn</h3>
                <p className="text-sm text-muted-foreground">Professional posts, Articles, Company updates</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Facebook className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Facebook</h3>
                <p className="text-sm text-muted-foreground">Posts, Stories, Events, Community content</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
