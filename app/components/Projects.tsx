import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, ChevronLeft, ChevronRight, ExternalLink, MessageCircle } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { projects, Project } from '../data/projects';

export function Projects() {
  const { isDark, language } = useApp();
  const t = translations[language].projects;
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <section id="work" className="!py-[120px] !px-6 relative">
        <div className="max-w-[1200px] !mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="!mb-16"
          >
            <div className="flex items-center gap-2 !mb-4">
              <span className="text-[12px] font-semibold text-[#5e6ad2] tracking-[0.1em] uppercase">
                Work
              </span>
              <div className={`h-[1px] w-10 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
            </div>

            <h2 className={`font-semibold text-[clamp(32px,5vw,52px)] tracking-[-0.03em] leading-[1.1] !mb-3 ${isDark ? 'text-white' : 'text-[#0a0a0a]'}`}>
              {t.title}
            </h2>

            <p className={`text-[16px] tracking-[-0.01em] ${isDark ? 'text-[#8a8f98]' : 'text-[#6b7280]'}`}>
              {t.subtitle}
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(340px,1fr))]">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isDark={isDark}
                language={language}
                viewLabel={t.viewProject}
                onClick={() => setSelected(project)}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            isDark={isDark}
            language={language}
            t={t}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
function ProjectCard({
  project, index, isDark, language, viewLabel, onClick,
}: {
  project: Project;
  index: number;
  isDark: boolean;
  language: 'en' | 'es';
  viewLabel: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={`
        rounded-[14px] overflow-hidden cursor-pointer transition-all duration-200
        ${hovered ? '-translate-y-1' : ''}
        ${isDark ? 'bg-white/[0.03]' : 'bg-black/[0.02]'}
        ${
          hovered
            ? isDark
              ? 'border border-indigo-400/40 shadow-[0_20px_60px_rgba(0,0,0,0.4)]'
              : 'border border-indigo-400/30 shadow-[0_20px_60px_rgba(0,0,0,0.1)]'
            : isDark
              ? 'border border-white/10'
              : 'border border-black/10'
        }
      `}
    >
      {/* Image */}
      <div className={`relative !pt-[56.25%] overflow-hidden ${isDark ? 'bg-[#111]' : 'bg-[#f0f0f0]'}`}>
        <img
          src={project.images[0]}
          alt={project.title}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ${hovered ? 'scale-105' : ''}`}
        />

        {/* Overlay */}
        <div className={`
          absolute inset-0 flex items-end !p-4 transition-opacity duration-300
          ${hovered ? 'opacity-100' : 'opacity-0'}
          ${isDark
            ? 'bg-gradient-to-b from-transparent to-black/60'
            : 'bg-gradient-to-b from-transparent to-black/35'}
        `}>
          <div className="flex items-center gap-1.5 !px-[14px] !py-[7px] rounded-lg bg-white/20 backdrop-blur text-white text-[13px] font-semibold">
            {viewLabel}
            <ArrowRight size={13} />
          </div>
        </div>

        {/* Year badge */}
        <div className="absolute top-3 right-3 !px-[10px] !py-[4px] rounded-md bg-black/50 backdrop-blur text-[11px] text-white/80">
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div className="!px-5 !pt-5 !pb-[22px]">
        <h3 className={`text-[16px] font-[650] tracking-[-0.02em] !mb-1 ${isDark ? 'text-white' : 'text-[#0a0a0a]'}`}>
          {project.title}
        </h3>

        <p className={`text-[13px] leading-[1.6] !mb-3 tracking-[-0.005em] ${isDark ? 'text-[#8a8f98]' : 'text-[#6b7280]'}`}>
          {project.shortDesc[language]}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-[6px]">
          {project.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className={`!px-[8px] !py-[3px] rounded-[5px] text-[11px] font-medium tracking-[0.01em]
                ${isDark ? 'bg-white/10 text-[#8a8f98]' : 'bg-black/5 text-[#6b7280]'}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({
  project, isDark, language, t, onClose,
}: {
  project: Project;
  isDark: boolean;
  language: 'en' | 'es';
  t: any;
  onClose: () => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [current, setCurrent] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', () => setCurrent(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const scrollToContact = () => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector('#contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const paragraphs = project.longDesc[language].split('\n\n');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[1000] bg-black/75 backdrop-blur flex items-center justify-center !p-6 overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full max-w-[760px] max-h-[90vh] overflow-y-auto rounded-[18px]
          ${isDark ? 'bg-[#0d0d0d] border border-white/10' : 'bg-white border border-black/10'}
          shadow-[0_40px_100px_rgba(0,0,0,0.5)]
        `}
      >
        {/* Carousel */}
        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden rounded-t-[18px]">
            <div className="flex">
              {project.images.map((img, i) => (
                <div key={i} className="flex-[0_0_100%] min-w-0">
                  <img
                    src={img}
                    alt={`${project.title} ${i + 1}`}
                    className="w-full h-auto object-cover block"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur border border-white/20 flex items-center justify-center text-white"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={scrollNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur border border-white/20 flex items-center justify-center text-white"
              >
                <ChevronRight size={18} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {project.images.map((_, i) => (
                  <div
                    key={i}
                    className={`
                      h-[6px] rounded-[3px] transition-all duration-200
                      ${i === current ? 'w-5 bg-white' : 'w-[6px] bg-white/40'}
                    `}
                  />
                ))}
              </div>
            </>
          )}

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur border border-white/20 flex items-center justify-center text-white"
          >
            <X size={15} />
          </button>
        </div>

        {/* Content */}
        <div className="!p-8">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 !mb-6">
            <div>
              <h2 className={`text-[24px] font-bold tracking-[-0.03em] !mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
                {project.title}
              </h2>
              <p className={`text-[13px] ${isDark ? 'text-[#8a8f98]' : 'text-[#6b7280]'}`}>
                {project.role[language]} · {project.year}
              </p>
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  flex items-center gap-1.5 !px-3 !py-2 rounded-lg text-[13px] font-medium
                  ${isDark
                    ? 'bg-white/10 border border-white/10 text-white'
                    : 'bg-black/5 border border-black/10 text-gray-600'}
                  hover:bg-black hover:border-white hover:text-white transition-all duration-300
                `}
              >
                {t.visitSite}
                <ExternalLink size={12} />
              </a>
            )}
          </div>

          {/* Divider */}
          <div className={`h-[1px] !mb-6 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />

          {/* Description */}
          <div className="!mb-7">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className={`text-[15px] leading-[1.7] !mb-4 tracking-[-0.005em]
                  ${isDark ? 'text-[#c4c6cc]' : 'text-[#374151]'}`}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Tech */}
          <div className="!mb-8">
            <p className={`text-[11px] font-semibold uppercase tracking-[0.08em] !mb-2.5 ${isDark ? 'text-[#8a8f98]' : 'text-gray-400'}`}>
              {t.technologies}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="!px-[10px] !py-[4px] rounded-md text-[12px] font-medium text-[#5e6ad2]
                  bg-indigo-500/10 border border-indigo-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className={`
            rounded-xl !p-6 flex flex-wrap items-center justify-between gap-4
            ${isDark
              ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20'
              : 'bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/15'}
          `}>
            <div>
              <p className={`text-[15px] font-semibold !mb-1 ${isDark ? 'text-white' : 'text-black'}`}>
                {t.contactTitle}
              </p>
              <p className={`text-[13px] ${isDark ? 'text-[#8a8f98]' : 'text-[#6b7280]'}`}>
                {t.contactDesc}
              </p>
            </div>

            <motion.button
              onClick={scrollToContact}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 !px-5 !py-2.5 rounded-lg text-[13px] font-semibold text-white cursor-pointer
              bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_4px_16px_rgba(94,106,210,0.35)]"
            >
              <MessageCircle size={14} />
              {t.contactCta}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}