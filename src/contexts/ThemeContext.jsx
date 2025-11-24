import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createAppTheme } from '../theme/theme';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProviderWrapper = ({ children }) => {
  // Загружаем тему из localStorage или используем 'dark' по умолчанию
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'dark';
  });

  // Создаём тему на основе режима
  const theme = createAppTheme(mode);

  // Сохраняем тему в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // Обновляем CSS-переменные при смене темы
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    if (mode === 'dark') {
      root.style.setProperty('--bg-primary', theme.palette.background.default);
      root.style.setProperty('--bg-secondary', theme.palette.background.paper);
      root.style.setProperty('--bg-tertiary', '#2a2a2a');
      root.style.setProperty('--text-primary', theme.palette.text.primary);
      root.style.setProperty('--text-secondary', theme.palette.text.secondary);
      root.style.setProperty('--accent-primary', theme.palette.primary.main);
      root.style.setProperty('--accent-secondary', theme.palette.secondary.main);
      body.style.backgroundColor = theme.palette.background.default;
      body.style.color = theme.palette.text.primary;
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      root.style.setProperty('--bg-primary', theme.palette.background.default);
      root.style.setProperty('--bg-secondary', '#f5f5f5');
      root.style.setProperty('--bg-tertiary', '#e0e0e0');
      root.style.setProperty('--text-primary', theme.palette.text.primary);
      root.style.setProperty('--text-secondary', theme.palette.text.secondary);
      root.style.setProperty('--accent-primary', theme.palette.primary.main);
      root.style.setProperty('--accent-secondary', theme.palette.secondary.main);
      body.style.backgroundColor = theme.palette.background.default;
      body.style.color = theme.palette.text.primary;
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
  }, [mode, theme]);

  // Функция для переключения темы
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const value = {
    mode,
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

