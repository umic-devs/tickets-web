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
          <h2>Inscrição COMIC 2025</h2>
          <h6>Passo {currentStep} de {totalSteps} - {selectedStep.description}</h6>
        </div>
        <div className="container">
          <StepComponent />
        </div>
      </section>
    </>
  )
}
