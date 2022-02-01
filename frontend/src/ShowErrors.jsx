import React from "react";
import "./showErrors.css";

export default function ShowErrors({ message }) {
  if (message) {
    return <div className="error">{message}</div>;
  }

  return null;
}
