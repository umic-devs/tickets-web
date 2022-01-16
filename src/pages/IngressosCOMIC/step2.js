import React from "react";

const SEM_ALIMENTACAO = 150;
const COM_ALIMENTACAO = 280;

export default function Step2({ setStep, formData, setFormData }) {
  function getTotal() {
    return (
      formData?.qtd_sem_alimentacao * SEM_ALIMENTACAO +
      (formData?.qtd_sem_alimentacao_meia * SEM_ALIMENTACAO) / 2 +
      formData?.qtd_com_alimentacao * COM_ALIMENTACAO +
      (formData?.qtd_com_alimentacao_meia * COM_ALIMENTACAO) / 2
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
                <h2>Inscrição COMIC 2022</h2>
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
            <div className="col-12 col-lg-8 mb-2">
              <div className="row">
                <div className="col-12 my-1">
                  <p className="ingresso-item-title mb-0">
                    INGRESSO SEM ALIMENTAÇÃO
                  </p>
                  <small className="mb-2" style={{ lineHeight: "1rem" }}>
                    Inclui entrada + hospedagem em escola
                  </small>
                  <div className="row">
                    <div className="col-12 my-1">
                      <div className="row">
                        <div className="col-8">
                          <p className="ingresso-item-type">
                            Meia <small>(Entre 5 e 12 anos incompletos)</small>
                          </p>
                          <p className="ingresso-item-price">
                            R$ {SEM_ALIMENTACAO / 2},00{" "}
                            <small>(até 25/02)</small>
                          </p>
                        </div>
                        <div className="col-4 my-auto">
                          <select
                            className="form-control form-control-lg"
                            value={formData.qtd_sem_alimentacao_meia}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                qtd_sem_alimentacao_meia: e.target.value,
                              })
                            }
                          >
                            {Array(21)
                              .fill(1)
                              .map((_, index) => (
                                <option key={`sem_${index}_meia`} value={index}>
                                  {index}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 my-1">
                      <div className="row">
                        <div className="col-8">
                          <p className="ingresso-item-type">Inteira</p>
                          <p className="ingresso-item-price">
                            R$ {SEM_ALIMENTACAO},00 <small>(até 25/02)</small>
                          </p>
                        </div>
                        <div className="col-4 my-auto">
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
                    </div>
                  </div>
                </div>
                <div className="decoration-line"></div>
                <div className="col-12 my-1">
                  <p className="ingresso-item-title mb-0">
                    INGRESSO COM ALIMENTAÇÃO
                  </p>
                  <small className="mb-2" style={{ lineHeight: "1rem" }}>
                    Inclui entrada + hospedagem em escola + alimentação
                  </small>
                  <div className="row">
                    <div className="col-12 my-1">
                      <div className="row">
                        <div className="col-8">
                          <p className="ingresso-item-type">
                            Meia <small>(Entre 5 e 12 anos incompletos)</small>
                          </p>
                          <p className="ingresso-item-price">
                            R$ {COM_ALIMENTACAO / 2},00{" "}
                            <small>(até 05/02)</small>
                          </p>
                        </div>
                        <div className="col-4 my-auto">
                          <select
                            className="form-control form-control-lg"
                            value={formData.qtd_com_alimentacao_meia}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                qtd_com_alimentacao_meia: e.target.value,
                              })
                            }
                          >
                            {Array(21)
                              .fill(1)
                              .map((_, index) => (
                                <option key={`com_${index}_meia`} value={index}>
                                  {index}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 my-1">
                      <div className="row">
                        <div className="col-8">
                          <p className="ingresso-item-type">Inteira</p>
                          <p className="ingresso-item-price">
                            R$ {COM_ALIMENTACAO},00 <small>(até 05/02)</small>
                          </p>
                        </div>
                        <div className="col-4 my-auto">
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
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 bg-gray p-3">
              <h6>Resumo do pedido</h6>
              {formData?.qtd_sem_alimentacao_meia > 0 && (
                <>
                  <p className="mb-0">
                    <small>
                      {formData.qtd_sem_alimentacao_meia}x Ingresso Sem
                      Alimentação (Meia)
                    </small>
                  </p>
                  <p className="mb-1">
                    <small>
                      R${" "}
                      {(formData.qtd_sem_alimentacao_meia * SEM_ALIMENTACAO) /
                        2}
                      ,00
                    </small>
                  </p>
                </>
              )}
              {formData?.qtd_sem_alimentacao > 0 && (
                <>
                  <p className="mb-0">
                    <small>
                      {formData?.qtd_sem_alimentacao}x Ingresso Sem Alimentação
                      (Inteira)
                    </small>
                  </p>
                  <p className="mb-1">
                    <small>
                      R$ {formData.qtd_sem_alimentacao * SEM_ALIMENTACAO}
                      ,00
                    </small>
                  </p>
                </>
              )}
              {formData?.qtd_com_alimentacao_meia > 0 && (
                <>
                  <p className="mb-0">
                    <small>
                      {formData?.qtd_com_alimentacao_meia}x Ingresso Com
                      Alimentação (Meia)
                    </small>
                  </p>
                  <p className="mb-1">
                    <small>
                      R${" "}
                      {(formData.qtd_com_alimentacao_meia * COM_ALIMENTACAO) /
                        2}
                      ,00
                    </small>
                  </p>
                </>
              )}
              {formData?.qtd_com_alimentacao > 0 && (
                <>
                  <p className="mb-0">
                    <small>
                      {formData?.qtd_com_alimentacao}x Ingresso Com Alimentação
                      (Inteira)
                    </small>
                  </p>
                  <p className="mb-1">
                    <small>
                      R$ {formData.qtd_com_alimentacao * COM_ALIMENTACAO},00
                    </small>
                  </p>
                </>
              )}
              {getTotal() > 0 && (
                <h6 className="mt-3">Total: R$ {getTotal()},00</h6>
              )}
            </div>
          </div>
          <div className="row justify-content-between align-items-center">
            <div className="col-4 col-md-3">
              <button
                className="btn px-0 text-primary"
                onClick={() => setStep(1)}
              >
                {"<-"} Voltar
              </button>
            </div>
            <div className="col-8 col-md-4 text-right">
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
