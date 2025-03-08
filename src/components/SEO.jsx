import { useEffect } from "react";

export function SEO({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  canonical,
}) {
  useEffect(() => {
    document.title = title || "";

    const updateMeta = (name, content, attr = "name") => {
      let meta = document.querySelector(`meta[${attr}="${name}"]`);

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", content || "");
    };

    if (description) updateMeta("description", description);
    if (keywords) updateMeta("keywords", keywords);
    if (ogTitle) updateMeta("og:title", ogTitle, "property");
    if (ogDescription) updateMeta("og:description", ogDescription, "property");

    let link = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    return () => {};
  }, [title, description, keywords, ogTitle, ogDescription, canonical]);

  return null;
}
