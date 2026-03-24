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

  const sectionIdMap: Record<Language, Record<string, string>> = {
    en: {
      services: 'services',
      stack: 'stack',
      work: 'work',
      testimonials: 'testimonials',
      contact: 'contact',
    },
    es: {
      servicios: 'services',
      stack: 'stack',
      trabajos: 'work',
      resenas: 'testimonials',
      contacto: 'contact',
    },
  };

  const slugToIdMap: Record<string, string> = {
    services: 'services',
    servicios: 'services',
    stack: 'stack',
    work: 'work',
    trabajos: 'work',
    testimonials: 'testimonials',
    resenas: 'testimonials',
    contact: 'contact',
    contacto: 'contact',
  };

  // Scroll to section on page load if slug exists
  useEffect(() => {
    const path = window.location.pathname.replace('/', '');
    if (path && slugToIdMap[path]) {
      const sectionId = slugToIdMap[path];
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'auto' });
        }, 100);
      }
    }
  }, []);

  // Intersection Observer for active section tracking
  useEffect(() => {
    const sections = ['services', 'stack', 'work', 'testimonials', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        // Get all intersecting entries
        const intersectingEntries = entries.filter(entry => 
          entry.isIntersecting && entry.intersectionRatio >= 0.1
        );
        
        if (intersectingEntries.length > 0 && window.scrollY > 100) {
          // Find the entry with the highest intersection ratio
          const mostVisibleEntry = intersectingEntries.reduce((prev, current) => 
            prev.intersectionRatio > current.intersectionRatio ? prev : current
          );
          
          setActiveSection(mostVisibleEntry.target.id);
          const slug = sectionIdMap[language][mostVisibleEntry.target.id] || mostVisibleEntry.target.id;
          window.history.replaceState(null, '', `/${slug}`);
        }
      },
      {
        threshold: [0.1, 0.3, 0.5],
        rootMargin: '-100px 0px -50% 0px'
      }
    );

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    const handleScroll = () => {
      if (window.scrollY <= 100) {
        setActiveSection('');
        window.history.replaceState(null, '', '/');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [language]);

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
    const slug = sectionIdMap[language][sectionId] || sectionId;
    window.history.replaceState(null, '', `/${slug}`);
    setMobileOpen(false);
  };

  const bg = isDark
    ? scrolled ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0)'
    : scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0)';

  const borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          background: bg,
          borderBottom: `1px solid ${scrolled ? borderColor : 'transparent'}`
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
            {/* Logo */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ opacity: 0.8 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ color: '#fff', fontSize: '13px', fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>T</span>
              </div>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '15px',
                color: isDark ? '#fff' : '#0a0a0a',
                letterSpacing: '-0.01em',
              }}>
                Tobías Irigoyen
              </span>
            </motion.button>

            {/* Desktop Nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="hidden-mobile">
              {navLinks.map(link => {
                const sectionId = link.id;
                const isActive = activeSection === sectionId;
                return (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollTo(link.href, link.id)}
                    whileHover={{ opacity: 1 }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: isActive ? '600' : '450',
                      color: isActive ? (isDark ? '#fff' : '#000') : (isDark ? '#8a8f98' : '#6b7280'),
                      letterSpacing: '-0.01em',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = isDark ? '#fff' : '#000', e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={e => (e.currentTarget.style.color = isActive ? (isDark ? '#fff' : '#000') : (isDark ? '#8a8f98' : '#6b7280'), e.currentTarget.style.textDecoration = 'none')}
                  >
                    {link.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Right controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Language Selector */}
              <div style={{ position: 'relative' }} data-lang-selector>
                <motion.button
                  title={language === 'en' ? 'Select site language' : 'Elegí el idioma del sitio'}
                  onClick={() => setLangOpen(p => !p)}
                  whileHover={{ opacity: 0.8 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    padding: '6px 10px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: isDark ? '#8a8f98' : '#6b7280',
                  }}
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
                      transition={{ duration: 0.15 }}
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        right: 0,
                        background: isDark ? '#111' : '#fff',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                        borderRadius: '10px',
                        padding: '4px',
                        minWidth: '90px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                        zIndex: 200,
                        width: 'max-content'
                      }}
                    >
                      {(['en', 'es'] as Language[]).map(lang => (
                        <button
                          title={lang === 'en' ? 'Switch to English' : 'Switch to Spanish'}
                          key={lang}
                          onClick={() => { setLanguage(lang); setLangOpen(false); }}
                          style={{
                            display: 'block',
                            width: '100%',
                            textAlign: 'left',
                            padding: '7px 10px',
                            background: language === lang
                              ? (isDark ? 'rgba(94,106,210,0.2)' : 'rgba(94,106,210,0.1)')
                              : 'transparent',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13px',
                            fontWeight: 500,
                            color: language === lang ? '#5e6ad2' : (isDark ? '#8a8f98' : '#6b7280'),
                          }}
                        >
                          <>
                            <span className="!mr-2">{lang === 'en' ? '🇺🇸' : '🇪🇸'}</span>
                            <span className="!mr-2">{lang === 'en' ? 'English' : 'Español'}</span>
  </>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <motion.button
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                onClick={toggleTheme}
                whileHover={{ opacity: 0.8 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: isDark ? '#8a8f98' : '#6b7280',
                }}
              >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
              </motion.button>

              {/* Mobile Menu */}
              <motion.button
                onClick={() => setMobileOpen(p => !p)}
                whileTap={{ scale: 0.95 }}
                className="show-mobile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: isDark ? '#fff' : '#0a0a0a',
                }}
              >
                {mobileOpen ? <X size={16} /> : <Menu size={16} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '64px',
              left: 0,
              right: 0,
              zIndex: 99,
              background: isDark ? 'rgba(0,0,0,0.96)' : 'rgba(255,255,255,0.96)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
              padding: '16px 24px 24px',
            }}
          >
            {navLinks.map((link) => {
                const sectionId = link.id;
                const isActive = activeSection === sectionId;
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href, link.id)}
                    style={{
                      paddingBottom: '4px',
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '12px 0',
                      background: 'none',
                      border: 'none',
                      borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '16px',
                      fontWeight: 500,
                      color: isActive ? (isDark ? '#fff' : '#000') : (isDark ? '#fff' : '#0a0a0a'),
                    }}
                    >
                    {link.label}
                  </button>
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
