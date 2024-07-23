import ticketOptions from "consts/ticketOptions";

function getTotalPrice(selected) {
    var totalPrice = 0;
    ticketOptions.map((item) => totalPrice += (selectedTickets[item.id] || 0) * item.price);

    return totalPrice;
}

export function getDataToFirebase(formData, selectedTickets, buyerData, totalPrice) {
    // outputs
    let order = {
        status: "PENDENTE",
        totalValue: totalPrice,
        buyer: {
            name: buyerData.nome,
            surname: buyerData.sobrenome,
            email: buyerData.email,
            cpf: buyerData.cpf,
            whats: buyerData.telefone,
            city: buyerData.cidade,
            church: buyerData.igreja
        },
        quantity: selectedTickets
    }

    // tickets
    let tickets = []



    // Create an object to store the restructured data
    const restructuredData = {};

    // Iterate through the original data
    for (const key in formData) {
        // Split the key into parts using underscores
        const [field, type, index] = key.split('_');
        const item = type + index;

        // Check if 'restructuredData[normal_0]' exists in the restructured data
        if (!restructuredData[item]) {
            restructuredData[item] = {
                type: type
            };
        }

        // Set the field value in the restructured data
        restructuredData[item][field] = formData[key];
    }

    // Iterate through the original data
    for (const key in restructuredData) {
        const item = restructuredData[key]
        tickets.push({
            lote: 0,
            name: item.nome,
            surname: item.sobrenome,
            whats: item.telefone,
            church: buyerData.igreja,
            city: buyerData.cidade,
            sexo: item.sexo,
            type: item.type,
        })
    }

    return { order, tickets }
}