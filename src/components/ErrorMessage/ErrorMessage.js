import React from "react";

import "./ErrorMessage.css";

const ErrorMessage = ({ title, description }) => {
  return (
    <div className="alert alert-error">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ErrorMessage;
