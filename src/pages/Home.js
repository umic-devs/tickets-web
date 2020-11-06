import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

import {getTimeDifferenceFromNow} from "../functions/time";
import ComingSoon from "./ComingSoon";

export default function Home() {
  const date = "2020-11-7 20:00"
  const [timeLeft, setTimeLeft] = useState(getTimeDifferenceFromNow(date));

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(getTimeDifferenceFromNow(date));
    }, 1000);
  });

  return timeLeft !== 0 ? (
    <ComingSoon />
  ) : (
    <div className="min-vh-100">
      <Navbar activeTab="home" />
      <section className="min-vh-80">
        <div className="container py-4">
          <h1>COMIC 2021</h1>
        </div>
      </section>
    </div>
  );
}
