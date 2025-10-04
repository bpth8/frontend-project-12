import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { activeChannelSelector } from '../../slices/activeChannelSlice';
import useActiveChannel from '../../customHooks/useActiveChannel';
import {
  useAddMessagesMutation,
  useGetMessagesQuery,
} from '../../api/chatApi';
import MessagesBox from './MessagesBox';
import MessagesForm from './MessagesForm';

const MessagesContainer = () => {
  const { t } = useTranslation();
  const activeChannel = useSelector(activeChannelSelector);
  const { activeChannelId, activeChannelName } = useActiveChannel(activeChannel);
  const { data: messages, isLoading } = useGetMessagesQuery();
  const [addMessage] = useAddMessagesMutation();
  const channelMessages = messages?.filter((message) => message.channelId === activeChannelId);
  const countMessages = channelMessages?.length || 0;
  const username = localStorage.getItem('username');

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${activeChannelName}`}</b>
          </p>
          <span className="text-muted">{t('messagesContainer.messages', { count: countMessages })}</span>
        </div>
        <MessagesBox channelMessages={channelMessages} />
        <div className="mt-auto px-5 py-3">
          <MessagesForm
            channelId={activeChannelId}
            username={username}
            addMessage={addMessage}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default MessagesContainer;
