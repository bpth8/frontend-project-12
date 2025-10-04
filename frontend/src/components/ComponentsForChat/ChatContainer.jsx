import ChannelList from './ChannelList';
import MessagesContainer from './MessagesContainer';

const ChatContainer = () => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-white flex-md-row">
      <ChannelList />
      <MessagesContainer />
    </div>
  </div>
);

export default ChatContainer;
