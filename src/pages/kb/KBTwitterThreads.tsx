
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBTwitterThreads() {
  return (
    <ArticleLayout
      title="Creating Twitter/X Threads"
      description="Turn ideas into engaging multi-tweet threads with scroll-stopping hooks, engagement prompts, and platform-optimized formatting."
      category="Social Media Suite"
      categoryIcon={MessageSquare}
      readTime="4 min read"
      keywords="Twitter thread generator, X thread creator, multi-tweet thread, social media AI, engagement hooks"
      nextArticle={{ title: "Content Calendar", link: "/knowledge-base/content-calendar" }}
    >
      <h2>Why Twitter/X Threads?</h2>
      <p>Threads get <strong>3x more engagement</strong> than single tweets. They let you share in-depth insights while staying native to the platform. The Thread/Carousel Creator in the Social Media Suite makes it easy to produce high-performing threads.</p>

      <h2>How to Create a Thread</h2>
      <ol>
        <li>Open the <Link to="/dashboard/social-media">Social Media Suite</Link> from your Dashboard</li>
        <li>Select <strong>Twitter/X</strong> as your target platform</li>
        <li>Enter your topic or paste existing content to adapt</li>
        <li>Use the <strong>Thread/Carousel Creator</strong> to break content into numbered tweets</li>
        <li>Review, edit, and export the thread</li>
      </ol>

      <h2>Anatomy of a Viral Thread</h2>
      <ul>
        <li><strong>Tweet 1 (Hook)</strong> — Bold statement, surprising stat, or provocative question. This determines whether people read on.</li>
        <li><strong>Tweets 2-6 (Value)</strong> — Your core content, one key idea per tweet. Use line breaks for readability.</li>
        <li><strong>Final Tweet (CTA)</strong> — Ask for retweets, follows, or clicks. Recap the main takeaway.</li>
      </ul>

      <h2>Thread Best Practices</h2>
      <ul>
        <li>Keep each tweet under <strong>260 characters</strong> (leave room for thread numbering)</li>
        <li>Use the <strong>Engagement Hooks</strong> tool for scroll-stopping opening lines</li>
        <li>Add <strong>2-3 hashtags</strong> on the first tweet only</li>
        <li>End every thread with a <strong>clear call-to-action</strong></li>
        <li>Post threads during <strong>peak engagement hours</strong> (check Scheduling Suggestions)</li>
      </ul>

      <hr />
      <h2>Next Steps</h2>
      <p>Plan your posting schedule: <Link to="/knowledge-base/content-calendar">Content Calendar & Idea Generator →</Link></p>
    </ArticleLayout>
  );
}
