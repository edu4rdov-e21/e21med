# E21 MED

Landing page da E21 MED — produtora de autoridade digital para médicos.

Stack: Next.js (App Router) + TypeScript + Tailwind CSS v4.

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura de pastas

```
e21med/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout raiz (fonts DM Serif Display + DM Sans, metadata)
│   │   ├── page.tsx            # Página principal — monta as seções
│   │   └── globals.css         # Tema Tailwind v4 (cores, fonts, scroll suave)
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── PainPoints.tsx      # Seção "Isso é sobre você?"
│   │   ├── PhotoDivider.tsx    # Divisor visual full-width reutilizável
│   │   ├── PhotoPlaceholder.tsx# Bloco placeholder de foto (16:9, 4:3, 1:1)
│   │   ├── Differentiator.tsx  # "Aqui, sua imagem é protagonista"
│   │   ├── HowItWorks.tsx      # Fases 1 (Aceleração) e 2 (Exponenciação)
│   │   ├── Pricing.tsx         # Cards de preço
│   │   ├── Testimonials.tsx    # Depoimentos
│   │   ├── ApplicationForm.tsx # Formulário (#formulario) — só front, sem backend
│   │   └── Footer.tsx
│   ├── lib/
│   │   └── constants.ts        # Todos os textos, preços, dados dos cards
│   └── hooks/
│       └── useFadeIn.ts        # Intersection Observer pra animação de fade-in
├── public/
│   └── images/                 # Substitua os placeholders pelas fotos reais aqui
├── tailwind.config — não usado (Tailwind v4 = config via CSS em globals.css)
├── next.config.ts
└── README.md
```

## Como editar textos

Tudo em [`src/lib/constants.ts`](src/lib/constants.ts). Cada seção tem seu próprio objeto exportado (`HERO`, `PAIN_POINTS`, `PRICING`, `TESTIMONIALS`, etc). Edite ali sem mexer em componente.

## Como trocar fotos

1. Dropar os arquivos reais em `/public/images/`.
2. Em cada componente que usa `PhotoPlaceholder`, trocar pelo `next/image` apontando para o arquivo real. Exemplo:

```tsx
// antes
<PhotoPlaceholder description="FOTO: Médico gravando" ratio="4:3" />

// depois
<Image src="/images/hero.jpg" alt="Médico gravando" width={800} height={600} />
```

As descrições atuais nos placeholders indicam exatamente qual foto vai em cada lugar.

## Cores do tema (definidas em `globals.css`)

- `navy` — `#1A365D` (principal)
- `navy-light` — `#2B6CB0` (hovers)
- `navy-dark` — `#0F2440` (footer)
- `cream` — `#FAFAFA` (fundo)
- `photo-placeholder` — `#E8EDF3` (fundo dos placeholders)

Uso em Tailwind: `bg-navy`, `text-cream`, `bg-photo-placeholder`, etc.
