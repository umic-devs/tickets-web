import axios from "axios";

const getOrderData = (orderNumber, email, number) => JSON.stringify({
    items: [{
        id: "conf-ticket",
        title: 'Ingresso',
        category_id: "tickets",
        quantity: 1,
        currency_id: "BRL",
        unit_price: 180
    }],
    "payer": {
        "phone": {
            "number": number
        },
        "email": email
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
    "statement_descriptor": "UMIC",
    "binary_mode": true
});

export async function createPreference(orderNumber, email, number) {
    console.log(getOrderData(orderNumber, email, number))
    return axios.request({
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.mercadopago.com/checkout/preferences',
        headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_MERCADO_PAGO_ACCESS}`,
            'Content-Type': 'application/json'
        },
        data: getOrderData(orderNumber, email, number)
    });
}