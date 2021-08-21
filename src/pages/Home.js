import React from "react";
import Navbar from "../components/Navbar";

import confBanner from "../assets/images/conference/conference-banner.png";

export default function Home() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar activeTab="home" />
      <section className="bg-dark">
        <div className="container py-4">
          <div className="carousel-home" href="/">
            <div className="row">
              <div className="col-8">
                <img src={confBanner} alt="banner da conferência" />
              </div>
              <div className="col-4">
                <div className="carousel-text-container d-flex flex-column">
                  <p className="carousel-date">30 e 31 de Outubro, 2021</p>
                  <h1 className="carousel-title">reconectar</h1>
                  <h1 className="carousel-categ">Conferência de Líderes</h1>
                  <p className="carousel-place">Chácara Shalom, Goianira, Goiás</p>
                  <a className="btn btn-conference mt-auto" href="/conferencia-lideres">Saiba mais -&gt;</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
