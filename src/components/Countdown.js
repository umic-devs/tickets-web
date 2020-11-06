import React, { useEffect, useState } from "react";
import { getTimeDifferenceFromNow } from "../functions/time";

export default function Countdown({ date }) {
  const [timeLeft, setTimeLeft] = useState(getTimeDifferenceFromNow(date));

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(getTimeDifferenceFromNow(date));
    }, 1000);
  });

  return (
    <>
      {timeLeft !== 0 ? (
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
