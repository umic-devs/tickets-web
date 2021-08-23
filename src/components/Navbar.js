import React from 'react'
import { FaInstagram, FaYoutube } from 'react-icons/fa'

import logo from '../assets/images/umic/icon_logo-white.png'

export default function Navbar({ activeTab }) {
  /*
  function isActive(tab) {
    const active = tab === activeTab ? "active" : "";
    return active;
  }
  */

  return (
    <nav className="navbar navbar-expand-sm">
      <div className="container">
        <a href="/">
          <img src={logo} alt="umic logo" className="navbar-brand" />
        </a>
        <div className="justify-content-end d-none d-sm-block">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://www.instagram.com/umicbrasil/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaInstagram size={19} />
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://www.youtube.com/c/UMICBrasil/videos"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaYoutube size={21} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
