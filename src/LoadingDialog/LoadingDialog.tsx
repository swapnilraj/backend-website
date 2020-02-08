import React from "react";

import "./LoadingDialog.css";
import { Spinner } from "./Spinner";

export const LoadingDialog = () => {
  return (
    <div className="loading-dialog">
      <Spinner />
      <span className="loading-text">Publishing</span>
    </div>
  );
};
