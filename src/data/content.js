/**
 * Site content and asset mapping for Hachlaf Akhawayne.
 *
 * Updated with AI-generated images and new Skanska-inspired sections.
 */

export const BRAND = {
  navy: '#143275',
  navyDeep: '#0d244f',
  cyan: '#00a3e0',
  orange: '#d4a373',
  orangeDark: '#b88655',
  dark: '#1a1a1a',
  muted: '#858585',
  light: '#f5f5f5',
  white: '#ffffff',
};

export const logoSrc = '/images/hachlaf_akhawayne_logo_v1-2048x1536.png';
export const heroImage = '/images/generated/hero_construction.jpg';

export const site = {
  fr: {
    nav: {
      links: [
        { label: 'Accueil', id: 'top' },
        { label: 'Domaines', id: 'domaines' },
        { label: 'Offres', id: 'offres' },
        { label: 'Références', id: 'projects' },
        { label: 'Contact', id: 'contact' },
      ],
      cta: 'Devis gratuit',
    },
    hero: {
      typingWords: ['Vous rêvez,', 'Nous construisons.'],
      subtitle: 'Votre partenaire de confiance pour tous vos travaux.',
      body: 'Spécialisés dans la construction, la rénovation et les travaux publics, nous transformons vos idées en réalisations concrètes grâce à notre expertise et notre engagement qualité.',
      ctaPrimary: 'Découvrir nos projets',
      ctaSecondary: 'Demander un devis',
      ctaSubcontractor: 'Devenir sous-traitant',
    },
    // ── Domaines d'activité ── premium stacked parallax sectors ──
    domaines: {
      eyebrow: 'NOS DOMAINES D\'ACTIVITÉ',
      title: 'Une expertise multi-sectorielle',
      items: [
        {
          number: '01',
          category: 'ÉNERGIE & ENVIRONNEMENT',
          title: 'Construire une énergie plus durable.',
          description:
            'Nous réalisons des infrastructures énergétiques et environnementales à grande échelle, des centrales et parcs solaires aux stations de dessalement, réseaux hydrauliques et ouvrages de retenue.',
          tags: ['Énergie', 'Eau & Environnement', 'Infrastructures durables'],
          detail: 'Projets à grande échelle',
          cta: 'Découvrir ce domaine',
          image: '/images/generated/solar_noor_midelt.jpg',
        },
        {
          number: '02',
          category: 'INDUSTRIE & INFRASTRUCTURE',
          title: 'Des infrastructures pensées pour durer.',
          description:
            'Nous accompagnons les projets industriels les plus exigeants, des complexes métallurgiques et phosphatiers aux routes, ports, plateformes industrielles et ouvrages civils stratégiques.',
          tags: ['Industrie', 'Infrastructure', 'Génie civil'],
          detail: 'Expertise multidisciplinaire',
          cta: 'Découvrir ce domaine',
          image: '/images/generated/metallurgy_mibladen.jpg',
        },
        {
          number: '03',
          category: 'ÉDUCATION & RÉSIDENTIEL',
          title: 'Créer des lieux qui façonnent l\'avenir.',
          description:
            'Nous concevons et réalisons des universités, résidences, bâtiments techniques et projets tertiaires de grande envergure, avec une attention particulière portée à la qualité, à l\'usage et à la durabilité.',
          tags: ['Éducation', 'Résidentiel', 'Bâtiments techniques'],
          detail: 'Conception & réalisation',
          cta: 'Découvrir ce domaine',
          image: '/images/generated/university_rabat.jpg',
        },
      ],
    },
    // ── Nos offres ──
    offres: {
      ctaLabel: "En savoir plus",
      eyebrow: 'NOS OFFRES',
      title: 'Des solutions complètes pour chaque projet',
      items: [
        {
          id: 'genie-civil',
          title: 'Génie Civil & Transports',
          desc: 'Construction d\'infrastructures, bâtiments techniques, ouvrages civils, plateformes industrielles.',
          image: '/images/generated/genie_civil.jpg',
          href: '#contact',
        },
        {
          id: 'terrassement',
          title: 'Terrassement',
          desc: 'Préparation des sols, fouilles, tranchées, remblais/déblais, nivellement et compactage.',
          image: '/images/generated/terrassement.jpg',
          href: '#contact',
        },
        {
          id: 'electricite',
          title: 'Électricité Industrielle',
          desc: 'Installation de réseaux électriques, tirage de câbles, pose d\'armoires et raccordements.',
          image: '/images/generated/electricite.jpg',
          href: '#contact',
        },
        {
          id: 'metallique',
          title: 'Charpente & Tuyauterie HP',
          desc: 'Fabrication, soudure et montage de structures métalliques et tuyauteries haute pression.',
          image: '/images/generated/charpente_tuyauterie.jpg',
          href: '#contact',
        },
        {
          id: 'location',
          title: 'Location d\'Engins',
          desc: 'Pelle hydraulique, chargeuse, bulldozer, niveleuse, compacteur, camion-benne, grue mobile.',
          image: '/images/generated/location_engins.jpg',
          href: '#contact',
        },
      ],
    },
    // ── Références / Projets ── (Skanska-style)
    projects: {
      eyebrow: 'EXPLOREZ NOS RÉFÉRENCES',
      title: 'Des projets d\'envergure à travers le Maroc',
      subtitle: 'Découvrez les grands chantiers énergétiques et d\'infrastructure que nous avons contribué à bâtir.',
      viewDetails: 'Découvrir nos références',
      closeLabel: 'Fermer',
      scopeLabel: 'Périmètre d\'intervention',
      items: [
        {
          title: 'Le complexe solaire NOOR',
          location: 'Midelt',
          type: 'SOLAIRE',
          image: '/images/generated/solar_noor_midelt.jpg',
          description:
            'Contribution au complexe solaire NOOR Midelt — terrassement, infrastructures et raccordements électriques sur un site énergétique stratégique.',
          scope: ['Préparation des sols', 'Ouvrages civils', 'Réseaux électriques', 'Support logistique'],
        },
        {
          title: 'Le parc éolien',
          location: 'Boujdour',
          type: 'ÉOLIEN',
          image: '/images/generated/wind_boujdour.jpg',
          description:
            'Parc éolien à Boujdour : terrassement, fondations et installation électrique dans un environnement côtier exigeant.',
          scope: ['Terrassement côtier', 'Fondations spéciales', 'Réseaux électriques', 'Logistique marine'],
        },
        {
          title: 'La centrale thermique',
          location: 'Safi',
          type: 'THERMIQUE',
          image: '/images/generated/thermal_safi.jpg',
          description:
            'Centrale thermique de Safi : génie civil, terrassement et installations électriques pour une infrastructure de production d\'énergie.',
          scope: ['Génie civil', 'Terrassement', 'Installations électriques', 'HSE'],
        },
        {
          title: 'STEP Abdelmoumen',
          location: 'Agadir',
          type: 'HYDRAULIQUE',
          image: '/images/generated/hydro_step.jpg',
          description:
            'Station de Transfert d\'Énergie Potentielle (STEP) Abdelmoumen près d\'Agadir : ouvrages civils, terrassement et réseaux électriques.',
          scope: ['Ouvrages civils', 'Terrassement', 'Réseaux électriques', 'Sécurité chantier'],
        },
        {
          title: 'Le projet phosphate',
          location: 'Jorf El Asfar',
          type: 'INDUSTRIEL',
          image: '/images/generated/phosphate_jorf.jpg',
          description:
            'Projet phosphate à Jorf El Asfar : infrastructures industrielles, génie civil et tuyauterie pour le complexe d\'engrais.',
          scope: ['Infrastructures industrielles', 'Génie civil', 'Tuyauterie HP', 'Logistique'],
        },
        {
          title: 'Station de dessalement',
          location: 'Casablanca',
          type: 'DESSALEMENT',
          image: '/images/generated/desalination_casa.jpg',
          description:
            'Station de dessalement à Casablanca : génie civil, terrassement et raccordements pour cette infrastructure hydraulique majeure.',
          scope: ['Génie civil', 'Terrassement', 'Raccordements', 'Sécurité'],
        },
        {
          title: 'Une usine métallurgique',
          location: 'Mibladen',
          type: 'MÉTALLURGIE',
          image: '/images/generated/metallurgy_mibladen.jpg',
          description:
            'Usine métallurgique de Mibladen : fabrication, soudure et montage de structures métalliques et de tuyauteries industrielles.',
          scope: ['Structures métalliques', 'Tuyauterie haute pression', 'Soudure et montage', 'Maintenance'],
        },
        {
          title: 'L\'Université Polytechnique',
          location: 'Rabat',
          type: 'ÉDUCATION',
          image: '/images/generated/university_rabat.jpg',
          description:
            'Université Polytechnique de Rabat : construction de bâtiments techniques et tertiaires, réseaux électriques et aménagements.',
          scope: ['Bâtiments techniques', 'Réseaux électriques', 'Aménagement', 'Coordination de chantier'],
        },
        {
          title: 'La Résidence Royale',
          location: 'Maroc',
          type: 'RÉSIDENTIEL',
          image: '/images/generated/royal_residence.jpg',
          description:
            'Résidence Royale : construction et finitions de haut niveau, charpente métallique et installations électriques aux normes.',
          scope: ['Gros œuvre et génie civil', 'Charpente métallique', 'Électricité et raccordements', 'Finitions premium'],
        },
      ],
    },
    // ── Stats ──
    stats: {
      eyebrow: 'CHIFFRES CLÉS',
      title: 'Un aperçu de notre entreprise',
      items: [
        { value: 35, suffix: '+', label: 'Années d\'expérience' },
        { value: 50, suffix: '+', label: 'Grands projets livrés' },
        { value: 200, suffix: '+', label: 'Employés & partenaires' },
        { value: 5, suffix: '', label: 'Domaines d\'expertise' },
      ],
    },
    // ── Partenaires ──
    partners: {
      eyebrow: 'ILS NOUS FONT CONFIANCE',
      title: 'Nos clients & partenaires',
      logos: [
        { name: 'ONEE', src: '/images/cmscompany_logo.jpeg' },
        { name: 'MASEN', src: '/images/acciona-300x300.png' },
        { name: 'OCP', src: '/images/epme.webp' },
        { name: 'ABDELMOUMEN', src: '/images/A-LA-UNE-Energie-electrique-la-STEP-Abdelmoumen-AP83-02-300x169.jpg' },
        { name: 'NOOR', src: '/images/noor_midelt_Maroc_Misterelec-300x200.webp' },
        { name: 'SAFI', src: '/images/centralesafi-126-300x200.jpg' },
        { name: 'JORF', src: '/images/Jorf_lasfar_3eme_usine_d_engrais_mise_en_service_2017-300x168.jpg' },
        { name: 'Hachlaf', src: '/images/hachlaf_akhawayne_logo_v1-2048x1536.png' },
      ],
    },
    // ── CTA ──
    cta: {
      title: 'Prêt à concrétiser votre projet ?',
      body: 'Contactez-nous dès aujourd\'hui pour un devis gratuit et personnalisé.',
      button: 'Contactez-nous',
      subcontractor: {
        label: 'Devenir sous-traitant',
        to: '/sous-traitant',
      },
    },
    // ── Contact form section ──
    contact: {
      eyebrow: 'CONTACTEZ-NOUS',
      title: 'Parlons de votre projet',
      subtitle: 'Envoyez-nous votre demande par WhatsApp ou par email.',
      nameLabel: 'Nom complet',
      companyLabel: 'Nom de l\'entreprise',
      messageLabel: 'Message / demande',
      whatsappButton: 'Envoyer par WhatsApp',
      emailButton: 'Envoyer par email',
      requiredError: 'Veuillez remplir tous les champs.',
      whatsappNumber: '212535360341',
      emailAddress: 'h.hamza@stehachlaf.com',
      emailSubject: 'Nouvelle demande depuis le site Hachlaf Akhawayne',
    },

    // ── Footer ──
    footer: {
      description: 'Hachlaf Akhawayne — Votre partenaire de confiance pour tous vos travaux de construction, génie civil et énergie au Maroc.',
      linksLabel: 'Navigation',
      links: [
        { label: 'Accueil', href: '#top' },
        { label: 'Domaines', href: '#domaines' },
        { label: 'Offres', href: '#offres' },
        { label: 'Références', href: '#projects' },
        { label: 'Devenir sous-traitant', to: '/sous-traitant' },
      ],
      contactLabel: 'Contact',
      contact: [
        { label: 'Siège social', value: '186, Hay Riad 2 — Midelt' },
        { label: 'Téléphone', value: '05 35 36 03 41' },
        { label: 'E-mail', value: 'h.hamza@stehachlaf.com' },
      ],
    },
    // ── Legacy (keep for reference) ──
    serviceCards: {
      eyebrow: 'NOS SERVICES',
      title: 'Expertise & savoir-faire',
      items: [],
    },
    services: {
      eyebrow: 'NOS SERVICES',
      title: 'Expertise & savoir-faire au service de vos projets',
      intro: '',
      items: [],
    },
  },

  // ── English ──
  en: {
    nav: {
      links: [
        { label: 'Home', id: 'top' },
        { label: 'Domains', id: 'domaines' },
        { label: 'Offerings', id: 'offres' },
        { label: 'References', id: 'projects' },
        { label: 'Contact', id: 'contact' },
      ],
      cta: 'Free quote',
    },
    hero: {
      typingWords: ['You Dream it,', 'We Build it.'],
      subtitle: 'Your trusted partner for every construction need.',
      body: 'Specialized in construction, renovation, and public works, we turn your ideas into concrete achievements through expertise and a commitment to quality.',
      ctaPrimary: 'Discover our projects',
      ctaSecondary: 'Request a quote',
      ctaSubcontractor: 'Become a subcontractor',
    },
    domaines: {
      eyebrow: 'OUR AREAS OF EXPERTISE',
      title: 'Multi-sector expertise',
      items: [
        {
          number: '01',
          category: 'ENERGY & ENVIRONMENT',
          title: 'Building more sustainable energy.',
          description:
            'We deliver large-scale energy and environmental infrastructure, from power and solar plants to desalination stations, hydraulic networks and retention structures.',
          tags: ['Energy', 'Water & Environment', 'Sustainable infrastructure'],
          detail: 'Large-scale projects',
          cta: 'Discover this field',
          image: '/images/generated/solar_noor_midelt.jpg',
        },
        {
          number: '02',
          category: 'INDUSTRY & INFRASTRUCTURE',
          title: 'Infrastructure built to last.',
          description:
            'We support the most demanding industrial projects, from metallurgical and phosphate complexes to roads, ports, industrial platforms and strategic civil works.',
          tags: ['Industry', 'Infrastructure', 'Civil engineering'],
          detail: 'Multidisciplinary expertise',
          cta: 'Discover this field',
          image: '/images/generated/metallurgy_mibladen.jpg',
        },
        {
          number: '03',
          category: 'EDUCATION & RESIDENTIAL',
          title: 'Creating places that shape the future.',
          description:
            'We design and deliver universities, residences, technical buildings and large-scale tertiary projects, with particular attention to quality, usage and sustainability.',
          tags: ['Education', 'Residential', 'Technical buildings'],
          detail: 'Design & build',
          cta: 'Discover this field',
          image: '/images/generated/university_rabat.jpg',
        },
      ],
    },
    offres: {
      ctaLabel: "Learn more",
      eyebrow: 'OUR OFFERINGS',
      title: 'Complete solutions for every project',
      items: [
        {
          id: 'civil-engineering',
          title: 'Civil Engineering & Transport',
          desc: 'Infrastructure construction, technical buildings, civil works, industrial platforms.',
          image: '/images/generated/genie_civil.jpg',
          href: '#contact',
        },
        {
          id: 'earthworks',
          title: 'Earthworks',
          desc: 'Soil preparation, excavations, trenches, backfill/cut, grading and compaction.',
          image: '/images/generated/terrassement.jpg',
          href: '#contact',
        },
        {
          id: 'electrical',
          title: 'Industrial Electricity',
          desc: 'Electrical network installation, cable pulling, cabinet setup and connections.',
          image: '/images/generated/electricite.jpg',
          href: '#contact',
        },
        {
          id: 'steel-piping',
          title: 'Steel & HP Piping',
          desc: 'Fabrication, welding and assembly of steel structures and high-pressure piping.',
          image: '/images/generated/charpente_tuyauterie.jpg',
          href: '#contact',
        },
        {
          id: 'rental',
          title: 'Equipment Rental',
          desc: 'Hydraulic excavator, loader, bulldozer, grader, compactor, dump truck, mobile crane.',
          image: '/images/generated/location_engins.jpg',
          href: '#contact',
        },
      ],
    },
    projects: {
      eyebrow: 'EXPLORE OUR REFERENCES',
      title: 'Major projects across Morocco',
      subtitle: 'Discover the large-scale energy and infrastructure projects we have helped build.',
      viewDetails: 'Discover our references',
      closeLabel: 'Close',
      scopeLabel: 'Scope of work',
      items: [
        {
          title: 'NOOR Solar Complex',
          location: 'Midelt',
          type: 'SOLAR',
          image: '/images/generated/solar_noor_midelt.jpg',
          description: 'Contribution to the NOOR Midelt solar complex — earthworks, infrastructure and electrical connections on a strategic energy site.',
          scope: ['Soil preparation', 'Civil works', 'Electrical networks', 'Logistics support'],
        },
        {
          title: 'Wind Farm',
          location: 'Boujdour',
          type: 'WIND',
          image: '/images/generated/wind_boujdour.jpg',
          description: 'Boujdour wind farm: earthworks, foundations and electrical installation in a demanding coastal environment.',
          scope: ['Coastal earthworks', 'Special foundations', 'Electrical networks', 'Marine logistics'],
        },
        {
          title: 'Thermal Power Plant',
          location: 'Safi',
          type: 'THERMAL',
          image: '/images/generated/thermal_safi.jpg',
          description: 'Safi thermal power plant: civil engineering, earthworks and electrical installations for energy production infrastructure.',
          scope: ['Civil engineering', 'Earthworks', 'Electrical installations', 'HSE'],
        },
        {
          title: 'STEP Abdelmoumen',
          location: 'Agadir',
          type: 'HYDRO',
          image: '/images/generated/hydro_step.jpg',
          description: 'Pumped Storage Power Station Abdelmoumen near Agadir: civil works, earthworks and electrical networks.',
          scope: ['Civil works', 'Earthworks', 'Electrical networks', 'Site safety'],
        },
        {
          title: 'Phosphate Project',
          location: 'Jorf El Asfar',
          type: 'INDUSTRIAL',
          image: '/images/generated/phosphate_jorf.jpg',
          description: 'Phosphate project at Jorf El Asfar: industrial infrastructure, civil engineering and piping for the fertilizer complex.',
          scope: ['Industrial infrastructure', 'Civil engineering', 'HP piping', 'Logistics'],
        },
        {
          title: 'Desalination Station',
          location: 'Casablanca',
          type: 'DESALINATION',
          image: '/images/generated/desalination_casa.jpg',
          description: 'Desalination station in Casablanca: civil engineering, earthworks and connections for this major hydraulic infrastructure.',
          scope: ['Civil engineering', 'Earthworks', 'Connections', 'Safety'],
        },
        {
          title: 'Metallurgical Plant',
          location: 'Mibladen',
          type: 'METALLURGY',
          image: '/images/generated/metallurgy_mibladen.jpg',
          description: 'Mibladen metallurgical plant: fabrication, welding and assembly of steel structures and industrial piping.',
          scope: ['Steel structures', 'HP piping', 'Welding & assembly', 'Maintenance'],
        },
        {
          title: 'Polytechnic University',
          location: 'Rabat',
          type: 'EDUCATION',
          image: '/images/generated/university_rabat.jpg',
          description: 'Rabat Polytechnic University: construction of technical and tertiary buildings, electrical networks and site development.',
          scope: ['Technical buildings', 'Electrical networks', 'Development', 'Site coordination'],
        },
        {
          title: 'Royal Residence',
          location: 'Morocco',
          type: 'RESIDENTIAL',
          image: '/images/generated/royal_residence.jpg',
          description: 'Royal Residence: high-end construction and finishes, steel framework and electrical installations to standards.',
          scope: ['Structural works', 'Steel framework', 'Electricity', 'Premium finishes'],
        },
      ],
    },
    stats: {
      eyebrow: 'KEY FIGURES',
      title: 'A snapshot of our business',
      items: [
        { value: 35, suffix: '+', label: 'Years of experience' },
        { value: 50, suffix: '+', label: 'Major projects delivered' },
        { value: 200, suffix: '+', label: 'Employees & partners' },
        { value: 5, suffix: '', label: 'Areas of expertise' },
      ],
    },
    partners: {
      eyebrow: 'THEY TRUST US',
      title: 'Our clients & partners',
      logos: [
        { name: 'ONEE', src: '/images/cmscompany_logo.jpeg' },
        { name: 'MASEN', src: '/images/acciona-300x300.png' },
        { name: 'OCP', src: '/images/epme.webp' },
        { name: 'ABDELMOUMEN', src: '/images/A-LA-UNE-Energie-electrique-la-STEP-Abdelmoumen-AP83-02-300x169.jpg' },
        { name: 'NOOR', src: '/images/noor_midelt_Maroc_Misterelec-300x200.webp' },
        { name: 'SAFI', src: '/images/centralesafi-126-300x200.jpg' },
        { name: 'JORF', src: '/images/Jorf_lasfar_3eme_usine_d_engrais_mise_en_service_2017-300x168.jpg' },
        { name: 'Hachlaf', src: '/images/hachlaf_akhawayne_logo_v1-2048x1536.png' },
      ],
    },
    cta: {
      title: 'Ready to make your project a reality?',
      body: 'Contact us today for a free personalized quote.',
      button: 'Contact us',
      subcontractor: {
        label: 'Become a subcontractor',
        to: '/sous-traitant',
      },
    },
    contact: {
      eyebrow: 'CONTACT US',
      title: "Let's talk about your project",
      subtitle: 'Send us your request via WhatsApp or email.',
      nameLabel: 'Full name',
      companyLabel: 'Company name',
      messageLabel: 'Message / request',
      whatsappButton: 'Send via WhatsApp',
      emailButton: 'Send via email',
      requiredError: 'Please fill in all fields.',
      whatsappNumber: '212535360341',
      emailAddress: 'h.hamza@stehachlaf.com',
      emailSubject: 'New inquiry from the Hachlaf Akhawayne website',
    },

    footer: {
      description: 'Hachlaf Akhawayne — Your trusted partner for all your construction, civil engineering and energy projects in Morocco.',
      linksLabel: 'Navigation',
      links: [
        { label: 'Home', href: '#top' },
        { label: 'Domains', href: '#domaines' },
        { label: 'Offerings', href: '#offres' },
        { label: 'References', href: '#projects' },
        { label: 'Become a subcontractor', to: '/sous-traitant' },
      ],
      contactLabel: 'Contact',
      contact: [
        { label: 'Headquarters', value: '186, Hay Riad 2 — Midelt' },
        { label: 'Phone', value: '05 35 36 03 41' },
        { label: 'Email', value: 'h.hamza@stehachlaf.com' },
      ],
    },
    serviceCards: { eyebrow: '', title: '', items: [] },
    services: { eyebrow: '', title: '', intro: '', items: [] },
  },
};
