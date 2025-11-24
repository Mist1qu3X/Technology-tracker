import { Link } from 'react-router-dom';
import { useTechnologies } from '../hooks/useTechnologies';
import ProgressBar from '../components/ProgressBar';
import QuickActions from '../components/QuickActions';

const Home = () => {
  const { technologies, progress, updateStatus, addTechnology, getTechnologiesByStatus } = useTechnologies();

  const handleMarkAllCompleted = () => {
    technologies.forEach(tech => {
      if (tech.status !== 'completed') {
        updateStatus(tech.id, 'completed');
      }
    });
  };

  const handleResetAll = () => {
    technologies.forEach(tech => {
      updateStatus(tech.id, 'not-started');
    });
  };

  const handleImport = (importedTechnologies) => {
    importedTechnologies.forEach(tech => {
      // Добавляем каждую технологию из импорта
      addTechnology({
        title: tech.title,
        description: tech.description || '',
        category: tech.category || 'frontend',
        difficulty: tech.difficulty || 'beginner',
        status: tech.status || 'not-started',
        resources: tech.resources || [],
        notes: tech.notes || ''
      });
    });
  };

  const completedCount = getTechnologiesByStatus('completed').length;
  const inProgressCount = getTechnologiesByStatus('in-progress').length;
  const notStartedCount = getTechnologiesByStatus('not-started').length;

  return (
    <div className="page">
      <div className="page-header">
        <h1>🚀 Добро пожаловать в Трекер Технологий!</h1>
        <p>Отслеживайте ваш прогресс в изучении новых технологий</p>
      </div>

      <ProgressBar 
        progress={progress} 
        label="Общий прогресс изучения"
        height={25}
        showPercentage={true}
      />

      <div className="stats-overview">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{technologies.length}</div>
            <div className="stat-label">Всего технологий</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{completedCount}</div>
            <div className="stat-label">Изучено</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{inProgressCount}</div>
            <div className="stat-label">В процессе</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{notStartedCount}</div>
            <div className="stat-label">Не начато</div>
          </div>
        </div>
      </div>

      <QuickActions 
        technologies={technologies}
        onMarkAllCompleted={handleMarkAllCompleted}
        onResetAll={handleResetAll}
        onImport={handleImport}
      />

      <div className="recent-technologies">
        <h2>📋 Недавние технологии</h2>
        <div className="technologies-grid">
          {technologies.slice(0, 3).map(tech => (
            <div key={tech.id} className="technology-card">
              <div className="card-header">
                <h3>{tech.title}</h3>
                <span className={`status status-${tech.status}`}>
                  {tech.status === 'completed' ? '✅' : 
                   tech.status === 'in-progress' ? '🔄' : '⭕'}
                </span>
              </div>
              <p className="card-description">{tech.description}</p>
              <div className="card-meta">
                <span className={`category category-${tech.category}`}>
                  {tech.category}
                </span>
                <span className={`difficulty difficulty-${tech.difficulty}`}>
                  {tech.difficulty}
                </span>
              </div>
              <Link to={`/technology/${tech.id}`} className="btn-details">
                🔍 Подробнее
              </Link>
            </div>
          ))}
        </div>
        
        {technologies.length > 3 && (
          <div className="view-all-container">
            <Link to="/technologies" className="btn-primary">
              📚 Посмотреть все технологии
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;