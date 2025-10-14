import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from 'react-bootstrap';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
  };

  const schema = yup.object().shape({
    username: yup.string().required(t('validation.required')),
    password: yup.string().required(t('validation.required')),
  });

const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
  try {
    const response = await axios.post('/api/v1/login', values);
    auth.logIn(response.data.token);  // <--- тут передаем только токен
    navigate('/');
  } catch (e) {
    if (e.response?.status === 401) {
      setFieldError('password', t('validation.networkError'));
    } else {
      console.error('Login error:', e);
    }
  } finally {
    setSubmitting(false);
  }
};

  return (
    <Container className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <h1 className="text-center mb-4">{t('login.header') || 'Вход'}</h1>

              <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={handleSubmit}
              >
                {({
                  handleSubmit,
                  touched,
                  errors,
                  isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                      <Form.Label>{t('signup.username')}</Form.Label>
                      <Field
                        name="username"
                        type="text"
                        className={`form-control ${
                          touched.username && errors.username ? 'is-invalid' : ''
                        }`}
                        autoComplete="username"
                      />
                      {touched.username && errors.username && (
                        <div className="invalid-feedback">
                          {errors.username}
                        </div>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>{t('signup.password')}</Form.Label>
                      <Field
                        name="password"
                        type="password"
                        className={`form-control ${
                          touched.password && errors.password ? 'is-invalid' : ''
                        }`}
                        autoComplete="current-password"
                      />
                      {touched.password && errors.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                    </Form.Group>

                    <Button
                      type="submit"
                      className="w-100"
                      variant="primary"
                      disabled={isSubmitting}
                    >
                      {t('login.submit') || 'Войти'}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>

          {}
          <Card className="shadow-sm mt-3">
            <Card.Body className="text-center p-2">
              <span>{t('login.noAccount')}</span>
              <Link to="/signup">{t('login.signupLink')}</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
