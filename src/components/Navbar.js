import React, { useState } from "react";

import logo from "../assets/images/umic-logo-white.svg";

export default function Navbar({ activeTab }) {
  const [collapse, setCollapse] = useState(false);

  function isActive(tab) {
    const active = tab === activeTab ? "active" : "";
    return active;
  }

  function showCollapse() {
    const show = collapse ? "show" : "";
    return show;
  }

  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark"
      style={{ backgroundColor: "#0c0c0c" }}
    >
      <div className="container">
        <img src={logo} alt="umic logo" className="navbar-brand" />
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setCollapse(!collapse)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className={`collapse navbar-collapse justify-content-end ${showCollapse()}`}
        >
          <ul className="navbar-nav">
            <li className={`nav-item ${isActive("home")}`}>
              <a className="nav-link" href="/">
                HOME
              </a>
            </li>
            <li className={`nav-item ${isActive("comic")}`}>
              <a className="nav-link" href="/comic">
                COMIC
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
