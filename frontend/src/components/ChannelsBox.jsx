import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Nav, Dropdown } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { setCurrentChannel } from '../slices/channelsSlice';

const Channel = ({ channel, isActive, handleSelectChannel, handleShowModal }) => {
  const dispatch = useDispatch();
  const buttonClass = isActive ? 'text-start text-truncate btn-secondary' : 'text-start text-truncate';
  const handleSwitchChannel = () => {
    dispatch(setCurrentChannel(channel.id));
  };

  const ChannelButton = (
    <Button 
      variant={isActive ? 'secondary' : 'light'} 
      onClick={handleSwitchChannel}
      className={`w-100 ${buttonClass}`}
    >
      <span className="me-1">#</span>{channel.name}
    </Button>
  );

  if (!channel.removable) {
    return (
      <Nav.Item key={channel.id} className="w-100">
        {ChannelButton}
      </Nav.Item>
    );
  }

  return (
    <Nav.Item key={channel.id} className="w-100">
      <Dropdown as={Nav.Item} className="d-flex">
        {}
        {ChannelButton}

        {}
        <Dropdown.Toggle
          split
          variant={isActive ? 'secondary' : 'light'}
          id={`dropdown-channel-${channel.id}`}
          className="flex-grow-0"
        >
          <span className="visually-hidden">Управление каналом</span>
        </Dropdown.Toggle>

        {}
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleShowModal('removing', channel)}>
            Удалить
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleShowModal('renaming', channel)}>
            Переименовать
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

const ChannelsBox = ({ handleShowModal }) => {
  const { channels, currentChannelId } = useSelector((state) => state.channels);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2">
        <b>Каналы</b>
        <Button 
          onClick={() => handleShowModal('adding', null)} 
          variant="outline-primary" 
          className="p-0 text-primary btn-group-vertical"
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">Добавить канал</span>
        </Button>
      </div>
      
      {}
      <Nav 
        as="ul" 
        variant="pills" 
        fill 
        className="flex-column px-2 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            isActive={channel.id === currentChannelId}
            handleShowModal={handleShowModal}
          />
        ))}
      </Nav>
    </div>
  );
};

export default ChannelsBox;
