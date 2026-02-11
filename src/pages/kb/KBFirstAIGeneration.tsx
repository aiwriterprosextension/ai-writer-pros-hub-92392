
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBFirstAIGeneration() {
  return (
    <ArticleLayout
      title="Your First AI Generation"
      description="A quick walkthrough of generating your first piece of AI-powered content with any AI Writer Pros tool. Learn the universal workflow that applies across all 6 tools."
      category="Getting Started"
      categoryIcon={Zap}
      readTime="6 min read"
      keywords="first AI generation, AI content creation tutorial, how to use AI writer, AI writing walkthrough, beginner AI content"
      prevArticle={{ title: "Navigating the Dashboard", link: "/knowledge-base/navigating-dashboard" }}
      nextArticle={{ title: "AI Credits & Usage", link: "/knowledge-base/ai-credits-usage" }}
    >
      <h2>The Universal AI Generation Workflow</h2>
      <p>
        Every AI tool in AI Writer Pros follows a consistent <strong>4-step workflow</strong>. Once you learn this pattern, you can use any tool with confidence:
      </p>
      <ol>
        <li><strong>Provide your input</strong> — Tell the AI what you want to create</li>
        <li><strong>Configure settings</strong> — Adjust tone, style, length, and tool-specific options</li>
        <li><strong>Generate content</strong> — Click the generate button and let AI do the work</li>
        <li><strong>Review and refine</strong> — Edit, regenerate, or export your content</li>
      </ol>

      <h2>Walkthrough: Generate a Blog Post (Example)</h2>
      <p>
        Let's walk through a complete example using the <strong>Blog Content Creator</strong>. The same principles apply to every other tool.
      </p>

      <h3>Step 1: Open the Blog Content Creator</h3>
      <p>
        From your <Link to="/dashboard">Dashboard</Link>, click <strong>"Blog Content Creator"</strong> in the left sidebar or on the quick-start card. The tool workspace opens with an input area and settings panel.
      </p>

      <h3>Step 2: Enter Your Topic</h3>
      <p>
        In the main input field, type your blog post topic. Be as specific as possible for the best results:
      </p>
      <ul>
        <li><strong>Weak input:</strong> "Write about marketing"</li>
        <li><strong>Strong input:</strong> "10 email marketing strategies for SaaS startups to reduce churn in 2025"</li>
      </ul>

      <blockquote>
        <strong>Pro Tip:</strong> Use the ✨ Smart Input Enhancer button to automatically improve your prompt before generation. It adds specificity, keywords, and structure that produce dramatically better output.
      </blockquote>

      <h3>Step 3: Configure Your Settings</h3>
      <p>
        Before generating, review and adjust the available settings. For the Blog Content Creator, these include:
      </p>
      <ul>
        <li><strong>Target keywords</strong> — Enter 1-3 SEO keywords to target</li>
        <li><strong>Tone</strong> — Choose from Professional, Casual, Academic, or other options</li>
        <li><strong>Content purpose</strong> — Inform, persuade, entertain, or educate</li>
        <li><strong>Audience</strong> — Define who you're writing for using the Audience Profile tool</li>
      </ul>

      <h3>Step 4: Generate Your Content</h3>
      <p>
        Click the <strong>Generate</strong> button. You'll see a loading indicator while the AI processes your request. Most generations complete in <strong>5-15 seconds</strong> depending on content length and complexity.
      </p>

      <h3>Step 5: Review and Refine</h3>
      <p>
        Once generated, your content appears in the output area. From here you can:
      </p>
      <ul>
        <li><strong>Edit directly</strong> — Click into the text to make manual changes</li>
        <li><strong>Regenerate</strong> — Click "Regenerate" if the output doesn't meet your needs</li>
        <li><strong>Check quality</strong> — Use the SEO Analysis, Readability, or Fact Checker panels</li>
        <li><strong>Export</strong> — Copy to clipboard, download, or send to another tool</li>
      </ul>

      <h2>Quick-Start Examples for Each Tool</h2>

      <h3>AI Humanizer</h3>
      <p>
        Paste any AI-generated content into the input field. Click <strong>"Analyze AI Patterns"</strong> to see your detection score, then click <strong>"Humanize Content"</strong> to transform it. Adjust the <strong>Humanization Intensity</strong> slider for more or less rewriting.
      </p>

      <h3>Amazon Affiliate Assistant</h3>
      <p>
        Enter a product name (e.g., "Sony WH-1000XM5 Headphones") and optionally paste the Amazon product URL. Set your review depth and SEO keyword, then generate. Use the <strong>Buyer Persona</strong> and <strong>Comparison Suggester</strong> for higher-converting reviews.
      </p>

      <h3>Email Generator</h3>
      <p>
        Enter your email topic and select the email type (newsletter, promotional, welcome sequence, etc.). Define your audience and CTA goal for the most relevant output. Use the <strong>Subject Line Generator</strong> to create A/B test variations.
      </p>

      <h3>Social Media Suite</h3>
      <p>
        Choose your target platform (Twitter/X, LinkedIn, Instagram, Facebook). Enter your topic or paste existing content to adapt. The tool generates platform-optimized posts with hashtags, engagement hooks, and formatting.
      </p>

      <h3>Content Repurposing</h3>
      <p>
        Paste a blog post, article, or any long-form content. The <strong>Content Analyzer</strong> identifies key themes and recommends formats. Select your desired output formats and generate platform-specific content from a single source.
      </p>

      <h2>5 Tips for Better AI Generations</h2>

      <h4>1. Be Specific in Your Inputs</h4>
      <p>
        The more detail you provide, the more relevant the output. Include your target audience, desired outcome, and any specific points you want covered.
      </p>

      <h4>2. Use the Smart Input Enhancer</h4>
      <p>
        Available on every tool, the <strong>✨ button</strong> refines your prompt before sending it to the AI. This single step can improve output quality by 40-60%.
      </p>

      <h4>3. Check the Quality Score Preview</h4>
      <p>
        Before generating, review the pre-generation quality score. If it shows yellow or red indicators, refine your inputs until the score improves.
      </p>

      <h4>4. Always Review and Edit</h4>
      <p>
        AI generates excellent first drafts, but the best content comes from human review. Spend 5-10 minutes adding personal insights, examples, and your unique perspective.
      </p>

      <h4>5. Chain Tools for Maximum Impact</h4>
      <p>
        Create content with the Blog Creator, run it through the AI Humanizer, then repurpose it with Content Repurposing. This workflow produces polished, multi-platform content in under 15 minutes.
      </p>

      <hr />

      <h2>Next Steps</h2>
      <p>
        Learn how AI credits work and how to track your usage: <Link to="/knowledge-base/ai-credits-usage">Understanding AI Credits & Usage →</Link>
      </p>
    </ArticleLayout>
  );
}
