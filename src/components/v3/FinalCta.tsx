"use client";

import { useState, FormEvent } from "react";
import { FORM } from "@/lib/constants";
import { submitLead } from "@/lib/leads";
import Constellation from "./Constellation";

/**
 * CTA final + form inline (decisão: sem modal — o void comporta o form
 * direto na página; nav e hero chegam aqui por âncora #agendar, então
 * não há evento global de abertura nesta versão).
 */
export default function FinalCta() {
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
    <section
      id="agendar"
      className="relative py-24 sm:py-32 scroll-mt-16 overflow-hidden"
    >
      <Constellation
        variant="converge"
        className="absolute inset-0 w-full h-full"
      />

      <div className="relative max-w-[1200px] mx-auto px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="text-5xl sm:text-6xl leading-[0.95] text-center">
            {FORM.title}
          </h2>
          <p className="mt-6 text-base sm:text-lg text-v3-ash leading-relaxed text-center max-w-[44ch] mx-auto">
            {FORM.subtitle}
          </p>

          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="mt-12 border border-white/10 rounded-3xl p-10 text-center"
            >
              <p className="text-xl font-extralight text-bone leading-relaxed">
                {FORM.successMessage}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col gap-5"
            >
              {FORM.fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-2">
                  <label
                    htmlFor={`v3-${field.name}`}
                    className="v3-eyebrow text-v3-ash"
                  >
                    {field.label}
                    {field.required && (
                      <span aria-hidden="true"> *</span>
                    )}
                  </label>
                  <input
                    id={`v3-${field.name}`}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    autoComplete={field.autoComplete}
                    inputMode={field.inputMode}
                    disabled={isSubmitting}
                    className="w-full bg-transparent text-bone border border-ash rounded-full px-6 py-3.5 text-base placeholder:text-smoke focus:outline-none focus:border-plum-voltage focus:ring-[3px] focus:ring-plum-voltage/30 disabled:opacity-60"
                  />
                </div>
              ))}

              {errorMessage && (
                <p
                  className="text-amber-spark text-sm font-semibold"
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
                className="mt-4 w-full min-h-12 inline-flex items-center justify-center rounded-full bg-plum-voltage text-bone font-semibold text-base px-8 py-4 hover:opacity-90 transition active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
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
