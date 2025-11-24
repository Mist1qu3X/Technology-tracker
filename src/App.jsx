import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProviderWrapper } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import AppRoutes from './AppRoutes';
import { NotificationProvider } from './contexts/NotificationContext';
import './styles/App.css';

function App() {
  // Определяем base URL для GitHub Pages
  const getBaseUrl = () => {
    // В production используем BASE_URL из Vite, иначе '/'
    const baseUrl = import.meta.env.BASE_URL || '/';
    // Убеждаемся, что base URL заканчивается на '/' или пустой
    return baseUrl === '/' ? '/' : baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
  };

  const baseUrl = getBaseUrl();

  return (
    <ThemeProviderWrapper>
      <AuthProvider>
        <NotificationProvider>
          <Router basename={baseUrl}>
            <div 
              className="app"
              style={{
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                minHeight: '100vh',
              }}
            >
            <Navigation />
            <main 
              className="main-content"
              style={{
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
              }}
            >
              <AppRoutes />
            </main>
          </div>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
