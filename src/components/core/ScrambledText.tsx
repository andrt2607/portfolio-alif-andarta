import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const isTouchDevice = (): boolean =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches);

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style = {},
  children,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current || isTouchDevice()) return;

    const paragraph = rootRef.current.querySelector("p");
    if (!paragraph) return;

    const split = SplitText.create(paragraph, {
      type: "chars",
      charsClass: "inline-block will-change-transform",
    });

    split.chars.forEach((el) => {
      const c = el as HTMLElement;
      gsap.set(c, { attr: { "data-content": c.innerHTML } });
    });

    const radiusSq = radius * radius;
    let rafId: number | null = null;
    let lastX = 0;
    let lastY = 0;

    const runScramble = (clientX: number, clientY: number) => {
      for (const el of split.chars) {
        const c = el as HTMLElement;
        const { left, top, width, height } = c.getBoundingClientRect();
        const dx = clientX - (left + width / 2);
        const dy = clientY - (top + height / 2);
        const distSq = dx * dx + dy * dy;

        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq);
          gsap.to(c, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: c.dataset.content || "",
              chars: scrambleChars,
              speed,
            },
            ease: "none",
          });
        }
      }
    };

    const handleMove = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        runScramble(lastX, lastY);
        rafId = null;
      });
    };

    const el = rootRef.current;
    el.addEventListener("pointermove", handleMove, { passive: true });

    return () => {
      el.removeEventListener("pointermove", handleMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div
      ref={rootRef}
      className={`font-mono text-white ${className}`}
      style={style}
    >
      <p>{children}</p>
    </div>
  );
};

export default ScrambledText;
