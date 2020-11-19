import React from "react";

import "./Button.css";

const Button = ({ id, label, disabled = false, onClick }) => {
  return (
    <button
      id={id}
      disabled={disabled}
      onClick={typeof onClick === "function" && onClick}
      className={`btn-main ${disabled ? "disabled" : ""}`}
    >
      {label}
    </button>
  );
};

export default Button;
