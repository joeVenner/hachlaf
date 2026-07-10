import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SLIDE_INTERVAL = 6000;
const CROSSFADE_DURATION = 1.5;

/**
 * Fixed full-screen hero with a crossfading background slideshow.
 *
 * The hero layer stays pinned while the main page content scrolls over it,
 * creating a reveal effect between the homepage and the fixed background.
 */
export default function Hero({ hero, heroImages }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section
      id="top"
      className="fixed inset-0 h-screen w-full overflow-hidden z-0"
    >
      {/* Crossfade background slideshow */}
      <div className="absolute inset-0">
        {heroImages.map((src, index) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: currentIndex === index ? 1 : 0 }}
            transition={{ duration: CROSSFADE_DURATION, ease: 'easeInOut' }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-brand-navy/25 to-black/30" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center"
      >
        <div className="site-container h-full flex flex-col items-center justify-center">
          {/* Typing effect title */}
          <TypingEffect words={hero.typingWords} />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
            className="body-large text-white/90 max-w-2xl mt-6"
          >
            {hero.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.3, ease: [0.22, 1, 0.36, 1] }}
            className="body-main text-white/80 max-w-2xl mt-4 hidden md:block"
          >
            {hero.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-10"
          >
            <a href="#projects" className="btn-primary">
              {hero.ctaPrimary}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="btn-secondary">
              {hero.ctaSecondary}
            </a>
            <Link to="/sous-traitant" className="btn-secondary">
              {hero.ctaSubcontractor}
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.a
          href="#domaines"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/80 hover:text-white transition-colors"
        >
          <div className="w-[1px] h-12 bg-white/30 overflow-hidden">
            <motion.div
              className="w-full h-1/3 bg-white"
              animate={{ y: ['-100%', '300%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            />
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
}

/**
 * Typing effect: types each word character by character.
 */
function TypingEffect({ words }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const word = words[currentWordIndex];
    let timeout;

    if (!isDeleting && charIndex < word.length) {
      // Type next char
      timeout = setTimeout(() => {
        setCurrentText(word.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 100);
    } else if (!isDeleting && charIndex === word.length) {
      // Pause at end, then start deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && charIndex > 0) {
      // Delete char
      timeout = setTimeout(() => {
        setCurrentText(word.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 50);
    } else if (isDeleting && charIndex === 0) {
      // Move to next word
      setIsDeleting(false);
      setCurrentWordIndex((currentWordIndex + 1) % words.length);
      setCurrentText('');
      timeout = setTimeout(() => {}, 300);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentWordIndex, words]);

  return (
    <h1 className="heading-1 font-display text-white max-w-5xl drop-shadow-lg min-h-[1.2em]">
      {currentText}
      <span className="inline-block w-[3px] h-[0.9em] bg-brand-orange ml-1 animate-pulse align-middle" />
    </h1>
  );
}
