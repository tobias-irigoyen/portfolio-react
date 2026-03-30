import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

export function TechStack() {
  const { isDark, language } = useApp();
  const t = translations[language].stack;

  return (
    <section id="stack" className="!py-[120px] !px-6 relative">
      <div className="!max-w-[1200px] !mx-auto">
        {/* Header */}
        <div
          className="text-center !mb-[72px]"
        >
          <div className="flex items-center justify-center gap-2 !mb-4">
            <div className={`h-px w-10 ${isDark ? "bg-white/10" : "bg-black/10"}`} />
            
            <span className="font-[Inter,sans-serif] text-[12px] font-semibold text-[#5e6ad2] tracking-[0.1em] uppercase">
              Stack
            </span>

            <div className={`h-px w-10 ${isDark ? "bg-white/10" : "bg-black/10"}`} />
          </div>

          <h2
            className={`
              font-[Inter,sans-serif] text-[clamp(32px,5vw,52px)] font-bold tracking-[-0.03em] leading-[1.1] !mb-[14px]
              ${isDark ? "text-white" : "text-[#0a0a0a]"}
            `}
          >
            {t.title}
          </h2>

          <p
            className={`
              font-[Inter,sans-serif] text-[16px] tracking-[-0.01em]
              ${isDark ? "text-[#8a8f98]" : "text-gray-500"}
            `}
          >
            {t.subtitle}
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-col !gap-10 !mx-auto max-w-[75%]">
          {t.categories.map((category, catIndex) => (
            <div
              key={category.name}
              className="flex items-start gap-8 flex-wrap max-[440px]:flex-col max-[440px]:items-start max-[440px]:gap-4"
            >
              {/* Category label */}
              <div className="min-w-[160px] pt-2">
                <span
                  className={`
                    font-[Inter,sans-serif] text-[12px] font-semibold tracking-[0.08em] uppercase
                    ${isDark ? "text-white" : "text-[#1a1a1a]"}
                  `}
                >
                  {category.name}
                </span>
              </div>

              {/* Divider */}
              <div
                className={`
                  w-px self-stretch min-h-[30px] shrink-0 ${isDark ? "bg-white/[0.08]" : "bg-black/[0.08]"} max-[440px]:hidden`}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 flex-1">
                {category.items.map((item, itemIndex) => (
                  <TechBadge
                    key={item}
                    label={item}
                    isDark={isDark}
                    delay={catIndex * 0.08 + itemIndex * 0.04}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`
            !mt-16 h-px origin-left
            ${isDark
              ? "bg-[linear-gradient(90deg,transparent,rgba(94,106,210,0.5),rgba(139,92,246,0.5),transparent)]"
              : "bg-[linear-gradient(90deg,transparent,rgba(94,106,210,0.3),rgba(139,92,246,0.3),transparent)]"}
          `}
        />
      </div>
    </section>
  );
}

  function TechBadge({label, isDark, delay}: { label: string; isDark: boolean; delay: number;}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        !px-[14px] !py-[6px] rounded-lg text-[13px] font-medium
        font-[Inter,sans-serif] tracking-[-0.01em]
        select-none cursor-default
        ${hovered
          ? "bg-[linear-gradient(135deg,rgba(94,106,210,0.15),rgba(139,92,246,0.15))] border border-[rgba(94,106,210,0.4)] text-[#5e6ad2]"
          : `${isDark 
              ? "bg-white/5 border border-white/[0.08] text-[#c4c6cc]" 
              : "bg-black/[0.04] border border-black/[0.08] text-gray-700"}`
        }
      `}
    >
      {label}
    </motion.div>
  );
}