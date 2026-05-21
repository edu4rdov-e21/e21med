import { getSupabase } from "./supabase";

export type LeadInput = {
  name: string;
  whatsapp: string;
  specialty: string;
  instagram?: string;
};

export type SubmitResult = { success: boolean; error?: string };

export async function submitLead(input: LeadInput): Promise<SubmitResult> {
  const params =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();

  const referrer =
    typeof document !== "undefined" ? document.referrer || null : null;

  const payload = {
    name: input.name.trim(),
    whatsapp: input.whatsapp.trim(),
    specialty: input.specialty.trim(),
    instagram: input.instagram?.trim().replace(/^@/, "") || null,
    funnel: "med",
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
    utm_term: params.get("utm_term"),
    referrer,
  };

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("contacts").insert(payload);

    if (error) {
      console.error("Erro ao salvar lead:", error);
      return {
        success: false,
        error: "Nao foi possivel enviar agora. Tente novamente em instantes.",
      };
    }
  } catch (err) {
    console.error("Erro ao inicializar Supabase:", err);
    return {
      success: false,
      error: "Servico indisponivel no momento. Tente novamente em instantes.",
    };
  }

  return { success: true };
}
