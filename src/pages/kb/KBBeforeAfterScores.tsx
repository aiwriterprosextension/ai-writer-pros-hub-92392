
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBBeforeAfterScores() {
  return (
    <ArticleLayout
      title="Understanding Before/After Scores"
      description="Learn how to interpret AI detection scores, readability metrics, and overall improvement percentages shown after humanizing your content."
      category="AI Humanizer"
      categoryIcon={Shield}
      readTime="4 min read"
      keywords="AI detection score, before after humanization, readability metrics, AI humanizer results, content improvement"
      prevArticle={{ title: "Bulk Humanization", link: "/knowledge-base/bulk-humanization" }}
    >
      <h2>The Before/After Metrics Card</h2>
      <p>
        After every humanization, AI Writer Pros displays a <strong>Before/After Metrics</strong> comparison card. This card gives you a clear picture of how much your content improved and whether it's ready to publish.
      </p>

      <h2>Metrics Explained</h2>

      <h3>AI Detection Score</h3>
      <p>Shows the estimated probability of AI detection <strong>before and after</strong> humanization:</p>
      <ul>
        <li><strong>Before:</strong> Usually displayed with a red or yellow indicator (e.g., "78% likely AI-generated")</li>
        <li><strong>After:</strong> Should show a green indicator (e.g., "12% likely AI-generated")</li>
        <li><strong>Target:</strong> Aim for below 25% for content that needs to pass AI detectors</li>
      </ul>

      <h3>Readability Grade</h3>
      <p>Based on the <strong>Flesch-Kincaid</strong> readability formula:</p>
      <ul>
        <li><strong>Grade 6-8</strong> — Elementary level, very accessible to all audiences</li>
        <li><strong>Grade 9-12</strong> — High school level, ideal for most blog and marketing content</li>
        <li><strong>Grade 13-16</strong> — College level, suitable for professional and academic content</li>
        <li><strong>Grade 17+</strong> — Expert level, appropriate for technical and specialized audiences</li>
      </ul>
      <p>An upward or downward arrow indicates whether readability improved or shifted relative to your target.</p>

      <h3>Sentence Variety</h3>
      <p>Rated as <strong>Low, Medium, or High</strong>. AI-generated text often has low sentence variety (similar lengths and structures). After humanization, you should see an improvement indicated by a <strong>checkmark (✓)</strong>.</p>

      <h3>Overall Improvement</h3>
      <p>A large, prominent number showing the <strong>percentage improvement in human-likeness</strong> (e.g., "+66% more human-like"). This is calculated from the difference between before and after detection scores.</p>

      <h2>What to Do with Your Results</h2>

      <h4>Score Below 25% — Ready to Publish</h4>
      <p>Your content is highly likely to pass AI detection tools. You can confidently publish, submit, or share it.</p>

      <h4>Score 25-50% — Consider a Second Pass</h4>
      <p>The content is improved but may still trigger some detectors. Options:</p>
      <ul>
        <li>Increase the <strong>Humanization Intensity</strong> and regenerate</li>
        <li>Manually edit the specific phrases flagged by the Pattern Analyzer</li>
        <li>Try a different <strong>Writing Style</strong> for more variation</li>
      </ul>

      <h4>Score Above 50% — Needs More Work</h4>
      <p>Switch to <strong>Aggressive intensity</strong>, try <strong>Version Alternatives</strong> for different approaches, or break into paragraphs using <strong>Bulk Mode</strong> for more targeted humanization.</p>

      <h2>Confidence Badge</h2>
      <p>After humanization, a <strong>confidence badge</strong> appears (e.g., "95% Human-like") color-coded to your score. This is a quick visual reference for content quality.</p>

      <hr />
      <h2>Next Steps</h2>
      <p>Explore more AI tools in the <Link to="/knowledge-base">Knowledge Base</Link> or check our <Link to="/best-practices">Best Practices Guide</Link> for expert humanization tips.</p>
    </ArticleLayout>
  );
}
