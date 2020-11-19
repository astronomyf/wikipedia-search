import React from "react";

import "./Button.css";

const Button = ({ id, label, disabled = false, onClick }) => {
  return (
    <button
      id={id}
      type="submit"
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        if (typeof onClick === "function") {
          onClick();
        }
      }}
      className={`btn-main ${disabled ? "disabled" : ""}`}
    >
      {label}
    </button>
  );
};

export default Button;
