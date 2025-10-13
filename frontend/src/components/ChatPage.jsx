import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import { setInitialState } from '../slices/channelsSlice'; 
import { setMessages, addMessage } from '../slices/messagesSlice'; 
import { useSocket } from '../contexts/SocketContext';
import ChannelsList from './ChannelsList';
import MessagesPanel from './MessagesPanel';
import MessageForm from './MessageForm';

const ChatPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const socket = useSocket();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = auth.getToken(); 
        const headers = { Authorization: `Bearer ${token}` };

        const [channelsResponse, messagesResponse] = await Promise.all([
          axios.get('/api/v1/channels', { headers }),
          axios.get('/api/v1/messages', { headers }),
        ]);

        const channels = channelsResponse.data;
        const messages = messagesResponse.data;
        const currentChannelId = channels.length > 0 ? channels[0].id : null; 
        
        dispatch(setInitialState({ channels, currentChannelId })); 
        dispatch(setMessages(messages)); 
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError('Не удалось загрузить данные чата. Попробуйте снова.');
        console.error('Ошибка загрузки данных:', e);
        
        if (e.response && e.response.status === 401) {
          auth.logOut();
        }
      }
    };

    fetchData();
  }, [auth, dispatch]);

  useEffect(() => {
    if (!loading) {
      socket.socket.on('newMessage', (payload) => {
        dispatch(addMessage(payload));
      });

      return () => {
        socket.socket.off('newMessage');
      };
    }
  }, [loading, dispatch, socket.socket]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-danger text-center mt-5">{error}</div>;
  }
  
  return (
    <div className="row h-100">
      {}
      <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
        <div className="d-flex justify-content-between align-items-center mb-2 ps-4 pe-2">
            <b>Каналы</b>
            {}
        </div>
        <ChannelsList /> 
      </div>
      
      {}
      <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          
          {}
          <MessagesPanel /> 
          
          {}
          <div className="mt-auto px-5 py-3">
            <MessageForm /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;