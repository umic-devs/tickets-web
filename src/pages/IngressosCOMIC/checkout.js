import React from "react";

export default function Checkout({ data, success }) {
  const getTitle = () => {
    if (success) {
      return "Compra realizada com sucesso";
    } else {
      return "Erro ao realizar a compra";
    }
  };
  return (
    <React.Fragment>
      <div className="row justify-content-center text-justify">
        <div className="col-12 col-md-9">
          <div className="mb-3">
            <h2>Inscrição COMIC 2022</h2>
            <h4>{getTitle}</h4>
            <p>
              <strong>
                Preencha os campos abaixo com as informações pessoais de quem
                irá retirar o(s) ingresso(s)
              </strong>
            </p>
          </div>
          <div className="row">
            {renderCamposIngressos("sem")}
            {renderCamposIngressos("com")}
          </div>
          <div className="row justify-content-between align-items-center">
            <div className="col-auto">
              <button
                className="btn px-0 text-primary"
                onClick={() => setStep(3)}
              >
                Voltar
              </button>
            </div>
            <div className="col-3 text-right">
              <button type="submit" className="btn btn-primary btn-block">
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
