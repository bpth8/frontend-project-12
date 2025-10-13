import { Routes, Route } from 'react-router-dom';
import ChatPage from './components/ChatPage';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <div className="d-flex flex-column h-100">
      <div className="container h-100 my-4">
        { }
        <Routes>
          { }
          <Route path="/" element={<ChatPage />} />
          
          { }
          <Route path="/login" element={<LoginPage />} />
          
          { }
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
