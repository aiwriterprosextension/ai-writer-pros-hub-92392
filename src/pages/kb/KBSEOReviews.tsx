
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBSEOReviews() {
  return (
    <ArticleLayout
      title="Generating SEO-Optimized Reviews"
      description="Create detailed Amazon product reviews with AI-generated pros, cons, ratings, comparison tables, and FAQ sections — all optimized for search engine rankings."
      category="Amazon Affiliate Assistant"
      categoryIcon={ShoppingCart}
      readTime="5 min read"
      keywords="SEO product review, Amazon affiliate review generator, AI product review, comparison table generator"
      prevArticle={{ title: "Product Extraction", link: "/knowledge-base/product-extraction" }}
      nextArticle={{ title: "FTC Disclosure", link: "/knowledge-base/ftc-disclosure" }}
    >
      <h2>Creating a Review</h2>
      <ol>
        <li>Enter the <strong>product name</strong> (and optionally the Amazon URL)</li>
        <li>Set your <strong>SEO keyword</strong> (e.g., "best wireless headphones 2025")</li>
        <li>Choose your <strong>review depth</strong> — Quick overview or comprehensive deep-dive</li>
        <li>Adjust the <strong>tone balance slider</strong> (40-60% for authentic reviews)</li>
        <li>Click <strong>Generate</strong> to create your review</li>
      </ol>

      <h2>What's Included in Generated Reviews</h2>
      <ul>
        <li><strong>Detailed product overview</strong> with key features and specifications</li>
        <li><strong>Pros and cons lists</strong> — Balanced, honest assessment</li>
        <li><strong>Overall rating</strong> with justification</li>
        <li><strong>Who it's best for</strong> — Target buyer recommendations</li>
        <li><strong>SEO-optimized headings</strong> — H2/H3 structure with keyword placement</li>
      </ul>

      <h2>Adding Comparison Tables</h2>
      <p>Use the <strong>Comparison Suggester</strong> to create side-by-side comparison tables:</p>
      <ul>
        <li>Compare your product against <strong>2-3 alternatives</strong></li>
        <li>Tables include feature comparisons, pricing, and "winner" badges</li>
        <li>Comparison tables <strong>keep readers on your page longer</strong> and increase affiliate clicks by 40%</li>
      </ul>

      <h2>Building FAQ Sections</h2>
      <p>The <strong>FAQ Builder</strong> generates 5-8 commonly asked questions about the product:</p>
      <ul>
        <li>Targets <strong>long-tail keywords</strong> for additional SEO value</li>
        <li>Can appear in Google's <strong>"People Also Ask"</strong> feature</li>
        <li>Adds valuable word count to your review</li>
      </ul>

      <h2>SEO Tips for Reviews</h2>
      <ul>
        <li><strong>Target buyer-intent keywords</strong> — "best," "review," "vs," "worth it"</li>
        <li><strong>Include the year</strong> in your keyword (e.g., "2025") for freshness</li>
        <li><strong>Use structured data</strong> — The review format is designed for rich snippets</li>
        <li><strong>Balance tone</strong> — Reviews that include genuine cons are more credible and convert better</li>
      </ul>

      <hr />
      <h2>Next Steps</h2>
      <p>Stay compliant with affiliate regulations: <Link to="/knowledge-base/ftc-disclosure">FTC Disclosure & Compliance →</Link></p>
    </ArticleLayout>
  );
}
