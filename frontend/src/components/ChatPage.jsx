import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';
import { fetchData } from '../slices/channelsSlice';
import ChannelsBox from '../components/ChannelsBox';
import MessageForm from '../components/MessageForm';
import AddChannelModal from '../components/modals/AddChannelModal';
import RenameChannelModal from '../components/modals/RenameChannelModal';
import RemoveChannelModal from '../components/modals/RemoveChannelModal';

const modals = {
  adding: AddChannelModal,
  renaming: RenameChannelModal,
  removing: RemoveChannelModal,
};

const ChatPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const navigate = useNavigate();
  const { socket } = useSocket();

  const { currentChannelId, loadingStatus, channels } = useSelector((state) => state.channels);
  const messages = useSelector((state) => state.messages.messages);

  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const handleShowModal = (type, item = null) => setModalInfo({ type, item });
  const handleCloseModal = () => setModalInfo({ type: null, item: null });

  useEffect(() => {
    const token = auth.getToken();
    if (!token) {
      auth.logOut();
      navigate('/login');
      return;
    }
    
    dispatch(fetchData(token));
  }, [auth, dispatch, navigate]);

  useEffect(() => {
    if (!socket || loadingStatus !== 'succeeded') return;
    
    socket.on('newMessage', (payload) => {
      dispatch({ type: 'messages/addMessage', payload });
    });

    socket.on('newChannel', (payload) => {
      dispatch({ type: 'channels/addChannel', payload });
      dispatch({ type: 'channels/setCurrentChannel', payload: payload.id });
    });
    
    socket.on('removeChannel', (payload) => {
      dispatch({ type: 'channels/removeChannelSocket', payload });
    });

    socket.on('renameChannel', (payload) => {
      dispatch({ type: 'channels/renameChannelSocket', payload });
    });

    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [socket, dispatch, loadingStatus]);


  const currentChannel = useMemo(() => 
    channels.find((c) => c.id === currentChannelId) || { name: 'Неизвестно' },
    [channels, currentChannelId]
  );
  
  const currentMessages = useMemo(() => 
    messages.filter((m) => m.channelId === currentChannelId),
    [messages, currentChannelId]
  );
  
  const ModalComponent = modals[modalInfo.type];


  if (loadingStatus === 'loading') {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }

  if (loadingStatus === 'failed') {
    return <div className="text-danger text-center mt-5">Не удалось загрузить данные чата. Проверьте подключение и повторите вход.</div>;
  }
  
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        
        {}
        <ChannelsBox handleShowModal={handleShowModal} />

        {}
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            {}
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0"><b># {currentChannel.name}</b></p>
              <span className="text-muted">
                {currentMessages.length} {currentMessages.length === 1 ? 'сообщение' : 'сообщения'}
              </span>
            </div>

            {}
            <div id="messages-box" className="chat-messages overflow-auto px-5">
              {currentMessages.map((message) => (
                <div key={message.id} className="text-break mb-2">
                  <span className="fw-bold me-2 text-primary">{message.username}</span>
                  {message.body}
                </div>
              ))}
            </div>

            {}
            <div className="mt-auto px-5 py-3">
              <MessageForm />
            </div>
          </div>
        </div>
      </div>
      
      {}
      {ModalComponent && (
        <ModalComponent 
          show={!!modalInfo.type} 
          handleClose={handleCloseModal} 
          modalInfo={modalInfo}
        />
      )}
    </div>
  );
};

export default ChatPage;
