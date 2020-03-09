import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

import {
  IPublishState,
  stationNames,
  stations,
  messageType
} from "../store/publish";

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

const messageTypeOptions: Array<JSX.Element> = messageType.map(msg => (
  <option value={msg}>{msg}</option>
));

const locationOptions: Array<JSX.Element> = stationNames.map(msg => (
  <option value={msg}>{msg}</option>
));

export const AnnouncementForm = ({
  initialValues,
  showConfirmationPopup
}: {
  initialValues: IPublishState;
  showConfirmationPopup: (values: IPublishState) => Promise<boolean>;
}) => {
  const onMessageSubmit = React.useCallback(
    async (values: IPublishState, { setSubmitting }) => {
      values.latitude = stations[values.location].latitude;
      values.longitude = stations[values.location].longitude;

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
          <span>
            <Field name="message" as="textarea" placeholder="Enter message" />
            <ErrorMessage name="message" component="div" />
          </span>
        </div>

        <div className="field">
          <label htmlFor="type">Type</label>
          <Field name="type" as="select">
            {messageTypeOptions}
          </Field>
          <ErrorMessage name="type" />
        </div>

        <div className="field">
          <label htmlFor="location">Location</label>
          <Field name="location" as="select">
            {locationOptions}
          </Field>
          <ErrorMessage name="location" />
        </div>

        <button type="submit" className="publish-btn">
          Publish
        </button>
      </Form>
    </Formik>
  );
};
