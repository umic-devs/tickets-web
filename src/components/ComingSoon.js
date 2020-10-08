import React from "react";
import logo from "../assets/images/umic.svg";

export default function ComingSoon() {
  return (
    <section className="min-vh-100 py-5 o-hidden">
      <div className="container position-relative">
        <div className="row justify-content-center mb-md-5">
          <div className="col-auto">
            <img src={logo} alt="logo" style={{ height: 120, width: "auto" }} />
          </div>
        </div>
        <div className="row justify-content-center py-6">
          <div className="col text-center">
            <h1>Novidades em Breve!</h1>
            <div className="lead">
              Haaaja coração! Estamos preparando algo muito especial para os
              jovens da Igreja de Cristo. Fique ligado!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
