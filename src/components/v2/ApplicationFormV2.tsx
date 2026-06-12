"use client";

import { useState, FormEvent } from "react";
import { FORM } from "@/lib/constants";
import { useFadeIn } from "@/hooks/useFadeIn";
import { submitLead } from "@/lib/leads";

export default function ApplicationFormV2() {
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
      revenue: (formData.get("faturamento") as string) || "",
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setErrorMessage(result.error || "Erro ao enviar. Tente novamente.");
    }
  }

  return (
    <section id="formulario-v2" className="bg-parchment py-16 sm:py-24 scroll-mt-8">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
        <div ref={ref} className={`${className} max-w-xl mx-auto`}>
          <div className="text-center mb-10">
            <h2 className="font-v2-display text-3xl sm:text-5xl text-ink leading-[1.1] mb-4">
              {FORM.title}
            </h2>
            <p className="text-base text-graphite leading-relaxed">
              {FORM.subtitle}
            </p>
          </div>

          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="bg-aged-paper rounded-3xl p-10 text-center"
            >
              <p className="font-v2-display italic font-light text-xl text-ink leading-relaxed">
                {FORM.successMessage}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-aged-paper rounded-3xl p-6 sm:p-10 flex flex-col gap-4"
            >
              {FORM.fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-1.5">
                  <label
                    htmlFor={`v2-${field.name}`}
                    className="text-sm font-semibold text-ink"
                  >
                    {field.label}
                    {field.required && (
                      <span className="text-graphite"> *</span>
                    )}
                  </label>
                  {"options" in field ? (
                    <select
                      id={`v2-${field.name}`}
                      name={field.name}
                      required={field.required}
                      disabled={isSubmitting}
                      defaultValue=""
                      className="w-full appearance-none bg-parchment text-ink border border-ash rounded-full px-5 py-3 text-base focus:outline-none focus:border-terracotta-seal focus:ring-[3px] focus:ring-terracotta-seal/20 disabled:opacity-60 invalid:text-graphite"
                    >
                      <option value="" disabled>
                        {field.placeholder}
                      </option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={`v2-${field.name}`}
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      autoComplete={field.autoComplete}
                      inputMode={field.inputMode}
                      disabled={isSubmitting}
                      className="w-full bg-parchment text-ink border border-ash rounded-full px-5 py-3 text-base placeholder:text-graphite focus:outline-none focus:border-terracotta-seal focus:ring-[3px] focus:ring-terracotta-seal/20 disabled:opacity-60"
                    />
                  )}
                </div>
              ))}

              {errorMessage && (
                <p
                  className="text-terracotta-seal text-sm font-semibold"
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
                className="mt-3 w-full min-h-12 inline-flex items-center justify-center rounded-[40px] bg-terracotta-seal text-parchment font-semibold text-base px-7 py-3.5 hover:opacity-90 transition duration-300 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-seal focus-visible:ring-offset-2 focus-visible:ring-offset-aged-paper"
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
