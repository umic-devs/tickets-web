import React from "react";

export default function Step1({ setStep }) {
  return (
    <React.Fragment>
      <div className="row justify-content-center text-justify">
        <div className="col-12 col-md-9">
          <div className="mb-2">
            <h2>Inscrição COMIC 2022</h2>
            <h4>Preencha os campos abaixo</h4>
            <p>
              <strong>LEIA COM ATENÇÃO AS INFORMAÇÕES ABAIXO:</strong>
            </p>
            <p>Após pagamento, os valores não poderão ser reembolsados.</p>
            <p>
              No momento, só é possível solicitar, no máximo, 20 ingressos de
              cada tipo por pedido. Caso deseje solicitar mais de 20 ingressos
              do mesmo tipo, faça outro(s) pedido(s).
            </p>
            <p>
              Crianças que não completaram 5 anos não pagam. A meia entrada é
              válida apenas para crianças entre 5 e 12 anos incompletos (ou
              seja, menores de 12 anos). A partir dos 12 anos paga inteira.
            </p>
            <p>
              Após realizar o pedido, enviaremos um email de confirmação com os
              dados do seu ingresso. No dia do evento, seus ingressos estarão
              esperando por você na bilheteria do evento. Traga um documento de
              identidade com foto e o email de confirmação para a retirada dos
              ingressos.
            </p>
            <p>
              Apenas a pessoa que fez o pedido poderá retirar os ingressos na
              bilheteria do evento. Em nenhuma hipótese os ingressos serão
              entregues a terceiros.
            </p>
            <p>
              A opção de ingresso com alimentação só poderá ser adquirido até o
              dia 5 de Fevereiro. Não será vendido alimentação no dia do evento.
            </p>
          </div>
          <div className="row justify-content-end">
            <div className="col-8 col-md-4">
              <button
                className="btn btn-primary btn-block"
                onClick={() => setStep(2)}
              >
                Ok, entendi
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
