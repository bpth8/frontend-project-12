import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const MessagesPanel = () => {
  const messagesBoxRef = useRef(null);
  const { currentChannelId } = useSelector((state) => state.channels);
  const { channels } = useSelector((state) => state.channels);
  const allMessages = useSelector((state) => state.messages.messages);
  const currentMessages = allMessages.filter(
    (message) => message.channelId === currentChannelId,
  );
  
  const currentChannel = channels.find((c) => c.id === currentChannelId);
  
  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  }, [currentMessages.length]);

  const messagesCount = currentMessages.length;
  const headerText = currentChannel ? `# ${currentChannel.name}` : '';
  const countText = messagesCount === 1 
    ? '1 сообщение' 
    : `${messagesCount} сообщений`;


  return (
    <div className="d-flex flex-column h-100">
      {}
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{headerText}</b>: {countText}
        </p>
      </div>
      
      {}
      <div 
        id="messages-box" 
        className="chat-messages overflow-auto px-5"
        ref={messagesBoxRef}
      >
        {currentMessages.map((message) => (
          <div key={message.id} className="text-break mb-2">
            <span className="fw-bold text-primary me-2">
              {message.username}
            </span>
            {message.body}
          </div>
        ))}
      </div>
      
      {}
    </div>
  );
};

export default MessagesPanel;