"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { FORM } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";
import { submitLead } from "@/lib/leads";

export default function ApplicationForm() {
  const { ref, className } = useFadeIn<HTMLDivElement>();
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  function openModal() {
    setSubmitted(false);
    setErrorMessage(null);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setTimeout(() => triggerRef.current?.focus(), 100);
  }

  // Body scroll lock + initial focus enquanto modal aberta
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstFieldRef.current?.focus(), 80);
    return () => {
      document.body.style.overflow = original;
      clearTimeout(t);
    };
  }, [isOpen]);

  // ESC fecha o modal
  useEffect(() => {
    if (!isOpen) return;
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
      }
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitLead({
      name: (formData.get("nome") as string) || "",
      whatsapp: (formData.get("whatsapp") as string) || "",
      specialty: (formData.get("especialidade") as string) || "",
      instagram: (formData.get("instagram") as string) || "",
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setErrorMessage(result.error || "Erro ao enviar. Tente novamente.");
    }
  }

  return (
    <section id="formulario" className="bg-navy py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16">
        <div ref={ref} className={`${className} text-center`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-cream mb-4 leading-tight">
            {FORM.title}
          </h2>
          <p className="text-cream/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            {FORM.subtitle}
          </p>
          <button
            ref={triggerRef}
            type="button"
            onClick={openModal}
            className="inline-flex items-center justify-center rounded-full bg-cream text-navy font-bold px-8 py-4 text-base sm:text-lg hover:opacity-90 transition-opacity duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-4 focus-visible:ring-offset-navy"
          >
            {FORM.submitLabel}
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="form-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in"
        >
          <button
            type="button"
            aria-label="Fechar formulário"
            onClick={closeModal}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
            tabIndex={-1}
          />

          <div
            className="relative w-full max-w-lg bg-cream rounded-2xl shadow-2xl border-l-4 border-l-navy max-h-[90vh] overflow-y-auto animate-fade-in-up"
            style={{ animationDuration: "300ms" }}
          >
            <button
              type="button"
              aria-label="Fechar"
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full text-navy/60 hover:text-navy hover:bg-navy/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="p-6 sm:p-10">
              <h3
                id="form-modal-title"
                className="text-2xl sm:text-3xl text-navy mb-2 leading-tight pr-8"
              >
                {FORM.title}
              </h3>
              <p className="text-navy/70 text-sm sm:text-base leading-relaxed mb-6">
                {FORM.subtitle}
              </p>

              {submitted ? (
                <div
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  className="bg-navy/5 border border-navy/15 rounded-xl p-6 text-center"
                >
                  <p className="text-navy text-base sm:text-lg leading-relaxed">
                    {FORM.successMessage}
                  </p>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-navy text-cream font-bold px-6 py-3 text-sm hover:bg-navy-dark transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                  >
                    Fechar
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                  noValidate={false}
                >
                  {FORM.fields.map((field, i) => (
                    <div key={field.name} className="flex flex-col gap-1.5">
                      <label
                        htmlFor={field.name}
                        className="text-navy text-sm font-semibold"
                      >
                        {field.label}
                        {field.required && (
                          <span className="text-navy/60"> *</span>
                        )}
                      </label>
                      <input
                        ref={i === 0 ? firstFieldRef : undefined}
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        required={field.required}
                        autoComplete={field.autoComplete}
                        inputMode={field.inputMode}
                        disabled={isSubmitting}
                        className="w-full bg-white text-navy border border-navy/15 rounded-lg px-4 py-3 text-base placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-navy/40 focus:border-navy/40 disabled:opacity-60"
                      />
                    </div>
                  ))}

                  {errorMessage && (
                    <p
                      className="text-red-600 text-sm"
                      role="alert"
                      aria-live="polite"
                    >
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="mt-2 bg-navy text-cream font-bold rounded-full px-8 py-4 text-base hover:bg-navy-dark transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
                  >
                    {isSubmitting ? "Enviando..." : FORM.submitLabel}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
