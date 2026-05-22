export default function SchemaMarkup() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://e21med.com/#organization",
    name: "E21 Studio",
    alternateName: "E21 MED",
    legalName: "E21 STUDIO LTDA",
    taxID: "55.788.849/0001-63",
    description:
      "Produtora de conteúdo audiovisual especializada em construção de autoridade digital para médicos. Estúdio próprio em Brasília, equipe dedicada, programa de 6 meses que combina posicionamento, produção de conteúdo e tráfego pago.",
    url: "https://e21med.com",
    telephone: "+5561998704135",
    email: "eduardo@e21studio.com",
    logo: {
      "@type": "ImageObject",
      url: "https://e21med.com/logos/e21-med.svg",
    },
    image: "https://e21med.com/og-image.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "QS 1, Rua 210, Lote 14, Apartamento 12, Areal",
      addressLocality: "Brasília",
      addressRegion: "DF",
      postalCode: "71950770",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -15.834,
      longitude: -48.02,
    },
    areaServed: [
      { "@type": "City", name: "Brasília" },
      { "@type": "State", name: "Distrito Federal" },
      { "@type": "Country", name: "Brasil" },
    ],
    priceRange: "R$ 15.000 - R$ 30.000",
    foundingDate: "2024",
    founders: [
      { "@type": "Person", name: "Eduardo Vinícius" },
      { "@type": "Person", name: "Victor" },
    ],
    sameAs: ["https://instagram.com/e21.studio"],
    knowsAbout: [
      "Marketing médico",
      "Construção de audiência digital",
      "Produção audiovisual",
      "Branding pessoal",
      "Estratégia de conteúdo",
      "Tráfego pago",
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://e21med.com/#service",
    name: "E21 MED",
    serviceType: "Construção de autoridade digital para médicos",
    description:
      "Programa de 6 meses dividido em duas fases: Aceleração (90 dias) com fundação completa do perfil e produção mensal de conteúdo, e Exponenciação (90 dias) com tráfego pago, funil de conversão e podcast.",
    provider: { "@id": "https://e21med.com/#organization" },
    areaServed: { "@type": "Country", name: "Brasil" },
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Médicos",
    },
    offers: [
      {
        "@type": "Offer",
        name: "E21 MED, Aceleração",
        description:
          "3 meses focados na fundação. Inclui consultoria de branding, sessão de fotos, posicionamento, identidade visual, roteiros, gravação e edição mensal.",
        price: "15000",
        priceCurrency: "BRL",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "15000",
          priceCurrency: "BRL",
          description:
            "À vista. Parcelado: R$ 6.000 entrada + 3x R$ 4.000 = R$ 18.000",
        },
      },
      {
        "@type": "Offer",
        name: "E21 MED, Jornada Completa",
        description:
          "6 meses completos. Inclui fundação e escalonamento com tráfego pago, funil de conversão e episódio de podcast.",
        price: "25000",
        priceCurrency: "BRL",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "25000",
          priceCurrency: "BRL",
          description:
            "À vista. Parcelado: R$ 6.000 entrada + 6x R$ 4.000 = R$ 30.000",
        },
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://e21med.com/#website",
    url: "https://e21med.com",
    name: "E21 MED",
    description: "Construção de autoridade digital para médicos",
    publisher: { "@id": "https://e21med.com/#organization" },
    inLanguage: "pt-BR",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
