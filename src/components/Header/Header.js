import React from "react";

import "./../SearchBox/SearchBox";
import SearchBox from "./../SearchBox/SearchBox";

import "./Header.css";

const Header = ({
  title,
  subtitle,
  search,
  onChange,
  onClick,
  loading = false,
}) => {
  return (
    <div className="header-panel box-shadow">
      <div className="header-panel--title">
        <h1>{title}</h1>
      </div>
      <div className="header-panel--title">
        <h3>{subtitle}</h3>
      </div>
      <SearchBox
        placeholder="Try typing Galaxy..."
        search={search}
        onChange={onChange}
        onClick={onClick}
        loading={loading}
      />
    </div>
  );
};

export default Header;
