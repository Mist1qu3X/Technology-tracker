import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Обработка ошибок для GitHub Pages
window.addEventListener('error', (event) => {
  console.error('Глобальная ошибка:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Необработанное отклонение промиса:', event.reason);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)