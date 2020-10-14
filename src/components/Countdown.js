import React, { useEffect, useState } from "react";

export default function Countdown({ date, className }) {
  let difference = 0;

  const calculateTimeLeft = () => {
    difference = +new Date(date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  return (
    <>
      {difference > 0 ? (
        <div className="row text-center text-body">
          <div className="col-md">
            <div className="card card-body">
              <span className="h1 text-primary mb-2">{timeLeft.days}</span>
              <span className="h6 mb-0">Dias</span>
            </div>
          </div>
          <div className="col-md">
            <div className="card card-body">
              <span className="h1 text-primary mb-2">{timeLeft.hours}</span>
              <span className="h6 mb-0">Horas</span>
            </div>
          </div>
          <div className="col-md">
            <div className="card card-body">
              <span className="h1 text-primary mb-2">{timeLeft.minutes}</span>
              <span className="h6 mb-0">Minutos</span>
            </div>
          </div>
          <div className="col-md">
            <div className="card card-body">
              <span className="h1 text-primary mb-2">{timeLeft.seconds}</span>
              <span className="h6 mb-0">Segundos</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
