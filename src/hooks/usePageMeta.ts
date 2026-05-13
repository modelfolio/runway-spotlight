import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
}

const setMeta = (name: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const usePageMeta = ({ title, description }: PageMeta) => {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
  }, [title, description]);
};

export default usePageMeta;
