// Shared scrolling helpers for in-page navigation (anchor links and the back-to-top button).

// Smooth scrolling, unless the visitor has asked the system for reduced motion.
export function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

// Scroll the window back to the top of the page.
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: scrollBehavior() });
}
