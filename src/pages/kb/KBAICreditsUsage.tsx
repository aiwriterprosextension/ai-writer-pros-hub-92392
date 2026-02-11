
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBAICreditsUsage() {
  return (
    <ArticleLayout
      title="Understanding AI Credits & Usage"
      description="Learn how AI generation credits work in AI Writer Pros, how to track your usage, manage your quota, and get the most value from every credit."
      category="Getting Started"
      categoryIcon={Zap}
      readTime="5 min read"
      keywords="AI credits, AI usage tracking, content generation limits, AI writing quota, AI Writer Pros billing"
      prevArticle={{ title: "Your First AI Generation", link: "/knowledge-base/first-ai-generation" }}
    >
      <h2>How AI Credits Work</h2>
      <p>
        AI Writer Pros uses a <strong>credit-based system</strong> to manage AI generations. Each time you generate content using any of the 6 AI tools, it consumes credits from your account balance. Credits ensure fair usage and help you track your content production volume.
      </p>

      <h3>What Counts as a Credit</h3>
      <p>
        One <strong>AI generation</strong> equals one credit. This includes:
      </p>
      <ul>
        <li>Generating a blog post, email, or social media post</li>
        <li>Humanizing a piece of content</li>
        <li>Analyzing content for AI patterns</li>
        <li>Generating product reviews</li>
        <li>Repurposing content into a new format</li>
        <li>Creating alternative versions or regenerating content</li>
      </ul>

      <h3>What Doesn't Count</h3>
      <p>
        The following actions are <strong>free and unlimited</strong>:
      </p>
      <ul>
        <li>Viewing and editing previously generated content</li>
        <li>Exporting or copying content</li>
        <li>Configuring tool settings and saving presets</li>
        <li>Browsing the Knowledge Base and Best Practices</li>
        <li>Managing your profile and account settings</li>
      </ul>

      <h2>Credit Allocation by Plan</h2>
      <p>
        Your monthly credit allocation depends on your subscription plan:
      </p>
      <ul>
        <li><strong>Free Trial</strong> — A generous allocation to explore all 6 tools and test the platform</li>
        <li><strong>Pro Plan</strong> — Increased monthly credits for individual creators and freelancers</li>
        <li><strong>Business Plan</strong> — High-volume credits designed for agencies and teams</li>
      </ul>
      <p>
        Visit the <Link to="/pricing">Pricing page</Link> for detailed plan comparisons and current credit allocations.
      </p>

      <h2>Tracking Your Usage</h2>

      <h3>Dashboard Usage Overview</h3>
      <p>
        Your <Link to="/dashboard">Dashboard Home</Link> displays a <strong>usage summary</strong> showing:
      </p>
      <ul>
        <li><strong>Credits used this month</strong> — A running total of your AI generations</li>
        <li><strong>Credits remaining</strong> — How many credits you have left in the current billing cycle</li>
        <li><strong>Usage by tool</strong> — Breakdown of which AI tools you've used most</li>
        <li><strong>Billing cycle reset date</strong> — When your credits refresh</li>
      </ul>

      <h3>Usage Warnings</h3>
      <p>
        AI Writer Pros proactively notifies you when you're approaching your credit limit:
      </p>
      <ul>
        <li><strong>75% used</strong> — A subtle notification appears on your dashboard</li>
        <li><strong>90% used</strong> — A warning banner suggests upgrading or conserving credits</li>
        <li><strong>100% used</strong> — Generation is paused until credits refresh or you upgrade</li>
      </ul>

      <h2>How to Get the Most from Your Credits</h2>

      <h3>1. Use the Smart Input Enhancer</h3>
      <p>
        The <strong>✨ Smart Input</strong> feature optimizes your prompts before generation. Better inputs produce better first-draft outputs, reducing the need to regenerate and saving credits.
      </p>

      <h3>2. Check Quality Scores Before Generating</h3>
      <p>
        Several tools display a <strong>pre-generation quality score</strong>. Review this estimate before clicking Generate — it helps ensure you'll get a strong result on the first try.
      </p>

      <h3>3. Save Presets for Repeated Tasks</h3>
      <p>
        If you regularly create similar content (e.g., product reviews with the same style settings), <strong>save your tool configurations as presets</strong>. This ensures optimal settings every time and reduces trial-and-error generations.
      </p>

      <h3>4. Edit Before Regenerating</h3>
      <p>
        If the AI output is <strong>80% good</strong>, manually edit the remaining 20% instead of regenerating the entire piece. Editing is free; regenerating costs a credit.
      </p>

      <h3>5. Chain Tools Strategically</h3>
      <p>
        Instead of generating social media posts individually, create <strong>one strong blog post</strong> and then use <strong>Content Repurposing</strong> to turn it into 10+ formats. This gives you more content per credit spent.
      </p>

      <h2>Rate Limits</h2>
      <p>
        To ensure platform stability and a great experience for all users, AI Writer Pros enforces a <strong>rate limit of 5 AI generations per minute</strong>. If you exceed this limit:
      </p>
      <ul>
        <li>You'll see a friendly message: <em>"Please wait a moment before trying again"</em></li>
        <li>The cooldown resets automatically after a brief pause</li>
        <li>This applies per-tool, so you can use different tools without interference</li>
      </ul>

      <h2>Upgrading Your Plan</h2>
      <p>
        If you consistently reach your credit limit, it may be time to upgrade. You can:
      </p>
      <ul>
        <li>View available plans on the <Link to="/pricing">Pricing page</Link></li>
        <li>Upgrade directly from your <Link to="/dashboard/profile">Profile Settings</Link></li>
        <li>Changes take effect immediately — unused credits from your current plan carry over</li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h4>Do unused credits roll over?</h4>
      <p>
        Credit rollover policies vary by plan. Check the <Link to="/pricing">Pricing page</Link> for details on your specific plan.
      </p>

      <h4>Can I purchase additional credits without upgrading?</h4>
      <p>
        Additional credit packs may be available depending on your plan tier. Visit your <Link to="/dashboard/profile">Profile Settings</Link> for current options.
      </p>

      <h4>Are there different credit costs per tool?</h4>
      <p>
        Currently, all AI generations cost <strong>1 credit each</strong>, regardless of which tool you use. This keeps the system simple and transparent.
      </p>

      <h4>What happens if I hit the rate limit?</h4>
      <p>
        You'll see a temporary "Please wait" message. Wait 15-30 seconds and try again. Rate limits reset quickly and don't affect your credit balance.
      </p>

      <hr />

      <h2>Next Steps</h2>
      <p>
        Now that you understand how credits work, explore our tool-specific guides in the <Link to="/knowledge-base">Knowledge Base</Link> to master each AI tool and maximize your content output.
      </p>
    </ArticleLayout>
  );
}
