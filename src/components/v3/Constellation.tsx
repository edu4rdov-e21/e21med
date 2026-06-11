"use client";

import { useEffect, useRef } from "react";

type Variant = "hero" | "symbols" | "converge" | "field" | "phase";

/**
 * Constellation — sistema de partículas em canvas 2D.
 * A metáfora da página: cada partícula é um paciente; o cluster
 * se formando no void é a audiência sendo construída.
 *
 * Variants:
 * - "symbols": as partículas formam símbolos da medicina (DNA,
 *   estetoscópio, seringa, ECG) e morfam de um pro outro a cada
 *   SYMBOL_HOLD_S segundos — pedido explícito do Eduardo, sobrepondo
 *   a regra original de "formas só orgânicas". A mola de atração faz
 *   a transição entre formas sem código extra de morph.
 * - "hero": cluster gaussiano denso com dispersão nas bordas
 * - "converge": cluster apertado central
 * - "field": campo esparso ambiente
 * - "phase": densidade interpolada por intensity (0..1)
 *
 * Performance: loop inteiro fora do React (refs), DPR capado em 2,
 * pausa via IntersectionObserver + document.hidden, densidade reduzida
 * em viewports estreitas. prefers-reduced-motion: um único frame
 * estático já formado (no "symbols", o primeiro símbolo).
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
  symbols: {
    clusterRatio: 0.78, // fração das partículas presas ao símbolo
    radiusFactor: 0.28,
    areaPerParticle: 1500,
    center: [0.5, 0.47],
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
    clusterRatio: 0.45,
    radiusFactor: 0.4,
    areaPerParticle: 8000,
    center: [0.5, 0.5],
  },
};

const SYMBOL_HOLD_S = 5.5; // tempo que cada símbolo fica formado

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

/* ---------- geradores dos símbolos médicos ----------
   Cada gerador devolve `n` pontos em espaço unitário
   (x e y em -0.5..0.5, y positivo pra baixo), depois escalados
   pra min(w,h) * 0.72 e centrados no canvas. */

type Pt = [number, number];

function ptsLine(a: Pt, b: Pt, n: number): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1);
    out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
  }
  return out;
}

function ptsArc(
  cx: number,
  cy: number,
  r: number,
  a0: number,
  a1: number,
  n: number
): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const a = a0 + (a1 - a0) * t;
    out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return out;
}

function ptsQuad(a: Pt, c: Pt, b: Pt, n: number): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const mt = 1 - t;
    out.push([
      mt * mt * a[0] + 2 * mt * t * c[0] + t * t * b[0],
      mt * mt * a[1] + 2 * mt * t * c[1] + t * t * b[1],
    ]);
  }
  return out;
}

function pad(points: Pt[], n: number): Pt[] {
  while (points.length < n) {
    points.push(points[Math.floor(points.length / 2) % points.length]);
  }
  return points.slice(0, n);
}

// DNA: dupla hélice vertical com 6 degraus
function shapeDNA(n: number): Pt[] {
  const out: Pt[] = [];
  const nStrand = Math.floor(n * 0.36);
  for (let s = 0; s < 2; s++) {
    for (let i = 0; i < nStrand; i++) {
      const t = i / (nStrand - 1);
      out.push([
        Math.sin(t * Math.PI * 3 + s * Math.PI) * 0.17,
        (t - 0.5) * 0.92,
      ]);
    }
  }
  const rungs = 6;
  const per = Math.max(2, Math.floor((n - out.length) / rungs));
  for (let k = 0; k < rungs; k++) {
    const t = (k + 0.5) / rungs;
    const y = (t - 0.5) * 0.92;
    out.push(
      ...ptsLine(
        [Math.sin(t * Math.PI * 3) * 0.17, y],
        [Math.sin(t * Math.PI * 3 + Math.PI) * 0.17, y],
        per
      )
    );
  }
  return pad(out, n);
}

// Estetoscópio: binaurais em Y, tubo com laço e diafragma
function shapeStethoscope(n: number): Pt[] {
  const out: Pt[] = [];
  out.push(
    ...ptsQuad([-0.17, -0.46], [-0.19, -0.18], [-0.02, -0.04], Math.floor(n * 0.18))
  );
  out.push(
    ...ptsQuad([0.17, -0.46], [0.19, -0.18], [0.02, -0.04], Math.floor(n * 0.18))
  );
  // tubo descendo do Y até o laço
  out.push(...ptsLine([0, -0.03], [0.02, 0.1], Math.floor(n * 0.08)));
  // laço do tubo
  out.push(
    ...ptsArc(0.04, 0.24, 0.15, -Math.PI / 2, Math.PI * 1.05, Math.floor(n * 0.3))
  );
  // diafragma (anel duplo) na ponta do laço
  out.push(
    ...ptsArc(-0.14, 0.3, 0.075, 0, Math.PI * 2, Math.floor(n * 0.16))
  );
  out.push(
    ...ptsArc(-0.14, 0.3, 0.038, 0, Math.PI * 2, Math.floor(n * 0.1))
  );
  return pad(out, n);
}

// Seringa: corpo, flange, êmbolo e agulha, rotacionada -30°
function shapeSyringe(n: number): Pt[] {
  const raw: Pt[] = [];
  const bx0 = -0.07;
  const bx1 = 0.23;
  const by = 0.075;
  raw.push(...ptsLine([bx0, -by], [bx1, -by], Math.floor(n * 0.16)));
  raw.push(...ptsLine([bx0, by], [bx1, by], Math.floor(n * 0.16)));
  raw.push(...ptsLine([bx0, -by], [bx0, by], Math.floor(n * 0.06)));
  raw.push(...ptsLine([bx1, -by], [bx1, by], Math.floor(n * 0.06)));
  // flange traseira
  raw.push(...ptsLine([bx0, -0.13], [bx0, 0.13], Math.floor(n * 0.08)));
  // êmbolo
  raw.push(...ptsLine([-0.24, 0], [bx0, 0], Math.floor(n * 0.1)));
  raw.push(...ptsLine([-0.24, -0.06], [-0.24, 0.06], Math.floor(n * 0.05)));
  // bico cônico + agulha
  raw.push(...ptsLine([bx1, -0.03], [0.29, -0.01], Math.floor(n * 0.03)));
  raw.push(...ptsLine([bx1, 0.03], [0.29, 0.01], Math.floor(n * 0.03)));
  raw.push(...ptsLine([0.29, 0], [0.47, 0], Math.floor(n * 0.1)));
  // graduações no corpo
  for (let k = 1; k <= 3; k++) {
    const x = bx0 + ((bx1 - bx0) * k) / 4;
    raw.push(...ptsLine([x, -by], [x, -0.025], Math.floor(n * 0.02)));
  }
  const a = (-30 * Math.PI) / 180;
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  return pad(
    raw.map(([x, y]) => [x * cos - y * sin, x * sin + y * cos] as Pt),
    n
  );
}

// ECG: linha de pulso com complexo QRS
function shapePulse(n: number): Pt[] {
  const verts: Pt[] = [
    [-0.5, 0],
    [-0.28, 0],
    [-0.24, -0.05],
    [-0.2, 0],
    [-0.12, 0],
    [-0.09, 0.05],
    [-0.04, -0.26],
    [0.01, 0.1],
    [0.05, 0],
    [0.5, 0],
  ];
  let total = 0;
  const lens: number[] = [];
  for (let i = 0; i < verts.length - 1; i++) {
    const l = Math.hypot(
      verts[i + 1][0] - verts[i][0],
      verts[i + 1][1] - verts[i][1]
    );
    lens.push(l);
    total += l;
  }
  const out: Pt[] = [];
  for (let i = 0; i < verts.length - 1; i++) {
    out.push(
      ...ptsLine(verts[i], verts[i + 1], Math.max(2, Math.round((lens[i] / total) * n)))
    );
  }
  return pad(out, n);
}

const SYMBOL_SHAPES = [shapeDNA, shapeStethoscope, shapeSyringe, shapePulse];

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
    let symbolCount = 0;
    let shapeIdx = 0;
    let lastSwitchMs = 0;
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

    function assignSymbolTargets(idx: number) {
      const scale = Math.min(width, height) * 0.72;
      const cx = 0.5 * width;
      // no mobile o texto ocupa a metade inferior — símbolo sobe
      const cy = (width < 700 ? 0.34 : 0.47) * height;
      const pts = SYMBOL_SHAPES[idx % SYMBOL_SHAPES.length](symbolCount);
      for (let i = 0; i < symbolCount; i++) {
        const [px, py] = pts[i % pts.length];
        particles[i].tx = cx + px * scale + (rand() - 0.5) * 3;
        particles[i].ty = cy + py * scale + (rand() - 0.5) * 3;
      }
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
      const isSymbols = variant === "symbols";

      particles = Array.from({ length: count }, (_, i) => {
        const inCluster = i < count * p.clusterRatio;
        let tx: number;
        let ty: number;
        if (inCluster && !isSymbols) {
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
          x: tx + (rand() - 0.5) * 120,
          y: ty + (rand() - 0.5) * 120,
          size: isSymbols && inCluster
            ? 1.6 + rand() * 1.8
            : 1 + rand() * 2.5 + core * 1.2,
          shape: rand() < 0.62 ? 0 : 1 + Math.floor(rand() * 3),
          color: pickColor(rand),
          baseAlpha: isSymbols && inCluster
            ? 0.55 + rand() * 0.4
            : 0.25 + rand() * 0.45 + core * 0.3,
          twinklePhase: rand() * Math.PI * 2,
          twinkleSpeed: 0.3 + rand() * 0.9,
          driftPhaseX: rand() * Math.PI * 2,
          driftPhaseY: rand() * Math.PI * 2,
          driftFreqX: 0.08 + rand() * 0.16,
          driftFreqY: 0.07 + rand() * 0.15,
          // partículas do símbolo derivam pouco pra forma ficar legível
          driftAmp: isSymbols && inCluster
            ? 1.5 + rand() * 2.5
            : inCluster
              ? 5 + rand() * 9
              : 12 + rand() * 16,
          rot: rand() * Math.PI * 2,
          rotSpeed: (rand() - 0.5) * 0.4,
          repelX: 0,
          repelY: 0,
        };
      });

      if (isSymbols) {
        symbolCount = Math.floor(count * p.clusterRatio);
        assignSymbolTargets(shapeIdx);
        // nasce perto do símbolo já formado
        for (let i = 0; i < symbolCount; i++) {
          particles[i].x = particles[i].tx + (rand() - 0.5) * 160;
          particles[i].y = particles[i].ty + (rand() - 0.5) * 160;
        }
      }
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

      // troca de símbolo: as molas levam as partículas pro novo alvo
      if (variant === "symbols" && !reducedMotion) {
        if (lastSwitchMs === 0) lastSwitchMs = tMs;
        if (tMs - lastSwitchMs > SYMBOL_HOLD_S * 1000) {
          shapeIdx = (shapeIdx + 1) % SYMBOL_SHAPES.length;
          assignSymbolTargets(shapeIdx);
          lastSwitchMs = tMs;
        }
      }

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
