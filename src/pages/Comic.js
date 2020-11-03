import React from "react";
import Navbar from "../components/Navbar";

export default function Comic() {
  return (
    <>
      <Navbar activeTab="comic" />
      <section className="min-vh-100">
          <div className="container py-4">
              <h1>COMIC 2021</h1>
          </div>
      </section>
    </>
  );
}
