import SelectTickets from "components/Order/SelectTickets"

const ticketSteps = {
    [1]: {
        description: 'Selecionar Ingressos',
        component: SelectTickets,
        nextStep: 2,
    },
    [2]:
    {
        description: 'Selecionar Quantidade',
        component: SelectTickets,
        prevStep: 1,
        nextStep: 3,
    },
}

export const totalSteps = Object.keys(ticketSteps).length;
export default ticketSteps