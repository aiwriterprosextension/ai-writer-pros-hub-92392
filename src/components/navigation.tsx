
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="font-bold text-xl">Writer Pros</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
                <span>Tools</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/amazon-affiliate-extension" className="flex items-center">
                    🏆 Amazon Affiliate Assistant
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/ai-humanizer" className="flex items-center">
                    🤖 AI Humanizer
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/content-repurposing" className="flex items-center">
                    📝 Content Repurposing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  📧 Email Generator (Coming Soon)
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  📱 Social Media Suite (Coming Soon)
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  📚 Blog Content Creator (Coming Soon)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link to="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Blog
            </Link>
            <Link to="/support" className="text-sm font-medium hover:text-primary transition-colors">
              Support
            </Link>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {user ? (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-1" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/auth">Sign In</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/auth">Start Free Trial</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              <Link to="/amazon-affiliate-extension" className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                🏆 Amazon Affiliate Assistant
              </Link>
              <Link to="/ai-humanizer" className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                🤖 AI Humanizer
              </Link>
              <Link to="/content-repurposing" className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                📝 Content Repurposing
              </Link>
              <Link to="/features" className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                Features
              </Link>
              <Link to="/pricing" className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                Pricing
              </Link>
              <Link to="/blog" className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                Blog
              </Link>
              <Link to="/support" className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                Support
              </Link>
              <div className="flex flex-col space-y-2 px-3 py-2">
                {user ? (
                  <>
                    <Button variant="ghost" size="sm" className="justify-start" asChild>
                      <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start" onClick={() => { handleSignOut(); setIsOpen(false); }}>
                      <LogOut className="h-4 w-4 mr-1" /> Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" className="justify-start" asChild>
                      <Link to="/auth" onClick={() => setIsOpen(false)}>Sign In</Link>
                    </Button>
                    <Button size="sm" className="justify-start" asChild>
                      <Link to="/auth" onClick={() => setIsOpen(false)}>Start Free Trial</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
