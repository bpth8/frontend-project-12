import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { useFormik } from 'formik';
import { useRenameChannelMutation, useGetChannelsQuery } from '../../api/chatApi';
import { channelNamesShema } from '../../registrationRequirement/registrationRequirement';

const RenameModal = ({ closeModal }) => {
  const { t } = useTranslation();
  const channel = useSelector((state) => state.modal.channel);
  const { data: channels } = useGetChannelsQuery();
  const [renameChannel] = useRenameChannelMutation();
  const channelNames = channels?.map((c) => c.name);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    validationSchema: channelNamesShema(channelNames, t),
    onSubmit: async ({ name }) => {
      const filteredName = filter.clean(name);
      const updatedChannel = {
        id: channel.id,
        name: filteredName,
      };
      try {
        await renameChannel(updatedChannel);
        toast.success(t('toastify.success.rename'));
        closeModal();
      } catch (error) {
        console.log(error);
        if (error.message === 'Network Error') {
          toast.error(t('toastify.error.connectionError'));
        } else {
          toast.error(t('toastify.error.error'));
        }
      }
    },
  });

  return (
    <Modal show="true" onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="name"
              id="name"
              className="mb-2"
              isInvalid={formik.touched.name && formik.errors.name}
              ref={inputRef}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <Form.Label className="visually-hidden" htmlFor="name">
              {t('modal.label')}
            </Form.Label>
            {formik.touched.name && formik.errors.name && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            )}
            <div className="d-flex justify-content-end">
              <Button
                type="button"
                variant="secondary"
                className="me-2"
                onClick={closeModal}
              >
                {t('modal.rename.closeButton')}
              </Button>
              <Button
                type="submit"
                variant="primary"
              >
                {t('modal.rename.submitButton')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
