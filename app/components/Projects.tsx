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
      <section id="work" style={{ padding: '120px 24px', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '64px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                color: '#5e6ad2',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                Work
              </span>
              <div style={{ height: '1px', width: '40px', background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
            </div>
            <h2 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 700,
              color: isDark ? '#fff' : '#0a0a0a',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '14px',
            }}>
              {t.title}
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              color: isDark ? '#8a8f98' : '#6b7280',
              letterSpacing: '-0.01em',
            }}>
              {t.subtitle}
            </p>
          </motion.div>

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '16px',
          }}>
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        borderRadius: '14px',
        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
        border: `1px solid ${hovered
          ? (isDark ? 'rgba(94,106,210,0.35)' : 'rgba(94,106,210,0.3)')
          : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)')}`,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? (isDark ? '0 20px 60px rgba(0,0,0,0.4)' : '0 20px 60px rgba(0,0,0,0.1)')
          : 'none',
      }}
    >
      {/* Image */}
      <div style={{
        position: 'relative',
        paddingBottom: '56.25%',
        overflow: 'hidden',
        background: isDark ? '#111' : '#f0f0f0',
      }}>
        <img
          src={project.images[0]}
          alt={project.title}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%)'
            : 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.35) 100%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '16px',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            color: '#fff',
          }}>
            {viewLabel}
            <ArrowRight size={13} />
          </div>
        </div>

        {/* Year badge */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          padding: '4px 10px',
          borderRadius: '6px',
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)',
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          fontWeight: 500,
          color: 'rgba(255,255,255,0.8)',
          letterSpacing: '0.02em',
        }}>
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 20px 22px' }}>
        <h3 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px',
          fontWeight: 650,
          color: isDark ? '#fff' : '#0a0a0a',
          letterSpacing: '-0.02em',
          marginBottom: '6px',
        }}>
          {project.title}
        </h3>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          color: isDark ? '#8a8f98' : '#6b7280',
          lineHeight: 1.6,
          marginBottom: '14px',
          letterSpacing: '-0.005em',
        }}>
          {project.shortDesc[language]}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{
              padding: '3px 8px',
              borderRadius: '5px',
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              color: isDark ? '#8a8f98' : '#6b7280',
              letterSpacing: '0.01em',
            }}>
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

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
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
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        overflowY: 'auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: isDark ? '#0d0d0d' : '#ffffff',
          borderRadius: '18px',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          width: '100%',
          maxWidth: '760px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
        }}
      >
        {/* Image Carousel */}
        <div style={{ position: 'relative' }}>
          <div ref={emblaRef} style={{ overflow: 'hidden', borderRadius: '18px 18px 0 0' }}>
            <div style={{ display: 'flex' }}>
              {project.images.map((img, i) => (
                <div key={i} style={{ flex: '0 0 100%', minWidth: 0 }}>
                  <img
                    src={img}
                    alt={`${project.title} ${i + 1}`}
                    style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Nav buttons */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={scrollPrev}
                style={{
                  position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#fff',
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={scrollNext}
                style={{
                  position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#fff',
                }}
              >
                <ChevronRight size={18} />
              </button>

              {/* Dots */}
              <div style={{
                position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)',
                display: 'flex', gap: '6px',
              }}>
                {project.images.map((_, i) => (
                  <div key={i} style={{
                    width: i === current ? '20px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background: i === current ? '#fff' : 'rgba(255,255,255,0.4)',
                    transition: 'all 0.2s ease',
                  }} />
                ))}
              </div>
            </>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '16px', right: '16px',
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff',
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          {/* Meta */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
            <div>
              <h2 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '24px',
                fontWeight: 700,
                color: isDark ? '#fff' : '#0a0a0a',
                letterSpacing: '-0.03em',
                marginBottom: '4px',
              }}>
                {project.title}
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: isDark ? '#8a8f98' : '#6b7280',
              }}>
                {project.role[language]} · {project.year}
              </p>
            </div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '8px 14px', borderRadius: '8px',
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500,
                  color: isDark ? '#6d6d6dff' : '#6b7280',
                  textDecoration: 'none',
                }}
                className="hover:!bg-black hover:!text-white hover:!border hover:!border-[#6d6d6dff] transition-all duration-[600ms]"
              >
                {t.visitSite}
                <ExternalLink size={12} />
              </a>
            )}
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(233, 233, 233, 0.07)', marginBottom: '24px' }} />

          {/* Description */}
          <div style={{ marginBottom: '28px' }}>
            {paragraphs.map((para, i) => (
              <p key={i} style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                color: isDark ? '#c4c6cc' : '#374151',
                lineHeight: 1.7,
                marginBottom: i < paragraphs.length - 1 ? '16px' : 0,
                letterSpacing: '-0.005em',
              }}>
                {para}
              </p>
            ))}
          </div>

          {/* Technologies */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              color: isDark ? '#8a8f98' : '#9ca3af',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}>
              {t.technologies}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.tags.map(tag => (
                <span key={tag} style={{
                  padding: '4px 10px', borderRadius: '6px',
                  background: isDark ? 'rgba(94,106,210,0.12)' : 'rgba(94,106,210,0.08)',
                  border: `1px solid ${isDark ? 'rgba(94,106,210,0.25)' : 'rgba(94,106,210,0.2)'}`,
                  fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 500,
                  color: '#5e6ad2',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{
            borderRadius: '12px',
            background: isDark
              ? 'linear-gradient(135deg, rgba(94,106,210,0.1), rgba(139,92,246,0.1))'
              : 'linear-gradient(135deg, rgba(94,106,210,0.06), rgba(139,92,246,0.06))',
            border: `1px solid ${isDark ? 'rgba(94,106,210,0.2)' : 'rgba(94,106,210,0.15)'}`,
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
          }}>
            <div>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 600,
                color: isDark ? '#fff' : '#0a0a0a', letterSpacing: '-0.02em', marginBottom: '4px',
              }}>
                {t.contactTitle}
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '13px',
                color: isDark ? '#8a8f98' : '#6b7280',
              }}>
                {t.contactDesc}
              </p>
            </div>
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '11px 20px', borderRadius: '9px',
                background: 'linear-gradient(135deg, #5e6ad2, #7c3aed)',
                border: 'none', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600,
                color: '#fff', letterSpacing: '-0.01em',
                boxShadow: '0 4px 16px rgba(94,106,210,0.35)',
                whiteSpace: 'nowrap',
              }}
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
