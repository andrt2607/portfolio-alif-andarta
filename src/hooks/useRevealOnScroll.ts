import { RefObject, useEffect } from "react";

interface RevealOptions {
  once?: boolean;
  rootMargin?: string;
  delayMs?: number;
}

export const useRevealOnScroll = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  { once = true, rootMargin = "-40px", delayMs = 0 }: RevealOptions = {}
): void => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let delayTimer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const reveal = () => element.classList.add("is-visible");

        if (delayMs > 0) {
          delayTimer = setTimeout(reveal, delayMs);
        } else {
          reveal();
        }

        if (once) observer.disconnect();
      },
      { rootMargin, threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (delayTimer) clearTimeout(delayTimer);
    };
  }, [ref, once, rootMargin, delayMs]);
};
