import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download } from 'lucide-react';
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
    link.href = language === 'es' ? '/Tobías Irigoyen - CV.pdf' : '/Tobías Irigoyen - Resume.pdf';
    link.download = link.href;
    link.click();
  };

  return (
    <section className="!min-h-screen flex items-center md:items-start justify-center relative overflow-hidden !pt-[120px] !pb-[80px] !px-6">
      
      {/* Gradient orbs */}
      <div className={`absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full pointer-events-none blur-[40px]
        ${isDark 
          ? "bg-[radial-gradient(circle,rgba(94,106,210,0.12)_0%,transparent_70%)]" 
          : "bg-[radial-gradient(circle,rgba(94,106,210,0.08)_0%,transparent_70%)]"}
      `} />

      <div className={`absolute bottom-[25%] right-[10%] w-[400px] h-[400px] rounded-full pointer-events-none blur-[40px]
        ${isDark 
          ? "bg-[radial-gradient(circle,rgba(139,92,246,0.1)_0%,transparent_70%)]" 
          : "bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_70%)]"}
      `} />

      <div className="max-w-[900px] w-full text-center relative z-10 max-[576px]:h-[80vh] h-[82vh]">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center !mb-8"
        >
          <div className={`inline-flex items-center !gap-1.5 !px-[14px] !py-[6px] rounded-full border
            ${isDark 
              ? "bg-[rgba(94,106,210,0.12)] border-[rgba(94,106,210,0.3)]" 
              : "bg-[rgba(94,106,210,0.08)] border-[rgba(94,106,210,0.2)]"}
          `}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#5e6ad2] shadow-[0_0_6px_rgba(94,106,210,0.8)] animate-pulse" />
            <span className="text-[12px] font-medium text-[#5e6ad2] tracking-[0.02em] font-[Inter,sans-serif]">
              {t.badge}
            </span>
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-[18px] !mb-3 tracking-[-0.01em] font-[Inter,sans-serif]
            ${isDark ? "text-[#8a8f98]" : "text-gray-500"}
          `}
        >
          {t.greeting}
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-[clamp(52px,8vw,96px)] font-extrabold tracking-[-0.04em] leading-[1.2] !mb-4 font-[Inter,sans-serif]
            ${isDark ? "text-white" : "text-[#3b3b3b]"}
          `}
        >
          {t.name}
        </motion.h1>

        {/* Role */}
        <motion.div className="flex items-center justify-center gap-2.5 !mb-8 h-[48px]">
          <span className={`text-[clamp(20px,3vw,28px)] tracking-[-0.02em] font-medium font-[Inter,sans-serif]
            ${isDark ? "text-[#8a8f98]" : "text-gray-500"}
          `}>
            {displayed}
            <span className="inline-block w-[2px] h-[1em] ml-[2px] align-middle bg-[#5e6ad2] animate-[blink_1s_step-end_infinite]" />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          className={`text-[clamp(16px,2vw,18px)] leading-[1.7] max-w-[560px] !mx-auto !mb-12 tracking-[-0.01em] font-[Inter,sans-serif]
            ${isDark ? "text-[#8a8f98]" : "text-gray-500"}
          `}
        >
          {t.description}
        </motion.p>

        {/* CTAs */}
        <motion.div className="flex gap-3 max-[576px]:gap-8 justify-center flex-wrap">
          
          <motion.button
            onClick={() => scrollTo('#work')}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 !px-6 !py-[13px] rounded-[10px] text-sm font-semibold text-white tracking-[-0.01em]
              bg-gradient-to-br from-[#5e6ad2] to-[#7c3aed]
              border border-transparent hover:border-[#bbb9ff]
              transition-all duration-300 cursor-pointer"
          >
            {t.cta}
            <ArrowRight size={15} />
          </motion.button>

          <motion.button
            onClick={downloadCV}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center gap-2 !px-6 !py-[13px] rounded-[10px] text-sm font-semibold tracking-[-0.01em]
              border transition-all duration-300 cursor-pointer
              ${isDark 
                ? "bg-white/5 border-white/10 text-white hover:bg-black hover:border-[#6d6d6d]" 
                : "bg-black/5 border-black/10 text-black hover:bg-black hover:text-white hover:border-[#6d6d6d]"}
            `}
          >
            <Download size={15} />
            {t.downloadCV}
          </motion.button>

        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          onClick={() => scrollTo('#services')}
          className="absolute left-1/2 bottom-[10px] md:bottom-[50px] -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className={`w-[22px] h-[36px] rounded-full border-2 flex justify-center !pt-1.5
              ${isDark ? "border-white/30" : "border-black/30"}
              group-hover:border-[#5e6ad2] transition-colors`}
          >
            <div className={`w-[3px] h-[8px] rounded-sm
              ${isDark ? "bg-white/30" : "bg-black/30"}
              group-hover:bg-[#5e6ad2] transition-colors`}
            />
          </motion.div>
        </motion.div>

      </div>

      <style>{`
        @keyframes blink {
          0%,100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}