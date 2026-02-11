
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Shield, Mail, MessageSquare, PenTool, Chrome, FileText,
  BarChart3, User, Settings, LogOut, Menu, X, CreditCard
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.webp";

const sidebarItems = [
  { label: "Overview", path: "/dashboard", icon: BarChart3 },
  { type: "separator" as const, label: "AI Tools" },
  { label: "AI Humanizer", path: "/dashboard/ai-humanizer", icon: Shield },
  { label: "Email Generator", path: "/dashboard/email-generator", icon: Mail },
  { label: "Social Media", path: "/dashboard/social-media", icon: MessageSquare },
  { label: "Blog Creator", path: "/dashboard/blog-creator", icon: PenTool },
  { label: "Amazon Reviews", path: "/dashboard/amazon-reviews", icon: Chrome },
  { label: "Content Repurposing", path: "/dashboard/content-repurposing", icon: FileText },
  { type: "separator" as const, label: "Account" },
  { label: "Profile", path: "/dashboard/profile", icon: User },
  { label: "Billing", path: "/pricing", icon: CreditCard },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar-background border-r border-sidebar-border flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="AI Writer Pros" className="h-7 w-auto" />
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {sidebarItems.map((item, i) => {
            if ('type' in item && item.type === 'separator') {
              return (
                <div key={i} className="pt-4 pb-2 px-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">{item.label}</span>
                </div>
              );
            }
            const Icon = item.icon!;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path!}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-sidebar-border space-y-3">
          <div className="flex items-center gap-3 px-1">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-bold text-sidebar-foreground">
              {user?.email?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.email?.split("@")[0]}</p>
              <p className="text-xs text-sidebar-foreground/50 truncate">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="flex-1 justify-start text-sidebar-foreground/70" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" /> Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="h-16 border-b border-border flex items-center px-4 lg:px-8 gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
          <Link to="/">
            <Button variant="outline" size="sm">← Back to Site</Button>
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
