import React from 'react';
import { Box } from '@chakra-ui/react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './components/home/Dashboard';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Dashboard />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
