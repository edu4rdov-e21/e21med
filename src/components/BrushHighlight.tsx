"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const PATHS = {
  default:
    "M3 35 Q15 8, 45 18 Q80 3, 120 14 Q170 0, 220 8 Q270 2, 320 12 Q360 5, 395 15 L397 38 Q370 48, 330 44 Q280 52, 230 46 Q180 55, 130 48 Q80 56, 40 46 Q15 52, 3 35 Z",
  thick:
    "M2 45 Q20 5, 60 20 Q110 0, 160 15 Q220 -2, 280 12 Q340 2, 390 20 L395 42 Q350 55, 300 48 Q240 58, 180 50 Q120 60, 60 48 Q20 55, 2 45 Z",
};

interface BrushHighlightProps {
  children: React.ReactNode;
  color?: string;
  opacity?: number;
  delay?: number;
  variant?: keyof typeof PATHS;
}

export default function BrushHighlight({
  children,
  color = "#FCD34D",
  opacity = 0.55,
  delay = 0,
  variant = "default",
}: BrushHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let timer: ReturnType<typeof setTimeout> | null = null;
    let fired = false;

    const trigger = () => {
      if (fired) return;
      fired = true;
      timer = setTimeout(() => setVisible(true), delay);
    };

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      trigger();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trigger();
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [delay]);

  const encodedColor = encodeURIComponent(color);
  const path = PATHS[variant];
  const bgImage = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 60' preserveAspectRatio='none'><path d='${path}' fill='${encodedColor}' opacity='${opacity}'/></svg>")`;

  const clipShown = "inset(0 0% 0 0)";
  const clipHidden = "inset(0 100% 0 0)";

  const brushStyle: CSSProperties = {
    position: "absolute",
    inset: "-0.08em -0.18em",
    zIndex: 0,
    backgroundImage: bgImage,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    clipPath: visible ? clipShown : clipHidden,
    WebkitClipPath: visible ? clipShown : clipHidden,
    transition:
      "clip-path 0.9s cubic-bezier(0.25, 0.1, 0.25, 1), -webkit-clip-path 0.9s cubic-bezier(0.25, 0.1, 0.25, 1)",
    pointerEvents: "none",
  };

  return (
    <span
      ref={ref}
      style={{ position: "relative", display: "inline-block" }}
    >
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      <span aria-hidden="true" style={brushStyle} />
    </span>
  );
}
