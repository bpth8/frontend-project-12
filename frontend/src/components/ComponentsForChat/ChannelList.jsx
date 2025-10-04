import { useSelector, useDispatch } from 'react-redux';
import useActiveChannel from '../../customHooks/useActiveChannel';
import { activeChannelSelector } from '../../slices/activeChannelSlice';
import ChannelTitle from './ChannelTitle';
import Loading from '../CommonComponentsForPages/Loading';
import ChannelItem from './ChannelItem';
import DropdownButton from './DropdownButton';
import { openModal, closeModal } from '../../slices/modalSlice';
import getModal from '../ModalsWindows/index';

const renderChannels = (channel, isRemovableChannel, handleOpenModal) => (
  <li className="nav-item w-100" key={channel.id}>
    {isRemovableChannel(channel) ? (
      <DropdownButton
        openModal={handleOpenModal}
        channel={channel}
      />
    ) : (
      <ChannelItem channel={channel} />
    )}
  </li>
);

const renderModal = (type, close, channel) => {
  if (!type) {
    return null;
  }

  const Component = getModal(type);
  return <Component closeModal={close} channel={channel} />;
};

const ChannelList = () => {
  const activeChannel = useSelector(activeChannelSelector);
  const { channels, isLoading } = useActiveChannel(activeChannel);
  const modalType = useSelector((state) => state.modal.modalType);
  const dispatch = useDispatch();
  const handleOpenModal = (type, channel) => dispatch(openModal({ type, channel }));
  const handleCloseModal = () => dispatch(closeModal());
  const isRemovableChannel = (channel) => channel.removable;

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <ChannelTitle
        openModal={handleOpenModal}
      />
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {isLoading && <Loading />}
        {channels?.map((channel) => (
          renderChannels(channel, isRemovableChannel, handleOpenModal)
        ))}
      </ul>
      {renderModal(modalType, handleCloseModal)}
    </div>
  );
};

export default ChannelList;
