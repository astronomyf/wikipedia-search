import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "./../../redux/actions";

import "./Switch.css";

const Switch = () => {
  const toggleTheme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const toggleDarkTheme = (flag) => {
    if (flag) {
      document.body.classList.remove("theme-dark");
      document.body.classList.add("theme-light");
    } else {
      document.body.classList.remove("theme-light");
      document.body.classList.add("theme-dark");
    }
  };

  const onChange = () => {
    dispatch(toggle());
    toggleDarkTheme(toggleTheme);
  };

  return (
    <div className="switch-box">
      <input
        className="tgl tgl-light"
        id="cb1"
        checked={toggleTheme}
        type="checkbox"
        onChange={onChange}
      />
      <label className="tgl-btn" htmlFor="cb1"></label>
    </div>
  );
};

export default Switch;
