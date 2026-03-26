import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import { testimonials } from '../data/projects';

export function Testimonials() {
  const { isDark, language } = useApp();
  const t = translations[language].testimonials;

  return (
    <section id="testimonials" className="!py-[120px] !px-6 relative">
      <div className="max-w-[1200px] !mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center !mb-16"
        >
          <div className="flex items-center justify-center gap-2 !mb-4">
            <div className={`h-px w-10 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
            
            <span className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#5e6ad2]">
              Testimonials
            </span>

            <div className={`h-px w-10 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
          </div>

          <h2 className={`
            text-[clamp(32px,5vw,52px)] font-bold leading-[1.1] tracking-[-0.03em] !mb-3.5
            ${isDark ? 'text-white' : 'text-[#0a0a0a]'}
          `}>
            {t.title}
          </h2>

          <p className={`
            text-[16px] tracking-[-0.01em]
            ${isDark ? 'text-[#8a8f98]' : 'text-gray-500'}
          `}>
            {t.subtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="
          grid gap-4
          [grid-template-columns:repeat(auto-fill,minmax(320px,1fr))]
        ">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              isDark={isDark}
              language={language}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
  isDark,
  language,
}: {
  testimonial: typeof testimonials[0];
  index: number;
  isDark: boolean;
  language: 'en' | 'es';
}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative overflow-hidden !p-7 rounded-[14px]
        transition-all duration-200
        
        ${hovered
          ? (isDark ? 'shadow-[0_16px_48px_rgba(0,0,0,0.3)]' : 'shadow-[0_16px_48px_rgba(0,0,0,0.08)]')
          : ''
        }
        ${isDark ? 'bg-white/[0.03]' : 'bg-black/[0.02]'}
        ${hovered
          ? 'border border-[#5e6ad2]/30'
          : (isDark ? 'border border-white/10' : 'border border-black/10')
        }
      `}
    >
      {/* Top accent */}
      {hovered && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#5e6ad2] to-[#8b5cf6]" />
      )}

      {/* Icon */}
      <div className={`
        w-9 h-9 rounded-[10px] flex items-center justify-center !mb-5
        ${isDark ? 'bg-[#5e6ad2]/15' : 'bg-[#5e6ad2]/10'}
        text-[#5e6ad2]
      `}>
        <Quote size={16} />
      </div>

      {/* Quote */}
      <p className={`
        text-[15px] leading-[1.7] tracking-[-0.01em] !mb-6 italic
        ${isDark ? 'text-[#c4c6cc]' : 'text-gray-700'}
      `}>
        "{testimonial.quote[language]}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.alt}
          className={`
            w-10 h-10 rounded-full object-cover
            ${isDark ? 'border-2 border-white/10' : 'border-2 border-black/10'}
          `}
        />

        <div>
          <p className={`
            text-[14px] font-semibold tracking-[-0.01em] !mb-0.5
            ${isDark ? 'text-white' : 'text-[#0a0a0a]'}
          `}>
            {testimonial.name}
          </p>

          <p className={`
            text-[12px] tracking-[-0.005em]
            ${isDark ? 'text-[#8a8f98]' : 'text-gray-500'}
          `}>
            {testimonial.role[language]}
          </p>
        </div>
      </div>
    </motion.div>
  );
}