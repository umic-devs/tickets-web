import React from "react";

export default function Result() {
  const pedido = localStorage.getItem("pedido");
  return (
    <React.Fragment>
      <div className="row justify-content-center text-justify">
        <div className="col-12 col-md-9">
          <div className="mb-2">
            <h2>Inscrição COMIC 24</h2>
            <h4 className="text-success">Pedido recebido com sucesso!</h4>
            <h5>PEDIDO {pedido}</h5>
                <p>
                  <strong>Muito obrigado! Em breve um email com os dados do pedido chegará no seu email.</strong>
                </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
