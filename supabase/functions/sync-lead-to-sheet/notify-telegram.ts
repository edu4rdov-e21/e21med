// notify-telegram.ts
export async function notifyTelegram(input: Record<string, any>): Promise<void> {
  const token = Deno.env.get("TELEGRAM_BOT_TOKEN");
  const chatId = Deno.env.get("TELEGRAM_CHAT_ID");
  if (!token || !chatId) {
    throw new Error("TELEGRAM_BOT_TOKEN ou TELEGRAM_CHAT_ID ausente nos Secrets");
  }
  const lead = input?.record ?? input ?? {};
  const nome = lead.name ?? lead.nome ?? "Sem nome";
  // e21med: o lead normalizado usa `specialty` (área de atuação) — mantido no
  // fim da cadeia de fallbacks pra a Área não vir vazia.
  const area = lead.area ?? lead.categoria ?? lead.profissao ?? lead.specialty ?? "—";
  const revenue = lead.revenue ?? "—";
  // e21med coleta o @ do Instagram (não e-mail); o handle é salvo sem o "@".
  const igHandle = String(lead.instagram ?? lead.instagram_handle ?? "").trim().replace(/^@/, "");
  const instagram = igHandle ? `https://instagram.com/${igHandle}` : "—";
  const digits = String(lead.whatsapp ?? lead.phone ?? lead.telefone ?? "").replace(/\D/g, "");
  const wa = digits ? `https://wa.me/${digits.length <= 11 ? "55" + digits : digits}` : "";
  const text =
    `🔔 Novo lead — E21\n\n` +
    `Nome: ${nome}\n` +
    `Área: ${area}\n` +
    `Faturamento: ${revenue}\n` +
    `Instagram: ${instagram}` +
    (wa ? `\nWhatsApp: ${wa}` : "");
  const resp = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  if (!resp.ok) throw new Error(`Telegram falhou (${resp.status}): ${await resp.text()}`);
}
