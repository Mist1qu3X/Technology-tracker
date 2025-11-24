import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTechnologies } from '../hooks/useTechnologies';
import { useNotification } from '../contexts/NotificationContext';

const AddTechnology = () => {
  const navigate = useNavigate();
  const { addTechnology } = useTechnologies();
  const { showSuccess, showError } = useNotification();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'frontend',
    difficulty: 'beginner',
    status: 'not-started',
    resources: [''],
    notes: ''
  });
  const [errors, setErrors] = useState({});

  const categories = ['frontend', 'backend', 'language', 'database', 'devops'];
  const difficulties = ['beginner', 'intermediate', 'advanced'];
  const statuses = ['not-started', 'in-progress', 'completed'];

  const difficultyLabels = {
    beginner: '👶 Начальный',
    intermediate: '💪 Средний',
    advanced: '🔥 Продвинутый'
  };

  const categoryLabels = {
    frontend: '🎨 Frontend',
    backend: '⚙️ Backend',
    language: '💻 Язык программирования',
    database: '🗄️ База данных',
    devops: '🚀 DevOps'
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Название обязательно для заполнения';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно для заполнения';
    }

    // Проверка ресурсов на валидные URL
    const validResources = formData.resources.filter(r => r.trim() !== '');
    validResources.forEach((resource, index) => {
      try {
        new URL(resource);
      } catch {
        const resourceIndex = formData.resources.indexOf(resource);
        newErrors[`resource-${resourceIndex}`] = 'Введите валидный URL';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const technologyData = {
      ...formData,
      resources: formData.resources.filter(r => r.trim() !== ''),
      notes: formData.notes.trim()
    };

    addTechnology(technologyData);
    showSuccess(`Технология "${technologyData.title}" успешно добавлена!`, 'Технология добавлена');
    navigate('/technologies');
  };

  const handleResourceChange = (index, value) => {
    const newResources = [...formData.resources];
    newResources[index] = value;
    setFormData({ ...formData, resources: newResources });
    
    // Очистить ошибку для этого ресурса
    if (errors[`resource-${index}`]) {
      const newErrors = { ...errors };
      delete newErrors[`resource-${index}`];
      setErrors(newErrors);
    }
  };

  const addResourceField = () => {
    setFormData({
      ...formData,
      resources: [...formData.resources, '']
    });
  };

  const removeResource = (index) => {
    const newResources = formData.resources.filter((_, i) => i !== index);
    setFormData({ ...formData, resources: newResources });
    
    // Удалить ошибку для этого ресурса
    const newErrors = { ...errors };
    delete newErrors[`resource-${index}`];
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Очистить ошибку при изменении
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>➕ Добавить новую технологию</h1>
        <button onClick={() => navigate('/technologies')} className="btn-secondary">
          ← Назад к списку
        </button>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="title">
            Название технологии <span className="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Например: React, Node.js, TypeScript..."
            className={errors.title ? 'input-error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">
            Описание <span className="required">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Краткое описание технологии, что вы планируете изучить..."
            rows="4"
            className={errors.description ? 'input-error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Категория</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {categoryLabels[cat]}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="difficulty">Сложность</label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>
                  {difficultyLabels[diff]}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Начальный статус</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'not-started' ? '⭕ Не начато' :
                   status === 'in-progress' ? '🔄 В процессе' : '✅ Завершено'}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Ресурсы для изучения (URL)</label>
          {formData.resources.map((resource, index) => (
            <div key={index} className="resource-field">
              <input
                type="url"
                value={resource}
                onChange={(e) => handleResourceChange(index, e.target.value)}
                placeholder="https://example.com"
                className={`resource-input ${errors[`resource-${index}`] ? 'input-error' : ''}`}
              />
              {formData.resources.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeResource(index)}
                  className="btn-remove"
                  title="Удалить ресурс"
                >
                  ✕
                </button>
              )}
              {errors[`resource-${index}`] && (
                <span className="error-message">{errors[`resource-${index}`]}</span>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addResourceField}
            className="btn-add-resource"
          >
            + Добавить ресурс
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Заметки (необязательно)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Ваши заметки, планы изучения..."
            rows="4"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/technologies')} className="btn-secondary">
            Отмена
          </button>
          <button type="submit" className="btn-primary">
            💾 Добавить технологию
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTechnology;
