import { useState, useEffect } from 'react';

const initialTechnologies = [
  {
    id: 1,
    title: 'React Components',
    description: 'Изучение базовых компонентов и JSX',
    category: 'frontend',
    status: 'in-progress',
    difficulty: 'beginner',
    resources: ['https://react.dev'],
    notes: 'Нужно практиковаться больше!',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Node.js Basics',
    description: 'Основы серверного JavaScript',
    category: 'backend',
    status: 'not-started',
    difficulty: 'beginner',
    resources: ['https://nodejs.org'],
    notes: '',
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: 'TypeScript',
    description: 'Типизированное надмножество JavaScript',
    category: 'language',
    status: 'completed',
    difficulty: 'intermediate',
    resources: ['https://www.typescriptlang.org'],
    notes: 'Отличный инструмент для больших проектов',
    createdAt: new Date().toISOString()
  }
];

export const useTechnologies = () => {
  const [technologies, setTechnologies] = useState(() => {
    const saved = localStorage.getItem('technologies');
    return saved ? JSON.parse(saved) : initialTechnologies;
  });

  useEffect(() => {
    localStorage.setItem('technologies', JSON.stringify(technologies));
  }, [technologies]);

  const addTechnology = (techData) => {
    // Генерируем уникальный ID, используя timestamp + случайное число для избежания дубликатов
    const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
    const newTech = {
      id: uniqueId,
      ...techData,
      status: techData.status || 'not-started',
      createdAt: new Date().toISOString()
    };
    setTechnologies(prev => [...prev, newTech]);
    return newTech;
  };

  const updateTechnology = (id, updates) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === id ? { ...tech, ...updates } : tech
      )
    );
  };

  const deleteTechnology = (id) => {
    setTechnologies(prev => prev.filter(tech => tech.id !== id));
  };

  const updateStatus = (id, newStatus) => {
    updateTechnology(id, { status: newStatus });
  };

  const updateNotes = (id, newNotes) => {
    updateTechnology(id, { notes: newNotes });
  };

  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    return Math.round((completed / technologies.length) * 100);
  };

  const getTechnologiesByStatus = (status) => {
    return technologies.filter(tech => tech.status === status);
  };

  return {
    technologies,
    addTechnology,
    updateTechnology,
    deleteTechnology,
    updateStatus,
    updateNotes,
    progress: calculateProgress(),
    getTechnologiesByStatus
  };
};