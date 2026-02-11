
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Twitter, Linkedin, Youtube, Github } from "lucide-react";
import logo from "@/assets/logo.webp";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <Link to="/">
                  <img src={logo} alt="AI Writer Pros" className="h-8 w-auto" />
                </Link>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                Professional AI writing tools that help content creators scale their writing. 
                Join 50,000+ creators saving 10+ hours per week on content creation.
              </p>
              
              {/* Newsletter Signup */}
              <div className="space-y-2">
                <h4 className="font-semibold">Stay Updated</h4>
                <div className="flex space-x-2 max-w-sm">
                  <Input 
                    placeholder="Enter your email" 
                    type="email"
                    className="flex-1"
                  />
                  <Button>Subscribe</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Get the latest updates on new tools and features.
                </p>
              </div>
            </div>

            {/* AI Tools */}
            <div>
              <h4 className="font-semibold mb-4">AI Tools</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/amazon-affiliate-extension" className="text-muted-foreground hover:text-foreground transition-colors">
                    Amazon Affiliate Assistant
                  </Link>
                </li>
                <li>
                  <Link to="/ai-humanizer" className="text-muted-foreground hover:text-foreground transition-colors">
                    AI Humanizer
                  </Link>
                </li>
                <li>
                  <Link to="/content-repurposing" className="text-muted-foreground hover:text-foreground transition-colors">
                    Content Repurposing
                  </Link>
                </li>
                <li>
                  <Link to="/email-generator" className="text-muted-foreground hover:text-foreground transition-colors">
                    Email Generator
                  </Link>
                </li>
                <li>
                  <Link to="/social-media-suite" className="text-muted-foreground hover:text-foreground transition-colors">
                    Social Media Suite
                  </Link>
                </li>
                <li>
                  <Link to="/blog-content-creator" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog Content Creator
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/knowledge-base" className="text-muted-foreground hover:text-foreground transition-colors">
                    Knowledge Base
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog & Updates
                  </Link>
                </li>
                <li>
                  <Link to="/knowledge-base#support" className="text-muted-foreground hover:text-foreground transition-colors">
                    Support Center
                  </Link>
                </li>
                <li>
                  <Link to="/best-practices" className="text-muted-foreground hover:text-foreground transition-colors">
                    Best Practices Guide
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2025 AI Writer Pros. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
