import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { Card, Form as BootstrapForm, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setAuthFailed(false);

    try {
      const response = await axios.post('/api/v1/login', values); 
      
      const { token } = response.data; 
      
      auth.logIn(token); 
      
      navigate('/'); 

    } catch (e) {
      setSubmitting(false);
      if (e.isAxiosError && e.response.status === 401) {
        setAuthFailed(true);
        return;
      }
      console.error('Ошибка входа:', e);
      setAuthFailed(true);
    }
  };

  const initialValues = { username: 'admin', password: 'admin' };

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <Card className="shadow-sm">
          <Card.Body className="p-5">
            <h1 className="text-center mb-4">Войти</h1>
            
            { }
            {authFailed && (
              <Alert variant="danger" className="text-center">
                Неверные имя пользователя или пароль
              </Alert>
            )}

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form>
                  { }
                  <BootstrapForm.Group className="form-floating mb-3">
                    <Field name="username" id="username" placeholder="Ваш ник" className="form-control" required />
                    <label htmlFor="username">Имя пользователя</label>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="form-floating mb-4">
                    <Field type="password" name="password" id="password" placeholder="Пароль" className="form-control" required />
                    <label htmlFor="password">Пароль</label>
                  </BootstrapForm.Group>

                  <Button 
                    type="submit" 
                    variant="outline-primary" 
                    className="w-100 mb-3"
                    disabled={isSubmitting}
                  >
                    Войти
                  </Button>
                </Form>
              )}
            </Formik>

          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;