import React from "react";

import { IPublishState } from "../store/publish";
import "./ConfirmationDialog.css";
import { Keys, useKey } from "../utils/useKey";

const buttonRow = {
  justifyContent: "flex-end",
  paddingBottom: "0px"
};

export const ConfirmationDialog = ({
  values,
  onConfirm,
  onClose
}: {
  values: IPublishState;
  onConfirm: (values: IPublishState) => Promise<void>;
  onClose: () => void;
}) => {
  const onSubmit = React.useCallback(() => onConfirm(values), [
    onConfirm,
    values
  ]);

  useKey(Keys.escape, onClose);
  return (
    <div className="confirm-dialog">
      <div style={buttonRow} className="first-row">
        <button
          onClick={onClose}
          style={{ borderRadius: "50%" }}
          className="close-dialog"
        >
          X
        </button>
      </div>

      <div className="row">
        <div className="title">Message</div>
        <div className="value">
          <textarea readOnly value={values.message} />
        </div>
      </div>

      <div className="row">
        <div className="title">Type</div>
        <div className="value">
          <div>{values.type}</div>
        </div>
      </div>

      <div className="row">
        <div className="title">Location</div>
        <div className="value">
          <div>{values.location}</div>
        </div>
      </div>

      <div className="row">
        <button className="confirm-btn" onClick={onSubmit}>
          Confirm
        </button>
      </div>
    </div>
  );
};
