import { Button, Form, Modal } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { useAddChannelMutation, useGetChannelsQuery } from '../../api/chatApi';
import { channelNamesShema } from '../../registrationRequirement/registrationRequirement';
import { setActiveChannel } from '../../slices/activeChannelSlice';

const AddModal = ({ closeModal }) => {
  const { t } = useTranslation();
  const [addChannel] = useAddChannelMutation();
  const { data: channels } = useGetChannelsQuery();
  const channelNames = channels?.map((channel) => channel.name);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelNamesShema(channelNames, t),
    onSubmit: async ({ name }) => {
      try {
        const filteredName = filter.clean(name);
        const newChannel = await addChannel({ name: filteredName });
        dispatch(setActiveChannel(newChannel.data));
        toast.success(t('toastify.success.add'));
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

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show="true" onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.add.title')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              name="name"
              id="name"
              className="mb-2"
              ref={inputRef}
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Label
              className="visually-hidden"
              htmlFor="name"
            >
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
                {t('modal.add.closeButton')}
              </Button>
              <Button variant="primary" type="submit">
                {t('modal.add.submitButton')}
              </Button>
            </div>
          </Form.Group>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddModal;
