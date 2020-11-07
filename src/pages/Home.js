import React, { useState, useEffect } from "react";

import ComingSoon from "./ComingSoon";
import Navbar from "../components/Navbar";
import { getTimeDifferenceFromNow } from "../functions/time";

export default function Home() {
  const date = "2020-11-7 20:00";
  const [timeLeft, setTimeLeft] = useState(getTimeDifferenceFromNow(date));

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(getTimeDifferenceFromNow(date));
    }, 1000);
  });

  return timeLeft !== 0 ? (
    <ComingSoon />
  ) : (
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
