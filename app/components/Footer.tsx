import React from 'react';
import { motion } from 'motion/react';
import { Github, Twitter, Linkedin, Dribbble } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

export function Footer() {
  const { isDark, language } = useApp();
  const t = translations[language].footer;
  const year = new Date().getFullYear();

  const links = [
    { icon: <Github size={16} />, href: 'https://github.com/tobias-irigoyen/', label: 'GitHub' },
    { icon: <Linkedin size={16} />, href: 'https://www.linkedin.com/in/tobiasirigoyen/', label: 'LinkedIn' }
  ];

  return (
    <footer style={{
      padding: '40px 24px',
      borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
      position: 'relative',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
      }}>
        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ color: '#fff', fontSize: '11px', fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>A</span>
          </div>
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            color: isDark ? '#8a8f98' : '#6b7280',
            letterSpacing: '-0.01em',
          }}>
            © {year} Tobías Irigoyen · {t.rights}
          </span>
        </div>

        {/* Center */}
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          color: isDark ? 'rgba(138,143,152,0.5)' : 'rgba(107,114,128,0.5)',
          letterSpacing: '-0.01em',
        }}>
          {t.builtWith}
        </span>

        {/* Right - Social */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {links.map(link => (
            <motion.a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              whileHover={{ y: -2 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                color: isDark ? '#8a8f98' : '#6b7280',
                textDecoration: 'none',
                transition: 'color 0.2s ease, background 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';
                e.currentTarget.style.color = isDark ? '#fff' : '#0a0a0a';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = isDark ? '#8a8f98' : '#6b7280';
              }}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
