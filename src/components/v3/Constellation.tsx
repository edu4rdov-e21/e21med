"use client";

import { useEffect, useRef } from "react";

type Variant = "hero" | "converge" | "field" | "phase";

/**
 * Constellation — sistema de partículas em canvas 2D.
 * A metáfora da página: cada partícula é um paciente; o cluster
 * se formando no void é a audiência sendo construída.
 *
 * Parâmetros por variante (ajuste fino aqui):
 * - clusterRatio: fração das partículas presas ao cluster central;
 *   o resto deriva livre nas bordas
 * - radiusFactor: raio do cluster como fração do menor lado do canvas
 * - areaPerParticle: px² por partícula (menor = mais denso)
 * - center: centro do cluster em coordenadas normalizadas (0..1)
 *
 * Em "phase", intensity (0..1) interpola densidade e aperto do cluster:
 * Mês 01 esparso -> Mês 06 denso.
 *
 * Performance: loop inteiro fora do React (refs), DPR capado em 2,
 * pausa via IntersectionObserver + document.hidden, densidade reduzida
 * em viewports estreitas. prefers-reduced-motion: um único frame
 * estático da constelação já formada.
 */
const VARIANT_PARAMS: Record<
  Variant,
  {
    clusterRatio: number;
    radiusFactor: number;
    areaPerParticle: number;
    center: [number, number];
  }
> = {
  hero: {
    clusterRatio: 0.75,
    radiusFactor: 0.28,
    areaPerParticle: 2000,
    center: [0.55, 0.46],
  },
  converge: {
    clusterRatio: 0.88,
    radiusFactor: 0.2,
    areaPerParticle: 3000,
    center: [0.5, 0.5],
  },
  field: {
    clusterRatio: 0,
    radiusFactor: 0.4,
    areaPerParticle: 9500,
    center: [0.5, 0.5],
  },
  phase: {
    clusterRatio: 0.45, // interpolado com intensity
    radiusFactor: 0.4,
    areaPerParticle: 8000,
    center: [0.5, 0.5],
  },
};

// bone e plum dominam; amber/lichen são salpicos raros
const PALETTE: Array<[string, number]> = [
  ["#ffffff", 0.54],
  ["#8052ff", 0.32],
  ["#ffb829", 0.07],
  ["#15846e", 0.07],
];

function pickColor(rand: () => number): string {
  const r = rand();
  let acc = 0;
  for (const [color, w] of PALETTE) {
    acc += w;
    if (r <= acc) return color;
  }
  return "#ffffff";
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// gaussiana via Box-Muller — cluster com núcleo denso e borda suave
function gaussian(rand: () => number): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = rand();
  while (v === 0) v = rand();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

type Particle = {
  tx: number;
  ty: number;
  x: number;
  y: number;
  size: number;
  shape: number; // 0 circle, 1 triangle, 2 diamond, 3 square
  color: string;
  baseAlpha: number;
  twinklePhase: number;
  twinkleSpeed: number;
  driftPhaseX: number;
  driftPhaseY: number;
  driftFreqX: number;
  driftFreqY: number;
  driftAmp: number;
  rot: number;
  rotSpeed: number;
  repelX: number;
  repelY: number;
};

export default function Constellation({
  variant,
  intensity = 1,
  interactive = false,
  className,
}: {
  variant: Variant;
  /** 0..1 — usado por "phase" pra escalar densidade/aperto do cluster */
  intensity?: number;
  interactive?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const rand = Math.random;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    let inView = true;
    const pointer = { x: -9999, y: -9999, active: false };

    function params() {
      const base = VARIANT_PARAMS[variant];
      if (variant !== "phase") return base;
      return {
        clusterRatio: lerp(0.4, 0.94, intensity),
        radiusFactor: lerp(0.45, 0.22, intensity),
        areaPerParticle: lerp(9000, 1000, intensity),
        center: base.center,
      };
    }

    function buildParticles() {
      const p = params();
      const area = width * height;
      const narrow = width < 700 ? 0.55 : 1; // mobile: ~1/3 do desktop somando à área menor
      const count = Math.max(
        40,
        Math.min(900, Math.round((area / p.areaPerParticle) * narrow))
      );
      const cx = p.center[0] * width;
      const cy = p.center[1] * height;
      const radius = p.radiusFactor * Math.min(width, height);

      particles = Array.from({ length: count }, (_, i) => {
        const inCluster = i < count * p.clusterRatio;
        let tx: number;
        let ty: number;
        if (inCluster) {
          tx = cx + gaussian(rand) * radius * 0.55;
          ty = cy + gaussian(rand) * radius * 0.5;
        } else {
          tx = rand() * width;
          ty = rand() * height;
        }
        const distToCore = Math.hypot(tx - cx, ty - cy) / (radius || 1);
        const core = inCluster ? Math.max(0, 1 - distToCore) : 0;

        return {
          tx,
          ty,
          // nasce perto do alvo com algum espalhamento — convergência sutil no load
          x: tx + (rand() - 0.5) * 120,
          y: ty + (rand() - 0.5) * 120,
          size: 1 + rand() * 2.5 + core * 1.2,
          shape: rand() < 0.62 ? 0 : 1 + Math.floor(rand() * 3),
          color: pickColor(rand),
          baseAlpha: 0.25 + rand() * 0.45 + core * 0.3,
          twinklePhase: rand() * Math.PI * 2,
          twinkleSpeed: 0.3 + rand() * 0.9,
          driftPhaseX: rand() * Math.PI * 2,
          driftPhaseY: rand() * Math.PI * 2,
          driftFreqX: 0.08 + rand() * 0.16,
          driftFreqY: 0.07 + rand() * 0.15,
          driftAmp: inCluster ? 5 + rand() * 9 : 12 + rand() * 16,
          rot: rand() * Math.PI * 2,
          rotSpeed: (rand() - 0.5) * 0.4,
          repelX: 0,
          repelY: 0,
        };
      });
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    }

    function drawShape(pt: Particle, x: number, y: number, rot: number) {
      const s = pt.size;
      ctx!.beginPath();
      if (pt.shape === 0) {
        ctx!.arc(x, y, s * 0.6, 0, Math.PI * 2);
      } else {
        ctx!.save();
        ctx!.translate(x, y);
        ctx!.rotate(pt.shape === 2 ? rot + Math.PI / 4 : rot);
        if (pt.shape === 1) {
          ctx!.moveTo(0, -s * 0.7);
          ctx!.lineTo(s * 0.62, s * 0.45);
          ctx!.lineTo(-s * 0.62, s * 0.45);
          ctx!.closePath();
        } else {
          ctx!.rect(-s * 0.5, -s * 0.5, s, s);
        }
        ctx!.restore();
      }
      ctx!.fill();
    }

    function frame(tMs: number) {
      const t = tMs / 1000;
      ctx!.clearRect(0, 0, width, height);

      for (const pt of particles) {
        const driftX =
          Math.sin(t * pt.driftFreqX * Math.PI * 2 + pt.driftPhaseX) *
          pt.driftAmp;
        const driftY =
          Math.cos(t * pt.driftFreqY * Math.PI * 2 + pt.driftPhaseY) *
          pt.driftAmp;

        // mola suave em direção ao alvo + deriva orgânica
        pt.x += (pt.tx + driftX - pt.x) * 0.022;
        pt.y += (pt.ty + driftY - pt.y) * 0.022;

        // repulsão sutil do ponteiro (desktop, interactive)
        if (interactive && pointer.active) {
          const dx = pt.x - pointer.x;
          const dy = pt.y - pointer.y;
          const d = Math.hypot(dx, dy);
          const R = 130;
          if (d < R && d > 0.001) {
            const f = (1 - d / R) * 26;
            pt.repelX += ((dx / d) * f - pt.repelX) * 0.12;
            pt.repelY += ((dy / d) * f - pt.repelY) * 0.12;
          } else {
            pt.repelX *= 0.9;
            pt.repelY *= 0.9;
          }
        }

        pt.rot += pt.rotSpeed * 0.016;
        const alpha =
          pt.baseAlpha *
          (0.78 + 0.22 * Math.sin(t * pt.twinkleSpeed + pt.twinklePhase));
        ctx!.globalAlpha = Math.min(1, alpha);
        ctx!.fillStyle = pt.color;
        drawShape(pt, pt.x + pt.repelX, pt.y + pt.repelY, pt.rot);
      }
      ctx!.globalAlpha = 1;
    }

    function loop(tMs: number) {
      if (!running) return;
      frame(tMs);
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reducedMotion) return;
      if (!inView || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function drawStatic() {
      // frame único: constelação já formada (posição = alvo + jitter leve)
      ctx!.clearRect(0, 0, width, height);
      for (const pt of particles) {
        pt.x = pt.tx + (rand() - 0.5) * 6;
        pt.y = pt.ty + (rand() - 0.5) * 6;
        ctx!.globalAlpha = Math.min(1, pt.baseAlpha);
        ctx!.fillStyle = pt.color;
        drawShape(pt, pt.x, pt.y, pt.rot);
      }
      ctx!.globalAlpha = 1;
    }

    resize();
    // frame estático imediato: garante conteúdo mesmo com a aba em
    // background (document.hidden) ou com motion reduzido; o loop
    // assume a partir daqui quando a página fica visível
    drawStatic();
    if (!reducedMotion) start();

    const ro = new ResizeObserver(() => {
      resize();
      drawStatic();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    io.observe(canvas);

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }
    document.addEventListener("visibilitychange", onVisibility);

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        pointer.x >= 0 &&
        pointer.y >= 0 &&
        pointer.x <= rect.width &&
        pointer.y <= rect.height;
    }
    function onPointerLeave() {
      pointer.active = false;
    }
    if (interactive && !reducedMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (interactive && !reducedMotion) {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerleave", onPointerLeave);
      }
    };
  }, [variant, intensity, interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none ${className ?? ""}`}
    />
  );
}
