import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      const { channels, currentChannelId } = action.payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
});

export const { setInitialState, setCurrentChannel } = channelsSlice.actions;

export default channelsSlice.reducer;