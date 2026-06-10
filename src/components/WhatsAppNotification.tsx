import Image from "next/image";

export default function WhatsAppNotification({
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
          <span className="text-xs text-white/70 flex-shrink-0">{time}</span>
        </div>
        <p className="text-xs text-white/85 leading-snug mt-0.5">{message}</p>
      </div>
    </div>
  );
}
