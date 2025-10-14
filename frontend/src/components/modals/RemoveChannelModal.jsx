import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const RemoveChannelModal = ({ show, handleClose, modalInfo }) => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id: channelId, name: channelName } = modalInfo.item;
  const url = `/api/v1/channels/${channelId}`;
  const token = auth.getToken();
  const headers = { Authorization: `Bearer ${token}` };

  const handleRemove = async () => {
    setIsSubmitting(true);

    try {
      await axios.delete(url, { headers });
      handleClose();
    } catch (e) {
      console.error('Ошибка удаления канала:', e);
      alert(t('validation.networkError'));
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
        <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
          {t('modals.cancel')}
        </Button>
        <Button variant="danger" onClick={handleRemove} disabled={isSubmitting}>
          {isSubmitting ? t('modals.removing') : t('modals.removeChannel')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
