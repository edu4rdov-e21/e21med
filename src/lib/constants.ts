export const BRAND = {
  name: "E21 MED",
  tagline: "Produtora de autoridade digital.",
} as const;

export const HERO = {
  badge: "E21 MED",
  subBadgePre: "um projeto do grupo ",
  subBadgeHandle: "@e21.studio",
  subBadgeHref: "https://instagram.com/e21.studio",
  headlinePre: "O paciente não escolhe o melhor médico. ",
  headlineHighlight: "Escolhe o que ele já conhece",
  headlinePost: ".",
  subheadlinePre: "O E21 constrói uma audiência composta por ",
  subheadlineStrong: "pacientes prontos para adquirir seus serviços",
  subheadlinePost: ".",
  ctaLabel: "Quero agendar minha reunião",
  ctaHref: "#formulario",
  videoSrc: "/video/takes.mp4",
} as const;

export const SOCIAL_PROOF = {
  label: "Quem confia no E21",
  clients: [
    { name: "Dr. André Moreira", src: "/images/clients/dr-andre-moreira.jpg" },
    { name: "Dr. Danilo Minari", src: "/images/clients/dr-danilo-minari.png" },
    { name: "Dr. Luan Ocanã", src: "/images/clients/dr-luan-ocana.png" },
    { name: "Dra. Adriana Moser", src: "/images/clients/dra-adriana-moser.png" },
    { name: "Dra. Larissa Nunes", src: "/images/clients/dra-larissa-nunes.jpg" },
    { name: "Dra. Laura Oliveira", src: "/images/clients/dra-laura-oliveira.png" },
    { name: "Dra. Layla Jorge", src: "/images/clients/dra-layla-jorge.png" },
    { name: "Dra. Rebeca Mendes", src: "/images/clients/dra-rebeca-mendes.png" },
    { name: "Dra. Sara Mendes", src: "/images/clients/dra-sara-mendes.jpg" },
    { name: "Dra. Stephanny Melo", src: "/images/clients/dra-stephanny-melo.jpg" },
    { name: "Dra. Wanessa Barbosa", src: "/images/clients/dra-wanessa-barbosa.jpg" },
    { name: "Clínica Haven", src: "/images/clients/clinica-haven.png" },
    { name: "Evento Mais Médicos", src: "/images/clients/mais-medicos.png" },
  ],
} as const;

export const SPECIALTIES = {
  items: [
    "Endocrinologia",
    "Cirurgia Bariátrica",
    "Nutrologia",
    "Dermatologia",
    "Homeopatia",
    "Medicina da Família",
    "Cardiologia",
    "Endopediatria",
    "Ginecologia",
    "Oftalmologia",
  ],
} as const;

export const PAIN_POINTS = {
  title: "Isso é sobre você?",
  cards: [
    "Posta sem estratégia e não vê resultado.",
    "Depende apenas do boca a boca.",
    "Já passou por agência que só fez panfletagem digital.",
  ],
} as const;

export const PHOTO_DIVIDER_1 = {
  description: "Visão geral do estúdio E21",
  src: "/images/studio-geral.jpg",
} as const;

export const TEAM = {
  title: "Conheça a equipe que vai cuidar do seu projeto",
  groupPhoto: {
    src: "/images/team/time-completo.jpg",
    alt: "Equipe completa do E21",
  },
  members: [
    {
      name: "Eduardo",
      role: "Sócio e Diretor de Marketing",
      src: "/images/team/eduardo.jpg",
    },
    {
      name: "Victor",
      role: "Sócio e Diretor de Filmagem",
      src: "/images/team/victor.jpg",
    },
    {
      name: "Ana Clara",
      role: "Roteirista Sênior",
      src: "/images/team/ana-clara.jpg",
    },
    {
      name: "Nathalia",
      role: "Editora de Vídeos e Filmmaker",
      src: "/images/team/nathalia.jpg",
    },
    {
      name: "Giovana",
      role: "Editora de Vídeos Junior",
      src: "/images/team/giovana.jpg",
    },
    {
      name: "Gisele",
      role: "Customer Success e Atendimento",
      src: "/images/team/gisele.jpg",
    },
  ],
} as const;

export const HOW_IT_WORKS = {
  title: "Como funciona",
  phases: [
    {
      tag: "Fase 1",
      title: "Aceleração",
      duration: "90 dias",
      items: [
        "Consultoria de branding",
        "Sessão de fotos profissional",
        "Posicionamento + identidade visual do perfil",
        "Roteiros + gravação + edição mensal",
        "Estratégia de conteúdo + calendário editorial",
      ],
    },
    {
      tag: "Fase 2",
      title: "Exponenciação",
      duration: "90 dias",
      items: [
        "Produção mensal contínua",
        "Tráfego pago estratégico",
        "Funil de conversão (stories, CTAs, agendamento)",
        "Episódio de podcast",
      ],
    },
  ],
} as const;

export const TESTIMONIALS = {
  title: "Quem já vive isso",
  items: [
    { src: "/images/depoimentos/depoimento-1.jpeg", alt: "Depoimento de cliente", width: 1170, height: 662 },
    { src: "/images/depoimentos/depoimento-2.jpeg", alt: "Depoimento de cliente", width: 1134, height: 307 },
    { src: "/images/depoimentos/depoimento-3.jpeg", alt: "Depoimento de cliente", width: 1170, height: 450 },
    { src: "/images/depoimentos/depoimento-4.jpg",  alt: "Depoimento de cliente", width: 1119, height: 650 },
    { src: "/images/depoimentos/depoimento-5.jpeg", alt: "Depoimento de cliente", width: 739,  height: 1034 },
  ],
} as const;

export const FORM = {
  title: "Agende sua reunião",
  subtitle:
    "Preencha abaixo. Nossa equipe entra em contato em até 24h pra marcar sua reunião de diagnóstico.",
  submitLabel: "Quero agendar minha reunião",
  successMessage:
    "Pedido recebido! Entraremos em contato em até 24h pra confirmar.",
  fields: [
    { name: "nome", label: "Nome completo", type: "text", required: true },
    { name: "whatsapp", label: "WhatsApp", type: "tel", required: true },
    {
      name: "especialidade",
      label: "Especialidade médica",
      type: "text",
      required: true,
    },
    {
      name: "instagram",
      label: "@ do Instagram",
      type: "text",
      required: true,
    },
  ],
} as const;

export const FOOTER = {
  copyright: "E21 Studio © 2026",
  tagline: "Produtora de autoridade digital.",
} as const;
