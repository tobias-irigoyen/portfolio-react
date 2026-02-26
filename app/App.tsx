import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { TechStack } from './components/TechStack';
import { Projects } from './components/Projects';
import { CTA } from './components/CTA';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

function PortfolioLayout() {
  const { isDark } = useApp();

  useEffect(() => {
    document.body.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, sans-serif';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, []);

  const bg = isDark ? '#000000' : '#ffffff';
  const textPrimary = isDark ? '#ffffff' : '#0a0a0a';

  return (
    <div style={{
      background: bg,
      color: textPrimary,
      minHeight: '100vh',
      position: 'relative',
      transition: 'background 0.3s ease, color 0.3s ease',
    }}>
      {/* Background Grid */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: isDark
          ? `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
             linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`
          : `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
             linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Radial vignette overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: isDark
          ? 'radial-gradient(ellipse 80% 60% at 50% 0%, transparent 50%, rgba(0,0,0,0.8) 100%)'
          : 'radial-gradient(ellipse 80% 60% at 50% 0%, transparent 50%, rgba(255,255,255,0.7) 100%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />

        {/* Section dividers */}
        <SectionDivider isDark={isDark} />
        <Services />

        <SectionDivider isDark={isDark} />
        <TechStack />

        <SectionDivider isDark={isDark} />
        <Projects />

        <SectionDivider isDark={isDark} />
        <CTA />

        <SectionDivider isDark={isDark} />
        <Testimonials />

        <SectionDivider isDark={isDark} />
        <Contact />

        <Footer />
      </div>

      <ScrollToTop />

      <style>{`
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          overflow-x: hidden;
        }
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: ${isDark ? '#0a0a0a' : '#f5f5f5'};
        }
        ::-webkit-scrollbar-thumb {
          background: ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'};
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)'};
        }
        ::selection {
          background: rgba(94,106,210,0.3);
          color: ${isDark ? '#fff' : '#0a0a0a'};
        }
      `}</style>
    </div>
  );
}

function SectionDivider({ isDark }: { isDark: boolean }) {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 24px',
    }}>
      <div style={{
        height: '1px',
        background: isDark
          ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 20%, rgba(255,255,255,0.07) 80%, transparent)'
          : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.07) 20%, rgba(0,0,0,0.07) 80%, transparent)',
      }} />
    </div>
  );
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Hide the initial HTML loader when React is ready
    const initialLoader = document.getElementById('initial-loader');
    if (initialLoader) {
      // Wait 4 seconds total before hiding
      setTimeout(() => {
        initialLoader.style.opacity = '0';
        initialLoader.style.transition = 'opacity 0.5s ease-out';
        setTimeout(() => {
          initialLoader.style.display = 'none';
          setIsReady(true);
        }, 500);
      }, 1000);
    }
  }, []);

  if (!isReady) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        zIndex: 9998,
      }} />
    );
  }

  return (
    <AppProvider>
      <PortfolioLayout />
    </AppProvider>
  );
}
