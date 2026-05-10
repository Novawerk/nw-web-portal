"use client";

import { useEffect, useState } from "react";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  // Read window.location only after hydration to avoid SSR / client mismatch.
  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard might be blocked — fail silently
    }
  };

  const tweetUrl = url
    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title,
      )}&url=${encodeURIComponent(url)}`
    : "#";

  const mailUrl = url
    ? `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
        url,
      )}`
    : "#";

  return (
    <div className="nw-toc__share">
      <span className="nw-toc__share-label">Share</span>
      <button
        type="button"
        className="nw-toc__share-btn"
        onClick={copyLink}
        aria-live="polite"
      >
        {copied ? "✓ Copied" : "Copy link"}
      </button>
      <a
        className="nw-toc__share-btn"
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        X / Twitter
      </a>
      <a className="nw-toc__share-btn" href={mailUrl}>
        Email
      </a>
    </div>
  );
}
