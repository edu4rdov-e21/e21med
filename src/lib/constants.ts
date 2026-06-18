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
  ctaLabel: "Entrar em contato",
  videoSrc: "/video/takes.mp4",
  notifications: [
    {
      sender: "Paciente Whatsapp 1",
      time: "agora",
      message:
        "Dra, gostaria de marcar uma consulta, me passa as informações?",
    },
    {
      sender: "Paciente Whatsapp 2",
      time: "agora",
      message: "Dr quanto custa a consulta?",
    },
  ],
} as const;

export const SOCIAL_PROOF = {
  label: "Quem confia no E21",
  clients: [
    { name: "Dr. André Moreira", src: "/images/clients/dr-andre-moreira.jpg" },
    { name: "Dra. Adriana Moser", src: "/images/clients/dra-adriana-moser.jpg" },
    { name: "Dra. Larissa Nunes", src: "/images/clients/dra-larissa-nunes.jpg" },
    { name: "Dr. Danilo Minari", src: "/images/clients/dr-danilo-minari.jpg" },
    { name: "Dra. Laura Oliveira", src: "/images/clients/dra-laura-oliveira.png" },
    { name: "Dra. Layla Jorge", src: "/images/clients/dra-layla-jorge.png" },
    { name: "Dr. Luan Ocanã", src: "/images/clients/dr-luan-ocana.jpg" },
    { name: "Dra. Rebeca Mendes", src: "/images/clients/dra-rebeca-mendes.png" },
    { name: "Dra. Sara Mendes", src: "/images/clients/dra-sara-mendes.jpg" },
    { name: "Dra. Stephanny Melo", src: "/images/clients/dra-stephanny-melo.jpg" },
    { name: "Clínica Haven", src: "/images/clients/clinica-haven.png" },
    { name: "Evento Mais Médicos", src: "/images/clients/mais-medicos.jpg" },
  ],
} as const;

export const NAV_V3 = {
  links: [
    { label: "Manifesto", href: "#manifesto" },
    { label: "Jornada", href: "#jornada" },
  ],
  cta: "Entrar em contato",
  ctaHref: "#agendar",
} as const;

export const STATS = {
  tag: "Em 2026",
  items: [
    { value: 1542, prefix: "", suffix: "", label: "vídeos entregues" },
    { value: 82, prefix: "", suffix: "", label: "gravações feitas" },
    { value: 5440000, prefix: "+", suffix: "", label: "views" },
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

export const LETTER = {
  label: "Para você",
  title: "Uma carta aberta a você, médico(a)",
  envelopeAddress: "Para: o(a) médico(a) que chegou até aqui",
  openCta: "Abrir a carta",
  greeting: "Para você,",
  paragraphs: [
    {
      text: "Você estudou anos pra saber o que sabe e pagou um preço que poucos pagariam.",
      emphasis: false,
    },
    {
      text: "Aprendeu a salvar, cuidar, e principalmente a ouvir. Hoje, o que te permite servir cada pessoa que entra no seu consultório foram as incontáveis horas abrindo mão de momentos importantes.",
      emphasis: false,
    },
    {
      text: "Você merece ser ouvido(a) e merece que as pessoas tenham acesso ao que você estudou. Merece atender pacientes que chegam até você sabendo o seu valor… e não brigando por preço, te comparando com outro profissional e te tratando como mais um na lista.",
      emphasis: false,
    },
    {
      text: "Você está servindo, está ajudando pessoas a viverem melhor e isso tem um peso que precisa chegar do outro lado.",
      emphasis: false,
    },
    {
      text: "O compromisso do E21 é construir essa audiência para você.",
      emphasis: true,
    },
    {
      text: "As estratégias são muitas, os caminhos variam mas a execução disso é nosso papel. No entanto, tem uma parte que ninguém faz no seu lugar: o compromisso com você mesmo.",
      emphasis: false,
    },
    {
      text: "Estar na câmera, compartilhar o que você sabe, dedicar tempo, energia e alma a se tornar a referência que você já é tecnicamente, mas que o mundo ainda não sabe que existe.",
      emphasis: false,
    },
    {
      text: "Sabemos que já te venderam a mentira de que dá pra ser reconhecido sem fazer nada, que com simples publicações feitas com Inteligência Artificial seus pacientes virão.",
      emphasis: false,
    },
    {
      text: "Não acreditamos nisso.",
      emphasis: true,
    },
    {
      text: "Acreditamos no trabalho sério, bem feito e consistente. Foi isso que te trouxe até aqui, não acredite que algo diferente vai te levar adiante.",
      emphasis: false,
    },
    {
      text: "Se você topa esse compromisso, a gente faz o resto. Venha fazer parte do nosso time.",
      emphasis: false,
    },
  ],
  signatureLabel: "Com respeito,",
  signatureName: "Eduardo",
  signatureRole: "Fundador do E21 Med",
} as const;

export const BACKSTAGE = {
  label: "Bastidores",
  caption: "Gravação em andamento no estúdio E21",
  specialtiesLabel: "Especialidades que já gravaram aqui",
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
      title: "Fundação",
      summary: "Montamos toda a base do seu perfil profissional.",
      photoDescription:
        "Bastidor de diagnóstico do Mês 1 no estúdio E21",
      videoSrc: "/video/jornada/mes1.mp4",
      videoPoster: "/video/jornada/mes1-poster.jpg",
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
      title: "Crescimento",
      summary:
        "Produção diária e construção de autoridade na sua especialidade.",
      photoDescription:
        "Bastidor de gravação no estúdio E21, Mês 2-3",
      videoSrc: "/video/jornada/mes2-3.mp4",
      videoPoster: "/video/jornada/mes2-3-poster.jpg",
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
      title: "Conversão",
      summary:
        "Tráfego pago turbina o orgânico e pacientes começam a agendar.",
      photoDescription:
        "Bastidor de tráfego e edição, Mês 4-5",
      videoSrc: "/video/jornada/mes4-5.mp4",
      videoPoster: "/video/jornada/mes4-5-poster.jpg",
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
      title: "Autoridade",
      summary: "Você vira a referência da sua especialidade.",
      photoDescription:
        "Bastidor de podcast no estúdio E21, Mês 6",
      videoSrc: "/video/jornada/mes6.mp4",
      videoPoster: "/video/jornada/mes6-poster.jpg",
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

export const SCENARIOS = {
  label: "Direto do estúdio",
  title: "Um estúdio, muitos cenários",
  subtitle:
    "Exemplos reais de vídeos gravados no estúdio do E21. Cada cenário foi pensado pra dar outra cara ao mesmo espaço.",
  items: [
    { src: "/video/cenarios/cenario-1.mp4", poster: "/video/cenarios/cenario-1-poster.jpg", label: "Cenário 01" },
    { src: "/video/cenarios/cenario-2.mp4", poster: "/video/cenarios/cenario-2-poster.jpg", label: "Cenário 02" },
    { src: "/video/cenarios/cenario-3.mp4", poster: "/video/cenarios/cenario-3-poster.jpg", label: "Cenário 03" },
    { src: "/video/cenarios/cenario-4.mp4", poster: "/video/cenarios/cenario-4-poster.jpg", label: "Cenário 04" },
    { src: "/video/cenarios/cenario-5.mp4", poster: "/video/cenarios/cenario-5-poster.jpg", label: "Cenário 05" },
    { src: "/video/cenarios/cenario-6.mp4", poster: "/video/cenarios/cenario-6-poster.jpg", label: "Cenário 06" },
    { src: "/video/cenarios/cenario-7.mp4", poster: "/video/cenarios/cenario-7-poster.jpg", label: "Cenário 07" },
  ],
} as const;

export const TESTIMONIALS = {
  title: "Quem já vive isso",
  subtitle: "São 55 avaliações no Google, 54 delas com 5 estrelas.",
  stats: {
    total: 55,
    ratingLabel: "5,0",
  },
  googleReviews: [
    {
      name: "Luciana Taynã Sanches",
      meta: "Avaliação no Google",
      text: "Estou produzindo fotos e vídeos profissionais para a minha empresa com a E21 Studio e a experiência tem sido excelente. A qualidade das entregas é visível em cada detalhe, e o atendimento da equipe: profissional, leve e muito atencioso, faz toda a diferença no processo. Recomendo demais!",
    },
    {
      name: "Carla Marcela Faedda",
      meta: "Local Guide · 149 avaliações",
      text: "Contratei a equipe do E21 Studio para divulgação da minha clínica. Fiquei muito satisfeita com o resultado e a rapidez nas edições. Profissionais excelentes!",
    },
    {
      name: "Newton",
      meta: "Avaliação no Google",
      text: "A minha experiência com a produtora 21 foi incrível. Com certeza recomendo. São profissionais de altíssimo gabarito. Atenciosos. Caprichosos. Criativos e conduzem tudo como o cliente pede. O resultado do meu vídeo foi incrível.",
    },
    {
      name: "Alice Copy",
      meta: "Avaliação no Google",
      text: "Com certeza são os melhores de Brasília! Fiquei impressionada com a excelência. Pra quem precisa de um Studio, super indico.",
    },
    {
      name: "Luciana Viana",
      meta: "Local Guide · 36 avaliações",
      text: "Equipe que promove com conteúdo e imagem sensacional.",
    },
  ],
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
    "Nossa equipe entra em contato em até 10 minutos por ligação pra marcar sua reunião de diagnóstico.",
  ctaLabel: "Entrar em contato",
  submitLabel: "Quero entrar em contato",
  successMessage:
    "Pedido recebido. Em até 10 minutos nossa equipe entra em contato por ligação pra marcar sua reunião de diagnóstico.",
  fields: [
    {
      name: "nome",
      label: "Nome completo",
      type: "text",
      required: true,
      autoComplete: "name",
      inputMode: "text" as const,
    },
    {
      name: "whatsapp",
      label: "WhatsApp",
      type: "tel",
      required: true,
      autoComplete: "tel",
      inputMode: "tel" as const,
    },
    {
      name: "especialidade",
      label: "Especialidade médica",
      type: "text",
      required: true,
      autoComplete: "organization-title",
      inputMode: "text" as const,
    },
    {
      name: "instagram",
      label: "@ do Instagram",
      type: "text",
      required: true,
      autoComplete: "username",
      inputMode: "text" as const,
    },
    {
      name: "faturamento",
      label: "Faturamento mensal médio da clínica",
      type: "select",
      required: true,
      autoComplete: "off",
      inputMode: "text" as const,
      placeholder: "Selecione uma faixa",
      options: [
        "Até R$ 50.000 por mês",
        "De R$ 50.000 a R$ 100.000",
        "De R$ 100.000 a R$ 250.000",
        "+ de R$ 250.000",
      ],
    },
  ],
} as const;

export const FOOTER = {
  brand: {
    name: "E21 MED",
    tagline: "Produtora de autoridade digital.",
    description:
      "O E21 Studio constrói audiências para profissionais que sabem que reconhecimento se conquista com trabalho sério e consistente.",
  },
  contact: {
    label: "Contato",
    items: [
      {
        label: "E-mail",
        href: "mailto:eduardo@e21studio.com",
        text: "eduardo@e21studio.com",
      },
      {
        label: "WhatsApp",
        href: "https://wa.me/5561998704135",
        text: "(61) 99870-4135",
      },
    ],
    address:
      "QS 1, Rua 210, Lote 14, Apt. 12, Areal (Águas Claras), Brasília/DF, 71.950-770",
  },
  institutional: {
    label: "Institucional",
    items: [
      { label: "Sobre o E21", href: "/" },
      { label: "Equipe", href: "/#equipe" },
      { label: "Trabalhe conosco", href: "mailto:eduardo@e21studio.com" },
    ],
  },
  legal: {
    label: "Legal",
    items: [
      { label: "Política de Privacidade", href: "/politica-de-privacidade" },
      { label: "Termos de Uso", href: "/termos-de-uso" },
      { label: "Política de Cookies", href: "/politica-de-cookies" },
      { label: "Termos de Contratação", href: "/termos-de-contratacao" },
      { label: "Meus dados (LGPD)", href: "/meus-dados" },
    ],
  },
  social: [
    {
      label: "Instagram",
      href: "https://instagram.com/e21.studio",
      icon: "instagram" as const,
    },
  ],
  copyright: "© 2026 E21 Studio Ltda · CNPJ 55.788.849/0001-63",
} as const;
