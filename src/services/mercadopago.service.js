import axios from "axios";

import ticketOptions from "consts/ticketOptions"

function getItems(normalQtd, childQtd) {
    let items = []
    if (normalQtd > 0) items.push({
        "id": "COMIC24-1lote-child",
        "title": ticketOptions[1].name,
        "category_id": "tickets",
        "quantity": normalQtd,
        "currency_id": "BRL",
        "unit_price": ticketOptions[1].price
    })
    if (childQtd > 0) items.push({
        "id": "COMIC24-1lote-child",
        "title": ticketOptions[1].name,
        "category_id": "tickets",
        "quantity": childQtd,
        "currency_id": "BRL",
        "unit_price": ticketOptions[1].price
    })
    return items
}

const getOrderData = (
    orderNumber,
    buyerEmail,
    buyerNumber,
    normalQtd,
    childQtd
) => JSON.stringify({
    items: getItems(normalQtd, childQtd),
    "payer": {
        "phone": {
            "number": buyerNumber
        },
        "email": buyerEmail
    },
    "payment_methods": {
        "excluded_payment_methods": [],
        "excluded_payment_types": [
            {
                "id": "ticket"
            }
        ]
    },
    "back_urls": {},
    "external_reference": orderNumber,
    "statement_descriptor": "COMIC 2024",
    "binary_mode": true
});

export async function createPreference(
    orderNumber,
    buyerEmail,
    buyerNumber,
    normalQtd,
    childQtd
) {
    return axios.request({
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.mercadopago.com/checkout/preferences',
        headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_MERCADO_PAGO_ACCESS}`,
            'Content-Type': 'application/json'
        },
        data: getOrderData(orderNumber,
            buyerEmail,
            buyerNumber,
            normalQtd,
            childQtd)
    });
} 