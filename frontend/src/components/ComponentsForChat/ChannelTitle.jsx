import { useTranslation } from 'react-i18next';
import ChannelButtonAdd from './ChannelButtonAdd';

const ChannelTitle = ({ openModal }) => {
  const { t } = useTranslation();
  return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>{t('channelTitle.title')}</b>
      <ChannelButtonAdd openModal={openModal} />
    </div>
  );
};

export default ChannelTitle;
