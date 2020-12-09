import React from "react";

import Switch from "./../Switch/Switch";

import "./Logo.css";

import WikiLogo from "./../../assets/images/wikipedia-logo.svg";

const Logo = () => {
  return (
    <div className="logo-box">
      <img alt="Wikipedia logo" src={WikiLogo} width="38" />
      <span className="logo--title">WikiSearch</span>&nbsp;&nbsp;| Dark mode
      <div className="switch">
        <Switch />
      </div>
    </div>
  );
};

export default Logo;
