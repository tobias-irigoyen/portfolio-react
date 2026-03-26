import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Mail,
  MapPin,
  Clock,
  Zap,
  Send,
  CheckCircle,
  MessageCircleX,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { translations } from "../data/translations";

export function Contact() {
  const { isDark, language } = useApp();
  const t = translations[language].contact;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [focused, setFocused] = useState<string | null>(null);

  // Function to get current status based on GMT-3 time
  const getCurrentStatus = () => {
    const now = new Date();
    // Convert to GMT-3
    const gmt3Time = new Date(
      now.toLocaleString("en-US", {
        timeZone: "America/Argentina/Buenos_Aires",
      }),
    );
    const hours = gmt3Time.getHours();

    // Set status based on time: 'Inactive' after 20:00 and 'Active' before
    return hours >= 22 ? t.inactiveStatus : t.activeStatus;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) return;

    try {
      setStatus("sending");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        throw new Error("Error sending email");
      }
    } catch (error) {
      console.error("Resend error:", error);
      setStatus("idle");
      alert("Hubo un error enviando el mensaje.");
    }
  };

  const inputStyle = (field: string) => ({
    border: `1px solid ${
      focused === field
        ? "rgba(94,106,210,0.5)"
        : isDark
          ? "rgba(255,255,255,0.1)"
          : "rgba(0,0,0,0.1)"
    }`,
    boxShadow: focused === field ? "0 0 0 3px rgba(94,106,210,0.12)" : "none",
    resize: "none" as const,
    boxSizing: "border-box" as const,
  });

  const labelStyle = {
    display: "block",
    fontFamily: "Inter, sans-serif",
    fontSize: "12px",
    fontWeight: 600,
    color: isDark ? "#8a8f98" : "#6b7280",
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    marginBottom: "8px",
  };

  const infoItems = [
    {
      icon: <Mail size={16} />,
      label: t.info.emailLabel,
      value: t.info.emailValue,
      subject: t.info.emailSubject,
    },
    {
      icon: <MapPin size={16} />,
      label: t.info.locationLabel,
      value: t.info.locationValue,
    },
    {
      icon: <Clock size={16} />,
      label: t.info.responseLabel,
      value: t.info.responseValue,
    },
    {
      icon:
        getCurrentStatus() === t.activeStatus ? (
          <Zap size={16} />
        ) : (
          <MessageCircleX size={16} />
        ),
      label: t.info.statusLabel,
      value: getCurrentStatus(),
      accent: true,
    },
  ];

  return (
    <section id="contact" className="!py-[120px] !px-[24px] relative">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="!mb-[64px]"
        >
          <div className="flex items-center gap-[8px] !mb-[16px]">
            <span
              className="text-[12px] font-semibold text-[#5e6ad2] uppercase tracking-[0.1em]"
              style={{
                fontFamily: "Inter, sans-serif",
              }}
            >
              Contact
            </span>
            <div
              className={`h-[1px] w-[40px] ${
                isDark ? "bg-[rgba(255,255,255,0.1)]" : "bg-[rgba(0,0,0,0.1)]"
              }`}
            />
          </div>
          <h2
            className={`font-sans font-[700] tracking-[-0.03em] leading-[1.1] !mb-[14px] text-[clamp(32px,5vw,52px)] ${isDark ? "text-white" : "text-[#0a0a0a]"}`}
          >
            {t.title}
          </h2>
          <p
            className={`font-sans text-[16px] leading-[1.6] tracking-[-0.01em] max-w-[480px] whitespace-pre-line ${isDark ? "text-[#8a8f98]" : "text-[#6b7280]"}`}
          >
            {t.subtitle}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div
          className={`grid gap-[40px] items-start grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] contact-grid`}
        >
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
          >
            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`rounded-[16px] p-[48px_32px] text-center border ${isDark ? "bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)]" : "bg-[rgba(0,0,0,0.02)] border-[rgba(0,0,0,0.08)]"}`}
              >
                <div className="w-[56px] h-[56px] rounded-full bg-[rgba(94,210,130,0.15)] flex items-center justify-center mx-auto !mb-[20px] text-[#5ed282]">
                  <CheckCircle size={28} />
                </div>
                <p
                  className="font-sans font-[700] text-[20px] tracking-[-0.02em] !mb-[8px]"
                  style={{
                    color: isDark ? "#fff" : "#0a0a0a",
                  }}
                >
                  {t.sent}
                </p>
                <p
                  className="font-sans text-[14px]"
                  style={{
                    color: isDark ? "#8a8f98" : "#6b7280",
                  }}
                >
                  {t.info.responseValue}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className={`mt-[24px] !px-[20px] !py-[9px] rounded-[8px] cursor-pointer font-sans text-[13px] font-[500] ${isDark ? "bg-white/10 border border-white/10 text-[#8a8f98]" : "bg-black/5 border border-black/10 text-gray-500"}`}
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div
                  className={`p-8 rounded-2xl flex flex-col gap-5 ${isDark ? "bg-white/[0.02] border border-white/[0.08]" : "bg-black/[0.02] border border-black/[0.08]"}`}
                >
                  <div className="grid grid-cols-2 gap-4 form-row">
                    <div>
                      <label htmlFor="name-input" style={labelStyle}>
                        {t.name}
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        placeholder={t.namePlaceholder}
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        style={inputStyle("name")}
                        className={`w-full !px-4 !py-3 rounded-[10px] font-sans text-[14px] outline-none transition-colors duration-200 ${isDark ? "bg-[rgba(255,255,255,0.04)] text-white" : "bg-[rgba(0,0,0,0.03)] text-[#0a0a0a]"}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="email-input" style={labelStyle}>
                        {t.email}
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        placeholder={t.emailPlaceholder}
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        style={inputStyle("email")}
                        className={`w-full !px-4 !py-3 rounded-[10px] font-sans text-[14px] outline-none transition-colors duration-200 ${isDark ? "bg-[rgba(255,255,255,0.04)] text-white" : "bg-[rgba(0,0,0,0.03)] text-[#0a0a0a]"}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="textarea-input" style={labelStyle}>
                      {t.message}
                    </label>
                    <textarea
                      id="textarea-input"
                      placeholder={t.messagePlaceholder}
                      rows={6}
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("message")}
                      className={`w-full !px-4 !py-3 rounded-[10px] font-sans text-[14px] outline-none transition-colors duration-200 ${isDark ? "bg-[rgba(255,255,255,0.04)] text-white" : "bg-[rgba(0,0,0,0.03)] text-[#0a0a0a]"}`}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileTap={{ scale: 0.99 }}
                    className={`flex items-center justify-center gap-2 w-full !p-[14px] rounded-[10px] border border-transparent hover:border-[#bbb9ff] !transition-all !duration-[300ms] text-white text-sm font-[650] tracking-[-0.01em] shadow-[0_4px_20px_rgba(94,106,210,0.3)] transition-colors duration-200 ${ status === "sending" ? `cursor-not-allowed ${isDark ? "bg-[rgba(94,106,210,0.5)]" : "bg-[rgba(94,106,210,0.4)]"}` : "cursor-pointer bg-gradient-to-br from-[#5e6ad2] to-[#7c3aed]"}`}>
                    {status === "sending" ? (
                      <>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          style={{ animation: "spin 1s linear infinite" }}
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="rgba(255,255,255,0.3)"
                            strokeWidth="3"
                          />
                          <path
                            d="M12 2a10 10 0 0 1 10 10"
                            stroke="#fff"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>
                        {t.sending}
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        {t.send}
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-[12px]"
          >
            {infoItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={`flex items-center gap-[16px] !py-[18px] !px-[20px] rounded-xl border ${isDark ? "bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.07)]" : "bg-[rgba(0,0,0,0.02)] border-[rgba(0,0,0,0.07)]"}`}
              >
                <div
                  className="w-[36px] h-[36px] rounded-[9px] flex-shrink-0 flex items-center justify-center"
                  style={{
                    background:
                      getCurrentStatus() === t.activeStatus && item.accent
                        ? "rgba(20, 156, 63, 0.2)"
                        : getCurrentStatus() === t.inactiveStatus && item.accent
                          ? "rgba(223, 39, 39, 0.2)"
                          : "rgba(3, 26, 233, 0.09)",
                    color:
                      getCurrentStatus() === t.activeStatus && item.accent
                        ? "#5ed282"
                        : getCurrentStatus() === t.inactiveStatus && item.accent
                          ? "#da1b1bff"
                          : "#5e6ad2",
                    border:
                      getCurrentStatus() === t.activeStatus && item.accent
                        ? "1px solid #5ed282"
                        : getCurrentStatus() === t.inactiveStatus && item.accent
                          ? "1px solid #e44747"
                          : "1px solid #8087ceff",
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p
                    className={`font-sans text-[11px] font-semibold tracking-[0.08em] uppercase !mb-[3px] ${isDark ? "text-[#8a8f98]" : "text-[#606266ff]"}`}
                  >
                    {item.label}
                  </p>
                  {item.subject ? (
                    <a
                      href={`mailto:${item.value}?subject=${item.subject}`}
                      className="font-sans text-[14px] font-[500] tracking-[-0.01em] no-underline"
                      style={{
                        color:
                          getCurrentStatus() === t.activeStatus && item.accent
                            ? "#5ed282"
                            : getCurrentStatus() === t.inactiveStatus &&
                                item.accent
                              ? "#e44747ff"
                              : isDark
                                ? "#8a8f98"
                                : "#6b6e72ff",
                      }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p
                      className="font-sans text-[14px] font-[500] tracking-[-0.01em]"
                      style={{
                        color:
                          getCurrentStatus() === t.activeStatus && item.accent
                            ? "#5ed282"
                            : getCurrentStatus() === t.inactiveStatus &&
                                item.accent
                              ? "#e44747ff"
                              : isDark
                                ? "#8a8f98"
                                : "#6b6e72ff",
                      }}
                    >
                      {item.value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
        input::placeholder, textarea::placeholder {
          color: ${isDark ? "rgba(138,143,152,0.6)" : "rgba(107,114,128,0.6)"};
        }
      `}</style>
    </section>
  );
}
