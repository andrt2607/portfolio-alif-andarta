import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
  useCallback,
} from "react";
import { scrollToSection as scrollToSectionUtil } from "../lib/scrollToSection";

const FAB_THRESHOLD = 300;
const SCROLL_END_DELAY_MS = 150;

interface ScrollState {
  scrollDirection: "up" | "down";
  isScrolled: boolean;
  isNavVisible: boolean;
  isFabVisible: boolean;
}

interface ScrollContextType extends ScrollState {
  scrollToSection: (sectionId: string) => void;
  getScrollY: () => number;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  const scrollYRef = useRef(0);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollDirection: "down",
    isScrolled: false,
    isNavVisible: true,
    isFabVisible: false,
  });

  useEffect(() => {
    let lastScrollY = 0;
    let rafId: number | null = null;

    const markScrolling = () => {
      document.body.classList.add("is-scrolling");

      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }

      scrollEndTimerRef.current = setTimeout(() => {
        document.body.classList.remove("is-scrolling");
      }, SCROLL_END_DELAY_MS);
    };

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        markScrolling();

        const currentScrollY = window.scrollY;
        scrollYRef.current = currentScrollY;

        const direction = currentScrollY > lastScrollY ? "down" : "up";
        const isScrolled = currentScrollY > 50;
        const isFabVisible = currentScrollY > FAB_THRESHOLD;

        let isNavVisible = true;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          isNavVisible = false;
        } else if (currentScrollY < lastScrollY || currentScrollY < 50) {
          isNavVisible = true;
        }

        setScrollState((prev) => {
          if (
            prev.scrollDirection === direction &&
            prev.isScrolled === isScrolled &&
            prev.isNavVisible === isNavVisible &&
            prev.isFabVisible === isFabVisible
          ) {
            return prev;
          }

          return {
            scrollDirection: direction,
            isScrolled,
            isNavVisible,
            isFabVisible,
          };
        });

        lastScrollY = currentScrollY;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
      document.body.classList.remove("is-scrolling");
    };
  }, []);

  const getScrollY = useCallback(() => scrollYRef.current, []);

  const scrollToSection = useCallback((sectionId: string) => {
    scrollToSectionUtil(sectionId);
  }, []);

  const value: ScrollContextType = {
    ...scrollState,
    scrollToSection,
    getScrollY,
  };

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
};
