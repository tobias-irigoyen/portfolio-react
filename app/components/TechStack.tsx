import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

export function TechStack() {
  const { isDark, language } = useApp();
  const t = translations[language].stack;

  return (
    <section id="stack" style={{ padding: '120px 24px', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
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
              Stack
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

        {/* Categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {t.categories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: catIndex * 0.08 }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '32px', flexWrap: 'wrap' }}
            >
              {/* Category label */}
              <div style={{
                minWidth: '120px',
                paddingTop: '8px',
              }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: isDark ? '#8a8f98' : '#9ca3af',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>
                  {category.name}
                </span>
              </div>

              {/* Divider */}
              <div style={{
                width: '1px',
                background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                alignSelf: 'stretch',
                minHeight: '30px',
                flexShrink: 0,
              }} />

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', flex: 1 }}>
                {category.items.map((item, itemIndex) => (
                  <TechBadge
                    key={item}
                    label={item}
                    isDark={isDark}
                    delay={catIndex * 0.08 + itemIndex * 0.04}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            marginTop: '64px',
            height: '1px',
            background: isDark
              ? 'linear-gradient(90deg, transparent, rgba(94,106,210,0.5), rgba(139,92,246,0.5), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(94,106,210,0.3), rgba(139,92,246,0.3), transparent)',
            transformOrigin: 'left',
          }}
        />
      </div>
    </section>
  );
}

function TechBadge({ label, isDark, delay }: { label: string; isDark: boolean; delay: number }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '6px 14px',
        borderRadius: '8px',
        background: hovered
          ? 'linear-gradient(135deg, rgba(94,106,210,0.15), rgba(139,92,246,0.15))'
          : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'),
        border: `1px solid ${hovered
          ? 'rgba(94,106,210,0.4)'
          : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)')}`,
        fontFamily: 'Inter, sans-serif',
        fontSize: '13px',
        fontWeight: 500,
        color: hovered ? '#5e6ad2' : (isDark ? '#c4c6cc' : '#374151'),
        letterSpacing: '-0.01em',
        cursor: 'default',
        transition: 'all 0.2s ease',
        userSelect: 'none',
      }}
    >
      {label}
    </motion.div>
  );
}
