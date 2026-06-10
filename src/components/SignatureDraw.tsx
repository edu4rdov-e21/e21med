"use client";

/**
 * Assinatura manuscrita "Eduardo" que se desenha quando `play` é true.
 * O nome real fica em texto sr-only; o SVG é só apresentação.
 * Com prefers-reduced-motion o bloco global zera a duração das animações
 * e o fill-mode "both" deixa o traço completo imediatamente.
 */
export default function SignatureDraw({
  name,
  play,
}: {
  name: string;
  play: boolean;
}) {
  return (
    <span className="block">
      <span className="sr-only">{name}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 300 100"
        fill="none"
        className="h-14 sm:h-16 w-auto -ml-1"
      >
        <path
          pathLength={1}
          className={play ? "signature-stroke" : "signature-stroke-idle"}
          stroke="var(--color-navy)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M 28 24
             C 18 26, 12 38, 16 48
             C 8 52, 6 66, 18 68
             C 30 70, 40 60, 44 50
             C 48 38, 52 40, 54 50
             C 50 46, 44 56, 50 64
             C 54 68, 60 62, 62 50
             C 64 36, 66 20, 61 16
             C 57 13, 57 32, 58 44
             C 59 56, 62 66, 68 66
             C 73 66, 75 58, 76 53
             C 76 60, 77 66, 82 66
             C 87 66, 89 58, 90 53
             C 90 60, 91 66, 96 66
             C 100 66, 103 60, 104 55
             C 102 50, 98 56, 101 62
             C 104 68, 111 62, 113 50
             C 115 36, 117 22, 112 18
             C 108 15, 108 32, 109 44
             C 110 56, 113 66, 119 65
             C 124 64, 128 58, 127 53
             C 126 48, 119 50, 119 56
             C 119 62, 125 64, 130 60
             C 136 55, 142 52, 150 52"
        />
        <path
          pathLength={1}
          className={
            play ? "signature-stroke-underline" : "signature-stroke-idle"
          }
          stroke="var(--color-navy)"
          strokeWidth="2"
          strokeLinecap="round"
          d="M 14 82 C 52 90, 112 88, 162 76"
        />
      </svg>
    </span>
  );
}
