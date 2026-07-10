import { useState } from 'react';
import { site, logoSrc } from '../data/content';

import SuffolkNav from '../components/SuffolkNav';
import Hero from '../components/Hero';
import DomainesSection from '../components/DomainesSection';
import ParallaxBanners from '../components/ParallaxBanners';
import OffresSection from '../components/OffresSection';
import SkanskaProjects from '../components/SkanskaProjects';
import ProjectModal from '../components/ProjectModal';
import StatsSnapshot from '../components/StatsSnapshot';
import AboutSection from '../components/AboutSection';
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
 * 1. Hero (fixed background with crossfade slideshow)
 * 2. Nos domaines d'activité (sharp cards)
 * 3. Parallax scrolling banners
 * 4. Nos offres (card style)
 * 5. Projets (Skanska-style: 1 big + 3 small)
 * 6. Stats snapshot
 * 7. À propos (sharp, 90% width)
 * 8. Partenaires (sliding carousel)
 * 9. CTA
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

      {/* Spacer for the fixed hero so it occupies the initial viewport */}
      <div className="h-screen bg-white" aria-hidden="true" />

      <main className="relative z-10 bg-white">
        {/* 1. Hero */}
        <Hero hero={t.hero} heroImages={heroSlideshowImages} />

        {/* 2. Domaines d'activité */}
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

        {/* 7. À propos */}
        <AboutSection about={t.about} />

        {/* 8. Partenaires carousel */}
        <PartnersCarousel partners={t.partners} />

        {/* 9. CTA */}
        <CTASection cta={t.cta} />
      </main>

      {/* 10. Footer */}
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
