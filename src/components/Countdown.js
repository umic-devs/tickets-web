import React, { useEffect, useState } from "react";

export default function Countdown({ date, setIsTimeOver }) {
  let difference = 0;

  const calculateTimeLeft = () => {
    difference = +new Date(date) - +new Date();
    let timeLeft = {};
    let isTimeOver = true;

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
      isTimeOver = false;
    }

    setIsTimeOver(isTimeOver);

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
        <div className="row row-sm-margin text-center text-body justify-content-center">
          <div className="col-12 col-sm-6 col-lg-auto">
            <div className="card card-body countdown-card">
              <span className="h1 text-primary mb-0">
                {timeLeft.days.toLocaleString(undefined, {
                  minimumIntegerDigits: 2,
                })}
              </span>
              <span className="h6 mb-0">Dias</span>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-auto">
            <div className="card card-body countdown-card">
              <span className="h1 text-primary mb-0">
                {timeLeft.hours.toLocaleString(undefined, {
                  minimumIntegerDigits: 2,
                })}
              </span>
              <span className="h6 mb-0">Horas</span>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-auto">
            <div className="card card-body countdown-card">
              <span className="h1 text-primary mb-0">
                {timeLeft.minutes.toLocaleString(undefined, {
                  minimumIntegerDigits: 2,
                })}
              </span>
              <span className="h6 mb-0">Minutos</span>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-auto">
            <div className="card card-body countdown-card">
              <span className="h1 text-primary mb-0">
                {timeLeft.seconds.toLocaleString(undefined, {
                  minimumIntegerDigits: 2,
                })}
              </span>
              <span className="h6 mb-0">Segundos</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
