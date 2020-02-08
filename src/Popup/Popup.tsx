import React from "react";
import "./Popup.css";

export const Popup = ({
  open,
  children
}: {
  open: boolean;
  children: React.ReactNode;
}) => {
  if (!open) return null;

  return (
    <div className="popup">
      <div className="content">{children}</div>
    </div>
  );
};
