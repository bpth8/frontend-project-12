import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChatPage from './components/ChatPage';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Чат</Link> | <Link to="/login">Вход</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;