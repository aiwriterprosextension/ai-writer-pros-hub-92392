
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { User, Mail, Calendar, CreditCard, BarChart3, Zap } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function DashboardProfile() {
  const { user } = useAuth();
  const {
    plan, isTrialActive, trialDaysLeft,
    wordsUsed, wordLimit, wordsRemaining,
    generationsToday, generationLimit,
  } = useSubscription();

  const wordPercent = plan === "business" ? 0 : Math.min(100, (wordsUsed / wordLimit) * 100);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Profile & Billing</h1>
        <p className="text-muted-foreground">Manage your account, plan, and usage.</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-medium">
                  {user?.created_at ? format(new Date(user.created_at), "MMMM d, yyyy") : "—"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" /> Current Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="capitalize text-base px-3 py-1">{plan}</Badge>
              {isTrialActive && (
                <Badge variant="outline">Trial — {trialDaysLeft} days left</Badge>
              )}
            </div>

            <div className="text-sm text-muted-foreground">
              {plan === "free" && "You're on the Free plan. Upgrade to unlock all 6 tools and higher limits."}
              {plan === "pro" && (isTrialActive ? "You're trying Pro! Add a payment method before your trial ends to keep access." : "You have access to all tools with 50,000 words/month.")}
              {plan === "business" && (isTrialActive ? "You're trying Business! Add a payment method before your trial ends." : "Unlimited words and all advanced features unlocked.")}
            </div>

            {plan === "free" && (
              <Link to="/pricing">
                <Button><Zap className="h-4 w-4 mr-2" /> Upgrade Plan</Button>
              </Link>
            )}
            {isTrialActive && (
              <Link to="/pricing">
                <Button variant="outline">Add Payment Method (coming soon)</Button>
              </Link>
            )}
          </CardContent>
        </Card>

        {/* Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" /> Usage This Month</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Words Used</span>
                <span className="font-medium">
                  {plan === "business"
                    ? `${wordsUsed.toLocaleString()} (unlimited)`
                    : `${wordsUsed.toLocaleString()} / ${wordLimit.toLocaleString()}`}
                </span>
              </div>
              {plan !== "business" && <Progress value={wordPercent} className="h-3" />}
              {plan !== "business" && (
                <p className="text-xs text-muted-foreground">{wordsRemaining.toLocaleString()} words remaining</p>
              )}
            </div>

            {plan === "free" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Generations Today</span>
                  <span className="font-medium">{generationsToday} / {generationLimit}</span>
                </div>
                <Progress value={(generationsToday / generationLimit) * 100} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  {generationLimit - generationsToday} generations remaining today
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
