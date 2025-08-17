import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ScrollState {
  scrollY: number;
  scrollDirection: 'up' | 'down';
  isScrolled: boolean;
  isVisible: boolean;
}

interface ScrollContextType extends ScrollState {
  updateVisibility: (threshold: number) => boolean;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollDirection: 'down',
    isScrolled: false,
    isVisible: true,
  });

  useEffect(() => {
    let lastScrollY = 0;
    let timeoutId: number | null = null;

    const handleScroll = () => {
      if (timeoutId) {
        cancelAnimationFrame(timeoutId);
      }

      timeoutId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const direction = currentScrollY > lastScrollY ? 'down' : 'up';
        const isScrolled = currentScrollY > 50;
        
        // Basic visibility logic (can be overridden by components)
        let isVisible = true;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          isVisible = false; // Scrolling down past threshold
        } else if (currentScrollY < lastScrollY || currentScrollY < 50) {
          isVisible = true; // Scrolling up or near top
        }

        setScrollState({
          scrollY: currentScrollY,
          scrollDirection: direction,
          isScrolled,
          isVisible,
        });

        lastScrollY = currentScrollY;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call once to set initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        cancelAnimationFrame(timeoutId);
      }
    };
  }, []);

  const updateVisibility = (threshold: number): boolean => {
    return scrollState.scrollY > threshold;
  };

  const value: ScrollContextType = {
    ...scrollState,
    updateVisibility,
  };

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
};