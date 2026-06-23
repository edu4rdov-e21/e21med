# sync-lead-to-sheet

Edge Function que, a cada novo lead inserido na tabela `contacts`, faz **append**
de uma linha numa **Google Sheet**. Disparada por um **Database Webhook** (que
você configura no painel). O fluxo do formulário **não muda** e o lead já fica
salvo no banco antes do append, então a planilha é só um espelho tolerante a
falha.

> **Regra de ouro:** nenhum segredo fica no repositório. Aqui só há nomes de
> variáveis e placeholders. Os valores reais entram via `supabase secrets set`
> (ou pelo painel) — passos abaixo.

## Variáveis (secrets) que a função lê em runtime

| Secret | O que é |
| --- | --- |
| `WEBHOOK_SECRET` | senha aleatória que valida a origem do webhook |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `client_email` do JSON da service account |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | `private_key` do JSON (bloco PEM inteiro) |
| `GOOGLE_SHEET_ID` | id da planilha (trecho da URL) |
| `GOOGLE_SHEET_TAB` | nome da aba, ex.: `Leads` |

---

## Pré-requisitos do CLI

```bash
supabase login                                   # uma vez (abre o navegador)
supabase link --project-ref itizksxupmgjbslypiwz # liga o repo ao projeto e21-landing
```

---

## 1) Extrair os dois campos do JSON da service account

Abra o arquivo `.json` da service account num editor de texto e localize:

- **`client_email`** — algo como `minha-sa@meu-projeto.iam.gserviceaccount.com`.
- **`private_key`** — um bloco grande começando com
  `-----BEGIN PRIVATE KEY-----` e terminando com `-----END PRIVATE KEY-----`.
  No JSON ele aparece numa linha só, com as quebras de linha escapadas como
  `\n` (literais). **Cole o bloco inteiro, entre aspas, do jeito que está**
  (com os `\n`). O código já desescapa esses `\n` antes de usar a chave.

> A planilha já precisa estar **compartilhada com o `client_email` como Editor**
> (você já fez isso).

## 2) Definir os secrets

Rode um por um (substitua os placeholders pelos valores reais):

```bash
supabase secrets set WEBHOOK_SECRET="<gere-uma-senha-aleatoria-longa>"
supabase secrets set GOOGLE_SERVICE_ACCOUNT_EMAIL="<client_email do JSON>"
supabase secrets set GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="<cole a private_key inteira, com as aspas>"
supabase secrets set GOOGLE_SHEET_ID="<id da planilha, da URL>"
supabase secrets set GOOGLE_SHEET_TAB="<nome da aba, ex: Leads>"
```

- **Onde achar o `GOOGLE_SHEET_ID`:** na URL da planilha, é o trecho entre
  `/d/` e `/edit`. Ex.: em
  `https://docs.google.com/spreadsheets/d/`**`1AbC...xyz`**`/edit#gid=0`,
  o id é `1AbC...xyz`.
- **Sobre a `private_key` no terminal:** mantenha os `\n` como estão no JSON
  (literais) e envolva tudo em **aspas duplas**. O código faz
  `replace(/\\n/g, "\n")` antes de assinar, então funciona com os `\n`
  escapados. **Se o shell reclamar** das aspas ou dos caracteres especiais,
  use a alternativa à prova de erro: painel do Supabase →
  **Project Settings → Edge Functions → Secrets** e cole o valor pela
  interface (sem se preocupar com aspas/escape).

## 3) Gerar o `WEBHOOK_SECRET`

```bash
openssl rand -hex 32
```

**Guarde esse valor** — você vai precisar dele de novo no passo do webhook
(passo 5), porque o header do webhook tem que ter exatamente esse valor.

## 4) Deploy da função

```bash
supabase functions deploy sync-lead-to-sheet
```

O `verify_jwt = false` já está no `supabase/config.toml` (a auth é feita pelo
nosso header secreto, não por JWT do Supabase). Se sua versão do CLI ignorar o
config, force com a flag: `supabase functions deploy sync-lead-to-sheet --no-verify-jwt`.

A URL da função fica:
`https://itizksxupmgjbslypiwz.supabase.co/functions/v1/sync-lead-to-sheet`

## 5) Criar o Database Webhook no painel

Painel do Supabase → **Database → Webhooks → Create a new hook**:

- **Table:** `contacts`
- **Events:** `Insert`
- **Type:** `HTTP Request` → **POST**
- **URL:** a URL da função (acima)
- **HTTP Headers:** adicione um header
  - **nome:** `x-webhook-secret`  ← é exatamente esse nome que o `index.ts` espera
  - **valor:** o mesmo `WEBHOOK_SECRET` do passo 3

Sem esse header (ou com valor errado), a função responde **401** e não escreve
nada.

## 6) Testar

### Local

Crie um `.env` local (gitignorado) a partir do `.env.example` com valores de
teste e rode:

```bash
supabase functions serve sync-lead-to-sheet \
  --env-file ./supabase/functions/sync-lead-to-sheet/.env
```

Em outro terminal, dispare um payload de webhook fake com o header secreto:

```bash
curl -i -X POST \
  http://localhost:54321/functions/v1/sync-lead-to-sheet \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: <o mesmo WEBHOOK_SECRET>" \
  -d '{
    "type": "INSERT",
    "table": "contacts",
    "record": {
      "id": 999,
      "created_at": "2026-06-21T17:30:00.000Z",
      "name": "Teste Local",
      "whatsapp": "61999999999",
      "specialty": "Dermatologia",
      "instagram": "teste",
      "revenue": "De R$ 50.000 a R$ 100.000",
      "funnel": "med",
      "utm_source": "teste-curl",
      "utm_medium": null,
      "utm_campaign": null,
      "utm_content": null,
      "utm_term": null,
      "referrer": null
    }
  }'
```

Esperado: **HTTP 200** com `{"ok":true,...}` e uma **nova linha na planilha**
(aba do `GOOGLE_SHEET_TAB`). Header errado/ausente → **401**. Se a planilha
falhar (ex.: secret do Google errado), a resposta ainda é **200** e o erro
aparece nos logs do `serve` — por design, falha de planilha não derruba a
resposta.

### Em produção

Repita o mesmo `curl` contra a URL pública (com o `WEBHOOK_SECRET` real), ou
simplesmente envie o formulário do site e confira a planilha. Logs em
**Edge Functions → sync-lead-to-sheet → Logs**.

## 7) Boas práticas com o arquivo JSON

Depois de extrair `client_email` e `private_key`, **guarde o JSON fora do
projeto** e fora de pastas sincronizadas (iCloud/Drive/Dropbox). Ele **não
precisa** ficar no repositório em hipótese alguma. O `.gitignore` já bloqueia
`*.json` de service account, `*.env` e `*.key`/`*.pem`, mas o melhor é o arquivo
nem morar aqui dentro.

---

## Ordem das colunas na planilha

A função escreve nesta ordem (colunas A..N). Crie os cabeçalhos na aba na mesma
ordem (opcional, mas recomendado):

```
Data/hora (Brasília) | ID | Nome | WhatsApp | Especialidade | Instagram |
Faturamento | Funil | utm_source | utm_medium | utm_campaign | utm_content |
utm_term | Referrer
```

A coluna **Data/hora** é o `created_at` formatado no fuso `America/Sao_Paulo`
(`DD/MM/AAAA HH:mm:ss`).
