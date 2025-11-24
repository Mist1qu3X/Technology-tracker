import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Обработка ошибок для GitHub Pages
window.addEventListener('error', (event) => {
  console.error('Глобальная ошибка:', event.error);
  console.error('Ошибка в файле:', event.filename, 'строка:', event.lineno);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Необработанное отклонение промиса:', event.reason);
});

// Проверка загрузки приложения
console.log('🚀 Запуск приложения...');
console.log('Base URL:', import.meta.env.BASE_URL);
console.log('Mode:', import.meta.env.MODE);
console.log('Production:', import.meta.env.PROD);

// Проверяем, что root элемент существует
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ Элемент #root не найден!');
} else {
  console.log('✅ Элемент #root найден');
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
    console.log('✅ Приложение успешно загружено');
  } catch (error) {
    console.error('❌ Ошибка при рендеринге приложения:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h1>Ошибка загрузки приложения</h1>
        <p>${error.message}</p>
        <p>Проверьте консоль браузера для подробностей.</p>
      </div>
    `;
  }
}