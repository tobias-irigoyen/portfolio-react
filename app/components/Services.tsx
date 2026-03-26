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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="16" cy="4" r="1" />
      <path d="m18 19 1-7-6 1" />
      <path d="m5 8 3-3 5.5 3-2.36 3.5" />
      <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
      <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
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

  return (
    <section id="services" className="!py-[120px] !px-6 relative">
      <div className="max-w-[1200px] !mx-auto">
        
        {/* Header */}|
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="!mb-16"
        >
          <div className="flex items-center gap-2 !mb-4">
            <span className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#5e6ad2]">
              Services
            </span>
            <div className={`flex-1 h-px max-w-[40px] ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
          </div>

          <h2 className={`font-bold leading-[1.1] !mb-4 tracking-[-0.03em]
            text-[clamp(32px,5vw,52px)]
            ${isDark ? 'text-white' : 'text-[#0a0a0a]'}
          `}>
            {t.title}
          </h2>

          <p className={`text-[16px] max-w-[480px] leading-[1.6] tracking-[-0.01em]
            ${isDark ? 'text-[#8a8f98]' : 'text-gray-500'}
          `}>
            {t.subtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className={`
            grid gap-[1px] rounded-[16px] overflow-hidden
            [grid-template-columns:repeat(auto-fill,minmax(320px,1fr))]
            ${isDark ? 'bg-white/5 border border-white/10' : 'bg-black/10 border border-black/10'}
          `}
        >
          {t.items.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isDark={isDark}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

function ServiceCard({ service, isDark }: {
  service: any;
  isDark: boolean;
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
      className={`
        relative overflow-hidden !p-8 cursor-default transition-all duration-200
        ${hovered
          ? (isDark ? 'bg-white/5' : 'bg-black/5')
          : (isDark ? 'bg-white/[0.03]' : 'bg-black/[0.02]')
        }
      `}
    >
      {/* Glow */}
      {hovered && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5e6ad2]/50 to-transparent" />
      )}

      {/* Icon */}
      <div className={`
        w-10 h-10 rounded-[10px] flex items-center justify-center !mb-5 transition-all duration-200
        ${hovered
          ? 'bg-gradient-to-br from-[#5e6ad2]/20 to-[#8b5cf6]/20 border border-[#5e6ad2]/30 text-[#5e6ad2]'
          : `${isDark
              ? 'bg-white/10 border border-white/10 text-[#8a8f98]'
              : 'bg-black/5 border border-black/10 text-gray-500'}`
        }
      `}>
        {iconMap[service.icon]}
      </div>

      <h3 className={`text-[15px] font-semibold !mb-2.5 leading-[1.3] tracking-[-0.02em]
        ${isDark ? 'text-white' : 'text-[#0a0a0a]'}
      `}>
        {service.title}
      </h3>

      <p className={`text-[14px] leading-[1.65] tracking-[-0.005em] whitespace-pre-line
        ${isDark ? 'text-[#8a8f98]' : 'text-gray-500'}
      `}>
        {service.description}
      </p>
    </motion.div>
  );
}