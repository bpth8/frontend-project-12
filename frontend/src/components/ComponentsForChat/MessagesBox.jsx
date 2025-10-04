import { useEffect, useRef } from 'react';

const MessagesBox = ({ channelMessages }) => {
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, [channelMessages]);

  return (
    <div
      id="messages-box"
      className="chat-messages overflow-auto px-5"
      ref={messagesEndRef}
    >
      {channelMessages?.map(({ id, username, body }) => (
        <div className="ext-break mb-2" key={id}>
          <b>{username}</b>
          {': '}
          <span>{body}</span>
        </div>
      ))}
    </div>
  );
};

export default MessagesBox;
