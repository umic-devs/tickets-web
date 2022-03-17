import React from "react";
import InputMask from "react-input-mask";
import { useForm, Controller } from "react-hook-form";

export default function Step4({
  sent,
  setStep,
  formData,
  setFormData,
  handleFormSubmit,
}) {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const step4Data = JSON.parse(localStorage.getItem("step4Data") || "{}");

  const onSubmit = (data) => {
    const newFormData = { ...formData, ...data };
    localStorage.setItem("step4Data", JSON.stringify(newFormData));
    setFormData(newFormData);
    handleFormSubmit(newFormData);
  };

  const ingressosData = {
    sem_int: [formData.qtd_sem_alimentacao, "Entrada nos Cultos (Inteira)"],
    sem_meia: [formData.qtd_sem_alimentacao_meia, "Entrada nos Cultos (Meia)"],
    com_int: [formData.qtd_com_alimentacao, "Completa Alojamento (Inteira)"],
    com_meia: [formData.qtd_com_alimentacao_meia, "Completa Alojamento (Meia)"],
    com_int_5: [formData.qtd_com_alimentacao_5, "Completa Apartamento 5 pessoas (Inteira)"],
    com_meia_5: [formData.qtd_com_alimentacao_5_meia, "Completa Apartamento 5 pessoas (Meia)"],
    com_int_8: [formData.qtd_com_alimentacao_8, "Completa Apartamento 8 pessoas (Inteira)"],
    com_meia_8: [formData.qtd_com_alimentacao_8_meia, "Completa Apartamento 8 pessoas (Meia)"],
  };

  function renderCamposIngressos(tipo) {
    let ingressos = [];
    const qtd = ingressosData[tipo][0];

    for (let i = 1; i <= qtd; i++) {
      ingressos.push(
        <React.Fragment>
          <div className="col-12 mt-2">
            <h5>
              {ingressosData[tipo][1]} {i}
            </h5>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group mb-1">
              <label className="mb-0">Nome *</label>
              <input
                className="form-control"
                placeholder="Nome"
                defaultValue={step4Data[`nome_${tipo}_${i}`] || ""}
                {...register(`nome_${tipo}_${i}`, {
                  required: true,
                  minLength: 2,
                  maxLength: 26,
                })}
              />
              {errors[`nome_${tipo}_${i}`]?.type === "required" && (
                <small>Nome é obrigatório</small>
              )}
              {errors[`nome_${tipo}_${i}`]?.type === "minLength" && (
                <small>O nome deve ter pelo menos 2 caracteres</small>
              )}
              {errors[`nome_${tipo}_${i}`]?.type === "maxLength" && (
                <small>O nome deve ter menos que 26 caracteres</small>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group mb-1">
              <label className="mb-0">Sobrenome *</label>
              <input
                className="form-control"
                placeholder="Sobrenome"
                defaultValue={step4Data[`sobrenome_${tipo}_${i}`] || ""}
                {...register(`sobrenome_${tipo}_${i}`, {
                  required: true,
                  minLength: 2,
                  maxLength: 26,
                })}
              />
              {errors[`sobrenome_${tipo}_${i}`]?.type === "required" && (
                <small>Sobrenome é obrigatório</small>
              )}
              {errors[`sobrenome_${tipo}_${i}`]?.type === "minLength" && (
                <small>O sobrenome deve ter pelo menos 2 caracteres</small>
              )}
              {errors[`sobrenome_${tipo}_${i}`]?.type === "maxLength" && (
                <small>O sobrenome deve ter menos que 26 caracteres</small>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group mb-1">
              <label className="mb-0">WhatsApp *</label>
              <Controller
                name={`telefone_${tipo}_${i}`}
                control={control}
                defaultValue={step4Data[`telefone_${tipo}_${i}`] || ""}
                rules={{
                  required: true,
                  pattern: /\([0-9]{2}\) [0-9]{5}-[0-9]{4}/g,
                }}
                render={({ field }) => (
                  <InputMask
                    {...field}
                    type="tel"
                    className="form-control"
                    mask="(99) 99999-9999"
                    placeholder="(__) _____-____"
                  />
                )}
              />
              {errors[`telefone_${tipo}_${i}`]?.type === "required" && (
                <small>Telefone é obrigatório</small>
              )}
              {errors[`telefone_${tipo}_${i}`]?.type === "pattern" && (
                <small>Telefone inválido</small>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group mb-1">
              <label className="mb-0">Email</label>
              <input
                type={`email_${tipo}_${i}`}
                className="form-control"
                placeholder="exemplo@email.com"
                defaultValue={step4Data[`email_${tipo}_${i}`] || ""}
                {...register(`email_${tipo}_${i}`, {
                  required: true,
                  pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g,
                })}
              />
              {errors[`email_${tipo}_${i}`]?.type === "required" && (
                <small>Email é obrigatório</small>
              )}
              {errors[`email_${tipo}_${i}`]?.type === "pattern" && (
                <small>O email deve estar no formato correto</small>
              )}
            </div>
          </div>
        </React.Fragment>
      );
    }
    return ingressos;
  }

  return (
    <React.Fragment>
      <div className="row justify-content-center">
        <div className="col-12 col-md-9">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-12">
                <div>
                  <h2>Inscrição COMIC 2022</h2>
                  <h4>Dados de cada ingresso</h4>
                  <p className="mb-1">
                    <strong>
                      Preencha os campos abaixo com as informações de quem
                      receberá cada ingresso.
                    </strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              {renderCamposIngressos("sem_meia")}
              {renderCamposIngressos("sem_int")}
              {renderCamposIngressos("com_meia")}
              {renderCamposIngressos("com_int")}
              {renderCamposIngressos("com_meia_5")}
              {renderCamposIngressos("com_int_5")}
              {renderCamposIngressos("com_meia_8")}
              {renderCamposIngressos("com_int_8")}
            </div>
            <div className="row justify-content-between align-items-center">
              <div className="col-4 col-md-3">
                <button
                  className="btn px-0 text-primary"
                  onClick={() => setStep(3)}
                >
                  {"<-"} Voltar
                </button>
              </div>
              <div className="col-8 col-md-4 text-right">
                {sent ? (
                  <button className="btn btn-primary btn-block" disabled>
                    <span className="spinner-border spinner-border-sm" />
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary btn-block">
                    Continuar
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
