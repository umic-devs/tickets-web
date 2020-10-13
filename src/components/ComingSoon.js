import React from "react";

import image from "../assets/images/bg-comic.jpg";
import logo from "../assets/images/umic-logo-white.svg";

export default function ComingSoon() {
  return (
    <section
      className="min-vh-100 p-0 o-hidden text-white"
      style={{ backgroundColor: "#1E46AD" }}
    >
      <img
        className="bg-image blend-mode-multiply"
        src={image}
        alt="foto comic 2020"
      ></img>
      <div className="container layer-2">
        <div className="row min-vh-80 align-items-center">
          <div className="col-12 text-center">
            <img className="mb-4" src={logo} alt="logo" style={{ height: 76, width: "auto" }} />
            <h1>Tem Novidade Vindo Aí!</h1>
            <div className="lead">
              Seguuura, estamos preparando algo pra vocês. Fique ligado!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
