import React from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar activeTab="home" />
      <section className="bg-conference text-light">
        <div className="container">
          <div className="row min-vh-60 align-items-center">
            <div className="col-8">
              <h5 className="mb-0">30 e 31 de Outubro, 2021</h5>
              <h1 className="display-1 mb-0">reconectar</h1>
              <h2 className="mb-3">Conferência de Líderes</h2>
              <h5 className="mb-0">Chácara Shalom, Goianira, Goiás</h5>
              <a className="btn btn-lg btn-conference mt-5" href="/conferencia-lideres">Garantir Ingresso</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
