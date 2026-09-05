import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
}

const SITE_NAME = "Laundry Wash";

const setMetaDescription = (content: string) => {
  let tag = document.querySelector('meta[name="description"]');

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", "description");
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

export default function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    document.title = `${title} | ${SITE_NAME}`;
    setMetaDescription(description);
  }, [title, description]);

  return null;
}
