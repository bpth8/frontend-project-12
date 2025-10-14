import React, { useRef, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const RenameChannelModal = ({ show, handleClose, modalInfo }) => {
  const { t } = useTranslation();
  const auth = useAuth();
  const inputRef = useRef(null);

  const { id: channelId, name: channelName } = modalInfo.item;
  const { channels } = useSelector((state) => state.channels);

  const channelNames = channels
    .map((c) => c.name)
    .filter((name) => name !== channelName);

  const schema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t('validation.required'))
      .min(3, t('validation.channelMin'))
      .max(20, t('validation.channelMax'))
      .notOneOf(channelNames, t('validation.channelUnique')),
  });

  useEffect(() => {
    if (show) {
      setTimeout(() => inputRef.current.select(), 0);
    }
  }, [show]);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
  setSubmitting(true);

  const newName = values.name.trim();
  const renameData = {
    name: newName,
  };

  const token = auth.getToken();
  const headers = { Authorization: `Bearer ${token}` };
  const url = `/api/v1/channels/${channelId}`;

  try {
    await axios.patch(url, renameData, { headers });
    handleClose();
  } catch (e) {
    console.error('Ошибка переименования канала:', e);
    setFieldError('name', t('validation.networkError'));
  } finally {
    setSubmitting(false);
  }
};

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
      </Modal.Header>

      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{ name: channelName }}
      >
        {({ handleSubmit, touched, errors, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <div className="form-group">
                <Field
                  name="name"
                  type="text"
                  placeholder={t('validation.channelNamePlaceholder')}
                  className={`mb-2 form-control ${
                    touched.name && errors.name ? 'is-invalid' : ''
                  }`}
                  innerRef={inputRef}
                  disabled={isSubmitting}
                  autoComplete="off"
                />
                {touched.name && errors.name && (
                  <div className="invalid-feedback d-block">
                    {errors.name}
                  </div>
                )}
                <label htmlFor="name" className="visually-hidden">
                  {t('validation.channelName')}
                </label>
              </div>
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
                type="submit"
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('modals.renaming') : t('modals.submit')}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default RenameChannelModal;
