
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBCreatingAccount() {
  return (
    <ArticleLayout
      title="Creating Your AI Writer Pros Account"
      description="A complete step-by-step guide to signing up for AI Writer Pros, verifying your email, and setting up your workspace to start creating AI-powered content."
      category="Getting Started"
      categoryIcon={Zap}
      readTime="4 min read"
      keywords="AI Writer Pros signup, create account, AI writing tool registration, getting started AI content"
      nextArticle={{ title: "Navigating the Dashboard", link: "/knowledge-base/navigating-dashboard" }}
    >
      <h2>Why Create an AI Writer Pros Account?</h2>
      <p>
        AI Writer Pros gives you access to <strong>6 professional AI writing tools</strong> from a single dashboard. Whether you need to generate Amazon affiliate reviews, humanize AI content, create blog posts, or build email campaigns, your account is the gateway to saving 10+ hours per week on content creation.
      </p>

      <h2>Step-by-Step: How to Sign Up</h2>

      <h3>Step 1: Visit the Sign-Up Page</h3>
      <p>
        Navigate to the <Link to="/auth">AI Writer Pros sign-up page</Link>. You'll see options to create a new account using your email address.
      </p>

      <h3>Step 2: Enter Your Email and Password</h3>
      <p>
        Provide a valid email address and create a strong password. We recommend using a password that is:
      </p>
      <ul>
        <li><strong>At least 8 characters</strong> in length</li>
        <li>A mix of <strong>uppercase and lowercase letters</strong></li>
        <li>Contains at least one <strong>number or special character</strong></li>
      </ul>

      <h3>Step 3: Verify Your Email</h3>
      <p>
        After submitting the registration form, check your inbox for a verification email from AI Writer Pros. Click the <strong>confirmation link</strong> in the email to activate your account. If you don't see the email within a few minutes:
      </p>
      <ul>
        <li>Check your <strong>spam or junk folder</strong></li>
        <li>Make sure you entered the correct email address</li>
        <li>Try resending the verification email from the sign-in page</li>
      </ul>

      <h3>Step 4: Sign In to Your Account</h3>
      <p>
        Once your email is verified, return to the <Link to="/auth">sign-in page</Link> and log in with your credentials. You'll be automatically redirected to your <strong>Dashboard</strong>.
      </p>

      <h2>What You Get with Your Free Account</h2>
      <p>
        Every new AI Writer Pros account includes a <strong>generous free trial</strong> with access to all 6 AI tools:
      </p>
      <ul>
        <li><strong>Amazon Affiliate Assistant</strong> — Generate SEO-optimized product reviews with pros, cons, and comparison tables</li>
        <li><strong>AI Humanizer</strong> — Transform AI-generated text into natural, undetectable content</li>
        <li><strong>Content Repurposing</strong> — Turn one piece of content into 10+ platform-optimized formats</li>
        <li><strong>Email Generator</strong> — Create high-converting email campaigns and sequences</li>
        <li><strong>Social Media Suite</strong> — Generate platform-specific social content with hashtags and scheduling</li>
        <li><strong>Blog Content Creator</strong> — Build SEO-optimized blog posts with AI-powered outlines and research</li>
      </ul>
      <p>
        No credit card is required to start your free trial. You can explore every tool and generate content immediately after signing up.
      </p>

      <h2>Setting Up Your Workspace</h2>

      <h3>Profile Configuration</h3>
      <p>
        After signing in for the first time, we recommend visiting your <Link to="/dashboard/profile">Profile Settings</Link> to:
      </p>
      <ul>
        <li>Review your account details and email preferences</li>
        <li>Set your default writing tone and content preferences</li>
        <li>Configure your preferred content industry for more relevant AI output</li>
      </ul>

      <h3>Exploring the Dashboard</h3>
      <p>
        Your Dashboard is the central hub for all AI tools, recent generations, and content management. Learn how to use it effectively in our next article: <Link to="/knowledge-base/navigating-dashboard">Navigating the Dashboard</Link>.
      </p>

      <h2>Troubleshooting Common Sign-Up Issues</h2>

      <h4>Email Verification Not Received</h4>
      <p>
        If the verification email doesn't arrive within 5 minutes, check your spam folder and whitelist <code>noreply@aiwriterpros.com</code>. You can also request a new verification email from the sign-in page.
      </p>

      <h4>Password Requirements</h4>
      <p>
        If your password is rejected, ensure it meets the minimum 8-character requirement and includes a mix of character types for security.
      </p>

      <h4>Account Already Exists</h4>
      <p>
        If you see an "account already exists" message, you may have previously registered. Try signing in instead, or use the <strong>password reset</strong> option if you've forgotten your credentials.
      </p>

      <hr />

      <h2>Next Steps</h2>
      <p>
        Now that your account is set up, learn how to navigate the dashboard and access all 6 AI tools in our next guide: <Link to="/knowledge-base/navigating-dashboard">Navigating the Dashboard →</Link>
      </p>
    </ArticleLayout>
  );
}
