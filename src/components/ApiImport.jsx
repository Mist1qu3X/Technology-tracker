import { useState, useEffect, useRef } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import Modal from './Modal';

// Правильный маппинг для технологических категорий
const mapCategory = (apiCategory, title = '') => {
  if (!apiCategory) return 'frontend';
  
  const lowerTitle = title.toLowerCase();
  
  // Определяем категорию по ключевым словам в названии
  if (lowerTitle.includes('react') || lowerTitle.includes('vue') || lowerTitle.includes('angular') || 
      lowerTitle.includes('javascript') || lowerTitle.includes('html') || lowerTitle.includes('css')) {
    return 'frontend';
  }
  
  if (lowerTitle.includes('node') || lowerTitle.includes('express') || lowerTitle.includes('python') ||
      lowerTitle.includes('java') || lowerTitle.includes('spring') || lowerTitle.includes('php')) {
    return 'backend';
  }
  
  if (lowerTitle.includes('database') || lowerTitle.includes('mysql') || lowerTitle.includes('mongodb') ||
      lowerTitle.includes('postgresql') || lowerTitle.includes('redis')) {
    return 'database';
  }
  
  if (lowerTitle.includes('docker') || lowerTitle.includes('kubernetes') || lowerTitle.includes('aws') ||
      lowerTitle.includes('devops') || lowerTitle.includes('nginx')) {
    return 'devops';
  }
  
  if (lowerTitle.includes('mobile') || lowerTitle.includes('android') || lowerTitle.includes('ios') ||
      lowerTitle.includes('react native') || lowerTitle.includes('flutter')) {
    return 'mobile';
  }
  
  // Маппинг из API категорий
  const categoryMap = {
    'frontend': 'frontend',
    'backend': 'backend', 
    'database': 'database',
    'devops': 'devops',
    'mobile': 'mobile',
    'language': 'language',
    'tools': 'tools'
  };
  
  return categoryMap[apiCategory.toLowerCase()] || 'tools';
};

// Маппинг рейтинга в сложность
const mapDifficulty = (rating) => {
  if (!rating || typeof rating !== 'number') return 'beginner';
  if (rating >= 4.5) return 'advanced';
  if (rating >= 3.5) return 'intermediate';
  return 'beginner';
};

// Преобразование данных в технологию
const convertToTechnology = (item) => {
  // Для разных API форматов
  const title = item.title || item.name || item.technology || `Технология ${item.id}`;
  const description = item.description || item.body || '';
  const category = item.category || 'tools';
  const rating = item.rating || item.popularity || 3.5;
  
  const resources = [];
  
  if (item.thumbnail && typeof item.thumbnail === 'string') {
    resources.push(item.thumbnail);
  }
  
  if (item.image && typeof item.image === 'string') {
    resources.push(item.image);
  }
  
  if (Array.isArray(item.images) && item.images.length > 0) {
    item.images.slice(0, 2).forEach(img => {
      if (typeof img === 'string' && !resources.includes(img)) {
        resources.push(img);
      }
    });
  }
  
  return {
    title: title,
    description: description.substring(0, 200), // Ограничиваем длину описания
    category: mapCategory(category, title),
    difficulty: mapDifficulty(rating),
    status: 'not-started',
    resources: resources,
    notes: item.brand ? `Бренд: ${item.brand}` : `Рейтинг: ${rating}`
  };
};

// Тестовые данные для технологий
const TEST_TECHNOLOGIES = [
  {
    id: 1,
    title: 'React',
    description: 'Библиотека JavaScript для создания пользовательских интерфейсов',
    category: 'frontend',
    rating: 4.8,
    popularity: 95,
    brand: 'Meta',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    resources: ['https://react.dev/']
  },
  {
    id: 2,
    title: 'Node.js',
    description: 'Среда выполнения JavaScript для серверной разработки',
    category: 'backend',
    rating: 4.6,
    popularity: 90,
    brand: 'OpenJS Foundation',
    thumbnail: 'https://nodejs.org/static/images/logo.svg',
    resources: ['https://nodejs.org/']
  },
  {
    id: 3,
    title: 'TypeScript',
    description: 'Надмножество JavaScript с добавлением статической типизации',
    category: 'language',
    rating: 4.7,
    popularity: 88,
    brand: 'Microsoft',
    thumbnail: 'https://www.typescriptlang.org/icons/icon-512x512.png',
    resources: ['https://www.typescriptlang.org/']
  },
  {
    id: 4,
    title: 'MongoDB',
    description: 'Документо-ориентированная система управления базами данных',
    category: 'database',
    rating: 4.4,
    popularity: 85,
    brand: 'MongoDB Inc.',
    thumbnail: 'https://webimages.mongodb.com/_com_assets/cms/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg',
    resources: ['https://www.mongodb.com/']
  },
  {
    id: 5,
    title: 'Docker',
    description: 'Платформа для разработки, доставки и запуска приложений в контейнерах',
    category: 'devops',
    rating: 4.5,
    popularity: 87,
    brand: 'Docker Inc.',
    thumbnail: 'https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png',
    resources: ['https://www.docker.com/']
  },
  {
    id: 6,
    title: 'React Native',
    description: 'Фреймворк для создания нативных мобильных приложений с использованием React',
    category: 'mobile',
    rating: 4.3,
    popularity: 82,
    brand: 'Meta',
    thumbnail: 'https://reactnative.dev/img/header_logo.svg',
    resources: ['https://reactnative.dev/']
  },
  {
    id: 7,
    title: 'Express.js',
    description: 'Минималистичный веб-фреймворк для Node.js',
    category: 'backend',
    rating: 4.2,
    popularity: 80,
    brand: 'OpenJS Foundation',
    thumbnail: 'https://expressjs.com/images/express-facebook-share.png',
    resources: ['https://expressjs.com/']
  },
  {
    id: 8,
    title: 'PostgreSQL',
    description: 'Мощная объектно-реляционная система управления базами данных',
    category: 'database',
    rating: 4.6,
    popularity: 86,
    brand: 'PostgreSQL Global Development Group',
    thumbnail: 'https://www.postgresql.org/media/img/about/press/elephant.png',
    resources: ['https://www.postgresql.org/']
  }
];

const ApiImport = ({ onImport }) => {
  const [showModal, setShowModal] = useState(false);
  const [apiUrl, setApiUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);
  const [useTestData, setUseTestData] = useState(true);
  const { showSuccess, showError } = useNotification();
  const searchTimeoutRef = useRef(null);

  // Загрузка данных из API
  const loadData = async (url) => {
    console.log('🔵 Запрос:', url);
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📡 Статус ответа:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Успешный ответ:', data);
      return data;
    } catch (error) {
      console.error('❌ Ошибка загрузки:', error);
      
      if (error.message.includes('Failed to fetch') || 
          error.name === 'TypeError') {
        throw new Error('CONNECTION_ERROR');
      }
      throw error;
    }
  };

  // Тест подключения к API
  const testConnection = async () => {
    if (useTestData) {
      setApiStatus('success');
      showSuccess('Режим тестовых данных активирован', 'Готово');
      return;
    }

    setApiStatus('testing');
    try {
      const testUrl = apiUrl || 'https://api.npoint.io/8a4b43b4b94343379f27'; // Пример работающего API
      await loadData(testUrl);
      setApiStatus('success');
      showSuccess('API доступен и работает!', 'Тест подключения');
    } catch (error) {
      setApiStatus('error');
      showError('API недоступен. Включен режим тестовых данных.', 'Ошибка подключения');
      setUseTestData(true);
    }
  };

  // Импорт тестовых данных
  const importTestData = () => {
    if (!onImport) {
      showError('Функция импорта не доступна', 'Ошибка');
      return;
    }

    const technologiesToImport = TEST_TECHNOLOGIES.map(convertToTechnology);
    onImport(technologiesToImport);
    showSuccess(`Импортировано ${technologiesToImport.length} технологий`, 'Импорт завершён');
    setShowModal(false);
  };

  // Импорт из API
  const handleImportFromApi = async () => {
    if (!onImport) {
      showError('Функция импорта не доступна', 'Ошибка');
      return;
    }

    if (useTestData) {
      importTestData();
      return;
    }

    if (!apiUrl.trim()) {
      showError('Введите URL API', 'Ошибка');
      return;
    }

    setIsLoading(true);
    try {
      const data = await loadData(apiUrl);
      
      let items = [];
      
      // Обрабатываем разные форматы API
      if (Array.isArray(data)) {
        items = data;
      } else if (data.products && Array.isArray(data.products)) {
        items = data.products;
      } else if (data.technologies && Array.isArray(data.technologies)) {
        items = data.technologies;
      } else if (data.data && Array.isArray(data.data)) {
        items = data.data;
      } else if (typeof data === 'object' && data.id) {
        items = [data];
      } else {
        throw new Error('Неверный формат данных API');
      }

      if (items.length === 0) {
        showError('Данные не найдены в API ответе', 'Ошибка');
        return;
      }

      const technologiesToImport = items.map(convertToTechnology);
      onImport(technologiesToImport);
      
      showSuccess(`Успешно импортировано ${technologiesToImport.length} технологий`, 'Импорт завершён');
      setShowModal(false);
    } catch (error) {
      console.error('Ошибка импорта:', error);
      let errorMsg;
      if (error.message === 'CONNECTION_ERROR') {
        errorMsg = 'Не удалось подключиться к API. Включен режим тестовых данных.';
        setUseTestData(true);
        importTestData();
      } else {
        errorMsg = `Ошибка импорта: ${error.message}. Используются тестовые данные.`;
        setUseTestData(true);
        importTestData();
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Поиск технологий
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery.length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(() => {
      try {
        // Локальный поиск по тестовым данным
        const filtered = TEST_TECHNOLOGIES.filter(tech => 
          tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tech.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
      } catch (error) {
        console.error('Ошибка поиска:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Импорт одного элемента
  const handleImportItem = (item) => {
    if (!onImport) {
      showError('Функция импорта не доступна', 'Ошибка');
      return;
    }

    try {
      const technology = convertToTechnology(item);
      onImport([technology]);
      showSuccess('Технология успешно импортирована', 'Импорт завершён');
      setSearchQuery('');
      setSearchResults([]);
    } catch (error) {
      console.error('Ошибка импорта:', error);
      showError(`Ошибка импорта: ${error.message}`, 'Ошибка');
    }
  };

  return (
    <>
      <button 
        onClick={() => setShowModal(true)} 
        className="btn-info"
        style={{ marginLeft: '10px' }}
      >
        🌐 Импорт технологий
      </button>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSearchQuery('');
          setSearchResults([]);
        }}
        title="Импорт технологий в дорожную карту"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Режим данных */}
          <div style={{ 
            padding: '15px', 
            borderRadius: '8px', 
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Режим данных:</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setUseTestData(true)}
                  className={useTestData ? "btn-primary" : "btn-secondary"}
                  style={{ padding: '8px 16px', fontSize: '14px' }}
                >
                  📦 Тестовые данные
                </button>
                <button
                  onClick={() => setUseTestData(false)}
                  className={!useTestData ? "btn-primary" : "btn-secondary"}
                  style={{ padding: '8px 16px', fontSize: '14px' }}
                >
                  🌐 Внешнее API
                </button>
              </div>
            </div>

            {/* Статус API */}
            {!useTestData && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px' }}>Статус API:</span>
                <button
                  onClick={testConnection}
                  disabled={apiStatus === 'testing'}
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                >
                  {apiStatus === 'testing' ? '⏳ Тестирование...' : 
                   apiStatus === 'success' ? '✅ Работает' : 
                   apiStatus === 'error' ? '❌ Ошибка' : '🔍 Тест подключения'}
                </button>
              </div>
            )}
          </div>

          {/* Поле для API URL */}
          {!useTestData && (
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                URL API с технологиями:
              </label>
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="https://api.example.com/technologies"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '14px'
                }}
              />
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '5px' }}>
                Пример: https://api.npoint.io/8a4b43b4b94343379f27
              </div>
            </div>
          )}

          {/* Кнопка импорта */}
          <button
            onClick={handleImportFromApi}
            disabled={isLoading}
            className="btn-primary"
            style={{ 
              width: '100%', 
              padding: '12px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {isLoading ? '⏳ Импорт...' : 
             useTestData ? '📥 Импорт тестовых данных (8 технологий)' : 
             '📥 Импорт из API'}
          </button>

          {/* Поиск технологий */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Поиск технологий:
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="React, Node.js, MongoDB..."
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '14px'
              }}
            />

            {/* Результаты поиска */}
            {isSearching && (
              <p style={{ marginTop: '15px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                🔍 Поиск технологий...
              </p>
            )}

            {!isSearching && searchResults.length > 0 && (
              <div style={{ marginTop: '15px', maxHeight: '400px', overflowY: 'auto' }}>
                <h4 style={{ marginBottom: '12px', fontSize: '14px' }}>
                  Найдено технологий: {searchResults.length}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        padding: '12px',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        backgroundColor: 'var(--bg-tertiary)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '10px'
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <strong style={{ color: 'var(--text-primary)', fontSize: '14px' }}>
                            {item.title}
                          </strong>
                          <span style={{ 
                            fontSize: '11px', 
                            padding: '2px 6px',
                            borderRadius: '12px',
                            backgroundColor: 'var(--accent-color)',
                            color: 'white'
                          }}>
                            {item.category}
                          </span>
                        </div>
                        <p style={{ 
                          color: 'var(--text-secondary)', 
                          fontSize: '12px', 
                          margin: 0,
                          lineHeight: '1.4'
                        }}>
                          {item.description}
                        </p>
                        <div style={{ 
                          fontSize: '11px', 
                          color: 'var(--text-secondary)',
                          marginTop: '6px',
                          display: 'flex',
                          gap: '10px'
                        }}>
                          <span>Сложность: {mapDifficulty(item.rating)}</span>
                          <span>Рейтинг: {item.rating}/5</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleImportItem(item)}
                        className="btn-primary"
                        style={{ 
                          padding: '6px 12px', 
                          fontSize: '12px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        ➕ Добавить
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!isSearching && searchQuery.length >= 2 && searchResults.length === 0 && (
              <p style={{ marginTop: '15px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                🚫 Технологии не найдены. Попробуйте другой запрос.
              </p>
            )}
          </div>

          {/* Информация о данных */}
          <div style={{ 
            padding: '12px',
            borderRadius: '6px',
            backgroundColor: 'rgba(74, 144, 226, 0.1)',
            border: '1px solid rgba(74, 144, 226, 0.3)',
            fontSize: '12px',
            color: 'var(--text-secondary)'
          }}>
            💡 <strong>Доступно {TEST_TECHNOLOGIES.length} технологий:</strong> React, Node.js, 
            TypeScript, MongoDB, Docker, React Native, Express.js, PostgreSQL
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ApiImport;