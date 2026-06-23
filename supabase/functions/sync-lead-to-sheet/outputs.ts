// Sinks: efeitos disparados a cada lead. O index.ts roda todos com
// Promise.allSettled, então a falha de um não derruba os outros nem a
// resposta HTTP. Pra adicionar um destino novo (ex.: WhatsApp), basta
// somar a função na lista — a assinatura é sempre (lead) => Promise<void>.

import type { Lead } from "./lead.ts";
import { appendLeadToSheet } from "./sheets.ts";

export type Sink = (lead: Lead) => Promise<void>;

export const sinks: Sink[] = [
  appendLeadToSheet,
  // notifyWhatsApp, // futuro: notificar o lead no WhatsApp (não implementado)
];
