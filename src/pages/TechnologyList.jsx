import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTechnologies } from '../hooks/useTechnologies';
import TechnologyCard from '../components/TechnologyCard';
import ApiImport from '../components/ApiImport';

const TechnologyList = () => {
  const { technologies, updateStatus, updateNotes, addTechnology } = useTechnologies();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const handleImport = (importedTechnologies) => {
    importedTechnologies.forEach(tech => {
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

  const filteredTechnologies = technologies.filter(tech => {
    const matchesSearch = tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tech.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tech.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || tech.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = [...new Set(technologies.map(tech => tech.category))];
  const statusCounts = {
    all: technologies.length,
    'not-started': technologies.filter(t => t.status === 'not-started').length,
    'in-progress': technologies.filter(t => t.status === 'in-progress').length,
    completed: technologies.filter(t => t.status === 'completed').length,
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>📚 Все технологии</h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <ApiImport onImport={handleImport} />
          <Link to="/add-technology" className="btn-primary">
            ➕ Добавить технологию
          </Link>
        </div>
      </div>

      {/* Фильтры и поиск */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Поиск по названию или описанию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-count">Найдено: {filteredTechnologies.length}</span>
        </div>

        <div className="filter-controls">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Все статусы ({statusCounts.all})</option>
            <option value="not-started">Не начато ({statusCounts['not-started']})</option>
            <option value="in-progress">В процессе ({statusCounts['in-progress']})</option>
            <option value="completed">Завершено ({statusCounts.completed})</option>
          </select>

          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Все категории</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Список технологий */}
      <div className="technologies-grid">
        {filteredTechnologies.map(tech => (
          <TechnologyCard
            key={tech.id}
            technology={tech}
            onStatusChange={updateStatus}
            onNotesChange={updateNotes}
          />
        ))}
      </div>

      {filteredTechnologies.length === 0 && (
        <div className="empty-state">
          <p>🚫 Технологий не найдено</p>
          <p>Попробуйте изменить параметры поиска или добавьте новую технологию</p>
          <Link to="/add-technology" className="btn-primary">
            ➕ Добавить первую технологию
          </Link>
        </div>
      )}
    </div>
  );
};

export default TechnologyList;