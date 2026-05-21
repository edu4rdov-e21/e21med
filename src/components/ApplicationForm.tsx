"use client";

import { useState, FormEvent } from "react";
import { FORM } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";
import { submitLead } from "@/lib/leads";

export default function ApplicationForm() {
  const { ref, className } = useFadeIn<HTMLDivElement>();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        <div ref={ref} className={className}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-cream mb-4">
              {FORM.title}
            </h2>
            <p className="text-cream/70 text-lg">{FORM.subtitle}</p>
          </div>

          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="bg-cream/10 border border-cream/30 rounded-2xl p-10 text-center"
            >
              <p className="text-cream text-lg leading-relaxed">
                {FORM.successMessage}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-cream/5 border border-cream/15 rounded-2xl p-6 sm:p-10 flex flex-col gap-5"
              noValidate={false}
            >
              {FORM.fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-2">
                  <label
                    htmlFor={field.name}
                    className="text-cream/90 text-sm font-semibold"
                  >
                    {field.label}
                    {field.required && (
                      <span className="text-cream/70"> *</span>
                    )}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    autoComplete={field.autoComplete}
                    inputMode={field.inputMode}
                    disabled={isSubmitting}
                    className="w-full bg-white text-navy rounded-lg px-4 py-3 text-base placeholder:text-navy/60 focus:outline-none focus:ring-2 focus:ring-cream/50 disabled:opacity-60"
                  />
                </div>
              ))}

              {errorMessage && (
                <p
                  className="text-red-300 text-sm"
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
                className="mt-4 bg-white text-navy font-bold rounded-full px-8 py-4 text-base hover:opacity-90 transition-opacity duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Enviando..." : FORM.submitLabel}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
