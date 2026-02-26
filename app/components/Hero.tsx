import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

const roles = ['Frontend Engineer', 'UI/UX Designer'];

export function Hero() {
  const { isDark, language } = useApp();
  const t = translations[language].hero;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < currentRole.length) {
      timeout = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === currentRole.length) {
      timeout = setTimeout(() => setDeleting(true), 2500);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex(prev => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

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

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '120px 24px 80px',
    }}>
      {/* Gradient orbs */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '15%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: isDark
          ? 'radial-gradient(circle, rgba(94,106,210,0.12) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(94,106,210,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '25%',
        right: '10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: isDark
          ? 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        filter: 'blur(40px)',
      }} />

      <div style={{ maxWidth: '900px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '999px',
            background: isDark ? 'rgba(94,106,210,0.12)' : 'rgba(94,106,210,0.08)',
            border: `1px solid ${isDark ? 'rgba(94,106,210,0.3)' : 'rgba(94,106,210,0.2)'}`,
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#5e6ad2',
              boxShadow: '0 0 6px rgba(94,106,210,0.8)',
              animation: 'pulse-dot 2s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              color: '#5e6ad2',
              letterSpacing: '0.02em',
            }}>
              {t.badge}
            </span>
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '18px',
            fontWeight: 400,
            color: isDark ? '#8a8f98' : '#6b7280',
            marginBottom: '12px',
            letterSpacing: '-0.01em',
          }}
        >
          {t.greeting}
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(52px, 8vw, 96px)',
            fontWeight: 800,
            color: isDark ? '#ffffff' : '#3b3b3bff',
            letterSpacing: '-0.04em',
            lineHeight: 1.2,
            marginBottom: '16px'
          }}
        >
          {t.name}
        </motion.h1>

        {/* Animated Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '32px',
            height: '48px',
          }}
        >
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(20px, 3vw, 28px)',
            fontWeight: 500,
            color: isDark ? '#8a8f98' : '#6b7280',
            letterSpacing: '-0.02em',
          }}>
            {displayed}
            <span style={{
              display: 'inline-block',
              width: '2px',
              height: '1em',
              background: '#5e6ad2',
              marginLeft: '2px',
              verticalAlign: 'middle',
              animation: 'blink-cursor 1s step-end infinite',
            }} />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(16px, 2vw, 18px)',
            fontWeight: 400,
            color: isDark ? '#8a8f98' : '#6b7280',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto 48px',
            letterSpacing: '-0.01em',
          }}
        >
          {t.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.button
            onClick={() => scrollTo('#work')}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 24px',
              borderRadius: '10px',
              background: isDark
                ? 'linear-gradient(135deg, #5e6ad2, #7c3aed)'
                : 'linear-gradient(135deg, #5e6ad2, #7c3aed)',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              color: '#fff',
              letterSpacing: '-0.01em',
              boxShadow: '0 4px 20px rgba(94,106,210,0.35)',
              transition: 'box-shadow 0.2s ease',
            }}
          >
            {t.cta}
            <ArrowRight size={15} />
          </motion.button>

          <motion.button
            onClick={() => downloadCV()}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 24px',
              borderRadius: '10px',
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              color: isDark ? '#fff' : '#0a0a0a',
              letterSpacing: '-0.01em',
            }}
          >
            <Download size={15} />
            {t.downloadCV}
          </motion.button>

          <motion.button
            onClick={() => scrollTo('#contact')}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 24px',
              borderRadius: '10px',
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              color: isDark ? '#fff' : '#0a0a0a',
              letterSpacing: '-0.01em',
            }}
          >
            {t.ctaSecondary}
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            style={{
              width: '22px',
              height: '36px',
              borderRadius: '11px',
              border: `2px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '6px',
            }}
          >
            <div style={{
              width: '3px',
              height: '8px',
              borderRadius: '2px',
              background: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
            }} />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 6px rgba(94,106,210,0.8); }
          50% { box-shadow: 0 0 12px rgba(94,106,210,1); }
        }
      `}</style>
    </section>
  );
}
