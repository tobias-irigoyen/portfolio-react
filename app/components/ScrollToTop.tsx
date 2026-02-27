import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MoveUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

export function ScrollToTop() {
  const { isDark, language, setLanguage } = useApp();
  const t = translations[language].nav;
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      
      if (scrollPosition > heroHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    handleScroll();
    checkMobile(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      style={{
        position: 'fixed',
        bottom: isMobile ? '90px' : '24px',
        right: '24px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isMobile ? '0' : '8px',
        padding: isMobile ? '13px' : '13px 24px',
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
        transition: 'all 0.2s ease',
        zIndex: 1000,
        minWidth: isMobile ? 'auto' : 'auto',
      }}
    >
      <MoveUp size={15} />
      {!isMobile && t.goToTopTitle}
    </motion.button>
  );
}
