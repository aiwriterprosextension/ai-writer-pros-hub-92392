
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBManagingSubscription() {
  return (
    <ArticleLayout
      title="Managing Your Subscription"
      description="Upgrade, downgrade, or cancel your AI Writer Pros plan. View billing history, invoices, and understand how plan changes affect your credits."
      category="Account & Billing"
      categoryIcon={CreditCard}
      readTime="3 min read"
      keywords="AI Writer Pros subscription, manage plan, upgrade plan, cancel subscription, billing"
      nextArticle={{ title: "Profile Settings", link: "/knowledge-base/profile-settings" }}
    >
      <h2>Viewing Your Current Plan</h2>
      <p>Visit your <Link to="/dashboard/profile">Profile Settings</Link> to see your current subscription tier, credit balance, and billing cycle dates.</p>

      <h2>Upgrading Your Plan</h2>
      <ol>
        <li>Navigate to <Link to="/dashboard/profile">Profile Settings</Link></li>
        <li>Click <strong>"Upgrade Plan"</strong></li>
        <li>Review available plans on the <Link to="/pricing">Pricing page</Link></li>
        <li>Select your new plan and confirm</li>
        <li>Changes take effect <strong>immediately</strong> — you get access to additional credits right away</li>
      </ol>

      <h2>Downgrading or Canceling</h2>
      <ul>
        <li><strong>Downgrade</strong> takes effect at the end of your current billing cycle</li>
        <li><strong>Cancellation</strong> preserves access until the end of your paid period</li>
        <li>Your generated content <strong>remains accessible</strong> even after cancellation</li>
        <li>You can <strong>reactivate</strong> at any time</li>
      </ul>

      <h2>Billing & Invoices</h2>
      <ul>
        <li>View your billing history and download invoices from Profile Settings</li>
        <li>Billing occurs on the same day each month based on your original sign-up date</li>
        <li>All payments are processed securely</li>
      </ul>

      <hr />
      <h2>Next Steps</h2>
      <p>Configure your account preferences: <Link to="/knowledge-base/profile-settings">Profile Settings & Preferences →</Link></p>
    </ArticleLayout>
  );
}
