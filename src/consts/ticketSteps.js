import TicketsForm from "components/Order/TicketsForm";
import Redirect from "components/Order/Redirect";

const ticketSteps = {
    [1]:
    {
        description: 'Preencha os dados de cada ingresso',
        component: TicketsForm,
        nextStep: 2,
    },
    [2]:
    {
        description: 'Faça o pagamento pelo Mercado Pago',
        component: Redirect,
    },
}

export const totalSteps = Object.keys(ticketSteps).length;
export default ticketSteps