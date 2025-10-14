import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const routes = {
  channelsPath: '/api/v1/channels',
  messagesPath: '/api/v1/messages',
  channelPath: (id) => `/api/v1/channels/${id}`,
};

export const fetchData = createAsyncThunk(
  'channels/fetchData',
  async (token, { rejectWithValue }) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [channelsResponse, messagesResponse] = await Promise.all([
        axios.get(routes.channelsPath, { headers }),
        axios.get(routes.messagesPath, { headers }),
      ]);

      const channels = channelsResponse.data;
      const messages = messagesResponse.data;

      const currentChannelId = channels.length > 0 ? channels[0].id : null;

      return { channels, messages, currentChannelId };
    } catch (error) {
      if (error.response) {
        return rejectWithValue({ status: error.response.status, message: error.response.statusText });
      }
      return rejectWithValue({ status: null, message: 'Network error or server unreachable' });
    }
  }
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(routes.channelPath(id), { headers });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  channels: [],
  currentChannelId: null,
  loadingStatus: 'idle',
  error: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addChannel: (state, action) => {
      const { id, name, removable } = action.payload;
      state.channels.push({ id, name, removable });
    },
    removeChannelSocket: (state, action) => {
      const { id } = action.payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
      if (state.currentChannelId === id) {
        state.currentChannelId = 1;
      }
    },
    renameChannelSocket: (state, action) => {
      const { id, name } = action.payload;
      const channel = state.channels.find((c) => c.id === id);
      if (channel) {
        channel.name = name;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        state.channels = channels;
        state.currentChannelId = currentChannelId;
        state.loadingStatus = 'succeeded';
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        if (action.payload && action.payload.status === 401) {
          state.error = 'Unauthorized';
        } else {
          state.error = action.payload?.message || action.error.message;
        }
      })
      .addCase(removeChannel.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(removeChannel.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setCurrentChannel, addChannel, removeChannelSocket, renameChannelSocket } = channelsSlice.actions;
export default channelsSlice.reducer;
