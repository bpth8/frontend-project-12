import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../api/chatApi';

const RemoveModal = ({ closeModal }) => {
  const { t } = useTranslation();
  const [removeChannel] = useRemoveChannelMutation();
  const channel = useSelector((state) => state.modal.channel);
  const handleRemove = async (currentChannel) => {
    try {
      await removeChannel(currentChannel);
      toast.success(t('toastify.success.remove'));
      closeModal();
    } catch (error) {
      console.log(error);
      if (error.message === 'Network Error') {
        toast.error(t('toastify.error.connectionError'));
      } else {
        toast.error(t('toastify.error.error'));
      }
    }
  };

  return (
    <Modal show="true" onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.remove.question')}</p>
        <Form.Group className="d-flex justify-content-end">
          <Button
            type="button"
            className="me-2 btn btn-secondary"
            onClick={closeModal}
          >
            {t('modal.remove.closeButton')}
          </Button>
          <Button
            type="button"
            className="btn btn-danger"
            onClick={() => handleRemove(channel)}
          >
            {t('modal.remove.removeButton')}
          </Button>
        </Form.Group>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
