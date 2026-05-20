import React, { useRef } from "react";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

type RevealVariant = "up" | "left";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  delayMs?: number;
}

const variantClass: Record<RevealVariant, string> = {
  up: "reveal-up",
  left: "reveal-left",
};

const Reveal: React.FC<RevealProps> = ({
  children,
  className = "",
  variant = "up",
  delayMs = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useRevealOnScroll(ref, { delayMs });

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${variantClass[variant]} ${className}`.trim()}
    >
      {children}
    </div>
  );
};

export default Reveal;
