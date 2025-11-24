import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Badge,
} from '@mui/material';
import {
  CheckCircle,
  Sync,
  RadioButtonUnchecked,
  School,
  TrendingUp,
} from '@mui/icons-material';
import SimpleTechCard from './SimpleTechCard';

// Компонент для содержимого вкладок
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Dashboard = ({ technologies, onStatusChange, onDetailsClick }) => {
  const [tabValue, setTabValue] = useState(0);

  // Рассчитываем статистику
  const stats = {
    total: technologies.length,
    completed: technologies.filter(t => t.status === 'completed').length,
    inProgress: technologies.filter(t => t.status === 'in-progress').length,
    notStarted: technologies.filter(t => t.status === 'not-started').length,
  };

  stats.completionRate = stats.total > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  // Функция для получения технологий по статусу
  const getTechnologiesByStatus = (status) => {
    return technologies.filter(tech => tech.status === status);
  };

  // Обработчик смены вкладки
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Шапка приложения */}
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            📊 Панель управления технологиями
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Статистические карточки */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <School sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h4" component="div">
                  {stats.total}
                </Typography>
              </Box>
              <Typography color="text.secondary" variant="body2">
                Всего технологий
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle sx={{ mr: 1, color: 'success.main' }} />
                <Typography variant="h4" component="div">
                  {stats.completed}
                </Typography>
              </Box>
              <Typography color="text.secondary" variant="body2">
                Завершено
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Sync sx={{ mr: 1, color: 'warning.main' }} />
                <Typography variant="h4" component="div">
                  {stats.inProgress}
                </Typography>
              </Box>
              <Typography color="text.secondary" variant="body2">
                В процессе
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUp sx={{ mr: 1, color: 'info.main' }} />
                <Typography variant="h4" component="div">
                  {stats.completionRate}%
                </Typography>
              </Box>
              <Typography color="text.secondary" variant="body2">
                Процент выполнения
              </Typography>
              <LinearProgress
                variant="determinate"
                value={stats.completionRate}
                sx={{ mt: 2, height: 8, borderRadius: 4 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Вкладки */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs">
          <Tab
            label={
              <Badge badgeContent={stats.total} color="primary">
                Все
              </Badge>
            }
            id="dashboard-tab-0"
            aria-controls="dashboard-tabpanel-0"
          />
          <Tab
            label={
              <Badge badgeContent={stats.completed} color="success">
                Завершено
              </Badge>
            }
            id="dashboard-tab-1"
            aria-controls="dashboard-tabpanel-1"
          />
          <Tab
            label={
              <Badge badgeContent={stats.inProgress} color="warning">
                В процессе
              </Badge>
            }
            id="dashboard-tab-2"
            aria-controls="dashboard-tabpanel-2"
          />
          <Tab
            label={
              <Badge badgeContent={stats.notStarted} color="error">
                Не начато
              </Badge>
            }
            id="dashboard-tab-3"
            aria-controls="dashboard-tabpanel-3"
          />
        </Tabs>
      </Box>

      {/* Содержимое вкладок */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {technologies.length === 0 ? (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography align="center" color="text.secondary">
                    🚫 Технологий пока нет
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            technologies.map((tech) => (
              <Grid item xs={12} sm={6} md={4} key={tech.id}>
                <SimpleTechCard
                  technology={tech}
                  onStatusChange={onStatusChange}
                  onDetailsClick={onDetailsClick}
                />
              </Grid>
            ))
          )}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {getTechnologiesByStatus('completed').length === 0 ? (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography align="center" color="text.secondary">
                    🚫 Завершённых технологий пока нет
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            getTechnologiesByStatus('completed').map((tech) => (
              <Grid item xs={12} sm={6} md={4} key={tech.id}>
                <SimpleTechCard
                  technology={tech}
                  onStatusChange={onStatusChange}
                  onDetailsClick={onDetailsClick}
                />
              </Grid>
            ))
          )}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          {getTechnologiesByStatus('in-progress').length === 0 ? (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography align="center" color="text.secondary">
                    🚫 Технологий в процессе изучения пока нет
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            getTechnologiesByStatus('in-progress').map((tech) => (
              <Grid item xs={12} sm={6} md={4} key={tech.id}>
                <SimpleTechCard
                  technology={tech}
                  onStatusChange={onStatusChange}
                  onDetailsClick={onDetailsClick}
                />
              </Grid>
            ))
          )}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          {getTechnologiesByStatus('not-started').length === 0 ? (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography align="center" color="text.secondary">
                    🚫 Не начатых технологий пока нет
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            getTechnologiesByStatus('not-started').map((tech) => (
              <Grid item xs={12} sm={6} md={4} key={tech.id}>
                <SimpleTechCard
                  technology={tech}
                  onStatusChange={onStatusChange}
                  onDetailsClick={onDetailsClick}
                />
              </Grid>
            ))
          )}
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default Dashboard;

