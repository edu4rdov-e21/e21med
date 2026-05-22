"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { HERO } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";

function WhatsAppNotification({
  sender,
  time,
  message,
}: {
  sender: string;
  time: string;
  message: string;
}) {
  return (
    <div className="flex items-start gap-2.5 sm:gap-3 rounded-2xl bg-[#1f1f1f]/95 backdrop-blur-md px-3 sm:px-3.5 py-2.5 sm:py-3 ring-1 ring-white/10 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.55)]">
      <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#25D366] flex items-center justify-center">
        <Image
          src="/images/notifications/whatsapp.webp"
          alt=""
          aria-hidden="true"
          width={36}
          height={36}
          className="w-5 h-5 sm:w-6 sm:h-6"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-semibold text-xs text-white truncate">
            {sender}
          </span>
          <span className="text-xs text-white/70 flex-shrink-0">
            {time}
          </span>
        </div>
        <p className="text-xs text-white/85 leading-snug mt-0.5">
          {message}
        </p>
      </div>
    </div>
  );
}

export default function Hero() {
  const { ref, className } = useFadeIn<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  function toggleVideo() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }

  return (
    <section className="relative overflow-hidden bg-navy-dark pt-[68%] lg:pt-20 lg:pb-20 lg:min-h-[720px] flex flex-col justify-end lg:flex-row lg:items-center lg:justify-center lg:gap-12 xl:gap-16 lg:px-10 xl:px-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/e21-studio-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          opacity: 0.22,
          mixBlendMode: "luminosity",
        }}
      />
      <div
        className="
          absolute inset-0
          lg:relative lg:inset-auto lg:order-2
          lg:w-[440px] lg:h-[550px] lg:flex-shrink-0
        "
      >
        <div className="absolute inset-0 lg:rounded-2xl lg:overflow-hidden lg:ring-1 lg:ring-cream/15 lg:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/video/takes-poster.jpg"
            className="w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src={HERO.videoSrc} type="video/mp4" />
          </video>
          <button
            type="button"
            onClick={toggleVideo}
            aria-label={isPlaying ? "Pausar vídeo de bastidores" : "Reproduzir vídeo de bastidores"}
            className="absolute bottom-3 right-3 z-30 inline-flex items-center justify-center w-9 h-9 rounded-full bg-navy-dark/70 backdrop-blur-md text-cream ring-1 ring-cream/20 hover:bg-navy-dark/90 transition-colors"
          >
            {isPlaying ? (
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="currentColor"
              >
                <rect x="3" y="2" width="3" height="10" rx="0.5" />
                <rect x="8" y="2" width="3" height="10" rx="0.5" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="currentColor"
              >
                <path d="M3 2v10l9-5L3 2z" />
              </svg>
            )}
          </button>
        </div>

        <div
          aria-hidden="true"
          className="absolute z-20 pointer-events-none animate-popup top-[8%] left-3 w-[62%] sm:w-[45%] lg:top-6 lg:-left-14 lg:w-[280px]"
          style={{ animationDelay: "0.8s" }}
        >
          <WhatsAppNotification
            sender={HERO.notifications[0].sender}
            time={HERO.notifications[0].time}
            message={HERO.notifications[0].message}
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute z-20 pointer-events-none animate-popup top-[28%] right-3 w-[58%] sm:w-[42%] lg:top-[55%] lg:-right-16 lg:w-[280px]"
          style={{ animationDelay: "1.2s" }}
        >
          <WhatsAppNotification
            sender={HERO.notifications[1].sender}
            time={HERO.notifications[1].time}
            message={HERO.notifications[1].message}
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-full h-[65%] lg:hidden"
        style={{
          background:
            "linear-gradient(to top, rgba(15,36,64,0.96) 0%, rgba(15,36,64,0.7) 40%, rgba(15,36,64,0) 100%)",
        }}
      />

      <div className="relative z-10 lg:order-1 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-10 sm:pb-14 lg:p-0 lg:mx-0 lg:max-w-2xl lg:flex-1">
        <div
          ref={ref}
          className={`${className} flex flex-col items-center text-center lg:items-start lg:text-left gap-5 sm:gap-7`}
        >
          <div className="flex flex-col items-center lg:items-start gap-3">
            <Image
              src="/logos/e21-med.svg"
              alt={HERO.badge}
              width={1712}
              height={1286}
              priority
              className="w-32 sm:w-40 h-auto lg:hidden"
              style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.3))" }}
            />
            <Image
              src="/logos/e21-med-left.svg"
              alt={HERO.badge}
              width={1560}
              height={1286}
              priority
              className="hidden lg:block lg:w-44 h-auto"
              style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.3))" }}
            />
            <p className="text-xs text-cream/70">
              {HERO.subBadgePre}
              <a
                href={HERO.subBadgeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream font-semibold hover:text-cream transition-colors"
              >
                {HERO.subBadgeHandle}
              </a>
            </p>
          </div>

          <h1
            className="text-xl sm:text-2xl lg:text-4xl text-cream leading-tight"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.35)" }}
          >
            {HERO.headlinePre.trimEnd()}
            <br />
            <span className="marker">{HERO.headlineHighlight}</span>
            {HERO.headlinePost}
          </h1>

          <p
            className="text-sm sm:text-base lg:text-lg text-cream/70 leading-relaxed max-w-xl"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}
          >
            {HERO.subheadlinePre}
            <strong className="text-cream font-semibold">
              {HERO.subheadlineStrong}
            </strong>
            {HERO.subheadlinePost}
          </p>

          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("e21:open-application"))
            }
            className="inline-flex items-center justify-center rounded-full bg-cream text-navy px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold hover:bg-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            {HERO.ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
