import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TechnologyCard = ({ technology, onStatusChange, onNotesChange }) => {
  const [showNotes, setShowNotes] = useState(false);
  const [localNotes, setLocalNotes] = useState(technology.notes || '');
  const navigate = useNavigate();

  const statusColors = {
    'not-started': '#ff6b6b',
    'in-progress': '#4ecdc4',
    'completed': '#45b7d1'
  };

  const statusIcons = {
    'not-started': '⭕',
    'in-progress': '🔄',
    'completed': '✅'
  };

  const handleStatusChange = () => {
    const statusOrder = ['not-started', 'in-progress', 'completed'];
    const currentIndex = statusOrder.indexOf(technology.status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    onStatusChange(technology.id, statusOrder[nextIndex]);
  };

  const handleSaveNotes = () => {
    onNotesChange(technology.id, localNotes);
    setShowNotes(false);
  };

  return (
    <div className="technology-card" style={{ borderLeftColor: statusColors[technology.status] }}>
      <div className="card-header">
        <h3>{technology.title}</h3>
        <span className="status-icon">{statusIcons[technology.status]}</span>
      </div>
      
      <p className="card-description">{technology.description}</p>
      
      <div className="card-meta">
        <span className={`category category-${technology.category}`}>
          {technology.category}
        </span>
        <span className={`difficulty difficulty-${technology.difficulty}`}>
          {technology.difficulty}
        </span>
      </div>

      <div className="card-actions">
        <button 
          className="btn-status"
          onClick={handleStatusChange}
          title="Сменить статус"
        >
          {statusIcons[technology.status]} Сменить статус
        </button>
        
        <button 
          className="btn-notes"
          onClick={() => setShowNotes(!showNotes)}
        >
          📝 Заметки
        </button>
        
        <button 
          className="btn-details"
          onClick={() => navigate(`/technology/${technology.id}`)}
        >
          🔍 Подробнее
        </button>
      </div>

      {showNotes && (
        <div className="notes-editor">
          <textarea
            value={localNotes}
            onChange={(e) => setLocalNotes(e.target.value)}
            placeholder="Добавьте заметки по изучению..."
            rows="3"
          />
          <div className="notes-actions">
            <button onClick={handleSaveNotes} className="btn-save">💾 Сохранить</button>
            <button onClick={() => setShowNotes(false)} className="btn-cancel">❌ Отмена</button>
          </div>
        </div>
      )}

      {technology.notes && !showNotes && (
        <div className="notes-preview">
          <p>{technology.notes}</p>
        </div>
      )}
    </div>
  );
};

export default TechnologyCard;