import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import useAuth from '../../customHooks/useAuth';
import routes from '../../routes/routes';
import { useLoginMutation } from '../../api/chatApi';

const LoginForm = () => {
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const [login] = useLoginMutation();
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await login(values).unwrap();
        auth.logIn(res.token, values.username);
        navigate(routes.mainPagePath());
      } catch (error) {
        formik.setSubmitting(false);
        if (error.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
        }
        if (error.message === 'Network Error') {
          toast.error(t('toastify.error.connectionError'));
        }
      }
    },
  });

  return (
    <Form
      onSubmit={formik.handleSubmit}
      className="col-12 col-md-6 mt-3 mt-md-0"
    >
      <h1 className="text-center mb-4">{t('loginForm.title')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          name="username"
          autoComplete="username"
          required
          placeholder={t('loginForm.username')}
          id="username"
          ref={inputRef}
          isInvalid={authFailed}
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <Form.Label htmlFor="username">{t('loginForm.username')}</Form.Label>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          name="password"
          autoComplete="current-password"
          required
          placeholder={t('loginForm.password')}
          type="password"
          id="password"
          className="form-control"
          isInvalid={authFailed}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Form.Label htmlFor="password">{t('loginForm.password')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>{t('loginForm.feedback')}</Form.Control.Feedback>
      </Form.Group>
      <Button
        type="submit"
        variant="outline-primary"
        className="w-100 mb-3"
      >
        {t('loginForm.buttonSubmit')}
      </Button>
    </Form>
  );
};

export default LoginForm;
