import { useEffect, useState } from 'react';

export const useScrollspy = (sectionIds: string[], offset = 100) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const listener = () => {
      const scroll = window.scrollY;
      
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
    };

    window.addEventListener('scroll', listener);
    listener(); // Call once to set initial state

    return () => window.removeEventListener('scroll', listener);
  }, [sectionIds, offset]);

  return activeId;
};