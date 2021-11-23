import React from "react";
import InputMask from "react-input-mask";
import { useForm, Controller } from "react-hook-form";

export default function Step4({
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

  const onSubmit = (data) => {
    const newFormData = { ...formData, ...data };
    setFormData(newFormData);
    handleFormSubmit(newFormData);
  };

  function renderCamposIngressos(tipo) {
    let ingressos = [];
    const qtd =
      tipo === "sem"
        ? formData.qtd_sem_alimentacao
        : formData.qtd_com_alimentacao;
    for (let i = 1; i <= qtd; i++) {
      ingressos.push(
        <React.Fragment>
          <div className="col-12 mt-2">
            <h5 className="mb-1">
              Ingresso {tipo === "sem" ? "Sem Alimentação" : "Completo"} {i}
            </h5>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group mb-1">
              <label>Nome</label>
              <input
                className="form-control"
                placeholder="Nome"
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
              <label>Sobrenome</label>
              <input
                className="form-control"
                placeholder="Sobrenome"
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
              <label>CPF</label>
              <Controller
                name={`cpf_${tipo}_${i}`}
                control={control}
                rules={{
                  required: true,
                  pattern: /^([0-9]){3}\.([0-9]){3}\.([0-9]){3}-([0-9]){2}$/g,
                }}
                render={({ field }) => (
                  <InputMask
                    {...field}
                    type="tel"
                    className="form-control"
                    mask="999.999.999-99"
                    placeholder="___.___.___-__"
                  />
                )}
              />
              {errors[`cpf_${tipo}_${i}`]?.type === "required" && (
                <small>CPF é obrigatório</small>
              )}
              {errors[`cpf_${tipo}_${i}`]?.type === "pattern" && (
                <small>CPF inválido</small>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group mb-1">
              <label>WhatsApp (Telefone)</label>
              <Controller
                name={`telefone_${tipo}_${i}`}
                control={control}
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
        </React.Fragment>
      );
    }
    return ingressos;
  }

  return (
    <React.Fragment>
      <div className="row justify-content-center text-justify">
        <div className="col-12 col-md-9">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-12">
                <div>
                  <h1>Inscrição COMIC 2022</h1>
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
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
