import { useState } from 'react';
import Modal from './Modal';
import { useNotification } from '../contexts/NotificationContext';

const QuickActions = ({ technologies, onMarkAllCompleted, onResetAll, onImport }) => {
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const { showSuccess, showError } = useNotification();

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      technologies: technologies
    };
    const dataStr = JSON.stringify(data, null, 2);
    
    // Создаем Blob и скачиваем файл
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `technologies_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setShowExportModal(true);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        
        // Проверяем формат обычного импорта
        let technologiesToImport = [];
        
        // Формат обычного импорта
        if (imported.technologies && Array.isArray(imported.technologies)) {
          technologiesToImport = imported.technologies;
        }
        // Прямой массив технологий
        else if (Array.isArray(imported)) {
          technologiesToImport = imported;
        }
        else {
          setImportResult({
            success: false,
            message: 'Неверный формат файла: ожидается массив technologies или объект с полем technologies'
          });
          setShowImportModal(true);
          return;
        }

        if (technologiesToImport.length === 0) {
          setImportResult({
            success: false,
            message: 'Файл не содержит технологий для импорта'
          });
          setShowImportModal(true);
          return;
        }

        // Вызываем callback для импорта данных
        if (onImport) {
          onImport(technologiesToImport);
          const count = technologiesToImport.length;
          showSuccess(`Успешно импортировано ${count} технологий`, 'Импорт завершён');
          setImportResult({
            success: true,
            count,
            message: `Успешно импортировано ${count} технологий`
          });
        } else {
          showError('Функция импорта не доступна', 'Ошибка импорта');
          setImportResult({
            success: false,
            message: 'Функция импорта не доступна'
          });
        }
        
        setShowImportModal(true);
      } catch (error) {
        setImportResult({
          success: false,
          message: `Ошибка импорта: ${error.message}`
        });
        setShowImportModal(true);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className="quick-actions">
      <h3>⚡ Быстрые действия</h3>
      <div className="action-buttons">
        <button onClick={onMarkAllCompleted} className="btn-success">
          ✅ Отметить все как выполненные
        </button>
        <button onClick={onResetAll} className="btn-warning">
          🔄 Сбросить все статусы
        </button>
        <button onClick={handleExport} className="btn-info">
          📤 Экспорт данных
        </button>
        <label className="btn-secondary file-input-label">
          📥 Импорт данных
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Экспорт данных"
      >
        <p>✅ Данные успешно экспортированы!</p>
        <p>Файл скачан автоматически.</p>
        <button 
          onClick={() => setShowExportModal(false)}
          className="btn-primary"
        >
          Закрыть
        </button>
      </Modal>

      <Modal
        isOpen={showImportModal}
        onClose={() => {
          setShowImportModal(false);
          setImportResult(null);
        }}
        title="Импорт данных"
      >
        {importResult && (
          <>
            <p style={{ color: importResult.success ? 'var(--success)' : 'var(--danger)' }}>
              {importResult.success ? '✅' : '❌'} {importResult.message}
            </p>
            <button 
              onClick={() => {
                setShowImportModal(false);
                setImportResult(null);
              }}
              className="btn-primary"
            >
              Закрыть
            </button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default QuickActions;