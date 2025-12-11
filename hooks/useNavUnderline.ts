import { useEffect, useState, useCallback, RefObject } from 'react';

interface UnderlinePosition {
  left: number;
  width: number;
}

export function useNavUnderline(
  activeSection: string,
  navContainerRef: RefObject<HTMLElement | null>
): UnderlinePosition | null {
  const [position, setPosition] = useState<UnderlinePosition | null>(null);

  const calculatePosition = useCallback(() => {
    if (!navContainerRef.current) return;

    // Find active link element
    const activeLinkElement = navContainerRef.current.querySelector(
      `[data-section="${activeSection}"]`
    ) as HTMLElement;

    if (!activeLinkElement) return;

    const containerRect = navContainerRef.current.getBoundingClientRect();
    const linkRect = activeLinkElement.getBoundingClientRect();

    setPosition({
      left: linkRect.left - containerRect.left,
      width: linkRect.width,
    });
  }, [activeSection, navContainerRef]);

  // Calculate on mount and when dependencies change
  useEffect(() => {
    calculatePosition();
  }, [calculatePosition]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => {
      calculatePosition();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculatePosition]);

  // Recalculate after small delay (for font loading, etc.)
  useEffect(() => {
    const timer = setTimeout(calculatePosition, 100);
    return () => clearTimeout(timer);
  }, [calculatePosition]);

  return position;
}
