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
    <section id="testimonials" style={{ padding: '120px 24px', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ height: '1px', width: '40px', background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              color: '#5e6ad2',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Testimonials
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

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '16px',
        }}>
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

function TestimonialCard({ testimonial, index, isDark, language }: {
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
      style={{
        padding: '28px',
        borderRadius: '14px',
        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
        border: `1px solid ${hovered
          ? 'rgba(94,106,210,0.3)'
          : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)')}`,
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? (isDark ? '0 16px 48px rgba(0,0,0,0.3)' : '0 16px 48px rgba(0,0,0,0.08)') : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top gradient accent */}
      {hovered && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #5e6ad2, #8b5cf6)',
          borderRadius: '14px 14px 0 0',
        }} />
      )}

      {/* Quote icon */}
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        background: isDark ? 'rgba(94,106,210,0.12)' : 'rgba(94,106,210,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        color: '#5e6ad2',
      }}>
        <Quote size={16} />
      </div>

      {/* Quote text */}
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '15px',
        color: isDark ? '#c4c6cc' : '#374151',
        lineHeight: 1.7,
        letterSpacing: '-0.01em',
        marginBottom: '24px',
        fontStyle: 'italic',
      }}>
        "{testimonial.quote[language]}"
      </p>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img
          src={testimonial.avatar}
          alt={testimonial.alt}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          }}
        />
        <div>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            color: isDark ? '#fff' : '#0a0a0a',
            letterSpacing: '-0.01em',
            marginBottom: '2px',
          }}>
            {testimonial.name}
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            color: isDark ? '#8a8f98' : '#6b7280',
            letterSpacing: '-0.005em',
          }}>
            {testimonial.role[language]}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
