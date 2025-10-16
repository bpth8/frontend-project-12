import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const routes = {
  channelsPath: '/api/v1/channels',
  messagesPath: '/api/v1/messages',
  channelPath: (id) => `/api/v1/channels/${id}`,
};

const handleAxiosError = (error, defaultMessage = 'Произошла ошибка.') => {
  if (!error.response) {
    toast.error('Ошибка сети. Не удалось подключиться к серверу.');
    return { status: null, message: 'Network error or server unreachable' };
  }

  const { status, statusText } = error.response;

  if (status === 401) {
    return { status, message: 'Unauthorized' };
  }

  toast.error(defaultMessage);
  return { status, message: statusText || defaultMessage };
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
      const handledError = handleAxiosError(error, 'Ошибка загрузки данных.');
      return rejectWithValue(handledError);
    }
  }
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async ({ id, sendMessage }, { rejectWithValue }) => {
    try {
      await sendMessage('removeChannel', { id });
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
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.payload?.message || action.error.message;
      })
      .addCase(removeChannel.fulfilled, (state, action) => {
        const removedChannelId = action.payload;
        state.channels = state.channels.filter((channel) => channel.id !== removedChannelId);
        if (state.currentChannelId === removedChannelId) {
          state.currentChannelId = 1;
        }
        state.error = null;
      })
      .addCase(removeChannel.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export const {
  setCurrentChannel,
  addChannel,
  removeChannelSocket,
  renameChannelSocket,
} = channelsSlice.actions;

export default channelsSlice.reducer;
