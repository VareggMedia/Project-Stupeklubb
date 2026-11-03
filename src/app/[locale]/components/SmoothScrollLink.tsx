"use client";
import type { ReactNode } from "react";

// In-page anchor that scrolls smoothly (unless the user prefers reduced motion).
// Without JS it still works as a plain jump link.
export default function SmoothScrollLink({
  targetId,
  className,
  children,
}: {
  targetId: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={`#${targetId}`}
      className={className}
      onClick={(e) => {
        const target = document.getElementById(targetId);
        if (!target) return;
        e.preventDefault();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
        history.replaceState(null, "", `#${targetId}`);
      }}
    >
      {children}
    </a>
  );
}
