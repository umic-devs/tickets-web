import React from "react";

import Countdown from "../components/Countdown";

import logo from "../assets/images/umic-logo-white.svg";

export default function ComingSoon() {
  return (
    <section
      className="min-vh-100 p-0 o-hidden bg-comic text-white"
      style={{ backgroundColor: "#1E46AD" }}
    >
      <div className="container layer-2">
        <div className="row min-vh-80 align-items-center">
          <div className="col-12 text-center">
            <img
              className="mb-4 mt-4 mt-md-0"
              src={logo}
              alt="logo"
              style={{ height: 76, width: "auto" }}
            />
            <h1>Tem Novidade Vindo Aí!</h1>
            <div className="lead">
              Seguuura, estamos preparando algo pra vocês. Fiquem ligados!
            </div>
            <div className="mt-4">
              <Countdown date="2020-11-7 20:00" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
