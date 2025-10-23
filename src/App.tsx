
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import AmazonAffiliateExtension from "./pages/AmazonAffiliateExtension";
import AIHumanizer from "./pages/AIHumanizer";
import ContentRepurposing from "./pages/ContentRepurposing";
import EmailGenerator from "./pages/EmailGenerator";
import SocialMediaSuite from "./pages/SocialMediaSuite";
import BlogContentCreator from "./pages/BlogContentCreator";
import Dashboard from "./pages/Dashboard";
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
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/amazon-affiliate-extension" element={<AmazonAffiliateExtension />} />
            <Route path="/ai-humanizer" element={<AIHumanizer />} />
            <Route path="/content-repurposing" element={<ContentRepurposing />} />
            <Route path="/email-generator" element={<EmailGenerator />} />
            <Route path="/social-media-suite" element={<SocialMediaSuite />} />
            <Route path="/blog-content-creator" element={<BlogContentCreator />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/support" element={<Support />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
