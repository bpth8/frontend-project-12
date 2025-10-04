import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { chatApi } from './chatApi';

const setupWebSocketListeners = (store) => {
  const { dispatch } = store;
  const socket = io();

  const errorState = {
    errorShown: false,
    timerId: null,
  };

  const resetErrorState = () => {
    if (errorState.timerId) {
      clearTimeout(errorState.timerId);
    }

    errorState.timerId = setTimeout(() => {
      errorState.errorShown = false;
    }, 60000);
  };

  socket.on('connect_error', (error) => {
    console.error('WebSocket Connection Error:', error);
    if (!errorState.errorShown) {
      errorState.errorShown = true;
      toast.error('Ошибка соединения');

      resetErrorState();
    }
  });

  socket.on('connect', () => {
    if (errorState.timerId) {
      clearTimeout(errorState.timerId);
    }
    errorState.errorShown = false;
  });

  socket.on('newMessage', (newMessage) => {
    dispatch(chatApi.util.updateQueryData('getMessages', undefined, (draft) => {
      draft.push(newMessage);
    }));
  });

  socket.on('newChannel', (newChannel) => {
    dispatch(chatApi.util.updateQueryData('getChannels', undefined, (draft) => {
      draft.push(newChannel);
    }));
  });

  socket.on('removeChannel', (channel) => {
    dispatch(chatApi.util.updateQueryData('getChannels', undefined, (draft) => {
      const index = draft.findIndex((c) => c.id === channel.id);
      if (index !== -1) {
        draft.splice(index, 1);
      }
    }));

    dispatch(chatApi.util.updateQueryData('getMessages', undefined, (draft) => draft.filter((message) => message.channelId !== channel.id)));
  });

  socket.on('renameChannel', (channel) => {
    dispatch(chatApi.util.updateQueryData('getChannels', undefined, (draft) => {
      const currentChannel = draft.find((c) => c.id === channel.id);
      if (currentChannel) {
        currentChannel.name = channel.name;
      }
    }));
  });
};

export default setupWebSocketListeners;
