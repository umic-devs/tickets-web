import React from "react";
import Navbar from "../components/Navbar";

import confBanner from "../assets/images/conf/conf-banner.png";

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
                  <h1 className="carousel-title">reconectar - Conferência de Líderes</h1>
                  <p className="carousel-place">Chácara Shalom, Goianira, Goiás</p>
                  <button type="button" class="btn btn-lg btn-primary mt-auto" href="/">Saiba mais -&gt;</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
