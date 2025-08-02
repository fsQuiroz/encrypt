import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, type Theme, ThemeProvider } from '@mui/material';

const theme: Theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#04121f',
      paper: '#09213f',
    },
    primary: {
      main: '#3874CB',
      contrastText: '#fff',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
