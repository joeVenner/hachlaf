import { useState } from 'react';
import { site, logoSrc, heroImage } from './data/content';

import GlassmorphismNav from './components/GlassmorphismNav';
import Hero from './components/Hero';
import StickyServices from './components/StickyServices';
import StatsSnapshot from './components/StatsSnapshot';
import SwiperProjectCarousel from './components/SwiperProjectCarousel';
import ProjectModal from './components/ProjectModal';
import ServiceCards from './components/ServiceCards';
import AboutSection from './components/AboutSection';
import PartnersSection from './components/PartnersSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

/**
 * Hachlaf Akhawayne single-page website.
 *
 * Built from the Skanska design system spec and real company content.
 */
function App() {
  const [lang, setLang] = useState('fr');
  const [selectedProject, setSelectedProject] = useState(null);

  const t = site[lang];

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      <GlassmorphismNav
        nav={t.nav}
        logoSrc={logoSrc}
        lang={lang}
        setLang={setLang}
      />

      <main>
        <Hero hero={t.hero} heroImage={heroImage} lang={lang} />

        <StickyServices
          services={t.services}
          ctaLabel={lang === 'en' ? 'Discover our references' : 'Découvrir nos références'}
        />

        <StatsSnapshot stats={t.stats} />

        <SwiperProjectCarousel
          projects={t.projects}
          onSelectProject={setSelectedProject}
        />

        <ServiceCards serviceCards={t.serviceCards} />

        <AboutSection about={t.about} />

        <PartnersSection partners={t.partners} />

        <CTASection cta={t.cta} />
      </main>

      <Footer footer={t.footer} logoSrc={logoSrc} />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        labels={{
          closeLabel: t.projects.closeLabel,
          scopeLabel: t.projects.scopeLabel,
        }}
      />
    </div>
  );
}

export default App;
