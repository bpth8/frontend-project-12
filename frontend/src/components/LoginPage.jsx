import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Card, Form as BootstrapForm, Button } from 'react-bootstrap';

const LoginPage = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Попытка авторизации с данными:', values);
    setSubmitting(false);
  };

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <Card className="shadow-sm">
          <Card.Body className="p-5">
            <h1 className="text-center mb-4">Войти</h1>
            
            { }
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form>
                  { }
                  <BootstrapForm.Group className="form-floating mb-3">
                    { }
                    <Field 
                      name="username" 
                      id="username"
                      placeholder="Ваш ник" 
                      className="form-control"
                      required
                    />
                    <label htmlFor="username" className="form-label">Имя пользователя</label>
                  </BootstrapForm.Group>

                  { }
                  <BootstrapForm.Group className="form-floating mb-4">
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Пароль"
                      className="form-control"
                      required
                    />
                    <label htmlFor="password">Пароль</label>
                  </BootstrapForm.Group>

                  { }
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