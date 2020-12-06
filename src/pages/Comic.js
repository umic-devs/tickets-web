import React from "react";
import { useHistory } from 'react-router-dom';

import Navbar from "../components/Navbar";

export default function Comic() {
  const history = useHistory();

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar activeTab="comic" />
      <section
        className="bg-comic flex-grow-1 text-center text-white font-lato"
        style={{ backgroundColor: "#1E46AD" }}
      >
        <div className="container py-4">
          <h1>COMIC 2021 - VOCAÇÃO</h1>
          <p>Veja o lançamento oficial do COMIC 2021</p>
        </div>
        <div className="container">
          <div className="iframe-container">
            <iframe
              className="iframe"
              src="https://www.youtube.com/embed/hWuxX5ynyAs"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              title="lançamento comic 2021"
            />
          </div>
        </div>
        <div className="container mt-4">
          <div className="row">
            <div className="col">
              <button className="btn btn-primary btn-lg" onClick={() => history.push("/comic/ingressos")}>Ir para Ingressos</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
