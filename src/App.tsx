
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ExitIntentPopup } from "@/components/landing/ExitIntentPopup";
import { SocialProofPopup } from "@/components/landing/SocialProofPopup";
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
import KnowledgeBase from "./pages/KnowledgeBase";
import BestPractices from "./pages/BestPractices";
import Admin from "./pages/Admin";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import KBCreatingAccount from "./pages/kb/KBCreatingAccount";
import KBNavigatingDashboard from "./pages/kb/KBNavigatingDashboard";
import KBFirstAIGeneration from "./pages/kb/KBFirstAIGeneration";
import KBAICreditsUsage from "./pages/kb/KBAICreditsUsage";
import KBPatternAnalyzer from "./pages/kb/KBPatternAnalyzer";
import KBHumanizationIntensity from "./pages/kb/KBHumanizationIntensity";
import KBIndustryCustomization from "./pages/kb/KBIndustryCustomization";
import KBBulkHumanization from "./pages/kb/KBBulkHumanization";
import KBBeforeAfterScores from "./pages/kb/KBBeforeAfterScores";
import KBContentAnalyzer from "./pages/kb/KBContentAnalyzer";
import KBPlatformCustomization from "./pages/kb/KBPlatformCustomization";
import KBMultiLengthVersions from "./pages/kb/KBMultiLengthVersions";
import KBHashtagScheduling from "./pages/kb/KBHashtagScheduling";
import KBBatchExport from "./pages/kb/KBBatchExport";
import KBEmailSequences from "./pages/kb/KBEmailSequences";
import KBABTestingEmails from "./pages/kb/KBABTestingEmails";
import KBAudienceTargetingEmails from "./pages/kb/KBAudienceTargetingEmails";
import KBTwitterThreads from "./pages/kb/KBTwitterThreads";
import KBContentCalendar from "./pages/kb/KBContentCalendar";
import KBHashtagResearch from "./pages/kb/KBHashtagResearch";
import KBTopicKeywords from "./pages/kb/KBTopicKeywords";
import KBOutlineBuilder from "./pages/kb/KBOutlineBuilder";
import KBSEOReadability from "./pages/kb/KBSEOReadability";
import KBProductExtraction from "./pages/kb/KBProductExtraction";
import KBSEOReviews from "./pages/kb/KBSEOReviews";
import KBFTCDisclosure from "./pages/kb/KBFTCDisclosure";
import KBManagingSubscription from "./pages/kb/KBManagingSubscription";
import KBProfileSettings from "./pages/kb/KBProfileSettings";
import KBTeamManagement from "./pages/kb/KBTeamManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="ai-writer-pros-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <ExitIntentPopup />
            <SocialProofPopup />
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
              <Route path="/knowledge-base" element={<KnowledgeBase />} />
              <Route path="/best-practices" element={<BestPractices />} />
              <Route path="/knowledge-base/creating-account" element={<KBCreatingAccount />} />
              <Route path="/knowledge-base/navigating-dashboard" element={<KBNavigatingDashboard />} />
              <Route path="/knowledge-base/first-ai-generation" element={<KBFirstAIGeneration />} />
              <Route path="/knowledge-base/ai-credits-usage" element={<KBAICreditsUsage />} />
              <Route path="/knowledge-base/pattern-analyzer" element={<KBPatternAnalyzer />} />
              <Route path="/knowledge-base/humanization-intensity" element={<KBHumanizationIntensity />} />
              <Route path="/knowledge-base/industry-customization" element={<KBIndustryCustomization />} />
              <Route path="/knowledge-base/bulk-humanization" element={<KBBulkHumanization />} />
              <Route path="/knowledge-base/before-after-scores" element={<KBBeforeAfterScores />} />
              <Route path="/knowledge-base/content-analyzer" element={<KBContentAnalyzer />} />
              <Route path="/knowledge-base/platform-customization" element={<KBPlatformCustomization />} />
              <Route path="/knowledge-base/multi-length-versions" element={<KBMultiLengthVersions />} />
              <Route path="/knowledge-base/hashtag-scheduling" element={<KBHashtagScheduling />} />
              <Route path="/knowledge-base/batch-export" element={<KBBatchExport />} />
              <Route path="/knowledge-base/email-sequences" element={<KBEmailSequences />} />
              <Route path="/knowledge-base/ab-testing-emails" element={<KBABTestingEmails />} />
              <Route path="/knowledge-base/audience-targeting-emails" element={<KBAudienceTargetingEmails />} />
              <Route path="/knowledge-base/twitter-threads" element={<KBTwitterThreads />} />
              <Route path="/knowledge-base/content-calendar" element={<KBContentCalendar />} />
              <Route path="/knowledge-base/hashtag-research" element={<KBHashtagResearch />} />
              <Route path="/knowledge-base/topic-keywords" element={<KBTopicKeywords />} />
              <Route path="/knowledge-base/outline-builder" element={<KBOutlineBuilder />} />
              <Route path="/knowledge-base/seo-readability" element={<KBSEOReadability />} />
              <Route path="/knowledge-base/product-extraction" element={<KBProductExtraction />} />
              <Route path="/knowledge-base/seo-reviews" element={<KBSEOReviews />} />
              <Route path="/knowledge-base/ftc-disclosure" element={<KBFTCDisclosure />} />
              <Route path="/knowledge-base/managing-subscription" element={<KBManagingSubscription />} />
              <Route path="/knowledge-base/profile-settings" element={<KBProfileSettings />} />
              <Route path="/knowledge-base/team-management" element={<KBTeamManagement />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
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
