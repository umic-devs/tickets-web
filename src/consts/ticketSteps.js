import SelectTickets from "components/Order/SelectTickets"
import PayerForm from "components/Order/PayerForm";
import TicketsForm from "components/Order/TicketsForm";
import Redirect from "components/Order/Redirect";

const ticketSteps = {
    [1]: {
        description: 'Selecione os ingressos desejados',
        component: SelectTickets,
        nextStep: 2,
    },
    [2]:
    {
        description: 'Preencha os seus dados para contato',
        component: PayerForm,
        prevStep: 1,
        nextStep: 3,
    },
    [3]:
    {
        description: 'Preencha os dados de cada ingresso',
        component: TicketsForm,
        prevStep: 2,
        nextStep: 4,
    },
    [4]:
    {
        description: 'Faça o pagamento pelo Mercado Pago',
        component: Redirect,
        prevStep: 3,
    },
}

export const totalSteps = Object.keys(ticketSteps).length;
export default ticketSteps