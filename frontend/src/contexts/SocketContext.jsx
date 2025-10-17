import React, { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext({});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const auth = useAuth();
  const token = auth.getToken();

  const socket = useMemo(() => {
    return io({
        extraHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });
  }, [token]);
  
  const sendEvent = (eventName, data) => new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`Socket timeout for event: ${eventName}`));
    }, 3000);

    socket.emit(eventName, data, (response) => {
      clearTimeout(timeout);
      if (response.status === 'ok') {
        resolve(response.data); 
      } else {
        reject(new Error(response.data.status));
      }
    });
  });

  const contextValue = useMemo(() => ({
    socket,
    sendNewMessage: (data) => sendEvent('newMessage', data),
  }), [socket]);

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};