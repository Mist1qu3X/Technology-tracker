import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import DashboardComponent from '../components/Dashboard';
import { useTechnologies } from '../hooks/useTechnologies';

const Dashboard = () => {
  const navigate = useNavigate();
  const { technologies, updateStatus, deleteTechnology } = useTechnologies();

  const handleStatusChange = (techId) => {
    const tech = technologies.find(t => t.id === techId);
    if (!tech) return;

    const statusOrder = ['not-started', 'in-progress', 'completed'];
    const currentIndex = statusOrder.indexOf(tech.status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    updateStatus(techId, statusOrder[nextIndex]);
  };

  const handleDetailsClick = (techId) => {
    navigate(`/technology/${techId}`);
  };

  const handleDelete = (techId) => {
    deleteTechnology(techId);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <DashboardComponent
        technologies={technologies}
        onStatusChange={handleStatusChange}
        onDetailsClick={handleDetailsClick}
        onDelete={handleDelete}
      />
    </Container>
  );
};

export default Dashboard;

