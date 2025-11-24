import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7, Logout } from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const { showSuccess } = useNotification();

  const handleLogout = () => {
    logout();
    showSuccess('Вы успешно вышли из защищённого раздела', 'Выход');
    // Перенаправляем на главную страницу, если находимся на Dashboard
    if (location.pathname === '/dashboard') {
      navigate('/', { replace: true });
    }
  };

  const navLinks = [
    { path: '/', label: '🏠 Главная' },
    { path: '/technologies', label: '📚 Все технологии' },
    { path: '/add-technology', label: '➕ Добавить' },
    { path: '/statistics', label: '📈 Статистика' },
  ];

  return (
    <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4, fontWeight: 600 }}>
          🚀 Трекер Технологий
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          {navLinks.map((link) => (
            <Button
              key={link.path}
              component={Link}
              to={link.path}
              color="inherit"
              sx={{
                textTransform: 'none',
                fontWeight: location.pathname === link.path ? 600 : 400,
                backgroundColor: location.pathname === link.path
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                },
              }}
            >
              {link.label}
            </Button>
          ))}
          {isAuthenticated && (
            <Button
              component={Link}
              to="/dashboard"
              color="inherit"
              sx={{
                textTransform: 'none',
                fontWeight: location.pathname === '/dashboard' ? 600 : 400,
                backgroundColor: location.pathname === '/dashboard'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                },
              }}
            >
              📊 Dashboard
            </Button>
          )}
        </Box>
        {!isAuthenticated ? (
          <Button
            component={Link}
            to="/login"
            color="inherit"
            sx={{
              textTransform: 'none',
              fontWeight: location.pathname === '/login' ? 600 : 400,
              backgroundColor: location.pathname === '/login'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              },
              mr: 1,
            }}
          >
            🔐 Войти
          </Button>
        ) : (
          <Button
            onClick={handleLogout}
            color="inherit"
            startIcon={<Logout />}
            sx={{
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              },
              mr: 1,
            }}
          >
            Выйти
          </Button>
        )}
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          aria-label="переключить тему"
        >
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;