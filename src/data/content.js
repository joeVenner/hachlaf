/**
 * Site content and asset mapping for Hachlaf Akhawayne.
 *
 * All image paths point to the downloaded assets in /public/images/.
 * Source: stehachlaf_extracted_content.md + skanska_analysis_report.md
 */

export const BRAND = {
  navy: '#143275',
  navyDeep: '#0d244f',
  cyan: '#00a3e0',
  orange: '#e67e22',
  orangeDark: '#d35400',
  dark: '#1a1a1a',
  muted: '#858585',
  light: '#f5f5f5',
  white: '#ffffff',
};

export const site = {
  fr: {
    nav: {
      links: [
        { label: 'Accueil', id: 'top' },
        { label: 'Services', id: 'services' },
        { label: 'Références', id: 'projects' },
        { label: 'À Propos', id: 'about' },
        { label: 'Contact', id: 'contact' },
      ],
      cta: 'Devis gratuit',
    },
    hero: {
      title: 'HACHLAF AKHAWAYNE',
      subtitle: 'Votre partenaire de confiance pour tous vos travaux.',
      body: 'Spécialisés dans la construction, la rénovation et les travaux publics, nous transformons vos idées en réalisations concrètes grâce à notre expertise et notre engagement qualité.',
      ctaPrimary: 'Découvrir nos projets',
      ctaSecondary: 'Demander un devis',
    },
    services: {
      eyebrow: 'NOS SERVICES',
      title: "Expertise & savoir-faire au service de vos projets",
      intro:
        'Nous accompagnons particuliers, entreprises et promoteurs dans la réalisation de projets résidentiels, commerciaux et industriels grâce à une expertise reconnue et des standards de qualité élevés.',
      items: [
        {
          id: 'genie-civil',
          title: 'Travaux de génie civil & transports',
          shortDesc:
            "Construction d'infrastructures, bâtiments techniques, ouvrages civils, plateformes industrielles, routes et accès de chantiers.",
          fullDesc:
            "Notre entreprise intervient dans la réalisation de projets de génie civil et d'infrastructures de transport, en apportant des solutions techniques fiables et durables. Nous assurons la construction, l'aménagement, la réhabilitation et l'entretien d'ouvrages destinés aux secteurs public et privé.",
          image: '/images/Genie-civil_bk.png',
        },
        {
          id: 'terrassement',
          title: 'Travaux de terrassement',
          shortDesc:
            'Préparation des sols, fouilles, tranchées, remblais/déblais, nivellement et compactage pour sites industriels et énergétiques.',
          fullDesc:
            'Nous réalisons l\'ensemble des travaux de terrassement nécessaires à la préparation des terrains avant toute construction ou aménagement. Nos équipes assurent les opérations de déblaiement, remblaiement, nivellement, excavation et préparation des plateformes avec précision et efficacité.',
          image: '/images/2149194826.jpg',
        },
        {
          id: 'electricite',
          title: "Travaux d'électricité",
          shortDesc:
            'Installation complète de réseaux électriques, tirage de câbles, pose d\'armoires et raccordements sur sites industriels.',
          fullDesc:
            "Nous proposons des prestations complètes dans le domaine de l'électricité pour les bâtiments résidentiels, tertiaires, industriels et les infrastructures. Nos équipes prennent en charge l'étude, l'installation, la mise en service et la maintenance des équipements électriques.",
          image: '/images/images.jpeg',
        },
        {
          id: 'metallique',
          title: 'Construction métallique & tuyauterie HP',
          shortDesc:
            'Fabrication, soudure et montage de structures métalliques et de tuyauteries haute pression selon les standards de sécurité.',
          fullDesc:
            'Nous sommes spécialisés dans la fabrication, le montage et la maintenance de structures métalliques ainsi que dans l\'installation de réseaux de tuyauterie haute pression destinés aux secteurs industriels et énergétiques.',
          image: '/images/images-1.jpeg',
        },
        {
          id: 'location',
          title: 'Location des engins & camions',
          shortDesc:
            'Pelle hydraulique, mini-pelle, chargeuse, tractopelle, bulldozer, niveleuse, compacteur, camion benne, camion citerne, grue mobile, nacelle, manitou et plus.',
          fullDesc:
            'Afin de répondre aux besoins de nos clients, nous mettons à disposition une large gamme d\'engins de chantier, d\'équipements de manutention et de camions adaptés à tous types de travaux. Notre flotte régulièrement entretenue permet d\'assurer des prestations fiables et performantes.',
          image: '/images/Services-location-des-engins-de-travail-vehicules-de-services-et-transport-personnel.jpg',
        },
      ],
    },
    stats: {
      eyebrow: 'CHIFFRES CLÉS',
      title: 'Un aperçu de notre entreprise',
      items: [
        { value: 10, suffix: '+', label: 'Projets' },
        { value: 12, suffix: '+', label: 'Clients' },
        { value: 20, suffix: '+', label: "Années d'expérience" },
        { value: 50, suffix: '+', label: 'Équipe' },
      ],
    },
    projects: {
      eyebrow: 'NOS RÉFÉRENCES',
      title: 'Explorez nos références',
      subtitle:
        "Découvrez les grands chantiers énergétiques et d'infrastructure que nous avons contribué à bâtir à travers le Maroc.",
      viewDetails: 'Voir les détails',
      scopeLabel: 'Missions réalisées',
      closeLabel: 'Fermer',
      items: [
        {
          title: 'Le parc éolien',
          location: 'Midelt',
          type: 'Éolien',
          image: '/images/espagnols-projet-eolien-maroc-48b99.webp',
          description:
            "Parc éolien d'envergure à Midelt intégrant la préparation des sols, le génie civil des fondations et l'installation des réseaux électriques de raccordement.",
          scope: ['Terrassement et plateformes', 'Fondations de génie civil', 'Tirage de câbles et raccordements', 'Coordination HSE'],
        },
        {
          title: 'Le complexe solaire NOOR',
          location: 'Midelt',
          type: 'Solaire',
          image: '/images/noor_midelt_Maroc_Misterelec.webp',
          description:
            'Contribution au complexe solaire NOOR Midelt — terrassement, infrastructures et raccordements électriques sur un site énergétique stratégique.',
          scope: ['Préparation des sols', 'Ouvrages civils', 'Réseaux électriques', 'Support logistique'],
        },
        {
          title: 'Le parc éolien',
          location: 'Boujdour',
          type: 'Éolien',
          image: '/images/boujdour-eolien.jpg',
          description:
            "Parc éolien à Boujdour : terrassement, fondations et installation électrique dans un environnement côtier exigeant.",
          scope: ['Terrassement côtier', 'Fondations spéciales', 'Réseaux électriques', 'Logistique marine'],
        },
        {
          title: 'La Résidence Royale',
          location: 'Maroc',
          type: 'Résidentiel',
          image: '/images/person-using-magnifyer.jpg',
          description:
            'Résidence Royale : construction et finitions de haut niveau, charpente métallique et installations électriques aux normes.',
          scope: ['Gros œuvre et génie civil', 'Charpente métallique', 'Électricité et raccordements', 'Finitions premium'],
        },
        {
          title: "L'Université Polytechnique",
          location: 'Rabat',
          type: 'Éducation',
          image: '/images/WhatsApp-Image-2026-06-23-at-01.55.57-scaled.jpeg',
          description:
            'Université Polytechnique de Rabat : construction de bâtiments techniques et tertiaires, réseaux électriques et aménagements.',
          scope: ['Bâtiments techniques', 'Réseaux électriques', 'Aménagement', 'Coordination de chantier'],
        },
        {
          title: 'Une usine métallurgique',
          location: 'Mibladen',
          type: 'Métallurgie',
          image: '/images/2381020b17bf66f53bcf4266667186fb.webp',
          description:
            "Usine métallurgique de Mibladen : fabrication, soudure et montage de structures métalliques et de tuyauteries industrielles.",
          scope: ['Structures métalliques', 'Tuyauterie haute pression', 'Soudure et montage', 'Maintenance'],
        },
        {
          title: 'La centrale thermique',
          location: 'Safi',
          type: 'Thermique',
          image: '/images/centralesafi-126-scaled.jpg',
          description:
            "Centrale thermique de Safi : génie civil, terrassement et installations électriques pour une infrastructure de production d'énergie.",
          scope: ['Génie civil', 'Terrassement', 'Installations électriques', 'HSE'],
        },
        {
          title: 'STEP Abdelmoumen',
          location: 'Agadir',
          type: 'Hydraulique',
          image: '/images/A-LA-UNE-Energie-electrique-la-STEP-Abdelmoumen-AP83-02.jpg',
          description:
            "Station de Transfert d'Énergie Potentielle (STEP) Abdelmoumen près d'Agadir : ouvrages civils, terrassement et réseaux électriques.",
          scope: ['Ouvrages civils', 'Terrassement', 'Réseaux électriques', 'Sécurité chantier'],
        },
        {
          title: 'Le projet phosphate',
          location: 'Jorf El Asfar',
          type: 'Industriel',
          image: '/images/Jorf_lasfar_3eme_usine_d_engrais_mise_en_service_2017.jpg',
          description:
            "Projet phosphate à Jorf El Asfar : infrastructures industrielles, génie civil et tuyauterie pour le complexe d'engrais.",
          scope: ['Infrastructures industrielles', 'Génie civil', 'Tuyauterie HP', 'Logistique'],
        },
        {
          title: 'Station de dessalement',
          location: 'Casablanca',
          type: 'Dessalement',
          image: '/images/WhatsApp-Image-2026-06-22-at-21.27.06.jpeg',
          description:
            "Station de dessalement à Casablanca : génie civil, terrassement et raccordements électriques pour l'infrastructure de l'eau.",
          scope: ['Génie civil', 'Terrassement', 'Raccordements électriques', 'Mise en service'],
        },
      ],
    },
    serviceCards: {
      eyebrow: 'DOMAINES D\'ACTIVITÉ',
      title: "Nos domaines d'activité",
      items: [
        { title: 'Génie Civil & Transports', image: '/images/Genie-civil_bk.png', href: '#services' },
        { title: 'Terrassement', image: '/images/2149194826.jpg', href: '#services' },
        { title: "Électricité Industrielle", image: '/images/images.jpeg', href: '#services' },
        { title: 'Charpente & Tuyauterie HP', image: '/images/images-1.jpeg', href: '#services' },
        { title: 'Location de Matériel', image: '/images/Services-location-des-engins-de-travail-vehicules-de-services-et-transport-personnel.jpg', href: '#services' },
      ],
    },
    partners: {
      eyebrow: 'NOS RÉFÉRENCES',
      title: 'Ils nous font confiance',
      logos: [
        { name: 'LPEE', src: '/images/lpee-laboratoire-public-dessais-et-detudes.jpg' },
        { name: 'ACCIONA', src: '/images/acciona.png' },
        { name: 'EPME', src: '/images/epme.webp' },
        { name: 'Group-16103', src: '/images/Group-16103.png' },
        { name: 'NSM', src: '/images/nsm.webp' },
        { name: 'Calque55', src: '/images/Calque55.webp' },
        { name: 'CMS Company', src: '/images/cmscompany_logo.jpeg' },
        { name: 'SOGEA Maroc', src: '/images/sogea_maroc_logo.jpeg' },
        { name: 'Images-1', src: '/images/images-1.png' },
        { name: 'Unnamed', src: '/images/unnamed.jpg' },
        { name: '1630578323178', src: '/images/1630578323178.jpeg' },
        { name: 'Noukatel', src: '/images/noukatel_logo.jpeg' },
      ],
    },
    about: {
      eyebrow: 'À PROPOS DE NOUS',
      title: 'Construire avec Excellence et Fiabilité',
      body: [
        'HACHLAF AKHAWAYNE Travaux Divers a déjà participé à plusieurs projets d\'envergure au Maroc, notamment des projets à cadence accélérée, ce qui lui a permis de développer une forte capacité de mobilisation, de coordination et d\'exécution sur le terrain.',
        'Reconnue pour son sérieux, sa réactivité et sa bonne réputation, l\'entreprise s\'appuie sur un réseau fiable de partenaires, de ressources qualifiées et d\'ingénieurs expérimentés.',
        "L'entreprise accorde également une grande importance aux exigences HSE — Hygiène, Sécurité et Environnement — en veillant au respect des procédures de sécurité sur les chantiers et à l'exécution des travaux conformément aux normes requises, dans un cadre organisé, sécurisé et professionnel.",
      ],
      cta: 'En savoir plus',
      image: '/images/WhatsApp-Image-2026-06-14-at-14.05.29.jpeg',
      values: [
        { title: 'Respect des délais', desc: 'Une livraison dans les temps sur chaque chantier, du génie civil aux sites énergétiques.' },
        { title: 'Équipe qualifiée', desc: 'Ingénieurs, techniciens et professionnels confirmés au cœur de notre exécution.' },
        { title: 'Qualité & Sécurité (HSE)', desc: 'Des normes tenues aux exigences d\'hygiène, de sécurité et d\'environnement les plus strictes.' },
        { title: 'Emploi local', desc: 'La majorité de nos collaborateurs sont originaires de la région de Midelt.' },
      ],
    },
    cta: {
      title: 'Prêt à concrétiser votre projet ?',
      body: 'Notre équipe vous accompagne à chaque étape pour transformer vos idées en réalisations durables et de qualité.',
      button: 'Contactez-nous',
    },
    contact: {
      title: 'Contact & Informations',
      items: [
        { label: 'Siège social', value: '186, Hay Riad 2 — Midelt' },
        { label: 'Dépôt', value: 'Route de Meknès, RN13 — Midelt' },
        { label: 'Téléphone', value: '05 35 36 03 41' },
        { label: 'Email', value: 'h.hamza@stehachlaf.com' },
      ],
    },
    footer: {
      description:
        'Basés à Midelt, nous sommes HACHLAF AKHAWAYNE Travaux Divers, une entreprise marocaine spécialisée en génie civil, terrassement, électricité industrielle, construction métallique et tuyauterie haute pression.',
      links: [
        { label: 'Accueil', href: '#top' },
        { label: 'Services', href: '#services' },
        { label: 'Références', href: '#projects' },
        { label: 'À Propos', href: '#about' },
        { label: 'Contact', href: '#contact' },
      ],
      contact: [
        { label: 'Siège', value: '186, Hay Riad 2 — Midelt' },
        { label: 'Tél.', value: '05 35 36 03 41' },
        { label: 'E-mail', value: 'h.hamza@stehachlaf.com' },
      ],
      legal: 'Copyright @ 2026 , All Right Reserved.',
    },
  },

  en: {
    nav: {
      links: [
        { label: 'Home', id: 'top' },
        { label: 'Services', id: 'services' },
        { label: 'References', id: 'projects' },
        { label: 'About', id: 'about' },
        { label: 'Contact', id: 'contact' },
      ],
      cta: 'Free quote',
    },
    hero: {
      title: 'HACHLAF AKHAWAYNE',
      subtitle: 'Your trusted partner for every construction need.',
      body: 'Specialized in construction, renovation, and public works, we turn your ideas into concrete achievements through expertise and a commitment to quality.',
      ctaPrimary: 'Discover our projects',
      ctaSecondary: 'Request a quote',
    },
    services: {
      eyebrow: 'OUR SERVICES',
      title: 'Expertise & know-how for your projects',
      intro:
        'We support individuals, companies, and developers in the realization of residential, commercial, and industrial projects through recognized expertise and high quality standards.',
      items: [
        {
          id: 'civil-engineering',
          title: 'Civil Engineering & Transport',
          shortDesc:
            'Construction of infrastructures, technical buildings, civil works, industrial platforms, roads and site access.',
          fullDesc:
            'Our company carries out civil engineering and transport infrastructure projects, providing reliable and sustainable technical solutions. We handle construction, development, rehabilitation, and maintenance of structures for public and private sectors.',
          image: '/images/Genie-civil_bk.png',
        },
        {
          id: 'earthworks',
          title: 'Earthworks',
          shortDesc:
            'Soil preparation, excavations, trenches, backfill/cut, grading and compaction for industrial and energy sites.',
          fullDesc:
            'We carry out all earthworks required to prepare land before any construction or development. Our teams perform cut-and-fill, grading, excavation, and platform preparation with precision and efficiency.',
          image: '/images/2149194826.jpg',
        },
        {
          id: 'electrical',
          title: 'Electrical Works',
          shortDesc:
            'Complete installation of electrical networks, cable pulling, cabinet installation and connections on industrial sites.',
          fullDesc:
            'We offer comprehensive electrical services for residential, tertiary, industrial buildings, and infrastructure. Our teams handle study, installation, commissioning, and maintenance of electrical equipment.',
          image: '/images/images.jpeg',
        },
        {
          id: 'steel-piping',
          title: 'Steel Construction & HP Piping',
          shortDesc:
            'Fabrication, welding and assembly of steel structures and high-pressure piping according to safety standards.',
          fullDesc:
            'We specialize in the fabrication, assembly, and maintenance of steel structures as well as the installation of high-pressure piping networks for industrial and energy sectors.',
          image: '/images/images-1.jpeg',
        },
        {
          id: 'rental',
          title: 'Equipment & Truck Rental',
          shortDesc:
            'Hydraulic excavator, mini-excavator, wheel loader, backhoe, bulldozer, grader, compactor, dump truck, tanker, mobile crane, aerial platform, telehandler, forklift, paver, roller, tractor with blade, generator, air compressor.',
          fullDesc:
            'To meet client needs, we provide a wide range of construction equipment, handling machinery, and trucks adapted to all types of work. Our regularly maintained fleet ensures reliable, high-performance service on every site.',
          image: '/images/Services-location-des-engins-de-travail-vehicules-de-services-et-transport-personnel.jpg',
        },
      ],
    },
    stats: {
      eyebrow: 'KEY FIGURES',
      title: 'A snapshot of our business',
      items: [
        { value: 10, suffix: '+', label: 'Projects' },
        { value: 12, suffix: '+', label: 'Clients' },
        { value: 20, suffix: '+', label: 'Years of Experience' },
        { value: 50, suffix: '+', label: 'Team' },
      ],
    },
    projects: {
      eyebrow: 'OUR REFERENCES',
      title: 'Explore our references',
      subtitle:
        'Discover the major energy and infrastructure sites we helped build across Morocco.',
      viewDetails: 'View details',
      scopeLabel: 'Scope of work',
      closeLabel: 'Close',
      items: [
        {
          title: 'Wind Farm',
          location: 'Midelt',
          type: 'Wind Energy',
          image: '/images/espagnols-projet-eolien-maroc-48b99.webp',
          description:
            'Major wind farm in Midelt covering soil preparation, civil foundations, and installation of grid connection networks.',
          scope: ['Earthworks and platforms', 'Civil foundations', 'Cable pulling and connections', 'HSE coordination'],
        },
        {
          title: 'NOOR Solar Complex',
          location: 'Midelt',
          type: 'Solar',
          image: '/images/noor_midelt_Maroc_Misterelec.webp',
          description:
            'Contribution to the NOOR Midelt solar complex — earthworks, infrastructure, and electrical connections on a strategic energy site.',
          scope: ['Soil preparation', 'Civil works', 'Electrical networks', 'Logistics support'],
        },
        {
          title: 'Wind Farm',
          location: 'Boujdour',
          type: 'Wind Energy',
          image: '/images/boujdour-eolien.jpg',
          description:
            'Wind farm in Boujdour: earthworks, foundations, and electrical installation in a demanding coastal environment.',
          scope: ['Coastal earthworks', 'Special foundations', 'Electrical networks', 'Marine logistics'],
        },
        {
          title: 'Royal Residence',
          location: 'Morocco',
          type: 'Residential',
          image: '/images/person-using-magnifyer.jpg',
          description:
            'Royal Residence: high-end construction and finishes, structural steelwork, and compliant electrical installations.',
          scope: ['Shell and civil works', 'Structural steel', 'Electrical and connections', 'Premium finishes'],
        },
        {
          title: 'Polytechnic University',
          location: 'Rabat',
          type: 'Education',
          image: '/images/WhatsApp-Image-2026-06-23-at-01.55.57-scaled.jpeg',
          description:
            'Polytechnic University in Rabat: construction of technical and tertiary buildings, electrical networks, and fit-outs.',
          scope: ['Technical buildings', 'Electrical networks', 'Fit-out', 'Site coordination'],
        },
        {
          title: 'Metallurgical Plant',
          location: 'Mibladen',
          type: 'Metallurgy',
          image: '/images/2381020b17bf66f53bcf4266667186fb.webp',
          description:
            'Metallurgical plant in Mibladen: fabrication, welding, and assembly of steel structures and industrial piping.',
          scope: ['Steel structures', 'High-pressure piping', 'Welding and assembly', 'Maintenance'],
        },
        {
          title: 'Thermal Power Plant',
          location: 'Safi',
          type: 'Thermal',
          image: '/images/centralesafi-126-scaled.jpg',
          description:
            'Thermal power plant in Safi: civil engineering, earthworks, and electrical installations for a power generation facility.',
          scope: ['Civil engineering', 'Earthworks', 'Electrical installations', 'HSE'],
        },
        {
          title: 'Abdelmoumen STEP',
          location: 'Agadir',
          type: 'Hydropower',
          image: '/images/A-LA-UNE-Energie-electrique-la-STEP-Abdelmoumen-AP83-02.jpg',
          description:
            'Pumped Storage Energy Transfer (STEP) station near Agadir: civil works, earthworks, and electrical networks.',
          scope: ['Civil works', 'Earthworks', 'Electrical networks', 'Site safety'],
        },
        {
          title: 'Phosphate Project',
          location: 'Jorf El Asfar',
          type: 'Industrial',
          image: '/images/Jorf_lasfar_3eme_usine_d_engrais_mise_en_service_2017.jpg',
          description:
            'Phosphate project in Jorf El Asfar: industrial infrastructure, civil engineering, and piping for the fertilizer complex.',
          scope: ['Industrial infrastructure', 'Civil engineering', 'HP piping', 'Logistics'],
        },
        {
          title: 'Desalination Plant',
          location: 'Casablanca',
          type: 'Desalination',
          image: '/images/WhatsApp-Image-2026-06-22-at-21.27.06.jpeg',
          description:
            'Desalination plant in Casablanca: civil engineering, earthworks, and electrical connections for the water infrastructure.',
          scope: ['Civil engineering', 'Earthworks', 'Electrical connections', 'Commissioning'],
        },
      ],
    },
    serviceCards: {
      eyebrow: 'CORE OFFERINGS',
      title: 'Our core offerings',
      items: [
        { title: 'Civil Engineering & Transport', image: '/images/Genie-civil_bk.png', href: '#services' },
        { title: 'Earthworks', image: '/images/2149194826.jpg', href: '#services' },
        { title: 'Industrial Electrical', image: '/images/images.jpeg', href: '#services' },
        { title: 'Steel & Piping', image: '/images/images-1.jpeg', href: '#services' },
        { title: 'Equipment Rental', image: '/images/Services-location-des-engins-de-travail-vehicules-de-services-et-transport-personnel.jpg', href: '#services' },
      ],
    },
    partners: {
      eyebrow: 'OUR REFERENCES',
      title: 'They trust us',
      logos: [
        { name: 'LPEE', src: '/images/lpee-laboratoire-public-dessais-et-detudes.jpg' },
        { name: 'ACCIONA', src: '/images/acciona.png' },
        { name: 'EPME', src: '/images/epme.webp' },
        { name: 'Group-16103', src: '/images/Group-16103.png' },
        { name: 'NSM', src: '/images/nsm.webp' },
        { name: 'Calque55', src: '/images/Calque55.webp' },
        { name: 'CMS Company', src: '/images/cmscompany_logo.jpeg' },
        { name: 'SOGEA Maroc', src: '/images/sogea_maroc_logo.jpeg' },
        { name: 'Images-1', src: '/images/images-1.png' },
        { name: 'Unnamed', src: '/images/unnamed.jpg' },
        { name: '1630578323178', src: '/images/1630578323178.jpeg' },
        { name: 'Noukatel', src: '/images/noukatel_logo.jpeg' },
      ],
    },
    about: {
      eyebrow: 'ABOUT US',
      title: 'Building with Excellence and Reliability',
      body: [
        'HACHLAF AKHAWAYNE Travaux Divers has already taken part in several large-scale projects in Morocco, including fast-track projects, which have enabled it to develop strong mobilization, coordination, and execution capabilities on the ground.',
        'Recognized for its seriousness, responsiveness, and good reputation, the company relies on a reliable network of partners, qualified resources, and experienced engineers.',
        'The company also attaches great importance to HSE requirements — Hygiene, Safety, and Environment — ensuring compliance with safety procedures on worksites and execution of work in accordance with required standards in an organized, secure, and professional framework.',
      ],
      cta: 'Read more',
      image: '/images/WhatsApp-Image-2026-06-14-at-14.05.29.jpeg',
      values: [
        { title: 'On-time delivery', desc: 'Every site completed on schedule, from civil works to energy projects.' },
        { title: 'Qualified team', desc: 'Engineers, technicians, and seasoned professionals driving execution on the ground.' },
        { title: 'Quality & Safety (HSE)', desc: 'Standards held to the most exacting hygiene, safety, and environmental requirements.' },
        { title: 'Local employment', desc: 'Most of our team is from the Midelt region — we invest in the communities we build in.' },
      ],
    },
    cta: {
      title: 'Ready to make your project a reality?',
      body: 'Our team supports you at every stage to transform your ideas into sustainable, quality achievements.',
      button: 'Contact us',
    },
    contact: {
      title: 'Contact & Information',
      items: [
        { label: 'Headquarters', value: '186, Hay Riad 2 — Midelt' },
        { label: 'Depot', value: 'Route de Meknès, RN13 — Midelt' },
        { label: 'Phone', value: '05 35 36 03 41' },
        { label: 'Email', value: 'h.hamza@stehachlaf.com' },
      ],
    },
    footer: {
      description:
        'Based in Midelt, HACHLAF AKHAWAYNE Travaux Divers is a Moroccan company specialized in civil engineering, earthworks, industrial electricity, steel construction, and high-pressure piping.',
      links: [
        { label: 'Home', href: '#top' },
        { label: 'Services', href: '#services' },
        { label: 'References', href: '#projects' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
      ],
      contact: [
        { label: 'Headquarters', value: '186, Hay Riad 2 — Midelt' },
        { label: 'Phone', value: '05 35 36 03 41' },
        { label: 'Email', value: 'h.hamza@stehachlaf.com' },
      ],
      legal: 'Copyright @ 2026 , All Right Reserved.',
    },
  },
};

export const logoSrc = '/images/hachlaf_akhawayne_logo_v1.png';
export const heroImage = '/images/group-of-confident-builders-looking-at-building-plan-at-construction-site2.jpg';
