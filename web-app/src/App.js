import React, { useState } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from './pages/admins/AdminLayout';
import { queryClient, setQueryDefaults } from './services/QueryClient';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import AppRoutes from './routes/Routes';
import DateFnsUtils from '@date-io/date-fns';

// Custom theme setup
const customTheme = createTheme({
  overrides: {
    MuiTableRow: {
      head: {
        background: "#121212",
        color: 'white',
      },
    },
    MuiTableSortLabel: {
      root: {
        color: 'white',
        fontSize: '1.2em',
        '&.MuiTableSortLabel-active': {
          color: '#121212',
        },
        '& *': {
          color: '#121212 !important',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#121212',
    },
    secondary: {
      main: '#DB0007',
    },
    text: {
      primary: '#121212', // White text for contrast
      secondary: '#121212', // Yellow secondary text
    },
 
    type: 'light',
  },
  toolbarHeight: 50,
});

setQueryDefaults();

const App = () => {
  const [theme, setTheme] = useState(customTheme);
  return (
    <AuthProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={createTheme(theme)}>
            <CssBaseline />
            <Routes>{AppRoutes}</Routes>
          </ThemeProvider>
          </MuiPickersUtilsProvider>
        </QueryClientProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;