import { useState } from 'react';
import { site, logoSrc } from '../data/content';

import SuffolkNav from '../components/SuffolkNav';
import Hero from '../components/Hero';
import HeroBackground from '../components/HeroBackground';
import DomainesSection from '../components/DomainesSection';
import ContactSection from '../components/ContactSection';
import ParallaxBanners from '../components/ParallaxBanners';
import OffresSection from '../components/OffresSection';
import SkanskaProjects from '../components/SkanskaProjects';
import ProjectModal from '../components/ProjectModal';
import StatsSnapshot from '../components/StatsSnapshot';
import PartnersCarousel from '../components/PartnersCarousel';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const heroSlideshowImages = [
  '/images/generated/solar_noor_midelt.jpg',
  '/images/generated/hydro_step.jpg',
  '/images/generated/phosphate_jorf.jpg',
];

/**
 * Hachlaf Akhawayne homepage — redesigned with Skanska/Suffolk inspiration.
 *
 * Section order:
 * 1. Hero (fixed background + scrollable content layer)
 * 2. Nos domaines d'activité (sharp cards)
 * 3. Parallax scrolling banners
 * 4. Nos offres (card style)
 * 5. Projets (Skanska-style: 1 big + 3 small)
 * 6. Stats snapshot
 * 7. Partenaires (sliding carousel)
 * 8. CTA
 * 9. Contact form
 * 10. Footer
 */
export default function HomePage({ lang, setLang }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const t = site[lang];

  return (
    <div className="min-h-screen bg-white text-brand-dark">
      <SuffolkNav
        nav={t.nav}
        lang={lang}
        setLang={setLang}
      />

      {/* 1. Fixed hero background (z-0) and scrollable hero content (z-[1]) */}
      <HeroBackground heroImages={heroSlideshowImages} />
      <Hero hero={t.hero} />

      <main className="relative z-10 bg-white">
        {/* 2. Domaines d'activité — first white section covers the hero on scroll */}
        <DomainesSection domaines={t.domaines} />

        {/* 3. Parallax scrolling banners */}
        <ParallaxBanners banners={t.parallaxBanners} />

        {/* 4. Nos offres */}
        <OffresSection offres={t.offres} />

        {/* 5. Projets — Skanska-style */}
        <SkanskaProjects
          projects={t.projects}
          onSelectProject={setSelectedProject}
        />

        {/* 6. Stats snapshot */}
        <StatsSnapshot stats={t.stats} />

        {/* 7. Partenaires carousel */}
        <PartnersCarousel partners={t.partners} />

        {/* 9. CTA */}
        <CTASection cta={t.cta} />
      </main>

      {/* 10. Contact form */}
      <ContactSection contact={t.contact} />

      {/* 11. Footer */}
      <Footer footer={t.footer} logoSrc={logoSrc} />

      {/* Project modal */}
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
