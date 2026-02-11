import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Clock, Loader2, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface HistoryFavoritesProps {
  tool: string;
  currentConfig: Record<string, any>;
  onLoadConfig: (config: Record<string, any>) => void;
}

export function HistoryFavorites({ tool, currentConfig, onLoadConfig }: HistoryFavoritesProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [saveName, setSaveName] = useState("");
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const { data: configs = [] } = useQuery({
    queryKey: ["tool-configs", tool],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tool_configurations")
        .select("*")
        .eq("tool", tool)
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const saveMutation = useMutation({
    mutationFn: async ({ isFavorite, name }: { isFavorite: boolean; name?: string }) => {
      const { error } = await supabase.from("tool_configurations").insert({
        user_id: user!.id,
        tool,
        config: currentConfig,
        is_favorite: isFavorite,
        favorite_name: name || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tool-configs", tool] });
      toast({ title: "Saved!" });
      setSaveDialogOpen(false);
      setSaveName("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("tool_configurations").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tool-configs", tool] });
      toast({ title: "Deleted" });
    },
  });

  const saveAsConfig = () => {
    saveMutation.mutate({ isFavorite: false });
  };

  const favorites = configs.filter((c: any) => c.is_favorite);
  const history = configs.filter((c: any) => !c.is_favorite).slice(0, 10);

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {/* Load Previous */}
      {history.length > 0 && (
        <Select onValueChange={(id) => {
          const cfg = configs.find((c: any) => c.id === id);
          if (cfg) {
            onLoadConfig(cfg.config as Record<string, any>);
            toast({ title: "Settings loaded" });
          }
        }}>
          <SelectTrigger className="w-[200px] h-9 text-xs">
            <Clock className="h-3 w-3 mr-1" />
            <SelectValue placeholder="Load previous settings" />
          </SelectTrigger>
          <SelectContent>
            {history.map((c: any) => (
              <SelectItem key={c.id} value={c.id}>
                <span className="text-xs">{format(new Date(c.created_at), "MMM d, h:mm a")}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Favorites dropdown */}
      {favorites.length > 0 && (
        <Select onValueChange={(id) => {
          const cfg = favorites.find((c: any) => c.id === id);
          if (cfg) {
            onLoadConfig(cfg.config as Record<string, any>);
            toast({ title: `Loaded "${cfg.favorite_name}"` });
          }
        }}>
          <SelectTrigger className="w-[180px] h-9 text-xs">
            <Star className="h-3 w-3 mr-1 text-yellow-500" />
            <SelectValue placeholder="Favorites" />
          </SelectTrigger>
          <SelectContent>
            {favorites.map((c: any) => (
              <SelectItem key={c.id} value={c.id}>
                <span className="text-xs">{c.favorite_name || "Untitled"}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Save buttons */}
      <Button variant="outline" size="sm" className="h-9 text-xs" onClick={saveAsConfig} disabled={saveMutation.isPending}>
        <Clock className="h-3 w-3 mr-1" /> Save Settings
      </Button>
      <Button variant="outline" size="sm" className="h-9 text-xs" onClick={() => setSaveDialogOpen(true)}>
        <Star className="h-3 w-3 mr-1 text-yellow-500" /> Save as Favorite
      </Button>

      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Save as Favorite</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="e.g. My LinkedIn Settings"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={() => saveMutation.mutate({ isFavorite: true, name: saveName })} disabled={!saveName.trim() || saveMutation.isPending} size="sm">
              {saveMutation.isPending ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Star className="h-3 w-3 mr-1" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
