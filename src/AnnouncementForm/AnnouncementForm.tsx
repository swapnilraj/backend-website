import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { IPublishState } from "../store/publish";

import "./AnnouncementForm.css";

type ErrorMessages = {
  [P in keyof IPublishState]?: string;
};

const validteInput = (values: IPublishState) => {
  const errors: ErrorMessages = {};

  if (!values.message.trim()) {
    errors.message = "Message required";
  }

  return errors;
};

export const AnnouncementForm = ({
  initialValues,
  showConfirmationPopup
}: {
  initialValues: IPublishState;
  showConfirmationPopup: (values: IPublishState) => Promise<boolean>;
}) => {
  const onMessageSubmit = React.useCallback(
    async (values, { setSubmitting }) => {
      await showConfirmationPopup(values);
      setSubmitting(false);
    },
    [showConfirmationPopup]
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onMessageSubmit}
      validate={validteInput}
    >
      <Form>
        <div className="field">
          <label htmlFor="message">Message</label>
          <Field name="message" as="textarea" placeholder="Enter message" />
          <ErrorMessage name="message" component="div" />
        </div>

        <div className="field">
          <label htmlFor="messageType">Type</label>
          <Field name="messageType" as="select">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Field>
          <ErrorMessage name="messageType" />
        </div>

        <div className="field">
          <label htmlFor="messageLocation">Location</label>
          <Field name="messageLocation" as="select">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Field>
          <ErrorMessage name="messageLocation" />
        </div>

        <button type="submit" className="publish-btn">
          Publish
        </button>
      </Form>
    </Formik>
  );
};
