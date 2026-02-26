import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'dark' | 'light';
export type Language = 'en' | 'es';

interface AppContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  isDark: boolean;
}

const AppContext = createContext<AppContextType>({
  theme: 'dark',
  language: 'en',
  toggleTheme: () => {},
  setLanguage: () => {},
  isDark: true,
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguageState] = useState<Language>('en');

  // Detect browser language on mount
  useEffect(() => {
    const browserLanguage = navigator.language || navigator.languages?.[0];
    const detectedLanguage = browserLanguage?.startsWith('es') ? 'es' : 'en';
    setLanguageState(detectedLanguage);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const setLanguage = (lang: Language) => setLanguageState(lang);

  return (
    <AppContext.Provider value={{ theme, language, toggleTheme, setLanguage, isDark: theme === 'dark' }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
