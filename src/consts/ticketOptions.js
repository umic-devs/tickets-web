const TICKET_FULL_PRICE = 180;

const ticketOptions = [
    {
        id: 'normal',
        name: 'Ingresso Normal',
        info: '',
        price: TICKET_FULL_PRICE,
    },
    {
        id: 'child',
        name: 'Ingresso Criança',
        info: '(6 a 10 anos)',
        price: TICKET_FULL_PRICE / 2,
    },
];

export function getTicketDataById(id) {
    const ticketData = ticketOptions.find(ticket => ticket.id === id);
    return ticketData;
}

export default ticketOptions