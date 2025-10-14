import React, { useRef, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const AddChannelModal = ({ show, handleClose, modalInfo }) => {
  const { t } = useTranslation();
  const auth = useAuth();
  const inputRef = useRef(null);
  const { channels } = useSelector((state) => state.channels);
  const channelNames = channels.map((c) => c.name);

  useEffect(() => {
    if (show) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [show]);

  const schema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t('validation.required'))
      .min(3, t('validation.channelMin'))
      .max(20, t('validation.channelMax'))
      .notOneOf(channelNames, t('validation.channelUnique')),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    setSubmitting(true);
    
    const newChannelData = {
      name: values.name.trim(),
    };

    const token = auth.getToken(); 
    const headers = { Authorization: `Bearer ${token}` };

    try {
      await axios.post('/api/v1/channels', newChannelData, { headers });
      
      handleClose(); 
    } catch (e) {
      console.error('Ошибка создания канала (HTTP POST):', e);
      setFieldError('name', t('validation.networkError')); 
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{ name: '' }}
      >
        {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <div className="form-group">
                <Field
                  name="name"
                  type="text"
                  placeholder="Имя канала"
                  className={`mb-2 form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                  innerRef={inputRef}
                  disabled={isSubmitting}
                  autoComplete="off"
                />
                
                {touched.name && errors.name && (
                  <div className="invalid-feedback d-block">{errors.name}</div>
                )}
                
                <label htmlFor="name" className="visually-hidden">Имя канала</label>
              </div>
            </Modal.Body>
            
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
                Отмена
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Создание...' : 'Отправить'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddChannelModal;
