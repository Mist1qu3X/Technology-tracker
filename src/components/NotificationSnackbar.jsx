import React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

const NotificationSnackbar = ({
  open,
  onClose,
  message,
  type = 'info',
  title,
  autoHideDuration = 6000,
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  const getSeverity = () => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'info';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '';
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      sx={{
        '& .MuiSnackbarContent-root': {
          minWidth: '300px',
        },
      }}
    >
      <Alert
        onClose={handleClose}
        severity={getSeverity()}
        variant="filled"
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: '400px' },
          '& .MuiAlert-icon': {
            fontSize: '1.5rem',
          },
        }}
      >
        {title && <AlertTitle>{getIcon()} {title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSnackbar;

