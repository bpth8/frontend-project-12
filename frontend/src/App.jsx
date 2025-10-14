import { Routes, Route } from 'react-router-dom';
import ChatPage from './components/ChatPage';
import LoginPage from './components/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './components/NotFoundPage';
import PrivateRoute from './components/PrivateRoute'; 
import Header from './components/Header';

function App() {
  return (
    <div className="d-flex flex-column h-100">
      <Header /> {}
      <div className="container h-100 my-4">
        <Routes>
          { }
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            } 
          />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} /> {}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;