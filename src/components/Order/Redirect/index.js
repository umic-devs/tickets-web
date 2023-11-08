import React from "react";

export default function Result() {
    const pedido = localStorage.getItem("pedido");
    return (
        <React.Fragment>
            <div className="row justify-content-center text-justify">
                <div className="col-12 col-md-9">
                    <div className="mb-2">
                        <h2>Inscrição COMIC 24</h2>
                        <h4>PEDIDO {pedido}</h4>
                        <h5 className="text-success">Finalize seu pedido no Mercado Pago!</h5>
                        <p>
                            <strong>Uma página com o link de pagamento foi aberta.</strong>
                        </p>
                        <p>
                            <strong>Pode fechar essa janela, saberemos assim que o pedido for pago!.</strong>
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
