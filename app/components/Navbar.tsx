import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Menu, X, Globe } from 'lucide-react';
import { useApp, Language } from '../context/AppContext';
import { translations } from '../data/translations';

export function Navbar() {
  const { isDark, toggleTheme, language, setLanguage } = useApp();
  const t = translations[language].nav;

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const langSelector = document.querySelector('[data-lang-selector]');
      if (langOpen && langSelector && !langSelector.contains(target)) {
        setLangOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langOpen]);

  const navLinks = [
    { label: t.services, href: '#services', id: 'services' },
    { label: t.stack, href: '#stack', id: 'stack' },
    { label: t.work, href: '#work', id: 'work' },
    { label: t.testimonials, href: '#testimonials', id: 'testimonials' },
    { label: t.contact, href: '#contact', id: 'contact' },
  ];

  const scrollTo = (href: string, sectionId: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setMobileOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`
          fixed top-0 left-0 right-0 z-[100]
          transition-all duration-300
          ${scrolled
            ? isDark
              ? "bg-black/85 backdrop-blur-xl border-b border-white/10"
              : "bg-white/85 backdrop-blur-xl border-b border-black/10"
            : "bg-transparent border-b border-transparent"}
        `}
      >
        <div className="max-w-[1200px] !mx-auto !px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ opacity: 0.8 }}
              className="flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#5e6ad2] to-[#8b5cf6] flex items-center justify-center">
                <span className="text-white text-[13px] font-bold font-[Inter,sans-serif]">T</span>
              </div>
              <span className={`font-semibold text-[15px] tracking-[-0.01em] font-[Inter,sans-serif]
                ${isDark ? "text-white" : "text-black"}`}>
                Tobías Irigoyen
              </span>
            </motion.button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map(link => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href, link.id)}
                    className={`
                      !px-3 !py-1.5 rounded-md cursor-pointer text-sm tracking-[-0.01em] font-[Inter,sans-serif]
                      transition-all duration-200
                      ${isActive
                        ? isDark ? "text-white font-semibold" : "text-black font-semibold"
                        : isDark ? "text-[#8a8f98]" : "text-gray-500"}
                      hover:underline hover:${isDark ? "text-white" : "text-black"}
                    `}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">

              {/* Language */}
              <div className="relative" data-lang-selector>
                <motion.button
                  onClick={() => setLangOpen(p => !p)}
                  whileHover={{ opacity: 0.8 }}
                  className={`
                    flex items-center gap-1 !px-2.5 !py-1.5 rounded-lg border text-[13px]
                    ${isDark
                      ? "bg-white/5 border-white/10 text-[#8a8f98]"
                      : "bg-black/5 border-black/10 text-gray-500"}
                  `}
                >
                  <Globe size={13} />
                  <span>{language.toUpperCase()}</span>
                </motion.button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      className={`
                        absolute right-0 !mt-2 p-1 rounded-xl border shadow-xl z-[200]
                        ${isDark
                          ? "bg-[#111] border-white/10"
                          : "bg-white border-black/10"}
                      `}
                    >
                      {(['en', 'es'] as Language[]).map(lang => (
                        <button
                          key={lang}
                          onClick={() => { setLanguage(lang); setLangOpen(false); }}
                          className={`
                            flex items-center gap-2 w-full text-left !px-3 !py-2 rounded-md text-sm
                            ${language === lang
                              ? "text-[#5e6ad2]"
                              : isDark ? "text-[#8a8f98]" : "text-gray-500"}
                            hover:bg-black/10
                          `}
                        >
                          <span>{lang === 'en' ? '🇺🇸' : '🇪🇸'}</span>
                          <span>{lang === 'en' ? 'English' : 'Español'}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme */}
              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.95 }}
                className={`
                  w-9 h-9 flex items-center justify-center rounded-lg border
                  ${isDark
                    ? "bg-white/5 border-white/10 text-[#8a8f98]"
                    : "bg-black/5 border-black/10 text-gray-500"}
                `}
              >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
              </motion.button>

              {/* Mobile */}
              <motion.button
                onClick={() => setMobileOpen(p => !p)}
                whileTap={{ scale: 0.95 }}
                className={`
                  md:hidden w-9 h-9 flex items-center justify-center rounded-lg border
                  ${isDark
                    ? "bg-white/5 border-white/10 text-white"
                    : "bg-black/5 border-black/10 text-black"}
                `}
              >
                {mobileOpen ? <X size={16} /> : <Menu size={16} />}
              </motion.button>

            </div>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`
              fixed top-16 left-0 right-0 z-[99] !px-6 pb-6 pt-4 border-b backdrop-blur-xl
              ${isDark
                ? "bg-black/95 border-white/10"
                : "bg-white/95 border-black/10"}
            `}
          >
            {navLinks.map(link => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href, link.id)}
                  className={`
                    w-full text-left !py-3 border-b text-[16px] cursor-pointer  ${isDark ? "border-white/10 text-white" : "border-black/10 text-black"}
                    ${isActive ? "font-semibold" : "font-medium"}
                  `}
                >
                  {link.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}