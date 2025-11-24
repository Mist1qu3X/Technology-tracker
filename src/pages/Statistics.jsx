import { useTechnologies } from '../hooks/useTechnologies';
import ProgressBar from '../components/ProgressBar';

const Statistics = () => {
  const { technologies, getTechnologiesByStatus } = useTechnologies();

  const completed = getTechnologiesByStatus('completed');
  const inProgress = getTechnologiesByStatus('in-progress');
  const notStarted = getTechnologiesByStatus('not-started');

  const categoryStats = technologies.reduce((acc, tech) => {
    acc[tech.category] = (acc[tech.category] || 0) + 1;
    return acc;
  }, {});

  const difficultyStats = technologies.reduce((acc, tech) => {
    acc[tech.difficulty] = (acc[tech.difficulty] || 0) + 1;
    return acc;
  }, {});

  const completionRate = technologies.length > 0 
    ? Math.round((completed.length / technologies.length) * 100) 
    : 0;

  return (
    <div className="page">
      <div className="page-header">
        <h1>📊 Статистика прогресса</h1>
        <p>Обзор вашего прогресса в изучении технологий</p>
      </div>

      <div className="stats-overview">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{technologies.length}</div>
            <div className="stat-label">Всего технологий</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{completed.length}</div>
            <div className="stat-label">Изучено</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{inProgress.length}</div>
            <div className="stat-label">В процессе</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{completionRate}%</div>
            <div className="stat-label">Процент завершения</div>
          </div>
        </div>
      </div>

      <ProgressBar 
        progress={completionRate} 
        label="Общий прогресс завершения"
        height={30}
      />

      <div className="charts-section">
        <div className="chart-row">
          <div className="chart-container">
            <h3>📈 Распределение по статусам</h3>
            <div className="chart">
              {['completed', 'in-progress', 'not-started'].map(status => {
                const count = getTechnologiesByStatus(status).length;
                const percentage = technologies.length > 0 
                  ? Math.round((count / technologies.length) * 100) 
                  : 0;
                
                return (
                  <div key={status} className="chart-bar">
                    <div className="bar-label">
                      <span>
                        {status === 'completed' ? '✅ Завершено' :
                         status === 'in-progress' ? '🔄 В процессе' : '⭕ Не начато'}
                      </span>
                      <span>{count} ({percentage}%)</span>
                    </div>
                    <div className="bar-track">
                      <div 
                        className="bar-fill"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="chart-container">
            <h3>🏷️ Распределение по категориям</h3>
            <div className="chart">
              {Object.entries(categoryStats).map(([category, count]) => {
                const percentage = Math.round((count / technologies.length) * 100);
                return (
                  <div key={category} className="chart-bar">
                    <div className="bar-label">
                      <span className={`category category-${category}`}>
                        {category}
                      </span>
                      <span>{count} ({percentage}%)</span>
                    </div>
                    <div className="bar-track">
                      <div 
                        className="bar-fill"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="chart-row">
          <div className="chart-container">
            <h3>🎯 Распределение по сложности</h3>
            <div className="chart">
              {Object.entries(difficultyStats).map(([difficulty, count]) => {
                const percentage = Math.round((count / technologies.length) * 100);
                return (
                  <div key={difficulty} className="chart-bar">
                    <div className="bar-label">
                      <span className={`difficulty difficulty-${difficulty}`}>
                        {difficulty === 'beginner' ? '👶 Начальный' :
                         difficulty === 'intermediate' ? '💪 Средний' : '🔥 Продвинутый'}
                      </span>
                      <span>{count} ({percentage}%)</span>
                    </div>
                    <div className="bar-track">
                      <div 
                        className="bar-fill"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="chart-container">
            <h3>📅 Последние изученные технологии</h3>
            <div className="recent-completed">
              {completed.slice(0, 5).map(tech => (
                <div key={tech.id} className="recent-item">
                  <span className="tech-name">{tech.title}</span>
                  <span className="tech-category">{tech.category}</span>
                </div>
              ))}
              {completed.length === 0 && (
                <p className="no-data">🚫 Пока нет завершенных технологий</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;