import { useState, useEffect, RefObject } from 'react';

export function useIntersectionObserver(
  refs: RefObject<HTMLElement>[],
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: '-40px' }
) {
  const [visibleElements, setVisibleElements] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(index));
          }
        });
      },
      options
    );

    const elements = refs
      .map((ref) => ref.current)
      .filter((element): element is HTMLElement => element !== null);

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, [refs, options]);

  return visibleElements;
}

export function useSingleIntersectionObserver(
  ref: RefObject<HTMLElement>,
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: '-40px' }
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      options
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, options]);

  return isVisible;
}
