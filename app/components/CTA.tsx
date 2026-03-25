import { motion } from "motion/react";
import { ArrowRight, Download } from "lucide-react";
import { useApp } from "../context/AppContext";
import { translations } from "../data/translations";

export function CTA() {
  const { isDark, language } = useApp();
  const t = translations[language].cta;

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href =
      language === "es"
        ? "/Tobías Irigoyen - CV.pdf"
        : "/Tobías Irigoyen - Resume.pdf";
    link.download =
      language === "es"
        ? "Tobías Irigoyen - CV.pdf"
        : "Tobías Irigoyen - Resume.pdf";
    link.click();
  };

  const lines = t.title.split("\n");

  return (
    <section
      style={{ padding: "80px 24px", position: "relative", overflow: "hidden" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`rounded-3xl relative overflow-hidden text-center !p-[clamp(48px,8vw,96px)] !px-[clamp(32px,6vw,80px)] border ${isDark ? "border-[rgba(94,106,210,0.2)]" : "border-[rgba(94,106,210,0.15)]"}`}
          style={{
            background: isDark
              ? "linear-gradient(135deg, #0d0f2a 0%, #0a0a0a 50%, #150d24 100%)"
              : "linear-gradient(135deg, #eef0ff 0%, #f9f9f9 50%, #f0ebff 100%)",
          }}
        >
          {/* Background mesh gradients */}
          <div
            className="absolute pointer-events-none top[-40%] left-[-20%] w-[60%] h-[200%]"
            style={{
              background: isDark
                ? "radial-gradient(ellipse, rgba(94,106,210,0.15) 0%, transparent 60%)"
                : "radial-gradient(ellipse, rgba(94,106,210,0.1) 0%, transparent 60%)",
            }}
          />
          <div
            className="absolute pointer-events-none top[-40%] left-[-20%] w-[60%] h-[200%]"
            style={{
              background: isDark
                ? "radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 60%)"
                : "radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 60%)",
            }}
          />

          {/* Grid overlay */}
          <div
            className="absolute pointer-events-none bg-[length:48px_48px] inset-0"
            style={{
              backgroundImage: isDark
                ? `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`
                : `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <h2
              className="!mb-6 tracking-[-0.04em] leading-[1] text-[clamp(44px,7vw,88px)] font-extrabold"
              style={{
                fontFamily: "Inter, sans-serif"
              }}
            >
              {lines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <p
              className={`text-[clamp(15px,7vw,18px)] text-center max-w-[520px] leading-[1.65] tracking-[-0.01em] !mx-auto !mb-10 whitespace-pre-line ${isDark ? "text-[#8a8f98]" : "text-[#6b7280]"}`}
            >
              {t.description}
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <motion.button
                onClick={() => scrollTo("#contact")}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 !px-[28px] !py-[14px] rounded-[11px] bg-gradient-to-br from-[#5e6ad2] to-[#7c3aed] cursor-pointer font-sans text-[15px] font-[650] text-white tracking-[-0.01em] shadow-[0_8px_32px_rgba(94,106,210,0.4)] border border-transparent hover:border-[#bbb9ff] transition-colors duration-300 max-[512px]:!mb-4"
              >
                {t.button}
                <ArrowRight size={16} />
              </motion.button>

              <motion.button
                onClick={() => downloadCV()}
                whileTap={{ scale: 0.98 }}
                className={`inline-flex items-center gap-2 !px-[28px] !py-[14px] rounded-[11px] cursor-pointer font-sans text-[15px] font-[650] tracking-[-0.01em] transition-all duration-300 ${isDark ? "bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)] text-white hover:bg-[#000] hover:border-[#6d6d6dff]" : "bg-[rgba(0,0,0,0.06)] border border-[rgba(0,0,0,0.1)] text-[#0a0a0a] hover:bg-black hover:text-white hover:border-[#6d6d6dff]"}`}
              >
                <Download size={15} />
                {t.buttonSecondary}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
