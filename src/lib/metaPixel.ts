// Helpers do Meta Pixel para a conversão 'Lead'.
// O pixel base (id 683826397666184) já é injetado pelo MetaPixel.tsx no layout;
// aqui só disparamos o evento de conversão no envio do formulário.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type LeadProps = {
  faturamento: string;
  especialidade: string;
};

/**
 * eventID único por envio. O MESMO id vai pro evento do browser (fbq) e pro
 * server-side (Conversions API), pra o Meta deduplicar os dois.
 */
export function newEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // fallback improvável (browser antigo / contexto não-seguro)
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Dispara o evento padrão 'Lead' no browser via fbq, com o eventID.
 * No-op se o pixel ainda não carregou. Guarda o último eventID no localStorage.
 */
function trackLeadBrowser(props: LeadProps, eventId: string): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  window.fbq(
    "track",
    "Lead",
    {
      content_name: "Aplicacao E21 Med",
      faturamento: props.faturamento,
      especialidade: props.especialidade,
    },
    { eventID: eventId }
  );

  try {
    window.localStorage.setItem("e21:lastLeadEventId", eventId);
  } catch {
    /* localStorage pode falhar (modo privado): ignora */
  }
}

/**
 * Manda o MESMO evento pro nosso endpoint server-side, que repassa pra
 * Conversions API com o telefone hasheado e o mesmo eventID. Fire-and-forget
 * com keepalive (sobrevive ao redirect). O endpoint é no-op se não houver
 * access token configurado, então isto nunca quebra o fluxo do form.
 */
function sendCapiLead(payload: {
  eventId: string;
  whatsapp: string;
  faturamento: string;
  especialidade: string;
}): void {
  if (typeof window === "undefined") return;
  try {
    void fetch("/api/capi-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, eventSourceUrl: window.location.href }),
      keepalive: true,
    }).catch(() => {
      /* tracking nunca derruba o envio do lead */
    });
  } catch {
    /* idem */
  }
}

/**
 * Dispara a conversão 'Lead' UMA vez por envio válido: gera o eventID, manda
 * pro browser (fbq) e pro server-side (CAPI, opcional). Retorna o eventID.
 * Chamar APÓS validação e ANTES do redirect. Nunca chamar no page load.
 */
export function fireLeadConversion(input: {
  whatsapp: string;
  faturamento: string;
  especialidade: string;
}): string {
  const eventId = newEventId();
  trackLeadBrowser(
    { faturamento: input.faturamento, especialidade: input.especialidade },
    eventId
  );
  sendCapiLead({
    eventId,
    whatsapp: input.whatsapp,
    faturamento: input.faturamento,
    especialidade: input.especialidade,
  });
  return eventId;
}
