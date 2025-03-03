
import { useEffect, useState } from 'react';

export function useDelayedRender(delay: number = 100) {
  const [isRendered, setIsRendered] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRendered(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return isRendered;
}

export function useSmoothFadeIn(delay: number = 0, duration: number = 800) {
  return {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: duration / 1000,
      delay: delay / 1000,
      ease: [0.16, 1, 0.3, 1],
    },
  };
}

export function useStaggeredEntrance(
  itemCount: number,
  staggerDelay: number = 100,
  initialDelay: number = 0
) {
  return Array.from({ length: itemCount }).map((_, index) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.5,
      delay: initialDelay / 1000 + (index * staggerDelay) / 1000,
      ease: [0.16, 1, 0.3, 1],
    },
  }));
}
