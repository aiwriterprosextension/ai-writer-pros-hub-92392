
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBAudienceTargetingEmails() {
  return (
    <ArticleLayout
      title="Audience Targeting for Emails"
      description="Define your email audience persona to generate more relevant, personalized, and high-converting email content with the Email Generator."
      category="Email Generator"
      categoryIcon={Mail}
      readTime="4 min read"
      keywords="email audience targeting, audience persona emails, personalized email marketing, email segmentation"
      prevArticle={{ title: "A/B Testing Emails", link: "/knowledge-base/ab-testing-emails" }}
    >
      <h2>Why Audience Targeting Matters</h2>
      <p>Emails written for a specific audience convert <strong>3-5x better</strong> than generic broadcasts. The Email Audience tool lets you define exactly who you're writing for so the AI produces highly relevant content.</p>

      <h2>Setting Up Your Audience Persona</h2>
      <ol>
        <li>Click the <strong>Email Audience</strong> button in the Email Generator</li>
        <li>Define your audience's <strong>demographics</strong> (role, industry, company size)</li>
        <li>Specify their <strong>pain points</strong> — What problem are they trying to solve?</li>
        <li>Set the <strong>desired action</strong> — What should they do after reading?</li>
        <li>Choose the <strong>knowledge level</strong> — Beginner, intermediate, or expert</li>
      </ol>

      <h2>How It Affects Generated Content</h2>
      <p>When an audience persona is defined, the AI adjusts:</p>
      <ul>
        <li><strong>Vocabulary</strong> — Technical jargon for experts, plain language for beginners</li>
        <li><strong>Examples</strong> — Industry-relevant scenarios and references</li>
        <li><strong>Tone</strong> — Formal for C-suite, friendly for consumers, peer-to-peer for professionals</li>
        <li><strong>CTA framing</strong> — Urgency for decision-makers, education for researchers</li>
        <li><strong>Subject lines</strong> — Tailored hooks that resonate with the specific audience</li>
      </ul>

      <h2>Audience Persona Examples</h2>
      <h4>SaaS Founders</h4>
      <p>Demographics: Tech startup CEO/CTO, 25-45. Pain point: Customer churn. Desired action: Book a demo. Level: Expert.</p>

      <h4>E-commerce Shoppers</h4>
      <p>Demographics: Online shoppers, 18-55. Pain point: Finding quality products. Desired action: Complete purchase. Level: Beginner.</p>

      <h4>Marketing Managers</h4>
      <p>Demographics: Mid-level marketers, B2B companies. Pain point: Proving ROI. Desired action: Download whitepaper. Level: Intermediate.</p>

      <blockquote><strong>Pro Tip:</strong> Save your audience personas for reuse across multiple email campaigns. This ensures consistent messaging and saves time on future projects.</blockquote>

      <hr />
      <h2>Next Steps</h2>
      <p>Explore other AI tools in the <Link to="/knowledge-base">Knowledge Base</Link> or see expert email tips in the <Link to="/best-practices">Best Practices Guide</Link>.</p>
    </ArticleLayout>
  );
}
