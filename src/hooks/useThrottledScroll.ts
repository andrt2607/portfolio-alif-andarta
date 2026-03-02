import { useEffect, useRef, useCallback } from 'react';

export const useThrottledScroll = (callback: (scrollY: number) => void, delay = 16) => {
  const timeoutRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  const throttledCallback = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY !== lastScrollY.current) {
      callback(currentScrollY);
      lastScrollY.current = currentScrollY;
    }
  }, [callback]);

  useEffect(() => {
    const handleScroll = () => {
      if (timeoutRef.current) {
        cancelAnimationFrame(timeoutRef.current);
      }
      timeoutRef.current = requestAnimationFrame(throttledCallback);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        cancelAnimationFrame(timeoutRef.current);
      }
    };
  }, [throttledCallback]);
};

export const useDebounced = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    }) as T,
    [callback, delay]
  );
};