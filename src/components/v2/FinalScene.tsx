"use client";

import { useState, type FormEvent } from "react";
import { FORM, WHATSAPP_LEAD_HREF, FOOTER } from "@/lib/constants";
import { submitLead } from "@/lib/leads";
import { fireLeadConversion } from "@/lib/metaPixel";
import WhatsAppIcon from "@/components/WhatsAppIcon";

/**
 * Cena final: o convite. A história dela só começa quando você entra em
 * cena. Um caminho só na tela: o formulário. Mesmo pipeline dos outros
 * forms do site: Supabase -> evento Lead do Meta -> redirect pro WhatsApp.
 */
export default function FinalScene() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const lead = {
      name: (formData.get("nome") as string) || "",
      whatsapp: (formData.get("whatsapp") as string) || "",
      specialty: (formData.get("especialidade") as string) || "",
      instagram: (formData.get("instagram") as string) || "",
      revenue: (formData.get("faturamento") as string) || "",
    };
    const result = await submitLead(lead);

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      // dispara a conversao 'Lead' do Meta (uma vez por envio, eventID unico)
      // apos a validacao e ANTES do redirect pro WhatsApp
      fireLeadConversion({
        whatsapp: lead.whatsapp,
        faturamento: lead.revenue,
        especialidade: lead.specialty,
      });
      // pequeno atraso pra o beacon do pixel sair antes de navegar
      setTimeout(() => {
        window.location.href = WHATSAPP_LEAD_HREF;
      }, 400);
    } else {
      setErrorMessage(result.error || "Erro ao enviar. Tente novamente.");
    }
  }

  const inputClass =
    "w-full border-0 border-b border-v2-bone/25 bg-transparent px-0 py-3 text-base text-v2-bone placeholder:text-v2-bone/35 focus:border-v2-brass-bright focus:outline-none focus:ring-0 disabled:opacity-60";

  return (
    <section
      id="contato"
      className="relative scroll-mt-8 overflow-hidden border-t border-v2-bone/10 bg-v2-ink py-16 sm:py-24"
    >
      {/* a luz do teatro acende no final */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,167,107,0.09),transparent_55%)]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 sm:px-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-16">
        <div>
          <p className="v2-eyebrow text-v2-brass-bright">Cena final · sua vez</p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            O próximo perfil que ela encontra{" "}
            <em className="font-v2-display italic text-v2-brass-bright">
              pode ser o seu
            </em>
            .
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-v2-bone/65">
            {FORM.subtitle}
          </p>
          <div className="mt-10 hidden border-t border-v2-bone/10 pt-6 lg:block">
            <p className="font-v2-mono text-[11px] uppercase tracking-[0.2em] text-v2-bone/40">
              Prefere falar direto?
            </p>
            <a
              href={FOOTER.contact.items[1].href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-lg text-v2-bone/80 transition hover:text-v2-bone"
            >
              {FOOTER.contact.items[1].text}
            </a>
          </div>
        </div>

        <div className="rounded-2xl bg-v2-coal p-7 ring-1 ring-v2-bone/10 sm:p-10">
          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="flex min-h-72 flex-col items-center justify-center text-center"
            >
              <p className="max-w-sm text-base leading-relaxed text-v2-bone/85 sm:text-lg">
                {FORM.successMessage}
              </p>
              <a
                href={WHATSAPP_LEAD_HREF}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white transition hover:brightness-95 active:scale-[0.97]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Abrir o WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {FORM.fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-1">
                  <label
                    htmlFor={`v2-${field.name}`}
                    className="font-v2-mono text-[10px] uppercase tracking-[0.2em] text-v2-bone/50"
                  >
                    {field.label}
                    {field.required && <span aria-hidden="true"> *</span>}
                  </label>
                  {"options" in field ? (
                    <select
                      id={`v2-${field.name}`}
                      name={field.name}
                      required={field.required}
                      disabled={isSubmitting}
                      defaultValue=""
                      className={`${inputClass} appearance-none invalid:text-v2-bone/35 [&>option]:bg-v2-coal [&>option]:text-v2-bone`}
                    >
                      <option value="" disabled>
                        {field.placeholder}
                      </option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
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
                      className={inputClass}
                    />
                  )}
                </div>
              ))}

              {errorMessage && (
                <p role="alert" className="text-sm text-red-400">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-v2-brass-bright px-8 py-3.5 text-base font-semibold text-v2-ink transition hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
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
