
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBABTestingEmails() {
  return (
    <ArticleLayout
      title="A/B Testing Email Variations"
      description="Generate and compare multiple versions of your email copy and subject lines to maximize open rates, click-through rates, and conversions."
      category="Email Generator"
      categoryIcon={Mail}
      readTime="4 min read"
      keywords="AB testing emails, email variations, subject line testing, email optimization, split testing"
      prevArticle={{ title: "Email Sequences", link: "/knowledge-base/email-sequences" }}
      nextArticle={{ title: "Audience Targeting", link: "/knowledge-base/audience-targeting-emails" }}
    >
      <h2>Why A/B Test Your Emails?</h2>
      <p>A 10% improvement in open rates compounded across your entire email list can mean <strong>thousands of additional readers and clicks</strong>. A/B testing removes guesswork by letting your audience tell you what works.</p>

      <h2>How to Generate A/B Variations</h2>
      <ol>
        <li>Create your primary email using the Email Generator</li>
        <li>Click <strong>"Generate A/B Variations"</strong> to create alternative versions</li>
        <li>The AI produces 2-3 variations with different hooks, angles, or CTAs</li>
        <li>Compare versions side by side and select the strongest options</li>
      </ol>

      <h2>What to Test</h2>
      <h3>Subject Lines (Highest Impact)</h3>
      <ul>
        <li>Question vs. statement formats</li>
        <li>With or without personalization (e.g., first name)</li>
        <li>Urgency vs. curiosity angles</li>
        <li>Short (3-5 words) vs. descriptive (8-12 words)</li>
      </ul>

      <h3>Email Body</h3>
      <ul>
        <li>Different opening hooks (story vs. statistic vs. question)</li>
        <li>Long-form vs. concise versions</li>
        <li>Different CTA placements and wording</li>
      </ul>

      <h2>Testing Best Practices</h2>
      <ul>
        <li><strong>Test one variable at a time</strong> — Don't change the subject AND body simultaneously</li>
        <li><strong>Use a small test segment</strong> (10-20% of your list) before sending the winner to everyone</li>
        <li><strong>Wait for statistical significance</strong> — At least 100 opens before declaring a winner</li>
        <li><strong>Document your winners</strong> — Track which angles and formats consistently perform best</li>
      </ul>

      <hr />
      <h2>Next Steps</h2>
      <p>Write for the right audience: <Link to="/knowledge-base/audience-targeting-emails">Audience Targeting for Emails →</Link></p>
    </ArticleLayout>
  );
}
