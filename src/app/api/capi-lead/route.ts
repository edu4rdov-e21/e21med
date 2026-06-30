import { NextResponse } from "next/server";

// Conversions API (server-side) do evento 'Lead'. Usa o MESMO eventID do
// browser pra o Meta deduplicar. Fica INATIVO até definir META_CAPI_ACCESS_TOKEN
// nas envs (Vercel + .env.local) — sem o token, responde no-op e não envia nada.
//
// A e21med NÃO coleta e-mail; então mandamos só o telefone hasheado (ph).
// Se um dia coletar e-mail, hashear em `em: [sha256(email)]` aqui também.

const PIXEL_ID = "683826397666184";
const GRAPH_VERSION = "v21.0";

/** SHA-256 em hex (Web Crypto), pro user_data da Conversions API. */
async function sha256(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Telefone -> só dígitos com DDI Brasil (ex.: "(61) 99999-9999" => 5561999999999). */
function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return digits.startsWith("55") ? digits : `55${digits}`;
}

type Body = {
  eventId?: string;
  whatsapp?: string;
  faturamento?: string;
  especialidade?: string;
  eventSourceUrl?: string;
};

export async function POST(req: Request) {
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  // Sem token => no-op. O pixel do browser já cobre a conversão.
  if (!token) {
    return NextResponse.json({ skipped: "no-token" }, { status: 200 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "bad-json" }, { status: 400 });
  }

  const { eventId, whatsapp, faturamento, especialidade, eventSourceUrl } = body;
  if (!eventId) {
    return NextResponse.json({ error: "missing-eventId" }, { status: 400 });
  }

  const phone = normalizePhone(whatsapp ?? "");
  const userData: Record<string, string[]> = {};
  if (phone) userData.ph = [await sha256(phone)];

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId, // MESMO do browser -> dedup no Meta
        action_source: "website",
        event_source_url: eventSourceUrl ?? "https://e21med.com",
        user_data: userData,
        custom_data: {
          content_name: "Aplicacao E21 Med",
          faturamento: faturamento ?? "",
          especialidade: especialidade ?? "",
        },
      },
    ],
    access_token: token,
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      console.error("CAPI Lead falhou:", data);
      return NextResponse.json({ error: "capi-failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("CAPI Lead erro:", err);
    return NextResponse.json({ error: "capi-error" }, { status: 502 });
  }
}
