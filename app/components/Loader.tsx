import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';


interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#000',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      transition: 'opacity 0.3s ease-out',
      opacity: isVisible ? 1 : 0,
    }}>
      <div style={{
        animation: 'blink 1.5s infinite',
      }}>
       
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ opacity: 0.8 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'none',
                border: 'none',
                cursor: 'default',
                padding: '0',
                transition: 'opacity 0.2s ease',
                position: 'relative',
                left: '0',
                top: '0'
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
                <span style={{
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: 700,
                }}>A</span>
              </div>
              <span style={{
                fontWeight: 600,
                fontSize: '18px',
                letterSpacing: '-0.01em',
              }}>
                Tobías Irigoyen
              </span>
            </motion.button>
      </div>
      
      <style>{`
        @keyframes blink {
          0%, 50%, 100% {
            opacity: 1;
          }
          25%, 75% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};
