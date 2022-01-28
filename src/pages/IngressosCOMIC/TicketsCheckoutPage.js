import React, { useState } from "react";
import qrcode from "../../assets/images/comic/qrcode-pix.png";
import { sendCreditCardCharge } from "../../services/pagseguro.service.js";
import { CreditCardForm } from "../../components";
import { set } from "react-hook-form";

export default function TicketsCheckoutPage({
  sent,
  setStep,
  formData,
  setFormData,
  handleFormSubmit,
}) {
  const pedido = localStorage.getItem("pedido");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit({
    cardNumber,
    cardExpirationMonth,
    cardExpirationYear,
    cardSecurityCode,
    cardHolderName,
  }) {
    setIsLoading(true);

    const pedido = localStorage.getItem("pedido");
    const DESCRIPTION = "Pagamento do pedido";

    await sendCreditCardCharge({
      referenceId: pedido,
      description: DESCRIPTION,
      value: formData.total,
      cardNumber,
      cardExpirationMonth,
      cardExpirationYear,
      cardSecurityCode,
      cardHolderName,
    })
      .then(() => setIsSuccess(true))
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <React.Fragment>
      <div className="row justify-content-center text-justify">
        <div className="col-12 col-md-9">
          <div className="mb-2">
            <h2>Inscrição COMIC 2022</h2>
            <h4 className="text-success">Pedido recebido com sucesso!</h4>
            <h5>PEDIDO {pedido}</h5>
            {formData.formaPagamento === "pix" ? (
              <>
                <p>
                  <strong>A forma de pagamento escolhida é PIX.</strong>
                </p>
                <p>
                  O valor do seu pedido é de R${formData.total},00. Transfira o
                  valor utilizando o QRCode abaixo (ou copie e cole a chave para
                  pagamento) e envie o comprovante para umicbrasil@gmail.com.
                </p>
                <img src={qrcode} className="App-logo" alt="logo" />
                <p>Chave: 51d1b581-324b-4d1d-9792-39ee28e8fa6a</p>
              </>
            ) : (
              <>
                <h2>Dados do cartão</h2>

                {!isSuccess ? (
                  <CreditCardForm
                    formData={formData}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                  />
                ) : (
                  "Sucesso"
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
