
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBContentCalendar() {
  return (
    <ArticleLayout
      title="Content Calendar & Idea Generator"
      description="Plan your social media content strategy with AI-powered topic ideas, a visual content calendar, and data-driven scheduling recommendations."
      category="Social Media Suite"
      categoryIcon={MessageSquare}
      readTime="4 min read"
      keywords="social media content calendar, content idea generator, social media planning, AI content ideas"
      prevArticle={{ title: "Twitter/X Threads", link: "/knowledge-base/twitter-threads" }}
      nextArticle={{ title: "Hashtag Research", link: "/knowledge-base/hashtag-research" }}
    >
      <h2>The Content Idea Generator</h2>
      <p>Stuck on what to post? The Content Idea Generator creates <strong>10+ post ideas</strong> based on your niche, trending topics, and audience interests. Batch-generate a full week's content in under 2 minutes.</p>

      <h3>How to Generate Ideas</h3>
      <ol>
        <li>Open the Social Media Suite and click <strong>"Generate Ideas"</strong></li>
        <li>Enter your niche or topic area</li>
        <li>Select your target platform(s)</li>
        <li>Choose content types: educational, entertaining, promotional, or inspirational</li>
        <li>Review and select the ideas that resonate</li>
      </ol>

      <h2>Using the Content Calendar</h2>
      <p>The built-in Content Calendar helps you <strong>visualize and plan</strong> your posting schedule:</p>
      <ul>
        <li><strong>Weekly view</strong> — See your planned posts for the upcoming week</li>
        <li><strong>Platform tags</strong> — Color-coded labels for each social platform</li>
        <li><strong>Drag and drop</strong> — Rearrange posts to optimize your schedule</li>
        <li><strong>Consistency tracking</strong> — Identify gaps in your posting frequency</li>
      </ul>

      <h2>Posting Frequency Guidelines</h2>
      <ul>
        <li><strong>Twitter/X:</strong> 3-5 tweets per day, including threads</li>
        <li><strong>LinkedIn:</strong> 3-5 posts per week</li>
        <li><strong>Instagram:</strong> 4-7 posts per week (mix of feed, stories, reels)</li>
        <li><strong>Facebook:</strong> 3-5 posts per week</li>
      </ul>

      <blockquote><strong>Pro Tip:</strong> Consistency is the #1 factor in social media growth. It's better to post 3 times per week consistently than to post 10 times one week and none the next.</blockquote>

      <hr />
      <h2>Next Steps</h2>
      <p>Maximize your reach with the right hashtags: <Link to="/knowledge-base/hashtag-research">Hashtag Research & Strategy →</Link></p>
    </ArticleLayout>
  );
}
