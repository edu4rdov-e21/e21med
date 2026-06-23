// Tipo do lead normalizado e a função que converte o `record` cru do
// Database Webhook (colunas da tabela `contacts`) num objeto tipado.
//
// Colunas vistas no insert do form (src/lib/leads.ts) + colunas geradas
// pelo banco (`id`, `created_at`). `id`/`created_at` são lidos de forma
// defensiva: se não vierem no payload, viram null (a função não quebra).

export type Lead = {
  id: string | null;
  createdAt: string | null; // ISO vindo do banco (timestamptz)
  name: string;
  whatsapp: string;
  specialty: string;
  instagram: string | null;
  revenue: string | null;
  funnel: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  referrer: string | null;
};

type RawRecord = Record<string, unknown>;

/** Coage pra string aparada ou null (vazio/ausente => null). */
function toStr(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed === "" ? null : trimmed;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return null;
}

/** Campo obrigatório: nunca null, cai pra "" se ausente. */
function toRequired(value: unknown): string {
  return toStr(value) ?? "";
}

export function normalizeRecord(record: RawRecord): Lead {
  return {
    id: toStr(record.id),
    createdAt: toStr(record.created_at),
    name: toRequired(record.name),
    whatsapp: toRequired(record.whatsapp),
    specialty: toRequired(record.specialty),
    instagram: toStr(record.instagram),
    revenue: toStr(record.revenue),
    funnel: toStr(record.funnel),
    utmSource: toStr(record.utm_source),
    utmMedium: toStr(record.utm_medium),
    utmCampaign: toStr(record.utm_campaign),
    utmContent: toStr(record.utm_content),
    utmTerm: toStr(record.utm_term),
    referrer: toStr(record.referrer),
  };
}
