
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, FileText, Mail, MessageSquare, PenTool, Chrome, Shield, Zap, Clock, TrendingUp, User } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const toolMeta: Record<string, { label: string; icon: React.ElementType; color: string; path: string }> = {
  humanize: { label: "AI Humanizer", icon: Shield, color: "text-blue-500", path: "/ai-humanizer" },
  email: { label: "Email Generator", icon: Mail, color: "text-red-500", path: "/email-generator" },
  social: { label: "Social Media", icon: MessageSquare, color: "text-pink-500", path: "/social-media-suite" },
  blog: { label: "Blog Creator", icon: PenTool, color: "text-indigo-500", path: "/blog-content-creator" },
  amazon: { label: "Amazon Reviews", icon: Chrome, color: "text-amber-500", path: "/amazon-affiliate-extension" },
  repurpose: { label: "Content Repurposing", icon: FileText, color: "text-green-500", path: "/content-repurposing" },
};

export default function Dashboard() {
  const { user } = useAuth();

  const { data: generations = [], isLoading } = useQuery({
    queryKey: ["generations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("generations")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    },
  });

  // Stats
  const totalGenerations = generations.length;
  const toolCounts: Record<string, number> = {};
  generations.forEach((g: any) => {
    toolCounts[g.tool] = (toolCounts[g.tool] || 0) + 1;
  });

  const today = new Date().toDateString();
  const todayCount = generations.filter((g: any) => new Date(g.created_at).toDateString() === today).length;

  const thisWeek = new Date();
  thisWeek.setDate(thisWeek.getDate() - 7);
  const weekCount = generations.filter((g: any) => new Date(g.created_at) >= thisWeek).length;

  const mostUsedTool = Object.entries(toolCounts).sort((a, b) => b[1] - a[1])[0];

  const quickTools = [
    { key: "repurpose", label: "Repurpose Content", icon: FileText, path: "/content-repurposing", gradient: "from-green-500 to-teal-500" },
    { key: "humanize", label: "AI Humanizer", icon: Shield, path: "/ai-humanizer", gradient: "from-blue-500 to-purple-500" },
    { key: "email", label: "Email Generator", icon: Mail, path: "/email-generator", gradient: "from-red-500 to-pink-500" },
    { key: "social", label: "Social Media", icon: MessageSquare, path: "/social-media-suite", gradient: "from-pink-500 to-rose-500" },
    { key: "blog", label: "Blog Creator", icon: PenTool, path: "/blog-content-creator", gradient: "from-indigo-500 to-purple-500" },
    { key: "amazon", label: "Amazon Reviews", icon: Chrome, path: "/amazon-affiliate-extension", gradient: "from-amber-500 to-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.email?.split("@")[0] || "User"}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Generations</p>
                    <p className="text-3xl font-bold">{totalGenerations}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Today</p>
                    <p className="text-3xl font-bold">{todayCount}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">This Week</p>
                    <p className="text-3xl font-bold">{weekCount}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Most Used Tool</p>
                    <p className="text-lg font-bold truncate">
                      {mostUsedTool ? toolMeta[mostUsedTool[0]]?.label || mostUsedTool[0] : "—"}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                    {mostUsedTool ? (() => {
                      const Icon = toolMeta[mostUsedTool[0]]?.icon || FileText;
                      return <Icon className="h-6 w-6 text-amber-500" />;
                    })() : <FileText className="h-6 w-6 text-amber-500" />}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Access Tools */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {quickTools.map((tool) => (
                <Link key={tool.key} to={tool.path}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                    <CardContent className="pt-5 pb-4 text-center">
                      <div className={`w-10 h-10 bg-gradient-to-r ${tool.gradient} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                        <tool.icon className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-xs font-medium">{tool.label}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Account + Recent Generations */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Account Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-sm truncate">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium text-sm">
                    {user?.created_at ? format(new Date(user.created_at), "MMM d, yyyy") : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Plan</p>
                  <Badge variant="secondary">Free</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tools Used</p>
                  <p className="font-medium text-sm">{Object.keys(toolCounts).length} / 6</p>
                </div>
                <Link to="/pricing">
                  <Button className="w-full mt-2" variant="outline" size="sm">
                    Upgrade Plan
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Generations */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Generations
                </CardTitle>
                <CardDescription>Your latest AI-generated content</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                  </div>
                ) : generations.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="mb-2">No generations yet</p>
                    <p className="text-sm">Use any AI tool to see your history here</p>
                  </div>
                ) : (
                  <div className="overflow-auto max-h-[400px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tool</TableHead>
                          <TableHead>Input</TableHead>
                          <TableHead className="text-right">Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {generations.slice(0, 20).map((gen: any) => {
                          const meta = toolMeta[gen.tool] || { label: gen.tool, icon: FileText, color: "text-muted-foreground", path: "#" };
                          const Icon = meta.icon;
                          return (
                            <TableRow key={gen.id}>
                              <TableCell>
                                <Link to={meta.path} className="flex items-center gap-2 hover:underline">
                                  <Icon className={`h-4 w-4 ${meta.color}`} />
                                  <span className="text-sm font-medium">{meta.label}</span>
                                </Link>
                              </TableCell>
                              <TableCell className="max-w-[250px] truncate text-sm text-muted-foreground">
                                {gen.input_preview || "—"}
                              </TableCell>
                              <TableCell className="text-right text-sm text-muted-foreground whitespace-nowrap">
                                {format(new Date(gen.created_at), "MMM d, h:mm a")}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
