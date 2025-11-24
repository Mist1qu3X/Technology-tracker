import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTechnologies } from '../hooks/useTechnologies';
import { useNotification } from '../contexts/NotificationContext';

const TechnologyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { technologies, updateStatus, updateNotes, updateTechnology, deleteTechnology } = useTechnologies();
  const { showSuccess, showError } = useNotification();
  const [technology, setTechnology] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTech, setEditedTech] = useState(null);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [localNotes, setLocalNotes] = useState('');

  useEffect(() => {
    const tech = technologies.find(t => t.id === parseInt(id));
    setTechnology(tech);
    setEditedTech(tech);
    setLocalNotes(tech?.notes || '');
  }, [id, technologies]);

  const handleStatusChange = (newStatus) => {
    if (technology) {
      updateStatus(technology.id, newStatus);
    }
  };

  const handleSave = () => {
    if (technology && editedTech) {
      if (!editedTech.title || !editedTech.title.trim()) {
        showError('Название технологии обязательно для заполнения', 'Ошибка валидации');
        return;
      }
      updateTechnology(technology.id, {
        title: editedTech.title,
        description: editedTech.description,
        category: editedTech.category,
        difficulty: editedTech.difficulty,
        resources: (editedTech.resources || []).filter(r => r.trim() !== ''),
        notes: editedTech.notes || ''
      });
      showSuccess('Изменения успешно сохранены!', 'Технология обновлена');
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту технологию?')) {
      const techTitle = technology.title;
      deleteTechnology(technology.id);
      showSuccess(`Технология "${techTitle}" успешно удалена`, 'Технология удалена');
      navigate('/technologies');
    }
  };

  if (!technology) {
    return (
      <div className="page">
        <h1>🚫 Технология не найдена</h1>
        <p>Технология с ID {id} не существует.</p>
        <button onClick={() => navigate('/technologies')} className="btn-primary">
          📚 Назад к списку
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <button onClick={() => navigate('/technologies')} className="btn-secondary">
          ← Назад
        </button>
        <div className="header-actions">
          <button onClick={() => setIsEditing(!isEditing)} className="btn-warning">
            {isEditing ? '❌ Отмена' : '✏️ Редактировать'}
          </button>
          <button onClick={handleDelete} className="btn-danger">
            🗑️ Удалить
          </button>
        </div>
      </div>

      <div className="technology-detail">
        {isEditing ? (
          <div className="edit-form">
            <div className="form-group">
              <label htmlFor="edit-title">Название</label>
              <input
                type="text"
                id="edit-title"
                value={editedTech?.title || ''}
                onChange={(e) => setEditedTech({...editedTech, title: e.target.value})}
                className="edit-input"
                placeholder="Название технологии"
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-description">Описание</label>
              <textarea
                id="edit-description"
                value={editedTech?.description || ''}
                onChange={(e) => setEditedTech({...editedTech, description: e.target.value})}
                rows="4"
                className="edit-textarea"
                placeholder="Описание технологии"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="edit-category">Категория</label>
                <select
                  id="edit-category"
                  value={editedTech?.category || 'frontend'}
                  onChange={(e) => setEditedTech({...editedTech, category: e.target.value})}
                  className="edit-select"
                >
                  <option value="frontend">🎨 Frontend</option>
                  <option value="backend">⚙️ Backend</option>
                  <option value="language">💻 Язык программирования</option>
                  <option value="database">🗄️ База данных</option>
                  <option value="devops">🚀 DevOps</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="edit-difficulty">Сложность</label>
                <select
                  id="edit-difficulty"
                  value={editedTech?.difficulty || 'beginner'}
                  onChange={(e) => setEditedTech({...editedTech, difficulty: e.target.value})}
                  className="edit-select"
                >
                  <option value="beginner">👶 Начальный</option>
                  <option value="intermediate">💪 Средний</option>
                  <option value="advanced">🔥 Продвинутый</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Ресурсы для изучения (URL)</label>
              {(editedTech?.resources || ['']).map((resource, index) => (
                <div key={index} className="resource-field">
                  <input
                    type="url"
                    value={resource}
                    onChange={(e) => {
                      const newResources = [...(editedTech?.resources || [])];
                      newResources[index] = e.target.value;
                      setEditedTech({...editedTech, resources: newResources});
                    }}
                    placeholder="https://example.com"
                    className="resource-input"
                  />
                  {(editedTech?.resources || []).length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newResources = (editedTech?.resources || []).filter((_, i) => i !== index);
                        setEditedTech({...editedTech, resources: newResources.length > 0 ? newResources : ['']});
                      }}
                      className="btn-remove"
                      title="Удалить ресурс"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setEditedTech({...editedTech, resources: [...(editedTech?.resources || []), '']});
                }}
                className="btn-add-resource"
              >
                + Добавить ресурс
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="edit-notes">Заметки</label>
              <textarea
                id="edit-notes"
                value={editedTech?.notes || ''}
                onChange={(e) => setEditedTech({...editedTech, notes: e.target.value})}
                rows="4"
                className="edit-textarea"
                placeholder="Ваши заметки..."
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary">
                ❌ Отмена
              </button>
              <button type="button" onClick={handleSave} className="btn-primary">
                💾 Сохранить изменения
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="detail-header">
              <h1>{technology.title}</h1>
              <span className={`status-badge status-${technology.status}`}>
                {technology.status === 'completed' ? '✅ Завершено' : 
                 technology.status === 'in-progress' ? '🔄 В процессе' : '⭕ Не начато'}
              </span>
            </div>

            <div className="detail-section">
              <h3>📝 Описание</h3>
              <p>{technology.description}</p>
            </div>

            <div className="detail-meta">
              <div className="meta-item">
                <strong>Категория:</strong>
                <span className={`category category-${technology.category}`}>
                  {technology.category}
                </span>
              </div>
              <div className="meta-item">
                <strong>Сложность:</strong>
                <span className={`difficulty difficulty-${technology.difficulty}`}>
                  {technology.difficulty}
                </span>
              </div>
              <div className="meta-item">
                <strong>Добавлено:</strong>
                <span>{new Date(technology.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="detail-section">
              <h3>🎯 Статус изучения</h3>
              <div className="status-buttons">
                <button
                  onClick={() => handleStatusChange('not-started')}
                  className={`status-btn ${technology.status === 'not-started' ? 'active' : ''}`}
                >
                  ⭕ Не начато
                </button>
                <button
                  onClick={() => handleStatusChange('in-progress')}
                  className={`status-btn ${technology.status === 'in-progress' ? 'active' : ''}`}
                >
                  🔄 В процессе
                </button>
                <button
                  onClick={() => handleStatusChange('completed')}
                  className={`status-btn ${technology.status === 'completed' ? 'active' : ''}`}
                >
                  ✅ Завершено
                </button>
              </div>
            </div>

            {technology.resources && technology.resources.length > 0 && (
              <div className="detail-section">
                <h3>🔗 Ресурсы для изучения</h3>
                <ul className="resources-list">
                  {technology.resources.map((resource, index) => (
                    <li key={index}>
                      <a href={resource} target="_blank" rel="noopener noreferrer">
                        {resource}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="detail-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3>📓 Заметки</h3>
                {!isEditingNotes && (
                  <button
                    onClick={() => setIsEditingNotes(true)}
                    className="btn-secondary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                  >
                    ✏️ {technology.notes ? 'Редактировать' : 'Добавить заметки'}
                  </button>
                )}
              </div>
              
              {isEditingNotes ? (
                <div className="notes-editor">
                  <textarea
                    value={localNotes}
                    onChange={(e) => setLocalNotes(e.target.value)}
                    placeholder="Добавьте ваши заметки по изучению этой технологии..."
                    rows="6"
                    style={{ width: '100%', minHeight: '120px' }}
                  />
                  <div className="notes-actions">
                    <button
                      onClick={() => {
                        updateNotes(technology.id, localNotes);
                        setIsEditingNotes(false);
                      }}
                      className="btn-save"
                    >
                      💾 Сохранить
                    </button>
                    <button
                      onClick={() => {
                        setLocalNotes(technology.notes || '');
                        setIsEditingNotes(false);
                      }}
                      className="btn-cancel"
                    >
                      ❌ Отмена
                    </button>
                  </div>
                </div>
              ) : (
                <div className="notes-content">
                  {technology.notes ? (
                    <p style={{ whiteSpace: 'pre-wrap' }}>{technology.notes}</p>
                  ) : (
                    <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                      Заметок пока нет. Нажмите "Добавить заметки", чтобы начать.
                    </p>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TechnologyDetail;