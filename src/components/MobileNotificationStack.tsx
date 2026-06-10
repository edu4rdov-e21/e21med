"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import WhatsAppNotification from "./WhatsAppNotification";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// No servidor (e no primeiro paint) trata como reduzido: nada renderiza,
// evitando hydration mismatch e flash.
function getServerReducedMotion() {
  return true;
}

type Notification = {
  readonly sender: string;
  readonly time: string;
  readonly message: string;
};

// Ciclo de cada notificação: desliza de cima, permanece, sobe e some,
// pausa generosa, entra a próxima. Sensação de "chegou mensagem".
const ENTER_DELAY_MS = 1400; // espera antes da primeira
const VISIBLE_MS = 4200; // tempo em tela (inclui a entrada de ~500ms)
const EXIT_MS = 450; // duração da saída (precisa casar com o keyframe)
const GAP_MS = 4000; // silêncio entre uma notificação e a próxima

export default function MobileNotificationStack({
  notifications,
}: {
  notifications: readonly Notification[];
}) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"waiting" | "visible" | "exiting">(
    "waiting"
  );
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion
  );

  useEffect(() => {
    if (reducedMotion || notifications.length === 0) return;

    let t: ReturnType<typeof setTimeout>;
    if (phase === "waiting") {
      t = setTimeout(() => setPhase("visible"), ENTER_DELAY_MS);
    } else if (phase === "visible") {
      t = setTimeout(() => setPhase("exiting"), VISIBLE_MS);
    } else {
      t = setTimeout(() => {
        setIndex((i) => (i + 1) % notifications.length);
        setPhase("visible");
      }, EXIT_MS + GAP_MS);
    }
    return () => clearTimeout(t);
  }, [phase, reducedMotion, notifications.length]);

  if (reducedMotion || phase === "waiting") return null;

  const current = notifications[index];

  return (
    <div
      aria-hidden="true"
      className="lg:hidden pointer-events-none absolute top-3 inset-x-3 z-20 flex justify-center"
    >
      <div
        key={`${index}-${phase}`}
        className={`w-full max-w-sm ${
          phase === "exiting" ? "animate-notif-out" : "animate-notif-in"
        }`}
      >
        <WhatsAppNotification
          sender={current.sender}
          time={current.time}
          message={current.message}
        />
      </div>
    </div>
  );
}
