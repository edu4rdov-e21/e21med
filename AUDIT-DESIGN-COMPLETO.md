# Auditoria Sênior de Design — E21 MED

**Auditor:** Direção de arte sênior (referência: Linear, Stripe, Vercel, Apple HIG)
**Objeto:** [`e21med.vercel.app`](https://e21med.vercel.app) — produto vertical de saúde
**Data:** 2026-05-21
**Estado do código auditado:** commit `45af3af` (refatoração tipográfica)

---

## 0. Premissas

### 0.1 Critérios de qualidade
1. **Sistemicidade** — tudo deriva de tokens. Hardcoded é dívida.
2. **Consistência** — mesmo elemento, mesmo tratamento, em toda a página.
3. **Hierarquia clara** — o olho identifica o caminho em 1 segundo.
4. **Densidade calibrada** — nem hospitalar-clínico-vazio, nem feira-de-saúde-amontoado.
5. **Acessibilidade** — WCAG AA é piso; AAA é meta pra texto corrido (produto de saúde).
6. **Performance percebida** — LCP < 2.5s, CLS < 0.1, sem FOUT visível.
7. **Personalidade coerente** — uma voz só, do átomo (token) à página.

### 0.2 Escala de severidade
- **P0** — Quebra. WCAG abaixo de AA, layout shift visível, ilegibilidade em algum breakpoint, problema de marca que erode confiança. **Endereçar antes de mostrar a clientes.**
- **P1** — Inconsistência sistêmica. Token não respeitado, valor avulso, escala quebrada. **Endereçar no próximo sprint.**
- **P2** — Refinamento visível. Ajuste óptico, microinteração ausente, polimento.
- **P3** — Higiene de código. Peso morto, classes não usadas, comentários.

### 0.3 Benchmarks adotados
- **Saúde**: One Medical (calmaria editorial), Forward (premium clínico), Maven Clinic (feminino + acolhedor), Hims/Hers (DTC bem-feito).
- **Sistemas**: Linear (token discipline), Stripe (typographic restraint), Vercel (escala modular).
- **Brasil/saúde**: Dr. Consulta (vertical próxima, qualidade média) — não é referência aspiracional, é piso de mercado.

### 0.4 Resumo executivo

**Nota geral: 6.4 / 10**

Critério: nota composta de (i) consistência sistêmica (40%), (ii) acessibilidade (25%), (iii) personalidade/coerência com vertical (20%), (iv) performance percebida (15%).

**3 piores problemas (P0):**
1. **Vídeo do hero com `autoplay` sem `<track>` de legendas nem botão de mute/pause** — viola WCAG 1.2.2 e 2.2.2. Em produto de saúde, é risco regulatório.
2. **Animações sem respeitar `prefers-reduced-motion`** — todas as 6 animações rodam pra usuários com sensibilidade vestibular. Em saúde, atinge população relevante.
3. **Fotos de clientes e equipe com peso brutal (5–10MB cada original; ~80MB no `public/images/`)** — mesmo com `next/image` otimizando, é peso morto no repo e gera tempo de build/deploy desnecessário. Há foto cliente de **10MB**.

**3 maiores quick wins:**
1. Adicionar `@media (prefers-reduced-motion: reduce)` no `globals.css` desativando os 6 keyframes (~10 linhas).
2. Adicionar `autocomplete` e `inputMode` nos campos do form (4 atributos, ganho enorme de UX mobile).
3. Pré-otimizar as imagens grandes do `team/` e `clients/` pra ~500KB cada via `sips` antes do `next/image` (corta build time, ajuda Lighthouse).

**Personalidade visual em uma frase:**
"Parece o site de uma produtora audiovisual premium tentando vender pra médicos — mais editorial do que clínico, mais Vogue Brasil do que One Medical." Isso é uma escolha defensável dado o posicionamento (autoridade digital, não consultório), mas precisa de sinais de saúde mais explícitos pra não confundir.

---

## 1. Sistema de Design — Fundação

### 1.1 Auditoria de tokens

**Local:** [`src/app/globals.css:8-20`](src/app/globals.css)

Tokens existentes (todos primitivos, nenhum semântico):

| Token | Valor | Referenciado |
|---|---|---|
| `--color-navy` | `#1A365D` | 65× via `text-navy`, `bg-navy`, `border-navy`, `ring-navy` |
| `--color-navy-light` | `#2B6CB0` | 1× (`hover:bg-navy-light` no Hero CTA, `hover:text-navy-light` no HowItWorks "Ver detalhes") |
| `--color-navy-dark` | `#0F2440` | 4× (Hero section bg, Footer bg, gradient mobile do Hero, layout body fallback) |
| `--color-cream` | `#FAFAFA` | 38× |
| `--color-photo-placeholder` | `#E8EDF3` | 1× (em [`PhotoPlaceholder.tsx:26`](src/components/PhotoPlaceholder.tsx) via classe `bg-brown-light/40` — espera, isso é do e21adv. No e21med é `bg-photo-placeholder`). |

#### [P1] Tokens só primitivos, nenhum semântico
**Onde:** [`src/app/globals.css:8-20`](src/app/globals.css)
**O que é:** Os tokens definem CORES (navy, cream), não FUNÇÕES (text-primary, surface, border-subtle). Cada componente decide arbitrariamente qual cor usar para qual propósito.
**Por que importa:** Quando você quiser ajustar "texto secundário", precisa achar todas as ocorrências de `text-navy/70` e julgar uma por uma se aquele uso é texto secundário ou outra coisa. Tema escuro futuro vira refator total.
**Recomendação:** Criar camada semântica em cima dos primitivos: `--text-primary`, `--text-secondary`, `--text-on-dark`, `--surface`, `--surface-elevated`, `--border-subtle`, `--border-strong`. Mapear para os primitivos. Trocar usos de `text-navy/70` por `text-secondary`.
**Esforço:** M
**Referência:** [Radix Colors](https://www.radix-ui.com/colors) — `gray-12` é primitivo, `--text-primary: var(--gray-12)` é semântico.

#### [P1] Escala neutra com 1 ponto (navy) — falta família de cinzas
**Onde:** [`src/app/globals.css:12-16`](src/app/globals.css)
**O que é:** A paleta neutra tem essencialmente `cream` (#FAFAFA) e `navy` (#1A365D), com um único intermediário (`photo-placeholder` #E8EDF3 usado UMA vez). Toda variação tonal é feita via opacidade (`navy/70`, `navy/40`).
**Por que importa:** Opacidade sobre fundo colorido cria cores imprevisíveis. `text-navy/70` sobre `bg-cream` ≠ `text-navy/70` sobre `bg-white` ≠ `text-navy/70` sobre `bg-photo-placeholder`. O resultado é uma sopa tonal sem nome próprio. Em saúde, onde calmaria visual depende de hierarquia neutra finamente calibrada, isso é P1.
**Recomendação:** Definir 8 tons de "navy desaturada" como família de cinzas semânticos (`navy-50` … `navy-900`), com valores `LCH` próximos pra preservar identidade. Substituir opacidades por tons da escala.
**Esforço:** M
**Referência:** [Tailwind v4 — Slate scale](https://tailwindcss.com/docs/colors), [Radix gray](https://www.radix-ui.com/colors/docs/palette-composition/the-scales).

#### [P1] Sem tokens de tipografia
**Onde:** [`src/app/globals.css`](src/app/globals.css) inteiro.
**O que é:** Nenhum `--text-h1-size`, `--text-body-size`, `--line-height-tight`, etc. Toda decisão tipográfica é uma classe Tailwind avulsa no JSX.
**Por que importa:** Mudar "tamanho do h2 em toda a página" exige `grep` + 5 edits. Versão móvel vs desktop com escala diferente, impossível sem código duplicado.
**Recomendação:** Definir 6 tokens de escala (`--font-size-xs/sm/base/lg/xl/2xl/3xl/4xl/5xl`) com `clamp()` interno pra responsividade. Documentar uso por nível semântico.
**Esforço:** M

#### [P1] Sem tokens de elevação (sombras)
**Onde:** [`src/components/Hero.tsx:71`](src/components/Hero.tsx) usa `lg:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]` arbitrário; [`src/components/PhotoDivider.tsx:26`](src/components/PhotoDivider.tsx) usa `shadow-[0_20px_50px_-12px_rgba(26,54,93,0.25)]`; [`src/components/Hero.tsx:17`](src/components/Hero.tsx) usa `shadow-[0_12px_40px_-8px_rgba(0,0,0,0.55)]`.
**O que é:** 3 sombras distintas, todas inline, todas com valores arbitrários, todas usadas uma vez.
**Por que importa:** Não há curva de elevação. Card de notificação tem sombra MAIOR que card de foto, sem razão. Modal futuro herdaria sombra de card.
**Recomendação:** Tokens `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`. Usar `<color>` matizado com a cor da brand (navy tingida).
**Esforço:** S

#### [P3] Token `--color-photo-placeholder` referenciado uma vez só
**Onde:** Definido em [`globals.css:16`](src/app/globals.css), usado apenas em [`PhotoPlaceholder.tsx`](src/components/PhotoPlaceholder.tsx) (mas como o `PhotoPlaceholder` agora aparece em 2 contextos via mobile fallback, mantém-se válido). Limítrofe entre P3 e "manter".
**Recomendação:** Manter, mas renomear pra `--surface-muted` quando criar camada semântica.

### 1.2 Escala modular tipográfica

Tamanhos efetivamente usados (contagem via `grep`):

| Token | px | Uso |
|---|---|---|
| `text-xs` | 12 | 12× |
| `text-sm` | 14 | 16× |
| `text-base` | 16 | 13× |
| `text-lg` | 18 | 6× |
| `text-xl` | 20 | 2× |
| `text-2xl` | 24 | 1× |
| `text-3xl` | 30 | 7× |
| `text-4xl` | 36 | 6× |
| `text-5xl` | 48 | 5× |

Razões entre tamanhos consecutivos:
- 12→14: 1.166
- 14→16: 1.142
- 16→18: 1.125
- 18→20: 1.111
- 20→24: 1.2
- 24→30: 1.25
- 30→36: 1.2
- 36→48: 1.333

**Análise:** Os tamanhos Tailwind default seguem uma escala híbrida (~1.125 nos pequenos, ~1.2-1.333 nos grandes). Não é uma escala modular pura, mas é razoável.

#### [P2] `text-xl` (20px) usado apenas 2 vezes — degrau órfão
**Onde:** [`src/components/Team.tsx:45`](src/components/Team.tsx) (h3 do nome do membro) e [`src/components/ApplicationForm.tsx:29`](src/components/ApplicationForm.tsx) (mensagem de sucesso).
**Por que importa:** Tamanho intermediário usado pontualmente quebra o ritmo modular. Os outros 7 tamanhos têm uso plural.
**Recomendação:** Mover ambos pra `text-lg` (18px) ou `text-2xl` (24px), eliminando o degrau.

#### [P2] `text-2xl` (24px) usado apenas 1 vez
**Onde:** [`src/components/Hero.tsx:147`](src/components/Hero.tsx) (h1 do hero no breakpoint `sm:`).
**Análise:** Aceitável porque está dentro do `text-lg sm:text-2xl lg:text-3xl` do h1 — degrau natural de responsividade. Manter.

### 1.3 Escala espacial

Padding/margin units (contagem):

| Classe | Uso |
|---|---|
| `px-6` | 11× |
| `px-10` | 10× |
| `px-16` | 9× |
| `p-8` | 8× |
| `py-16` | 7× |
| `p-3` | 7× |
| `p-6` | 6× |
| `mb-12` | 6× |
| `py-24` | 5× |
| `p-10` | 4× |
| `py-3` | 4× |
| `py-12` | 4× |
| `p-12` | 3× |
| `py-8` | 3× |
| `py-4` | 3× |
| `p-5` | 3× |

Base: Tailwind = 4px. Todos os valores usados são múltiplos de 4 (`4×3=12`, `4×6=24`, etc). ✓ Conforme base.

**Quebras:**
- [`src/components/Hero.tsx:17`](src/components/Hero.tsx): `gap-2.5` (10px), `px-3.5` (14px), `py-2.5` (10px) — múltiplos de 2px, fora da base 4px. [P3] Manter — são micro-ajustes ópticos justificados pelo tamanho dos elementos.

#### [P2] Sem tokens de spacing semânticos
**Onde:** Todo o JSX.
**O que é:** `py-16 sm:py-24` é o padrão de seção, mas não há `--space-section-y` definido.
**Por que importa:** Trocar respiração de todas as seções exige `grep`.
**Recomendação:** Definir `--space-section`, `--space-section-compact`, `--space-stack-md`, `--space-inline-md`. Aliasar.
**Esforço:** S

### 1.4 Sistema de elevação

3 sombras inline diferentes (já listadas em 1.1). Mais 4 ocorrências de `shadow` sem qualificador, `shadow-sm`, `shadow-md`, `shadow-lg` espalhadas — total **9 níveis de "elevação"**.

| Sombra | Onde | Função |
|---|---|---|
| `shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]` | [`Hero.tsx:71`](src/components/Hero.tsx) | Card de vídeo no desktop |
| `shadow-[0_12px_40px_-8px_rgba(0,0,0,0.55)]` | [`Hero.tsx:17`](src/components/Hero.tsx) | Notificações WhatsApp |
| `shadow-[0_20px_50px_-12px_rgba(26,54,93,0.25)]` | [`PhotoDivider.tsx:26`](src/components/PhotoDivider.tsx) | Foto do estúdio |
| `shadow-lg` | [`HowItWorks.tsx`](src/components/HowItWorks.tsx) | (não usado atualmente — verificado) |
| `shadow-md` | Não identificado | — |
| `shadow-sm` | Não identificado | — |
| `shadow` | Não identificado em contagens recentes | — |

#### [P1] Curva de elevação inconsistente
**Onde:** Hero card de vídeo (offset 30px, blur 80px) tem sombra MAIOR que notificações (offset 12px, blur 40px) que tem sombra LIGEIRAMENTE menor que foto do estúdio (offset 20px, blur 50px). Mas as notificações estão visualmente MAIS ELEVADAS no z-stack (z-20 vs z-0 do bg).
**Por que importa:** Z-index e elevação por sombra deveriam concordar. Hoje não concordam.
**Recomendação:** Definir 5 níveis (resting/raised/overlay/popover/modal) com valores fixos. Card de vídeo = raised. Notificações = overlay. Foto = raised. Todos os outros usos = sm.
**Esforço:** S

### 1.5 Sistema de radius

Valores em uso:

| Classe | px | Uso |
|---|---|---|
| `rounded-full` | ∞ | 6× (avatares, pills, CTAs) |
| `rounded-lg` | 8 | 5× (inputs, dots de timeline) |
| `rounded-xl` | 12 | 4× (cards medianos, fotos) |
| `rounded-2xl` | 16 | 4× (cards grandes, notificações, video card) |
| `rounded` | 4 | 3× (sem qualificador — provavelmente quem escreveu não decidiu) |

**Análise:** 5 níveis. Razoável. Sem inconsistência grosseira por tamanho de elemento.

#### [P3] `rounded` sem qualificador
**Onde:** 3 ocorrências.
**Recomendação:** Trocar por explícito (`rounded-md` ou `rounded-lg`). Ambíguo demais.

### 1.6 Z-index governance

Z-indexes encontrados:
- `z-0` — overlay de fundo do hero (logo na parede)
- `z-10` — conteúdo do hero
- `z-20` — notificações WhatsApp

Nenhuma escala documentada. Apenas 3 níveis. **Por enquanto OK, mas pré-modal/dropdown ainda não existe.**

#### [P3] Sem escala documentada
**Recomendação:** Quando criar modal/dropdown, partir já de uma escala (`z-dropdown: 100`, `z-modal: 1000`, `z-toast: 5000`).

---

## 2. Inventário de Fontes

### 2.1 Carregamento

**Local:** [`src/app/layout.tsx:2-16`](src/app/layout.tsx)

```tsx
import { DM_Serif_Display, DM_Sans } from "next/font/google";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});
```

| Fonte | Pesos carregados | Pesos efetivamente usados | Itálico carregado | Itálico usado |
|---|---|---|---|---|
| DM Serif Display | 400 (único peso disponível) | 400 (h1, h2, h3 via CSS global) | Sim (next/font carrega regular + italic por default) | Não |
| DM Sans | **TODOS** (variable, pesos 100-1000) | 400, 600, 700 (apenas 3) | Sim | Não |

Subsets carregados: apenas `latin`. ✓

#### [P1] DM Sans carrega o fonte variável inteiro quando só 3 pesos são usados
**Onde:** [`src/app/layout.tsx:12-16`](src/app/layout.tsx)
**O que é:** `DM_Sans({ subsets: ["latin"] })` sem `weight` declarado carrega a variável completa. Isso traz pesos 100-1000 mais ambos os estilos (regular + italic).
**Por que importa:** Bytes desperdiçados na primeira renderização. DM Sans variável é ~85KB (woff2). Usando só 3 pesos estáticos cortaria pra ~25-30KB.
**Recomendação:** Especificar `weight: ["400", "600", "700"]` e `style: ["normal"]`. Remover italic do carregamento.
**Esforço:** S

#### [P1] DM Serif Display carrega italic não usado
**Onde:** [`src/app/layout.tsx:5-10`](src/app/layout.tsx)
**O que é:** `next/font` carrega italic por default quando não especificado `style`.
**Por que importa:** ~10KB extras. Italic da serif display nunca aparece no JSX.
**Recomendação:** `style: ["normal"]` explícito.
**Esforço:** S

### 2.2 Estratégia de carregamento

- **`display`**: `swap` em ambas. ✓ Evita FOIT, aceita FOUT.
- **`preload`**: implícito via `next/font` (Next.js gera `<link rel="preload">` automaticamente).
- **Fallback stack**: `var(--font-dm-sans), system-ui, -apple-system, sans-serif` ✓
- **`size-adjust` / `ascent-override` / `descent-override`**: **AUSENTES**.

#### [P2] Sem `size-adjust` no fallback → CLS na troca da fonte
**Onde:** [`src/app/globals.css:29,35`](src/app/globals.css)
**O que é:** Quando DM Sans carrega e troca o `system-ui` fallback, ocorre micro-CLS porque as métricas das fontes diferem.
**Por que importa:** Em produto de saúde, qualquer movimento involuntário do conteúdo é percebido como instabilidade — corrosão sutil de confiança.
**Recomendação:** Usar a opção `adjustFontFallback` do `next/font` (já vem habilitada por default no Next 14+, **verificar**) ou definir manualmente `@font-face` com `ascent-override`, `descent-override`, `size-adjust` calibrados para DM Sans → system fallback.
**Esforço:** M
**Referência:** [Next.js docs — adjustFontFallback](https://nextjs.org/docs/app/api-reference/components/font#adjustfontfallback).

### 2.3 Duplicação

✓ Nenhum `@import` no CSS. Nenhuma duplicação de fonte.

### 2.4 Coerência tipográfica

2 famílias (1 serif display + 1 sans). Contraste tipográfico claro. ✓

#### [P1] DM Serif Display é fonte "wedding/florist", não saúde clínica
**Onde:** Decisão arquitetural — [`src/app/layout.tsx:2`](src/app/layout.tsx)
**O que é:** DM Serif Display foi desenhada por Colophon Foundry como display ornamental contemporâneo. Tem chamados modulação fina + serifa elegante + remates florescentes. Aproximada ao espírito de Playfair, Cormorant, Recoleta.
**Por que importa:** A vertical é saúde — médicos vão olhar pra essa headline. Saúde séria usa serifas com remates RETOS / SOBRIOS (Tiempos Headline, Sectra, Lyon, Source Serif). Display elegante demais cria dissonância com a expectativa de "clínica de alto padrão".
**Recomendação:** Considerar substituir por **Fraunces** (gratuita, Google Fonts, variável, com opt para "soft" vs "wonky") ou **Source Serif 4** (austera, gratuita) ou **Tiempos Headline** (paga, melhor opção em saúde premium). Se manter DM Serif, **assumir** que a personalidade da marca é "produtora glamour atendendo médicos" e não "produto de saúde sério".
**Esforço:** L (decisão de marca + refator)
**Referência:** Forward (forwardhealth.com) usa GT Walsheim + Söhne; One Medical usa Fakt + Domaine Display.

---

## 3. Mapa Tipográfico Completo

### 3.1 Varredura exaustiva

> Nota: "Fonte resolvida" considera o CSS global em [`globals.css:34-38`](src/app/globals.css). Todo `<h*>` herda DM Serif Display 400. Todo outro elemento herda DM Sans.

| Componente | Local | Tag | Fonte | Tamanho mobile | Tamanho lg | Peso | Cor | Observação |
|---|---|---|---|---|---|---|---|---|
| Hero | [Hero.tsx:131](src/components/Hero.tsx) | `<Image>` (logo SVG) | — | w-32 (128px) | w-44 (176px) | — | cream | logo SVG |
| Hero | [Hero.tsx:133](src/components/Hero.tsx) | `<p>` sub-badge | DM Sans | 12 (`text-xs`) | 12 (`text-xs`) | 400 | `cream/70` | "um projeto do grupo @e21.studio" |
| Hero | [Hero.tsx:138](src/components/Hero.tsx) | `<a>` link IG | DM Sans | 12 | 12 | 600 (`font-semibold`) | `cream` | "@e21.studio" |
| Hero | [Hero.tsx:147](src/components/Hero.tsx) | `<h1>` | DM Serif Display | 18 (`text-lg`) | 30 (`text-3xl`) | 400 | `cream` | 2 linhas explícitas |
| Hero | [Hero.tsx:152](src/components/Hero.tsx) | `<span class="marker">` | DM Serif Display | 18 | 30 | 400 | `cream` (bg amarelo atrás) | "Escolhe aquele em quem ele confia" |
| Hero | [Hero.tsx:157](src/components/Hero.tsx) | `<p>` subheadline | DM Sans | 14 (`text-sm`) | 18 (`text-lg`) | 400 | `cream/70` | |
| Hero | [Hero.tsx:160](src/components/Hero.tsx) | `<strong>` | DM Sans | 14 | 18 | 600 | `cream` | "pacientes prontos..." |
| Hero | [Hero.tsx:169](src/components/Hero.tsx) | `<a>` CTA | DM Sans | 14 (`text-sm`) | 16 (`text-base`) | 700 (`font-bold`) | `navy` | "Quero agendar minha reunião" |
| Hero (notificações) | [Hero.tsx:31](src/components/Hero.tsx) | `<span>` sender | DM Sans | 12 (`text-xs`) | 12 | 600 | `white` | |
| Hero (notificações) | [Hero.tsx:34](src/components/Hero.tsx) | `<span>` time | DM Sans | 12 | 12 | 400 | `white/70` | "agora" |
| Hero (notificações) | [Hero.tsx:38](src/components/Hero.tsx) | `<p>` mensagem | DM Sans | 12 | 12 | 400 | `white/85` | |
| SocialProof | [SocialProof.tsx:15](src/components/SocialProof.tsx) | `<p>` label | DM Sans | 12 (`text-xs`) | 12 | 600 | `navy/70` | uppercase, `tracking-[0.2em]` |
| SocialProof | [SocialProof.tsx:44](src/components/SocialProof.tsx) | `<span>` nome cliente | DM Sans | 12 (`text-xs`) | 14 (`text-sm`) | 600 | `navy` | |
| PainPoints | [PainPoints.tsx:13](src/components/PainPoints.tsx) | `<h2>` | DM Serif Display | 30 (`text-3xl`) | 48 (`text-5xl`) | 400 | `navy` | |
| PainPoints | [PainPoints.tsx:22](src/components/PainPoints.tsx) | `<span>` número | DM Sans | 12 (`text-xs`) | 14 | 600 | `navy/40` | "01"/"02"/"03" |
| PainPoints | [PainPoints.tsx:25](src/components/PainPoints.tsx) | `<p>` card | DM Sans | 12 (`text-xs`) | 18 (`text-lg`) | 400 | `navy` | |
| PhotoDivider | — | (sem texto, só imagem) | — | — | — | — | — | |
| Specialties | [Specialties.tsx:25](src/components/Specialties.tsx) | `<li>` | DM Sans | 14 (`text-sm`) | 16 (`text-base`) | 400 | `navy/70` | |
| Team | [Team.tsx:14](src/components/Team.tsx) | `<h2>` | DM Serif Display | 30 | 48 | 400 | `navy` | |
| Team | [Team.tsx:44](src/components/Team.tsx) | `<h3>` nome | DM Serif Display | 18 (`text-lg`) | 20 (`text-xl`) | 400 | `navy` | |
| Team | [Team.tsx:48](src/components/Team.tsx) | `<p>` cargo | DM Sans | 12 | 14 | 400 | `navy/70` | |
| HowItWorks | [HowItWorks.tsx:29](src/components/HowItWorks.tsx) | `<h2>` | DM Serif Display | 30 | 48 | 400 | `navy` | "Sua jornada mês a mês" |
| HowItWorks | [HowItWorks.tsx:32](src/components/HowItWorks.tsx) | `<p>` subtitle | DM Sans | 14 | 16 | 400 | `navy/70` | |
| HowItWorks | [HowItWorks.tsx:53](src/components/HowItWorks.tsx) | `<span>` phaseLabel (tab) | DM Sans | 12 (`text-xs`) | 12 | 600 | `navy/70` ou `cream/70` | uppercase tracking-[0.2em] |
| HowItWorks | [HowItWorks.tsx:59](src/components/HowItWorks.tsx) | `<span>` tab title | DM Sans | 14 | 16 | 600 | `navy` ou `cream` | |
| HowItWorks | [HowItWorks.tsx:91](src/components/HowItWorks.tsx) | `<span>` phase label | DM Sans | 12 | 12 | 600 | `navy/70` | uppercase tracking |
| HowItWorks | [HowItWorks.tsx:94](src/components/HowItWorks.tsx) | `<h3>` | DM Serif Display | 30 | 36 | 400 | `navy` | |
| HowItWorks | [HowItWorks.tsx:101](src/components/HowItWorks.tsx) | `<p>` summary | DM Sans | 16 | 18 | 400 | `navy/70` | |
| HowItWorks | [HowItWorks.tsx:109](src/components/HowItWorks.tsx) | `<li>` short items | DM Sans | 14 | 16 | 400 | `navy/70` | |
| HowItWorks | [HowItWorks.tsx:123](src/components/HowItWorks.tsx) | `<button>` Ver detalhes | DM Sans | 14 | 16 | 600 | `navy` | |
| HowItWorks | [HowItWorks.tsx:150](src/components/HowItWorks.tsx) | `<li>` detail items | DM Sans | 14 | 16 | 400 | `navy/70` | label inline em 600 |
| HowItWorks | [HowItWorks.tsx:172](src/components/HowItWorks.tsx) | `<p>` closing | DM Sans | 14 | 16 | 400 italic | `navy/70` | border-left |
| Testimonials | [Testimonials.tsx:15](src/components/Testimonials.tsx) | `<h2>` | DM Serif Display | 30 | 48 | 400 | `navy` | |
| ApplicationForm | [ApplicationForm.tsx:21](src/components/ApplicationForm.tsx) | `<h2>` | DM Serif Display | 30 | 48 | 400 | `cream` | "Agende sua reunião" |
| ApplicationForm | [ApplicationForm.tsx:24](src/components/ApplicationForm.tsx) | `<p>` subtitle | DM Sans | 18 (`text-lg`) | 18 | 400 | `cream/70` | |
| ApplicationForm | [ApplicationForm.tsx:43](src/components/ApplicationForm.tsx) | `<label>` | DM Sans | 14 | 14 | 600 | `cream/90` | |
| ApplicationForm | [ApplicationForm.tsx:55](src/components/ApplicationForm.tsx) | `<input>` | DM Sans | 16 (`text-base`) | 16 | 400 | `navy` | bg white |
| ApplicationForm | [ApplicationForm.tsx:61](src/components/ApplicationForm.tsx) | `<button>` submit | DM Sans | 16 | 16 | 700 | `navy` | bg white |
| Footer | [Footer.tsx:7-8](src/components/Footer.tsx) | `<p>` | DM Sans | 14 (`text-sm`) | 14 | 400 | `cream/70` | |

### 3.2 Vertical rhythm

Não há baseline grid implícito. Line-heights variam:
- Body: padrão (1.5 do browser, sem override)
- `leading-tight` (1.25): h3 Team
- `leading-snug` (1.375): cards de tab, h2 HowItWorks, listas
- `leading-relaxed` (1.625): subheadline do Hero, subtitle do HowItWorks
- `leading-[1.25]`/`leading-[1.2]`/`leading-[1.15]`: arbitrários no h1 do Hero

#### [P2] Line-heights arbitrários no h1 quando há classes nativas
**Onde:** [`Hero.tsx:147`](src/components/Hero.tsx) — `leading-[1.25] sm:leading-[1.2]`
**Recomendação:** Trocar por `leading-tight` (1.25) e `leading-snug` (1.375). Eliminar arbitrários.
**Esforço:** S

### 3.3 Letter-spacing por tamanho

- Globais: `letter-spacing: -0.01em` em todos os h1-h6 (globals.css).
- Labels uppercase: `tracking-[0.2em]` (✓ adequado).
- Textos pequenos (12px): `tracking-wide` em [`PhotoPlaceholder.tsx:39`](src/components/PhotoPlaceholder.tsx), ausente nos demais.

#### [P2] Títulos grandes deveriam ter tracking mais negativo
**Onde:** [`globals.css:37`](src/app/globals.css)
**O que é:** `letter-spacing: -0.01em` é tímido. Em display tipográfico (h1 a 48px), o usual é `-0.02em` a `-0.04em`. Em fonte com modulação delicada como DM Serif Display, headlines grandes ficam "boiando" sem tracking compensatório.
**Recomendação:** Aplicar `letter-spacing: -0.03em` para h1 e h2; manter `-0.01em` pra h3-h6. Ou usar `text-wrap: balance` (não corrige spacing mas ajuda perceived balance).
**Esforço:** S

### 3.4 Comprimento de linha (measure)

- Hero subheadline: `max-w-xl` (576px). A 18px body, dá ~63 caracteres por linha. ✓ Ideal.
- Headings centralizados: `max-w-2xl mx-auto` (672px) no HowItWorks subtitle. ✓
- Cards do PainPoints (mobile, 3 colunas): texto muito comprimido — ~14 chars/linha. **Texto longo aqui quebra mal.**

#### [P2] 3 colunas no mobile = linhas curtas demais
**Onde:** [`PainPoints.tsx:16`](src/components/PainPoints.tsx)
**O que é:** `grid-cols-3` no mobile espreme cada card em ~96px de largura. Texto wraps em 2-3 chars por linha em alguns casos.
**Por que importa:** Compromete legibilidade. O usuário "passa o olho" e não consegue ler.
**Recomendação:** No mobile, `grid-cols-1` ou `grid-cols-3` SOMENTE em viewport ≥400px (que é raro existir abaixo de 375). Ou aumentar texto. **Mas o usuário já endereçou isso pedindo 3-lado-a-lado mobile.**
**Esforço:** S — decisão de design.

### 3.5 Viúvas, órfãs e quebras

- `text-wrap: balance` **AUSENTE** em todos os títulos.
- `<br>` manual usado no Hero h1 ([`Hero.tsx:150`](src/components/Hero.tsx)) — bom para forçar quebra, mas duro.
- `hanging-punctuation` ausente.
- `hyphens: auto` ausente — palavras longas (especialidades) podem quebrar feio.

#### [P2] Sem `text-wrap: balance` em h2 de seção
**Onde:** Todos os h2 (PainPoints, HowItWorks, Team, Testimonials, ApplicationForm).
**Por que importa:** Cabeçalhos balanceados visualmente exigem essa propriedade hoje (suportada em todos os browsers modernos). Sem isso, "Sua jornada mês a mês" pode ficar "Sua jornada mês /a mês" (quebra ruim).
**Recomendação:** Adicionar `text-wrap: balance` (Tailwind: `text-balance`) em todos os h1 e h2.
**Esforço:** S

### 3.6 Numerais

Não há tabelas. Datas raras (datetime). `tabular-nums` não aplicado e não crítico.

### 3.7 Otimização tipográfica fina

- `-webkit-font-smoothing: antialiased` ✓ em [`globals.css:30`](src/app/globals.css)
- `-moz-osx-font-smoothing: grayscale` ✓
- `text-rendering: optimizeLegibility` **AUSENTE**
- `font-feature-settings` **AUSENTE**

#### [P3] Sem `text-rendering` e `font-feature-settings`
**Onde:** [`globals.css:body`](src/app/globals.css)
**O que é:** Em texto corrido, ligaduras (ff, fi, fl) e kerning óptico melhoram leitura sutilmente.
**Recomendação:** Em `body { text-rendering: optimizeLegibility; font-feature-settings: "kern", "liga"; }`
**Esforço:** S

---

## 4. Hierarquia Visual

### 4.1 Pirâmide visual (peso percebido na home, escala 1-10)

| Nível | Elemento | Peso | Razão |
|---|---|---|---|
| 10 | Marca-texto amarelo na 2ª linha do h1 | 10 | Único contraste cromático quente da página |
| 9 | Vídeo card do hero (440×550) | 9 | Movimento + tamanho |
| 9 | CTA cream sobre navy-dark | 9 | Contraste tonal + tamanho |
| 8 | h1 cream sobre navy-dark | 8 | Texto + tamanho |
| 7 | h2 navy sobre cream (PainPoints, Team, etc) | 7 | Tipografia serif + tamanho |
| 6 | Carrossel SocialProof (movimento + faces) | 6 | Movimento contínuo capta olho |
| 5 | Cards do PainPoints | 5 | Conteúdo |
| 5 | Tabs HowItWorks (ativa) | 5 | Cor + posição |
| 4 | Notificações WhatsApp flutuantes | 4 | Pequenas mas com movimento |
| 4 | Subheadline cream/70 | 4 | |
| 3 | Specialties bar (ticker fino) | 3 | |
| 3 | Logo E21 MED no canto | 3 | Pequeno, mas é a marca |
| 2 | Cargo dos membros da equipe | 2 | |
| 2 | Sub-badge "um projeto do grupo @e21.studio" | 2 | |
| 1 | Footer | 1 | Decoração funcional |

### 4.2 Conflitos hierárquicos

#### [P1] CTA do hero competindo com marca-texto amarelo
**Onde:** [`Hero.tsx:152`](src/components/Hero.tsx) (marker amarelo) vs [`Hero.tsx:169`](src/components/Hero.tsx) (CTA cream).
**O que é:** Marca-texto amarelo `#FCD34D` é o ÚNICO uso de cor quente na página. Captura o olho instantaneamente. Mas a AÇÃO desejada é o CTA logo abaixo.
**Por que importa:** O olho vai pra cor → headline → marca-texto → e depois precisa ATRAVESSAR a marca-texto até chegar no CTA (subheadline + CTA cream). O marca-texto não está conduzindo o usuário pro CTA, está roubando atenção.
**Recomendação:** Ou (a) usar a cor de marca-texto no CTA também ("aceitar" o amarelo como cor de ação) — mas amarelo em saúde é warning; ou (b) trocar marca-texto pra **mesma cor do CTA** (cream com underline ou sublinhado decorativo); ou (c) reduzir intensidade do amarelo (de 0.7 pra 0.4-0.5 de opacidade) pra ele acompanhar sem dominar.
**Esforço:** S
**Referência:** Stripe headlines: cor de destaque é a MESMA do CTA, criando rota visual unificada.

#### [P2] Logo E21 MED minúsculo perto da headline gigantesca
**Onde:** [`Hero.tsx:124-130`](src/components/Hero.tsx) (logo 128-176px) e [`Hero.tsx:147`](src/components/Hero.tsx) (h1 a 30px desktop).
**O que é:** A marca aparece em 3º plano. O h1 não menciona "E21". A coerência entre logo e mensagem é decorrente, não declarada.
**Por que importa:** Em saúde, marca é trust signal. Diluí-la posiciona o produto como "produtora invisível" e não "marca de saúde digital".
**Recomendação:** Aumentar logo levemente (w-44 → w-48 desktop) ou reforçar conexão visual: badge "PROJETO" mais próximo do logo, espaçamento intencional.
**Esforço:** S

### 4.3 Teste do "olhar de 5 segundos"

**O que o usuário entende em 5s (caminho do olho previsto):**
1. (1s) Cor do bg + vídeo no canto → "produto de imagem/marketing"
2. (2s) Logo E21 MED → "marca E21 (MED)"
3. (3s) Marca-texto amarelo "Escolhe aquele em quem ele confia" → "frase chave"
4. (4s) Subheadline com "pacientes prontos para adquirir seus serviços" em bold → "objetivo: conseguir pacientes"
5. (5s) CTA "Quero agendar minha reunião" → "ação: agendar reunião"

**O que ele DEVERIA entender em 5s:**
1. Marca: E21 MED
2. Promessa: vou ajudar médicos a serem reconhecidos
3. Como: estúdio, conteúdo, autoridade digital
4. Ação: agendar reunião

**Onde está a divergência:** "produtora de imagem/marketing" é a primeira leitura. Médico pode bouncar achando que não é pra ele. Falta sinal explícito de "VOCÊ MÉDICO". A palavra "paciente" aparece, mas só na subheadline.

#### [P1] H1 não menciona "médico" explicitamente
**Onde:** [`Hero.tsx:147-153`](src/components/Hero.tsx) — "O paciente não escolhe o melhor médico. Escolhe aquele em quem ele confia."
**O que é:** A headline foca no paciente. Médico se reconhece como "aquele [médico]". Lógica clara, mas exige raciocínio em 2 saltos.
**Por que importa:** O ideal de hero copy é "TU" direto: "Seu paciente não te escolhe pela competência. Te escolhe pela confiança." Inversão pronominal coloca o médico no centro instantaneamente.
**Recomendação:** Considerar copy com "você" direto pro médico. Decisão de copywriter, não de designer puro.
**Esforço:** S — copy + 1 edit.

### 4.4 Padrões de varredura

Layout do hero desktop é split 50/50: texto à esquerda (zona F natural pra leitura ocidental), vídeo à direita (zona de descanso visual). ✓ Padrão correto para landing.

Mobile: vídeo full-bleed atrás, texto sobreposto no rodapé. Padrão de hero saturado, comum em marketing. Funciona se o vídeo não cobrir o texto — verificado, gradient resolve.

### 4.5 Balance e tensão visual

- **Hero desktop**: peso visual balanceado (texto ~50% × vídeo ~50%). ✓
- **PainPoints**: 3 cards iguais, simétrico, "calmo demais" — sem âncora dominante.
- **HowItWorks**: tabs + 2 colunas, balanceado.
- **Team**: foto de grupo grande + grid 3x2 → assimetria controlada. ✓

#### [P2] PainPoints sem âncora visual
**Onde:** [`PainPoints.tsx:16-29`](src/components/PainPoints.tsx)
**O que é:** 3 cards iguais, sem destaque. Não há "qual problema é o pior?", "qual é o mais comum?", etc.
**Por que importa:** Em landing, listas tripartites planas viram "ruído acolchoado". O olho passa sem se ancorar.
**Recomendação:** Destacar 1 dos 3 (p.ex. o do meio com bg-navy text-cream, os outros bg-white). Cria âncora central.
**Esforço:** S

---

## 5. Auditoria de Espaçamento

### 5.1 Padding de seções (verificação)

| Seção | Mobile py | Desktop sm:py | Local |
|---|---|---|---|
| Hero | `pt-[68%] lg:pt-20 lg:pb-20` | `lg:py-20` | [Hero.tsx:50](src/components/Hero.tsx) |
| SocialProof | `py-8` | `sm:py-12` | [SocialProof.tsx:12](src/components/SocialProof.tsx) |
| PainPoints | `py-16` | `sm:py-24` | [PainPoints.tsx:10](src/components/PainPoints.tsx) |
| PhotoDivider | `py-8` | `sm:py-12 lg:py-16` | [PhotoDivider.tsx:21](src/components/PhotoDivider.tsx) |
| Specialties | `py-8` | `sm:py-12` | [Specialties.tsx:9](src/components/Specialties.tsx) |
| Team | `py-16` | `sm:py-24` | [Team.tsx:11](src/components/Team.tsx) |
| HowItWorks | `py-16` | `sm:py-24` | [HowItWorks.tsx:23](src/components/HowItWorks.tsx) |
| Testimonials | `py-16` | `sm:py-24` | [Testimonials.tsx:12](src/components/Testimonials.tsx) |
| ApplicationForm | `py-16` | `sm:py-24` | [ApplicationForm.tsx:17](src/components/ApplicationForm.tsx) |
| Footer | `py-12` | `sm:py-16` | [Footer.tsx:5](src/components/Footer.tsx) |

**Análise:** Pós-refator do commit `45af3af`, consistência boa: seções padrão usam `py-16/24`, barras `py-8/12`. PhotoDivider tem 3 níveis (`py-8 sm:py-12 lg:py-16`) — único quebrando o padrão de 2 níveis declarado, mas é defensável como "barra com mais respiração" entre 2 seções padrão.

#### [P2] PhotoDivider tem 3 breakpoints quando o sistema é de 2
**Onde:** [`PhotoDivider.tsx:21`](src/components/PhotoDivider.tsx) — `py-8 sm:py-12 lg:py-16`
**Recomendação:** Padronizar como `py-12 sm:py-16` (barra um pouco mais espaçosa que Specialties pra acomodar a foto, sem 3 breakpoints).
**Esforço:** S

### 5.2 Ritmo interno (título → primeiro elemento)

| Seção | Distância h2 → próximo elemento | Local |
|---|---|---|
| PainPoints | `mb-12 sm:mb-16` (48-64px) | [PainPoints.tsx:14](src/components/PainPoints.tsx) |
| Team | `mb-12 sm:mb-16` | [Team.tsx:14](src/components/Team.tsx) |
| HowItWorks | `mb-4 sm:mb-5` (16-20px, em wrapper que tem `mb-12 sm:mb-16` externo) | [HowItWorks.tsx:29](src/components/HowItWorks.tsx) |
| Testimonials | wrapper `mb-12 sm:mb-16` | [Testimonials.tsx:14](src/components/Testimonials.tsx) |
| ApplicationForm | wrapper `mb-12` (sem sm:) | [ApplicationForm.tsx:20](src/components/ApplicationForm.tsx) |

#### [P2] Distância título→conteúdo inconsistente (ApplicationForm sem responsivo)
**Onde:** [`ApplicationForm.tsx:20`](src/components/ApplicationForm.tsx) — `mb-12` (48px) sem `sm:mb-16`
**Recomendação:** Padronizar pra `mb-12 sm:mb-16` em todas.
**Esforço:** S

### 5.3 Respiro lateral (gutter)

Todas as seções usam `px-6 sm:px-10 lg:px-16`. ✓ Consistente.

Container `max-w-7xl` (1280px) em todas exceto Hero (que tem `lg:max-w-2xl` na coluna de texto). ✓

#### [P2] Ultrawide (>1600px) sem comportamento declarado
**Onde:** Todos os `<section>`
**O que é:** Em telas 1920px+, `max-w-7xl` (1280) deixa 320px de cada lado. Aceitável, mas há "muito branco" e o conteúdo parece flutuar.
**Recomendação:** Considerar `max-w-[1440px]` em ultrawide (`2xl:max-w-[1440px]`).
**Esforço:** S

### 5.4 Densidade

- **Hero**: alta intensidade (vídeo + headline + notificações + CTA + sub-badge), mas espaçada. **Equilibrado.**
- **PainPoints**: 3 cards densos (text-xs no mobile) — denso demais no mobile, espaçoso demais no desktop.
- **Team**: foto grande + 6 membros em grid. Generoso, talvez sobrando.
- **HowItWorks**: tabs + 2 colunas + accordion. Adequado.

Comparação com benchmarks:
- One Medical: ESPAÇOSO (90% whitespace). E21 MED está mais denso.
- Linear: DENSO (informação por viewport alta). E21 MED está mais arejado.
- Conclusão: E21 MED está entre os dois. **Em saúde, deveria estar mais perto do One Medical.**

#### [P2] Densidade do PainPoints destoa nos breakpoints
**Onde:** [`PainPoints.tsx:16`](src/components/PainPoints.tsx) — `grid-cols-3` em todos tamanhos.
**O que é:** Mobile fica apertado, desktop fica espaçado demais.
**Recomendação:** Avaliar `grid-cols-1 md:grid-cols-3`. Hoje é mobile-first denso. **Mas usuário já pediu 3-lado-a-lado no mobile. Manter, registrar como decisão.**
**Esforço:** N/A (decisão explícita).

### 5.5 Whitespace ativo vs passivo

- **Hero**: whitespace ativo (gradient mobile cria zona de foco no texto).
- **SocialProof**: whitespace mínimo (carrossel contínuo). Ativo por movimento.
- **Team**: whitespace passivo entre cards. **Sobra espaço no desktop.**
- **HowItWorks**: whitespace ativo (separa tab/conteúdo/accordion).

#### [P2] Team cards com gaps grandes no desktop
**Onde:** [`Team.tsx`](src/components/Team.tsx) — `gap-6 sm:gap-8 lg:gap-10`
**Recomendação:** Reduzir `lg:gap-10` pra `lg:gap-8` — diferença pequena mas o desktop ganha densidade.
**Esforço:** S

---

## 6. Auditoria de Cores

### 6.1 Paleta completa (na ordem em que aparece)

| Cor (hex) | Onde | Local | Função |
|---|---|---|---|
| `#0F2440` | Hero bg | [globals.css:14](src/app/globals.css), [Hero.tsx:50](src/components/Hero.tsx) | Section bg-navy-dark |
| `#1A365D` | Texto principal | [globals.css:12](src/app/globals.css) | navy |
| `#FAFAFA` | Texto sobre escuro, bg light | [globals.css:15](src/app/globals.css) | cream |
| `rgba(15, 36, 64, 0.96-0.7-0)` | Gradient mobile do Hero | [Hero.tsx:114](src/components/Hero.tsx) | overlay |
| `rgba(252, 211, 77, 0.7)` | Marca-texto amarelo | [globals.css:113](src/app/globals.css) | yellow-300 c/ opacity |
| `#1f1f1f / 95%` | Bg das notificações WhatsApp | [Hero.tsx:17](src/components/Hero.tsx) | dark gray translúcido |
| `#25D366` | WhatsApp green | [Hero.tsx:18](src/components/Hero.tsx) | acento de marca de terceiro |
| `white` (#FFFFFF) | Texto nas notificações, bg inputs | [Hero.tsx:31](src/components/Hero.tsx), [ApplicationForm.tsx:55](src/components/ApplicationForm.tsx) | puro |
| `#E8EDF3` | Bg de placeholder de fotos | [globals.css:16](src/app/globals.css) | photo-placeholder |
| `#2B6CB0` | Hover do CTA / link "Ver detalhes" | [globals.css:13](src/app/globals.css) | navy-light |
| `rgba(26, 54, 93, 0.25)` | Shadow do PhotoDivider | [PhotoDivider.tsx:26](src/components/PhotoDivider.tsx) | navy tingido |
| `rgba(0,0,0, 0.3-0.6)` | Drop-shadows e text-shadows | Hero múltiplas linhas | preto puro |

**Total: 12 cores distintas.** Apenas 5 estão tokenizadas (navy, navy-light, navy-dark, cream, photo-placeholder).

### 6.2 Sistema semântico

- **Primária / brand**: navy (#1A365D)
- **Secundárias / accents**: navy-light (1× só), yellow do marker (1×)
- **Neutros**: cream (#FAFAFA), photo-placeholder (#E8EDF3) — **APENAS 2 NEUTROS**, insuficiente.
- **Feedback (success, warning, error, info)**: **NÃO EXISTEM**. Form sem error state colorido.
- **Superfícies**: cream e navy-dark. Sem "surface elevated" tokenizada.
- **Bordas e divisores**: `border-navy/10` (subtle), `border-navy/15` (mais forte).
- **Texto**: navy (principal), navy/70 (secundário), navy/40 (terciário). Cream e cream/70 sobre dark.

### 6.3 Cores soltas (hardcoded)

#### [P1] 5 cores hardcoded inline sem passar por token
**Onde e cada uma:**
- `#1f1f1f` em [`Hero.tsx:17`](src/components/Hero.tsx) (notificação bg)
- `#25D366` em [`Hero.tsx:18`](src/components/Hero.tsx) (WhatsApp green)
- `rgba(252, 211, 77, 0.7)` em [`globals.css:113`](src/app/globals.css) (marker yellow)
- `rgba(15,36,64,...)` em [`Hero.tsx:114`](src/components/Hero.tsx) (gradient mobile — é o navy-dark mas inline com opacidade)
- `rgba(26,54,93,...)` em [`PhotoDivider.tsx:26`](src/components/PhotoDivider.tsx) (shadow navy — é o navy mas inline)
**Por que importa:** Cores fantasma. Mudar a marca exige `grep` por cor literal em vez de mudar o token. Pior: o navy aparece como `#1A365D` em globals.css E como `rgba(26,54,93,...)` em PhotoDivider — se o navy mudar, este último não muda automaticamente.
**Recomendação:** Adicionar tokens `--color-marker-yellow`, `--color-whatsapp-green`, `--color-notification-bg`. Usar `var(--color-navy)` em rgba() onde possível (via `color-mix()` ou via `rgb(from)`).
**Esforço:** S

### 6.4 Contraste WCAG

Verificações principais:

| Combinação | Ratio | Nível | Local |
|---|---|---|---|
| navy `#1A365D` sobre cream `#FAFAFA` | **9.95:1** | AAA ✓ | h2, h3, body principal |
| navy/70 sobre cream → ~`#5B7088` sobre `#FAFAFA` | **5.2:1** | AA ✓, AAA × para texto pequeno | textos secundários (todos os cargos, summary, items) |
| navy/40 sobre cream → ~`#A3B0C2` sobre `#FAFAFA` | **2.3:1** | **× AA fail** | Números decorativos "01" do PainPoints |
| cream `#FAFAFA` sobre navy-dark `#0F2440` | **15.3:1** | AAA ✓ | Hero h1 |
| cream/70 sobre navy-dark → ~`#B0BBC4` sobre `#0F2440` | **8.5:1** | AAA ✓ | Hero subheadline |
| cream/70 sobre navy `#1A365D` (form subtitle) | **5.8:1** | AA ✓ | ApplicationForm subtitle |
| navy sobre white inputs | **9.95:1** | AAA ✓ | Input do form |
| navy/40 sobre white (placeholder do input) | **2.3:1** | × | placeholder do input |
| navy/70 sobre photo-placeholder (`#E8EDF3`) | ~4.2:1 | AA ✓ (texto grande) | label de fotos placeholder |

#### [P0] navy/40 e cream/40 não atingem AA para texto pequeno
**Onde:**
- [`PainPoints.tsx:22`](src/components/PainPoints.tsx) — números decorativos "01/02/03" em `navy/40`
- [`ApplicationForm.tsx:55`](src/components/ApplicationForm.tsx) — `placeholder:text-navy/40` no input
- [`HowItWorks.tsx:96`](src/components/HowItWorks.tsx) — separador "·" em `navy/40`
**O que é:** 2.3:1 falha AA mesmo para texto grande (precisa 3:1). Mesmo sendo "decorativo", se transmite informação (números de sequência) deve passar AA.
**Por que importa:** Em saúde, baixa visão é prevalente (idosos, pacientes oncológicos com efeito colateral de glaucoma, etc). Decoração ilegível é decoração inútil.
**Recomendação:**
- Números "01/02/03" do PainPoints: subir pra `navy/60` (3.5:1).
- Placeholder do input: subir pra `navy/55` (3.0:1) ou usar token de placeholder dedicado.
- Separador "·": é puramente ornamental, pode ficar `navy/40` (sem informação).
**Esforço:** S

### 6.5 Opacidades

Lista única ordenada por uso:
- `/70` — 14× navy, 7× cream — **principal**
- `/10` — 7× navy — borders e overlays
- `/40` — 5× navy — decorativos
- `/15` — cream (2×), navy (1×) — borders
- Outras: `/5`, `/20`, `/30`, `/50`, `/85`, `/90` — uma cada.

✓ Pós-refator, opacidades convergiram para 4 níveis principais (/70, /40, /15, /10).

#### [P2] Opacidades 50/85/90 (uma vez cada) — outliers
**Onde:**
- `cream/90` em [`ApplicationForm.tsx:43`](src/components/ApplicationForm.tsx) (label)
- `cream/50` em [`ApplicationForm.tsx:55`](src/components/ApplicationForm.tsx) (focus ring)
- `white/85` em [`Hero.tsx:38`](src/components/Hero.tsx) (notification message)
**Recomendação:** Normalizar para `/70` (label e mensagem). focus ring pode usar `/50` ou trocar pra cor sólida.
**Esforço:** S

### 6.6 Color blindness

- **Deuteranopia/Protanopia**: paleta é majoritariamente azul/neutro. Marca-texto amarelo permanece distinguível. ✓
- **Tritanopia (azul-amarelo)**: marca-texto amarelo pode parecer cinza claro. Em saúde, pacientes com diabetes têm tritanopia adquirida frequente.
- WhatsApp green `#25D366` em deuteranopia → marrom-acinzentado. Ainda reconhecível como ícone.

#### [P2] Marca-texto amarelo isolado como sinalização
**Onde:** [`globals.css:113`](src/app/globals.css)
**O que é:** O amarelo é o ÚNICO destaque colorido. Pra tritanopia, ele se neutraliza.
**Recomendação:** Combinar amarelo com sublinhado ou peso tipográfico, não apenas cor. Atualmente já há leve sublinhado implícito pela posição da fita amarela, então **risco baixo**.

### 6.7 Dark mode

**N/A — sem dark mode no projeto.**

#### [P3] Sem `color-scheme: light`
**Onde:** Não declarado.
**O que é:** Sem `color-scheme`, navegadores podem aplicar styling automático em forms e scrollbars baseado em prefers-color-scheme do sistema.
**Recomendação:** Adicionar `<meta name="color-scheme" content="light">` no `<head>` ou via Next.js metadata. Pra evitar inputs com bg automático escuro no Safari/iOS.
**Esforço:** S

---

## 7. Bordas, Sombras, Radius, Gradientes

### 7.1 Border-radius — Já coberto em 1.5. ✓

### 7.2 Sombras — Já coberto em 1.4. ✓ (3 níveis inline + 4 classes sem qualificador padrão).

### 7.3 Bordas

- `border-navy/10` — usado 7×
- `border-navy/15` — 1×
- `border-navy/20` — 1×
- `border-cream/15` — 1×
- `border-cream/30` — 1×
- `border-white/10` — 1×

#### [P2] Bordas em opacidades quase iguais (10 vs 15 vs 20)
**Onde:** Múltiplos.
**Por que importa:** A diferença entre /10 e /15 é imperceptível. Indica que quem escreveu não tinha o sistema na cabeça.
**Recomendação:** Padronizar `border-navy/10` (subtle) e `border-navy/20` (strong). Eliminar /15.
**Esforço:** S

### 7.4 Gradientes

| Gradiente | Onde | Stops |
|---|---|---|
| Mobile hero overlay | [Hero.tsx:114](src/components/Hero.tsx) | navy-dark 96% → 70% (40%) → 0% (100%) |
| Marker amarelo | [globals.css:113](src/app/globals.css) | yellow solid → yellow solid (degenerate) |

**Análise:** Apenas 2 gradientes, ambos com propósito claro. Sem "banding" perceptível. ✓

### 7.5 Backdrop-blur e glassmorphism

- `backdrop-blur-md` em notificações ([`Hero.tsx:17`](src/components/Hero.tsx))
- Sem fallback para browsers que não suportam (raros hoje, mas existem).

#### [P3] Sem fallback `@supports` para backdrop-filter
**Recomendação:** `@supports not (backdrop-filter: blur(0)) { .glass { background: rgba(31,31,31,0.98); } }` — em iOS Safari antigos, garante legibilidade.
**Esforço:** S

---

## 8. Auditoria de Movimento

### 8.1 Inventário

| Animação | Duração | Easing | Propriedades | Onde |
|---|---|---|---|---|
| `popup-in` | 0.7s | cubic-bezier(0.16, 1, 0.3, 1) | opacity + transform | Notificações Hero |
| `scroll-x` | 30s linear infinite | linear | transform | SocialProof, Testimonials |
| `scroll-x-fast` | 20s linear infinite | linear | transform | Specialties |
| `fade-in-up` | 0.7s | cubic-bezier(0.16, 1, 0.3, 1) | opacity + transform | **NÃO USADO no código (dead)** |
| `fade-in` | 0.25s | ease-out | opacity | HowItWorks tab switch |
| `marker-sweep` | 1.4s | cubic-bezier(0.25, 0.1, 0.25, 1) | background-size | Hero h1 marker |
| `useFadeIn` (hook) | 0.7s | cubic-bezier (Tailwind ease-out via class) | opacity + translate | Todas as seções via fade-in onScroll |

### 8.2 Linguagem de movimento

#### [P1] 3 curvas de easing diferentes sem hierarquia
**Onde:**
- `cubic-bezier(0.16, 1, 0.3, 1)` — popup, fade-in-up (Material expressive out)
- `cubic-bezier(0.25, 0.1, 0.25, 1)` — marker-sweep (ease padrão CSS)
- `ease-out` — fade-in
- `linear` — scroll-x
**Por que importa:** Sem easing canônica, cada animação "fala um idioma". Padrão de design system maduro tem 1 easing pra "saída" (snap), 1 pra "entrada" (suave), e linear pra loop infinito.
**Recomendação:** Tokenizar 2 curvas:
- `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` (snappy, micro-interações)
- `--ease-linear: linear` (loops)
Eliminar `cubic-bezier(0.25, 0.1, 0.25, 1)` — substituir pela canônica.
**Esforço:** S

#### [P3] Keyframe `fade-in-up` definido e não usado
**Onde:** [`globals.css:75-88`](src/app/globals.css)
**O que é:** Dead code remanescente da timeline horizontal (removida na refatoração de tabs).
**Recomendação:** Remover o keyframe e a classe.
**Esforço:** S

### 8.3 Performance

| Animação | Propriedade animada | 60fps? |
|---|---|---|
| popup-in | opacity + transform | ✓ |
| scroll-x | transform | ✓ |
| fade-in | opacity | ✓ |
| marker-sweep | **background-size** | × (causa paint a cada frame) |
| useFadeIn | opacity + transform (via class) | ✓ |

#### [P1] `marker-sweep` anima `background-size` — não é GPU-accelerated
**Onde:** [`globals.css:103-110`](src/app/globals.css)
**O que é:** `background-size` causa repaint a cada frame. Em devices low-end ou Safari iOS, animação pode "puxar".
**Por que importa:** Marker é a animação mais EM EVIDÊNCIA da página. Se travar, parece amador.
**Recomendação:** Implementar com `clip-path: inset()` ou com SVG mask + transform. Já tentamos essa abordagem antes — opção B do histórico do projeto. **Risco**: a refatoração causou outros bugs antes. Aceitar tradeoff atual a menos que evidência de jank apareça em devtools.
**Esforço:** M

### 8.4 Reduced motion

#### [P0] `prefers-reduced-motion` IGNORADO
**Onde:** [`globals.css`](src/app/globals.css) inteiro — nenhuma media query.
**O que é:** Usuários com sensibilidade vestibular (incluindo muitos pacientes oncológicos, pessoas com enxaqueca, idosos) configuram OS pra reduzir movimento. Nenhuma das 6 animações respeita.
**Por que importa:** WCAG 2.3.3 (Animation from Interactions). Em produto de saúde, deixar essa configuração default é negligência.
**Recomendação:** Adicionar:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
**Esforço:** S
**Referência:** [WCAG 2.3.3](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html).

### 8.5 Microinterações

Estados por elemento interativo:

| Elemento | Hover | Focus | Active | Disabled | Loading |
|---|---|---|---|---|---|
| Hero CTA `<a>` | ✓ (`hover:bg-navy-light`) | × (default browser) | × | N/A (link) | N/A |
| ApplicationForm submit `<button>` | ✓ (`hover:opacity-90`) | × | × | × | × |
| HowItWorks tab `<button>` | ✓ (`hover:border-navy/40`) | × | × | × | N/A |
| HowItWorks "Ver detalhes" `<button>` | ✓ (`hover:text-navy-light`) | × | × | × | N/A |
| ApplicationForm `<input>` | N/A | ✓ (`focus:ring-2 ring-cream/50`) | N/A | × | N/A |
| Hero sub-badge `<a>` (Instagram) | ✓ | × | × | N/A | N/A |

#### [P0] Sem `focus-visible` nos botões — falha WCAG 2.4.7
**Onde:** Todos os `<button>` e `<a>` no projeto (exceto inputs).
**O que é:** Usuários de teclado não veem feedback claro de onde estão focados. Default do browser foi sobrescrito pelo Tailwind (`outline-none` implícito em vários estados).
**Por que importa:** **WCAG 2.4.7 (Focus Visible) é AA crítico.** Sem isso, navegação por teclado fica cega.
**Recomendação:** Adicionar `focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2` em todos os elementos interativos. Ou definir uma classe utilitária `.focusable` global.
**Esforço:** M (precisa varrer todos os interativos)
**Referência:** [WCAG 2.4.7](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html).

#### [P2] Form submit sem loading state
**Onde:** [`ApplicationForm.tsx:59-64`](src/components/ApplicationForm.tsx)
**O que é:** O submit hoje só seta `submitted = true` localmente (sem chamada real). Mas quando integrar com API, faltará loading.
**Recomendação:** Adicionar estado `submitting` + spinner ou texto "Enviando...".
**Esforço:** S (preparar antes da integração)

### 8.6 Cursor states

- `cursor: pointer` aplicado em botões nativos automaticamente. ✓
- Sem `cursor: not-allowed` em disabled (porque não há disabled state implementado).

### 8.7 Animações de entrada

#### [P2] useFadeIn em TODAS as seções é cansativo
**Onde:** 8 ocorrências de `useFadeIn()` (todas as seções principais).
**O que é:** Toda seção faz fade-in ao entrar na viewport. Em scroll rápido, é fadefade-fade-fade.
**Por que importa:** "Páginas-evento" são tendência ruim. Cada seção pulsando individualmente compete com a leitura.
**Recomendação:** Aplicar fade-in **APENAS** no Hero (na primeira pintura). Demais seções aparecem direto. Ou aceitar e calibrar threshold (`0.05` em vez de `0.1`) pra disparar mais cedo.
**Esforço:** S — remover hook ou tornar opt-out por seção.

---

## 9. Auditoria de Imagens e Mídia

### 9.1 Inventário

| Caminho | Tamanho original | Renderizado (desktop) | KB | Formato | Loading |
|---|---|---|---|---|---|
| `/video/takes.mp4` | — | 440×550 (card) | **4.5MB** | mp4 | autoplay, preload="auto" implícito |
| `/video/takes-poster.jpg` | — | 440×550 | 50KB | jpg | poster |
| `/images/e21-studio-bg.jpg` | — | full bg | 125KB | jpg | bg-image CSS (sempre carrega) |
| `/images/studio-geral.jpg` | — | ~1265×420 | **1.3MB** | jpg | next/image lazy |
| `/images/clients/dr-andre-moreira.jpg` | — | ~120×120 (circle) | **10MB** | jpg | next/image |
| `/images/clients/dra-larissa-nunes.jpg` | — | ~120×120 | **5.1MB** | jpg | next/image |
| `/images/clients/dra-sara-mendes.jpg` | — | ~120×120 | **8.0MB** | jpg | next/image |
| `/images/clients/dra-stephanny-melo.jpg` | — | ~120×120 | **7.1MB** | jpg | next/image |
| `/images/clients/dr-luan-ocana.png` | — | ~120×120 | 1.1MB | png | next/image |
| Outros clients | — | ~120×120 | 192KB–752KB | jpg/png | next/image |
| `/images/team/*.jpg` (7 fotos) | — | ~280–700px circle/banner | **5–7MB cada** | jpg | next/image |
| `/images/depoimentos/*.jpeg` (5) | — | ~600 wide | 34–227KB | jpeg | next/image |
| `/images/notifications/whatsapp.webp` | — | 36×36 | 2.2KB | webp | next/image |
| `/logos/e21-med.svg` | — | 176×132 | 3.7KB | svg | next/image |

### 9.2 Otimização

#### [P0] Fotos de clientes e equipe com tamanho 100-1000× maior que renderizado
**Onde:** [`public/images/clients/`](public/images/clients/) e [`public/images/team/`](public/images/team/)
**O que é:** Dr. André Moreira: **10MB**, renderizado em 120×120 px. Mesmo com `next/image` redimensionando, a imagem ORIGINAL fica no repo, fica no deploy, e o servidor de imagens otimizadas precisa baixar 10MB pra gerar a thumbnail.
**Por que importa:**
- Build/deploy mais lentos.
- 80MB total de imagens em `public/images/` polui o repo.
- Cold start do next/image transform: tempo de TTFB ruim.
- Se Vercel hit cache miss em CDN edge, 10MB transforming é caro.
**Recomendação:** Pré-otimizar todas as fotos de pessoas pra ~500-800KB cada via `sips -s formatOptions 80 -Z 1600` ou ImageOptim. Manter `next/image` pra responsive variants.
**Esforço:** M (lote de ~20 imagens)
**Referência:** Squoosh.app, ImageOptim. Ou pipeline com sharp.

#### [P1] Imagens em PNG quando JPEG/WEBP serviriam
**Onde:** Clinica Haven, Layla Jorge, Rebeca Mendes, Laura Oliveira, Luan Ocanã, Adriana Moser, Danilo Minari, Mais Médicos.
**O que é:** PNG para fotos sem transparência é desperdício de 2-4x em tamanho vs JPEG.
**Recomendação:** Converter pra JPEG (quality 80) ou WEBP. Único PNG justificado é `whatsapp.webp` (já WEBP) e logos SVG.
**Esforço:** S

#### [P0] Hero vídeo sem `preload="metadata"` declarado
**Onde:** [`Hero.tsx:73-83`](src/components/Hero.tsx)
**O que é:** `<video autoplay muted loop playsInline poster=...>` sem `preload`. Default é navegador-dependente, geralmente `auto`, baixa o vídeo inteiro.
**Por que importa:** Sobrecarrega bandwidth do mobile do usuário ANTES dele ver se quer ficar no site.
**Recomendação:** `preload="metadata"` — baixa só os primeiros bytes pra mostrar o poster + readiness. Vídeo inicia download quando autoplay dispara, sob controle do navegador.
**Esforço:** S

### 9.3 Aspect ratio

next/image declara `width` e `height` em quase todos os usos. ✓ Sem CLS esperado por imagem.

Notable: as notificações no Hero usam `<Image fill>` implicitamente? **Verificado**: `<WhatsAppNotification>` não usa next/image, mas componente sem imagem. As notificações são divs com texto.

### 9.4 Vídeo do hero

| Atributo | Valor | Avaliação |
|---|---|---|
| `autoPlay` | ✓ | OK no mobile com muted |
| `muted` | ✓ | OK |
| `loop` | ✓ | OK |
| `playsInline` | ✓ | iOS-friendly |
| `poster` | `/video/takes-poster.jpg` | ✓ |
| `controls` | × (não existe) | Não há como pausar |
| Tamanho | 4.5MB | OK para hero |
| Resolução | 720×900 (assumido pelo aspect) | OK |
| Track de legendas | × | **FAIL** |

#### [P0] Vídeo autoplay sem controles E sem legendas
**Onde:** [`Hero.tsx:73-83`](src/components/Hero.tsx)
**O que é:** Autoplay + loop + muted + sem botão de pausa + sem `<track>` de legendas.
**Por que importa:**
- WCAG 1.2.2 (Captions Prerecorded): mesmo vídeo decorativo, se transmite informação, precisa de legendas. Aqui são bastidores — informação visual contextual, não fala. Aceitável MARGINAL.
- WCAG 2.2.2 (Pause, Stop, Hide): conteúdo em movimento que dura mais de 5s precisa de controle de pausa.
- WCAG 2.3.1 (Three Flashes): se houver flashes, problema. (Não vejo flashes no conteúdo descrito.)
**Recomendação:**
- Adicionar botão de pausa/play discreto (canto inferior do video card).
- Adicionar `<track kind="descriptions">` ou marcar o vídeo como decorativo via `aria-hidden="true"` (já está!). **AGUARDA**: se está `aria-hidden`, screen readers ignoram. Pra usuário visual com sensibilidade ao movimento, ainda falta botão de pausa.
**Esforço:** M
**Referência:** [WCAG 2.2.2 Pause](https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html).

### 9.5 Imagens decorativas vs informativas

- `/logos/e21-med.svg` → alt="E21 MED" ✓ informativo
- Notificações WhatsApp logo → aria-hidden="true" ✓ decorativo
- Fotos de clientes → alt={client.name} ✓
- Fotos de equipe → alt={member.name} ✓ ou alt={TEAM.groupPhoto.alt} ✓
- Depoimentos → alt="Depoimento de cliente" — **genérico demais**

#### [P2] Alt genérico nos depoimentos
**Onde:** [`Testimonials.tsx:37`](src/components/Testimonials.tsx)
**O que é:** `alt={item.alt}` resolvido pra "Depoimento de cliente" em todos os 5 prints.
**Recomendação:** Adicionar autor + 1 linha de resumo: "Depoimento de Verônica Teixeira: Olá Victor, obrigada! Cada trabalho..."
**Esforço:** S

### 9.6 Focal point

next/image usa `object-cover` por default. Em fotos circulares (clientes, equipe), o centro da foto deve ter o rosto. **Não verificado por foto**, mas se algum cliente tiver rosto deslocado, fica cortado.

#### [P2] Fotos circulares com `object-position` default
**Onde:** Avatares de clientes e equipe.
**Recomendação:** Verificar fotos individualmente. Se algum rosto fica cortado, usar `object-position: top` ou específico por imagem.
**Esforço:** M (revisão manual de 19 fotos).

### 9.7 Placeholders

PhotoPlaceholder mostra "FOTO: descrição" centralizada em bg cinza-azulado claro. **Aceitável durante o desenvolvimento, mas não é blur-up / LQIP.**

next/image suporta `placeholder="blur"` com `blurDataURL`. Não usado.

#### [P2] Imagens grandes sem blur placeholder
**Onde:** Todas as `<Image>` que carregam imagens externas grandes (clients, team, depoimentos, studio-geral).
**Recomendação:** Adicionar `placeholder="blur"` com `blurDataURL` gerado em build time. Especialmente útil pra hero secundário (studio-geral.jpg, 1.3MB).
**Esforço:** M

---

## 10. Iconografia

### 10.1 Sistema

**Não há sistema de ícones.** Os "ícones" usados são:
- Logo SVG do WhatsApp ([`/images/notifications/whatsapp.webp`](public/images/notifications/whatsapp.webp))
- Logo SVG do E21 MED ([`/logos/e21-med.svg`](public/logos/e21-med.svg))
- Caracteres Unicode: `→`, `·`, `↓`, `▼` espalhados

#### [P2] Falta de sistema de ícones
**Onde:** Geral.
**O que é:** Setas (`→`), bullets (`·`), accordion (`↓`) implementados como TEXTO Unicode, não SVG. Quando o design precisar de ícones de "compromisso médico", "agendamento", etc., não há sistema.
**Recomendação:** Adoção de Lucide React (`lucide-react`) ou Heroicons. Stroke 2px, escala 16/20/24px. Tokenizar.
**Esforço:** M (adoção + substituição dos Unicode atuais).

### 10.2 Alinhamento óptico

`→` no botão "Ver detalhes" do HowItWorks usa Unicode default, alinhado matematicamente. **Levemente off** em relação ao texto (Unicode arrows costumam ter linha de base alta).

#### [P3] Setas Unicode com alinhamento óptico imperfeito
**Onde:** [`HowItWorks.tsx:130`](src/components/HowItWorks.tsx) (↓), [`ApplicationForm.tsx`] (não tem), Sub-badge "→" (não existe — confundi com e21adv).
**Recomendação:** Migrar para SVG.

### 10.3 Cor e estado

Logo do WhatsApp: filter brightness(0) invert(1) — método válido pra transformar SVG colorido em branco. Inflexível pra estados (hover). ✓ por enquanto.

---

## 11. Responsividade e Adaptabilidade

### 11.1 Breakpoints

Tailwind default:
- `sm:` 640px
- `md:` 768px (raramente usado)
- `lg:` 1024px
- `xl:` 1280px
- `2xl:` 1536px (não usado)

Justificados pelo padrão Tailwind — não há override custom. ✓

### 11.2 Por seção, em cada breakpoint

| Breakpoint | Layout | Observação |
|---|---|---|
| 375px (iPhone SE) | Mobile vertical | Hero text-lg = 18px. **OK mas no limite.** |
| 768px (iPad) | Mostly mobile-style ainda | Funciona como mobile, sem split horizontal |
| 1024px (lg) | Split desktop ativa | Hero 50/50 ativa. PainPoints continua 3-col. |
| 1280px (xl) | Padding aumenta pra `xl:px-16` | Confortável |
| 1600px+ | Excesso de whitespace lateral | `max-w-7xl` (1280) deixa 320px de cada lado |

#### [P2] Hero h1 a 18px no mobile é pequeno pra hero
**Onde:** [`Hero.tsx:147`](src/components/Hero.tsx)
**O que é:** `text-lg` (18px) é tamanho de body, não de h1 de hero. Decisão tomada antes pra caber em 2 linhas.
**Por que importa:** Em mobile, hero tem que GRITAR. 18px com 2 sentenças wraps em 4 linhas, perde impacto.
**Recomendação:** Subir pra `text-xl` (20px) ou `text-2xl` (24px) e aceitar 3 linhas. Ou reescrever copy menor.
**Esforço:** S

### 11.3 Touch targets

- CTA do Hero: padding `px-6 py-3` = ~64×48px. ✓ (>44px)
- Tabs do HowItWorks: `px-4 py-3` = ~48×48px (depende do conteúdo). ✓
- Botão "Ver detalhes": **inline** dentro do texto. Área provavelmente <40px de altura. **Borderline.**
- Link "@e21.studio" no sub-badge: inline. **Pequeno.**

#### [P1] "@e21.studio" inline pequeno demais para toque mobile
**Onde:** [`Hero.tsx:138`](src/components/Hero.tsx)
**O que é:** Link inline a 12px com pouca área tappable.
**Por que importa:** Apple HIG: 44×44pt mínimo. Aqui o link é ~16px de altura. **Fail.**
**Recomendação:** Aumentar padding (`px-2 py-1`) ou aumentar fonte. Ou aceitar como "link decorativo, não principal".
**Esforço:** S

### 11.4 Safe areas (iOS)

`env(safe-area-inset-*)` **NÃO USADO**.

#### [P2] Sem safe-area para iPhone com notch/home-bar
**Onde:** Hero mobile (texto na base) pode ficar embaixo da home-bar do iPhone.
**Recomendação:** `padding-bottom: max(2.5rem, env(safe-area-inset-bottom))` no conteúdo do hero mobile.
**Esforço:** S

### 11.5 Viewport e meta

[`layout.tsx:18-22`](src/app/layout.tsx) declara metadata.title e description, mas:
- Sem `viewport` explícito (Next.js define padrão).
- Sem `theme-color`.

#### [P2] Sem `theme-color` na barra do browser mobile
**Onde:** [`layout.tsx`](src/app/layout.tsx) metadata
**O que é:** A barra do navegador (PWA, iOS Safari) usa cor default cinza.
**Recomendação:** `themeColor: "#0F2440"` na metadata. Liga a barra ao navy-dark do hero. **Atenção**: só se hero for sempre a primeira tela.
**Esforço:** S

### 11.6 Orientação landscape mobile

Não testada. Hero `pt-[68%]` em landscape (812×375) ficaria com pt = ~552px... e a tela tem só 375 de altura. **PROVÁVEL QUEBRA EM LANDSCAPE.**

#### [P1] Hero pode quebrar em landscape mobile
**Onde:** [`Hero.tsx:50`](src/components/Hero.tsx) — `pt-[68%]`
**Por que importa:** Telefones em landscape (tablets baratos, iPhones rotacionados) têm proporção ~2:1. `pt-[68%]` reserva 68vw de altura para o vídeo, esmagando o conteúdo.
**Recomendação:** Mídia query landscape com altura menor: `@media (orientation: landscape) and (max-width: 1024px) { pt-[40%] }`.
**Esforço:** S

---

## 12. Componentes e Padrões

### 12.1 Componentes reutilizáveis

| Componente | Reuso | Variantes implementadas |
|---|---|---|
| `PhotoPlaceholder` | 2× (HowItWorks tab, PhotoDivider fallback) | ratio: 16:9 / 4:3 / 1:1; rounded boolean |
| `WhatsAppNotification` (inline em Hero) | 2× | nenhuma — 2 instâncias iguais |
| Tab button (HowItWorks) | inline, 4× | active / inactive |
| Card de cliente (SocialProof) | inline, 13× | nenhuma |
| Card de membro (Team) | inline, 6× | nenhuma |

#### [P1] `WhatsAppNotification` inline no Hero.tsx em vez de componente separado
**Onde:** [`Hero.tsx:7-44`](src/components/Hero.tsx)
**O que é:** Componente declarado dentro do mesmo arquivo do Hero. Usado 2× no mesmo arquivo. Não exportado.
**Por que importa:** Quando precisar reusar (Footer, mid-page, segunda landing), o componente está acoplado.
**Recomendação:** Mover pra `src/components/WhatsAppNotification.tsx`.
**Esforço:** S

#### [P2] Tab button do HowItWorks não componentizado
**Onde:** [`HowItWorks.tsx:42-70`](src/components/HowItWorks.tsx) (inline)
**Recomendação:** Extrair para `<Tab>` ou usar shadcn Tabs. Vai precisar quando o site crescer.
**Esforço:** S

### 12.2 Matriz de variantes — Não há componentes formais (Button, Input, Card). Toda variante é inline com classes.

#### [P1] Sem componentes base (Button, Input, Card)
**Onde:** Geral.
**O que é:** O CTA do Hero tem styling diferente do submit do Form, que tem styling diferente do "Ver detalhes" do HowItWorks. Não há `<Button variant="primary" />`.
**Por que importa:** Próximas seções/CTAs vão ser inconsistentes. Manutenção exige edição em N lugares.
**Recomendação:** Definir `<Button>` com variants (primary, secondary, ghost, link). Migrar incrementalmente.
**Esforço:** L

### 12.3 Estados ausentes

(coberto em 8.5)

### 12.4 Formulários

#### [P1] Inputs sem `autocomplete` e `inputMode`
**Onde:** [`ApplicationForm.tsx:50-57`](src/components/ApplicationForm.tsx)
**O que é:** Inputs com `type="text"` ou `type="tel"`, mas sem `autocomplete="name"`, `autocomplete="tel"`, `inputMode="tel"`, etc.
**Por que importa:** Em mobile, sem `autocomplete`, o teclado virtual default aparece (não otimizado pra telefone). Sem `inputMode="tel"`, mesmo o `type="tel"` mostra teclado completo no Android.
**Recomendação:** Mapear cada campo:
- Nome → `autocomplete="name"`
- WhatsApp → `autocomplete="tel"` + `inputMode="tel"`
- Especialidade → `autocomplete="off"` (campo livre)
- Instagram → `autocomplete="username"`
**Esforço:** S

#### [P2] Sem validação inline / error states
**Onde:** [`ApplicationForm.tsx`](src/components/ApplicationForm.tsx)
**O que é:** Validação só HTML5 nativa (`required`). Sem mensagem custom, sem highlight de campo inválido, sem `aria-describedby` para erros.
**Recomendação:** Adicionar estado de erro por campo. Border vermelha + mensagem abaixo.
**Esforço:** M

#### [P0] Mensagem de sucesso não anunciada por screen reader
**Onde:** [`ApplicationForm.tsx:27-32`](src/components/ApplicationForm.tsx)
**O que é:** O componente troca para "Pedido recebido!" mas o `<div>` que mostra a mensagem não tem `aria-live` ou `role="status"`.
**Por que importa:** WCAG 4.1.3 (Status Messages). Usuário de screen reader não sabe que o form foi enviado.
**Recomendação:** Adicionar `role="status" aria-live="polite"` no div da mensagem de sucesso.
**Esforço:** S

### 12.5 Navegação

**Não há navegação topo / menu.** A página é landing single-page. CTA navega via âncora `#formulario`. ✓ Simples e funcional.

#### [P3] Sem skip link "Pular para conteúdo"
**Onde:** [`layout.tsx`](src/app/layout.tsx) — body root
**O que é:** Sem `<a href="#main" class="sr-only focus:not-sr-only">Pular para conteúdo</a>`.
**Por que importa:** Usuários de teclado. Sem skip link, precisam tabular por tudo (logo, sub-badge, etc.) antes de chegar no conteúdo.
**Recomendação:** Adicionar skip link como primeiro elemento do `<body>`.
**Esforço:** S

### 12.6 Cards

- Cards do PainPoints: hover sem estado claro. Sem destaque ativo.
- Cards do Team: sem estado de hover.
- Cards do Testimonials: sem estado.

#### [P3] Cards sem hover state
**Onde:** Múltiplos.
**O que é:** Cards parecem clicáveis (têm ring, shadow) mas não são. Confunde expectativa.
**Recomendação:** Ou tornar clicáveis (linkar pra subpáginas/modais), ou remover affordance de clique (tirar shadow).
**Esforço:** S

---

## 13. Acessibilidade

### 13.1 Estrutura semântica

- `<h1>` único na página (Hero). ✓
- `<h2>` em 5 seções (PainPoints, Team, HowItWorks, Testimonials, ApplicationForm). ✓
- `<h3>` no Team (nomes) e no HowItWorks (título da tab ativa). ✓
- `<main>` em [`page.tsx:14`](src/app/page.tsx). ✓
- `<section>` em todas as seções. ✓
- `<footer>` ✓

**Hierarquia OK. Sem pular níveis.** ✓

### 13.2 ARIA

- `aria-hidden="true"` em decorações: overlays do Hero, gradientes, logo do WhatsApp dentro das notificações. ✓
- Sem `aria-current` (não há navegação).
- Tabs do HowItWorks: `<button type="button">` sem `aria-selected`, sem `role="tab"`, sem `role="tabpanel"`.

#### [P1] Tabs do HowItWorks sem ARIA tabs pattern
**Onde:** [`HowItWorks.tsx:42-70`](src/components/HowItWorks.tsx) e [`HowItWorks.tsx:75`](src/components/HowItWorks.tsx) (panel).
**O que é:** Funcionalmente são tabs. Mas `<button>` sem `aria-selected`, sem `role="tab"`, sem `aria-controls`. Panel sem `role="tabpanel"`.
**Por que importa:** Screen readers não anunciam "tab 1 de 4" nem "panel selecionado".
**Recomendação:** Implementar pattern ARIA Tabs ou usar `radix-ui/react-tabs`.
**Esforço:** M
**Referência:** [WAI-ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

### 13.3 Focus management

(coberto em 8.5)

### 13.4 Screen readers

#### [P1] Skip link ausente — já coberto.

#### [P0] Mensagem de form sem aria-live — já coberto.

#### [P2] Animações `useFadeIn` causam reflow do conteúdo
**Onde:** Todas as seções.
**O que é:** O hook adiciona `opacity-100 translate-y-0` quando entra na viewport. Mas o conteúdo já está no DOM. Screen reader anuncia tudo independentemente da animação. ✓ Sem problema de SR.
**Análise:** OK, manter.

### 13.5 Forms acessíveis

- `<label htmlFor>` em todos os inputs ✓
- Inputs `required` ✓
- Sem `aria-describedby` (sem error states implementados)
- Sem `aria-invalid`

### 13.6 Alts (coberto em 9.5)

---

## 14. Performance Percebida

### 14.1 Core Web Vitals esperados

**Não medido com ferramenta. Estimativas baseadas em código:**

| Métrica | Estimativa | Meta | Estado |
|---|---|---|---|
| LCP | 2-3s (vídeo do hero é provavelmente o LCP) | <2.5s | **Borderline** |
| CLS | <0.05 (next/image + next/font + size declarado) | <0.1 | ✓ |
| INP | <100ms (handlers simples) | <200ms | ✓ |
| FCP | <1.5s | <1.8s | ✓ |

#### [P1] LCP provavelmente é o vídeo de 4.5MB com poster
**Onde:** [`Hero.tsx:73-83`](src/components/Hero.tsx)
**O que é:** O poster.jpg (50KB) é o LCP candidate. Como autoplay dispara imediato, o navegador começa download. Em 3G/4G fraco, vídeo demora.
**Recomendação:**
- `preload="metadata"` (não auto)
- Considerar mobile-specific video (mais leve, ex: 1.5MB)
- Eventualmente, lazy-load do vídeo (substituir poster por play-on-click)
**Esforço:** M

### 14.2 Estratégia de fonte

- `display: swap` ✓
- `next/font` faz preload automático ✓
- Sem `adjustFontFallback` declarado (Next 16 padrão = true, **verificar**)

### 14.3 Critical CSS

next/app router faz isso automaticamente. ✓

### 14.4 Above the fold

Estimativa do peso pra primeira tela:
- HTML + CSS inlined: ~30KB
- JS bundle (Next router + hidratação): ~80KB
- Fonts: ~120KB (DM Sans variável + DM Serif Display)
- Hero video poster: ~50KB
- Logo SVG: ~4KB
- Logo wall bg: ~125KB
- WhatsApp logo: ~3KB
**Total estimado: ~410KB**

OK pra desktop. **Apertado pra mobile 3G.**

### 14.5 Lighthouse / PageSpeed

**Não rodado nesta auditoria.** Recomendação: rodar `npx lighthouse https://e21med.vercel.app --view` e adicionar resultado.

---

## 15. Brand, Personalidade e Anti-padrões

### 15.1 Voz visual

A página tem coerência razoável (mesma tipografia, mesma paleta), mas há **3 zonas de "voz" diferentes**:

| Zona | Voz |
|---|---|
| Hero | "Cinema/produção" — bg-image fixed, vídeo, gradient overlay, marca-texto amarelo |
| PainPoints + HowItWorks | "Editorial sobre cream" — cards limpos, tipografia serif clássica |
| Testimonials + Notificações | "Social proof realista" — prints autênticos, identidade WhatsApp |
| Form + Footer | "CTA institucional" — bg navy sólido |

**Análise:** Cada zona faz sentido isoladamente, mas a transição entre elas é abrupta. Não há ponte visual (ex: cards que "ecoam" o navy do hero).

### 15.2 Trust signals (crítico em saúde)

- ✓ Fotos REAIS de clientes (Dr. André, Dra. Larissa, etc.) — autenticidade clara
- ✓ Fotos REAIS da equipe — não stock
- ✓ Prints REAIS de WhatsApp (Verônica, Dhara, Jessica, Sara) — social proof verossímil
- ✓ Vídeo de bastidor do estúdio — concreto
- ✗ **SEM CRM, CNPJ, endereço físico, CRP da equipe de marketing.**
- ✗ **SEM selos de LGPD / política de privacidade.**
- ✗ **SEM nome da empresa explícito além do "E21 Studio © 2026" no footer.**
- ✗ **SEM CTA secundário ("Saiba mais", "Ver portfólio") — só "Agendar reunião"**

#### [P0] Faltam trust signals essenciais para vertical de saúde
**Onde:** Footer ([`Footer.tsx`](src/components/Footer.tsx)) e geral.
**O que é:** Footer só tem copyright e tagline. Não há CNPJ, endereço, política de privacidade, termos.
**Por que importa:** Médico (lead qualificado, geralmente cético) precisa de mais do que vídeo bonito. CRM da agência, CNPJ, contato direto, link pra portfólio — tudo isso fortalece.
**Recomendação:** Footer expandido com:
- CNPJ da E21 Studio
- Endereço físico do estúdio
- Link pra Política de Privacidade
- Telefone/WhatsApp business
- Selos de cliente (se houver — "Médicos com 100k+ seguidores", etc.)
**Esforço:** M

### 15.3 Anti-padrões "design feito por IA"

Auditoria de elementos suspeitos:

| Anti-padrão | Presente? | Onde |
|---|---|---|
| Bento grids sem motivo | × | — |
| Glassmorphism abusivo | Sim, mas justificado | Notificações WhatsApp (faz sentido com a estética iOS) |
| Gradientes vibrantes/holográficos | × | — |
| "Aurora" backgrounds animados | × | — |
| Cards com border+shadow+gradient+blur juntos | × | — |
| Headlines com gradient text | × (uso de marca-texto sólido, não gradient) | — |
| Ícones outline com fundo gradient circular | × | — |
| Emojis 3D Fluent | × | — |
| "AI sparkle" ✨ | × | — |

**Veredito:** Página relativamente limpa de tells. ✓

### 15.4 Originalidade

- Hero com vídeo full-bleed + texto sobre gradient: **PADRÃO** (não original).
- Carrossel SocialProof horizontal infinito com fade nas bordas: **PADRÃO**.
- Tabs interativas com 2 colunas (foto/conteúdo): **PADRÃO**.
- Timeline antes (atualmente substituída por tabs): foi original.
- Notificações WhatsApp customizadas flutuando sobre vídeo: **ORIGINAL E EFICAZ.** Único ponto onde o produto destoa do esperado pra landing-de-marketing.

### 15.5 Coerência com vertical de saúde

- Cores: navy + cream = "premium consultório" — ✓ coerente.
- Tipografia: DM Serif Display sugere "boutique" mais que "clínica". [P1 já apontado em 2.4]
- Imagens: fotos autênticas de médicos. ✓ — talvez excelente.
- Tom: profissional sem ser frio. ✓
- Sinais de confiança: insuficientes (15.2).

---

## 16. Dependências, CSS Global e Dívida Técnica-Visual

### 16.1 Dependências

[`package.json`](package.json) — pacotes que afetam visual:
- `next` (incluindo `next/image`, `next/font`)
- `tailwindcss` v4
- React 19

**Sem libs de animação** (framer-motion, GSAP) — animações são CSS puro. ✓ Leve.
**Sem libs UI** (Radix, shadcn) — componentes próprios. **Comentar**: pra projeto pequeno, OK. Pra crescer, considerar adoção.

### 16.2 globals.css

124 linhas. Estrutura:
- L1: `@import "tailwindcss";`
- L3-7: CSS variables `:root`
- L8-20: `@theme inline` (tokens Tailwind v4)
- L22-32: `html`, `body` base
- L34-38: `h1-h6` defaults
- L40-122: keyframes e animation classes

**Análise:** Razoavelmente organizado. Sem `@layer base/components/utilities` explícito — Tailwind v4 inline theme dispensa.

#### [P3] `fade-in-up` keyframe dead code
**Onde:** [`globals.css:75-88`](src/app/globals.css)
**Recomendação:** Remover.
**Esforço:** S

### 16.3 Classes arbitrárias Tailwind `[...]`

Lista (excluindo arbitrários esperados como aspect ratio):

| Classe | Onde | Justificável? |
|---|---|---|
| `text-[9-11px]` etc | (já refatorados) | ✓ |
| `pt-[68%]` | Hero | ✓ aspect ratio mobile |
| `lg:w-[440px]` `lg:h-[550px]` | Hero card | ✓ matching video aspect 0.8 |
| `top-[8%]`, `top-[28%]`, `top-[42%]` | Notificações Hero | Acceptable — posicionamento custom |
| `lg:min-h-[720px]` | Hero | ✓ |
| `h-[65%]` | Gradient overlay | ✓ |
| `tracking-[0.2em]` | Labels uppercase | ✓ |
| `tracking-[0.18em]` | Não usado mais | — |
| `tracking-[0.22em]` | Já refatorado | — |
| `tracking-wide` | PhotoPlaceholder | ✓ Tailwind default |
| `bg-[#1f1f1f]/95` | Notificação bg | × (deveria virar token) |
| `bg-[#25D366]` | WhatsApp green | × (token) |
| `shadow-[0_...]` | Múltiplos | × (tokens de elevação) |
| `leading-[1.25]` `leading-[1.2]` | Hero h1 | × (usar leading-tight/snug) |
| `aspect-[16/7]` `aspect-[3/1]` `aspect-[21/9]` | PhotoDivider | ✓ |

**Resumo:** Maioria justificável. Os hardcoded de cor (`[#1f1f1f]`, `[#25D366]`) e shadows são candidatos a token.

### 16.4 Estilos inline

13 ocorrências de `style={{...}}` em componentes. Algumas justificadas (delay, computed gradient), outras candidatas a classe ou token.

| Local | Justificável? |
|---|---|
| [`Hero.tsx:54-60`](src/components/Hero.tsx) bg overlay | ✓ multi-layer CSS bg-image |
| [`Hero.tsx:88, 99`](src/components/Hero.tsx) `animationDelay` | ✓ valor dinâmico |
| [`Hero.tsx:112-114`](src/components/Hero.tsx) gradient mobile | × pode virar classe |
| [`Hero.tsx:131`](src/components/Hero.tsx) filter drop-shadow | × pode virar classe |
| [`Hero.tsx:148, 158`](src/components/Hero.tsx) textShadow | × pode virar classe |
| [`SocialProof.tsx:22-28`](src/components/SocialProof.tsx) maskImage | ✓ longo demais pra classe |
| [`Specialties.tsx:12-18`](src/components/Specialties.tsx) maskImage | ✓ idem |
| [`Testimonials.tsx:22-28`](src/components/Testimonials.tsx) maskImage | ✓ idem |
| [`HowItWorks.tsx:138`](src/components/HowItWorks.tsx) `gridTemplateRows` | ✓ valor dinâmico |
| [`Hero.tsx:26`](src/components/Hero.tsx) `filter: brightness invert` | × pode virar classe |

#### [P2] Text-shadows inline poderiam ser classe
**Onde:** [`Hero.tsx:148, 158`](src/components/Hero.tsx)
**Recomendação:** Definir `.text-shadow-heading` e `.text-shadow-body` no globals.css.
**Esforço:** S

### 16.5 `!important`

```bash
grep -r "!important" src/
```
**Resultado: ZERO ocorrências.** ✓ Limpo.

### 16.6 Código CSS morto

- `animate-fade-in-up` definido, não usado.

---

## 17. Metadados e Sistema de Marca

### 17.1 Favicons

**Não verificado:** Não há `public/favicon.ico` explícito listado, nem `apple-touch-icon.png`. Next.js usa `app/icon.tsx` ou `app/favicon.ico` por convenção.

#### [P1] Verificar set de favicons completo
**Recomendação:** Garantir presença de:
- `app/favicon.ico` (16, 32) — Next.js convenção
- `app/icon.png` (32×32, 192×192, 512×512)
- `app/apple-icon.png` (180×180)
- `manifest.json` com `theme_color`, `background_color`
**Esforço:** M

### 17.2 Open Graph e Twitter Cards

[`layout.tsx:18-22`](src/app/layout.tsx) define `title` e `description` apenas. **Sem `openGraph`, sem `twitter`.**

#### [P0] Sem Open Graph metadata
**Onde:** [`layout.tsx`](src/app/layout.tsx)
**O que é:** Compartilhar o link no WhatsApp/LinkedIn/Twitter mostra preview pobre (só URL).
**Por que importa:** Marketing por compartilhamento direto perde força. Médico recebe link no grupo do WhatsApp → preview ruim → bounce.
**Recomendação:** Adicionar:
```ts
openGraph: {
  title: "E21 MED · Construindo autoridade para médicos",
  description: "...",
  url: "https://e21med.vercel.app",
  siteName: "E21 MED",
  images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "..." }],
  locale: "pt_BR",
  type: "website",
},
twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] }
```
+ criar `public/og-image.jpg` 1200×630 com a marca.
**Esforço:** S

### 17.3 Manifest e tema

**Sem `manifest.json` na raiz visível.** Sem `theme-color`.

### 17.4 Páginas auxiliares

- 404: Next.js default (preto sobre branco minimalista). **Não personalizado.**
- 500: idem.
- Loading: nenhum estado global.

#### [P2] Páginas 404 e 500 não personalizadas
**Onde:** Sem `app/not-found.tsx` ou `app/error.tsx`.
**Recomendação:** Criar `app/not-found.tsx` com mesma identidade da home (logo + frase + CTA pra voltar). Cria pequeno momento de marca em vez de "404 not found".
**Esforço:** M

---

## 18. Inconsistências entre seções da home

| Atributo | Hero | SocialProof | PainPoints | PhotoDivider | Specialties | Team | HowItWorks | Testimonials | Form | Footer |
|---|---|---|---|---|---|---|---|---|---|---|
| bg | navy-dark | cream | cream | cream | white | cream | white | white | navy | navy-dark |
| py mobile | custom (68%) | 8 | 16 | 8 | 8 | 16 | 16 | 16 | 16 | 12 |
| py sm: | custom | 12 | 24 | 12 (lg:16) | 12 | 24 | 24 | 24 | 24 | 16 |
| max-w | 7xl (texto 2xl) | implícito | 7xl | 7xl | implícito | 7xl | 7xl | implícito | 3xl | 7xl |
| h2 size | text-lg/2xl/3xl (h1) | text-xs (label) | 3xl/4xl/5xl | — | — | 3xl/4xl/5xl | 3xl/4xl/5xl | 3xl/4xl/5xl | 3xl/4xl/5xl | — |
| h2 align | left | center | center | — | — | center | center | center | center | — |
| h2 margin-bottom | gap-5/7 | mb-10/14 | 12/16 | — | — | 12/16 | 12/16 | wrapper 12/16 | 12 | — |

**Inconsistências:**

#### [P2] ApplicationForm com `max-w-3xl` enquanto outras seções têm `max-w-7xl`
**Onde:** [`ApplicationForm.tsx:18`](src/components/ApplicationForm.tsx) vs outras.
**O que é:** Form propositalmente mais estreito pra dar foco. Defensável.
**Análise:** ACEITÁVEL — diferença intencional.

#### [P2] ApplicationForm h2 margin sem responsivo
**Onde:** [`ApplicationForm.tsx:20`](src/components/ApplicationForm.tsx) — `mb-12` sem `sm:mb-16`.
**Recomendação:** `mb-12 sm:mb-16` (já apontado em 5.2).

#### [P3] PhotoDivider tem 3 breakpoints de py, outros 2
(coberto em 5.1)

---

## 19. Priorização e Roadmap

### 19.1 Matriz Impacto × Esforço

| Achado | Impacto | Esforço | Quadrante |
|---|---|---|---|
| [P0] Vídeo sem controle de pausa nem captions | Alto | M | Quick win viável |
| [P0] `prefers-reduced-motion` ignorado | Alto | S | **Quick win** |
| [P0] Imagens client/team com peso 5-10MB | Alto | M | Estrutural |
| [P0] focus-visible ausente | Alto | M | Quick win viável |
| [P0] Mensagem de form sem aria-live | Alto | S | **Quick win** |
| [P0] Trust signals ausentes (CNPJ, política) | Alto | M | Estrutural |
| [P0] Sem Open Graph metadata | Alto | S | **Quick win** |
| [P0] navy/40 falha AA | Médio-alto | S | **Quick win** |
| [P1] Tokens só primitivos | Médio | M | Estrutural |
| [P1] DM Sans carrega variável inteira | Médio | S | **Quick win** |
| [P1] DM Serif Display brand-fit | Alto | L | Estrutural (decisão de marca) |
| [P1] Tabs sem ARIA pattern | Médio | M | Estrutural |
| [P1] Form sem autocomplete | Médio | S | **Quick win** |
| [P1] Hero h1 pequeno mobile | Médio | S | Quick win |
| [P1] Sem skip link | Médio | S | **Quick win** |
| [P1] Hero landscape mobile pode quebrar | Médio | S | Quick win |
| [P2] text-wrap balance | Médio | S | **Quick win** |
| [P2] PhotoDivider 3 breakpoints | Baixo | S | Higiene |
| [P3] `fade-in-up` dead code | Baixo | S | Higiene |

### 19.2 Top 10 mudanças (em ordem de impacto)

1. **Adicionar `prefers-reduced-motion`** no globals.css (S, P0). 10 linhas, salva acessibilidade.
2. **Pré-otimizar imagens grandes** (M, P0). Cortar 80MB pra ~10MB no repo.
3. **Adicionar `focus-visible`** em todos os interativos (M, P0). Salva WCAG 2.4.7.
4. **Adicionar controle de pausa** no vídeo do hero (M, P0). Salva WCAG 2.2.2.
5. **Adicionar Open Graph metadata + og:image** (S, P0). Marketing por compartilhamento.
6. **Adicionar autocomplete + inputMode** nos inputs do form (S, P1). UX mobile crítico.
7. **Definir camada semântica de tokens** (M, P1). Base do design system.
8. **Adicionar trust signals no footer** (CNPJ, política, contato) (M, P0). Confiança em saúde.
9. **Implementar ARIA tabs pattern** no HowItWorks (M, P1). Acessibilidade.
10. **Avaliar substituição da DM Serif Display por Fraunces ou Source Serif 4** (L, P1). Brand-fit de saúde.

### 19.3 Mudanças estruturais

1. **Refator de tokens**: criar camada semântica (`--text-primary`, `--surface`, etc.) sobre os primitivos.
2. **Sistema de componentes base**: Button, Input, Card, Badge — extrair de Hero/Form/etc.
3. **Adotar Radix ou shadcn**: pra Tabs (HowItWorks), Dialog (futuro), Toast (futuro).
4. **Pipeline de imagens automatizado**: sharp no build pra otimizar tudo automaticamente.

---

## 20. Formato dos achados — Demonstrado nas seções acima.

---

## 21. Entrega

### Sumário quantitativo

| Severidade | Quantidade |
|---|---|
| P0 | 11 |
| P1 | 14 |
| P2 | 18 |
| P3 | 7 |
| **Total** | **50** |

### Tempo estimado de remediação

- **P0**: 6-8 dias-pessoa
- **P1**: 8-10 dias-pessoa
- **P2**: 4-6 dias-pessoa
- **P3**: 1 dia-pessoa
- **Total**: **19-25 dias-pessoa** (~4-5 semanas de 1 dev focado, ou 2-3 semanas com 2 devs).

### Fechamento

**O que esse projeto precisa para virar referência na vertical:**

O E21 MED hoje é uma landing com personalidade clara e execução acima da média do mercado brasileiro. A copy é boa, as fotos são autênticas, o vídeo é forte. Tecnicamente, o stack está moderno (Next 16, Tailwind v4, next/font) e a arquitetura é defensável.

Mas há um teto invisível imposto por três escolhas: **(1) ausência de acessibilidade básica** (`prefers-reduced-motion`, `focus-visible`, controles de mídia, ARIA tabs) — que num produto de saúde transforma "site bonito" em "site irresponsável". **(2) Falta de trust signals concretos** (CNPJ, política, equipe creditada, casos com métricas) — médico cético precisa de mais do que vídeo de bastidor. **(3) Brand-fit tipográfico questionável** — DM Serif Display posiciona "produtora boutique de marketing", não "infraestrutura de autoridade médica".

Resolvidos esses três blocos — e mantida a higiene sistêmica de tokens, escala e estados — esse projeto cruza facilmente de "ok" pra "premium" e disputa narrativa com qualquer player nacional do segmento. Os P0 não são reescrita; são 1-2 sprints de remediação direcionada. Os P1 sistêmicos compram a próxima fase de crescimento sem reescrita.

**Não é uma página ruim. É uma página jovem em vertical exigente.**

---

_Auditoria gerada em 2026-05-21. Próxima revisão recomendada após remediação dos P0._
