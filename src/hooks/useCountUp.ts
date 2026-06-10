"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Anima um número de 0 até `target` quando o elemento entra na viewport
 * (uma única vez), desacelerando no final (easeOutCubic).
 * Com prefers-reduced-motion mostra o valor final direto.
 */
export function useCountUp<T extends HTMLElement = HTMLElement>(
  target: number,
  durationMs = 1600
) {
  const ref = useRef<T | null>(null);
  const startedRef = useRef(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        observer.disconnect();

        if (
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
          setValue(target);
          return;
        }

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(target * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, durationMs]);

  return { ref, value };
}
