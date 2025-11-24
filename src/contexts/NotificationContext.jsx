import React, { createContext, useContext, useState } from 'react';
import NotificationSnackbar from '../components/NotificationSnackbar';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: 'info',
    title: '',
    autoHideDuration: 6000,
  });

  const showNotification = (message, type = 'info', title = '', autoHideDuration = 6000) => {
    setNotification({
      open: true,
      message,
      type,
      title,
      autoHideDuration,
    });
  };

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const showSuccess = (message, title = 'Успешно') => {
    showNotification(message, 'success', title);
  };

  const showError = (message, title = 'Ошибка') => {
    showNotification(message, 'error', title);
  };

  const showWarning = (message, title = 'Внимание') => {
    showNotification(message, 'warning', title);
  };

  const showInfo = (message, title = 'Информация') => {
    showNotification(message, 'info', title);
  };

  const value = {
    showNotification,
    hideNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationSnackbar
        open={notification.open}
        onClose={hideNotification}
        message={notification.message}
        type={notification.type}
        title={notification.title}
        autoHideDuration={notification.autoHideDuration}
      />
    </NotificationContext.Provider>
  );
};

