import api from "./api";

export async function sendNewOrderMail(data) {
    try {
        await api.post("mail/new_order", data);
    } catch (error) {
        alert("Erro ao enviar email. Entre em contato através do email: umicbrasil@gmail.com")
    }
}