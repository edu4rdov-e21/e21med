interface NotificationPopupProps {
  description: string;
  className?: string;
  delay?: number;
}

export default function NotificationPopup({
  description,
  className = "",
  delay = 0,
}: NotificationPopupProps) {
  return (
    <div
      className={`absolute bg-white rounded-2xl shadow-2xl ring-1 ring-navy/10 p-4 sm:p-5 animate-popup pointer-events-none ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <p className="text-[10px] sm:text-xs text-navy/70 font-medium leading-snug tracking-wide font-sans">
        {description}
      </p>
    </div>
  );
}
