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
  headlineHighlight: "Escolhe aquele em quem ele confia",
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
    { name: "Dra. Adriana Moser", src: "/images/clients/dra-adriana-moser.png" },
    { name: "Dra. Larissa Nunes", src: "/images/clients/dra-larissa-nunes.jpg" },
    { name: "Dr. Danilo Minari", src: "/images/clients/dr-danilo-minari.png" },
    { name: "Dra. Laura Oliveira", src: "/images/clients/dra-laura-oliveira.png" },
    { name: "Dra. Layla Jorge", src: "/images/clients/dra-layla-jorge.png" },
    { name: "Dr. Luan Ocanã", src: "/images/clients/dr-luan-ocana.png" },
    { name: "Dra. Rebeca Mendes", src: "/images/clients/dra-rebeca-mendes.png" },
    { name: "Dra. Sara Mendes", src: "/images/clients/dra-sara-mendes.jpg" },
    { name: "Dra. Stephanny Melo", src: "/images/clients/dra-stephanny-melo.jpg" },
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
  title:
    "Faremos um compromisso juntos: uma postagem todos os dias por 90 dias. Com isso feito, temos certeza que sua audiência vai atingir um tamanho muito maior do que é hoje.",
  subtitle:
    "Todo mês você recebe: ~30 conteúdos publicados (1 por dia), 2 diárias de gravação no estúdio e reunião quinzenal de acompanhamento. O que muda é o foco estratégico.",
  milestones: [
    {
      monthLabel: "01",
      phaseLabel: "Fase 1 · Aceleração",
      phase: 1 as const,
      title: "Fundação",
      items: [
        "Diagnóstico do perfil e da especialidade",
        "Consultoria de branding",
        "Sessão de fotos profissional",
        "Setup completo do perfil (bio, destaques, identidade visual)",
        "Definição da linha editorial",
        "Início da produção de conteúdo",
      ],
      tom: "Montamos toda a base. Você sai do mês 1 com o perfil pronto pra escalar.",
    },
    {
      monthLabel: "02-03",
      phaseLabel: "Fase 1 · Aceleração",
      phase: 1 as const,
      title: "Crescimento orgânico",
      items: [
        "Produção em ritmo total (1 conteúdo/dia)",
        "2 diárias de gravação/mês no estúdio",
        "Ajuste de estratégia com base em dados",
        "Dobrar o que funciona, cortar o que não funciona",
        "Construção de autoridade e reconhecimento",
      ],
      tom: "A máquina tá rodando. O perfil ganha tração e o público começa a reconhecer você.",
    },
    {
      monthLabel: "04-05",
      phaseLabel: "Fase 2 · Exponenciação",
      phase: 2 as const,
      title: "Tráfego pago + conversão",
      items: [
        "Tráfego pago estratégico (Meta Ads)",
        "Funil de conversão via stories e CTAs",
        "Sistema de agendamento direto pelo perfil",
        "Produção mensal contínua",
        "Reuniões quinzenais de performance",
      ],
      tom: "Agora o conteúdo orgânico é turbinado com tráfego pago. Pacientes começam a agendar direto.",
    },
    {
      monthLabel: "06",
      phaseLabel: "Fase 2 · Exponenciação",
      phase: 2 as const,
      title: "Autoridade consolidada",
      items: [
        "Episódio de podcast (posicionamento como referência)",
        "Escala total do funil",
        "Relatório completo de resultados",
        "Plano de continuidade pós-projeto",
      ],
      tom: "Você não é mais um perfil. É a referência da sua especialidade na sua região.",
    },
  ],
  deliverables: [
    "~30 conteúdos/mês",
    "2 diárias de gravação",
    "Reunião quinzenal",
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
