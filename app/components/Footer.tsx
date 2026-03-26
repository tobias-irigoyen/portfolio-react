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
    <footer className={`!py-10 !px-6 relative ${isDark ? "border-t border-white/[0.06]" : "border-t border-black/[0.08]"}`}>
      <div className="max-w-[1200px] mx-auto flex items-center justify-between flex-wrap gap-5 max-[768px]:flex-col max-[768px]:text-center">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#5e6ad2] to-[#8b5cf6] flex items-center justify-center">
            <span className="text-white text-[11px] font-bold font-[Inter,sans-serif]">T</span>
          </div>
          <span className={`font-[Inter,sans-serif] text-[13px] tracking-[-0.01em] ${isDark ? "text-[#8a8f98]" : "text-gray-500"}`}>
            © {year} Tobías Irigoyen · {t.rights}
          </span>
        </div>

        {/* Center */}
        <span className={`font-[Inter,sans-serif] text-[12px] tracking-[-0.01em] ${isDark ? "text-[rgba(138,143,152,1)]" : "text-gray-500"}`}>
          {t.builtWith}
        </span>

        {/* Right - Social */}
        <div className="flex gap-1">
          {links.map(link => (
            <motion.a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              whileHover={{ y: -2 }}
              className={`flex items-center justify-center w-[34px] h-[34px] rounded-lg no-underline transition-colors duration-200 ${isDark ? "text-[#8a8f98]" : "text-gray-500"}`}
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
