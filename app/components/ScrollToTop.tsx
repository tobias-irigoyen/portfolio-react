import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MoveUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

export function ScrollToTop() {
  const { isDark, language } = useApp();
  const t = translations[language].nav;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;

      setIsVisible(scrollPosition > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
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
      className="
        fixed right-6 z-[1000]
        inline-flex items-center justify-center
        rounded-[10px]
        font-semibold text-[14px] text-white
        tracking-[-0.01em]
        shadow-[0_4px_20px_rgba(94,106,210,0.35)]
        transition-all duration-200
        bg-gradient-to-br from-[#5e6ad2] to-[#7c3aed]

        bottom-[90px] !px-[13px] !py-[13px] gap-0
        md:bottom-6 md:!px-6 md:gap-2
        cursor-pointer 
      "
    >
      <MoveUp size={15} />
      <span className="hidden md:inline">{t.goToTopTitle}</span>
    </motion.button>
  );
}