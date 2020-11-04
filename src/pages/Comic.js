import React from "react";
import Navbar from "../components/Navbar";

export default function Comic() {
  return (
    <div className="min-vh-100">
      <Navbar activeTab="comic" />
      <section className="min-vh-80">
        <div className="container py-4">
          <h1>COMIC 2021</h1>
        </div>
      </section>
    </div>
  );
}
