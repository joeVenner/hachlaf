import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, FreeMode } from 'swiper/modules';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

/**
 * Auto-rotating project carousel using Swiper.js.
 *
 * Skanska spec:
 * - horizontal Swiper with autoplay
 * - progress bar that fills over time
 * - sharp-corner cards (image + project name + location)
 * - hover zoom on image
 * - click opens the detail modal
 */
export default function SwiperProjectCarousel({ projects, onSelectProject }) {
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef(null);

  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="eyebrow">{projects.eyebrow}</span>
            <h2 className="heading-2 font-display text-brand-navy">
              {projects.title}
            </h2>
            <p className="body-large text-brand-muted max-w-2xl mt-4">
              {projects.subtitle}
            </p>
          </div>

          {/* Custom navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-12 h-12 flex items-center justify-center border border-brand-navy/20 text-brand-navy hover:bg-brand-navy hover:text-white transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-12 h-12 flex items-center justify-center border border-brand-navy/20 text-brand-navy hover:bg-brand-navy hover:text-white transition-colors"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation, FreeMode]}
            spaceBetween={24}
            slidesPerView={"auto"}
            loop={true}
            speed={700}
            freeMode={false}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onAutoplayTimeLeft={(swiper, timeLeft, progressValue) => {
              setProgress(1 - progressValue);
            }}
            onSlideChange={() => {
              setProgress(0);
            }}
            breakpoints={{
              320: { slidesPerView: 1.15, spaceBetween: 16 },
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 3.2, spaceBetween: 24 },
              1440: { slidesPerView: 3.5, spaceBetween: 24 },
            }}
            className="!pb-4"
          >
            {projects.items.map((project) => (
              <SwiperSlide key={project.title + project.location} className="!w-[300px] sm:!w-[340px] lg:!w-[420px]">
                <button
                  onClick={() => onSelectProject(project)}
                  className="group block w-full text-left card-sharp bg-brand-light"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  </div>

                  <div className="p-5 bg-brand-light group-hover:bg-brand-navy transition-colors duration-300">
                    <span className="inline-block text-[11px] font-display font-bold uppercase tracking-[0.15em] text-brand-cyan mb-2">
                      {project.type}
                    </span>
                    <h3 className="heading-4 font-display text-brand-navy group-hover:text-white transition-colors duration-300 mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-brand-muted group-hover:text-white/70 transition-colors duration-300">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="body-small font-medium">{project.location}</span>
                    </div>
                  </div>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Progress bar */}
          <div className="mt-8 h-1 bg-brand-navy/10 overflow-hidden">
            <div
              className="h-full bg-brand-orange transition-[width] duration-100 ease-linear"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
