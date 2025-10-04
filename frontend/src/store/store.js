import { configureStore } from '@reduxjs/toolkit';
import activeChannelReducer from '../slices/activeChannelSlice.js';
import modalReducer from '../slices/modalSlice.js';
import { chatApi } from '../api/chatApi.js';

const store = configureStore({
  reducer: {
    [chatApi.reducerPath]: chatApi.reducer,
    activeChannel: activeChannelReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(chatApi.middleware),
});

export default store;
