import { useGetChannelsQuery } from '../api/chatApi';
import defaultChannel from '../slices/defaultChannel';

const useActiveChannel = (channel = defaultChannel) => {
  const { data: channels, isLoading } = useGetChannelsQuery();
  if (isLoading) {
    return { activeChannelId: null, activeChannelName: 'Loading...' };
  }
  const foundChannel = channels?.find((c) => c.id === channel.id);
  const activeChannel = foundChannel || defaultChannel;
  const activeChannelId = activeChannel.id;
  const activeChannelName = activeChannel.name;
  return {
    activeChannelId, activeChannelName, channels, isLoading,
  };
};

export default useActiveChannel;
