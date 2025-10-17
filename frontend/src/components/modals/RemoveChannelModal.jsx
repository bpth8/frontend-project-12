import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { removeChannel } from '../../slices/channelsSlice';

const RemoveChannelModal = ({ show, handleClose, modalInfo, sendMessage }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id: channelId, name: channelName } = modalInfo.item;

  const handleRemove = async () => {
    setIsSubmitting(true);
    try {
      await dispatch(removeChannel({ id: channelId, sendMessage }));
      toast.success(t('notifications.channel_removed'));
      handleClose();
    } catch (error) {
      toast.error(t('notifications.network_error'));
      console.error('Ошибка удаления канала:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          {t('modals.removeConfirmation')}{' '}
          <strong className="text-danger">#{channelName}</strong>?
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
          disabled={isSubmitting}
        >
          {t('modals.cancel')}
        </Button>
        <Button
          variant="danger"
          onClick={handleRemove}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? t('modals.removing')
            : t('modals.removeChannel')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
