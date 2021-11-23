import React from "react";

export default function Step2({ setStep, formData, setFormData }) {
  function getTotal() {
    return (
      formData?.qtd_sem_alimentacao * 130 + formData?.qtd_com_alimentacao * 290
    );
  }

  const onSubmit = () => {
    const total = getTotal();
    setFormData({ ...formData, total });
    setStep(3);
  };

  return (
    <React.Fragment>
      <div className="row justify-content-center">
        <div className="col-12 col-md-9">
          <div className="row">
            <div className="col-12">
              <div className="mb-3">
                <h1>Inscrição COMIC 2022</h1>
                <h4>Ingressos</h4>
                <p>
                  <strong>
                    Selecione quantos ingressos de cada tipo deseja pedir
                  </strong>
                </p>
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-12 col-md-8">
              <div className="row">
                <div className="col-12 d-flex flex-row justify-content-between align-items-center my-1">
                  <div className="form-group mb-0">
                    <p className="mb-0">
                      <strong>INGRESSO SEM ALIMENTAÇÃO</strong>
                    </p>
                    <p className="mb-0">
                      <strong>
                        R$ 130,00 <small>(até 10/01/2022)</small>
                      </strong>
                    </p>
                    <small>
                      <i>Entrada + hospedagem em escola</i>
                    </small>
                  </div>
                  <div className="form-group w-25 mr-md-3">
                    <select
                      className="form-control form-control-lg"
                      value={formData.qtd_sem_alimentacao}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          qtd_sem_alimentacao: e.target.value,
                        })
                      }
                    >
                      {Array(21)
                        .fill(1)
                        .map((_, index) => (
                          <option key={`sem_${index}`} value={index}>
                            {index}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="decoration-line"></div>
                <div className="col-12 d-flex flex-row justify-content-between align-items-center my-1">
                  <div className="form-group mb-0">
                    <p className="mb-0">
                      <strong>INGRESSO COM ALIMENTAÇÃO</strong>
                    </p>
                    <p className="mb-0">
                      <strong>
                        R$ 290,00 <small>(até 10/01/2022)</small>
                      </strong>
                    </p>
                    <small>
                      <i>Entrada + hospedagem em escola + alimentação</i>
                    </small>
                  </div>
                  <div className="form-group w-25 mr-md-3">
                    <select
                      className="form-control form-control-lg"
                      value={formData.qtd_com_alimentacao}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          qtd_com_alimentacao: e.target.value,
                        })
                      }
                    >
                      {Array(21)
                        .fill(1)
                        .map((_, index) => (
                          <option key={`com_${index}`} value={index}>
                            {index}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 bg-gray p-3">
              <h6>Resumo do pedido</h6>
              {formData?.qtd_sem_alimentacao > 0 && (
                <p className="mb-0">
                  <small>
                    {formData?.qtd_sem_alimentacao}x Ingresso Sem Alimentação
                  </small>
                </p>
              )}
              {formData?.qtd_com_alimentacao > 0 && (
                <p className="mb-0">
                  <small>
                    {formData?.qtd_com_alimentacao}x Ingresso Com Alimentação
                  </small>
                </p>
              )}
              {getTotal() > 0 && (
                <h6 className="mt-3">Total: R$ {getTotal()},00</h6>
              )}
            </div>
          </div>
          <div className="row justify-content-between align-items-center">
            <div className="col-auto">
              <button
                className="btn px-0 text-primary"
                onClick={() => setStep(1)}
              >
                Voltar
              </button>
            </div>
            <div className="col-3 text-right">
              {getTotal() > 0 ? (
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => onSubmit()}
                >
                  Continuar
                </button>
              ) : (
                <small>Escolha um ingresso</small>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
