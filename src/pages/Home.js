import React from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar activeTab="home" />
      <section
        className="bg-comic flex-grow-1 text-center text-white font-lato"
        style={{ backgroundColor: "#1E46AD" }}
      >
        <div className="container py-4">
          <h1>COMIC 2021 - VOCAÇÃO</h1>
          <button
            className="btn btn-wide btn-primary mt-2"
            onClick={() =>
              window.open("https://www.youtube.com/watch?v=hWuxX5ynyAs")
            }
          >
            Saiba Mais
          </button>
        </div>
      </section>
    </div>
  );
}
