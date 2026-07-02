import type { ReactNode } from "react";

/**
 * O palco recorrente da história: a tela dela. Frame de celular desenhado em
 * CSS (sem imagem de device), com a luz da tela vazando pro teatro escuro.
 */
export default function PhoneFrame({
  children,
  className = "",
  glow = true,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`relative rounded-[2.6rem] border border-v2-bone/20 bg-black p-2 ${
        glow
          ? "shadow-[0_0_80px_-12px_rgba(201,167,107,0.25),0_40px_100px_-30px_rgba(0,0,0,0.9)]"
          : "shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]"
      } ${className}`}
    >
      {/* ilha da câmera frontal */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-4 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10"
      />
      <div className="relative aspect-[9/19] overflow-hidden rounded-[2.1rem] bg-v2-coal">
        {children}
      </div>
    </div>
  );
}
