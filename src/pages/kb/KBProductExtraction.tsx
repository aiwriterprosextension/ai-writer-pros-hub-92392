
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBProductExtraction() {
  return (
    <ArticleLayout
      title="Product Data Extraction"
      description="How the Amazon Affiliate Assistant's AI extracts product details, features, specifications, and pricing data to generate accurate, comprehensive reviews."
      category="Amazon Affiliate Assistant"
      categoryIcon={ShoppingCart}
      readTime="4 min read"
      keywords="Amazon product data extraction, product feature detection, AI product review, affiliate marketing tool"
      nextArticle={{ title: "SEO-Optimized Reviews", link: "/knowledge-base/seo-reviews" }}
    >
      <h2>How Product Extraction Works</h2>
      <p>The Amazon Affiliate Assistant can extract product information from a <strong>product name</strong> or <strong>Amazon URL</strong> to populate your review with accurate, detailed information.</p>

      <h3>What Gets Extracted</h3>
      <ul>
        <li><strong>Product name and brand</strong></li>
        <li><strong>Key features and specifications</strong></li>
        <li><strong>Category and subcategory</strong></li>
        <li><strong>Price range and availability</strong></li>
        <li><strong>Common customer sentiments</strong> (positive and negative themes)</li>
      </ul>

      <h2>Using the Feature Detector</h2>
      <p>The <strong>Feature Detector</strong> analyzes the product and identifies its <strong>standout features</strong> — the selling points that matter most to buyers. These features are automatically woven into your generated review.</p>

      <h2>Best Practices for Accurate Extraction</h2>
      <ul>
        <li><strong>Use the full product name</strong> — Include brand, model, and variant (e.g., "Sony WH-1000XM5 Wireless Noise Cancelling Headphones - Black")</li>
        <li><strong>Paste the Amazon URL</strong> when available for the most accurate data</li>
        <li><strong>Specify the category</strong> if the product could fit multiple categories</li>
        <li><strong>Review extracted data</strong> before generating — correct any inaccuracies</li>
      </ul>

      <hr />
      <h2>Next Steps</h2>
      <p>Turn extracted data into high-converting reviews: <Link to="/knowledge-base/seo-reviews">Generating SEO-Optimized Reviews →</Link></p>
    </ArticleLayout>
  );
}
