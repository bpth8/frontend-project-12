import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Nav } from 'react-bootstrap';
import { setCurrentChannel } from '../slices/channelsSlice';

const ChannelsList = () => {
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.channels);

  const handleChannelClick = (id) => {
    dispatch(setCurrentChannel(id));
  };

  return (
    <Nav as="ul" variant="pills" fill className="flex-column px-2">
      {channels.map((channel) => (
        <Nav.Item as="li" key={channel.id}>
          <Button
            type="button"
            variant={channel.id === currentChannelId ? 'secondary' : 'light'}
            className="w-100 rounded-0 text-start"
            onClick={() => handleChannelClick(channel.id)}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default ChannelsList;