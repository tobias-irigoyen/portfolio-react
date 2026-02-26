import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

export function CTA() {
  const { isDark, language } = useApp();
  const t = translations[language].cta;

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

    const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Tobías Irigoyen - CV.pdf';
    link.download = 'Tobías Irigoyen - CV.pdf';
    link.click();
  };

  const lines = t.title.split('\n');

  return (
    <section style={{ padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            borderRadius: '24px',
            padding: 'clamp(48px, 8vw, 96px) clamp(32px, 6vw, 80px)',
            background: isDark
              ? 'linear-gradient(135deg, #0d0f2a 0%, #0a0a0a 50%, #150d24 100%)'
              : 'linear-gradient(135deg, #eef0ff 0%, #f9f9f9 50%, #f0ebff 100%)',
            border: `1px solid ${isDark ? 'rgba(94,106,210,0.2)' : 'rgba(94,106,210,0.15)'}`,
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          {/* Background mesh gradients */}
          <div style={{
            position: 'absolute',
            top: '-40%',
            left: '-20%',
            width: '60%',
            height: '200%',
            background: isDark
              ? 'radial-gradient(ellipse, rgba(94,106,210,0.15) 0%, transparent 60%)'
              : 'radial-gradient(ellipse, rgba(94,106,210,0.1) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            top: '-40%',
            right: '-20%',
            width: '60%',
            height: '200%',
            background: isDark
              ? 'radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 60%)'
              : 'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />

          {/* Grid overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: isDark
              ? `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`
              : `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(44px, 7vw, 88px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              marginBottom: '24px',
            }}>
              {lines.map((line, i) => (
                <span key={i} style={{ display: 'block' }}>{line}</span>
              ))}
            </h2>

            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: isDark ? '#8a8f98' : '#6b7280',
              maxWidth: '520px',
              lineHeight: 1.65,
              margin: '0 auto 40px',
              letterSpacing: '-0.01em',
            }}>
              {t.description}
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.button
                onClick={() => scrollTo('#contact')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  borderRadius: '11px',
                  background: 'linear-gradient(135deg, #5e6ad2, #7c3aed)',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  fontWeight: 650,
                  color: '#fff',
                  letterSpacing: '-0.01em',
                  boxShadow: '0 8px 32px rgba(94,106,210,0.4)',
                }}
              >
                {t.button}
                <ArrowRight size={16} />
              </motion.button>

              <motion.button
                onClick={() => downloadCV()}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  borderRadius: '11px',
                  background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}`,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  fontWeight: 650,
                  color: isDark ? '#fff' : '#0a0a0a',
                  letterSpacing: '-0.01em',
                }}
              >
                <Download size={15} />
                {t.buttonSecondary}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
