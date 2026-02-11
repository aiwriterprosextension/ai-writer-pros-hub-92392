
import { ArticleLayout } from "@/components/kb/ArticleLayout";
import { PenTool } from "lucide-react";
import { Link } from "react-router-dom";

export default function KBOutlineBuilder() {
  return (
    <ArticleLayout
      title="Outline Builder & Section Writing"
      description="Generate structured blog post outlines with H2/H3 headings and key points, then write section-by-section for maximum control over your long-form content."
      category="Blog Content Creator"
      categoryIcon={PenTool}
      readTime="5 min read"
      keywords="blog outline generator, section by section writing, AI content outline, structured blog post, long-form content"
      prevArticle={{ title: "Topic & Keywords", link: "/knowledge-base/topic-keywords" }}
      nextArticle={{ title: "SEO & Readability", link: "/knowledge-base/seo-readability" }}
    >
      <h2>Why Start with an Outline?</h2>
      <p>A strong outline produces <strong>10x better content</strong> than diving in blind. The Outline Generator creates a structured framework so every section serves a purpose and your post flows logically from start to finish.</p>

      <h2>Generating an Outline</h2>
      <ol>
        <li>Enter your topic and target keyword in the Blog Content Creator</li>
        <li>Click <strong>"Generate Outline"</strong></li>
        <li>The AI creates a structured outline with H2 headings, H3 subheadings, and bullet points for each section</li>
        <li>Review and <strong>approve, edit, or regenerate</strong> the outline before writing</li>
      </ol>

      <h2>Outline Structure</h2>
      <p>A typical outline includes:</p>
      <ul>
        <li><strong>Introduction</strong> — Hook, context, and thesis statement</li>
        <li><strong>3-7 Main Sections (H2)</strong> — Each covering a key aspect of the topic</li>
        <li><strong>Subsections (H3)</strong> — Breaking complex sections into digestible parts</li>
        <li><strong>Key points</strong> — Bullet points for what to cover in each section</li>
        <li><strong>Conclusion</strong> — Summary, key takeaway, and call-to-action</li>
      </ul>

      <h2>Section-by-Section Writing</h2>
      <p>Instead of generating the entire post at once, the <strong>Section-by-Section writer</strong> generates one section at a time. This gives you:</p>
      <ul>
        <li><strong>Granular control</strong> — Review and edit each section before moving to the next</li>
        <li><strong>Better quality</strong> — The AI focuses on one topic at a time for deeper, more relevant content</li>
        <li><strong>Iterative refinement</strong> — Regenerate individual sections without affecting others</li>
        <li><strong>Natural transitions</strong> — Each section is aware of what came before</li>
      </ul>

      <h2>Editing Tips</h2>
      <ul>
        <li><strong>Rearrange sections</strong> if the logical flow could be improved</li>
        <li><strong>Add your own examples</strong> — Personal anecdotes and case studies make content unique</li>
        <li><strong>Remove filler</strong> — Cut any sections that don't add value to the reader</li>
        <li><strong>Check heading hierarchy</strong> — H2 for main topics, H3 for subtopics, H4 for details</li>
      </ul>

      <hr />
      <h2>Next Steps</h2>
      <p>Optimize your post for search engines: <Link to="/knowledge-base/seo-readability">SEO Analysis & Readability Scoring →</Link></p>
    </ArticleLayout>
  );
}
