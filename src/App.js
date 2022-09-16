import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login';

import Dashboard from './components/home/Dashboard';
import WriteArticle from './components/home/WriteArticle';
import MyArticles from './components/home/MyArticles';
import ViewArticle from './components/home/ViewArticle';
import EditArticle from './components/home/EditArticle';

import { UserAuth } from './context/AuthContext';

function App() {
  const { user } = UserAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/article/:documentId" element={<ViewArticle />} />

        <Route path="/write" element={user ? <WriteArticle /> : <Login />} />
        <Route
          path="/my-articles"
          element={user ? <MyArticles /> : <Login />}
        />
        <Route
          path="/edit-article/:articleId"
          element={user ? <EditArticle /> : <Login />}
        />

        <Route path="/signup" element={user ? <Dashboard /> : <Signup />} />
        <Route path="/login" element={user ? <Dashboard /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
