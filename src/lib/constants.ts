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
  notifications: [
    { src: "/images/notifications/notif-1.png", width: 800, height: 533 },
    { src: "/images/notifications/notif-2.png", width: 800, height: 533 },
    { src: "/images/notifications/notif-4.png", width: 800, height: 441 },
  ],
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
  title: "Sua jornada mês a mês",
  subtitle:
    "Todo mês: ~30 conteúdos publicados, 2 diárias de gravação no estúdio e reunião quinzenal.",
  milestones: [
    {
      monthLabel: "01",
      phaseLabel: "Fase 1",
      phase: 1 as const,
      title: "Fundação",
      summary: "Montamos toda a base do seu perfil profissional.",
      photoDescription:
        "FOTO: Reunião de diagnóstico, médico e equipe E21 planejando no estúdio",
      shortItems: [
        "Diagnóstico do perfil",
        "Consultoria de branding",
        "Sessão de fotos",
        "Setup do perfil",
        "Linha editorial",
        "Início da produção",
      ],
      detailItems: [
        "Diagnóstico completo do perfil e da especialidade: entendemos seu público, sua concorrência e seu diferencial.",
        "Consultoria de branding: definimos posicionamento, tom de voz e identidade.",
        "Sessão de fotos profissional: banco de imagens pessoal para usar em todo o conteúdo.",
        "Setup completo do perfil: bio, destaques, identidade visual alinhados.",
        "Definição da linha editorial: os pilares de conteúdo que vão sustentar sua autoridade.",
        "Início da produção de conteúdo: a máquina começa a rodar.",
      ],
      closing: "Você sai do mês 1 com o perfil pronto pra escalar.",
    },
    {
      monthLabel: "02-03",
      phaseLabel: "Fase 1",
      phase: 1 as const,
      title: "Crescimento",
      summary:
        "Produção diária e construção de autoridade na sua especialidade.",
      photoDescription:
        "FOTO: Gravação no estúdio, médico com microfone, câmera em primeiro plano",
      shortItems: [
        "Produção diária (1/dia)",
        "2 diárias de gravação/mês",
        "Ajuste com base em dados",
        "Construção de autoridade",
      ],
      detailItems: [
        "Produção em ritmo total: 1 conteúdo por dia, entre vídeos e carrosséis.",
        "2 diárias de gravação por mês no estúdio E21 com equipe completa.",
        "Ajuste de estratégia com base em dados reais de performance.",
        "Dobramos o que funciona, cortamos o que não funciona.",
        "Construção progressiva de autoridade e reconhecimento na sua especialidade.",
      ],
      closing: "O perfil ganha tração e o público começa a reconhecer você.",
    },
    {
      monthLabel: "04-05",
      phaseLabel: "Fase 2",
      phase: 2 as const,
      title: "Conversão",
      summary:
        "Tráfego pago turbina o orgânico e pacientes começam a agendar.",
      photoDescription:
        "FOTO: Tela de computador mostrando métricas / bastidor de edição com equipe",
      shortItems: [
        "Tráfego pago (Meta Ads)",
        "Funil de conversão",
        "Agendamento pelo perfil",
        "Produção contínua",
      ],
      detailItems: [
        "Tráfego pago estratégico via Meta Ads: seus conteúdos chegam a pacientes qualificados.",
        "Funil de conversão via stories e CTAs: cada conteúdo tem objetivo claro.",
        "Sistema de agendamento direto pelo perfil: o paciente te encontra e agenda sem fricção.",
        "Produção mensal contínua no mesmo ritmo.",
        "Reuniões quinzenais focadas em performance e otimização.",
      ],
      closing: "Pacientes começam a agendar direto pelo seu perfil.",
    },
    {
      monthLabel: "06",
      phaseLabel: "Fase 2",
      phase: 2 as const,
      title: "Autoridade",
      summary: "Você vira a referência da sua especialidade.",
      photoDescription:
        "FOTO: Médico gravando episódio de podcast no estúdio E21",
      shortItems: [
        "Episódio de podcast",
        "Escala total do funil",
        "Relatório de resultados",
        "Plano de continuidade",
      ],
      detailItems: [
        "Episódio de podcast: posicionamento definitivo como referência na sua especialidade.",
        "Escala total do funil: orgânico + pago funcionando em conjunto.",
        "Relatório completo de resultados: tudo o que foi construído em 6 meses, documentado.",
        "Plano de continuidade pós-projeto: você sabe exatamente como manter e crescer sozinho.",
      ],
      closing: "Você não é mais um perfil. É a referência da sua especialidade.",
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
