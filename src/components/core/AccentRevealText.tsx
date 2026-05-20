import React, { useRef } from "react";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

export interface AccentRevealTextProps {
  text: string;
  highlights?: string[];
  className?: string;
  delayMs?: number;
}

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const renderHighlightedText = (text: string, highlights: string[]) => {
  if (highlights.length === 0) return text;

  const pattern = highlights
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join("|");

  const parts = text.split(new RegExp(`(${pattern})`, "gi"));

  return parts.map((part, index) => {
    const isHighlight = highlights.some(
      (phrase) => phrase.toLowerCase() === part.toLowerCase()
    );

    if (!isHighlight) {
      return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
    }

    return (
      <span
        key={`${part}-${index}`}
        className="font-semibold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-teal-400"
      >
        {part}
      </span>
    );
  });
};

const AccentRevealText: React.FC<AccentRevealTextProps> = ({
  text,
  highlights = [],
  className = "",
  delayMs = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useRevealOnScroll(ref, { delayMs });

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll reveal-left relative pl-5 border-l-[3px] border-blue-500 dark:border-blue-400 ${className}`.trim()}
    >
      <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
        {renderHighlightedText(text, highlights)}
      </p>
    </div>
  );
};

export default AccentRevealText;
