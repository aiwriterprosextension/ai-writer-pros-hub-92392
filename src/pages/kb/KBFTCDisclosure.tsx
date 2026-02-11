
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBFTCDisclosure() {
  return (
    <ArticleLayout
      title="FTC Disclosure & Compliance"
      description="Automatically generate FTC-compliant affiliate disclosures for your Amazon product reviews to meet legal requirements and build reader trust."
      category="Amazon Affiliate Assistant"
      categoryIcon={ShoppingCart}
      readTime="4 min read"
      keywords="FTC disclosure generator, affiliate compliance, Amazon affiliate disclaimer, FTC guidelines affiliate marketing"
      prevArticle={{ title: "SEO-Optimized Reviews", link: "/knowledge-base/seo-reviews" }}
    >
      <h2>Why FTC Compliance Matters</h2>
      <p>The Federal Trade Commission (FTC) <strong>requires affiliate marketers to disclose</strong> their relationship with the products they review. Failure to include proper disclosures can result in penalties and loss of affiliate program membership.</p>

      <h2>Using the Disclosure Generator</h2>
      <ol>
        <li>In the Amazon Affiliate Assistant, find the <strong>Disclosure Generator</strong> section</li>
        <li>Click <strong>"Generate Disclosure"</strong></li>
        <li>The AI creates an FTC-compliant disclaimer tailored to your review</li>
        <li>Review and customize the wording if needed</li>
        <li>Place it <strong>prominently at the top</strong> of your review</li>
      </ol>

      <h2>Disclosure Best Practices</h2>
      <ul>
        <li><strong>Place it above the fold</strong> — The disclosure should be visible before any affiliate links</li>
        <li><strong>Use clear language</strong> — "We earn a commission" is better than vague legal jargon</li>
        <li><strong>Don't hide it</strong> — Avoid tiny fonts, light colors, or buried footnotes</li>
        <li><strong>Include on every review</strong> — Even if it seems obvious to you, it's required</li>
      </ul>

      <h2>Example Disclosures</h2>
      <p>The generator creates disclosures like:</p>
      <blockquote>"Disclosure: This post contains affiliate links. If you purchase through these links, we may earn a small commission at no extra cost to you. We only recommend products we genuinely believe in."</blockquote>

      <h2>Amazon Associates Program Requirements</h2>
      <ul>
        <li><strong>Clearly state</strong> you are an Amazon Associate</li>
        <li><strong>Mention</strong> that you earn from qualifying purchases</li>
        <li><strong>Don't claim</strong> prices or availability (they change frequently)</li>
        <li><strong>Don't use</strong> Amazon product images without proper attribution</li>
      </ul>

      <hr />
      <h2>Next Steps</h2>
      <p>Explore other tools in the <Link to="/knowledge-base">Knowledge Base</Link> or read our <Link to="/best-practices">Best Practices Guide</Link> for more affiliate marketing strategies.</p>
    </ArticleLayout>
  );
}
