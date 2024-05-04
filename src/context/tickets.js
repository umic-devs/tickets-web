import React, { createContext, useState } from 'react';

import ticketSteps from 'consts/ticketSteps'

const INITIAL_STEP = 1;

const initialState = {
    loading: false,
    currentStep: INITIAL_STEP,
    buyerData: {},
};

const TicketsContext = createContext();

function TicketsProvider({ children }) {
    const [loading, setLoading] = useState(initialState.loading);
    const [buyerData, setBuyerData] = useState(initialState.buyerData);
    const [currentStep, setCurrentStep] = useState(initialState.currentStep);

    function nextStep() {
        setCurrentStep(ticketSteps[currentStep].nextStep)
    }

    function previousStep() {
        setCurrentStep(ticketSteps[currentStep].prevStep)
    }

    return (
        <TicketsContext.Provider value={{
            loading,
            setLoading,

            currentStep,
            nextStep,
            previousStep,

            buyerData,
            setBuyerData,
        }}>
            {children}
        </TicketsContext.Provider>
    );
}

export { TicketsContext, TicketsProvider };
