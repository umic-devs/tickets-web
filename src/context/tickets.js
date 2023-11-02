import React, { createContext, useState } from 'react';

import ticketSteps from 'consts/ticketSteps'

const INITIAL_STEP = 1;

const initialState = {
    tickets: [],
    selectedTickets: {},
    currentStep: INITIAL_STEP,
};

const TicketsContext = createContext();

function TicketsProvider({ children }) {
    const [tickets, setTickets] = useState(initialState.tickets);
    const [selectedTickets, setSelectedTickets] = useState(initialState.selectedTickets);

    const [currentStep, setCurrentStep] = useState(initialState.currentStep);

    function nextStep() {
        setCurrentStep(ticketSteps[currentStep]?.nextStep)
    }

    function previousStep() {
        setCurrentStep(ticketSteps[currentStep]?.previousStep)
    }

    return (
        <TicketsContext.Provider value={{
            selectedTickets,
            setSelectedTickets,
            currentStep,
            nextStep,
            previousStep
        }}>
            {children}
        </TicketsContext.Provider>
    );
}

export { TicketsContext, TicketsProvider };
