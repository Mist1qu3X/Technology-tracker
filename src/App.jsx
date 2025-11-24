import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProviderWrapper } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import AppRoutes from './AppRoutes';
import { NotificationProvider } from './contexts/NotificationContext';
import './styles/App.css';

function App() {
  return (
    <ThemeProviderWrapper>
      <AuthProvider>
        <NotificationProvider>
          <Router>
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
