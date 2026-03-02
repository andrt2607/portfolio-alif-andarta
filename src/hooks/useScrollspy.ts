import { useEffect, useState, useRef, useCallback } from 'react';

export const useScrollspy = (sectionIds: string[], offset = 100) => {
  const [activeId, setActiveId] = useState<string>('');
  const timeoutRef = useRef<number | null>(null);
  
  const checkActiveSection = useCallback(() => {
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const section = document.getElementById(sectionIds[i]);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= offset) {
          setActiveId(sectionIds[i]);
          break;
        }
      }
    }
  }, [sectionIds, offset]);

  useEffect(() => {
    const listener = () => {
      if (timeoutRef.current) {
        cancelAnimationFrame(timeoutRef.current);
      }
      timeoutRef.current = requestAnimationFrame(checkActiveSection);
    };

    window.addEventListener('scroll', listener, { passive: true });
    checkActiveSection(); // Call once to set initial state

    return () => {
      window.removeEventListener('scroll', listener);
      if (timeoutRef.current) {
        cancelAnimationFrame(timeoutRef.current);
      }
    };
  }, [checkActiveSection]);

  return activeId;
};