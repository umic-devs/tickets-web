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
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container">
        <img src={logo} alt="umic logo" className="navbar-brand" />
        <button
          class="navbar-toggler"
          type="button"
          onClick={() => setCollapse(!collapse)}
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div
          class={`collapse navbar-collapse justify-content-end ${showCollapse()}`}
        >
          <ul class="navbar-nav">
            <li className={`nav-item ${isActive("home")}`}>
              <a class="nav-link" href="/">
                HOME
              </a>
            </li>
            <li className={`nav-item ${isActive("comic")}`}>
              <a class="nav-link" href="/comic">
                COMIC
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
