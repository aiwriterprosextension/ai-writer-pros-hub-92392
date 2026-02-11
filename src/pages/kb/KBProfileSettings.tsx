
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBProfileSettings() {
  return (
    <ArticleLayout
      title="Profile Settings & Preferences"
      description="Update your AI Writer Pros profile, change your email, and configure default tool settings and content preferences for a personalized experience."
      category="Account & Billing"
      categoryIcon={CreditCard}
      readTime="3 min read"
      keywords="profile settings, account preferences, AI Writer Pros settings, default tool settings"
      prevArticle={{ title: "Managing Subscription", link: "/knowledge-base/managing-subscription" }}
      nextArticle={{ title: "Team Management", link: "/knowledge-base/team-management" }}
    >
      <h2>Accessing Profile Settings</h2>
      <p>Click your <strong>profile icon</strong> in the dashboard sidebar or navigate directly to <Link to="/dashboard/profile">Profile Settings</Link>.</p>

      <h2>What You Can Configure</h2>

      <h3>Account Information</h3>
      <ul>
        <li><strong>Email address</strong> — Update your login email</li>
        <li><strong>Password</strong> — Change your password for security</li>
        <li><strong>Display name</strong> — Set how your name appears in the dashboard</li>
      </ul>

      <h3>Default Tool Settings</h3>
      <p>Set defaults that apply across all AI tools:</p>
      <ul>
        <li><strong>Default writing tone</strong> — Professional, Casual, Academic, etc.</li>
        <li><strong>Preferred content industry</strong> — Healthcare, Technology, Marketing, etc.</li>
        <li><strong>Default reading level</strong> — Elementary through Professional</li>
      </ul>

      <h3>Notification Preferences</h3>
      <ul>
        <li><strong>Credit usage alerts</strong> — Get notified at 75% and 90% usage</li>
        <li><strong>Product updates</strong> — New features and tool improvements</li>
        <li><strong>Tips and best practices</strong> — Weekly content creation tips</li>
      </ul>

      <h2>Saving Presets</h2>
      <p>Beyond global defaults, each tool lets you <strong>save custom presets</strong> for specific content types. For example, save a "Blog Posts - Casual" preset in the AI Humanizer with your preferred intensity, style, and industry settings.</p>

      <hr />
      <h2>Next Steps</h2>
      <p>Collaborate with your team: <Link to="/knowledge-base/team-management">Team Management & Collaboration →</Link></p>
    </ArticleLayout>
  );
}
