import React, { useRef, useEffect, useState } from 'react';
import { Form, Button, Card, FloatingLabel } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

const SignupPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [signupFailed, setSignupFailed] = useState(false);

  const schema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .required(t('validation.required'))
      .min(3, t('validation.usernameMinMax'))
      .max(20, t('validation.usernameMinMax')),
    password: yup
      .string()
      .required(t('validation.required'))
      .min(6, t('validation.passwordMin')),
    confirmPassword: yup
      .string()
      .required(t('validation.required'))
      .oneOf([yup.ref('password'), null], t('validation.passwordMatch')),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
  setSubmitting(true);
  setSignupFailed(false);

  const userData = {
    username: values.username.trim(),
    password: values.password,
  };

  try {
    const res = await axios.post('/api/v1/signup', userData);

    auth.logIn(res.data.token);
    navigate('/');
  } catch (e) {
    setSubmitting(false);

    if (e.isAxiosError) {
      if (e.response && e.response.status === 409) {
        setSignupFailed(true);
        setFieldError('username', t('validation.userExists'));
        return;
      }

      alert(t('validation.networkError'));
      return;
    }

    console.error('Неизвестная ошибка регистрации', e);
  }
};

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <img src="/signup_image.svg" className="rounded-circle" alt={t('signup.header')} />
              <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={{ username: '', password: '', confirmPassword: '' }}
              >
                {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
                  <Form onSubmit={handleSubmit} className="w-50">
                    <h1 className="text-center mb-4">{t('signup.header')}</h1>
                    
                    {}
                    <FloatingLabel controlId="username" label={t('signup.username')} className="mb-3">
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder={t('signup.username')}
                        required
                        autoComplete="username"
                        ref={inputRef}
                        value={values.username}
                        onChange={handleChange}
                        isInvalid={signupFailed || (touched.username && !!errors.username)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    {}
                    <FloatingLabel controlId="password" label={t('signup.password')} className="mb-3">
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder={t('signup.password')}
                        required
                        autoComplete="new-password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={touched.password && !!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    {}
                    <FloatingLabel controlId="confirmPassword" label={t('signup.confirmPassword')} className="mb-4">
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder={t('signup.confirmPassword')}
                        required
                        autoComplete="new-password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <Button type="submit" variant="outline-primary" className="w-100 mb-3" disabled={isSubmitting}>
                      {t('signup.submit')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;