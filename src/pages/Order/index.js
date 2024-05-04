import React, { useContext } from "react";

import ticketSteps, { totalSteps } from 'consts/ticketSteps'
import { TicketsContext } from "context/tickets";
import Navbar from "components/Navbar";

export default function OrderPage() {
  const { currentStep } = useContext(TicketsContext);

  const selectedStep = ticketSteps[currentStep];
  const StepComponent = selectedStep.component;

  return (
    <>
      <Navbar />
      <section className="py-3">
        <div className="container">
          <h2>Inscrição Conferência de Líderes</h2>
        </div>
        <div className="container">
          <StepComponent />
        </div>
      </section>
    </>
  )
}
