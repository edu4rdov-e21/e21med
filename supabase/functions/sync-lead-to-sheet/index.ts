// Edge Function: sync-lead-to-sheet
//
// Disparada por um Database Webhook no INSERT da tabela `contacts`. Valida a
// origem por um header secreto, normaliza o `record` e roda os sinks (hoje:
// append na Google Sheet). Responde 200 mesmo se um sink falhar — o lead já
// está salvo no banco; os sinks são best-effort.

import { normalizeRecord } from "./lead.ts";
import { sinks } from "./outputs.ts";

// Nome do header que o Database Webhook precisa enviar (valor == WEBHOOK_SECRET).
const WEBHOOK_SECRET_HEADER = "x-webhook-secret";

/** Comparação em tempo (quase) constante pra evitar timing attack no segredo. */
function timingSafeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);
  if (aBytes.length !== bBytes.length) return false;
  let diff = 0;
  for (let i = 0; i < aBytes.length; i++) diff |= aBytes[i] ^ bBytes[i];
  return diff === 0;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

type WebhookPayload = {
  type?: string;
  table?: string;
  record?: Record<string, unknown>;
};

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return json({ error: "Method Not Allowed" }, 405);
  }

  // Validação de origem pelo header secreto.
  const expected = Deno.env.get("WEBHOOK_SECRET");
  const provided = req.headers.get(WEBHOOK_SECRET_HEADER) ?? "";
  if (!expected) {
    console.error("WEBHOOK_SECRET não configurado no ambiente da função");
    return json({ error: "Unauthorized" }, 401);
  }
  if (!timingSafeEqual(provided, expected)) {
    console.warn("Webhook rejeitado: segredo inválido ou ausente");
    return json({ error: "Unauthorized" }, 401);
  }

  // Corpo do Database Webhook: { type, table, record, schema, old_record }.
  let payload: WebhookPayload;
  try {
    payload = (await req.json()) as WebhookPayload;
  } catch {
    return json({ error: "Bad Request: JSON inválido" }, 400);
  }

  const { type, table, record } = payload;
  if (!record || typeof record !== "object") {
    return json({ error: "Bad Request: sem record" }, 400);
  }
  // Só processa INSERT; outros eventos são reconhecidos mas ignorados.
  if (type && type !== "INSERT") {
    console.log(`Evento ignorado (type=${type}, table=${table ?? "?"})`);
    return json({ ok: true, skipped: true });
  }

  const lead = normalizeRecord(record);
  // Log seguro: só id, funil e timestamp. Nunca o payload pessoal completo.
  console.log(
    `Lead recebido id=${lead.id ?? "?"} funnel=${lead.funnel ?? "?"} at=${new Date().toISOString()}`,
  );

  const results = await Promise.allSettled(sinks.map((sink) => sink(lead)));
  results.forEach((result, index) => {
    const name = sinks[index].name || `sink#${index}`;
    if (result.status === "rejected") {
      const reason =
        result.reason instanceof Error
          ? result.reason.message
          : String(result.reason);
      console.error(`Sink "${name}" falhou (lead id=${lead.id ?? "?"}): ${reason}`);
    } else {
      console.log(`Sink "${name}" ok (lead id=${lead.id ?? "?"})`);
    }
  });

  // Sempre 200: planilha é tolerante a falha, o lead já está no banco.
  return json({
    ok: true,
    sinks: results.map((result, index) => ({
      sink: sinks[index].name || `sink#${index}`,
      status: result.status,
    })),
  });
});
