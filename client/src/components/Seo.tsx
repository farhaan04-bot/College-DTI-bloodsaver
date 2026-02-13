import { useEffect } from "react";

export function Seo(props: { title: string; description: string }) {
  const { title, description } = props;

  useEffect(() => {
    document.title = title;

    const ensureMeta = (name: string) => {
      let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      return tag;
    };

    ensureMeta("description").setAttribute("content", description);
  }, [title, description]);

  return null;
}
