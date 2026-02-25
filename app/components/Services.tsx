import React from 'react';
import { motion } from 'motion/react';
import { Code2, Palette, Layers, MonitorPlay, BarChart2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={20} />,
  Palette: <Palette size={20} />,
  Layers: <Layers size={20} />,
  MonitorPlay: <MonitorPlay size={20} />,
  Accessibility: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="4" r="1" /><path d="m18 19 1-7-6 1" /><path d="m5 8 3-3 5.5 3-2.36 3.5" /><path d="M4.24 14.5a5 5 0 0 0 6.88 6" /><path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
    </svg>
  ),
  BarChart2: <BarChart2 size={20} />,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export function Services() {
  const { isDark, language } = useApp();
  const t = translations[language].services;

  const cardBg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
  const cardHoverBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';

  return (
    <section id="services" style={{ padding: '120px 24px', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
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
              Services
            </span>
            <div style={{ flex: 1, height: '1px', background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', maxWidth: '40px' }} />
          </div>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 700,
            color: isDark ? '#fff' : '#0a0a0a',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '16px',
          }}>
            {t.title}
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            color: isDark ? '#8a8f98' : '#6b7280',
            maxWidth: '480px',
            lineHeight: 1.6,
            letterSpacing: '-0.01em',
          }}>
            {t.subtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1px',
            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
            borderRadius: '16px',
            overflow: 'hidden',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'}`,
          }}
        >
          {t.items.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isDark={isDark}
              cardBg={cardBg}
              cardHoverBg={cardHoverBg}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service, isDark, cardBg, cardHoverBg }: {
  service: any;
  isDark: boolean;
  cardBg: string;
  cardHoverBg: string;
}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '32px',
        background: hovered ? cardHoverBg : cardBg,
        cursor: 'default',
        transition: 'background 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Hover glow */}
      {hovered && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(94,106,210,0.5), transparent)',
        }} />
      )}

      {/* Icon */}
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        background: hovered
          ? 'linear-gradient(135deg, rgba(94,106,210,0.2), rgba(139,92,246,0.2))'
          : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'),
        border: `1px solid ${hovered ? 'rgba(94,106,210,0.3)' : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)')}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        color: hovered ? '#5e6ad2' : (isDark ? '#8a8f98' : '#6b7280'),
        transition: 'all 0.2s ease',
      }}>
        {iconMap[service.icon]}
      </div>

      <h3 style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '15px',
        fontWeight: 600,
        color: isDark ? '#fff' : '#0a0a0a',
        letterSpacing: '-0.02em',
        marginBottom: '10px',
        lineHeight: 1.3,
      }}>
        {service.title}
      </h3>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        color: isDark ? '#8a8f98' : '#6b7280',
        lineHeight: 1.65,
        letterSpacing: '-0.005em',
      }}>
        {service.description}
      </p>
    </motion.div>
  );
}