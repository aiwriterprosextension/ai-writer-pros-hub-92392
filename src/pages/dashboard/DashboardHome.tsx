
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, FileText, Mail, MessageSquare, PenTool, Chrome, Shield, Zap, Clock, TrendingUp, User, Star, Lightbulb, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const toolMeta: Record<string, { label: string; icon: React.ElementType; color: string; path: string }> = {
  humanize: { label: "AI Humanizer", icon: Shield, color: "text-blue-500", path: "/dashboard/ai-humanizer" },
  email: { label: "Email Generator", icon: Mail, color: "text-red-500", path: "/dashboard/email-generator" },
  social: { label: "Social Media", icon: MessageSquare, color: "text-pink-500", path: "/dashboard/social-media" },
  blog: { label: "Blog Creator", icon: PenTool, color: "text-indigo-500", path: "/dashboard/blog-creator" },
  amazon: { label: "Amazon Reviews", icon: Chrome, color: "text-amber-500", path: "/dashboard/amazon-reviews" },
  repurpose: { label: "Content Repurposing", icon: FileText, color: "text-green-500", path: "/dashboard/content-repurposing" },
};

export default function DashboardHome() {
  const { user } = useAuth();
  const [workflowTip, setWorkflowTip] = useState<string>("");
  const [tipLoading, setTipLoading] = useState(false);

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

  const { data: favorites = [] } = useQuery({
    queryKey: ["favorites-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tool_configurations")
        .select("*")
        .eq("is_favorite", true)
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

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

  // Usage chart data
  const chartData = Object.entries(toolMeta).map(([key, meta]) => ({
    name: meta.label.split(" ")[0],
    count: toolCounts[key] || 0,
  }));

  // AI workflow suggestion
  useEffect(() => {
    if (generations.length < 3 || workflowTip) return;
    setTipLoading(true);
    const toolSequence = generations.slice(0, 10).map((g: any) => g.tool).join(", ");
    supabase.functions.invoke("ai-assistant", {
      body: {
        action: "chat",
        currentTool: "dashboard",
        messages: [{ role: "user", content: `Based on my recent tool usage pattern: ${toolSequence}, suggest a quick 1-sentence workflow tip to optimize my content creation.` }],
      },
    }).then(({ data }) => {
      if (data?.result) setWorkflowTip(data.result);
    }).finally(() => setTipLoading(false));
  }, [generations.length]);

  const quickTools = [
    { key: "repurpose", label: "Repurpose Content", icon: FileText, path: "/dashboard/content-repurposing", gradient: "from-green-500 to-teal-500" },
    { key: "humanize", label: "AI Humanizer", icon: Shield, path: "/dashboard/ai-humanizer", gradient: "from-blue-500 to-purple-500" },
    { key: "email", label: "Email Generator", icon: Mail, path: "/dashboard/email-generator", gradient: "from-red-500 to-pink-500" },
    { key: "social", label: "Social Media", icon: MessageSquare, path: "/dashboard/social-media", gradient: "from-pink-500 to-rose-500" },
    { key: "blog", label: "Blog Creator", icon: PenTool, path: "/dashboard/blog-creator", gradient: "from-indigo-500 to-purple-500" },
    { key: "amazon", label: "Amazon Reviews", icon: Chrome, path: "/dashboard/amazon-reviews", gradient: "from-amber-500 to-orange-500" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.email?.split("@")[0] || "User"}
        </p>
      </div>

      {/* AI Workflow Tip */}
      {(workflowTip || tipLoading) && (
        <Card className="mb-6 border-dashed border-2 border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/10">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold mb-1">Suggested Workflow</p>
                {tipLoading ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-3 w-3 animate-spin" /> Analyzing your usage patterns...
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">{workflowTip}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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

      {/* Favorites + Usage Chart */}
      {(favorites.length > 0 || totalGenerations > 0) && (
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Favorites */}
          {favorites.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-yellow-500" /> Quick Access Favorites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {favorites.slice(0, 5).map((fav: any) => {
                    const meta = toolMeta[fav.tool] || { label: fav.tool, icon: FileText, path: "#" };
                    const Icon = meta.icon;
                    return (
                      <Link key={fav.id} to={meta.path}>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{fav.favorite_name || "Untitled"}</p>
                            <p className="text-xs text-muted-foreground">{meta.label}</p>
                          </div>
                          <Badge variant="secondary" className="text-[10px]">
                            {format(new Date(fav.created_at), "MMM d")}
                          </Badge>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Usage Chart */}
          {totalGenerations > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5" /> Usage by Tool
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                    <YAxis tick={{ fontSize: 11 }} className="text-muted-foreground" />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Account + Recent Generations */}
      <div className="grid lg:grid-cols-3 gap-6">
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

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your last 20 AI generations across all tools</CardDescription>
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
  );
}
