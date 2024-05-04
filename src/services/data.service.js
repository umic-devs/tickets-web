export function getDataToFirebase(data) {
    // outputs
    let order = {
        status: "PENDENTE",
        totalValue: 180,
        buyer: {
            name: data.nome,
            surname: data.sobrenome,
            email: data.email,
            cpf: data.cpf,
            whats: data.telefone,
            city: data.cidade,
            church: data.igreja,
        },
        quantity: 1
    }

    return order;
}