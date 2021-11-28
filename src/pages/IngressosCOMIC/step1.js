import React from "react";

export default function Step1({ setStep }) {
  return (
    <React.Fragment>
      <div className="row justify-content-center text-justify">
        <div className="col-12 col-md-9">
          <div className="mb-2">
            <h2>Inscrição COMIC 2022</h2>
            <h4 className="text-danger">
              LEIA COM ATENÇÃO AS INFORMAÇÕES ABAIXO
            </h4>
            <p>
              <strong>
                TERMOS E INFORMAÇÕES SOBRE A INSCRIÇÃO DO COMIC 2022
              </strong>
            </p>
            {/*
            <p>
              Ao final do preenchimento dos dados, a cobrança será feita. Seu
              pedido será cancelado caso o pagamento não seja feito dentro de
              24h após a solicitação do mesmo. As formas de pagamento são:
              Cartão de Débito, Cartão de Crédito e PIX.
            </p>
            */}
            <p>
              Ao final do preenchimento dos dados, você deverá revisar os dados
              e escolher a forma de pagamento. você receberá o número do seu
              pedido e as orientações de como fazer o pagamento. Caso escolha
              fazer o pagamento via PIX, aparecerá na tela o QRCode que deve ser
              escaneado, após fazer o pagamento envie o comprovante para
              umicbrasil@gmail.com. Caso escolha fazer via cartão de crédito,
              enviaremos, dentro do prazo de 24h, um link do PagSeguro com as
              informações necessárias para fazer o pagamento.
            </p>
            <p>Após pagamento, os valores não poderão ser reembolsados.</p>
            <p>
              Após a confirmação do pagamento, enviaremos um email de
              confirmação com os dados do seu ingresso. No dia do evento, seus
              ingressos estarão esperando por você na bilheteria do evento.
              Traga um documento de identidade com foto e o email de confirmação
              para a retirada dos ingressos.
            </p>
            <p>
              Apenas a pessoa que fez o pedido poderá retirar os ingressos na
              bilheteria do evento. Em nenhuma hipótese os ingressos serão
              entregues a terceiros.
            </p>
            <p>
              No momento, só é possível solicitar, no máximo, 20 ingressos de
              cada tipo por pedido. Caso deseje solicitar mais de 20 ingressos
              do mesmo tipo, faça outro(s) pedido(s).
            </p>
            <p>
              Crianças menores de 5 anos não pagam. A meia entrada é válida
              apenas para crianças a partir de 5 anos e até 12 anos incompletos
              (ou seja, menores de 12 anos). A partir dos 12 anos paga inteira.
            </p>
            <p>
              A opção de ingresso com alimentação só poderá ser adquirido até o
              dia 5 de Fevereiro. Não será vendido alimentação no dia do evento.
            </p>
            <p>
              Caso hajam demais dúvidas sobre o processo de inscrição, e sobre o
              COMIC 2022, as envie para o email umicbrasil@gmail.com. Obrigado!
            </p>
          </div>
          <div className="row justify-content-end">
            <div className="col-8 col-md-4">
              <button
                className="btn btn-primary btn-block"
                onClick={() => setStep(2)}
              >
                Li e concordo com os termos acima
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
