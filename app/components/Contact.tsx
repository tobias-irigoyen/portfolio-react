import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Clock, Zap, Send, CheckCircle, MessageCircleX } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';
import emailjs from '@emailjs/browser';

export function Contact() {
  const { isDark, language } = useApp();
  const t = translations[language].contact;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [focused, setFocused] = useState<string | null>(null);

  // Function to get current status based on GMT-3 time
  const getCurrentStatus = () => {
    const now = new Date();
    // Convert to GMT-3
    const gmt3Time = new Date(now.toLocaleString("en-US", {timeZone: "America/Argentina/Buenos_Aires"}));
    const hours = gmt3Time.getHours();
    
    // Set status based on time: 'Inactive' after 20:00 and 'Active' before
    return hours >= 22 ? t.inactiveStatus : t.activeStatus;
  };

  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.message) return;

  try {
    setStatus('sending');

    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,  
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: form.name,
        email: form.email,
        message: form.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    setStatus('sent');
    setForm({ name: '', email: '', message: '' });

  } catch (error) {
    console.error('EmailJS error:', error);
    setStatus('idle');
    alert('Hubo un error enviando el mensaje.');
  }
};

  const testVars = () =>{

    console.log(import.meta.env);
  }

  const inputStyle = (field: string) => ({
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
    border: `1px solid ${focused === field
      ? 'rgba(94,106,210,0.5)'
      : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')}`,
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    color: isDark ? '#fff' : '#0a0a0a',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxShadow: focused === field ? '0 0 0 3px rgba(94,106,210,0.12)' : 'none',
    resize: 'none' as const,
    boxSizing: 'border-box' as const,
  });

  const labelStyle = {
    display: 'block',
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    fontWeight: 600,
    color: isDark ? '#8a8f98' : '#6b7280',
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    marginBottom: '8px',
  };

  const infoItems = [
    { icon: <Mail size={16} />, label: t.info.emailLabel, value: t.info.emailValue, subject: t.info.emailSubject },
    { icon: <MapPin size={16} />, label: t.info.locationLabel, value: t.info.locationValue },
    { icon: <Clock size={16} />, label: t.info.responseLabel, value: t.info.responseValue },
    { icon: getCurrentStatus() === t.activeStatus ? <Zap size={16} /> : <MessageCircleX size={16} />, label: t.info.statusLabel, value: getCurrentStatus(), accent: true },
  ];

  return (
    <section id="contact" style={{ padding: '120px 24px', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '64px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              color: '#5e6ad2',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Contact
            </span>
            <div style={{ height: '1px', width: '40px', background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
          </div>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 700,
            color: isDark ? '#fff' : '#0a0a0a',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '14px',
          }}>
            {t.title}
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            color: isDark ? '#8a8f98' : '#6b7280',
            maxWidth: '480px',
            lineHeight: 1.6,
            letterSpacing: '-0.01em',
            whiteSpace: 'pre-line',
          }}>
            {t.subtitle}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
          gap: '40px',
          alignItems: 'start',
        }} className="contact-grid">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
          >
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: '48px 32px',
                  borderRadius: '16px',
                  background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                  textAlign: 'center',
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(94,210,130,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: '#5ed282',
                }}>
                  <CheckCircle size={28} />
                </div>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: isDark ? '#fff' : '#0a0a0a',
                  letterSpacing: '-0.02em',
                  marginBottom: '8px',
                }}>
                  {t.sent}
                </p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  color: isDark ? '#8a8f98' : '#6b7280',
                }}>
                  {t.info.responseValue}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  style={{
                    marginTop: '24px',
                    padding: '9px 20px',
                    borderRadius: '8px',
                    background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: isDark ? '#8a8f98' : '#6b7280',
                  }}
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{
                  padding: '32px',
                  borderRadius: '16px',
                  background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                    <div>
                      <label htmlFor="name-input" style={labelStyle}>{t.name}</label>
                      <input
                        id="name-input"
                        type="text"
                        placeholder={t.namePlaceholder}
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        style={inputStyle('name')}
                      />
                    </div>
                    <div>
                      <label htmlFor="email-input" style={labelStyle}>{t.email}</label>
                      <input
                        id="email-input"
                        type="email"
                        placeholder={t.emailPlaceholder}
                        value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        style={inputStyle('email')}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="textarea-input" style={labelStyle}>{t.message}</label>
                    <textarea
                      id="textarea-input"
                      placeholder={t.messagePlaceholder}
                      rows={6}
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle('message')}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '14px',
                      borderRadius: '10px',
                      background: status === 'sending'
                        ? (isDark ? 'rgba(94,106,210,0.5)' : 'rgba(94,106,210,0.4)')
                        : 'linear-gradient(135deg, #5e6ad2, #7c3aed)',
                      border: 'none',
                      cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: 650,
                      color: '#fff',
                      letterSpacing: '-0.01em',
                      boxShadow: '0 4px 20px rgba(94,106,210,0.3)',
                      transition: 'background 0.2s ease',
                    }}
                  >
                    {status === 'sending' ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                          <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
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
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {infoItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '18px 20px',
                  borderRadius: '12px',
                  background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '9px',
                  flexShrink: 0,
                  background: (getCurrentStatus() === t.activeStatus && item.accent) ? 'rgba(20, 156, 63, .2)' : (getCurrentStatus() === t.inactiveStatus && item.accent) ? 'rgba(223, 39, 39, .2)' : 'rgba(3, 26, 233, 0.09)',
                  color: (getCurrentStatus() === t.activeStatus && item.accent) ? '#5ed282' : (getCurrentStatus() === t.  inactiveStatus && item.accent) ? '#da1b1bff' : '#5e6ad2',
                  border: (getCurrentStatus() === t.activeStatus && item.accent) ? '1px solid #5ed282' : (getCurrentStatus() === t.inactiveStatus && item.accent) ? '1px solid #e44747' : '1px solid #8087ceff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: isDark ? '#8a8f98' : '#606266ff',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '3px',
                  }}>
                    {item.label}
                  </p>
                  {item.subject ? (
                    <a href={`mailto:${item.value}?subject=${item.subject}`}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: (getCurrentStatus() === t.activeStatus && item.accent) ? '#5ed282' : (getCurrentStatus() === t.inactiveStatus && item.accent) ? '#e44747ff' : isDark ? '#8a8f98' : '#6b6e72ff',
                        letterSpacing: '-0.01em',
                        textDecoration: 'none',
                      }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: (getCurrentStatus() === t.activeStatus && item.accent) ? '#5ed282' : (getCurrentStatus() === t.inactiveStatus && item.accent) ? '#e44747ff' : isDark ? '#8a8f98' : '#6b6e72ff',
                      letterSpacing: '-0.01em',
                    }}>
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
          color: ${isDark ? 'rgba(138,143,152,0.6)' : 'rgba(107,114,128,0.6)'};
        }
      `}</style>
    </section>
  );
}
