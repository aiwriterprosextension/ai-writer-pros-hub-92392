
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AmazonAffiliateExtension from "./pages/AmazonAffiliateExtension";
import AIHumanizer from "./pages/AIHumanizer";
import ContentRepurposing from "./pages/ContentRepurposing";
import EmailGenerator from "./pages/EmailGenerator";
import SocialMediaSuite from "./pages/SocialMediaSuite";
import BlogContentCreator from "./pages/BlogContentCreator";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardAIHumanizer from "./pages/dashboard/DashboardAIHumanizer";
import DashboardEmailGenerator from "./pages/dashboard/DashboardEmailGenerator";
import DashboardSocialMedia from "./pages/dashboard/DashboardSocialMedia";
import DashboardBlogCreator from "./pages/dashboard/DashboardBlogCreator";
import DashboardAmazonReviews from "./pages/dashboard/DashboardAmazonReviews";
import DashboardContentRepurposing from "./pages/dashboard/DashboardContentRepurposing";
import DashboardProfile from "./pages/dashboard/DashboardProfile";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import Tutorials from "./pages/Tutorials";
import Support from "./pages/Support";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="ai-writer-pros-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/amazon-affiliate-extension" element={<AmazonAffiliateExtension />} />
              <Route path="/ai-humanizer" element={<AIHumanizer />} />
              <Route path="/content-repurposing" element={<ContentRepurposing />} />
              <Route path="/email-generator" element={<EmailGenerator />} />
              <Route path="/social-media-suite" element={<SocialMediaSuite />} />
              <Route path="/blog-content-creator" element={<BlogContentCreator />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
                <Route index element={<DashboardHome />} />
                <Route path="ai-humanizer" element={<DashboardAIHumanizer />} />
                <Route path="email-generator" element={<DashboardEmailGenerator />} />
                <Route path="social-media" element={<DashboardSocialMedia />} />
                <Route path="blog-creator" element={<DashboardBlogCreator />} />
                <Route path="amazon-reviews" element={<DashboardAmazonReviews />} />
                <Route path="content-repurposing" element={<DashboardContentRepurposing />} />
                <Route path="profile" element={<DashboardProfile />} />
              </Route>
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/support" element={<Support />} />
              <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
