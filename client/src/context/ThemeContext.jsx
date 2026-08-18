import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);

const STORAGE_KEY = 'theme';
const LIGHT = 'light';
const DARK = 'dark';

const getSystemTheme = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return LIGHT;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
};

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return LIGHT;
  }

  try {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);

    if (storedTheme === LIGHT || storedTheme === DARK) {
      return storedTheme;
    }
  } catch {
    // Ignore localStorage access errors and use system preference.
  }

  return getSystemTheme();
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  const applyTheme = useCallback((nextTheme) => {
    if (typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;
    const isDark = nextTheme === DARK;

    root.classList.toggle('dark', isDark);
    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;
  }, []);

  useEffect(() => {
    applyTheme(theme);

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors. Theme still works for the current session.
    }
  }, [theme, applyTheme]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (event) => {
      let hasStoredTheme = false;

      try {
        hasStoredTheme = Boolean(window.localStorage.getItem(STORAGE_KEY));
      } catch {
        hasStoredTheme = false;
      }

      // Respect an explicit user choice. Only follow the OS while no choice
      // has been saved in localStorage.
      if (!hasStoredTheme) {
        setTheme(event.matches ? DARK : LIGHT);
      }
    };

    mediaQuery.addEventListener?.('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener?.('change', handleSystemThemeChange);
    };
  }, []);

  const setLightTheme = useCallback(() => {
    setTheme(LIGHT);
  }, []);

  const setDarkTheme = useCallback(() => {
    setTheme(DARK);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === LIGHT ? DARK : LIGHT));
  }, []);

  const resetTheme = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors.
    }

    const systemTheme = getSystemTheme();
    setTheme(systemTheme);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === DARK,
      isLight: theme === LIGHT,
      toggleTheme,
      setLightTheme,
      setDarkTheme,
      resetTheme,
    }),
    [theme, toggleTheme, setLightTheme, setDarkTheme, resetTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

export default ThemeContext;