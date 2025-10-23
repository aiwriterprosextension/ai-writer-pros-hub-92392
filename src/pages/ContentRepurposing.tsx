
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { FileText, ArrowRight, CheckCircle, Zap, Star, Users, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import { useState } from "react";

export default function ContentRepurposing() {
  const [inputContent, setInputContent] = useState("");
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const contentFormats = [
    { id: 'twitter', name: 'Twitter Thread', icon: Twitter, description: '5-10 tweet thread' },
    { id: 'linkedin', name: 'LinkedIn Post', icon: Linkedin, description: 'Professional format' },
    { id: 'instagram', name: 'Instagram Captions', icon: Instagram, description: 'Multiple captions' },
    { id: 'facebook', name: 'Facebook Post', icon: Facebook, description: 'Engaging format' },
    { id: 'email', name: 'Email Newsletter', icon: FileText, description: 'Newsletter section' },
    { id: 'bullets', name: 'Bullet Points', icon: FileText, description: 'Key takeaways' },
  ];

  const handleFormatToggle = (formatId: string) => {
    setSelectedFormats(prev => 
      prev.includes(formatId) 
        ? prev.filter(f => f !== formatId)
        : [...prev, formatId]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              📝 Turn 1 Piece Into 10+ Formats
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                Content Repurposing Tool
              </span>
              <br />
              Maximize Your Content ROI
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transform one piece of content into multiple formats optimized for different platforms. 
              Turn blog posts into social media content, newsletters, and more in seconds.
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center">
                <Zap className="h-4 w-4 text-green-600 mr-2" />
                10+ Formats
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-2" />
                Platform Optimized
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                5,000+ Users
              </div>
            </div>
          </div>

          {/* Interactive Tool */}
          <div className="max-w-6xl mx-auto">
            <Card className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-500" />
                    Original Content
                  </h3>
                  <Textarea 
                    placeholder="Paste your blog post, article, or any content you want to repurpose..."
                    value={inputContent}
                    onChange={(e) => setInputContent(e.target.value)}
                    className="min-h-[300px] resize-none"
                  />
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">Select Output Formats:</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {contentFormats.map((format) => (
                        <div
                          key={format.id}
                          onClick={() => handleFormatToggle(format.id)}
                          className={`p-3 border rounded-lg cursor-pointer transition-all ${
                            selectedFormats.includes(format.id)
                              ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                              : 'border-border hover:border-green-300'
                          }`}
                        >
                          <div className="flex items-center mb-1">
                            <format.icon className="h-4 w-4 mr-2" />
                            <span className="text-sm font-medium">{format.name}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{format.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={handleGenerate}
                    disabled={!inputContent || selectedFormats.length === 0 || isGenerating}
                    className="w-full mt-6"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Zap className="mr-2 h-4 w-4 animate-spin" />
                        Generating Content...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Repurpose Content ({selectedFormats.length} formats)
                      </>
                    )}
                  </Button>
                </div>

                {/* Output Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-green-500" />
                    Repurposed Content
                  </h3>
                  
                  <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    {selectedFormats.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Select formats to see your repurposed content here</p>
                      </div>
                    ) : (
                       selectedFormats.map((formatId) => {
                         const format = contentFormats.find(f => f.id === formatId);
                         if (!format) return null;
                         const FormatIcon = format.icon;
                         return (
                           <Card key={formatId} className="p-4">
                             <div className="flex items-center justify-between mb-2">
                               <div className="flex items-center">
                                 <FormatIcon className="h-4 w-4 mr-2" />
                                 <span className="font-medium">{format.name}</span>
                              </div>
                              <Button variant="outline" size="sm">Copy</Button>
                            </div>
                             <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                               {isGenerating ? (
                                 <div className="animate-pulse">Generating {format.name.toLowerCase()}...</div>
                               ) : (
                                 inputContent ? `Your ${format.name.toLowerCase()} will appear here...` : 'Add content to generate'
                               )}
                            </div>
                          </Card>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Platform-Optimized Content Creation
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI understands the unique requirements of each platform 
              and optimizes your content accordingly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <Twitter className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Social Media Posts</CardTitle>
                <CardDescription>Optimized for engagement and reach</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Twitter threads
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    LinkedIn posts
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Instagram captions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Facebook posts
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Email {`&`} Newsletters</CardTitle>
                <CardDescription>Perfect for email marketing campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Newsletter sections
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Email sequences
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Subject lines
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Call-to-actions
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Quick Formats</CardTitle>
                <CardDescription>Bite-sized content for busy audiences</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Key takeaways
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Bullet points
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Quotes {`&`} snippets
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Infographic text
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Content Creators Love Our Tool
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Save 8+ Hours Weekly</h3>
                    <p className="text-muted-foreground">Stop manually adapting content for different platforms. Generate all formats in minutes.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Maintain Consistent Voice</h3>
                    <p className="text-muted-foreground">Your brand voice stays consistent across all platforms while being optimized for each.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Maximize Content ROI</h3>
                    <p className="text-muted-foreground">Get 10x more value from each piece of content by reaching audiences across all platforms.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-green-600 mb-2">10x</div>
                <div className="text-muted-foreground">More content from each piece</div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span>1 Blog Post</span>
                  <ArrowRight className="h-4 w-4" />
                  <span className="text-green-600 font-medium">5 Twitter Threads</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>1 Article</span>
                  <ArrowRight className="h-4 w-4" />
                  <span className="text-green-600 font-medium">3 LinkedIn Posts</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>1 Guide</span>
                  <ArrowRight className="h-4 w-4" />
                  <span className="text-green-600 font-medium">1 Email Series</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>1 Case Study</span>
                  <ArrowRight className="h-4 w-4" />
                  <span className="text-green-600 font-medium">10 Social Posts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Start Repurposing Content Today
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Transform your content strategy and reach more audiences 
            with our intelligent repurposing tool.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="text-lg px-8">
              <FileText className="mr-2 h-5 w-5" />
              Try Content Repurposing Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              View Examples
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              Free trial included
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              10+ output formats
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              Instant results
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
