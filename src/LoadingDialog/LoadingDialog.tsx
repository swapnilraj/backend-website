import React from "react";

import "./LoadingDialog.css";
import { Spinner } from "./Spinner";

export const LoadingDialog = ({ prompt }: { prompt: string }) => {
  return (
    <div className="loading-dialog">
      <Spinner />
      <span className="loading-text">{prompt}</span>
    </div>
  );
};
