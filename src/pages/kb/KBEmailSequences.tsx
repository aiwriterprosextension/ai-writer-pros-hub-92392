
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBEmailSequences() {
  return (
    <ArticleLayout
      title="Building Email Sequences"
      description="Create multi-step email campaigns with AI-generated subject lines, consistent narrative flow, and strategic CTAs using the Email Generator's Sequence Strategy tool."
      category="Email Generator"
      categoryIcon={Mail}
      readTime="5 min read"
      keywords="email sequence builder, multi-step email campaign, AI email generator, welcome sequence, drip campaign"
      nextArticle={{ title: "A/B Testing Emails", link: "/knowledge-base/ab-testing-emails" }}
    >
      <h2>What Are Email Sequences?</h2>
      <p>An email sequence is a <strong>series of 3-7 emails</strong> sent over days or weeks, each building on the previous one. Common types include welcome sequences, nurture campaigns, product launches, and re-engagement flows.</p>

      <h2>How to Build a Sequence</h2>
      <ol>
        <li>Open the <Link to="/dashboard/email-generator">Email Generator</Link> from your Dashboard</li>
        <li>Click the <strong>Sequence Strategy</strong> button to open the planning modal</li>
        <li>Define your <strong>sequence goal</strong> (onboard, educate, sell, re-engage)</li>
        <li>Set the <strong>number of emails</strong> (3-7 recommended)</li>
        <li>Map each email's purpose: introduce → educate → social proof → offer → urgency</li>
        <li>Generate — the AI creates all emails with consistent tone and narrative flow</li>
      </ol>

      <h2>Anatomy of a Strong Sequence</h2>
      <ul>
        <li><strong>Email 1: Welcome</strong> — Warm introduction, set expectations, deliver any promised lead magnet</li>
        <li><strong>Email 2: Value</strong> — Share your best tip or insight to build credibility</li>
        <li><strong>Email 3: Story</strong> — Customer success story or case study for social proof</li>
        <li><strong>Email 4: Offer</strong> — Present your product or service with clear benefits</li>
        <li><strong>Email 5: Urgency</strong> — Limited-time offer or reminder with a strong CTA</li>
      </ul>

      <h2>Tips for Better Sequences</h2>
      <ul>
        <li><strong>One CTA per email</strong> — Don't dilute focus with multiple competing actions</li>
        <li><strong>Use the Subject Line Generator</strong> for each email — Test 2-3 subject lines per email</li>
        <li><strong>Define your audience first</strong> using the Email Audience tool for more relevant content</li>
        <li><strong>Set the right tone</strong> — Maintain consistency across all emails in the sequence</li>
      </ul>

      <hr />
      <h2>Next Steps</h2>
      <p>Learn how to test and optimize your emails: <Link to="/knowledge-base/ab-testing-emails">A/B Testing Email Variations →</Link></p>
    </ArticleLayout>
  );
}
