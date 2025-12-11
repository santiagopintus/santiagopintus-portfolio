import { useEffect, useState, useRef, useCallback } from 'react';

interface UseScrollSpyOptions {
  offset?: number; // Header height offset (default: 80)
  threshold?: number[]; // Intersection thresholds
}

interface UseScrollSpyReturn {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function useScrollSpy(
  sectionIds: readonly string[],
  options: UseScrollSpyOptions = {}
): UseScrollSpyReturn {
  const [activeSection, setActiveSectionState] = useState<string>(sectionIds[0] || '');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isLockedRef = useRef(false);
  const lockTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { offset = 80, threshold = [0, 0.25, 0.5, 0.75, 1] } = options;

  // Function to manually set active section (for nav clicks)
  const setActiveSection = useCallback((section: string) => {
    setActiveSectionState(section);

    // Lock the observer temporarily
    isLockedRef.current = true;

    // Clear any existing timeout
    if (lockTimeoutRef.current) {
      clearTimeout(lockTimeoutRef.current);
    }

    // Unlock after scroll ends (using scrollend event)
    const unlockOnScrollEnd = () => {
      // Add a small delay to ensure scroll has fully stopped
      lockTimeoutRef.current = setTimeout(() => {
        isLockedRef.current = false;
      }, 100);

      window.removeEventListener('scrollend', unlockOnScrollEnd);
    };

    window.addEventListener('scrollend', unlockOnScrollEnd, { once: true });

    // Fallback: unlock after max 1000ms if scrollend doesn't fire
    lockTimeoutRef.current = setTimeout(() => {
      isLockedRef.current = false;
      window.removeEventListener('scrollend', unlockOnScrollEnd);
    }, 1000);
  }, []);

  useEffect(() => {
    // Create map to track intersection ratios
    const visibleSections = new Map<string, number>();

    // Check if user is at the bottom of the page
    const isAtBottom = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;
      // Consider "at bottom" if within 100px of the bottom
      return scrollHeight - (scrollTop + clientHeight) < 100;
    };

    // Observer callback
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Skip observer updates if locked (during manual navigation)
      if (isLockedRef.current) {
        return;
      }

      entries.forEach((entry) => {
        const sectionId = entry.target.id;

        if (entry.isIntersecting) {
          visibleSections.set(sectionId, entry.intersectionRatio);
        } else {
          visibleSections.delete(sectionId);
        }
      });

      // If user is at the bottom of the page, activate the last section
      if (isAtBottom()) {
        setActiveSectionState(sectionIds[sectionIds.length - 1]);
        return;
      }

      // Find section with highest visibility ratio
      // Only update if we have at least one visible section
      if (visibleSections.size > 0) {
        let maxRatio = 0;
        let mostVisibleSection = sectionIds[0];

        visibleSections.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisibleSection = id;
          }
        });

        setActiveSectionState(mostVisibleSection);
      }
      // If no sections are visible, keep the last active section
    };

    // Create observer
    observerRef.current = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: `-${offset}px 0px -50% 0px`,
      threshold,
    });

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    // Add scroll listener to detect bottom of page
    // (Intersection Observer alone may not catch this for short sections)
    const handleScroll = () => {
      if (isLockedRef.current) {
        return;
      }

      if (isAtBottom()) {
        setActiveSectionState(sectionIds[sectionIds.length - 1]);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (lockTimeoutRef.current) {
        clearTimeout(lockTimeoutRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset, threshold]);

  return { activeSection, setActiveSection };
}
