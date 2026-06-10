"use client";

import { useEffect, useState } from "react";

/**
 * Observa se o elemento que casa com o seletor está visível na viewport.
 * `initial` define o valor antes da primeira medição do IntersectionObserver
 * (útil pra evitar flash: assuma visível pra seções acima da dobra).
 */
export function useSectionVisibility(
  selector: string,
  initial = false,
  threshold = 0
): boolean {
  const [isVisible, setIsVisible] = useState(initial);

  useEffect(() => {
    const node = document.querySelector(selector);
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [selector, threshold]);

  return isVisible;
}
