import { createSlice } from '@reduxjs/toolkit';
import { fetchData, removeChannel } from './channelsSlice';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.messages = action.payload.messages;
      })
      .addCase(removeChannel.fulfilled, (state, action) => {
        const channelIdToRemove = action.payload;
        state.messages = state.messages.filter(
          (message) => message.channelId !== channelIdToRemove
        );
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
