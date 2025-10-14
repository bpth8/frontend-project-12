import React from 'react';
import { Formik, Field, Form } from 'formik';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const MessageForm = () => {
  const { currentChannelId } = useSelector((state) => state.channels);
  
  const auth = useAuth();
  const token = auth.getToken();
  const username = localStorage.getItem('username') || 'admin';
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    
    const messageData = {
      body: values.body,
      channelId: currentChannelId,
      username,
    };
    
    const headers = { Authorization: `Bearer ${token}` };

    try {
      await axios.post('/api/v1/messages', messageData, { headers });
      
      resetForm();
    } catch (e) {
      console.error('Ошибка отправки сообщения через HTTP:', e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-1 border rounded-2">
      <Formik initialValues={{ body: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting, values }) => (
          <Form noValidate className="py-1 px-3">
            <div className="input-group has-validation">
              <Field
                name="body"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                className="border-0 p-0 ps-2 form-control"
                required
                disabled={isSubmitting || !currentChannelId}
                autoFocus
                key={currentChannelId} 
              />
              <Button
                type="submit"
                variant="outline-primary"
                className="btn-group-vertical"
                disabled={isSubmitting || values.body.trim() === '' || !currentChannelId}
              >
                Отправить
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm;