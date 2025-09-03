import React from 'react';
import { Formik, Form, Field } from 'formik';

const LoginPage = () => {
  return (
    <div>
      <h1>Вход в чат</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {

          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="username">Имя пользователя</label>
            <Field name="username" type="text" />

            <label htmlFor="password">Пароль</label>
            <Field name="password" type="password" />

            <button type="submit" disabled={isSubmitting}>
              Войти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;