const TICKET_FULL_PRICE = 550;

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

export default ticketOptions