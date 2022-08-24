import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login';
import ForgotPassword from './components/authentication/ForgotPassword';

import Dashboard from './components/home/Dashboard';
import WriteArticle from './components/home/WriteArticle';
import MyArticles from './components/home/MyArticles';
import ViewArticle from './components/home/ViewArticle';
import EditArticle from './components/home/EditArticle';

import { UserAuth } from './context/AuthContext';
import ProtectedRoute from './components/authentication/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/article/:articleID" element={<ViewArticle />} />

        <Route
          path="/write"
          element={
            <ProtectedRoute>
              <WriteArticle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-articles"
          element={
            <ProtectedRoute>
              <MyArticles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-article/:articleID"
          element={
            <ProtectedRoute>
              <EditArticle />
            </ProtectedRoute>
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/forgotpassword" element={<ForgotPassword />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
