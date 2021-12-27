import React from 'react'
import { FaInstagram, FaFacebookSquare, FaYoutube } from 'react-icons/fa'

import logo from '../assets/images/umic/icon_logo-white.png'

export default function Footer({ className }) {
  return (
    <footer className={className}>
      <div className="container">
        <div className="row justify-content-between mb-3">
          <div className="col-12 col-xl-5 mb-3 mb-lg-0 text-center text-xl-left">
            <a href="/">
              <img src={logo} alt="umic logo" className="navbar-brand mr-0" />
            </a>
            <ul className="nav mt-3 justify-content-center justify-content-xl-start">
              <li className="nav-item">
                <a
                  className="nav-link pl-xl-0"
                  href="https://www.instagram.com/umicbrasil"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FaInstagram size={24} />
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://www.facebook.com/UMICBRASIL"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FaFacebookSquare size={24} />
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://www.youtube.com/c/UMICBrasil"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FaYoutube size={24} />
                </a>
              </li>
            </ul>
            <ul className="nav mt-2 justify-content-center justify-content-xl-start">
              <li className="nav-item">
                <a className="nav-link pl-xl-0" href="/blog">
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/blitz">
                  Blitz
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/comic">
                  COMIC
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/conferencia-lideres">
                  Conferência de Líderes
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-5 col-xl-3 mb-3 mb-xl-0">
            <h5>Faça sua doação</h5>
            <span className="d-block text-muted text-small">
              CAIXA ECONÔMICA FEDERAL
            </span>
            <span className="d-block text-muted text-small">
              CONCÍLIO MIN IGREJAS CRISTO
            </span>
            <span className="d-block text-muted text-small">
              AG 3494 - CC 3333-2 (OP: 003)
            </span>
            <span className="d-block text-muted text-small mb-1">
              CNPJ: 00.643.841/0001-17
            </span>
            <span className="d-block text-muted text-small">
              PIX: umicbrasil@gmail.com
            </span>
          </div>
          <div className="col-12 col-md-7 col-xl-4">
            {/*<h5>Inscreva-se</h5>
            <p>Receba novidades da UMIC no seu email.</p>
            <form>
              <div className="form-row">
                <div className="col-12">
                  <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Seu email aqui"
                    name="email"
                    required
                  ></input>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    <span>Inscrever-se</span>
                  </button>
                </div>
              </div>
            </form>*/}
          </div>
        </div>
        {/*<div className="row justify-content-center">
          <div className="col col-md-auto text-center">
            <small className="text-muted">
              ©2021 União da Mocidade das Igrejas de Cristo
            </small>
          </div>
        </div>*/}
      </div>
    </footer>
  )
}
