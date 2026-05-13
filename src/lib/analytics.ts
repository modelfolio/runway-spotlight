const GA_ID = "G-XXXXXXXXXX";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const pageview = (path: string, title?: string) => {
  window.gtag?.("config", GA_ID, {
    page_path: path,
    page_title: title,
  });
};

export const event = (
  action: string,
  params?: Record<string, string | number | boolean>
) => {
  window.gtag?.("event", action, params);
};
