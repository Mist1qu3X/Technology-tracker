import { createTheme } from '@mui/material/styles';

// Функция для создания темы
export const createAppTheme = (mode = 'dark') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#4ecdc4' : '#1976d2',
        light: mode === 'dark' ? '#6ee3dc' : '#42a5f5',
        dark: mode === 'dark' ? '#3a9b94' : '#1565c0',
        contrastText: mode === 'dark' ? '#000' : '#fff',
      },
      secondary: {
        main: mode === 'dark' ? '#45b7d1' : '#dc004e',
        light: mode === 'dark' ? '#6dc8e3' : '#ff5983',
        dark: mode === 'dark' ? '#2d8fa5' : '#9a0036',
        contrastText: '#fff',
      },
      success: {
        main: '#51cf66',
        light: '#6fd97e',
        dark: '#3ca04f',
      },
      warning: {
        main: '#fcc419',
        light: '#fdd048',
        dark: '#d4a215',
      },
      error: {
        main: '#ff6b6b',
        light: '#ff8888',
        dark: '#cc5555',
      },
      background: {
        default: mode === 'dark' ? '#0a0a0a' : '#ffffff',
        paper: mode === 'dark' ? '#1a1a1a' : '#f5f5f5',
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#1a1a1a',
        secondary: mode === 'dark' ? '#b0b0b0' : '#666666',
      },
      divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h1: {
        fontWeight: 600,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
            color: mode === 'dark' ? '#ffffff' : '#1a1a1a',
            boxShadow: mode === 'dark' 
              ? '0 4px 6px rgba(0, 0, 0, 0.3)' 
              : '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: mode === 'dark'
                ? '0 8px 15px rgba(0, 0, 0, 0.4)'
                : '0 4px 8px rgba(0, 0, 0, 0.15)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: 12,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff',
            backgroundImage: 'none',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-root': {
              backgroundColor: mode === 'dark' ? '#2a2a2a' : '#ffffff',
              color: mode === 'dark' ? '#ffffff' : '#1a1a1a',
            },
            '& .MuiInputLabel-root': {
              color: mode === 'dark' ? '#b0b0b0' : '#666666',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: mode === 'dark' ? '#2a2a2a' : '#e0e0e0',
              },
              '&:hover fieldset': {
                borderColor: mode === 'dark' ? '#4ecdc4' : '#1976d2',
              },
              '&.Mui-focused fieldset': {
                borderColor: mode === 'dark' ? '#4ecdc4' : '#1976d2',
              },
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#2a2a2a' : '#ffffff',
            color: mode === 'dark' ? '#ffffff' : '#1a1a1a',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#1a1a1a' : '#1976d2',
            color: '#ffffff',
          },
        },
      },
    },
  });
};

