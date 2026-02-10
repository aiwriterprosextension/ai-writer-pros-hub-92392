import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  schema?: object;
}

export function SEOHead({ title, description, keywords, canonical, ogTitle, ogDescription, schema }: SEOHeadProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    if (ogTitle) setMeta("og:title", ogTitle, "property");
    if (ogDescription) setMeta("og:description", ogDescription, "property");
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // Schema
    if (schema) {
      const id = "page-schema";
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = id;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
      return () => { script?.remove(); };
    }
  }, [title, description, keywords, canonical, ogTitle, ogDescription, schema]);

  return null;
}
