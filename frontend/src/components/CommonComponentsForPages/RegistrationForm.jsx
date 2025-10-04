import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import useAuth from '../../customHooks/useAuth';
import routes from '../../routes/routes';
import { useSignUpMutation } from '../../api/chatApi';
import { signUpShema } from '../../registrationRequirement/registrationRequirement';

const RegistrationForm = () => {
  const { t } = useTranslation();
  const [registerFailed, setRegisterFailed] = useState(false);
  const [signUp] = useSignUpMutation();
  const auth = useAuth();
  const navigate = useNavigate();

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: signUpShema(t),
    onSubmit: async (values) => {
      setRegisterFailed(false);
      const trimmedValues = {
        username: values.username.trim(),
        password: values.password.trim(),
        confirmPassword: values.confirmPassword.trim(),
      };

      try {
        const res = await signUp(trimmedValues).unwrap();
        auth.logIn(res.token, trimmedValues.username);
        navigate(routes.mainPagePath());
      } catch (error) {
        formik.setSubmitting(false);
        if (error.status === 401) {
          inputRef.current.select();
          toast.error(t('toastify.error.authError'));
        }
        if (error.status === 409) {
          inputRef.current.select();
          setRegisterFailed(true);
        }
        if (error.message === 'Network Error') {
          inputRef.current.select();
          toast.error(t('toastify.error.connectionError'));
        }
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="w-50">
      <h1 className="text-center mb-4">{t('registrationForm.title')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          placeholder={t('registrationForm.username')}
          name="username"
          autoComplete="username"
          id="username"
          required
          isInvalid={registerFailed || formik.errors.username}
          ref={inputRef}
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <Form.Label htmlFor="username">{t('registrationForm.username')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>
          {registerFailed ? t('registrationForm.errors.usernameExist') : formik.errors.username}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          placeholder={t('registrationForm.password')}
          name="password"
          autoComplete="new-password"
          type="password"
          id="password"
          required
          isInvalid={formik.touched.password && formik.errors.password}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Form.Label htmlFor="password">{t('registrationForm.password')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          placeholder={t('registrationForm.confirmPassword')}
          name="confirmPassword"
          autoComplete="new-password"
          type="password"
          id="confirmPassword"
          required
          isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        />
        <Form.Label htmlFor="confirmPassword">{t('registrationForm.confirmPassword')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" className="w-100" variant="outline-primary">
        {t('registrationForm.submitButton')}
      </Button>
    </Form>
  );
};

export default RegistrationForm;
