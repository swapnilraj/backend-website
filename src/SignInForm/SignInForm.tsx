import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

export type Credentials = typeof initialSignIn;

const initialSignIn = {
  email: "",
  password: ""
};

const validateSignIn = (values: Credentials) => {
  const errors: Partial<Credentials> = {};

  if (!values.email.trim()) {
    errors.email = "Email Required";
  }

  if (!values.password.trim()) {
    errors.password = "Password Required";
  }

  return errors;
};

export const SignInForm = ({
  onSubmit
}: {
  onSubmit: (credentials: Credentials) => void;
}) => {
  return (
    <Formik
      initialValues={initialSignIn}
      onSubmit={onSubmit}
      validate={validateSignIn}
    >
      <Form>
        <div className="field">
          <label htmlFor="email">Email</label>
          <Field name="email" type="email" placeholder="Enter email" />
          <ErrorMessage name="email" component="div" />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <Field name="password" type="password" placeholder="Password..." />
          <ErrorMessage name="messageType" />
        </div>

        <button type="submit" className="login-btn">
          Sign in
        </button>
      </Form>
    </Formik>
  );
};
