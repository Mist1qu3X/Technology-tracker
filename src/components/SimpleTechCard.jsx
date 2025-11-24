import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Box,
} from '@mui/material';

const SimpleTechCard = ({ technology, onStatusChange, onDetailsClick, onDelete }) => {
  // Функция для определения цвета статуса
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'warning';
      case 'not-started':
        return 'error';
      default:
        return 'default';
    }
  };

  // Функция для получения русского текста статуса
  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Завершено';
      case 'in-progress':
        return 'В процессе';
      case 'not-started':
        return 'Не начато';
      default:
        return status;
    }
  };

  // Функция для получения иконки статуса
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'in-progress':
        return '🔄';
      case 'not-started':
        return '⭕';
      default:
        return '';
    }
  };

  // Функция для получения цвета категории
  const getCategoryColor = (category) => {
    const colors = {
      frontend: 'primary',
      backend: 'secondary',
      language: 'info',
      database: 'warning',
      devops: 'error',
    };
    return colors[category] || 'default';
  };

  // Функция для получения текста категории
  const getCategoryText = (category) => {
    const labels = {
      frontend: '🎨 Frontend',
      backend: '⚙️ Backend',
      language: '💻 Язык',
      database: '🗄️ База данных',
      devops: '🚀 DevOps',
    };
    return labels[category] || category;
  };

  // Функция для получения текста сложности
  const getDifficultyText = (difficulty) => {
    const labels = {
      beginner: '👶 Начальный',
      intermediate: '💪 Средний',
      advanced: '🔥 Продвинутый',
    };
    return labels[difficulty] || difficulty;
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: `4px solid`,
        borderLeftColor: getStatusColor(technology.status) === 'success' ? 'success.main' :
                        getStatusColor(technology.status) === 'warning' ? 'warning.main' : 'error.main',
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, flex: 1 }}>
            {technology.title}
          </Typography>
          <Chip
            label={`${getStatusIcon(technology.status)} ${getStatusText(technology.status)}`}
            color={getStatusColor(technology.status)}
            size="small"
            sx={{ ml: 1 }}
          />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '4.5rem',
          }}
        >
          {technology.description || 'Описание отсутствует'}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip
            label={getCategoryText(technology.category)}
            color={getCategoryColor(technology.category)}
            size="small"
            variant="outlined"
          />
          <Chip
            label={getDifficultyText(technology.difficulty)}
            size="small"
            variant="outlined"
            sx={{
              borderColor: 'text.secondary',
              color: 'text.secondary',
            }}
          />
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', width: '100%' }}>
          {technology.status !== 'completed' && (
            <Button
              size="small"
              variant="contained"
              color={getStatusColor(technology.status)}
              onClick={() => onStatusChange && onStatusChange(technology.id)}
              sx={{ flex: 1, minWidth: '120px' }}
            >
              {getStatusIcon(technology.status)} Сменить статус
            </Button>
          )}
          <Button
            size="small"
            variant={technology.status === 'completed' ? 'contained' : 'outlined'}
            onClick={() => onDetailsClick && onDetailsClick(technology.id)}
            sx={{ flex: 1, minWidth: '120px' }}
          >
            🔍 Подробнее
          </Button>
          {onDelete && (
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => {
                if (window.confirm(`Вы уверены, что хотите удалить технологию "${technology.title}"?`)) {
                  onDelete(technology.id);
                }
              }}
              sx={{ minWidth: '100px' }}
            >
              🗑️ Удалить
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default SimpleTechCard;

