// Append de um lead numa Google Sheet via Service Account.
//
// ORDEM DAS COLUNAS NA PLANILHA (cabeçalhos esperados na aba, A..N):
//   A: Data/hora (Brasília)  -> created_at formatado em America/Sao_Paulo
//   B: ID
//   C: Nome
//   D: WhatsApp
//   E: Especialidade
//   F: Instagram
//   G: Faturamento
//   H: Funil
//   I: utm_source
//   J: utm_medium
//   K: utm_campaign
//   L: utm_content
//   M: utm_term
//   N: Referrer
//
// Autenticação: assina um JWT RS256 com a private key da service account
// usando a Web Crypto API nativa do Deno (crypto.subtle) — sem nenhuma
// dependência externa — e troca o JWT por um access token no endpoint OAuth
// do Google. Depois chama a Sheets REST API values:append.

import type { Lead } from "./lead.ts";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

function requireEnv(name: string): string {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`Variável de ambiente ${name} não configurada`);
  return value;
}

/** base64url de bytes (sem padding). */
function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** base64url de uma string UTF-8. */
function base64UrlEncodeString(text: string): string {
  return base64UrlEncode(new TextEncoder().encode(text));
}

/** PEM PKCS#8 -> ArrayBuffer DER pra importar no crypto.subtle.
 *  Retorna ArrayBuffer (não Uint8Array) pra satisfazer o tipo BufferSource
 *  do importKey sob o lib estrito do Deno/TS. */
function pemToDer(pem: string): ArrayBuffer {
  const body = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");
  const binary = atob(body);
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return buffer;
}

async function getAccessToken(): Promise<string> {
  const email = requireEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  // A env chega com os "\n" ESCAPADOS (literais "\" + "n"), do jeito que estão
  // no JSON da service account. Desescapamos pra recompor o PEM real antes de
  // importar a chave. Sem isso, o PKCS#8 fica inválido.
  const privateKeyPem = requireEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY").replace(
    /\\n/g,
    "\n",
  );

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claims = {
    iss: email,
    scope: SHEETS_SCOPE,
    aud: GOOGLE_TOKEN_URL,
    iat: now,
    exp: now + 3600,
  };

  const signingInput =
    `${base64UrlEncodeString(JSON.stringify(header))}.${base64UrlEncodeString(JSON.stringify(claims))}`;

  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToDer(privateKeyPem),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = new Uint8Array(
    await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      key,
      new TextEncoder().encode(signingInput),
    ),
  );

  const jwt = `${signingInput}.${base64UrlEncode(signature)}`;

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Falha ao obter access token do Google (${response.status}): ${await response.text()}`,
    );
  }

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("Resposta do Google sem access_token");
  }
  return data.access_token;
}

/** created_at ISO -> "DD/MM/AAAA HH:mm:ss" no fuso de Brasília. */
function formatBrasilia(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const parts = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("day")}/${get("month")}/${get("year")} ${get("hour")}:${get("minute")}:${get("second")}`;
}

/** Monta a linha na ordem dos cabeçalhos documentada acima. */
function leadToRow(lead: Lead): string[] {
  return [
    formatBrasilia(lead.createdAt),
    lead.id ?? "",
    lead.name,
    lead.whatsapp,
    lead.specialty,
    lead.instagram ?? "",
    lead.revenue ?? "",
    lead.funnel ?? "",
    lead.utmSource ?? "",
    lead.utmMedium ?? "",
    lead.utmCampaign ?? "",
    lead.utmContent ?? "",
    lead.utmTerm ?? "",
    lead.referrer ?? "",
  ];
}

export async function appendLeadToSheet(lead: Lead): Promise<void> {
  const sheetId = requireEnv("GOOGLE_SHEET_ID");
  const tab = requireEnv("GOOGLE_SHEET_TAB");
  const token = await getAccessToken();

  // Range = aba!A1; o append insere depois da última linha da tabela.
  const range = encodeURIComponent(`${tab}!A1`);
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}` +
    `/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [leadToRow(lead)] }),
  });

  if (!response.ok) {
    throw new Error(
      `Sheets append falhou (${response.status}): ${await response.text()}`,
    );
  }
}
