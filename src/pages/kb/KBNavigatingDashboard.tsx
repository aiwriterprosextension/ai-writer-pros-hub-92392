
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBNavigatingDashboard() {
  return (
    <ArticleLayout
      title="Navigating the Dashboard"
      description="Learn how to use the AI Writer Pros dashboard to access all 6 AI writing tools, manage your generated content, view usage stats, and navigate your workspace efficiently."
      category="Getting Started"
      categoryIcon={Zap}
      readTime="5 min read"
      keywords="AI Writer Pros dashboard, AI tools dashboard, content management, workspace navigation"
      prevArticle={{ title: "Creating Your Account", link: "/knowledge-base/creating-account" }}
      nextArticle={{ title: "Your First AI Generation", link: "/knowledge-base/first-ai-generation" }}
    >
      <h2>Dashboard Overview</h2>
      <p>
        The AI Writer Pros Dashboard is your <strong>central command center</strong> for all AI writing tools and generated content. From here you can launch any tool, review past generations, track your usage, and manage your account — all from a single, clean interface.
      </p>

      <h2>Dashboard Layout</h2>
      <p>
        The dashboard is divided into several key areas designed for fast navigation and productivity:
      </p>

      <h3>Left Sidebar Navigation</h3>
      <p>
        The sidebar provides quick access to every AI tool and key sections of your workspace:
      </p>
      <ul>
        <li><strong>Dashboard Home</strong> — Overview of recent activity, quick-start cards, and usage statistics</li>
        <li><strong>AI Humanizer</strong> — Transform AI text into natural, human-sounding content</li>
        <li><strong>Email Generator</strong> — Create campaigns, sequences, and newsletters</li>
        <li><strong>Social Media Suite</strong> — Generate platform-optimized social content</li>
        <li><strong>Blog Content Creator</strong> — Build SEO-optimized blog posts section by section</li>
        <li><strong>Amazon Affiliate Assistant</strong> — Generate product reviews with comparisons and disclosures</li>
        <li><strong>Content Repurposing</strong> — Convert content into 10+ formats</li>
        <li><strong>Profile & Settings</strong> — Manage your account, preferences, and subscription</li>
      </ul>

      <h3>Main Content Area</h3>
      <p>
        The center of the dashboard displays the active tool or page you've selected. Each tool has its own dedicated workspace with inputs, settings, and output areas.
      </p>

      <h3>Dashboard Home Page</h3>
      <p>
        When you first log in, you'll see the <strong>Dashboard Home</strong> which includes:
      </p>
      <ul>
        <li><strong>Quick-start tool cards</strong> — One-click access to launch any AI tool immediately</li>
        <li><strong>Recent generations</strong> — Your most recent AI outputs for quick reference</li>
        <li><strong>Workflow suggestions</strong> — AI-powered recommendations for what to create next</li>
        <li><strong>Usage overview</strong> — Track your AI generation credits and activity</li>
      </ul>

      <h2>How to Access Each AI Tool</h2>

      <h3>Method 1: Sidebar Navigation</h3>
      <p>
        Click any tool name in the left sidebar to navigate directly to that tool's workspace. The active tool is highlighted in the sidebar so you always know where you are.
      </p>

      <h3>Method 2: Dashboard Quick-Start Cards</h3>
      <p>
        From the Dashboard Home, click the <strong>"Open Tool"</strong> button on any quick-start card. This is the fastest way to jump into a specific tool when you first log in.
      </p>

      <h3>Method 3: AI Chat Assistant</h3>
      <p>
        Use the <strong>AI Chat Widget</strong> (available on the Dashboard Home) to ask questions or get guidance on which tool to use for your specific content needs.
      </p>

      <h2>Managing Your Generated Content</h2>
      <p>
        Every piece of content you generate is automatically saved to your account. You can:
      </p>
      <ul>
        <li><strong>View past generations</strong> in the History section of each tool</li>
        <li><strong>Resume drafts</strong> — Pick up where you left off on any saved draft</li>
        <li><strong>Export content</strong> — Copy to clipboard, download as .txt, or send to another tool</li>
        <li><strong>Favorite configurations</strong> — Save your preferred tool settings for one-click reuse</li>
      </ul>

      <h2>Dashboard Tips for Power Users</h2>

      <h4>Chain Tools Together</h4>
      <p>
        The most productive workflow is to chain tools: <strong>Blog Creator → AI Humanizer → Content Repurposing</strong>. Create a blog post, humanize it, then repurpose it into 10+ formats — all without leaving the dashboard.
      </p>

      <h4>Use the Smart Input Enhancer</h4>
      <p>
        Every tool includes a <strong>✨ Smart Input</strong> button that refines your prompts before AI generation. Better inputs = dramatically better outputs.
      </p>

      <h4>Check Quality Scores Before Generating</h4>
      <p>
        Many tools show a <strong>pre-generation quality score</strong> that estimates SEO, readability, and engagement metrics. Review and adjust your inputs until the score is in the green range.
      </p>

      <h2>Keyboard Navigation</h2>
      <p>
        The dashboard supports full keyboard navigation for accessibility:
      </p>
      <ul>
        <li><strong>Tab</strong> — Move between interactive elements</li>
        <li><strong>Enter</strong> — Activate buttons and links</li>
        <li><strong>Escape</strong> — Close modals and dialogs</li>
      </ul>

      <h2>Mobile Dashboard Access</h2>
      <p>
        The AI Writer Pros dashboard is <strong>fully responsive</strong> and works on tablets and mobile devices. On smaller screens:
      </p>
      <ul>
        <li>The sidebar collapses into a <strong>hamburger menu</strong> for more workspace area</li>
        <li>All AI tools are accessible via the mobile menu</li>
        <li>Input fields and output areas stack vertically for easy scrolling</li>
        <li>Touch-friendly buttons ensure all features remain accessible</li>
      </ul>

      <hr />

      <h2>Next Steps</h2>
      <p>
        Ready to create your first piece of AI content? Follow our step-by-step walkthrough: <Link to="/knowledge-base/first-ai-generation">Your First AI Generation →</Link>
      </p>
    </ArticleLayout>
  );
}
