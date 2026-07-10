import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-fade';

/**
 * Auto-fading project grid carousel matching the modern reference layout.
 */
export default function SwiperProjectCarousel({ projects, onSelectProject }) {
  // Chunk projects into groups of 3
  const chunks = [];
  for (let i = 0; i < projects.items.length; i += 3) {
    chunks.push(projects.items.slice(i, i + 3));
  }

  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-[90rem] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Side: Text */}
        <div className="lg:w-1/3 flex flex-col justify-start pt-4">
          <h2 className="heading-2 font-display text-brand-navy leading-tight mb-6">
            {projects.title}
          </h2>
          <p className="body-large text-brand-dark max-w-md mb-8">
            {projects.subtitle}
          </p>
          <div>
            <a href="#contact" className="link-circle group">
              <span className="text-brand-dark group-hover:text-brand-navy">{projects.viewDetails || 'Discover our portfolio'}</span>
              <div className="link-circle-icon bg-brand-cyan group-hover:bg-brand-navy">
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>
          </div>
        </div>

        {/* Right Side: Auto-fading Grid */}
        <div className="lg:w-2/3">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            allowTouchMove={false}
            loop={true}
            speed={1200}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            className="w-full"
          >
            {chunks.map((chunk, i) => (
              <SwiperSlide key={i}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                  {/* First item is large (spans 2 columns) */}
                  {chunk[0] && (
                    <ProjectCard 
                      project={chunk[0]} 
                      onSelect={() => onSelectProject(chunk[0])}
                      className="md:col-span-2 aspect-[16/9] md:aspect-[2.5/1]"
                    />
                  )}
                  {/* Second and third items are smaller */}
                  {chunk[1] && (
                    <ProjectCard 
                      project={chunk[1]} 
                      onSelect={() => onSelectProject(chunk[1])}
                      className="aspect-[4/3]"
                    />
                  )}
                  {chunk[2] && (
                    <ProjectCard 
                      project={chunk[2]} 
                      onSelect={() => onSelectProject(chunk[2])}
                      className="aspect-[4/3]"
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, onSelect, className = '' }) {
  return (
    <button
      onClick={onSelect}
      className="group flex flex-col text-left w-full h-full"
    >
      <div className={`w-full relative card-skanska ${className}`}>
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="pt-5 pb-3 flex justify-between items-center">
        <div>
          <h3 className="text-xl md:text-2xl font-display font-medium text-brand-navy group-hover:text-brand-navy transition-colors">
            {project.title}
          </h3>
          <p className="text-sm font-medium text-brand-muted mt-1 uppercase tracking-wider">
            {project.type}
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-brand-navy text-white flex items-center justify-center transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </button>
  );
}
