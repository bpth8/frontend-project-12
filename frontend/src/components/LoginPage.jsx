import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form as BootstrapForm, Button, Alert } from 'react-bootstrap';

const LoginPage = () => {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('тут бэк-сервер', values);
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      setAuthError('Неверное имя пользователя или пароль.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h1 className="text-center">Вход</h1>
          {authError && <Alert variant="danger">{authError}</Alert>}
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <BootstrapForm as={Form}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label htmlFor="username">Имя пользователя</BootstrapForm.Label>
                  <Field as={BootstrapForm.Control} name="username" type="text" />
                  <ErrorMessage name="username" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label htmlFor="password">Пароль</BootstrapForm.Label>
                  <Field as={BootstrapForm.Control} name="password" type="password" />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <Button variant="primary" type="submit" disabled={isSubmitting} className="w-100">
                  Войти
                </Button>
              </BootstrapForm>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;